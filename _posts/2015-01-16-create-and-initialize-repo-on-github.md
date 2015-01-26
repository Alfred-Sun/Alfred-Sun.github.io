---
# layout: post
title: 利用 CLI 新建 GitHub 仓库
category: [Git, GitHub]
tags: [Git, GitHub, CLI, SSH]
# author: Alfred Sun
updated: 2015-01-16 05:33
keywords: Git, Create Repository, CLI
description: Create and initialize a remote repo on GitHub from the CLI without SSH, and tell how to avoid to enter passphrase for every push or pull using SSH with GitHub.
---

>  _**GitHub does not provide shell access !**_

用过 GitHub 的都知道，一般通过它的网页接口来创建新的仓库 Repository。  
由于 GitHub 不提供 [Shell Access][Generating SSH keys] 的权限，所以无法通过普通的终端命令来新建 Repository。

那么，有没有什么办法能利用 CLI 来新建 Repository 呢？

其实，我们可以利用 GitHub 提供 [Repository API][] 来做到。API 告诉我们可以通过发送 HTTP 请求来新建仓库，显然 `git` 命令无法使用，但是可以利用 `curl` 这个工具做到。

[Repository API]: https://developer.github.com/v3/repos/#create




## GitHub API 新建远程 Repository

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


### 3、可能出现的问题

**[A]:** 在执行 `$ git remote add origin git@github.com:alfred/test.git`

错误提示：`fatal: remote origin already exists.`

解决办法：

```sh
# 先删除存在的旧的 remote
$ git remote rm origin
# 然后添加新的 remote
$ git remote add origin git@github.com:alfred/test.git

# 或者直接重设 remote 的 URL
$ git remote set-url origin git@github.com:alfred/test.git
```

**[B]:** 在执行 `$ git push origin master`

错误提示：`error:failed to push som refs to......`

解决办法：

```sh
# 先把远程服务器github上面的文件拉下来，再push 上去
$ git pull origin master
```


### 4、参考/扩展

