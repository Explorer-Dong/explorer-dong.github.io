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

## 数学

### 质数

Divide and Equalize

> 题意：给定 $n$ 个数，问能否找到一个数 $num$，使得 $num^n = \prod_{i=1}^{n}a_i$
>
> 原始思路：起初我的思路是二分，我们需要寻找一个数使得 n 个数相乘为原数组所有元素之积，那么我们预计算出所有数之积，并且在数组最大值和最小值之间进行二分，每次二分出来的数计算 n 次方进行笔比较即可。但是有一个很大的问题是，数据量是 $10^4$，而数字最大为 $10^6$，最大之积为 $10^{10}$ 吗？不是！最大之和才是，最大之积是 $10^{6\times10^4}$
>
> 最终思路：我们可以将选数看做多个水池匀水的过程。现在每一个水池的水高都不定，很显然我们一定可以一个值使得所有的水池的高度一致，即 $\frac{\sum_{i=1}^{n}a_i}{n}$。但是我们最终的数字是一个整数，显然不可以直接求和然后除以 n，那么应该如何分配呢？我们知道水池之所以可以直接除以 n，是因为水的最小分配单位是无穷小，可以随意分割；而对于整数而言，最小分配单位是什么呢？答案是 **质因子**！为了通过分配最小单位使得最终的“水池高度一致”，我们需要让每一个“水池”获得的数值相同的质因子数量相同。于是我们只需要统计一下数组中所有数的质因子数量即可。如果对于每一种质因子的数量都可以均匀分配每一个数（即数量是 n 的整数倍），那么就一定可以找到这个数使得 $num^n = \prod_{i=1}^{n}a_i$

```cpp
void solve() {
	int n;
	cin >> n;

	// 统计所有数字的所有质因数
	unordered_map<int, int> m;
	for (int i = 0; i < n; i++) {
		int x;
		cin >> x;

		for (int k = 2; k <= x / k; k++) {
			if (x % k == 0) {
				while (x % k == 0) {
					m[k]++;
					x /= k;
				}
			}
		}

		if (x > 1) {
			m[x]++;
		}
	}

	// 查看每一种质因数是否是n的整数倍
	for (auto& x: m) {
		if (x.second % n) {
			cout << "No\n";
			return;
		}
	}

	cout << "Yes\n";
}
```

### 整除

Deja Vu

<https://codeforces.com/contest/1891/problem/B>

> 题意：给点序列 a 和 b，对于 b 中的每一个元素 $b_i$，如果 a 中的元素 $a_j$ 能够整除 $2^{b_i}$，则将 $a_j$ 加上 $2^{b_i - 1}$。给出最后的 a 序列
>
> 思路一：暴力枚举。
>
> - 我们很容易就想到暴力的做法，即两层循环，第一层枚举 b 中的元素，第二层枚举 a 中的元素，如果 a 中的元素能够整除 2 的 $b^i$ 次方，就将 a 中相应的元素加上一个值即可。但是时间复杂度肯定过不了，考虑优化。
>
> - 时间复杂度：$O(nm)$
>
> 思路二：整除优化。
>
> - 现在我们假设 a 中有一个数 $a_j$ 是 $2^{b_i}$ 的整数倍（其中 $b_i$ 是 b 序列中第一个枚举到的能够让 $a_i$ 整除的数），那么就有 $a_j = k2^{b_i}(k=1,2,...,)$，那么 $a_j$ 就要加上 $2^{b_i-1}$，于是 $a_j$ 就变为了 $k2^{b_i}+2^{b_i-1}=(2k+1)2^{b_i-1}$。此后 $a_j$ 就一定是 $2^t(t\in \left[ 1,b_i-1 \right])$ 的倍数。因此我们需要做的就是首先找到 b 序列中第一个数 x，能够在 a 中找到数是 $2^x$ 的整数倍。这一步可以这样进行：对于 a 中的每一个数，我们进行 30 次循环统计当前数是否是 $2^i$ 的倍数，如果是就用哈希表记录当前的 $i$。最后我们在遍历寻找 x 时，只需要查看当前的 x 是否被哈希过即可。接着我们统计 b 序列中从 x 开始的严格降序序列 c（由题意知，次序列的数量一定 $\le$ 30，因为 b 序列中数值的值域为 $[1~30]$）。最后我们再按照原来的思路，双重循环 a 序列和 c 序列即可。
>
> - 时间复杂度：$O(30n)$

```cpp
void solve() {
	int n, m;
	cin >> n >> m;

	vector<int> a(n + 1), b(m + 1);
	unordered_map<int, int> ha;

    // 边读边哈希
	for (int i = 1; i <= n; i++) {
		cin >> a[i];
		for (int j = 30; j >= 1; j--) {
			if (a[i] % (1 << j) == 0) {
				ha[j]++;
			}
		}
	}

	for (int i = 1; i <= m; i++) {
		cin >> b[i];
	}

	// 寻找b中第一个能够让a[j]整除的数b[flag]
	int flag = -1;
	for (int i = 1; i <= m; i++) {
		if (ha[b[i]]) {
			flag = i;
			break;
		}
	}

    // 特判
	if (flag == -1) {
		for (int j = 1; j <= n; j++) {
			cout << a[j] << " \n"[j == n];
		}
		return;
	}

    // 寻找b中从flag开始的严格单调递减的序列c
	vector<int> c;
	c.push_back(b[flag]);
	for (; flag <= m; flag++) {
		if (b[flag] < c.back()) {
			c.push_back(b[flag]);
		}
	}

    // 暴力循环一遍即可
	for (int j = 1; j <= n; j++) {
		for (int k = 0; k < c.size(); k++) {
			if (a[j] % (1 << c[k]) == 0) {
				a[j] += 1 << (c[k] - 1);
			}
		}
	}

	for (int j = 1; j <= n; j++) {
		cout << a[j] << " \n"[j == n];
	}
}
```

