---
title: ProbAndStat
categories:
  - GPA
  - 4th-term
category_bar: true
---

## 《概率论与数理统计》

## 前言

学科情况：

| 主讲教师 | 学分配额 |  学科类别  |
| :------: | :------: | :--------: |
|  周效尧  |    4     | 学科基础课 |

成绩组成：

| 平时 | 测验（×2） | 期末 |
| :--: | :--------: | :--: |
| 10%  |    30%     | 60%  |

教材情况：

|     课程名称      |     选用教材     |  版次  |          作者           |   出版社   |      ISBN号       |
| :---------------: | :--------------: | :----: | :---------------------: | :--------: | :---------------: |
| 概率论与数理统计Ⅰ | 概率论与数理统计 | 第一版 | 刘国祥王晓谦     等主编 | 科学出版社 | 978-7-03-038317-4 |

学习资源：

- :tv: 视频资源：[《概率论与数理统计》教学视频全集（宋浩）](https://www.bilibili.com/video/BV1ot411y7mU)
- :book:  教材答案：
    - 本地路径（自用）：[概率论答案.pdf](D:\华为云盘\2. Score\4. 概率论与数理统计\概率论答案.pdf)
    - 网盘资源（共享）：[提取码：448w](https://pan.baidu.com/s/1yeC0rxatHaLeNHQaW85Kpw?pwd=448w)

## 第1章 事件与概率

### 1.1 随机事件与样本空间

#### 1.1.1 样本空间

随机事件发生的总集合 $\Omega$

#### 1.1.2 随机事件

事件是否发生取决于观察结果的事件

#### 1.1.3 事件之间的关系与运算

1. 包含：$A \subset B$ or $B \subset A$
2. 相等：$A=B$
3. 并（和）：$A \cup B$
4. 交（积）：$A \cap B \quad (AB)$
5. **互斥**（互不相容）：$AB=\Phi$
6. **对立事件**（余事件）：$A \cap B=\Phi \land A \cup B=\Omega$
7. 差：$A-B=A \cap \overline{B} = A \overline B$
8. 德摩根律

将事件发生的概率论转化为**集合论**进行计算与分析

### 1.2 概率的三种定义及其性质

#### 1.2.1 概率的统计定义

从频率出发得到。

#### 1.2.2 概率的古典定义

特征：

- 样本空间是有限集
- 等可能性（试验中每个基本事件发生的概率是等可能的）

内容：

1. 模型与计算公式
2. 基本组合分析公式
    - 乘法、加法原理
    - 排列公式
    - 组合公式
3. 实例
    - 超几何概率
    - 分房问题
    - 生日问题
4. 古典概率的基本性质

#### 1.2.3 概率的几何定义

特征：

- 样本空间不可列
- 等可能性

内容：

1. 模型与计算公式
2. 实例
    - 一维几何图形：公交车乘车问题
    - 二维几何图形：会面问题、蒲丰（Buffon）投针问题
3. 几何概率的基本性质

#### 1.2.4 概率的性质

pass

### 1.3 常用概型公式

#### 1.3.1 条件概率计算公式

$$
P(B|A) = \frac{P(AB)}{P(A)}
$$
#### 1.3.2 乘法原理计算公式

- $\text{基本}:\text{前提}:P(A)>0$
    $$
    P(AB) = P(A)P(B|A)
    $$

- $\text{推广}:\text{前提}:P(A_1A_2,...,A_n)>0$
    $$
    P(A_1A_2...A_n) = P(A_1)P(A_2|A_1)P(A_3|A_1A_2) \cdots P(A_n|A_1A_2...A_{n-1})
    $$

#### 1.3.3 全概公式

我们将样本空间 $\Omega$ 完全划分为 $n$ 个互斥的区域，即 $\Omega = \displaystyle \sum_{i=1}^{n} A_i$ ，则在样本空间中事件 $B$ 发生的概率 $P(B)$ 就是在各子样本空间中概率之和，经过上述乘法公式变形，计算公式如下：
$$
\begin{equation*}
\begin{aligned}
    P(B) &= P(B \Omega) \\
    &= P(BA_1) + P(BA_2) + \cdots + P(BA_n) \\
    &= P(A_1)P(B|A_1) + P(A_2)P(B|A_2) + \cdots + P(A_n)P(B|A_n) \\
    &= \sum_{i=1}^n P(A_i)P(B|A_i)
\end{aligned}
\end{equation*}
$$
#### 1.3.4 贝叶斯公式

在上述全概公式的背景之下，现在希望求解事件 $B$ 在第 $j$ 个子样本空间 $A_j$ 中发生的概率，或者说第 $j$ 个子样本空间对于事件 $B$ 的发生贡献了多少概率，记作 $P(A_j|B)$ ，计算公式如下：
$$
P(A_j|B) = \frac{P(A_j)P(B|A_j)}{\displaystyle \sum_{i=1}^n P(A_i)P(B|A_i)}
$$
{% note light %}

可以发现全概公式是计算事件发生的所有子样本空间的概率贡献，而贝叶斯公式是计算事件发生的总概率中某些子样本空间的概率贡献，前者是正向思维，后者是逆向思维

{% endnote %}

### 1.4 事件的独立性及伯努利概型

#### 1.4.1 独立性

**定义**

- 基本：若 $A,B$ 相互独立，则满足：
    $$
    P(AB)=P(A)P(B)
    $$

- 推广：若 $A_1,A_2,...,A_n$ 相互独立，则满足：
    $$
    \begin{aligned}
    \forall \quad 1 \le i_1<i_2<\cdots<i_k \le n\ (k=2,3,\cdots,n) \\
    s.t. \quad P(A_{i_1}A_{i_2}\cdots A_{i_k}) = P(A_{i_1})P(A_{i_2})\cdots P(A_{i_k})
    \end{aligned}
    $$

**定理**

- 基本：若 $A,B$ 相互独立，则 $A,\overline{B}$ 相互独立；$\overline{A},B$ 相互独立；$\overline{A},\overline{B}$ 相互独立

- 推广：若 $A_1,A_2,...,A_n$ 相互独立，则其中任意 $k(2 \le k \le n)$ 个也相互独立，且满足：
    $$
    \begin{aligned}
    P(\hat{A_{i_1}}\hat{A_{i_2}}\cdots \hat{A_{i_k}}) = P(\hat{A_{i_1}})P(\hat{A_{i_2}})\cdots P(\hat{A_{i_k}}) \\
    s.t. \quad \hat{A_{i_j}} = A \ or \ \overline{A}\ (j=1,2,\cdots,k)
    \end{aligned}
    $$

**概念辨析**

- 两两独立：对于 $n$ 个事件，两两独立，而不考虑三个及以上的关系。

- 相互独立：对于 $n$ 个事件，$2 \to n$ 个事件的独立关系都需要考虑。

- 总结：对于 $n$ 个事件，满足两两独立需要 $C_n^2$ 个等式关系，对于相互独立需要 $2^n-(n+1)$ 个等式关系，因此：
    $$
    \text{两两独立} \subset \text{相互独立}
    $$

#### 1.4.2 伯努利概型

定义：$n$ 重伯努利概型

- $n$ 重：发生 $n$ 次独立试验
- 伯努利概型：每次试验只有两种可能的结果

模型：

- 二项概率公式：n 次独立重复试验发生 k 次的概率：
    $$
    C_n^k p^k (1-p)^{n-k}
    $$

- 几何概率公式：在第 n 次试验首次成功的概率：
    $$
    (1-p)^{n-1}p
    $$

## 第2章 随机事件及其分布

{% note light %}

我们知道，解决事件发生概率的问题，除了事件表示以外，我们还关心每一个事件发生的概率 $P(X=k)$，以及某些事件发生的概率 $P(X=[range))$。接下来我们将：

- 首先介绍**随机变量的概念**以及**分布函数的概念**
- 接着介绍随机变量对应的概率发生情况组成的集合。离散型的叫**分布列**，连续型的叫**概率密度函数**，并在其中贯穿分布函数的应用
- 最后介绍**分布函数的复合**。从离散型和连续型随机变量两个方向展开

{% endnote %}

### 2.1 随机变量及其概率分布

#### 2.1.1 随机变量的概念

总的来说，随机变量就是一个样本空间与实数集的映射。我们定义样本空间 $\Omega=\{ \omega \}$，其中 $\omega$ 表示所有可能的事件，实数集 $R$，随机变量 $X$，则随机变量满足以下映射关系
$$
X(\omega)=R
$$

#### 2.1.2 随机变量的分布函数

1. 分布函数的定义：$F(x)=P(X \le x)$
2. 分布函数的性质：
    - 非负有界性：$0 \le F(x) \le 1$
    - 单调不减性：若 $x_1 < x_2$，则 $F(x_1) \le F(x_2)$
    - $\displaystyle F(-\infty) = \lim_{x \to -\infty} F(x) = 0$，$\displaystyle F(+\infty) = \lim_{x \to +\infty} F(x) = 1$
    - 右连续性：$\displaystyle \lim_{x\to x_0^+}F(x) = F(x_0)\quad(-\infty < x_0 < +\infty)$

### 2.2 离散型随机变量及其分布列

#### 2.2.1 离散性随机变量的分布列

随机变量的取值都是整数，有以下三种表示方法

1. 公式法
    $$
    p_k = P(X=x_k),\quad k = 1,2,\cdots,
    $$

2. 服从法
    $$
    X \sim 
    \begin{pmatrix}
    x_1 & x_2 & x_3 & \cdots \\
    p_1 & p_2 & p_3 & \cdots
    \end{pmatrix}
    $$

3. 表格法
    $$
    \begin{array}{c|cccc}
    X & x_1 & x_2 & x_3 & \cdots \\
    \hline
    P & p_1 & p_2 & p_3 & \cdots
    \end{array}
    $$
    

#### 2.2.2 常用离散性随机变量及其分布列

- 0-1分布：即一个事件只有两面性，我们称这样的随机变量服从0-1分布或者两点分布，记作
    $$
    X \sim 
    \begin{pmatrix}
    0 & 1 \\
    1-p & p
    \end{pmatrix}
    $$

- 二项分布：其实就是 n 重伯努利试验，我们称这样的随机变量服从二项分布，分布列为 $P(X=k) = C_n^kp^k(1-p)^{n-k}$，记作
    $$
    X \sim B(n,p)
    $$

- 几何分布：同样是伯努利事件，现在需要求解第 $k$ 次事件首次发生的概率，此时分布列为 $P(X=k)=(1-p)^{k-1}p$，记作
    $$
    X \sim G(p)
    $$

- 超几何分布：就是在 N 件含有 M 件次品的样品中无放回的抽取 n 件，问其中含有次品数量的分布列，为 $\displaystyle P(X=k)=\frac{C_M^k C_{N-M}^{n-k}}{C_N^n}, \quad k=0,1,2,\cdots,\min{(n, M)}$，记作
    $$
    X \sim \text{超几何分布}(n,N,M)
    $$

- 泊松分布：当二项分布中，试验次数很大或者概率很小时，可以近似为泊松分布，即 $\displaystyle P(X=k)=C_n^k p^k(1-p)^{n-k} \to \frac{\lambda^k}{k!}e^{-\lambda}$，其中常数 $\lambda > 0$，记作
    $$
    X \sim P(\lambda)
    $$
    显然，泊松分布含有下面两个性质

    1. $P(X=k) > 0,k=0,1,\cdots$

    2. $\displaystyle \sum_{k=0}^\infty P(X=k)=1$

        {% fold light @泊松分布正规性证明 %}
        
        ![泊松分布正规性证明](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403151012817.png)
        
        {% endfold %}

### 2.3 连续型随机变量及其概率密度函数

说白了其实就是离散性随机变量的积分加强版。现在随着事件发生的不同取值 $x$，随机变量 $X$ 发生的概率 $P(X=x)$ 变成了连续的取值了（学名概率密度函数），于是分布函数（离散的叫分布列）的取值就没那么容易求了（其实一重定积分就可以）。接下来就从定义、性质、应用三个角度出发介绍概率密度函数以及相应的随机变量的分布函数。

#### 2.3.1 连续型随机变量的密度函数

概率密度函数，简称：密度函数 or 概率密度

- 定义：设随机变量 $X$ 的分布函数为 $F(x)$，如果存在非负可积函数 $p(x)$，使下式成立，则称 $X$ 为连续型随机变量，$p(x)$ 为 $X$ 的概率密度函数
    $$
    \forall x \in R,F(x) = \int_{-\infty}^{x} p(t)dt
    $$

- 性质：

    1. 非负性：$p(x) \ge 0$

    2. 正规性：$\int_{-\infty}^{+\infty} p(x)dx = 1$

    3. 可积性：$\forall x_1 \le x_2,P(x_1 \le X \le x_2) = F(x_2) - F(x_1) = \int_{x_1}^{x_2}p(x)dx$

    4. 分布函数可导性：若 $p(x)$ 在点 $x$ 处连续，则 $F'(x) = p(x)$

    5. 已知事件但无意义性：$\forall x \in R, P(X=x) = F(x) - F(x) = 0$

        - 离散型变量可以通过列举随机变量 $X$ 的取值来计算概率，但连续型随机变量这么做是无意义的
        - $P(A) = 0$ 不能推出 $A$ 是不可能事件，$P(A)=1$ 不能推出 $A$ 是必然事件
        - 对于连续型随机变量 $X$ 有：$P(x_1 < X < X_2)=P(x_1 < X \le X_2)=P(x_1 \le X < X_2)=P(x_1 \le X \le X_2)$

    6. 实际描述性：密度函数的数值反映了随机变量 $X$ 取 $x$ 的临近值的概率的大小，因为
        $$
        p(x)\Delta x \approx \int_{x}^{x+\Delta x} p(t)dt = F(x+\Delta x) - F(x) = P(x \le X \le x+\Delta x)
        $$

#### 2.3.2 常用连续型随机变量及其密度函数

|          |        分布定义式        |                         概率密度函数                         |                           分布函数                           |
| :------: | :----------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| 均匀分布 |     $X \sim U[a,b]$      | $p(x) = \begin{cases} \frac{1}{b-a}, & a \le x \le b, \\ 0, & \text{其他} \end{cases}$ | $F(x) = \begin{cases} 0, & x < a \\ \frac{x - a}{b - a}, & a \le x < b \\ 1, & x \ge b \end{cases}$ |
| 指数分布 |   $X \sim e (\lambda)$   | $p(x) = \begin{cases} 0, & x < 0 \\ \lambda e^{-\lambda x} , & x \ge 0 \end{cases}$ | $F(x) = \begin{cases} 0, & x < 0 \\ 1- e^{-\lambda x}, & x \ge 0 \end{cases}$ |
| 正态分布 | $X \sim N(\mu,\sigma^2)$ | $p(x) = \frac{1}{\sqrt{2 \pi} \sigma } e^{- \frac{(x - \mu)^2}{2 \sigma ^2}} , \quad -\infty < x < + \infty$ | $F(x) = \frac{1}{\sqrt{2 \pi} \sigma } \int_{- \infty}^x e^{- \frac{(y - \mu)^2}{2 \sigma ^2}} dy$ |

补充说明：

- 指数分布：其中参数 $\lambda >0$

- 正态分布：一般正态函数 $F(x)$ **转化为标准正态函数** $\Phi(x)$ 公式：
    $$
    F(x) = \Phi(\frac{x - \mu}{\sigma})
    $$
    于是对于计算一般正态函数的函数值，就可以通过下式将其转化为标准正态函数，最后查表即可：

$$
P(X \le x) = F(x) = \Phi (\frac{x - \mu}{\sigma})
$$

### 2.4 随机变量函数的分布

{% note light %}

本目主要介绍给定一个随机变量 $X$ 的分布情况，通过一个关系式 $y=g(x)$ 来求解随机变量 $Y$​ 的分布情况

{% endnote %}

#### 2.4.1 离散型随机变量函数的分布

通过关系式 $y=g(x)$​ 将所有的 $Y$ 的取值全部枚举出来，然后一一统计即可。

#### 2.4.2 连续型随机变量函数的分布

给定随机变量 $X$ 的概率密度函数 $p_X(x)$，以及关系式 $y=g(x)$，求解随机变量 $Y$ 的分布函数 $F_Y(y)$、概率密度函数 $p_Y(y)$

- **方法一**：先求解随机变量 $Y$ 的分布函数 $F_Y(y)$，再通过对其求导得到概率密度函数 $p_Y(y)$​

    即先 $F_Y(y) = P_Y(Y \le y) = P_Y(g(X) \le y) = P_X(X \le f(y)) = F_X(f(y))$ 得到 $Y$ 的分布函数

    再对 $F_Y(y)$ 求导得 $\displaystyle p_Y(y) = \frac{d}{dy} F_Y(y) = \frac{d}{dy} F_X(f(y)) = F_X'(f(y)) \cdot f'(y) = p_X(f(y)) \cdot f'(y)$

- **方法二**：如果关系式 $y=g(x)$ 单调且反函数 $x=h(y)$ 连续可导，则可以直接得出随机变量 $Y$ 的概率密度函数 $p_Y(y)$ 为下式。其中 $\alpha$ 和 $\beta$ 为 $Y=g(X)$ 的取值范围（$x$ 应该怎么取值，$h(y)$ 就应该怎么取值，从而计算出 $y$ 的取值范围）
    $$
    p_Y(y) = 
    \begin{cases}
    p(h(y)) \cdot |h'(y)|, & \alpha < y < \beta \\
    0, & \text{其他}
    \end{cases}
    $$

## 第3章 随机向量及其分布

{% note light %}

实际生活中，只采用一个随机变量描述事件往往是不够的。本章引入多维的随机变量概念，构成随机向量，从二维开始，推广到 $n$​ 维。

{% endnote %}

### 3.1 二维随机向量的联合分布

{% note light %}

现在我们讨论二维随机向量的联合分布。所谓的联合分布，其实就是一个曲面的概率密度（离散型就是点集），而分布函数就是对其积分得到的三维几何体的体积（散点和）而已。

{% endnote %}

#### 3.1.1 联合分布函数

定义：我们定义满足下式的二元函数 $F(x,y)$ 为二维随机向量 $(X,Y)$ 的联合分布函数
$$
F(x,y) = P((X \le x) \cap (Y \le y)) = P(X \le x, Y \le y)
$$
{% fold light @几何意义：F(x,y) 即左下方无界矩形的面积 %}

![联合分布函数的几何意义](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403271717479.png)

{% endfold %}

性质：其实配合几何意义理解就会很容易了

1. 固定某一维度，另一维度是单调不减的
2. 对于每个维度都是右连续的
3. 固定某一维度，另一维度趋近于负无穷对应的函数值为 $0$
4. 二维前缀和性质，右上角的矩阵面积 $\ge 0$

#### 3.1.2 联合分布列

定义：若二维随机向量 $(X,Y)$ 的所有可能取值是至多可列的，则称 $(X,Y)$ 为二维离散型随机向量

表示：有两种表示二维随机向量分布列的方法，如下

{% fold light @二维随机向量分布列的表示方法 %}

1. 公式法
    $$
    p_{ij} = P(X=x_i,Y = y_i), \quad i,j=1,2,\cdots
    $$

2. 表格法：

    ![二维联合分布列](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403271728248.png)

{% endfold %}

性质：

1. 非负性：$p_{ij} \ge 0, \quad i,j=1,2,\cdots$
2. 正规性：$\displaystyle \sum_{i} \sum_{j} p_{ij} = 1$

#### 3.1.3 联合密度函数

定义：
$$
F(x,y) = \int_{-\infty}^x \int_{-\infty}^y p(u,v)dudv
$$
性质：

1. 非负性：$\forall x,y \in R,p(x,y) \ge 0$
2. 正规性：$\displaystyle \int_{-\infty}^{+\infty} \int_{-\infty}^{+\infty} p(x,y)dxdy = 1$

结论：

1. **联合分布函数**相比于一元分布函数，其实就是从概率密度函数与 $x$ 轴围成的面积转变为了概率密度曲面与 $xOy$​ 平面围成的**体积**
2. 若概率密度曲面在 $xOy$ 平面的投影为点集或线集，则对应的概率显然为零

常见的连续型二维分布：

1. 二维均匀分布：假设该曲面与 $xOy$ 面的投影面积为 $S$，则分布函数其实就是一个高为定值 $\frac{1}{S}$ 的柱体，密度函数为：
    $$
    p(x,y) = 
    \begin{cases}
    \frac{1}{S}, &(x,y) \in G \\
    0, &\text{其他}
    \end{cases}
    $$

2. 二元正态分布：不要求掌握密度函数，可以感受一下密度函数的图像：

    {% fold light @二元正态分布 - 密度函数的图像%}

    ![二元正态分布 - 密度函数的图像](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403290948792.png)

    {% endfold %}

计算题：往往给出一个二元密度函数，然后让我们求解（1）密度函数中的参数、（2）分布函数、（3）联合事件某个区域下的概率

（1）我们利用二元密度函数的正规性，直接积分值为 $1$ 即可

（2）划分区间后进行曲面积分即可，在曲面积分时往往结合 $X$ 型和 $Y$ 型的二重积分进行

（3）画出概率密度曲面在 $xOy$ 面的投影，然后积分即可

### 3.2 二维随机向量的边缘分布

{% note light %}

对于二元分布函数，我们也可以研究其中任意一个随机变量的分布情况，而不需要考虑另一个随机变量的取值情况。举一个实例就是，假如当前的随机向量是身高和体重，所谓的只研究其中一个随机变量，即边缘分布函数的情形就是，我们不考虑身高只考虑体重的分布情况；或者我们不考虑体重，只考虑身高的分布情况。接下来，我们将从边缘分布函数入手，逐渐学习离散型的分布列与连续型的分布函数。

{% endnote %}

#### 3.2.1 边缘分布函数

我们称 $F_X(x),F_Y(y$) 分别为 $(X,Y)$ 关于 $X,Y$ 的边缘分布函数，定义式为：
$$
\begin{aligned}
F_X(x) = P(X \le x) = P(X \le x,Y < +\infty) = \lim_{y \to +\infty} F(x,y) = F(x,+\infty) \\
F_Y(y) = P(Y \le y) = P(X < +\infty, Y \le y) = \lim_{x \to +\infty} F(x,y) = F(+\infty,y)
\end{aligned}
$$

#### 3.2.2 边缘分布列

所谓的边缘分布列，就是固定一个随机变量，另外的随机变量取遍，组成的分布列。即：
$$
\begin{aligned}
P(X=x_i) = p_{i\cdot}=\sum_{j=1}^{+\infty} p_{ij}, \quad i=1,2,\cdots \\
P(Y=y_j) = p_{\cdot j}=\sum_{i=1}^{+\infty} p_{ij}, \quad j=1,2,\cdots
\end{aligned}
$$
我们称：

- $P(X=x_i)$ 为随机向量 $(X,Y)$ 关于 $X$ 的边缘分布列

- $P(Y=y_j)$ 为随机向量 $(X,Y)$ 关于 $Y$ 的边缘分布列

#### 3.2.3 边缘密度函数

所谓的的边缘密度函数，可以与边缘分布列进行类比，也就是固定一个随机变量，另外的随机变量取遍。只不过连续型的取遍就是无数个点，而离散型的取遍是可列个点，仅此而已。即：
$$
\begin{aligned}
P(X=x) &= p_X(x) \\
&= \frac{d}{dx} F_X(x) \\
&= \frac{d}{dx} F(x,+\infty) \\
&= \frac{d}{dx} \int_{-\infty}^{x} \left [ \int_{-\infty}^{+\infty} p(u,v) dv \right ] du \\
&= \int_{-\infty}^{+\infty} p(x,y) dy \\
\end{aligned}
$$

$$
\begin{aligned}
P(Y=y) &= p_Y(y) \\
&= \frac{d}{dy} F_Y(y) \\
&= \frac{d}{dy} F(+\infty,y) \\
&= \frac{d}{dy} \int_{-\infty}^{+\infty} \left [ \int_{-\infty}^{y} p(u,v) dv \right ] du \\
&= \frac{d}{dy} \int_{-\infty}^{y} \left [ \int_{-\infty}^{+\infty} p(u,v) du \right ] dv \\
&= \int_{-\infty}^{+\infty} p(x,y) dx \\
\end{aligned}
$$

我们称：

- $P(X=x)$ 为随机向量 $(X,Y)$ 关于 $X$ 的边缘密度函数

- $P(Y=y)$ 为随机向量 $(X,Y)$ 关于 $Y$ 的边缘密度函数

### 3.3 随机向量的条件分布

{% note light %}

本目主要介绍的是条件分布。所谓的条件分布，其实就是在约束一个随机变量为定值的情况下，另外一个随机变量的取值情况。与上述联合分布、边缘分布的区别在于：

- 联合分布、边缘分布的分布函数是一个体积（散点和），概率密度（分布列）是一个曲面（点集）
- 条件分布的分布函数是一个面积（散点和），概率密度（分布列）是一个曲线（点集）

{% endnote %}

#### 3.3.1 离散型随机向量的条件分布列和条件分布函数

条件分布列，即散点情况：
$$
\begin{aligned}
p_{i|j} = P(X=x_i\ |\ Y=y_j) = \frac{P(X=x_i,Y=y_i)}{P(Y=y_i)} = \frac{p_{ij}}{p_{\cdot j}}, \quad i=1,2,\cdots \\
p_{j|i} = P(Y=y_j\ |\ X=x_i) = \frac{P(X=x_i,Y=y_i)}{P(X=x_i)} = \frac{p_{ij}}{p_{i\cdot }}, \quad j=1,2,\cdots
\end{aligned}
$$
我们称：

- $p_{i|j}$ 为在给定 $Y=y_j$ 的条件下 $X$ 的条件分布列

- $p_{j|i}$ 为在给定 $X=x_i$ 的条件下 $Y$ 的条件分布列

条件分布函数，即点集情况：
$$
\begin{aligned}
F(x|y_j) = P(X \le x\ | \ Y=y_j) = \sum _{x_i\le x} \frac{p_{ij}}{p_{\cdot j}} \\
F(y|x_i) = P(Y \le y\ | \ X=x_i) = \sum _{y_j\le y} \frac{p_{ij}}{p_{i \cdot}}
\end{aligned}
$$
我们称：

- $F(x|y_j)$ 为在给定 $Y=y_j$ 的条件下 $X$ 的条件分布函数
- $F(y|x_i)$ 为在给定 $X=x_i$ 的条件下 $Y$ 的条件分布函数

#### 3.3.2 连续型随机向量的条件密度函数和条件分布函数

条件密度函数，即联合分布的概率密度曲面上，约束了某一维度的随机变量为定值，于是条件密度函数的图像就是一个空间曲线：
$$
\begin{aligned}
p(x|y) = \frac{p(x,y)}{p_Y(y)}, \quad -\infty < x < +\infty \\
p(y|x) = \frac{p(x,y)}{p_X(x)}, \quad -\infty < y < +\infty
\end{aligned}
$$
我们称：

- $p(x|y)$ 为在给定 $Y=y$ 的条件下 $X$ 的条件密度函数
- $p(y|x)$ 为在给定 $X=x$ 的条件下 $Y$ 的条件密度函数

条件分布函数，即上述曲线的分段积分结果：
$$
\begin{aligned}
F(x|y) = P(X \le x \ | \ Y=y) = \int_{-\infty}^x \frac{p(u,y)}{p_Y(y)} du,\quad -\infty < x < +\infty \\
F(y|x) = P(Y \le y \ | \ X=x) = \int_{-\infty}^y \frac{p(x,v)}{p_X(x)} dv, \quad -\infty < y < +\infty
\end{aligned}
$$
我们称：

- $F(x|y)$ 为在给定 $Y=y$ 的条件下 $X$ 的条件分布函数
- $F(y|x)$ 为在给定 $X=x$ 的条件下 $Y$ 的条件分布函数

### 3.4 随机变量的独立性

{% note light %}

本目主要介绍随机变量的独立性。我们知道随机事件之间是有独立性的，即满足 $P(AB)=P(A)P(B)$ 的事件，那么随机变量之间也有独立性吗？答案是有的，以生活中的例子为实例，比如我和某个同学进教室，就是独立的两个随机变量。下面开始介绍。

{% endnote %}

- 定义：我们定义如果两个随机变量的分布函数满足下式，则两个随机变量相互独立：
    $$
    F(x,y)=F_X(x)F_Y(y)
    $$

- 性质：对于随机向量 $(X,Y)$

    1. 随机变量 $X$ 和 $Y$ 相互独立的充分必要条件是：
        $$
        \begin{aligned}
        \text{离散型:}& P(X=x_i,Y=y_j) = P(X=x_i)P(Y=y_j) \\
        \text{连续型:}& p(x,y) = p_X(x)p_Y(y)
        \end{aligned}
        $$

    2. 若随机变量 $X$ 和 $Y$ 相互独立，且 $h(\cdot)$ 和 $g(\cdot)$ 连续，则 $h(X),g(Y)$ 也相互独立

### 3.5 随机向量函数的分布

{% note light %}

在 2.4 目中我们了解到了随机变量函数的分布，现在我们讨论随机向量函数的分布。在生活中，假设我们已经知道了一个人群中所有人的身高和体重的分布情况，现在想要血糖根据身高和体重的分布情况，就需要用到本目的理念。我们从离散型和连续型随机向量 $(X,Y)$ 出发，讨论 $g(X,Y)$ 的分布情况。

{% endnote %}

#### 3.5.1 离散型随机向量函数的分布

按照规则枚举即可。

#### 3.5.2 连续型随机向量函数的分布

与连续型随机变量函数的分布类似，这类题目一般也是：给定随机向量 $(X,Y)$ 的密度函数 $p(x,y)$ 和 映射函数 $g(x,y)$，现在需要求解 $Z=g(X,Y)$ 的分布函数（若 $g(x,y)$ 二元连续，则 $Z$ 也是连续型随机变量）。方法同理，先求解 $Z$ 的分布函数，再对 $z$ 求导得到密度函数 $p_Z(z)$​。接下来我们介绍两种常见随机向量的分布。

**(1) 和的分布：**

- 先求分布函数 $F_Z(z)$：
    $$
    \begin{aligned}
    F_Z(z) &= P(X+Y \le z) \\
    &= \iint\limits_{x+y \le z} p(x,y) dxdy \\
    
    &\begin{align}
    &= \int _{-\infty}^z \left [ \int_{-\infty}^{+\infty} p(x,t-x)dx \right ] dt \\
    &= \int _{-\infty}^z \left [ \int_{-\infty}^{+\infty} p(t-y,y)dy \right ] dt
    \end{align}
    
    \end{aligned}
    $$
    
- 由分布函数定义：
    $$
    F_X(x) = \int_{-\infty}^xp(u)du
    $$
    
- 所以可得 $Z=X+Y$ 的密度函数 $p_Z(z)$ 为：
    $$
    \begin{aligned}
    p_Z(z) = \int_{-\infty}^{+\infty} p(x,z-x)dx \quad &(1) \\
    p_Z(z) = \int_{-\infty}^{+\infty} p(z-y,y)dy \quad &(2) \\
    \end{aligned}
    $$
    
- 若 X 和 Y 相互独立，还可得卷积式：
    $$
    \begin{aligned}
    p_Z(z) &= \int_{-\infty}^{+\infty} p(x,z-x)dx \\
    &= \int_{-\infty}^{+\infty} p_X(x)\cdot p_Y(z-x) dx \quad &(1) \\
    p_Z(z) &= \int_{-\infty}^{+\infty} p(z-y,y)dy \\
    &= \int_{-\infty}^{+\infty} p_X(z-y)\cdot p_Y(y) dy \quad &(2)
    \end{aligned}
    $$

补充：可加性。若随机变量 X 和 Y 相互独立，则

1. $X \sim N(\mu_1,\sigma_1^2), Y \sim N(\mu_2,\sigma_2^2) \to X+Y\sim N(\mu_1+\mu_2,\sigma_1^2+\sigma_2^2)$
2. $X \sim B(n_1,p), Y \sim B(n_2,p) \to X+Y\sim B(n_1+n_2,p)$
3. $X \sim P(\lambda_1),Y\sim P(\lambda_2) \to X+Y \sim P(\lambda_1+\lambda_2)$

**(2) $M=\max{(X,Y)},\quad N=\min{(X,Y)}$​ 的分布（对于两个相互独立的随机变量 X 和 Y）：**

- 对于 $M=\max{(X,Y)}$ 的分布函数，有：
    $$
    \begin{aligned}
    F_M(z) &= P(M \le z) \\
    &= P(\max{(X,Y)} \le z) \\
    &= P(X \le z, Y \le z) \\
    &= P(X \le z) \cdot P(Y \le z) \\
    &= F_X(z) \cdot F_Y(z)
    \end{aligned}
    $$

- 对于 $N=\min{(X,Y)}$ 的分布函数，有：
    $$
    \begin{aligned}
    F_N(z) &= P(N \le z) \\
    &= P(\min{(X,Y)} \le z) \\
    &= 1 - P(\min{(X+Y)} \ge z) \\
    &= 1 - P(X \ge z,Y \ge z) \\
    &= 1 - P(X \ge z) \cdot P(Y \ge z) \\
    &= 1 - [1 - F_X(z)] \cdot [1 - F_Y(z)]
    \end{aligned}
    $$

- 若拓展到 $n$ 个相互独立且同分布的随机变量，则有：
    $$
    \begin{aligned}
    F_M(z) &= [F(z)]^n \\
    p_M(z) &= np(z)[F(z)]^{n-1}
    \end{aligned}
    $$

    $$
    \begin{aligned}
    F_N(z) &= 1 - [1-F(z)]^n \\
    p_N(z) &= np(z)[1-F(z)]^{n-1}
    \end{aligned}
    $$

## 第4章 随机变量的数字特征

{% note light %}

本章我们将学习随机变量的一些数字特征。所谓的数字特征其实就是随机变量分布的一些内在属性，比如均值、方差、协方差等等，有些分布特性甚至可以通过某个数字特征而直接觉得。其中**期望**和**方差**往往用来衡量单个随机变量的特征，而**协方差**与**相关系数**则是用来衡量随机变量之间的数字特征。接下来开始介绍。

{% endnote %}

### 4.1 数学期望

{% note light %}

**加权平均**概念的严格数学定义。

{% endnote %}

#### 4.1.1 随机变量的数学期望

- 离散型
    $$
    EX = \sum_{i=1}^{\infty} x_i p_i
    $$
    
- 连续型
    $$
    \begin{aligned}
    &EX = \int_{-\infty}^{+\infty} xp(x)dx
    \end{aligned}
    $$

#### 4.1.2 随机变量函数的数学期望

- 离散型

    - 一元
        $$
        Eg(X) = \sum_{i=1}^{\infty}g(x_i)p_i
        $$

    - 二元
        $$
        Eg(X,Y) = \sum_{i=1}^{\infty}\sum_{j=1}^{\infty}g(x_i,y_i)p_{ij}
        $$

- 连续型

    - 一元
        $$
        Eg(X) = \int_{-\infty}^{+\infty}g(x)p(x)dx
        $$

    - 二元
        $$
        Eg(X,Y) = \int_{-\infty}^{+\infty}\int_{-\infty}^{+\infty}g(x_i,y_i)p(x,y)dxdy
        $$

#### 4.1.3 数学期望的性质

1. $EC=C$
2. $E(CX)=CEX$
3. $E(X+Y)=EX+EY$
4. 若 $X$ 和 $Y$ 相互独立，则 $E(XY)=EXEY$

### 4.2 方差

{% note light %}

随机变量的取值与均值之间的**离散程度**。

{% endnote %}

#### 4.2.1 方差的定义

我们定义随机变量 $X$ 的方差 $D(X)$ 为：（全部可由期望的性质推导而来）
$$
\begin{aligned}
D(X) &= E\left[(X-EX)^2\right ] \\
&= E\left ( X^2 \right ) - (EX)^2
\end{aligned}
$$

#### 4.2.2 方差的性质

下列方差的性质全部可由上述方差的定义式，结合期望的性质推导而来：

1. $D(aX+b) = a^2D(X)$
2. 若 $X_1,X_2,\cdots$ 相互独立，则 $D(aX_1 \pm bX_2 \pm \cdots) = a^2D(X_1) + b^2D(X_2) + \cdots$
3. $E\left[ (X-EX)^2 \right] \le E \left [ (X-C)^2 \right ]$​
4. 切比雪夫不等式~~（本以为不要求掌握的，但是被小测拷打了，补一下）~~：$\displaystyle \forall \epsilon >0, P(|X - EX| < \epsilon) \ge 1 - \frac{DX}{\epsilon^2}$

### 4.3 常见概型的结论与推导（补）

|  类型  |   分布    |                          符号                           |            期望 $E(X)$            |             方差 $D(X)$             |
| :----: | :-------: | :-----------------------------------------------------: | :-------------------------------: | :---------------------------------: |
| 离散型 | 0-1 分布  | $X \sim \begin{pmatrix} 0 & 1 \\ 1-p & p \end{pmatrix}$ |                $p$                |              $p(1-p)$               |
|  ---   | *二项分布 |                     $X \sim B(n,p)$                     |               $np$                |              $np(1-p)$              |
|  ---   | 几何分布  |                      $X \sim G(p)$                      |    $\displaystyle \frac{1}{p}$    |   $\displaystyle \frac{1-p}{p^2}$   |
|  ---   | *泊松分布 |                   $X \sim P(\lambda)$                   |             $\lambda$             |              $\lambda$              |
| 连续型 | 均匀分布  |                     $X \sim U[a,b]$                     |   $\displaystyle \frac{a+b}{2}$   | $\displaystyle \frac{(b-a)^2}{12}$  |
|  ---   | 指数分布  |                   $X \sim e(\lambda)$                   | $\displaystyle \frac{1}{\lambda}$ | $\displaystyle \frac{1}{\lambda^2}$ |
|  ---   | *正态分布 |                $X \sim N(\mu,\sigma^2)$                 |               $\mu$               |             $\sigma^2$              |

注：打星号表示在两个随机变量相互独立时，具备可加性

{% fold light @推导 %}

推导的根本方式还是从定义出发。当然为了省事也可以从性质出发。

0-1 分布

![0-1 分布](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404202313030.jpg)

二项分布

![二项分布](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404202313503.jpg)

几何分布

![几何分布](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404202313329.jpg)

泊松分布

![泊松分布](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404202313316.jpg)

均匀分布

![均匀分布](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404202313239.jpg)

指数分布

![指数分布](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404202313832.jpg)

{% endfold %}


### 4.4 协方差与相关系数

#### 4.4.1 协方差

定义：随机变量 X 与 Y 的协方差 $Cov(X,Y)$ 为：
$$
\begin{aligned}
Cov(X,Y)&= E[(X-EX)(Y-EY)] \\
&= E(XY) - EXEY
\end{aligned}
$$
特别的：
$$
Cov(X,X) = DX
$$
性质：

1. 交换律：$Cov(X,Y)=Cov(Y,X)$
2. 提取率：$Cov(aX,bY)=abCov(X,Y)$
3. 分配率：$Cov(X_1+X_2,Y) = Cov(X_1,Y)+Cov(X_2,Y)$
4. 独立性：若 X 与 Y 相互独立，则 $Cov(X,Y)=0$；反之不一定成立
5. 放缩性：$\left[Cov(X,Y)\right]^2 \le DX \cdot Dy$

#### 4.4.2 相关系数

定义：相关系数 $\rho$ 是用来刻画两个随机变量之间**线性**相关关系强弱的一个数字特征，注意是线性关系。$|\rho|$ 越接近 0，则说明两个随机变量越不线性相关；$|\rho|$ 越接近 1，则说明两个随机变量越线性相关，定义式为
$$
\rho_{X,Y} = \frac{Cov(X,Y)}{\sqrt{DX}\sqrt{DY}}
$$
特别的：

1. 若 $0 < \rho < 1$，则称 X 与 Y 正相关
2. 若 $-1<\rho<0$，则称 X 与 Y 负相关

性质：

1. 放缩性（由协方差性质5可得）：$|\rho| \le 1$
2. 独立性（由协方差性质4可得）：若 X 与 Y 相互独立，则 $p=0$；反之不一定成立
3. 线性相关性（不予证明）：$|\rho|=1$ 的充分必要条件是存在常数 $a(a\ne0),b$ 使得 $P(Y=aX+b)=1$

#### 4.4.3 独立性与线性相关性（补）

一般的：对于两个随机变量 $X$ 和 $Y$

- $X$ 和 $Y$ 相互独立 $\rightarrow$ $X$ 和 $Y$ 线性无关（可以用线性相关的定义式结合协方差计算公式导出）
- $X$ 和 $Y$ 相互独立 $\nleftarrow$ $X$ 和 $Y$ 线性无关（因为有可能出现 $X$ 和 $Y$ 非线性相关）

特别的：对于满足二维正态分布的随机变量 $X$ 和 $Y$，即 $(X,Y) \sim (\mu_1,\mu_2,\sigma_1^2,\sigma_2^2,\rho)$

- $X$ 和 $Y$ 相互独立 $\rightarrow$ $X$ 和 $Y$ 线性无关
- $X$ 和 $Y$ 相互独立 $\leftarrow$ $X$ 和 $Y$​ 线性无关

{% fold light @证明 - 二维正态分布的两个随机变量：相互独立 等价于 线性无关 %}

![二维正态分布的两个随机变量：相互独立 等价于 线性无关](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404261112302.jpg)

参考：https://www.zhihu.com/question/29641138

{% endfold %}

## 第5章 大数定律与中心极限定理

{% note light %}

本章只需要知道一个**独立同分布中心极限定理**即可，至于**棣莫弗-拉普拉斯中心极限定理**其实就是前者的 $\{X_i\}_{i=1}^{\infty}$ 服从伯努利 $n$ 重分布罢了。

{% endnote %}

### 独立同分布中心极限定理

定义：$\{X_i\}_{i=1}^{\infty}$ 独立同分布且非零方差，其中 $EX_i=\mu,DX_i=\sigma^2$，则
$$
\begin{aligned}
\sum_{i=1}^n &\sim N(\sum_{i=1}^n(EX_i),\sum_{i=1}^n(DX_i)) \\
&\sim N(n\mu,n\sigma^2)
\end{aligned}
$$
解释：其实就是对于独立同分布的随机事件 $X_i$，在事件数 $n$ 足够大时，就近似为正态分布，这样就可以很方便利用正态分布的性质计算当前事件的概率。至于**棣莫弗-拉普拉斯中心极限定理**就是上述 $\mu=p,\sigma^2=p(1-p)$ 的特殊情况罢了

## 第6章 数理统计的基本概念

{% note light %}

开始统计学之旅。

{% endnote %}

### 6.1 总体与样本

~~类比 ML：数据集=总体，样本=样本。~~

我们只研究一种样本：简单随机样本 $(X_1,X_2,...,X_n)$。符合下列两种特点：

1. $(X_1,X_2,...,X_n)$ 相互独立
2. $(X_1,X_2,...,X_n)$ 同分布

同样的，我们研究总体 $X$ 的分布与概率密度，一般概率密度会直接给，需要我们在此基础之上研究所有样本的联合密度：

- 分布：由于样本相互独立，故：
    $$
    F(x_1,x_2,...,x_n)=F(x_1)F(x_2) \cdots F(x_n)
    $$

- 联合密度：同样由于样本相互独立，故：
    $$
    p(x_1,x_2,...,x_n)=p(x_1)p(x_2) \cdots p(x_n)
    $$

### 6.2 经验分布与频率直方图

经验分布函数是利用样本得到的。也是给区间然后统计样本频度进而计算频率，只不过区间长度不是固定的。

频率直方图就是选定**固定**的区间长度，然后统计频度进而计算频率作图。

### 6.3 统计量

**统计量定义**：关于样本不含未知数的表达式。

**常见统计量**：假设 $(X_1,X_2,...,X_n)$ 为来自总体 $X$ 的简单随机样本

一、样本均值和样本方差

- 样本均值：$\displaystyle \overline{X} = \frac{1}{n} \sum_{i=1}^n X_i$
- 样本方差：$\displaystyle S_0^2 = \frac{1}{n} \sum_{i=1}^n (X_i - \overline{X})^2 = \frac{1}{n}\sum_{i=1}^n X_i^2 - \overline{X}^2$
- 样本标准差：$\displaystyle S_0 = \sqrt{S_0^2}$
- 修正样本方差：$\displaystyle S^2 = \frac{1}{n-1} \sum_{i=1}^n (X_i - \overline{X})^2$
- 修正样本标准差：$\displaystyle S = \sqrt{S^2}$
  {% fold light @推导 %}

  设总体 $X$ 的数学期望和方差分别为 $\mu$ 和 $\sigma^2$，$(X_1,X_2,...,X_n)$ 是简单随机样本，则：

  ![样本均值的数学期望与总体的数学期望相等](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202405101145088.png)

  即：样本均值的数学期望 $=$ 总体的数学期望

  ![样本方差的数学期望与总体的数学期望 不相等](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202405101148690.png)

  即：样本方差的数学期望 $\ne$ 总体的数学期望

  ![修正样本方差推导](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202405101148126.png)

  上图即：修正样本方差推导
  
  {% endfold %}
  
- 样本 $k$ 阶原点矩：$\displaystyle A_k = \frac{1}{n} \sum_{i=1}^n X_i^k,\quad k=1,2,\cdots$

- 样本 $k$ 阶中心矩：$\displaystyle B_k = \frac{1}{n} \sum_{i=1}^n (X_i-\overline{X})^k,\quad k=2,3,\cdots$

二、次序统计量

- 序列最小值
- 序列最大值
- 极差 = 序列最大值 - 序列最小值

### 6.4 正态总体抽样分布定理

{% note light %}

时刻牢记一句话：构造性定义！

{% endnote %}

#### 6.4.1 $\chi^2$ 分布、$t$ 分布、$F$​ 分布

**分位数**

- 我们定义实数 $\lambda_\alpha$ 为随机变量 $X$ 的上侧 $\alpha$ 分位数（点）当且仅当 $P(X > \lambda_\alpha) = \alpha$​
- 我们定义实数 $\lambda_{1-\beta}$ 为随机变量 $X$ 的下侧 $\beta$ 分位数（点）当且仅当 $P(X < \lambda_{1-\beta})=\beta$

**$\chi^2$ 分布**

{% fold light @密度函数图像 %}

![密度函数图像](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202405171013305.webp)

{% endfold %}

定义：

- 对于 $n$ 个独立同分布的标准正态随机变量 $X_1,X_2,\cdots ,X_n$，若 $Y = X_1^2 + X_2^2 + \cdots + X_n^2$
- 则 $Y$ 服从自由度为 $n$ 的 $\chi^2$ 分布，记作：$Y \sim \chi^2(n)$

性质：

- 可加性：若 $Y_1 \sim \chi^2(n_1), Y_2 \sim \chi^2(n_2)$ 且 $Y_1,Y_2$ 相互独立，则 $Y_1+Y_2 \sim \chi^2(n_1+n_2)$

- 统计性：对于 $Y \sim \chi^2(n)$，有 $EY = n, DY = 2n$

  {% fold light @推导 %}
  EY 的推导利用：$EX^2 = DX - (EX)^2$
  
  ![EY 的推导](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202405211524059.png)
  
  DY 的推导利用：方差计算公式、随机变量函数的数学期望进行计算
  
  ![DY 的推导](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202405211524574.png)
  
  {% endfold %}

**$t$ 分布**

{% fold light @密度函数图像 %}

![密度函数图像](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202405171014091.webp)

{% endfold %}

定义：

- 若随机变量 $X \sim N(0, 1),Y \sim \chi^2 (n)$ 且 $X,Y$ 相互独立
- 则称随机变量 $T = \displaystyle \frac{X}{\sqrt{Y/n}}$ 为服从自由度为 $n$ 的 $t$ 分布，记作 $T \sim t(n)$​

性质：

- 密度函数是偶函数，具备对称性

**$F$ 分布**

{% fold light @密度函数图像 %}

![密度函数图像](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202405171015933.webp)

{% endfold %}

定义：

- 若随机变量 $X \sim \chi^2(m), Y \sim \chi^2(n)$ 且相互独立
- 则称随机变量 $G=\displaystyle \frac{X/m}{Y/n}$ 服从自由度为 $(m,n)$ 的 $F$ 分布，记作 $G \sim F(m, n)$​

性质：

- 倒数自由度转换：$\displaystyle \frac{1}{G} \sim F(n, m)$
- [三变性质](https://zhuanlan.zhihu.com/p/382940609)：$\displaystyle F_{1-\alpha}(m, n) = \left [F_\alpha (n, m)\right]^{-1}$

#### 6.4.2 正态总体抽样分布基本定理

设 $X_1,X_2,\cdots ,X_n$ 是来自正态总体 $N(\mu, \sigma^2)$ 的简单随机样本，$\overline{X},S^2$ 分别是样本均值和修正样本方差。则有：

定理：

- $\displaystyle \overline{X} \sim N(\mu, \frac{\sigma^2}{n})$
- $\displaystyle \frac{(n-1)S^2}{\sigma^2} \sim \chi^2(n-1)$
- $\overline{X}$ 和 $S^2$ 相互独立

推论：

- $\displaystyle \frac{\sqrt{n}(\overline{X} - \mu)}{S} \sim t(n-1)$

## 第7章 参数估计

{% note light %}

有些时候我们知道数据的分布类型，但是不清楚表达式中的某些参数，这就需要我们对其中的参数进行估计。本章我们将从点估计、估计评价、区间估计三部分出发进行介绍。

{% endnote %}

### 7.1 点估计

{% note light %}

所谓点估计策略，就是直接给出参数的一个估计值。本目我们介绍点估计策略中的两个方法：矩估计法、极大似然估计法。

{% endnote %}

#### 7.1.1 矩估计法

其实就一句话：我们用样本的原点矩 $A_k$ 来代替总体 $E(X^k)$，$k$ 个未知参数就需要用到 $k$ 个原点矩：
$$
E(X^k) = A_k =  \frac{1}{n}\sum_{i=1}^nX_i^k
$$

#### 7.1.2 极大似然估计法

基本原理是：在当前样本数据的局面下，我们希望**找到合适的参数使得当前的样本分布情况发生的概率最大**。由于各样本相互独立，因此我们可以用连乘的概率公式来计算当前局面的概率值 $L(\theta;x_1,x_2,\cdots,x_n)$。

上述 $L(\theta;x_1,x_2,\cdots,x_n)$ 即似然函数，目标就是选择适当的参数 $\theta$ 来最大化似然函数。无论是离散性还是连续型，都可以采用下面的方式来计算极大似然估计：

1. 写出似然函数 $L(\theta)$
2. 将上述似然函数取对数
3. 求对数似然函数关于所有未知参数的偏导并计算极值点
4. 解出参数关于样本统计量的表达式

离散型随机变量的似然函数表达式
$$
L(\theta) = \prod_{i=1}^n p(x_i;\theta) = \prod_{i=1}^n P(X_i = x_i)
$$
连续型随机变量的似然函数表达式
$$
L(\theta) = \prod_{i=1}^n p(x_i;\theta)
$$
当然也有一些特殊情况我们没法进行上述第四步，也就是我们没法得到参数关于样本统计量的表达式。其实就是如何求解一个多元函数的问题，常见的可以直接从原函数恒增或恒减、定义域等角度出发解决问题。

### 7.2 估计量的评价标准

{% note light %}

如何衡量不同的点估计方法好坏？我们引入三种点估计量的评价指标：无偏性、有效性、一致性。其中一致性一笔带过，不做详细讨论。补充一点，参数的估计量 $\theta$ 是关于样本的统计量，因此可以对其进行求期望、方差等操作。

{% endnote %}

#### 7.2.1 无偏性

顾名思义，就是希望估计出来的参数量尽可能不偏离真实值。我们定义满足下式的估计量 $\hat \theta$ 为真实参数的无偏估计：
$$
E\hat \theta =\theta
$$

#### 7.2.2 有效性

有效性是基于比较的定义方法。对于两个无偏估计 $\hat\theta_1,\hat\theta_2$，谁的方差越小谁就越有效。即若 $D(\hat\theta_1),D(\hat\theta_2)$ 满足下式，则称 $\hat\theta_1$ 更有效
$$
D(\hat\theta_1) < D(\hat\theta_2)
$$

#### 7.2.3 一致性

即当样本容量 n 趋近于无穷时，参数的估计值也能趋近于真实值，则称该估计量 $\hat\theta$ 为 $\theta$ 的一致估计量

### 7.3 区间估计



## 第8章 假设检验

### 8.1 假设检验的基本概念

### 8.2 正态总体均值的假设检验

### 8.3 正态总体方差的假设检验

### 8.4 皮尔逊的卡方检验法

### 8.5 假设检验与区间估计的关系及p值问题

## 第9章 方差分析与回归分析初步

### 9.1 单因素方差分析

### 9.2 一元线性回归分析

### 9.3 可化为一元线性回归分析简介
