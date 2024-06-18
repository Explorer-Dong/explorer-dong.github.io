---
title: a_template
categories: Algorithm
category_bar: true
---

## 《板子》

{% note light %}

你渴望力量吗？那就把板子~~理解~~背过吧！

{% endnote %}

## 基础算法

### 高精度

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

### 二分

寻找左边界

```c++
bool binary(int x) {
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

寻找右边界

```c++
bool binary(int x) {
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

## 数据结构

### 并查集

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

### 树状数组

```cpp
template <class T> class BinaryIndexedTree {
public:
    std::vector<T> arr;
    int n;
    
    BinaryIndexedTree(int n) : n(n) { arr.resize(n + 1, 0); }

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

## 数学

### 快速幂

基本思想就是将指数进行二进制拆分，如果指数对应的第 $i$ 个二进制位为 $1$，则答案应当乘上 $a^i$

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
