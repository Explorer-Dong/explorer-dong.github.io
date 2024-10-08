---
title: LinearAlgebra
categories:
  - GPA
  - 3rd-term
category_bar: true
---

## 线性代数

## 第1章 行列式

### 1.1 二阶与三阶行列式

#### 1.1.1 二元线性方程组与二阶行列所式

线性代数是为了解决多元线性方程组而诞生的

#### 1.1.2 三阶行列式

记住对角线法则即可

### 1.2 全排列和对换

#### 1.2.1 排列及其逆序数

排列：就是每个数位上数字的排序方式

逆序数：就是一个排列 $t$ 中每一个数位之前比其大的数字数量之和，即 
$$
\sum_{i=1}^{n}t_i
$$


#### 1.2.2 对换

对换：就是排列中某两个数位之间的数字进行交换的操作

- 定理一：一个排列中两个元素对换，排列逆序数的奇偶性改变
- 推论：奇排列对换成标准排列的对换次数为奇数，偶排列对换成标准排列的对换次数为偶数

### 1.3 n阶行列式的定义

n阶行列式的值为 $n!$ 个项之和，每一项的组成方式为：每行选一个元素，每列选一个元素，这些元素之积，符号为
$$
(-1)^{N(row)+N(col)}
$$

### 1.4 行列式的性质

- 性质一：行列式与它的转置行列式相等

- 性质二：对换行列式的两个行或者列，行列式变号
    - 推论：若行列式有两行或两列完全相同，则行列式为零
- 性质三：行列式中若某一行（列）都乘以k，等于整个行列式的值乘以k
    - 推论一：行列式的某一行（列）中的公因子可以提出到行列式之外
    - 推论二：若行列式中有两行（列）成比例，则行列式的值为零
- 性质四：若行列式中某一行（列）都是两数之和，则可以拆分成两个行列式之和
- 性质五：把行列式中的某一行（列）乘以一个常数加到另一个行（列）上，行列式的值不变

> 技巧
>
> - 计算技巧：在一开始对换行或者列的时候，尽可能保证左上角是数字1
> - 所有的行（列）之和相等：先全部加到一行（列），再配凑上三角（下三角）

### 1.5 行列式按行（列）展开

> 余子式：$M_{ij}$
>
> 代数余子式：$A_{ij}$
>
> 关系：$A_{ij}=(-1)^{i+j}M_{ij}$

#### 1.5.1 引理

一行（列）只有一个元素不为零，则 $D=a_{ij}A_{ij}$

证明：

- 对于特殊情况，即不为零的元素在左上角，则根据上述分块矩阵，可知
    $$
    D=(-1)^{1+1}a_{ij}M_{ij}=a_{ij}A_{ij}
    $$
    
- 对于一般情况，即某行（列）唯一不为零的元素在任意位置，则经过 $i+j-2$ 次对换后，就是上述特殊情况，可知
    $$
    D=(-1)^{i+j-2}a_{ij}M_{ij}=(-1)^{i+j}a_{ij}M_{ij}=a_{ij}A_{ij}
    $$

#### 1.5.2 定理

某行（列）（x）有多个元素不为零，则
$$
D=\sum_{i=1}^n a_{xi}A_{xi}
$$
证明：就是将展开的那一行（列）通过加法原理进行拆分，然后利用上述引理的一般情况进行证明即可

#### 1.5.3 推论

对于上述的定理，讨论代数余子式前面的系数数组 $a_{xi}(i=1,2,\cdots,n)$

如果系数数组不是第x行（列）的元素，而是其他行（列），那么上述Σ之和就为0

证明很简单，就是从原行列式出发，如果两行（列）元素完全一致，那么行列式显然为0

> 考点：
>
> 一般就是把不同行（列）的元素乘上其他行（列）的元素，然后适当配凑即可
>
> ![例题](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140938343.png)

### 几种特殊的行列式（补）

#### 分块行列式

0 在左下或右上就是左上角与右下角行列式之积（$D=D_1D_2$），0 在左上或右下就是左下角与右上角行列式之积加上符号判定

