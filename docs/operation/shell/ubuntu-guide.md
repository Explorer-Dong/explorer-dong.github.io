---
title: Ubuntu 使用指南
---

## 文件系统

以 Ubuntu22.04 为例。下面是我的文件目录：

![Ubuntu22.04 目录结构](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202409132006698.png)

下面是 gpt-4o 生成的解释：

> **/boot**: 存放启动加载程序和内核相关的文件，例如 `vmlinuz` 和 `initrd.img`，是系统启动时加载的内容。
>
> **/dev**: 包含系统中的设备文件。Linux 将所有设备（如硬盘、CD-ROM、键盘）视为文件，放在这个目录下。
>
> **/etc**: 存储系统配置文件和启动脚本。几乎所有的系统级配置文件都位于此处。
>
> **/home**: 每个用户的主目录都在这个目录下。用户的个人数据、配置文件、下载等内容存放于此。
>
> **/lost+found**: 存放系统崩溃或磁盘故障后恢复的文件碎片。通常这个目录只有在使用 ext 文件系统时才存在。
>
> **/media**: 用于自动挂载的可移动媒体设备的挂载点，如 CD-ROM、USB 驱动器等。
>
> **/mnt**: 用于临时挂载的文件系统。例如，系统管理员可能会使用这个目录挂载临时文件系统。
>
> **/opt**: 为第三方应用程序提供存储位置，通常是独立于默认包管理系统的程序。
>
> **/proc**: 一个虚拟文件系统，提供系统内核和运行进程的信息。比如，`/proc/cpuinfo` 包含 CPU 的信息。
>
> **/root**: 超级用户（root）的主目录。与普通用户的主目录在 `/home` 不同，root 用户的主目录在根目录下。
>
> **/run**: 存储应用程序和服务的运行时数据，如进程 ID 文件（PID）、锁文件等。
>
> **/snap**: 包含 Snap 包管理系统的应用程序安装目录。
>
> **/srv**: 存放为服务（service）提供的数据。比如，Web 服务器可能会在这里存放网站文件。
>
> **/sys**: 和 `/proc` 类似，提供系统硬件信息的接口，是一个虚拟文件系统。
>
> **/tmp**: 用于存储临时文件，系统重启后这些文件通常会被删除。
>
> **/usr**: 包含用户的二进制文件、库文件、文档等资源。`/usr/bin`、`/usr/lib`、`/usr/share` 等都在这个目录下。
>
> **/var**: 存储经常发生变化的文件，比如日志文件、邮件队列、临时文件等。
>
> **/bin**: 包含基本的用户命令的二进制文件，例如 `ls`、`cp` 等。通常系统启动时所需的命令都在此目录下。
>
> **/lib**: 包含基本的共享库文件和内核模块。系统启动时所需的库文件通常在此目录下。
>
> **/lib32**: 32 位系统的库文件目录，用于兼容 32 位程序。
>
> **/lib64**: 64 位系统的库文件目录，用于 64 位程序。
>
> **/libx32**: x32 ABI（应用二进制接口）的库文件目录，提供与 `x86-64` 兼容的 32 位地址空间。
>
> **/sbin**: 包含系统管理员使用的二进制文件，如 `fdisk`、`ifconfig` 等，这些工具主要用于系统管理和维护。

## 包管理工具 apt 的使用

首先说明一下，包管理工具在 Linux 操作系统中的存在，就类似于应用商店在手机上的存在。我们可以利用包管理工具 安装、卸载、更新   我们的软件。在 Linux 的 Ubuntu 发行版中，使用 apt 包管理工具进行软件管理。接下来介绍一下其基本命令。

### 命令

#### 更新软件包列表

其实是更新每一个软件包对应的版本号，而非真正更新了软件。原理大概类比于手机端提示更新（一定是最新版），但是服务器不会实时更新软件的最新版编号（因为没有实时联网），因此需要我们手动更新获取所有软件的最新版本编号，从而可以后续真正意义上的软件更新。

```bash
apt update
```

#### 更新软件包

更新全局软件包到最新版本

```bash
apt upgrade
```

#### 安装软件包

安装指定的软件包

```bash
apt install <PackageName>
```

#### 删除软件包

删除指定的软件包

```bash
apt remove <PackageName>
```

### 补充

#### sudo 命令前缀

sudo 的全称是 superuser do，即**超级用户执行**。命令之前加上 `sudo` 的意思是普通用户以管理员身份执行指令，从而以管理员权限执行比如：安装软件、系统设置和文件系统等安全操作。可以避免不必要的安全风险。

### 参考

<https://runkodo.com/post/如何在linux中安装和管理软件包：一个完全的初学者>

<https://www.runoob.com/linux/linux-comm-apt.html>

## 修改终端语言

报错英文看不懂？提示英文看不懂？搜索查询太费事？直接解决终端语言！接下来将介绍在 Linux 的 Ubuntu 22.04 上修改终端语言的操作。

### 命令

### 安装中文语言包

```bash
apt install language-pack-zh-hans
```

### 添加中文语言支持

```bash
locale-gen zh_CN.UTF-8
```

### 修改 locale 文件配置地域

```bash
vim /etc/default/locale

LANG="zh_CN.UTF-8"
LANGUAGE="zh_CN:zh:en_US:en"
LC_NUMERIC="zh_CN.UTF-8"
LC_TIME="zh_CN.UTF-8"
LC_MONETARY="zh_CN.UTF-8"
LC_PAPER="zh_CN.UTF-8"
LC_IDENTIFICATION="zh_CN.UTF-8"
LC_NAME="zh_CN.UTF-8"
LC_ADDRESS="zh_CN.UTF-8"
LC_TELEPHONE="zh_CN.UTF-8"
LC_MEASUREMENT="zh_CN.UTF-8"
LC_ALL=zh_CN.UTF-8
```

重启

```bash
reboot
```

### 参考

<https://blog.csdn.net/BobYuan888/article/details/88662779>
