---
#layout: post
title: Bash 学习笔记
category: [Linux, Bash]
tags: [Bash, Linux]
#author: Alfred Sun
updated: 2015-05-13 22:37
keywords: bash, linux
description: 记录在学习 Bash Shell 的过程中见到的奇葩技巧
---

## bash 多行注释

单行注释，井号 # 可以搞定，下面说多行的：通过 **Here Documents** 实现。

```bash
:<<EOF
注释的代码...
EOF
```

冒号 `:` 是空命令，表示什么都不做，亦即相当于注释了。  
“EOF” 为 Here Documents 中的定义符号，名称任意，只要前后匹配就行。

Here Documents 的更多使用方法参考这里：http://tldp.org/LDP/abs/html/here-docs.html  

说明: 这种方法当注释代码里出现**变量引用**或者是**反引号**时，bash 会去尝试解析他们，会提示错误信息， 解决方法有下面几种:


<!--more-->


1) 方法一

    :<<\EOF
    注释的代码...
    EOF

2) 方法二

    :<<'EOF'
    注释的代码...
    EOF

3) 方法三

    :<<'EOF
    注释的代码...
    EOF'

4) 方法四

    :<<EOF'
    注释的代码...
    'EOF

5) 方法五

    :<<'
    注释的代码...
    '









