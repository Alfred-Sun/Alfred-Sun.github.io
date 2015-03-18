---
layout: post
title: GitHub Pages 静态博客 - 个人建站实录
category: GitHub Pages
tags: [Jekyll, Git, GitHub Pages]
author: Alfred Sun
updated: 2015-03-09 23:18
external-url: http://beiyuu.com/github-pages/
keywords: GitHub Pages, Jekyll, Ruby, Git
description: 详述建立 GitHub Pages 静态博客网站过程，Github本身就是不错的代码社区，他也提供了一些其他的服务，比如Github Pages，使用它可以很方便的建立自己的独立博客，并且免费。
---

[GitHub][] 很好的将代码和社区联系在了一起，于是发生了很多有趣的事情，世界也因为他美好了一点点。GitHub作为现在最流行的代码仓库，已经得到很多大公司和项目的青睐，比如 [jQuery][]、[Twitter][]等。为使项目更方便的被人理解，介绍页面少不了，甚至会需要完整的文档站，GitHub 替你想到了这一点，他提供了 [GitHub Pages][] 的服务，不仅可以方便的为项目建立介绍站点，也可以用来建立个人博客。

GitHub Pages 有以下几个优点：

<ul>
    <li>轻量级的博客系统，没有麻烦的配置</li>
    <li>免费空间，享受 Git 版本管理功能</li>
    <li>使用标记语言，比如 <a href="http://wowubuntu.com/markdown/">Markdown</a></li>
    <li>无需自己搭建服务器</li>
    <li>可以绑定自己的域名</li>
</ul>

<!--more-->

当然他也有缺点：

