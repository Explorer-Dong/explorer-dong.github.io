---
title: Nginx 基础
---

![](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/web-imgs/img-artical/nginx.png)

## 基本概念

在正式开始介绍 nginx 时，有必要了解一下 **代理系统** 这个概念。所谓代理，简单来说就是连接用户与服务器的中间媒介。有正向代理、反向代理等实际应用。与以往传统的用户与服务器直连的方式不同，通过代理系统可以完成很多前者无法完成的任务，同时也有性能上质的飞跃，下面从理论的角度介绍代理系统的实际应用示例以及优势。例如：

**正向代理**：所谓的正向代理其实就是 **面向用户** 进行运作。常见的正向代理应用比如 VPN 服务就是很典型的一种。

![正向代理](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403300120927.png)

**反向代理**：所谓的反向代理的与上述正向代理对应，就是 **面向服务器** 进行运作。常见的反向代理应用比如 Nginx 与 Apache 服务器就是典型的应用。通过选择性的配置性的从服务器获取数据返回给前端渲染给用户，来实现负载均衡、加速优化等效果

![反向代理](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403300120846.png)

## 反向代理实战

我们以 **单服务器+单顶级域名 = 多网站** 为目标驱动，简单实现一下 nginx 反向代理的功能。

参考：[通过 Nginx 在一台服务器部署多个 Web 应用](https://blog.csdn.net/qq_38431321/article/details/123018259)

### (1) 创建多个二级域名

多个网站可以通过 **二级域名** 的形式只依赖一个 **顶级域名** 实现。例如顶级域名为 `baidu.com`，二级域名为 `mcn.baidu.com`、`career.baidu.com` 等等。

### (2) 解析二级域名绑定到服务器上

每一个 **二级域名** 都需要指向我们自己的服务器，这需要我们将二级域名解析到服务器对应的 **IP 地址** 上才能进行后续的「域名访问网站」的操作。例如，我们将 docs 二级域名绑定到服务器 `47.113.205.127` 上，已达到后续可以访问 `dwj601.lova`、`www.dwj601.lova` 和 `docs.dwj601.lova` 指向的不同网站的目的。

![将二级域名绑定到服务器](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126611.png)

### (3) 不同域名访问不同网站

现在所有的二级域名都指向了同一台服务器，那又怎么做到访问不同的网站呢？由于一台电脑理论上可以运行多个网站程序，而每一个网站程序本质上就是一个资源文件夹，即：

![不同的网站对应不同的资源文件夹](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126612.png)

那如何根据二级域名区分访问哪一个资源文件夹呢？这时 nginx 代理功能就发挥作用了。我们进行 nginx 代理服务器的配置。配置文件为 `/etc/nginx/nginx.conf`。按照上述需求，假如此时我们需要 `docs.example.com` 访问文档网站，`www.example.com` 与 `example.com` 都访问主站，我们可以这样进行 nginx 的配置：

```nginx
#----- docs.example.com 访问文档网站 -----#
server {
    listen       443 ssl;             # 监听的端口
    server_name  docs.example.com;    # 监听的域名

    # ssl证书的相关文件路径
    ssl_certificate      /usr/local/nginx/ssl/test.cn_bundle.pem;
    ssl_certificate_key  /usr/local/nginx/ssl/test.cn.key;

    # ssl相关配置
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    # 项目路径 - 以静态资源为例
    location / {
        root /usr/web/docs;           # 网站根目录
    }
}

#----- www.example.com 访问主站 -----#
server {
    listen       443 ssl;             # 监听的端口
    server_name  www.example.com;     # 监听的网址

    # ssl证书的相关文件路径
    ssl_certificate      /usr/local/nginx/ssl/b.test.cn_bundle.pem;
    ssl_certificate_key  /usr/local/nginx/ssl/b.test.cn.key;

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
        root /usr/web/www;            # 根目录
    }
}

#----- example.com 通过重定向的方式也访问主站 -----#
server {
    listen       443 ssl;             # 监听的端口
    server_name  example.com;         # 监听的网址

    # ssl证书的相关文件路径
    ssl_certificate      /usr/local/nginx/ssl/b.test.cn_bundle.pem;
    ssl_certificate_key  /usr/local/nginx/ssl/b.test.cn.key;

    # ssl相关配置
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
        proxy_pass  https://www.example.com  # 重定向到 example.com
    }
}
```

## 配置 http 自动跳转 https

添加一个 server 块，内容如下：

```nginx
server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}
```

之后使用 `nginx -s reload` 重启 nginx 即可。
