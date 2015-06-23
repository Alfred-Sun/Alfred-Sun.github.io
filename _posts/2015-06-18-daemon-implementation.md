---
layout: post
title: Linux 守护进程的实现
category: Linux
tags: [Linux, Daemon]
author: Alfred Sun
updated: 2015-06-18 16:53
keywords: daemon, linux, process
description: 守护进程是什么？Linux 下面如何实现守护进程？本文会介绍笔者在经历一次悲剧的后台开发面试后的反思和总结。
---

> _**Look at the past for inspiration, but focus on the future, because tomorrow is shaped by the choices we make today.**_

昨天突然地来了场面试，让我有点不知所措，好在好多好多天前复习了下，但是自感表现不是很好（_面试官的声音比较柔和，更是让我不知所措_）。询问了做过的项目后，看我简历上有写 Linux 进程相关的经历，就开始追问了，从 IPC 到 Redis 再到 Nginx 模块开发、网络编程，还问了下 Golang（老实讲，Go 初学，只照着官网文档看了一遍，几天后忘得差不多了），最后问了个问题，让我遗憾了好多天，就是本文的题目：**如何实现守护进程？**

本来这个应该知道的，前面看过 Nginx 和 Redis 基础架构，都是以 **Daemon** 的方式运行的。但是当时没查词典 “Daemon” 是什么意思，然而又感觉这个名词好像在哪里见过，结果便懵了，只能说不知道“**守护进程**”这个东西……归根到底还是因为没有相关服务端开发经验惹的祸。这不禁让我记起当年老大问我“SQL绑定变量”的原因是什么，只记得当时脸红过关羽；哎，只知道这样用，却不知这个东西叫啥……

那么守护进程到底是做什么的呢？该如何实现呢？经过一番深刻地反省和检讨之后，博主认真学习怎么去实现守护进程。




## 守护进程 Daemon

守护进程，也即通常所说的 Daemon 进程，是 Linux 下一种特殊的后台服务进程，它独立于控制终端并且周期性的执行某种任务或者等待处理某些发生的事件。守护进程通常在系统引导装入时启动，在系统关闭时终止。Linux 系统下大多数服务都是通过守护进程实现的。

守护进程的名称通常以 “d” 结尾，如 “httpd”、“crond”、“mysqld”等。

控制终端是什么？  
终端是用户与操作系统进行交流的界面。在 Linux 系统中，用户由终端登录系统登入系统后会得到一个 shell 进程，这个终端便成为这个 shell 进程的控制终端（Controlling Terminal）。shell 进程启动的其他进程，由于复制了父进程的信息，因此也都同依附于这个控制终端。  
从终端启动的进程都依附于该终端，并受终端控制和影响。终端关闭，相应的进程都会自动关闭。守护进程脱离终端的目的，也即是不受终端变化的影响不被终端打断，当然也不想在终端显示执行过程中的信息。


<!--more-->

**如果不想进程受到用户、终端或其他变化的影响，就必须把它变成守护进程。**




## 如何实现守护进程

守护进程属于 Linux 进程管理的范畴。其首要的特性是**后台运行**；其次，要与从启动它的父进程的运行环境隔离开来，需要处理的内容大致包括会话、控制终端、进程组、文件描述符、文件权限掩码以及工作目录等。  
守护进程可以在 Linux 启动时从脚本 `/etc/rc.d` 启动，也可以由作业规划进程 `crond` 启动，还可以通过用户终端（一般是 Shell）启动。

实现一个守护进程，其实就是将普通进程按照上述特性改造为守护进程的过程。  
需要注意的一点是，不同版本的 Unix 系统其实现机制不同，BSD 和 Linux 下的实现细节就不同。

根据上述的特性，我们便可以创建一个简单的守护进程，这里以 Linux 系统下从终端 Shell 来启动为例。



### 1、创建子进程，父进程退出

编写守护进程第一步，就是要使得进程独立于终端后台运行。为避免终端挂起，将父进程退出，造成程序已经退出的假象，而后面的工作都在子进程完成，这样控制终端也可以继续执行其他命令，从而在形式上脱离控制终端的控制。

由于父进程先于子进程退出，子进程就变为孤儿进程，并由 init 进程作为其父进程收养。



### 2、子进程创建新会话