![分块行列式](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140938721.png)

证明：分区域转换为上三角即可

#### 2n 阶行列式

先行对换，再列对换，通过分块行列式和数学归纳法，可得答案为一个等比数列

![2n 阶行列式](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140939983.png)

#### 范德蒙德行列式 :star:

![范德蒙德行列式](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140939979.png)

证明：首先从最后一行开始，依次减去前一行的 $x_1$ 倍，凑出第一列一个元素不为零的情况，最后通过数学归纳发，即可求解。项数为
$$
C_n^2
$$

## 第2章 矩阵及其运算

### 2.1 线性方程组和矩阵

#### 2.1.1 线性方程组

把线性方程组中的数据搬到了矩阵中而已

#### 2.1.2 矩阵的定义

相较于行列式是一个数，矩阵就是一个数表

- n阶矩阵
- 行（列）矩阵
- 零矩阵
- 对角矩阵: $\Lambda=diag(\lambda_1,\lambda_2,\cdots,\lambda_n)$
- 单位矩阵: 即主对角线全1，其余全0
- 线性变换：$y = x_1 + x_2 ...$ 叫做x到的线性变换

### 2.2 矩阵的运算

#### 2.2.1 矩阵的加法

按元素一个一个加

#### 2.2.2 数与矩阵相乘

按元素一个一个乘

#### 2.2.3 矩阵与矩阵相乘

1. 基本规则：$AB=C$ 中 $c_{ij}$ 就是A的第 i 行与 B 的第 j 列元素依次相乘求和
2. 没有交换律： $AB$ 称为 A 左乘 B，交换成立的前提是 A 和 B 两个**方阵**左乘和右乘相等才可以
3. 有结合律、分配率
4. 单位矩阵：主对角线上元素全为1，其余全为0
5. 纯量矩阵：主对角线上元素全为 $\lambda$ ，其余全为0
6. 幂运算：当A、B两个方阵可交换时，有幂运算规律（因为有结合律）

矩阵乘法算律：

![矩阵乘法算律](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140939006.png)

#### 2.2.4 矩阵的转置

矩阵转置算律：

![矩阵转置算律](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140940894.png)

证明 (4)：左边的 $c_{ij}$ 其实应该是 $AB$ 的 $c_{ji}$ ，对应 $A$ 的第 $j$ 行与 $B$ 的第 $i$ 列，那么反过来对于 ij 就是 B 转置的第 i 行与 A 转置的第 j 列

对称矩阵：对于一个方阵 A，如果 $A = A^T$ 则称 A 为对称阵

![对称矩阵 - 例题](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140940661.png)

#### 2.2.5 方阵的行列式

行列式算律：

![行列式算律](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140940619.png)

伴随矩阵：
$$
AA^* = A^*A = \left | A \right |E
$$
![伴随矩阵](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140940481.png)

### 2.3 逆矩阵

#### 2.3.1 逆矩阵的定义、性质、求法

定义：

- 如果对于矩阵 A，有 $AB = BA = E$ ，则称 B 为 A 的逆矩阵

性质：

- 唯一性：如果矩阵 A 可逆，则 A 的逆矩阵是唯一的

- 行列式：如果矩阵A可逆，则 $|A| \ne 0$ 

- 奇异矩阵：$|A| = 0$ ，非奇异矩阵：$|A| \ne 0$

- 必要条件：若 $AB=E$ （或 $BA = E$），则 A 可逆且 $B = A^{-1}$

求法：

- 若 $|A| \ne 0$ ，则矩阵 A 可逆，且 $A^{-1} = \frac{1}{|A|}A^*$

逆矩阵算律：
$$
\begin{aligned}
{(A^{-1})}^{-1} &=& A \\
({\lambda A})^{-1} &=& \frac{1}{\lambda} A^{-1}\\
({AB})^{-1} &=& B^{-1}A^{-1} \\
(A^T)^{-1} &=& (A^{-1})^{T} \\
|A^{-1}| &=& {|A|}^{-1} \\
|A^*| &=& {|A|}^{n - 1}
\end{aligned}
$$

