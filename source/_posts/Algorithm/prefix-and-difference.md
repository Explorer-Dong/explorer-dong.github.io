---
title: prefix-and-difference
categories: Algorithm
category_bar: true
---

### 前缀和与差分

前缀和是正向思维，差分是前缀和的逆向思维。

### 【差分/排序】充能计划

https://www.lanqiao.cn/problems/8732/learning/?contest_id=147

> 题意：给定 $n$ 个数初始化为 $0$，现在给定 $q$ 个位置，每个位置给定两个参数 $p,k$，表示从第 $k$ 个数开始连续 $s[p]$ 个数 $+1$，返回最终每一个位置的数值。+1 操作有以下两种约束：
>
> 1. 如果连续 $s[p]$ 个数越界了，则越界的部分就不 $+1$
> 2. 一个位置最多只能被一种 $p$ 对应的种类 $+1$
>
> 思路：
>
> - 现在假设只有一个种类的p，如果不考虑上述第二个条件的约束，那么就是纯差分。如果考虑了，那么我们从左到右考虑+1区间覆盖的问题，就需要判断当前位置是否被上一个+1区间覆盖过，解决办法就是**记录上一个区间覆盖的起始点or终止点**，这里选择起始点。
> - 现在我们考虑多个种类的p，那么就是分种类重复上述思路即可，因为不同种类之间是没有约束上的冲突的。那么如何分种类解决呢，我们可以对输入的q个位置的所有p、k参数进行排序，p为第一关键词，k为第二个关键词。
> - 时间复杂度：$\Theta(q\log q+q+n)$

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

const int N = 100010;

struct node {
    int p, k; // 第p种宝石丢在了第k个坑
    bool operator<(const node &t) const {
        if (p == t.p) {
            return k > t.k;
        } else {
            return p > t.p;
        }
    }
};

int n, m, q, s[N]; // n个坑，m种宝石，q个采集的宝石，s[i]表示第i种宝石的能量
vector<int> last(N, -1e6); // last[i]表示上一个第i种宝石的位置
int a[N], b[N]; // a[]为原数组，b[]为差分数组
priority_queue<node> que;

void solve() {
    cin >> n >> m >> q;
    for (int i = 1; i <= m; i++) {
        cin >> s[i];
    }

    while (q--) {
        int p, k;
        cin >> p >> k;
        que.push({p, k});
    }

    while (que.size()) {
        auto h = que.top();
        que.pop();
        int p = h.p, k = h.k; // 第p种宝石丢在了第k个坑

        int l, r;
        if (k - last[p] >= s[p]) {
            // 和上一种没有重叠
            l = k, r = min(n, k + s[p] - 1);
            b[l]++, b[r + 1]--;
            last[p] = k;
        } else {
            // 和上一种有重叠
            l = last[p] + s[p];
            r = min(n, k + s[p] - 1);
            if (l <= r) {
                b[l]++, b[r + 1]--;
            }
            last[p] = k;
        }
    }

    for (int i = 1; i <= n; i++) {
        a[i] = a[i - 1] + b[i];
        cout << a[i] << " \n"[i == n];
    }
}

signed main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
//    cin >> T;
    while (T--) solve();
    return 0;
}
```

### 【前缀和/二分答案】或值至少为 K 的最短子数组 II

https://leetcode.cn/problems/shortest-subarray-with-or-at-least-k-ii/description/

> 题意：给定一个序列，问其中所有连续的序列中，所有元素或值的结果超过 k 的序列长度最短是多少
>
> - 思路一：**枚举**。很显然我们可以枚举所有的长度、所有的序列、所有的或值进行判断
>
>     时间复杂度：$O(n^3)$
>
> - 思路二：**二分**。可以发现序列的长度越长，序列中所有元素的或值越有可能超过 k，可以二分答案。但是对于每一次二分出来的答案，检查函数都需要 $O(n^2)$ 来完成
>
>     时间复杂度：$O(n^2\log n)$
>
> - 思路三：**二分＋前缀和**。有没有什么方法可以加速检查呢？答案是有的。我们从或运算的根本出发，序列中所有元素的或值取决于每一个数的每一个二进制位。对于所有的序列中的数来说，如果第 `j` 个二进制位出现了 `1`，则无论别的数什么情况，最终这一位或出来的结果一定是 `1 << j`。于是对于 $O(n)$ 的或运算，我们就可以通过前缀和的方式简化为 $O(30)$。即我们利用二维数组存储每一个数的二进制位的结果，其中 `a[i][j]` 表示前 i 个数的第 j 个二进制位的相加的结果。后续在计算区间中元素的或值时，只需要检查区间中 30 个二进制位是否含有 1 即可。
>
>     时间复杂度：$O(30n\log n)$

```cpp
const int N = 2e5 + 10;

