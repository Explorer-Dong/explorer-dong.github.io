---
title: 代码模板
---

!!! tip
    本文记录算法竞赛的代码模板，编程语言采用 C++ 11+ 和 Python 3.11+，全部使用 built-in 模块。产生原因在于：某些场合可以快速抄板子而不用大脑记忆，因此不会涉及到任何原理部分，如果有原理解读的需求，可以跳转到 [理论剖析](./theory/index.md) 部分阅读。

## 基础算法

### 闭区间二分

```c++
// 闭区间寻找左边界
void bisect_left(int target) {
    int l = 左边界, r = 右边界;
    while (l < r) {
        int mid = (l + r) >> 1;
        if (落在了 target 的左边) {
            l = mid + 1;
        } else (落在了 target 上或右边) {
            r = mid;
        }
    }
}

// 闭区间寻找右边界
void bisect_right(int target) {
    int l = 左边界, r = 右边界;
    while (l < r) {
        int mid = (l + r + 1) >> 1;
        if (落在了 target 的右边) {
            r = mid - 1;
        } else (落在了 target 上或左边) {
            l = mid;
        }
    }
}
```

## 数据结构

### 单调队列

=== "C++"

    ```c++
    #include <deque>
    #include <functional>
    
    template<class T>
    struct MonotonicQueue {
        std::deque<T> q;
        std::function<bool(T, T)> compare;
        MonotonicQueue(bool is_min_queue) {
            if (is_min_queue) {
                compare = [](T a, T b) { return a < b; };
            } else {
                compare = [](T a, T b) { return a > b; };
            }
        }
        void pushBack(T x) {
            while (q.size() && compare(x, q.back())) {
                q.pop_back();
            }
            q.push_back(x);
        }
        void popFront(T x) {
            if (q.size() && q.front() == x) {
                q.pop_front();
            }
        }
        T getExtremeValue() {
            return q.front();
        }
    };
    ```

=== "Python"

    ```python
    from collections import deque
    
    class MonotonicQueue:
        def __init__(self, is_min_queue: bool):
            self.q = deque()
            if is_min_queue:
                self.compare = lambda a, b: a < b
            else:
                self.compare = lambda a, b: a > b
    
        def push_back(self, x):
            while self.q and self.compare(x, self.q[-1]):
                self.q.pop()
            self.q.append(x)
    
        def pop_front(self, x):
            if self.q and self.q[0] == x:
                self.q.popleft()
    
        def get_extreme_value(self):
            return self.q[0]
    ```

### 哈希表

在 C++ 中，使用哈希表 `std::unordered_map` 时可能会因为哈希冲突导致查询、插入操作降低到 $O(n)$，此时可以使用平衡树 `std::map` 进行替代，或者自定义一个哈希函数。

```c++
// C++ 自定义哈希函数 使用示例

template <class T>
struct CustomHash {
    size_t operator()(T x) const {
        static const size_t _prime = 0x9e3779b97f4a7c15;
        size_t _hash_value = std::hash<T>()(x);
        return _hash_value ^ (_hash_value >> 30) ^ _prime;
    }
};

// 示例
std::unordered_map<int, int, CustomHash<int>> f1;
std::unordered_map<long long, int, CustomHash<long long>> f2;
std::unordered_map<std::string, int, CustomHash<long long>> f3;
```

### 并查集

=== "C++"

    ```c++
    class DisjointSetUnion {
        /* 并查集类
        集合元素定义为从 0 开始的整数。
        */
    
        int sz;                // 集合个数
        std::vector<int> p;    // p[i]表示第i个结点的祖宗编号
        std::vector<int> cnt;  // cnt[i]表示第i个结点所在集合中的结点总数
    
    public:
        DisjointSetUnion(int n) : p(n), cnt(n, 1) {
            for (int i = 0; i < n; i++) {
                p[i] = i;
            }
            sz = n;
        }
    
        int find(int x) {
            if (p[x] != x) {
                p[x] = find(p[x]);
            }
            return p[x];
        }
    
        void merge(int a, int b) {
            int pa = find(a), pb = find(b);
            if (pa != pb) {
                p[pa] = pb;
                cnt[pb] += cnt[pa];
                sz--;
            }
        }
    
        bool same(int a, int b) {
            return find(a) == find(b);
        }
    
        int size() {
            return sz;
        }
    
        int size(int a) {
            int pa = find(a);
            return cnt[pa];
        }
    };
    ```

