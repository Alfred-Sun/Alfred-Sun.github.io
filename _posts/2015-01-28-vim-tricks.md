---
title: 一些 Vim 小技巧
category: Vim
tags: [Vim]
updated: 2015-01-28 00:09
keywords: Vim tips and tricks
description: 使用VIM的过程中，记录的一些常用的 VIM 小技巧
---

本文主要记录一下使用 Vim 过程中，学到的一些小技巧，以免以后忘记找不到。


## 复制 Vim 命令输出结果

比如，运行 `:pwd`，要复制它的执行结果到剪切板的话，可以：

```vim
:redir @* | set guifont | redir END
```

`:redir` 重定向某个命令的输出结果到一个寄存器 `@*`。这个寄存器 `@*` 指的就是剪切板。

更多的信息参考：

```vim
:help :redir
```

<!--more-->


## 恢复上次退出前的会话状态

启动 Vim 后，打开上次未关闭的文件：

```vim
"The following command creates a session file:
:mksession vimbook.vim

"Later if you want to restore this session, you can use this command:
:source vimbook.vim

"If you want to start Vim and restore a specific session, you can use the
following command:
vim -S vimbook.vim
```

参看文档：

```vim
"usr_21.txt  21.4 Sessions
:h 21.4
:help session
```


## 最近打开的文件列表

Vim 在 `~/.viminfo` 或 `~\_viminfo` 中保存了最近访问的10个文件信息，可以用 `'0`、`'1`、`'2`、`'3` …… `'9` 这些命令跳转到对应的文件。  
另外，使用 `:browse old` 查看文件的序号。

```vim
"get recent files' list
:browse oldfiles
"enter 'q' and use number(like '0' - '9' .etc) to choose which file to edit
"千万不要在 'q' 前面输入 ':'
q 2
"Or use below command to list files:
:oldfiles
"use 'e #<N' to open the file
"这个只适用于当前这个会话访问的文件，重新启动后，命令无效
:e #1
```


## 在 Vim 内运行外部命令

切换到命令模式 `Esc`，执行 `:!unix_command`。  
Anything run from the `:` prompt starting with a bang `!` will be run as a unix shell command.

```
:shell  :sh[ell]        start a shell
:!      :!{command}     execute {command} with a shell
```

参看 [Vim tips: Working with external commands](http://www.linux.com/learn/tutorials/442419-vim-tips-working-with-external-commands)



## 文件比较 diff

 1. 终端 Vim 比较模式命令打开两文件

    ```sh
    vim -d file1 file2
    # OR
    vimdiff file1 file2
    ```

    或者启动图形界面比较：`gvimdiff`、`vim -d -g`。

 2. 文件 file1 已经打开，再打开另一文件 file2
    
    ```vim
    "分成左右两个窗口并比较
    :vert diffsplit file2
    ```

 3. 如果已经在左右窗口打开两文件 file1 file2

    ```vim
    :diffthis
    ```
    
 4. 改变窗口内容，Vim 又没有自动更新 diff 检查

    ```vim
    :diffupdate
    ```

 5. 定位到不同点
    
    `[c` 跳到前一个不同点  
    `]c` 跳到h后一个不同点

 6. 窗口间切换
    
    `ctrl-w w` 跳到下一个窗口  
    `ctrl-w h` 跳到左侧窗口  
    `ctrl-w l` 跳到右侧窗口  
    `ctrl-w k` 跳到上方窗口  
    `ctrl-w j` 跳到下方窗口  

 7. 合并文档
    
    `dp` 将差异点的当前文档内容应用到另一文档 `diff put`   
    `do` 将差异点的另一文档的内容拷贝到当前文档 `diff get`

 8. 上下文审查和代码折叠
    
    比较及合并文件内容时，需要结合上下文来确定最终采取的操作。  
    `vimdiff` 缺省会把不同处的上下各6行的文本都显示出来以供参考。其他的相同的文本行被自动折叠。如果希望修改缺省的上下文行数为3行，可以这样设置：
    
    ```vim
    :set diffopt=context:3
    ```

    用简单的折叠命令来临时被折叠的相同的：   
    
    ```
    #展开相同的文本行
    zo  (:foldopen)
    #重新折叠
    zc  (:foldclose)
    ```



## diff 文件对比功能出错

使用 gVim 7.4 的 diff 对比功能可能会报出下面错误，原因是安装在有空格的目录中：

```
E810: Cannot read or write temp files
E97: 无法创建 diff
```

经过头疼的排查后发现问题出现在：`set diffexpr=MyDiff()`

Vim 自带的 MyDiff 函数的问题，在 _vimrc 或 .vimrc 中找到下面代码：

```vim
if &sh =~ '\<cmd'
      let cmd = '""' . $VIMRUNTIME . '\diff""'
      let eq = '"'
```

修改为：

```vim
if &sh =~ '\<cmd'
      let cmd = '"' . $VIMRUNTIME . '\diff"'
      let eq = '""'
```








