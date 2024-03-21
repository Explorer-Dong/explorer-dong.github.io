---
title: hexo-migrate
categories:
  - FrontEnd
  - Hexo
category_bar: true
---

# Hexo 迁移指南

## 前言

为了改变本地项目名称（强迫症），同时为了练习迁移编辑环境，特此记录。

## 一、克隆仓库

```bash
git clone https://github.com/Explorer-Dong/explorer-dong.github.io.git HexoBlog
```

## 二、安装依赖

```bash
npm install
```

## 三、编辑推送

```bash
git add .
git commit -m 'add: xxx'
git push -u origin main
```

## 四、个性化配置

修改本地的远程仓库名称

```bash
git remote rename origin github
```

增加同步 push 备份仓库

```bash
git remote set-url --add github https://gitee.com/idwj/idwj.git
```

修改推送分支源

```bash
git push -u github main
```

## 缺点

修改编辑路径以后，会导致所有的文章的**编写**日期刷新为当前时间
