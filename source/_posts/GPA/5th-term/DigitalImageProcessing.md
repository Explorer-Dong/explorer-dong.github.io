---
title: DigitalImageProcessing
categories:
  - GPA
  - 5th-term
category_bar: true
---

## 数字图像处理

## 前言

学科地位：

| 主讲教师 | 学分配额 | 学科类别 |
| :------: | :------: | :------: |
|   李峻   |    3     |  专业课  |

成绩组成：

| 作业 | 实验 | 期中 | 期末 |
| :--: | :--: | :--: | :--: |
| 10%  | 10%  | 30%  | 50%  |

教材情况：

|   课程名称   |               选用教材                | 版次 |     作者      |     出版社     |    ISBN 号     |
| :----------: | :-----------------------------------: | :--: | :-----------: | :------------: | :-----------: |
| 数字图像处理 | 《数字图像处理 使用 MATLAB 分析与实现》 |  2   | 蔡利梅 王利娟 | 清华大学出版社 | 9787302654100 |
|      -       |  《智能图像处理 Python 和 OpenCV 实现》  |  1   | 赵云龙 葛广英 | 机械工业出版社 | 9787111694038 |

为什么要学这门课？

> 图像是数据的一种，图像的应用场景极为广泛，因此如何获取、处理、存储数据也就显得十分重要。在本课程中我们将主要学习图像的处理技术。当然，如果非要说数字图像处理和别的课程的关联，愚以为既然图像是数据，那么就可以用到数据算法那一套上，也就与别的课程有了关联。

会收获什么？

> 图像简单来说就是一个矩阵。如何在这种数据结构上进行理论研究与算法应用显得十分有学习意义。本课程也将使用 MATLAB 和 OpenCV-Python 进行编码实现。

注：

>本课程的代码分为 MATLAB 和 OpenCV-Python。其中：
>
>- MATLAB 版本为 R2023a。官方文档：https://ww2.mathworks.cn/help/images/index.html
>- OpenCV-Python 版本为 4.10.0。官方文档：https://docs.opencv.org/4.10.0/d2/d96/tutorial_py_table_of_contents_imgproc.html

## 图像获取

**如何从现实世界中的模拟图像转化为计算机世界的数字图像**？由于现实世界中的模拟图像是连续的，而计算机无法处理连续数据，因此我们只能对模拟图像进行离散化采样。进而引出了下面的一些概念。

**像素是什么**？一张模拟图像被离散化后的 **最小单元**。

**分辨率是什么**？一张模拟图像被离散化后的 **像素数量**。例如，如果一张模拟图像被划分为由 $2560\times1920$ 个像素点组成的数字图像，那么这张数字图像的分辨率就是像素点的数量，约 500 万。

**在单一变量原则的情况下，分辨率越高，数字图像就越清晰吗**？显然不是。由分辨率的定义，一张图像的分辨率表示图像中像素点的个数。如果 A, B 两张图的分辨率一致，但是 A 图的面积远超过 B，那么显然的 B 比 A 更清晰。因为 A 的一像素对应的信息量太多了，不够精细，也就导致 A 更模糊。因此我们引出了图像清晰度的度量理念。

