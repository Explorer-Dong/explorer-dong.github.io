---
title: Git 自定义命令
categories:
  - 开发工具
  - Git
category_bar: true
---

## 前言

在使用 hexo 搭建个人博客时, 共两种部署的方法. 分别为:

- 本地利用 hexo 的插件 hexo-deployer-git 来实现部署, 缺点是需要多敲几个命令行且不方便对源码进行云端备份
- 使用 Github Action 的 workflow 自动化部署, 优势就是可以在 push 备份源码的同时自动检测行为并自动构建部署代码

看似十分方便但是问题也出在这, 我发现使用 Github Action 的 workflow 自动化部署 的站点内容与使用 hexo 插件部署的内容不一致. 由于不懂 yml 的构建语法与逻辑以及关于 git 用户授权等知识, 以至于我始终无法 debug 问题到底出在哪. 最终决定放弃使用 Github Action, 还是老老实实敲 hexo 的命令行, 但是我还需要进行笔记的源码备份, 故还需要在 push 到云端. 

为了尽可能的简化命令行, 我尝试进行 git 命令的宏定义. 查询一番后发现确实可以, 故有了本篇博客, 下面开始介绍如何进行 git 的命令的宏定义：

## 宏定义

> 操作系统为 Windows OS 11

我们进入 Git 软件的安装目录, 我的是 `D:\installation_package\Git`, 然后进入 `etc\profile.d` 并编辑 `aliases.sh` 文件, 默认内容为：

```sh
# Some good standards, which are not used if the user
# creates his/her own .bashrc/.bash_profile

# --show-control-chars: help showing Korean or accented characters
alias ls='ls -F --color=auto --show-control-chars'
alias ll='ls -l'

case "$TERM" in
xterm*)
	# The following programs are known to require a Win32 Console
	# for interactive usage, therefore let's launch them through winpty
	# when run inside `mintty`.
	for name in node ipython php php5 psql python2.7 winget
	do
		case "$(type -p "$name".exe 2>/dev/null)" in
		''|/usr/bin/*) continue;;
		esac
		alias $name="winpty $name.exe"
	done
	;;
esac
```

我们向 alias 中添加一行自定义的宏定义: `alias gph='git push && hexo clean && hexo g && hexo d'`, 就可以实现在 push 的同时使用 hexo 的部署插件进行部署了!
