---
layout: post
title: Jekyll 中用 SyntaxHighlighter
category: GitHub Pages
tags: [Jekyll, SyntaxHighlighter]
author: Alfred Sun
keywords: GitHub Pages, SyntaxHighlight
description: 本文介绍如何使用SyntaxHighlight JS插件高亮代码，以及如何在GitHub Pages中引进这个插件。
---

前几天把博客里的代码高亮改成[SyntaxHighligher][1]了，感觉好了很多，看着也舒服，复制代码方便许多。下面就来简短介绍下这个工具。

> _SyntaxHighligher is an open source Java Script client side code syntax highlighter._

将它安装在 "**home page, blog, CMS, documentation CD or any other web page**"，用来美化你的代码。


## Installation

1. 引入基本的文件： shore.js
2. 添加需要的笔刷JS（如：Javascript代码使用 shBrushJScript.js；可用的笔刷列表见[这里][2]）
3. 引入CSS样式：shCore.css、shThemeDefault.css
4. 用`<pre />`或者`<script />`创建代码块
5. 执行JS方法：`SyntaxHighlighter.all()`


在Jekyll的模板页里的head里面，添加如下代码，选自己需要的语言的刷子。

<!--more-->

```html
<link href='/static/css/syntaxhighlighter/shCore.css' rel='stylesheet' type='text/css'/>
<link href='/static/css/syntaxhighlighter/shThemeDefault.css' rel='stylesheet' type='text/css'/>

<script src='/static/js/syntaxhighlighter/shCore.js' type='text/javascript'></script>

<!-- The Following is styles for different language  -->
<script src='/static/js/syntaxhighlighter/shBrushCpp.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushJava.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushJScript.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushPhp.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushPython.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushRuby.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushPerl.js' type='text/javascript'></script>

<script language='javascript'>
  SyntaxHighlighter.all();
</script>
```

其中，src里面是文件的目录，把从官网上下载的对应的js文件和css文件放到对应的目录即可。其实也可以直接引用官网的js文件，比如这样（[参考网址][3]）

```html
<link href='http://alexgorbatchev.com/pub/sh/current/styles/shCore.css' rel='stylesheet' type='text/css'/>
<link href='http://alexgorbatchev.com/pub/sh/current/styles/shThemeDefault.css' rel='stylesheet' type='text/css'/>

<script src='http://alexgorbatchev.com/pub/sh/current/scripts/shCore.js' type='text/javascript'></script>
<script src='http://alexgorbatchev.com/pub/sh/current/scripts/shBrushCpp.js' type='text/javascript'></script>

<script language='javascript'>
    SyntaxHighlighter.all();
</script>
```

做好以上准备后，就可以写代码了。SyntaxHighlighter搜索带有特殊CSS类属性的 `<pre />` 标签，然后对这段代码块着色。这个属性需要设定笔刷的参数，它的值是笔刷的别名。

另外，Markdown 写代码的时候，不要用其代码区块的语法，直接用pre标签包起来就好。   
下面是个Sample（点这里看[Demo][]效果）：

[Demo]: {{ site.demo_dir }}/codeHighlight/syntaxhighlighter/shAutoloader.html

```html
<pre class="brush: csharp">
public IEnumerator<String> GetEnumerator()// 注意：返回什么，泛型就为什么类型
{
    for (int i = 0; i&lt;arr_Course.Length; i++)
    {
        Course course = arr_Course[i];
        yield return "选修：" + course.Name;
        yield return Environment.NewLine;// 两个 yield return
    }
}
</pre>
```

Jekyll Serve启动`localhost:4000`来写博客预览代码语法的高亮效果。这个比pygments更好看, 不过加载渲染比较慢。

注意：所有的右方括号必须是**html 转义字符**，例如代码块里面的 `<` 必须用 `&lt;` 来替换。


## Configuration & CSS Themes

### CSS Themes

新版 SyntaxHighligher 支持自定义主题并提供了8个可选的官方标准主题。   
注意：在源码styles目录里面，还有另外的CSS文件，是把shCore.css和其他主题CSS合并在一起的CSS样式文件。如：`shCoreEclipse.css == shCore.css + shThemeEclipse.css`

| Name | File |
| ---- | ---- |
|[Default][]	|shThemeDefault.css	|
|[Django][]		|shThemeDjango.css	|
|[Eclipse][]	|shThemeEclipse.css	|
|[Emacs][]		|shThemeEmacs.css	|
|[Fade To Grey][]|shThemeFadeToGrey.css|
|[MDUltra][]	|shCoreMDUltra.css	|
|[Midnight][]	|shThemeMidnight.css|
|[RDark][]		|shThemeRDark.css	|

