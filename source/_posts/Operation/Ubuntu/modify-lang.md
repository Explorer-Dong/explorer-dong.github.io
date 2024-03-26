---
title: modify-lang
categories:
  - Operation
  - Ubuntu
category_bar: true
---

# Ubuntu 修改终端语言

## 前言

报错英文看不懂？提示英文看不懂？搜索查询太费事？直接解决终端语言！接下来将介绍在 Linux 的 Ubuntu 22.04 上修改终端语言的操作。

## 操作

安装中文语言包

```bash
sudo apt-get install language-pack-zh-hans
```

添加中文语言支持

```bash
locale-gen zh_CN.UTF-8
```

修改locale文件配置

```bash
vim /etc/default/locale

LANG="zh_CN.UTF-8"
LANGUAGE="zh_CN:zh:en_US:en"
LC_NUMERIC="zh_CN.UTF-8"
LC_TIME="zh_CN.UTF-8"
LC_MONETARY="zh_CN.UTF-8"
LC_PAPER="zh_CN.UTF-8"
LC_IDENTIFICATION="zh_CN.UTF-8"
LC_NAME="zh_CN.UTF-8"
LC_ADDRESS="zh_CN.UTF-8"
LC_TELEPHONE="zh_CN.UTF-8"
LC_MEASUREMENT="zh_CN.UTF-8"
LC_ALL=zh_CN.UTF-8
```

重启

```bash
reboot
```

## 参考

https://blog.csdn.net/BobYuan888/article/details/88662779