=== "Python"

    ```python
    class DSU:
        def __init__(self, n: int) -> None:
            self.n = n
            self.sz = n                       # 集合个数
            self.p = [i for i in range(n)]    # p[i]表示第i个结点的祖宗编号
            self.cnt = [1 for i in range(n)]  # cnt[i]表示第i个结点所在集合中的结点总数
    
        def find(self, x: int) -> int:
            if self.p[x] != x:
                self.p[x] = self.find(self.p[x])
            return self.p[x]
    
        def merge(self, a: int, b: int) -> None:
            pa, pb = self.find(a), self.find(b)
            if pa != pb:
                self.p[pa] = pb
                self.cnt[pb] += self.cnt[pa]
                self.sz -= 1
    
        def same(self, a: int, b: int) -> bool:
            return self.find(a) == self.find(b)
    
        def size(self) -> int:
            return self.sz
    
        def size(self, a: int) -> int:
            return self.cnt[a]
    ```

### 树状数组

=== "C++"

    ```cpp
    template<class T>
    class BinaryIndexedTree {
    private:
        int n;
        std::vector<T> arr;
    
        int lowbit(int x) {
            return x & (-x);
        }
    
    public:
        // 初始化序列 O(n)。下标从 1 开始，初始化维护序列区间为 [1,n]
        BinaryIndexedTree(int n) : n(n), arr(n + 1) {}
    
        // 单点修改 O(log n)。在 pos 这个位置加上 x
        void update(int pos, T x) {
            while (pos <= n) {
                arr[pos] += x;
                pos += lowbit(pos);
            }
        }
    
        // 区间求和 O(log n)。返回 [1,pos] 的区间和
        T query_sum(int pos) {
            T ret = 0;
            while (pos) {
                ret += arr[pos];
                pos -= lowbit(pos);
            }
            return ret;
        }
    };
    ```
=== "Python"

    ```python
    class BinaryIndexedTree:
        def __init__(self, n: int):
            """ 初始化序列 O(n)。下标从 1 开始，初始化维护序列区间为 [1,n] """
            self.n = n
            self.arr = [0] * (n + 1)
    
        def update(self, pos: int, x: int) -> None:
            """ 单点修改 O(log n)。在 pos 这个位置加上 x """
            while pos <= self.n:
                self.arr[pos] += x
                pos += self._lowbit(pos)
    
        def query_sum(self, pos: int) -> int:
            """ 区间求和 O(log n)。返回 [1,pos] 的区间和 """
            ret = 0
            while pos:
                ret += self.arr[pos]
                pos -= self._lowbit(pos)
            return ret
    
        def _lowbit(self, x: int) -> int:
            return x & (-x)
    ```

### 平衡树

C++ 中叫做 `std::map`，Python 中叫做 `from sortedcontainers import SortedList`。

## 动态规划

## 字符串

## 计算几何

关于控制浮点数的输出精度（均会四舍五入）：

=== "C"

    ```c
    #include <stdio.h>
    #include <stdlib.h>
    
    int main() {
        double x = 3.1415926535;
        printf("%.4f\n", x);
    
        return 0;
    }
    
    /* 输出
    3.1416
    */
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <iomanip>
    
    int main() {
        double x = 3.1415926535;
        std::cout << std::fixed << std::setprecision(4) << x << "\n";
    
        return 0;
    }
    
    /* 输出
    3.1416
    */
    ```

=== "Python"

    ```python
    x = 3.1415926535
    
    print(f"{x:.4f}")
    
    """ 输出
    3.1416
    """
    ```

## 图论

## 博弈论

## 数学

### 模运算

