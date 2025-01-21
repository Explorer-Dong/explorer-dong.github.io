---
title: JavaScrip 基础
categories:
  - 前端
  - JavaScript
category_bar: true
---

## 前言

本博客介绍 JavaScrip 的基础知识。

在网页中， JS 将 HTML 页面看做一个类似于 word 的文档，主要起到捕捉用户行为进而做出响应的作用。也就是说 JS 主要实现的是与用户的逻辑。速查手册 [JavaScript 教程](https://www.runoob.com/js/js-tutorial.html)。

## 环境配置

### 解释器/编译器

JavaScrip 曾经是一款解释型语言，但是在引入 V8 引擎后，官方就说已经成为一款编译型语言了。但无论怎样，就是一个将高级语言转换到低级语言的工具罢了。这里介绍常见的一款转换工具 Node。

强烈建议使用 [NVM](#NVM) 来下载并管理 Node，因为直接下载 Node 并安装的话，权限会不够，等到全局运行 Node 时会出现权限错误。这是官网 [原话](https://docs.npmjs.com/cli/v11/configuring-npm/install#description)：

> To publish and install packages to and from the public npm registry, you must install Node.js and the npm command line interface using either a Node version manager or a Node installer. **We strongly recommend using a Node version manager to install Node.js and npm.** We do not recommend using a Node installer, since the Node installation process installs npm in a directory with local permissions and can cause permissions errors when you run npm packages globally.

当然，如果你觉得无妨，还是可以直接下载并安装 Node 的。Node 官网：[https://nodejs.org/zh-cn](https://nodejs.org/zh-cn)。

### 好用的第三方库

#### NPM

与其他语言类似，JavaScrip 也有自己的社区与库的共享平台，为了更好的集成与共享大家的库，Node 使用一个 CLI 工具来管理，叫做 NPM，即 Node Packge Manager。无论是直接安装 Node 还是使用其他的 Node 版本管理工具安装 Node，都会在安装 Node 的同时也安装 NPM，当然如果没有，可以手动安装。

- 开源地址：[https://github.com/npm/cli](https://github.com/npm/cli)；
- 官网文档：[https://docs.npmjs.com/cli/v11/commands](https://docs.npmjs.com/cli/v11/commands)；
- 民间翻译：[https://www.npmjs.cn/](https://www.npmjs.cn/)。

#### NVM

即 Node Version Manager，Node 版本管理工具。使用该工具可以很方便的在一台机器上管理各种不同的 Node 版本，从而应对不同的开发需求。

- 开源地址：[https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)；
- 常用命令：[https://github.com/coreybutler/nvm-windows?tab=readme-ov-file#usage](https://github.com/coreybutler/nvm-windows?tab=readme-ov-file#usage)。

#### NRM

即 Node Register Manager，Node 注册管理工具。使用该工具可以很方便的切换库的共享源。

- 开源地址：[https://github.com/Pana/nrm](https://github.com/Pana/nrm)；
- 常用命令：[https://github.com/Pana/nrm?tab=readme-ov-file#usage](https://github.com/Pana/nrm?tab=readme-ov-file#usage)。

## 实战演练

Q：为什么常常将 JavaScript 脚本的引用放在 \<body\> 的最后而不是与 CSS 一样放在 \<head\> 部分？

A：因为浏览器在加载网页（其实就是解析 HTML 文件）时，会逐行进行解析，如果将 JS 文件放在 head 中优先加载，会导致页面内容加载延迟，从而影响用户体验。因此将 JS 文件放在 body 的最后进行加载。毕竟加载页面的内容与 JS 是没有关系的。

