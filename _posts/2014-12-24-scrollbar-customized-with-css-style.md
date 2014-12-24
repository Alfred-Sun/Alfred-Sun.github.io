---
layout: post
title: CSS自定义浏览器滚动条样式
category: CSS
tags: [CSS, Scroll-bars]
author: Alfred Sun
updated: 2014-12-24 20:07
keywords: scrollbar, css
description: 总结IE、Firefox、Chrome三大浏览器，用CSS设置滚动条样式的方法
---

## 前言

浏览器默认的滚动条看久了，不免有些审美疲劳，想得自己动手整整。网上查阅一番后，总结一下。   
IE浏览器有几个设置滚条的样式，不过只能设置颜色之类的，而且webkit下面也不支持。无意间看到网易邮箱的滚动条样子很好看，一开始以为是用div模拟的，结果一看，利用的CSS来设置的，而且是webkit浏览器。

![webkit scrollbar]({{ site.picture_dir }}/scrollbar-customized-with-css-style/webkit_css.jpg)

得好好研究这几个属性下。

<!--more-->


## WebKit浏览器CSS设置滚动条

主要有下面7个属性:

1. **::-webkit-scrollbar**				滚动条整体部分，可以设置宽度啥的
2. **::-webkit-scrollbar-button**		滚动条两端的按钮
3. **::-webkit-scrollbar-track**		外层轨道
4. **::-webkit-scrollbar-track-piece**	内层轨道，滚动条中间部分（除去）
5. **::-webkit-scrollbar-thumb**		拖动条，滑块
6. **::-webkit-scrollbar-corner**		边角
7. **::-webkit-resizer**				定义右下角拖动块的样式

具体所指如下图:

![webkit scrollbar]({{ site.picture_dir }}/scrollbar-customized-with-css-style/webkit_scrollbar.png)

上面是滚动条的主要设置属性，还有更详尽的CSS属性伪类，可以更丰富滚动条样式。

**:horizontal** 水平方向的滚动条   
**:vertical** 垂直方向的滚动条   
**:decrement** 应用于按钮和内层轨道(track piece)。它用来指示按钮或者内层轨道是否会减小视窗的位置(比如，垂直滚动条的上面，水平滚动条的左边)   
**:increment** 和decrement类似，用来指示按钮或内层轨道是否会增大视窗的位置(比如，垂直滚动条的下面和水平滚动条的右边)   
**:start** 也应用于按钮和滑块。它用来定义对象是否放到滑块的前面。   
**:end** 类似于start伪类，标识对象是否放到滑块的后面。   
**:double-button** 该伪类以用于按钮和内层轨道。用于判断一个按钮是不是放在滚动条同一端的一对按钮中的一个。对于内层轨道来说，它表示内层轨道是否紧靠一对按钮。   
**:single-button** 类似于double-button伪类。对按钮来说，它用于判断一个按钮是否自己独立的在滚动条的一段。对内层轨道来说，它表示内层轨道是否紧靠一个single-button。   
**:no-button** 用于内层轨道，表示内层轨道是否要滚动到滚动条的终端，比如，滚动条两端没有按钮的时候。   
**:corner-present** 用于所有滚动条轨道，指示滚动条圆角是否显示。   
**:window-inactive** 用于所有的滚动条轨道，指示应用滚动条的某个页面容器(元素)是否当前被激活。(在webkit最近的版本中，该伪类也可以用于::selection伪元素。webkit团队有计划扩展它并推动成为一个标准的伪类)

另外，**:enabled**、**:disabled**、**:hover** 和 **:active** 等伪类同样可以用于滚动条中。

值得一提的是，WebKit伪类和伪元素的实现很强大，虽然类目有些多，但是我们可以把滚动条当成一个页面元素来定义，也差不多可以用上一些高级的CSS3属性，比如渐变、圆角、RGBA等等，当然有些地方也可以用图片，然后图片也可以转换成Base64，总之，可以尽情发挥了。

写个实例 **[Demo][]**（请在webkit浏览器下观看）。

[Demo]: {{ site.demo_dir }}/webkit_css_scrollbar.html

```css
/* 设置滚动条的样式 */
::-webkit-scrollbar {
    width: 12px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0,0,0,0.1);
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(255,0,0,0.4);
}
```

## IE下面CSS设置滚动条

IE下面就比较简单了，自定义的属性比较少，全是颜色。

