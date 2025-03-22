---
title: Python 环境配置
---

本文记录 Python 相关的配置方法。

## 查看 Python 库的安装位置

由于本地安装了多个 Python 解释器，想要打印某个版本的解释器下载的「包或模块」的路径，整理一下大约有两种方法。

如果模块内置了 `__file__` 方法，则可以直接打印出来。比如下面的程序：

```python
import numpy as np

print(np.__file__)
```

![直接打印的运行结果](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406052305698.png)

/// fc
直接打印的运行结果
///

有些库没有内置上述 `__file__` 方法，可以使用 pip 工具进行打印。语法规则如下：

```bash
pip show <PackgeName or ModelName>
```

例如想要打印 `sortedcontainers` 包的安装路径：

```bash
pip show sortedcontainers
```

![基于 pip 工具的运行结果](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406052310960.png)

/// fc
基于 pip 工具的运行结果
///

## 打开 VSCode 时自动在终端激活 Python 的虚拟环境

打开用户设置 json 文件。加一行下面的配置即可：

```json
"python.terminal.activateEnvInCurrentTerminal": true,
```

不过奇怪的是使用 VSCode 创建虚拟环境后虽然在终端显示了确实是对应的虚拟环境，但是使用诸如 `which pip` 或 `which python` 后，显示的都是默认的路径而非虚拟环境对应的路径。使用 Pycharm 在当前路径创建虚拟环境就可以正常识别出来（VSCode 轻量但是问题比较多，Pycharm 笨重但是可以确保没问题）。

## 自动生成项目依赖文件 requirements.txt

**场景一：单一虚拟环境**。如果当前环境仅为当前项目独有，使用下面的命令即可：

```bash
pip freeze > requirements.txt
```

**场景二：基础环境**。如果当前环境并非独属于当前项目，使用上述命令会生成很多与当前项目无关的依赖包，推荐使用 [`pipreqs`](https://github.com/bndr/pipreqs) 包，可以自动搜索独属于当前项目依赖的包。

```bash
# 安装
pip install pipreqs

# 生成
pipreqs ./ --encoding=utf8 --force
```

当然，如果要基于 requirements.txt 文件安装依赖，使用下面的命令即可：

```bash
pip install -r requirements.txt
```

## 修复安装 Python 时出现 Error 0x80070422 和 Error 0x80070643

本质原因是之前没有按照官方程序卸载 Python。需要到注册表里彻底删掉对应的文件，在下面的三个路径下一一尝试，删除对应的版本的 Python 文件即可：

- `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall`
- `HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall`
- `HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall`
