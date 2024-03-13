---
title: OptMethod
categories:
  - GPA
  - 4th-term
category_bar: true
---


# 最优化方法

## 前言

学科地位：

| 主讲教师 | 学分配额 | 学科类别 |
| :------: | :------: | :------: |
|  王启春  |    4     |  专业课  |

成绩组成：

| 平时 | 期中（大作业） | 期末 |
| :--: | :------------: | :--: |
| 20%  |      30%       | 50%  |

教材情况：

|  课程名称  |  选用教材  | 版次 |  作者  |     出版社     |      ISBN号       |
| :--------: | :--------: | :--: | :----: | :------------: | :---------------: |
| 最优化算法 | 最优化方法 |  2   | 孙文瑜 | 高等教育出版社 | 978-7-04-029763-8 |

## 第一章 基本概念

### 1.1 最优化问题简介

本目主要讲解最优化问题的一些分类，下附脑图（由 Xmind 软件制作）：

<details>
    <summary>分类脑图</summary>
    <center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403091214182.png" alt="最优化问题概念辨析" /></center>
</details>

### 1.2 凸集和凸函数

由于本书介绍的最优化求解方法一般只适用于求解**局部最优解**，那么如何确定**全局最优解**呢？以及如何确定**唯一的全局最优解**呢？本目揭晓答案：$局部最优解+(严格)凸目标函数+凸可行域=(唯一)全局最优解$

#### 1.2.1 凸集

**凸集的定义**
$$
\forall \quad x,y \in D \ \land \ \lambda \in [0,1] \\
s.t. \quad \lambda x+(1-\lambda)y \in D \\
\text{则称} D \text{为凸集}
$$
**凸集的性质**：设 $D_1,D_2 \subset R^n$ 均为凸集（下列 $x,y$ 均表示向量），则：

1. 两凸集的交 $D_1 \cap D_2 = \{x\ |\ x \in D_1 \land x \in D_2\}$ 是凸集
2. 两凸集的和 $D_1 + D_2 = \{x,y\ |\ x \in D_1 , y \in D_2\}$ 是凸集
3. 两凸集的差 $D_1 - D_2 = \{x,y\ |\ x \in D_1 , y \in D_2\}$ 是凸集
4. 对于任意非零实数 $\alpha$，集合 $\alpha D_1 = \{ \alpha x \ |\ x \in D_1 \}$​ 是凸集

<details>
    <summary>证明</summary>
    <center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403101941905.png" alt="凸集的性质证明" /></center>
</details>

**凸集的应用**

1. 刻画可行域
    - 凸组合定义
        $$
        设\ x^{(1)},x^{(2)}, \cdots, x^{(p)} \in R^n ,且\ \sum_{i=1}^p \alpha_i = 1(a_i \ge 0)  \\
        s.t. \quad x = \alpha_1x^1 + \alpha_2x^2 + \cdots + \alpha_px^p  \\
        则称\ x\ 为向量\ x^{(1)},x^{(2)}, \cdots, x^{(p)}\ 的凸组合
        $$
    
    - 凸组合定理：$D \in R^n$ 是凸集的充分必要条件是 $D$ 中任取 $m$ 个点 $x^i(1,2,\cdots m)$ 的凸组合任属于 $D$，即：
        $$
        \sum_{i=1}^m \alpha_ix_i \in D\left( \alpha_i \ge 0(i=1,2,\cdots,m),\sum_{i-1}^m \alpha_i = 1 \right)
        $$
    
      <details>
          <summary>证明</summary>
          <center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403102025159.png" alt="凸组合定理证明" /></center>
      </details>
    
2. 分析最优解的最优性条件
    - 超平面定义（凸集分离定理）：设 $D_1,D_2 \subset R^n$ 为两非空凸集，若存在非零向量 $\alpha \in R^n$ 和实数 $\beta$，使得
        $$
        D_1 \subset H^+ = \{ x \in R^n \ | \ \alpha^T x \ge \beta\} \\
        D_2 \subset H^- = \{ x \in R^n \ | \ \alpha^T x \le \beta\}
        $$
        则称超平面 $H = \{ x \in R^n \ | \ \alpha^Tx=\beta \}$ **分离**集合 $D_1$ 和 $D_2$，**严格分离**时上述不等式无法取等
    
    - 投影定理：设 $D \in R^n$ 是非空闭凸集，$y \in R^n$ 但 $y \notin D$，则
        $$
        \begin{align*}
            (1)& 存在唯一的点 \ \overline x \in D,使得集合D到点 y 的距离最小 \\
            (2)& \overline x \in D 是点 y 到 集合D的最短距离点的充分必要条件为:\forall x \in D,<x-\overline x,y - \overline x> \le 0
        \end{align*}
        $$

#### 1.2.2 凸函数

凸函数的定义：设函数 $f(x)$ 在凸集 $D$ 上有定义

- 若 $\forall x,y \in D\ 和\ \lambda \in [0,1]$ 有 $f(\lambda x + (1-\lambda)y) \le \lambda f(x) + (1-\lambda)f(y)$，则称 $f(x)$ 是凸集 $D$ 上的凸函数
- 若 $\forall x,y \in D\ 和\ \lambda \in (0,1)$ 有 $f(\lambda x + (1-\lambda)y) < \lambda f(x) + (1-\lambda)f(y)$，则称 $f(x)$ 是凸集 $D$ 上的严格凸函数

凸函数的性质：

