---
layout: post
title: "用Jekyll和jQuery实现异步加载文章列表"
date: 2014-12-11 02:30
category: GitHub Pages
tags: [jekyll, javascript]
author: ypchen
description: 本文主要讨论如何用jekyll模板生成json，使用jQuery的插件waypoint，实现异步加载文章列表
keywords: jekyll, javascript
external-url: http://yanping.me/cn/blog/2012/10/10/asynchronous-loading-post-list-with-jekyll-and-jQuery/
---

## 前言(Introduction)

> 本文主要讨论如何用基于jQuery的插件waypoint，实现异步加载jekyll模板生成的json文件，生成文章列表。

在[一博客的文章列表](http://art.yanping.me/archives/)里使用了异步加载的技术，不过直接看页面的html源代码是看不出来的。编译之前的代码在[这里](https://github.com/yanping/art/blob/gh-pages/archives/index.html)。

<!--more-->

## 文章列表 JSON 数据

首先，生成文章列表数据的json模板（记得保存问json格式的文件）：

```
{% raw %}---
layout: nil
---

[
{% for post in site.posts %}
  {"title":"{{post.title}}", 
  "url":"{{site.url}}{{post.url}}", 
  "date":"{{ post.date | date:'%Y-%m-%d' }}", 
  "tags":[{% for tag in post.tags %}"{{tag}}"{% if forloop.last == false %} ,{% endif %}{% endfor %}]}
  {% if forloop.last == false %},{% endif %}{% endfor %}
]
{% endraw %}
```

这在前面的[文章](http://chen.yanping.me/cn/blog/2012/04/19/jekyll-with-json/)里提到过。   
(Alfred Sun: 博主感觉同一博客里面异步加载文章列表意义不大；因为每次访问GitHub博客时，都会执行Jekyll生成新的网站，当然JSON文件每次也会一起重新生成；与其写代码异步加载费时费力，不如直接写进HTML，随同页面一起载入。唯一有用之处，就如作者所言，维护多个博客时，相互间可以引用文章列表。)

但是如果JSON文件不在同一域中，出于安全性考虑就无法用`getJSON`请求它；这种情况下，可以将JSON数据包在JS文件里面，然后浏览器跨域加载外部JS就可以了，演示实例看[这里]({{ site.demo_dir }}/get_json_of_posts.html)。


## 设定参数

头部YAML数据部分：

```yaml
---
layout: default
title: 全部文章
initItem: 50
perPageItem: 100
---
```

`initItem`是初始加载时显示的文章主题数，`perPageItem`是每次页面下拉到底部时读取json数据并新生成的文章主题数。   
这两个参数用于异步加载方法，同时还要用到一个jQuery Plugin - [Waypoints](http://imakewebthings.com/waypoints/)


## 动态加载文章

初始加载网页时，文章主题列表是静态的html，由jekyll生成：

```html {% raw %}
<ul class="posts">
{% for post in site.posts limit:page.initItem %}
  <li class="listing-item">
	<time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
	<a href="{{site.baseurl}}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
  </li>{% endfor %}
</ul>
{% endraw %}
```

上面的`limit:page.initItem`限定了列表的项数不超过`initItem`。当向下拉页面，waypoint会捕捉到页面下拉到底部的事件，并调用*getJSON*方法来读取json数据，形成文章列表。


```html
{% raw %}

{% if site.posts.size > page.initItem %}
<script src="/js/jquery-1.7.1.min.js" type="text/javascript" charset="utf-8"></script>
<script src="/js/waypoints.min.js" type="text/javascript"></script>
<script type="text/javascript">
  $(document).ready(function() {
	// 关于waypoint，请看 http://imakewebthings.com/jquery-waypoints/
	var $loading = $("<div class='loading' style='text-align:center'><img src='/images/loading.gif'></div>"),
	$footer = $('footer'),
	opts = {
	  offset: '100%'
	};

	var count = {{ page.initItem }}; // 初始文章数
	var count_sup = 0; // 循环上界，初始为0
	$footer.waypoint(function(event, direction) {
	  $footer.waypoint('remove');
	  $('.posts').append($loading);
	  $.getJSON("../post.json", function(data) {
		var content = "";
		count_sup = count + {{ page.perPageItem }}; // 循环上界每次增加page.perPageItem项
		var delta = 0; // 局部计数器
		$.each(data, function(i, item) {
		  if (i >= count & i < count_sup) {
			content += "<li class='listing-item'><time datetime='" + item.date + "'>" + item.date + "</time>";
			content += "<a href='" + item.url + "' title='" + item.title + "'>" + item.title + "</a></li>";
			delta++;
		  }
		});
		count += delta;
		$('div.loading').remove();
		$(".posts").append(content);
		if (count < data.length) $footer.waypoint(opts);
	  });
	}, opts);
  });
</script>
{% endif %}

{% endraw %}
```

关于这段代码，要注意以下几点：

1. 上面的代码一开始有个判断语句，当文章数不大于`initItem`时，后面的js代码不会进入最终生成的html中。
2. 充分利用Liquid模板的特性，在js代码中，也引用了Liquid模板数据`{% raw %}{{ page.initItem }}{% endraw %}`和`{% raw %}{{ page.perPageItem }}{% endraw %}`
3. `.getJSON()`读取数据形成列表之后，语句:

```js
	if (count < data.length) $footer.waypoint(opts);
```

是要判断已经加载的文章主题数是否到达总数，如果比总数小，就会在新的底部`$footer`上注册为**waypoint**，然后再向下拉页面，到达底部还会触发事件，然后接着读取数据，直到数据已经读取完毕。