#### 2.3.2 逆矩阵的初步应用

（一）求逆矩阵：
$$
\begin{aligned}
\text{已知矩阵 $A,B,C$ 且 $AXB=C$,求矩阵 $X$}\\
\text{只需将矩阵 $X$ 左乘 $A^{-1}$ 右乘 $B^{-1}$ 即可}
\end{aligned}
$$
（二）矩阵多项式：

定义：

![定义](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140941791.png)

计算技巧一：直接代入

![直接代入](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202408311004505.png)

计算技巧二：对角阵幂运算

![对角阵幂运算](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946426.png)

计算技巧三：对角矩阵多项式转化为数的多项式计算

![对角矩阵多项式转化为数的多项式计算](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140937968.png)

### 2.4 克拉默法则

应用：

- 求解未知数数量和方程个数相等，且系数行列式不为零的线性方程组

- 是求解一般线性方程组的一个特殊场景

结论：

如果线性方程组

![线性方程组](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140937686.png)

的系数矩阵 A 的行列式不为零，即

![系数矩阵 A 的行列式不为零](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140937651.png)

则方程组有唯一解

![方程组有唯一解](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140937081.png)

其中 $A_j(j=1,2,...,n)$ 是把系数矩阵 A 中第 $j$ 列的元素用方程组右端的常数项代替后所得到的 n 阶矩阵，即

![任意一列](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140937003.png)

证明：

第一步：方程组转化为矩阵方程

![方程组转化为矩阵方程](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140937364.png)

第二步：应用逆矩阵消元

![应用逆矩阵消元](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140937245.png)

第三步：应用行列式的性质计算

![应用行列式的性质计算](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140937432.png)

### 2.5 矩阵分块法

个人感觉就是一种向量化的更高级的思维，对于一个向量，进行全新向量的拆解，从而实现拆分计算。以下是 5 个拆分规则，重点关注第 5 点，即分块对角矩阵以及最后的按行按列分块的两个应用。

#### 2.5.1 拆分规则

首先需要知道的是，在对矩阵进行分块计算的时候，前提有两个：**一个是两个矩阵一开始的规格要相同，另一个是两个矩阵分块之后的规格也要相同**。

按位加：

若

![若](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946427.png)

则

![则](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946428.png)

按位数乘：

若

![若](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946429.png)

则

![则](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946430.png)

矩阵乘法：

若

![若](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946431.png)

则

![则](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946432.png)

其中

![其中](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946433.png)

按位转置：

若

![若](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946434.png)

则

![则](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946435.png)

对角分块矩阵：

![对角分块矩阵](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946436.png)

其中 $A_1,A_2,...,A_s$ 都是方阵，则称 $A$ 为对角分块矩阵

#### 2.5.2 运算性质

幂运算就是主对角线相应元素的幂运算

![幂运算就是主对角线相应元素的幂运算](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946437.png)

矩阵行列式运算性质

![矩阵行列式运算性质](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946438.png)

矩阵的逆就是主对角线的块按位取逆

![矩阵的逆就是主对角线的块按位取逆](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946439.png)

按行按列分块的应用

- $A^T A=O$ 的充要条件是 $A=O$
- 线性方程组的三种表示方式：
    1. 就是类似于一开始的矩阵数表的表示方式
    2. 将系数表示为一个矩阵，将未知数表示成一个矩阵，将常数项也表示成一个矩阵
    3. 同上，只是未知数保持不变，即 $x_1 {a_1} + x_2 {a_2} + \cdots + x_n {a_3} = {b}$
- 线性方程组的解的两种表示方式：
    1. 一一表示
    2. 列向量表示

#### 2.5.3 好题举例

分块的整体运算思想 + 矩阵提取公因子

![分块的整体运算思想 + 矩阵提取公因子](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946440.png)

逆矩阵的按定义的求法，即配凑求出逆矩阵（常规计算法是利用了伴随矩阵的计算思想）

