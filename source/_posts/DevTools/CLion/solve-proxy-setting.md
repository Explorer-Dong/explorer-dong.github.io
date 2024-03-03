---
title: solve-proxy-setting
categories: 
  - DevTools
  - CLion
category_bar: true
---

# CLion 配置代理

## 前言

无意中点到了 Github Copilot 中的设置按钮，发现了 proxy 的设置选项，联想到了之前也在 Git 中配置了代理彻底解决了 push 到 github 的问题，以及在 npm 中配置代理解决了下载模块异常缓慢的问题。于是就开始思考如果给 CLion、Pycharm 等 Jetbrains 全家桶配置代理有什么好处？目前看来大概就是可以使得 Github Copilot 更加快速的自动登录与响应问题，以及加快编辑器、插件的更新。可能后续下载第三方包也可以加速吧hhh，下面开始介绍步骤

## 步骤

进入 `Settings > Appearance & Behavior > System Settings > HTTP Proxy`，如下：

![进入代理设置界面](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403032127859.png)

选择 Manual proxy configuration，选择 HTTP 选项，输入主机名（如果是配置本地电脑 `127.0.0.1` 或者 `localhost` 均可），输入代理服务商提供的代理端口号，我的是 Clash Verge，如下：

![Clash Verge 端口查询界面](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403032127860.png)

连接 Google 或 Github 等外网进行测试，如下：

![连接 Google 或 Github 等外网进行测试](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403032127861.png)

测试连接成功，那么配置就成功了，如下：

![测试连接成功](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403032127862.png)