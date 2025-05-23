---
title: 关系型数据预处理
---

数据决定上限，模型和算法只是尽可能逼近这个上限，因此数据的质量是核心所在。数据的质量可以被描述为这几个方面：准确性、完整性、一致性、合时性、可信度、解释性。

接下来我们主要介绍数据预处理的几个主要任务，将「关系型结构化数据」处理成模型可接受的形式并且提升数据的质量。

## 数据分析

在拿到一个数据集时，可以先简单分析一下各个变量的统计特点，也可以结合可视化技巧进行初步分析。

### 统计方法

**中心趋势度量**。用来描述数据集中心位置的统计量，它反映了数据的平均水平或典型值。例如：

1. 算术平均数（受计算数据的影响大）；
2. 调和平均数（特定场景）；
3. 中位数（适用于序数申诉信，表示位置信息，不受极差影响）；
4. 众数（不受极差影响）。

**离散度度量**。用来描述数据分布的广泛程度，即数据值偏离其中心趋势的程度。例如：

1. 极差（适用于数据极端值较少且分布不复杂的场景）；
2. 标准差（解释性比方差更好，反应数据与均值之间的关系，对极端值敏感）；
3. 分位数（反应数据内部的离散程度，容易忽略极端数据）。

### 可视化方法

- 箱型图、五数概括、直方图。有助于可视化「单个属性」的数据分布；
- 饼图。有助于可视化「单个属性」的数据占比；
- 散点图。有助于可视化「两个属性」的相关关系。

## 数据特点

在正式开始介绍关系型结构化数据的预处理操作之前，我们有必要了解一下关系型数据的特点。

### 属性分类

- 定性。二元属性、标称属性、序数属性；
- 定量。即数值属性。区间数值可以取负数，比率数值取不了负数。

### 邻近性度量

可以简单地将其理解为计算任意两个数据对象之间的距离，只不过这里的距离一般用相异性来表示（相似性就是 $1-\text{相异性}$）。由于数据对象的属性有很多种类，不同种类的邻近性度量方法不同，因此当我们在对两个数据对象进行邻近性度量时，需要根据属性的类别分组计算。下面讲一下不同属性类别的邻近性度量方法：

**标称属性**。我们在实际计算两个数据对象标称属性的相似性或相异性时，一般为了便于计算需要对其进行编码，然后再比较两个数据对象的所有标称属性中相同或相异的编码个数占总标称属性的数量。常见的标称属性有：籍贯、学历等等。编码方法如下：

| 编码方法  | 适用情况 | 主要优点 | 主要缺点 |
|:-------:|:-------:|:------:|:------:|
| **One-Hot Encoding** | 类别较少 | 无序、通用 | 维度高 |
| **Label Encoding** | 类别有序 | 简单高效 | 存在隐含数值关系 |
| **Binary Encoding** | 类别较多 | 低维、高效 | 仍有些许顺序关系 |
| **Hash Encoding** | 超大类别 | 维度可控 | 可能哈希冲突 |
| **Embedding Encoding** | 深度学习 | 可学习关系 | 训练成本高 |

**二元属性**。与标称属性类似同样需要进行编码，但会取决于二元属性的对称性。

| i\j  |  1   |  0   | 合计 |
| :--: | :--: | :--: | :--: |
|  1   |  m   |  n   | m+n  |
|  0   |  p   |  q   | p+q  |
| 合计 | m+p  | n+q  |  b   |

假设两个数据对象在二元属性上的取值情况如上表所示：都取 $1$ 的数量为 $m$，都取 $0$ 的数量为 $q$，取 $(1,0)$ 的数量为 $n$，取 $(0,1)$ 的数量为 $p$。则有以下相异性计算公式：

- 对称二元属性。相异性为 $\dfrac{p+n}{m+n+p+q}$。常见的对称二元属性有：朋友、配偶；
- 非对称二元属性。相异性为 $\dfrac{p+n}{m+n+p}$，因为两个取值都为1的情况比取值都为0的情况更有意义。常见的非对称二元属性有：上下级、父母与子女、教师与学生。

**数值属性**。对于两个数值型的数据对象 $\boldsymbol x$ 和 $\boldsymbol y$，定义了以下两种邻近性度量指标：

