---
title: 使用 apt 安装 Nginx 后的软件包是如何布局的
categories: 
  - 运维
  - Nginx
category_bar: true
index_img: https://dwj-oss.oss-cn-nanjing.aliyuncs.com/web-imgs/img-artical/nginx.png
---

## 前言

在 Ubuntu22.04 操作系统上，我们使用以下命令安装 Nginx 以后：

```nginx
root@dwj2:~# sudo apt update && sudo apt install nginx
```

使用命令 `whereis nginx` 查看安装路径：

```bash
root@dwj2:/home# whereis nginx
nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx /usr/share/man/man8/nginx.8.gz
```

我们分部分五个部分进行解读：

## /usr/sbin/nginx

![/usr/sbin/nginx](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404031007306.png)

![* 含义解释](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404031011583.png)

当前路径包含了 nginx 服务器的可执行文件。而 Ubuntu 中这个位置是用于存放系统管理的可执行文件的标准目录之一，可以从图二中的 `*` 看出，在 Mobaxterm 中，文件名后面加 `*` 表示该文件拥有执行权限。

## /usr/lib/nginx

{% gi 2 2 %}

![/usr/lib/nginx](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404031019394.png)

![/usr/lib/nginx/modules](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404031014214.png)

{% endgi %}

当前路径包含 nginx 的共享对象模块（so，shared objects）。通常情况下，这些模块文件可能被 nginx 服务器在运行时动态加载。当服务器需要使用特定功能时，它会动态加载相应的模块，以提供所需的功。

## /etc/nginx

![/etc/nginx](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404031027880.png)

当前路径是 nginx 的主要配置文件目录。我们主要在这里进行 nginx 的配置。

## /usr/share/nginx

![/usr/share/nginx](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404031027018.png)

当前路径包含一些 nginx 的静态资源，同时软链接到模块依赖文件。

## /usr/share/man/man8/nginx.8.gz

![/usr/share/man/man8/nginx.8.gz](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404031303783.png)

当前路径包含 nginx 的手册页文件，以供用户查阅 nginx 命令的使用说明。我们可以使用 `gzip -d nginx.8.gz` 将其解压后阅读。

