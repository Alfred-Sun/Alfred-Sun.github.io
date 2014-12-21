---
layout: post
title: Jekyll missing dependency&#58; RedCloth
category: Github Pages
tags: [RedCloth, Jekyll]
---

What happened to my Jekyll ?

OK, I Surrender.

The current ruby platform versions:

	ruby		2.0.0p598 [i386-mingw32]
	gem			2.0.14
	bundler		1.7.9
	RedCloth	4.2.9

Always throw error under windows 7 environment, when build Jekyll and start server:

	You are missing a library required for Textile. Please run:
	  $ [sudo] gem install RedCloth
	  Conversion error: Jekyll::Converters::Textile encountered an error converting '_posts/2008-11-17-b
	logging-like-a-hacker.textile/#excerpt'.
	  Conversion error: Missing dependency: RedCloth
				 ERROR: YOUR SITE COULD NOT BE BUILT:
						------------------------------------
						Missing dependency: RedCloth

However, turn to Linux and run `jekyll build`, there is no error occurred indeed and it works well to parse Textile file. This is very weird and still don't know why.

![Missing RedCloth]({{ site.picture_dir }}/jekyll-missing-dependency-redcloth/textile_error.png "Missing dependency: RedCloth")