* 使用 [Jekyll][] 模板系统，相当于静态页发布，适合博客，文档介绍等
* 动态程序的部分相当局限，比如没有评论，不过还好我们有解决方案
* 基于 Git，很多东西需要定制，不像 Wordpress 有强大的后台
* 根据 GitHub 的限制，对应的每个站有 [1GB 免费空间](https://help.github.com/articles/troubleshooting-github-pages-build-failures/#size-limits)
* 不适合大型网站，因为没有用到数据库，每运行一次都必须遍历全部的文本文件，网站越大，生成时间越长（可以通过上传 Jekyll 本地最终生成的网页来解决）
* 网站源码基本上公开，被人 Fork 后，文章转载泛滥

大致介绍到此，作为个人博客来说，简洁清爽的表达自己的工作、心得，就已达目标，所以GitHub Pages是我认为此需求最完美的解决方案了。



## 购买、绑定独立域名

虽说 [Godaddy][] 曾支持过 SOPA，并且首页放着极其不专业的大胸美女，但是作为域名服务商他做的还不赖，选择它最重要的原因是他支持支付宝，没有信用卡有时真的很难过。

域名的购买不用多讲，注册、选域名、支付，有网购经验的都毫无压力，优惠码也遍地皆是。域名的配置需要提醒一下，因为伟大英明的GFW的存在，我们必须多做些事情。

流传 Godaddy 的域名解析服务器被墙掉，导致域名无法访问，后来这个事情在 [BeiYuu][] 也发生了，不得已需要把域名解析服务迁移到国内比较稳定的服务商处，这个迁移对于域名来说没有什么风险，最终的控制权还是在 Godaddy 那里，你随时都可以改回去。

我们选择 [DNSPod][] 的服务，他们的产品做得不错，易用、免费，收费版有更高端的功能，暂不需要。注册登录之后，按照 DNSPod 的说法，只需三步（我们插入一步）：

<ul>
	<li>首先添加域名记录，可参考 DNSPod 的帮助文档：<a href="https://www.dnspod.cn/Support">https://www.dnspod.cn/Support</a></li>
	<li>在DNSPod自己的域名下添加一条<a href="http://baike.baidu.com/view/65575.htm">A记录</a>，地址就是Github Pages的服务IP地址：207.97.227.245</li>
	<li>在域名注册商处修改DNS服务:去Godaddy修改Nameservers为这两个地址：f1g1ns1.dnspod.net、f1g1ns2.dnspod.net。如果你不明白在哪里修改，可以参考这里：<a href="https://www.dnspod.cn/support/index/fid/119">Godaddy注册的域名如何使用DNSPod</a></li>
	<li>等待域名解析生效</li>
</ul>

域名的配置部分完成，跪谢方校长。



## 配置和使用 GitHub

Git 是版本管理的未来，他的优点我不再赘述，相关资料很多。推荐这本[Git中文教程][4]。

> _如果想深入了解 Git，请看 [《10篇写给Git初学者的最佳教程》](http://www.kuqin.com/managetool/20110705/92113.html)。_

要使用 [Git](http://git-scm.com/downloads)，需要安装它的客户端，推荐在Linux下使用 Git，会比较方便。Windows版的下载地址在这里：[http://code.google.com/p/msysgit/downloads/list](http://code.google.com/p/msysgit/downloads/list "Windows版Git客户端")，或者直接安装 [**GitHub for Windows**](https://windows.github.com/)（过程可能有些慢，但就不需要做下面配置了，图形界面，简单易用）客户端。其他系统的安装也可以参考官方的[安装教程][5]。

下载安装客户端之后，各个系统的配置就类似了，我们使用windows作为例子，Linux和Mac与此类似。

在Windows下，打开Git Bash，其他系统下面则打开终端（Terminal）：
![Git Bash]({{ site.picture_dir }}/github-pages/bootcamp_1_win_gitbash.jpg)


### 1、检查 SSH keys 的设置

首先我们需要检查你电脑上现有的 SSH key：

    $ cd ~/.ssh

如果显示“No such file or directory”，跳到第三步，否则继续。


### 2、备份和移除原来的 SSH keys 设置：

因为已经存在key文件，所以需要备份旧的数据并删除：

```sh
$ ls
config	id_rsa	id_rsa.pub	known_hosts
$ mkdir key_backup
$ cp id_rsa* key_backup
$ rm id_rsa*
```


### 3、生成新的 SSH Key：

输入下面的代码，就可以生成新的key文件，我们只需要默认设置就好，所以当需要输入文件名的时候，回车就好。

    $ ssh-keygen -t rsa -C "邮件地址@youremail.com"
    Generating public/private rsa key pair.
    Enter file in which to save the key (/Users/your_user_directory/.ssh/id_rsa):<回车就好>

然后系统会要你输入加密串（[Passphrase][6]）：

    Enter passphrase (empty for no passphrase):<输入加密串>
    Enter same passphrase again:<再次输入加密串>

最后看到这样的界面，就成功设置SSH key了：
![ssh key success]({{ site.picture_dir }}/github-pages/ssh-key-set.png)


### 4、添加 SSH Key 到 GitHub：

在本机设置SSH Key之后，需要添加到GitHub上，以完成SSH链接的设置。

用文本编辑工具打开 **id_rsa.pub** 文件，如果看不到这个文件，你需要设置显示隐藏文件。准确的复制这个文件的内容，才能保证设置的成功。

在GitHub的主页上点击设置按钮：
![github account setting]({{ site.picture_dir }}/github-pages/github-account-setting.png)

选择SSH Keys项，把复制的内容粘贴进去，然后点击Add Key按钮即可：
![set ssh keys]({{ site.picture_dir }}/github-pages/bootcamp_1_ssh.jpg)

PS：如果需要配置多个GitHub账号，可以参看这个[多个github帐号的SSH key切换](http://omiga.org/blog/archives/2269)，不过需要提醒一下的是，如果你只是通过这篇文章中所述配置了Host，那么你多个账号下面的提交用户会是一个人，所以需要通过命令`git config --global --unset user.email`删除用户账户设置，在每一个repo下面使用`git config --local user.email '你的github邮箱@mail.com'` 命令单独设置用户账户信息


### 5、测试一下

可以输入下面的命令，看看设置是否成功，`git@github.com`的部分不要修改：

    $ ssh -T git@github.com


如果是下面的反应：

    The authenticity of host 'github.com (207.97.227.239)' can't be established.
    RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
    Are you sure you want to continue connecting (yes/no)?


不要紧张，输入`yes`就好，然后会看到：

    Hi <em>username</em>! You've successfully authenticated, but GitHub does not provide shell access.


### 6、设置你的账号信息

现在你已经可以通过SSH链接到GitHub了，还有一些个人信息需要完善的。

Git会根据用户的名字和邮箱来记录提交。GitHub也是用这些信息来做权限的处理，输入下面的代码进行个人信息的设置，把名称和邮箱替换成你自己的，名字必须是你的真名，而不是GitHub的昵称。

```bash
$ git config --global user.name "你的名字"
$ git config --global user.email "your_email@youremail.com"
```

另外，GitHub 支持 HTTP 和 SSH 两种协议访问，为避免每次访问都需要权限认证，可以在本地设置一下，参考博主写的下面两篇文章：  

 - [SSH 访问自动认证授权]({% post_url 2015-01-16-create-and-initialize-repo-on-github %}/#menuIndex8)  
 - [Git Push 避免用户名和密码方法]({% post_url 2014-11-23-disable-login-each-git-push %})



#### _**设置 GitHub的 token**_

2012-4-28补充：新版的接口已经不需要配置token了，所以下面这段可以跳过了

有些工具没有通过SSH来链接GitHub。如果要使用这类工具，你需要找到然后设置你的API Token。

在GitHub上，你可以点击*Account Setting > Account Admin*：
![set ssh keys]({{ site.picture_dir }}/github-pages/bootcamp_1_token.jpg)

然后在你的命令行中，输入下面的命令，把token添加进去：

    $ git config --global user.name "你的名字"
    $ git config --global user.token 0123456789your123456789token

如果你改了 GitHub 的密码，需要重新设置 token。


### 成功了

好了，你已经可以成功连接 GitHub 了，可以进行 clone、pull、push 操作了。




## 使用 GitHub Pages 建立博客

与 GitHub 建立好链接之后，就可以方便的使用它提供的 Pages 服务，[GitHub Pages](https://help.github.com/articles/user-organization-and-project-pages/)分两种，一种是你的 GitHub 用户名建立的 `username.github.io` 这样的用户&组织页（站），另一种是依附项目的 Project  Pages。


### User & Organization Pages

两种方法都可以建立个人博客，下面以第一种为例介绍，形如`alfred-sun.github.io`这样的可访问的站，每个用户名下面只能建立一个，创建之后点击`Admin`进入项目管理，可以看到是这样的：
![user pages]({{ site.picture_dir }}/github-pages/user-pages.png)
而普通的项目是这样的，即使你也是用的`othername.github.io`：
![other pages]({{ site.picture_dir }}/github-pages/other-pages.png)

创建好`username.github.io`项目之后，提交一个`index.html`文件，然后`push`到GitHub的`master`分支（也就是普通意义上的主干）。第一次页面生效需要一些时间，大概10分钟左右（貌似木有这么慢吧 =A=）。

生效之后，访问 `username.github.io` 就可以看到你上传的页面了，[alfred-sun.github.io][7] 就是一个例子。

这样，将这个代码库 `git clone` 到本地后，并根据下面的说明搭建好本地 Jekyll 环境，就可以开始写博客了，写完后直接提交到 GitHub 的这个代码库，然后通过上面的 URL 就能看到博客的样子了。

关于第二种项目 `pages`，简单提一下，他和用户 pages 使用的后台程序是同一套，只不过它的目的是项目的帮助文档等跟项目绑定的内容，所以要在项目的 `gh-pages` 分支上提交相应的文件，GitHub 会自动帮你生成项目 pages。也可以用 GitHub 提供的 **Automatic page generator** 体验下网站效果，具体的使用帮助可以参考 Github Pages 的[官方文档](https://help.github.com/categories/github-pages-basics/)。

更专业一点的请看 GotGithub 教程：[建立主页 - GotGithub](http://www.worldhello.net/gotgithub/03-project-hosting/050-homepage.html)。


### 绑定域名

我们在第一部分就提到了在DNS部分的设置，再来看在 GitHub 的配置，要想让 `username.github.io` 能通过你自己的域名来访问，需要在项目的根目录下新建一个名为 `CNAME` 的文件，文件内容形如：

    example.com

你也可以绑定在二级域名上：

    blog.example.com

需要提醒的一点是，如果你使用形如 `example.com` 这样的顶级域名的话，需要在 DNS 处设置 **A 记录**到 `207.97.227.245`（**这个地址会有变动，[这里][a-record]查看**），而不是在 DNS 处设置为 CNAME 的形式，否则可能会对其他服务（比如 Email）造成影响。如果绑定的是二级域名，则DNS要新建一条 **CNAME 记录**，指向 `username.github.io`（将 username 换成你的用户名）

设置成功后，根据 DNS 的情况，最长可能需要一天才能生效，耐心等待吧。  
参考：[About custom domains for GitHub Pages sites](https://help.github.com/articles/about-custom-domains-for-github-pages-sites/)




## 搭建本地 Jekyll 环境

Jekyll 是一个静态站点生成器，它会根据模板、网页纯文本源码生成静态网页文件。

GitHub Pages 本身支持 Jekyll，处理向代码仓库特定分支提交的每个文本文件页。对于 User Pages，使用 `username.github.io` 代码仓库的 `master` 分支；对于 Project Pages，使用每个项目代码仓库的 `gh-pages` 分支。参考帮助文档：[**Using Jekyll with Pages**](https://help.github.com/articles/using-jekyll-with-pages/)。

在本地建一个文件夹作为博客根目录，进入目录新建一个 HTML 主页 `index.html`。这样，一个简单的博客目录就完成了，下面以此为例介绍如何搭建本地开发环境。

### 独立安装 Jekyll 系统

这里简单介绍一下在 Mac OS X 下面的安装过程，其他操作系统可以参考官方的 [Jekyll 安装][15]。

作为生活在水深火热的墙内人民，有必要进行下面一步修改 gem 源，方便我们更快的下载所需组件：

```ruby
sudo gem sources --remove http://rubygems.org/
sudo gem sources -a http://ruby.taobao.org/
```

然后用 `gem sources -l` 看看现在源列表

```sh
$ gem sources -l

*** CURRENT SOURCES ***

http://ruby.taobao.org
```

如果是上面那样就可以用 Gem 安装 Jekyll

```sh
$ gem install jekyll
```

不过一般如果有出错提示，你可能需要这样安装：

    $ sudo gem install jekyll

我到了这一步的时候总是提示错误`Failed to build gem native extension`，很可能的一个原因是没有安装rvm，[rvm的安装][16]可以参考这里，或者敲入下面的命令：

    $ curl -L https://get.rvm.io | bash -s stable --ruby

然后还需要安装Markdown的解释器，这个需要在你的_config.yml里面设置`markdown:rdiscount`：

    $ gem install jekyll rdiscount

好了，如果一切顺利的话，本地环境就基本搭建完成了，进入之前我们建立的博客目录，运行下面的命令：

    $ jekyll --server

这个时候，你就可以通过 `localhost:4000` 来访问了。



### Install Jekyll with Bundler

建议采用这种方式安装，方便管理 RubyGems 依赖组件，确保本地 Ruby 的开发环境时刻与 GitHub Pages 运行环境一致。  
[Dependency versions][] 这里列出了当前 GitHub Pages 使用的各个 gem 组件的版本。执行下面三步在本地安装 Jekyll：

> 1. Install **Ruby**  
> 到 [Download Ruby](https://www.ruby-lang.org/en/downloads/) 下载安装 Ruby，命令行执行 `ruby --version` 检查确保版本是 `1.9.3` 或 `2.0.0`。
> 
> 2. Install **Bundler**  
> 负责管理 RubyGems 组件的版本，执行 `gem install bundler` 安装。
>
> 3. Install **Jekyll**  
> Bundler 安装成功后，最后要安装 Jekyll 及依赖的 gem 组件。在网站文件目录建立 `Gemfile` 文件，并添加一行：`gem 'github-pages'`，然后执行 `bundle install`；  
> 如果未安装 Bundler，那么就执行 `gem install github-pages`。  
> 下面是一个 Gemfile 文件的示例。

```ruby
source 'https://ruby.taobao.org'
gem 'github-pages'
```



### 运行 Jekyll

上面的 Gemfile 确保了与 GitHub Pages 相同的环境，在网站根目录下启动 Jekyll （项目代码仓库要切换到 `gh-pages` 分支）：

```bash
bundle exec jekyll serve
```

成功启动后，就可以通过访问 `http://localhost:4000` 预览网站。

为确保本地与 GitHub Pages 服务器相同 Jekyll 运行环境，保持 gem 版本一致，执行：

```bash
bundle update
# 或者，未安装 Bundler的话
gem update github-pages
```

**可用的 Jekyll 命令**

```bash
$ jekyll build
# => The current folder will be generated into ./_site

$ jekyll build --destination <destination>
# => The current folder will be generated into <destination>

$ jekyll build --source <source> --destination <destination>
# => The <source> folder will be generated into <destination>

$ jekyll build --watch
# => The current folder will be generated into ./_site,
#    watched for changes, and regenerated automatically.


$ jekyll serve
# => A development server will run at http://localhost:4000/
# Auto-regeneration: enabled. Use `--no-watch` to disable.

$ jekyll serve --detach
# => Same as `jekyll serve` but will detach from the current terminal.
#    If you need to kill the server, you can `kill -9 1234` where "1234" is the PID.
#    If you cannot find the PID, then do, `ps aux | grep jekyll` and kil

$ jekyll serve --no-watch
# => Same as `jekyll serve` but will not watch for changes.
# As of version 2.4, the "serve" command will watch for changes automatically.
```



### Windows 环境下运行 Jekyll

在 Windows 下安装 [Ruby][RubyInstaller] 时，记得要 **“Add Ruby executables to your PATH”**，并且要安装相应的 [Development Kit][DevKit]。  
参考 Julian Thilo 写过一份说明文档，内容很详细：[**Jekyll running on Windows**][JulianThilo]。

[rubyinstaller]: http://rubyinstaller.org/ "RubyInstaller for Windows"
[DevKit]: https://github.com/oneclick/rubyinstaller/wiki/Development-Kit#user-content-installation-instructions
[JulianThilo]: http://jekyll-windows.juthilo.com/ "Run Jekyll on Windows"

#### 编码

一定要确保你的 UTF-8 编码的文件没有 `BOM` 头部字符（windows 记事本默认的编码是 **ANSI**，这个地方一定要注意）。

另外，在 `_config.yml` 中配置选项 `encoding: utf-8`（自 Ruby 2.0.0 起，**utf-8** 已变为默认值），可以使得 Jekyll 以 UTF-8 字符编码读取网站文件。  
而遇到这个错误：“Liquid Exception: Incompatible character encoding” 时，可以试试将 windows 控制台的编码改为 UTF-8：`$ chcp 65001`


#### 自动生成

自 Jekyll 1.3.0 起，便用 `listen` gem 来监听网站目录下文件的变动。Windows 平台下需要额外的 gem 组件来兼容，Gemfile 增加一行：

```ruby
gem 'wdm', '~> 0.1.0' if Gem.win_platform?
```





## Jekyll 模板系统

GitHub Pages 为了提供对HTML内容的支持，选择了 [Jekyll][] 作为模板系统，Jekyll 是一个强大的静态模板系统，作为个人博客使用，基本上可以满足要求，也能保持管理的方便；参考博主的另一篇文章[《Jekyll/Liquid API 语法文档》]({% post_url 2015-01-10-jekyll-liquid-syntax-documentation %}) 详细介绍 Jekyll 的相关内容，你也可以查看 [Jekyll官方文档][8]。

你可以直接 fork [BeiYuu的项目][11]，然后改名，就有了你自己的基于 Jekyll 的博客了，当然你也可以按照下面的介绍自己创建。


### 1、Jekyll 基本结构

Jekyll 的核心其实就是一个文本转换引擎，用你最喜欢的标记语言写文档，可以是 Markdown、Textile 或者 HTML 等等，再通过 `layout` 将文档拼装起来，根据你设置的 URL 规则来展现，这些都是通过严格的配置文件来定义，最终的产出就是 web 页面。

基本的 Jekyll 结构如下：

    |-- _config.yml
    |-- _includes
    |   |-- header.html
    |   `-- footer.html
    |-- _layouts
    |   |-- default.html
    |   `-- post.html
    |-- _posts
    |   |-- 2013-10-29-why-every-programmer-should-play-nethack.md
    |   `-- 2009-04-26-barcamp-boston-4-roundup.textile
    |-- _site
    `-- index.html

简单介绍一下他们的作用：

#### _config.yml
配置文件，用来定义你想要的效果，设置之后就不用关心了。


#### _includes

可以用来存放一些小的可复用的模块，方便通过 {%raw%}`{% include file.html %}`{%endraw%} 灵活的调用。这条命令会调用 __includes/file.html_ 文件。


#### _layouts

这是模板文件存放的位置。Page / Post 通过 [YAML Front Matter][9]来指定要用的模板，后面会讲到， {%raw%}`{{ content }}`{%endraw%} 标记用来将这两种数据插入到这些模板中来（Jekyll 中的“ content ”对象要么是 Page，要么是 Post）。


#### _posts

存放动态的文章内容，一般来说就是你的博客正文存放的文件夹。他的命名有严格的规定，必须是`2012-02-22-artical-title.MARKUP`这样的形式，MARKUP 是你所使用标记语言的文件后缀名，文章的链接规则可以在 **_config.yml** 中设定，也可以在单个文章中灵活调整。


#### _site

这个存放Jekyll最终生成的文档的目录。最好把他放在你的`.gitignore`文件中忽略它。


#### 其他文件夹

> <b style="font-family: Viner Hand ITC, Segoe Print, Segoe Script;
font-size: 16px;">"Every file or folder that does not begin with an underscore will be copied to the generated site."</b>

任何以下划线开头的文件和目录都不会成为网站的一部分。  
你可以创建任何的文件夹，在根目录下面也可以创建任何文件，假设你创建了`project`文件夹，下面有一个`github-pages.md`的文件，那么你就可以通过`yoursite.com/project/github-pages`访问的到，文件后缀可以是`.html`或者`.md`或者`.markdown`或者`.textile`。


### 2、Jekyll 的配置

Jekyll 的配置写在 `_config.yml` 文件中，可配置项有很多，我们不去一一追究了，很多配置虽有用但是一般不需要去关心，[官方配置文档][10]有很详细的说明，博主的另一篇文章也写的足够详尽了，确实需要了可以去查，这里我们主要说两个比较重要的东西，一个是 `Permalink`，还有就是自定义项。

`Permalink` 项用来定义你最终的[文章链接](http://jekyllrb.com/docs/permalinks/)是什么形式，他有下面几个变量：

* `year` ：文件名中的年份
* `month` ：文件名中的月份
* `day` ：文件名中的日期
* `title` ：文件名中的文章标题
* `categories` ：YAML 头部定义的文章的分类，如果文章没有分类，会忽略
* `short_year` ：文件名中的除去前缀世纪数的年份
* `i-month` ：文件名中的除去前缀0的月份
* `i-day` ：文件名中的除去前缀0的日期

看看最终的配置效果：

* `permalink: pretty`  =>  /2009/04/29/slap-chop/index.html
* `permalink: /:month-:day-:year/:title.html`  =>  /04-29-2009/slap-chop.html
* `permalink: /blog/:year/:month/:day/:title`  =>  /blog/2009/04/29/slap-chop/index.html
* `permalink: /:title`  =>  /github-pages/index.html

自定义项的内容，例如我们定义了`title: Alfred 的博客`这样一项，那么你就可以在文章中使用 {%raw%}`{{ site.title }}`{%endraw%} 来引用这个变量了，非常方便定义些全局变量。


### 3、YAML Front Matter 和模板变量

对于使用YAML定义格式的文章，Jekyll 会特别对待，他的格式要求比较严格，必须是这样的形式：

{%raw%}
    ---
    layout: post
    title: Blogging Like a Hacker
    ---
{%endraw%}

前后的`---`不能省略，在这之间，你可以定一些你需要的变量，layout 就是调用`_layouts`下面的某一个模板，上面的 `title` 就是自定义的内容，在文章中可以通过 {%raw%}`{{ page.title }}`{%endraw%} 这样的形式调用。可以使用一些其他的变量还有：

- `layout` ：指定当前页面要用的模板文件
- `category` | `categories` ：设置文章的分类；多个分类间用空白符隔开，或使用 [**YAML Lists**](http://en.wikipedia.org/wiki/YAML#Lists) 格式
- `tags` ：设置文章的 tag，同上
- `permalink` ：文章的路径，默认是`/year/month/day/title.html`。也可以自定义路径，可以用的变量有`:year`，`:month`，`:day`，`:title`以及`:categories`。`:categories`来自 front matter；其他的变量都来自文章的文件名。你可以用`/:year/:month/:title`或者`/:categories/:title.html`的形式来设置permalink。需要注意的是，如果你文章的front matter中有`permalink`选项，它会覆盖掉全局的默认值
- `published` ：可以单独设置某一篇文章是否需要发布
- `date` ：覆盖 post 文件名中的日期，确保 posts 准确排序，为 Posts 预定义变量；其值的格式：<u>**YYYY-MM-DD HH:MM:SS +/-TTTT**</u>，时、分、秒、时区偏移量，是可选的

<!--
- `auto` 添加`auto: true`到你的配置文件来保持Jekyll运行，查看你的项目目录的改变并随时生成网站
- `source` 如果源文件目录不是运行Jekyll的目录，你就要用source选项来设置源文件目录
- `destination` Jekyll默认会把网站生成在`./_site`，如果你想把网站生成在别的目标，就可以永这个选项设定
- `exclude` 像上面所言，Jekyll会忽略以下划线开头的文件。但是，如果你有需要忽略的目录，但是又不是以下划线开头，你可以在`exclude`中设定
-->

Jekyll 只处理含有 **YAML Front Matter** 的文件（不以下划线开头的），用模板装饰后才被放进 `_site` 目录，其他文件直接被复制到该目录。

对于 Jekyll 的模板变量，请参考官方文档：[https://github.com/mojombo/jekyll/wiki/template-data](https://github.com/mojombo/jekyll/wiki/template-data "Jekyll Template Data")



### 4、Jekyll 中的 Content

Posts and Pages




### 5、Jekyll 中的 Templates


Using Liquid for Templating






## 使用 Jekyll 和 GitHub Pages

GitHub Pages 以 Jekyll 系统为后台引擎，解析处理上传的纯文本文件、站内生成静态网页文件，也允许用户自己编写网页；它定义一些特色功能，同时又限制了 Jekyll 的一些配置。下面将介绍 GitHub 的一些约定，及如何使用 Jekyll 模板建立静态网页。


### 建立静态网站实例

先在本地编写符合 Jekyll 规范的网站源码，然后上传到 GitHub，由 GitHub 生成并托管整个网站。下面以建立 Project Pages 为例说明。

#### 1、创建项目

在本地新建目录“ jekyll\_demo ”作为网站根目录，并 Git 初始化：

```bash
$ mkdir jekyll_demo
$ cd jekyll_demo
$ git init
```

创建没有父节点的 gh-pages 分支（GitHub规定，只有该分支中的页面，才会生成网页文件）

```bash
$ git checkout --orphan gh-pages
```

以下所有动作，都在该分支下完成。


#### 2、创建配置文件

在项目根目录下，建立一个名为 `_config.yml` 的文本文件。它是 Jekyll 的设置文件，我们在里面填入如下内容（确保本地与 GitHub Pages URL [路径一致][project-page-url]），其他设置都可以用默认选项，具体解释参见本文“ Jekyll 的配置”。

```yaml
baseurl: /jekyll_demo
```

目录结构变成：

    /jekyll_demo
        | -- _config.yml

[project-page-url]: http://jekyllrb.com/docs/github-pages/#project-page-url-structure


#### 3、定义模板

在项目根目录下，创建一个 `_layouts` 目录，用于存放模板文件。  
进入该目录，创建一个 `default.html` 文件，作为 Blog 的默认模板，并在该文件中写入以下内容：

{% raw %}
```html
<!DOCTYPE html>

<html>
  <head>
     <meta http-equiv="content-type" content="text/html; charset=utf-8" />
     <title>{{ page.title }}</title>
  </head>
  <body>
  {{ content }}
  </body>
</html>
```
{% endraw %}

Jekyll 使用 [Liquid 模板语言](https://github.com/shopify/liquid/wiki/liquid-for-designers)，它有两种标记：输出和标签，前者用来输出文本，后者是命令语句。如上述代码中对两个变量用到的输出标记：{% raw %}`{{ page.title }}`{% endraw %} 表示输出文章标题，{% raw %}`{{ content }}`{% endraw %} 表示输出文章内容，更多模板变量请参考本文“ Liquid 语法和 API ”。  

目录结构变成：

    /jekyll_demo
        |-- _config.yml
        |-- _layouts
        |       |-- default.html


#### 4、新建文章

回到项目根目录，创建一个 `_posts` 目录，用于存放 blog 文章。  
进入该目录，创建一篇文章。文章就是普通的文本文件，把文件名定为 **2014-12-25-hello-world.md**。(注意，文件名必须为 “**年-月-日-文章标题.后缀名**” 的格式。如果网页代码采用 html 格式，后缀名为 `html`；如果采用 [Markdown](http://daringfireball.net/projects/markdown/) 格式，后缀名为 `md`）  
在该文件中，填入以下内容：（注意，行首不能有空格，并且 UTF-8 编码的文件格式不能有 BOM 头部）

{% raw %}
```
---
layout: default
title: Hello New World
---

## {{ page.title }}

This is my first post.

{{ page.date | date_to_string }}
```

每篇文章的头部，必须有一个 yaml 文件头，用来设置一些元数据。它用三根短划线 `---` 标记开始和结束，里面每一行设置一种元数据。`layout: default` 表示该文章模板使用 `_layouts` 目录下的 `default.html` 文件；`title: Hello New World` 表示该文章的标题，如果不设置这个值，默认使用嵌入文件名的标题，即：“ **hello world** ”。

在 yaml 文件头后面，就是文章的正式内容，里面可以使用模板变量。`{{ page.title }}` 就是文件头中设置的“ **Hello New World** ”，`{{ page.date }}` 则是嵌入文件名的日期（也可以在文件头重新定义 `date` 变量），`| date_to_string` 表示将 `page.date` 变量转成可读的格式：“ **25 Dec 2014** ”。

{% endraw %}

目录结构变成：

    /jekyll_demo
        |-- _config.yml
        |-- _layouts
        |       |-- default.html 
        |-- _posts
        |       |-- 2014-12-25-hello-world.md


#### 5、创建首页

回到根目录，创建一个 `index.html` 文件，填入以下内容，链接上面写的文章：

{% raw %}
```html
---
layout: default
title: My Blog
---

<h2>{{ page.title }}</h2>

<p>Recent Blog Posts</p>

<ul>
    {% for post in site.posts %}
      <li>{{ post.date | date_to_string }} <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
</ul>
```

YAML 文件头表示首页使用 `default` 模板，标题为“ My Blog ”。然后 `{% for post in site.posts %}` 是 Liquid 命令语句，表示遍历所有的文章。这里要注意的是，Liquid 模板语言规定，输出内容使用两层大括号，单纯的命令使用一层大括号。至于 `{{ site.baseurl }}` 就是 `_config.yml` 中设置的 `baseurl` 变量。

{% endraw %}

目录结构变成：

    /jekyll_demo
        |-- _config.yml
        |-- _layouts
        |       |-- default.html 
        |-- _posts
        |       |-- 2014-12-25-hello-world.md
        |-- index.html


#### 6、发布内容

现在，这个简单的 Blog 就可以发布了，前往 GitHub 创建了名为“ jekyll\_demo ”的项目代码库。  
在本地把所有内容加入本地 Git 库，然后推送到 GitHub 那个代码库中（username 是你的账户名）：

```bash
$ git add .
$ git commit -m "first initial commit"
$ git remote add origin https://github.com/username/jekyll_demo.git
$ git push origin gh-pages
```

成功上传之后，等一会儿，访问 http://username.github.io/jekyll_demo/ ，就可以看到 Blog 已经生成了（将 username 换成你的账户名）。  
本地测试时，在项目根目录执行 `jekyll serve`，浏览器查看首页如下：
![Jekyll Site Demo]({{ site.picture_dir }}/github-pages/blog-demo.png "A Simple Blog Demo based on GitHub Pages")

至此，一个简单的 Blog 就算搭建完成了。


### GitHub Pages 配置

默认情况下，GitHub 设定了下面两个参数的缺省值，我们可以更改：

```yaml
highlighter: pygments
github: [Repository metadata]
```

**“repository metadata”** 对象的内容，请查看 [repository metadata on GitHub Pages](https://help.github.com/articles/repository-metadata-on-github-pages)。

GitHub 还限制下面3个参数值，用户无法更改：

```yaml
safe: true
lsi: false
source: your top-level directory
```

另外，通过在网站代码仓库的根目录下创建名为 `.nojekyll` 的文件，可以阻止 Jekyll 处理当前代码仓库。


### Front Matter 是强制的

Jekyll 要求每个 Markdown 文件必须在顶部定义 **Front Matter**，它是一组元数据，写在一对 `---` 之间：

```yaml
{%raw%}
---
title: This is my title
layout: post
---

Here is my page.
{%endraw%}
```

元数据可以省略，但是必须保留这一对 `---`。只有当文件在 `_posts` 目录下时，才可以完全省略破折号。


### Jekyll 插件

考虑到安全问题，GitHub Pages 后台通过 `--safe` 参数禁用了用户自定义的插件，只启用了几个必要的 [Jekyll 插件][Dependency versions]。这样一来，用户定义的插件不会在 GitHub Pages 上工作，但可以将本地生成的静态网站文件（`_site` 目录下）直接提交到 GitHub 来保留那些插件的效果。

对于 GitHub Pages 支持的插件，查看 [Using Jekyll Plugins with GitHub Pages](https://help.github.com/articles/using-jekyll-plugins-with-github-pages)。

此外，Jekyll 提供了很多 Liquid 扩展和文档说明，参见 [Liquid Extensions](https://github.com/jekyll/jekyll/wiki/Liquid-Extensions)。


### Liquid 语法和 API



### 使用 Markdown 写博客




### 遗留的问题

我在这个过程中还遇到两个诡异的没有解决的问题，一个是我放在根目录下面的blog.md等文件，在GitHub的pages服务上一切正常，可以通过`beiyuu.com/blog`访问的到，但是在本地环境下，总是`not found`，很是让人郁闷，看生成的`_site`目录下面的文件，也是正常的`blog.html`，但就是找不到，只有当我把URL改为`localhost:4000/blog.html`的时候，才能访问的到，环境不同真糟糕。

还有一个是关于 `category` 的问题，根据 `YAML` 的语法，我们在文章头部可以定义文章所属的类别，也可以定义为 `category:[blog,rss]` 这样子的多类别，我在本地试一切正常，但是 push 到 GitHub 之后，就无法读取了，真让人着急，没有办法。  
原因是发现同一 GitHub 账户下面存在名为 **“blog”** 的 repo，两者之间存在 [URL 路径冲突](https://help.github.com/articles/using-jekyll-with-pages/#troubleshooting)，应该尽量避免这种情况发生。

> _If you are having issues with your Jekyll Pages, make sure you are not using categories that are named the same as another project, as this could cause **path conflicts**._   
> _For example: if you have a blog post named 'resume' in your User Page repository and a project named 'resume' with a **gh-pages** branch, they will conflict with each other._

这里还有一篇[《Jekyll 本地调试之若干问题》][18]，安装中如果有其他问题，也可以对照参考一下。





## 配置 Jekyll 高级功能模块


### 现成的模板

- 使用 Jekyll 的网站：[**Jekyll-powered blogs**](http://jekyllrb.com/docs/sites/)、 [**"Sites" page in the Jekyll wiki**](https://github.com/jekyll/jekyll/wiki/Sites)
- Jekyll 主题模板：[**Jekyll Themes**](http://jekyllthemes.org/)



### 分类和标签






### 分页

#### 1、分页输出 

{%raw%}
```liquid
{% for post in paginator.posts %}
  {{ content }}
{% endfor %}
```

#### 2、分页 

```liquid
{% if paginator.previous_page %}
  {% comment %} 判断输出前一个分页 {% endcomment %}
  {% comment %} "page" + paginator.previous_page {% endcomment %}
{% endif %}
{% if paginator.next_page %}
  {% comment %} 判断输出后一个分页 {% endcomment %}
  {% comment %} "page" + paginator.next_page {% endcomment %}
{% endif %}
{% for page in (1..paginator.total_pages) %}
  {% if page == paginator.page %}
    {% comment %} 如果是当前分页 {% endcomment %}
    {% comment %} page {% endcomment %}
  {% else %}
    {% comment %} 不是的话输出其他分页链接号码 {% endcomment %}
    {% comment %} "page" + page {% endcomment %}
  {% endif %}
{% endfor %}
```

#### 3、文章页面显示前一篇文章和后一篇文章 

```liquid
{% if page.previous %}
  {% comment %} url:    page.previous.url {% endcomment %}
  {% comment %} title:  page.previous.title | truncatewords:5 {% endcomment %}
{% endif %}
{% if page.next %}
  {% comment %} url:    page.next.url {% endcomment %}
  {% comment %} title:  page.next.url | truncatewords:5 {% endcomment %}
{% endif %}
```
{%endraw%}



### 代码高亮插件

- [GitHub Gist][]：简单易用，省心省事，支持语言足够多
- JS 插件：[DlHightLight][] 或 [Google Code Prettify][]
- [pygments.rb][]：Gem 最新版已包含 Python 的 Pygments 包，但仍要安装 Python，又是个大坑，不建议菜鸟使用，尤其是在 Windows 平台


[GitHub Gist]: https://gist.github.com/
[DlHightLight]: http://mihai.bazon.net/projects/javascript-syntax-highlighting-engine
[Google Code Prettify]: http://code.google.com/p/google-code-prettify/
[pygments.rb]: https://github.com/tmm1/pygments.rb


如果写技术博客，代码高亮少不了，有两个可选插件[DlHightLight代码高亮组件][13]和[Google Code Prettify][14]。DLHightLight 支持的语言相对较少一些，有js、css、xml和html，Google 的高亮插件基本上任何语言都支持，也可以自定义语言，也支持自动识别，也有行号的特别支持。

Google 的高亮插件使用也比较方便，只需要在`<pre>`的标签上加入`prettyprint`即可。所以我选择了Google Code Prettify。



### 关于使用数学公式

#### 1、使用 [Maruku][] 来解析 Markdown 文件

可以[解析 LaTeX 公式][Maruku_Math]为 [MathML][] 或者 PNG 图片，优点是网页加载速度快；  
但需要安装 TeX 排版系统（如：[TeX Live][] 或 [MacTeX][]），因为 Jekyll 内置的 [Maruku][Jekyll_Maruku] 解析器只开启 [blahtex][] 公式引擎，且仅支持输出 PNG 格式（参考[源码][maruku_parser]），而 blahtex [依赖 TeX 系统][Instiki]在后台渲染并转换数学公式，很不方便。


#### 2、使用 [MathJax][] 公式显示 JS 引擎

JS 动态加载，解析速度有些慢。GitHub Pages 支持的 [Kramdown][Kramdown_Math] 解析器默认使用该引擎解析渲染数学公式，使用时需要在页面引入 MathJax 库。公式书写语法参考 [Math Blocks][]。  
但是即便不改换 Markdown 解析器，只要加载 MathJax 库，仍然可以正确显示公式，博主亲测！查阅 Jekyll 内置的 Kramdown 代码也没看到有相关的配置，只是简单的将文本中的公式区块解析成 HTML 标签 `<script type="math/tex">`，最终的公式渲染工作还是由 JS 实现。


[Maruku]: https://github.com/bhollis/maruku "A pure-Ruby Markdown-superset interpreter"
[Maruku_Math]: http://www.rubydoc.info/github/bhollis/maruku/master/file/docs/math.md#Enabling_the_extension
[Jekyll_Maruku]: http://bhollis.github.io/maruku/math.xhtml#with_embedded_maruku
[MathML]: http://www.w3.org/Math
[blahtex]: http://gva.noekeon.org/blahtexml/ "A TeX to MathML converter designed with MediaWiki in mind"
[Instiki]: https://golem.ph.utexas.edu/wiki/instiki/show/BlahTeX#Intro
[TeX Live]: http://www.tug.org/texlive/
[MacTeX]: http://www.tug.org/mactex/
[maruku_parser]: https://github.com/jekyll/jekyll/blob/master/lib/jekyll/converters/markdown/maruku_parser.rb
[MathJax]: http://www.mathjax.org/ "A JavaScript display engine for mathematics that works in all browsers"
[Kramdown_Math]: http://kramdown.gettalong.org/math_engine/mathjax.html
[Math Blocks]: http://kramdown.gettalong.org/syntax.html#math-blocks


按照下面的步骤，可以在 Markdown 文本中书写数学公式：

安装 kramdown 包

```ruby
gem install kramdown
```

在 `_config.yml` 中指定 Markdown 解析器

```yaml
# Conversion
markdown: kramdown

# Markdown Processors
kramdown:    # Better to turn on recognition of Github Flavored Markdown
  input: GFM
```

再把下面的代码插入到 `<head>` 标签里  
（如果你使用 Octopress，那就是添加到 `/source/_includes/custom/head.html` 文件里）

```html
<!-- mathjax config similar to math.stackexchange -->

<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [ ['$','$'], ["\\(","\\)"] ],
      processEscapes: true
    }
  });
</script>

<script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      tex2jax: {
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
      }
    });
</script>

<script type="text/x-mathjax-config">
    MathJax.Hub.Queue(function() {
        var all = MathJax.Hub.getAllJax(), i;
        for(i=0; i < all.length; i += 1) {
            all[i].SourceElement().parentNode.className += ' has-jax';
        }
    });
</script>

<script type="text/javascript"
   src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
</script>
```

最后在 Markdown 文件里写公式代码   
例如，下面的 [**Cauchy-Schwarz Inequality**](http://en.wikipedia.org/wiki/Cauchy–Schwarz_inequality "柯西-施瓦茨不等式")：

```latex
$$
\left( \sum_{k=1}^n a_k b_k \right)^{\!\!2} 
\leq 
\left( \sum_{k=1}^n a_k^2 \right) 
\left( \sum_{k=1}^n b_k^2 \right)
$$
```

就会得到：

{% include custom/mathjax-config.html %}

<script type="math/tex; mode=display">
\left( \sum_{k=1}^n a_k b_k \right)^{\!\!2} 
\leq 
\left( \sum_{k=1}^n a_k^2 \right) 
\left( \sum_{k=1}^n b_k^2 \right)
</script>
<br/>



```tex
而段内插入 LaTeX 公式是这样的： $ \{\,z\in C \mid z^2 = {\alpha}\,\} $，试试看看吧
```

可以得到：

<div style="border:solid 1px black;padding:10px 15px;margin-bottom:20px;">
而段内插入 LaTeX 公式是这样的： $ \{\,z\in C \mid z^2 = {\alpha}\,\} $，试试看看吧
</div>


**需要注意**的是，如果打算将 Markdown 解析器换成 Kramdown 的话，要重新检查以前写过的文章。因为 Kramdown 对 Markdown **语法要求很严格**，所以原先能够正确解析的地方就可能出现问题。



### 使用 Disqus 管理评论

模板部分到此就算是配置完毕了，但是Jekyll只是个静态页面的发布系统，想做到关爽场倒是很容易，如果想要评论呢？也很简单。

现在专做评论模块的产品有很多，比如[Disqus][]，还有国产的[多说][]，Disqus对现在各种系统的支持都比较全面，到写博客为止，多说现在仅是WordPress的一个插件，所以我这里暂时也使用不了，多说与国内的社交网络紧密结合，还是有很多亮点的，值得期待一下。我先选择了Disqus。

注册账号什么的就不提了，Disqus支持很多的博客平台，参见下图：
![Disqus sites]({{ site.picture_dir }}/github-pages/disqus-site.jpg)

我们选择最下面的`Universal Code`就好，然后会看到一个介绍页面，把下面这段代码复制到你的模板里面，可以只复制到显示文章的模板中：

<!--?prettify lang=html linenums=true?-->
```html
<div id="disqus_thread"></div>
<script type="text/javascript">
	/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
	var disqus_shortname = 'example'; // required: replace example with your forum shortname 这个地方需要改成你配置的网站名

	/* * * DON'T EDIT BELOW THIS LINE * * */
	(function() {
		var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
		dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	})();
</script>
<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
<a href="http://disqus.com" class="dsq-brlink">blog comments powered by <span class="logo-disqus">Disqus</span></a>
```

配置完之后，你也可以做一些异步加载的处理，提高性能，比如我就在最开始页面打开的时候不显示评论，当你想看评论的时候，点击“显示评论”再加载Disqus的模块。代码很简单，你可以参考我的写法。

```javascript
$('#disqus_container .comment').on('click',function(){
		$(this).html('加载中...');
		var disqus_shortname = 'AlfredSun';
		var that = this;
		BYB.includeScript('http://' + disqus_shortname + '.disqus.com/embed.js',function(){$(that).remove()}); //这是一个加载js的函数
});
```

如果你不喜欢 Disqus 的样式，你也可以根据他生成的HTML结构，自己改写样式覆盖它的，Disqus 现在也提供每个页面的评论数接口，[帮助文档][12]在这里可以看到。




## 定制 404 页面

GitHub allows you to have a custom 404 error page. When you test your website locally with `bundle exec jekyll serve`, this error page also works: you can try by providing an incorrect URL. Just tell Jekyll to create a `404.html` on the root:

{% raw %}
```
---
title: Page Not Found
permalink: /404.html
---

This page must have been removed or had its name changed.
```
{% endraw %}




## 集成 Travis CI 编译测试功能

[**Travis**](https://travis-ci.org/) allows your to generate the website each time you push something, in order to check nothing is wrong. It is also possible to add some other tests like `htmlproofer` which checks if the HTML code is valid and there are no rotten links. You will get a warning email if something is wrong.

To do so, use your GitHub login informations on Travis, then enable the `username.github.io` repository. Then, add `htmlproofer` in your Gemfile file, which now looks like:

```ruby
source 'https://rubygems.org'
gem 'github-pages'
gem 'html-proofer'
```

Finally, create a `.travis.yml` file in order to tell Travis how to build and test the website:

```
language: ruby
rvm:
- 2.1.1
script:
- bundle exec jekyll build && bundle exec htmlproof ./_site
```

Now, each time you push something, **Travis** will send you an email if Jekyll can’t generate your website, if the HTML code is not valid or if a link rot remains.




## GitHub Pages 相关的一些有趣的东西

Github Pages 博客编辑器：[Prose](http://prose.io/) | [源码](https://github.com/prose/prose) 和 [Gitblog.io](http://www.gitblog.io/) | [源码](https://github.com/gitblog-io/gitblog-io.github.io)

静态博客生成器：[Simple](http://isnowfy.github.io/about-simple-cn.html) | [源码](https://github.com/isnowfy/simple)  --  ([Static Site Generators](https://staticsitegenerators.net/ "The definitive listing of Static Site Generators"))

静态 WEB 博客生成器：[deadsimplelog](https://github.com/tallesl/deadsimplelog)

还有关于 [Jekyll-Bootstrap][17] 的资料，需要自己修改调试的，可以研究一下。

最后是基于 Jekyll 改进的博客框架 [Octopress](http://octopress.org/)，博主也附加了一篇使用的说明文档 [《在 Windows7 下从头开始安装部署 Octopress》]({% post_url 2014-11-23-install-and-deploy-octopress-to-github-on-windows7-from-scratch %})。


不得不说，下面这两篇文章写的很真不错、实用：

- [《优化 Jekyll 站点的 SEO 技巧》](http://www.zhanxin.info/jekyll/2012-12-09-jekyll-seo.html)
- [《搭建 Jekyll 博客的一些小技巧》](http://pizn.github.io/2012/03/01/some-tips-for-jekyll-blog.html)
- [为 Jekyll 博客添加静态搜索](http://www.zhanxin.info/jekyll/2012-05-26-jekyll-static-search.html)




## 结束语
如果你跟着这篇不那么详尽的教程，成功搭建了自己的博客，恭喜你！剩下的就是保持热情的去写自己的文章吧。



## Further Reading

1. [Jekyll Liquid API](http://jekyllbootstrap.com/api/jekyll-liquid-api.html)
2. [GitHub Pages](http://jekyllrb.com/docs/github-pages/)


**(I)** 了解 Jekyll 静态网站生成器的起源：Jekyll 作者（也是 GitHub 的共同创始人） Tom Preston-Werner 的博文 [**Blogging like a hacker**](http://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html)（中文翻译[《 像黑客一样写博客 》](http://kyle.xlau.org/posts/blogging-like-a-hacker.html) by Kylexlau）。

**(II)** 提供Web托管的 GitHub Pages 和 GitHub 的项目托管同样使用 Git 访问。如果你对分布式版本控制系统不熟悉，[Pro Git（中文）](http://progit.org/book/zh/) 是一个极好的起点。

**(III)** 值得推荐的几款文本编辑器（它们都支持对 Markdown 和 Textile 的原生或第三方的语法高亮）：  
[Vim][] | [GNU Emacs][] | [TextMate][] | [SciTE][] | [gedit][] | [Kate][]

[Vim]: http://www.vim.org/
[GNU Emacs]: http://www.gnu.org/s/emacs/
[TextMate]: http://macromates.com/
[SciTE]: http://www.scintilla.org/SciTE.html
[gedit]: http://live.gnome.org/Gedit/
[Kate]: http://kate-editor.org/


**(IV)** 你可能会用到的标记语言和模板引擎：

- [Textile](http://en.wikipedia.org/wiki/Textile_(markup_language)) 可读性好的轻量级标记语言，可以被转换成 XHTML 格式。
    + [Textile Home Page](http://www.textism.com/tools/textile/)
    + [A Textile Reference](http://redcloth.org/hobix.com/textile/)
    + [RedCloth](http://redcloth.org/) Ruby 的 Textile 实现引擎。
- [Markdown](http://en.wikipedia.org/wiki/Markdown) 另一种 Jekyll 所支持的轻量级标记语言。
    + [Markdown Home Page](http://daringfireball.net/projects/markdown/)
    + [BlueCloth](http://deveiate.org/projects/BlueCloth) Ruby 的 Markdown 实现引擎。
    + [Maruku](http://maruku.rubyforge.org/) Ruby 的另一个 Markdown 实现引擎，效率较高。
    + [RDiscount](http://github.com/rtomayko/rdiscount/) Ruby的另一个 Markdown 实现引擎，效率比 Maruku 更高。
- [Liquid](http://liquidmarkup.org/) Ruby 的模板渲染引擎。它也是 Jekyll 所使用的模板引擎。
    + [Liquid for Designers](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)
    + [Liquid for Programmers](https://github.com/Shopify/liquid/wiki/Liquid-for-Programmers)

**(V)** 其他关于静态网站生成器的介绍和比较（英文）：

- [An Introduction to Static Site Generators](http://www.mickgardner.com/2011/04/27/An-Introduction-To-Static-Site-Generators.html)
- [Five reasons to use a static site generator instead of Wordpress](http://blog.guestlistapp.com/post/2304152860/five-reasons-to-use-a-static-site-generator-instead-of)
- [jekyll vs. hyde – a comparison of two static site generators](http://philipm.at/2011/0507/)
- [Static Website Generators – Jekyll vs Hyde](http://www.distractable.net/tech/static-site-generators-jekyll-vs-hyde)


**(VI)** 如果想要尝试一些其他的静态网页生成器，这里是一个简略的列表：

- Ruby
    + [Jekyll](http://jekyllrb.com/)
    + [Bonsai](http://tinytree.info/) 一个非常简单（但实用）的小脚本
    + [Webgen](http://webgen.rubyforge.org/) 一个较复杂的生成器
- Python
    + [Hyde](http://ringce.com/hyde) Jekyll的Python语言实现版本
    + [Cyrax](http://pypi.python.org/pypi/cyrax) 使用Jinja2模板引擎的生成器
- PHP
    + [Phrozn](http://www.phrozn.info) PHP语言实现的静态网站生成器


**(VII)** 更详细的列表和介绍请参见：

- [Static Blog Generators](http://www.subspacefield.org/~travis/static_blog_generators.html)
- [32 Static Website Generators For Your Site, Blog Or Wiki](https://iwantmyname.com/blog/2011/02/list-static-website-generators.html)
- [The updated big list of static website generators for your site, blog or wiki](https://iwantmyname.com/blog/2014/05/the-updated-big-list-of-static-website-generators-for-your-site-blog-or-wiki.html)
- [像黑客一样写博客——Jekyll入门](http://ju.outofmemory.cn/entry/95738)





[BeiYuu]:    http://beiyuu.com  "BeiYuu"
[GitHub]:   http://github.com "GitHub"
[jQuery]:   https://github.com/jquery/jquery "jQuery@github"
[Twitter]:  https://github.com/twitter/bootstrap "Twitter@github"
[GitHub Pages]: http://pages.github.com/ "Github Pages"
[Godaddy]:  http://www.godaddy.com/ "Godaddy"
[Jekyll]:   https://github.com/mojombo/jekyll "Jekyll"
[Dependency versions]: https://pages.github.com/versions/ "GitHub Pages dependencies and versions"
[DNSPod]:   https://www.dnspod.cn/ "DNSPod"
[Disqus]: http://disqus.com/
[多说]: http://duoshuo.com/
[1]:    {{ page.url}}  ({{ page.title }})
[2]: http://markdown.tw/    "Markdown语法"
[3]:    http://baike.baidu.com/view/65575.htm "A记录"
[4]: http://progit.org/book/zh/ "Pro Git中文版"
[5]: https://help.github.com/articles/set-up-git/ "各系统平台下 Git 安装"
[6]: https://help.github.com/articles/working-with-ssh-key-passphrases/
[7]: http://alfred-sun.github.io
[8]: https://github.com/mojombo/jekyll/blob/master/README.markdown
[9]: https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter
[10]: http://jekyllrb.com/docs/configuration/
[11]: https://github.com/beiyuu/Github-Pages-Example
[12]: http://docs.disqus.com/developers/universal/
[13]: http://mihai.bazon.net/projects/javascript-syntax-highlighting-engine
[14]: http://code.google.com/p/google-code-prettify/
[15]: https://github.com/mojombo/jekyll/wiki/Install
[16]: https://rvm.io/rvm/install/
[17]: http://jekyllbootstrap.com/
[18]: http://chxt6896.github.com/blog/2012/02/13/blog-jekyll-native.html
[a-record]: https://help.github.com/articles/my-custom-domain-isn-t-working


