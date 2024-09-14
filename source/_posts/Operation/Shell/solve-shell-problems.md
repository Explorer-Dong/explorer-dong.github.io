---
title: solve-shell-problems
categories:
  - Operation
  - Shell
category_bar: true
---

## 解决 shell 相关问题

本文记录一些 bash shell 的使用问题。

## 终止占用指定端口的进程

### windows 使用 git bash

查找占用指定端口的进程 PID：

```bash
netstat -ano | grep :<port>
```

根据 PID 杀死所有的进程：

```bash
taskkill /PID <PID> /F
```

一行解决：

```bash
taskkill /PID $(netstat -ano | grep :<port> | awk '{print $5}') /F
```

### ubuntu 使用 bash

查找占用指定端口的进程 PID：

```bash
sudo lsof -i :<port>
```

根据 PID 杀死所有的进程：

```bash
sudo kill -9 <PID>
```

一行解决：

```bash
sudo kill -9 $(sudo lsof -t -i :<port>)
```

## 解决 PowerShell 编码错误的问题

近来使用 windows powershell 时出现了中文编码错误的问题。有些中文可以正常显示，有些则不行，查阅后发现了一个好方法可以解决这个问题，如图：进入 `> 控制面板 > 时钟和区域` 目录，并将复选框选中：

![操作顺序](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406282333554.png)

操作完成后重启即可正常显示中文！

参考：[解决Windows PowerShell 乱码](https://www.cnblogs.com/woods1815/p/14023352.html)