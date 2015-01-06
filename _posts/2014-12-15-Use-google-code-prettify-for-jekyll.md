---
layout: post
title: Jekyll 中用 Google Code Prettify
category: GitHub Pages
tags: [Jekyll, google-code-prettify]
author: Alfred Sun
keywords: GitHub Pages, Google Code Prettify
description: 介绍如何使用 google-code-prettify 高亮代码，并应用到 GitHub Pages
---

## 前言

本站博客在搭建过程中，试用过多个JS代码高亮工具，之前讲过的[SyntaxHighlighter][]虽然漂亮，但是加载渲染太慢，果断放弃。   
本文中介绍的这个[google-code-prettify][]就不同了，支持的语言数量比较多、比较全，支持自动识别代码语言，不需要手动指定，渲染效果也不错。最重要的是，非常轻巧，加载速度远比SyntaxHighlighter快得多，而且，可以直接使用 Markdown 的语法写代码。   
只有一点在Jekyll解析时不方便，就是当需要指定语言时，Markdown 解析出来的HTML代码class样式名称跟google-code-prettify要求的不同。不过博主目前还没有发现，指定语言的参数的有用之处。因为google-code-prettify自动识别语言和指定语言高亮代码的效果基本一样。

在本文中简称 google-code-prettify 的渲染引擎为：**Prettyprinter**

[SyntaxHighlighter]: http://alfred-sun.github.io/blog/2014/12/15/Use-Syntaxhighlighter-for-Jekyll/
[google-code-prettify]: https://code.google.com/p/google-code-prettify/

<!--more-->


## Prettyprinter 用法

### Prettyprinter 脚本加载

google-code-prettify有两种加载方式：

#### a. Auto-Loader

直接通过URL加载Prettyprinter用到的JS和CSS文件，在页面加载的过程中执行Prettyprinter。

```html
<script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js?lang=css&skin=sunburst"></script>
```

上面的链接指定`lang`加载`CSS`语言的扩展，指定`skin`加载`sunburst`样式。此外，还可以为 Prettyprinter 指定其他 CGI 参数，如下表：

