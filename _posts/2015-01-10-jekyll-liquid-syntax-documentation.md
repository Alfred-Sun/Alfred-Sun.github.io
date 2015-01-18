---
layout: post
title: Jekyll/Liquid API 语法文档
categories:
 - Jekyll
 - GitHub Pages
tags: [Jekyll, Liquid, Syntax]
author: Alfred Sun
updated: 2015-01-18 16:26
keywords: Jekyll, Liquid, Syntax, GitHub Pages
description: Basic Jekyll/Liquid Usage for Designers on GitHub Pages; Jekyll 的官方文档上面关于 API 语法功能特别少, 在搭建GitHub Pages的过程中查阅了许多相关资料，这里整理记录下建立一个博客所需要的API基础知识
---

## 前言

如果你只想快速搭建一个GitHub的静态网站，而暂时没有时间来研究 Jekyll 语法的话，建议直接 Fork 别人的主题源码。

当然,阅读一下之前我记录的一些笔记也可以增长一些知识:

* __[建立 GitHub Pages 静态博客网站][make-github-website]__ 介绍了使用Jekyll搭建的 GitHub Pages 操作
* __[GitHub Pages Issue][]__ 介绍博主在使用GitHub Pages的过程中遇到的问题及解决方法
* __[讲解 Markdown][Markdown Talk]__ 介绍了标准的Markdown语法及相关的扩展语法

现在博主想要整理一份相对完整的Jekyll语法，方便以后查阅参考。

具体官方文档地址请参考 __[Jekyll Documentation][jekyllrb-docs]__  
这里主要介绍关于 Jekyll 的 API 语法, 不是翻译官网内容。



## 开始

**Jekyll 是什么?**

Jekyll 是一个静态网站生成器.  
Jekyll 通过 标记语言 [markdown][] 或 [textile][] 和 模板引擎 [liquid][] 转换生成网页.  
[github][page-github] 为我们提供了这个一个地方, 可以使用 Jekyll 做一个我们自己的网站.  

这里不介绍怎么在本地安装使用 Jekyll, 如果你想在本地使用,请参考官方文档的 [安装教程][installation] 和 [使用教程][usage].  
不过这里可以透漏一下, Jekyll 依赖于 [ruby][] .  


<!--more-->


## 目录结构

Jekyll 的标准目录结构如下：

	.
	├── _config.yml
	├── _includes/
	|   ├── footer.html
	|   └── header.html
	├── _layouts/
	├── _posts/
	|   ├── 2007-10-29-why-every-programmer-should-play-nethack.md
	|   └── 2014-04-26-what-is-Jekyll.md
	├── _drafts
	├── _data/
	|   └── members.yml
	├── _site/
	└── index.html      # => http://alfred-sun.github.com/

### 文件介绍

**_config.yml**

Jekyll 的全局配置文件。  
比如网站的名字, 网站的域名, 网站的链接格式等等。

**_includes**

该目录下的文件内容是最终要放进模版文件中的一些代码片段。  
对于网站的头部, 底部, 侧栏等公共部分, 为了维护方便, 我们可能想提取出来单独编写, 然后使用的时候包含进去即可.  
这时我们可以把那些公共部分放在这个目录下.  
使用时只需要引入即可.  

```
{ % include filename % }
```

**_layouts**

存放的一些模版文件，模版是用来包含并装饰page或post内容的。Jekyll的模版使用HTML语法来写，并包含YAML Front Matter。  
所有的模版都可用Liquid来与网站进行交互，都可以使用全局变量site和page。

site 变量: 包含该网站所有可以接触得到的内容和元数据(meta-data)  
page 变量: 包含的是当前渲染的page或post的所有可以接触得到的数据

对于网站的布局,一般会写成模板的形式,这样对于写实质性的内容时,比如文章,只需要专心写文章的内容, 然后加个标签指定用哪个模板即可.
对于内容,指定模板了模板后,我们可以称内容是模板的儿子.  
为什么这样说呢?  因为这个模板时可以多层嵌套的, 内容实际上模板,只不过是叶子节点而已.  

在模板中, 引入儿子的内容.

```
{ { content } }
```

在儿子中,指定父节点模板

> 注意,必须在子节点的顶部.

```
---
layout: post
---
```

**_posts**

发布的内容,比如博客文章,常放在这里面, 而且一般作为叶子节点.

另外，所有放在根目录下并且不以下划线开头的文件夹中有格式的文件都会被Jekyll处理成page。  
这里说的有格式是指含有YAML Front Matter头部的文件。

所有的post和page都要用markdown或者texile或者HTML语法来写，可以包含Liquid模版的语法。  
而且必须要有 YAML Front Matter 头部(Jekyll只处理具有YAML Front Matter的文件)。  
YAML Front Matter必须放在文件的开头，一对`---`之间，用户可在这一对`---`间设置预先定义的变量或用户自己的数据。

**_data**

