# Data Base

## Info

### 学习资源

- 学习路线：[数据库学习路线 - 阿里云](https://developer.aliyun.com/learning/roadmap/database)

## 前言

全栈开发之数据库学习。

## 一、ElasticSearch

### 1.1 ELK组件

<img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402140034845.png" alt="image-20230604104859769" style="zoom:67%;" />

### 1.2 正向索引与倒排索引

<img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402140034124.png" alt="image-20230604111402280" style="zoom:50%;" />

正向索引

1. 存储结构：按照每一个信息段，整条存储为一个文档

2. 搜索形式：根据用户输入的词条在存储的每一个文档中进行匹配，记录符合的id信息

倒排索引

1. 存储结构：首先将每一个信息段进行语义分割（中文按照词义，英文按照空格），然后将每一个分割的单元创建唯一的文档，同时记录原始文档的 ID（数据量小可以用哈希表，数据量大可以用 B+ 树实现）
2. 搜索形式：首先将用户输入的进行语义分割，将分割出来的所有关键词进行倒排索引，拿一个分割出来的单词举例->首先将这个单词在文档中进行检索（盲猜 $O(1)$，比如 $term[华为]$，就可以检索了，然后记录返回值，即相应的文档 id 即可）

个人小结

1. 感觉正向索引就相当于朴素遍历，而倒排索引就是舍弃存储空间建立一个哈希表，最后根据哈希值进行用户展示
2. 最终未能选择 es 作为数据，转而使用 mysql

### 1.3 技术框架

1. Flask 作为 Web 框架，处理前端请求和后端逻辑
2. Elasticsearch 作为数据库，存储诗文数据
3. 使用 Flask-SQLAlchemy 作为 ORM，连接 Elasticsearch
4. 使用 HTML、CSS、JavaScript 等前端技术展示搜索结果

### 1.4 ElasticSearch 与 MySQL 的协同关系

<img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402140034125.png" alt="image-20230604113740076" style="zoom: 67%;" />

## 二、MySQL

### 2.1 简介

MySQL是一款目前较为流行的关系型数据库

### 2.2 架构

<img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402140034126.png" alt="image-20231222160504794" style="zoom:67%;" />

- `schema` 是架构的意思，可以理解为项目名，即一个项目一个 `schema`
- `tables` 为自动生成的文件夹，其中包含很多个 `table`
- `table` 就是用户自定义的二维表，其中含有字段与相关的信息

### 2.3 Terminal Command