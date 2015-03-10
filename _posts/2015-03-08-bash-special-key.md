---
layout: post
title: Bash 快捷键
category: Bash
tags: [Bash]
updated: 2015-03-08 00:11
keywords: bash, Linux
description: Bash 快捷键，光标移到行首、行尾，删除字符等
---

## Ctrl 键组合

```bash
ctrl+a  # 光标移到行首
ctrl+e  # 光标移到行尾
ctrl+b  # 光标左移一个字母
ctrl+f  # 光标右移
ctrl+c  # 杀死当前进程
ctrl+d  # 退出当前 Shell
ctrl+h  # 删除光标前一个字符，同 backspace 键相同
ctrl+d  # 删除光标所在字母；注意和 backspace 以及 ctrl+h 的区别，这2个是删除光标前的字符
ctrl+w  # 移除光标前的一个单词
ctrl+k  # 清除光标后至行尾的内容
ctrl+u  # 清除光标前至行首间的所有内容
ctrl+t  # 交换光标位置前的两个字符
ctrl+y  # 粘贴或者恢复上次的删除
ctrl+l  # 清屏，相当于 clear
ctrl+r  # 搜索之前打过的命令。会有一个提示，根据你输入的关键字进行搜索bash的history
ctrl+z  # 把当前进程转到后台运行，使用 fg 命令恢复。比如 top -d1 然后 ctrl+z，到后台，然后 fg，重新恢复
```



## Esc 键组合

```bash
esc+d   # 删除光标后的一个词
esc+f   # 往右跳一个词
esc+b   # 往左跳一个词
esc+t   # 交换光标位置前的两个单词
```

<!--more-->





