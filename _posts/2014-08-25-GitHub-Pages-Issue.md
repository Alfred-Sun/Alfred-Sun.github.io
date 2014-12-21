---
layout: post
title: GitHub Pages Issue
category: GitHub Pages
keywords: github pages, issue
description: 
---

## 1. if the blog is forked from other, then must update and commit at least one time before it works with GitHub.

## 2. if not, had better open the blog link from GitHub sites, rather than direct link.

## 3. GitHub Pages directory: _site

missing, and don't know why ?

## 4. should install bellows:

<!--more-->

https://github.com/oneclick/rubyinstaller/wiki/Development-Kit
http://rubyinstaller.org/add-ons/devkit
Install Python 2.x and set env path for pygments
(also need to re-build yajl-ruby using 1.1.0 when your local ruby is 2.XX)
(之所以要安裝 Python 是因為 代碼上色 plugin 是用 Python 的一個開源項目：Pygment，雖然 Pygment 支援 Python 2 版和 3 版，不過由於 Ruby 和 Python 之間的橋接是用 RubyPython 完成，而 RubyPython 目前只支援 Python 2。所以還是乖乖安裝 2 版吧！)

## 5. 关于代码高亮

- 用js插件：[DlHightLight][1]或**[Google Code Prettify][2]**或<u>**[Highlight.js][3]**</u>或**[dp.SyntaxHighlighter][4]**
- 用gist：推荐菜鸟使用，省心省事，支持语言多
- 用pygment：要安装python以及python的包管理软件，定制code style CSS文件，又是个大坑，不建议菜鸟使用，尤其是使用windows的

[1]: http://mihai.bazon.net/projects/javascript-syntax-highlighting-engine
[2]: https://code.google.com/p/google-code-prettify/
[3]: https://github.com/isagalaev/highlight.js
[4]: http://alexgorbatchev.com/SyntaxHighlighter/


## 6. markdown extension

There are two ways to strengthen the code style: one is to indent 4 spaces or 1 tab, the other is to use `{` `% highlight %}` tag to parse the code block.

Now GitHub provides another approach to do it: use triple backticks to format text as its own distinct block.

Yes, it's OK to use like that and the result is similar to highlight block. But I found that by the second way only redcarpet and kramdown can identify the code language and render it with html; rdiscount won't add specific html and css to improve the code style.

