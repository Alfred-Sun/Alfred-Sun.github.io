---
layout: post
title: Jekyll 中用 Google Code Prettify
category: GitHub Pages
tags: [Jekyll, google-code-prettify]
author: Alfred Sun
keywords: GitHub Pages, Google Code Prettify
description: 
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

google-code-prettify有两种加载方式：

### 1. Auto-Loader

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

### 2. Serving your own JS & CSS

下载必要的JS和CSS文件，包进HTML页面，自行决定 Prettyprinter 运行时机，调用方法`prettyPrint`。比如下面这样，在页面加载完毕后高亮代码：

```html
<link href="prettify.css" type="text/css" rel="stylesheet" />
<script type="text/javascript" src="prettify.js"></script>
...
<body onload="prettyPrint()">
```

## 在 Jekyll 中使用 Prettyprinter

首先需要两个文件，prettify.js和prettify.css，去官网下载。把这两个放到模板head中，如下：

```html
<link href="/assets/google-code-prettify/prettify.css" rel="stylesheet" type="text/css" media="all">
<script type="text/javascript" src="/assets/google-code-prettify/prettify.js"></script>
```

google-code-prettify提供了5个css主题可供选择，而且支持自定义style。相关的demo及style文件参见[这里]({{ site.demo_dir }}/codeHighlight/google-code-prettify.html)。

考虑到加载速度，最好js写到文档末尾，body闭合标签之前，css写到头部之后，还需要加上如下代码，用于识别并高亮代码块，这个需要使用jQuery

```javascript
$(function() {
    window.prettyPrint && prettyPrint();
});
```

现在，就可以使用`<pre></pre>`标签进行高亮了，

```html
<pre class="prettyPrint">
// code here
</pre>
```

Prettyprinter会查找带有`prettyprint` class的 `<pre>` `<code>` `<xmp>`元素，然后高亮其内部的代码。如果用Markdown来生成HTML的话，需要事先给相关的标签追加这个class；Markdown产生的代码块必然含义`<pre>`元素，那么可以用jQuery在Prettyprinter运行前处理下HTML文件：

```javascript
$(function() {
  $('pre').addClass('prettyprint linenums').attr('style', 'overflow:auto');
});
```

这样之后，就没有问题了，可以直接用markdown的前置4空格来写代码了。其中addClass('prettyprint linenums')的linenums是添加行号的意思。默认只显示第5、10、15…行，可以在css文件中li的格式添加list-style-type: decimal;，以显示全部行号

另外，如果博客中有用bootstrap，其中对pre有如下几句

```css
white-space:pre;white-space:pre-wrap;word-break:break-all;word-wrap:break-word;
```

这会使得pre中的代码自动换行，而不是溢出形成滚动条。如果不希望如此，可以注释掉。看个人喜好。   
如果是滚动条，默认的滚动太难看而且还有个Bug（stripe的高亮背景色无法固定，随着滚动条位置改变而改变，可以考虑去掉stripe，或者禁用横向滚动条），可以修改一下样式，看一下这篇文章[CSS设置滚动条样式](http://alfred-sun.github.io/blog/2014/12/24/scrollbar-customized-with-css-style/)

