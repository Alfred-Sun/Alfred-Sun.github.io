---
layout: post
title: Jekyll 中用 highlight.js
category: GitHub Pages
tags: [Jekyll, highlight.js]
author: Alfred Sun
updated: 2014-12-28 00:07
keywords: Jekyll, highlight.js
description: highlight.js - Syntax highlighting for the Web，目前发现的已知兼容 Markdown 最出色的语法高亮Javascript插件。
---

前面试用过语法高亮JS插件 [SyntaxHighlighter](http://localhost:4000/blog/2014/12/15/Use-Syntaxhighlighter-for-Jekyll/) 和 [Google-Code-Prettify](http://localhost:4000/blog/2014/12/15/Use-google-code-prettify-for-jekyll/)，感觉要么就是加载太慢点开页面需要等，要么就是太过灵活以至总是会出现奇怪的着色问题。归根结底都没有 [Pygments](http://pygments.org) 用起来方便。后来，博主又看到另一个语法高亮工具 - **[highlight.js](https://highlightjs.org/ "Syntax highlighting for the Web")**，不仅支持的语言远超前2两个，有可配置的参数，而且加载运行快，着色效果又出色，还有官方提供很多主题选择。最重要的是，它非常适应 Markdown 的代码块解析后的结构，不需要另外设置代码块的CSS样式类。这个JS插件可以说是除了Pygments外最出色的了吧。


## Version 8.4 Features

Highlight.js is a syntax highlighter written in JavaScript. It works in the browser as well as on the server. It works with pretty much any markup, doesn't depend on any framework and has automatic language detection.

> - 112 languages and 49 styles ([live demo][])
> - automatic language detection
> - multi-language code highlighting
> - available for node.js
> - works with any markup
> - compatible with any js framework

[live demo]: {{ site.demo_dir }}/codeHighlight/highlight.js/live_demo.html

<!--more-->


## Getting Started

The bare minimum for using highlight.js on a web page is linking to the library along with one of the styles and calling `initHighlightingOnLoad`:

```html
<link rel="stylesheet" href="/path/to/styles/default.css">
<script src="/path/to/highlight.pack.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

虽然官方文档没有提及，这里还是说下，`hljs.initHighlightingOnLoad()`可以放在任意地方，不需要一定放在`window.onload`或者`$(document).ready`，`initHighlightingOnLoad`内部有相关处理。

This will find and highlight code inside of `<pre><code>` tags trying to detect the language automatically. If automatic detection doesn't work for you, you can specify the language in the class attribute:

```html
<pre><code class="html">...</code></pre>
```

The list of supported language classes is available in the class reference. Classes can also be prefixed with either `language-` or `lang-`.

To disable highlighting altogether use the `nohighlight` class:

```html
<pre><code class="nohighlight">...</code></pre>
```


## Custom Initialization

When you need a bit more control over the initialization of highlight.js, you can use the `highlightBlock` and `configure` functions. This allows you to control what to highlight and when.

Here's an equivalent way to calling `initHighlightingOnLoad` using jQuery:

```js
$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
```

You can use any tags instead of `<pre><code>` to mark up your code. If you don't use a container that preserve line breaks you will need to configure highlight.js to use the `<br>` tag:

```js
hljs.configure({useBR: true});

$('div.code').each(function(i, block) {
  hljs.highlightBlock(block);
});
```

For other options refer to the documentation for configure.


- - - - - -

API 文档和其他 topics 请移步 [**Library**](http://highlightjs.readthedocs.org "highlight.js developer documentation")
