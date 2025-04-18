---
title: 数学
---

## 模运算

## 快速幂

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

## 乘法逆元

假设 $x$ 需要在 $\% \ p$ 的情况下除以 $a$，若 $a$ 与 $p$ 互质，则该式可以转化为 $x$ 乘以 $a$ 的乘法逆元。我们将 $a$ 的乘法逆元记作 $inv(a)$。即：

$$
\frac{x}{a} \equiv x \cdot inv(a) \pmod p
$$

结合快速幂算法，计算乘法逆元的时间复杂度就是 $O(\log p)$。详细推导过程如下：

1）对于任意 $a$ 的整数倍 $t$，一定有下式成立：

$$
\begin{aligned}
\frac{t}{a} \equiv t \cdot inv(a) \pmod p \\
\frac{1}{a} \equiv 1 \cdot inv(a) \pmod p \\
1 \equiv a \cdot inv(a) \pmod p \\
\end{aligned}
$$

2）由 [费马小定理](https://baike.baidu.com/item/费马小定理/4776158) 可知，若 $h$ 为质数（素数）且 $g$ 与 $h$ 互质（即 $g$ 不是 $h$ 的整数倍或者说 $\gcd(g,h)=1$），则有：

$$
1 \equiv g^{h-1} \pmod h
$$

3）于是本题的推导就可以得到，当 $a$ 与 $p$ 互质时，有：

$$
1 \equiv a^{p-1} \pmod p
$$

4）于是可得 $a$ 的乘法逆元：

$$
inv(a) = a^{p-2}
$$

## 组合数

### 库函数 (Python)

如果使用 Python 3.8 及以上的版本，则可以直接使用 [`math.comb(n, k)`](https://docs.python.org/3/library/math.html#math.comb) 来计算组合数 $C_n^k$。

时间复杂度：$O(\min(k,n-k))$

### 递推法

利用 $C_n^k = C_{n-1}^k + C_{n-1}^{k-1}$ 进行递推求解。以 [求组合数 I - AcWing](https://www.acwing.com/problem/content/887) 为例。

题意：求解 $q$ 次 $C_{n}^k\ \%\ p$ 的结果，其中 $q\le 10^4,1\le k \le n \le 2\times 10^3$，$p$ 为常数 $10^9+7$。

思路：$O(nk)$ 预处理出所有的组合数，$O(q)$ 查询。

```cpp
#include <iostream>
using namespace std;

const int N = 2000;
const int K = 2000;
const int P = 1e9 + 7;

int C[N + 1][K + 1];

int main() {
    // O(nk) 预处理
    for (int a = 0; a <= N; a++) {
        for (int b = 0; b <= a; b++) {
            if (b == 0) {
                C[a][b] = 1;
            } else {
                C[a][b] = (C[a - 1][b] + C[a - 1][b - 1]) % P;
            }
        }
    }

    // O(1) 查询
    int q;
    cin >> q;
    while (q--) {
        int n, k;
        cin >> n >> k;
        cout << C[n][k] << "\n";
    }

    return 0;
}
```

### 乘法逆元法

如果题目中有取模运算，就可以将组合数公式中的「除法运算」转换为「关于逆元的乘法运算」进行求解。以 [求组合数 II - AcWing](https://www.acwing.com/problem/content/888/) 为例。

题意：求解 $q$ 次 $C_{n}^k\ \%\ p$ 的结果，其中 $q\le 10^4,1\le k \le n \le 10^5$，$p$ 为常数 $10^9+7$。

思路：

- 此题中需要对组合数 $C_n^k$ 的计算结果模上常数 $p$，由于此题的模数 $p$ 与 $n,k$ 一定互质，因此才可以采用将除法转换为乘法逆元的预处理做法来求解。如果仍然采用上述递推法将会超时；
- 因此我们 $O(n\log p)$ 预处理出所有的「阶乘」和「乘法逆元」，然后 $O(q)$ 查询。

```c++
#include <iostream>

using namespace std;
using ll = long long;

const int N = 1e5;
const int P = 1e9 + 7;

int fact[N + 1];    // fact[i] 表示 i 的阶乘
int infact[N + 1];  // infact[i] 表示 i 的阶乘的逆元

int qmi(int a, int b, int p) {
    int res = 1 % p;
    while (b) {
        if (b & 1) res = (ll) res * a % p;
        a = (ll) a * a % p;
        b >>= 1;
    }
    return res;
}

int main() {
    // O(n log p) 预处理
    fact[0] = 1, infact[0] = 1;
    for (int a = 1; a <= N; a++) {
        fact[a] = (ll) fact[a - 1] * a % P;
        infact[a] = (ll) infact[a - 1] * qmi(a, P - 2, P) % P;
    }

    // O(1) 查询
    int q;
    cin >> q;
    while (q--) {
        int n, k;
        cin >> n >> k;
        cout << (ll) fact[n] * infact[k] % P * infact[n - k] % P << "\n";
    }

    return 0;
}
```
