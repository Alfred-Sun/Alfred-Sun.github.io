---
layout: post
title: "Archiving a (Rails) site as static files on Nginx"
date: 2014-08-07 11:15
comments: true
categories:
  - Ruby on Rails
  - Nginx
---

I had an old Rails 2 app (a blog) that still got visits, but no updates. It's effectively been read-only for years.

Since I'm consolidating servers, I wanted to get rid of the machine it was hosted on, and moving the Rails app elsewhere wouldn't be trivial.

So I replaced it with a static copy of the site. Just flat files.

(I also made a database dump just in case I want to make it dynamic again in the future.)

This is how I did it.

<!--more-->

## Archive the site

I installed [wget](https://www.gnu.org/software/wget/) via [Homebrew](http://brew.sh/) since I didn't have it on my Mac:

    brew install wget

If you don't have it already on e.g. Ubuntu, try

    sudo apt-get install wget

Then I told wget to archive the site:

    wget --convert-links --mirror mysite.com

It will end up in a `./mysite.com` directory.


## Upload the site

    rsync -azv mysite.com myserver:apps

Substituting whatever server and path you prefer. I keep sites in subdirectories of `~/apps`.

You could also call `wget` on the server, of course, and skip the upload step. I wanted a local copy and to verify the download with my local tools.


## Configure Nginx

In the Nginx configuration for the site, I had to do some special things:

``` nginx
server {
  # …

  location / {
    try_files $request_uri $uri $uri/ =404;
    default_type text/html;
  }

  location /stylesheets {
    try_files $request_uri $uri $uri/ =404;
    default_type text/css;
  }

  location /javascripts {
    try_files $request_uri $uri $uri/ =404;
    default_type text/javascript;
  }

  location /images/uploads {
    try_files $request_uri $uri $uri/ =404;
    default_type image/jpg;
  }
}
```

I needed `try_files $request_uri` so that requesting e.g. `index.html?page=2` or `stylesheets/all.css?1393152599` would look for a file by that exact name, query string and all.

And I needed the `default_type` declarations to handle HTML files archived without an extension, as well as e.g. stylesheets ending with a query string.

I only had JPG uploads, but you could [use a regexp](http://nginx.org/en/docs/http/ngx_http_core_module.html#location) for more complex needs.

Hope this helps!