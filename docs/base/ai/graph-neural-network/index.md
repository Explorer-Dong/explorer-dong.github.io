---
title: 图神经网络导读
status: new
---

本文记录图神经网络的学习笔记，主要的下游任务是推荐系统。实际课程名为《智慧教育》。

成绩组成：考勤，实验，大作业。

一些资料如下：

- 《推荐系统入门教程》 [^fun-rec]；
- 《A Comprehensive Survey on Graph Neural  Networks》 [^tnnls]；

[^fun-rec]: [datawhalechine/fun-rec - (github.com)](https://github.com/datawhalechina/fun-rec/)
[^tnnls]: [A Comprehensive Survey on Graph Neural  Networks | TNNLS 2020 - (arxiv.org)](https://arxiv.org/pdf/1901.00596)

## 数据

图数据主要由知识图谱组成，关于知识图谱的主要技术（按执行顺序）如下：

1. 知识抽取：从非结构化数据中提取结构化的数据，例如「实体、关系和属性」，现在市面上有很多成熟的提取 Pipeline，大多都是基于深度模型；
2. 知识表示/嵌入：将上述提取出来的结构化数据（比如三元组。其实是有结构的非结构化数据，因为都是文本）表示为向量。常见的就是 Translate 系列模型 [^trans]；
3. 知识融合：解决不同源的知识之间的冲突，比如解决共指消解（同一个实体的属性指向了多个内容）、实体对齐（不同的表述但其实是相同的含义）等；
4. 知识推理：在上述三布构建出的知识图谱上进行推理任务，旨在发现图中的潜在知识关联或者补全图谱。可以借助图论知识进行推理，也可以借助上述第二步得到的嵌入向量进行推理。

[^trans]: [知识图谱嵌入的 Translate 模型汇总：TransE, TransH, TransR, TransD - (mp.weixin.qq.com)](https://mp.weixin.qq.com/s/2YbfL_1_SyM4wNozyaj4lw)

## 模型

### LightGCN

![LightGCN 网络结构示意图](https://cdn.dwj601.cn/images/20250508084029371.png)

/// fc
LightGCN 网络结构示意图
///

LightGCN [^lightgcn] 是中科大于 2020 年提出的一款基于图卷积神经网络的 SOTA 推荐模型。

[^lightgcn]: [LightGCN: Simplifying and Powering Graph Convolution Network for Recommendation | SIGIR 2020 - (arxiv.org)](https://arxiv.org/abs/2002.02126)

## 损失

Recall

NDCG
