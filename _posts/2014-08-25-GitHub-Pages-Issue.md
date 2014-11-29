GitHub Pages Issue

1. if the blog is forked from other, then must update and commit at least one time before it works with GitHub.
2. if not, had better open the blog link from GitHub sites, rather than direct link.

3. GitHub Pages directory: _site
missing, and don't know why ?

4. should install bellows:
	https://github.com/oneclick/rubyinstaller/wiki/Development-Kit
	http://rubyinstaller.org/add-ons/devkit
	Install Python 2.x and set env path for pygments
	(also need to re-build yajl-ruby using 1.1.0 when your local ruby is 2.XX)
	(之所以要安裝 Python 是因為 代碼上色 plugin 是用 Python 的一個開源項目：Pygment，雖然 Pygment 支援 Python 2 版和 3 版，不過由於 Ruby 和 Python 之間的橋接是用 RubyPython 完成，而 RubyPython 目前只支援 Python 2。所以還是乖乖安裝 2 版吧！)