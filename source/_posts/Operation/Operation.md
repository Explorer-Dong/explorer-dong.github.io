---
title: Operation
categories: Operation
category_bar: true
---

# Operation

## 前言

### 1. 内容大纲

全栈开发之 Linux 运维学习。在有了一定的前端的基础上，进行云计算运维相关知识的学习，内容包括但不限于

1. Linux基础：常用命令、文件及用户管理、文本处理、Vim工具使用
2. 网络基础：网络基础知识、TCP/IP协议、七层网络模型、Linux网络管理与配置
3. 服务器基础：SSH远程连接、文件上传下载、Nginx和MySQL服务器搭建、LVS负载均衡配置以及服务器优化经验
4. 自动化基础：Shell脚本编写、自动化运维工具Ansible的使用

- 部署流程

### 2. 学习资源

- 路线：[Linux运维学习路线 - 阿里云](https://developer.aliyun.com/learning/roadmap/linux)
- 文档：[菜鸟 Linux 教程](https://www.runoob.com/linux/linux-tutorial.html)
- 部署：[搭建一个自己的网站？看这个就够了！](https://www.bilibili.com/video/BV16A4y1X7vg/)

## 一、Linux 基础

Linux 是操作系统的一种，是便于用户与计算机资源进行交互的媒介

> [!note]
>
> - 操作系统的地位。在正式开始 Linux 操作系统的学习之前，有必要了解一下整个计算机组成中，操作系统的地位（如下图）。可以发现，操作系统其实为用户搭建了访问硬件资源、网络资源的桥梁，使用户能够方便地与计算机进行交互
>
>     <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402092306641.png" alt="image-20240209230617073" style="zoom:50%;" />
>
> - Linux 发展史。有必要了解一下 Linux 的发展史：Unix $\to$ Minix $\to$​ Linux (linux is not unix) ，因此往往称 Linux 为 类Unix。Unix 为最开始的操作系统，在此基础之上开发了只在教育界开源使用的 Minix 操作系统，最后由于 Minix 停止更新维护，一个学生在 Minix 的基础之上创造了 Linux 操作系统并且已经成为了当下最为流行的开源操作系统
> - Linux 发行版本。正因为其开源，从而诞生了很多的版本，其中的广为流行的发行版本主要有 Ubuntu、CentOS、Debian 等



## 二、网络基础



## 三、服务器基础

服务器 server 就是类似于一台台低配版电脑，量产后在全球各地通过网络为用户提供高质量的便捷服务。在学习服务器相关知识之前，有必要先了解计算机网络相关的概念，有助于后续理解代理系统等的运作逻辑与开发逻辑。在正式开始之前，首先罗列一下最基本的概念：

> [!note]
>
> - 云服务器：
>
>     - 实例：一个云服务器相当于一个抽象的类，在其中购买配置了指定的实例后相当于实例化一个类，从而一个云服务器对应一个实例
>     - ip 地址：一台云服务器对应唯一的一个 ip 地址。其中 IPv4 为
>     - 备案：所谓的网站备案其实是对云服务器进行备案。当前的形式是，对于指向中国大陆 ip 的云服务器需要备案，如果指向的是非中国大陆的 ip，就不需要备案了。一般而言，中文的指向 HK，英文的指向 UK
>     - 端口：一台电脑能做的肯定不止一种，ip 地址端口的概念就好比一台电脑可以有不同的功能模块，不同的端口对应服务器不同的数据通道，开发者可以通过不同的端口开发不同的功能，用户可以通过不同的端口使用一台服务器上的不同服务
>     - [宝塔面板](https://www.bt.cn/new/download.html)：由于 linux 操作系统的命令行操作方式与 windows 的图形化界面操作方式差别较大，对于习惯图形化操作的用户不友好，故有一系列**图形化管理** linux 操作系统的工具，宝塔面板就是其中的一个代表
>
> - 域名：
>
>     - 概念：代替 ip 地址访问的一种更加容易记忆与推广的媒介，通过 DNS 服务器将域名与 ip 地址进行绑定后，用户通过域名 domain 即可访问相应的服务器的资源
>     - 顶级域名：即 **域名+后缀** 的组合
>     - 二级域名：即 **主机名+域名+后缀** 的组合
>
> - 协议：
>
>     - 概念：服务器与用户进行数据传输的一种约定规则
>
>     - http：传统的数据传输协议，默认服务器 80 端口进行访问
>     - https：即 http + ssl，传统协议 + ssl 加密证书，默认服务器 443 端口访问
>     - ssl：即 Secret Sockets Layer 安全套件层，用于加密服务器与用户之间传输的数据。其中证书文件为 pem 文件，密钥文件为 key 文件
>
> - 网站框架：
>
>     - 目前两款主流的网站框架分别为 LNMP 与 LAMP，都是用于搭建 Web 服务器环境的**软件堆栈**
>     - LNMP：表示使用 Linux 操作系统、Nginx 作为 Web 服务器、MySQL 作为数据库、PHP 作为服务器端脚本语言的技术堆栈
>     - LAMP：表示使用 Linux 操作系统、Apache 作为 Web 服务器、MySQL 作为数据库、PHP 作为服务器端脚本语言的技术堆栈

### 3.1 网络系统



### 3.2 代理系统

简单来说就是连接用户与服务器的中间媒介，有正向代理、反向代理等实际应用，与以往传统的用户与服务器直连的方式不同，通过代理系统可以完成很多前者无法完成的任务，同时也有性能上质的飞跃，下面从理论的角度介绍代理系统的实际应用示例以及优势

#### 3.2.1 基本概念

- 正向代理：所谓的正向代理其实就是**面向用户**进行运作。常见的正向代理应用比如 VPN 服务就是很典型的一种。

- 反向代理：所谓的反向代理的与上述正向代理对应，就是**面向服务器**进行运作。常见的反向代理应用比如 Nginx 与 Apache 服务器就是典型的应用。通过选择性的配置性的从服务器获取数据返回给前端渲染给用户，来实现负载均衡、加速优化等效果

#### 3.2.2 反向代理应用举例

> 单服务器 + 单顶级域名 = 多网站

参考：[通过Nginx在一台服务器部署多个Web应用](https://blog.csdn.net/qq_38431321/article/details/123018259)

##### (1) 创建多个二级域名

多个网站可以通过**二级域名**的形式只依赖一个**顶级域名**，从而实现一个域名衍生出多个子域名的形式，即一级域名为 `baidu.com`，二级域名为 `mcn.baidu.com`、`career.baidu.com` 等等

##### (2) 解析二级域名绑定到服务器上

每一个**二级域名**都需要解析到相应的 **IP 地址**，即**主机记录**对应**记录值**，才能进行后续的访问。其实可以理解为，将不同的二级域名都绑定到当前的服务器上，像这样：

![将二级域名绑定到服务器](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126611.png)

##### (3) 理解二级域名的访问

我们通过不同的二级域名访问网站时，其实就是访问不同的文件夹中的文件信息，像这样：

![访问不同的文件夹中的文件信息](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202401260126612.png)

##### (4) 实现不同的域名访问不同的文件

这时我们就需要配置 Nginx 的代理服务器了， Nginx 中的 nginx.conf 文件示例配置如下

```bash
#----- example project -----#
server {
    listen       443 ssl; # 监听的端口
    server_name  test.cn; # 监听的网址(domain)

    # ssl证书的相关文件路径
    ssl_certificate      /usr/local/nginx/ssl/test.cn_bundle.pem;
    ssl_certificate_key  /usr/local/nginx/ssl/test.cn.key;

    # ssl相关配置
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    # 项目路径
    location / {
        proxy_pass https://localhost:8080/; # 转向“本地”8080端口
        # root path;                          # 网站根目录
        # index demo.html;                  # 设置默认页
        # deny 127.0.0.1;                      # 拒绝的ip
        # allow 172.18.5.54;                 # 允许的ip       
    }
}
```

假如此时我们需要 `docs.example.com` 访问文档分站，`www.example.com` 与 `example.com` 都访问主站，我们就需要配置 Nginx 中的 nginx.conf 文件，如下

```bash
#----- docs.example.com 访问文档分站 -----#
server {
    listen       443 ssl;             # 监听的端口
    server_name  docs.example.com;     # 监听的网址

    # ssl证书的相关文件路径
    ssl_certificate      /usr/local/nginx/ssl/test.cn_bundle.pem;
    ssl_certificate_key  /usr/local/nginx/ssl/test.cn.key;

    # ssl相关配置
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    # 项目路径
    location / {
        root /usr/web/docs;         # 网站根目录
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
        root /usr/web/www;                  # 根目录
    }
}

#----- example.com 通过重定向的方式也访问主站 -----#
server {
    listen       443 ssl;             # 监听的端口
    server_name  example.com;     # 监听的网址

    # ssl证书的相关文件路径
    ssl_certificate      /usr/local/nginx/ssl/b.test.cn_bundle.pem;
    ssl_certificate_key  /usr/local/nginx/ssl/b.test.cn.key;

    # ssl相关配置
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
        proxy_pass  https://www;              # 请求转向 mysvr 定义的服务器列表
    }
}
```

## 四、自动化基础
