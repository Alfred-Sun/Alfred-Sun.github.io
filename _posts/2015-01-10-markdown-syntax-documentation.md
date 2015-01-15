---
layout: post
title: 讲解 Markdown
category: Markdown
tags: [Markdown, Syntax, Extensions]
author: Alfred Sun
updated: 2015-01-12 15:56
keywords: Markdown, Syntax
description: Markdown Syntax Documentation 刚开始接触markdown的时候，觉得好简单好方便，随着使用的深入，发现 Markdown 好像在很多地方有很多不同的实现，语法特性各不相同，顿时陷入迷茫
---

> _Markdown is a text-to-HTML conversion tool for web writers.   
> Markdown allows you to write using an **easy-to-read, easy-to-write** plain text format, then convert it to structurally valid XHTML (or HTML)._
> <div style="text-align:right;margin-top:5px;"> –  <a href="http://daringfireball.net/projects/markdown/"><b>John Gruber</b></a></div>

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

![markdown]({{ site.picture_dir }}/markdown-syntax-documentation/markdown.png)

解析 Markdown 语法，有两个库：运行于浏览器和 Nodejs 的 JavaScript 库 [marked][]，和 Python 库 [Markdown][]。它们除了支持 Markdown 的[基本语法][]外，还支持表格、代码块、TOC(Table Of Contents) 等扩展功能。

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

### 语法文档

