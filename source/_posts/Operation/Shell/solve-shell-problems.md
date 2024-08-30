---
title: solve-shell-problems
categories:
  - Operation
  - Shell
category_bar: true
---

## 解决 shell 相关问题

## 在 Windows OS 上杀死指定端口的进程

### 指令

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

### 演示

![windows 上杀死进程的指令](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403271023326.png)

## 解决 windows powershell 编码错误

进来使用 windows powershell 时发现会出现奇怪的中文编码错误。有些语句可以正常显示中文，有些则不行，查阅后发现了一个好方法可以解决这个问题，如图：

进入 `> 控制面板 > 时钟和区域` 目录，并将复选框选中：

![详细操作顺序如图所示](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406282333554.png)

操作完成后重启即可正常显示中文！

参考：[解决Windows PowerShell 乱码](https://www.cnblogs.com/woods1815/p/14023352.html)