![配凑求出逆矩阵](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946441.png)

## 第3章 矩阵的初等变换与线性方程组

### 3.1 矩阵的初等变换

#### 3.1.1 引入

矩阵的变换 $\to$ 矩阵增广矩阵的行变换 $\to$ 行最简形矩阵

#### 3.1.2 矩阵的初等行变换

定义：

1. $r_i \leftrightarrow r_j$
2. $r_i \leftarrow r_i \times k\ (k \neq 0)$
3. $r_i \leftarrow r_i + kr_j$​

性质：

1. 将行变为列，就是矩阵的初等列变换
2. 初等行变换与初等列变化统称初等变换
3. 三种变换都是可逆的

#### 3.1.3 矩阵的等价关系

定义：

1. $A$ 经过有限次初等行变换变成矩阵 $B$，就称 $A$ 与 $B$ 行等价，记作 $A \stackrel{r}{\sim} B$
1. $A$ 经过有限次初等列变换变成矩阵 $B$，就称 $A$ 与 $B$ 列等价，记作 $A \stackrel{c}{\sim} B$
1. $A$ 经过有限次初等变换变成矩阵 $B$，就称 $A$ 与 $B$ 等价，记作 $A \sim B$

性质：

1. 反身性：$A \sim A$​
2. 对称性：若 $\ A \sim B$ ，则 $\ B \sim A$
3. 传递性：若 $\ A \sim B$ ，$B \sim C$ ，则 $\ A \sim C$

#### 3.1.3 三种形式的矩阵

行阶梯型矩阵

![行阶梯型矩阵](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946442.png)

行最简形矩阵

![行最简形矩阵](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946443.png)

标准形

![标准形](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946444.png)

![image-20231028112702780](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946445.png)

#### 3.1.4 性质1：矩阵初等变换的性质

- 对 $A_{m\times n}$ 施行一次初等行变换，相当于在 $A$ 的左边乘以相应的 $m$ 阶初等矩阵

- 对 $A_{m\times n}$ 施行一次初等列变换，相当于在 $A$ 的右边乘以相应的 $n$ 阶初等矩阵

![矩阵初等变换的性质](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946446.png)

其中：

- $E_m(i,j)$ 表示：交换初等矩阵的第 $i$ 行与第 $j$ 行
- $E_m(i(k))$ 表示：将初等矩阵的第 $i$ 行乘以 $k$
- $E_m(ij(k))$ 表示：将初等矩阵的第 $i$ 行加上第 $j$ 行的 $k$ 倍

#### 3.1.5 性质2：可逆的充要条件

![可逆的充要条件](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946447.png)

#### 3.1.6 定理：矩阵初等变换的存在性定理

![矩阵初等变换的存在性定理](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946448.png)

对于（1）计算 $P$ 的方法：有配凑的味道 - 计算变换矩阵

![计算变换矩阵](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946449.png)

#### 3.1.7 推论：方阵可逆的等价推导

![方阵可逆的等价推导](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946450.png)

于是证明一个方阵 $A$可逆就又多了一个策略，即将 $A$ 经过有限次的初等行变换之后变成了单位阵。

对于（1）当 $A$ 为可逆方阵时计算 $P$ 的方法：此时计算出来的 $P$ 就是 $A^{-1}$ - 证明可逆 + 计算逆矩阵

![当 A 为可逆方阵时计算 P 的方法](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946451.png)

#### 3.1.8 初等变换的应用

（一）解方程

问题：已知矩阵 $A,B$，且 $AX=B$，现在需要求解 $X$ 矩阵

思路：首先需要证明 $A$ 可逆，然后需要计算 $A^{-1}B$，那么采用本节的知识：如果 $A \stackrel{r}{\sim} E$，则 $A$ 可逆，即 $PA=E$，还需要求 $A^{-1}B$。可以发现，此时的 $P = A^{-1}$，那么答案就是 $PB$，于是我们只需要将 $A,B$ 同时进行 $P$ 初等变换即可

