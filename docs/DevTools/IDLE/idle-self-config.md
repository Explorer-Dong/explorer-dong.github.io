---
title: IDLE 偏好配置
---

## 前言

由于连续两届篮球杯都是 CA 省二，迫于加分压力不得不转 PA 组（其实是摸鱼不刷题导致的）。阅读篮球杯 py 组手册后发现只能使用 3.8.6 版本且编辑器只能用自带的 IDLE，故特此记录一下相关配置，顺便说点题外话

## 编写文件

在双击快捷方式后会弹出一个 shell 窗口，支持简单的交互式编码：

![快捷方式](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406091642746.png)

我们点击左上角的 File 即可进行新建或打开 `.py` 文件的操作：

![新建 or 打开](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406091647404.png)

## 修改样式

在 shell 或编辑界面中均有 Options 选项，点击后进行个性化定制：

![Options 选项](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406091647404.png)

「字体部分」选择 consoles 字体、13 号大小、4 个标准空格的 tab：

![选择 consoles 字体、13 号大小、4 个标准空格的 tab](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406091649022.png)

「高亮部分」选择 New 主题：

![选择 New 主题](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406091650602.png)

「快捷键」部分，可修改运行模块快捷键为 Ctrl+F5 从而和 CLion 对应，当然也可以保持默认的 F5：

![修改运行模块快捷键为 Ctrl+F5 从而和 CLion 对应](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406091651415.png)

## 题外话

为什么直接点击 `pythonw.exe` 无法打开 IDLE？说实在的困扰好久了，因为这个原因就没打开过所谓的 python 自带的编辑器，惭愧。搜遍 Google 和 Baidu 都未能找到准确的答案，比较多的是：因为 pythonw.exe 就没打算让你双击打开它，所以只能通过快捷方式打开？？？

## upd

正如底部评论所言，`pythonw` 可以理解为一个命令行工具，那显然就不是用来双击打开的。与 `python demo.py` 表示运行 `demo.py` 文件逻辑类似，`pythonw demo.pyw` 表示运行 `demo.pyw` 文件。比如这个目录下的 `.pyw` 文件：`D:\Program Files\Python38\Lib\idlelib\idle.pyw`，我们在任意位置运行下方命令：

```bash
pythonw "D:\Program Files\Python38\Lib\idlelib\idle.pyw"
```

即可弹出对应 `.pyw` 窗口文件的内容：

![pythonw运行测试](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406171020868.gif)

至于其中的解释器版本，尽管打开的 `python3.8` 对应的窗口文件，但是由于使用的 `pythonw` 工具是系统环境变量对应的 `python3.11` 版本，因此显示的解释器版本也就是 `python3.11`