### 组合数学

序列数量

<https://www.acwing.com/problem/content/5571/>

> 题意：给定 $i(i=1,2,\cdots,n)$ 个苹果，将其分给 $m$ 个人，问一共有多少种分配方案，给出结果对 $10^6+3$ 取模的结果
>
> 思路：整数分配问题。我们采用隔板法，隔板法相关例题见这篇博客：<https://www.acwing.com/solution/content/241669/>。下面开始讲解
>
> - 利用 **隔板法** 推导结果。首先我们考虑当前局面，即只有 i 个苹果的情况下的方案数。于是题目就是 i 个苹果分给 m 个人，允许分到 0 个。于是借鉴上述链接中“少分型”的思路，先借 m 个苹果，那么此时局面中就有 i+m 个苹果，现在就等价于将 i+m 个苹果分给 m 个人，每人至少分得 1 个苹果。（分完以后每个人都还回去就行了），此时的隔板操作就是”标准型”，即 i+m 个苹果产生 i+m-1 个间隔，在其中插 m-1 块板，从而将划分出来的 m 个部分分给 m 个人。此时的划分方案就是 $C_{i+m-1}^{m-1}$，那么对于所有的 i，结果就是
>
>     $$
>     \begin{aligned}
>     \sum_{i = 1}^n C_{i+m-1}^{m-1} &= C_{m}^{m-1} + C_{m+1}^{m-1} + \cdots + C_{n+m-1}^{m-1} \\
>     &= C_{m}^{1} + C_{m+1}^{2} + \cdots + C_{n+m-1}^{n} \\
>     &= (-C_{m}^{0}+C_{m}^{0})+C_{m}^{1} + C_{m+1}^{2} + \cdots + C_{n+m-1}^{n} \\
>     &= -C_{m}^{0}+(C_{m}^{0}+C_{m}^{1} + C_{m+1}^{2} + \cdots + C_{n+m-1}^{n}) \\
>     &= -1+(C_{m+1}^{1} + C_{m+1}^{2} + \cdots + C_{n+m-1}^{n}) \\
>     &= -1+(C_{m+2}^{2} + \cdots + C_{n+m-1}^{n}) \\
>     &= -1+C_{n+m}^n
>     \end{aligned}
>     $$
>
> - 利用 **乘法逆元** 计算组合数。结果已经知道了，现在如何计算上述表达式呢？由于 $n\times m$ 超过了常规递推的组合数计算方法内存空间，因此我们采用乘法逆元的思路计算。值得一提的是，本题在计算某个数关于 `1e6+3` 的乘法逆元时，不需要判断两者是否互质，因为 `1e6+3` 是一个质数，并且数据范围中的数均小于 `1e6+3`，因此两数一定互质，可以直接使用费马小定理计算乘法逆元
>
> 时间复杂度：$O(n\log 1e6)$

```cpp
#include <iostream>
using namespace std;
using ll = long long;

const int N = 7e5 + 10;
const int mod = 1e6 + 3;

int fact[N], infact[N];

int qmi(int a, int b, int p) {
    int res = 1 % p;
    while (b) {
        if (b & 1) res = (ll)res * a % p;
        a = (ll)a * a % p;
        b >>= 1;
    }
    return res;
}

void init() {
    fact[0] = 1, infact[0] = 1;
    for (int i = 1; i < N; i++) {
        fact[i] = (ll)fact[i - 1] * i % mod;
        infact[i] = (ll)infact[i - 1] * qmi(i, mod - 2, mod) % mod;
    }
}

int main() {
    init();
    
    int n, m;
    cin >> n >> m;
    
    cout << (ll)fact[n + m] * infact[n] % mod * infact[m] % mod - 1;
    
    return 0;
}
```

### 博弈论

思考如何必胜态和必败态是什么以及如何构造这样的局面。

Salyg1n and the MEX Game

<https://codeforces.com/contest/1867/problem/C>

> 标签：博弈、贪心、交互
>
> 题面：对于给定 n 个数的数列，先手可以放入一个数列中不存在的数（0-1e9），后手可以从数列中拿掉一个数，但是这个数必须严格小于刚才先手放入的数。终止条件：后手没法拿数或者操作次数达到了 2n+1 次。问：当你是先手时，如何放数可以使得最终数列的 MEX 值最大。
>
> 思路：先手每次放入的数一定是当前数列的 MEX 值，此后不管后手拿掉什么数，先手都将刚刚被拿掉的数放进去即可。那么最多操作次数就刚好是 2n+1 次，因为加入当前数列就是一个从 0 开始的连续整数数列，那么先手放入的数就是最大数 +1，即 n，那么假如后手从 n-1 开始拿，后手最多拿 n 次，先手再放 n 次，那么就是 2n+1 次。
>
> 时间复杂度：$O(n)$

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main()
{
	int T; cin >> T;
	
	while (T--)
	{
		int n; cin >> n;
		vector<int> a(n);
		
		for (int i = 0; i < n; i ++)
			cin >> a[i];
		
		int mex = n;
		for (int i = 0; i < n; i ++)
			if (a[i] != i)
			{
				mex = i;
				break;
			}
		
		cout << mex << endl;
		
		int remove;
		cin >> remove;
		
		while (remove != -1)
		{
			cout << remove << endl;
			cin >> remove;
		}
	}
	
	return 0;
} 
```
