---
title: 在 GitHub Pages 中使用自己的域名
categories:
  - 前端
  - Hexo
category_bar: true
---

## 前言

如果你觉得使用 [username].github.io 域名过于 ~~ugly~~，你可以使用自己的域名！

## 前置条件

- 购买一个自己的域名：可以在阿里云、腾讯云等大云服务厂商购买域名。价位高低均有，适合自己的即可
- 使用 GitHub Pages 部署静态站点

## 开始操作

我们知道，对于域名绑定的服务，如果被绑定的主机位于国内，则需要备案且步骤较为繁琐，但是 GitHub Pages 的主机显然都在米国，那就不需要备案了。我们以阿里云购买的域名为例进行操作

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

$END$