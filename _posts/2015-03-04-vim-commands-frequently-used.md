---
#layout: post
title: Vim 常用命令小结
category: Vim
tags: [Vim]
updated: 2015-03-04 23:27
keywords: vim commands
description: 就是总结记录一些比较常用的 Vim 命令。
---


## 光标移动 ##

    h,j,k,l = ←, ↓, ↑, →
    ctrl+f = 下一页（forward）
    ctrl+b = 上一页（backward）
    w = 跳到下一个单词的开头
    W = 跳到下一个单词（空白分隔）的开头
    e = 跳到下一个单词的末尾
    E = 跳到下一个单词（空白分隔）的末尾
    b = 跳到前一个单词的开头
    B = 跳到前一个单词（空白分隔）的开头
    0 = 跳到本行行头
    $ = 跳到本行行尾
    ^ = 跳到本行第一个非空白字符
    g_ = 跳到本行最后一个非空白字符
    gg = 跳到第一行
    G = 跳到最后一行
    [N]G = 跳到第N行
    `. = 跳到最后编辑的地方
    * = 向下查找当前光标所在位置的字符串
    # = 向上查找当前光标所在位置的字符串


<!--more-->


## 插入模式 ##

    i = insert mode at cursor
    I = insert at the beginning of line
    a = append after the cursor
    A = append at the end of the line
    o = open blank line below current line
    O = open blank line above current line
    Esc = exit insert mode



## 编辑 ##

    u = undo
    ctrl+r = redo
    ~ = switch case
    >> = indent line one column right
    << = indent line one column left
    == = auto-indent current line



## 剪切与粘贴（删除） ##

    dd = 删除当前行，并把删除的行存到剪贴板里
    [N]dd = 删除当前行开始的 N 行，并把删除的行存到剪贴板里
    x = 删除当前字符
    X = 删除前一个字符
    dw = delete to end of word
    D = delete to end of line
    yy = 复制当前行
    [N]yy = 复制 N 行
    yw = copy to end of word
    y$ = copy to end of line
    p = 在光标位置之后粘贴
    P = 在光标位置之前粘贴



## 查找 ##

```vim
/pattern " search for pattern
?pattern " search backwards for pattern
/ab*    " 重复 b 多次或者 0 次，可以匹配 b,be,bee,beee 等
/ab\+   " 重复匹配 b 至少一次
/ab\=   " 重复匹配 b 字符 0 次或者一次
/a.b    " 匹配任何一个非空白符，可以是 a b,a1b,acb,a*b,a-b 等
n       " repeat search in same direction
N       " repeat search in opposite direction
```



## 替换 ##

```vim
:s/str1/str2/       " 用字符串 str2 替换当前行中第一次出现的字符串 str1
:s/str1/str2/g      " 用字符串 str2 替换当前行中所有的字符串 str1
:s/str1/str2/gc     " 用字符串 str2 替换当前行中所有字符串 str1，每次替换前询问请求确认
:s/str1/str2/gci    " 用字符串 str2 替换当前行中所有字符串 str1，不区分大小，替换前请求确认
:%s/str1/str2/g     " 替换每一行中所有的字符串 str1 为 str2
:g/str1/s//str2/g   " 同上
:s#/oradata/apras/#/user01/apras1#  " 将当前行第一个 /oradata/apras/ 替换成 /user01/apras1/
:n,$s/str1/str2/g   " 替换第 n 行开始到最后一行中每一行所有 str1 为 str2
:10,20 s/^/    /g   " 从第 10 行到第 20 行，每行前面加四个空格，用于缩进
```



## 退出 ##

    :w = 保存
    :wq = 保存并退出    ZZ
    :x = 保存并退出     ZZ
    :q = 退出，有改动未保存时退出失败
    :q! = 强制退出      ZQ



- - - - - -

[**Vim Cheat Sheet**]({{ site.picture_dir }}/vim_mind_map.png)



