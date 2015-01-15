---
layout: post
title: Create and initialize a remote repo on GitHub from the CLI
category: Git
tags: [Git, GitHub, CLI]
author: Alfred Sun
updated: 2015-01-16 05:33
keywords: Git, Create Repository by CLI
description: Create and initialize a remote repo on GitHub from the CLI
---

Create and initialize a remote repo on GitHub from the CLI

## CLI 新建远程 Repository

```sh
curl -u 'Alfred-Sun' -d '{"name":"markx-pandoc"}' https://api.github.com/user/repos
git remote add origin https://github.com/Alfred-Sun/markx-pandoc.git
# git remote add origin git@github.com:Alfred-Sun/markx-pandoc.git
git push origin master
```

<!--more-->

## 初始化新建的 Repository

```bash
mkdir ~/markx-pandoc
# Creates a directory for your project called "markx-pandoc" in your user directory
cd ~/markx-pandoc
# Changes the current working directory to your newly created directory
touch blabla.md
# create a file, named blabla.md
git init
# Sets up the necessary Git files
git add blabla.md
# Stages your blabla.md file, adding it to the list of files to be committed
git commit -m 'first initial commit for branch master'
# Commits your files, adding the message 
git remote add origin https://github.com/username/markx-pandoc.git
# Creates a remote named "origin" pointing at your GitHub repository
git push -u origin master
# Sends your commits in the "master" branch to GitHub
```

参考：   
http://stackoverflow.com/questions/2423777/is-it-possible-to-create-a-remote-repo-on-github-from-the-cli-without-ssh


## GitHub 帮助

Quick setup — if you've done this kind of thing before

**[Set up in Desktop](github-windows://openRepo/https://github.com/Alfred-Sun/REPO)**	or	   
HTTPS: `https://github.com/Alfred-Sun/REPO.git`   
SSH: `git@github.com:Alfred-Sun/REPO.git`

We recommend every repository include a [README][], [LICENSE][], and [.gitignore][].

[README]: https://github.com/Alfred-Sun/REPO/new/master?readme=1
[LICENSE]: https://github.com/Alfred-Sun/REPO/new/master?filename=LICENSE.md
[.gitignore]: https://github.com/Alfred-Sun/REPO/new/master?filename=.gitignore


…or create a new repository on the command line

```sh
echo # markx-pandoc >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:Alfred-Sun/markx-pandoc.git
git push -u origin master
```

…or push an existing repository from the command line

```sh
git remote add origin git@github.com:Alfred-Sun/markx-pandoc.git
git push -u origin master
```

…or import code from another repository

You can initialize this repository with code from a Subversion, Mercurial, or TFS project.

**[Import code](https://import.github.com/Alfred-Sun/REPO/import)**
