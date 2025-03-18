---
title: 图像分类
---

## LeNet

1998 年，LeCun 提出了用于手写数字识别的 LeNet-5 网络，标志着卷积神经网络的开端：

- 7 层网络，60K 参数量；
- 使用 sigmoid 激活函数，softmax 作为分类器。

![LeNet 网络结构示意图](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250318080954165.png)

## AlexNet

2012 年，Krizhevsky 在 ILSVR 2012 上提出了 AlexNet 网络：

- 8 层网络，60M 参数量；
- 使用 ReLU 激活函数。

特点：

- 为了覆盖更多的像素，网络的第一层使用了 11x11 的卷积核；
- 使用 ReLU 激活函数，加快模型收敛速度并缓解梯度消失问题；
- 在全连接层采用 **随机失活**（Dropout）策略缓解过拟合问题，提升模型的泛化性；
- 采用 **数据增强技术**（Data augmentation）增强数据集，包括翻转（flipping），裁剪（cropping），颜色变换（color changes），避免过拟合问题；

![AlexNet 网络结构示意图](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250318084540355.jpg)

![随机失活](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250318084352125.png)

![数据增强](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250318084441623.png)

## VGGNet

牛津大学的视觉几何组（Visual Geometry Group）在 ILSVR 2014 上提出了 VGG-16 网络：

- 16 层网络，138M 参数量。

特点：

- 使用基本模块构造网络，这一思想已成为深度卷积神经网络的主要构建方法；

- 使用两个较小的卷积核代替一个大的卷积核，更少的参数却具有相同的感受野，同时能增强非线性表达能力和特征提取能力；

    提出了 **多尺度训练**（Multi-Scale training）的数据增强方式，在一定范围内随机缩放输入图像，再随机裁剪出 224x224 的训练图像；

- 测试时将全连接层转换为卷积层，避免了测试图像尺寸必须为 224x224 的限制。

!!! tip "模型缺点"
    LeNet、AlexNet 和 VGG 采用相同的思想构建网络：通过堆叠卷积层提取并融合图像的空间特征，将其展平为一维向量后利用全连接层完成分类。此过程会产生以下问题：展平的过程中会丢弃一部分空间信息、全连接层的参数量过大。

## NiNNet

Network-in-Network（NiN）网络提出了微型神经网络的概念（Micro neural network），将卷积层和 MLP 结合的 Mlpconv 作为网络的基本块。

特点：

- Mlpconv 中的全连接层采用 1x1 的卷积核；
- 提出全局平均池化操作（Global average pooling） ， 可以直接将最后的卷积层的通道数设置为类别数。

## GoogLeNet

2014 年，谷歌团队借鉴了 NIN 的思想，在 ILSVR2014 上提出了 GoogLeNet：

- 22 层网络， 6.8M 参数量。

特点：

- 提出了 Inception V1 模块；
- 添加了辅助分类器，提高模型训练速度，缓解梯度消失问题；
- 使用 GAP 代替全连接层，但通道数不等于类别数，所以仍需要一个全连接层。

Inception V1。GoogLeNet 希望能够同时在深度和宽度上拓展网络，但是又要避免参数量过大的问题，因此提出了 Inception V1 模块。其特点为：

- 通过 4 路并行的方式增加神经网络的宽度，同时提升模型对不同尺度的适应性；
- 利用 1x1 卷积减少通道数，减少参数量。

神经网络中深层的神经元高度依赖于浅层的神经元，导致网络的深层可能一直在适应浅层网络更新导致的数据分布的变化。GoogLeNet 将这一问题称为 **内部协变量偏移**（Internal Covariate Shift）。该问题可能导致：

- 需要谨慎设置学习速率，使得训练速度更慢；
- 梯度下降过程中可能不稳定，导致收敛困难；
- 受模型初始参数的影响。

Inception V2。特点：使用批标准化（BN）层。解决了内部协变量偏移的问题，同时提高了网络的训练速度。

![训练阶段的算法流程图，测试阶段使用整个训练过程中的均值和标准差](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250318084842090.png)

其他标准化层：

- Batch norm：每个 **mini-batch** 的数据进行归一化处理，常用于图像相关任务；
- Layer norm：对 **每个样本** 的所有通道进行归一化处理，常用于处理序列数据；
- Instance norm：对 **每个样本的每个通道** 进行归一化处理，常用于风格迁移任务；
- Group norm：对 **每个样本的每组通道** 进行归一化处理。

Inception V1 的后续改进：

- 空间可分离卷积：将 5x5 的卷积核替换成 2 个 3x3 的卷积核，减少参数量、将 nxn 的卷积核替换成 1 个 1xn 和 1 个 nx1 的卷积核，减少参数量；
- 并行卷积和池化：并行执行卷积操作（步长为 2）和池化操作，避免表示瓶颈或计算量过大的问题。

!!! tip "网络退化"
    大量工作证明，网络越深则性能越强。但是当网络的层数超过 20 层时，继续加深网络反而会使其性能下降。原因并非过拟合或梯度消失/爆炸，而是 **网络退化**（Network degradation）。

## ResNet

ResNet 模型引入了跳跃连接（Skip connection）的概念，让模型学习输入与目标输出之间的残差，而不是直接预测目标输出。即我们希望学习出来的 F(x) 趋近于 0，这解决了网络深度过大时出现的网络退化问题。

![ResNet 网络结构示意图](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250318091046475.png)

ResNet 模型还引入了类似漏斗的 bottleneck 结构，由以下三部分组成：

- 降维的 1x1 卷积核：减少通道数；
- 常规的 3x3 卷积核：特征融合；
- 升维的 1x1 卷积核：还原通道数。

bottleneck 结构可有效减少参数量，增强模型的表达能力。先压缩再还原。

![bottleneck 结构](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250318091412771.png)

## DenseNet

深度卷积神经网络仍面临着梯度消失的问题，这严重影响了网络的训练。DenseNet 网络在每一层和其后续层之间都建立了前向连接，因此每层都可以直接得到来自损失函数的梯度信息。

![DenseNet 网络结构示意图](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250318091917382.png)

!!! tip "Attention for CNNs"
    视觉注意力机制是人类视觉所特有的大脑信号处理机制，更关注视野中感兴趣的信息，而抑制其他无用信息。常见的注意力机制：通道注意力机制（Channel attention）、空间注意力机制（Spatial attention）。

## SENet

