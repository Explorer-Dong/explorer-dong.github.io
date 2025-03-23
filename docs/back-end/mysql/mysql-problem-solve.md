---
title: MySQL 问题解决
---

本文记录 MySQL 的问题解决方案

## 解决 Connection refused: connect 的问题

### 问题

在 Ubuntu 上下载完 MySQL 以后，尝试在本地 DataGrip 连接该服务器上的数据库，结果出现报错 ：Connection refused: connect，如下图：

![Connection refused: connect](https://cdn.dwj601.cn/images/202403261820758.png)

### 解决

进入 MySQL 配置文件：`"/etc/mysql/mysql.conf.d/mysqld.cnf"`，将下面的代码注释掉并**重启**即可

```mysql
bind-address		= 127.0.0.1
```

### 原理

取消连接绑定，使得可以在任意远程主机上连接该服务器的 MySQL 服务器

### 参考

<https://zhuanlan.zhihu.com/p/601584675>
