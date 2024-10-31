---
title: OptMethod
categories:
  - GPA
  - 4th-term
category_bar: true
---

## 最优化方法

## 前言

|  课程名称  |    选用教材    | 版次 |  作者  |     出版社     |      ISBN号       |
| :--------: | :------------: | :--: | :----: | :------------: | :---------------: |
| 最优化算法 | 《最优化方法》 |  2   | 孙文瑜 | 高等教育出版社 | 978-7-04-029763-8 |

## 第一章 基本概念

### 1.1 最优化问题简介

本目主要讲解最优化问题的一些分类，下附脑图（由 Xmind 软件制作）：

{% fold light @分类脑图 %}

![分类脑图](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403091214182.png)

{% endfold %}

### 1.2 凸集和凸函数

{% note light %}

由于本书介绍的最优化求解方法一般只适用于求解**局部最优解**，那么如何确定**全局最优解**呢？以及如何确定**唯一的全局最优解**呢？本目揭晓答案：
$$
(\text{唯一})\text{全局最优解}=\text{局部最优解}+(\text{严格})\text{凸目标函数}+\text{凸可行域}
$$
其中凸可行域包含于凸集，凸目标函数包含于凸函数，凸目标函数+凸可行域的问题称为凸规划问题。因此本目将分别介绍凸集、凸函数和凸规划三个概念。

{% endnote %}

#### 1.2.1 凸集

**凸集的定义**：若集合中任意两点的线性组合都包含于集合，则称该集合为凸集。符号化即：
$$
\begin{aligned}
\forall \quad x,y \in D \ \land \ \lambda \in [0,1] \\
s.t. \quad \lambda x+(1-\lambda)y \in D \\
\end{aligned}
$$
**凸集的性质**：设 $D_1,D_2 \subset R^n$ 均为凸集（下列 $x,y$ 均表示向量），则：

1. 两凸集的交 $D_1 \cap D_2 = \{x\ |\ x \in D_1 \land x \in D_2\}$ 是凸集
2. 两凸集的和 $D_1 + D_2 = \{x,y\ |\ x \in D_1 , y \in D_2\}$ 是凸集
3. 两凸集的差 $D_1 - D_2 = \{x,y\ |\ x \in D_1 , y \in D_2\}$ 是凸集
4. 对于任意非零实数 $\alpha$，集合 $\alpha D_1 = \{ \alpha x \ |\ x \in D_1 \}$​ 是凸集

{% fold light @证明 %}
![凸集的性质证明](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403101941905.png)
{% endfold %}

**凸集的应用**

1. 刻画可行域
    - 凸组合定义
        $$
        \begin{aligned}
        \text{设}\ x^{(1)},x^{(2)}, \cdots, x^{(p)} \in R^n ,\text{且}\ \sum_{i=1}^p \alpha_i = 1(a_i \ge 0)  \\
        s.t. \quad x = \alpha_1x^1 + \alpha_2x^2 + \cdots + \alpha_px^p  \\
        \text{则称}\ x\ \text{为向量}\ x^{(1)},x^{(2)}, \cdots, x^{(p)}\ \text{的凸组合}
        \end{aligned}
        $$
    
    - 凸组合定理：$D \in R^n$ 是凸集的充分必要条件是 $D$ 中任取 $m$ 个点 $x^i(1,2,\cdots m)$ 的凸组合任属于 $D$，即：
        $$
        \sum_{i=1}^m \alpha_ix_i \in D\left( \alpha_i \ge 0(i=1,2,\cdots,m),\sum_{i=1}^m \alpha_i = 1 \right)
        $$
    
      {% fold light @凸组合定理证明 %}
      ![凸组合定理证明](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403102025159.png)
      {% endfold %}

2. 分析最优解的最优性条件
    - 超平面定义（凸集分离定理）：设 $D_1,D_2 \subset R^n$ 为两非空凸集，若存在非零向量 $\alpha \in R^n$ 和实数 $\beta$，使得
        $$
        \begin{aligned}
        D_1 \subset H^+ = \{ x \in R^n \ | \ \alpha^T x \ge \beta\} \\
        D_2 \subset H^- = \{ x \in R^n \ | \ \alpha^T x \le \beta\}
        \end{aligned}
        $$
        则称超平面 $H = \{ x \in R^n \ | \ \alpha^Tx=\beta \}$ **分离**集合 $D_1$ 和 $D_2$，**严格分离**时上述不等式无法取等
    
    - 投影定理：设 $D \in R^n$ 是非空闭凸集，$y \in R^n$ 但 $y \notin D$，则
        $$
        \begin{align*}
            (1)& \text{存在唯一的点} \ \overline x \in D,\text{使得集合}D\text{到点} y \text{的距离最小} \\
            (2)& \overline x \in D \text{是点} y \text{到集合D的最短距离点的充分必要条件为}:\forall x \in D,<x-\overline x,y - \overline x> \le 0
        \end{align*}
        $$

#### 1.2.2 凸函数

凸函数的定义：设函数 $f(x)$ 在凸集 $D$ 上有定义

- 若 $\forall x,y \in D\ \text{和}\ \lambda \in [0,1]$ 有 $f(\lambda x + (1-\lambda)y) \le \lambda f(x) + (1-\lambda)f(y)$，则称 $f(x)$ 是凸集 $D$ 上的凸函数
- 若 $\forall x,y \in D\ \text{和}\ \lambda \in (0,1)$ 有 $f(\lambda x + (1-\lambda)y) < \lambda f(x) + (1-\lambda)f(y)$，则称 $f(x)$ 是凸集 $D$ 上的严格凸函数

凸函数的性质：

1. 如果 $f$ 是定义在凸集 $D$ 上的凸函数，实数 $\alpha \ge 0$，则 $\alpha f$ 也是凸集 $D$ 上的凸函数
2. 如果 $f_1,f_2$ 是定义在凸集 $D$ 上的凸函数，则 $f_1+f_2$ 也是凸集 $D$ 上的凸函数
3. 如果 $f_i(x)(i=1,2,\cdots,m)$ 是非空凸集 $D$ 上的凸函数，则 $f(x) = \max_{1 \le i \le m} |f_i(x)|$ 也是凸集 $D$ 上的凸函数
4. 如果 $f_i(x)(i=1,2,\cdots,m)$ 是非空凸集 $D$ 上的凸函数，则 $f(x) = \displaystyle \sum_{i=1}^m \alpha_i f_i(x)\quad(\alpha_i \ge 0)$ 也是凸集 $D$​ 上的凸函数

{% fold light @凸函数的性质证明 %}

![第1、2条](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403112030190.png)

![第4条](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403112030160.png)

{% endfold %}

**凸函数的判定定理**：

1. 函数值角度：函数 $f(x)$ 是 $R^n$ 上的凸函数的充分必要条件是 $\forall x,y \in R^n$，单变量函数 $\phi(\alpha)=f(x + \alpha y)$ 是关于 $\alpha$ 的凸函数

    {% fold light @凸函数的判别定理证明：函数值角度 %}

    ![凸函数的判别定理证明 - 函数值角度](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403131019868.png)

    {% endfold %}

2. 一阶梯度角度：设 $f(x)$ 是定义在非空开凸集 $D$ 上的可微函数，则：

    - $f(x)$ 是 $D$ 上凸函数的充分必要条件是：$f(y) \ge f(x)+\nabla f(x)^T(y-x), \quad \forall x,y \in D$
    - $f(x)$ 是 $D$ 上严格凸函数的充分必要条件是：$f(y) > f(x)+\nabla f(x)^T(y-x), \quad \forall x,y \in D,\quad x \ne y$

    {% fold light @凸函数的判别定理证明：一阶导数角度 %}
    无需掌握证明，但是为了便于理解性记忆，可以从**二次凸函数**进行辅助理解记忆。

    ![凸函数的判别定理证明 - 一阶导数角度](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403131018032.png)

    {% endfold %}

3. 二阶梯度角度：设 $f(x)$ 是定义在非空开凸集 $D$ 上的二阶可微函数，则：

    - $f(x)$ 是 $D$ 上凸函数的充分必要条件是：海塞矩阵正半定
    - $f(x)$ 是 $D$ 上严格凸函数的充分必要条件是：海塞矩阵正定？其实不一定，例如 $x^4$ 是严格凸函数，但是其海塞矩阵是正半定的并非正定。因此更严谨的定义应该是：海塞矩阵正定的是严格凸函数，严格凸函数的海塞矩阵是正半定的。

#### 1.2.3 凸规划（个人补充）

本目为个人补充内容，用于整合上述 1.2.1 与 1.2.2 内容。我们知道，学习凸集和凸函数的终极目标是为了求解凸规划问题，凸规划问题可以简述为 **凸可行域 + 凸目标函数 + 局部最优解 = 全局最优解**，那么如何证明这个定理是正确的呢？局部最优解求出来以后，目标函数也确定为凸函数以后，如何确定可行域是凸集呢？下面揭晓：

**证明凸规划问题的正确性**

1. 定理：在可行域是凸集，目标函数非严格凸的情况下，局部最优解 $x^*$​ 也是全局最优解

    {% fold light @证明（反证法） %}
    ![证明（反证法）](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403122016285.png)

    {% endfold %}

2. 定理：在可行域是凸集，目标函数是严格凸的情况下，局部最优解 $x^*$ 也是唯一的全局最优解

    {% fold light @证明（反证法） %}
    ![证明（反证法）](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403122017101.png)
    
    {% endfold %}

**确定可行域是否为凸集**

1. 定理：若约束条件 $c_i(x) \ge 0$ 中每一个约束函数 $c_i(x)$ 都是凹函数，则可行域 $F$ 是凸集

    {% fold light @证明 %}

    ![证明](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403122019899.png)

    {% endfold %}

2. 定理：若约束条件 $c_i(x) \le 0$ 中每一个约束函数 $c_i(x)$ 都是凸函数，则可行域 $F$ 是凸集

    {% fold light @证明 %}

    ![证明](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403122019572.png)

    {% endfold %}

3. 定理：若约束条件中每一个约束函数 $c_i(x)$ 都恒等于零，则可行域 $F$ 是凸集

    {% fold light @证明 %}
    ![证明](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403122019751.png)
    {% endfold %}

### 1.3 最优性条件

{% note light %}

最优性条件是指最优化问题的最优解所必须满足的条件，本目介绍求解**无约束最优化问题**的一阶必要条件和二阶必要条件，再补充介绍二阶充分条件以及针对凸规划问题的二阶充分必要条件。最后简单介绍求解**等式约束最优化问题**的拉格朗日乘子法。

{% endnote %}

#### 1.3.1 下降方向

在开始之前先简单介绍一下「下降方向」这个概念。

