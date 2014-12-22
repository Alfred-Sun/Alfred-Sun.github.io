---
layout: post
title: Jekyll missing dependency&#58; RedCloth
category: Github Pages
tags: [RedCloth, Jekyll]
---

What happened to my Jekyll ?

OK, I Surrender.

After establishing local environment of GitHub Pages, I forked the repository of [Tom Preston-Werner][] and built the project with Jekyll; but encountered one problem under the Windows 7 environment.

[Tom Preston-Werner]: https://github.com/mojombo/mojombo.github.io

The current ruby platform versions:

	ruby		2.0.0p598 [i386-mingw32]
	gem			2.0.14
	bundler		1.7.9
	RedCloth	4.2.9

Always throw error, when build Jekyll and start server:

	You are missing a library required for Textile. Please run:
	  $ [sudo] gem install RedCloth
	  Conversion error: Jekyll::Converters::Textile encountered an error converting '_posts/2008-11-17-b
	logging-like-a-hacker.textile/#excerpt'.
	  Conversion error: Missing dependency: RedCloth
				 ERROR: YOUR SITE COULD NOT BE BUILT:
						------------------------------------
						Missing dependency: RedCloth

However, turn to Linux, use `RVM` to manage Ruby and run `jekyll build`, there is no error occurred indeed and it works well to parse `textile` file. This is very weird and still don't know why.

![Missing RedCloth]({{ site.picture_dir }}/jekyll-missing-dependency-redcloth/textile_error.png "Missing dependency: RedCloth")

Click [here](https://github.com/jekyll/jekyll/blob/00d29e7e7766b6cf8c81f21807a16bf7ec2d69df/lib/jekyll/converters/textile.rb "textile.rb Line: 16") to see the source code.