Jekyll 支持从该目录中加载 YAML, JSON, 和 CSV 格式的文件数据。用于配置一些全局变量,不过数据比较多,所以放在这里。  
比如这个网站如果是多人开发, 我们通常会在这里面定义一个 members.yml 文件.

例如文件内容为:

```yaml
- name: Tom Preston-Werner
  github: mojombo

- name: Parker Moore
  github: parkr
```

然后在模板中我们就可以通过`site.data.members`(注意：文件名决定变量名)使用这些数据.

```html
<ul>
{ % for member in site.data.members % }
  <li>
    <a href="https://github.com/{ { member.github } }">
      { { member.name } }
    </a>
  </li>
{ % endfor % }
</ul>
```

**_site**

Jekyll 生成的网页输出的地方, 一般需要在 .gitignore 中屏蔽掉这个目录。  

**index.html**

主页文件, 后缀有时也用 index.md 等.  
这个需要根据自己的需要来写, 因为不同的格式之间在某些情况下还是有一些细微的差别的.  


**静态资源**

对于其他静态资源, 可以直接放在根目录或任何其他目录, 然后路径和平常的网站一样, 按路径来找链接中的文件.  


## 配置全局变量 ##

虽然全局变量都有自己的默认配置，但是我们往往会手动配置为自己心中最好的效果。  
关于 Jekyll 的变量，可以参考[官方文档](http://jekyllrb.com/docs/variables/)

> 注意,配置不用使用 tab . 否则可能会忽略那条命令.


### 源代码的位置

这个一般不配置, 默认即可.  

```
source: DIR
```

当然编译的时候也可以指定,但是使用 github 我们是不能指定参数的.  

```
-s, --source DIR
```

### 输出网站位置

这个一般也默认.  

```
# 编译参数 -d, --destination DIR
destination: DIR #配置语法
```

### Safe开关

官方文档上就一句话.  

```
Disable custom plugins, and ignore symbolic links.
```

大概意思是禁用常用的插件,忽略符号链接.

```
# 编译参数  --safe
safe: BOOL
```

### 忽略文件

这个很有用, 有时候你写了一个文件, 里面的一个东西可能会被 Jekyll 处理, 但是你不想让 Jekyll 处理的话, 就使用这个语法忽略那些文件吧.

```
exclude: [DIR, FILE, ...]
```

### 强制处理文件

有时候我们的一些文件的名字由于不在 Jekyll 处理的文件名字范围内,这时候就需要强制处理这些文件了.  
比如 .htaccess 文件.  

```
include: [DIR, FILE, ...]
```

### 时区

我们模板中经常会对时间进行转换,这个时候如果至指定时区的话,可能得到的时间会和我们想要的时间错几个小时.

```
# timezone: Asia/Shanghai
timezone: TIMEZONE
```

### 编码

大家都是程序员,就不用多说了.

```
# encoding : utf-8
encoding: ENCODING
```

## 模板语法

模板语法实际上分两部分, 一部分是头部定义,另一部分是语法.


### 头部定义

头部定义主要用于指定模板(layout)和定义一些变量, 比如 标题(title), 描述(description), 分类(category/categories), tags, 是否发布(published), 自定义变量.  

```
---
layout:     post
title:      title
category: blog
description: description
published: true # default true
---
```


### 模板语法


**使用变量**

所有的变量是都一个树节点, 比如模板中定义的头部变量,需要使用下面的语法获得

```
page.title
```

page 是当前页面的根节点.

其中全局根结点有：

- **site**： _config.yml 中配置的信息
- **page**： 页面的配置信息，包括YAML中定义的变量
- **content**： 用在模板文件中，该变量包含页面的子视图，用于引入子节点的内容；不能在post和page中使用
- **paginator**： 分页信息，需要事先设定site中的`paginate`值，参考[Pagination](http://jekyllrb.com/docs/pagination/)

### site 下的变量

| 变量 				| 描述 |
| ---- 				| ---- |
|site.time			|当前的时间(运行Jekyll时的时间)|
|site.pages			|所有页面列表|
|site.posts			|按时间逆序排列的所有文章列表|
|site.related_posts	|如果当前被处理的页面是一个post文件，那这个变量是一个包含了最多10篇相关的文章列表。|
|site.static_files	|所有静态文件的列表(如：没有被 Jekyll 处理的文件)，每个文件有3个属性：`path`，`modified_time`和`extname`|
|site.html_pages	|所有html页面列表|
|site.collections	|自定义的对象集合列表，参考[Collections](http://jekyllrb.com/docs/collections/)|
|site.data			|_data 目录下YAML文件的数据列表|
|site.documents		|所有 Collections 里面的文档列表|
|site.categories.CATEGORY|所有在CATEGORY类别下的post列表|
|site.tags.TAG		|所有在TAG标签下的post列表|
|site.[CONFIGURATION_DATA]|其他自定义的变量|


### page 下的变量 

| 变量 			| 描述 |
| ---- 			| ---- |
|page.content	|页面的内容|
|page.title		|页面的标题|
|page.excerpt	|未渲染的摘要|
|page.url		|不带域名的页面链接，如：`/2008/12/14/my-post.html`|
|page.date		|指定每一篇post的时间，可在在post中的front matter里覆盖这个值，格式是:`YYYY-MM-DD HH:MM:SS`|
|page.id		|每一篇post的唯一标示符(在RSS中非常有用)，如：`/2008/12/14/my-post`|
|page.categories|post隶属的一个分类列表，可在YAML头部指定|
|page.tags		|post隶属的一个标签列表，可在YAML头部指定|
|page.path		|页面的源码地址|
|page.next		|按时间顺序排列的下一篇文章|
|page.previous	|按时间顺序排列的上一篇文章|


### paginator 下的变量 

分页只在 index 页面中有效，index 页面可以在子目录，比如：主页在`/blog/index.html`，那么通过`paginate_path: "blog/page:num/"`，其他页面就可以设定在`blog/page2/index.html`。

| 变量 				| 描述 |
| ---- 				| ---- |
|paginator.per\_page		|每一页的post数量|
|paginator.posts		|当前页面上可用的post列表|
|paginator.total\_posts	|所有post的数量|
|paginator.total_pages	|分页总数|
|paginator.page			|当前页的页码|
|paginator.previous\_page|上一页的页码|
|paginator.previous\_page\_path|上一页的路径|
|paginator.next\_page	|下一页的页码|
|paginator.next\_page\_path|下一页的路径|


### 字符转义

有时候想输出 \{ 了,怎么办,使用 \\ 转义即可.

```
\{ => {
```

### 输出变量

输出变量直接使用两个大括号括起来即可.

```
{ { page.title } }
```

### 循环

和平常的解释性语言很想.

```
{ % for post in site.posts % }
    <a href="{ { post.url } }">{ { post.title } }</a>
  { % endfor % }
```

### 自动生成摘要

```
  { % for post in site.posts % }
     { { post.url } } { { post.title } }
      { { post.excerpt | remove: 'test' } }
  { % endfor % }
```

### 删除指定文本

remove 可以删除变量中的指定内容

```
{ { post.url | remove: 'http' } }
```

### 删除 html 标签

这个在摘要中很有用.

```
{ { post.excerpt | strip_html } }
```

### 代码高亮

```
{ % highlight ruby linenos % }
\# some ruby code
{ % endhighlight % }
```

### 数组的大小

```
{ { array | size } }
```

### 赋值

```
{ % assign index = 1 % }
```

### 格式化时间

```
{ { site.time | date_to_xmlschema } } 2008-11-07T13:07:54-08:00
{ { site.time | date_to_rfc822 } } Mon, 07 Nov 2008 13:07:54 -0800
{ { site.time | date_to_string } } 07 Nov 2008
{ { site.time | date_to_long_string } } 07 November 2008
```

### 搜索指定key

```
# Select all the objects in an array where the key has the given value.
{ { site.members | where:"graduation_year","2014" } } 
```

### 排序

```
{ { site.pages | sort: 'title', 'last' } }
```

### to json

```
{ { site.data.projects | jsonify } }
```

### 序列化

把一个对象变成一个字符串

```
{ { page.tags | array_to_sentence_string } }
```

### 单词的个数

```
{ { page.content | number_of_words } }
```

### 指定个数

得到数组指定范围的结果集  

```
{ % for post in site.posts limit:20 % }
```


## 内容名字规范

对于博客post,文件命名规则必须是 YEAR-MONTH-DAY-title.MARKUP 的格式.  
使用rake post会自动将post文件合适命名。

比如

```
2014-11-06-memcached-code.md
2014-11-06-memcached-lib.md
2014-11-06-sphinx-config-and-use.md
2014-11-07-memcached-hash-table.md
2014-11-07-memcached-string-hash.md
```



[usage]: http://jekyllrb.com/docs/usage/
[ruby]: http://www.ruby-lang.org/en/downloads/
[installation]: http://jekyllrb.com/docs/installation/
[page-github]: http://pages.github.com/
[liquid]: https://github.com/Shopify/liquid/wiki
[textile]: http://redcloth.org/textile
[markdown]: http://daringfireball.net/projects/markdown/
[jekyllrb-docs]: http://jekyllrb.com/docs/home/
[make-github-website]: http://alfred-sun.github.io/blog/2014/12/05/github-pages/
[GitHub Pages Issue]: http://alfred-sun.github.io/blog/2014/12/16/github-pages-issue/
[Markdown Talk]: http://alfred-sun.github.io/blog/2015/01/10/markdown-syntax-documentation/



Reference:

1. https://github.com/Shopify/liquid/wiki/Liquid-for-Designers   
2. https://github.com/jekyll/jekyll/wiki/Liquid-Extensions   
3. http://jekyllbootstrap.com/api/jekyll-liquid-api.html

