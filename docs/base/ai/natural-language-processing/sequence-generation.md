---
title: 序列生成
---

序列生成常见的任务有：机器翻译、内容生成等。早期：基于规则、中期：基于统计、现在：基于神经网络。任务目标就是输入 $x$ 输出 $y$，建立的模型就是 $p(y\mid x)$。

## 基于统计方法

由于 $p(x)$ 是已知的，根据乘法原理，可以将原来的建模方式等价于为 $p(x\mid y)\cdot p(y)$，其中 $p(x\mid y)$ 是反向翻译模型，$p(y)$ 是语言模型，统计机器学习方法需要分别训练这两个模型。

给定 $t-1$ 个单词的序列，预测第 $t$ 个单词。建模方式是使用条件概率公式：

$$
p(\mid y_{t-1})
$$

## 以 RNN 为基座

2015 年，斯坦福 NLP 实验室在 EMNLP 上发表了一篇名为《Effective Approaches to Attention-based Neural Machine Translation》 [^rnn-nmt-paper] 的文章，其介绍了一种基于 RNN 的神经网络翻译模型，开启了神经机器翻译的时代。

[^rnn-nmt-paper]: [Effective Approaches to Attention-based Neural Machine Translation | Stanford NLP - (aclanthology.org)](https://aclanthology.org/D15-1166.pdf)

![传统的 Encoder-Decoder 架构](https://cdn.dwj601.cn/images/20250428083440132.png)

/// fc
基于 RNN 的 seq2seq 模型架构
///

### Encoder 部分

利用任意一种模型将输入语句编码为「单一」向量 $h_0$。

### Decoder 部分

在使用 RNN 作为解码器时，训练和测试阶段的模型输入是不一样的：

- 测试阶段：隐藏状态的输入是上一个时间步的输出；
- 训练阶段：隐藏状态的输入不取决于上一个时间步的输出，而是正确答案对应的单词。

上述测试阶段的解码器每一步只选择当前最优的输出，这种贪心策略显然不一定是最优的，为此研究人员提出了 beam search 策略。具体地，其含有一个超参数 $K$，在编码阶段，保存每一个隐藏状态的前 $K$ 个最优预测单词，之后就按照 $K$ 叉树的形式基于前一个状态生成的 $K$ 个输出得到 $K \times K$ 个输出，以此类推。最后按照某种度量标准选择所有输出序列中最优的那一条即可。

1）Attention 机制

![基于 Attention 机制的 Encoder-Decoder 架构](https://cdn.dwj601.cn/images/20250428101226957.png)

/// fc
基于 Attention 机制的 Encoder-Decoder 架构
///

**编码器**。对于所有的输入 token，编码结果就是一组 values。

**解码器**。每一个时间步的输出就是一个 query，根据该 query 和 values 计算注意力权重（点积缩放）从而得到最终 values 的加权和（用 softmax 算一下），最后将加权和的向量表示与 query 一起得到当前时间步的输出，作为下一个时间步的输入向量。

**优点**。有如下几点：

- 翻译效果更好：通过使用注意力机制，模型可以学习到全局关系，并且缓解了梯度消失问题，从而提升了翻译的效果；
- 可解释性更好：相较于统计方法的硬对齐方法（只有对应与不对应），使用注意力机制其实就算一种软对齐（按照权重对应）。由于每一个时间步都可以计算每一个输入 token 与所有输入 token 之间的是注意力权重，那么就可以算出一个对齐矩阵，该矩阵完全是模型根据数据学习到的对齐结果。

2）Attention 进阶

上述思路都是针对单一句子进行的，如果涉及到更大规模的语料，就需要对注意力的计算方法进行一定的魔改。

### 小结

缺点：可解释性差、可控性差、因数据产生偏见、上下文保持困难、对训练集的规模要求高、对未见数据泛化性能差。

热点：可以利用其他模态增强文本模态、做垂直领域、基于预训练模型做微调。

## 以 Transformer 为基座

2017 年，Google 团队发表在 NIPS 上的一篇《Attention is all you need》 [^atten-paper] 替换了上述 RNN 结构，解决了 RNN 不能并行计算的问题。

[^atten-paper]: [Attention Is All You Need | Google - (arxiv.org)](https://arxiv.org/pdf/1706.03762)

<img src="https://cdn.dwj601.cn/images/20250512083359691.jpg" alt="Transformer 模型架构" style="zoom: 50%;" />

/// fc
Transformer 模型架构
///

可以看到 Transformer 的模型架构也是 Encoder-Decoder 架构。下面详细讲解两部分网络结构。

### Encoder 部分

由「多头注意力」和「前馈网络」两部分组成。

### Decoder 部分

由「掩码多头注意力」、「多头注意力」和「前馈网络」三部分组成。

## 性能度量

BLUE：

ROUGH：