**如何定义图像的清晰度**？从上面的分析可知，图像的清晰度不是由像素的数量决定的，而是由 [像素的密度](https://zhuanlan.zhihu.com/p/146713168) 决定的。于是引出了以下两种像素密度度量方式：

- PPI 用于描述显示设备（如显示器、手机屏幕等）的分辨率（注：下面的屏幕尺寸是指屏幕对角线的长度）：
    $$
    \text{PPI} = \frac{\sqrt{(\text{水平像素数})^2 + (\text{垂直像素数})^2}}{\text{屏幕尺寸（英寸）}}
    $$

- DPI 用于描述打印设备（如打印机）的分辨率：
    $$
    \text{DPI} = \frac{\text{打印的点数}}{\text{每英寸的距离}}
    $$

**离散化采样出来的数字图像是如何量化表示模拟图像的**？介绍三种，分别是二值图像、灰度图像和彩色图像。其中二值图像中，每一个像素点就是 $0$ 或 $1$，灰度图像中，每一个像素点取值在 $[0,255]$ 之间，彩色图像中每一个像素点是一个三通道向量，$R,G,B$ 的取值均在 $[0,255]$ 之间。

## 图像编码 *

这一部分本课程不作要求，但愚以为这是十分重要的一个部分。

承接上一部分的「图像获取」技术。现在我们有了图像数据，就需要对其进行传输和存储，但是图像的数据量极大，如果不进行压缩编码，必将在传输和存储的过程中造成极大的消耗，因此图像的压缩编码是很重要的。目前主要有两种压缩编码策略，分别是 **无损压缩编码** 和 **有损压缩编码**。

## 图像处理

有了图像数据，我们就可以进行最基本、最底层语义的图像处理，进而才能有后续更高语义上的 **图像分析** 和 **图像理解**。这一部分我们将从图像的各个处理策略入手，分别进行学习。

### 1 图像基本运算

首先需要掌握一些最基本的概念：齐次坐标表示与变换矩阵 $T$、图像插值策略、图像映射策略。以及关于坐标系的注意点。

**关于齐次坐标表示和变换矩阵**。就是将图像中的点 $(x,y)^T$ 用 $(x,y,1)^T$ 来表示。之所以要这样表示，从 [这篇博客](https://blog.csdn.net/wangmj_hdu/article/details/119143771) 可以看出是为了「统一图像变换的运算形式」，但应该没这么简单，可能还有很多别的意义。至于所谓的变换矩阵，其实就是利用矩阵乘法对图像的像素点转换进行格式上的统一运算，所有的变换操作都可以统一为对像素点进行矩阵乘法，例如：对于当前的一个像素点 $p=(x,y,1)^T$ 和一个变换矩阵 $\displaystyle \begin{bmatrix} k_x & b & \Delta x \\ c & k_y &\Delta y \\ p & q & s \end{bmatrix}$。新像素点 $p'=(x',y',1)^T$ 可以通过矩阵乘法 $p'_{3\times 1}=T_{3\times 3} \times p_{3\times 1}$ 得到，即：
$$
\begin{bmatrix} x' \\ y' \\ 1 \end{bmatrix} =
\begin{bmatrix} k_x & b & \Delta x \\ c & k_y &\Delta y \\ p & q & s \end{bmatrix}
\begin{bmatrix} x \\ y\\ 1 \end{bmatrix}
$$
**关于图像插值策略**。常用的有三种，分别是最邻近差值、双线性插值、双三次插值。其中最邻近插值很显然，双三次插值最精准但是计算量很大，因此最常用的还是双线性插值。

**关于图像映射策略**。有前向映射法和后向映射法，常用的是后向映射法，因此讲讲后向映射法的流程。逻辑很简单，根据原图像的「四个顶点」与「几何变换逻辑」确定新图像的位置后，基于几何变换的 **逆变换** 逐个填充新图像的像素值即可。填充策略也很显然，当我们对新图像的像素点使用逆变换寻找在原图像的对应点时，会发生以下两种情况：

1. 新图像在原图像的对应点超过了原图像的范围。说明这个像素点是由于几何变换而凭空出现的，直接赋背景色即可。
2. 新图像在原图像的对应点没超过原图像的范围。说明这个像素点一定是有实际意义的，此时又有两种情况：
    1. 对应点存在的。说明找到了「最佳配对」，这是最完美的对应情况，直接赋原图的像素值即可；
    2. 对应点不存在。说明没有最佳配对，此时我们只能退而求其次给这个像素点生成一个配对的像素值，怎么生成呢？就可以用到上面介绍的插值策略了。

**关于坐标系**。理论计算和编程实现是不同的：

- 理论计算时。采用的是 **像素坐标系**，左上角为原点。$A(x,y)$ 中，$x$ 表示在 $\rightarrow$ 方向的投影，$y$ 表示在 $\downarrow$ 方向的投影。
- 编程实现时。采用的是 **矩阵坐标系**，左上角为原点。$A(x,y)$ 中，$x$ 表示在 $\downarrow$ 方向的投影，$y$ 表示在 $\rightarrow$ 方向的投影。

下面主要介绍 5 种「**几何变换**」的基本原理。至于「**代数运算**」和「**模版运算**」，前者其实就是矩阵运算，后者其实就是卷积运算，故省略。

#### 1.1 平移

平移的逻辑比较简单。在齐次坐标下，我们将新点记作 $p'=[x',y',1]^T$，老点记作 $p=[x,y,1]^T$，则有：

变换公式（在老点的坐标系下，已知老点算新点）：
$$
\begin{cases}
x' = x + \Delta x \\
y' = y + \Delta y
\end{cases}
\to
\begin{bmatrix}
x'\\
y'\\
1
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & \Delta x\\
0 & 1 & \Delta y\\
0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
x\\
y\\
1
\end{bmatrix}
$$
逆变换公式（在新点的坐标系下，已知新点算老点）：
$$
\begin{cases}
x = x' - \Delta x \\
y = y' - \Delta y
\end{cases}
\to
\begin{bmatrix}
x\\
y\\
1
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & -\Delta x\\
0 & 1 & -\Delta y\\
0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
x'\\
y'\\
1
\end{bmatrix}
$$

{% fold light @代码实现 %}

MATLAB：

```matlab
function newImage = translateImage(imagePath, del_x, del_y)
	image = imread(imagePath);
	[h, w, c] = size(image);

	new_image = uint8(zeros(h, w, c));
	for new_y = 1:h
		for new_x = 1:w
			% 方法1. 直接算老点
			% [old_x, old_y] = deal(new_x - del_x, new_y - del_y);
			
			% 方法2. 用变换矩阵 T 算老点
			T = [1, 0, -del_x;
			 	0, 1, -del_y;
			 	0, 0, 1];
			new_point = [new_x; new_y; 1];
			old_point = T * new_point;  % p = T * p'
			[old_x, old_y] = deal(old_point(1), old_point(2));
	
			% 找到对应的点就赋值，否则rgb就默认[0,0,0]，即黑色
			if old_y >= 1 && old_y <= h && old_x >= 1 && old_x <= w
				new_image(new_y, new_x, :) = image(old_y, old_x, :);
			end
		end
	end
	
	newImage = new_image;
end
```

两个方法的计算结果是一样的：

![matlab 平移结果](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202410122042513.png)

Python：

```python
import cv2
import numpy as np

def translateImage(imagePath: str, del_x: float, del_y: float) -> np.ndarray:
    # 加载图像
    image = cv2.imread(imagePath)
    h, w, c = image.shape

    # 反向映射法
    new_image = np.zeros((h, w, c), dtype=np.uint8)
    for new_y in range(h):
        for new_x in range(w):
            # 方法1. 直接算老点
            # old_x, old_y = new_x - del_x, new_y - del_y

            # 方法2. 用变换矩阵 T 算老点
            T = np.array([
                [1, 0, -del_x],
                [0, 1, -del_y],
                [0, 0, 1]
            ])
            new_point = np.array([
                [new_x],
                [new_y],
                [1]
            ])
            old_point = T @ new_point
            old_x, old_y = old_point[:2]

            # 找到对应的点就赋值，否则rgb就默认[0,0,0]，即黑色
            if 0 <= old_y < h and 0 <= old_x < w:
                new_image[new_y, new_x, :] = image[old_y, old_x, :]
        
    return new_image
```

两个方法的计算结果同样是一样的：

![python 平移结果](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202410122107194.png)

{% endfold %}

#### 1.2 镜像

假设图像有 N 行 M 列像素。则有以下镜像变换公式。

注：python 下标从 0 开始，因此下面的 -1 都是正确的。但 matlab 下标从 1 开始，下面所有公式的 -1 都要换成 +1。

变换公式（在老点的坐标系下，已知老点算新点）：
$$
\begin{cases}
\begin{cases}
x' = M - 1 - x \\
y' = y
\end{cases}
&\text{（水平镜像）}
\to
\begin{bmatrix}
x'\\
y'\\
1
\end{bmatrix}
=
\begin{bmatrix}
-1 & 0 & M - 1\\
0 & 1 & 0\\
0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
x\\
y\\
1
\end{bmatrix}
\\
\begin{cases}
x' = x \\
y' = N - 1 - y
\end{cases}
&\text{（垂直镜像）}
\to
\begin{bmatrix}
x'\\
y'\\
1
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & 0\\
0 & -1 & N - 1\\
0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
x\\
y\\
1
\end{bmatrix}
\\
\begin{cases}
x' = M - 1 - x \\
y' = N - 1 - y
\end{cases}
&\text{（对角镜像）}
\to
\begin{bmatrix}
x'\\
y'\\
1
\end{bmatrix}
=
\begin{bmatrix}
-1 & 0 & M - 1\\
0 & -1 & N - 1\\
0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
x\\
y\\
1
\end{bmatrix}
\end{cases}
$$
逆变换公式（在新点的坐标系下，已知新点算老点）：
$$
\begin{cases}
\begin{cases}
x = M - 1 - x' \\
y = y'
\end{cases}
&\text{（水平镜像）}
\to
\begin{bmatrix}
x\\
y\\
1
\end{bmatrix}
=
\begin{bmatrix}
-1 & 0 & M - 1\\
0 & 1 & 0\\
0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
x'\\
y'\\
1
\end{bmatrix}
\\
\begin{cases}
x = x' \\
y = N - 1 - y'
\end{cases}
&\text{（垂直镜像）}
\to
\begin{bmatrix}
x\\
y\\
1
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & 0\\
0 & -1 & N - 1\\
0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
x'\\
y'\\
1
\end{bmatrix}
\\
\begin{cases}
x = M - 1 - x' \\
y = N - 1 - y'
\end{cases}
&\text{（对角镜像）}
\to
\begin{bmatrix}
x\\
y\\
1
\end{bmatrix}
=
\begin{bmatrix}
-1 & 0 & M - 1\\
0 & -1 & N - 1\\
0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
x'\\
y'\\
1
\end{bmatrix}
\end{cases}
$$

{% fold light @代码实现 %}

MATLAB：

```matlab
function newImage = mirrowImage(imagePath, dim)
	image = imread(imagePath);

	% 方法1. 直接调用内置函数 flipdim
	% new_image = flipdim(image, dim);

	% 方法2. 后向映射法
	[h, w, c] = size(image);
	new_image = uint8(zeros(h, w, c));
	disp([h, w, c]);
	for new_y = 1:h
		for new_x = 1:w
			if dim == 1
				% 垂直镜像
				T = [1, 0, 0;
					 0, -1, h + 1;
					 0, 0, 1];
			else
				% 水平镜像
				T = [-1, 0, w + 1;
					 0, 1, 0;
					 0, 0, 1];
			end

			new_point = [new_x; new_y; 1];
			old_point = T * new_point;  % p = T * p'
			[old_x, old_y] = deal(old_point(1), old_point(2));

			disp([new_y, new_x, old_y, old_x]);
			new_image(new_y, new_x, :) = image(old_y, old_x, :);
		end
	end
	
	newImage = new_image;
end
```

两个方法的计算结果是一样的：

![镜像图像](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202410131207600.png)

Python：

```python
import cv2
import numpy as np

def mirrowImage(imagePath: str, dim: int) -> np.ndarray:
    # 加载图像
    image = cv2.imread(imagePath)
    h, w, c = image.shape

    # 方法1. 使用内置函数 注意这里的dim不是维度，官方标准为：0表示垂直镜像，正数表示水平镜像，负数表示对角镜像
    # return cv2.flip(image, dim)

    # 方法2. 反向映射法
    new_image = np.zeros((h, w, c), dtype=np.uint8)
    for new_y in range(h):
        for new_x in range(w):
            if dim == 1:
                # 垂直镜像
                T = np.array([
                    [1, 0, 0],
                    [0, -1, h - 1],
                    [0, 0, 1]
                ])
            else:
                # 水平镜像
                T = np.array([
                    [-1, 0, w - 1],
                    [0, 1, 0],
                    [0, 0, 1]
                ])

            new_point = np.array([
                [new_x],
                [new_y],
                [1]
            ])
            old_point = T @ new_point
            old_x, old_y = old_point[:2]

            new_image[new_y, new_x, :] = image[old_y, old_x, :]
    
    return new_image
```

注意 OpenCV 内置函数的逻辑与 MATLAB 是不一样的。

![镜像图像](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202410131224054.png)

{% endfold %}

#### 1.3 旋转

我们以图像的左上角即原点作为旋转点，逆时针方向为正方向。对于原图中的任意点 $(x, y)$，我们将其表示为 $(r\cdot \cos \alpha,r\cdot \sin \alpha)$，逆时针旋转 $\theta$ 度后，就有下面的变换公式和逆变换公式。

变换公式（在老点的坐标系下，已知老点算新点）：
$$
\begin{cases}
x' = r\cdot \cos (\alpha - \theta) = r\cdot \cos \alpha \cdot \cos \theta + r\cdot \sin \alpha \cdot \sin \theta = x \cdot \cos \theta + y \cdot \sin \theta \\
y' = r\cdot \sin (\alpha - \theta) = r\cdot \sin \alpha \cdot \cos \theta - r\cdot \cos \alpha \cdot \sin \theta = -x \cdot \sin \theta + y \cdot \cos \theta
\end{cases}
\to
\begin{bmatrix}
x'\\
y'\\
1
\end{bmatrix}
=
\begin{bmatrix}
\cos \theta & \sin \theta & 0\\
-\sin \theta & \cos \theta & 0\\
0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
x\\
y\\
1
\end{bmatrix}
$$
逆变换公式（在新点的坐标系下，已知新点算老点）：
$$
\begin{cases}
x = x' \cdot \cos \theta - y' \cdot \sin \theta \\
y = x' \cdot \sin \theta + y' \cdot \cos \theta
\end{cases}
\to
\begin{bmatrix}
x\\
y\\
1
\end{bmatrix}
=
\begin{bmatrix}
\cos \theta & -\sin \theta & 0\\
\sin \theta & \cos \theta & 0\\
0 & 0 & 1
\end{bmatrix}
\begin{bmatrix}
x'\\
y'\\
1
\end{bmatrix}
$$
**确定新图尺寸**。我们可以利用上述变换公式，首先「在原图的坐标系下」计算出 4 个顶点变换后的坐标 $P_1(x_1,y_1),P_2(x_2,y_2),P_3(x_3,y_3),P_4(x_4,y_4)$ 来确定新图的尺寸：
$$
\begin{aligned}
M =& \lceil \max(x_1, x_2, x_3, x_4) - \min(x_1, x_2, x_3, x_4) + 1 \rceil\\
N =& \lceil \max(y_1, y_2, y_3, y_4) - \min(y_1, y_2, y_3, y_4) + 1 \rceil
\end{aligned}
$$
**坐标系转换**。与上述平移/镜像时可以直接使用逆变换找老点时不同，旋转时的坐标系会发生变化（其实就是新原点相对于老原点在 $x$ 和 $y$ 方向上有了一定的偏移量），因此我们需要 **先将新点逆偏移到老点的坐标系中**，再根据逆变换寻找到对应的老点。逆偏移的逻辑很简单，对于新图中的任意一点 $(x', y')$，逆偏移的计算方法如下：
$$
\begin{cases}
x' \xrightarrow []{\text{逆偏移为}} x' + \min(x_1, x_2, x_3, x_4)\\
y' \xrightarrow []{\text{逆偏移为}} y' + \min(y_1, y_2, y_3, y_4)\\
\end{cases}
$$

**坐标逆变换**。最后我们进行坐标逆变换辅以合理的插值策略即可实现后向映射法。

```matlab
imroate(图像, 逆时针角度, "插值方法")
```

#### 1.4 缩放

MATLAB 库函数：

```matlab
imresize(图像, 比例, '插值方法')
```

手搓：

```matlab
clear;
clc;
image = imread("../bird.jpg");
scale = 2;

% 计算新图大小
[h, w, c] = size(image);
scale_h = scale * h;
scale_w = scale * w;

% 填充新图像素点 | 后向映射法
scale_image = uint8(zeros(h, w, c));
for new_y = 1:scale_h
	for new_x = 1:scale_w
		% 逆变换找到老点
		T = [1 / scale, 0, 0;
			 0, 1 / scale, 0;
			 0,  0, 1];
		old_p = T * [new_x; new_y; 1];  % p = T * p'
		[old_x, old_y] = deal(old_p(1), old_p(2));
		% 双线性插值
		if old_x < 1 || old_x > scale_w || old_y < 1 || old_y > scale_h
			continue
		elseif old_x == round(old_x) && old_y == round(old_y)
			scale_image(new_y, new_x, :) = image(old_y, old_x, :);
		else
			% 为了方便，这里的 (x,y) 变成了矩阵坐标系
			[x, y] = deal(min(floor(old_y), h - 1), min(floor(old_x), w - 1));
			[a, b] = deal(old_y - x, old_x - y);
			f1 = image(x, y, :) + b * (image(x, y + 1, :) - image(x, y, :));
			f2 = image(x + 1, y, :) + b * (image(x + 1, y + 1, :) - image(x + 1, y, :));
			scale_image(new_y, new_x, :) = f1 + a * (f2 - f1);
		end
	end
end

figure;
set(gcf, 'Name', "拓展内容(3) | 手搓imresize并使用双线性插值")
imshowpair(image, scale_image, method='montage'), title("放大");
```

结果如下：

![手搓imresize并使用双线性插值](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202412101637009.png)

#### 1.5 错切

TODO

### 2 图像正交变换

本章主要学习傅里叶变换。上面学习的内容都是对图像在「空间域」上进行的运算，现在我们对图像进行变换得到「频域」信息，从而可以在频域上的对图像进行变换与分析。

图像中可以被人类识别的数据在频域上都是低频，而一些例如噪声、边缘信息在频域上都是高频。因此通过「高通」或「低通」等滤波器可以对图像从频域上进行过滤操作。

傅里叶变换原本是连续函数的变换方法，在计算机处理时需要进行离散化处理。因此我们需要掌握离散傅里叶变换。对于一个 $n$ 维向量，离散傅里叶变换的时间复杂度是 $O(n^2)$，为了加速这个变换过程，基于分治的快速傅里叶变换被设计了出来，使得变换的时间复杂度优化到了 $O(n\log n)$。

补充一下 **卷积定理**。空间域的乘积等价于频域的卷积，空间域的卷积等价于频域的乘积。

### 3 图像增强

图像增强是一个很大的门类，包含了下面的 [chapter4 图像去噪]、[chapter5 图像锐化] 等等。本章要介绍的图像增强是一个狭义的概念，主要是在讲如何「**提升图像对比度**」，也就是如何提升图像中明暗区域的差异程度。

**基于灰度级映射的图像增强**。从「映射」的角度通过变换对灰度图像进行增强。常见的映射策略分为线性和非线性。一些名词的提示：1）提升对比度就是让灰度图中暗的地方更暗、亮的地方更亮。2）在灰度图像中，亮度取决于灰度值，例如在 8 级灰度的灰度图像中 $[0,255]$ 就对应从黑到白。

**基于直方图修正法的图像增强**。从「灰度值频率」的角度通过变换对灰度图像进行增强。为了增加图像的信息量，我们需要找到一种变换使得原图在每一个灰度级上的像素点数量接近。因此，对于原图的灰度概率密度分布 $r$ 和新图的灰度概率密度分布 $s$，基于直方图的灰度变换本质上还是找到一个合适的映射 $T(\cdot)$ 使得 $s=T(r)$ 能够尽可能符合 **均匀** 分布。例程：

```matlab
Image = rgb2gray(imread('girl.jpg'));
NewImage = histeq(Image,256);
```

**基于照度反射模型的图像增强**。从「图像成像 $f(x,y)$ 是由照射光强 $i(x,y)$ 在物体上经过反射强度 $r(x,y)$ 形成的」的角度通过变换对图像进行增强。其中 $f(x,y)=i(x,y)\times r(x,y)$。理解起来很容易，照射光强相对平稳，而反射强度会因为物体表面的信息变化很大。因此基于照度反射模型的图像增强逻辑就是衰减图像低频段，增强图像高频段。有两种方法可以基于照度反射模型进行增强：

- 基于同态滤波。本质就是一个高通滤波运算。对其 1）取对数之后拆分将积式转换为和式，2）利用傅里叶变换将和式转换为低频信息与高频信息之和，3）进而可以使用高通滤波器的卷积运算进行增强，最后再 4）逆变换到空间域并 5）取指数即可进行得到最终的图像增强结果；（注：根据卷积定理，上述 2,3,4 步的卷积运算可以直接用空间域的乘积来代替）

- 基于 Retinex 理论。先利用卷积直接计算出每一个通道的光照强度 $i(x,y)$ 估计值，然后根据定义式取对数再作差即可。

**基于暗原色先验的图像去雾增强**。参见何凯明 [CVPR 2009] 的研究内容，主要讲的是针对雾天图片的对比度增强算法。

首先给出何凯明的「暗原色先验」原理：在绝大多数非天空的局部区域内，某一些像素在 RGB 三色通道中至少有一个通道的像素颜色值比较低，因此对于非雾图像的暗原色图像几乎都是很暗的颜色。下图给出了暗原色图像的计算方法：

![暗原色图像的计算方法](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202411181452787.png)

接着给出雾天成像模型。定义图形中的某个点为 $x$，雾天成像图为 $I$，原始图像为 $J$，成像点 $x$ 距实体距离为 $d(x)$，大气光为 $A$，大气散射系数为 $\beta$，则透射率 $t(x)=e^{-\beta \cdot d(x)}$，则有雾天成像模型：
$$
\begin{aligned}
I(x) &= J(x) \cdot e^{-\beta \cdot d(x)} + A \cdot (1-e^{-\beta \cdot d(x)}) \\
&= J(x) \cdot t(x) + A \cdot (1 - t(x))
\end{aligned}
$$
现在我们的问题转化为了求解 $A$ 和 $t(x)$ 两个参数值：

- 对于参数 $A$。取暗原色图像中最大像素值即可；

- 对于参数 $t(x)$。如下图估计：

    ![参数 t(x) 的估计](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202411181540502.png)

应用拓展。去雾的本质就是对亮度过高的图像进行增强，这对于过曝图像也可以处理，同样的对于低光过暗的图像，可以通过取反转化为过曝图像后应用去雾算法处理后再取反返回即可。

### 4 图像去噪

图像去噪顾名思义就是「**去除图像中的噪声**」，属于图像增强的一种。一般可以从空间域和频域两个角度进行平滑，我们只介绍空间域的去噪策略。值得注意的是，图像去噪又被称为图像平滑，所使用的传统技术都是基于滤波实现的，因此下面的滤波与去噪是等价的说法。

当然最开始我们需要知道图像的噪声是怎么产生的？以及图像的噪声都有哪些？图像的噪声一般在物理世界中恶劣气候、传输错误等场景中产生。我们对图像噪声进行建模，将其简单的划分为「高斯噪声」和「椒盐噪声」。

**均值滤波**。所谓均值滤波，其实就是对原图使用「全 1 的卷积核」进行卷积运算。

**高斯滤波**。所谓高斯滤波，对于二维图像，其实就是对原图使用「二维高斯分布的卷积核」进行卷积运算。对于输出图像的 p 位置像素，卷积核中 q 位置的权重为：
$$
G_s(\|p - q\|) = \exp\left(-\frac{\|p - q\|^2}{2\sigma_s^2}\right)
$$
**中值滤波**。所谓中值滤波，其实就是将原图中的每一个像素点用「邻域中像素中位数点」进行 **代替**。此法 **适用于椒盐型噪声** 场景。

**双边滤波**。上面三个平滑策略仅仅考虑了像素的位置信息，但是忽略了像素的变化量信息，这就导致了上述三个算法如果将卷积核增大，就会导致平滑后的图像越来越模糊，丢失了图像的边缘信息和细节信息。为了解决这个问题，双边滤波策略被提了出来。所谓的双边滤波，其实就是既考虑像素的位置信息，又考虑了像素的变化量信息。其实就是在高斯滤波的卷积核进行了修改。双边滤波的输出值 $I_p$ 是输入图像 $I$ 在像素 $p$ 处的平滑结果，计算公式如下：
$$
I_p = \frac{1}{W_p} \sum_{q \in \Omega} G_s(\|p-q\|) G_r(|I_p - I_q|) I_q
$$
可以发现卷积核中每一个位置的权重系数从高斯滤波的 $G_s(\|p - q\|)$ 变成了 $G_s(\|p-q\|) G_r(|I_p - I_q|)$。也可以理解为增加了一个惩罚系数。

### 5 图像锐化

所谓的图像锐化就是对图像进行「**边缘增强**」。常规的图像锐化策略是：计算原图每个点的边缘信息得到一个边缘图像，然后将得到的边缘图像与原图累加即可得到锐化后的图像。因此图像锐化的关键在于如何计算图像中的边缘信息，下面将从一阶和二阶两个角度计算图像的边缘信息。将卷积模板称作算子。

#### 5.1 一阶算子

梯度算子、roberts 算子、sobel 算子、prewitt 算子。

#### 5.2 二阶算子

二阶梯度算子、log 算子、canny 算子。

### 6 图像分割

如何将图像中的对象（object）分割出来？

#### 6.1 阈值分割

- 直方图法（利用灰度直方图中的双峰或者平滑双峰进而得到分割的阈值）
- 模式分类法（最大类间方差 OTSU、最大熵法、最小误差法）
- 迭代法；

#### 6.2 边界分割

https://ww2.mathworks.cn/help/images/ref/hough.html

https://ww2.mathworks.cn/help/images/ref/houghpeaks.html

https://ww2.mathworks.cn/help/images/ref/houghlines.html

基于 Hough 变换法进行直线检测。该算法的核心就是将笛卡尔积中的原始图像映射到极坐标系中的参数图像。具体的，原始图像中的一条直线就对应了参数图像中的一个点，参数图像中的一条直线就对应了原始图像中的一个点。

那么就有这样的推论：原始图像中一条线段上的每一个点，映射到参数图像中的所有直线都过同一个点 $(\theta_k, \rho_k)$。

于是基于 hough 变换的边界分割算法就呼之欲出了：

1. 枚举原始图像中的每一个像素点 $(x_i,y_i)$，结合 $\rho = x \cos \theta + y \sin \theta$ 并尺取 $\theta$，得到一组 $[\theta_i, \rho_i]$ 并将其在参数图像中进行累加；
2. 假设原图中有 k 条线段，那么就取出参数图像中最大的 k 个点对应的坐标，于是可以基于这 k 个坐标得到对应的 k 条线段。

#### 6.3 聚类分割

https://ww2.mathworks.cn/help/images/ref/imsegkmeans.html

Kmeans 算法。

## 图像分析

基于上一部分最底层语义的「图像处理」技术，本部分将展开更高一层语义「图像分析」技术的学习。

### 7 图像描述与分析

