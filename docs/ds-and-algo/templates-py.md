---
title: Python代码模板
---

[TOC]

# 常用数据结构API 

## 1.列表

int 转 list

```python
num = 123
nums = list(map(int, str(num)))
```

list(int) 转 int

```python
nums = [1, 2, 3]
num = int(''.join(map(str, nums)))

def lst_int(nums):
    return int(''.join(map(str, nums)))
```

列表特性

比较大小的时候，不管长度如何，依次比较到第一个元素不相等的位置

比如[1, 2, 3] < [2, 3] 因为在比较1 < 2的时候就终止。

嵌套列表推导：展平二维数组

```python
nums = [e for row in matrix for e in row]
```

## 2.Deque

```python
from collections import deque
list1 = [0, 1, 2, 3]
q=deque(list1)
q.append(4)    # 向右侧加	
q.appendleft(-1)    #向左侧加
q.extend(可迭代元素)    #向右侧添加可迭代元素
q.extendleft(可迭代元素)    
q=q.pop()    #移除最右端并返回元素值
l=q.popleft()    #移除最左端
q.count(1)    #统计元素个数    1
```

```python
# 返回string指定范围中str首次出现的位置
string.index(str, beg=0, end=len(string))
string.index(" ")
list(map(s.index,s))	#返回字符索引数组，如"abcba"->[0,1,2,1,0]
```

## 3.字典

```python
d.pop(key)	#返回key对应的value值，并在字典中删除这个键值对
d.get(key,default_value)	#获取key对应的值，如果不存在返回default_value
d.keys() 	#键构成的可迭代对象
d.values()	#值构成的可迭代对象
d.items()	#键值对构成的可迭代对象
d = defaultdict(list)	# 指定了具有默认值空列表的字典
```

### 字典推导器

字母表对应下标

```python
dic = {chr(i) : i - ord('a') + 1 for i in range(ord('a'), ord('z') + 1)}
```

也可以使用zip初始化dic

