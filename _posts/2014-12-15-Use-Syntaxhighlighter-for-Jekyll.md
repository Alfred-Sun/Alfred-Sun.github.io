---
layout: post
title: Jekyll中用SyntaxHighlighter
category: GitHub Pages
tags: [Jekyll, SyntaxHighlighter]
---

## SyntaxHighligher

前几天把博客里的代码高亮改成[SyntaxHighligher][1]了，感觉好了很多，看着也舒服，关键是复制代码的时候，行号连着代码在一行复制了。Jekyll的灵活性应该比Blogger更大，而且直接贴改代码，所以对于Jekyll这个方法是合适的。下面是具体的过程：

在Jekyll的模板页里的head里面，添加如下代码，选自己需要的语言的刷子。

<!--more-->

```html
<link href='/static/css/syntaxhighlighter/shCore.css' rel='stylesheet' type='text/css'/>
<link href='/static/css/syntaxhighlighter/shThemeDefault.css' rel='stylesheet' type='text/css'/>

<script src='/static/js/syntaxhighlighter/shCore.js' type='text/javascript'></script>

<!-- The Following is styles for different language  -->
<script src='/static/js/syntaxhighlighter/shBrushBash.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushCpp.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushCSharp.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushCss.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushJava.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushJScript.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushPhp.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushPython.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushRuby.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushSql.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushVb.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushXml.js' type='text/javascript'></script>
<script src='/static/js/syntaxhighlighter/shBrushPerl.js' type='text/javascript'></script>

<script language='javascript'>
  SyntaxHighlighter.all();
</script>
```

其中，src里面是文件的目录，把从官网上下载的对应的js文件和css文件放到对应的目录即可。其实也可以直接引用官网的js文件，比如这样（以下代码来自我参考的网址，去掉了一些不需要的代码）

```html
<link href='http://alexgorbatchev.com/pub/sh/current/styles/shCore.css' rel='stylesheet' type='text/css'/>
<link href='http://alexgorbatchev.com/pub/sh/current/styles/shThemeDefault.css' rel='stylesheet' type='text/css'/>

<script src='http://alexgorbatchev.com/pub/sh/current/scripts/shCore.js' type='text/javascript'></script>
<script src='http://alexgorbatchev.com/pub/sh/current/scripts/shBrushCpp.js' type='text/javascript'></script>

<script language='javascript'>
    SyntaxHighlighter.all();
</script>
```

Jekyll Serve启动`localhost:4000`来写博客预览代码的高亮效果。

之后，写代码的时候，不要使用markdown的语法，直接用pre抱起来就好了。就比如这样

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

效果就和以上一样了。这个应该比pygments更好看吧。不过目前加载速度比较慢。

## 动态加载javascripts

需要每次都加载所有的js文件，加载速度比较慢。其实，可以利用动态加载js来实现对于不同的语言加载不同的语法分析文件，从而提高js文件的加载速度。废话不多说了，上代码

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

这段代码需要jQuery，我的是1.4.2。此外，shCore.css，shThemeDefault.css文件不是动态加载，所以，这两个文件仍然需要直接放在模板页的头部。

## JS Autoloader

SyntaxHighlighter着色过程中，针对不同的语言需要根据适合的脚本刷子来着色，这样造成你在页面上不得不预先加载所有可能的用到的 brush.js 。 [shAutoloader.js v3.0.83][2] 正是为解决此问题而生，它会根据待着色代码块所使用到的笔刷配置来动态创建`<script>`节点以加载适合的JavaScript文件，不会造成载入多余资源的浪费。

### Dynamic Brush Loading

SyntaxHighlighter comes with almost 30 brushes out of the box. One of the most requested feature has been the ability to dynamically load them without having to load them all on the same page.

Version 3 addresses this problem with with the new autoloader script. Setting autoloader up is as simple as adding shAutoloader.js file to your page and telling autoloader where your brushes are. In fact, this site is using the autoloader. Have a look at the example below:

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

Now any code blocks which use js, jscript, javascript and applescript brushes will trigger dynamic loading of the appropriate JavaScript file.

### API

SyntaxHighlighter.autoloader(brushes)

brushes
	Array: [ 'alias1 alias2 /full/path/to/brush.js', ... ]
Array of space separated strings where all values but the last one are brush aliases and the last value is a full path the JavaScript file.

brushes
	Array: [ [ 'alias1', 'alias2', '/full/path/to/brush.js' ], ... ]
Array of strings where all values but the last one are brush aliases and the last value is a full path the JavaScript file.
This site is using the autoloader which is set up like this:

### Example

```javascript
function path()
{
var args = arguments,
	result = []
	;
	 
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
```



[1]: http://alexgorbatchev.com/SyntaxHighlighter
[2]: http://alexgorbatchev.com/SyntaxHighlighter/manual/api/autoloader.html
