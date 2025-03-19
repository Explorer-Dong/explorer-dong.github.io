---
title: Windows 配置指南
---

对一些 Windows 11 上常见问题和需求进行自定义配置。

## 使用微软输入法快捷输入「」符号

Windows 上默认的微软输入法挺好用的，至少不会出现兼容性问题，关于系统自带的输入法配置方法，可以进入设置中以下路径自己探索：

![微软输入法配置路径](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250319125259528.png)

/// fc
微软输入法配置路径
///

而配置打出角标的方法，其实就是自定义一个短语。我们进入「词库和自学习」一栏，找到「用户定义的短语」，点击「添加或编辑自定义短语」之后自己按照习惯配置一下就可以了：

![按照自己的习惯定义角标符号的快捷键](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250319125648827.png)

/// fc
按照自己的习惯定义角标符号的快捷键
///

## 删除文件打开选项中失效的选项

进入 `计算机\HKEY_USERS\<SID>\Software\Classes\Applications` 路径，删除已经失效的应用即可。其中 SID 可以使用以下命令查找：

```bash
wmic useraccount get name,sid
```

我的计算机输出结果如下：

![终端输出结果](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250319124515341.png)

/// fc
终端输出结果
///

那么注册表中我寻找的路径就是：

![我的注册表中的寻找路径](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250319124608769.png)

/// fc
我的注册表中的寻找路径
///



