---
title: openGauss 基础
categories: 
  - 数据库
  - openGauss
category_bar: true
---

## 前言

起因是学校的数据库课程需要使用关系型数据库 openGauss 进行教学，那便研究研究，顺便做个笔记。

官方网站：[openGauss 官方网站 | openGauss 主页 | openGauss 社区官网](https://opengauss.org/zh/)

## 安装与配置

### 硬件支持

- 虚拟机：腾讯云 2 核 2 G 3Mbps 轻量应用服务器（提前放通 5432 安全组便于后期的 SSH 连接）
- 操作系统：CentOS 7.6 64bit
- SSH 工具：Mobaxterm Personal Edition v24.0 Build 5204

### 下载安装包

由于只需要单节点服务，因此我们选择下载 openGauss 5.0.3 (LTS) 轻量版。

![安装包选择](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202409192052001.png)

我们登录后获取轻量版下载链接，进入 shell 连接云服务器，在合适的位置创建并进入目录。我使用的是 `/opt/dbLearning` 目录，使用 wget 命令下载安装包至云服务器。

![使用 wget 命令下载安装包至云服务器](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202409192106221.png)

### 配置安装环境

> 可能是出于安全考虑，openGauss 不允许使用 root 用户运行，因此我们有必要创建普通用户并对一些必要的目录基于必要的权限；同时，目前 openGauss 只能在防火墙关闭的状态下安装，因此我们也不得不关闭防火墙。

创建普通用户 dbuser：

- 创建用户

    ```bash
    sudo useradd dbuser
    ```

- 删除用户

    ```bash
    sudo userdel -r dbuser
    ```

- 为新建的用户 dbuser 设置密码

    ```bash
    sudo passwd dbuser
    ```

![创建普通用户 dbuser](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202409192242731.png)

创建数据库安装包解压目录、安装目录、数据目录：

```bash
sudo mkdir -p /opt/dbLearning/install_package /opt/dbLearning/installation /opt/dbLearning/data
```

赋予目录权限：

```bash
# 将这三个目录的所有者设置为用户 dbuser
sudo chown -R dbuser:dbuser /opt/dbLearning/install_package /opt/dbLearning/installation /opt/dbLearning/data

# 确保 dbuser 用户对这些目录有读、写、执行权限
sudo chmod -R 750 /opt/dbLearning/install_package /opt/dbLearning/installation /opt/dbLearning/data
```

关闭防火墙：

- 查看防火墙状态：

    ```bash
    systemctl status firewalld
    ```

- 关闭防火墙：

    ```bash
    systemctl stop firewalld.service
    ```

- 开启防火墙：

    ```bash
    systemctl start firewalld.service
    ```

![关闭防火墙](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202409192242146.png)

### 执行安装

切换到普通用户 dbuser 的权限：

```bash
su - dbuser
```

解压压缩包至安装包目录：

```bash
tar -zxf openGauss-Lite-5.0.3-CentOS-x86_64.tar.gz -C install_package/
```

![解压压缩包至安装包目录](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202409192242065.png)

进入 `./install_package/` 路径并执行 `install.sh` 进行安装：

```bash
sh ./install.sh --mode single -D /opt/dbLearning/data -R /opt/dbLearning/installation/
```

![部分安装成功后的输出信息](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202409192243793.png)

需要输入密码并二次确认。

### 启停数据库

在普通用户 dbuser 下，使用刚才安装下来的 `gs_ctl` 命令行工具启停 openGauss 数据库。

启动 openGauss：

```bash
gs_ctl start -D /opt/dbLearning/data
```

停止 openGauss：

```bash
gs_ctl stop -D /opt/dbLearning/data
```

重启 openGauss：

```bash
gs_ctl restart -D /opt/dbLearning/data
```

### 测试连接


现在我们已经可以在 shell 终端使用 openGauss 独有的命令行工具 `gsql` 进行连接与管理了：

注：初次连接时，dbname 使用缺省值 `postgres`，username 就是安装 openGauss 时的用户名 `dbuser`（这一点很抽象，直接拿操作系统的用户名作为数据库管理系统的用户名 🤣）。若直接在服务器上连接数据库时，端口和主机可以不填。

```bash
gsql -d <dbname> -U <username> -p <port> -h <host>
```

进入数据库管理系统后，输入 `\l` 看到所有的数据库就表明安装配置成功了！

![显示所有的数据库](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202409192243905.png)

### 连接 DataGrip

> 仅仅使用自带的命令行工具进行管理有点麻烦，故尝试与本地的 DataGrip 数据库图形化管理软件进行连接。

首先，我们需要修改数据库的配置文件，允许非 localhost 也可以访问数据库。

- 新增 pg_hba.conf 文件两条信息：

    ```bash
    host all all 10.0.4.14/32 md5
    host all all 0.0.0.0/0   md5
    ```

- 启用 postgresql.conf 中的密码加密并将加密方式改为 md5，顺便将监听端口设置为 '*'：

    ```bash
    password_encryption_type = 0
    
    listen_address ='*'
    ```

- 重启 openGauss：

    ```bash
    gs_ctl restart
    ```

注：openGauss 不允许使用数据库超级用户进行远程连接，因此我们不得不在连接数据库后创建新的数据库管理员，假设就叫 user1。

- 使用默认数据库进行连接：

    ```bash
    gsql -d postgres -U dbuser
    ```

- 创建新的数据库管理用户：

    ```sql
    CREATE USER user1 IDENTIFIED BY '<password>';
    ```

最后使用本地的 DataGrip 使用 postgre 内核连接服务器的 openGauss 数据库就可以成功了！

![远程连接成功](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202409201140997.png)

并且从 [官方 SQL 的用法](https://docs-opengauss.osinfra.cn/zh/docs/5.0.0-lite/docs/SQLReference/CREATE-USER.html) 来看，使用 CREATE 会在连接的数据库下创建一个与用户名相同的 schema，很诡异但的确如此：

![自动创建一个与用户名相同的 schema](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202409201144556.png)

### 参考

[文档地图 > 安装指南 > 安装概述](https://docs-opengauss.osinfra.cn/zh/docs/5.0.0-lite/docs/InstallationGuide/安装概述.html)

[Centos7 添加删除用户和用户操作命令_centos7 删除用户命令](https://blog.csdn.net/qq_40833874/article/details/120686852)

报错解决：[修改 SEMMNI 解决 openguass 报错](https://chatgpt.com/share/66ed13f8-b2a8-800a-b6fc-f3cdd51e69f5)

报错解决：[gaussdb 启动报错 gs_ctl: invalid data in pid](https://www.modb.pro/db/5980)

报错解决：[pg 启动异常 FATAL: could not open lock file "/tmp/.s.PGSQL.5432.lock": Permission denied_pg could not open lock file](https://blog.csdn.net/sunshinepx/article/details/90635833)

[文档地图 > 工具与命令参考 > 系统内部命令 > gs_ctl](https://docs-opengauss.osinfra.cn/zh/docs/5.0.0-lite/docs/ToolandCommandReference/gs_ctl.html)

[最全 IDEA、Navicat、DataGrip 连接 openGauss 数据库_datagrip opengauss](https://blog.csdn.net/m0_73646990/article/details/139360136)

## 基本命令

### 参考

[华为 openGauss 数据库命令大全：一站式掌握核心运维操作_opengauss 命令](https://blog.csdn.net/yangqjiayou/article/details/137050247)

[openGauss 数据量管理指南：管理数据库安全-管理用户及权限](https://www.cnblogs.com/openGauss-bot/articles/18267596)