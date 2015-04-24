---
layout: post
title: GitHub Pages Issue
category: GitHub Pages
keywords: github pages, issue
description: 
---

## 1. Fork 别人的 Pages 代码库不工作

在 GitHub 上面 Fork 别人的网站代码库后，通过自己账户下的 URL 路径无法访问网站。  
这时，必须手动更新一下从人家那里 Fork 来的代码，然后提交一次；之后，一般自己账户下的网站就能正常工作了。

如果还是不行，试试点击 GitHub 仓库的 **“Settings”** 中的 **“GitHub Pages”** 条目下的 URL 看，而先不要直接在浏览器地址栏输入网站 URL。




## 2. Not found “\_site” directory destination

<font color="red"><b>“It's missing, and don't know why...”</b></font>

根据 Jekyll 的工作机制，本地运行 Jekyll build，默认将生成的静态网站文件放在根目录下的 `_site` 目录。而 GitHub Pages 后端以 Jekyll 作为渲染引擎，解析处理网站源文件，那么也要缓存静态文件到某个地方。  
现在情况是，博主没有在网站 Repo 里面找到这样的结果目录，那么 GitHub 把生成的静态文件放到哪里了呢？  

以前，一直以为一定会放在 Repo 下面，所以当注意到没有这个 `_site` 目录时，就认为 GitHub 丢失了它；亦或是隐藏起来。

因为想不通原因，所以干脆发 Email 问 GitHub 的员工，这才明白，原来所有的 GitHub Pages 生成的静态文件都被统一起来集中管理，并非在每个 Repo 单设一个 destination。  
按照 GitHub Pages 的 URL 说明，同一用户下面所有的项目页面应该位于用户页面的根目录下（路径名即为各个项目页的目录），我想这也是以用户名作为网页域名的原因了。

> “_You should not include the **&#95;site** directory in your repository. We run a Jekyll build on the contents of your repository and publish the result (usually generated to the **&#95;site** directory when running locally) to our **GitHub Pages infrastructure**._” &emsp;&emsp;&emsp;&emsp;	-- From: James Dennes _(GitHub Staff)_

- - - - - - -

#### 后记

后来自己琢磨了一会儿，貌似懂了，就没再去多想，但好想遗漏了点东西。  
直到某天，偶然看 Git 的教程时，看到 Git hook 这个东西，顿时想起 Jekyll 文档也有这方面的介绍。然后又是好奇地回头看了看 Jekyll，此时联想到了这个问题。

大胆猜测下，GitHub 的后端服务器用到了 **“Git post-receive hook”** 这样一个 Git 功能，它能够监听来自客户端 Git 操作触发的事件，在服务端执行一些脚本。也就是说，我们每次 Push 代码后，GitHub 服务端监听到了这个事件，然后运行脚本进行 Jekyll 后台编译更新代码库的输出内容，出现问题就发送 Email。  
至于，Jekyll 输出到哪里了，正如那位兄弟所说，集中到某个地方统一管理了。

这就是之前“遗漏”的点了，终于想通了。  
同时这就是解释了上面第一个问题，Fork 他人代码后，并没有触发事件，GitHub 后台也就不会执行 Jekyll 编译网站，所有这个网站无法访问。