[Default]: {{ site.demo_dir }}/codeHighlight/syntaxhighlighter/syntaxhighlighter_themes.html
[Django]: {{ site.demo_dir }}/codeHighlight/syntaxhighlighter/syntaxhighlighter_themes.html#theme1
[Eclipse]: {{ site.demo_dir }}/codeHighlight/syntaxhighlighter/syntaxhighlighter_themes.html#theme2
[Emacs]: {{ site.demo_dir }}/codeHighlight/syntaxhighlighter/syntaxhighlighter_themes.html#theme3
[Fade To Grey]: {{ site.demo_dir }}/codeHighlight/syntaxhighlighter/syntaxhighlighter_themes.html#theme4
[MDUltra]: {{ site.demo_dir }}/codeHighlight/syntaxhighlighter/syntaxhighlighter_themes.html#theme5
[Midnight]: {{ site.demo_dir }}/codeHighlight/syntaxhighlighter/syntaxhighlighter_themes.html#theme6
[RDark]: {{ site.demo_dir }}/codeHighlight/syntaxhighlighter/syntaxhighlighter_themes.html#theme7

### Configured in 3 different ways

#### 1. SyntaxHighlighter.config

对语法高亮全局参数设置，主要包括：

|Name		|Value	|Description	|
|-----------|-------|---------------|
|bloggerMode|false	|与blogger.com集成时，必须开启该选项|
|[strings][]|Object	|设定默认的显示信息,可用的信息参数包含: expandSource / help / alert / noBrush / brushNotHtmlScript / viewSource / copyToClipboard / copyToClipboardConfirmation / print 等|
|stripBrs	|false	|忽略代码块中的`<br />`|
|tagName	|"pre"	|自定义需要高亮的代码块的标签tag|

[strings]: http://alexgorbatchev.com/SyntaxHighlighter/manual/configuration/strings.html

Example: 

```html
<script type="text/javascript">
	SyntaxHighlighter.config.strings.viewSource = "view my source!!!!";
	SyntaxHighlighter.config.bloggerMode = true;
	SyntaxHighlighter.all();
</script>
```

#### 2. SyntaxHighlighter.defaults

对单个代码块语法高亮参数进行设置，支持的选项有：

|Name		|Value	|Description	|
|-----------|-------|---------------|
|auto-links	|true	|自动识别超链接，使得代码块中的URL可点击进入|
|class-name	|''		|对代码块添加CSS类，自定义样式|
|collapse	|false	|强制初始代码块收起|
|first-line	|1		|定义代码块的起始行号|
|gutter		|true	|显示行号|
|highlight	|null	|高亮代码块中的某几行，传入的值可以是高亮多行的整型数组([1,3,7])，或仅高亮单行的数值|
|html-script|false	|允许对HTML/XML和脚本混合代码着色，开启后必须加载`shBrushXml.js`脚本|
|smart-tabs	|true	|灵活处理代码块中的Tab字符|
|tab-size	|4		|设定显示Tab的长度|
|toolbar	|true	|代码块上显示工具栏|

Example: 

```js
SyntaxHighlighter.defaults['gutter'] = false;
SyntaxHighlighter.defaults['smart-tabs'] = false;
...
SyntaxHighlighter.all();
```

#### 3. Parameters

同 defaults 参数类似，可以针对单个代码块做高亮配置。相关的 Key/Value 对要跟 brush 参数一起放进 class 属性中，可以使用上面 defaults 表里面的任意属性进行配置。

Example: 

```html
<pre class="brush: js; ruler: true; first-line: 10; highlight: [2, 4, 6]">...</pre>
```


## 动态加载 Javascript

由于每次都需要加载所有的js文件，加载速度比较慢。可以利用动态加载js来实现针对不同的语言加载不同的语法分析文件，从而提高js文件的加载速度。废话不多说，上代码：