1. **scrollbar-arrow-color**: color; /*三角箭头的颜色*/
2. **scrollbar-face-color**: color; /*立体滚动条的颜色（包括箭头部分的背景色）*/
3. **scrollbar-3dlight-color**: color; /*立体滚动条亮边的颜色*/
4. **scrollbar-highlight-color**: color; /*滚动条的高亮颜色（左阴影？）*/
5. **scrollbar-shadow-color**: color; /*立体滚动条阴影的颜色*/
6. **scrollbar-darkshadow-color**: color; /*立体滚动条外阴影的颜色*/
7. **scrollbar-track-color**: color; /*立体滚动条背景颜色*/
8. **scrollbar-base-color**:color; /*滚动条的基色*/

大概就这些，也可以定义cursor来定义滚动条的鼠标手势。


## Firefox浏览器滚动条样式插件

吐槽下，作为三大浏览器的火狐居然没有相关CSS。

<a href="http://www.firefoxfan.com/Firefox-Stylish/297.html" target="_blank" title="清新漂亮的圆角蓝色火狐滚动条样式"><img src="{{ site.picture_dir }}/scrollbar-customized-with-css-style/firefox_scrollbar.png" alt="webkit scrollbar" align="right"></a>

火狐不支持滚动条样式调整，火狐浏览器未开放针对滚动条样式的设定。且也不支持css代码关于这些浏览器属性的控制。如果非要样式效果，只能滚动效果用JS来做，使用图片代替按钮。

不过博主发现，本地的Firefox可以通过安装[Stylish][]扩展定制滚动条样式，下面分享个效果图给大家看（见右图）。

你可以下载这个样式<a href="{{ site.document_dir }}/firefox_stylish_scrollbar.css" target="_blank" title="Download"><i class="icon-file-text" style="display: inline;
margin-left: 5px;color:#111;"></i> **Stylesheet**</a>，粘贴到Firefox Stylish里面体验下效果。

[Stylish]: https://addons.mozilla.org/zh-CN/firefox/addon/stylish/ "Firefox Stylish"

<!--[![webkit scrollbar]({{ site.picture_dir }}/scrollbar-customized-with-css-style/firefox_scrollbar.png)]()-->


## 滚动条(兼容Firefox、IE、Chrome)[修改jsScrollbar]

