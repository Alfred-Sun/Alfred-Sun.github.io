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

前面试用过语法高亮JS插件 [SyntaxHighlighter]({{ site.root }}/blog/2014/12/15/Use-Syntaxhighlighter-for-Jekyll/) 和 [Google-Code-Prettify]({{ site.root }}/blog/2014/12/15/Use-google-code-prettify-for-jekyll/)，感觉要么就是加载太慢点开页面需要等，要么就是太过灵活以至总是会出现奇怪的着色问题。归根结底都没有 [Pygments](http://pygments.org) 用起来方便。后来，博主又看到另一个语法高亮工具 - **[highlight.js](https://highlightjs.org/ "Syntax highlighting for the Web")**，不仅支持的语言远超前2两个，有可配置的参数，而且加载运行快，着色效果又出色，还有官方提供很多主题选择。最重要的是，它非常适应 Markdown 的代码块解析后的结构，不需要另外设置代码块的CSS样式类。这个JS插件可以说是除了Pygments外最出色的了吧。


## Version 8.4 特色

Highlight.js 是基于 Javascript 的语法高亮工具，工作于浏览器端和服务器端，并且不依赖任何框架，能够自动探测相当多的语言类型。

> - 112 languages and 49 styles ([live demo][])
> - automatic language detection
> - multi-language code highlighting
> - available for node.js
> - works with any markup
> - compatible with any js framework

[live demo]: {{ site.demo_dir }}/codeHighlight/highlight.js/live_demo.html

<!--more-->


## Getting Started

最简单的用法就是在网页里面链接相关js库和css主题样式，然后执行 `initHighlightingOnLoad`:

```html
<link rel="stylesheet" href="/path/to/styles/default.css">
<script src="/path/to/highlight.pack.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

它会查找`<pre><code>` tags 内的高亮代码，并尝试识别代码语言。如果识别失败，我们还可以用class属性指定语言类型：

```html
<pre><code class="html">...</code></pre>
```

其中，支持的语言 class [参考这里](http://highlightjs.readthedocs.org/en/latest/css-classes-reference.html "CSS classes reference")   
Class属性值即语言标示符, 也可以加上这两种前缀([recommended in the HTML Living Standard][HTML5]): `language-` 或 `lang-`, 这个 class 可以用在 `<code>` 元素上，也可用在 `<pre>` 元素上。这个特点兼容 Markdown 文本的代码语法，不需要额外设置 class ，使用`` ` ` `cpp``就可以直接标记语言为 **C++**

[HTML5]: http://www.whatwg.org/specs/web-apps/current-work/multipage/text-level-semantics.html#the-code-element

```html
<pre><code class="language-cpp">...</code></pre>
```

完全禁用 highlighting 可以用这个 class - `no-highlight`:

```html
<pre><code class="no-highlight">...</code></pre>
```

虽然官方文档没有提及，这里还是说下，`hljs.initHighlightingOnLoad()`可以放在任意地方，不需要一定放在`window.onload`或者`$(document).ready`，`initHighlightingOnLoad`内部有相关处理。


## Custom Initialization

使用 `highlightBlock` 和 `configure` 来设定 highlight.js 几个配置参数，控制语法高亮的执行过程。   
可以使用jQuery调用 `initHighlightingOnLoad` :

```js
$(document).ready(function() {
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
});
```

允许使用`highlightBlock`动态高亮网页代码块，但是一定确保不要对已经高亮过的代码使用该函数。

`configure(options)`说明：

> - **tabReplace**: a string used to replace TAB characters in indentation
> - **useBR**: a flag to generate `<br>` tags instead of new-line characters in the output, useful when code is marked up using a non-&lt;pre&gt; container
> - **classPrefix**: a string prefix added before class names in the generated markup, used for backwards compatibility with stylesheets
> - **languages**: an array of language names and aliases restricting auto detection to only these languages

例如，可以使用任何HTML标签代替`<pre><code>`作为高亮代码的标记。假如没有使用像`<pre>`一样可以保留换行符的HTML容器，那么就要配置 highlight.js 使用 `<br>` tag 作为输出:

```js
hljs.configure({useBR: true});

$('div.code').each(function(i, block) {
  hljs.highlightBlock(block);
});
```

也可以：

```js
hljs.configure({
  tabReplace: '    ', // 4 spaces
  // ... or
  // tabReplace = '<span class="indent">\t</span>';
  classPrefix: ''     // don't append class prefix
                      // … other options aren't changed
})
hljs.initHighlighting();
```

## Node.js & AMD

Highlight.js 还可以用于 node.js 和 AMD loader。详细的说明见[这里](https://github.com/isagalaev/highlight.js/tree/jade)


## \- 结束语 \-

最后提一下，最初设计 highlight.js 是不支持代码块显示行号的，看 [Ivan Sagalaev的解释](http://highlightjs.readthedocs.org/en/latest/line-numbers.html "Line numbers - 'Evil'")。
但是，GitHub上面还是有["line-numbers"][]这个branch的，默认的css主题开启显示行号。有兴趣的话，可以自己下载源码看下效果，也可以看本文最前面给的demo链接里面的效果。   
其他主题css，添加下面样式，即可显示行号：

```css
pre {
  counter-reset: lines;
}
pre .line {
  counter-increment: lines;
}
pre .line::before {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  -o-user-select: none;
  user-select: none;
  
  content: counter(lines); text-align: right;
  display: inline-block; width: 2em;
  padding-right: 0.5em; margin-right: 0.5em;
  color: #BBB; border-right: solid 1px;
}
```

["line-numbers"]: https://github.com/isagalaev/highlight.js/tree/line-numbers

另外，具体 API 文档和其他 topics 请移步 [**Docs Library**](http://highlightjs.readthedocs.org "highlight.js developer documentation")

- - - - - -

## Awesome Prism

注：最近发现一个类似的语法高亮工具 - [Prism][]，虽然CSS主题只有6个，但提供的功能Plugins相当多。

> _Prism is a lightweight, extensible syntax highlighter, built with modern web standards in mind. It’s a spin-off from [Dabblet][]._

使用方法很简单，去[download page][]获取需要的JS和CSS文件，放进自己网页。

```html
<link href="themes/prism.css" rel="stylesheet" />
<script src="prism.js"></script>
```

再为标记的代码块添加语言类型(language-{LANGUAGE_NAME})：

```html
<pre>
  <code class='language-javascript'>
    if( awesome ){
      console.log('This is Awesome');
    }else{
      $('body').addClass('give-me-awesome');
    }
  </code>
<pre>
```

详细的用法和Plugins介绍点[这里](http://prismjs.com/#basic-usage)。博主自己也测试了下([Demo][Prism_Demo])，发现代码片段非常多时，其渲染页面速度相比 highlight.js 要快些。另外，Prism 受制于浏览器版本，对最近的浏览器支持比较好。

[Prism]: http://prismjs.com
[Dabblet]: http://dabblet.com
[download page]: http://prismjs.com/download.html
[Prism_Demo]: {{ site.demo_dir }}/codeHighlight/prism_cpp.html

Reference:

- [Why another syntax highlighter ?](http://lea.verou.me/2012/07/introducing-prism-an-awesome-new-syntax-highlighter/#more-1841 "Introducing Prism: An awesome new syntax highlighter")
- [Jekyll Plugin: Syntax Highlighting With Prism](http://gmurphey.com/2012/08/09/jekyll-plugin-syntax-highlighting-with-prism.html "Jekyll: Replacing Pygments Highlighting With Prism.js")
