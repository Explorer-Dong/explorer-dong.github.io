---
title: openGauss 导入数据
categories:
  - 数据库
  - openGauss
category_bar: true
---

## 前言

本文简单介绍一下如何利用 gsql 将数据批量导入 openGauss。

## 1 环境

- 操作系统：CentOS 7.6 64bit
- 数据库管理软件（含版本号）：openGauss 5.0.3 (LTS) 轻量版
- 其他工具：Mobaxterm Personal Edition v24.0 Build 5204、DataGrip v2024.1.3

## 2 流程

### 2.1 创建表

首先登录 openGauss 并 [创建数据库](https://docs-opengauss.osinfra.cn/zh/docs/5.0.0-lite/docs/BriefTutorial/创建数据库.html) experiment 用于后续表的设计。

![创建数据库 experiment](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202410122259262.png)

然后进入 experiment 数据库并 [创建学生表](https://docs-opengauss.osinfra.cn/zh/docs/5.0.0-lite/docs/BriefTutorial/创建表.html) student。设置学号 `sno char(8)`、姓名 `sname char(10)`、性别 `ssex char(2)`、年龄 `sage integer(3)` 四个属性。

![创建学生表 student](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202410122300081.png)

最后以防万一，检查一下当前数据库 experiment 下所有的表以及对应的表结构。使用 `\dt` 命令查看当前数据库下的所有表，使用 `\d <table_name>` 命令查看当前数据库下指定的表结构。

![检查表结构](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202410122300379.png)

### 2.2 构造数据

接下来进行数据的构造和导入工作。在开始构造数据之前，有必要了解一下对应的 [数据格式规范](https://docs-opengauss.osinfra.cn/zh/docs/5.0.0-lite/docs/DatabaseOMGuide/使用gsql元命令导入数据.html)。可以看到是支持 `.csv` 文件的，并且默认将第一行识别为数据而不是表头。因此我设计出了这样的 prompt：

> “请帮我生成一个数据库的学生表的数据。格式为 csv，用逗号分隔符分隔。属性共有 4 个，分别为学号 sno char(8)、姓名 sname char(10)、性别 ssex char(2)、年龄 sage integer(3)。请不要加上表头信息，首行直接从数据开始。生成共 20 条学生信息数据。请将结果直接打印出来。”

最终给出的结果如下：

![GLM4 构造的数据](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202410122301562.png)

我们将上述数据复制到 `/home/dbuser/stu_data.csv` 文件中等待后续的导入工作。

### 2.3 导入数据并测试

我们执行如下 gsql 元命令将数据从本地文件 `std_data.csv` 导入到学生表中。

```postgresql
\copy student from ‘/home/dbuser/stu_data.csv’ with (delimiter’,’);
```

出现报错说性别一栏的长度不够。[修改字段](https://docs-opengauss.osinfra.cn/zh/docs/5.0.0-lite/docs/BriefTutorial/ALTER-TABLE语句.html) `ssex` 属性为 `char(3)` 则可以成功导入。

![成功导入](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202410122301877.png)

## 题外话

- 如果要在 gsql 命令行环境中 [启动上下文记忆模式](https://www.cndba.cn/dave/article/116534)，可以在登录时添加 `-r` 参数。
- 中文字符的字节数默认为 3，因此上述导入数据时第一次会失败，因为设置为了 2。