int a[N][35];

class Solution {
public:
    bool chk(int x, vector<int>& nums, int k) {
        int n = nums.size();

        for (int i = x; i <= n; i++) {
            int res = 0;
            for (int j = 0; j <= 30; j++) {
                if (a[i][j] - a[i - x][j]) res += 1 << j;
            }
            if (res >= k) return true;
        }

        return false;
    }

    int minimumSubarrayLength(vector<int>& nums, int k) {
        int n = nums.size();

        // 维护前缀和
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j <= 30; j++) {
                if (1 << j & nums[i - 1]) {
                    a[i][j] = a[i - 1][j] + 1;
                } else {
                    a[i][j] = a[i - 1][j];
                }
            }
        }

        // 二分答案
        int l = 1, r = n;
        while (l < r) {
            int mid = (l + r) >> 1;
            if (chk(mid, nums, k)) r = mid;
            else l = mid + 1;
        }

        // 检查结果
        for (int i = r; i <= n; i++) {
            int res = 0;
            for (int j = 0; j <= 30; j++) {
                if (a[i][j] - a[i - r][j]) {
                    res += 1 << j;
                }
            }
            if (res >= k) return r;
        }

        return -1;
    }
};
```

### 【差分/贪心】增减序列

https://www.acwing.com/problem/content/description/102/

> 标签：差分、贪心
>
> 题意：给定一个序列，每次可以对序列中的**子数组**进行同时 `+1` 或 `-1` 的操作，问最少操作多少次可以使得最终的数组所有元素都相等。并给出在最少操作次数的情况下，有多少种操作方案。
>
> 思路：区间同时操作可以联想到差分，我们定义原始数组为 `s[]`，差分数组为 `a[]`，并且下标均从 `1` 开始。那么对于「所有元素都相等」这个约束，可以发现所有元素在操作相等后差分数组 `a[2:n]` 均为 `0`。因此本题转化为对差分数组 `a[2:n]` 中的**元素**进行 `+1` 或 `-1` 操作使得最终的差分数组中 `a[2:n]` 均为 `0`。一个很显然的贪心思路就是每次在 `a[2:n]` 中选择一对符号相反的数，对其正数进行 `-1` 操作，对其负数进行 `+1` 操作。最终可能会因为无法匹配剩余某个正数或负数，我们假设其下标为 `i`，此时的序列就是 `s[1:i]` 全部相等，`s[i+1,n]` 全部相等。我们可以同时调整前缀或同时调整后缀来达到最终序列全部相等的情况。分析到这，最少操作次数和所有满足最少操作次数的方案数就呼之欲出了。
>
> 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>

using ll = long long;
using namespace std;

void solve() {
    int n;
    cin >> n;
    
    vector<int> s(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> s[i];
    }
    
    ll neg = 0, pos = 0;
    for (int i = 2; i <= n; i++) {
        ll x = s[i] - s[i - 1];
        if (x > 0) pos += x;
        else neg += x;
    }
    
    cout << max(pos, abs(neg)) << "\n" << abs(pos - abs(neg)) + 1 << "\n";
}

signed main() {
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);
    int T = 1;
//    std::cin >> T;
    while (T--) solve();
    return 0;
}
```

```python
from collections import defaultdict
from typing import List, Tuple
from itertools import combinations, permutations
import math, heapq, queue

II = lambda: int(input())
FI = lambda: float(input())
MII = lambda: tuple(map(int, input().split()))
LII = lambda: list(map(int, input().split()))


def solve() -> None:
    n = II()
    s = [0] * (n + 1)
    pos, neg = 0, 0
    for i in range(1, n + 1):
        s[i] = II()
    for i in range(2, n + 1):
        x = s[i] - s[i - 1]
        if x > 0: pos += x
        else: neg += x
    print(f"{max(pos, abs(neg))}\n{abs(pos - abs(neg)) + 1}")


if __name__ == '__main__':
    T = 1
    # T = II()
    while T: solve(); T -= 1
```