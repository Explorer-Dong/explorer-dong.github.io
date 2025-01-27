---
title: ElasticSearch 基础
categories:
  - 数据库
  - ElasticSearch
category_bar: true
---

## 前言

## ELK 组件

![ELK 组件](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402140034845.png)

## 正向索引与倒排索引

![正向索引与倒排索引](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402140034124.png)

正向索引

1. 存储结构：按照每一个信息段，整条存储为一个文档

2. 搜索形式：根据用户输入的词条在存储的每一个文档中进行匹配，记录符合的 id 信息

倒排索引

1. 存储结构：首先将每一个信息段进行语义分割（中文按照词义，英文按照空格），然后将每一个分割的单元创建唯一的文档，同时记录原始文档的 ID（数据量小可以用哈希表，数据量大可以用 B+ 树实现）
2. 搜索形式：首先将用户输入的进行语义分割，将分割出来的所有关键词进行倒排索引，拿一个分割出来的单词举例-> 首先将这个单词在文档中进行检索（盲猜 $O(1)$，比如 $term[\text{华为}]$，就可以检索了，然后记录返回值，即相应的文档 id 即可）

个人小结

1. 感觉正向索引就相当于朴素遍历，而倒排索引就是舍弃存储空间建立一个哈希表，最后根据哈希值进行用户展示
2. 最终未能选择 es 作为数据，转而使用 mysql

## ElasticSearch 与 MySQL 的协同关系

![ElasticSearch 与 MySQL 的协同关系](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402140034125.png)