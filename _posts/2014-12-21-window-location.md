---
layout: post
title: window.location 属性
category: JavaScript
tags: [window, location]
author: Alfred Sun
updated: 2014-12-21 09:15
keywords: window.location, javascript
description: 
---

window.location 对象用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面。  
__Note__: window.location 对象在编写时可不使用 window 这个前缀。

## Window Location 对象

原生 JavaScript window.location 对象所包含的属性:

| 属性		| 描述							|
| :-----	| :----:						|
| hash		| 从井号 (#) 开始的 URL（锚）	|
| host		| 主机名和当前 URL 的端口号		|
| hostname	| 当前 URL 的主机名				|
| href		| 完整的 URL					|
| pathname	| 当前 URL 的路径部分			|
| port		| 当前 URL 的端口号				|
| protocol	| 当前 URL 的协议				|
| search	| 从问号 (?) 开始的 URL(查询部分)	|

<!--more-->

**1. window.location.hash**

要使用 JS 定位锚点，完全可以使用 window.hash 配合元素 ID 完成。比如快速定位到页面的某条评论，则直接使用如下代码即可：

```js
window.location.hash = "#comment-5981";
```

另外 Twitter、Facebook、Google 等已经开始大量使用 #! 这种形式的 hash 方法处理异步交互页面的 URL 可回溯功能。

**2. window.location.search**

如果有这样一个 URL 地址：

```
http://www.google.com.hk/search?hl=zh-CN&source=hp&biw=1400&bih=935&q=%E8%8A%92%E6%9E%9C%E5%B0%8F%E7%AB%99&aq=f&aqi=&aql=&oq=
```

要利用 JS 脚本捕获页面 GET 方式请求的诸参数？可直接使用 `window.location.search` 获得，然后通过 split 方法结合循环遍历，组织数据格式。

另外，如果根据用户的搜索条件刷新页面，只需直接设置 `window.location.search` 即可。

## location.hash 属性介绍

location是javascript里边管理地址栏的内置对象，比如location.href管理页面的url，用`location.href=url`就可以直接将页面重定向url。而location.hash则可以用来获取或设置页面的标签值。比如`http://domain/#admin`的location.hash="#admin"。利用这个属性值可以做一个非常有意义的事情。

很多人都喜欢收藏网页，以便于以后的浏览。不过对于Ajax页面来说的话，一般用一个页面来处理所有的事务，也就是说，如果你浏览到一个Ajax页面里边有意思的内容，想将它收藏起来，可是地址只有一个呀，下次你打开这个地址，还是得像以往一样不断地去点击网页，找到你钟情的那个页面。另外的话，浏览器上的“前进”“后退”按钮也会失效，这对于很多习惯了传统页面的用户来说，是一个很大的使用障碍。

那么，怎么用location.hash来解决这两个问题呢？其实一点也不神秘。

比如，某管理系统，主要功能有三个：普通搜索、高级搜索、后台管理，我分别给它们分配一个hash值：#search、#advsearch、#admin，在页面初始化的时候，通过`window.location.hash`来判断用户需要访问的页面，然后通过javascript来调整显示页面。比如：

```js
var hash;
hash=(!window.location.hash)?"#search":window.location.hash; 
window.location.hash=hash; 
  //调整地址栏地址，使前进、后退按钮能使用 
switch(hash){   
case "#search":  
	selectPanel("pnlSearch");   //显示普通搜索面板  
	break;    
case "#advsearch":    
	...
case "#admin":  
	...
}
```

通过`window.location.hash=hash`这个语句来调整地址栏的地址，使得浏览器里边的“前进”、“后退”按钮能正常使用（实质上欺骗了浏览器）。然后再根据hash值的不同来显示不同的面板（用户可以收藏对应的面板了），这就使得Ajax页面的浏览趋于传统化了。
