---
title: 目标检测
---

![目标检测效果图](https://cdn.dwj601.cn/images/20250408101017350.png)

/// caption
目标检测最终效果图（三要素：框、类别、置信度）
///

本文介绍计算机视觉中的目标检测 (Object Detection) 任务。部分内容参考：

- [Paper - MTA2022 - A survey: object detection methods from CNN to transformer](https://link.springer.com/article/10.1007/s11042-022-13801-3)
- [Paper - Proc. IEEE2023 - Object Detection in 20 Years: A Survey](https://arxiv.org/pdf/1905.05055)

## 基本原理

目标检测可以分解为「定位 + 分类」两个子任务。考虑到图像分类已经在上一章介绍过了，因此本章我们重点关注目标定位。

### 框的概念

**框的称呼**。有各种说法，比如：边界框、检测框、锚框，但无论哪种说法，本质上就是一个包裹对象的矩形边界罢了。当然其中的锚框一般定义为以某个像素为中心的框。

**框的定义**。一个框可以用两种方式定义：

- 中心点坐标 $(x,y)$ 与框的宽 $w$ 与高 $h$，用四元组表示为 $(x,y,w,h)$；
- 左上角的点坐标 $(x_1,y_1)$ 与右下角的点坐标 $(x_2,y_2)$，用四元组表示为 $(x_1,y_1,x_2,y_2)$。

**交并比**。为了量化预测框与真实框之间的差异，定义了交并比 (Intersection over Union, IoU) 这个概念。一图胜千言：

![交并比计算示意图](https://cdn.dwj601.cn/images/20250408102137628.png)

/// fc
交并比计算示意图
///

**非极大值抑制**。在对图像进行预测输出时，模型可能会输出很多预测框，为了简化输出，我们需要筛选出最合适的预测框，为此我们引入非极大值抑制 (non‐maximum suppression, NMS) 算法。定义待输出的预测框列表为 $L$，定义每个预测框中类别的预测概率为置信度，NMS 算法流程如下：

1. 给 $L$ 按照置信度降序排序；
2. 取出 $L$ 中置信度最大的预测框 $B_1$，枚举剩余所有的预测框 $B_i (i\neq 1)$，从 $L$ 中去除与 $B_1$ 的交并比超过阈值 $T$ 的检测框；
3. 重复步 $2$ 直到所有检测框都被遍历到。

一句话总结就是只保留交并比相近的检测框中，置信度最大的那一个。算法输入为检测框列表、置信度列表和 IoU 阈值，算法输出为最终的检测框列表与置信度列表。

### 性能度量

目标检测任务需要人为预先标记真实框 (ground-truth bounding box)，那么就可以很方便地与模型输出的预测框进行对比，从而量化模型的性能。综合性比较强的度量指标为平均精度 (Average Precision, AP)，其中的四个组成部分与二分类的混淆矩阵类似，只不过定义略有不同：

- TP：预测框与真实框的 IoU 达到了阈值，预测类别与真实类别相同；
- FP：预测框与真实框的 IoU 没达到阈值，预测类别与真实类别相同；
- FN：没有被匹配的真实框数量；
- TN：不包含目标的预测框数量（由于这类数量很多，一般不看）。

可以看出 AP 其实就是一个类别的 ROC 曲线下的 AUC 面积。最后可以给所有类别的 AP 取一个均值得到平均精度均值 (mean Average Precision, mAP)。

## 经典模型

![[目标检测 - 历史发展图](https://link.springer.com/article/10.1007/s11042-022-13801-3)](https://cdn.dwj601.cn/images/20250408113117212.png)

/// fc
[目标检测 - 历史发展图](https://link.springer.com/article/10.1007/s11042-022-13801-3)
///

### Seletive Search

!!! tip
    下面开始介绍两阶段目标检测算法。

### RCNN

### SPPNet

### Fast RCNN

### Faster RCNN

[Paper - NeurIPS 2015 - Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks](https://arxiv.org/pdf/1506.01497)

[一文读懂 Faster RCNN - (zhihu.com)](https://zhuanlan.zhihu.com/p/31426458)

![Faster RCNN 网络结构](https://cdn.dwj601.cn/images/20250415090902170.jpg)

/// fc
Faster RCNN 网络结构
///

Faster RCNN 提出了区域候选网络 (Region Proposal Network, RPN) 策略，用以替代 SS 算法。RPN 提出了锚点的概念：特征图中的「一个元素」都对应了原始图像的「一个感受野区域」，该区域的中心像素称为锚点 (Anchor) ，以锚点为中心按一定的纵横比 (ratio) 和尺度 (scale) 绘制的框称为锚框 (Anchor box)。

!!! tip
    下面开始介绍单阶段目标检测算法。

### YOLO



### SDD

!!! tip
    下面开始介绍基于 Transformer 的目标检测算法。

### DETR

## 小目标检测

## 开放词汇目标检测
