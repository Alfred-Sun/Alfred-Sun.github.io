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

It's missing, and don't know why...


## 4. should install bellows:

<!--more-->

\- [RubyInstaller Development Kit](https://github.com/oneclick/rubyinstaller/wiki/Development-Kit)   
\- [DevKit Overview](http://rubyinstaller.org/add-ons/devkit)


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


## 6. Liquid Exception: No such file or directory - python C:/Ruby193/lib/ruby/gems/1.9.1/gems/pygments.rb-0.5.0/lib/pygments/mentos.py

Check your `PATH` environment variable, like `;C:\python27`;   
Make sure that have installed Python 2.x and set env path for pygments.rb call.

相关的 Jekyll issue:   
- [jekyll/jekyll#2551](https://github.com/jekyll/jekyll/issues/2551)

__Note:__   
之所以要安裝 Python 是因為 代码高亮 plugin -- [pygments.rb][]，是基于 Python 的代码高亮工具 [Pygments][] 的一个 Ruby wrapper，内嵌 Python 解释器，兼容 Python 2.5、Python 2.6 和 Python 2.7。旧版的解释是，还需安装 RubyPython 调用 Python Pygments 包；雖然 Pygments 支援 Python 2 版和 3 版，不過由於 Ruby 和 Python 之間的橋接是用 RubyPython 完成，而 [rubypython][] 目前只支援 Python 2。所以還是乖乖安裝 2 版吧！（见pygments.rb的`README.md`）

[pygments.rb]: https://github.com/tmm1/pygments.rb
[Pygments]: http://pygments.org/
[rubypython]: http://www.rubydoc.info/gems/rubypython/0.6.3/frames#Requirements


## 7. Jekyll 强制 Categories 单词小写

`post` 可以定义categories和tags，但是Jekyll解析post时会自行将 `categories` 转成小写单词输出，而 `tags` 不会转换。   
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

而Jekyll会将category转换为 `mathematica//math-experiment`输出。   
如果不想Jekyll输出小写category，可以变通下让单词首字母大写显示，但无法还原post定义的样式。   
而如果GitHub上面deploy的是 `_site` 文件，那么可以local更改源码post.rb文件让其输出最初定义的格式，不过这样可能有潜在的问题(可以规避)。具体见下面的issue链接。

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


## 8. warning: cannot close fd before spawn; 'which' is not recognized as an internal or external command, operable program or batch file

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




## 9. 在 Windows下使用 Jekyll 出现中文字符集错误

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
  (2) “名: 值”对里冒号后面要有空格；  
  (3) 回车后不要有 Tab 符；  
  (4) 表示数组成员开始的 `-` 号后面要有空格  
  在 Notepad++ 中开启“显示所有字符”选项后，就可以看清空格和 Tab 符了



## 10. 关于代码高亮

- 用js插件：[DlHightLight][1]或**[Google Code Prettify][2]**或<u>**[Highlight.js][3]**</u>或**[dp.SyntaxHighlighter][4]**
- 用gist：推荐菜鸟使用，省心省事，支持语言多
- 用pygment：要安装python以及python的包管理软件，定制code style CSS文件，又是个大坑，不建议菜鸟使用，尤其是使用windows的

[1]: http://mihai.bazon.net/projects/javascript-syntax-highlighting-engine
[2]: https://code.google.com/p/google-code-prettify/
[3]: https://github.com/isagalaev/highlight.js
[4]: http://alexgorbatchev.com/SyntaxHighlighter/


## 11. markdown extension

There are two ways to strengthen the code style:   
one is to indent 4 spaces or 1 tab;   
the other is to use {% raw %}`{% highlight %}`{% endraw %} tag to parse the code block.

Now GitHub provides another approach to do it: use triple backticks(`` ` ` ` ``) to format text as its own distinct block.

Yes, it's OK to use like that and the result is similar to highlight block. But I found that by the second way only `redcarpet` and `kramdown` can identify the code language and render it with html; `rdiscount` won't add specific html and css to improve the code style.

