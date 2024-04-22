---
title: a_template
categories: Algorithm
category_bar: true
---

## 板子

{% note light %}

你渴望力量吗？那就把板子~~理解~~背过吧！

{% endnote %}

## 高精度

```cpp
class Int : public std::vector<int> {
public:
	Int(int n = 0) {
		push_back(n);
		check();
	}

	Int& check() {
		for (int i = 1; i < size(); ++i) {
			(*this)[i] += (*this)[i - 1] / 10;
			(*this)[i - 1] %= 10;
		}
		while (back() >= 10) {
			push_back(back() / 10);
			(*this)[size() - 2] %= 10;
		}
		return *this;
	}

	friend std::istream& operator>>(std::istream& in, Int& n) {
		std::string s;
		in >> s;
		n.clear();
		for (int i = s.size() - 1; i >= 0; --i) n.push_back(s[i] - '0');
		return in;
	}

	friend std::ostream& operator<<(std::ostream& out, const Int& n) {
		if (n.empty()) out << 0;
		for (int i = n.size() - 1; i >= 0; --i) out << n[i];
		return out;
	}

	friend Int& operator+=(Int& a, const Int& b) {
		if (a.size() < b.size()) a.resize(b.size());
		for (int i = 0; i != b.size(); ++i) a[i] += b[i];
		return a.check();
	}

	friend Int operator+(Int a, const Int& b) {
		return a += b;
	}
};
```

## binary

```c++
// 寻找左边界

bool binary(int x) {
    int l = 0, r = n - 1;
    while (l < r) {
        int mid = (l + r) >> 1;
        if (check(mid)) l = mid + 1;
        else r = mid;
    }
    return a[r] == x;
}
```

```c++
// 寻找右边界

bool binary(int x) {
    int l = 0, r = n - 1;
    while (l < r) {
        int mid = (l + r + 1) >> 1;
        if (check(mid)) l = mid;
        else r = mid - 1;
    }
    return a[r] == x;
}
```

## dsu

```cpp
struct dsu {
	int n;
	std::vector<int> p;
	dsu(int _n) { n = _n; p.resize(n + 1); for (int i = 1; i <= n; i++) p[i] = i; }
	int find(int x) { return (p[x] == x ? p[x] : p[x] = find(p[x])); }
	void merge(int a, int b) { p[find(a)] = find(b); }
	bool query(int a, int b) { return find(a) == find(b); }
	int block() { std::set<int> a; for (int i = 1; i <= n; i++) a.insert(find(p[i])); return a.size(); }
};
```

## qmi

> 基本思想就是将指数进行二进制拆分，如果指数对应的第 $i$ 个二进制位为 $1$，则答案应当乘上 $a^i$

```cpp
// a^b % p
ll qmi(ll a, ll b, ll p) {
    ll res = 1 % p; // 防止 p=1
    while (b) {
        if (b & 1) res = res * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return res;
}
```

## 乘法逆元

> 之所以需要知道一个数 $a$ 的乘法逆元，是为了将除法在模 $p$ 的前提下转化为乘法，从而简化运算。推导 $a$ 的乘法逆元的逻辑如下：
>
> 1. 对于任意 $a$ 的整数倍 $t$，一定有下式成立：其中的 $x$ 就是整数 $a$ 的乘法逆元，记作 $a^{-1}$
>     $$
>     \begin{aligned}
>     \frac{t}{a} \equiv t \times x\quad (\mod p) \\
>     \frac{1}{a} \equiv 1 \times x\quad (\mod p) \\
>     1 \equiv a \times x\quad (\mod p) \\
>     \end{aligned}
>     $$
>
> 2. 由[费马小定理](https://baike.baidu.com/item/%E8%B4%B9%E9%A9%AC%E5%B0%8F%E5%AE%9A%E7%90%86/4776158?fr=ge_ala)：对于两个互质的整数 $g,h$ 而言，一定有下式成立：
>     $$
>     g^{h-1} \equiv 1\quad (\mod h)
>     $$
>
> 3. 于是本题的推导就可以得到，当 $a$ 与 $p$ 互质时，有：
>     $$
>     a^{p-1} \equiv 1 \quad (\mod p)
>     $$
>
> 4. 于是 $a$ 的乘法逆元 $x$ 就是：
>     $$
>     x = a^{-1} = a^{p-2}
>     $$
>
> 那么本道题就迎刃而解了。需要注意的是，上述乘法逆元的计算前提，即两个整数互质，由于其中一个数 $p$ 一定是一个质数。因此判断 $a$ 与 $p$ 是否互质只需要判断 $a$ 是否是 $p$ 的倍数即可。
>
> 时间复杂度：$n \log x$

```cpp
#include <iostream>
using namespace std;
using ll = long long;

ll qmi(ll a, ll b, ll p) {
    ll res = 1 % p;
    while (b) {
        if (b & 1) res = res * a % p;
        a = a * a % p;
        b >>= 1;
    }
    return res;
}

int main() {
    int n;
    cin >> n;
    while (n--) {
        ll a, p;
        cin >> a >> p;
        if (a % p == 0) cout << "impossible\n";
        else cout << qmi(a, p - 2, p) << "\n";
    }
    return 0;
}
```

## comb

### 组合数一：递推

> 思路：利用 $C_a^b = C_{a-1}^b + C_{a-1}^{b-1}$ 进行递推
>
> 时间复杂度：$O(x^2)$​

```cpp
#include <iostream>
using namespace std;

const int N = 2010;
const int MOD = 1e9 + 7;

int f[N][N];

void init() {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j <= i; j++) {
            if (!j) f[i][j] = 1;
            else f[i][j] = (f[i - 1][j] + f[i - 1][j - 1]) % MOD;
        }
    }
}

int main() {
    init();
    
    int q;
    cin >> q;
    while (q--) {
        int a, b;
        cin >> a >> b;
        cout << f[a][b] << "\n";
    }
    
    return 0;
}
```

### 组合数二：乘法逆元

> 思路：除法转换为乘一个逆元
> $$
> \begin{aligned}
> (i!)^{-1} &= (i-1)!^{-1} \times i^{-1} \\
> i^{-1} &= i^{mod-2}
> \end{aligned}
> $$
> 时间复杂度：$O(n\log b)$

```cpp
#include <iostream>
#include <cstring>
#include <algorithm>
using namespace std;
using ll = long long;

const int N = 100010;
const int mod = 1e9 + 7;

int fact[N];    // fact[i]   表示 i! % mod
int infact[N];  // infact[i] 表示 (i!)^{-1}

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
		// i! = (i-1)! * i
		fact[i] = (ll)fact[i - 1] * i % mod;
		
		// (i!)^{-1} = (i-1)!^{-1} * i^{-1}
		// i^{-1} = i^{mod-2}
		infact[i] = (ll)infact[i - 1] * qmi(i, mod - 2, mod) % mod;
	}
}

int main() {
	init();
	
	int n;
	cin >> n;
	while (n--) {
		int a, b;
		cin >> a >> b;
		cout << (ll)fact[a] * infact[b] % mod * infact[a - b] % mod << "\n";
	}
	
	return 0;
}
```