答案：最终的目标就是将拼接后的矩阵转化为行最简形矩阵，左边是一个单位矩阵即可

（二）解线性方程组

问题：求解方程数量和未知数数量一致的线性方程组

思路：同上方解方程的思路 $Ax=b$，只不过 $A$ 就是系数矩阵，$b$ 就是常数矩阵，$x$ 就是解方程

补充：解这种线性方程组的策略：

1. 高中学的：消元
2. 第二章第 3 目：求 $A^{-1}b$
3. 第二章第 4 目：克拉默法则
4. 上面刚学的：线性变换

### 3.2 矩阵的秩

定义：矩阵的非零子式的最高阶数，记作 $R(A)$

性质：

1. 转置不变性：$R(A^T)=R(A)$

2. 相似不变性：若 $A \sim B $，则 $R(A)=R(B)$

3. 初等变换不变性：若 $P,Q$ 可逆，则 $R(PAQ)=R(A)$

4. 乘法性质：$0 \le R(A_{m\times n}) \le \min \{m, n\}$

5. 加法性质：

    ![加法性质](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946453.png)

6. 压缩性：若 $A_{m\times n}$ 的秩为 $r$，则 $A$ 一定可以转化为 
    $$
    \begin{bmatrix}
    E_r & O \\
    O & O
    \end{bmatrix}
    $$

### 3.3 线性方程组的解

求解策略：利用 **矩阵的初等变换** 和 **矩阵的秩** 求解一般的线性方程组

对于 $Ax=b$ 的线性方程组：

- 无解的充要条件：$R(A)<R(A,b)$
- 有唯一解的充要条件：$R(A)=R(A,b)=n$
- 有无限多解的充要条件：$R(A)=R(A,b)<n$

求解齐次线性方程组：

- 化简为行最简 or 行阶梯

求解非齐次线性方程组：

- 化简为行最简 or 行阶梯

## 第4章 向量组的线性相关性

### 4.1 向量组及其线性组合

#### 4.1.1 n维向量的概念

显然的 $n>3$ 的向量没有直观的几何形象，所谓向量组就是由同维度的列（行）向量所组成的集合。

向量组与矩阵的关系：

![向量组与矩阵的关系](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946454.png)

#### 4.1.2 线性组合和线性表示

定义：

（一）线性组合：

![线性组合定义](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946455.png)

（二）线性表示：

![线性表示定义](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946456.png)

判定：转化为判定方程组有解问题，从而转化为求解矩阵的秩的问题 5

- 判定**向量** $b$ 能否被**向量组** $A$ 线性表示：

    ![向量被向量组线性表示](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946457.png)

- 判定**向量组** $B$ 能否被**向量组** $A$ 线性表示：
  
    ![向量组被向量组线性表示](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946458.png)
    
    该判定定理有以下推论：
    
    ![放缩性质](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946459.png)
    
- 判定**向量组** $B$ 与**向量组** $A$ 等价：

    ![向量组与向量组等价](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946460.png)

### 4.2 向量组的线性相关性

定义：

![线性相关定义](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946461.png)

![注意](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946462.png)

判定：
- 定理一：

    ![定理一](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946463.png)

    证明：按照定义，只需要移项 or 同除，进行构造即可

- 定理二：

    ![定理二](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946464.png)
    
    证明：按照定义，转化为齐次线性方程组解的问题
    
    - 有非零解 $\Leftrightarrow$ 无数组解（将解方程取倍数即可），$R(A)=R(A,0)<m$
    - 仅有零解 $\Leftrightarrow$ 唯一解，$R(A)=R(A,0)=m$

结论：
- 结论一：

    ![结论一](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946465.png)

    证明：$R(A)<m \to R(B)\le R(A)+1 <m+1$

- 结论二：

    ![结论二](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946466.png)

    证明：$R(A_{x\times m})=m \to R\binom{A}{b}=m$

- 结论三：

    ![结论三](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946467.png)

    证明：$R(A)\le n <m$

