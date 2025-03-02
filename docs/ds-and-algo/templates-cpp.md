---
title: 代码模板 (C++)
---

[TOC]

## 前言

本文记录 C++ 语言的代码模板，可编译通过的最低 C++ 标准为 C++11。

## 基础算法

### 闭区间二分的边界问题

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

## 基础数据结构

### 哈希

在 C++ 中，使用哈希表 `std::unordered_map` 时可能会因为哈希冲突导致查询、插入操作降低到 $O(n)$，此时可以使用平衡树 `std::map` 进行替代，或者自定义一个哈希函数。

在 Python3 中同理。但是 Python 不允许自定义哈希函数，此时可以尝试桶哈希。

=== "C++"

    ```c++
    // C++ 自定义哈希函数 使用示例
    
    template<class T>
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

## 进阶算法

### 数学

#### 模运算

=== "C++"

    ```cpp
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
        // return: (q^0 + q^1 + ... + q^k) % p
        if (k == 0) {
            return 1;
        }
        if (k % 2 == 0) {
            return modAdd<T>((T) 1, modMul(q, modSumOfEqualRatioArray(q, k - 1, p), p), p);
        }
        return modMul(((T) 1 + modPower(q, k / 2 + (T) 1, p)), modSumOfEqualRatioArray(q, k / 2, p), p);
    }
    ```

#### 质数筛

=== "C++"

    ```cpp
    struct PrimesCount {
        int n;
        vector<int> pre, vis;
        PrimesCount(int n) : n(n), pre(n + 1), vis(n + 1) {
            eulerFilter();
        }
        void eulerFilter() {
            // O(n)
            vector<int> primes;
            for (int i = 2; i <= n; i++) {
                if (!vis[i]) {
                    primes.push_back(i);
                    pre[i] = pre[i - 1] + 1;
                } else {
                    pre[i] = pre[i - 1];
                }
                for (int j = 0; primes[j] <= n / i; j++) {
                    vis[primes[j] * i] = true;
                    if (i % primes[j] == 0) {
                        break;
                    }
                }
            }
        }
        void eratosthenesFilter() {
            // O(nloglogn)
            for (int i = 2; i <= n; i++) {
                if (!vis[i]) {
                    pre[i] = pre[i - 1] + 1;
                    for (int j = i; j <= n; j += i) {
                        vis[j] = true;
                    }
                } else {
                    pre[i] = pre[i - 1];
                }
            }
        }
        void simpleFilter() {
            // O(nlogn)
            for (int i = 2; i <= n; i++) {
                if (!vis[i]) {
                    pre[i] = pre[i - 1] + 1;
                } else {
                    pre[i] = pre[i - 1];
                }
                for (int j = i; j <= n; j += i) {
                    vis[j] = true;
                }
            }
        }
    };
    
    /* 使用示例
    PrimesCount obj(n);         // construct an object
    cout << obj.pre[n] << "\n"; // pre[i] means prime numbers in range of [1, i]
    */
    ```

#### 乘法逆元

假设当前需要在 $\% \ p$ 的情况下除以 $a$，则可以转化为乘以 $a$ 的乘法逆元 $a^{-1}$，即：

$$
\begin{aligned}
&\frac{\text{num}}{a} \equiv \text{num} \times a^{-1} (\text{mod } p)\\
&\text{其中 } a^{-1} = a^{p-2} \text{ 当且仅当 $a$ 与 $p$ 互质}
\end{aligned}
$$

??? "乘法逆元推导"

    对于任意 $a$ 的整数倍 $t$，一定有下式成立：其中的 $x$ 就是整数 $a$ 的乘法逆元，记作 $a^{-1}$
    
    $$
    \begin{aligned}
    \frac{t}{a} \equiv t \times x\quad (\mod p) \\
    \frac{1}{a} \equiv 1 \times x\quad (\mod p) \\
    1 \equiv a \times x\quad (\mod p) \\
    \end{aligned}
    $$
    
    由 [费马小定理](<https://baike.baidu.com/item/费马小定理/4776158>)：对于两个互质的整数 $g,h$ 而言，一定有下式成立：
    
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
    
    时间复杂度 $O(\log p)$。

#### 组合数

$$
C_n^k = C(n, k) = \binom{n}{k} = \frac{n!}{k!(n-k)!}
$$

1）Python 库函数求解

如果使用 Python3.8 及以上的版本，则可以直接使用 `math.comb(n, k)` [^1] 来计算组合数 $C_n^k$。时间复杂度为 $O(\min(k,n-k))$。

[^1]: <https://docs.python.org/3/library/math.html#math.comb>

2）递推法求解

利用 $C_n^k = C_{n-1}^k + C_{n-1}^{k-1}$ 进行递推求解。

例题：[求组合数 I - AcWing](https://www.acwing.com/problem/content/887)。求解 $q$ 次 $C_{n}^k\ \%\ p$ 的结果，其中 $q\le 10^4,1\le k \le n \le 2\times 10^3$，$p$ 为常数 $10^9+7$。

解答：$O(nk)$ 预处理出所有的组合数，$O(q)$ 查询 $q$ 次组合数。代码如下：

=== "C++"

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

3）乘法逆元法求解

如果题目中有取模运算，就可以将组合数公式中的「除法运算」转换为「关于逆元的乘法运算」进行求解。

例题：[求组合数 II - AcWing](https://www.acwing.com/problem/content/888/)。求解 $q$ 次 $C_{n}^k\ \%\ p$ 的结果，其中 $q\le 10^4,1\le k \le n \le 10^5$，$p$ 为常数 $10^9+7$。此题中需要对组合数 $C_n^k$ 的计算结果模上常数 $p$，由于此题的模数 $p$ 与 $n,k$ 一定互质，因此才可以采用将除法转换为乘法逆元的预处理做法来求解。如果仍然采用上述递推法将会超时。

解答：$O(n\log p)$ 预处理出所有的阶乘和乘法逆元，$O(q)$ 查询 $q$。代码如下：

=== "C++"

    ```cpp
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