经过上一步，子进程已经后台运行，然而系统调用 `fork` 创建子进程，子进程便复制了原父进程的进程控制块（PCB），相应地继承了一些信息，包括会话、进程组、控制终端等信息。尽管父进程已经退出，但子进程的会话、进程组、控制终端的信息没有改变。为使子进程完全摆脱父进程的环境，需要调用 `setsid` 函数。

这里有必要说一下两个概念：**会话**和**进程组**。  

进程组：一个或多个进程的集合。拥有唯一的标识进程组 ID，每个进程组都有一个组长进程，该进程的进程号等于其进程组的 ID。进程组 ID 不会因组长进程退出而受到影响，`fork` 调用也不会改变进程组 ID。

会话：一个或多个进程组的集合。新建会话时，当前进程（会话中唯一的进程）成为会话首进程，**也是当前进程组的组长进程**，其进程号为会话 ID，同样也是该进程组的 ID。它通常是登录 shell，也可以是调用 `setsid` 新建会话的孤儿进程。  
注意：组长进程调用 `setsid` ，则出错返回，无法新建会话。

通常，会话开始于用户登录，终止于用户退出，期间的所有进程都属于这个会话。一个会话一般包含一个**会话首进程**、一个**前台进程组**和一个**后台进程组**，控制终端可有可无；此外，前台进程组只有一个，后台进程组可以有多个，这些进程组共享一个控制终端。

- 前台进程组：  
  该进程组中的进程可以**向终端设备进行读、写操作**（属于该组的进程可以从终端获得输入）。该进程组的 ID 等于控制终端进程组 ID，通常据此来判断前台进程组。

- 后台进程组：  
  会话中除了会话首进程和前台进程组以外的所有进程，都属于后台进程组。该进程组中的进程**只能向终端设备进行写操作**。

下图为会话、进程组、进程和控制终端之间的关系（登录 shell 进程本身属于一个单独的进程组）。

![session]({{ site.picture_dir }}/daemon-implementation/session.png)

