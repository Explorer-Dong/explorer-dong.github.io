---
title: 数学
---

## 乘法逆元

假设当前需要在 $\% \ p$ 的情况下除以 $a$，则可以转化为乘以 $a$ 的乘法逆元 $a^{-1}$，即：

$$
\begin{aligned}
&\frac{\text{num}}{a} \equiv \text{num} \times a^{-1}\ (\bmod\ p)\\
&\text{其中 } a^{-1} = a^{p-2} \text{ 当且仅当 $a$ 与 $p$ 互质}
\end{aligned}
$$

时间复杂度：$O(\log p)$

推导：

对于任意 $a$ 的整数倍 $t$，一定有下式成立：其中的 $x$ 就是整数 $a$ 的乘法逆元，记作 $a^{-1}$

$$
\begin{aligned}
\frac{t}{a} \equiv t \times x\ (\bmod\ p) \\
\frac{1}{a} \equiv 1 \times x\ (\bmod\ p) \\
1 \equiv a \times x\ (\bmod\ p) \\
\end{aligned}
$$

由 [费马小定理](https://baike.baidu.com/item/费马小定理/4776158) 可知，对于两个互质的整数 $g,h$，一定有下式成立：

$$
g^{h-1} \equiv 1\ (\bmod\ h)
$$

于是本题的推导就可以得到，当 $a$ 与 $p$ 互质时，有：

$$
a^{p-1} \equiv 1 \ (\bmod\ p)
$$

于是 $a$ 的乘法逆元就是：

$$
a^{-1} = a^{p-2}
$$

## 质数筛

为了求解 $[1,n]$ 范围内的所有质数，我们可以有三种方法来实现，对应的时间开销逐渐减小。

### 朴素筛法

在枚举每一个数 $i$ 时，筛掉所有 $i$ 的倍数。时间复杂度：$O(n\log n)$。

```c++
std::vector<int> simple_prime_filter(int n) {
    std::vector<bool> vis(n + 1);
    std::vector<int> primes;
    for (int i = 2; i <= n; i++) {
        if (!vis[i]) {
            primes.push_back(i);
        }
        for (int j = i; j <= n; j += i) {
            vis[j] = true;
        }
    }
    return primes;
}
```

### 埃氏筛法

若当前 $i$ 是质数，再筛掉 $i$ 的所有倍数。因为如果当前 $i$ 是合数，其实已经被筛掉了。时间复杂度：$O(n\log(\log n))$。

```c++
std::vector<int> eratosthenes_prime_filter(int n) {
    std::vector<bool> vis(n + 1);
    std::vector<int> primes;
    for (int i = 2; i <= n; i++) {
        if (!vis[i]) {
            for (int j = i; j <= n; j += i) {
               vis[j] = true;
            }
            primes.push_back(i);
        }
    }
    return primes;
}
```

### 欧拉筛法

在枚举每一个数 $i$ 时，筛掉所有 $i$ 与已知质数的乘积。时间复杂度：$O(n)$。

```c++
std::vector<int> eular_prime_filter(int n) {
    std::vector<bool> vis(n + 1);
    std::vector<int> primes;
    for (int i = 2; i <= n; i++) {
        if (!vis[i]) {
            primes.push_back(i);
        }
        for (int j = 0; primes[j] <= n / i; j++) {
            vis[primes[j] * i] = true;
            if (i % primes[j] == 0) {
                break;
            }
        }
    }
    return primes;
}
```
