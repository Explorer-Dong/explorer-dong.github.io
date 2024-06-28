---
title: kill-windows-process
categories:
  - Operation
  - ShellBasic
category_bar: true
---

# 在 Windows OS 上杀死指定端口的进程

## 指令

用 `netstat` 命令行工具查找指定端口的进程 PID（进程提示符）

```shell
netstat -ano | findstr <port>
```

终止查找到的进程

- 手动终止：用 `tasklist` 命令行工具查找 PID 背后的运行应用，然后在 Windows 的终端管理器中手动关闭

    ```shell
    tasklist | findstr <PID>
    ```

- 命令终止：用 `taskkill` 命令行工具强制终止指定的进程

    ```shell
    # 写法一
    taskkill -PID <PID> -F
    
    # 写法二
    taskkill /F /PID <PID>
    ```

## 演示

![windows 上杀死进程的指令](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403271023326.png)