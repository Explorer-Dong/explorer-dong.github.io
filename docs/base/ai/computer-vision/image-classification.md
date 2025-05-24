---
title: 图像分类
---

本文以图像分类任务为引，展开 CV 界的一些重大突破。部分参考内容如下：

- [Paper - TPAMI 2022 - Semi-Supervised and Unsupervised Deep Visual Learning: A Survey](https://arxiv.org/pdf/2208.11296)
- [Tramac/paper-reading-note - CLIP - (github.com)](https://github.com/Tramac/paper-reading-note/blob/main/notes/008_clip.md)

## 全监督的图像分类模型

### LeNet

1998 年，LeCun 提出了用于手写数字识别的 LeNet-5 网络，标志着卷积神经网络的开端：

- 7 层网络，60K 参数量；
- 使用 Sigmoid 激活函数、Average 池化、Softmax 分类器。

![LeNet 网络结构示意图](https://cdn.dwj601.cn/images/20250318080954165.png)

### AlexNet

2012 年，Krizhevsky 在 ILSVR 2012 上提出了 AlexNet 网络：

- 8 层网络，60M 参数量；
- 使用 ReLU 激活函数，加快模型收敛速度并缓解梯度消失问题；
- 在全连接层采用随机失活 (dropout) 策略缓解过拟合问题，提升模型的泛化性；
- 采用数据增强技术 (data augmentation) 增强数据集，包括翻转 (flipping)，裁剪 (cropping)，颜色变换 (color changes)，避免过拟合问题；

![AlexNet 网络结构示意图](https://cdn.dwj601.cn/images/20250318084540355.jpg)

### VGG

2014 年，牛津大学的视觉几何组 (Visual Geometry Group) 在 ILSVR 2014 上提出了 VGG-16 网络：

- 16 层网络，138M 参数量；
- 使用基本模块构造网络（这一思想已成为深度卷积神经网络的主要构建方法）；

- 使用两个较小的卷积核代替一个大的卷积核，更少的参数却具有相同的感受野，同时能增强非线性表达能力和特征提取能力；

- 提出了多尺度训练 (Multi-Scale training) 的数据增强方式，在一定范围内随机缩放输入图像，再随机裁剪出 $224\times 224$ 的训练图像；

- 测试时将全连接层转换为卷积层，避免了测试图像尺寸必须为 $224\times 224$ 的限制。

!!! tip "上述模型的缺点"
    LeNet、AlexNet 和 VGGNet 采用相同的思想构建网络，即通过堆叠卷积层提取并融合图像的空间特征，将其展平为一维向量后利用全连接层完成分类。此过程会产生以下问题：1）展平的过程中会丢弃一部分空间信息；2）全连接层的参数量过大。

### NiN

2014年，网络中的网络 (Network-in-Network, NiN) 模型解决了上述网络参数量大的问题，将通道特征作为类别判定依据：

- 基本模块中首先是常规的卷积，然后紧跟两个 $1\times 1$ 的卷积，分类的类别数就是通道数；
- 提出全局最大池化操作 (Global Maximum Pooling)。

### GoogLeNet

2014 年，谷歌团队借鉴了 NiN 的思想提出了 GoogLeNet：

- 22 层网络， 6.8M 参数量；
- 提出了 Inception V1 模块；
- 添加了辅助分类器，提高模型训练速度，缓解梯度消失问题；
- 使用 GAP 代替全连接层，但通道数不等于类别数，所以仍需要一个全连接层。

Inception V1。GoogLeNet 希望能够同时在深度和宽度上拓展网络，但是又要避免参数量过大的问题，因此提出了 Inception V1 模块。其特点为：

- 通过「4 路并行」的方式增加神经网络的宽度，同时提升模型对不同尺度的适应性；
- 利用 $1\times 1$ 卷积减少通道数，减少参数量。

Inception V1 的后续改进：

- 空间可分离卷积：将 $5\times 5$ 的卷积核替换成 $2$ 个 $3\times 3$ 的卷积核，减少参数量、将 $n\times n$ 的卷积核替换成 $1$ 个 $1\times n$ 和 $1$ 个 $n\times 1$ 的卷积核，减少参数量；
- 并行卷积和池化：并行执行卷积操作（步长为 $2$）和池化操作，避免表示瓶颈或计算量过大的问题。

Inception V2。使用批标准化 (Batch Normalize) 策略，解决了「内部协变量偏移」的问题，同时提高了网络的训练速度。

*[内部协变量偏移]: 神经网络中深层的神经元高度依赖于浅层的神经元，导致深层网络可能一直在适应浅层网络的数据分布变化。

其他标准化层：

- Batch norm：对每个 mini-batch 的数据进行归一化处理，常用于图像相关任务；
- Layer norm：对每个样本的所有通道进行归一化处理，常用于处理序列数据；
- Instance norm：对每个样本的每个通道进行归一化处理，常用于风格迁移任务；
- Group norm：对每个样本的每组通道进行归一化处理。

!!! tip "网络退化"
    大量工作证明，网络越深则性能越强。但是当网络的层数超过 $20$ 层时，继续加深网络反而会使其性能下降。原因并非过拟合或梯度消失/爆炸，而是 **网络退化** (Network degradation)。

### ResNet

2016年，何凯明提出的 ResNet 模型引入了跳跃连接 (Skip connection) 的概念，让网络深度不再成为约束。其核心思想是让模型学习输入与目标输出之间的残差，而不是直接预测目标输出，即希望学习出来的 $f(x)$ 趋近于 $0$。这解决了网络深度过大时出现的网络退化问题。

![残差连接示意图](https://cdn.dwj601.cn/images/20250318091046475.png)

ResNet 模型还引入了类似漏斗的 bottleneck 结构，先压缩再还原，有效减少参数量的同时还能增强模型的表达能力。由以下三部分组成：

- 降维的 $1\times 1$ 卷积核：减少通道数；
- 常规的 $3\times 3$ 卷积核：特征融合；
- 升维的 $1\times 1$ 卷积核：还原通道数。

![bottleneck 结构](https://cdn.dwj601.cn/images/20250408130232060.png)

### DenseNet

深度卷积神经网络仍面临着梯度消失的问题，这严重影响了网络的训练。DenseNet 网络在每一层和其后续层之间都建立了前向连接，因此每层都可以直接得到来自损失函数的梯度信息。

![DenseNet 网络结构示意图](https://cdn.dwj601.cn/images/20250318091917382.png)

!!! tip "Attention for CNNs"
    视觉注意力机制是人类视觉所特有的大脑信号处理机制，更关注视野中感兴趣的信息，而抑制其他无用信息。常见的注意力机制：通道注意力机制 (Channel attention)、空间注意力机制 (Spatial attention)。

### SENet

Squeeze-and-Excitation Networks (SENet) 引入了通道注意力机制，利用通道注意力机制使网络关注更重要的通道：

- 压缩 (Squeeze) 模块：利用 GAP 提取每个通道的全局信息；
- 激励 (Excitation) 模块：利用 Sigmoid 函数将全局信息映射到 $[0,1]$，抑制不重要的信息；
- 加权：将激励模块输出的权重加权到每个通道的特征。

![SENet 网络结构示意图](https://cdn.dwj601.cn/images/20250325081933991.png)

### BAM

Bottleneck Attention Module (BAM) 同时引入了通道注意力机制与空间注意力机制：

- 通道注意力机制分支：关注更重要的通道；
- 空间注意力机制分支：关注更重要的空间位置。

结合两个注意力机制可以让模型找到特征图中更重要的信息。当然，容易发现这是一个缝合怪，其实就只提出了一个空间注意力机制，缝合了漏斗结构、通道注意力、残差连接。

![BAM 网络结构示意图](https://cdn.dwj601.cn/images/20250325081937779.png)

## 半监督的图像分类模型

半监督学习定义很清晰，就是结合少量有标记的数据与大量无标记的数据训练模型。

![半监督学习范式](https://cdn.dwj601.cn/images/20250403105628787.png)

半监督学习的学习准则就是最小化模型在有标签数据和无标签数据上的加权损失，其中有标签数据的损失就是常规的比如 KL 散度、交叉熵等等，关键就是如何定义模型在无标签数据上的损失。关于模型在无标签样本上产生的损失，综述中将其总结为了 5 大类，我们只展开其中的前两个，即「一致性正则化」和「自训练」，具体地：

- 一致性正则化就是最小化「同一张图片的不同增强结果在同一个模型上的损失」或/和「同一张图片在不同模型上的损失」。数据增强的方法有很多，比如添加噪声、把不同的图片混合 (Mixup) 等等；
- 自训练就是给无标签数据生成一个伪标签，然后当全监督学习来做。生成伪标签的方法也有很多，比如最小熵法、协同训练法等等。

### MixMatch

[Paper - Neurips 2019 - Mixmatch: A holistic approach to semi-supervised learning](https://proceedings.neurips.cc/paper_files/paper/2019/hash/1cd138d0499a68f4bb72bee04bbec2d7-Abstract.html)

该算法也是一个缝合怪了。算法流程如下图所示：

![MixMatch 算法流程（无标签部分）](https://cdn.dwj601.cn/images/20250403113511832.jpg)

首先用了一致性正则化的方法给一张图片增强除出了 $K$ 个版本，加权平均后通过最小熵法得到伪标签，然后当全监督学习做。

## 无监督的图像分类模型

无监督图像分类任务本质上是为了学习一个能够高效特征提取的 encoder，然后再应用到下游的各种任务（比如图像分类）。所以本节其实是在讨论「预训练任务」。工作范式如下图所示：

![无监督学习的工作范式，上半部分为训练 encoder（主要目的），下半部分为训练 decoder（次要目的）](https://cdn.dwj601.cn/images/20250401080834825.png)

当然，训练的根本是优化模型的损失，在有监督学习任务中，模型的损失很好做，就是预测标签与真实标签之间的差异，在无监督任务中怎么办呢？研究者们想出了各种方法来构造损失，常见的比如「自监督学习」、「对比学习」、「深度聚类」等等，无论哪种方法，本质上都是自定义了一个在无监督任务上的损失计算方法。我们重点讨论前两种方法，具体地：

- 自监督学习 (Self-supervised Learning) 就是自己给图像打一个标签，然后就和监督学习一样了。当然这里的标签不是真实的语义标签，而是一些成本很低的低级语义标签，比如旋转度数、翻转情况、颜色变换等。通过让模型预测这些低级语义的标签，从而让模型可以很好的进行特征提取工作；
- 对比学习 (Contrastive Learning) 认为同一张图像的不同变换具有相同的特征表示。变换图像的成本相较于人工标注的成本就低很多了，基于这种思想，损失函数就被设计为：最小化同一张图片各种变换之间的差异，同时最大化不同图片的各种变换之间的差异。

### MAE

[Paper - CVPR 2022 - Masked Autoencoders Are Scalable Vision Learners](https://openaccess.thecvf.com/content/CVPR2022/papers/He_Masked_Autoencoders_Are_Scalable_Vision_Learners_CVPR_2022_paper.pdf)

掩码自编码器 (Masked Auto Encoder, MAE) 算自监督学习的一个实例。其实是一种很巧妙的想法，其自定义的标签是原始图像中的真实像素值，然后通过掩盖住真实图像的一部分，让模型最小化重构损失。这也被称为像素级的预训练方法。如下图所示：

![像素级预训练方法（以 MAE 为例）](https://cdn.dwj601.cn/images/20250401101812602.png)

当然，还有实例级的预训练方法，即对整张图做一些变换，然后得到自定义的标签。比如旋转、翻转、切分等等。如下图所示：

![实例级预训练方法](https://cdn.dwj601.cn/images/20250402111225265.png)

### SimCLR

[Paper - ICML 2020 - A Simple Framework for Contrastive Learning of Visual Representations](https://dl.acm.org/doi/abs/10.5555/3524938.3525087)

该模型引入了对比学习。假设一个 mini-batch 的大小为 $N$，对于其中的每一张图片 $X_i$，将其变换两次得到 $\overset{\sim} X_{i1},\overset{\sim} X_{i2}$，然后最小化 $\overset{\sim} X_{i1}$ 与 $\overset{\sim} X_{i2}$ 之间的差异，从而让模型学习到所有图片的最佳特征表示。

![训练目标就是其中的 encoder f(·)](https://cdn.dwj601.cn/images/20250402130741486.jpg)

![SimCLR 算法流程](https://cdn.dwj601.cn/images/20250402125013069.jpg)

### CLIP

[Paper - PMLR 2021 - Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/pdf/2103.00020)

OpenAI 在 2021 年开源了一个模型，或者说是一种预训练方法，叫做 Contrastive Language-Image Pre-training，即赫赫有名的 CLIP。同样是对比学习，只不过现在对于一张图片 $X_i$，与其对比的不再是变换的图像，而是一个对应的文本 $T_i$。预训练过程如下图所示：

![CLIP 的过程](https://cdn.dwj601.cn/images/20250403100616837.png)

可以看到，算法思想很简单，就是把图文进行对比学习。假设一个 mini-batch 大小为 $N$，那么学习准则就是最大化 $N$ 对匹配图文的余弦相似度，同时最小化 $N^2-N$ 对不匹配的图文的余弦相似度。牛就牛在数据规模很大，OpenAI 从网上爬了 4 亿对匹配的图文数据对。然后就是基于这么个预训练结果，开始在图像分类任务上刷各种 SOTA 了。比如可以在 zero-shot learning 的情况下媲美监督训练的 SOTA。

当然，基于预训练出来的 Image Encoder 和 Text Encoder 进行 zero-shot learning 时，需要进行一些基本设置。比如在下游的某个有标签的图像分类数据集上进行测试时，需要首先给 Text Encoder 所有的类别标签，然后才能通过 Image Encoder 在已知的所有类别标签上预测出一个概率最大的对应标签结果。

![CLIP 的推理过程](https://cdn.dwj601.cn/images/20250403102255590.png)