[2606. 找到最大开销的子字符串 - 力扣（LeetCode）](https://leetcode.cn/problems/find-the-substring-with-maximum-cost/description/?utm_campaign=lcsocial&utm_medium=article&utm_source=zhihu&utm_content=643258718&utm_term=expertise)

```python
dic = dict(zip(chars, vals))	
for x in s:
	y = dic.get(x, ord(x) - ord('a') + 1)
```

## 4.map映射函数

用法:

```python
map(function, iterable, ...)
```

```python
def square(x) :            # 计算平方数
   return x ** 2

map(square, [1,2,3,4,5])   # 计算列表各个元素的平方
# [1, 4, 9, 16, 25]

map(lambda x: x ** 2, [1, 2, 3, 4, 5])  # 使用 lambda 匿名函数
# [1, 4, 9, 16, 25]

# 提供了两个列表，对相同位置的列表数据进行相加
map(lambda x, y: x + y, [1, 3, 5, 7, 9], [2, 4, 6, 8, 10])
# [3, 7, 11, 15, 19]
```

## 5. 自定义Set规则

```python
class MySet(set):
    def add(self, element):
        sorted_element = tuple(sorted(element))
        if not any(sorted_element == e for e in self):
            super().add(sorted_element)
```

```
s = MySet()
s.add((2, 1, 1))
s.add((1, 2, 1))
print(s)  # 输出：{(1, 1, 2)}
```

## 6. 基本输入输出

快读快写

```python
import sys
sys.setrecursionlimit(1000000)
input=lambda:sys.stdin.readline().strip()
write=lambda x:sys.stdout.write(str(x)+'\n')
```

读到文件结尾

```python
import sys

for line in sys.stdin:
    line = line.strip()   					
```

[3701. 非素数个数 - AcWing题库](https://www.acwing.com/problem/content/description/3704/)

```python
import sys
n = 10 ** 7
primes = []
is_prime = [1] * (n + 1)
is_prime[0] = is_prime[1] = 0
for i in range(2, n + 1):
    if is_prime[i]: primes.append(i)
    for p in primes:
        if i * p > n: break
        is_prime[i * p] = 0
        if i % p == 0: break 

a = [0] * (n + 1)
for i in range(2, n + 1):
    a[i] = a[i - 1] + (1 if not is_prime[i] else 0)

for line in sys.stdin:
    input = line.strip()    
    l, r = map(int, input.split())
    print(a[r] - a[l - 1])
```



## 7.优先队列 / 堆

```python
from heapq import heapify, heappop, heappush
    heapify(nums)
    score = heappop(nums)
    heappush(nums, val)
# 注意：
# python中堆默认且只能是小顶堆
```

```python
nums = []
heapq.heappush(nums, val)	#插入
heapq.heappop(nums)			#弹出顶部
```

## 8. 有序列表 / 有序集合

**SortedList** 

```python
from sortedcontainers import SortedList
```

SortedList 相当于 multiset

添加元素：$O(\log ~n)$；`s.add(val)`

添加一组可迭代元素：$O(k \log n)$；`s.upadte(*iterable*)`

查找元素：$O(\log n)$；`s.count(val)`，返回元素的个数

删除元素：$O(\log n)$； $s.remove(val)$

删除指定下标元素：$s.pop(index =- 1)$

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



# 字符串

## KMP / 模式匹配

**暴力匹配所有起始位置**

时间复杂度：$O(mn)$

```python
    for i in range(len_s - len_p + 1):
        ii, j = i, 0
        while j < len_p:
            if s[ii] == p[j]: ii, j = ii + 1, j + 1
            else: break
        if j == len_p: res.append(i)
```

**前缀函数 / next数组** 

时间复杂度：$O(n)$，在线算法

对于一个长度为 $n$ 的字符串，其前缀函数是一个长度为 $n$ 的数组 $\pi$，其中 $\pi(i)$ 定义：子串 $s[0] \sim s[i]$ 中存在的、相等的最长真前缀和真后缀的长度。如果不存在则为0。规定：$\pi[0]=0$，因为其不存在真前后缀。

> 例如：'aabaaab' 的 $\pi$ 数组为 [0, 1, 0, 1, 2, 2, 3]

求解前缀函数：

- 相邻的前缀函数值，至多 + 1。$\pi(i-1)$表示着前一个状态匹配的最长真前后缀，也是下一个待匹配真前缀的最右元素下标。当且仅当 $s[i]=s[\pi(i-1)]$，有$\pi(i) = \pi(i-1)+1$ 。
- 考虑 $s[i] \ne s[\pi(i-1)]$，失配时，希望找到 $s[0] \sim s[i-1]$ 中，仅次于 $\pi[i-1]$ 的第二长度 $j$，使得在位置 $i-1$ 的前后缀性质仍然保持，即  $s[0] \sim s[j-1] = s[i-j] \sim s[i-1]$。

​		实际上，第二长真后缀也完整存在于 当前真前缀 $s[0] \sim s[j-1]$ 中，即有转移方程：$j^{(n-1)}=\pi(j^n-1)$。所以如此往复，要么直到 $s[i]=s[j'] $ ，然后转移到第一种情况；要么直到 $j'=0$ 。两种情况，通过判断 $s[i] $ 是否 $s[j']$ 来确定要不要让 $j'+1$ 统一，最后 $s[i]=s[j']$。

![image.png](https://pic.leetcode.cn/1712915633-ojIXWM-image.png)

```python
def get_pi(s):
    n = len(s)
    pi = [0] * n
    for i in range(1, n):
        j = pi[i - 1] 
        while j > 0 and s[i] != s[j]:
            j = pi[j - 1]
        if s[i] == s[j]: j += 1
        pi[i] = j
    return pi
```

**KMP算法：找出 $p$ 在 $s$ 中的所有出现**

时间复杂度：$O(n+m)$，其中 $m=len(p),~n=len(s)$

构造字符串 $t=p\#s$，计算其前缀函数 $\pi$。考虑前缀函数 $\pi[m+1]\sim \pi[n+m]$，其中 $\pi(i)=m $ 的地方，一定完成对模式串 $p$ 的匹配。此时，$i$ 位于 $t $  中$s$ 的最后位置，所以原始位置为 $i-m+1-m-1 = i - 2 * m$。

```python
def kmp(p, s):
    res = []
    m, n = len(p), len(s)
    pi = get_pi(p + '#' + s)
    for i in range(m + 1, len(pi)):
        if pi[i] == m: res.append(i - 2 * m)
    return res
```



## 字符串排序

```python
sorted(str) #返回按照字典序排序后的列表，如"eda"->['a','d','e']
s_sorted=''.join(sorted(str))	#把字符串列表组合成一个完整的字符串
```



## Z函数 (扩展KMP)

对于字符串s，函数$z[i]$ 表示 $s$ 和 $s[i:]$ 的最长公共前缀$(LCP)$的长度。特别的，定义$z[0] = 0$。即 
$$
z[i] = len(LCP(s,s[i:]))
$$

> 例如， $z(abacaba) = [0, 0, 1, 0, 3, 0, 1]$

[可视化：Z Algorithm (JavaScript Demo) (utdallas.edu)](https://personal.utdallas.edu/~besp/demo/John2010/z-algorithm.htm)

```python
# s = 'aabcaabxaaaz'
n = len(s)
z = [0] * n
l = r = 0
for i in range(1, n):
    if i <= r:  # 在Z-box范围内
        z[i] = min(z[i - l], r - i + 1)
    while i + z[i] < n and s[z[i]] == s[i + z[i]]:
        l, r = i, i + z[i]
        z[i] += 1
# print(z) # [0, 1, 0, 0, 3, 1, 0, 0, 2, 2, 1, 0]
```

## 判断子序列

判断 p 在删除ss中下标元素后，是否仍然满足s 是 p 的子序列。

> ```
> 例如：
> s = "abcacb", p = "ab", removable[:2] = [3, 1]
> 解释：在移除下标 3 和 1 对应的字符后，"abcacb" 变成 "accb" 。
> "ab" 是 "accb" 的一个子序列。
> ```

```python
    ss = set(removable[:x])
    i = j = 0
    n, m = len(s), len(p)
    while i < n and j < m:
        if i not in ss and s[i] == p[j]:
            j += 1
        i += 1
     return j == m
```

## 字符串哈希

[49. 字母异位词分组 - 力扣（LeetCode）](https://leetcode.cn/problems/group-anagrams/description/)

[2430. 对字母串可执行的最大删除数 - 力扣（LeetCode）](https://leetcode.cn/problems/maximum-deletions-on-a-string/description/)

## 字符串API

- s1.startswith(s2, beg = 0, end = len(s2))

  用于检查字符串s1 是否以字符串 s2开头。是则返回True。如果指定beg 和 end，则在s1[beg: end] 范围内查找。

- 使用 ascii_lowercase遍历26个字母。

  ```python
  from string import ascii_lowercase
  cnt = {ch: 0 for ch in ascii_lowercase}
  ```

  

# 区间问题

## 区间选点问题 / 最大不相交区间数量

- **射气球问题**：给定 $n$ 个气球，用区间表示，选出最少的弓箭将所有气球都能射爆。

- **区间选点问题**：给定 $n$ 个区间，选出最少的点使得每个区间至少包含1个点。

- **最大不相交区间问题**：给定 $n$ 个区间，选出最多的区间，使得区间两两不相交（含端点）。

这几个问题是等价的，最大不相交区间问题中，将区间集合 $U$ 划分成两两不相交的最多的区间集合 $S$ 和 $U-S$ 。任意 $U-S$ 中区间一定和 $S$ 中的区间相交，它们不需要额外占用更多的选点，因此 $|S|$ 就等于最少的弓箭数量、选点数量。

对于 $mxr$ ，考察 $l, r$ 一共有三种情况：

- $mxr <l$，区间个数加一，$mxr = r$

- $l \le mxr <r$，不变
- $r \le mxr$，$mxr =r$

综上，只需要在 $l > mxr$ 时，更新$res, mxr$，否则在 $r < mxr$ 时，更新 $mxr$ 。

复杂度：$O(n)$

[452. 用最少数量的箭引爆气球 - 力扣（LeetCode）](https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/description/)

[905. 区间选点 - AcWing题库](https://www.acwing.com/problem/content/907/)

[908. 最大不相交区间数量 - AcWing题库](https://www.acwing.com/problem/content/910/)

```python
def solve(nums):
    nums.sort()
    mxr = -inf 
    res = 0
    for l, r in nums:
        if l > mxr:
            res, mxr = res + 1, r
		elif r < mxr:
            mxr = r
        # 或者mxr = min(mxr, r)
    return res 
```

## 区间分组

给定 $n$ 个区间，要求将其分成最少的组，每个组各个区间之间两两不相交（含端点）。

维护所有分组的 $mxr$，对于 $mxr_{\min}$ ，考察 $l$ 与之关系。

- $l > mxr_{\min}$，可以放在这个分组中
- $l \le mxr_{\min}$，需要开辟一个新的分组，最右端点是 $r$ 。

时间复杂度：$O(n \log n)$

[906. 区间分组 - AcWing题库](https://www.acwing.com/problem/content/908/)

```python
def solve(nums):
    nums.sort()
    hq = []
    for l, r in nums:
        if hq and l > hq[0]:
            heappop(hq)
        heappush(hq, r)
    return len(hq)
```

## 区间覆盖

给定 $n$ 个区间和 一个需要覆盖的线段区间 $[L, R]$，找出最少的区间使它们完全覆盖线段区间 $[L,R]$；如果无法完成输出 -1。

[907. 区间覆盖 - AcWing题库](https://www.acwing.com/problem/content/909/)

考察当前已经覆盖到的最远端 $mxr$ ，考察所有 $l \le mxr$，如果第一个 $l > mxr$，无法覆盖线段区间 $[mxr+1,]$记录这些区间的最远右端点 $nmxr$，然后更新 $mxr$ 。一旦超过 $R$ 表示完成覆盖。

```python
def solve(L, R, nums):
    n = len(nums)
    nums.sort()
    mxr = L
    i = res = 0
    while i < n:
        l, r = nums[i]
        if l > mxr: return -1
        nmxr = r
        while i + 1 < n and nums[i + 1][0] <= mxr:
            nmxr = max(nmxr, nums[i + 1][1])
            i += 1
        res += 1
        mxr = nmxr 
        if mxr >= R: return res 
        i += 1
    return -1    
```



## 合并区间

先排序。

```python
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort()
        res = []
        l, r = intervals[0][0], intervals[0][1]
        for interval in intervals:
            il, ir = interval[0], interval[1]
            if il > r:
                res.append([l, r])
                l = il
            r = max(r, ir)
        res.append([l, r])
        return res
```

[2580. 统计将重叠区间合并成组的方案数 - 力扣（LeetCode）](https://leetcode.cn/problems/count-ways-to-group-overlapping-ranges/description/?envType=daily-question&envId=2024-03-27)

```python
    def countWays(self, ranges: List[List[int]]) -> int:
        ranges.sort(key = lambda x: x[0])
        l, r = ranges[0][0], ranges[0][1]
        nranges = []
        for il, ir in ranges:
            if il > r:
                nranges.append([l, r])
                l = il 
            r = max(ir, r)
```

## 区间交集

[Problem - C - Codeforces](https://codeforces.com/contest/1304/problem/C)

$Lo,Hi$ 记录当前可变温度区间。每次来到新时刻，更新为 $[Lo-dt,~Hi+dt]$。判断该区间是否和当前 $[lo, hi]$ 相交。是则求其交集。

```python
def solve():
    n, m = map(int, input().split())
    tem = [(0, m, m)]
    for _ in range(n):
        at, lo, hi = map(int, input().split())
        tem.append((at, lo, hi))
    Lo = Hi = m
    for i in range(1, n + 1):
        at, lo, hi = tem[i]
        dt = at - tem[i - 1][0]
        
        Lo, Hi = Lo - dt, Hi + dt
        if Lo > hi or Hi < lo: return 'NO'
        Lo, Hi = max(Lo, lo), min(Hi, hi)
    return 'YES'
```



# 回溯 / 递归 / dfs / 分治

## 子集型回溯

**枚举子集，$O(n\cdot2^n)$**

[78. 子集 - 力扣（LeetCode）](https://leetcode.cn/problems/subsets/description/?envType=featured-list&envId=L2JxWeVS?envType=featured-list&envId=L2JxWeVS)

回溯方法1：选  / 不选

```python
    def subsets(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        res, path = [], []
        def dfs(i):
            if i == n: 
                res.append(path.copy())
                return 
            path.append(nums[i])
            dfs(i + 1)
            path.pop()
            dfs(i + 1)
        dfs(0)
        return res
```

方回溯法2：枚举选哪个数 + 记录可以选的范围

$dfs(i)$  表示当前已经有选择了 $path$ 后，$path$ 下一个元素可以从 $i$ 及其往后选。每一个 $dfs$ 状态都是合法状态，需要记录。

```python
    def subsets(self, nums: List[int]) -> List[List[int]]:
        res, path = [], []
        n = len(nums)
        def dfs(i):
            res.append(path.copy())
            for j in range(i, n):
                path.append(nums[j])
                dfs(j + 1)
                path.pop()
        dfs(0)
        return res
```

位运算写法：

```python
    def subsets(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        s = (1 << n) - 1
        res = [[]]
        sub = s
        while sub:
            res.append([nums[j] for j in range(n) if ((sub >> j) & 1)])
            sub = (sub - 1) & s
        return res
```



## 组合型回溯

**枚举所有长度为 $k$ 的组合**

[77. 组合 - 力扣（LeetCode）](https://leetcode.cn/problems/combinations/description/?envType=featured-list&envId=L2JxWeVS?envType=featured-list&envId=L2JxWeVS)

回溯方法1：选 / 不选方法

> 时间复杂度 ：$O(n \cdot2^n)$

```python
    def combine(self, n: int, k: int) -> List[List[int]]:
        nums = list(range(1, n + 1))
        res, path = [], []
        def dfs(i):
            if i == n:
                if len(path) == k: res.append(path.copy())
                return 
            # 不选
            dfs(i + 1)
            # 选
            path.append(nums[i])
            dfs(i + 1)
            path.pop()
        dfs(0)
        return res
```

回溯方法2：枚举当前选哪个数，以及记录可以选择的范围，每一个状态的合法情况需要记录。

剪枝操作 (1)：确保所有子集长度不会超过 $k$。剪枝操作 (2) ：要确保枚举当前选择的数的位置，不会使得最终整个子集长度达不到 $k$ 。通过两个剪枝操作，确保只会得到长度恰好为 $k$ 的子集。这里倒序 / 正序枚举在当前选择的数的范围影响下界 / 上界。

倒序枚举时， $dfs(i)$  表示当前选择范围为 $nums[0] \sim nums[i]$，含有 $i+1$ 个数。由于下一个状态是 $j-1$，含有$ j$ 个数，根据 $j \ge k - len(path)-1$ 计算下界。

> 时间复杂度：$O(k \cdot C(n,k))$。因为总共组合状态个数有 $C(n,k)$个，每个状态记录的长度不超过$k$ 。

```python
# 倒叙枚举
    def combine(self, n: int, k: int) -> List[List[int]]:
        nums = list(range(1, n + 1))
        res, path = [], []
        def dfs(i):
            if k == len(path):
                res.append(path.copy())
                return
            for j in range(i, k - len(path) - 2, -1):
                path.append(nums[j])
                dfs(j - 1)
                path.pop()
        dfs(n - 1)
        return res
```

位运算写法 + Gosper's Hack：

> 时间复杂度：$O(n \cdot C(n,k))$

```python
    def combine(self, n: int, k: int) -> List[List[int]]:
        nums = list(range(1, n + 1))
        s = (1 << n) - 1
        sub = (1 << k) - 1
        res = []
        def next_sub(x):
            lb = x & -x
            left = x + lb 
            right = ((left ^ x) >> 2) // lb
            return left | right 
        while sub <= s:
            res.append([nums[i] for i in range(n) if (sub >> i) & 1])
            sub = next_sub(sub)
        return res
```

**完全背包型组合**

每个元素可以无限重复选择，需要找出目标值等于 $target$ （或小于等于 $target$ ）的所有可行组合。

先排序，利于提前剪枝优化跳出循环。枚举当前选哪个 + 记录可以选择的范围型回溯，记录当前的和。由于可以重复选择，所以当前选择 $j$  以后，下一次的可以选择范围仍然是 $j$。

[39. 组合总和 - 力扣（LeetCode）](https://leetcode.cn/problems/combination-sum/description/?envType=daily-question&envId=2024-04-20)

```python
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        n, res, path = len(candidates), [], []
        # 枚举当前选哪个，以及记录可以选择的范围；以及当前的和
        def dfs(i, s):
            if s == target:
                res.append(path.copy())
                return 
            for j in range(i, n):
                x = candidates[j]
                if x + s <= target:
                    path.append(x)
                    dfs(j, s + x)	# 体现可重复选择
                    path.pop()
                else: break
        dfs(0, 0)
        return res
```



**括号生成问题：带限制组合型回溯**

[22. 括号生成 - 力扣（LeetCode）](https://leetcode.cn/problems/generate-parentheses/description/?envType=featured-list&envId=L2JxWeVS?envType=featured-list&envId=L2JxWeVS)

选 / 不选型回溯：枚举当前左 / 右括号，记录当前左括号的个数。记 $lc$ 表示左括号个数， $rc$ 表示右括号个数。

限制1：$lc$ 不能小于 $rc$。

限制2：$lc $ 不能超过 $n/2$。

限制3：当 $lc=rc$，只能回溯左括号。

```python
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        # 枚举当前左 / 右括号，记录当前左括号的个数
        n <<= 1
        path = [None] * n
        res = []
        def dfs(i, lc):
            rc = i - lc
            if rc > lc or lc > n // 2: return 
            if i == n:
                res.append(''.join(path))
                return 
            path[i] = '('
            dfs(i + 1, lc + 1)
            if rc < lc:  # 可以选右
                path[i] = ')'
                dfs(i + 1, lc)
        dfs(0, 0)
        return res
```

> 时间复杂度：由于状态个数是卡特兰数列，即 $O(C_n) \sim O(\frac{4^n}{n^{\frac{3}{2}} \cdot\sqrt \pi})$

## 排列型回溯

**全排列：排列元素无重复**

[46. 全排列 - 力扣（LeetCode）](https://leetcode.cn/problems/permutations/description/)

写法1：$dfs(i, S)$ 表示枚举到 第 $i$ 位，没有枚举过的集合为 $S$。外层 $path$ 表示当前回溯的路径。

其中 $path$ 可以使用 $path[i] = j$ 的写法，覆盖当前走到哪一步；也可以使用 $append / pop$ 写法，覆盖和恢复现场。但是不可以在外层增加哈希集合维护没有枚举过的，这是因为集合添加操作的乱序性，外层的集合无法正确恢复现场（恢复后遍历顺序不正确）。

时间复杂度：当有 $N$ 个数时，所有状态个数 $M = A_N^N+A_N^{N-1}+~\cdots~+A_N^0=\sum_{k=0}^{N}\frac{N!}{k!} =N! \cdot \sum_{k=0}^{N}\frac{1}{k!}= e\cdot N!$。（麦克劳林展开）。每个状态时间复杂度，可以将集合的复制下方到下一个状态，所以是 $O(n)$。故总复杂度：$O(N \cdot N!)$

```python
    def permute(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        path = [0] * n 
        res = []
        # 当前枚举到 位置 i，没有枚举过的集合为 S
        def dfs(i, S):
            if i == n:
                res.append(path.copy())    
                return 
            for j in S:
                path[i] = j
                dfs(i + 1, S - {j})
        dfs(0, set(nums))
        return res
```

写法2：更偏向于回溯。外层$path$ 表示当前回溯的路径，外层 $on\_path$ 维护节点是否已经出现在回溯的路径中。

```python
    def permute(self, nums: List[int]) -> List[List[int]]:
        n = len(nums)
        path = []
        on_path = [False] * n
        res = []
        # 当前枚举到 位置 i，on_path 记录是否已经出现在回溯路径path中
        def dfs(i):
            if i == n:
                res.append(path.copy())    
                return 
            for pj, on in enumerate(on_path):
                if not on:
                    on_path[pj] = True
                    path.append(nums[pj])
                    dfs(i + 1)
                    on_path[pj] = False
                    path.pop()
        dfs(0)
        return res
            
```

**全排列：排列元素有重复：只能用$on\_path$ 回溯 / 位运算压缩**

[47. 全排列 II - 力扣（LeetCode）](https://leetcode.cn/problems/permutations-ii/description/)

相同元素，在 $i$处视为一个，加一个集合维护已经出现过的数字。

```python
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
        n, res = len(nums), []
        path, on_path = [0] * n, [0] * n
        def dfs(i):
            if i == n:
                res.append(path.copy())
                return 
            S = set()       # 相同元素，在i 处视为一个
            for j, on in enumerate(on_path):
                if not on and nums[j] not in S:
                    S.add(nums[j])
                    path[i] = nums[j]
                    on_path[j] = 1
                    dfs(i + 1)
                    on_path[j] = 0
        dfs(0)
        return res
```

[996. 正方形数组的数目 - 力扣（LeetCode）](https://leetcode.cn/problems/number-of-squareful-arrays/?envType=featured-list&envId=ptud3zoQ?envType=featured-list&envId=ptud3zoQ)

相同值的排列视为同一个：在枚举 $i$ 位置放谁的时候加一个集合维护已经出现过的数字。

```python
    def numSquarefulPerms(self, nums: List[int]) -> int:
        n = len(nums)
        res = 0
        def is_sqr(x):
            return x == int(sqrt(x)) ** 2
        def dfs(i, S, pre):
            nonlocal res 
            if i == n: 
                res += 1
                return 
            # i 位置放谁
            s = set()
            for j in range(n):
                x = nums[j]
                if (S >> j) & 1 == 1 or x in s: continue 
                s.add(x)
                if pre == None or is_sqr(pre + x):
                    dfs(i + 1, S | (1 << j), x)
        dfs(0, 0, None)
        return res 
```



[2850. 将石头分散到网格图的最少移动次数 - 力扣（LeetCode）](https://leetcode.cn/problems/minimum-moves-to-spread-stones-over-grid/description/)

暴力枚举可重复全排列匹配 + 位运算压缩。用石头个数大于1 和 没有石头的位置，构造两个列表，进行全排列暴力匹配。

```python
def minimumMoves(self, grid: List[List[int]]) -> int:
        frm, to = [], []
        for i, row in enumerate(grid):
            for j, x in enumerate(grid[i]):
                if x == 0: to.append((i, j))
                elif x > 1: frm.extend((i, j) for _ in range(x - 1))
        res = inf 
        n = len(frm)
        path = [None] * n
        def dfs(i, S):
            nonlocal res
            if i == n:
                cst = sum(abs(x1 - x2) + abs(y1 - y2) for (x1, y1), (x2, y2) in zip(path, to))
                res = min(res, cst)
                return 
            for j in range(n):
                if (S >> j) & 1:
                    path[i] = frm[j]
                    dfs(i + 1, S ^ (1 << j))
        dfs(0, (1 << n ) - 1)
        return res

```



**N皇后问题**

皇后之间不同行，不同列，且不能在同一斜线。如果只满足不同行不同列，等价于每行每列恰好一个皇后。如果用 $col$ 表示皇后的位置，$col[i]$ 表示 第 $i$ 行的皇后在第$col[i]$ 列，则 "每行每列恰好一个皇后" 等价于 枚举 $col$ 的全排列。

加上斜线上不能有皇后的条件，如果从上往下枚举，则左上方向、右上方向不能有皇后。所以问题变成，当前枚举到 第 $i$ 行，可以枚举的列号的集合 $S$ 。枚举列$j \in S$ ，合法情况即在 $\forall r \in [0 ,~ i-1]$ ，其列值 $c = col[r]$ 都不满足 $i+j=r+c$ 或者 $i-j=r-c$。

![image.png](https://pic.leetcode.cn/1712744334-oWlDrA-image.png)

写法1：$ dfs(i, S)$ 枚举当前到第 $i$ 行（选第$i$ 个数），可以选择的列号的集合是 $S$ （没选择过的数字集合S）

```python
    def solveNQueens(self, n: int) -> List[List[str]]:
        res = []
        path = [0] * n
        # 当前枚举到第 i 行，可以继续枚举的列号集合是 S
        def valid(i, j):
            for r in range(i):
                c = path[r]
                if r + c == i + j or r - c == i - j:
                    return False 
            return True
        def dfs(i, S):
            if i == n:
                res.append(['.' * j + 'Q' + (n - j - 1) * '.' for j in path])
                return 
            for j in S:
                if valid(i, j):
                    path[i] = j
                    dfs(i + 1, S - {j})
        dfs(0, set(range(n)))
        return res
```

写法2：回溯全排列 + 位运算 + 集合优化$O(1)$ 判断斜线方向

由于判断 $i+j$ 和 $i - j$ 是否在之前回溯中出现过需要$O(n)$的时间，实际上只需要用集合记录出现过的 $i+j$ 和 $i - j$ 即可。对于出现过$i+j$ 和 $i-j$ 分别（防止相互干扰）放进集合 $lu$ 和$ru$ 中（由于 位运算中 $i-j$ 可能出现负值，所以存放的元素改成 $i-j+10$）。

```python
    def solveNQueens(self, n: int) -> List[List[str]]:
        res = []
        path = [0] * n
        lu = ru = 0
        # 当前枚举到第 i 行，可以继续枚举的列号集合是 S
        def dfs(i, S):
            nonlocal lu, ru
            if i == n:
                res.append(['.' * j + 'Q' + (n - j - 1) * '.' for j in path])
                return 
            for j in range(n):
                if (S >> j) & 1 and (lu >> (i + j)) & 1 == 0 and (ru >> (i - j + 10)) & 1 == 0:
                        path[i] = j
                        lu, ru = lu | (1 << (i + j)), ru | (1 << (i - j + 10))
                        dfs(i + 1, S & ~(1 << j))
                        lu, ru = lu ^ (1 << (i + j)), ru ^ (1 << (i - j + 10))
        dfs(0, (1 << n) - 1)
        return res
```

## 回溯分割字符串

记录当前切割到的位置，枚举下一个切割位置，判断切割合法性。

[LCR 086. 分割回文串 - 力扣（LeetCode）](https://leetcode.cn/problems/M99OJA/)

```python
    def partition(self, s: str) -> List[List[str]]:
        n, path, res = len(s), [], []
        # 当前分割的位置，枚举下次分割位置
        def dfs(i):
            if i == n:
                res.append(path.copy())
                return 
            for j in range(i + 1, n + 1):
                t = s[i: j]
                if t == t[::-1]:
                    path.append(t)
                    dfs(j)
                    path.pop()
        dfs(0)
        return res 
```

[93. 复原 IP 地址 - 力扣（LeetCode）](https://leetcode.cn/problems/restore-ip-addresses/description/?envType=featured-list&envId=L2JxWeVS?envType=featured-list&envId=L2JxWeVS)

增加了字符串段数限制：恰好等于4。时间复杂度：$O(n \times C(n,3))$

```python
    def restoreIpAddresses(self, s: str) -> List[str]:
        n, path, res = len(s), [], []
        # 记录当前分割位置，枚举下一个分割位置
        def dfs(i):
            if len(path) == 4:
                if i == n:
                    res.append('.'.join(path))
                return 
            for j in range(i + 1, n + 1):
                t = s[i: j]
                if t == '0' or '0' not in t[0] and int(t) <= 255:
                    path.append(t)
                    dfs(j)
                    path.pop()
        dfs(0)
        return res
```

[2698. 求一个整数的惩罚数 - 力扣（LeetCode）](https://leetcode.cn/problems/find-the-punishment-number-of-an-integer/description/?envType=featured-list&envId=L2JxWeVS?envType=featured-list&envId=L2JxWeVS)

判断一个数，其平方是否可能划分成若干字符串，其各段对应数字之和等于本身。例如 $36\times36=1296,1+29+6=36$

```python
    def check(x):
        sx = str(x * x)
        n = len(sx)
        def dfs(i, s):
            if i == n: return s == x
            t = 0
            for j in range(i + 1, n + 1):
                t = t * 10 + int(sx[j - 1])
                if t + s <= x and dfs(j, s + t):
                    return True
            return False 
        return dfs(0, 0)
```

## 分治

[395. 至少有 K 个重复字符的最长子串 - 力扣（LeetCode）](https://leetcode.cn/problems/longest-substring-with-at-least-k-repeating-characters/description/)

$f(s)$ 表示字符串s 中所有字符不少于 $k$ 个的子串中的最大长度。考察所有在当前 $s$ 串中出现次数少于 $k$ 的字符（记作分割字符），最终最大串肯定不包含之。因此，每一层递归，以找到的第一个分割字符作为隔板，将 $s$ 分成 若干个小的子串，取其中最大值即可。

时间复杂度：$O(26N)$，这是由于每一层递归必然完全删除一个小写字母，且每一层需要遍历整个字符串，时间复杂度是$O(N)$；所以总复杂度是 $O(26N)$。

```python
    def longestSubstring(self, s1: str, k: int) -> int:
        # s1中所有字符数量 >= k 个最长子串
        def f(s1):
            cnt = Counter(s1)
            for ch, c in cnt.items():
                if c < k:
                    return max(f(sub) for sub in s1.split(ch))
            return len(s1)
        return f(s1)
```



[1763. 最长的美好子字符串 - 力扣（LeetCode）](https://leetcode.cn/problems/longest-nice-substring/description/)

$f(s)$ 表示字符串 $s$ 中所有字符出现大小写的最长子串。以 $s1$ 中只出现大写 / 小写的字母作为分割点，将问题分治，返回最大长度中出现最早的字符串。时间复杂度：$O(26 \times n)$，因为每一层需要 $O(n)$ 的复杂度，每一层递归至少减少一个字符。

```python
from collections import *
from string import ascii_lowercase, ascii_uppercase 
L, U = ascii_lowercase, ascii_uppercase 
def f(s1):
    s = set(s1)
    for l, u in zip(L, U):
        if (l in s) != (u in s):
            ss = s1.split(l if l in s else u)
            res = ''
            for sub in ss:
                cur = f(sub)
                if len(cur) > len(res): res = cur 
            return res 
    return s1

class Solution:
    def longestNiceSubstring(self, s: str) -> str:
        return f(s)
```
