---
layout: post
title: "在 Windows7 下从头开始安装部署 Octopress"
date: 2014-11-23 09:14
categories: [Octopress, GitHub Pages]
tags: [Octopress, GitHub Pages]
author: sinosmond
updated: 2015-02-06 16:25
external-url: http://sinosmond.github.io/blog/2012/03/12/install-and-deploy-octopress-to-github-on-windows7-from-scratch/
keywords: Octopress, GitHub Pages, Win 7
description: 介绍如何在 Windows 7 下从头开始安装、配置、使用 Octopress，并说明如何部署到 GitHub
#toc: true
---

## 进入 Octopress 的世界

### Octopress 简介

* [Octopress](http://octopress.org/) 是一款基于 [Jekyll](http://jekyllrb.com/) 的静态网站生成系统。
  - 使用 Markdown 标记语言书写源文件，通过 Markdown 解析器转换为 HTML 文件
  - 通过 Octopress 提供的站点模板提供所需的 Web 资产文件 （Javascript、CSS、image 等）
  - 只包含静态网页，无需数据库支持，对系统要求低且迁移方便  
  - 以编写程序的方式编制网站，便于实现版本控制
* [Octopress](http://octopress.org/) / [Jekyll](http://jekyllrb.com/) 使用简洁的 Ruby 框架实现。
  - Octopress 以 rake 任务的形式实现静态站点页面生成, 操作十分简单
  - Octopress 以 rake 任务的形式实现到普通网站和 [Github](http://github.com) 的发布 
  - Octopress 与 Github 完美结合，你无需学习过多的 git 命令语法，使非专业人士的使用成为可能

<!--more-->

### 在 Windows 7 下安装必要的工具

* Octopress 在 Git 中维护，需要安装 Git
  - 到 [msysgit](http://git-scm.com/downloads) 查找下载最新版本（最好同时安装相应的基于Winows平台的 GUI 客户端工具，如：[**Git Extensions**](http://git-scm.com/downloads/guis)）
  - 当前的最新版本 **Git-1.9.5-preview20141217.exe**，下载后直接安装
* Octopress/Jekyll 是 Ruby 应用程序，需要安装 Ruby 
  - 到 [Installing Ruby](https://www.ruby-lang.org/en/documentation/installation/#rubyinstaller) 查看 **RubyInstaller** 安装说明
  - 要求安装 [Ruby 1.9.3](http://rubyinstaller.org/downloads/) 或更高版本（实测 Win 7 下 **ruby 2.0.0p598 (2014-11-13) [i386-mingw32]** 和 Linux 下 **ruby 2.2.0p0 (2014-12-25 revision 49005) [i686-linux]** 可用）
  - 安装后，确保 `C:\Ruby193\bin` 在 Windows 当前用户的 `PATH` 环境变量中  
* Ruby 的模块工具 gem 在生成本地模块时可能需要用到编译环境
  - 有两种选择：[MinGW and MSYS](http://www.mingw.org/) 或 [RubyInstaller DevKit](https://github.com/oneclick/rubyinstaller/wiki/development-kit)
  - 本文选择 RubyInstaller 推荐的 [RubyInstaller DevKit](https://github.com/oneclick/rubyinstaller/wiki/development-kit)
  - 下载 [RubyInstaller DevKit](https://github.com/downloads/oneclick/rubyinstaller/DevKit-tdm-32-4.5.2-20111229-1559-sfx.exe) （之所以要 DevKit 是因為在安裝 Octopress 時，所需要用到的 ruby gems 會需要在本地編譯，如：rdiscount）
  - 安装需执行如下步骤：（development kit 是一套基於 MSYS/MinGW 下的 C/C++ 編譯環境工具組，安裝時跟著官網上的指示即可）
      + 将 DevKit 自解压包释放到 C:\DevKit ，执行 `cd C:\DevKit`
      + 在 Windows CMD 窗口中执行  `ruby dk.rb init`  （產生 config.yaml，裡面有你的 ruby 路徑，一般會幫你設好）
      + 在 Windows CMD 窗口中执行  `ruby dk.rb install`
  - 保险起见，安装之后先更新一下 gem 是个好习惯：`gem update --system`、 `gem update`
* Jekyll/Octopress 使用 Python 编写的代码加亮系统 [Pygments](http://pygments.org/)，需要安装 Python 2.x
  - 直接在 [Python.org](https://www.python.org/downloads/) 下载安装 Python 2.7.9，确保 **“Add python.exe to Path”**
  - 或者到 [ActiveState](http://www.activestate.com/activepython) 下载最新的 ActivePython-2.7 版 (~~_执行_  `easy_install pygments`~~  **Obsoleted**)

<!-- 到 [RailsInstaller](http://rubyforge.org/frs/?group_id=167) 查找下载最新版本 -->
[msysgit_old]: http://code.google.com/p/msysgit/downloads/list


### 软件安装后的 Windows 7 环境说明和配置

* 两种命令行环境
  - Windows 7 自己的 CMD 窗口，用于输入 DOS 类命令
  - MINGW/Git Bash 窗口启动了 Bash，可以输入类 Linux 命令
* 环境变量 (**可选**，Git 本身自带 Bash，安装过程会自行设置，MINGW 非必要工具)
  - 在 Windows 的 “高级系统设置” 中设置的 环境变量 可以被 MINGW 窗口**继承**
    - 为避免中文乱码，设置 `LANG` 和 `LC_ALL` 两个环境变量，其值均为 `zh_CN.UTF-8`
	- 在 CMD 窗口中测试： `echo %LANG%   %LC_ALL%` 
	- 在 MINGW 窗口中测试： `echo $LANG   $LC_ALL`
  - MINGW/Git Bash 窗口启动了 Bash，可以使用 `~/.bash_profile` 环境设置文件设置环境变量、命令别名等 
    - `$ echo "export LANG LC_ALL" > ~/.bash_profile`
    - `$ echo "alias ll='ls -l --color=tty'"  >> ~/.bash_profile`
    - `$ echo "alias ls='ls --color=tty'"     >> ~/.bash_profile`
    - **注意：若希望`~/.bash_profile`中的设置生效，请启动 MINGW/Git Bash 窗口，而不是Windows 的 CMD窗口**

### ruby 环境的初始配置

* 设置 gem 的更新源
  - `gem sources --remove http://rubygems.org/`
  - `gem sources -a http://ruby.taobao.org/`
  - `gem sources -l # 请确保只有 http://ruby.taobao.org 一行输出`
* 安装 bundler
  - `gem install bundler`

### 安装 Octopress

```bash
# 1. 进入 Bash 环境，克隆 Octopress 到本地代码仓库
$ mkdir ~/repos
$ cd ~/repos
$ git clone git://github.com/imathis/octopress.git octopress
$ cd ~/repos/octopress
# 2. 修改 Octopress 的 GEM 源
$ vim Gemfile    # 或 notepad Gemfile
将行 ： source "http://rubygems.org/"
改为 ： source "http://ruby.taobao.org/"
# 3. 安装 Octopress 所需的 GEM 组件 (Gemfile)
$ bundle install
```

### 生成 Octopress 默认模版文件

```bash
$ rake install  # 或者 "rake install[classic]"  安裝預設的 Octopress 樣式
rake aborted!
You have already activated rake 0.9.2.2, but your Gemfile requires rake 0.9.2. 
Using bundle exec may solve this.

(See full trace by running task with --trace)
```

#### 解决方法

1. `$ bundle update; rake install`
2. 调整 rake
  - 在 Windows 的 CMD 窗口里：修改 rake.bat 文件
  - 在 Git Bash 里：设置别名

```bash
$ echo "alias rake='bundle exec rake'" >> ~/.bash_profile
$ . ~/.bash_profile
$ alias
alias rake='bundle exec rake'
$ rake install
```

### Git 和 GitHub

* 学习 Git 参考
  - [为啥 Git 最棒](http://zh-cn.whygitisbetterthanx.com/)
  - [git - 简易指南](http://rogerdudler.github.com/git-guide/index.zh.html)
  - [git 魔法](http://www-cs-students.stanford.edu/~blynn/gitmagic/intl/zh_cn/) -- [git](https://github.com/blynn/gitmagic)
  - [10篇写给Git初学者的最佳教程](http://www.kuqin.com/managetool/20110705/92113.html)
* 学习 GitHub 参考
  - [如何高效利用GitHub](http://www.yangzhiping.com/tech/github.html)
  - [GotGitHub](http://www.worldhello.net/gotgithub/)
  - [The GitHub Hep](http://help.github.com/)

### 设置本地仓库和远程仓库的关联

**创建 GitHub 账号和仓库**

  - 假定您注册了 `<USERNAME>` 的账号
  - 下面的操作假定您创建了 `octopress` 的仓库，部署为 **GitHub Project Pages**
      - 在本地版本库中设置远程版本库的别名  
        - `$ git remote add myblog git@github.com:alfred/octopress.git`
  - 下面的操作假定您创建了 `<USERNAME>.github.io` 的仓库，部署为 **GitHub User Pages**
      - 本例使用 alfred.github.io，请用 `<USERNAME>.github.io` 替换之 
      - 在本地版本库中设置远程版本库的别名  
        - `$ git remote add myblog git@github.com:alfred/alfred.github.io.git`

##  配置和使用 Octopress 
  
### Octopress 的基本配置
  
- 编辑 _config.yml 文件 ，根据您自己的需要修改其值，[参考](http://octopress.org/docs/configuring/)
- **若文件中包括中文，则存成 UTF-8 编码格式** 

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

- 生成 Blog/静态 页面  
  * `rake new_post["article name"]` : 生成指定的 Blog Post 初始页面
  * `rake new_page["page name"]` : 生成指定的静态初始页面
- 使用你惯用的编辑器修改新生成的文件
  * 使用 YAML 语法设置本页面属性，用 Markdown 语法书写文章内容
  * **若文件中包括中文，则存成 UTF-8 编码格式**
  * [**讲解 Markdown**]({% post_url 2015-01-10-markdown-syntax-documentation %})
  * [Markdown 语法说明](http://alfred-sun.github.io/markdown-syntax-zhtw/)
  * [Markdown: Dingus](http://daringfireball.net/projects/markdown/dingus) 是一个在线转换工具
  * 若使用 kramdown 解析器，参考 [kramdown 语法](http://kramdown.rubyforge.org/syntax.html) 
  * [Markdown 和多种标记语言的在线转换](http://johnmacfarlane.net/pandoc/try)
  * [Markdown 多种实现的在线比较](http://babelmark.bobtfish.net/)
- **不能在 ZSH 中输入命令的问题**  
    Octopress 提供了许多 Rake 任务，可以方便地完成一些操作。  
    常用的命令是 `rake new_post["title"]`，但是在 ZSH 下，输入这样的命令，会提示错误：
    
    ```
    zsh: no matches found: new_post[...]
    ```

    原因是诸如 `[]` 之类的不是正确的命令字符。当然，我们也可以使用转义符来解决这一问题。但每次都需要敲入转义符，实在是太麻烦了。  
    解决方案是命令改成 `rake 'new_post[title]'`，或者在 `~/.zshrc` 文件下，加这一行内容：
    
    ```bash
    alias rake="noglob rake"    # 停止 wildcard 功能
    ```


### 首次提交到 GitHub

1. `rake setup_github_pages` ：配置 Octopress 与 GitHub 的连接，[参考](http://octopress.org/docs/deploying/github/)
2. `rake generate` ：生成静态文件
3. `rake watch` ：监听 source 和 sass 目录中源文件的变动并重新生成
4. `rake preview` ：监听并在本机 4000端口生成访问内容 http://localhost:4000
5. `rake deploy` ：发布生成的网站文件到 GitHub（不建议该方式；由于 Octopress 只发布生成的文件，建议将生成静态文件操作和 Git 操作分离 ["Unix 哲学"](http://en.wikipedia.org/wiki/Unix_philosophy#Mike_Gancarz:_The_UNIX_Philosophy "Make each program do one thing well")）


### 使用 rake 任务管理 Blog

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


### 更新远程管理源码的仓库分支 

```bash
git add .
git commit -m "your message"
git push myblog source
```


### 进一步配置 Octopress 

- 配置 社会化网络 应用
- 选择您中意的网站注册，获得用户名或网络代码，将代码存入 `source/_includes/{post,custom}` 目录   


|     类型       |     国外服务     |    国内服务     |
|----------------|------------------|-----------------|
|    Feed 烧制   | [FeedBurner](http://feedburner.google.com) | [FeedSky](http://www.feedsky.com/) |
|    分享到      | [AddThis](http://www.addthis.com/) | [JiaThis](http://www.jiathis.com/)， [百度分享](http://share.baidu.com/) |
|    微博        | Twitter | weibo.com |
|    网络书签    | [Delicious](http://delicious.com/)， [Google Bookmarks](http://www.google.com/bookmarks) | [QQ书签](http://shuqian.qq.com/)， [百度搜藏](http://cang.baidu.com/) |
|    网络图床    | [Flickr](http://www.flickr.com/)， [Imgur](http://imgur.com/) | [yupoo](http://www.yupoo.com/)， [POCO](http://www.poco.cn/) |
|    网络评论    | [Disqus](http://disqus.com/) | [友言](http://uyan.cc/)， [多说](http://duoshuo.com/) |
|    数据统计    | [Google Analytics](http://www.google.com/analytics/) | [百度统计](http://tongji.baidu.com/web/welcome/login)， [CNZZ](http://www.cnzz.com/) |



### 配置举例1：为每一篇Blog结尾添加 “JiaThis”

1、在 `_config.yml` 尾部添加如下行

```yaml
# JiaThis
jiathis: true
```

2、在 `source/_includes/post/sharing.html` 尾部的 `</div>` 之前添加如下行

{% raw %}
```
{% if site.jiathis %}
  {% include post/jiathis.html %}
{% endif %}   
```
{% endraw %}

3、创建 `source/_includes/post/jiathis.html ` 文件，将从 [JiaThis](http://www.jiathis.com/) 获得的代码放入其中


### 配置举例2： 配置侧栏

- 在 `_config.yml` 中指定显示内容和显示顺序
- 显示内容
  * 系统默认的显示边栏的内容基于 source/_includes 目录保存为 `asides/*.html`
  * 用户自定义的边栏内容基于 source/_includes 目录保存为 `custom/asides/*.html`
- 显示顺序
  * `blog_index_asides` 控制Blog主页的边栏显示
  * `post_asides` 控制每一个单独的Blog页面显示时的边栏（对应 `rake new_post[]`）
  * `page_asides` 控制静态页面显示时的边栏（对应 `rake new_page[]`）

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



### 一些 Octopress 资源

- 使用 Octopress 的 Sites 示例  
  https://github.com/imathis/octopress/wiki/Octopress-Sites
- 第三方主题模板  
  https://github.com/imathis/octopress/wiki/3rd-Party-Octopress-Themes


## 更新本地 Octopress 

### 如何更新

```bash
git pull octopress master     # Get the latest Octopress
bundle install                # Keep gems updated
rake update_source            # update the template's source
rake update_style             # update the template's style
```

更新 Octopress 的 插件、模板主题、gemfiles、rakefile 和 配置文件，保留用户的文件改动，[参考](http://octopress.org/docs/updating/)。

`rake update` ： 更新模板的 `/source` 和 `/sass` 目录，等同于一起执行 `update_style` 和 `update_source`。


### 更新模板的 Style 文件

用 pull 的新代码，更新本地仓库的 `/sass` 目录：

```bash
rake update_style
```

1. 移动 `/sass` 到 `/sass.old`
2. 复制 `.themes/classic/sass` 到 `/sass`
3. 用 `/sass.old/custom` 替换 `/sass/custom`


### 更新模板的 Source 目录

用 pull 的新代码，更新本地仓库的 `/source` 目录：

```bash
rake update_source
```

1. 移动 `/source` 到 `/source.old`
2. 复制 `.themes/classic/source` 到 `/source`
3. Copy back everything in `/source.old` (`cp -rn` - without replacing)
4. 用 `/source.old/_includes/custom/` 替换 `/source/_includes/custom/`

这样，那些新加的文件（如：`_posts`、`about.html` 等），还有用户在 `source/_includes/custom` 定制的文件，都能保留下来。




## 参考链接

- http://agiledon.github.io/blog/2012/12/25/octopress-issues-solution-and-tips/
- http://tonytonyjan.net/2012/03/01/install-octopress-on-windows/
- http://chen.yanping.me/cn/blog/2011/12/26/octopress-on-windows/
- http://blog.devtang.com/blog/2012/02/10/setup-blog-based-on-github/
- http://www.yangzhiping.com/tech/octopress.html
- http://blog.xupeng.me/2011/12/14/migrate-to-octopress/