1. 如果 $f$ 是定义在凸集 $D$ 上的凸函数，实数 $\alpha \ge 0$，则 $\alpha f$ 也是凸集 $D$ 上的凸函数
2. 如果 $f_1,f_2$ 是定义在凸集 $D$ 上的凸函数，则 $f_1+f_2$ 也是凸集 $D$ 上的凸函数
3. 如果 $f_i(x)(i=1,2,\cdots,m)$ 是非空凸集 $D$ 上的凸函数，则 $f(x) = \max_{1 \le i \le m} |f_i(x)|$ 也是凸集 $D$ 上的凸函数
4. 如果 $f_i(x)(i=1,2,\cdots,m)$ 是非空凸集 $D$ 上的凸函数，则 $f(x) = \displaystyle \sum_{i=1}^m \alpha_i f_i(x)\quad(\alpha_i \ge 0)$ 也是凸集 $D$​ 上的凸函数

<details>
    <summary>证明（第3条待定）：</summary>
    <center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403112030190.png" alt="第1、2条"></center>
    <center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403112030160.png" alt="第4条"></center>
</details>
凸函数的判别定理：

1. 函数值角度：函数 $f(x)$ 是 $R^n$ 上的凸函数的充分必要条件是 $\forall x,y \in R^n$，单变量函数 $\phi(\alpha)=f(x + \alpha y)$ 是关于 $\alpha$ 的凸函数

    <details>
        <summary>证明</summary>
        <center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403131019868.png" alt="凸函数的判别定理 - 函数值角度" /></center>
    </details>

2. 一阶导数角度：设 $f(x)$ 是定义在非空开凸集 $D$ 上的可微函数，则

    - $f(x)$ 是 $D$ 上凸函数的充分必要条件是 $f(y) \ge f(x)+\nabla f(x)^T(y-x)$
    - $f(x)$ 是 $D$ 上严格凸函数的充分必要条件是 $f(y) > f(x)+\nabla f(x)^T(y-x)$

    <details>
        <summary>证明</summary>
        <p>无需掌握证明，但是为了便于理解性记忆，可以从<b>二次凸函数</b>进行辅助理解记忆。</p>
        <center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403131018032.png" alt="凸函数的判别定理 - 函数值角度" /></center>
    </details>

3. 二阶导数角度：略

#### 1.2.3 凸规划（个人补充）

本目为个人补充内容，用于整合上述 1.2.1 与 1.2.2 内容。我们知道，学习凸集和凸函数的终极目标是为了求解凸规划问题，凸规划问题可以简述为**凸可行域+凸目标函数+局部最优解=全局最优解**，那么如何证明这个定理是正确的呢？局部最优解求出来以后，目标函数也确定为凸函数以后，如何确定可行域是凸集呢？下面揭晓：

**证明凸规划问题的正确性**

1. 定理：在可行域是凸集，目标函数非严格凸的情况下，局部最优解 $x^*$​ 也是全局最优解

    <details>
        <summary>证明（反证法）</summary>
        <center>
            <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403122016285.png" alt="目标函数非严格凸的情况下，局部最优解也是全局最优解" />
        </center>
    </details>

2. 定理：在可行域是凸集，目标函数是严格凸的情况下，局部最优解 $x^*$ 也是唯一的全局最优解

    <details>
        <summary>证明（反证法）</summary>
        <center>
            <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403122017101.png" alt="目标函数是严格凸的情况下，局部最优解也是唯一的全局最优解" />
        </center>
    </details>

**确定可行域是否为凸集**

1. 定理：若约束条件中每一个约束函数 $c_i(x)$ 都是凹函数，则可行域 $F$ 是凸集

    <details>
        <summary>证明</summary>
        <center>
            <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403122019899.png" alt="若约束条件中每一个约束函数都是凹函数，则可行域是凸集" />
        </center>
    </details>

2. 定理：若约束条件中每一个约束函数 $c_i(x)$ 都是凹函数，则可行域 $F$ 是凸集

    <details>
        <summary>证明</summary>
        <center>
            <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403122019572.png" alt="若约束条件中每一个约束函数都是凹函数，则可行域是凸集" />
        </center>
    </details>

3. 定理：若约束条件中每一个约束函数 $c_i(x)$ 都恒等于零，则可行域 $F$ 是凸集

    <details>
        <summary>证明</summary>
        <center>
            <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403122019751.png" alt="若约束条件中每一个约束函数都恒等于零，则可行域是凸集" />
        </center>
    </details>

### 1.3 最优性条件

最优性条件是指最优化问题的最优解所必须满足的条件，本目只介绍**无约束最优化**的**一阶必要条件**。

- **下降方向**定义：设 $f(x)$ 为定义在空间 $R^n$ 的连续函数，点 $\bar x \in R^n$，若对于方向 $s \in R^n$ 存在数 $\delta >$ 0 使
    $$
    
    $$
    成立，则称 $s$ 为 $f(x)$ 在 $\bar x$ 处的一个下降方向。在 点 $\bar x$ 处的所有下降方向的全体记为 $D(\bar x)$

- 下降方向定理：设函数 $f(x)$ 在点 $\bar x$ 处连续可微，如存在非零向量 $s  \in R^n$ 使
    $$
    
    $$
    成立，则 $s$ 是 $f(x)$ 在点 $\bar x$ 处的一个下降方向

    <details>
        <summary>证明</summary>
        <center>
            111
        </center>
    </details>

- **一阶必要条件**定理：设 $f:D \subset R^n \to R^1$ 在开集 $D$ 上连续可微，若 $x^* \in D$ 是目标函数的局部极小点，$f(x)$ 的一阶导数 $\nabla f(x)$ 表示为 $g(x)$，则
    $$
    g(x^*)=0
    $$

    <details>
        <summary>证明</summary>
        <center>
            111
        </center>
    </details>


### 1.4 最优化方法概述

## 第二章 线性规划



## 第三章 线性搜索与信赖域方法

















