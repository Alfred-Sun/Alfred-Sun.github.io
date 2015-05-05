---
#layout: post
title: 如何启用 root 用户登录 Fedora ？
category: [Linux]
tags: [Fedora, Linux]
#author: Alfred Sun
updated: 2015-04-29 13:01
keywords: fedora, root, linux, login
description: 正常安装 Fedora 的情况下，是无法使用 root 登录系统的。那么如何设置一下，才能获取 root 登录权限呢？以前碰到过几次，然后查了查就做到了；可惜过了段时间后又忘记了，因此简单在这里写写，给自己强化下记忆……
---

以前的 Fedora 发行版默认无法 root 登录系统，需要在普通账户下修改配置文件。

在终端输入：

    [test@fedora ~]$ su  
    Password:   
    [root@fedora test]# vim /etc/pam.d/gdm-password  

注释掉这段及前面加上#号，如下：

    #auth        required      pam_succeed_if.so user != root quiet  

保存之后注销再用 root 和密码登陆就好了。


修改目录 /etc/pam.d/gdm 与 /etc/pam.d/gdm-password 两个文件  
  
一般修改方法:  

在终端中输入su 命令并输入root密码这样我在终端中就有了root的操权限接下来我们使用gdit命令对其进行修改
  
    vim /etc/pam.d/gdm  

在这段 "auth required pam_succeed_if.so user != root quiet" 加上 # 号注释掉就可以了  
  
同样的 vim /etc/pam.d/gdm-password  
也是在 auth required pam_succeed_if.so user != root quiet 前面加上 # 号注释
  
保存之后我们重启或者注销一次计算机就能以 root 进行登录系统了  


<!--more-->


从博主目前的使用来看，Fedora 20 和 Fedora 21 都去除了这种权限设置，允许 root 登录系统。

