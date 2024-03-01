---
title: hexo-learning-record
categories: FrontEnd
category_bar: true
---

## 前言

操作系统：Windows 11 OS

建站第一枪，使用 Hexo 静态站点生成器搭建自己的博客网站。首先解释一下什么叫静态站点生成器，其实就是将自己写好的 Markdown   文件自动构建为 HTML 文件，然后进行浏览器渲染，而不需要自己编写前端样式文件。在开始介绍 Hexo 建站步骤之前，最好需要掌握一下技能（不掌握也没事，边建边学也行，我就是这样，不过可能会比较浪费时间）：

- git 与 github：进行项目版本管理，并且在后期自动化打包部署上有很大的用
- nodejs 与 npm：可以将其粗略的类比为 python 与 pip 的关系与作用
- html、css、javascrip：大概看得懂会 Ctrl C+V 即可，可以后期修改主题样式

为了防止某些同学还没开始就结束，先补充一下 nodejs 与 npm 的说明与使用、避坑指南，本地已经有可运行 node 环境的同学可以直接跳到 **#步骤一：创建本地环境**。下面开始介绍：

> 概念介绍：
>
> - nodejs：就是 JavaScript 语言的运行环境，可以将其粗略的类比于 python 解释器（实质上功能远不止解释器），你需要将其下载到本地，推荐长期支持版（LTS）。
>
> - npm：npm 是 JavaScript 第三方包的管理工具，可以将其粗略的类比于 pip 包管理工具。本篇博客使用的 Hexo 其实就是一个 JavaScrip 第三方包。在下载 nodejs 时，npm 就会自动打包一起下载在同一个目录下。
>
> 注意点：
>
> - 第一个就是需要将下载解压后的 nodejs 文件夹的权限设置为最高，即所有的权限全部赋予。防止后期出现安装第三方包失败的情况（因为需要对该文件夹中的内容进行读写）
> - 第二个就是需要设定环境变量，不光设定 npm 的环境变量，还需要设定第三方包的环境变量。前者是为了使用 npm 命令行工具，后者是为了使用第三方包携带的自己的命令行工具，比如此处涉及到的 hexo 命令行工具
> - 第三个就是需要设定 npm 的代理。因为 node 的第三方库下载地址墙的严重，不设置代理会很慢。具体设定语法自行搜索

下面开始正式介绍基于 hexo 搭建个人博客网站的步骤

## 一、创建本地环境

就像一个项目一样，一个 hexo 网站也就是一个项目。接下来进入该项目后，打开命令行工具进行操作。目前主流的几乎都可以：bash、cmd、当然由于本地环境时 Windows OS，故对于 Linux、MacOS 的用户就不用说了。

- 创建 git 仓库进行版本管理

    ```bash
    git init
    ```

- 安装 JavaScrip 第三方包 Hexo

    ```bash
    npm install -g hexo-cli
    ```

- 检查是否安装成功

    ```bash
    hexo -v
    ```

- 初始化一个静态站点并刷新

    ```bash
    hexo init
    npm install
    ```

## 二、本地运行测试

- 生成静态文件，可简写为 `hexo g -d`（就是最终部署的文件，会打包在一个叫 public 的文件夹中）不要少 -d 参数

    ```bash
    hexo generate -d
    ```

- 启动本地服务，可简写为 `hexo s`

    ```bash
    hexo server
    ```

hexo 服务默认启动 4000 端口，现在浏览器访问 localhost:4000 即可看到 hexo 的模板博客网站

## 三、手动部署云端

现在我们需要将其部署到 [username].github.io 上。一般博客该路径进行部署，如果想要展示其他的网站 demo，一般路径设置为 [username].github.io/[repo]。

- 安装 hexo 部署插件 hexo-deployer-git，也是 nodejs 第三方包（一定不要漏掉 --save 参数，否则卸载重装该包）

    ```bash
    npm install -g hexo-deployer-git --save
    ```

- 创建一个 github 仓库，仓库名就设置为 [username].github.io，然后在本地进行远程绑定，即

    ```bash
    git remote add origin <https link or ssh link>
    ```

- 如果没有执行生成静态文件的命令，需要执行一下（一定不要漏掉 -d 参数，否则重新执行）

    ```bash
    hexo generate -d
    ```

- 执行部署命令，下面两条均可

    ```bash
    npm run deploy
    ```

    ```bash
    hexo deploy
    ```

现在访问 https://[username].github.io 如果可以看到与之前本地测试一样的界面的，恭喜你，现在已经可以进行快乐的博客编写并且链接分享进行技术交流~~（装b）~~了

## 四、自动部署云端

这一步个人认为属于锦上添花的一步。其实进行自动化部署相比手动部署只少了两步，分别为生成静态文件 `hexo generate -d` 与部署 `hexo deploy` 的步骤。那么我们为什么还要弄自动化部署呢？愚以为：是为了源文件备份。我们知道，当前仓库里的博客文件格式都是 .html 但是我们博客的源码都是 .md，前者不便于修改，后者十分便于修改。如果本地数据丢失，那么对于之前写的博客就丢失了所有的 md 源码。但是自动化部署的逻辑就可以规避掉这个问题，可以实现 md 文件的云端备份，当然也可以自动化部署啦~。下面介绍一下如何使用 Github Action 进行自动化部署的逻辑：

其实就是将本地源码修改完后 push 到该仓库的另一个分支下，然后 github 自带的 Github Action 会监听到该仓库的 push 操作，然后进行工作流脚本文件的执行，实现在本地部署的一系列操作。是不是很简单的逻辑！写到这其实可以发现，自动化部署还有一个好处就是：博客编写者只需要熟悉 git 的相关指令与逻辑即可，不需要关心 hexo 的指令，提高了编写的效率。接下来进行详细步骤的讲解：

- 创建工作流文件。在根目目录下创建以下文件关系

    ```bash
    touch .github/workflows/deploy.yml
    ```

- 编辑 deploy.yml 文件，模板如下

    ```bash
    name: Build and Deploy
    on: [push]
    jobs:
      build-and-deploy:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout 🛎️
            uses: actions/checkout@v3
            with:
              persist-credentials: false
    
          - name: Install and Build 🔧
            run: |
              npm install
              npm run build
            env:
              CI: false
    
          - name: Deploy 🚀
            uses: JamesIves/github-pages-deploy-action@v4
            with:
              GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
              BRANCH: main   # 修改为你的静态文件分支
              FOLDER: public # 修改为你的静态文件生成存放的文件夹
    ```

- 将本地相关文件进行 git 管理后，创建分支（假设叫 auto-deploy）

    ```bash
    git branch auto-deploy
    ```

push 到仓库，等待 github 自动部署后，重新加载 https://[username].github.io 就可以发现站点内容已经更新了！

## 参考

搭建：[Luke教你20分钟快速搭建个人博客系列(hexo篇)](https://www.bilibili.com/video/BV1dt4y1Q7UE)

个性化定制：[GitHub Pages + Hexo搭建个人博客网站，史上最全教程](https://blog.csdn.net/yaorongke/article/details/119089190)

原理：[npm install是什么意思](https://blog.csdn.net/weixin_42596246/article/details/129586384)

