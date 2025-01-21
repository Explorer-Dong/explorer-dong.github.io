---
title: 使用 Hexo 搭建属于自己的博客网站
categories:
  - 前端
  - Hexo
category_bar: true
---

## 前言

笔记记多了，想要分享给同学们一起交流进步，该怎么办呢？想要搭建一个属于自己的知识库，不仅仅局限在 PC 上，移动端也能随时查看，怎么办呢？自己的博客网站就是最佳选择！现在市面上主要有两个建站模式：

1. 有后端：[WordPress](https://cn.wordpress.org/)；
2. 无后端：[Hexo](https://hexo.io/zh-cn/)、[VuePress](https://v2.vuepress.vuejs.org/zh/)、[Gatsby](https://www.gatsbyjs.com/docs)。

带有后端的博客网站可以是可以，但是感觉有点笨重，而无后端的「静态站点生成器」很适合更新不怎么频繁的中小型知识库。所谓的静态站点生成器，其实就是利用一个转换工具将自己写好的 Markdown 笔记文件转换为 HTML 文件，后续通过浏览器和 ip 端口（配置域名后续会介绍）访问即可。也就是说我们只需要关注文章的内容本身，即可在极短的时间内构建一个所有人都可以访问的博客网站。

本博客以 Hexo 为例讲解如何从零开始搭建一个自己的博客网站。在开始之前，你需要掌握以下工具并配置 Node 运行时环境：

- git 与 github：项目版本管理工具（后期在 CI/CD 时有很大作用）；
- nodejs 与 npm：JavaScrip 运行环境与 JavaScrip 包管理工具（可以将其粗略地类比为 python 与 pip 的关系与作用）。

## 创建项目

我们需要创建一个虚拟环境用来管理我们的博客网站内容。

安装 Hexo 的命令行工具

```bash
npm install hexo-cli
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

### 本地运行测试

- 生成静态文件，可简写为 `hexo g -d`（就是最终部署的文件，会打包在一个叫 public 的文件夹中）不要少 -d 参数

    ```bash
    hexo generate -d
    ```

- 启动本地服务，可简写为 `hexo s`

    ```bash
    hexo server
    ```

hexo 服务默认启动 4000 端口，现在浏览器访问 localhost:4000 即可看到 hexo 的模板博客网站

## 部署云端

### 手动

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

现在访问 `https://[username].github.io` 如果可以看到与之前本地测试一样的界面的，恭喜你，现在已经可以进行快乐的博客编写并且链接分享进行技术交流~~（装b）~~了

### 自动

这一步个人认为属于锦上添花的一步。其实进行自动化部署相比手动部署只少了两步，分别为生成静态文件 `hexo generate -d` 与部署 `hexo deploy` 的步骤。那么我们为什么还要弄自动化部署呢？愚以为：是为了源文件备份。我们知道，当前仓库里的博客文件格式都是 .html 但是我们博客的源码都是 .md，前者不便于修改，后者十分便于修改。如果本地数据丢失，那么对于之前写的博客就丢失了所有的 md 源码。但是自动化部署的逻辑就可以规避掉这个问题，可以实现 md 文件的云端备份，当然也可以自动化部署啦~。下面介绍一下如何使用 Github Action 进行自动化部署的逻辑：

其实就是将本地源码修改完后 push 到该仓库的另一个分支下，然后 github 自带的 Github Action 会监听到该仓库的 push 操作，然后进行工作流脚本文件的执行，实现在本地部署的一系列操作。是不是很简单的逻辑！写到这其实可以发现，自动化部署还有一个好处就是：博客编写者只需要熟悉 git 的相关指令与逻辑即可，不需要关心 hexo 的指令，提高了编写的效率。接下来进行详细步骤的讲解：

- 创建工作流文件。在根目录下创建以下文件关系：

    ```bash
    touch .github/workflows/deploy.yml
    ```

- 编辑 deploy.yml 文件。模板如下：

    ```bash
    name: Build and Deploy
    on: [push]
    jobs:
      build-and-deploy:
        runs-on: ubuntu-latest
        steps:
          # 相当于 git clone 到服务器
          - name: Checkout 🛎️
            uses: actions/checkout@v3
            with:
              persist-credentials: false
    
          # 安装依赖并生成页面
          - name: Install and Build 🔧
            run: |
              npm install
              npm run build
            env:
              CI: false
    
          # 部署
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

push 到仓库，等待 github 自动部署后，重新加载 `https://[username].github.io` 就可以发现站点内容已经更新了！

## 参考

搭建：[Luke教你20分钟快速搭建个人博客系列(hexo篇)](https://www.bilibili.com/video/BV1dt4y1Q7UE)

个性化定制：[GitHub Pages + Hexo搭建个人博客网站，史上最全教程](https://blog.csdn.net/yaorongke/article/details/119089190)