- [Is it possible to create a remote repo on GitHub from the CLI without SSH](http://stackoverflow.com/questions/2423777/is-it-possible-to-create-a-remote-repo-on-github-from-the-cli-without-ssh)
- [Hub - excellent tool for GitHub](http://hub.github.com/)
- [One script for creating, migrating, and updating repos on GitHub & BitBucket](https://github.com/dderiso/gitter)




## 删除 GitHub Repository


同样，利用 API 并通过 `curl` 命令发送 “**DELETE**” 请求来实现删除 GitHub 仓库。


GitHub Delete Repository API 规范：

```
DELETE /repos/:owner/:repo
```

在系统终端输入下面命令，向指定的 URL 发送删除请求：

```bash
# curl -X "DELETE" http://www.url.com/page

curl -u 'alfred' -X 'DELETE' https://api.github.com/repos/alfred/test
```




## GitHub SSH 帮助

我们可以使用 GitHub for Windows 来向 GitHub 传输数据，可以从其他仓库（Subversion、Mercurial 或者 TFS project）导入数据初始化 GitHub 仓库，还可以像上面一样使用 [Git 的协议][]。

![GitHub Repository Setup]({{ site.picture_dir }}/github-setup.png "GitHub Repository Quick Setup")


### 1、GitHub 两种协议

GitHub 支持两种协议来传输数据：**HTTPS** 协议和 **SSH** 协议。

- **Connecting over HTTPS (recommended)**   
  If you [clone with HTTPS][], you can [cache your GitHub password in Git][] using a credential helper.  
  e.g. `https://github.com/alfred/test.git`
- **Connecting over SSH**   
  If you [clone with SSH][], you must [generate SSH keys][Generating SSH keys] on each computer you use to push or pull from GitHub.  
  e.g. `git@github.com:alfred/test.git` or `ssh://git@github.com/alfred/test.git`

如果本地仓库使用 HTTPS 协议，可以保存 GitHub 密码，避免每次 push 都要认证，看[这篇文章][disable login for every git push]的说明；而如果使用 SSH 协议传输数据，那么需要在本地生成新的 SSH key，并与 GitHub 账户关联起来。操作方法参见 GitHub 帮助文档 [Generating SSH keys][] 或者博主写的另一篇文章内的[中文说明]({% post_url 2014-12-05-github-pages %})。


[Git 的协议]: http://git-scm.com/book/en/v2/Git-on-the-Server-The-Protocols
[Generating SSH keys]: https://help.github.com/articles/generating-ssh-keys/
[clone with HTTPS]: https://help.github.com/articles/which-remote-url-should-i-use#cloning-with-https-recommended
[clone with SSH]: https://help.github.com/articles/which-remote-url-should-i-use#cloning-with-ssh
[cache your GitHub password in Git]: https://help.github.com/articles/caching-your-github-password-in-git
[disable login for every git push]: {% post_url 2014-11-23-disable-login-each-git-push %}


### 2、SSH 访问自动认证授权

使用 SSH 也有个问题，就是每次 pull 或 push 时，都要求输入 SSH key 的密码。我们可以通过 `ssh-agent` 记住密码自动认证：

```sh
$ ssh-agent bash
$ ssh-add 
Enter passphrase for /home/alfred/.ssh/id_rsa: 
Identity added: /home/alfred/.ssh/id_rsa (/home/alfred/.ssh/id_rsa)
```

或者：

```sh
# start the ssh-agent in the background
ssh-agent -s
# Agent pid 59566
ssh-add ~/.ssh/id_rsa
```

如果报出这个错误：`Could not open a connection to your authentication agent`，那么：

```sh
# start the agent for MsysGit or Cygwin Bash
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa

# test if the identity key is added
ssh-add -l
```

下面是解释：

> [SSH][] private-keys are usually stored encrypted on the computers they are stored on. A pass-phrase is used to decrypt them when they are to be used. Since most people use [SSH public-private key-pairs to get around typing in passwords all the time][Public-Key], the [ssh-agent][] daemon exists to store decrypted private-keys you plan on using in a given session. The thing most people get tripped up on when using ssh-agent is that what the program outputs, some borne or csh shell commands, needs to be run. It may look like ssh-agent has set some variables for you, but it has in fact done no such thing. If you call ssh-add without processing ssh-agent’s output, it will complain it is unable to open a connection to your authentication agent. The most straightforward way to run ssh-agent on the command line is as follows: ``eval `ssh-agent` ``. After doing this, calls to `ssh-add` should succeed without error.  
> _Reference: http://funkaoshi.com/blog/could-not-open-a-connection-to-your-authentication-agent_

- - - - - -

`ssh-add` 和 `ssh` 与 ssh agent 通信依赖一个环境变量，如果启动多个命令窗口，或者错误启动，那么 `ssh-add` 和 `ssh` 都不能读取环境变量（设置在命令提示符本地）。

如果正在使用 Cygwin，那么参考 [SSH Agent on Cygwin][]：

```sh
# Add to your Bash config file
SSHAGENT=/usr/bin/ssh-agent
SSHAGENTARGS="-s"
if [ -z "$SSH_AUTH_SOCK" -a -x "$SSHAGENT" ]; then
    eval `$SSHAGENT $SSHAGENTARGS`
    trap "kill $SSH_AGENT_PID" 0
fi
```

这样对于每个命令提示符窗口，都会自动启动 ssh-agent。

_Reference:  
http://stackoverflow.com/questions/17846529/could-not-open-a-connection-to-your-authentication-agent_


[SSH]: http://en.wikipedia.org/wiki/Secure_Shell
[Public-Key]: http://funkaoshi.com/blog/SSH
[ssh-agent]: http://www.securityfocus.com/infocus/1812
[SSH Agent on Cygwin]: http://blog.killtheradio.net/how-tos/ssh-agent-on-cygwin/