```html
<script language='javascript'>
    $(function () {
        var stdname = {
            'bash': 'Bash',
            'sh': 'Bash',
            'c': 'Cpp',
            'cpp': 'Cpp',
            'cs': 'CSharp',
            'css': 'Css',
            'java': 'Java',
            'js': 'JScript',
            'php': 'Php',
            'py': 'Python',
            'python': 'Python',
            'rb': 'Ruby',
            'sql': 'Sql',
            'vb': 'Vb',
            'xml': 'Xml',
            'html': 'Xml',
            'perl': 'Perl'
        };
        var used = {};
        var $t = $('pre[class^=brush]');
        if ($t.length > 0) {
            $('body').append('<script src="/static/js/syntaxhighlighter/shCore.js" type="text/javascript"></script>');
        }
        $t.each(function() {
            var lang = stdname[$.trim($(this).attr('class').substring(6))];
            if (used[lang]) {
                return;
            }
            used[lang] = true;
            $('body').append('<script type="text/javascript" src="/static/js/syntaxhighlighter/shBrush' + lang + '.js"></script>');
        });
        if ($t.length > 0) {
            $('body').append('<script language="javascript">SyntaxHighlighter.all();</script>');
        }
    });
</script>
```

把以上这段代码放在Jekyll模板页的body的最后面即可。

这段代码需要jQuery，1.4.2测试没问题。此外，shCore.css，shThemeDefault.css文件不是动态加载，所以，这两个文件仍然需要直接放在模板页的头部。


## JS Autoloader

SyntaxHighlighter着色过程中，针对不同的语言需要根据适合的脚本刷子来着色，这样造成你在页面上不得不预先加载所有可能用到的brush.js。上述的动态加载方法是自己写的，同样SyntaxHighlighter官方也提供了相应的解决方案： [shAutoloader.js][4](v3.0.83) 正是为解决此问题而生，它会根据待着色代码块所使用到的笔刷配置来动态创建`<script>`节点以加载适合的JavaScript文件，不会造成载入多余资源的浪费。


### a. Dynamic Brush Loading

Version 3 支持动态加载 brushes 文件，无需在同一页面加载所有 JS 。看下面的示例来说明如何使用 autoloader 脚本 - **"shAutoloader.js"**：

```html
<script src="shCore.js" type="text/javascript"></script>
<script src="shAutoloader.js" type="text/javascript"></script>

<script type="text/javascript">
SyntaxHighlighter.autoloader(
'js jscript javascript  /js/shBrushJScript.js',
'applescript            /js/shBrushAppleScript.js'
);

SyntaxHighlighter.all();
</script>
```

解释下上面的意思：任何使用 js, jscript, javascript 和 applescript 笔刷的代码块，都会触发这个脚本，动态加载相应的JS文件。


### b. API 

```
SyntaxHighlighter.autoloader(brushes)
```

brushes 参数说明

+ Array: [ 'alias1 alias2 /full/path/to/brush.js', ... ]   
以空白符为分隔符的字符串数组，字符串的最后一个值是笔刷JS文件的路径，其他值是brush别名
+ Array: [ [ 'alias1', 'alias2', '/full/path/to/brush.js' ], ... ]   
字符串组成的二维数组，数组中最后一个字符串值是JS路径，其他字符串值是brush别名


### c. Example 示例

{% highlight javascript linenos %}
function path()
{
var args = arguments,
	result = [];
	
for(var i = 0; i < args.length; i++)
	result.push(args[i].replace('@', '/pub/sh/current/scripts/'));
	 
return result
};

SyntaxHighlighter.autoloader.apply(null, path(
'applescript            @shBrushAppleScript.js',
'actionscript3 as3      @shBrushAS3.js',
'bash shell             @shBrushBash.js',
'coldfusion cf          @shBrushColdFusion.js',
'cpp c                  @shBrushCpp.js',
'c# c-sharp csharp      @shBrushCSharp.js',
'css                    @shBrushCss.js',
'delphi pascal          @shBrushDelphi.js',
'diff patch pas         @shBrushDiff.js',
'erl erlang             @shBrushErlang.js',
'groovy                 @shBrushGroovy.js',
'java                   @shBrushJava.js',
'jfx javafx             @shBrushJavaFX.js',
'js jscript javascript  @shBrushJScript.js',
'perl pl                @shBrushPerl.js',
'php                    @shBrushPhp.js',
'text plain             @shBrushPlain.js',
'py python              @shBrushPython.js',
'ruby rails ror rb      @shBrushRuby.js',
'sass scss              @shBrushSass.js',
'scala                  @shBrushScala.js',
'sql                    @shBrushSql.js',
'vb vbnet               @shBrushVb.js',
'xml xhtml xslt html    @shBrushXml.js'
));
SyntaxHighlighter.all();
{% endhighlight %}



[1]: http://alexgorbatchev.com/SyntaxHighlighter
[2]: http://alexgorbatchev.com/SyntaxHighlighter/manual/brushes/
[3]: http://alexgorbatchev.com/SyntaxHighlighter/hosting.html
[4]: http://alexgorbatchev.com/SyntaxHighlighter/manual/api/autoloader.html
