---
layout: post
title: HTML中的&lt;UL&gt;标签中li横向排列
category: Html
tags: [html, css]
---

2011-07-22 20:10  html css float class  文档浏览器

## 编写横向菜单的HTML代码架构

请将以下代码添加到HTML文档的导航栏区域中。

```html
<ul id="menu">
 <li><a href="http://www.baidu.com">Baidu.Com</a></li>
 <li><a href="http://www.Code52.Net">Code52.Net</a></li>
 <li><a href="http://www.yahoo.com">Yahoo.Com</a></li>
 <li><a href="http://www.google.com" class="last">Google.Com</a></li>
</ul>
```

## 编写CSS代码

### 1、设置公共样式

请将以下CSS代码添加到HTML文档的<head>...</head>标签范围中。

```html
<style type="text/css">
#menu { 
font:12px verdana, arial, sans-serif; /* 设置文字大小和字体样式 */
}
#menu, #menu li {
list-style:none; /* 将默认的列表符号去掉 */
padding:0; /* 将默认的内边距去掉 */
margin:0; /* 将默认的外边距去掉 */
}
</style>
```

大家都知道，`<ul>`中的各条目`<li>`，默认都是纵向排列的，我们需要定义CSS来让其横向排列起来。

Tips：因为我们现在将导航栏拉出来独立讲解，所以需要设置一些公共样式，如果您在 body 或其他地方已经重设了默认效果，以上代码可以去掉

### 2、让文字横排

大家都知道，`<ul>`标签下的项目`<li>`默认是纵向排列的，我们需要定义额外的CSS属性让其横向排列。

```html
<style type="text/css">
#menu li { 
float:left; /* 往左浮动 */
}
</style>
```

### 3、设置链接样式

```html
<style type="text/css">
#menu li a {
display:block; /* 将链接设为块级元素 */
padding:8px 50px; /* 设置内边距 */
background:#3A4953; /* 设置背景色 */
color:#fff; /* 设置文字颜色 */
text-decoration:none; /* 去掉下划线 */
border-right:1px solid #000; /* 在左侧加上分隔线 */
}
</style>
```

我们用内边距（即填充padding）的方式，让每个菜单变得宽一些，如果你的菜单是中英文混排的，建议设置单个菜单的高宽，这样可以避免中英文字符行高不一致导致的高度误差。设置固定高度的方式：

```html
<style type="text/css">
#menu li a {
display:block; /* 将链接设为块级元素 */
width:150px; /* 设置宽度 */
height:30px; /* 设置高度 */
line-height:30px; /* 设置行高，将行高和高度设置同一个值，可以让单行文本垂直居中 */
text-align:center; /* 居中对齐文字 */
background:#3A4953; /* 设置背景色 */
color:#fff; /* 设置文字颜色 */
text-decoration:none; /* 去掉下划线 */
border-right:1px solid #000; /* 在左侧加上分隔线 */
}
</style>
```

### 4、链接悬停效果

通过以上几步的综合作用，一个横向导航栏的初步框架就出现了。此步主要是定义链接的悬停效果，让导航栏更美观。当然，如果要让导航栏更炫丽，你可以在CSS悬停属性上定义背景图片。

```html
<style type="text/css">
#menu li a:hover {
background:#146C9C; /* 变换背景色 */
color:#fff; /* 变换文字颜色 */
}
</style>
```

这里的代码一个缺陷，最右边会多出来一个边框，由于 :first-child 伪类不被IE系列浏览器所支持，我们只能单独写一个样式，将最后一个边框去掉，同时要给 HTML 代码增加一个额外选择符。

```html
<ul id="menu">
<li><a href="http://www.baidu.com">Baidu.Com</a></li>
<li><a href="http://www.Code52.Net">Code52.Net</a></li>
<li><a href="http://www.yahoo.com">Yahoo.com</a></li>
<li><a href="http://www.google.com" class="last">Google.com</a></li>
</ul>

<style type="text/css">
#menu li a.last {
border-right:0; /* 去掉左侧边框 */
}
</style>
```

好了，到这里一个简单的横向导航菜单就制作完成了，是不是很简单？ 下面给出完整代码：

```html
<style type="text/css">
#menu { 
 font:12px verdana, arial, sans-serif; 
}
#menu, #menu li {
 list-style:none;
 padding:0;
 margin:0;
}
#menu li { 
 float:left; 
}
#menu li a {
 display:block;
 /* 如果是中英文混排的文字，建议用固定宽度
 width:150px;
 height:30px;
 line-height:30px;
 text-align:center;
 */
 padding:8px 50px;
 background:#3A4953;
 color:#fff;
 text-decoration:none;
 border-right:1px solid #000;
}
#menu li a:hover {
 background:#146C9C;
 color:#fff;
 text-decoration:none;
 border-right:1px solid #000;
}
#menu li a.last {
 border-right:0; /* 去掉左侧边框 */
}
</style>

<ul id="menu">
<li><a href="http://www.baidu.com">Baidu.Com</a></li>
<li><a href="http://www.Code52.Net">Code52.Net</a></li>
<li><a href="http://www.yahoo.com">Yahoo.com</a></li>
<li><a href="http://www.google.com" class="last">Google.com</a></li>
</ul>
```

你可以查看我们制作的在线演示和下载本文提供的实例包。

上面的CSS样式，我修改了一下。如下：

```html
<style type="text/css">
#menu {
font-size: 12px;
font-weight: bolder;
}
#menu li{
list-style-image: none;
list-style-type: none;
background-color: #999999;
border-right-width: 1px;
border-right-style: solid;
border-right-color: #000000;
float: left;
}
#menu li a{
color: #FFFFFF;
text-decoration: none;
margin: 0px;
padding-top: 8px;
display: block; /* 作为一个块 */
padding-right: 50px; /* 设置块的属性 */
padding-bottom: 8px;
padding-left: 50px;
}
#menu li a:hover{
background-color: #0099CC;
}
</style>
```
  