```c++
template<class T>
T modPower(T a, T b, T p) {
    // return: a^b % p
    T res = 1 % p;
    for (; b; b >>= 1, a = (a * a) % p) {
        if (b & 1) {
            res = (res * a) % p;
        }
    }
    return res;
}

template<class T>
T modAdd(T a, T b, T p) {
    // return: a+b % p
    return ((a % p) + (b % p)) % p;
}

template<class T>
T modMul(T a, T b, T p) {
    // 防爆乘法
    // return: a*b % p
    T res = 0;
    for (; b; b >>= 1, a = modAdd(a, a, p)) {
        if (b & 1) {
            res = modAdd(res, a, p);
        }
    }
    return res;
}

template<class T>
T modSumOfEqualRatioArray(T q, T k, T p) {
    // O(log k) 求等比数列之和
    // return: (q^0 + q^1 + ... + q^k) % p
    if (k == 0) {
        return 1;
    }
    if (k % 2 == 0) {
        return modAdd<T>(
            static_cast<T>(1),
            modMul(q, modSumOfEqualRatioArray(q, k - 1, p), p),
            p
        );
    }
    return modMul(
        static_cast<T>(1) + modPower(q, k / 2 + static_cast<T>(1), p),
        modSumOfEqualRatioArray(q, k / 2, p),
        p
    );
}
```

### 质数筛

欧拉筛法，求解 $[1,n]$ 范围内的所有质数。时间复杂度 $O(n)$。

=== "C++"

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
    
    /* 用法
    std::vector<int> primes = eular_prime_filter(N);
    for (int p: primes) {}
    */
    ```

=== "Python"

    ```python
    def eular_prime_filter(n: int) -> List[int]:
        primes = []
        vis = [False] * (n + 1)
        for i in range(2, n + 1):
            if not vis[i]:
                primes.append(i)
                vis[i] = True
            for p in primes:
                if p * i > n:
                    break
                vis[p * i] = True
                if i % p == 0:
                    break
        return primes
    
    """ 用法
    primes = eular_prime_filter(n)
    for p in primes:
        pass
    """
    ```

### 快速幂

计算 $a^b \bmod p$。时间复杂度 $O(\log b)$。

=== "C++"

    ```c++
    int qmi(int a, int b, int p) {
        int res = 1 % p;  // 防止 p=1
        while (b) {
            if (b & 1) res = res * a % p;
            a = 1ll * a * a % p;
            b >>= 1;
        }
        return res;
    }
    
    /* 用法
    std::cout << qmi(5, 10, 94315731) << "\n";
    */
    ```

=== "Python"

    ```python
    pow(a, b, p)
    
    """ 用法
    print(pow(5, 10, 94315731))
    """
    ```

### 乘法逆元

$a$ 的乘法逆元 $a^{-1} = a^{p-2}$ 当且仅当 $a$ 与 $p$ 互质。在借助快速幂求解乘法逆元的情况下，时间复杂度为 $O(\log p)$。

### 组合数

$$
C_n^k = C(n, k) = \binom{n}{k} = \frac{n!}{k!(n-k)!}
$$

**1）Python 库函数**。在 Python3.8 及以上的版本中，可以直接使用 `math.comb(n, k)` 计算 $C_n^k$ 的值，时间复杂度 $O(\min(k,n-k))$。

```python
import math

n, k = 5, 3
print(math.comb(n, k))

""" 输出
10
"""
```

**2）递推法**。利用 $C_n^k = C_{n-1}^k + C_{n-1}^{k-1}$ 进行递推求解。$O(nk)$ 预处理出所有的组合数，$O(q)$ 查询。

题意：求解 $q$ 次 $C_{n}^k\ \%\ p$ 的结果，其中 $q\le 10^4,1\le k \le n \le 2\times 10^3$，$p$ 为常数 $10^9+7$。

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

    // O(q) 查询
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

**3）乘法逆元法**。如果题目中有模质数运算，就可以将组合数公式中的「除法运算」转换为「关于逆元的乘法运算」进行求解。$O(n\log p)$ 预处理出所有的「阶乘」和「乘法逆元」，$O(q)$ 查询。

题意：求解 $q$ 次 $C_{n}^k\ \%\ p$ 的结果，其中 $q\le 10^4,1\le k \le n \le 10^5$，$p$ 为常数 $10^9+7$。

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

    // O(q) 查询
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

## 其他

C++ 快读快写：

```c++
#include <iostream>

int main() {
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr), std::cout.tie(nullptr);
}
```
