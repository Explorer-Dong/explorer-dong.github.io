---
title: a_template
categories: Algorithm
category_bar: true
---

## 板子

优雅的解法，少不了优雅的板子。目前仅编写 C++ 和 Python 语言对应的板子。前者用于备赛 Xcpc，后者用于备赛蓝桥杯。

## 基础算法

### 高精度

{% fold light @C++ %}

```cpp
class Int {
private:
    int sign;

    std::vector<int> v;

    void zip(int unzip) {
        if (unzip == 0) {
            for (int i = 0; i < (int) v.size(); i++) {
                v[i] = get_pos(i * 4) + get_pos(i * 4 + 1) * 10 + get_pos(i * 4 + 2) * 100 + get_pos(i * 4 + 3) * 1000;
            }
        } else {
            for (int i = (v.resize(v.size() * 4), (int) v.size() - 1), a; i >= 0; i--) {
                a = (i % 4 >= 2) ? v[i / 4] / 100 : v[i / 4] % 100, v[i] = (i & 1) ? a / 10 : a % 10;
            }
        }
        setsign(1, 1);
    }

    int get_pos(unsigned pos) const {
        return pos >= v.size() ? 0 : v[pos];
    }

    Int& setsign(int newsign, int rev) {
        for (int i = (int) v.size() - 1; i > 0 && v[i] == 0; i--) {
            v.erase(v.begin() + i);
        }
        if (v.size() == 0 || (v.size() == 1 && v[0] == 0)) {
            sign = 1;
        } else {
            sign = rev ? newsign * sign : newsign;
        }
        return *this;
    }

    bool absless(const Int& b) const {
        if (v.size() != b.v.size()) {
            return v.size() < b.v.size();
        }
        for (int i = (int) v.size() - 1; i >= 0; i--) {
            if (v[i] != b.v[i]) {
                return v[i] < b.v[i];
            }
        }
        return false;
    }

    void add_mul(const Int& b, int mul) {
        v.resize(std::max(v.size(), b.v.size()) + 2);
        for (int i = 0, carry = 0; i < (int) b.v.size() || carry; i++) {
            carry += v[i] + b.get_pos(i) * mul;
            v[i] = carry % 10000, carry /= 10000;
        }
    }

    std::string to_str() const {
        Int b = *this;
        std::string s;
        for (int i = (b.zip(1), 0); i < (int) b.v.size(); ++i) {
            s += char(*(b.v.rbegin() + i) + '0');
        }
        return (sign < 0 ? "-" : "") + (s.empty() ? std::string("0") : s);
    }

public:
    Int() : sign(1) {}

    Int(const std::string& s) { *this = s; }

    Int(int v) {
        char buf[21];
        sprintf(buf, "%d", v);
        *this = buf;
    }

    Int operator-() const {
        Int c = *this;
        c.sign = (v.size() > 1 || v[0]) ? -c.sign : 1;
        return c;
    }

    Int& operator=(const std::string& s) {
        if (s[0] == '-') {
            *this = s.substr(1);
        } else {
            for (int i = (v.clear(), 0); i < (int) s.size(); ++i) {
                v.push_back(*(s.rbegin() + i) - '0');
            }
            zip(0);
        }
        return setsign(s[0] == '-' ? -1 : 1, sign = 1);
    }

    bool operator<(const Int& b) const {
        if (sign != b.sign) {
            return sign < b.sign;
        } else if (sign == 1) {
            return absless(b);
        } else {
            return b.absless(*this);
        }
    }

    bool operator==(const Int& b) const {
        return v == b.v && sign == b.sign;
    }

    Int& operator+=(const Int& b) {
        if (sign != b.sign) {
            return *this = (*this) - -b;
        }
        v.resize(std::max(v.size(), b.v.size()) + 1);
        for (int i = 0, carry = 0; i < (int) b.v.size() || carry; i++) {
            carry += v[i] + b.get_pos(i);
            v[i] = carry % 10000, carry /= 10000;
        }
        return setsign(sign, 0);
    }

    Int operator+(const Int& b) const {
        Int c = *this;
        return c += b;
    }

    Int operator-(const Int& b) const {
        if (b.v.empty() || b.v.size() == 1 && b.v[0] == 0) {
            return *this;
        }
        if (sign != b.sign) {
            return (*this) + -b;
        }
        if (absless(b)) {
            return -(b - *this);
        }
        Int c;
        for (int i = 0, borrow = 0; i < (int) v.size(); i++) {
            borrow += v[i] - b.get_pos(i);
            c.v.push_back(borrow);
            c.v.back() -= 10000 * (borrow >>= 31);
        }
        return c.setsign(sign, 0);
    }

    Int operator*(const Int& b) const {
        if (b < *this) {
            return b * *this;
        }
        Int c, d = b;
        for (int i = 0; i < (int) v.size(); i++, d.v.insert(d.v.begin(), 0)) {
            c.add_mul(d, v[i]);
        }
        return c.setsign(sign * b.sign, 0);
    }

    Int operator/(const Int& b) const {
        Int c, d;
        Int e = b;
        e.sign = 1;

        d.v.resize(v.size());
        double db = 1.0 / (b.v.back() + (b.get_pos((unsigned) b.v.size() - 2) / 1e4) +
                           (b.get_pos((unsigned) b.v.size() - 3) + 1) / 1e8);
        for (int i = (int) v.size() - 1; i >= 0; i--) {
            c.v.insert(c.v.begin(), v[i]);
            int m = (int) ((c.get_pos((int) e.v.size()) * 10000 + c.get_pos((int) e.v.size() - 1)) * db);
            c = c - e * m, c.setsign(c.sign, 0), d.v[i] += m;
            while (!(c < e)) {
                c = c - e, d.v[i] += 1;
            }
        }
        return d.setsign(sign * b.sign, 0);
    }

    Int operator%(const Int& b) const { return *this - *this / b * b; }

    bool operator>(const Int& b) const { return b < *this; }

    bool operator<=(const Int& b) const { return !(b < *this); }

    bool operator>=(const Int& b) const { return !(*this < b); }

    bool operator!=(const Int& b) const { return !(*this == b); }

    friend ostream& operator<<(ostream& os, const Int& a) {
        os << a.to_str();
        return os;
    }
};

/* 使用说明
Int a, b;

// 赋值
a = 123;
a = "123";
a = std::string("123");
b = a;

// 输出
cout << a << "\n";
cout << a << a << ' ' << a;

// 运算
a = a + b;
a = a - b;
a = a * b;
a = a / b;

// 比较
bool f1 = a < b;
bool f2 = a <= b;
bool f3 = a > b;
bool f4 = a >= b;
bool f5 = a == b;
bool f6 = a != b;

// 参考
https://github.com/Baobaobear/MiniBigInteger/blob/main/bigint_tiny.h
*/
```

