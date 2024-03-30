---
title: apt-command
categories:
  - Operation
  - Ubuntu
category_bar: true
---

# Ubuntu 包管理工具 APT 的使用

## 前言

首先说明一下，包管理工具在 Linux 操作系统中的存在，就类似于应用商店在手机上的存在。我们可以利用包管理工具 安装、卸载、更新   我们的软件。在 Linux 的 Ubuntu 发行版中，使用 apt 包管理工具进行软件管理。接下来介绍一下其基本命令。

## 命令

### 1. 更新软件包列表

其实是更新每一个软件包对应的版本号，而非真正更新了软件。原理大概类比于手机端提示更新（一定是最新版），但是服务器不会实时更新软件的最新版编号（因为没有实时联网），因此需要我们手动更新获取所有软件的最新版本编号，从而可以后续真正意义上的软件更新。

```bash
apt update
```

### 2. 更新软件包

更新全局软件包到最新版本

```bash
apt upgrade
```

### 3. 安装软件包

安装指定的软件包

```bash
apt install <PackageName>
```

### 4. 删除软件包

删除指定的软件包

```bash
apt remove <PackageName>
```

## 补充

### 1. sudo 命令前缀

sudo 的全称是 superuser do，即**超级用户执行**。命令之前加上 `sudo` 的意思是普通用户以管理员身份执行指令，从而以管理员权限执行比如：安装软件、系统设置和文件系统等安全操作。可以避免不必要的安全风险。

## 参考

<https://runkodo.com/post/如何在linux中安装和管理软件包：一个完全的初学者>

<https://www.runoob.com/linux/linux-comm-apt.html>

