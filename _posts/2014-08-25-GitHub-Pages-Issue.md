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


## 5. Liquid Exception: cannot load such file -- yajl/2.0/yajl

windows下如果以pygments.rb为高亮plugin，并使用Ruby 2.0及以上版本，会出现如下错误：

![yajl load error]({{ site.picture_dir }}/github-pages-issue/yajl_load_error.gif "cannot load yajl")


原因是install的预编译 yajl-ruby gems `x86-mingw32` 无法兼容 Ruby 2.0   
下面是 [RubyInstaller announcement for Ruby 2.0.0 release][RubyInstaller 2.0]:

```
* Existing pre-compiled gems are not Ruby 2.0 compatible 

Ruby 2.0 introduces ABI breakage which means compiled C extensions with previous 
1.9.3 will work with Ruby 2.0. 

DO NOT install Ruby 2.0 on top of existing Ruby 1.9.3, or try to use compiled 
extensions with it. 

You will be required to force compilation of those gems: 

    gem install <name> --platform=ruby 

This will require you have the extra dependencies required for that gem to 
compile. Look at the gem documentation for the requirements. 
```

解决方法，要么改用1.9.x的 Ruby ，要么下载要求的[.gem][yajl]文件(not the pre-compiled one)，重新安装`yajl`

```sh
gem uninstall yajl-ruby
# 删除存在的问题 gems (x86-mingw32)
gem install yajl-ruby -v 1.1.0 --platform=ruby
# 安装要求的gem文件(必需指定version，pygments.rb 0.6.0 只依赖 yajl-ruby 1.1.0)
bundle check
```

__Note:__   
Bundler will keep attempting to install x86-mingw32, so you will need to be careful when doing `bundle install` or `bundle update`.

或者也可以试试下载[.gem][yajl]文件，本地编译，不过windows下面可能不行，因为没有`Make`命令。

```sh
# build it yourself by installing rubyinstaller, the devkit and running:
gem install gem-compiler
gem fetch yajl-ruby --platform=ruby -v 1.1.0
gem compile yajl-ruby-1.1.0.gem

# to use the binary gem:
gem uninstall yajl-ruby
gem install yajl-ruby-1.1.0.gem
```

相关的 yajl-ruby issue:   
https://github.com/brianmario/yajl-ruby/issues/116   
https://github.com/jekyll/jekyll-help/issues/50

[RubyInstaller 2.0]: https://groups.google.com/d/msg/rubyinstaller/mg5ailNICvM/QbBfNByec-0J
[yajl]: http://rubygems.org/gems/yajl-ruby/versions/1.1.0

## 6. Liquid Exception: No such file or directory - python C:/Ruby193/lib/ruby/gems/1.9.1/gems/pygments.rb-0.5.0/lib/pygments/mentos.py

Check your `PATH` environment variable, like `;C:\python27`;   
Make sure that have installed Python 2.x and set env path for pygments.rb call.

相关的 Jekyll issue: https://github.com/jekyll/jekyll/issues/2551

__Note:__   
之所以要安裝 Python 是因為 代码高亮 plugin -- [pygments.rb][]，是基于 Python 的代码高亮工具 [Pygments][] 的一个 Ruby wrapper，雖然 Pygments 支援 Python 2 版和 3 版，不過由於 Ruby 和 Python 之間的橋接是用 RubyPython 完成，而 [rubypython][] 目前只支援 Python 2。所以還是乖乖安裝 2 版吧！（见pygments.rb的`README.md`）

[pygments.rb]: https://github.com/tmm1/pygments.rb
[Pygments]: http://pygments.org/
[rubypython]: http://www.rubydoc.info/gems/rubypython/0.6.3/frames#Requirements

## 7. 关于代码高亮

- 用js插件：[DlHightLight][1]或**[Google Code Prettify][2]**或<u>**[Highlight.js][3]**</u>或**[dp.SyntaxHighlighter][4]**
- 用gist：推荐菜鸟使用，省心省事，支持语言多
- 用pygment：要安装python以及python的包管理软件，定制code style CSS文件，又是个大坑，不建议菜鸟使用，尤其是使用windows的

[1]: http://mihai.bazon.net/projects/javascript-syntax-highlighting-engine
[2]: https://code.google.com/p/google-code-prettify/
[3]: https://github.com/isagalaev/highlight.js
[4]: http://alexgorbatchev.com/SyntaxHighlighter/


## 8. markdown extension

There are two ways to strengthen the code style: one is to indent 4 spaces or 1 tab, the other is to use `{` `% highlight %}` tag to parse the code block.

Now GitHub provides another approach to do it: use triple backticks to format text as its own distinct block.

Yes, it's OK to use like that and the result is similar to highlight block. But I found that by the second way only redcarpet and kramdown can identify the code language and render it with html; rdiscount won't add specific html and css to improve the code style.

