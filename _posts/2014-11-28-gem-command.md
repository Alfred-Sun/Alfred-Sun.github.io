---
layout: post
title: gem相关命令使用
categories: Ruby
tags: [gem]
---
1.显示gem的帮助和版本
gem –h/--help
#显示gem的帮助
gem –v /--version
#显示gem的版本号
2. 列出远程库的所有可用软件
gem query --remote
# 短命令: gem q -r
你可以看到一个关于远程主机上所有软件的详细列表。
3. 查找远程主机上的特定软件
gem query --remote --name-matches doom
# 短命令: gem q -rn doom
你将看到一个匹配doom的详细列表。
gem list –remote --d
#用子命令list列出远程安装的gems

<!--more-->

4.1 安装一个远程软件
gem install --remote progressbar
# 短命令: gem i -r progressbar –y
远程安装progressbar到你的主机，-y的意思是无条件的安装依赖包
gem install rails –remote
#从远程服务器安装rails包，其中rails可以被替换成任何一个gem list –remote –d中显示的软件包
4.2 安装软件的特定版本
gem ins -r progressbar-0.0.3
安装progressbar的0.0.3版本
gem ins -r progressbar --version '> 0.0.1'
将安装progressbar的大于0.0.1的最新版本
5. 查看一个已安装的软件
gem specification progressbar
# 短命令: gem spec progressbar
你会看到关于已安装的包progressbar的详细信息。
6. 卸载一个软件
gem uninstall progressbar
卸载了progressbar
7.1 将所有安装的软件列表
gem query --local
# 短命令: 'gem q -l'
7.2 查看某个已安装的软件
gem query --local --name-matches doom
# 短命令: 'gem q -ln doom'
或：gem list --local
7.3 需要注意的安装方法
gem ins rake
会先尝试本地安装，如果本地没有就会远程下载。
gem list -b ^C
列出本地和远程的以C开头的软件
8. 浏览所有安装的软件和它们的说明文档
gem_server
会生成一个web服务器，打开http://localhost:8808
就可以看到一个html详细列出了你需要的信息。
9. 使用配置文件
gem: --gen-rdoc --run-tests
如果你想安装软件后总是生成它们的文档和运行单元测试，你可以在配制文件里写上相关的命令，配置文件名是.gemrc，在主目录里。
10. 构建gem包
gem build package.gemspec
#运用bulid子命令构建gem包
在window下安装RoR真的是场噩梦...
前天准备在一台win server 2003上安装RoR环境。
安装ruby 1.86不会有什么问题。 直接下载安装windows onclick install 的exe完成安装。
完成后，很熟练地执行以下命令：
gem install rails --include-dependenices
gem install mongrel --include-dependenices
接下来，我还有安装rmagick ，因为在站点中有处理图片的需要。
当然，安装Rmagick，首先会去下载合适的版本包（里面包含有imagemagick的exe安装文件和rmagick rubygem 包）。
安装rmagick...gem 的时候可能会遇到 bufffer error 的错误。这个错误的解决办法在Rmagick上有说明。就是要升级rubygems。
执行如下命令 ： gem update --system
把rubygems升级到最新（0.95）后再来执行安装rmagick..gem 就没有问题了。
似乎问题在一个个的解决。
继续 gem install mongrel_service --include-dependenices
错误出现了：
Building native extensions. This could take a while...
ERROR: Error installing mongrel_service:
ERROR: Failed to build gem native extension.
c:/ruby/bin/ruby.exe extconf.rb install mongrel_service --include-dependencies
checking for strncpy_s()... no
creating Makefile
nmake
.....
Gem files will remain installed in c:/ruby/lib/ruby/gems/1.8/gems/win32-api-1.0.
5 for inspection.
Results logged to c:/ruby/lib/ruby/gems/1.8/gems/win32-api-1.0.5/ext/gem_make.ou
t
重新安装了几次还问题依旧...搜索错误，也有遇到类似错误的。就是没有解决办...
经过多次尝试， 最后，比较了别人的环境和现在遇到问题的环境，
最后一次尝试是把rubygems的版本回复到以前（0.92）。
具体做法是gem uninstall rubygems-update
如果有多个版本必须请卸载掉别的版本，卸载过程会有提示。
最后把版本恢复到0.92。
一切恢复正常了...
由此我推断，是更新到最新的rubygems引起的安装错误。如果你也不信遇到了类似的问题，可以尝试一下...
注意：如果恢复后还发现版本是0.95，可以尝试进入..\ruby\gems\1.8\gems\rubygems-update-0.9.2目录下执行setup.rb