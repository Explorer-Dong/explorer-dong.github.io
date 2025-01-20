---
title: Hexo 配置 mermaid
categories:
  - 前端
  - Hexo
category_bar: true
---

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