### 字符串

控制中间结果的运算精度。

=== "C++"

    ```cpp
    #include <iostream>
    #include <iomanip>
    #include <sstream>
    
    using ll = long long;
    using namespace std;
    
    void solve() {
        double x = 1.2345678;
        cout << x << "\n"; // 输出 1.23457
    
        stringstream ss;
        ss << fixed << setprecision(3) << x;
        cout << ss.str() << "\n"; // 输出 1.235
    }
    ```

### 计算几何

浮点数默认输出 6 位，范围内的数据正常打印，最后一位四舍五入，范围外的数据未知。


## 进阶数据结构

### 并查集

并查集虽然一般用来解决集合问题，但数据结构实现上本质是一个由多棵有向根树组成的森林。在采用了路径压缩和按秩合并后，每一次查询与插入的时间复杂度都会均摊为一个常数。

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

利用更多的区间维护一个序列的信息，所有维护信息的区间组成的形状形如一棵树，故称为树状数组。

下方代码模板目前支持的操作有：

- 区间查询：查询序列 `[1, pos]` 索引的元素之和。时间复杂度 $O(\log n)$；
- 单点修改：修改序列 `pos` 索引的元素值。时间复杂度 $O(\log n)$。

更多内容见：[树状数组 - OI Wiki](https://o-iwiki.org/ds/fenwick/)

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
        BinaryIndexedTree(int n) : n(n), arr(n + 1) {}
    
        void update(int pos, T x) {
            while (pos <= n) {
                arr[pos] += x;
                pos += lowbit(pos);
            }
        }
    
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
            """
            初始化序列 O(n)。下标从 1 开始，初始化维护序列区间为 [1,n]。
            """
            self.n = n
            self.arr = [0] * (n + 1)
    
        def update(self, pos: int, x: int) -> None:
            """
            单点修改 O(log n)。在 pos 这个位置加上 x。
            """
            while pos <= self.n:
                self.arr[pos] += x
                pos += self._lowbit(pos)
    
        def query_sum(self, pos: int) -> int:
            """
            区间求和 O(log n)。返回 [1,pos] 的区间和。
            """
            ret = 0
            while pos:
                ret += self.arr[pos]
                pos -= self._lowbit(pos)
            return ret
    
        def _lowbit(self, x: int) -> int:
            return x & (-x)
    ```

### 平衡树

C++ 中叫做 `std::map`，Python 中叫做 `SortedList`。

> 例程：[切蛋糕 - AcWing](https://www.acwing.com/activity/content/code/content/8475415/)
>
> 官方：[sortedlist.py - grantjenks/python-sortedcontainers](https://github.com/grantjenks/python-sortedcontainers/blob/master/src/sortedcontainers/sortedlist.py)

有序列表类。导入方法 `from sortedcontainers import SortedList`。可以类比 C++ 中的 `map` 类。共有以下内容，全部都是 $O(\log n)$ 的时间复杂度：

1. `add(value)`: 添加一个值到有序列表
2. `discard(value)`: 删除列表中的值（如果存在）
3. `remove(value)`: 删除列表中的值（必须存在）
4. `pop(index=-1)`: 删除并返回指定索引处的值
5. `bisect_left(value)`: 返回插入值的最左索引
6. `bisect_right(value)`: 返回插入值的最右索引
7. `count(value)`: 计算值在列表中的出现次数
