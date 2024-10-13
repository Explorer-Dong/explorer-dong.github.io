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
>- MATLAB 版本为 R2023a。
>- OpenCV-Python 版本为 4.10.0。官方文档 <https://docs.opencv.org/4.10.0/d2/d96/tutorial_py_table_of_contents_imgproc.html>

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

### 1. 图像基本运算

首先需要掌握一些最基本的概念：齐次坐标表示与变换矩阵 $T$、图像插值策略、图像映射策略。

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

#### 1.1 几何变换

有了上述的基础知识之后，就可以对图像进行下面 5 种常见的几何变换了。

##### 1.1.1 平移

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

##### 1.1.2 镜像

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

	% 直接调用内置函数 flipdim
	% new_image = flipdim(image, dim);

	% 后向映射法
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

##### 1.1.3 旋转

##### 1.1.4 缩放

##### 1.1.5 错切

#### 1.2 代数运算

#### 1.3 模版运算

### 2. 图像正交变换

### 3. 图像增强

### 4. 图像平滑

### 5. 图像锐化

### 6. 图像复原

### 7. 图像的数学形态学处理

### 8. 图像分割

## 图像分析

基于上一部分最底层语义的「图像处理」技术，本部分将展开更高一层语义「图像分析」技术的学习。

## 综合应用

基于上一部分中层语义的「图像分析」技术，本部分将结合 **图像分类** 和 **图像检索** 技术展开最高层语义「图像理解」技术的学习。

### 图像分类

### 图像检索
