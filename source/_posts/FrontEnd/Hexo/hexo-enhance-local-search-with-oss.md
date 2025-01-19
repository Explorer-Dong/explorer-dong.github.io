---
title: 用OSS增强Hexo的搜索功能
categories:
  - FrontEnd
  - Hexo
category_bar: true
---

## 前言

考虑到某著名云服务商提供的云服务器在两年的 99 计划后续费价格高达四位数，遂研究一下降配续费。结果在将带宽从 3Mbps 降低到 1Mbps 并退给我三十几元后，发现不能撤回这一步操作，重新恢复至 3Mbps 需要我掏五百多元，绝。

考虑到目前只用那台机器托管了一个 Hexo 静态网站，最大的带宽开销是搜索时加载的约 8.5MB 的 local-search.xml 文件，在 3Mbps 带宽的情况下，需要加载约 $\frac{8.5\times 8}{3}\approx 23$ 秒，我已经难以忍受，现在直接给干到一分钟了。不得以，开始研究将该索引文件丢到这家云服务商的 OSS 上，悲。

## 配置 `_config.fluid.yml`

从 Fluid 的配置文件 _config.fluid.yml 中很容易找到 search.path 字段，其明确说明可以将索引文件的路径配置为外链地址，那么直接将 generate 出来的 local-search.xml 文件丢到 OSS 中，然后链接到对应的「公共读」文件即可。

当然这么干的前提是 OSS 的流出带宽要比 3Mbps 大。一搜 [OSS 的流出带宽](https://help.aliyun.com/zh/oss/product-overview/limits)，没绷住：

![南京本地地域的流出带宽大概是我原来小破 3Mbps 的一千倍，艹！](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202501192317447.png)

行吧，看来这个方案是可行的。

## 云端实时更新 `local-search.xml`

由于我会频繁更新博客内容，为了让搜索到的结果可以完美的匹配我的博客，就需要确保索引文件也是同步更新的。那我每次都要打开阿里云 OSS 控制台然后上传 local-search.xml 文件吗？必然不可能。阿里云 OSS 提供了诸多的第三方工具，例如 GUI 工具 oss browser、CLI 工具 ossutil、各语言的 SDK 等，这里用到 CLI 即可。自定义 git bash 中的命令后就得到了下面的语句：

```bash
alias gpho='git push && hexo clean && hexo generate && hexo deploy && ossutil cp </path/to/local-search.xml> oss://dwj-oss/search-files/'

# 上述部署逻辑其实就是：
# 1. git push
# 2. hexo clean && hexo generate && hexo deploy
# 3. ossutil cp </path/to/local-search.xml> oss://<bucket_name>/path/to/oss_folder/
```

这样在更新完博客以后，在 git bash 终端输入 `gpho` 即可同步更新博客站点和索引文件啦！

## 解决 `OSS.Bucket` 的跨域问题

但是还没完。由于 Hexo-Fuild 的搜索逻辑代码中使用到了 Ajax 请求，对于云服务器，其需要向 OSS 对应的主机发起请求，这就会引发浏览器的跨域问题从而导致 local-search.xml 文件无法正常被加载到用户的浏览器中。去阿里云 OSS 的控制台配置对应 Bucket 的 [跨域规则](https://help.aliyun.com/zh/oss/user-guide/cors-12/) 即可。例如我的配置：

![配置对应 Bucket 的跨域规则即可](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202501192333282.png)

现在 8.5MB 的 local-search.xml 只需要几百毫秒即可加载完成，美汁汁！