- 闵可夫斯基距离。取值范围为 $[0,+\infty]$。$h = 1$ 为曼哈顿距离，$h = 2$ 为欧氏距离，$h = \infty$ 为切比雪夫距离（上确界距离）。如下式：

    $$
    \begin{aligned}
    \text{闵可夫斯基距离：}& d(\boldsymbol x,\boldsymbol y) = \| \boldsymbol x - \boldsymbol y \|_h \\
    \text{曼哈顿距离：}& d(\boldsymbol x,\boldsymbol y) = \| \boldsymbol x - \boldsymbol y \|_1 \\
    \text{欧几里得距离：}& d(\boldsymbol x,\boldsymbol y) = \| \boldsymbol x - \boldsymbol y \|_2 \\
    \text{切比雪夫距离：}& d(\boldsymbol x,\boldsymbol y) = \| \boldsymbol x - \boldsymbol y \|_\infty = \max(\boldsymbol x - \boldsymbol y)
    \end{aligned}
    $$

- 余弦距离。取值范围为 $[0, 2]$。就是两个数据对象的余弦值的相反数加 1 (这很巧妙的利用了余弦值进行了相似性度量并且还确保了计算结果的非负性)。这个度量方法偏向于语言上描述两个对象的差异性，并不适合进行度量测量 (metric measure)，因为其不具备三角不等式关系。如下式：

    $$
    d(\boldsymbol x,\boldsymbol y) = 1 - \cos < \boldsymbol x,\boldsymbol y>
    $$

**序数属性**。使用排名法对属性的每一个可能的取值进行编码，然后归一化到 $[0,1]$ 范围内，最后就可以使用上面的数值属性的方法进行两个数据对象的邻近性度量。

**混合属性**。如果出现了不止一种上述类别的属性，可以采用「加权平均」的方式进行邻近性度量。


## 数据清理

### 缺失值处理

- 显然我们可以直接删除含有缺失属性的元组；
- 也可以进行缺失值填充。填充策略比较多，简单点可以用平均数、众数等策略进行填充，也可以用前推法、后推法、插值法、滑窗均值法等策略进行填充，还可以用贝叶斯等概率策略进行填充。

### 噪声处理

- 可以用箱型图去掉噪声；

- 也可以对数据做平滑处理。平滑策略有很多，例如：函数拟合平滑、近邻局部平滑、指数平滑。

    - 函数拟合平滑比较显然，就是利用线性回归拟合一个函数即可；

    - 近邻局部平滑（分箱法）。我们将原始数据排序后，通过「等深分箱（按元素数量）」或「等宽分箱（按元素值域）」或「自定义分箱」等策略划分为不同的子集，然后对每一个子集进行平滑处理，子集可以用均值、中位数、边界、窗口均值等策略做平滑处理；

    - 指数平滑（递推法）。定义权重参数 $\alpha \in (0,1)$，原始数据记作 $x_1,x_2,...,x_n$，平滑后数据记作 $s_1,s_2,...,s_n$，则有：

        $$
        s_i = \alpha x_i + (1 - \alpha) s_{i-1}
        $$

## 数据集成

借鉴数据库的逻辑，将多源数据通过外键集成到一个完整的数据集合中。可以理解为横向的升维与纵向的增加数据。

## 数据规约

所谓数据规约就是降低数据集的规模。大约有三种策略分别为：降维、降数据、数据压缩。其中：

- 降维。可以采用对应的机器学习策略。参考之前的笔记 [特征映射](../machine-learning/data.md/#特征映射)；
- 降数据。可以采用简单随机抽样或者分层抽样；
- 数据压缩。就是从编码角度进行数据编码和数据压缩。

## 数据规范化

数据规范化就是所谓的「归一化」方法，从而避免不同属性的量纲之间的影响。常用的有：

- 最大最小规范化。规范公式为 $\displaystyle x'= \frac{x - x_{\min}}{x_{\max} - x_{\min}}(r - l) + l$。缺点是容易受离群点的影响，且测试数据可能会超过阈值 $[l,r]$。
- 均值标准差规范化。规范公式为 $\displaystyle x'=\frac{x - \overline{x}}{\sigma_x}$。缺点是计算量相对更大。
- 零均值规范化。规范公式为 $\displaystyle x'=\frac{x}{10^j}$，其中 $j$ 为使得 $\displaystyle \frac{\max{|x|}}{10^j}<1$ 的最小取值。

## 数据离散化

数据离散化就是对连续属性值的属性进行离散化操作。从而适用于只能处理离散属性的场景。
