---
layout: post
title: "Selecting the navbar menu"
date: 2013-10-02 23:43
comments: true
categories: octopress
---

Bootstrap [navbar](http://getbootstrap.com/components/#navbar) can have an
"active" element highlighted which ease navigation. In **Octostrap3** it is
possible to control which menu is selected on each page or post.

<!-- more -->


<h2>The Trick</h2>

We will use (again) a
[front-matter variable](http://jekyllrb.com/docs/frontmatter/). If you check in
`source/_includes/custom/navigation.html` the menu looks like this:

```html
{% raw %}
<!-- ... -->
<div class="navbar-collapse collapse">
  <ul class="nav navbar-nav">
    <li {% if page.navbar == 'Blog' %}class="active"{% endif %}>
      <a href="{{ root_url }}/">Blog</a>
    </li>
    <li {% if page.navbar == 'Archives' %}class="active"{% endif %}>
      <a href="{{ root_url }}/blog/archives">Archives</a>
    </li>
<!-- ... -->
{% endraw %}
```

By default, `page.navbar` is <em>'Blog'</em> for the blog index page and each
posts. You can set it yourself easily in the <strong>front-matter</strong> (for
pages or even posts if you want).  This example is from the
[installation]({{ root_url }}/octostrap3/setup/install) page:

```
---
layout: page
navbar: Setup
title: "Installation"
comments: true
sharing: true
footer: true
---
```

Enjoy !
