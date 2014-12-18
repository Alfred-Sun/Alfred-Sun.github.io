---
layout: post
title: Jquery取得iframe中元素的几种方法（转载）
categories:
  - Javascript
author: GavinMiao
external-url: http://www.blogjava.net/GavinMiao/archive/2011/08/30/357580.html
---

iframe在复合文档中经常用到，利用jquery操作iframe可以大幅提高效率，这里收集一些基本操作

## 基本操作

DOM方法：

> * 父窗口操作IFRAME: `window.frames["iframeSon"].document`
> * IFRAME操作父窗口: `window.parent.document`

<!--more-->

jquery方法:
在父窗口中操作 选中IFRAME中的所有输入框：

```js
$(window.frames["iframeSon"].document).find(":text");
```
在IFRAME中操作 选中父窗口中的所有输入框：

```js
$(window.parent.document).find(":text");
```
iframe框架的HTML:

```html
<iframe src="test.html" id="iframeSon" width="700" height="300" frameborder="0" scrolling="auto"></iframe>
```

1.在父窗口中操作 选中IFRAME中的所有单选钮

```js
$(window.frames["iframe1"].document).find("input[@type='radio']").attr("checked","true");
```

2.在IFRAME中操作 选中父窗口中的所有单选钮

```js
$(window.parent.document).find("input[@type='radio']").attr("checked","true");
```

iframe框架的：

```html
<iframe src="test.html" id="iframe1" width="700" height="300" frameborder="0" scrolling="auto"></iframe>
```

{% highlight html linenos %}
<HTML xmlns="http://www.w3.org/1999/xhtml">
<HEAD>
    <MCE:SCRIPT mce_src="js/jquery-1.2.6.js" src="../js/jquery-1.2.6.js" type="text/ecmascript"></MCE:SCRIPT>    
    <MCE:SCRIPT type="text/javascript"><!--   
        $(function(){    
            $("#t1").hover(function(){alert('');});    
            //$("iframe").contents().find("body").append("I'm in an iframe!");     
            //$(window.frames["iframe1"].document).find("input[@type='text']").attr("size","30px");    
            //$("#iframe1").contents().find("#d1").css('color','red');
            //$(window.frames["iframe1"].document).find("input[@name='t1']").css({background:"#369"});    
            //$("#iframe1").src("test.html");
        });// -->
    </MCE:SCRIPT>
</HEAD>
<DIV>
<INPUT id=t1>    
<IFRAME id=iframe1 src="child.htm" mce_src="child.htm"></IFRAME>
<IFRAME height=100 src="child.htm" width=300 mce_src="child.htm"></IFRAME>
</DIV>
<DIV>
</DIV>
{% endhighlight %}


## 收集利用Jquery取得iframe中元素的几种方法

显示iframe中body元素的内容:

```js
$(document.getElementById('iframeId').contentWindow.document.body).htm()  
$(document.getElementById('iframeId').contentWindow.document.body).htm()
```

根据iframename取得其中ID为"testId"元素

```js
$("#testId", document.frames("iframename").document).html();  
$("#testId", document.frames("iframename").document).html();
// OR
$(window.frames["iframeName"].document).find("#testId").html()  
$(window.frames["iframeName"].document).find("#testId").html()
```


## 收集网上的一些示例：

### 用jQuery在IFRAME里取得父窗口的某个元素的值

只好用DOM方法与jquery方法结合的方式实现了

1.在父窗口中操作 选中IFRAME中的所有单选钮

```js
$(window.frames["iframe1"].document).find("input[@type='radio']").attr("checked","true");
```

2.在IFRAME中操作 选中父窗口中的所有单选钮

```js
$(window.parent.document).find("input[@type='radio']").attr("checked","true");
```

iframe框架的：

```html
<iframe src="test.html" id="iframe1" width="700" height="300" frameborder="0" scrolling="auto"></iframe>
```

IE7中测试通过
 
### 使用jquery操作iframe

1、 内容里有两个iframe

```html
<iframe id="leftiframe"...></iframe> 
<iframe id="mainiframe"..></iframe>
```

leftiframe中jQuery改变mainiframe的src代码： 

```js
$("#mainframe",parent.document.body).attr("src","http://www.radys.cn")
```

2、 如果内容里面有一个ID为mainiframe的iframe

```html
<iframe id="mainiframe"...></iframe>
```

iframe包含一个someID

```html
<div id="someID">you want to get this content</div>
```

得到someID的内容

```js
$("#mainiframe").contents().find("someID").html() html
//或者
$("#mainiframe").contains().find("someID").text()
```

3、在父窗口中操作 选中IFRAME中的所有单选钮

```js
$(window.frames["iframe1"].document).find("input[@type='radio']").attr("checked","true");
```

那选择id自然就是依然使用find方法

```js
$(window.frames["iframe1"].document).find("#id")
```

4、 如上面所示 
leftiframe中的jQuery操作mainiframe的内容someID的内容 

```js
$("#mainframe",parent.document.body).contents().find("someID").html()
//或者
$("#mainframe",parent.document.body).contents().find("someID").val()
```

### 使用JavaScript操纵iframe

框架间的互相引用

一个页面中的所有框架以集合的形式作为window 对象的属性提供，例如：window.frames就表示该页面内所有框架的集合，这和表单对象、链接对象、图片对象等是类似的，不同的是，这些集合是 document的属性。因此，要引用一个子框架，可以使用如下语法：

```js
window.frames["frameName"];
window.frames.frameName
window.frames[index]
```

其中，window字样也可以用self代替或省略，假设frameName为页面中第一个框架，则以下的写法是等价的：

```js
self.frames["frameName"]
self.frames[0]
frames[0]
```

frameName

每个框架都对应一个HTML页面，所以这个框架也是 一个独立的浏览器窗口，它具有窗口的所有性质，所谓对框架的引用也就是对window对象的引用。有了这个window对象，就可以很方便地对其中的页面 进行操作，例如使用window.document对象向页面写入数据、使用window.location属性来改变框架内的页面等。

下面分别介绍不同层次框架间的互相引用：

1．父框架到子框架的引用

知道了上述原理，从父框架引用子框架变的非常容易，即：

```js
window.frames["frameName"];
```

这样就引用了页面内名为frameName的子框架。如果要引用子框架内的子框架，根据引用的框架实际就是window对象的性质，可以这样实现：

```js
window.frames["frameName"].frames["frameName2"];
```

这样就引用到了二级子框架，以此类推，可以实现多层框架的引用。

2．子框架到父框架的引用

每个window对象都有一个parent属性，表示它的父框架。如果该框架已经是顶层框架，则window.parent还表示该框架本身。

3．兄弟框架间的引用

如果两个框架同为一个框架的子框架，它们称为兄弟框架，可以通过父框架来实现互相引用，例如一个页面包括2个子框架：

```html
<frameset rows="50%,50%">
<frame src="1.html" name="frame1" />
<frame src="2.html" name="frame2" />
</frameset>
```

在frame1中可以使用如下语句来引用frame2：

```js
self.parent.frames["frame2"];
```

4．不同层次框架间的互相引用

框架的层次是针对顶层框架而言的。当层次不同时，只要知道自己所在的层次以及另一个框架所在的层次和名字，利用框架引用的window对象性质，可以很容易地实现互相访问，例如：

```js
self.parent.frames["childName"].frames["targetFrameName"];
```

5．对顶层框架的引用

和parent属性类似，window对象还有一个top属性。它表示对顶层框架的引用，这可以用来判断一个框架自身是否为顶层框架，例如：

```js
//判断本框架是否为顶层框架
if(self==top){
//dosomething
}
```
