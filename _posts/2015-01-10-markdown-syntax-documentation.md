---
layout: post
title: 讲解 Markdown
category: Markdown
tags: [Markdown, Syntax]
author: Alfred Sun
updated: 2015-01-12 15:56
keywords: Markdown, Syntax
description: Markdown Syntax Documentation 刚开始接触markdown的时候，觉得好简单好方便，随着使用的深入，发现 Markdown 好像在很多地方有很多不同的实现，语法特性各不相同，顿时陷入迷茫
---

## 开始用 Markdown 写博客

让博客程序写文章时支持 Markdown 语法：用过 GitHub 的同学对 Markdown 都不陌生，对比常见的富文本编辑器，它至少有以下优点：

- 纯文本，兼容性极强，可以用所有文本编辑器打开
- 格式转换方便，Markdown 可以轻松转换为各种格式
- 让你专注于文字而不是排版
- Markdown 的标记语法有极好的可读性
- 在 Markdown 中，依然可以使用 html 标记

对于喜欢贴代码的程序员来说，GFM(GitHub Flavored Markdown) 定义的[代码块语法][]方便好用。Sublime Text 对 Markdown 的语法高亮也支持得也很好，一目了然。Web 上也有强大的 [CodeMirror][] 支持 Markdown 的编写。

[代码块语法]: https://help.github.com/articles/github-flavored-markdown#fenced-code-blocks
[CodeMirror]: http://codemirror.net/mode/gfm/index.html

<!--more-->

![markdown]({{ site.picture_dir }}/markdown.png)

解析 Markdown 语法，我用过两个库：运行于浏览器和 Nodejs 的 JavaScript 库 [marked][]，和 Python 库 [Markdown][]。它们除了支持 Markdown 的[基本语法][]外，还支持表格、代码块、TOC 等扩展功能。

最近，身边不少技术强爱折腾的朋友都把自己博客换成 Nodejs + Markdown 了。如果不想自己开发，也可以用 [Jekyll][] 或 [Octopress][] 等系统。它们都支持 Markdown，都能很好的跟 github 整合。

还有一家叫 [postach.io][] 的网站比较有趣，在这里写博客的方式很特别：绑定 [Evernote][] 帐号，在指定记事本新建 Note 并添加名为 published 的 tag，同步即可。当然，postach.io 也支持 Markdown。

现在 GitHub 和 GitCafe，都很容易将项目变成博客，还支持绑定域名、本地搭建服务等高级功能，可以去官网了解。


[marked]: https://github.com/chjj/marked
[Markdown]: http://pythonhosted.org/Markdown/
[基本语法]: http://daringfireball.net/projects/markdown/syntax
[Jekyll]: http://jekyllrb.com/
[Octopress]: http://octopress.org/
[postach.io]: http://postach.io/
[Evernote]: http://www.evernote.com/



## Markdown 语法说明

