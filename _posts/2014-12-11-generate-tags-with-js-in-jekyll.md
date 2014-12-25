---
layout: post
title: 用js在jekyll博客中实现标签云和标签页
author: Alfred Sun
updated: 2014-12-25 21:36
description: 主要讨论在jekyll博客中借助javascript和json，实现标签云和标签页。标签云可以用jquery.tagcloud.js插件实现，标签页则使用jQuery读取json数据文件，用地址传递参数给js函数，使用的是异步加载技术
category: github pages
tags: [tagcloud, jekyll]
keywords: tagcloud, jekyll
external-url: http://yanping.me/cn/blog/2013/02/13/generate-tags-with-js-in-jekyll-blog/
---

> 本文主要讨论在jekyll博客中借助javascript和json，实现标签云和标签页。标签云可以用jquery.tagcloud.js插件实现，标签页则使用jQuery读取json数据文件，用地址传递参数给js函数，使用的是异步加载技术，请看[演示页面](http://art.yanping.me/tags/)


## 标签云

先做点准备工作，加载jquery。因为我的博客里还加载了其他的js库，在另外一个js库中也定义了符号的话，那么我们在使用符号时就发生了冲突。所以在加载jquery时还要解决`$`命名冲突。请看[这篇文章](http://www.cnblogs.com/RascallySnake/archive/2010/05/07/1729417.html)，我用的办法是定义jQuery的别名：

```html
<script src="/js/jquery-1.7.1.min.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
  var jq = jQuery.noConflict();
</script>
```

<!--more-->

下面是标签云的代码：

```html
<script src="/js/jquery.tagcloud.js" type="text/javascript" charset="utf-8"></script>
<script language="javascript">
  jq.fn.tagcloud.defaults = {
    size: {
      start: 12,
      end: 22,
      unit: 'px'
    },
    color: {
      start: '#7CCD7C',
      end: '#CD0000'
    }
  };

  jq(function() {
    jq('#tag_cloud a').tagcloud();
  });
</script>
```


## 标签页

最初在谢益辉的博客里看到的[用js实现标签云](http://yihui.name/cn/tags/)。可以看到，这个标签页上，在标签云之后跟着各个标签的文章列表，如果我只想看到某个标签的文章列表，要怎么做呢？

前面我写了篇文章[《用jekyll和jQuery实现异步加载文章列表》](http://alfred-sun.github.io/blog/2014/12/11/jekykll-jquery-asyn-load/)，使用jQuery异步加载文章列表。同样的，我们也可以编写个函数加载某个标签的所有文章的列表。

首先，生成文章列表数据的json模板是：

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

用jekyll处理之后得到的json文件在[这里](http://art.yanping.me/post.json)。

定义javascript函数showTag()，异步加载某一个标签的文章列表

```html
<script type="text/javascript">
  function showTag(tagStr) {
    jq.getJSON("../post.json",
    function(data) {
      jq('#show-tag').empty(content);
      var content = "<h2>分类：" + tagStr + "</h2><ul class=\"posts\">";
      var count = 0;
      jq.each(data,
      function(i, item) {
        jq.each(item.tags,
        function(j, tag) {
          if (tag == tagStr) {
            content += "<li class=\"listing-item\"><time datetime=\"" + item.date + "\">" + item.date + "</time><a href=\"" + item.url + "\">" + item.title + "</a></li>";
            count++;
          }

        });
      });
      if (count > 0) {
        content += "</ul>";
        postNumStr = "<span>（" + count + "篇文章）</span>";
        jq('#show-tag').append(content);
        jq('#show-tag>h2').append(postNumStr);
      }
    });
  }
</script>
```

而标签页的核心代码为

```html
{% raw %}
<div id="tag_cloud">
  {% for tag in site.tags %}
  <a href="javascript:;" onclick="showTag('{{ tag[0] }}')" title="{{ tag[0] }}" rel="{{ tag[1].size }}">
    {{ tag[0] }}
  </a>
  {% endfor %}
  </div>

<div id="show-tag">
  <div style="text-align:center">
    <img src="/images/loading.gif"/>&nbsp;&nbsp;loading...
  </div>
</div>
{% endraw %}
```

[戳这里](https://raw.github.com/yanping/art/gh-pages/tags/index.html)查看完整代码。

下面这段代码用url地址来传递参数

```html
<script type="text/javascript">
  var href = window.location.href;
  var pos = href.indexOf('?tag=');
  var paraStr = href.substring(pos + 5);
  if (pos > 0) {
    showTag(decodeURI(paraStr));
  } else {
    showTag("");
  }
</script>
```

post模板里的标签列表部分代码：

```
{% raw %}
{% if page.tags != empty %}
<ul class="tags emphnext">
  <li>标签：</li>
  {% for tag in page.tags %}
  <li>
    <a href="{{ site.baseurl }}/tags/?tag={{tag | cgi}}">
      {{ tag }}
    </a>
    {% if forloop.last == false %}, {%endif %}
  </li>
  {% endfor %}
</ul>
{% endif %}
{% endraw %}
```

侧面栏上标签列表的代码：

```html
{% raw %}
<div id="tag_sidebar">
  {% for tag in site.tags %}
  <a href="{{site.baseurl}}/tags/?tag={{tag[0] | cgi}}" title="{{ tag[0] }}">
    {{ tag[0] }}<sup>{{ tag[1].size }}</sup>&nbsp;
  </a>
  {% endfor %}
</div>
{% endraw %}
```


