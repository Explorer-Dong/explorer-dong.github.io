---
title: MySQL 基础操作
---

## 前言

MySQL是一款目前较为流行的关系型数据库

## 架构

![MySQL 架构](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402140034126.png)

- `schema` 是架构的意思，可以理解为项目名，即一个项目一个 `schema`
- `tables` 为自动生成的文件夹，其中包含很多个 `table`
- `table` 就是用户自定义的二维表，其中含有字段与相关的信息

## 常见命令

登录

```bash
mysql -uroot -p
```

启动

```bash
sudo systemctl start mysql
```

开机自启动

```bash
sudo systemctl enable mysql
```

检查是否在运行

```bash
sudo systemctl status mysql
```

重启

```bash
sudo systemctl restart mysql
```

刷新配置

```mysql
FLUSH PRIVILEGES;
```

