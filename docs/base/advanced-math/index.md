---
title: 高等数学导读
---

本文记录高等数学的学习笔记。由于笔记产生于大学生数竞 [^comp] [^comp2] 以及速成阶段 [^kk]，内容只涉及微积分。下图展示了数学分析（高等数学）的知识体系，感兴趣的小伙伴可以对本专栏进行补充。

[^comp]: [全国大学生数学竞赛 - 非数学类历年真题刷题（高数版）](https://www.bilibili.com/video/BV1N44y1h7Uh/)
[^comp2]: [大学生数学竞赛（非数学类）学习导航](https://zhuanlan.zhihu.com/p/395552547)
[^kk]: [框框老师课堂](https://nuaa.store/article/kuang-kuang-lao-shi-ke-tang)

![知识体系](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250310230705375.jpg)

/// fc
知识体系 [^arch]
///

[^arch]: [梳理下什么是微积分，高等数学，数学分析](https://zhuanlan.zhihu.com/p/32349108)

> Q：如何构建高等数学的知识体系？
> 
> A [^answer]：**研究对象：函数**，**研究工具：极限**。由此来研究以下内容：
>
> - 微分学（单元->多元）
> - 积分学（单元->多元）
> - 微分和积分的应用
> - 无穷级数
> - 常微分方程

[^answer]: [如何构建高等数学的知识体系？ - Chasse的回答 - 知乎](https://www.zhihu.com/question/578584496/answer/2857591316)

| **概念**   | **定义** | **数学表示** | **几何意义** | **计算方式** | **应用** |
|-----------|---------|:-----------|------------|------------|------------|
| 导数 (Derivative) | 表示函数在某点的斜率 | $f'(x) = \lim\limits_{h \to 0} \dfrac{f(x+h) - f(x)}{h}$ | 曲线在某点的切线斜率 | 直接对函数求导 | 速度、优化 |
| 偏导数 (Partial Derivative) | 多元函数对某个变量的变化率 | $\dfrac{\partial f}{\partial x} = \lim\limits_{h \to 0} \dfrac{f(x+h, y) - f(x, y)}{h}$ | 某个变量方向上的切线斜率 | 对一个变量求导，其他变量视作常数 | 反向传播、物理建模 |
| 微分 (Differential) | 用导数近似函数的微小变化 | $\mathrm d y = f'(x)\mathrm dx$ | 小范围内的线性近似 | $\mathrm d y = (3x^2+2)\mathrm d x$ | 误差估计 |
| 差分 (Finite Difference) | 离散化的导数近似 | 前向差分：$\dfrac{f(x+h) - f(x)}{h}$ | 离散点之间的变化率 | 计算有限步长 $h$ 的差值 | 数值求解微分方程 |
| 积分 (Integral) | 求和运算 / 导数的逆运算 | $\displaystyle \int f(x) dx$ | 求面积或累积量 | 计算反导数或求和 | 位移、能量 |
| 梯度 (Gradient) | 多元函数在各方向的变化率 | $\nabla f = \left( \dfrac{\partial f}{\partial x}, \dfrac{\partial f}{\partial y} \right)$ | 函数增长最快的方向 | 计算所有偏导数组成向量 | 梯度下降 |

/// tc
概念对比表
///

总结：

1. **导数 vs. 偏导数**：导数是一元函数的瞬时变化率，偏导数是多元函数对某个变量的变化率。
2. **微分 vs. 差分**：微分是导数的近似变化，差分是离散版的导数。
3. **积分 vs. 导数**：积分是导数的逆运算，表示累积量。
4. **梯度 vs. 偏导数**：梯度是所有偏导数组成的向量，表示函数增长最快的方向。