CGI 参数				| 默认值	| 含义
------------------------|-----------|----------------------------
autoload=(true &#124; false)	| true	| run automatically on page load
lang=...				| none		| Loads the language handler for the given language which is usually the file extension for source files for that language. See the [index of language handlers][]. If specified multiple times (?lang=css&lang=ml) then all are loaded.
skin=...				| none		| See the [skin gallery][] . If specified multiple times, the first one to successfully load is used.
callback=js_ident		| 			| window.exports["js_ident"] will be called when prettyprinting finishes. If specified multiple times, all are called.

[index of language handlers]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src
[skin gallery]: {{ site.demo_dir }}/codeHighlight/google-code-prettify.html

#### b. Serving your own JS & CSS

下载必要的JS和CSS文件，包进HTML页面，调用方法`prettyPrint`运行Prettyprinter。比如下面这样，在页面加载完毕后高亮代码：

```html
<link href="prettify.css" type="text/css" rel="stylesheet" />
<script type="text/javascript" src="prettify.js"></script>
...
<body onload="prettyPrint()">
```

### 标记代码块

Prettyprinter 通过在代码块上添加样式，高亮代码，不需要从左到右解析代码块。

Prettyprinter会查找带有 "**prettyprint**" class的 `<pre>` `<code>` `<xmp>`元素，然后通过另外添加 `<span>`s 来给关键字、运算符、字符串、数字、注释等标识符着色，即高亮代码。

```html
<pre class="prettyprint">
source code here
</pre>
```

如果使用Markdown或其他HTML生成器，需要手动给元素添加要求的CSS class，使用JS动态添加CSS class是一种方法；不过Prettyprinter 提供了一种简单的方式，只需像这样在HTML代码前面加一行命令`<?prettify?>`：

```html
<?prettify?>
<pre class="prettyprint">
code here
</pre>
```

而鉴于在Markdown文本无法识别上面的标签，我们可以用注释的方式来添加class；下面代码中注释指给代码块标签添加了3个class：prettyprint、linenums、lang-go.   
后两个class的意思是要求 Prettyprinter 显示行号和指定代码块是 Go 语言。

```html
<!--?prettify lang=go linenums=true?-->
<pre style="border:4px solid #88c">
	package main
	import ("math")
	func distance(x1, y1, x2, y2 float64) float64 {
		a := x2 – x1
		b := y2 – y1
		return math.Sqrt(a*a + b*b)
	}
</pre>
```

如果想禁止对某句或某段代码着色，可以在相关元素上添加`nocode`class来阻止代码高亮。如下面那样，标识注释中的一句话*"This is not code"*不进行高亮处理：

```html
<pre class=prettyprint>
int x = foo();  /* This is a comment  <span class="nocode">This is not code</span>
  Continuation of comment */
int y = bar();
</pre>
```

### 语言识别、指定

Prettyprinter 能够猜测语言类型，尤其适用于类C和类HTML语言。对于其他语言，可以通过指定的语言类型进行特殊处理：在 prettyprint class后面追加 language extension（详细的语言识别符需要读源码JS文件才能知道）。例如，使用 `lang-scm` 提示代码语言是 Scheme code。

```html
<pre class="prettyprint lang-scm">(friends 'of '(parentheses))</pre>
```

```html
<?prettify lang=scm?>
<pre>(friends 'of '(parentheses))</pre>
```

```html
<pre class="prettyprint lang-html">
  The lang-* class specifies the language file extensions.
  File extensions supported by default include
    "bsh", "c", "cc", "cpp", "cs", "csh", "cyc", "cv", "htm", "html",
    "java", "js", "m", "mxml", "perl", "pl", "pm", "py", "rb", "sh",
    "xhtml", "xml", "xsl".
</pre>
```

You may also use the [HTML 5][] convention of embedding a code element inside the PRE and using language-java style classes. E.g.

```html
<pre class="prettyprint"><code class="language-java">...</code></pre>
```
[HTML 5]: http://dev.w3.org/html5/spec-author-view/the-code-element.html#the-code-element

- - - - - - 
Prettyprinter 可识别的语言：

适用于大多数语言，包括 C 和类 C 语言：Java, Python, Bash, SQL, HTML, XML, CSS, Javascript, Makefiles, Rust.   
也可以用于高亮 Ruby, PHP, VB, Awk，以及部分 Perl 和 Ruby。   但是因为注解约定，不能工作于 Smalltalk。

经由扩展支持的语言有：

|		1		|		2		|		3			|		4	|		5			|		6		|		7	|
|:-----------:	|:---------:	|:---------:		|:---------:|:-----------:		|:---------:	|:---------:|
| [Apollo][]	| [Basic][]		| [Clojure][] 		| [CSS][]	| [Dart][]			| [Erlang][]	| [Go][]	|
| [Haskell][]	| [Lisp, Scheme][Lisp] | [Llvm][] 	| [Lua][] 	| [Matlab][] 		| [MLs:F#, Ocaml,SML][MLs] | [Mumps][] |
| [Nemerle][]	| [Pascal][] 	| [Protocol buffers][PB] | [R, S][RS] | [RD][] 		| [Scala][]		| [SQL][]	|
| [TCL][]		| [Latek][]		| [Visual Basic][VB]	| [CHDL][] | [Wiki][]		| [XQ][]		| [YAML][]	|

[Apollo]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-apollo.js
[Basic]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-basic.js
[Clojure]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-clj.js
[CSS]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-css.js
[Dart]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-dart.js
[Erlang]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-erlang.js
[Go]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-go.js
[Haskell]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-hs.js
[Lisp]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-lisp.js
[Llvm]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-llvm.js
[Lua]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-lua.js
[Matlab]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-matlab.js
[MLs]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-ml.js
[Mumps]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-mumps.js
[Nemerle]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-n.js
[Pascal]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-pascal.js
[PB]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-proto.js
[RS]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-r.js
[RD]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-rd.js
[Scala]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-scala.js
[SQL]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-sql.js
[TCL]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-tcl.js
[Latek]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-tex.js
[VB]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-vb.js
[CHDL]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-vhdl.js
[Wiki]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-wiki.js
[XQ]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-xq.js
[YAML]: http://code.google.com/p/google-code-prettify/source/browse/trunk/src/lang-yaml.js


### 启用行号

使用 `linenums` class 显示代码块行号，它会在每行代码插入`ol`和`li`元素设置行号。默认是每5行显示行号1次。

```html
<pre class="prettyprint linenums">
Many
lines
of
code
</pre>
```

假如代码不是从第一行开始，可以自定义起始行号。例如：

```html
<pre class="prettyprint linenums:40">lots of code</pre>
```

```html
<?prettify linenums=40?>
<pre>lots of code</pre>
```

`linenums:40` 表明代码从第40行开始，这在引用大文件中某一小段代码的情况下很有用。


## 在 Jekyll 中使用 Prettyprinter

首先需要两个文件，prettify.js和prettify.css，去官网下载。把这两个放到模板head中，如下：

```html
<link href="/assets/google-code-prettify/prettify.css" rel="stylesheet" type="text/css" media="all">
<script type="text/javascript" src="/assets/google-code-prettify/prettify.js"></script>
```

google-code-prettify提供了5个css主题可供选择，而且支持自定义style。相关的demo及style文件参见[这里]({{ site.demo_dir }}/codeHighlight/google-code-prettify.html)。

考虑到加载速度，最好js写到文档末尾，body闭合标签之前，css写到头部之后，还需要在合适位置（如：$(document).ready）添加如下代码，用于识别并高亮代码块，这个需要使用jQuery：

```javascript
$(function() {
    window.prettyPrint && prettyPrint();
});
```

现在，就可以使用`<pre></pre>`标签进行高亮了。

```html
<pre class="prettyPrint">
// code here
</pre>
```

如果用Markdown来生成HTML的话，需事先给相关的标签追加必要的class；Markdown产生的代码块必然含义`<pre>`元素，那么可以用jQuery在Prettyprinter运行前处理下HTML样式：

```javascript
$(function() {
  $('pre').addClass('prettyprint linenums').attr('style', 'overflow:auto');
});
```

这样就没有问题了，可以直接用markdown的前置4空格来写代码了。其中`addClass('prettyprint linenums')`的linenums是添加行号的意思。默认只显示第5、10、15…行，可以在css文件中li的格式添加`list-style-type: decimal;`，以显示全部行号

另外，如果博客中有用Bootstrap，其中对pre有如下几句：

```css
white-space:pre;white-space:pre-wrap;word-break:break-all;word-wrap:break-word;
```

这会使得pre中的代码自动换行，而不是溢出形成滚动条。如果不希望如此，可以注释掉。看个人喜好。   
如果是滚动条，默认的滚动太难看而且还有个Bug（stripe的高亮背景色无法固定，随着滚动条位置改变而改变，可以考虑去掉stripe，或者禁用横向滚动条），可以修改一下样式，看一下这篇文章[CSS设置滚动条样式](http://alfred-sun.github.io/blog/2014/12/24/scrollbar-customized-with-css-style/)

最后，如果使用过程中遇到其他问题，可以去官网看看有没有解决方案。