**标准 Markdown 语法**: [翻译版](http://alfred-sun.github.io/markdown-syntax-zhtw/)   
官方 Markdown 语法: http://daringfireball.net/projects/markdown/syntax   
一份语法速查表: [Markdown语法速查表]({{ site.document_dir }}/markdown-syntax-cheat-sheet.pdf)   
GFM Syntax Guide: an [overview of Markdown syntax]({{ site.picture_dir }}/markdown-syntax-documentation/Github Flavored MarkDown.jpg) used anywhere on GitHub.com   
另一份别人整理的 Markdown/GFM 语法: [MarkDown轻量级标记语言]({{ site.document_dir }}/MarkDown轻量级标记语言.pdf)


### Personal Notes

1. 嵌套的列表：   
	Create nested lists by indenting list items by two spaces.

		1. Item 1
		  1. A corollary to the above item.
		  2. Yet another point to consider.
		2. Item 2
		  * A corollary that does not need to be ordered.
			* This is indented four spaces, because it's two spaces further than the item above.
			* You might want to consider making a new list.
		3. Item 3

2. 加强的代码块：   
	行内代码用单个反引号`` ` ``包住，即可显示原有格式的文本。   
	跨行代码块，可以不用缩进4个空格，使用3个反引号<code>```</code>包住文本区块(Fenced code blocks)：

		Check out this neat program I wrote:
		
		```
		x = 0
		x = 2 + 2
		what is x
		```

	这样Code blocks更容易语法高亮，直接在标记后接语言识别符。例如，高亮一段 Ruby 代码：

		```ruby
		require 'redcarpet'
		markdown = Redcarpet.new("Hello World!")
		puts markdown.to_html
		```

3. 表格支持：   
	建表格使用连字符`-`和竖线`|`，区分开表头和单元格：

	<pre>
	First Header  | Second Header
	------------- | -------------
	Content Cell  | Content Cell
	Content Cell  | Content Cell
	</pre>

	想好看一些的话，也可以在开头和结尾加竖线：

		| First Header  | Second Header |
		| ------------- | ------------- |
		| Content Cell  | Content Cell  |
		| Content Cell  | Content Cell  |

	顶部的连字符无需一定匹配表头文本的长度；也可以添加行内的Markdown语法文本，如链接、加粗、删除线等：

		| Name | Description          |
		| ------------- | ----------- |
		| Help      | ~~Display the~~ help window.|
		| Close     | _Closes_ a window     |

	表头行使用冒号`:`实现表格内列的文本对齐方式：

		| Left-Aligned  | Center Aligned  | Right Aligned |
		| :------------ |:---------------:| -----:|
		| col 3 is      | some wordy text | $1600 |
		| col 2 is      | centered        |   $12 |
		| zebra stripes | are neat        |    $1 |

	冒号在最左边表示该列文本左对齐，最右边表示文本右对齐，两边都加冒号表示居中对齐文本。

4. LaTeX 公式   
	#### 示例:
	![MathJax LaTeX demo]({{ site.picture_dir }}/markdown-syntax-documentation/MathJax.png)

		// $$ 表示整行公式：

		$$\sum_{i=1}^n a_i=0$$

		$$f(x_1,x_x,\ldots,x_n) = x_1^2 + x_2^2 + \cdots + x_n^2 $$

	访问 [MathJax Tutorial](http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference) 参考更多使用方法。   
	MathJax 文档：[_What is MathJax ?_](http://docs.mathjax.org/en/latest/mathjax.html)
	
	<blockquote style="margin-left:0px;"><p><a href="http://www.mathjax.org" title="Beautiful math in all browsers" target="_blank" class="external"><strong>MathJax</strong></a> is an open-source JavaScript display engine for mathematics(<a href="http://www.latex-project.org" title="LaTeX – A document preparation system" target="_blank" class="external">LaTeX</a>, <a href="http://www.w3.org/TR/MathML3" target="_blank" class="external">MathML</a>, and <a href="http://www1.chapman.edu/%7Ejipsen/mathml/asciimath.html" target="_blank" class="external">AsciiMath</a> notation) that works in all modern browsers.</p></blockquote>

	<!--[**MathJax**][MathJax_] is an open-source JavaScript display engine for mathematics([LaTeX][], [MathML][], and [AsciiMath][] notation) that works in all modern browsers.-->

[MathJax_]: http://www.mathjax.org "Beautiful math in all browsers"
[LaTeX]: http://www.latex-project.org "LaTeX – A document preparation system"
[MathML]: http://www.w3.org/TR/MathML3
[AsciiMath]: http://www1.chapman.edu/~jipsen/mathml/asciimath.html

5. 流程图   
	#### 示例:
	<p style="
    margin-top: -25px;
"><img src="{{ site.picture_dir }}/markdown-syntax-documentation/flowchart.svg" alt="flowchart.js demo"></p>

		```flow
		st=>start: Start:>http://alfred-sun.github.io
		io=>inputoutput: verification
		op=>operation: Your Operation
		cond=>condition: Yes or No?
		sub=>subroutine: Your Subroutine
		e=>end:>https://github.com/adrai/flowchart.js

		st->io->op->cond
		cond(yes)->e
		cond(no)->sub->io
		```

	#### 更多语法参考：[流程图语法参考](http://adrai.github.io/flowchart.js/) _(View on [**GitHub**](https://github.com/adrai/flowchart.js "flowchart.js"))_

6. 序列图   
	#### 示例:
	![js-sequence-diagrams demo]({{ site.picture_dir }}/markdown-syntax-documentation/diagram.svg)

		```seq
		Andrew->China: Says Hello
		Note right of China: China thinks\nabout it
		China-->Andrew: How are you?
		Andrew->>China: I am good thanks!
		```

	#### 更多语法参考：[序列图语法参考](http://bramp.github.io/js-sequence-diagrams/) _(View on [**GitHub**](https://github.com/bramp/js-sequence-diagrams "js-sequence-diagrams"))_

7. 注脚   
	使用 `[^keyword]` 表示注脚。例如：
	
	这是第一个注脚[^footnote1]的样例。   
	这是第二个注脚[^footnote2]的样例。

		这是第一个注脚[^footnote1]的样例。   
		这是第二个注脚[^footnote2]的样例。
		...
		[^footnote1]: 这是一个 *注脚* 的 **文本**。
		[^footnote2]: 这是另一个 *注脚* 的 **文本**。

[^footnote1]: 这是一个 *注脚* 的 **文本**。
[^footnote2]: 这是另一个 *注脚* 的 **文本**。

[MathJax]: http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference


## 一些 Markdown 参考

Markdown是一种网络书写语言，其目标是实现易读易写，且兼容HTML语言。Markdown的流行得益于Github和Stackoverflow，Stackoverflow的代码块以及Github上的README.md文件格式都是通过Markdown表现的。另外还有支持各大浏览器的写邮件的Markdown插件：[Markdown Here](https://github.com/adam-p/markdown-here)

使用Markdown可以书写自由书籍，关于此，您可以参看文章[用Markdown来写自由书籍-开源技术的方案][]，[开源书和开源技术-Markdown篇][]一文也介绍了一些Markdown与开源书和开源技术之间的渊源。已经有一些开源书籍使用Markdown书写了，亚嵌教育的开源书籍[源码开放学ARM][]、蒋鑫老师的[GotGithub][]一书，这些开源书籍都给学习者提供很大帮助。Markdown书写已经是一种开源精神体现。好了，既然Markdown与自由书写这么默契，我们怎么用Markdown来写自己的README.md，自己的博客甚至自己的开源书籍呢？

这里有一份翻译的[Markdown的语法][]，从[这里](https://gitcafe.com/riku/Markdown-Syntax-CN/blob/master/syntax.md)看可能更直观。Markdown语法是如此简单，以至于还不到1000行就描述完了。初学者您可以参考[献给写作者的Markdown新手指南][]。Github的Markdown语法大部分都与传统Markdown语法一样，可以看看[markdown-basics][]，但也有些扩展，扩展内容在文档[GitHub Flavored Markdown][]中。

在使用Markdown过程中，您也许还需要一个实时显示Markdown文档预览的工具，这方面的工具有很多，这里推荐几个在线的Markdown文档编辑器：

1. **Dillinger**:       http://dillinger.io/
2. **StackEdit**:       https://stackedit.io/
3. **印象笔记**:        http://maxiang.info/

“[免费Markdown写作工具简评][]”一文提供了有关于Markdown文档编辑器的更多信息。
谷歌浏览器貌似也有[Markdown的预览插件](https://github.com/volca/markdown-preview)，这样您就可以用记事本编辑，用浏览器预览了。
印象笔记也有Chrome的扩展，可在商店搜素“马克飞象”。

我们说Markdown是为了书写自由电子书，那么Markdown如何生成pdf或html格式的文档呢？我们可以借助Markdown文档编辑器的功能，StackEdit 就能胜任，使用StackEdit左上角的菜单，"Save As..."就可以做到。

还有2款集编辑与Markdown预览于一身的不错工具 [Everedit][] 和 **[Cmd Markdown][]**，国产的哦..

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
- 支持自动生成 **[Table of Contents](https://golem.ph.utexas.edu/~distler/maruku/#toc-generation)**

Maruku的语法详见[这里](https://github.com/bhollis/maruku/blob/master/docs/markdown_syntax.md)

不过，该项目已经停止维护了。

### Kramdown ###

同样是ruby开发的解释器，[kramdown](http://kramdown.gettalong.org/quickref.html)吸取了Maruku几乎所有的特点，功能更为强大。其中有特点的功能有：

1. 改进了一些二义语法
2. 引入EOB标记`^`作为块元素的分隔符
3. 手写table的语法更加强大一些，支持table中的header和footer
4. 同样支持ALD(Attribute List Definitions属性列表定义)
5. 同样支持 **LaTeX** 编辑显示支持
6. 还支持注释，以及在转化时配置一些转化选项

[Github-Page 推荐使用这个解释器](https://help.github.com/articles/migrating-your-pages-site-from-maruku)

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

### Github 支持 ###

Github Page 对于上述的基于 Ruby 的 markdown 是支持的，从[这里](https://pages.github.com/versions/)可以看到。另外，Github 对于 Issue、comments、pull request descriptions 等，还定义了 GFM([GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown))，其中的语法一般基本来源于上面的提到的东西。除此之外，GitHub 还支持一些额外的特性：

- 支持把列表变成带勾选框的任务列表

{% highlight html %}
- [x] @mentions, #refs, [links](), **formatting**, and <del>tags</del> are supported 
- [x] list syntax is required (any unordered or ordered list supported) 
- [x] this is a complete item 
- [ ] this is an incomplete item
{% endhighlight %}


- 站内对分支、问题、用户等对象的直接引用

<pre><code>* SHA: <font color="red">a5c3785ed8d6a35868bc169f07e40e889087fd2e</font>
* User@SHA: <font color="yellow">jlord@a5c3785ed8d6a35868bc169f07e40e889087fd2e</font>
* User/Repository@SHA: <font color="red">jlord/sheetsee.js@a5c3785ed8d6a35868bc169f07e40e889087fd2e</font>
* #Num: <font color="yellow">#26</font>
* GH-Num: <font color="red">GH-26</font>
* User#Num: <font color="yellow">jlord#26</font>
* User/Repository#Num: <font color="red">jlord/sheetsee.js#26</font>
</code></pre>

- 表情 [Emoji](http://www.emoji-cheat-sheet.com/)
- 支持部分 HTML 标签 ([GitHub Markup](https://github.com/github/markup/tree/master#html-sanitization))


### MultiMarkdown ###

MMD([MultiMarkdown][]) 是 C 实现的 Markdown 解析器，支持几乎任何OS平台；   
Markdown 语法的超集，不仅加强了 PHP Markdown Extra 一些功能，如对表格、注脚、引用、公式的支持，而且能转换输出更多类型的文档：HTML，LaTeX，PDF，ODF，RTF，甚至是 MS Word。

The many output formats of MultiMarkdown：
<img src="{{ site.picture_dir }}/markdown-syntax-documentation/OPML-MMD-Map.png" alt="multiple output formats" title="Example: MultiMarkdown output formats" style="background-color:#222;">

> * 最初的 MMD(MultiMarkdown v2) 改自 Markdown.pl Perl脚本；   
> * MultiMarkdown v3(aka **peg-multimarkdown**) 在 John MacFarlane 的 [peg-markdown][] 基础上构建的，其核心的 PEG(parsing expression grammar) 提高了 MMD 可靠性；   
> * 最新的 [MultiMarkdown v4][] 性能上做了很多优化，完全重写 MMD v3，仅保留了PEG和部分重要的程序，是目前最出色的版本。

[MultiMarkdown]: http://fletcherpenney.net/multimarkdown/
[peg-markdown]: https://github.com/jgm/peg-markdown
[MultiMarkdown v4]: https://github.com/fletcher/MultiMarkdown-4/

其他的特性：

- 支持自定义输出任何 [XSLT][] 格式的文档
- 多文件批处理
- 支持主要OS上的拖拽操作
- 支持集成进 [TextMate][]
- [OmniOutliner][] Plugin 使得本地 OmniOutliner 大纲输出为 MDD 文本文件
- MMD QuickLook 生成器实现对 MMD 文本或 OS X Finder 找到的 [OPML][] 文件的预览

[XSLT]: http://en.wikipedia.org/wiki/XSLT
[TextMate]: http://macromates.com/
[OmniOutliner]: http://www.omnigroup.com/omnioutliner/
[OPML]: http://en.wikipedia.org/wiki/OPML

### Pandoc’s Markdown ###

以上扩展，某种意义上来讲，并不是针对写作的。开源界传说中的高富帅社区 - [Haskell][]社区，其作品 [Pandoc][Pandoc’s Markdown] 给了我们更好的选择，在多个方面完败 MMD，参考：[Pandoc vs Multimarkdown][]。

Haskell是什么？一种编程语言。每位资深的开发者学习它，都会有些不知所措，因为，它的编程思路不同于通常意义上类似于C#、Python、Java这些流行的编程语言。它来自一群高智商的开发者的贡献，据说人人有PHD学位，是[函数式编程语言][]的典范。[Pandoc][] 作者[John MacFarlane][]也不例外。

Pandoc 是一个 Haskell 库，一个标记语言转换工具，可实现不同标记语言间的格式转换，堪称该领域中的“瑞士军刀”。Pandoc 以命令行形式实现与用户的交互，可支持多种操作系统，支持大量的文本类型的输入输出。

[JG_markdown]: http://daringfireball.net/projects/markdown/
[Haskell]: http://www.haskell.org/
[Pandoc]: http://johnmacfarlane.net/pandoc/
[Pandoc’s Markdown]: http://johnmacfarlane.net/pandoc/README.html#pandocs-markdown
[Pandoc’s Markdown Options]: http://johnmacfarlane.net/pandoc/README.html#options
[Pandoc vs Multimarkdown]: https://github.com/jgm/pandoc/wiki/Pandoc-vs-Multimarkdown
[函数式编程语言]: http://zh.wikipedia.org/wiki/函數式編程
[John MacFarlane]: http://johnmacfarlane.net/

#### Pandoc支持的标记语言格式

<table>
<tbody><tr>
<th width="185px">Pandoc 可读取的源格式</th>
<th>Pandoc 可生成的目标格式</th>
</tr>

<tr><td><ul style="margin-bottom:0px;">
<li><a href="http://daringfireball.net/projects/markdown/" title="Markdown">Markdown</a></li>
<li><a href="http://docutils.sourceforge.net/docs/ref/rst/introduction.html" title="ReStructuredText">reStructuredText</a></li>
<li><a href="http://redcloth.org/textile" title="Textile">textile</a></li>
<li><a href="http://www.w3.org/TR/html40/" title="HTML">HTML</a></li>
<li><a href="http://www.docbook.org/" title="DocBook">DocBook</a></li>
<li><a href="http://www.latex-project.org/" title="LaTeX">LaTeX</a></li>
<li><a href="http://www.mediawiki.org/wiki/Help:Formatting" title="MediaWiki">MediaWiki markup</a></li>
<li><a href="http://twiki.org/cgi-bin/view/TWiki/TextFormattingRules" title="TWiki">TWiki markup</a></li>
<li><a href="http://dev.opml.org/spec2.html" title="OPML">OPML</a></li>
<li><a href="http://www.gnu.org/software/emacs/" title="Emacs">Emacs</a></li>
<li><a href="http://orgmode.org/" title="Org-模式">Org-Mode</a></li>
<li><a href="http://txt2tags.org/" title="Txt2Tags">Txt2Tags</a></li>
<li><a href="http://www.microsoft.com/interop/openup/openxml/default.aspx" title="Microsoft Word docx">Microsoft Word docx</a></li>
<li><a href="http://en.wikipedia.org/wiki/EPUB" title="EPUB">EPUB</a></li>
<li><a href="http://www.haskell.org/haddock/doc/html/ch03s08.html" title="Haddock">Haddock markup</a></li>
</ul></td>

<td><ul style="margin-bottom:0px;">
<li>HTML格式：包括<a href="http://www.w3.org/TR/xhtml1/">XHTML</a>，<a href="http://www.w3.org/TR/html5/">HTML5</a>及HTML slide shows(<a href="http://www.w3.org/Talks/Tools/Slidy">Slidy</a>, <a href="http://lab.hakim.se/reveal-js/">reveal.js</a>, <a href="http://goessner.net/articles/slideous/">Slideous</a>, <a href="http://meyerweb.com/eric/tools/s5/">S5</a>, or <a href="http://paulrouget.com/dzslides/">DZSlides</a>)</li>
<li>文字处理软件格式：包括Microsoft Word docx、OpenOffice/LibreOffice<a href="http://en.wikipedia.org/wiki/OpenDocument" title="ODT">ODT</a>、<a href="http://opendocument.xml.org/" title="OpenDocument XML">OpenDocument XML</a></li>
<li>电子书Ebooks格式：包括EPUB（第2版及第3版）、<a href="http://www.fictionbook.org/index.php/Eng:XML_Schema_Fictionbook_2.1" title="FictionBook">FictionBook2</a></li>
<li>技术文档格式：包括<a href="http://www.docbook.org/" title="DocBook">DocBook</a>、<a href="http://www.gnu.org/software/texinfo/" title="GNU TexInfo">GNU TexInfo</a>、<a href="http://www.gnu.org/software/groff/groff.html" title="手册页">Groff man</a> pages、<a href="http://www.haskell.org/haddock/doc/html/ch03s08.html" title="Haddock">Haddock markup</a></li>
<li>页面布局格式：<a href="https://www.adobe.com/content/dam/Adobe/en/devnet/indesign/cs55-docs/IDML/idml-specification.pdf" title="InDesign ICML">InDesign ICML</a></li>
<li>大纲处理标记语言格式：<a href="http://dev.opml.org/spec2.html" title="OPML">OPML</a></li>
<li>TeX格式：包括LaTeX、<a href="http://www.pragma-ade.nl/" title="ConTeXt">ConTeXt</a>、<a href="http://zh.wikipedia.org/wiki/Beamer_(LaTeX)" title="Beamer (LaTeX)">LaTeX Beamer slides</a></li>
<li><a href="http://en.wikipedia.org/wiki/Portable_Document_Format">PDF</a>格式：需要LaTeX支持</li>
<li>轻量级标记语言格式：包括Markdown、reStructuredText、Textile、Org-Mode、MediaWiki markup、<a href="http://www.methods.co.nz/asciidoc/" title="AsciiDoc">AsciiDoc</a>、<a href="https://www.dokuwiki.org/wiki:syntax">DokuWiki markup</a>、Emacs</li>
<li>自定义格式：可使用<a href="http://www.lua.org/" title="Lua">lua</a>自定义转换规则</li>
</ul></td>
</tr></tbody>
</table>

更详细的格式信息可参见项目主页上的[图示](http://johnmacfarlane.net/pandoc/diagram.png)

#### Pandoc for markdown

Pandoc Markdown是John Gruber markdown 语法的改进和加强版，包含对脚注、上标、下标、自动引用和参考书目、document metadata (title/author/date)、表格、定义型列表、加强的代码块、删除线、内容目录结构、LaTeX公式、HTML区块内的markdown文本等的支持。   
这些强化功能可以通过`markdown_strict`输入输出格式选项来开启或关闭(单独控制某个功能的启用禁用可以使用`+EXTENSION`或`-EXTENSION`)，参看 [Pandoc’s markdown][Pandoc’s Markdown Options]。   
这里有一份繁体中文翻译版的 [Pandoc 版本 Markdown 語法](http://pages.tzengyuxio.me/pandoc/)   
另一篇简版说明文档：[Pandoc Markdown写作规范](http://alfred-sun.github.io/markx-pandoc/ "pandoc.herokuapp.com")

与多数通过正则表达式实现markdown转HTML的工具不同，Pandoc是模块化设计，对于每个输入输出的格式都有单独的一个模块；它含有一组解析指定文本格式的readers和一组转换为目标文本格式的writers。这样，只需添加一个文本格式的reader或者writer模块，就能增加Pandoc对这个格式文本的输入输出支持。

关于Pandoc的安装使用，不愿看英文Guide的可以看看下面这篇文章，通俗易懂。   
[Markdown写作进阶：Pandoc入门浅谈](http://www.yangzhiping.com/tech/pandoc.html)


## 结束语

Markdown纯文本非常简洁，让笔者注重文字而非排版，值得学习使用。然而，目前Markdown文本的解析工具有很多，虽然都支持标准Markdown语法，但各个解析器间语法各有不同，提供的扩展功能也各有千秋。尽管标准语法已经满足大部分写作需求，但是有些时候确实急需某项高级功能实现，就像博主，目前还只用标准语法，特殊的功能只能通过嵌入HTML文本来实现，不仅麻烦，而且直接违背了Markdown读写趋简的宗旨。既然不想被这么多工具的语法搞晕，又想偶尔能使用高级功能，那么，选择一款扩展功能丰富又满足需求的工具，是一个很好的办法。Pandoc是个不错的选择，尤其适用于文献的写作排版，可以节省大量时间，这也作者的编写这个工具的初衷；而且，博主非常喜欢多种文档间转换这个功能。

有了Pandoc，再找个Pandoc编辑器，比如 [Pandoc Vim][]、[Sublime Text][]或者[TextMate][TextMate OpenSource]，是不是看起来很有Geek范儿...

更多Pandoc编辑器、插件请参考：**[Pandoc-Extras][]**

[Pandoc Vim]: https://github.com/vim-pandoc/vim-pandoc
[Sublime Text]: http://www.sublimetext.com/
[TextMate OpenSource]: https://github.com/textmate/textmate
[Pandoc-Extras]: https://github.com/jgm/pandoc/wiki/Pandoc-Extras