{% endfold %}

### 二分

闭区间寻找左边界：

{% fold light @C++ %}

```cpp
bool findLeft(int x) {
    int l = 0, r = n - 1;
    while (l < r) {
        int mid = (l + r) >> 1;
        if (check(mid)) l = mid + 1;
        // if (a[mid] < x) l = mid + 1;
        else r = mid;
    }
    return a[r] == x;
}
```

{% endfold %}

闭区间寻找右边界：

{% fold light @C++ %}

```cpp
bool findRight(int x) {
    int l = 0, r = n - 1;
    while (l < r) {
        int mid = (l + r + 1) >> 1;
        if (check(mid)) l = mid;
        // if (a[mid] <= x) l = mid;
        else r = mid - 1;
    }
    return a[r] == x;
}
```

{% endfold %}

## 哈希

使用 `std::unordered_map` 时可能会因为哈希冲突导致查询、插入操作降低到 $O(n)$，此时可以使用 `std::map` 进行替代，或者自定义一个哈希函数。

{% fold light @C++ %}

```cpp
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

{% endfold %}

## 数据结构

### 并查集

{% fold light @C++ %}

```cpp
struct DisjointSetUnion {
    int sz;
    std::vector<int> p, cnt;
    
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

{% endfold %}

{% fold light @Python %}

```python
class DSU:
    def __init__(self, n: int) -> None:
        self.n = n
        self.p = [i for i in range(n + 1)]
    
    def find(self, x: int) -> int:
        if self.p[x] != x: self.p[x] = self.find(self.p[x])
        return self.p[x]
    
    def merge(self, a: int, b: int) -> None:
        self.p[self.find(a)] = self.find(b)
    
    def same(self, a: int, b: int) -> bool:
        return self.find(a) == self.find(b)
    
    def block(self) -> int:
        return sum([1 for i in range(1, self.n + 1) if self.p[i] == i])
```

{% endfold %}

### 树状数组

{% fold light @C++ %}

```cpp
template<class T>
struct BinaryIndexedTree {
    std::vector<T> arr;
    int n;
    BinaryIndexedTree(int n) : n(n), arr(n + 1) {}
    int lowbit(int x) {
        return x & (-x);
    }
    void add(int pos, T x) {
        while (pos <= n) {
            arr[pos] += x;
            pos += lowbit(pos);
        }
    }
    T sum(int pos) {
        T ret = 0;
        while (pos) {
            ret += arr[pos];
            pos -= lowbit(pos);
        }
        return ret;
    }
};
```

{% endfold %}

{% fold light @Python %}

```python
class BinaryIndexedTree:
    def __init__(self, n: int):
        self.n = n
        self.arr = [0] * (n + 1)
    
    def lowbit(self, x: int) -> int:
        return x & (-x)
    
    def add(self, pos: int, x: int) -> None:
        while pos <= self.n:
            self.arr[pos] += x
            pos += self.lowbit(pos)
    
    def sum(self, pos: int) -> int:
        ret = 0
        while pos:
            ret += self.arr[pos]
            pos -= self.lowbit(pos)
        return ret
```

{% endfold %}

### SortedList

有序列表，改编于 `from sortedcontainers import SortedList`，共有以下内容：

- 公开方法：全部都是 $O(\log n)$ 的时间复杂度
    1. `add(value)`: 添加一个值到有序列表
    2. `discard(value)`: 删除列表中的值（如果存在）
    3. `remove(value)`: 删除列表中的值（必须存在）
    4. `pop(index=-1)`: 删除并返回指定索引处的值
    5. `bisect_left(value)`: 返回插入值的最左索引
    6. `bisect_right(value)`: 返回插入值的最右索引
    7. `count(value)`: 计算值在列表中的出现次数
- 魔法方法
    1. `__init__()`：初始化传入一个可迭代对象
    2. `__len__()`: 返回列表的长度
    3. `__getitem__(index)`: 获取指定索引处的值 - $O(\log n)$
    4. `__delitem__(index)`: 删除指定索引处的值 - $O(\log n)$
    5. `__contains__(value)`: 检查值是否在列表中 - $O(\log n)$
    6. `__iter__()`: 返回列表的迭代器
    7. `__reversed__()`: 返回列表的反向迭代器
    8. `__repr__()`: 返回列表的字符串表示形式

{% fold light @Python %}

```python
class SortedList:
    def __init__(self, iterable=[], _load=200):
        """Initialize sorted list instance."""
        values = sorted(iterable)
        self._len = _len = len(values)
        self._load = _load
        self._lists = _lists = [values[i:i + _load] for i in range(0, _len, _load)]
        self._list_lens = [len(_list) for _list in _lists]
        self._mins = [_list[0] for _list in _lists]
        self._fen_tree = []
        self._rebuild = True

    def _fen_build(self):
        """Build a fenwick tree instance."""
        self._fen_tree[:] = self._list_lens
        _fen_tree = self._fen_tree
        for i in range(len(_fen_tree)):
            if i | i + 1 < len(_fen_tree):
                _fen_tree[i | i + 1] += _fen_tree[i]
        self._rebuild = False

    def _fen_update(self, index, value):
        """Update `fen_tree[index] += value`."""
        if not self._rebuild:
            _fen_tree = self._fen_tree
            while index < len(_fen_tree):
                _fen_tree[index] += value
                index |= index + 1

    def _fen_query(self, end):
        """Return `sum(_fen_tree[:end])`."""
        if self._rebuild:
            self._fen_build()

        _fen_tree = self._fen_tree
        x = 0
        while end:
            x += _fen_tree[end - 1]
            end &= end - 1
        return x

    def _fen_findkth(self, k):
        """Return a pair of (the largest `idx` such that `sum(_fen_tree[:idx]) <= k`, `k - sum(_fen_tree[:idx])`)."""
        _list_lens = self._list_lens
        if k < _list_lens[0]:
            return 0, k
        if k >= self._len - _list_lens[-1]:
            return len(_list_lens) - 1, k + _list_lens[-1] - self._len
        if self._rebuild:
            self._fen_build()

        _fen_tree = self._fen_tree
        idx = -1
        for d in reversed(range(len(_fen_tree).bit_length())):
            right_idx = idx + (1 << d)
            if right_idx < len(_fen_tree) and k >= _fen_tree[right_idx]:
                idx = right_idx
                k -= _fen_tree[idx]
        return idx + 1, k

    def _delete(self, pos, idx):
        """Delete value at the given `(pos, idx)`."""
        _lists = self._lists
        _mins = self._mins
        _list_lens = self._list_lens

        self._len -= 1
        self._fen_update(pos, -1)
        del _lists[pos][idx]
        _list_lens[pos] -= 1

        if _list_lens[pos]:
            _mins[pos] = _lists[pos][0]
        else:
            del _lists[pos]
            del _list_lens[pos]
            del _mins[pos]
            self._rebuild = True

    def _loc_left(self, value):
        """Return an index pair that corresponds to the first position of `value` in the sorted list."""
        if not self._len:
            return 0, 0

        _lists = self._lists
        _mins = self._mins

        lo, pos = -1, len(_lists) - 1
        while lo + 1 < pos:
            mi = (lo + pos) >> 1
            if value <= _mins[mi]:
                pos = mi
            else:
                lo = mi

        if pos and value <= _lists[pos - 1][-1]:
            pos -= 1

        _list = _lists[pos]
        lo, idx = -1, len(_list)
        while lo + 1 < idx:
            mi = (lo + idx) >> 1
            if value <= _list[mi]:
                idx = mi
            else:
                lo = mi

        return pos, idx

    def _loc_right(self, value):
        """Return an index pair that corresponds to the last position of `value` in the sorted list."""
        if not self._len:
            return 0, 0

        _lists = self._lists
        _mins = self._mins

        pos, hi = 0, len(_lists)
        while pos + 1 < hi:
            mi = (pos + hi) >> 1
            if value < _mins[mi]:
                hi = mi
            else:
                pos = mi

        _list = _lists[pos]
        lo, idx = -1, len(_list)
        while lo + 1 < idx:
            mi = (lo + idx) >> 1
            if value < _list[mi]:
                idx = mi
            else:
                lo = mi

        return pos, idx

    def add(self, value):
        """Add `value` to sorted list."""
        _load = self._load
        _lists = self._lists
        _mins = self._mins
        _list_lens = self._list_lens

        self._len += 1
        if _lists:
            pos, idx = self._loc_right(value)
            self._fen_update(pos, 1)
            _list = _lists[pos]
            _list.insert(idx, value)
            _list_lens[pos] += 1
            _mins[pos] = _list[0]
            if _load + _load < len(_list):
                _lists.insert(pos + 1, _list[_load:])
                _list_lens.insert(pos + 1, len(_list) - _load)
                _mins.insert(pos + 1, _list[_load])
                _list_lens[pos] = _load
                del _list[_load:]
                self._rebuild = True
        else:
            _lists.append([value])
            _mins.append(value)
            _list_lens.append(1)
            self._rebuild = True

    def discard(self, value):
        """Remove `value` from sorted list if it is a member."""
        _lists = self._lists
        if _lists:
            pos, idx = self._loc_right(value)
            if idx and _lists[pos][idx - 1] == value:
                self._delete(pos, idx - 1)

    def remove(self, value):
        """Remove `value` from sorted list; `value` must be a member."""
        _len = self._len
        self.discard(value)
        if _len == self._len:
            raise ValueError('{0!r} not in list'.format(value))

    def pop(self, index=-1):
        """Remove and return value at `index` in sorted list."""
        pos, idx = self._fen_findkth(self._len + index if index < 0 else index)
        value = self._lists[pos][idx]
        self._delete(pos, idx)
        return value

    def bisect_left(self, value):
        """Return the first index to insert `value` in the sorted list."""
        pos, idx = self._loc_left(value)
        return self._fen_query(pos) + idx

    def bisect_right(self, value):
        """Return the last index to insert `value` in the sorted list."""
        pos, idx = self._loc_right(value)
        return self._fen_query(pos) + idx

    def count(self, value):
        """Return number of occurrences of `value` in the sorted list."""
        return self.bisect_right(value) - self.bisect_left(value)

    def __len__(self):
        """Return the size of the sorted list."""
        return self._len

    def __getitem__(self, index):
        """Lookup value at `index` in sorted list."""
        pos, idx = self._fen_findkth(self._len + index if index < 0 else index)
        return self._lists[pos][idx]

    def __delitem__(self, index):
        """Remove value at `index` from sorted list."""
        pos, idx = self._fen_findkth(self._len + index if index < 0 else index)
        self._delete(pos, idx)

    def __contains__(self, value):
        """Return true if `value` is an element of the sorted list."""
        _lists = self._lists
        if _lists:
            pos, idx = self._loc_left(value)
            return idx < len(_lists[pos]) and _lists[pos][idx] == value
        return False

    def __iter__(self):
        """Return an iterator over the sorted list."""
        return (value for _list in self._lists for value in _list)

    def __reversed__(self):
        """Return a reverse iterator over the sorted list."""
        return (value for _list in reversed(self._lists) for value in reversed(_list))

    def __repr__(self):
        """Return string representation of sorted list."""
        return 'SortedList({0})'.format(list(self))
```

> 引自：https://www.acwing.com/activity/content/code/content/8475415/
>
> 官方：https://github.com/grantjenks/python-sortedcontainers/blob/master/src/sortedcontainers/sortedlist.py

{% endfold %}

## 数学

### 模运算

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

### 质数筛

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

/* usage
PrimesCount obj(n);         // construct an object
cout << obj.pre[n] << "\n"; // pre[i] means prime numbers in range of [1, i]
*/
```

### 乘法逆元

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

### 组合数

#### 法一：利用递推式

思路：利用 $C_a^b = C_{a-1}^b + C_{a-1}^{b-1}$ 进行递推

时间复杂度：$O(x^2)$​

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

#### 法二：利用乘法逆元

思路：除法转换为乘一个逆元
$$
\begin{aligned}
(i!)^{-1} &= (i-1)!^{-1} \times i^{-1} \\
i^{-1} &= i^{mod-2}
\end{aligned}
$$
时间复杂度：$O(n\log b)$

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

## 字符串

### sstream

控制中间结果的运算精度

```cpp
#include <iostream>
#include <iomanip>
#include <sstream>

using ll = long long;
using namespace std;

// 控制中间结果的运算精度
void solve() {
    double x = 1.2345678;
    cout << x << "\n"; // 输出 1.23457

    stringstream ss;
    ss << fixed << setprecision(3) << x;
    cout << ss.str() << "\n"; // 输出 1.235
}
```

## 计算几何

浮点数默认输出 6 位，范围内的数据正常打印，最后一位四舍五入，范围外的数据未知。