发现一个不错的完全`JS+CSS`定制的Scrollbar，兼容三大浏览器，出自[这里](http://lullabyus.iteye.com/blog/1314957 "滚动条(兼容火狐、IE、chrome)")；只不过，假如页面很复杂的话，这个就不如浏览器原生的流畅。代码如下。

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<style type="text/css">
*{ margin:0px; padding: 0px; list-style:none;}
.box { width:500px; margin:0 auto; position:relative; top:100px;  }
.Container { position: absolute; top:0px; left: 100px; width: 400px; height: 200px; background-color: #EEE; }
#Scroller-1 {  position: absolute;  overflow: hidden; width: 400px; height: 200px; }
#Scroller-1 p { margin: 0; padding: 10px 20px; font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 11px; text-indent: 20px; color: #777; }
.Scroller-Container { position: absolute; top: 0px; left: 0px; }
.Scrollbar-Track { width: 10px; height: 200px; position: absolute; top: 0px; right:0px; background-color: #EEE; cursor:pointer;  }
.Scrollbar-Handle { position: absolute; top: 0px; left: 0px; width: 10px; height: 30px; background-color: #CCC; }
</style>
<script type="text/javascript">
var scroller  = null;
var scrollbar = null;
window.onload = function () {
  scroller  = new jsScroller(document.getElementById("Scroller-1"), 400, 200);
  scrollbar = new jsScrollbar (document.getElementById("Scrollbar-Container"), scroller, false);
}


function jsScroller (o, w, h) {
	var self = this;
	var list = o.getElementsByTagName("div");
	for (var i = 0; i < list.length; i++) {
		if (list[i].className.indexOf("Scroller-Container") > -1) {
			o = list[i]; // 以 o 为对象，将对象包含的class名为Scroller-Container的元素付给 对象 o			
		}
	}
	
	//Private methods
	this._setPos = function (x, y) {
		if (x < this.viewableWidth - this.totalWidth) 
			x = this.viewableWidth - this.totalWidth;
		if (x > 0) x = 0;
		if (y < this.viewableHeight - this.totalHeight) 
			y = this.viewableHeight - this.totalHeight;
		if (y > 0) y = 0;
		this._x = x;
		this._y = y;
		with (o.style) {
			left = this._x +"px";
			top  = this._y +"px";
		}
	};
	
	//Public Methods
	this.reset = function () {
		this.content = o;
		this.totalHeight = o.offsetHeight;
		this.totalWidth	 = o.offsetWidth;
		this._x = 0;
		this._y = 0;
		with (o.style) {
			left = "0px";
			top  = "0px";
		}
	};
	this.scrollBy = function (x, y) {
		this._setPos(this._x + x, this._y + y);
	};
	this.scrollTo = function (x, y) {
		this._setPos(-x, -y);
	};
	this.stopScroll = function () {
		if (this.scrollTimer) window.clearInterval(this.scrollTimer);
	};
	this.startScroll = function (x, y) {
		this.stopScroll();
		this.scrollTimer = window.setInterval(
			function(){ self.scrollBy(x, y); }, 40
		);
	};
	this.swapContent = function (c, w, h) {
		o = c;
		var list = o.getElementsByTagName("div");
		for (var i = 0; i < list.length; i++) {
			if (list[i].className.indexOf("Scroller-Container") > -1) {
				o = list[i];
			}
		}
		if (w) this.viewableWidth  = w;
		if (h) this.viewableHeight = h;
		this.reset();
	};
	
	//variables
	this.content = o;
	this.viewableWidth  = w;
	this.viewableHeight = h;
	this.totalWidth	 = o.offsetWidth;
	this.totalHeight = o.offsetHeight;
	this.scrollTimer = null;
	this.reset();
};


function jsScrollbar (o, s, a, ev) {
	var self = this;
	
	this.reset = function () {
		//Arguments that were passed
		this._parent = o;
		this._src    = s;
		this.auto    = a ? a : false;
		this.eventHandler = ev ? ev : function () {};
		//Component Objects
		this._up   = this._findComponent("Scrollbar-Up", this._parent);
		this._down = this._findComponent("Scrollbar-Down", this._parent);
		this._yTrack  = this._findComponent("Scrollbar-Track", this._parent);
		this._yHandle = this._findComponent("Scrollbar-Handle", this._yTrack);
		//Height and position properties
		this._trackTop = findOffsetTop(this._yTrack);
		this._trackHeight  = this._yTrack.offsetHeight;
		this._handleHeight = this._yHandle.offsetHeight;
		this._x = 0;
		this._y = 0;
		//Misc. variables
		this._scrollDist  = 5;
		this._scrollTimer = null;
		this._selectFunc  = null;
		this._grabPoint   = null;
		this._tempTarget  = null;
		this._tempDistX   = 0;
		this._tempDistY   = 0;
		this._disabled    = false;
		this._ratio = (this._src.totalHeight - this._src.viewableHeight)/(this._trackHeight - this._handleHeight);
		
		this._yHandle.ondragstart  = function () {return false;};
		this._yHandle.onmousedown = function () {return false;};
		if(window.event){ 
			this._addEvent(this._src.content, "mousewheel", this._scrollbarWheel);			
		}//W3C 
		else{
			this._addEvent(this._src.content, "DOMMouseScroll", this._scrollbarWheel);
		}
		
		this._removeEvent(this._parent, "mousedown", this._scrollbarClick);
		this._addEvent(this._parent, "mousedown", this._scrollbarClick);
		
		this._src.reset();
		with (this._yHandle.style) {
			top  = "0px";
			left = "0px";
		}
		this._moveContent();
		
		if (this._src.totalHeight < this._src.viewableHeight) {
			this._disabled = true;
			this._yHandle.style.visibility = "hidden";
			if (this.auto) this._parent.style.visibility = "hidden";
		} else {
			this._disabled = false;
			this._yHandle.style.visibility = "visible";
			this._parent.style.visibility  = "visible";
		}
	};
	this._addEvent = function (o, t, f) {
		if (o.addEventListener) o.addEventListener(t, f, false);
		else if (o.attachEvent) o.attachEvent('on'+ t, f);
		else o['on'+ t] = f;
	};
	this._removeEvent = function (o, t, f) {
		if (o.removeEventListener) o.removeEventListener(t, f, false);
		else if (o.detachEvent) o.detachEvent('on'+ t, f);
		else o['on'+ t] = null;
	};
	this._findComponent = function (c, o) {
		var kids = o.childNodes;
		for (var i = 0; i < kids.length; i++) {
			if (kids[i].className && kids[i].className == c) {
				return kids[i];
			}
		}
	};
	//Thank you, Quirksmode
	function findOffsetTop (o) {
		var t = 0;
		if (o.offsetParent) {
			while (o.offsetParent) {
				t += o.offsetTop;
				o  = o.offsetParent;
			}
		}
		return t;
	};
	this._scrollbarClick = function (e) {
		if (self._disabled) return false;
		
		e = e ? e : event;
		if (!e.target) e.target = e.srcElement;
		
		if (e.target.className.indexOf("Scrollbar-Up") > -1) self._scrollUp(e);
		else if (e.target.className.indexOf("Scrollbar-Down") > -1) self._scrollDown(e);
		else if (e.target.className.indexOf("Scrollbar-Track") > -1) self._scrollTrack(e);
		else if (e.target.className.indexOf("Scrollbar-Handle") > -1) self._scrollHandle(e);
		
		self._tempTarget = e.target;
		self._selectFunc = document.onselectstart;
		document.onselectstart = function () {return false;};
		
		self.eventHandler(e.target, "mousedown");
		self._addEvent(document, "mouseup", self._stopScroll, false);
		
		return false;
	};
	this._scrollbarDrag = function (e) {
		e = e ? e : event;
		var t = parseInt(self._yHandle.style.top);
		var v = e.clientY + document.body.scrollTop - self._trackTop;
		with (self._yHandle.style) {
			if (v >= self._trackHeight - self._handleHeight + self._grabPoint)
				top = self._trackHeight - self._handleHeight +"px";
			else if (v <= self._grabPoint) top = "0px";
			else top = v - self._grabPoint +"px";
			self._y = parseInt(top);
		}
		
		self._moveContent();
	};
	this._scrollbarWheel = function (e) {
		e = e ? e : event;
		var dir = 0;
		if (e.wheelDelta >= 120) dir = -1;
		if (e.wheelDelta <= -120) dir = 1;
		if(e.detail >=3) dir= 1;
		if(e.detail <=-3) dir = -1;
		
		self.scrollBy(0, dir * 20);
		e.returnValue = false;
	};
	this._startScroll = function (x, y) {
		this._tempDistX = x;
		this._tempDistY = y;
		this._scrollTimer = window.setInterval(function () {
			self.scrollBy(self._tempDistX, self._tempDistY); 
		}, 40);
	};
	this._stopScroll = function () {
		self._removeEvent(document, "mousemove", self._scrollbarDrag, false);
		self._removeEvent(document, "mouseup", self._stopScroll, false);
		
		if (self._selectFunc) document.onselectstart = self._selectFunc;
		else document.onselectstart = function () { return true; };
		
		if (self._scrollTimer) window.clearInterval(self._scrollTimer);
		self.eventHandler (self._tempTarget, "mouseup");
	};
	this._scrollUp = function (e) {this._startScroll(0, -this._scrollDist);};
	this._scrollDown = function (e) {this._startScroll(0, this._scrollDist);};
	this._scrollTrack = function (e) {
		var curY = e.clientY + document.body.scrollTop;
		this._scroll(0, curY - this._trackTop - this._handleHeight/2);
	};
	this._scrollHandle = function (e) {
		var curY = e.clientY + document.body.scrollTop;
		this._grabPoint = curY - findOffsetTop(this._yHandle);
		this._addEvent(document, "mousemove", this._scrollbarDrag, false);
	};
	this._scroll = function (x, y) {
		if (y > this._trackHeight - this._handleHeight) 
			y = this._trackHeight - this._handleHeight;
		if (y < 0) y = 0;
		
		this._yHandle.style.top = y +"px";
		this._y = y;
		
		this._moveContent();
	};
	this._moveContent = function () {
		this._src.scrollTo(0, Math.round(this._y * this._ratio));
	};
	
	this.scrollBy = function (x, y) {
		this._scroll(0, (-this._src._y + y)/this._ratio);
	};
	this.scrollTo = function (x, y) {
		this._scroll(0, y/this._ratio);
	};
	this.swapContent = function (o, w, h) {// 判断浏览器
		if(window.event){ 
			this._removeEvent(this._src.content, "mousewheel", this._scrollbarWheel, false);
		}//W3C 
		else{
			this._removeEvent(this._src.content, "DOMMouseScroll", this._scrollbarWheel, false);
		}
		
		this._src.swapContent(o, w, h);
		this.reset();
	};
	
	this.reset();
};

</script>
</head>

<body>

<div class="box">
    <div class="Container">
      <div id="Scroller-1">
       <div style="left: 0px; top: -596px;" class="Scroller-Container">
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
     iaculis, ante et congue feugiat, elit wisi commodo metus, ut commodo 
    ligula enim ac justo. Pellentesque id ligula. Class aptent taciti 
    sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. 
    Phasellus vitae mi a elit dictum volutpat. Pellentesque nec arcu. Etiam 
    blandit. Phasellus egestas dolor ut lacus. Sed enim justo, sagittis ut, 
    condimentum non, ullamcorper eu, neque. In hac habitasse platea 
    dictumst. Integer ipsum risus, sagittis ac, imperdiet ac, interdum sed, 
    libero. Praesent commodo. Mauris congue, urna eget hendrerit elementum, 
    dolor ligula ultrices neque, in elementum ante erat et elit.</p>
          <p>Vivamus vehicula. Integer cursus massa et nisl. Morbi pretium 
    sem eget risus. Vestibulum nec est. Donec feugiat purus et ligula. 
    Quisque semper. Sed eu ante. Curabitur suscipit porttitor libero. Nam 
    eros leo, sollicitudin eget, tincidunt vitae, facilisis a, dui. Proin 
    neque. Aliquam erat volutpat. Pellentesque felis.</p>
          <p>Aliquam consequat. Proin feugiat ultricies dui. Suspendisse 
    mollis dui nec nunc. Nam tristique, ante vitae imperdiet vestibulum, 
    elit nulla rhoncus nisl, vitae tincidunt dolor dui eu mi. In hac 
    habitasse platea dictumst. Nunc blandit dolor vel mauris. Proin wisi. 
    Nam pharetra ultrices tellus. Sed arcu. Lorem ipsum dolor sit amet, 
    consectetuer adipiscing elit. Nullam ultricies semper wisi. Sed nisl. 
    Donec blandit. Nunc vitae urna sed nisl mattis ornare.</p>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
     iaculis, ante et congue feugiat, elit wisi commodo metus, ut commodo 
    ligula enim ac justo. Pellentesque id ligula. Class aptent taciti 
    sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. 
    Phasellus vitae mi a elit dictum volutpat. Pellentesque nec arcu. Etiam 
    blandit. Phasellus egestas dolor ut lacus. Sed enim justo, sagittis ut, 
    condimentum non, ullamcorper eu, neque. In hac habitasse platea 
    dictumst. Integer ipsum risus, sagittis ac, imperdiet ac, interdum sed, 
    libero. Praesent commodo. Mauris congue, urna eget hendrerit elementum, 
    dolor ligula ultrices neque, in elementum ante erat et elit.</p>
          <p>Vivamus vehicula. Integer cursus massa et nisl. Morbi pretium 
    sem eget risus. Vestibulum nec est. Donec feugiat purus et ligula. 
    Quisque semper. Sed eu ante. Curabitur suscipit porttitor libero. Nam 
    eros leo, sollicitudin eget, tincidunt vitae, facilisis a, dui. Proin 
    neque. Aliquam erat volutpat. Pellentesque felis.</p>
          <p>Aliquam consequat. Proin feugiat ultricies dui. Suspendisse 
    mollis dui nec nunc. Nam tristique, ante vitae imperdiet vestibulum, 
    elit nulla rhoncus nisl, vitae tincidunt dolor dui eu mi. In hac 
    habitasse platea dictumst. Nunc blandit dolor vel mauris. Proin wisi. 
    Nam pharetra ultrices tellus. Sed arcu. Lorem ipsum dolor sit amet, 
    consectetuer adipiscing elit. Nullam ultricies semper wisi. Sed nisl. 
    Donec blandit. Nunc vitae urna sed nisl mattis ornare.</p>
        </div>
      </div>
    </div>
  <div style="visibility: visible;" id="Scrollbar-Container">
    <div class="Scrollbar-Track">
      <div style="top: 70px; left: 0px; visibility: visible;" class="Scrollbar-Handle"></div>
    </div>
  </div>
</div>


</body>

</html>
```

其效果图如下所示：

<div style="width:85%;height:200px;margin:auto;display:block;">
<iframe width="100%" height="200px" allowTransparency="true" frameborder="0" scrolling="no" src="{{ site.demo_dir }}/scrollbar_customized.html"></iframe>
</div>
