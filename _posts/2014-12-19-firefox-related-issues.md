---
layout: post
title: Firefox Issues and Solutions
category: Firefox
tags: [Firefox]
author: Alfred Sun
updated: 2014-12-19 09:15
keywords: firefox
description: 
---

List some issues about firefox when working with it, and would update all the time.

* I1: Profile Missing
* I2: 
* I3: 
* I4: 
* I5: 
* I6: 
* I7: 

<!--more-->

## I1: Profile Missing

Windows 7环境下Install Firefox后，启动Firefox报错：

> "Your Firefox profile cannot be loaded. It may be missing or inaccessible."

![Profile Missing]({{ site.picture_dir }}/firefox-related-issues/f1.png)

**原因**：排除权限问题外，基本是跟`Profiles.ini`文件相关。

之前安装Firefox和Firefox Developer Edition，感觉Developer版本还不错，就Uninstall前者。但用过一段时间后，发现Developer Edition问题太多，实在无法接受，于是就重新用Stable版本。然后就出现问题了。

当时Uninstall的时候，记得清掉了它相应的Profile目录（对应下面ini文件中Profile0.Path的值），但Profiles.ini文件未改；那么再Install Firefox并启动，依然读取旧的ini配置文件，而配置文件中改版本的Firefox目录一清除，因此报错。

Old Profiles.ini:

<pre>
[General]
StartWithLastProfile=1

[Profile0]
Name=default
IsRelative=1
Path=Profiles<font color="fuchsia">/r8gi0ws7.default</font>
Default=1

[Profile1]
Name=dev-edition-default
IsRelative=1
Path=Profiles/86xqzf6m.dev-edition-default
</pre>

因为清掉了Profile0中的Path值对应的路径，所以Launch Firefox失败。

**解决办法**: 要么删掉ini文件中的Profile0代码块，要么在Profiles目录下面New个Profile0.Path对应的目录。

下面这个是删除Profile0，再启动Firefox重新配置的结果。前后对比，只有Profile0的Path值变化。（Win7环境，Profiles.ini文件可以通过开始菜单，执行`%APPDATA%\Mozilla\Firefox`找到。）

New Profiles.ini:

<pre>
[General]
StartWithLastProfile=1

[Profile0]
Name=default
IsRelative=1
Path=Profiles<font color="cyan">/3rv0l2m8.default</font>
Default=1

[Profile1]
Name=dev-edition-default
IsRelative=1
Path=Profiles/86xqzf6m.dev-edition-default
</pre>

**Further learing**: Profile Manager

Mozilla applications store your personal settings, added extensions and themes, and user data such as bookmarks, passwords, cookies and mail in a "[profile][0]".

The Profile Manager allows you create and manage profiles.

A new profile is useful for troubleshooting since it allows the application to run without extensions, themes, or customized settings. If you have multiple profiles you can use the Profile Manager to switch profiles.

Accessing the [Profile Manager][1]:

	Windows: "Start" menu --> "Run"
		firefox.exe -profilemanager
		firefox.exe -P

	Linux: 
		./firefox -profilemanager

	Mac OS X:
		/Applications/Firefox.app/Contents/MacOS/firefox-bin -profilemanager

[0]: http://kb.mozillazine.org/Profile_folder
[1]: http://kb.mozillazine.org/Profile_Manager#Accessing_the_Profile_Manager


## I2: 


* * * * * *

Continue...

