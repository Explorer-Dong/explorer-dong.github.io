---
title: 序列分类
---

序列分类常见的任务有：依存分析、命名实体识别、情感识别等。

## 依存分析

依存分析任务定义为：判断句子中单词之间的依赖关系。属于基础任务中的句法分析，通过依存分析任务得到句子单词之间的依赖关系之后就可以更方便的进行机器翻译等更困难的任务。

### Word2Vector

为了将自然语言更加合理的进行向量表示。相比于 One-Hot 向量表示方法，训练出一个分布式词向量模型可以获得更好的向量表示，从而支持后续的下游任务。

最具影响力的词向量模型就是 Word2Vec，后续的 glove 模型又补充了分布式向量的距离度量方法。

<!-- 这里讲的理论基础并不是语言学上的规则（不同的语言有不同的规则，且很复杂，这里不展开），而是一套规范化的算法流程。最常见的就是 Nivre 在 2003 年提出的「Greedy Deterministic Transition-based Parsing」方法。

具体地，有三个变量分别为 Stack、Buffer 和 一个集合 A。一共有三种操作，分别为 shift、left-arc、right-arc，其中 shift 就是将一个单词从 Buffer 转移到 Stack 中，left-arc 就是在 Stack 的栈顶两个元素中定义一个「指向左的边以及对应的依存关系」，并将这个边和关系保存到集合 A 中，right-arc 就和 left-arc 相反。具体如下图所示：

![Transition-based Parsing 示例](https://cdn.dwj601.cn/images/20250317084734245.png)

假设某种语言一共有 $n$ 种依存关系，那么最终的任务就是一个 $2n+1$ 的「多分类任务」。其中 left-arc 对应 $n$ 种，right-arc 对应 $n$ 种，shift 对应 $1$ 种。

在有监督学习场景下，学习准则就是最小化交叉熵损失函数。传统与现代依存分析方法本质的不同在于特征的构造上。 -->

1）传统方法

传统方法上，TODO。

2）深度模型

Danqi Chen 在 2014 年的工作 《A Fast and Accurate Dependency Parser using Neural Networks》[^依存分析] 中，提出了基于 FNN 的深度神经网络模型进行端到端的依存分析，解决了传统方法中特征需要人工构造、特征稀疏（0 太多）和特征不紧凑（维度太大）的问题。

[^依存分析]: [A Fast and Accurate Dependency Parser using Neural Networks | Danqi Chen - (aclanthology.org)](https://aclanthology.org/D14-1082)

## 命名实体识别

### LSTM

前馈神经网络和循环神经网络已在 [深度学习](../deep-learning/index.md) 课程笔记中详细展开，此处不再赘述。直接切入长短时记忆 (Long Short-term Memory, LSTM) 网络。

TODO

## 情感识别

### Transformer

TODO

### PreTrained

TODO

### PostTrained

TODO
