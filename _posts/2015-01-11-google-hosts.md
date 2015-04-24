---
layout: post
title: 最新 Google Hosts 文件
category: hosts
tags: [Google, Hosts]
author: Alfred Sun
updated: 2015-01-12 20:51
keywords: gmail, Google, Hosts
description: 更改HOSTS方法登陆GMAIL/Google, Google Hosts 2015，持续更新...

---

最近几天我忽然无法通过第三方工具登陆GMAIL，了解了一下才发现已经成了普遍现象了。使用国内的一些邮箱给GMAIL发邮件可能会丢失邮件，QQ邮箱反应比较快似乎没有这个问题，保险起见，给GMAIL发邮件最好还是使用GMAIL发送，另外国外很多大学虽然用的是学校域名的邮箱，实质好像也是经过了GMAIL，因此用国内的一些邮箱发送信件可能会导致信件丢失。

要登录GMAIL现在似乎只能是改HOSTS，VPN或者SSH等一些技术手段了。

这里提供我自己收集的一些HOSTS下载链接，12月30号测试可用，朋友们也可以自行搜索获取。

<!--more-->

hosts文件位置：

	C:\Windows\System32\drivers\etc

搜索google hosts。

- google hosts 2015 持续更新：http://www.360kb.com/kb/2_122.html   
- 2014-11-07 更新的hosts：下载地址1就行。。   
http://blog.sina.com.cn/s/blog_62fbf02e0102vewg.html   
http://blog.sina.com.cn/s/blog_6fa5aa4a01010wel.html  
- **权威hosts更新**：(~~http://serve.netsh.org/pub/gethosts.php~~ 已失效)  
  http://serve.netsh.org/pub/ipv4-hosts/


要判断一个hosts文件是否可用比较简单的办法是把文件里的IP放在浏览器里看看是否能打开谷歌即可。

也可通过第三方客户端结合hosts来解决：   
通过设置Gmail的IMAP、POP、SMTP的Hosts文件，将如下内容加入Hosts之后，邮件客户端重启后即可重新使用Gmail邮件。

	173.194.65.108 imap.gmail.com
	173.194.65.108 pop.gmail.com
	173.194.193.108 smtp.gmail.com