- 结论四：

    ![结论四](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946468.png)
    
    证明：$R(A)=m,R(A,b)<m+1 \to Ax=b\text{有唯一解}$
    
    - $\max \{ R(A),R(b) \} \le R(A,b) \le m+1 \to m \le R(A,b) \le m+1$
    - 又 $R(A,b)<m+1$
    - 故 $R(A,b)=m$
    - 因此 $R(A)=R(A,b)=m \to \text{有唯一解}$

### 4.3 向量组的秩

#### 4.3.1 最大无关组的定义

定义一：

![定义一](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946469.png)

注意：

- 最大无关组之间等价
- 最大无关组 $A_0$ 和原向量组 $A$ 等价

定义二：

![定义二](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946470.png)

#### 4.3.2 向量组的秩和矩阵的秩的关系

![向量组的秩和矩阵的秩的关系](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946471.png)

#### 4.3.3 向量组的秩的结论

![向量组的秩的结论 1-2](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946472.png)

![向量组的秩的结论 3-5](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946473.png)

证明：全部可以使用矩阵的秩的性质进行证明

### 4.4 向量空间

#### 4.4.1 向量空间的概念

可以从高中学到的平面向量以及空间向量入手进行理解，即平面向量就是一个二维向量空间，同理空间向量就是一个三维向量空间，那么次数就是拓展到 n 维向量空间，道理是一样的，只不过超过三维之后就没有直观的效果展示罢了。

#### 4.4.2 向量空间的基与维数

同样可以从高中学到的向量入手，此处的基就是基底，维数就是有几个基底。所有的基之间都是线性无关的，这是显然的。然后整个向量空间中任意一个向量都可以被基线性表示，也就很显然了，此处有三个考点，分别为：

**考点一：求解空间中的某向量 x 在基 A 下的坐标**

其实就是求解向量 x 在基 A 的各个“轴”上的投影。我们定义列向量 $\lambda$ 为向量 x 在基 A 下的坐标，那么就有如下的表述：
$$
x = A \  \lambda
$$
**考点二：求解过度矩阵 P**

我们已知一个向量空间中的两个基分别为 A 和 B，若有矩阵 P 满足基变换公式：$B = AP$，我们就称 P 为从基 A 到基 B 的过渡矩阵

**考点三：已知空间中的某向量 x 在基 A 下坐标为 $\lambda$，以及从基 A 到基 B 的过渡矩阵为 P，求解转换基为 B 之后的坐标 $\gamma$**

![求解过程](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946474.png)

### 4.5 线性方程组的解的结构

本目其实就是 3.3 目的一个知识补充，具体的线性方程组求解方法与 3.3 目几乎完全一致，只不过通过解的结构将解的结构进行了划分从而看似有些不同。但是殊途同归，都是一个东西。下面介绍本目与 3.3 目不同的地方：

我们从 3.3 目可以知道，无论是齐次线性方程组还是非齐次线性方程组，求解步骤都是：将系数矩阵（非齐次就是增广矩阵）进行行等价变换，然后对得到的方程组进行相对应未知变量的赋值即可。区别在于：
$$
\text{非齐次线性方程组的通解}=\text{非齐次线性方程组的一个特解}+\text{齐次线性方程组的通解}
$$
解释：我们将

- 齐次线性方程组记为 $Ax=0$，解为 $\eta$，则有 $A \eta = 0$
- 非齐次线性方程组记为 $Ax=b$，假如其中的一个特解为 $\eta^*$，则 $A\eta^*=b$，假如此时我们又计算出了该方程组的其次线性解 $\eta$，则有 $A\eta=0$。那么显然有 $A(\eta^*+\eta)=b$，此时 $\eta^* + \eta$ 就是该非齐次线性方程组的通解

