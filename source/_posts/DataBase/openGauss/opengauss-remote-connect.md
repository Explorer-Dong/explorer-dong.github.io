---
title: openGauss 远程连接
categories:
  - 数据库
  - openGauss
category_bar: true
---

## 问题阐述

由于 openGauss 数据库不允许使用默认用户（默认叫做 omm）进行远程连接，因此我们不得不创建一个新的用户进行连接。但是连接后总是警告说没有权限访问 pg_user 表并且无法查看和操作数据库中的任何信息。

## 解决方案

由于新创建的用户权限很低，为了能够在远程连接后达到和数据库系统默认用户几乎一致的权限，我们使用下面的语句对新用户进行权限提升：

```sql
alter user <user_name> with SYSADMIN;
```

这样就可以进行任意级别的对象进行图形化的增删改查操作。

## 参考文章

<https://docs.opengauss.org/zh/docs/5.0.0-lite/docs/DatabaseAdministrationGuide/管理员.html>

https://chatgpt.com/share/673031aa-b46c-8002-88b6-9ab1d80afa5c
