---
title: 图像超分
---

本文简单介绍一种底层图像任务：图像超分辨率 [^s1] [^s2] [^s3] [^s4] [^s5]。

[^s1]: Yang W, Zhang X, Tian Y, et al. Deep learning for single image super-resolution: A brief review[J]. IEEE Transactions on Multimedia, 2019, 21(12): 3106-3121.
[^s2]: Wang Z, Chen J, Hoi S C H. Deep learning for image super-resolution: A survey[J]. IEEE transactions on pattern analysis and machine intelligence, 2020, 43(10): 3365-3387.
[^s3]: Lepcha D C, Goyal B, Dogra A, et al. Image super-resolution: A comprehensive review, recent trends, challenges and applications[J]. Information Fusion, 2023, 91: 230-260.
[^s4]: Chen H, He X, Qing L, et al. Real-world single image super-resolution: A brief review[J]. Information Fusion, 2022, 79: 124-145.
[^s5]: Al-Mekhlafi H, Liu S. Single image super-resolution: a comprehensive review and recent insight[J]. Frontiers of Computer Science, 2024, 18(1): 181702.

## 基本概念

图像超分辨率 (Image super-resoltion, SR) 顾名思义就是将低分辨率图像转化到高分辨率图像的过程。低分辨率与高分辨率的区别就在于高分辨率图像的像素点更多，因此视觉效果上高分辨率图像的尺寸就更大，同时也更清晰。

传统的方法在 [数字图像处理](../digital-image-processing/index.md) 中有过策略介绍，即：最近邻插值、双线性插值和双三次插值。但随着深度学习技术的成熟，基于深度学习的超分性能已经显著优于传统方法。

## 数据

基于深度学习的图像超分在拥有原始图像的基础上，需要对应的低分辨率图像共同作为训练数据，这种数据对肯定是不容易直接获取的，这就需要我们手工构造这样的数据对。常规的方法就是将原始图像 (HR) 下采样得到低分辨率 (LR) 的结果。

## SRCNN

SRCNN [^srcnn] 是利用深度学习进行 SR 任务的开山之作，仅包含卷积层，不包含池化层和全连接层。

[^srcnn]: Dong C, Loy C C, He K, et al. Learning a deep convolutional network for image super-resolution[C]//Computer Vision–ECCV 2014: 13th European Conference, Zurich, Switzerland, September 6-12, 2014, Proceedings, Part IV 13. Springer International Publishing, 2014: 184-199.

## 更窄的网络

SRCNN 的网络第一步通过插值将 LR 图像转化为 ILR，使得网络参数量很大，并且这有着很强的假设在里面，即默认退化核是插值的逆过程。能否直接在 LR 上学习呢？答案是可以的。

### FSRCNN

FSRCNN [^fsrcnn] 网络有以下几个特点：

1. TODO

[^fsrcnn]: Dong C, Loy C C, Tang X. Accelerating the super-resolution convolutional neural network[C]//Computer Vision–ECCV 2016: 14th European Conference, Amsterdam, The Netherlands, October 11-14, 2016, Proceedings, Part II 14. Springer International Publishing, 2016: 391-407.

### ESPCN

ESPCN [^espcn] 网络有以下几个特点：

1. TODO

[^espcn]: Shi W, Caballero J, Huszár F, et al. Real-time single image and video super-resolution using an efficient sub-pixel convolutional neural network[C]//Proceedings of the IEEE conference on computer vision and pattern recognition. 2016: 1874-1883.

## 更深的网络

我们知道，一般情况下，只要能解决梯度消失和梯度爆炸问题，网络越深则性能越强，为此更深的网络被提了出来。

### VDSR

VDSR [^vdsr] 网络主要有以下几个特点：

1. 结构上：采用了 VGG Net 的思想，以块为单位搭建网络，并采用残差连接的策略防止梯度爆炸/消失；
2. 训练上：为了进一步提高训练速度，VDSR 采用了更大的学习率，同时使用「梯度裁剪」以避免梯度爆炸问题
3. 训练上：采用了多尺度训练策略。

[^vdsr]: Kim J, Lee J K, Lee K M. Accurate image super-resolution using very deep convolutional networks[C]//Proceedings of the IEEE conference on computer vision and pattern recognition. 2016: 1646-1654.

### SRGAN

SRGAN [^srgan] 网络有以下几个特点：

1. TODO

[^srgan]: Ledig C, Theis L, Huszár F, et al. Photo-realistic single image super-resolution using a generative adversarial network[C]//Proceedings of the IEEE conference on computer vision and pattern recognition. 2017: 4681-4690.

### EDSR

EDSR [^edsr] 网络有以下几个特点：

1. TODO

[^edsr]: Lim B, Son S, Kim H, et al. Enhanced deep residual networks for single image super-resolution[C]//Proceedings of the IEEE conference on computer vision and pattern recognition workshops. 2017: 136-144.

## 特定的网络

上述所有网络都尝试从通用网络的角度来完成超分的任务，能否结合超分任务的特点针对性的设计网络结构和损失函数呢？答案可以的。

- 稀疏与非局部相似性先验：SCN [^scn]、NLSN [^nlsn]；
- 渐进式超分：DEGREE [^degree]、LapSRN [^lapsrn]、PixelSR [^pixelsr]；
- 基于重构：ZSSR [^zssr]、IRCNN [^ircnn]。

[^scn]: Wang Z, Liu D, Yang J, et al. Deep networks for image super-resolution with sparse prior[C]//Proceedings of the IEEE international conference on computer vision. 2015: 370-378.
[^nlsn]: Mei Y, Fan Y, Zhou Y. Image super-resolution with non-local sparse attention[C]//Proceedings of the IEEE/CVF conference on computer vision and pattern recognition. 2021: 3517-3526.
[^degree]: Yang W, Feng J, Yang J, et al. Deep edge guided recurrent residual learning for image super-resolution[J]. IEEE Transactions on Image Processing, 2017, 26(12): 5895-5907.
[^lapsrn]: Lai W S, Huang J B, Ahuja N, et al. Deep laplacian pyramid networks for fast and accurate super-resolution[C]//Proceedings of the IEEE conference on computer vision and pattern recognition. 2017: 624-632.
[^pixelsr]: Dahl R, Norouzi M, Shlens J. Pixel recursive super resolution[C]//Proceedings of the IEEE international conference on computer vision. 2017: 5439-5448.
[^zssr]: Shocher A, Cohen N, Irani M. “zero-shot” super-resolution using deep internal learning[C]//Proceedings of the IEEE conference on computer vision and pattern recognition. 2018: 3118-3126.
[^ircnn]: Zhang K, Zuo W, Gu S, et al. Learning deep CNN denoiser prior for image restoration[C]//Proceedings of the IEEE conference on computer vision and pattern recognition. 2017: 3929-3938.

## 评价

在得到超分辨率图像 (SR) 后，我们需要对其进行量化评价，人工评价的方法固然可行，但是在大规模数据集上肯定不可取，这就需要一些客观评价方法。常见的客观评价指标又根据是否参考原始图像分为全参考和无参考。

### PSNR

TODO

### SSIM

TODO