- **下降方向**定义：设 $f(x)$ 为定义在空间 $R^n$ 的连续函数，点 $\bar x \in R^n$，若对于方向 $s \in R^n$ 存在数 $\delta >$ 0 使
    $$
    f(\bar x+\alpha s) < f(\bar x),\quad \forall \alpha \in (0,\delta)
    $$
    成立，则称 $s$ 为 $f(x)$ 在 $\bar x$ 处的一个下降方向。在 点 $\bar x$ 处的所有下降方向的全体记为 $D(\bar x)$

- **下降方向**定理：设函数 $f(x)$ 在点 $\bar x$ 处连续可微，如存在非零向量 $s  \in R^n$ 使
    $$
    \nabla f(\bar x)^Ts < 0
    $$
    成立，则 $s$ 是 $f(x)$ 在点 $\bar x$ 处的一个下降方向

    {% fold light @证明 %}
    
    ![证明](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403131639082.jpg)
    
    {% endfold %}

#### 1.3.2 充分必要条件

设 $f:D \subset R^n \to R^1$ 是定义在开集 $D$ 上的函数，$x^* \in D$ 是该函数的局部极小点，$f(x)$ 的一阶导数 $g(x)=\nabla f(x)$，二阶导数 $G(x)=\nabla ^2f(x)$。

- **一阶必要条件**。若目标函数在定义域 D 上连续可微，则 $x^*$ 是局部极小点的一阶必要条件为：
    $$
    g(x^*)=0
    $$

- **二阶必要条件**。若目标函数在定义域 D 上二阶连续可微，则 $x^*$ 是局部极小点的二阶必要条件为：
    $$
    g(x^*)=0,\quad G(x^*)\ge 0
    $$

- **二阶充分条件**。若目标函数在定义域 D 上二阶连续可微，则 $x^*$ 是**严格**局部极小点的二阶充分条件为：
    $$
    g(x^*)=0,\quad G(x^*) \text{是正定的}
    $$

- **充分必要条件（凸最优性定理）**。在无约束最优化问题中，如果目标函数是凸的，则 $x^*$ 是全局极小点的充分必要条件是：
    $$
    g(x^*)=0
    $$

#### 1.3.3 拉格朗日乘子法

如果现在最优化问题不是单纯的**无约束最优化问题**，而是增设了等式约束的**等式约束最优化问题**，如何求解呢？我们引入 $\text{Lagrange}$ 乘子法，将所有的等式约束都转化到目标函数中得到一个等价的无约束最优化问题，即：

对于这样的等式约束最优化问题：
$$
\begin{aligned}
\min\quad& f(x)\\
\text{s.t.}\quad&c_i(x)=0,i=1,2,\cdots,m.
\end{aligned}
$$
引入拉格朗日乘子将其转化为无约束最优化问题，进而利用上述无约束最优化问题的求解策略进行求解：
$$
L(x,\lambda) = f(x) - \sum_{i=1}^m\lambda_ic_i(x)
$$

### 1.4 最优化方法概述

现实生活中，对于常见问题的建模往往是极其复杂的，为了求得最优解，我们需要对建立的模型进行微分算子的求解。但是问题是，尽管我们知道最优解一定存在于微分算子的数值解中，但是我们往往不能很快的计算出其数值解，因此我们需要采用别的方法进行计算。最常用的方法就是本书介绍的迭代法。

大概就两步：确定初值开始判断，如果符合条件的约束则停止迭代得到最终的解；如果不符合约束则对当前迭代值赋予修正量并继续迭代判断。直到找到最终的解。接下来将对 5 个专有名词进行解释，分别为：初始点的选取、迭代点好坏的判定、收敛速度、迭代的终止条件、修正量 $s^{(k)}$ 的确定。

#### 1.4.1 初始点的选取

初始点的选取取决于算法的收敛性能。

- 如果一个算法可以做到全局收敛，则初始点的选取是任意的
- 如果一个算法只能局部收敛，则初始点的选取往往需要尽可能的接近最优解，而这往往是困难的，因为我们并不知道的最优解是什么。此时可以采用借鉴之前的经验来选择初始点

#### 1.4.2 迭代点好坏的判定

判定一个迭代点的好坏时，我们往往会设计一个评价函数，而评价函数的设计取决于约束问题的种类。

- 对于无约束最优化问题。我们可以直接将目标函数 $f(x)$ 设计为评价函数。很显然，如果一个迭代点对应的的函数值比之前点对应的函数值更小，则可以说明当前迭代点由于之前的点
- 对于有约束最优化问题。此时我们不仅仅需要考虑函数值的大小，也要考虑当前迭代点的可行程度（离可行域的距离）。因此此类最优化问题往往既包含目标函数，也包含约束函数。

#### 1.4.3 收敛速度

若当前算法一定收敛，我们还需要判断收敛的速度，接下来介绍收敛的速度。

假设

- 设向量序列 $\{ x^{(k)} \subset R^n \}$ 收敛于 $x^*$​

定义

1. 误差序列：$e_k = x^{(k)} - x^*$
2. 收敛率表达式：$\displaystyle \lim_{k \to \infty} \frac{|| e_{k+1} ||}{||e_k||^r} = C$，并称序列 $\{x^{(k)}\}$ 的 $r$ 阶以 $C$ 为因子收敛于 $x^*$

线性收敛

- 定义：$r=1,0 < C<1$
- 性质：$C$ 越小，算法收敛越快

超线性收敛

- 定义：$r=1,C=0$

- 定理：$r>1$​ 时的算法均为超线性收敛算法

    {% fold light @证明 %}
    ![证明](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403201331819.png)
    {% endfold %}

#### 1.4.4 迭代的终止条件