标准 Markdown 语法: [翻译版](http://alfred-sun.github.io/markdown-syntax-zhtw/)   
官方 Markdown 语法: http://daringfireball.net/projects/markdown/syntax   
一份语法速查表: [Markdown语法速查表]({{ site.document_dir }}/markdown-syntax-cheat-sheet.pdf)   
另一份别人整理的 Markdown/GFM 语法: [MarkDown轻量级标记语言]({{ site.document_dir }}/MarkDown轻量级标记语言.pdf)



## 一些 Markdown 参考

Markdown是一种网络书写语言，其目标是实现易读易写，且兼容HTML语言。Markdown的流行得益于Github和Stackoverflow，Stackoverflow的代码块以及Github上的README.md文件格式都是通过Markdown表现的。从这里您可以很直观的看到Markdown的效果：https://github.com/adam-p/markdown-here

使用Markdown可以书写自由书籍，关于此，您可以参看文章[用Markdown来写自由书籍-开源技术的方案][]，[开源书和开源技术-Markdown篇][]一文也介绍了一些Markdown与开源书和开源技术之间的渊源。已经有一些开源书籍使用Markdown书写了，亚嵌教育的开源书籍[源码开放学ARM][]、蒋鑫老师的[GotGithub][]一书，这些开源书籍都给学习者提供很大帮助。Markdown书写已经是一种开源精神体现。好了，既然Markdown与自由书写这么默契，我们怎么用Markdown来写自己的README.md，自己的博客甚至自己的开源书籍呢？

这里有一份翻译的[Markdown的语法][]，从[这里](https://gitcafe.com/riku/Markdown-Syntax-CN/blob/master/syntax.md)看可能更直观。Markdown语法是如此简单，以至于还不到1000行就描述完了。初学者您可以参考[献给写作者的Markdown新手指南][]。Github的Markdown语法大部分都与传统Markdown语法一样，可以看看[markdown-basics][]，但也有些扩展，扩展内容在文档[GitHub Flavored Markdown][]中。

在使用Markdown过程中，您也许还需要一个实时显示Markdown文档预览的工具，这方面的工具有很多，这里推荐几个在线的Markdown文档编辑器：

1. **Dillinger**:       http://dillinger.io/
2. **StackEdit**:       https://stackedit.io/
3. **印象笔记**:        http://maxiang.info/

“[免费Markdown写作工具简评][]”一文提供了有关于Markdown文档编辑器的更多信息。
谷歌浏览器貌似也有[Markdown的预览插件](https://github.com/volca/markdown-preview)，这样您就可以用记事本编辑，用浏览器预览了。
印象笔记也有Chrome的扩展，可在商店搜素“马克飞象”。

我们说Markdown是为了书写自由电子书，那么Markdown如何生成pdf或html格式的文档呢？我们可以借助Markdown文档编辑器的功能，StackEdit就能胜任，使用StackEdit左上角的菜单，save as..就可以做到。

还有2款集编辑与Markdown预览于一身的不错工具 [Everedit][] 和 [Cmd Markdown][]，国产的哦..

最后，你可以在Github上找到这样一篇文章: [MARKDOWN是什么](https://github.com/Alfred-Sun/Markdown/blob/master/README.md "彪悍的人生不需要解释")

[用Markdown来写自由书籍-开源技术的方案]: http://www.ituring.com.cn/article/828
[开源书和开源技术-Markdown篇]: http://www.larrycaiyu.com/2011/12/31/ebook-by-markdown.html
[源码开放学ARM]: http://www.lumit.org/LASO/
[GotGithub]: http://www.worldhello.net/gotgithub/
[Markdown的语法]: http://wowubuntu.com/markdown/
[献给写作者的Markdown新手指南]: http://jianshu.io/p/q81RER
[markdown-basics]: https://help.github.com/articles/markdown-basics
[GitHub Flavored Markdown]: https://help.github.com/articles/github-flavored-markdown
[免费Markdown写作工具简评]: http://jianshu.io/p/pgN9Rb
[Everedit]: http://www.everedit.net
[Cmd Markdown]: https://www.zybuluo.com/mdeditor



## Markdown 各种扩展

### PHP Markdown Extra ###

Markdown的php解析与实现，并且增加了许多有用的扩展。[PHP Markdown Extra](https://michelf.ca/projects/php-markdown/extra/)其中几个比较重要的改进有：

- 支持在html块元素中插入markdown语法
- 支持为一些元素添加id或class，比如为header添加id属性，用带锚点的链接导航。例如：

{% highlight html %}
[Link back to header 1](#header1)

Header 1               {#header1}
========

## Header 2 ##         {#header2}
{% endhighlight %}


支持元素包括`header`、`code block`、`link`、`image`

- 支持将代码块用\`或者~包起来，这样可以避免一些二义，还可以为代码块添加id或class

{% highlight html %}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.html #example-1}
<p>paragraph <b>emphasis</b>
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{% endhighlight %}

- 支持手写的表格

{% highlight html %}
| Function name | Description                    |
| ------------- | ------------------------------ |
| `help()`      | Display the help window.       |
| `destroy()`   | **Destroy your computer!**     |
{% endhighlight %}

- 支持`dl`和`dt`在markdown中的对应语法
- 支持脚注引用

<pre><code>That's some text with a footnote.[&#94;1]

[&#94;1&#93;: And that's the footnote.
</code></pre>

- 支持专有名词`abbr`
- 避免下划线出现在单词中间，导致斜体输出


### Maruku ###

在 "始作俑者 PHP Markdown Extra" 后，很多基于 Ruby 的 Markdown 解释器开始浮现。其中，[Maruku](https://github.com/bhollis/maruku) 号称：

- 支持原生Markdown
- 支持所有PHP Markdown Extra的特性
- 支持新的元数据语法，实际上就是给元素添加属性的能力
- 支持[公式格式](https://github.com/bhollis/maruku/blob/master/docs/math.md)输出

Maruku的语法详见[这里](https://github.com/bhollis/maruku/blob/master/docs/markdown_syntax.md)

不过，该项目已经停止维护了。

### Kramdown ###

同样是ruby开发的解释器，[kramdown](http://kramdown.gettalong.org/quickref.html)吸取了Maruku几乎所有的特点，功能更为强大。其中有特点的功能有：

1. 改进了一些二义语法
2. 引入EOB标记`^`作为块元素的分隔符
3. 手写table的语法更加强大一些，支持table中的header和footer
4. 同样支持ALD(Attribute List Definitions属性列表定义)
5. 还支持注释，以及在转化时配置一些转化选项 

[Github-Page推荐使用这个解释器](https://help.github.com/articles/migrating-your-pages-site-from-maruku)

### RDiscount ###

[RDiscount](http://dafoster.net/projects/rdiscount/)又是一个基于Ruby开发的解释器，不过它是基于[Discount](http://www.pell.portland.or.us/~orc/Code/discount/)的语法移植的，所以语法规则需要参考[Discount](http://www.pell.portland.or.us/~orc/Code/discount/#Language.extensions)。其语法支持几种上面没有提到过的特性：

- 文本居中，即输出`<center>`
- 图片大小定义`![dust mite](http://dust.mite =150x150)`
- 输出`alpha`列表：`<ol type='a'></ol>`

### Redcarpet ###

[Redcarpet](https://github.com/vmg/redcarpet)是一个转化库，可以在标准Markdown的基础上，配置一些额外的功能：

- 单词中间的`_`不处理
- 转化PHP-Markdown风格的手写表格
- 转化PHP-Markdown风格的带包含的代码块，也可禁用标准markdown的代码块语法
- 自动link生成
- 删除线支持：`~~good~~`
- 高亮标签`<mark></mark>`通过`==highlighted==`输出
- 引用标签`<q></q>`通过`"quote"`输出
- 转化PHP-Markdown风格脚注
- 一些二义性的约束支持

### Github支持 ###

Github Page 对于上述的基于 Ruby 的 markdown 是支持的，从[这里](https://pages.github.com/versions/)可以看到。另外，Github 对于 Issue、comments 等，还定义了 GFM([GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown))，其中的语法一般基本来源于上面的提到的东西。除此之外，github 还支持一些额外的特性：

- 支持把列表变成带勾选框的任务列表

{% highlight html %}
- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> are supported 
- [x] list syntax is required (any unordered or ordered list supported) 
- [x] this is a complete item 
- [ ] this is an incomplete item
{% endhighlight %}


- 站内对分支、问题、用户等对象的直接引用
- [表情](http://www.emoji-cheat-sheet.com/)


### MultiMarkdown ###

[MultiMarkdown](http://fletcherpenney.net/multimarkdown/)




### Pandoc’s Markdown ###

[Pandoc’s Markdown](http://johnmacfarlane.net/pandoc/README.html#pandocs-markdown)

[中文翻译](http://pages.tzengyuxio.me/pandoc/)

[Pandoc Markdown写作规范](http://pandoc.herokuapp.com)

[Markdown写作进阶：Pandoc入门浅谈](http://www.yangzhiping.com/tech/pandoc.html)


