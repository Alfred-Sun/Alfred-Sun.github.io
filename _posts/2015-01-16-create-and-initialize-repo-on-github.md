---
# layout: post
title: 利用 CLI 新建 GitHub 代码仓库
category: [Git, GitHub]
tags: [Git, GitHub, CLI, SSH]
# author: Alfred Sun
updated: 2015-01-16 05:33
keywords: Git, Create Repository, CLI
description: Create and initialize a remote repo on GitHub from the CLI without SSH
---

>  _**GitHub does not provide shell access !**_

用过 GitHub 的都知道，一般通过它的网页接口来创建新的代码仓库 Repository。  
由于 GitHub 不提供 [Shell Access][Generating SSH keys] 的权限，所以无法通过普通的终端命令来新建 Repository。

那么，有没有什么办法能利用 CLI 来新建 Repository 呢？

其实，我们可以利用 GitHub 提供 [Repository API][] 来做到。API 告诉我们可以通过发送 HTTP 请求来新建仓库，显然 `git` 命令无法使用，但是可以利用 `curl` 这个工具做到。

[Repository API]: https://developer.github.com/v3/repos/#create



## GitHub API 远程新建 Repository

GitHub Create Repository API 规范：

```
POST /user/repos

# Input data example:
{
  "name": "Hello-World",
  "description": "This is your first repository",
  "homepage": "https://github.com",
  "private": false,
  "has_issues": true,
  "has_wiki": true,
  "has_downloads": true
}
```

### 1、CLI 新建 Repository

```sh
# GitHub Account: alfred
# New repository name: test

curl -u 'alfred' -d '{"name":"test", "description":"This project is a test"}' https://api.github.com/user/repos

# "-u":		specifies the user name and password to use for server authentication
# "-d":		allows you to send POST data with the request
# "name":	the only POST data required; I like to also include "description"

# git remote add origin https://github.com/alfred/test.git
# git remote add origin git@github.com:alfred/test.git
#	 add definition for location and existance of connected (remote) repo on github
#	 "origin" is a default name used by git for where the source came from; technically didn't come from github, but now the github repo will be the source of record
#	 "git@github.com:alfred" is a ssh connection that assumes you have already setup a trusted ssh keypair with github.
# git push origin master
```

<!--more-->

### 2、初始化 Repository

```bash
# Creates a directory for your project called "test" in your user directory
mkdir ~/test
# Changes the current working directory to your newly created directory
cd ~/test
# create a file to commit, named README.md
touch README.md
# Sets up the necessary Git files
git init
# Stages your README.md file, adding it to the list of files to be committed
git add README.md
# Commits your files, adding the message
git commit -m 'first initial commit for master branch'
# Creates a remote named "origin" pointing at your GitHub repository
git remote add origin https://github.com/alfred/test.git
# Sends your commits in the "master" branch to GitHub
git push -u origin master
```

方便起见，写了个 Bash 脚本 **[githubrepo.sh][]** 专门做上面的那些事情，用法：  
`bash githubrepo.sh repo-name`

[githubrepo.sh]: {{ site.document_dir }}/githubrepo.sh


### 3、参考/扩展

- [Is it possible to create a remote repo on GitHub from the CLI without SSH](http://stackoverflow.com/questions/2423777/is-it-possible-to-create-a-remote-repo-on-github-from-the-cli-without-ssh)
- [Hub - excellent tool for GitHub](http://hub.github.com/)
- [One script for creating, migrating, and updating repos on GitHub & BitBucket](https://github.com/dderiso/gitter)



## GitHub 帮助

GitHub 使用两种[协议][]来传输数据：**HTTPS** 协议和 **SSH** 协议。

如果本地仓库使用 SSH 协议传输数据，那么需要在本地生成新的 SSH key，并与 GitHub 账户关联起来。操作方法参见 GitHub 帮助文档 [Generating SSH keys][] 或者博主写的另一篇文章内的[中文说明]({% post_url 2014-12-05-github-pages %})。

Quick setup — if you've done this kind of thing before

**[Set up in Desktop](github-windows://openRepo/https://github.com/Alfred-Sun/REPO)**	or	   
HTTPS: `https://github.com/alfred/REPO.git`   
SSH: `git@github.com:alfred/REPO.git`

We recommend every repository include a [README][], [LICENSE][], and [.gitignore][].


[协议]: http://git-scm.com/book/en/v2/Git-on-the-Server-The-Protocols
[Generating SSH keys]: https://help.github.com/articles/generating-ssh-keys/
[README]: https://github.com/Alfred-Sun/REPO/new/master?readme=1
[LICENSE]: https://github.com/Alfred-Sun/REPO/new/master?filename=LICENSE.md
[.gitignore]: https://github.com/Alfred-Sun/REPO/new/master?filename=.gitignore


…or create a new repository on the command line

```sh
echo # test >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:alfred/test.git
git push -u origin master
```

…or push an existing repository from the command line

```sh
git remote add origin git@github.com:alfred/test.git
git push -u origin master
```

…or import code from another repository

You can initialize this repository with code from a Subversion, Mercurial, or TFS project.

**[Import code](https://import.github.com/Alfred-Sun/REPO/import)**



## Send a DELETE request using curl command


GitHub Delete Repository API 规范：

```
DELETE /repos/:owner/:repo
```

Send a DELETE request to a web page is an easy task using curl.

Using this command from the terminal of your Linux or Mac

```bash
curl -X "DELETE" http://www.url.com/page
```

Will make curl to send a DELETE request to the url listed in the command.



##  Could not open a connection to your authentication agent


> [SSH][] private-keys are usually stored encrypted on the computers they are stored on. A pass-phrase is used to decrypt them when they are to be used. Since most people use [SSH public-private key-pairs to get around typing in passwords all the time][Public-Key], the [ssh-agent][] daemon exists to store decrypted private-keys you plan on using in a given session. The thing most people get tripped up on when using ssh-agent is that what the program outputs, some borne or csh shell commands, needs to be run. It may look like ssh-agent has set some variables for you, but it has in fact done no such thing. If you call ssh-add without processing ssh-agent’s output, it will complain it is unable to open a connection to your authentication agent. The most straightforward way to run ssh-agent on the command line is as follows: ``eval `ssh-agent` ``. After doing this, calls to ssh-add should succeed without error.


执行 `ssh-add ~/.ssh/rsa`

报标题上的错误，先执行 ``eval `ssh-agent` ``  （是 `~` 键上的那个`` ` ``）  
再执行 `ssh-add ~/.ssh/rsa`

成功：`ssh-add -l` 就有新加的 rsa 了

[Reference](http://funkaoshi.com/blog/could-not-open-a-connection-to-your-authentication-agent)

[SSH]: http://en.wikipedia.org/wiki/Secure_Shell
[Public-Key]: http://funkaoshi.com/blog/SSH
[ssh-agent]: http://www.securityfocus.com/infocus/1812



