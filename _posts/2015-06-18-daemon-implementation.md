---
layout: post
title: Linux 守护进程的实现
category: Linux
tags: [Linux, Daemon]
author: Alfred Sun
updated: 2015-06-18 16:53
keywords: daemon, linux, process
description: 守护进程是什么？Linux下面如何实现守护进程？本文会介绍笔者在经历一次悲剧的后台开发面试后的反思和总结。
---

> _**Look at the past for inspiration, but focus on the future, because tomorrow is shaped by the choices we make today.**_

昨天突然地来了场面试，让我有点不知所措，好在好多好多天前复习了下，但是自感表现地不是很好。（面试官的声音比较柔和，更是让我不知所措。）询问了做过的项目后，看我简历上有写Linux进程相关的经历，就开始追问了，从 IPC 到 Redis 再到 Nginx 模块开发、网络编程，还问了下 Golang（老实讲，Go初学，只照着官网文档看了一遍，几天后忘得差不多了），最后问了个问题，让我遗憾了好多天，就是本文的题目：**如何实现守护进程？**

本来这个应该知道的，前面看过 Nginx 和 Redis 基础架构，都是以 **Daemon** 的方式运行的。但是当时没查词典 “Daemon” 是什么意思，然而有感觉这个名词好像在哪里见过，结果便懵了，只能说不知道“**守护进程**”这个东西……归根到底还是因为没有相关服务端开发的经验惹的祸。这不仅让我记起当年老大问我“SQL绑定变量”的原因是什么，只记得当时脸红过关羽；哎，只知道这样用，却不知这个东西叫啥……

那么守护进程到底是做什么的呢？该如何实现呢？经过一番深刻地反省和检讨之后，博主认真学习怎么去实现守护进程。




## 守护进程 Daemon

守护进程，也即通常所说的 Daemon 进程，是 Linux 下一种特殊的后台服务进程，它独立于控制终端并且周期性的执行某种任务或者等待处理某些发生的事件。守护进程通常在系统引导装入时启动，在系统关闭时终止。Linux 系统下大多数服务都是通过守护进程实现的。

控制终端是什么？  
终端是用户与操作系统进行交流的界面。在 Linux 系统中，用户由终端登录系统登入系统后会得到一个 shell 进程，这个终端便成为这个 shell 进程的控制终端（Controlling Terminal）。shell 进程启动的其他进程，由于复制了父进程的信息，因此也都同依附于这个控制终端。  
从终端启动的进程都依附于该终端，并受终端控制和影响。终端关闭，相应的进程都会自动关闭。守护进程脱离终端的目的，也即是不受终端变化的影响不被终端打断，当然也不想在终端显示执行过程中的信息。


<!--more-->


## 如何实现守护进程

守护进程属于 Linux 进程管理的范畴。其首要的特性是**后台运行**；其次，与从启动它的父进程的运行环境隔离开来，大致包括会话、控制终端、进程组、文件描述符、文件权限掩码以及工作目录等。  
守护进程可以在 Linux 启动时从脚本 `/etc/rc.d` 启动，也可以由作业规划进程 `crond` 启动，还可以通过用户终端（一般是 Shell）启动。

实现一个守护进程，其实就是将普通进程按照上述特性改造为守护进程的过程。  
需要注意的一点是，不同版本的 Unix 系统其实现机制不同，BSD 和 Linux 下的实现细节就不同。

根据上述的特性，我们便可以创建一个简单的守护进程，这里通过从终端 Shell 来启动。


### 1、创建子进程，父进程退出




### 2、子进程创建新会话

下图为会话、进程组、进程和控制终端之间的关系。

![session]({{ site.picture_dir }}/daemon-implementation/session.png)


### 3、改变当前目录为根目录




#### 4、重设文件权限掩码




### 5、关闭文件描述符





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
事实上，这是完全错误理解，**父进程先于子进程结束**，这时的子进程应该称作“**孤儿进程**（Orphan）”，它将被 1 号进程（init 进程）接管，init 进程成为其父进程。而僵尸进程是**子进程先于父进程结束**，而且父进程有没有函数调用 `wait()` 或 `waitpid()` 等待子进程结束，也没有注册 `SIGCHLD` 信号处理函数，结果使得子进程的**进程列表信息**无法回收，就变成了僵尸进程（Zombie）。





