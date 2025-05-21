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

图像超分辨率 (Image super-resoltion, SR) 顾名思义就是将低分辨率图像转化到高分辨率图像的过程。可以简单地理解为全局放大。

传统超分方法在 [数字图像处理](../digital-image-processing/index.md#__tabbed_1_2) 中有过介绍，根据算法的不同分为「最近邻插值、双线性插值和双三次插值」共三种。但随着深度学习技术的成熟，基于深度学习的超分性能已经显著优于传统方法。本文将全方位展开基于深度学习方法的图像超分策略。

## 数据

首先需要明确的一点就是，超分肯定是有监督策略，即同时需要一张图像的「低分 (LR) 和高分 (HR)」图像对，自然条件下肯定是很难获得的，但是我们可以很容易地构造出这样的图像对。

具体地，这里以退化核已知的构造方法为例。将原始图像看作高分图像 (HR)，然后通过双三次插值对 HR 进行下采样即可得到低分辨率 (LR) 图像。

因此超分的数据集很容易获得，只要来点高分辨率图像就行了，常见用来做超分任务的数据集有：Set5、Set14、Urban100、BSD100、Manga109 等，名称最后的数字就表示该数据集的图像数量。这些数据都可以在 huggingface 上找到。

## 评价

在得到超分辨率图像 (SR) 后，我们需要对其进行量化评价，人工评价的方法固然可行，但是在大规模数据集上肯定不可取，这就需要一些自动评价方法。常用的有以下两种评价指标。

### PSNR

峰值信噪比 (Peak Signal-to-Noise Ratio, PSNR)

### SSIM

结构相似性 (Structural SIMilarity, SSIM)

## SRCNN

SRCNN [^srcnn] 是利用深度学习方法进行图像超分的开山之作。

[^srcnn]: Dong C, Loy C C, He K, et al. Learning a deep convolutional network for image super-resolution[C]//Computer Vision–ECCV 2014: 13th European Conference, Zurich, Switzerland, September 6-12, 2014, Proceedings, Part IV 13. Springer International Publishing, 2014: 184-199.

![论文中的 SRCNN 网络结构](https://cdn.dwj601.cn/images/20250518094113352.jpg)

/// fc
论文中的 SRCNN 网络结构
///

文中首先将 LR 利用双三次插值上采样得到了 input，接着按照上图的结构：

- 首先是一个 $f_1\times f_1$ 卷积 + ReLU 激活操作，学习提取 LR 特征的非线性映射函数；
- 然后是一个 $f_2\times f_2$ 卷积 + ReLU 激活操作，学习从 LR 特征到 HR 特征的非线性映射函数；
- 最后是一个 $f_3\times f_3$ 卷积操作，学习从 HR 特征重构到 HR 的线性映射函数。

![SRCNN 网络结构解析](https://cdn.dwj601.cn/images/20250518100657841.png)

/// fc
SRCNN 网络结构解析
///

可以看出 SRCNN 仅包含卷积层且全部都是等宽卷积，不包含池化层和全连接层。整个网络的 PyTorch 代码如下：

```python
class SRCNN(nn.Module):
    def __init__(self) -> None:
        super(SRCNN, self).__init__()
        # 1. ILR 特征提取层
        self.features = nn.Sequential(
            nn.Conv2d(1, 64, (9, 9), (1, 1), (4, 4)),
            nn.ReLU(True)
        )
        # 2. 非线性映射层
        self.map = nn.Sequential(
            nn.Conv2d(64, 32, (5, 5), (1, 1), (2, 2)),
            nn.ReLU(True)
        )
        # 3. SR 重构层
        self.reconstruction = nn.Conv2d(32, 1, (5, 5), (1, 1), (2, 2))
        
        # 随机初始化模型权重
        self._initialize_weights()
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        out = self.features(x)
        out = self.map(out)
        out = self.reconstruction(out)
        return out
```

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
