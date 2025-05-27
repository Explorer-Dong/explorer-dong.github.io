---
title: 动作识别
---

## 动作识别定义

假设时序长度为 $T$ 的视频表示为 $X = x_1, x_2, \cdots , x_T$，其中 $x_i$ 表示第 $i$ 帧图像。定义动作标签集合 $c\in C$，其中每个 $c$ 表示一个特定的动作类别。

动作识别 (Action Recognition) 任务可以看作是一个分类问题，其目标是找到一个映射函数 $f$，该函数将 $X$ 映射到动作标签集合 $C$ 中的一个标签：$f: X \to C$。

## 数据

UCF-101

HMDB-51

## 评价

Clip Hit@k：从视频中提取多个片段 (clip)，每个片段独立预测，统计所有 clip 的 Top-k 准确率。

Video Hit@k：将同一个视频的多个 clip 的预测结果进行聚合，统计所有 video 的 Top-k 准确率。

## 早期做法

一种做法是将图像的特征融合为视频的特征 [^early-cnn] ，直接的融合方式可分为以下三种：

[^early-cnn]: Karpathy A, Toderici G, Shetty S, et al. Large-scale video classification with convolutional neural networks[C]//Proceedings of the IEEE conference on Computer Vision and Pattern Recognition. 2014: 1725-1732.

- 早期融合 (Early fusion)
- 晚期融合 (Late fusion)
- 缓慢融合 (Slow fusion)

![将图像的特征融合为视频的特征](https://cdn.dwj601.cn/images/20250527125604034.png)

![实验结果](https://cdn.dwj601.cn/images/20250527125838198.png)

缓慢融合方式在网络内部逐渐融合相邻帧的信息，取得了最好的效果。但融合了时序信息的效果并没有显著优于基于静态图像的效果，说明基于 2D 卷积的网络难以有效提取运动信息。

## 引入光流的网络

为了让模型捕捉到不同帧之间的关系，需要引入物体运动的信息，光流就是物体运动的一种量化表示方式。

### 光流的定义

TODO

### 双流网络

为了让网络更好地利用运动信息，双流网络 (Two-stream convolutional network) [^two-stream] 引入了光流 (Optical flow) 信息。

[^two-stream]: Simonyan K, Zisserman A. Two-stream convolutional networks for action recognition in videos[J]. Advances in neural information processing systems, 2014, 27.

![双流网络结构示意图](https://cdn.dwj601.cn/images/20250527130316523.png)

![实验结果](https://cdn.dwj601.cn/images/20250527130526231.png)

实验结果表明：

- 基于手工特征的 IDT 在当时取得了最高的准确率；
- 缓慢融合方式距离 IDT 差距明显；
- 双流网络的效果虽然弱于 IDT，但是充分验证了深度学习用于视频动作识别的可行性。

### 基于双流网络的改进

如何设计池化层以理解更长时序的动作。论文阅读 [^two-stream-approve1]。

如何融合双流信息以增强模型的性能。论文阅读 [^two-stream-approve2]。

如何设计网络使能够处理更长时序的视频：时序片段网络 (Temporal Segment Network, TSN) [^tsn] 将视频划分为不同的片段，然后综合各个片段的分类结果。

[^two-stream-approve1]: Yue-Hei Ng J, Hausknecht M, Vijayanarasimhan S, et al. Beyond short snippets: Deep networks for video classification//Proceedings of the IEEE conference on computer vision and pattern recognition. 2015: 4694-4702.
[^two-stream-approve2]: Feichtenhofer C, Pinz A, Zisserman A. Convolutional two-stream network fusion for video action recognition//Proceedings of the IEEE conference on computer vision and pattern recognition. 2016: 1933-1941.
[^tsn]: Wang L, Xiong Y, Wang Z, et al. Temporal segment networks: Towards good practices for deep action recognition[C]//European conference on computer vision. Springer, Cham, 2016: 20-36.

## 基于 3D 卷积的网络

## 基于 Transformer 的网络

## 总结
