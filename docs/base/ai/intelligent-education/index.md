---
title: 智慧教育导读
---

本文记录智慧教育课程的学习笔记。

成绩组成：考勤，实验，大作业。

## 知识图谱

知识图谱的主要技术（按执行顺序）：

1. 知识抽取：从非结构化数据中提取结构化的数据，例如「实体、关系和属性」，现在市面上有很多成熟的提取 Pipeline，大多都是基于深度模型；
2. 知识表示/嵌入：将上述提取出来的结构化数据（比如三元组。其实是有结构的非结构化数据，因为都是文本）表示为向量。Translate 系列模型详见 [知识图谱嵌入的Translate模型汇总：TransE, TransH, TransR, TransD - (mp.weixin.qq.com)](https://mp.weixin.qq.com/s/2YbfL_1_SyM4wNozyaj4lw)；
3. 知识融合：解决不同源的知识之间的冲突，比如解决共指消解（同一个实体的属性指向了多个内容）、实体对齐（不同的表述但其实是相同的含义）等；
4. 知识推理：在上述三布构建出的知识图谱上进行推理任务，旨在发现图中的潜在知识关联或者补全图谱。可以借助图论知识进行推理，也可以借助上述第二步得到的嵌入向量进行推理。

## 推荐系统

[datawhalechine/fun-rec - (github.com)](https://github.com/datawhalechina/fun-rec/)

## 图神经网络

[Paper - SIGIR 2020 - LightGCN: Simplifying and Powering Graph Convolution Network for Recommendation - (arxiv.org)](https://arxiv.org/abs/2002.02126)

[Survey - TNNLS 2020 - A Comprehensive Survey on Graph Neural  Networks - (arxiv.org)](https://arxiv.org/pdf/1901.00596)