也就是说本目对 3.3 目的线性方程组的求解给出了进一步的结构上的解释，即非齐次线性方程组的解的结构是基于本身的一个特解与齐次的通解之上的，仅此而已。当然了，本目在介绍齐次线性方程组解的结构时还引入了一个新的定理：
$$
\begin{aligned}
\text{若矩阵 $A_{m\times n}$ 的秩为 $r$,则该矩阵的解空间的维度(基础解系中线性无关向量的个数)就是 $n-r$,即:}
\end{aligned}
$$
$$
dimS = n-r
$$

该定理可以作为一些证明秩相等的证明题的切入点。若想要证明两个$ n$ 元矩阵 $A$ 和 $B$ 的秩相等，可以转化为证明两个矩阵的基础解析的维度相等，即解空间相等。证明解空间相等进一步转向证明 $Ax=0$ 与 $Bx=0$ 同解，证明同解就很简单了，就是类似于证明一个充要条件，即证明 $Ax=0 \to Bx=0$ 以及 $Bx=0 \to Ax=0$

## 第5章 相似矩阵及二次型

### 5.1 向量的内积、长度及正交性

#### 5.1.1 内积

即各个位置的数依次相乘。运算规律如下：

![运算规律](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946475.png)

推导全部按照内积的定义来，肥肠煎蛋

#### 5.1.2 长度

类似于模长，有以下性质：

![性质](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946476.png)

n 维向量与 n 维向量间的夹角：

![n 维向量与 n 维向量间的夹角](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946477.png)

#### 5.1.3 正交

类似于两个非零向量垂直的关系，即两向量内积为 0。

（一）正交向量组

- 定义：向量组之间的任意两两向量均正交
- 性质：正交向量组一定线性无关

（二）标准正交基

- 定义：是某空间向量的基+正交向量组+每一个向量都是单位向量

- 求解方法：施密特正交化

    1. 正交化：（其实就是对基础解系的一个线性组合）

        ![正交化](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946478.png)

        ![正交化](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946479.png)

    2. 单位化：
    
        ![单位化](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406140946480.png)

#### 5.1.4 正交矩阵与正交变换

正交矩阵：（方阵）

1. 定义：满足 $A^TA=E\ \text{or} \ AA^T=E$ 的矩阵
2. 定理：正交矩阵的充要条件为矩阵的行（列）向量为单位向量且两两正交

正交变换：

1. 定义：对于正交矩阵 $A$，$y=Ax$ 称为称为正交变换
2. 性质：$||y||=\sqrt{y^Ty}=\sqrt{x^TA^TAx}=\sqrt{x^TEx}=\sqrt{x^Tx}=||x||$，即线段经过正交变换之后长度保持不变

### 5.2 方阵的特征值与特征向量

#### 5.2.1 定义

对于一个n阶方阵 A，存在一个复数 $\lambda$ 和一组n阶非零向量 x 使得 
$$
Ax=\lambda x
$$
则称 x 为特征向量，$\lambda$ 为特征值，$|A-\lambda E|$ 为特征多项式

#### 5.2.2 特征值的性质

**性质一**

n阶矩阵 A 在复数范围内含有 n 个特征值，且
$$
\begin{aligned}
\sum_{i=1}^{n} \lambda _i &=& \sum_{i=1}^{n} a_{ii} \\
\prod_{i=1}^{n} \lambda _i &=& \left | A \right |
\end{aligned}
$$
**性质二**

若 $\lambda$ 是 A 的特征值，则 $\phi{(\lambda)}$ 是 $\phi{(A)}$ 的特征值

#### 5.2.3 特征向量的性质

对于同一个矩阵，**不同的**特征值对应的特征向量之间是**线性无关**的

### 5.3 相似矩阵

#### 5.3.1 定义

对于两个 n 阶方阵 A, B 而言，若存在可逆矩阵 P 使得
$$
PAP^{-1}=B
$$
则称 B 为 A 的相似矩阵，A 与 B 相似，也称对 A 进行相似变换，P 为相似变换矩阵

#### 5.3.2 性质

若矩阵 A 与 B 相似，则 A 与 B 的特征多项式相同，则 A 与 B 的特征值也就相同，A 与 B 的行列式也就相同

#### 5.3.3 矩阵多项式

