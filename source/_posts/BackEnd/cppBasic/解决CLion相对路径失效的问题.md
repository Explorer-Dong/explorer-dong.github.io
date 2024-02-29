---
title: solve-clion-cannot-open-relative-file
categories: BackEnd
category_bar: true
---

问题描述：在使用 CLion 进行文件路径索引时，出现文件无法打开的现象，如图：

![无法打开文件](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402292258802.png)

我们使用 `cstring` 库的 `strerror()` 函数检测一下问题：

![使用 cstring 库的 strerror() 函数检测问题](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402292258397.png)

可以发现是未找到文件。因为在 CLion 中相对路径索引的起始根默认为 `cmake-build-debug` 文件夹，故无法找到。

解决方法有三个：

- 跳出 `cmake-build-debug` 文件夹再进行索引，即路径设置为 `"../test.txt"`

- 使用绝对路径

- 修改项目的默认根目录为当前文件夹，如图：进入 $Run \to Edit\ Configurations$

    ![修改项目的默认根目录为当前文件夹](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402292258745.png)

    ![配置路径](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402292258092.png)

$End$
