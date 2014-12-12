---
layout: post
title: "在 Windows7 下从头开始安装部署 Octopress"
date: 2012-03-12 09:14
comments: true
categories: [octopress, github]
#published: false 
#toc: true
---

## 进入 Octopress 的世界

### Octopress 简介

* [Octopress](http://octopress.org/) 是一款基于 [Jekyll](http://jekyllrb.com/) 的静态站点生成系统。
  - 使用 Markdown 标记语言书写源文件， 通过 Markdown 解析器转换为 HTML 文件
  - 通过 Octopress 提供的站点模板提供所需的 Web 资产文件 （Javascript、CSS、image 等）
  - 只包含静态网页，无需数据库支持，对系统要求低且迁移方便  
  - 以编写程序的方式编制网站，便于实现版本控制
* [Octopress](http://octopress.org/) / [Jekyll](http://jekyllrb.com/) 使用简洁的Ruby框架实现。
  - Octopress 以 rake 任务的形式实现静态站点页面生成, 操作十分简单
  - Octopress 以 rake 任务的形式实现到普通网站和 [Github](http://github.com) 的发布 
  - Octopress 与 Github 完美结合，你无需学习过多的 git 命令语法，使非专业人士的使用成为可能

<!--more-->

### 在 Windows 7 下安装必要的软件

* Octopress 在 git 中维护，需要安装 git
  - 到 [msysgit](http://code.google.com/p/msysgit/downloads/list) 查找下载最新版本
  - 当前的最新版本 Git-1.7.9-preview20120201.exe，下载后直接安装
* Octopress/Jekyll 是 ruby 应用程序，需要安装 ruby 
  - 到 [RailsInstaller](http://rubyforge.org/frs/?group_id=167) 查找下载最新版本
  - Octopress 要求安装 [rubyinstaller-1.9.2-p290](http://rubyforge.org/frs/download.php/75127/rubyinstaller-1.9.2-p290.exe)
    - Jekyll 要求安装 [rubyinstaller-1.9.1-p430](http://rubyforge.org/frs/download.php/72075/rubyinstaller-1.9.1-p430.exe) 
  - 安装后，确保 `C:\Ruby192\bin` 在 Windows 当前用户的 `PATH` 环境变量中  
* ruby 的模块工具 gem 在生成本地模块时可能需要用到编译环境
  - 有两种选择 [MinGW and MSYS](http://www.mingw.org/) 或 [RubyInstaller DevKit](https://github.com/oneclick/rubyinstaller/wiki/development-kit)
  - 本文选择 RubyInstaller 推荐的 [RubyInstaller DevKit](https://github.com/oneclick/rubyinstaller/wiki/development-kit)
  - 下载 [RubyInstaller DevKit](https://github.com/downloads/oneclick/rubyinstaller/DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe)
  - 安装需执行如下步骤
    + 将 DevKit 自解压包释放到 C:\DevKit 
	+ 在 Windows CMD 窗口中执行  `ruby dk.rb init` 
	+ 在 Windows CMD 窗口中执行  `ruby dk.rb install`
* jekyll/Octopress 使用 Python 编写的代码加亮系统 pygments，需要安装 python（可选）
  - 到 [ActiveState](http://www.activestate.com/activepython) 下载 最新的 ActivePython-2.7 版
  - 执行安装程序
  - 在 Windows CMD 窗口中执行  `easy_install pygments`

### 软件安装后的 Windows 7 环境说明和配置

* 两种命令行环境
  - Windows 7 自己的 CMD窗口，用于输入 DOS 类命令
  - MINGW/Git Bash 窗口启动了 bash，可以输入 Linux 类命令
* 环境变量
  - 在 Windows 的 “高级系统设置” 中设置的 环境变量 可以被 MINGW 窗口**继承**
    - 设置 `LANG` 和 `LC_ALL` 两个环境变量，其值均设置为 `zh_CN.UTF-8`
	- 在 CMD 窗口中测试： `echo %LANG%   %LC_ALL%` 
	- 在 MINGW 窗口中测试： `echo $LANG   $LC_ALL`
  - MINGW/Git Bash 窗口启动了 bash，可以使用 `~/.bash_profile` 环境设置文件设置环境变量、命令别名等 
    - `$ echo "export LANG LC_ALL" > ~/.bash_profile`
    - `$ echo "alias ll='ls -l --color=tty'"  >> ~/.bash_profile`
    - `$ echo "alias ls='ls --color=tty'"     >> ~/.bash_profile`
    - **注意：若希望`~/.bash_profile`中的设置生效，请启动 MINGW/Git Bash 窗口，而不是Windows 的 CMD窗口**

### ruby 环境的初始配置

* 设置 gem 的更新源
  - `gem sources --remove http://rubygems.org/`
  - `gem sources -a http://ruby.taobao.org/`
  - `gem sources -l # 请确保只有 http://ruby.taobao.org 一行输出`
* 安装 rdoc 和 bundler
  - `gem install rdoc bundler`

### 安装 Octopress

```bash
# 1. 克隆 Octopress
$ mkdir ~/repos
$ cd ~/repos
$ git clone git://github.com/imathis/octopress.git sinosmond.github.com
$ cd ~/repos/sinomsond.github.com
# 2. 修改 Octopress 的 GEM 源
$ vi Gemfile    # 或 notepad Gemfile
将行 ： source "http://rubygems.org/"
改为 ： source "http://ruby.taobao.org/"
# 3. 安装 Octopress 所需的GEM组件
$ bundle install
```

### 生成 Octopress 的模版文件

```bash
$ rake install
rake aborted!
You have already activated rake 0.9.2.2, but your Gemfile requires rake 0.9.2. 
Using bundle exec may solve this.

(See full trace by running task with --trace)
```

#### 解决方法

1. `$ bundle update; rake install`
2. 调整 rake
  - 在 WINDOWS 的 CMD 窗口里：修改 rake.bat 文件
  - 在 GIT BASH 里：设置别名
^
```bash
$ echo "alias rake='bundle exec rake'" >> ~/.bash_profile
$ . ~/.bash_profile
$ alias
alias rake='bundle exec rake'
$ rake install
```

### git 和 github

* 学习 git 参考
  - [为啥 Git 最棒](http://zh-cn.whygitisbetterthanx.com/)
  - [git - 简易指南](http://rogerdudler.github.com/git-guide/index.zh.html)
  - [git 魔法](http://www-cs-students.stanford.edu/~blynn/gitmagic/intl/zh_cn/) -- [git](https://github.com/blynn/gitmagic)
  - [10篇写给Git初学者的最佳教程](http://www.kuqin.com/managetool/20110705/92113.html)
* 学习 Github 参考
  - [如何高效利用GitHub](http://www.yangzhiping.com/tech/github.html)
  - [GotGitHub](http://www.worldhello.net/gotgithub/)
  - [The GitHub Hep](http://help.github.com/)

### 设置本地仓库和远程仓库的关联
  
* 创建 github 账号和仓库  
  - 下面的操作假定您注册了 `<USERNAME>` 的账号
  - 下面的操作假定您创建了 `<USERNAME>.github.com` 的仓库
  - 本例使用 sinosmond.github.com，请用 `<USERNAME>.github.com` 替换之 
* 在本地版本库中设置远程版本库的别名  
  - `$ git remote add myblog git@github.com:sinosmond/sinosmond.github.com.git`

##  配置和使用 Octopress 
  
### Octopress 的基本配置
  
- 编辑 _config.yml 文件 ，根据您自己的需要修改其值, [参考](http://octopress.org/docs/configuring/)
- **若文件中包括中文，则存成 UTF-8 编码格式** 
^
```yaml
# ----------------------- #
#      Main Configs       #
# ----------------------- #
url:                # For rewriting urls for RSS, etc
title:              # Used in the header and title tags
subtitle:           # A description used in the header
author:             # Your name, for RSS, Copyright, Metadata
simple_search:      # Search engine for simple site search
description:        # A default meta description for your site
subscribe_rss:      # Url for your blog's feed, defauts to /atom.xml
subscribe_email:    # Url to subscribe by email (service required)
email:              # Email address for the RSS feed if you want it.
```
 

### 编辑新页面

- 生成 BLOG/静态 页面  
  * `rake new_post["article name"]` : 生成指定的 Blog 初始页面
  * `rake new_page["page name"]` : 生成指定的静态初始页面
- 使用你惯用的编辑器修改新生成的文件
  * 使用 YAML 语法设置本页面属性，用 Markdown 语法书写文章内容
  * **若文件中包括中文，则存成 UTF-8 编码格式** 
  * [Markdown 语法说明](http://wowubuntu.com/markdown/)
  * [Markdown: Dingus](http://daringfireball.net/projects/markdown/dingus) 是一个在线转换工具
  * 若使用 kramdown 解析器，参考 [kramdown 语法](http://kramdown.rubyforge.org/syntax.html) 
  * [Markdown 和多种标记语言的在线转换](http://johnmacfarlane.net/pandoc/try)
  * [Markdown 多种实现的在线比较](http://babelmark.bobtfish.net/)

### 首次提交到 Github

1. `rake setup_github_pages` ： 配置 octopress 与 github 的连接
2. `rake generate` ： 生成静态文件
3. `rake preview` ： 在本机4000端口生成访问内容
4. `rake deploy` ：  发布文件到 github


### 使用 rake 任务管理 BLOG 

```bash
$ rake -T
rake clean                     # Clean out caches: .pygments-cache, .gist-c...
rake copydot[source,dest]      # copy dot files for deployment
rake deploy                    # Default deploy task
rake gen_deploy                # Generate website and deploy
rake generate                  # Generate jekyll site
rake install[theme]            # Initial setup for Octopress: copies the de...
rake integrate                 # Move all stashed posts back into the posts...
rake isolate[filename]         # Move all other posts than the one currentl...
rake list                      # list tasks
rake new_page[filename]        # Create a new page in source/(filename)/ind...
rake new_post[title]           # Begin a new post in source/_posts
rake preview                   # preview the site in a web browser
rake push                      # deploy public directory to github pages
rake rsync                     # Deploy website via rsync
rake set_root_dir[dir]         # Update configurations to support publishin...
rake setup_github_pages[repo]  # Set up _deploy folder and deploy branch fo...
rake update_source[theme]      # Move source to source.old, install source ...
rake update_style[theme]       # Move sass to sass.old, install sass theme ...
rake watch                     # Watch the site and regenerate when it changes
```

### 进一步配置 Octopress 

- 配置 社会化网络 应用
- 选择您中意的网站注册，获得用户名或网络代码，将代码存入 `source/_includes/{post,custom}` 目录   


|     类型       |     国外服务     |    国内服务     |
|    Feed烧制    |   [FeedBurner](http://feedburner.google.com)          |  [FeedSky](http://www.feedsky.com/)              |
|    分享到      |   [AddThis](http://www.addthis.com/)  | [JiaThis](http://www.jiathis.com/) |
|    微博        |   Twitter | weibo.com  |
|    网络书签    |   [Delicious](http://delicious.com/), [Google Bookmarks](http://www.google.com/bookmarks) | [QQ书签](http://shuqian.qq.com/), [百度搜藏](http://cang.baidu.com/) |
|    网络图床    |   [Flickr](http://www.flickr.com/) | [yupoo](http://www.yupoo.com/) , [POCO](http://www.poco.cn/) |
|    网络评论    |   [Disqus](http://disqus.com/) | [友言](http://uyan.cc/) |

^


### 配置举例1：为每一篇BLOG结尾添加 “JiaThis”

1、在 `_config.yml` 尾部添加如下行

```yaml
# JiaThis
jiathis: true
```

2、在 `source/_includes/post/sharing.html` 尾部的`</div>`之前添加如下行

{% raw %}
```
{% if site.jiathis %}
  {% include post/jiathis.html %}
{% endif %}   
```
{% endraw %}

3、创建 `source/_includes/post/jiathis.html ` 文件，将从[JiaThis](http://www.jiathis.com/)获得的代码放入其中


### 配置举例2： 配置侧栏

- 在 `_config.yml` 中指定显示内容和显示顺序
- 显示内容
  * 系统默认的显示边栏的内容基于 source/_includes 目录保存为 `asides/*.html`
  * 用户自定义的边栏内容基于 source/_includes 目录保存为 `custom/asides/*.html`
- 显示顺序
  * `blog_index_asides` 控制BLOG首页的边栏显示
  * `post_asides` 控制每一个单独的BLOG页面显示时的边栏（对应 `rake new_post[]`）
  * `page_asides` 控制静态页面显示时的边栏（对应 `rake new_page[]`）
^
```yaml
blog_index_asides:
- custom/asides/feeds.html
- asides/recent_posts.html
- custom/asides/recent_comments.html
- custom/asides/opers.html
- asides/github.html
- asides/twitter.html
- asides/delicious.html
- asides/pinboard.html
- asides/googleplus.html
- custom/asides/weibo.html
- custom/asides/copyleft.html

post_asides:
- asides/recent_posts.html
- custom/asides/recent_comments.html
- custom/asides/opers.html
- custom/asides/copyleft.html

page_asides:
- asides/recent_posts.html
- custom/asides/recent_comments.html
- custom/asides/copyleft.html
```

### 更新管理源码的仓库分支 

```bash
git add .
git commit -m "add some changes"
git push myblog source
```

### 参考链接

- http://chen.yanping.me/cn/blog/2011/12/26/octopress-on-windows/
- http://blog.devtang.com/blog/2012/02/10/setup-blog-based-on-github/
- http://www.yangzhiping.com/tech/octopress.html
- http://blog.xupeng.me/2011/12/14/migrate-to-octopress/
