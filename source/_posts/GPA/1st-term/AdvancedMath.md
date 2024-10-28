---
title: AdvancedMath
categories:
  - GPA
  - 1st-term
category_bar: true
---

## 高等数学 - 竞赛向

参考资料：

- [【全国大学生数学竞赛】非数学类历年真题刷题（高数版）](https://www.bilibili.com/video/BV1N44y1h7Uh/)

- [大学生数学竞赛（非数学类）学习导航](https://zhuanlan.zhihu.com/p/395552547)

## 1 极限

求极限一些方法方法：

1. 等价无穷小
2. 洛必达法则
3. 泰勒展开
4. 夹逼准则

给出 [泰勒展开](https://blog.csdn.net/Infinity_07/article/details/113830088) 的常用公式：
$$
\begin{aligned}
e^{x}&=\sum_{n=0}^{\infty} \frac{1}{n !} x^{n}=1+x+\frac{1}{2 !} x^{2}+\cdots \in(-\infty,+\infty) \\
\sin x&=\sum_{n=0}^{\infty} \frac{(-1)^{n}}{(2 n+1) !} x^{2 n+1}=x-\frac{1}{3 !} x^{3}+\frac{1}{5 !} x^{5}+\cdots, x \in(-\infty,+\infty) \\
\cos x&=\sum_{n=0}^{\infty} \frac{(-1)^{n}}{(2 n) !} x^{2 n}=1-\frac{1}{2 !} x^{2}+\frac{1}{4 !} x^{4}+\cdots, x \in(-\infty,+\infty) \\
\tan x&=\sum_{n=1}^{\infty} \frac{B_{2 n}(-4)^{n}\left(1-4^{n}\right)}{(2 n) !} x^{2 n-1}=x+\frac{1}{3} x^{3}+\frac{2}{15} x^{5}+\cdots,x\in (-\frac{\pi}{2},\frac{\pi}{2})\\
\arcsin x&=\sum_{n=0}^{\infty} \frac{(2 n) !}{4^{n}(n !)^{2}(2 n+1)} x^{2n+1}=x+\frac{1}{6} x^{3}+\frac{3}{40} x^{5}+\frac{5}{112} x^{7}+\frac{35}{1152} x^{9}+\cdots+, x \in(-1,1)\\
\arctan x&=\sum_{n=0}^{\infty} \frac{(-1)^{n}}{2 n+1} x^{2 n+1}=x-\frac{1}{3} x^{3}+\frac{1}{5} x^{5}+\cdots+ x \in[-1,1] \\
\ln (1+x)&=\sum_{n=0}^{\infty} \frac{(-1)^{n}}{n+1} x^{n+1}=x-\frac{1}{2} x^{2}+\frac{1}{3} x^{3}+\cdots, x \in(-1,1] \\
\frac{1}{1-x}&=\sum_{n=0}^{\infty} x^{n}=1+x+x^{2}+x^{3}+\cdots, x \in(-1,1) \\
\frac{1}{1+x}&=\sum_{n=0}^{\infty}(-1)^{n} x^{n}=1-x+x^{2}-x^{3}+\cdots, x \in(-1,1)\\
(1+x)^{\alpha}&=1+\sum_{n=1}^{\infty} \frac{\alpha(\alpha-1) \cdots(\alpha-n+1)}{n !} x^{n}=1+\alpha x+\frac{\alpha(\alpha-1)}{2 !} x^{2}+\cdots, x \in(-1,1) \\
\end{aligned}
$$

## 2 微分

### 基本函数

- $\text{d}(C) = 0$
- $\text{d}(x^n) = nx^{n-1} \, \text{d}x$
- $\text{d}\left(\frac{1}{x}\right) = -\frac{1}{x^2} \, \text{d}x$
- $\text{d}(a^x) = a^x \ln a \, \text{d}x$
- $\text{d}(e^x) = e^x \, \text{d}x$
- $\text{d}(\ln x) = \frac{1}{x} \, \text{d}x$
- $\text{d}(\log_a x) = \frac{1}{x \ln a} \, \text{d}x$

### 三角函数

- $\text{d}(\sin x) = \cos x \, \text{d}x$
- $\text{d}(\cos x) = -\sin x \, \text{d}x$
- $\text{d}(\tan x) = \sec^2 x \, \text{d}x$
- $\text{d}(\cot x) = -\csc^2 x \, \text{d}x$
- $\text{d}(\sec x) = \sec x \tan x \, \text{d}x$
- $\text{d}(\csc x) = -\csc x \cot x \, \text{d}x$

### 反三角函数

- $\text{d}(\arcsin x) = \frac{1}{\sqrt{1 - x^2}} \, \text{d}x$
- $\text{d}(\arccos x) = -\frac{1}{\sqrt{1 - x^2}} \, \text{d}x$
- $\text{d}(\arctan x) = \frac{1}{1 + x^2} \, \text{d}x$
- $\text{d}(\text{arccot}\ x) = -\frac{1}{1 + x^2} \, \text{d}x$

## 3 积分

### 基本函数

- $\int 0 \, \text{d}x = C$
- $\int x^a \, \text{d}x = \frac{x^{a+1}}{a+1} + C \, (a \neq -1)$
- $\int \frac{1}{x} \, \text{d}x = \ln |x| + C \, (x \neq 0)$
- $\int a^x \, \text{d}x = \frac{a^x}{\ln a} + C \, (a > 0, a \neq 1)$
- $\int e^x \, \text{d}x = e^x + C$

### 三角函数

- $\int \cos x \, \text{d}x = \sin x + C$
- $\int \sin x \, \text{d}x = -\cos x + C$
- $\int \tan x \, \text{d}x = \ln |\cos x| + C$
- $\int \cot x \, \text{d}x = \ln |\sin x| + C$
- $\int \sec x \, \text{d}x = \ln |\sec x + \tan x| + C = \ln \left| \tan \frac{x}{2} + \frac{\pi}{4} \right| + C$
- $\int \csc x \, \text{d}x = \ln |\csc x - \cot x| + C = \ln \left| \tan \frac{x}{2} + \frac{\pi}{4} \right| + C$

### 反三角函数

- $\int \frac{1}{\sqrt{1 - x^2}} \, \text{d}x = \arcsin x + C \, (\text{或} \, \arccos x + C)$
- $\int \frac{1}{1 + x^2} \, \text{d}x = \arctan x + C \, (\text{或} \, \text{arccot} x + C)$

### 其他

- $\int \frac{1}{\cos^2 x} \, \text{d}x = \int \sec^2 x \, \text{d}x = \tan x + C$
- $\int \frac{1}{\sin^2 x} \, \text{d}x = \int \csc^2 x \, \text{d}x = -\cot x + C$
- $\int \frac{1}{a^2 - x^2} \, \text{d}x = \frac{1}{2a} \ln \left| \frac{a + x}{a - x} \right| + C$
- $\int \frac{x}{\sqrt{a^2 - x^2}} \, \text{d}x = -\sqrt{a^2 - x^2} + C$
- $\int \sqrt{a^2 - x^2} \, \text{d}x = \frac{x}{2} \sqrt{a^2 - x^2} + \frac{a^2}{2} \arctan \frac{x}{\sqrt{a^2 - x^2}} + C$
- $\int \frac{\text{d}x}{\sqrt{x^2 + a^2}} = \ln |x + \sqrt{x^2 + a^2}| + C$
- $\int e^x \sin x \, \text{d}x = \frac{1}{2} e^x (\sin x - \cos x) + C$
- $\int e^x \cos x \, \text{d}x = \frac{1}{2} e^x (\sin x + \cos x) + C$

## 4 微分方程

## 5 应用题

## 6 证明题

## 7 无穷级数