---
title: 数学
---

## 乘法逆元

假设当前需要在 $\% \ p$ 的情况下除以 $a$，则可以转化为乘以 $a$ 的乘法逆元 $a^{-1}$，即：

$$
\begin{aligned}
&\frac{\text{num}}{a} \equiv \text{num} \times a^{-1} (\text{mod } p)\\
&\text{其中 } a^{-1} = a^{p-2} \text{ 当且仅当 $a$ 与 $p$ 互质}
\end{aligned}
$$

时间复杂度：$O(\log p)$

推导：

对于任意 $a$ 的整数倍 $t$，一定有下式成立：其中的 $x$ 就是整数 $a$ 的乘法逆元，记作 $a^{-1}$

$$
\begin{aligned}
\frac{t}{a} \equiv t \times x\quad (\mod p) \\
\frac{1}{a} \equiv 1 \times x\quad (\mod p) \\
1 \equiv a \times x\quad (\mod p) \\
\end{aligned}
$$

由 [费马小定理](https://baike.baidu.com/item/费马小定理/4776158)，对于两个互质的整数 $g,h$ 而言，一定有下式成立：

$$
g^{h-1} \equiv 1\quad (\mod h)
$$

于是本题的推导就可以得到，当 $a$ 与 $p$ 互质时，有：

$$
a^{p-1} \equiv 1 \quad (\mod p)
$$

于是 $a$ 的乘法逆元就是：

$$
a^{-1} = a^{p-2}
$$