Jekyll 里面关于 Git hook 的说明参考 [**Automated methods**](http://jekyllrb.com/docs/deployment-methods/#automated-methods)。





## 3. Windows 平台安装 Ruby

<!--more-->

不要忘记安装下面这个东西，Jekyll 依赖的某些组件可能需要 DevKit 本地进行编译。  
另外，安装 Ruby 过程中一定要将 Ruby 的执行目录添加到 Windows 当前用户的 `PATH` 环境变量中：**“Add Ruby executables to your PATH”**。

\- [RubyInstaller Development Kit](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)   
\- [DevKit Overview](http://rubyinstaller.org/add-ons/devkit)




## 4. Liquid Exception: cannot load such file -- yajl/2.0/yajl

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

解决方法，要么改用1.9.x的 Ruby ，要么下载要求的[.gem][yajl]文件(not the pre-compiled one)，重新安装`yajl`。

```sh
gem uninstall yajl-ruby
# 删除存在的问题 gems (x86-mingw32)
gem install yajl-ruby -v 1.1.0 --platform=ruby
# 安装要求的gem文件(必需指定version，pygments.rb 0.6.0 只依赖 yajl-ruby 1.1.0)
bundle check
```

__Note:__   
Bundler will keep attempting to install x86-mingw32, so you will need to be careful when doing `bundle install` or `bundle update`.

或者也可以试试下载[.gem][yajl]文件，本地编译（注意，version必须指定为 **1.1.0**），不过windows下面可能还有点问题，因为没有`make` `gcc`命令（默认Git Shell不会安装Linux的编译指令），所以需要下载安装native Win32下的GNU开发环境[MinGW][]或者[Cygwin][]。

[MinGW]: http://www.mingw.org/
[Cygwin]: http://www.cygwin.com/

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
- [brianmario/yajl-ruby#116](https://github.com/brianmario/yajl-ruby/issues/116)   
- [jekyll/jekyll-help#50](https://github.com/jekyll/jekyll-help/issues/50)

[RubyInstaller 2.0]: https://groups.google.com/d/msg/rubyinstaller/mg5ailNICvM/QbBfNByec-0J
[yajl]: http://rubygems.org/gems/yajl-ruby/versions/1.1.0




## 5. Liquid Exception: No such file or directory - python C:/Ruby193/lib/ruby/gems/1.9.1/gems/pygments.rb-0.5.0/lib/pygments/mentos.py

Check your `PATH` environment variable, like `;C:\python27`;   
Make sure that have installed Python 2.x and set env path for pygments.rb call.

相关的 Jekyll issue:   
- [jekyll/jekyll#2551](https://github.com/jekyll/jekyll/issues/2551)

__Note:__   
之所以要安裝 Python 是因為 代码高亮 plugin -- [pygments.rb][]，是基于 Python 的代码高亮工具 [Pygments][] 的一个 Ruby wrapper，内嵌 Python 解释器，兼容 Python 2.5、Python 2.6 和 Python 2.7。旧版的解释是，还需安装 RubyPython 调用 Python Pygments 包；雖然 Pygments 支援 Python 2 版和 3 版，不過由於 Ruby 和 Python 之間的橋接是用 RubyPython 完成，而 [rubypython][] 目前只支援 Python 2。所以還是乖乖安裝 2 版吧！（[见pygments.rb](https://github.com/tmm1/pygments.rb/blob/master/README.md)的`README.md`）

[pygments.rb]: https://github.com/tmm1/pygments.rb
[Pygments]: http://pygments.org/
[rubypython]: http://www.rubydoc.info/gems/rubypython/0.6.3/frames#Requirements




## 6. Jekyll 强制 Categories 单词小写

`post` 可以定义 categories 和 tags，但是 Jekyll 解析 post 时会自行将 `categories` 转成小写单词输出，而 `tags` 不会转换。   
比如，post的YAML front matter 是：

```yaml
{% raw %}
---
layout: post
category: Mathematica//Math-Experiment
Tags: Formula Periodic Sequence
---
{% endraw %}
```

而 Jekyll 会将 category 转换为 `mathematica//math-experiment` 输出。   
如果不想 Jekyll 输出小写 category，可以变通下让单词首字母大写显示，但无法还原 post 定义的样式。   
而如果 GitHub 上面 deploy 的是 `_site` 文件，那么可以 local 更改源码 post.rb 文件让其输出最初定义的格式，不过这样可能有潜在的问题(可以规避)。具体见下面的 issue 链接。

{% raw %}
<pre><code>{% for tag in page.categories %}
&lt;a href="{{ site.url }}/categories/index.html#{{ page.categories | cgi_encode }}" data-toggle="tooltip" title="Other posts from the {{ <font color="red">tag | capitalize</font> }} category" rel="tag"&gt;{{ <font color="red">tag | capitalize</font> }}&lt;/a&gt;
{% unless forloop.last %}&amp;nbsp;&amp;bull;&amp;nbsp;
{% endunless %}
{% endfor %}
</code></pre>
{% endraw %}

相关的 Jekyll issue:   
- [Why Jekyll convert my Capital words into lowercase in Categories](http://stackoverflow.com/questions/19074064/why-jekyll-convert-my-capital-words-into-lowercase-in-categories)   
- [jekyll/jekyll#842](https://github.com/jekyll/jekyll/issues/842)




## 7. warning: cannot close fd before spawn; 'which' is not recognized as an internal or external command, operable program or batch file

Windows环境下使用`pygments.rb`高亮code，即使plugin正常运行，但目前还存在这个麻烦的问题。因为是warning，所以本地运行Jekyll，一般可以忽略。   
然而博主由于强迫症猝发，本着追求完美的心态，就仔细追查了这个问题的根源。   
其实还是由Windows和Linux的系统环境造成的，确实比较麻烦。虽说解决方法有几个，目前 pygments.rb 0.6.0 仍然未得到解决。

![cannot close fd before spawn]({{ site.picture_dir }}/github-pages-issue/cannot_close_fd.png '"cannot close fd before spawn"')

如图中所示，'which' not found 是因为Windows Shell环境找不到这个命令（Cygwin和MinGW是可以找到的）。   
问题实质不在posix-spawn上，它没有调用`which`，而是pygments.rb调用`which`查询Windows下面Python的路径。由于pygments.rb要求Python 2.x，而Python 2.x和3.x可能同时在系统中存在，不同于Linux的是，Windows下无法判断`which`寻找到的`python`指令的版本，因而没有合适的处理这里。   
此处的详细代码逻辑见[这里][commit#90]。

规避这个warning有两个变通的方法:   
a. 上面链接的commit是其一，可以直接修改本地的 [popen.rb][commit#90] 代码;

<pre># Detect a suitable Python binary to use. We can't just use `python2`
# because apparently some old versions of Debian only have `python` or
# something like that.
def python_binary
	<font color="cyan">if RUBY_PLATFORM =~ /(mswin|mingw|cygwin|bccwin)/
		return 'python'
	end</font>
	@python_binary ||= begin
		`which python2`
		$?.success? ? "python2" : "python"
	end
end</pre>

b. 另一方法见[Fix Python hunting logic on Windows][commit#138]。(需要注意的是，这个方法需要安装[Python Launcher]，目的是利用`py -2`调用Python 2.x解释器)

[commit#90]: https://github.com/koron/pygments.rb/commit/edf6665506b57b333c5f8838d86a9f7ab3016517
[commit#138]: https://github.com/hickford/pygments.rb/commit/c6554620e34f3b73c1915b287ac59cc9d977a20a
[Python Launcher]: https://docs.python.org/3.3/using/windows.html#python-launcher-for-windows

相关的 GitHub Issue:   
- [tmm1/pygments.rb#90](https://github.com/tmm1/pygments.rb/pull/90)   
- [tmm1/pygments.rb#138](https://github.com/tmm1/pygments.rb/pull/138)   
- [rtomayko/posix-spawn#61](https://github.com/rtomayko/posix-spawn/issues/61)   
- [jekyll/jekyll#2789](https://github.com/jekyll/jekyll/issues/2789)   
- [jekyll/jekyll#2052](https://github.com/jekyll/jekyll/issues/2052)




## 8. 在 Windows下使用 Jekyll 出现中文字符集错误

在 windows 下使用 Jekyll 时经常会遇到字符集错误，比如：

```
Liquid error: incompatible character encodings: UTF-8 and GBK
```

这里介绍几种解决方案。

- **修改 bash 的字符集**  
  在 `C:\Documents and Settings\用户名`下，找到文件 `.bash_profile`，后面加两行：
  
    ```bash
    set LC_ALL=en_US.UTF-8
    set LANG=en_US.UTF-8
    ```

- **所有文档使用 utf-8 无 BOM 格式**  
  在 Windows 下新建的文本文件默认是 **ANSI** 格式的，而 Jekyll 只认 utf-8。如果遇到 ANSI 格式编码的文件，可以在 Notepad++ 中转换
  
- **使用 Unix 换行符**  
  可以在 Notepad++ 中转换，开启**“显示所有字符”**选项，这样就可以看出文档用的是 Windows 的换行符还是 Unix 的换行符。  
  在这种模式下，Windows 的换行符显示的是 `CR`，Unix 的换行符显示的是 `LF`。
  
- **Notepad++ 新建文档配置首选项**  
  在**设置-->首选项**里，如下设置：  
  ![转换为utf-8编码]({{ site.picture_dir }}/github-pages-issue/utf-8_no_bom.png)
  
- **注意 YAML 头部的格式**  
  模板文件的元数据以 YAML 的格式展现，YAML 头部经常会出现三个问题：  
  (1) 三短线前面不能有空格；  
  (2) **“名: 值”对**里冒号后面要有空格；  
  (3) 回车后不要有 Tab 符；  
  (4) 表示**数组成员**开始的 `-` 号后面要有空格  
  在 Notepad++ 中开启**“显示所有字符”**选项后，就可以看清空格和 Tab 符了


除此之外，假如 post 文件名中含有中文，或者任何**非 ASCII 编码的字符**，那么 Jekyll 新版本依然能正常编译，只是本地预览时无法正常显示；不用担心，推送到 GitHub 上后是可以访问的。

![URL Encodeing Error]({{ site.picture_dir }}/github-pages-issue/encode_error.jpg)

这是 Jekyll 本身问题，如果将生成的静态文件放到其他 **Web 容器**，比如 **Apache**、**Nginx**等，此时也是可以访问的。这类问题也可以扩展到 **URL 路径中存在中文字符**的情形。由于 Jekyll 对 utf-8 编码的处理的比较好，所以我们新建 page 或 post 时尽量使用英文命名。




## 9. Markdown 中的代码块高亮

Jekyll 原生提供 {% raw %}`{% highlight language %}`{% endraw %} 命令来格式代码块，进行语法高亮。除此之外，基本主流 Markdown 解析器（包含 GitHub Flavored Markdown）还支持用一对3个反引号 <code>```</code> 的符号来标记代码块，简化上面的命令代码。

博主在使用 Markdown 语法的过程中发现，对于第二种方式，只有 `redcarpet` 和 `kramdown` 这两个解析器能够识别并格式代码块为 Html 文本格式；而常用的 `rdiscount` 解析器不能识别这种标记，无法添加 Html 标签和 CSS 类来转换代码块。

3 个解析器及相关 gem 组件的版本为：

```ruby
def self.gems
    {
      # Jekyll
      "jekyll"                => "2.4.0",
      "jekyll-coffeescript"   => "1.0.0",
      "jekyll-sass-converter" => "1.2.0",

      # Converters
      "kramdown"              => "1.3.1",
      "maruku"                => "0.7.0",
      "rdiscount"             => "2.1.7",
      "redcarpet"             => "3.1.2",
      "RedCloth"              => "4.2.9",

      # Liquid
      "liquid"                => "2.6.1",

      # Highlighters
      "pygments.rb"           => "0.6.0",

      # Plugins
      "jemoji"                => "0.3.0",
      "jekyll-mentions"       => "0.1.3",
      "jekyll-redirect-from"  => "0.6.2",
      "jekyll-sitemap"        => "0.6.0",
    }
end
```