一个矩阵 A 的多项式 $\phi{(A)}$ 可以通过其相似矩阵 $\Lambda$ 很轻松地计算出来为 $P \phi{(\Lambda)} P^{-1}$，即对角矩阵左乘一个可逆阵，右乘可逆阵的逆矩阵即可，而对角矩阵的幂运算就是对角元素的幂运算，故而非常方便就可以计算一个矩阵的多项式。那么计算的关键在于如何找到一个矩阵的相似矩阵？下面给出判定一个矩阵是否存在相似矩阵（可对角化）的判定定理：

<center>n 阶方阵可对角化的充要条件为该方阵含有 n 个线性无关的特征向量</center>

### 5.4 对称矩阵的对角化

本目讨论一个 n 阶方阵具备什么条件才能拥有 n 个线性无关的特征向量，从而可对角化。但是对于一般的方阵，情况过于复杂，此处只讨论 n 阶对称矩阵。即：一个 n 阶对角矩阵具备什么条件才能拥有 n 个线性无关的特征向量，从而可对角化。

答案是 n 阶对角矩阵一定是可对角化的。因为有一个定理是这样的：对于一个对称矩阵 A 而言，一定可以找到一个正交矩阵 P 使得 $P^{-1}AP=\Lambda$，又由于正交矩阵一定是可逆矩阵，因此一定可以找到矩阵 A 的 n 个线性无关的特征向量，从而 A 一定可对角化。

**对称矩阵的性质**

1. 对称矩阵的特征值均为实数
2. 对称矩阵 A 的两个特征值 $\lambda _1$ 与 $\lambda _2$ 对应的两个特征向量分别为 $P_1$ 和 $P_2$，若 $\lambda_1 \ne \lambda_2$，相比于一般的矩阵 $P_1$ 与 $P_2$ 线性无关，此时两者关系更强，即：$P_1$ 与 $P_2$ 正交
3. 对称矩阵的每一个 k 重根，一定对应有 k 个线性无关的特征向量

因此本目相较于 5.3 目其实就是通过可对角化这一个概念，来告诉我们对称矩阵是一定可以求出对角矩阵的。而不用判断当前矩阵是否可对角化了。只不过在此基础之上还附加了一个小定理（也没给出证明），就是对称矩阵的相似变换矩阵一定是一个正交矩阵，那么也就复习回顾了 5.1 目中学到的正交矩阵的概念。为了求解出这个正交矩阵，我们需要在 5.3 目求解特征向量之后再加一个操作，即：对于一个 k 重根，根据上面的性质3我们知道当前的根一定有 k 个线性无关的特征向量，为了凑出最终的正交矩阵，我们需要对这 k 个线性无关的特征向量正交化。那么所有的特征值下的特征向量都正交化之后，又由性质2可知，不同的特征值下的特征向量又是正交的，于是最终的正交的相似变换矩阵也就求出来了，也就得到了对角矩阵 $\Lambda$

### 5.5 二次型及其标准型（部分）

本目只需要掌握到：将一个二次型转化为标准型，即可。其实就是比 5.4 目多一个将**二次齐次函数**的系数取出组成一个二次型的步骤。其中二次型就是一个对称矩阵。接着就是重复 5.4 目中的将对称矩阵转化为对角矩阵的过程了。

## 补

### 对称矩阵和正定性之间的关系

在最优化方法中我们需要通过目标函数海塞矩阵的正定性来判断凸性，显然的海塞矩阵是对称方阵。可以分别从特征值和行列式的角度进行判断。

#### 特征值角度

- 一个对称矩阵 A 是正定的，当且仅当它的所有特征值 $\lambda_i>0$
- 一个对称矩阵 A 是正半定的，当且仅当它的所有特征值 $\lambda_i \ge 0$

#### 行列式角度

- 一个对称矩阵 A 是正定的，当且仅当所有主子矩阵的行列式都大于零
- 一个对称矩阵 A 是正半定的，当且仅当所有主子矩阵的行列式都大于或等于零
