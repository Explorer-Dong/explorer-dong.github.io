---
title: openGauss 基础操作
---

本文记录 openGauss 数据库的基本操作。官方文档：<https://docs.opengauss.org/zh/>。

## openGauss 远程连接

### 问题阐述

由于 openGauss 数据库不允许使用默认用户（默认叫做 omm）进行远程连接，因此我们不得不创建一个新的用户进行连接。但是连接后总是警告说没有权限访问 pg_user 表并且无法查看和操作数据库中的任何信息。

### 解决方案

由于新创建的用户权限很低，为了能够在远程连接后达到和数据库系统默认用户几乎一致的权限，我们使用下面的语句对新用户进行权限提升：

```sql
alter user <user_name> with SYSADMIN;
```

这样就可以进行任意级别的对象进行图形化的增删改查操作。

### 参考文章

<https://docs.opengauss.org/zh/docs/5.0.0-lite/docs/DatabaseAdministrationGuide/管理员.html>

<https://chatgpt.com/share/673031aa-b46c-8002-88b6-9ab1d80afa5c>

## openGauss 导入数据

简单介绍一下如何利用 gsql 将数据批量导入 openGauss。

### 创建表

首先登录 openGauss 并 [创建数据库](https://docs-opengauss.osinfra.cn/zh/docs/5.0.0-lite/docs/BriefTutorial/创建数据库.html) experiment 用于后续表的设计。

![创建数据库 experiment](https://cdn.dwj601.cn/images/202410122259262.png)

然后进入 experiment 数据库并 [创建学生表](https://docs-opengauss.osinfra.cn/zh/docs/5.0.0-lite/docs/BriefTutorial/创建表.html) student。设置学号 `sno char(8)`、姓名 `sname char(10)`、性别 `ssex char(2)`、年龄 `sage integer(3)` 四个属性。

![创建学生表 student](https://cdn.dwj601.cn/images/202410122300081.png)

最后以防万一，检查一下当前数据库 experiment 下所有的表以及对应的表结构。使用 `\dt` 命令查看当前数据库下的所有表，使用 `\d <table_name>` 命令查看当前数据库下指定的表结构。

![检查表结构](https://cdn.dwj601.cn/images/202410122300379.png)

### 构造数据

接下来进行数据的构造和导入工作。在开始构造数据之前，有必要了解一下对应的 [数据格式规范](https://docs-opengauss.osinfra.cn/zh/docs/5.0.0-lite/docs/DatabaseOMGuide/使用gsql元命令导入数据.html)。可以看到是支持 `.csv` 文件的，并且默认将第一行识别为数据而不是表头。因此我设计出了这样的 prompt：

> “请帮我生成一个数据库的学生表的数据。格式为 csv，用逗号分隔符分隔。属性共有 4 个，分别为学号 sno char(8)、姓名 sname char(10)、性别 ssex char(2)、年龄 sage integer(3)。请不要加上表头信息，首行直接从数据开始。生成共 20 条学生信息数据。请将结果直接打印出来。”

最终给出的结果如下：

![GLM4 构造的数据](https://cdn.dwj601.cn/images/202410122301562.png)

我们将上述数据复制到 `/home/dbuser/stu_data.csv` 文件中等待后续的导入工作。

### 导入数据

我们执行如下 gsql 元命令将数据从本地文件 `std_data.csv` 导入到学生表中。

```postgresql
\copy student from ‘/home/dbuser/stu_data.csv’ with (delimiter’,’);
```

出现报错说性别一栏的长度不够。[修改字段](https://docs-opengauss.osinfra.cn/zh/docs/5.0.0-lite/docs/BriefTutorial/ALTER-TABLE语句.html) `ssex` 属性为 `char(3)` 则可以成功导入。

![成功导入](https://cdn.dwj601.cn/images/202410122301877.png)

### 题外话

- 如果要在 gsql 命令行环境中 [启动上下文记忆模式](https://www.cndba.cn/dave/article/116534)，可以在登录时添加 `-r` 参数。
- 中文字符的字节数默认为 3，因此上述导入数据时第一次会失败，因为设置为了 2。
