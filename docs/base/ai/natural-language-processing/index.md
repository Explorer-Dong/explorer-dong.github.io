---
title: 自然语言处理导读
---

本文记录自然语言处理的入门笔记。部分内容参考：CS 224N [^cs-224n] [^cs-224n-video] 、Dive into Deep Learning [^d2l]。

[^cs-224n]: [CS 224N HomePage | Stanford - (web.stanford.edu)](https://web.stanford.edu/class/cs224n/index.html)
[^cs-224n-video]: [CS 224N Video | GPT 中英字幕课程资源 - (www.bilibili.com)](https://www.bilibili.com/video/BV1U5RNYgEfp)
[^d2l]: [自然语言处理 | d2l - (zh.d2l.ai)](https://zh.d2l.ai/chapter_natural-language-processing-pretraining/index.html)。

> 平时 10%，作业+实验 40%，期末 50%。

自然语言处理 (Natural Language Processing, NLP) 是人工智能研究的一个子领域，核心任务是利用「基于人类自然语言的文本数据」完成「预测、生成」等下游任务。NLP 的主要研究内容如下图所示：

![NLP 的主要研究内容](https://cdn.dwj601.cn/images/20250303083104252.png)

本专题的内容编排主要按照 NLP 的研究范式进行：

- 第一范式：基于传统机器学习方法进行监督学习。该部分将会简单提及，但不会详细展开；
- 第二范式：基于深度神经网络模型进行监督学习。该部分将会介绍 [静态词嵌入](./word2vector.md)、[序列分类任务](./sequence-classification.md)、[序列生成任务](./sequence-generation.md) 三个部分；
- 第三范式：基于预训练+微调的方式进行自监督+监督学习。该部分将会介绍一些具有里程碑意义的 [预训练](./pre-training.md) 范式。