- 对于收敛速度比较慢的算法：

    根据一阶必要条件，我们知道最优解一定取在微分算子为 0 的向量上，因此我们以下式为终止条件是一种可行的选择
    $$
    ||\nabla f(x^{(k)}|| \le \epsilon
    $$
    但是问题在于这对收敛速度很快的算法不使用，如下图的无约束最优化问题。已知两个局部最优解分别为 $x_1^*,x_2^*$，迭代的两个解分别为 $\overline{x}_1,\overline{x}_2$，可以看出：尽管 2 号点相对于 1 号点更靠近局部最优解，但是由于 2 号点的梯度更大，明显不如 1 号点更加局部最优，因此利用微分算子作为迭代的终止条件不适用于收敛速度快的算法

    ![无约束最优化问题](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403201330908.png)

- 对于超线性收敛的算法：

    一个理想的收敛终止条件为 $||x^{(k)} - x^*|| \le \epsilon$，但是由于最优解 $x^*$ 是未知的，因此该方案不可行，同理 $f(x^*)$ 也是未知的，因此 $||f(x^{(k)}) - f(x^*)|| \le \epsilon$ 也是不可行的。那么有没有什么替代的方案呢？答案是有的。

    1. 方案一：利用**函数解序列**进行替代。即以下式作为迭代的终止条件
        $$
        || x^{(k+1)} - x^{(k)} || \le \epsilon
        $$

        {% fold light @证明 %}
        ![证明](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403201425856.jpg)
        {% endfold %}

    2. 方案二：利用**函数值序列**进行替代。即以下式作为迭代的终止条件
        $$
        || f(x^{(k+1)}) - f(x^{(k)}) || \le \epsilon
        $$

        {% fold light @证明 %}
        ![证明](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403201425473.jpg)
        {% endfold %}

- 一般情况下，对于上述超线性算法的判断收敛的方法，只用其中一种往往不适当。此时一般使用两种方法集成的思路进行判断。

#### 1.4.5 修正量的确定

本书介绍的迭代修正值都是使得当前迭代后的值小于上一个状态的函数值，我们称这类使评价函数值下降的算法为**单调下降算法**。至于如何得出修正量，我们往往通过求解一个相对简单易于求解的最优化问题（通常成为子问题），来计算获得修正量。

## 第二章「约束最优化」线性规划

{% note light %}

目标函数和约束函数都是线性函数。

{% endnote %}

### 2.1 线性规划问题和基本性质

#### 2.1.1 线性规划问题

![线性规划问题的一般形式](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403211918859.png)

#### 2.1.2 图解法

**仅适用于二元变量**的线性规划问题。我们将所有的约束条件全部画到平面直角坐标系中构成一个可行域，然后将目标函数作为一条直线进行平移，直到与可行域初次有交点，则该交点就是最优解对应的点。当然不一定会有交点，一共分为四种情况：

{% fold light @刚好只有一个最优解 %}
![刚好只有一个最优解](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403211917063.png)
{% endfold %}

{% fold light @有无穷多最优解 %}
![有无穷多最优解](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403211920849.png)
{% endfold %}

{% fold light @有无界解 %}
![有无界解](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403211921495.png)
{% endfold %}

{% fold light @无可行解 - 可行域为空集 %}
![无可行解 - 可行域为空集](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403211922747.png)
{% endfold %}

#### 2.1.3 基本性质

1. 线性规划问题的可行域如果非空，则是一个凸集

    {% fold light @证明 %}
    ![证明](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403212109584.jpg)
    {% endfold %}

2. 如果线性规划问题有最优解，那么最优解可在可行域的顶点中确定

3. 如果可行域有界且可行域只有有限个顶点，则问题的最优解必存在，并在这有限个顶点中确定

4. 最优解可由最优顶点处的**有效约束**形成的方程组的解确定

#### 2.1.4 线性规划的标准形

为什么要学习线性规划的标准形？

- 我们要学习单纯形法来计算多维线性规划的最优解
- 单纯形法需要线性规划的具有所谓的标准形

线性规划的标准形的定义：

- 只含有线性等式约束和对变量的非负约束

一般线性规划转化为标准形的方法：

1. 对于目标函数：需要将取 $\max$ 通过**取相反数**转化为取 $\min$
2. 对于约束条件：需要将不等式约束**松弛**转化为等式约束
    - 对于 $\le$ 的不等式约束，等式左边加上非负新变量，从而转化为等式
    - 对于 $\ge$ 的不等式约数，等式左边减去非负新变量，从而转化为等式
3. 对于无约束的变量：需要将其转化为**两个新变量之差**（可正可负），产生了一个新的等式，如果该无约束变量存在于目标函数中，还需要将目标函数中的该变量表示为两个新变量之差

{% fold light @举个例子 %}
![一般线性规划转化为标准形 - 演示](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403212111330.jpg)
{% endfold %}

#### 2.1.5 基本可行解

直接说结论：对于标准形的线性规划问题，其基本可行解就是凸集的顶点。

假设系数矩阵 $A_{m, n}$。基本可行解 $\subset$ 基本解，而基本解的个数 $\le C_{n}^{m}$（因为分块矩阵 $B_{m \times m}$ 不一定可逆）。其中基本可行解需要满足解序列元素非负。如果**基本变量**向量对应的解中含有 0 元素，称其为退化的基本可行解，产生退化的基本可行解的原因是存在可删除的约数条件。

#### 2.1.6 最优解的性质

- 若可行域有界，则线性规划问题的目标函数一定可以在其可行域的顶点上达到最优。

    {% fold light @证明 - 反证法 %}
    ![证明](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403222103333.jpg)
    {% endfold %}

- 有时，目标函数可能在多个顶点处达到最大，这时在这些顶点的**凸组合**上也达到最大值，这时线性规划问题有无限多个最优解。

### 2.2 单纯形法

{% note light %}

本目主要介绍一种常用的计算线性规划问题可行解的方法：单纯形法。其中，**前三条**分别介绍单纯性方法计算步骤的理论可行性，**第四条**具体介绍单纯形法的计算步骤与过程。

{% endnote %}

#### 2.2.1 初始基可行解的确定

1. **直接观察**：直接看出系数矩阵中含有 $m \times m$ 的单位矩阵，则选择该单位矩阵为初始基
2. **加松弛变量**：当所有的约束条件都是 $\le$ 时，每一个约束条件都加一个非负的松弛变量，则这 $m$ 个松弛变量的系数就对应了一个 $m \times m$ 的单位矩阵，选择其为初始基即可
3. **加非负的人工变量**：求解方法与常规的线性规划问题不一样，见下述 2.2.3 条。
    - 对于 $=$ 约束，我们在约束条件的左边加上非负人工变量
    - 对于 $\ge$ 约束，我们先在约束条件的左边减去非负松弛变量，再在约束条件的左边加上非负的人工变量

#### 2.2.2 最优性检验

{% fold light @符号说明 %}

一、当前局面：已经计算出一个基本可行解

1.1 确定线性规划的目标

![确定线性规划的目标](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403281940243.png)

1.2 添加松弛变量

![添加松弛变量](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403281942808.png)

1.3 用非基变量线性表示基变量

![用非基变量线性表示基变量](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403281937210.png)

![向量表示](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403281939336.png)

二、最优性检验

![最优性检验](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403282010283.jpg)

{% endfold %}

1. **唯一最优解**判别定理：对于**目标函数求解最大值**的情形。若 $\forall j \in [m+1, n]$ 有 $\sigma_j \le 0$ 则当前基本可行解 $x^{(k)}$ 为最优解。

2. **无穷多最优解**判别定理：在满足第一条所有的检验数非正的情况下，$\exist j \in [m+1, n]$，有 $\sigma_j=0$，则该线性规划问题有无穷多最优解。

    {% fold light @证明 %}

    我们可以将任意一个检验数为 0 的非基变量与基变量进行置换得到新的一个基本可行解对应的目标函数值保持不变。于是下述凸组合内的可行解都是最优解
    $$
    \begin{aligned}
    & x^{(k)} \\ 
    & s.t. 
    \begin{cases} 
    k &\in& [m+1, n] \\
    \sigma_k &=& 0
    \end{cases}
    \end{aligned}
    $$
    {% endfold %}

3. **无界解**判别定理：pass

4. **无解**判别定理：可行域为空集

#### 2.2.3 计算新的基本可行解

对于**常规**的线性规划问题（初始基本可行解 $x^{(0)}$ 可以直接找到）

1. 向量方程法
    - 确定入基变量：选择目标函数中**系数最大的变量**作为入基变量，即将其对应的系数列向量与出基变量对应的系数列向量进行置换
    - 确定出基变量：线性表示基方程组以后，利用变量非负的特性找到入基变量刚好取 $0$ 时对应的变量即为出基变量（示例的第二轮迭代中出基变量即为 $x_5$）
2. 系数矩阵法
    - pass

对于**添加人工变量**的线性规划问题（初始基本可行解 $x^{(0)}$ 不能直接找到，需要手动构造 $x^{(0)}$）

1. 大 M 法：pass
2. 两阶段法
    - 第一阶段：pass
    - 第二阶段：pass

#### 2.2.4 单纯形表法

向量方程法：

{% fold light @实战演练 %}

![单纯形法的求解步骤 - 1](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403272056146.jpg)

![单纯形法的求解步骤 - 2](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403272056440.jpg)

{% endfold %}

单纯形表法：

{% fold light @实战演练 %}

![实战演练](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404171407440.jpg)

![代码验算](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404171410846.jpg)

{% endfold %}

### 2.3 对偶与对偶单纯形法

#### 2.3.1 确定对偶问题

已知原问题的表达式，如何求解对偶问题的表达式？我们需掌握以下对偶转换规则：

![转化规则](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404071144213.png)

从上图不难发现，其实就是对线性规划的三个部分进行转换：目标函数、m个约束条件、n个自变量，下面分别进行文字介绍：

1. 约束条件：从 m 个变为 n 个
    - **常量矩阵**中的元素为原问题中自变量的系数
    - **二元关系**的变化取决于转化方向
        - max to min：对偶问题约束条件的符号和原问题自变量的符号相同
        - min to max：对偶问题约束条件的符号和原问题自变量的符号相反
    - **线性约束**为原问题线性约束的转置
2. 自变量：从 n 个变为 m 个
    - **二元关系**的变化同样取决于转化方向
        - max to min：对偶问题自变量的符号和原问题约束条件的符号相反
        - min to max：对偶问题自变量的符号和原问题约束条件的符号相同
3. 目标函数：自元个数从 n 个变为 m 个
    - 变元的系数就是原问题中约束条件的常量矩阵对应的元素值

{% fold light @实战演练 %}

![实例](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407081127115.png)

{% endfold %}

#### 2.3.2 对偶定理

- 对称性：对偶问题的对偶问题是原问题
- 无界性：若原问题是无界解，则对偶问题无可行解
- 对偶定理：若原问题有最优解，那么对偶问题也有最优解，且目标函数值相等
- 互补松弛性：若原问题最优解为 $x^*$，对偶问题的最优解为 $y^*$，则有 $x^* y_s=0,y^*x_s=0$，其中 $x_s,y_s$ 分别为原问题的松弛变量和对偶问题的松弛变量

{% fold light @实战演练 %}

![问题](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407081259988.png)

对于上述问题，我们可以先写出其对偶问题：

![对偶问题](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407081300732.png)

显然的对于 $y^*=(\frac{4}{5},\frac{3}{5})^T$，上述 2,3,4 是取不到等号的，对应的 $x^*=(-,0,0,0,-)^T$。还剩两个变量 $x_1,x_5$ 通过 1,5 两个不等式取等进行计算：
$$
\begin{aligned}
x_1+3x_2=4\\
2x_1+x_2=3
\end{aligned}
$$
计算可得 $x_1=1,x_5=1$，于是原问题的最优解 $x^*=(1, 0, 0, 0, 1)^T$

{% endfold %}

#### 2.3.3 对偶单纯形法

{% fold light @实战演练 %}

![实战演练](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404171409291.jpg)

![代码验算](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404171411832.jpg)

{% endfold %}

## 第三章 线性搜索

{% note light %}

本章介绍最优化问题中迭代解 $x_{k+1} = x_k + \alpha_kd_k$ 基于「线性搜索」的迭代方式。

假设搜索方向 $d_{k}$ 是一个定值且一定是下降方向，我们讨论步长因子 $\alpha_{k}$ 的计算选择策略。分为两步：

1. 确定步长的搜索区间
2. 通过精确 or 不精确算法来搜索合适的步长

本章的内容分布：

- 3.1 介绍**确定初始搜索区间**的「进退法」
- 3.2 介绍**缩小搜索区间**的「精确线性搜索算法」：0.618 法、斐波那契法、二分法、插值法
- 3.3 介绍**缩小搜索区间**的「不精确线性搜索算法」：Armijo 准则、Goldstein 准则、Wolfe 准则

{% endnote %}

### 3.1 确定初始搜索区间

确定初始搜索区间 $[a,b]$，我们利用 [进退法](https://zhuanlan.zhihu.com/p/109701879)

### 3.2 精确线性搜索算法

{% fold light @预备知识：单峰函数定理 %}

在正式开始介绍之前，我们先了解**单峰函数定理**：

- 定理：对于在区间 $[a,b]$ 上的一个单峰函数 $f(x)$，$x^* \in [a,b]$ 是其极小点，$x_1$ 和 $x_2$ 是 $[a,b]$ 上的任意两点，且 $a<x_1<x_2<b$，可以通过比较 $f(x_1),f(x_2)$ 的值来确定点的保留和舍弃

- 迭代：

    1. 若 $f(x_1) \ge f(x_2)$ 则 $x^* \in [x_1,b]$

        ![保留右区间](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404121125038.png)

    2. 若 $f(x_1) < f(x_2)$ 则 $x^* \in [a,x_2]$​

        ![保留左区间](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404121125961.png)

    3. 若 $f(x_1) = f(x_2)$ 则 $x^* \in [x_1,x_2]$

于是迭代的关键就在于如何取点 $x_1$ 和 $x_2$，下面开始介绍三种取点方法。

{% endfold %}

{% fold light @计算代码：基于 python 实现 0.618 法、斐波那契法、二分法 %}

迭代计算代码：

```python
class ExactLinearSearch:
    def __init__(self, 
                 a: float, b: float, delta: float, 
                 f: Callable[[float], float], 
                 criterion: str="0.618", max_iter=100) -> None:
        
        self.a = a
        self.b = b
        self.delta = delta
        self.f = f
        self.max_iter = max_iter
        
        if criterion == "0.618":
            new_a, new_b, x_star, count = self._f_goad()
        elif criterion == "fibonacci":
            new_a, new_b, x_star, count = self._f_fibo()
        else: # criterion == "binary"
            new_a, new_b, x_star, count = self._f_binary()

        fixed = lambda x, acc: round(x, acc)
        print(f"算法为：“{criterion}” 法")
        print(f"共迭代：{count} 次")
        print(f"左边界: {fixed(new_a, 4)}")
        print(f"右边界: {fixed(new_b, 4)}")
        print(f"最优解: {fixed(x_star, 4)}")
        print(f"最优值: {fixed(f(x_star), 6)}\n")
        
    
    def _f_goad(self) -> Tuple[float, float, float, int]:
        a, b, delta, f = self.a, self.b, self.delta, self.f
        count = 0

        lam = a + 0.382 * (b - a)
        mu = b - 0.382 * (b - a)

        while count <= self.max_iter:
            phi_lam = f(lam)
            phi_mu = f(mu)

            if phi_lam <= phi_mu:
                b = mu
            else:
                a = lam
            
            lam = a + 0.382 * (b - a)
            mu = b - 0.382 * (b - a)

            if b - lam <= delta:
                return a, b, lam, count
            if mu - a <= delta:
                return a, b, mu, count
            
            count += 1
        
        return a, b, lam if f(lam) <= f(mu) else mu, count

    def _f_fibo(self) -> Tuple[float, float, float, int]:
        a, b, delta, f, max_iter = self.a, self.b, self.delta, self.f, self.max_iter
        count = None

        F = [0.0] * max_iter
        F[1] = F[2] = 1
        for i in range(3, max_iter):
            F[i] = F[i - 1] + F[i - 2]
            if F[i] >= (b - a) / delta:
                count = i - 2
                break
        
        if count == None:
            ValueError("区间过大或精度过高导致，找不到合适的迭代次数")

        lam, mu = a, b
        for i in range(3, count + 1):

            lam = a + (1 - F[i - 1] / F[i]) * (b - a)
            mu = b - (1 - F[i - 1] / F[i]) * (b - a)

            if f(lam) <= f(mu):
                b = mu
            else:
                a = lam

        return a, b, lam if f(lam) <= f(mu) else mu, count
    
    def _f_binary(self) -> Tuple[float, float, float, int]:
        a, b, delta, f, max_iter = self.a, self.b, self.delta, self.f, self.max_iter
        count = None
        
        count = np.ceil(np.log2((b - a) / delta)).astype(int)

        if count > max_iter:
            ValueError("区间过大或精度过高导致迭代次数过高")
    
        for _ in range(count):
            c = (a + b) / 2.0
            if f(c) >= 0.0:
                b = c
            else:
                a = c

        return a, b, c, count
```

分别调用 0.618 法、斐波那契法、二分法进行迭代计算：

```python
a, b, delta = -1, 1, 0.01
f = lambda x: np.exp(-x) + np.exp(x)  # 原函数
calc_goad = ExactLinearSearch(a, b, delta, f, criterion="0.618")
calc_fibo = ExactLinearSearch(a, b, delta, f, criterion="fibonacci")

a, b, delta = -3, 6, 0.1
f = lambda x: 2 * x + 2               # 导函数
calc_bina = ExactLinearSearch(a, b, delta, f, criterion="binary")
```

计算结果为：

```
算法为：“0.618” 法
共迭代：10 次
左边界: -0.0031
右边界: 0.0069
最优解: 0.0007
最优值: 2.000001

算法为：“fibonacci” 法
共迭代：11 次
左边界: -0.0225
右边界: 0.0
最优解: -0.0139
最优值: 2.000193

算法为：“binary” 法
共迭代：7 次
左边界: -1.0312
右边界: -0.9609
最优解: -0.9609
最优值: 0.078125
```

{% endfold %}

#### 3.2.1 0.618 法

基于「函数值」进行选点。

按照黄金分割的比例取点 $x_1$ 和 $x_2$，不断迭代判断 $f(x_1)$ 和 $f(x_2)$ 的值，直到 $b_k-\lambda_k<\delta$ 或 $\mu_k-a_k<\delta$ 则结束迭代，取最优解 $x^*$ 为对应的 $\lambda_k$ 或 $\mu_k$ 即可。
#### 3.2.2 Fibonacci 法

基于「函数值」进行选点。

第 $k$ 次迭代的区间长度是上一个区间长度的 $\frac{F_{n-k}}{F_{n-k+1}}$​，即：
$$
b_{k+1} - a_{k+1} = \frac{F_{n-k}}{F_{n-k+1}} (b_{k} - a_{k})
$$
经过 $n$ 次迭代后，得到区间 $[a_n,b_n]$，且 $b_n-a_n \le \delta$，于是可得：
$$
\begin{aligned}
b_n-a_n &= \frac{F_1}{F_2}(b_{n-1}-a_{n-1}) \\
&= \frac{F_1}{F_2} \frac{F_2}{F_3}(b_{n-2}-a_{n-2}) \\
&= \cdots \\
&= \frac{F_1}{F_2} \frac{F_2}{F_3} \cdots \frac{F_{n-1}}{F_n}(b_{1}-a_{1}) \\
&= \frac{F_1}{F_n}(b_1-a_1) \le \delta
\end{aligned}
$$
在已知上界 $\delta$ 的情况下可以直接计算出 $n$ 的值，于是迭代 $n$ 次即可得到最终的步长值 $\lambda_n$ 或 $\mu_n$

#### 3.2.3 二分法

基于「一阶导数」进行选点。

单调性存在于导数上。极值点左边导数 $<0$，极值点右边导数 $>0$，于是可以进行二分搜索。

#### 3.2.4 插值法

基于「函数值、一阶导数」进行选点。

![三点二次插值法](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404170915756.png)

**三点二次插值法**。给定初始迭代区间 $[a_0,b_0]$ 和初始迭代解 $t_0$。每次在目标函数上取三个点来拟合一个二次函数，通过拟合出来的二次函数的最小值，来更新三个点为 $a_1,b_1,t_1$，直到区间小于上界长度 $\delta$，终止迭代，极小值就是当前状态二次函数的最小值。

那么我们如何求解当前状态二次函数的最小值呢？假定三个已知点为 $x_1<x_2<x_3$，且 $f(x_1)>f(x_2)<f(x_3)$，我们需要知道二次函数的三个参数 $a,b,c$，刚好三个已知点可以得到三个方程，从而解出二次函数的三个未知数。

**两点二次插值法**。只不过少取了一个点，多利用了一个点的导数值来确定二次函数的三个参数罢了，其余迭代过程与三点二次插值完全一致。

### 3.3 不精确线性搜索算法

{% note light %}

精确搜索有时会导致搜索时间过长，尤其是当最优解离当前点还很远时。接下来我们介绍不精确线性搜索方法，在确保每一步的函数值都有充分下降的必要条件下，确保收敛并提升计算效率。真的有这么厉害的算法吗？其实根本逻辑很简单，**Armijo 准则**限定了搜索方向的上界、**Goldstein 准则**在前者的基础上又限定了搜索方向的下界（防止过小导致收敛过慢）、**Wolfe 准则**在前者的基础上又完善了下界的约束（确保不会把可行解排除在搜索区间外）

{% endnote %}

符号定义：我们在已知上一步解 $x_k$ 和下次迭代的下降方向 $d_k$ 的基础上，需要寻找合适的 $\alpha$。于是唯一变量就是 $\alpha$，我们直接定义关于 $\alpha$ 的一元函数 $\phi(\alpha) = f(x_k + \alpha d_k)$，$g_k$ 表示梯度。

#### 3.3.1 Armijo 准则

只限定搜索上界，给定初始点 $x_0$、系数 $\rho$：
$$
f(x_k + \alpha d_k) \le \rho \cdot g_k^Td_k \cdot \alpha + f(x_k)
$$

#### 3.3.2 Goldstein 准则

又限定了搜索下界，同样给定初始点 $x_0$、系数 $\rho$：
$$
\begin{aligned}
f(x_k + \alpha d_k) \le &\rho \cdot g_k^Td_k \cdot \alpha + f(x_k)\\
f(x_k + \alpha d_k) \ge &(1-\rho) \cdot g_k^Td_k \cdot \alpha + f(x_k)
\end{aligned}
$$

#### 3.3.3 Wolfe 准则

完善了搜索下界的约束，即保证新点的梯度 $g_{k+1}^Td_k$ 不低于老点梯度 $g_{k}^Td_k$ 的 $\sigma$ 倍。给定 $x_0,\rho,\sigma$：
$$
\begin{aligned}
f(x_k + \alpha d_k) \le &\rho \cdot g_k^Td_k \cdot \alpha + f(x_k)\\
g(x_k + \alpha_kd_k)^Td_k \ge& \sigma g_{k}^Td_k\\
0 < \rho < \sigma < 1
\end{aligned}
$$

> 参考：
>
> - [路人 - 视频 - 更通俗的解释](https://www.bilibili.com/video/BV11N411m75b/)
> - [路人 - 博客 - 更通俗的解释](https://blog.csdn.net/luzhanbo207/article/details/121559905)

## 第四章「无约束最优化」

{% note light %}

本章介绍无约束函数的最优化算法。其中：

- 最速下降法基于「一阶梯度」。最基本的方法
- 牛顿法基于「二阶梯度」。最主要的方法
- 共轭梯度法基于「一阶梯度」。解大型最优化问题的首选
- 拟牛顿法基于「函数值和一阶梯度」。尤其是其中的 BFGS 是目前最成功的方法

{% endnote %}

{% fold light @极小化 Rosenbrock 函数的 python 代码 %}

目标函数 $f$、一阶梯度 $g$、二阶梯度 $G$、初始点 $x_0$

```python
def f(x: np.ndarray) -> float:
    return (1 - x[0])**2 + 100 * (x[1] - x[0]**2)**2


def g(x: np.ndarray) -> np.ndarray:
    grad_x = -2 * (1 - x[0]) - 400 * x[0] * (x[1] - x[0]**2)
    grad_y = 200 * (x[1] - x[0]**2)
    return np.array([grad_x, grad_y])


def G(x: np.ndarray) -> np.ndarray:
    grad_xx = 2 - 400 * x[1] + 1200 * x[0]**2
    grad_xy = -400 * x[0]
    grad_yx = -400 * x[0]
    grad_yy = 200
    return np.array([
        [grad_xx, grad_xy],
        [grad_yx, grad_yy]
    ])


initial_point = [-1.2, 1]
```

已知最优点为 $x^*=(1, 1)^T$，最优解 $f(x^*)=0$，以书中例题初始点 $(-1.2,1)^T$ 为例开始迭代。

**一、最速下降法**

```python
def gradient_descent(initial_point, max_iter=5, eps=1e-6):
    x = np.array(initial_point)
    points = [x]
    gradients = [g(x)]
    alphas = []

    for _ in range(max_iter):
        grad = gradients[-1]

        # 搜索方向
        direction = -grad

        # 步长因子：无法确定准确的步长最小化函数，因此此处采用二分法搜索最优步长
        alpha = 1
        while f(x + alpha * direction) > f(x):
            alpha /= 2

        x = x + alpha * direction
        points.append(x)
        gradients.append(g(x))
        alphas.append(alpha)

        if np.linalg.norm(grad) < eps:
            break

    return points, gradients, alphas


points, gradients, alphas = gradient_descent(initial_point, max_iter=100, eps=1e-6)

for i, (point, grad, alpha) in enumerate(zip(points, gradients, [1] + alphas)):
    print(f"Iteration {i}:")
    print(f"  Point       = {point}")
    print(f"  Gradient    = {grad}")
    print(f"  Step Size   = {alpha}")
    print(f"  Direction   = {-grad}")
    print(f"  Function Val= {f(point)}\n")
```

迭代100次后输出为：

```makefile
Iteration 98:
  Point       = [0.93432802 0.87236513]
  Gradient    = [ 0.0942865  -0.12074477]
  Step Size   = 0.00390625
  Direction   = [-0.0942865   0.12074477]
  Function Val= 0.004349256784446673

Iteration 99:
  Point       = [0.93414387 0.87260096]
  Gradient    = [-0.12281587 -0.00476179]
  Step Size   = 0.001953125
  Direction   = [0.12281587 0.00476179]
  Function Val= 0.004337086557103718

Iteration 100:
  Point       = [0.93438374 0.87261026]
  Gradient    = [ 0.04171114 -0.09254423]
  Step Size   = 0.001953125
  Direction   = [-0.04171114  0.09254423]
  Function Val= 0.004326904052586884
```

**二、牛顿法**

```python
def newton_method(initial_point, max_iter=5, eps=1e-6):
    x = np.array(initial_point)
    points = [x]
    gradients = [g(x)]
    Hessians = [G(x)]

    for _ in range(max_iter):
        grad = gradients[-1]
        Hessian = Hessians[-1]

        # 搜索方向
        direction = np.linalg.inv(Hessian) @ grad

        # 步长因子：假定使用固定步长的牛顿法
        alpha = 1

        x = x - alpha * direction
        points.append(x)
        gradients.append(g(x))
        Hessians.append(G(x))

        if np.linalg.norm(grad) < eps:
            break

    return points, gradients, Hessians


points, gradients, Hessians = newton_method(initial_point, max_iter=50, eps=1e-6)

for i, (point, grad, Hessian) in enumerate(zip(points, gradients, Hessians)):
    print(f"Iteration {i}:")
    print(f"  Point       = {point}")
    print(f"  Gradient    = {grad}")
    print(f"  Hessian     = {Hessian}")
    print(f"  Function Val= {f(point)}\n")
```

迭代7次即收敛：

```makefile
Iteration 5:
  Point       = [0.9999957  0.99999139]
  Gradient    = [-8.60863343e-06 -2.95985458e-11]
  Hessian     = [[ 801.99311306 -399.99827826]
 [-399.99827826  200.        ]]
  Function Val= 1.8527397192178054e-11

Iteration 6:
  Point       = [1. 1.]
  Gradient    = [ 7.41096051e-09 -3.70548037e-09]
  Hessian     = [[ 802.00000001 -400.        ]
 [-400.          200.        ]]
  Function Val= 3.4326461875363225e-20

Iteration 7:
  Point       = [1. 1.]
  Gradient    = [-0.  0.]
  Hessian     = [[ 802. -400.]
 [-400.  200.]]
  Function Val= 0.0
```

**三、共轭梯度法**

```python
def conjugate_gradient(initial_point, max_iter=5, eps=1e-6):
    x = np.array(initial_point)
    points = [x]
    gradients = [g(x)]
    directions = [-g(x)]
    alphas = []

    for i in range(max_iter):
        grad = gradients[-1]

        # 搜索方向：FR公式
        if i == 0:
            direction = -grad
        else:
            beta = np.dot(g(x), g(x)) / np.dot(g(points[-2]), g(points[-2]))
            direction = -g(x) + beta * direction

        # 步长因子：精确线搜索直接得到闭式解
        alpha = -np.dot(grad, direction) / np.dot(direction, G(x) @ direction)
        

        x = x + alpha * direction

        directions.append(direction)
        alphas.append(alpha)
        points.append(x)
        gradients.append(g(x))

        if np.linalg.norm(grad) < eps:
            break

    return points, gradients, alphas


points, gradients, alphas = conjugate_gradient(initial_point, max_iter=1000, eps=1e-6)

for i, (point, grad, alpha) in enumerate(zip(points, gradients, alphas)):
    print(f"Iteration {i}:")
    print(f"  Point       = {point}")
    print(f"  Gradient    = {grad}")
    print(f"  Step Size   = {alpha}")
    print(f"  Direction   = {-grad}")
    print(f"  Function Val= {f(point)}\n")
```

迭代1000次后输出为：

```makefile
Iteration 997:
  Point       = [0.9999994  0.99999875]
  Gradient    = [ 1.90794906e-05 -1.01414007e-05]
  Step Size   = 0.0005161468619784313
  Direction   = [-1.90794906e-05  1.01414007e-05]
  Function Val= 6.191018745155016e-13

Iteration 998:
  Point       = [0.99999931 0.99999861]
  Gradient    = [ 5.43686111e-06 -3.40374227e-06]
  Step Size   = 0.0005078748917694624
  Direction   = [-5.43686111e-06  3.40374227e-06]
  Function Val= 4.986125950068217e-13

Iteration 999:
  Point       = [0.9999993 0.9999986]
  Gradient    = [ 1.34784246e-06 -1.36924747e-06]
  Step Size   = 0.0005356250138048412
  Direction   = [-1.34784246e-06  1.36924747e-06]
  Function Val= 4.881643528976312e-13
```

**四、拟牛顿法**

```python
def bfgs(initial_point, max_iter=5, eps=1e-6):
    x = np.array(initial_point)
    points = [x]
    gradients = [g(x)]
    B = G(x)

    for _ in range(max_iter):
        grad = gradients[-1]

        # 迭代公式
        x = x - np.linalg.inv(B) @ grad

        # 更新 B 矩阵
        s = x - points[-1]
        y = g(x) - gradients[-1]
        B = B + np.outer(y, y) / (s @ y) - (B @ np.outer(s, s) @ B) / (s @ B @ s)

        points.append(x)
        gradients.append(g(x))

        if np.linalg.norm(grad) < eps:
            break

    return points, gradients


points, gradients = bfgs(initial_point, max_iter=1000, eps=1e-6)

for i, (point, grad) in enumerate(zip(points, gradients)):
    print(f"Iteration {i}:")
    print(f"  Point       = {point}")
    print(f"  Gradient    = {grad}")
    print(f"  Function Val= {f(point)}\n")
```

迭代 78 次收敛：

```makefile
Iteration 76:
  Point       = [1.00000075 0.99999921]
  Gradient    = [ 0.000918   -0.00045825]
  Function Val= 5.255482679080297e-10

Iteration 77:
  Point       = [1.00000006 1.00000012]
  Gradient    = [ 6.46055099e-07 -2.63592925e-07]
  Function Val= 3.7061757712619374e-15

Iteration 78:
  Point       = [1. 1.]
  Gradient    = [6.75185684e-10 4.68913797e-10]
  Function Val= 6.510026595267928e-19
```

{% endfold %}

### 4.1 最速下降法

放一张生动的图：

![最速下降法 - 迭代示意图](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406132016327.png)

迭代公式：
$$
x_{k+1} = x_k - \alpha_k \nabla f(x_k)
$$
每次迭代时，**下降方向** $d_k$ 采用当前解 $x_k$ 处的负梯度方向 $- \nabla f(x_k)$，**步长因子** $\alpha_k$ 采用精确线性搜索算法的计算结果。

易证相邻迭代解 $x_k,x_{k+1}$ 的方向 $d_k,d_{k+1}$ 是正交的：由于 $\phi(\alpha) = f(x_k + \alpha d_k)$，在采用线搜索找最优步长时，步长的搜索结果 $\alpha_k$ 即为使得 $\phi'(\alpha)=0$ 的解，于是可得 $0=\phi'(\alpha) = \phi'(\alpha_k) = \nabla f(x_k+\alpha_k d_k)d_k = -d_{k+1}^T \cdot d_k$，即 $d_{k+1}^T \cdot d_k = 0$。如图：

![相邻迭代解的方向正交](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406132046068.png)

也正因为搜索方向正交的特性导致最速下降法的收敛速度往往不尽如人意。优点在于程序设计简单并且计算和存储量都不大，以及对初始点的要求不高。

### 4.2 牛顿法

放一张生动的图：

![牛顿法 - 迭代示意图](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140902324.gif)

{% note warning %}

注：本图演示的是求解一维函数零点的迭代过程，需要使得 $f(x)=0$，因此比值式为原函数除以导函数。后续介绍的是极小化函数的过程，需要使得 $f'(x)=0$，因此比值式为一阶导数除以二阶导数，高维就是二阶梯度的逆乘以一阶梯度。

{% endnote %}

迭代公式：
$$
x_{k+1} = x_k - \nabla^2f(x_k)^{-1}\nabla f(x_k)
$$
牛顿法相较于最速下降法有了更快的收敛速度，但是由于需要计算和存储海塞矩阵导致计算量增加并且有些目标函数可能根本求不出二阶梯度。同时牛顿法对于初始迭代点的选择比最速下降法要苛刻的多。

### 4.3 共轭梯度法

我们利用共轭梯度法解决「正定二次函数」的极小化问题。由于最速下降法中相邻迭代点的方向是正交的导致搜索效率下降，牛顿法又由于需要计算和存储海塞矩阵导致存储开销过大，共轭梯度法的核心思想是**相邻两个迭代点的搜索方向是关于正定二次型的正定阵正交的**。这样既保证了迭代收敛的速度也避免了计算存储海塞矩阵的开销。美中不足的是当共轭梯度法解决其他问题是往往会出现对线搜索的过度依赖，一旦线搜索变差会导致整个迭代过程精度变差。

概念补充：

1. 共轭：$x$ 与 $y$ 共轭当且仅当 $x^TGy=0$，其中 G 为对称正定阵
2. 正定二次：$f(x) =\frac{1}{2} x^TGx - b^Tx + c$

公式推导：

1. 首先给定初始迭代点 $x_0$，收敛阈值 $\epsilon$，迭代公式是不变的：$x_{k+1} = x_k + \alpha_k d_k$，关键在于计算每一次迭代过程中的步长因子 $\alpha_k$​ 和搜索方向 $d_k$​

2. 确定步长因子 $\alpha_k$：
    $$
    \begin{aligned}
    \alpha &= \min_{\alpha} \phi(\alpha) \\
    &= \min_{\alpha} f(x_k+\alpha d_k) \\
    &= \min_{\alpha} \frac{1}{2}(x_k+\alpha d_k)^TG(x_k+\alpha d_k) - b^T(x_k+\alpha d_k) + c \\
    &= \min_{\alpha} \frac{1}{2} (x_k^TGx_k + 2\alpha x_k^T G d_k + \alpha^2d_K^Td_k) - b^Tx_k - b^T \alpha d_k + c\\
    &= \min_{\alpha} \frac{1}{2} x_k^TGx_k + \alpha x_k^T G d_k + \frac{1}{2}\alpha^2d_k^T G d_k - b^T \alpha d_k + c
    \end{aligned}
    $$
    由于目标函数是正定二次型，显然可以直接求出步长因子的闭式解：
    $$
    \begin{aligned}
    \frac{d \phi(\alpha)}{d\alpha} &= x_k^T G d_k + \alpha d_k^T G d_k - b^Td_k \\
    &=0
    \end{aligned}
    $$
    于是可以导出当前的步长因子 $\alpha_k$ 的闭式解为：
    $$
    \begin{aligned}
    \alpha_k &= \frac{(b^T - x^TG)d_k}{d_k^TGd_k} \\
    &= -\frac{g_k^T d_k}{d_k^TGd_k}
    \end{aligned}
    $$

3. 确定搜索方向 $d_k$：
    $$
    d_k = -g_k + \beta d_{k-1}
    $$
    可见只需要确定组合系数 $\beta$。由于共轭梯度法遵循相邻迭代点的搜索方向共轭，即 $d_{k-1}^TGd_k=0$，因此对上式两侧同时左乘 $d_{k-1}^TG$，有：
    $$
    \begin{aligned}
    d_{k-1}^TGd_k &= -d_{k-1}^TGg_k + \beta d_{k-1}^TGd_{k-1} \\
    &= 0
    \end{aligned}
    $$
    于是可得当前的组合系数 $\beta$ 为：
    $$
    \beta = \frac{d_{k-1}^TGg_k}{d_{k-1}^TGd_{k-1}}
    $$
    {% note warning %}

    上述组合系数 $\beta$ 的结果是共轭梯度最原始的表达式，后人又进行了变形，~~没证出来，难崩，直接背吧~~，给出 FR 的组合系数表达式：
    $$
    \begin{aligned}
    \beta = \frac{g_k^Tg_k}{g_{k-1}^T g_{k-1}}
    \end{aligned}
    $$
    {% endnote %}
    
    当然了由于初始迭代时没有前一个搜索方向，因此直接用初始点的梯度作为搜索方向，即：
    $$
    d_0=-g_0
    $$
    于是可以导出当前的搜索方向 $d_k$ 的闭式解为：
    $$
    d_k = -g_k + \frac{g_k^Tg_k}{g_{k-1}^T g_{k-1}} d_{k-1}
    $$

迭代公式：
$$
\begin{aligned}
x_{k+1} =& x_k + \alpha_k d_k\\
=& x_k + (-\frac{g_k^T d_k}{d_k^TGd_k}) (-g_k + \frac{g_k^Tg_k}{g_{k-1}^T g_{k-1}} d_{k-1})
\end{aligned}
$$

### 4.4 拟牛顿法

4.1 和 4.2 介绍的基于一阶梯度和二阶梯度的下降法都可以统一成下面的表达式：
$$
x_{k+1} = x_k - \alpha_k B_k \nabla f(x_k)
$$

- 4.1 的最速下降法的步长因子通过精确线搜索获得，海塞矩阵的逆 $B_k$ 不存在，可以看做为单位阵 $E$
- 4.2 的牛顿法的步长因子同样可以通过精确线搜索获得，当然也可以设置为定值，海塞矩阵的逆 $B_k$ 对应二阶梯度的逆 $(\nabla^2 f(x_k))^{-1}$

前者收敛速度差、后者计算量和存储量大，我们尝试构造一个对称正定阵 $B_k$ 来近似代替二阶梯度的逆，即 $B_k \approx (\nabla^2 f(x_k))^{-1}$，使得该法具备较快的收敛速度与较少的内存开销。

介绍最著名的 **BFGS** 拟牛顿法，它的核心思想是每次迭代过程中对其进行快速校正，从而在确保收敛速度的情况下提升计算效率。迭代公式如下：
$$
\begin{aligned}
&x_{k+1} = x_k - B_k^{-1}g_k \\
&\text{记: }
\begin{cases}
s_k= x_{k+1} - x_k\\
y_k=g_{k+1} - g_k
\end{cases}\\

&\text{则: }
\begin{cases}
B_0 = \nabla^2f(x_0)\\
\displaystyle B_{k+1} = B_k + \frac{y_ky_k^T}{s_k^Ty_k} - \frac{B_ks_ks_k^TB_k}{s_k^TB_ks_k}
\end{cases}
\end{aligned}
$$

> 参考：
>
> - [西北工业大学 - 课件 - 含例题与解析](https://max.book118.com/html/2017/0606/111956214.shtm)
> - [北京大学 - 教材 - 含例题与解析](https://www.math.pku.edu.cn/teachers/lidf/docs/statcomp/html/_statcompbook/opt-uncons.html#opt-uncons)
> - [路人 - 博客 - 更通俗的解释](https://blog.csdn.net/Serendipity_zyx/article/details/120515338)
> - [牛顿法 - wiki - 更权威的解释](https://zh.wikipedia.org/wiki/%E7%89%9B%E9%A1%BF%E6%B3%95)

## 第五章「无约束最优化」最小二乘

{% note light %}

本章继续介绍无约束函数的最优化算法。不过和第四章的区别在于现在的目标函数是二次函数，称为「最小二乘问题」。

所谓的无约束最小二乘问题，本质上是第四章介绍的无约束问题的一个子集，只不过因为使用场景很多所以单独拿出来进行讨论。也正因为使用场景多，学者们针对此类问题设计出了更加高效的最优化算法。

无约束最小二乘问题的形式定义为：
$$
\begin{aligned}
\min_{x\in R^n}f(x)=\frac{1}{2}\sum_{i=1}^m[r_{i}(x)]^2,\quad m\ge n
\end{aligned}
$$
其中 $r_i(x)$ 称为「残量函数」。本质上最小二乘问题就是寻找一个函数 $f(x,\alpha_i),(i=1,2,\cdots,m)$ 来拟合 $b$，于是问题就转化为了
$$
\begin{aligned}
\min { \sum_{i=1}^m [r_i(x)]^2 }=\min { \sum_{i=1}^m [f(x,\alpha_i) - b_i]^2 }
\end{aligned}
$$
当 $r_i(x)$ 为线性函数时，当前问题为线性最小二乘问题；当 $r_i(x)$ 为非线性函数时，当前问题为非线性最小二乘问题。本章将分别讨论这两种最小二乘问题的优化求解策略。

{% endnote %}

### 5.1 线性最小二乘

此时可以直接将目标函数写成：
$$
\begin{aligned}
\min f(x)&=\frac{1}{2}|| Ax-b ||^2\\
&= \frac{1}{2}x^TA^TAx-b^TAx+\frac{1}{2}b^Tb
\end{aligned}
$$
利用一阶必要条件可得：
$$
\begin{aligned}
\nabla f(x)&=A^TAx - A^Tb\\
&=0
\end{aligned}
$$
于是可得最优闭式解：
$$
x^*=(A^T A)^{-1}A^Tb
$$
当然 $A^TA$ 并不都是可逆的，并且在数据量足够大时，即使可逆也会让求逆操作即为耗时。针对此问题，提出了线性最小二乘的 QR 正交分解算法。

### 5.2 非线性最小二乘

同样可以采用第四章学到的各种下降迭代算法，这里引入高斯牛顿法，推导的解的迭代公式为：
$$
x^{k+1}=x^k - (A_k^TA_k)^{-1}A_k^Tr_k
$$
其中：
$$
\begin{aligned}
A_k =  

\begin{bmatrix}
\nabla r_1(x_k)\\
\nabla r_2(x_k)\\
\vdots \\
\nabla r_m(x_k)
\end{bmatrix},\quad

r_k = 
\begin{bmatrix}
r_1(x_k)\\
r_2(x_k)\\
\vdots \\
r_m(x_k)
\end{bmatrix}\\

\end{aligned}
$$

> 参考：
>
> - [北京大学 - 课件 - 非线性最小二乘](http://faculty.bicmr.pku.edu.cn/~wenzw/optbook/lect/14-lsp-new-zxx.pdf)
> - [路人 - 博客 - 通俗解释非线性最小二乘](https://zhuanlan.zhihu.com/p/124934931)

## 第六章「约束最优化」二次规划

{% note light %}

目标函数是二次函数，约束函数是线性函数。一般形式为：
$$
\begin{aligned}
&\min \quad q(x) = \frac{1}{2}x^TGx + g^Tx \\
&s.t.\quad 
\begin{cases}
a_i^Tx = b_i& ,i\in S\\
a_i^Tx \ge b_i& ,i \in M\\
\end{cases}
\end{aligned}
$$
本章将分别讨论约束函数「含有等式」和「含有不等式」两类二次规划问题。

{% endnote %}

### 6.1 等式约束二次规划

我们引入**拉格朗日方法 (Lagrange Method, 简称 LM)**。此时可以用矩阵表示问题和约束条件，并且不加证明的给出最优解和对应乘子就是满足 KKT 条件下的解。

拉格朗日函数：
$$
L(x,\lambda) = \frac{1}{2}x^TGx+g^Tx -\lambda^T(A^Tx - b)
$$
一阶必要条件：
$$
\begin{aligned}
\frac{\partial L(x, \lambda) }{\partial x} &= Gx+g-A\lambda = 0 \\
\frac{\partial L(x, \lambda) }{\partial \lambda} &= A^x - b = 0
\end{aligned}
$$
最优解的矩阵形式：
$$
\begin{aligned}

\begin{bmatrix}
G & -A \\
-A^T & 0
\end{bmatrix}

\begin{bmatrix}
x^* \\
\lambda^*
\end{bmatrix}

=
-
\begin{bmatrix}
g \\
b
\end{bmatrix}

\end{aligned}
$$

### 6.2 不等式约束二次规划

我们引入**有效集方法 (Active Set Method, 简称 ASM)**。首先显然的最优解一定成立于等式约束，或成立于不等式取等。我们可以直接枚举每一种约束条件的组合（所有等式+枚举的不等式，并将不等式看做等式约束），然后判定当前的解是否满足没有选择的不等式约束。这种方法是可行的但是计算量极大。于是有效集方法应运而生。

算法流程：

![Primal ASM 算法](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406191553692.png)

算法解析：

- **计算初始可行点 $x^{(0)}$**，可用线性规划中的大 M 法计算获得
- **计算前进方向 $p_k$**，通过求解等式约束二次规划子问题获得
- 若 $p_k = \bf{0}$​，则**计算工作集约束 $W_k$ 对应的所有拉格朗日乘子 $\lambda_i$**
    - 若所有 $\lambda_i \ge 0$，则停止迭代，得到最优解 $x^*=x^{(k)}$
    - 若存在 $\lambda_i < 0$，则在工作集中剔除 $\lambda_i$ 最小时对应的约束 $a_j$，得 $W_{k+1}=W_k \setminus \set{a_j}$
- 若 $p_k \ne \bf{0}$，则**计算步长因子 $\alpha_k$**，并置 $x^{(k+1)} = x^{(k)} + \alpha_kp_k$
    - 若 $\alpha_k=1$，则工作集不变，得 $W_{k+1}=W_k$
    - 若 $\alpha_k < 1$，则在工作集中添加 $\alpha_k$ 最小时对应的约束 $a_j$，得 $W_{k+1}=W_k \bigcup \set {a_j}$

> 参考：
>
> - [路人 - 博客 - 引入+原理+示例](https://blog.csdn.net/dymodi/article/details/50358278)

## 第七章「约束最优化」

{% note light %}

本章我们简单讨论**约束最优化问题**中，针对**等式约束**的「二次罚函数」算法，以及拉格朗日乘子法。

{% endnote %}

### 二次罚函数法

对于等式约束问题：
$$
\begin{aligned}
&\min\quad f(x) \\
&s.t.\quad a_i(x) = 0,\ i=1,2,...,p
\end{aligned}
$$
我们定义二次罚函数 $P_E(x, \sigma)$，其中 $\sigma$ 为惩罚因子：
$$
P_E(x, \sigma) = f(x) + \frac{1}{2} \sigma\sum_{i=1}^p a_i^2(x)
$$
不加证明的给出结论：当惩罚因子 $\to \infty$ 时，目标函数趋于最小值。下面给出算法流程：

![等式约束的二次罚函数法](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406120820032.png)

### 拉格朗日乘子法

目标函数：

![目标函数](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406281100567.png)

拉格朗日函数：

![拉格朗日函数](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406281102611.png)

KKT 条件：

![KKT 条件](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406281102383.png)

在实际求解时，我们只需要罗列上述 KKT 条件中的 (1) 和 (5)，另外三个显然不需要再罗列了。我们只需要对 $m$ 个不等式约束条件对应的乘子进行是否为零的讨论即可，显然需要讨论 $2^m$ 次。

## 后记

下面罗列一下考试题型（考前就透露完了🤣）：

### **一、选择 `6 * 2'`**

- 严格凸函数的定义（ch1.2）（判断[海塞矩阵是否正定](https://www.cnblogs.com/bigmonkey/p/11913079.html)即可）

    {% fold light @例题 %}

    考虑函数 $f(x, y) = x^2 + y^2$。我们计算它的 Hessian 矩阵：

    1. 计算一阶导数：
       $$
       f_x = \frac{\partial f}{\partial x} = 2x
       $$
       $$
       f_y = \frac{\partial f}{\partial y} = 2y
       $$

    2. 计算二阶导数：
       $$
       f_{xx} = \frac{\partial^2 f}{\partial x^2} = 2
       $$
       $$
       f_{yy} = \frac{\partial^2 f}{\partial y^2} = 2
       $$
       $$
       f_{xy} = \frac{\partial^2 f}{\partial x \partial y} = 0
       $$
       $$
       f_{yx} = \frac{\partial^2 f}{\partial y \partial x} = 0
       $$

    3. 构造 Hessian 矩阵：
       $$
       H = \begin{pmatrix}
       f_{xx} & f_{xy} \\
       f_{yx} & f_{yy}
       \end{pmatrix} = \begin{pmatrix}
       2 & 0 \\
       0 & 2
       \end{pmatrix}
       $$

    4. 检查 Hessian 矩阵是否为正定矩阵。对于一个 2x2 的对称矩阵：
       $$
       H = \begin{pmatrix}
       a & b \\
       b & c
       \end{pmatrix}
       $$
       要判断它是否正定，可以使用以下条件：
       - $a > 0$
       - 矩阵的行列式 $ac - b^2 > 0$

    对于我们的 Hessian 矩阵 $H$：
    $$
       a = 2, \quad b = 0, \quad c = 2
    $$

    显然：
    $$
       2 > 0
    $$
    $$
       \text{行列式} = 2 \cdot 2 - 0^2 = 4 > 0
    $$

    因此，Hessian 矩阵 $H$ 是正定的，所以函数 $f(x, y) = x^2 + y^2$ 是严格凸函数。

    {% endfold %}

- 海塞矩阵正定负定和极值的关系（ch1.3）（显然的）

    {% fold light @讲解 %}

    驻点的性质与海塞矩阵的行列式（determinant，det）和特征值（eigenvalues）的符号密切相关。以下是具体的关系：

    1. **正定矩阵**：如果海塞矩阵 $H$ 是正定矩阵（即 $\text{det}(H) > 0$ 且 $f_{xx} > 0$），则驻点是局部极小值点。这是因为此时所有的特征值都是正的，函数在该点附近是向上的碗形结构。

    2. **负定矩阵**：如果海塞矩阵 $H$ 是负定矩阵（即 $\text{det}(H) > 0$ 且 $f_{xx} < 0$），则驻点是局部极大值点。这是因为此时所有的特征值都是负的，函数在该点附近是向下的碗形结构。

    3. **不定矩阵**：如果海塞矩阵 $H$ 的行列式小于零（即 $\text{det}(H) < 0$），则驻点是鞍点。这是因为此时特征值的符号不同，函数在该点附近的形状像马鞍。

    4. **退化矩阵**：如果海塞矩阵 $H$ 的行列式等于零（即 $\text{det}(H) = 0$），则无法通过二阶导数判断驻点的性质，需要进一步分析。这是因为此时海塞矩阵是奇异的，不能提供足够的信息来确定驻点的性质。

    总结以上内容可以得出如下的关系：

    - $\text{det}(H) > 0$ 且 $f_{xx} > 0$：局部极小值点。
    - $\text{det}(H) > 0$ 且 $f_{xx} < 0$：局部极大值点。
    - $\text{det}(H) < 0$：鞍点。
    - $\text{det}(H) = 0$：需要进一步分析。

    {% endfold %}

- 求二元函数的极值（ch1.3）（先利用一阶必要条件求出所有驻点，然后利用海塞矩阵的正定性判定极值点。答案：一个极大一个极小，另两个什么都不是）

    {% fold light @例题 %}

    **问题：**

    给定函数 $f(x, y) = x^3 - 3x + y^3 - 3y$，求其所有极值点。

    **解题步骤：**

    1. **计算一阶梯度以求驻点**：
       
       计算函数 $f(x, y)$ 对 $x$ 和 $y$ 的一阶偏导数：
       $$
       \frac{\partial f}{\partial x} = 3x^2 - 3
       $$
       $$
       \frac{\partial f}{\partial y} = 3y^2 - 3
       $$
       
       解方程组 $\frac{\partial f}{\partial x} = 0$ 和 $\frac{\partial f}{\partial y} = 0$：
       $$
       3x^2 - 3 = 0
       $$
       $$
       3y^2 - 3 = 0
       $$
       
       化简方程组得到：
       $$
       x^2 = 1 \implies x = \pm 1
       $$
       $$
       y^2 = 1 \implies y = \pm 1
       $$
       
       所以，驻点为 $(1, 1)$、$(1, -1)$、$(-1, 1)$ 和 $(-1, -1)$。

    2. **计算二阶梯度以检验驻点的性质**：
       
       计算二阶偏导数：
       $$
       \frac{\partial^2 f}{\partial x^2} = 6x
       $$
       $$
       \frac{\partial^2 f}{\partial y^2} = 6y
       $$
       $$
       \frac{\partial^2 f}{\partial x \partial y} = 0
       $$
       
       对于每个驻点，计算 Hessian 矩阵：
       $$
       H = \begin{pmatrix}
       6x & 0 \\
       0 & 6y
       \end{pmatrix}
       $$
       
       **驻点 (1, 1)：**
       $$
       H(1,1) = \begin{pmatrix}
       6 & 0 \\
       0 & 6
       \end{pmatrix}
       $$
       行列式为：
       $$
       \text{det}(H(1,1)) = 6 \times 6 - 0 \times 0 = 36 > 0
       $$
       主对角线元素 $6 > 0$，所以 $(1, 1)$ 是**局部极小值点**。

       **驻点 (-1, -1)：**
       $$
       H(-1,-1) = \begin{pmatrix}
       -6 & 0 \\
       0 & -6
       \end{pmatrix}
       $$
       行列式为：
       $$
       \text{det}(H(-1,-1)) = -6 \times -6 - 0 \times 0 = 36 > 0
       $$
       主对角线元素 $-6 < 0$，所以 $(-1, -1)$ 是**局部极大值点**。

       **驻点 (1, -1)：**
       $$
       H(1,-1) = \begin{pmatrix}
       6 & 0 \\
       0 & -6
       \end{pmatrix}
       $$
       行列式为：
       $$
       \text{det}(H(1,-1)) = 6 \times -6 - 0 \times 0 = -36 < 0
       $$
       由于行列式为负，$(1, -1)$ 是**鞍点**。

       **驻点 (-1, 1)：**
       $$
       H(-1,1) = \begin{pmatrix}
       -6 & 0 \\
       0 & 6
       \end{pmatrix}
       $$
       行列式为：
       $$
       \text{det}(H(-1,1)) = -6 \times 6 - 0 \times 0 = -36 < 0
       $$
       由于行列式为负，$(-1, 1)$ 是**鞍点**。

    **结论：**

    函数 $f(x, y) = x^3 - 3x + y^3 - 3y$ 在点 $(1, 1)$ 处有一个局部极小值点，在点 $(-1, -1)$ 处有一个局部极大值点，而在点 $(1, -1)$ 和 $(-1, 1)$ 处为鞍点。

    {% endfold %}

- 拉格朗日函数中等式乘子的性质（ch1.3）（等式约束的乘子 $\lambda_i$ 是任意实数，不等式约束的乘子 $\mu_i\ge 0$）

### **二、填空 `5 * 2'`**

- 求解给定点的下降方向（ch1.3）

    {% fold light @例题 %}

    求解一个函数的下降方向（Descent Direction），可以使用其梯度（Gradient）。梯度的反方向是函数值下降最快的方向。具体来说：

    1. **一元函数：**
       
        - 对于一元函数 $f(x)$，其梯度是导数 $f'(x)$。
        - 下降方向是梯度的负方向，即 $-f'(x)$。
        
        **例子：**
        设 $f(x) = x^2 + 2x + 1$。
        - 首先计算导数 $f'(x) = 2x + 2$。
        - 在某点 $x_0$ 处，下降方向是 $-f'(x_0) = -(2x_0 + 2)$。
        
    2. **二元函数：**
        - 对于二元函数 $f(x, y)$，其梯度是偏导数的向量 $\nabla f(x, y) = \left( \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \right)$。
        - 下降方向是梯度的负方向，即 $-\nabla f(x, y) = \left( -\frac{\partial f}{\partial x}, -\frac{\partial f}{\partial y} \right)$。
    
        **例子：**
        设 $f(x, y) = x^2 + y^2 + 2x + 2y$。
        
        - 首先计算偏导数： 
            $$
            \frac{\partial f}{\partial x} = 2x + 2
            $$
            $$
            \frac{\partial f}{\partial y} = 2y + 2
            $$
        - 在某点 $(x_0, y_0)$ 处，梯度是 $\nabla f(x_0, y_0) = (2x_0 + 2, 2y_0 + 2)$。
        - 下降方向是 $-\nabla f(x_0, y_0) = (-(2x_0 + 2), -(2y_0 + 2))$。
    
    {% endfold %}
    
- 线性规划的基本概念（ch2.1）

    {% fold light @讲解 %}

    这个不知道要怎么考，大致罗列一下所有的基本概念。

    - 定义：目标函数和约束条件都是线性的
    - 图解法：对于二元函数，可以使用平面图法进行求解。那么共有 4 种可能的结果，分别为：有唯一解、有无穷多解、有无界解、无可行解
    - 性质：分别从可行域和最优解两个角度展开：
        - 对于可行域，如果可行域是非空则可行域一定是凸集，这个很显然，用 ch1.2 的可行域凸集定理证明即可
        - 对于最优解，首先最优解如果存在则一定存在于所有约束条件中取等时，其次最优解如果存在一定是在可行域的顶点上。


    {% endfold %}

- 拟牛顿法的近似海塞矩阵公式（ch4.4）（见书 4.4.9和 4.4.10）

    {% fold light @讲解 %}

    对于原函数，有：
    $$
    G_{k+1}(x_{k+1}-x_k) \approx g_{k+1} - g_k
    $$
    我们希望构造出的对称矩阵 $B_{k+1}$ 满足上式中 $G_{k+1}$ 的条件，于是就有下面两种拟牛顿条件，其中 $H_k=B_k^{-1}$：
    $$
    \begin{aligned}
    B_{k+1}(x_{k+1}-x_k)= g_{k+1} - g_k\\
    H_{k+1}(g_{k+1} - g_k) = x_{k+1}-x_k
    \end{aligned}
    $$
    我们记 $s_k=x_{k+1}-x_k,y_k=g_{k+1} - g_k$。则关于 $B_{k+1}$ 的 BFGS 校正迭代公式如下：
    $$
    \begin{cases}
    B_0 = \nabla^2f(x_0)\\
    \displaystyle B_{k+1} = B_k + \frac{y_ky_k^T}{s_k^Ty_k} - \frac{B_ks_ks_k^TB_k}{s_k^TB_ks_k}
    \end{cases}
    $$
    {% endfold %}

### **三、证明 `1 * 10'`**

- 证明高维凸规划问题（ch1.2）

    {% fold light @例题 %}

    关键在于证明可行域是凸集，目标函数是凸函数。证明可行域是凸集比较简单，书 ch1.2 中的「定理1.2.18」给出了详细的可行域凸性判定定理。证明目标函数是凸函数有三种方法，书 ch1.2 中「定理1.2.19-1.2.21」分别从函数值、一阶导数、二阶导数三个角度进行了凸函数判定定理的介绍，下面仅从二阶导数的角度给出凸函数判定的示例。

    **二元凸函数**
    
    选取函数 $f(x, y) = 3x^2 + 2xy + 4y^2$，计算 Hessian 矩阵：
    
    $$
    H(f) = \begin{pmatrix}
    \frac{\partial^2 f}{\partial x^2} & \frac{\partial^2 f}{\partial x \partial y} \\
    \frac{\partial^2 f}{\partial y \partial x} & \frac{\partial^2 f}{\partial y^2}
    \end{pmatrix} = \begin{pmatrix}
    6 & 2 \\
    2 & 8
    \end{pmatrix}
    $$
    Hessian 矩阵的特征值均为正数，因此海塞矩阵是正定的，因此 $f(x, y) = 3x^2 + 2xy + 4y^2$ 是凸函数并且是严格凸的。
    
    **三元凸函数**
    
    选取函数 $g(x, y, z) = 2x^2 + 2xy + 3y^2 + 2xz + z^2$，计算 Hessian 矩阵：
    $$
    H(g) = \begin{pmatrix}
    \frac{\partial^2 g}{\partial x^2} & \frac{\partial^2 g}{\partial x \partial y} & \frac{\partial^2 g}{\partial x \partial z} \\
    \frac{\partial^2 g}{\partial y \partial x} & \frac{\partial^2 g}{\partial y^2} & \frac{\partial^2 g}{\partial y \partial z} \\
    \frac{\partial^2 g}{\partial z \partial x} & \frac{\partial^2 g}{\partial z \partial y} & \frac{\partial^2 g}{\partial z^2}
    \end{pmatrix} = \begin{pmatrix}
    4 & 2 & 2 \\
    2 & 6 & 0 \\
    2 & 0 & 2
    \end{pmatrix}
    $$
    Hessian 矩阵的特征值均为正数，因此海塞矩阵是正定的，因此 $g(x, y, z) = 2x^2 + 2xy + 3y^2 + 2xz + z^2$ 是凸函数并且是严格凸的。
    
    当然我们也可以通过计算主子矩阵的行列式来代替计算矩阵的特征值，上述二元同样也可以。例如对于下述对称矩阵：
    $$
    A = \begin{pmatrix} 2 & -1 & 0 \\ -1 & 2 & -1 \\ 0 & -1 & 2 \end{pmatrix}
    $$
    我们计算其所有主子矩阵的行列式：
    
    - 一阶主子矩阵 $\begin{pmatrix} 2 \end{pmatrix}$ 的行列式为 $2$。
    - 二阶主子矩阵 $\begin{pmatrix} 2 & -1 \\ -1 & 2 \end{pmatrix}$ 的行列式为：
      $$
      \det \begin{pmatrix} 2 & -1 \\ -1 & 2 \end{pmatrix} = 2 \cdot 2 - (-1) \cdot (-1) = 4 - 1 = 3
      $$
    - 三阶主子矩阵即矩阵 $A$ 本身的行列式：
      $$
      \det(A) = \begin{vmatrix} 2 & -1 & 0 \\ -1 & 2 & -1 \\ 0 & -1 & 2 \end{vmatrix}=4
      $$
    
    由于所有主子矩阵的行列式都大于零，矩阵 $A$ 是正定的。假如这是一个函数的海塞矩阵，则该函数是凸函数并且是严格凸的。
    
    {% endfold %}

### **四、计算 `68'`**

- 计算点到超平面的距离，转化为等式约束的最优化问题（ch1.3）

    {% fold light @讲解 %}

    这个应该是很显然的一道题，我们定义目标函数为点 $a$ 到超平面上点 $x$ 的距离，约束条件为 $x$ 在超平面上。求解方法就是构造一个拉格朗日函数，然后利用一阶必要条件求解即可。

    {% endfold %}

- 线性规划问题中求对偶问题表达式（ch2.3.1）

    {% fold light @例题 %}

    直接看 2.3.1 的实战演练即可。

    {% endfold %}

- 线性规划问题中已知原问题最优解，求解对偶问题最优解（ch2.3.2）（利用互补松弛定理、原问题和对偶问题最优解相等）

    {% fold light @讲解 %}

    见 ch2.3.2 有详细求解步骤。注意可能试卷中给的是原问题的最优解，需要求解对偶问题的最优解，原理是一样的，把原问题看成对偶问题，对偶问题看成原问题，就和 ch2.3.2 的求解逻辑完全一致了。

    {% endfold %}

- 0.618 法求精确步长（ch3.2）

    {% fold light @讲解 %}

    每次缩函数值大的点即可。

    {% endfold %}

- 最速下降法、牛顿法求解方法及其优缺点，共轭梯度法的优缺点（ch4）（直接给步长）

    {% fold light @讲解 %}

    同样很显然的一道题，透露说只要迭代一步？总之就那两个迭代公式，况且步长都给了，记一下方向的迭代即可，最速下降法就是负梯度方向，牛顿法就是二阶梯度的逆乘负梯度作为新的方向。至于优缺点，简单记忆一下即可。最速下降法无非程序简单但因为搜索方向是正交的导致收敛速度差，牛顿法虽然收敛速度快了但是存储的内容太多导致计算量变大，开销增加。

    至于共轭梯度法的优缺点，优点就是该法是最速下降法和牛顿法的结合，每次的搜索方向是共轭的，这样就不用存储海塞矩阵并且收敛速度往往比最速下降法更快。主要用于解决正定二次函数的极小化问题。但在解决其余问题时可能会对搜索步长有极高的依赖，一旦搜索步长不够精准会导致整体的精度下降，收敛速度也会下降。

    {% endfold %}

- ~~有效集方法解不等式约束的二次规划问题（ch6）（小概率考到，考到就gg，因为不会）~~

- 等式约束下的二次罚函数法（ch7）（一个约束函数，一个等式约束条件，共 4 问）
  
    {% fold light @例题 %}
    
    1. 用拉格朗日乘子法求出最优解 $x^*$ 和拉格朗日乘子 $\lambda^*$
    
    2. 写出二次罚函数表达式 $P_E(x,\sigma)$，讨论罚因子 $\sigma$ 在什么取值范围下可以使海塞矩阵 $\nabla^2P_E(x,\sigma)$ 正定
    
    3. 求最优解 $x^*$（直接计算一阶梯度 $\nabla$ 并用 $\sigma$ 表示 $x^*$ 即可）
    
    4. 当 $\sigma \to \infty$​ 时求最优解，并判断是否和第一问计算结果一致
    
    示例：
    
    ![等式约束的二次罚函数法](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407081507550.jpg)
    
    {% endfold %}
    
- 约束最优化问题，约束条件中只有不等式（ch7）（用拉格朗日乘子法，已知有 3 个不等式，且 $2^3$ 个答案中只有一个是合法结果）

    {% fold light @例题 %}

    ![拉格朗日乘子法解一般约束优化问题](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407081608997.jpg)

    {% endfold %}

~~很遗憾将这门课学成了面向已知考试题型的过拟合形式。我并不觉得我掌握了多少优化理论的知识，最多称得上知道了优化问题的大致分类和一些基本的优化应用。从我的笔记就可以看出，自第三章开始就没怎么涉及到理论的证明，确实是证不明白🤡。但这门课自下届开始就被取消了hh。。。。你我皆是局内人，祝好。~~