_想了解更多关于会话 **Sessions** 内容，可以认真读一下 [**APUE**](http://www.apuebook.com/) 这本书。_

如果调用进程非组长进程，那么就能创建一个新会话：  

- 该进程变成新会话的首进程
- 该进程成为一个新进程组的组长进程
- 该进程没有控制终端，如果之前有，则会被中断（**会话过程对控制终端的独占性**）

也就是说：**组长进程不能成为新会话首进程，新会话首进程必定成为组长进程**。

到此为止，我们熟悉了会话与进程间的关系，那么如何新建一个会话呢？

通过调用 `setsid` 函数可以创建一个新会话，调用进程担任新会话的首进程，其作用有：  

- 使当前进程脱离原会话的控制
- 使当前进程脱离原进程组的控制
- 使当前进程脱离原控制终端的控制

这样，当前进程才能实现真正意义上完全独立出来，摆脱其他进程的控制。

另外，要提一下，尽管进程变成无终端的会话首进程，但是它仍然可以重新申请打开一个控制终端。可以通过再次创建子进程结束当前进程，**使进程不再是会话首进程**来禁止进程重新打开控制终端。



### 3、改变当前目录为根目录

直接调用 `chdir` 函数切换到根目录下。  
由于进程运行过程中，当前目录所在的文件系统（如：“/mnt/usb”）是不能卸载的，为避免对以后的使用造成麻烦，改变工作目录为根目录是必要的。如有特殊需要，也可以改变到特定目录，如“/tmp”。



### 4、重设文件权限掩码

`fork` 函数创建的子进程，继承了父进程的文件操作权限，为防止对以后使用文件带来问题，需要重设**文件权限掩码**。

文件权限掩码，设定了文件权限中要屏蔽掉的对应位。这个跟文件权限的八进制数字模式表示差不多，将现有存取权限减去权限掩码（或做异或运算），就可产生新建文件时的预设权限。

调用 `umask` 设置文件权限掩码，通常是重设为 0，清除掩码，这样可以大大增强守护进程的灵活性。



### 5、关闭文件描述符

同文件权限掩码一样，子进程可能继承了父进程打开的文件，而这些文件可能永远不会被用到，但它们一样消耗系统资源，而且可能导致所在的文件系统无法卸下，因此需要一一关闭它们。由于守护进程脱离了终端运行，因此标准输入、标准输出、标准错误输出这3个文件描述符也要关闭。通常按如下方式来关闭：

```c
for (i=0; i < MAXFILE; i++)
    close(i);
```

这里要注意下，`param.h` 头文件中定义了一个常量 `NOFILE`，表示最大允许的文件描述符，但是我们尽量不要用它，而是通过调用函数 `getdtablesize` 返回进程文件描述符表中的项数（即打开的文件数目）：

> /\* The following are not really correct but it is a value we used for a
long time  
and which seems to be usable. People should not use **NOFILE** and **NCARGS** anyway. \*/  
> **#define NOFILE 256**  
> **#define NCARGS 131072**  

- - - - - - -

至此为止，一个简单的守护进程就建立起来了。  
另外，有些 Unix 提供一个 `daemon` 的 C 库函数，实现守护进程。（BSD 和 Linux 均提供这个函数）：

> **NAME**  
> &nbsp;&nbsp;&nbsp;&nbsp;  daemon - run in the background
> 
> **SYNOPSIS**  
> &nbsp;&nbsp;&nbsp;&nbsp;  #include \<unistd.h\>  
> &nbsp;&nbsp;&nbsp;&nbsp;  int daemon(int nochdir, int noclose);
>
> **DESCRIPTION**  
> &nbsp;&nbsp;&nbsp;&nbsp;  The  daemon()  function  is  for programs wishing to detach themselves from the controlling terminal and run in the background as system daemons.




## 守护进程实例

代码说明：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <unistd.h>
#include <sys/param.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

// 守护进程初始化函数
void init_daemon()
{
    pid_t pid;
    int i = 0;

    if ((pid = fork()) == -1) {
        printf("Fork error !\n");
        exit(1);
    }
    if (pid != 0) {
        exit(0);        // 父进程退出
    }

    setsid();           // 子进程开启新会话，并成为会话首进程和组长进程
    if ((pid = fork()) == -1) {
        printf("Fork error !\n");
        exit(-1);
    }
    if (pid != 0) {
        exit(0);        // 结束第一子进程，第二子进程不再是会话首进程
    }
    chdir("/tmp");      // 改变工作目录
    umask(0);           // 重设文件掩码
    for (; i < getdtablesize(); ++i) {
       close(i);        // 关闭打开的文件描述符
    }

    return;
}

int main(int argc, char *argv[])
{
    int fp;
    time_t t;
    char buf[] = {"This is a daemon:  "};
    char *datetime;
    int len = 0;
    //printf("The NOFILE is: %d\n", NOFILE);
    //printf("The tablesize is: %d\n", getdtablesize());
    //printf("The pid is: %d\n", getpid());

    // 初始化 Daemon 进程
    init_daemon();

    // 每隔一分钟记录运行状态
    while (1) {
        if (-1 == (fp = open("/tmp/daemon.log", O_CREAT|O_WRONLY|O_APPEND, 0600))) {
          printf("Open file error !\n");
          exit(1);
        }
        len = strlen(buf);
        write(fp, buf, len);
        t = time(0);
        datetime = asctime(localtime(&t));
        len = strlen(datetime);
        write(fp, datetime, len);
        close(fp);
        sleep(60);
    }

    return 0;
}
```

测试结果：

![test result]({{ site.picture_dir }}/daemon-implementation/daemon-log.png)





## 僵尸进程

提到守护进程，就不得不说一下另一类特殊进程——**僵尸进程**。

那什么是僵尸进程呢？  
以前看的书上大致都说“如果父进程中没有等待子进程的结束，那么子进程就会变成僵尸进程”，所以就想当然地认为“如果父进程先于子进程结束，那么子进程就成为僵尸进程”。  
事实上，这是完全错误的理解，**父进程先于子进程结束**，这时的子进程应该称作“**孤儿进程**（Orphan）”，它将被 1 号进程（init 进程）接管，init 进程成为其父进程。而僵尸进程是**子进程先于父进程结束**，而且父进程没有函数调用 `wait()` 或 `waitpid()` 等待子进程结束，也没有注册 `SIGCHLD` 信号处理函数，结果使得子进程的**进程列表信息**无法回收，就变成了僵尸进程（Zombie）。

**一个已经终止，但是其父进程尚未对其进行善后处理（获取终止子进程的有关信息、释放它仍占用的资源）的进程被称为僵尸进程。**




