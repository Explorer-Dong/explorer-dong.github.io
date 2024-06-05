---
title: py-print-model-path
categories:
- BackEnd
- pyBasic
category_bar: true
---

## 查看本地库的安装位置

由于本地安装了多个 python 解释器，所以想要打印某个版本的解释器下载的「包或模块」的路径，整理一下大约有两种方法

### 一、使用模块内置方法

如果模块内置了 `__file__` 方法，则可以直接打印出来：

```python
import numpy as np

print(np.__file__)
```

![直接打印](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406052305698.png)

### 二、基于 pip 方法

有些库没有内置上述 `__file__` 方法，可以使用 pip 指令进行打印：

```bash
pip show <PackgeName or ModelName>
```

例如想要打印 `sortedcontainers` 包的安装路径：

```bash
pip show sortedcontainers
```

![使用 pip 指令进行打印](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406052310960.png)

### 参考

[如何查看安装的python库的位置](https://blog.csdn.net/C_chuxin/article/details/82960824)