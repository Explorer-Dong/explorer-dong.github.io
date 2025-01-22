---
title: Hexo 功能增强
categories:
  - 前端
  - Hexo
category_bar: true
---

## 前言

本博客介绍一些关于「Hexo 功能增强」的内容。

## 自定义域名

在 GitHub Pages 中使用自己的域名

如果你觉得使用 [username].github.io 域名过于 ~~ugly~~，你可以使用自己的域名！

前置条件：

- 购买一个自己的域名：可以在阿里云、腾讯云等大云服务厂商购买域名。价位高低均有，适合自己的即可
- 使用 GitHub Pages 部署静态站点

我们知道，对于域名绑定的服务，如果被绑定的主机位于国内，则需要备案且步骤较为繁琐，但是 GitHub Pages 的主机显然都在米国，那就不需要备案了。我们以阿里云购买的域名为例进行操作。

### 第一步

将自己购买的域名绑定到 [username].github.io，这一步是为了在别人访问 [username].github.io 重定向到 自己购买的域名。

进入域名控制台并进入解析界面：

![进入域名控制台并进入解析界面](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403101115508.png)

配置以下两条解析记录：其中 www.[domain].[xxx] 可以实现自动重定向到 [domain].[xxx]，也可以不解析该记录。

![配置解析记录](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403101117553.png)

注意此处的解析请求来源一定要填 **默认** ！不要选择境外，否则无法解析成功

![此处的解析请求来源一定要填默认](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403101120914.png)

### 第二步

在 GitHub Pages 界面绑定刚才购买的域名。

进入仓库中的 setting > pages 页面，在 Custom domain 中填入 [domain].[xxx] 顶级域名并勾选强制 https 访问服务

![在 Custom domain 中填入顶级域名](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403101124296.png)

等待几分钟 DNS 解析即可使用 `[domain].[xxx]` or `www.[domain].[xxx]` or `[username].github.io` 访问自己的静态网站啦！

### 第三步

这一步其实是为了解决一个 bug，如果你在操作完上述两步以后，会发现静态页面仓库内多了一个 CNAME 文件。这是因为自定义域名以后，GitHub Pages 服务需要知道将请求路由到哪个域名上，而这需要从 CNAME 文件中获取信息

![仓库内多了一个 CNAME 文件](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403101223383.png)

但是如果后期更新站点时，由于 Hexo 强制覆盖分支的特性，会自动覆盖掉这个 CNAME 文件，从而无法正确的路由请求，也就会出现 404 的错误。解决方案就是在 hexo 的 `source/` 文件夹下添加一个 CNAME 文件。这样该 CNAME 文件就会被 hexo 识别为自己的内容，从而每次都可以部署到相应的分支上了

![在 hexo 的 source/ 文件夹下添加一个 CNAME 文件](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403101140516.png)

## 配置 mermaid

Hexo 配置 mermaid

### 问题复现

本地 typora 正常渲染，但是服务器渲染异常。发现是服务器的渲染脚本版本过低，无法渲染最新的 mermaid 版本内容。

本地 typora 支持的 mermaid 版本：

![本地 typora 支持的 mermaid 版本](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202409120854588.png)

网站支持的 mermaid 版本

![网站支持的 mermaid 版本](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202409120858955.png)

### 尝试解决

修改 `_config_fluid.yml` 中的 mermaid CDN 信息。由于原来的 CDN 不支持更高版本的 mermaid CDN，所以直接用官方的。

![修改 hexo-fluid 配置的 mermaid CDN 版本](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202409120902191.png)

注：[官网](https://www.jsdelivr.com/package/npm/mermaid?version=10.9.1)给出的链接无法在 hexo 的 fluid 主题中正常渲染，因为多了一个文件名 `mermaid.min.js`，显然 fluid 的 cdn 配置会在根目录自动寻找 `.js` 文件进行渲染。

### 问题解决

最后服务器可以正常渲染 mermaid 图标。

![正常渲染](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202409120850752.png)

## 增强搜索功能

考虑到某著名云服务商提供的云服务器在两年的 99 计划后续费价格高达四位数，遂研究一下降配续费。结果在将带宽从 3Mbps 降低到 1Mbps 并退给我三十几元后，发现不能撤回这一步操作，重新恢复至 3Mbps 需要我掏五百多元，绝。

考虑到目前只用那台机器托管了一个 Hexo 静态网站，最大的带宽开销是搜索时加载的约 8.5MB 的 local-search.xml 文件，在 3Mbps 带宽的情况下，需要加载约 $\frac{8.5\times 8}{3}\approx 23$ 秒，我已经难以忍受，现在直接给干到一分钟了。不得以，开始研究将该索引文件丢到这家云服务商的 OSS 上，悲。

### 配置 `_config.fluid.yml`

从 Fluid 的配置文件 _config.fluid.yml 中很容易找到 search.path 字段，其明确说明可以将索引文件的路径配置为外链地址，那么直接将 generate 出来的 local-search.xml 文件丢到 OSS 中，然后链接到对应的「公共读」文件即可。

当然这么干的前提是 OSS 的流出带宽要比 3Mbps 大。一搜 [OSS 的流出带宽](https://help.aliyun.com/zh/oss/product-overview/limits)，没绷住：

![南京本地地域的流出带宽大概是我原来小破 3Mbps 的一千倍，艹！](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202501192317447.png)

行吧，看来这个方案是可行的。

### 云端实时更新 `local-search.xml`

由于我会频繁更新博客内容，为了让搜索到的结果可以完美的匹配我的博客，就需要确保索引文件也是同步更新的。那我每次都要打开阿里云 OSS 控制台然后上传 local-search.xml 文件吗？必然不可能。阿里云 OSS 提供了诸多的第三方工具，例如 GUI 工具 oss browser、CLI 工具 ossutil、各语言的 SDK 等，这里用到 CLI 即可。自定义 git bash 中的命令后就得到了下面的语句：

```bash
alias gpho='git push && hexo clean && hexo generate && hexo deploy && ossutil cp </path/to/local-search.xml> oss://dwj-oss/search-files/'

# 上述部署逻辑其实就是：
# 1. git push
# 2. hexo clean && hexo generate && hexo deploy
# 3. ossutil cp </path/to/local-search.xml> oss://<bucket_name>/path/to/oss_folder/
```

这样在更新完博客以后，在 git bash 终端输入 `gpho` 即可同步更新博客站点和索引文件啦！

### 解决 `OSS.Bucket` 的跨域问题

但是还没完。由于 Hexo-Fuild 的搜索逻辑代码中使用到了 Ajax 请求，对于云服务器，其需要向 OSS 对应的主机发起请求，这就会引发浏览器的跨域问题从而导致 local-search.xml 文件无法正常被加载到用户的浏览器中。去阿里云 OSS 的控制台配置对应 Bucket 的 [跨域规则](https://help.aliyun.com/zh/oss/user-guide/cors-12/) 即可。例如我的配置：

![配置对应 Bucket 的跨域规则即可](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202501192333282.png)

现在 8.5MB 的 local-search.xml 只需要几百毫秒即可加载完成，美汁汁！
