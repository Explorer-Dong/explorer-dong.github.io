---
title: solve-windows-powershell-encode-error
categories:
  - Operation
  - ShellBasic
category_bar: true
---

# 解决 windows powershell 编码错误

进来使用 windows powershell 时发现会出现奇怪的中文编码错误。有些语句可以正常显示中文，有些则不行，查阅后发现了一个好方法可以解决这个问题，如图：

进入 `> 控制面板 > 时钟和区域` 目录，并将复选框选中：

![详细操作顺序如图所示](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406282333554.png)

操作完成后重启即可正常显示中文！

参考：[解决Windows PowerShell 乱码](https://www.cnblogs.com/woods1815/p/14023352.html)