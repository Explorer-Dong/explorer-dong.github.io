---
title: CLion 配置指南
---

## 自动加载 CMake 更改

> 适用于文件更新频繁的场景。

![勾选自动加载CMake更改](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407311200790.png)

## 单文件编译运行

> 为了保存算法竞赛时每一场比赛的每一道题目代码，需要单文件编译运行。下载 C/C++ Single File Execution 插件使用即可。

![C/C++ Single File Execution](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407311205580.png)

每次创建新文件时右键选择：为单文件添加可执行文件。

![为单文件添加可执行文件](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407311207733.png)

看到 CMakeLists.txt 文件中就新增了一个 `add_executable` 栏，而不是继续在原来的 `main.cpp` 下面添加可执行文件目录。

![新增了一个 add_executable 栏](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407312357483.png)

## 配置代理服务

> 加速插件更新、全局更新等操作。

进入 `Settings >> Appearance & Behavior >> System Settings >> HTTP Proxy`，如下：

![进入代理设置界面](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403032127859.png)

选择 Manual proxy configuration，选择 HTTP 选项，输入主机名（如果是配置本地电脑 `127.0.0.1` 或者 `localhost` 均可），输入代理服务商提供的代理端口号，我的是 Clash Verge，如下：

![Clash Verge 端口查询界面](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403032127860.png)

连接 Google 或 Github 等外网进行测试，如下：

![连接 Google 或 Github 等外网进行测试](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403032127861.png)

测试连接成功，那么配置就成功了，如下：

![测试连接成功](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403032127862.png)
