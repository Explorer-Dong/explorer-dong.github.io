---
title: dp
categories: Algorithm
category_bar: true
---

### 动态规划

动态规划分为被动转移和主动转移，而其根本在于状态表示和状态转移。如何**完整表示**所有状态？如何**不重不漏**划分子集从而进行状态转移？

![被动转移 vs 主动转移](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202408291538900.png)

### 【递推】反转字符串

https://www.acwing.com/problem/content/5574/

> 题意：给定 n 个字符串，每一个字符串对应一个代价 $w_i$，现在需要对这 n 个字符串进行可能的翻转操作使得最终的 n 个字符串呈现字典序上升的状态，给出最小翻转代价。
>
> 思路：很显然每一个字符串都有两种状态，我们可以进行二叉搜索或者二进制枚举。那么我们可以进行 dp 吗？答案是可以的。我们可以发现，对于第 i 个字符串，是否需要翻转仅仅取决于第 i-1 个字符串的大小，无后效性，可以进行递推。我们定义状态数组 `f[i][j]` 进行状态标识。其中
>
> - `f[i][0]` 表示第 i 个字符串不需要翻转时的最小代价
> - `f[i][1]` 表示第 i 个字符串需要翻转时的最小代价
>
> 状态转移就是当前一个字符串比当前字符串的字典序小时进行转移，即当前最小代价是前一个状态的最小代价加上当前翻转状态的代价。至于什么时候可以进行状态转移，一共有 4 种情况，即：
>
> - `s[i-1]` 不翻转，`s[i]` 不翻转。此时 `f[i][0] = min(f[i][0], f[i-1][0])`
> - `s[i-1]` 翻转，`s[i]` 不翻转。此时 `f[i][0] = min(f[i][0], f[i-1][1])`
> - `s[i-1]` 不翻转，`s[i]` 翻转。此时 `f[i][1] = min(f[i][1], f[i-1][0] + w[i])`
> - `s[i-1]` 翻转，`s[i]` 翻转。此时 `f[i][1] = min(f[i][1], f[i-1][1] + w[i])`
>
> 最终答案就在 `f[n][0]` 和 `f[n][1]` 中取 `min` 即可
>
> 时间复杂度：$O(n)$

```cpp
#include <iostream>
#include <cstring>
#include <algorithm>
using namespace std;
using ll = long long;

const int N = 100010;

int n, w[N];
string s[N][2];  // s[i][0] 表示原始字符串，s[i][1] 表示反转后的字符串
ll f[N][2];      // f[i][j] 表示第i个字符串在翻转状态为j的情况下的最小代价

ll dp() {
    f[1][0] = 0, f[1][1] = w[1];
    for (int i = 2; i <= n; i++) {
        if (s[i - 1][0] <= s[i][0]) f[i][0] = min(f[i][0], f[i - 1][0]);
        if (s[i - 1][1] <= s[i][0]) f[i][0] = min(f[i][0], f[i - 1][1]);
        if (s[i - 1][0] <= s[i][1]) f[i][1] = min(f[i][1], f[i - 1][0] + w[i]);
        if (s[i - 1][1] <= s[i][1]) f[i][1] = min(f[i][1], f[i - 1][1] + w[i]);
    }
    return min(f[n][0], f[n][1]);
}

int main() {
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> w[i];
    for (int i = 1; i <= n; i++) {
        cin >> s[i][0];
        s[i][1] = s[i][0];
        reverse(s[i][1].begin(), s[i][1].end());
    }
    memset(f, 0x3f, sizeof f);
    
    ll res = dp();
    if (res == 0x3f3f3f3f3f3f3f3fll) res = -1;
    cout << res << "\n";
    
    return 0;
}
```

### 【递推】最大化子数组的总成本

https://leetcode.cn/problems/maximize-total-cost-of-alternating-subarrays/

> 题意：给定长度为 n 的序列，现在需要将其分割为子数组，并定义每一个子数组的价值为「奇数位置为原数值，偶数位置为相反数」，返回最大分割价值
>
> 思路：~~一开始还在想着如何贪心，即仅考虑连续的负数区间，但是显然的贪不出全局最优解。~~于是转而考虑暴力 dp。思路和朴素 01 背包有相似之处。
>
> - 状态定义。首先我们一定需要按照元素进行枚举，因此第一维度我们就定义为序列长度，但是仅仅这样定义就能表示全部的状态了吗？显然不行。根据题目的奇偶价值约束，我们在判定每一个**负数**是否可以「取相反数」价值时，是取决于上一个负数是否取了相反数价值。为了统一化，我们将正负数一起考虑前一个数是否取了相反价值的情况，因此我们需要再增加「前一个数是否取了相反价值」的状态表示，而这仅仅是一个二值逻辑，直接开两个空间即可。于是状态定义呼之欲出：
>
>     - `f[i][0]` 表示第 `i` 个数取**原始价值**的情况下，序列 `[0, i-1]` 的最大价值
>     - `f[i][1]` 表示第 `i` 个数取**相反价值**的情况下，序列 `[0, i-1]` 的最大价值
>
> - 状态转移。显然对于上述状态定义，仅仅需要对「连续负数区间」进行考虑，因此对于 `nums[i] >= 0` 的情况是没有选择约束的，原始价值和相反价值都是可行的方案那么为了最大化最终收益显然选择原始正价值，并且可以从上一个情况的任意状态转移过来那么同样为了最大化最终受益显然选择最大的基状态，于是可得：
>
>     - `f[i][0] = max(f[i-1][0], f[i-1][1]) + nums[i]`
>     - `f[i][1] = max(f[i-1][0], f[i-1][1]) - nums[i]`
>
>     而对于 `nunms[i] < 0` 的情况，能否选择相反数取决于前一个数的正负性。当前一个数 `nums[i-1] >= 0` 时，显然当前负数原始价值和相反价值都可以取到；当前一个数 `nums[i-1] < 0` 时，则当前负数仅有在前一个负数取原始价值的情况下才能取相反价值，于是可得：
>
>     `if nums[i-1] >= 0`
>
>     - `f[i][0] = max(f[i-1][0], f[i-1][1]) + nums[i]`
>     - `f[i][1] = max(f[i-1][0], f[i-1][1] - nums[i])`
>
>     `if nums[i-1] < 0`
>
>     - `f[i][0] = max(f[i-1][0], f[i-1][1] + nums[i])`
>     - `f[i][1] = f[i-1][0] - nums[i]`
>
> - 答案表示。`max(f[n-1][0], f[n-1][1])`
>
> 时间复杂度：$O(n)$

```cpp []
class Solution {
public:
    long long maximumTotalCost(vector<int>& nums) {
        using ll = long long;

        int n =  nums.size();

        vector<vector<ll>> f(n, vector<ll>(2, 0));
        f[0][0] = f[0][1] = nums[0];
        for (int i = 1; i < n; i++) {
            if (nums[i] >= 0 || nums[i-1] >= 0) {
                f[i][0] = max(f[i-1][0], f[i-1][1]) + nums[i];
                f[i][1] = max(f[i-1][0], f[i-1][1]) - nums[i];
            } else {
                f[i][0] = max(f[i-1][0], f[i-1][1]) + nums[i];
                f[i][1] = f[i-1][0] - nums[i];
            }
        }

        return max(f[n-1][0], f[n-1][1]);
    }
};
```

```python []
class Solution:
    def maximumTotalCost(self, nums: List[int]) -> int:
        n = len(nums)

        f = [[0] * 2 for _ in range(n)]
        f[0][0] = f[0][1] = nums[0]
        for i in range(1, n):
            if nums[i] >= 0 or nums[i-1] >= 0:
                f[i][0] = max(f[i-1][0], f[i-1][1]) + nums[i]
                f[i][1] = max(f[i-1][0], f[i-1][1]) - nums[i]
            else:
                f[i][0] = max(f[i-1][0], f[i-1][1]) + nums[i]
                f[i][1] = f[i-1][0] - nums[i]

        return max(f[n-1][0], f[n-1][1])
```

### 【递推】费解的开关

https://www.acwing.com/problem/content/97/

> 题意：给定 n 个 `5*5` 的矩阵，代表当前局面。矩阵中每一个元素要么是 0 要么是 1，现在需要计算从当前状态操作到全 1 状态最少需要几次操作？操作描述为改变当前状态为相反状态后，四周的四个元素也需要改变为相反的状态
>
> 思路：我们采用递推的思路。为了尽可能少的进行按灯操作，我们从第二行开始考虑，若前一行的某一元素为 0，则下一行的同一列位置就需要按一下，以此类推将 $2 \to 5$ 行全部按完。现在考虑两点，当前按下状态是否合法？当前按下状态是是否最优？
> 1. 对于第一个问题：从上述思路可以看出，$1 \to n-1$ 行一定全部都是 1 的状态，但是第 $n-1$ 行不一定全 1，因此不合法状态就是第 $n-1$ 行不全为 1
> 2. 对于第二个问题：可以发现，上述算法思路中，对于第一行是没有任何操作的（可以将第一行看做递推的初始化条件），第一行的状态影响全局的总操作数，我们不能确定不对第一行进行任何操作得到的总操作数就是最优的，故我们需要对第一行 5 个灯进行**枚举**按下。我们采用 5 位二进制的方法对第一行的 5 个灯进行枚举按下操作，然后对于当前第一行的按下局面（递推初始化状态）进行 $2 \to n$ 行的按下递推操作。对于每一种合法状态更新最小的操作数即可
>
> 时间复杂度：$O(T \times 2^5 \times 25 \times 5)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 10;

char g[N][N], now[N][N];
int dx[] = {0, 1, -1, 0, 0}, dy[] = {0, 0, 0, 1, -1};

void turn(int x, int y) {
    for (int k = 0; k < 5; k++) {
        int nx = x + dx[k], ny = y + dy[k];
        now[nx][ny] ^= 1;
    }
}

void solve() {
    for (int i = 1; i <= 5; i++) {
        cin >> (g[i] + 1);
    }

    int res = 30;

    for (int op = 0; op < (1 << 5); op++) {
        memcpy(now, g, sizeof g);
        int step = 0;
        
        // 统计第 1 行的按下次数
        for (int i = 0; i < 5; i++) {
            if (op & (1 << i)) {
                step++;
                turn(1, 5 - i);
            }
        }
        
        // 统计 2 ~ 5 行的按下次数
        for (int i = 1; i <= 4; i++) {
            for (int j = 1; j <= 5; j++) {
                if (now[i][j] == '0') {
                    step++;
                    turn(i + 1, j);
                }
            }
        }
        
        // 判断当前操作方案是否合法
        bool ok = true;
        for (int j = 1; j <= 5; j++) {
            if (now[5][j] == '0') {
                ok = false;
            }
        }
        
        // 若当前操作方案合法则更新最小操作次数
        if (ok) {
            res = min(res, step);
        }
    }
    
    cout << (res > 6 ? -1 : res) << "\n";
}

signed main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
    cin >> T;
    while (T--) solve();
    return 0;
}
```

### 【递推/线性dp/哈希】Decode

https://codeforces.com/contest/1996/problem/E

> 题意：给定一个01字符串，问所有区间中01数量相等的子串总共有多少个。
>
> 思路：
>
> - 我们可以最直接的想到 $O(n^5)$ 的暴力做法，即 $O(n^2)$ 枚举区间的左右端点，$O(n^2)$ 枚举区间中子串的左右端点，最后 $O(n)$ 进行检查计数。当然可以用前缀和优化掉 $O(n)$ 的检查计数。但这样做显然无法通过 $10^5$ 的数据量。考虑别的思路。
> - 容易想到动态规划的思路。我们定义 `dp[i]` 表示右端点是 `s[i]` 的所有区间中，合法01子串的数量，那么显然 `dp[0] = s[i] == '1'`。现在考虑 `dp[i]` 如何转移。不难发现以 `s[i]` 为右端点的所有区间一定包含以 `s[i - 1]` 为右端点的所有区间，多出来的合法子串进存在于以 `s[i]` 结尾的子串中，我们假设以 `s[i]` 结尾的合法子串数量为 `t`，则状态转移方程为：`dp[i] = dp[i - 1] + t`。显然我们可以用一个滚动变量来代替 dp 数组，记作now，每次维护完 now 以后，将其累加到答案即可。现在我们将枚举区间从 $O(n^2)$ 通过递推的思路优化到了 $O(n)$。那么如何求解递推式中的 `t` 呢？
> - 通过一个小 trick 求解「以 `s[i]` 结尾的合法子串」的数量。显然可以通过前缀和枚举 $j \in [1,i]$ 统计使得 `i - j + 1 == 2 * (pre[i] - pre[j - 1])` 的数量。但是这样就是 $O(n^2)$ 的了，仍然无法通过本题。引入 trick：我们稍微修改一下前缀和的维护逻辑，即当 `s[i] == '0'` 时，将其记作 `-1`，当 `s[i] == '1'` 时，保持不变仍然记作 `1`。这样我们在向前枚举 `j` 寻找合法区间时，本质上就是在寻找 `pre[i] - pre[j - 1] == 0`，即 `pre[j - 1] == pre[i]` 的个数。假设下标从 0 开始，则每找到一个合法的 `j`，都会对答案贡献 `j + 1`。因此我们只需要哈希存储每一个前缀和对应的下标累计值即可。
>
> 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>

using ll = long long;
using namespace std;

void solve() {
    string s;
    cin >> s;
    
    int n = s.size();
    vector<ll> pre(n + 1);
    for (int i = 0; i < n; i++) {
        pre[i + 1] = pre[i] + (s[i] == '0' ? -1 : 1);
    }
    
    auto add = [&](ll x, ll y) {
        ll mod = 1e9 + 7;
        return ((x % mod) + (y % mod)) % mod;
    };
    
    ll res = 0, now = 0;
    unordered_map<ll, ll> f;
    for (ll i = 0; i <= n; i++) {
        now = add(now, f[pre[i]]);
        res = add(res, now);
        f[pre[i]] += i + 1;
    }
    
    cout << res << "\n";
}

signed main() {
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);
    int T = 1;
    std::cin >> T;
    while (T--) solve();
    return 0;
}
```

### 【递推/数学】Squaring

https://codeforces.com/contest/1995/problem/C

> 题意：给定一个序列，可以对其中任何一个数进行任意次平方操作，即 $a_i \to a_i^2$，问最少需要执行多少次操作可以使得序列不减。
>
> 思路：
>
> - 首先显然的我们不希望第一个数 $a_0$ 变大，因此我们应该从第二个数开始和前一个数进行比较，从而进行可能的平方操作并计数。但是由于数字可能会很大，使用高精度显然会超时，而这些数字本身的意义是用来和前一个数进行大小比较的，并且变化的形式也仅仅是平方操作。我们不妨维护其指数，这样既可以进行大小比较，也不用存储数字本身而造成溢出。当然变为使用指数存储以后如何进行大小比较以及如何维护指数序列有所不同，我们先从一般的角度出发，进而从表达式本身的数学角度讨论特殊情况的处理。
>
> - 对于当前数字 $a_i$ 和前一个数字 $a_{i-1}$ 及其指数 $z_{i-1}$，如果想要当前数字经过可能的 k 次平方操作后不小于前一个数，即 $\displaystyle a_{i-1}^{2^{z_{i-1}}}\le a_i^{2^{k}}$，则易得下面的表达式：
>     $$
>     k:= z_{i-1}+ \left\lceil \log_2(\frac{\log_2 {a_{i-1}}}{\log_2{a_i}}) \right \rceil
>     $$
>     由于 $a_j \in [1, 10^6],z_j\ge 0,k \ge 0$，因此我们有必要：
>
>     1. 讨论 $a_i$ 和 $a_{i-1}$ 和 $1$ 的大小关系。因为它们的对数计算结果在真数部分。
>     2. 讨论 $k$ 和 $0$ 的大小关系。因为一旦 $a_{i-1} < a_i$，则有可能出现计算结果为负的情况，这种情况表明需要对当前数 $a_i$ 进行开根的操作。又由于 $a_i\ge1$，因此开根操作就表明减小当前的数，也就表明当前数在不进行平方操作的情况下就已经满足不减的条件了，也就不需要操作了。此时对应的指数 $z_i$ 就是 $0$，对于答案的贡献也是 $0$。
>
> 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>

using ll = long long;
using namespace std;

void solve() {
    int n;
    cin >> n;
    
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    
    vector<ll> z(n, 0);
    ll res = 0;
    for (int i = 1; i < n; i++) {
        if (a[i] == 1 && a[i - 1] > 1) {
            cout << -1 << "\n";
            return;
        } else if (a[i] == 1 && a[i - 1] == 1 || a[i - 1] == 1) {
            continue;
        }
        ll t = z[i - 1] + ceil(log2(log2(a[i - 1]) / log2(a[i])));
        z[i] = max(0ll, t);
        res += z[i];
    }
    
    cout << res << "\n";
}

signed main() {
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);
    int T = 1;
    std::cin >> T;
    while (T--) solve();
    return 0;
}
```

```python
from typing import List, Tuple
from collections import defaultdict, deque
from itertools import combinations, permutations
import math, heapq, queue

II = lambda: int(input())
FI = lambda: float(input())
MII = lambda: tuple(map(int, input().split()))
LII = lambda: list(map(int, input().split()))


def solve() -> None:
    n = II()
    a = LII()
    
    z = [0] * n
    for i in range(1, n):
        if a[i] == 1 and a[i - 1] > 1:
            print(-1)
            return
        elif a[i] == 1 and a[i - 1] == 1 or a[i - 1] == 1:
            continue
        t = z[i - 1] + math.ceil(math.log2(math.log2(a[i - 1]) / math.log2(a[i])))
        z[i] = max(0, t)
        
    print(sum(z))


if __name__ == '__main__':
    T = 1
    T = II()
    while T: solve(); T -= 1
```

### 【递推/dfs】牛的语言学

https://www.acwing.com/problem/content/description/5559/

> 题意：已知一个字符串由前段的一个词根和后段的多个词缀组成。词根的要求是长度至少为 5，词缀的要求是长度要么是 2, 要么是 3，以及不允许连续的相同词缀组成后段。现在给定最终的字符串，问一共有多少种词缀？按照字典序输出所有可能的词缀
>
> - 思路一：**搜索**。很显然我们应该从字符串的最后开始枚举词缀进行搜索，因为词缀前面的所有字符全部都可以作为词根合法存在，我们只需要考虑当前划分出来的词缀是否合法即可。约束只有一个，不能与后面划分出来的词缀相同即可，由于我们是从后往前搜索，因此我们在搜索时保留后一个词缀即可。如果当前词缀和上一个词缀相同则返回，反之如果合法则加入 set 自动进行字典序排序。
>
>     时间复杂度：$O(2^{\frac{n}{2}})$
>
> - 思路二：**动态规划（递推）**。动规其实就是 **dfs 的逆过程**，我们从已知结果判断当前局面是否合法。很显然词根是包罗万象的，只要长度合法，不管什么样的都是可行的，故我们在判断当前局面是否合法时，只需要判断当前词缀是否合法即可。于是便可知当前状态是从后面的字符串转移过来的。我们定义状态转移记忆数组 `f[i]` 表示字符串 `s[1,i]` 是否可以组成词根。如果 `f[i]` 为真，则表示 `s[1,i]` 为一个合法的词根，`s[i+1,n]` 为一个合法的词缀串，那么词根后面紧跟着的一定是一个长度为 2 或 3 的合法词缀。
>
>     - 我们以紧跟着长度为 2 的合法词缀为例。如果 `s[i+1,i+2]` 为一个合法的词缀，则必须要满足以下两个条件之一
>         1. `s[i+1,i+2]` 与 `s[i+3,i+4]` 不相等，即后面的后面是一个长度也为 **2** 且合法的词缀
>         2. `s[1,i+5]` 是一个合法的词根，即 `f[i+5]` 标记为真，即后面的后面是一个长度为 **3** 且合法的词缀
>
>     - 以紧跟着长度为 3 的哈法词缀同理。如果 `s[i+1,i+3]` 为一个合法的词缀，则必须要满足以下两个条件之一
>         1. `s[i+1,i+3]` 与 `s[i+4,i+6]` 不相等，即后面的后面是一个长度也为 **3** 且合法的词缀
>         2. `s[1,i+5]` 是一个合法的词根，即 `f[i+5]` 标记为真，即后面的后面是一个长度为 **2** 且合法的词缀
>
>     时间复杂度：$O(n \log n)$ - `dp` 的过程是线性的，主要时间开销在 `set` 的自动排序上

dfs 代码

```cpp
#include <iostream>
#include <cstring>
#include <vector>
#include <queue>
#include <stack>
#include <algorithm>
#include <unordered_map>
#include <set>
using namespace std;

string s;
set<string> res;

// 当前词缀起始下标 idx，当前词缀长度 length，后方相邻的词缀 post
void dfs(int idx, int length, string post) {
    if (idx <= 5) return;
    
    string now = s.substr(idx, length);

    if (now == post) {
        // 不合法直接返回
        return;
    } else {
        // 合法则将当前词缀加入集合自动排序，并继续搜索接下来可能的词缀
        res.insert(now);
        dfs(idx - 2, 2, now);
        dfs(idx - 3, 3, now);
    }
}

void solve() {
    cin >> s;
    s = "$" + s;
    
    int tail_point = s.size();

    dfs(tail_point - 2, 2, "");
    dfs(tail_point - 3, 3, "");
    
    cout << res.size() << "\n";
    for (auto& str: res) cout << str << "\n";
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
//    cin >> T;
    while (T--) solve();
    return 0;
}
```

dp 代码

```cpp
#include <iostream>
#include <cstring>
#include <vector>
#include <queue>
#include <stack>
#include <algorithm>
#include <unordered_map>
#include <set>
using namespace std;

const int N = 50010;

string s;
set<string> res;
bool f[N]; // f[i] 表示 s[1,i] 是否可以作为词根存在

void solve() {
    cin >> s;
    s = "$" + s;
    
    // 字符串定义在 [1,n] 上
    int n = s.size() - 1;
    
    // 长度为 n 的字符串一定可以作为词根
    f[n] = true;
    
    for (int i = n; i >= 5; i--) {
        for (int len = 2; len <= 3; len++) {
            if (f[i + len]) {
                string a = s.substr(i + 1, len);
                string b = s.substr(i + 1 + len, len);
                if (a != b || f[i + 5]) {
                    res.insert(a);
                    f[i] = true;
                }
            }
        }
    }
    
    cout << res.size() << "\n";
    
    for (auto& x: res) cout << x << "\n";
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
//    cin >> T;
    while (T--) solve();
    return 0;
}
```

### 【线性dp】最小化网络并发线程分配

https://vijos.org/d/nnu_contest/p/1492

> 题意：现在有一个线性网络需要分配并发线程，每一个网络有一个权重，现在有一个线程分配规则。对于当前网络，如果权重比相邻的网络大，则线程就必须比相邻的网络大。
>
> 思路：我们从答案角度来看，对于一个网络，我们想知道它的相邻的左边线程数和右边线程数，如果当前网络比左边和右边的权重都大，则就是左右线程数的最大值+1，当然这些的**前提是左右线程数已经是最优的状态**，因此我们要先求“左右线程”。分析可知，左线程只取决于左边的权重与线程数，右线程同样只取决于右边的权重和线程数，因此我们可以双向扫描一遍即可求得“左右线程”。最后根据“左右线程”即可求得每一个点的最优状态。

```cpp
void solve() {
    int n; cin >> n;
    vector<int> w(n + 1), l(n + 1, 1), r(n + 1, 1);
    for (int i = 1; i <= n; i++) {
        cin >> w[i];
    }
    for (int i = 2, j = n - 1; i <= n && j >= 1; i++, j--) {
        if (w[i] > w[i - 1]) {
            l[i] = l[i - 1] + 1;
        }
        if (w[j] > w[j + 1]) {
            r[j] = r[j + 1] + 1;
        }
    }
    int res = 0;
    for (int i = 1; i <= n; i++) {
        res += max(l[i], r[i]);
    }
    cout << res << "\n";
}
```

### 【线性dp】Block Sequence :fire:

https://codeforces.com/contest/1881/problem/E

> 题意：给定一个序列，问最少可以删除其中的几个数，使得**最终**的序列满足：从中选择一些数 `num[]`，使得 `num[i]` 后面有 `num[i]` 个数，且这些数包括 `num[]` 涵盖且只涵盖了一遍最终序列中所有的数
>
> 思路：我们考虑动态规划。
>
> - 我们考虑状态表示：其中 `dp[i]` 表示使得序列 `[i,n]` 满足上述条件的最少删除个数
> - 我们考虑状态转移：我们知道对于当前的数 `num[i]`，有两种状态 - 删除 | 不删除。

```cpp

```

### 【线性dp】覆盖墙壁

https://www.luogu.com.cn/problem/P1990

> 题意：给定两种砖块，分别为日字型与L型，问铺满 $2*n$ 的地板一共有多少种铺法
>
> 思路：
>
> - 我们采用递推的思路
> - $define:$ `f[i]` 表示铺满前 $2*i$ 个地板的方案数，`g[i]` 表示铺满前 $2*i+1$ 块地板的方案数
> - $base:$ `f[0] = 1, f[1] = 1, g[0] = 0, g[1] = 1`
> - $dp:$ `f[i] = f[i-1] + f[i-2] + g[i-1]` $||$ `g[i] = f[i-1] + g[i-1]`
> - $result:$ `f[n]`
>
> 手绘：
>
> ![图例](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402012332894.png)
>
> ![图例](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403181626377.png)

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 1000010, mod = 10000;

int n;
int f[N], g[N];

void solve() {
    cin >> n;

    // base
    f[0] = 1, f[1] = 1;
    g[0] = 0, g[1] = 1;

    // dp
    for (int i = 2; i <= n; i++) {
        f[i] = (f[i - 1] + f[i - 2] + 2 * g[i - 2]) % mod;
        g[i] = (f[i - 1] + g[i - 1]) % mod;
    }

    // result
    cout << f[n] << "\n";
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
//    cin >> T;
    while (T--) solve();
    return 0;
}
```

### 【线性dp】施咒的最大总伤害

https://leetcode.cn/problems/maximum-total-damage-with-spell-casting/

> 标签：线性 dp
>
> 题意：给定一个数组，选择一个子序列使得总和最大。约束为：如果选择了值为 $x$ 的元素，则不允许选择值为 $x-2,x-1,x+1,x+2$ 的元素
>
> 思路：
>
> - 哈希计数。首先很显然的我们需要进行哈希计数，便于按数值升序枚举元素。我们定义哈希后的序列为 `v`，大小为 `m`，存储每一种数的数值 `val: int` 和个数 `cnt: int`
> - 状态定义。我们定义状态 `f[i]` 表示哈希序列 `[1,i]` 中子序列总和的最大值，则最终答案就是 `f[m]`
> - 状态转移。对于每一个哈希元素，都有选择和不选两种状态。假设当前枚举到的哈希元素为 `i`，
>     - 不选当前元素。就相当于没有当前元素，则 `f[i] = f[i-1]`
>     - 选择当前元素。我们就需要从哈希序列 `[1,i-1]` 中，比当前哈希元素 `v[i].val` 小 2 且对应子序列之和最大的那个状态 `f[j]` 转移过来。显然我们可以直接枚举哈希序列 `[1,i-1]`，但是这样就是 $O(n^2)$ 必然超时，考虑优化。不难发现 `f[]` 数组是单调递增的并且哈希序列的元素数值 `v[].val` 也是单调递增的。也就是说对于当前状态 `f[i]`，在枚举哈希序列 `[1,i-1]` 时，其实并不需要从 `1` 开始枚举，可以从上一个状态枚举到的状态（记作 `j`）开始枚举（因为上一个状态对应的 `f[j]` 是上一个状态可转移的方案中最大的并且 `v[j].val` 一定比当前方案的哈希数值 `v[i].val` 小 2）。于是状态转移的时间开销就从 $O(n)$ 优化到 $O(1)$，可以通过此题
>
> 时间复杂度：$O(n)$
>
> 空间复杂度：$O(n)$

```cpp []
class Solution {
public:
    long long maximumTotalDamage(vector<int>& power) {
        using ll = long long;

        // hash
        map<int, int> a;
        for (int x: power) {
            a[x]++;
        }
        int m = a.size(), idx = 1;
        struct node { ll val, cnt; };
        vector<node> v(m + 1);
        for (auto it: a) {
            v[idx++] = {it.first, it.second};
        }

        // dp
        vector<ll> f(m + 1);
        f[1] = v[1].val * v[1].cnt;
        for (int i = 2, j = 1; i <= m; i++) {
            while (j < i && v[j].val < v[i].val - 2) {
                j++;
            }
            j--;
            
            f[i] = max(f[i - 1], f[j] + v[i].val * v[i].cnt);
        }

        return f[m];
    }
};
```

```python []
class Solution:
    def maximumTotalDamage(self, power: List[int]) -> int:
        from collections import defaultdict

        # hash
        a = defaultdict(int)
        for x in power:
            a[x] += 1
        a = sorted(a.items(), key=lambda x: x[0])

        class node:
            def __init__(self, val: int, cnt: int) -> None:
                self.val = val
                self.cnt = cnt
        
        m, idx = len(a), 1
        v = [node(0, 0)] * (m + 1)
        for it in a:
            v[idx] = node(it[0], it[1])
            idx += 1

        # dp
        f = [0] * (m + 1)
        f[1], j = v[1].val * v[1].cnt, 1
        for i in range(2, m + 1):
            while j < i and v[j].val < v[i].val - 2:
                j += 1
            j -= 1

            f[i] = max(f[i - 1], f[j] + v[i].val * v[i].cnt)

        return f[m]
```

### 【线性dp】奇怪的汉诺塔

https://www.acwing.com/problem/content/98/

> 题意：四塔汉诺塔问题。求在给定 $n$ 个圆盘的情况下的最少移动方案数。
>
> 思路：
>
> - 我们定义「最小完成单元」为：在满足游戏规则的情况下，将一座塔的所有圆盘移动到另一座塔所需的最少塔数。那么显然的最小完成单元为 3 座塔。定义 `d[i]` 表示三塔模式下 $i$ 个盘的最少移动次数，`f[i]` 表示四塔模式下 $i$ 个盘的最少移动次数。
>
> - 对于 4 座塔的情况，相当于最小完成单元又多了 1 座塔。那么显然多出来的这座塔有两个处置方案：
>
>     - 如果我们**不利用**这座塔。那么还剩 3 座塔，也就是最小完成单元，此时的最少移动次数是唯一的，也就是 `f[i] = d[i]`
>
>     - 如果我们**要利用**这座塔。那么我们**只能在这一座塔上**按规则放圆盘。因为要确保最小完成单元来让剩余的圆盘移动到另一座塔。如果还在别的塔上放置了圆盘，那么将不符合最小完成单元的定义，游戏无法结束。当然我们不能将所有的圆盘都先放到这座塔上，因为这种情况下是不可能成立的，我们不可能让一个「我们正在求解的问题」作为我们的答案。也就是说 $j<i$
>
>
> - 至此四塔模式下 $i$ 个圆盘游戏方案的组成集合已全部确定，如下图所示，即：在四塔模式下移动 $j \in [0,i-1]$ 个圆盘到其中一座空塔上，方案数为 $f[j]$；剩余的 $i-j$ 个圆盘处于最小完成单元的局面，方案数是唯一的 $d[i-j]$；最后再将一开始移动的 $j$ 个圆盘在四塔模式下移动到刚才剩余圆盘移动到的塔上，方案数为 $f[j]$。
>
> ![集合划分](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202408011452431.png)
>
> 于是最终的状态转移方程为：
> $$
> f_i = \min{ \{ f_j+d_{i-j}+f_j \} },\quad i \in [1,n],\quad j \in [0,i-1]
> $$
> 时间复杂度：$O(n^2)$

```cpp
#include <bits/stdc++.h>

using ll = long long;
using namespace std;

void solve() {
    int n = 12;
    vector<int> d(n + 1);       // d[i] means move i pans to another tower with 3 towers
    vector<int> f(n + 1, 1e9);  // f[i] means move i pans to another tower with 4 towers
    
    d[1] = 1;
    for (int i = 1; i <= n; i++) {
        d[i] = 1 + 2 * d[i - 1];
    }
    f[1] = 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j <= i - 1; j++) {
            f[i] = min(f[i], f[j] + d[i - j] + f[j]);
        }
        cout << f[i] << "\n";
    }
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

### 【线性dp/dfs】数的计算

https://www.luogu.com.cn/problem/P1028

> 题意：给定一个数和一种构造方法，即对于当前的数，可以在其后面添加一个最大为当前一半大的数，以此类推构造成一个数列。问一共可以构造出多少个这种数列
>
> 思路一：dfs
>
> - 非常显然的一个搜索树，答案就是结点数
> - 时间复杂度：$O(\text{方案数})$
>
> 思路二：dp
>
> - 非常显然的一个dp，我们定义一个dp记忆数组。其中 `dp[i]` 表示数字 `i` 的构造方案总数，那么状态转移方程就是
>     $$
>     dp[i]=\sum_{j=1}^{\left\lfloor i/2 \right\rfloor}dp[j]+1
>     $$
>
> - 时间复杂度：$O(n^2)$

dfs代码

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int n, res;

void dfs(int x) {
    res++;
    for (int i = x >> 1; i >= 1; i--) {
        dfs(i);
    }
}

void solve() {
    cin >> n;
    dfs(n);
    cout << res << "\n";
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

dp代码

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int n;

void solve() {
    cin >> n;

    vector<ll> dp(n + 1, 1);
    for (int i = 2; i <= n; i++) {
        for (int j = 1; j <= i >> 1; j++) {
            dp[i] += dp[j];
        }
    }

    cout << dp[n] << "\n";
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

### 【线性dp/二分答案】规划兼职工作

https://leetcode.cn/problems/maximum-profit-in-job-scheduling/description/

> 题意：给定 n 份工作的起始时间、终止时间、收益值，现在需要不重叠时间的选择工作使得收益最大
>
> 思路：动态规划、二分答案。为了不重不漏的枚举每一份工作，我们将工作按照结束时间进行排序，然后就可以枚举每一份工作了。接下来要解决的问题是，如何根据起始时间和终止时间进行工作的选择。显然的，每一份工作有选与不选两种状态，是否选择取决于收益是否更优，我们考虑动态规划。我们定义状态表 `f[i]` 表示在前 i 个工作中选择的最大工作收益，返回值就是 `f[n]`，先看图
>
> ![图例](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202405281439070.png)
>
> 1. 选择第 i 个工作：`f[i] = f[r] + profit[i]`（其中 r 表示 `[1,i-1]` 份工作中，结束时间早于当前工作起始时间的最右边的工作，在 `[1,i-1]` 中二分查找即可）
> 2. 不选第 i 个工作：`f[i] = f[i - 1]`
>
> 选择最大属性进行状态转移即可：`f[i] = max(f[i - 1], f[r] + profit[i])`
>
> 时间复杂度：$O(n\log n)$

```cpp
class Solution {
public:
    int jobScheduling(vector<int>& startTime, vector<int>& endTime, vector<int>& profit) {
        int n = startTime.size();
        vector<array<int, 3>> jobs(n + 1);

        for (int i = 1; i <= n; i++) {
            jobs[i] = {startTime[i - 1], endTime[i - 1], profit[i - 1]};
        }

        sort(jobs.begin() + 1, jobs.end(), [&](array<int, 3>& x, array<int, 3>& y){
            return x[1] < y[1];
        });

        vector<int> f(n + 1);
        for (int i = 1; i <= n; i++) {
            int l = 0, r = i - 1;
            while (l < r) {
                int mid = (l + r + 1) >> 1;
                if (jobs[mid][1] <= jobs[i][0]) l = mid;
                else r = mid - 1;
            }
            f[i] = max(f[i - 1], f[r] + jobs[i][2]);
        }

        return f[n];
    }
};
```

### 【线性dp/二分查找】最长上升子序列

https://www.luogu.com.cn/problem/B3637

> 题意：给定序列，求解其中最长上升子序列 (Longest Increasing Subsequence, 简称 LIS) 的长度。
>
> 思路：我们采用动态规划。
>
> **状态定义**：定义状态数组 `f[i]` 表示以元素 `a[i]` 结尾的最长上升子序列的长度，显然的初始状态全都是 `1`
>
> **状态转移**：
>
> - **暴力枚举**。首先很显然的 `f[i]` 一定是从 `[0,i-1]` 中比当前元素值小的状态转移过来，于是可以很轻松的写出双重循环的代码，时间复杂度 $O(n^2)$。
>
> - **贪心+二分优化**。
>
>     - **回顾朴素**。优化需要在理解转移本质的基础上展开，因此我们先来回顾一下朴素版的转移方案：从 `[0,i-1]` 中比当前元素小的元素 `a[j]` 对应的最长上升子序列长度 `f[j]` 转移过来。我们枚举了 `[0,i-1]` 所有的状态确保了不重不漏。对于 `i = 6` 来说，如下图所示。其中✔表示进入了 `if` 的判断逻辑。最终我们选择从 `j = 5` 对应的 `f[j] = 3` 转移而来。这里的判断准则为：对于每一个元素，需要找前面的元素中比当前元素小的元素。
>
>         ![枚举元素](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406211528778.png)
>
>     - **转换视角**。同样对于每一个元素 `a[i]`，我们不再按顺序枚举前面已经计算出来的 `f[1:i-1]`，而是预先按照长度存储所有的 `f[1:i-1]` 从而枚举长度 `j`，显然可以贪心的从最大长度 `mxa_len` 开始枚举。一旦遇到比 `a[i]` 小的元素，那么 `f[i]` 就等于当前枚举的长度+1，即 `f[i] = j + 1`。对于 `i = 6` 来说，如下图所示。这样也可以做到不重不漏的枚举所有状态。但是显然的，这种方法只是变相地枚举了所有的元素，仍然是 $O(n^2)$，并且和枚举元素相比还多了一点思维量和代码量。
>
>         ![枚举长度](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406211532051.png)
>
>     - **优化诞生**。在枚举元素时，并没有额外有价值的信息，比如元素并非单调排列，`f[]` 数组也并非单调。但转换到枚举长度，让我们有机会进行优化！不难发现，对于每一个元素 `a[i]`，我们在按长度 `[1,max_len]` 枚举可能的尾元素 `f[1:i-1]` 时，由于 `max_len` 每一次更新时的增量都是 1，因此 `[1,max_len]` 的每一个取值都一定会有对应的元素存在！贪心的，对于同一个长度下所有子序列的尾元素，我们只关心其中值最小的那一个尾元素，因此我们用一个数组来存储每一个长度下子序列尾元素的最小值，即 `mi[i]` 表示长度为 `i` 的最长上升子序列中，最小的尾元素值。这样在枚举长度 `[1,max_len]` 时，就不再需要枚举每一个长度下所有的尾元素，仅需枚举每一个长度下唯一的那个最小尾元素。但如果每一个长度都刚好只有一个元素，那岂不是还是需要线性枚举？更进一步的，我们可以发现，此时每一个长度对应的唯一元素组成的序列是严格单调递增的（反证法易证）！有了这样单调的性质我们就可以利用二分加速枚举，这样可以将枚举的时间复杂度严格控制在 $O(\log n)$。显然的，我们希望当前的元素可以拼接在尽可能长的子序列后面，因此此处的二分使用的是寻找右边界的板子。
>
>         ![优化](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406211532875.png)
>
>     - **代码实现**。枚举每一个元素肯定是少不了的，我们使用 `dp[len]` 表示最长上升子序列长度为 `len` 的序列的最后一个元素的最小值。初始状态显然就是 `dp[1] = a[0]`。在每一个元素二分查询「最大的比当前元素小的元素」时，如果查出来的元素 `dp[r]` 确实比当前元素小，则需要更新 `dp[r+1]` 的值；反之如果查出来的元素 `dp[r]` 比当前元素还小，则表明二分到了左边界，此时 `r` 一定是 1，直接用当前元素覆盖 `dp[1]` 即可。
>
> **答案表示**。最终答案就是 `max_len`
>
> 时间复杂度：$O(n \log n)$

暴力枚举元素

```cpp
#include <bits/stdc++.h>

using ll = long long;
using namespace std;

void solve() {
    int n;
    cin >> n;

    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    vector<int> f(n, 1);
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (a[i] > a[j]) {
                f[i] = max(f[i], f[j] + 1);
            }
        }
    }

    cout << *max_element(f.begin(), f.end()) << "\n";
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

暴力枚举长度

```cpp
#include <bits/stdc++.h>

using ll = long long;
using namespace std;

void solve() {
    int n;
    cin >> n;

    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    vector<vector<int>> dp(n + 1, vector<int>());
    int max_len = 1;
    dp[1].push_back(a[0]);
    for (int i = 1; i < n; i++) {
        bool ok = false;
        // 贪心的从已经出现过的最大长度开始枚举
        for (int j = max_len; j >= 1; j--) {
            // 对于当前长度下的所有元素
            for (int x: dp[j]) {
                if (a[i] > x) {
                    dp[j + 1].push_back(a[i]);
                    max_len = max(max_len, j + 1);
                    ok = true;
                    goto flag;
                }
            }
        }
        flag:
        if (!ok) {
            dp[1].push_back(a[i]);
        }
    }

    cout << max_len << "\n";
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

贪心二分优化

```cpp
#include <bits/stdc++.h>

using ll = long long;
using namespace std;

void solve() {
    int n;
    cin >> n;

    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    vector<int> mi(n + 1, INT_MAX);
    int max_len = 1;
    mi[1] = a[0];
    for (int i = 1; i < n; i++) {
        int l = 1, r = max_len;
        while (l < r) {
            int mid = (l + r + 1) >> 1;
            if (a[i] > mi[mid]) l = mid;
            else r = mid - 1;
        }

        if (a[i] > mi[r]) {
            mi[r + 1] = min(mi[r + 1], a[i]);
            max_len = max(max_len, r + 1);
        } else {
            // 此时长度 r 一定是 1 并且当前元素是长度为 1 的子序列尾元素中最小的
            mi[1] = a[i];
        }
    }

    cout << max_len << "\n";
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

### 【网格图dp/dfs】过河卒

https://www.luogu.com.cn/problem/P1002

> 题意：给定一个矩阵，现在需要从左上角走到右下角，问一共有多少种走法？有一个特殊限制是，对于图中的9个点是无法通过的。
>
> 思路一：dfs
>
> - 我们可以采用深搜的方法。但是会超时，我们可以这样估算时间复杂度：对于每一个点，我们都需要计算当前点的右下角的矩阵中的每一个点，那么总运算次数就近似为阶乘级别。当然实际的时间复杂度不会这么大，但是这种做法 $n*m$ 一旦超过100就很容易tle
>
> - 时间复杂度：$O(nm!)$
>
> 思路二：dp
>
> - 我们可以考虑，对于当前的点，可以从哪些点走过来，很显然就是上面一个点和左边一个点，而对于走到当前这个点的路线就是走到上面的点和左边的点的路线之和，base状态就是 `dp[1][1] = 1`，即起点的路线数为1
>
> - 时间复杂度：$O(nm)$

dfs代码

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

const int N = 30;

int n, m, a, b;
int res;
bool notsafe[N][N];

void init() {
    int px[9] = {0, -1, -2, -2, -1, 1, 2, 2, 1};
    int py[9] = {0, 2, 1, -1, -2, -2, -1, 1, 2};
    for (int i = 0; i < 9; i++) {
        int na = a + px[i], nb = b + py[i];
        if (na < 0 || nb < 0) continue;
        notsafe[na][nb] = true;
    }
}

void dfs(int x, int y) {
    if (x > n || y > m || notsafe[x][y]) {
        return;
    }

    if (x == n && y == m) {
        res++;
        return;
    }

    dfs(x, y + 1);
    dfs(x + 1, y);
}

void solve() {
    cin >> n >> m >> a >> b;
    init();
    dfs(0, 0);
    cout << res << "\n";
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

dp代码

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

const int N = 30;

int n, m, a, b;
bool notsafe[N][N];
ll dp[N][N];

void solve() {
    cin >> n >> m >> a >> b;

    // 初始化
    ++n, ++m, ++a, ++b;
    int px[9] = {0, -1, -2, -2, -1, 1, 2, 2, 1};
    int py[9] = {0, 2, 1, -1, -2, -2, -1, 1, 2};
    for (int i = 0; i < 9; i++) {
        int na = a + px[i], nb = b + py[i];
        if (na < 0 || nb < 0) continue;
        notsafe[na][nb] = true;
    }

    // dp求解
    dp[1][1] = 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (!notsafe[i - 1][j]) dp[i][j] += dp[i - 1][j];
            if (!notsafe[i][j - 1]) dp[i][j] += dp[i][j - 1];
        }
    }

    cout << dp[n][m] << "\n";
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

### 【网格图dp】摘樱桃 II

https://leetcode.cn/problems/cherry-pickup-ii/

> 题意：给定一个 $n$ 行 $m$ 列的网格图，每个格子拥有一个价值。现在有两个人分别从左上角和右上角开始移动，移动方式为「左下、下、右下」三个方向，问两人最终最多一共可以获得多少价值？如果两人同时经过一个位置，则只能算一次价值。
>
> 思路：
>
> - 状态定义。最终状态一定是两人都在最后一行的任意两列，我们如何定义状态可以不重不漏的表示两人的运动状态呢？可以发现两人始终在同一行，但是列数不一定相同，我们定义状态 $f[i][j][k]$ 表示两人走到第 $i$ 行时，一人在第 $j$ 列，另一人在第 $k$ 列时的总价值。则答案就是：
>     $$
>     \max{(f[n-1][j][k])},j,k\in[0,m]
>     $$
>
> - 状态转移。本题难点在于状态定义，一旦定义好了以后状态转移就不困难了。对于当前状态 $f[i][j][k]$，根据乘法原理，两人均有 3 种走法，因此当前状态可以从 $3\times 3=9$ 种合法状态转移过来。取最大值即可。
>
> 时间复杂度：$O(nm^2)$

```python
class Solution:
    def cherryPickup(self, g: List[List[int]]) -> int:
        n, m = len(g), len(g[0])
        f = [[[-1] * m for _ in range(m)] for _ in range(n)]
        f[0][0][m - 1] = g[0][0] + g[0][m - 1]
        for i in range(1, n):
            for j in range(m):
                for k in range(m):
                    # 枚举 9 个子问题
                    for p in range(j - 1, j + 2):
                        for q in range(k - 1, k + 2):
                            if 0 <= p < m and 0 <= q < m and f[i - 1][p][q] != -1:
                                f[i][j][k] = max(f[i][j][k], f[i - 1][p][q] + g[i][j] + (0 if j == k else g[i][k]))
        
        res = 0
        for j in range(m):
            for k in range(j, m):
                res = max(res, f[n - 1][j][k])
        
        return res
```

### 【网格图dp】摘樱桃

弱化版 $(n\le 50)$ ：https://leetcode.cn/problems/cherry-pickup/

强化版 $(n\le300)$ ：https://codeforces.com/problemset/problem/213/C

> 题意：给定一个 n 行 n 列的网格图，问从左上走到右下，再从右下走到左上最多可以获得多少价值？一个单元格只能被计算一次价值。
>
> 注：弱化版中 -1 表示不可达，强化版没有不可达的约束。[强化版 AC 代码](https://codeforces.com/contest/213/submission/278617557)
>
> 思路一：暴力dp
>
> - 首先对于来回问题可以转化为两次去的问题，即问题等价于求解「两个人从左上角走到右下角」的最大收益。
> - 显然我们可以定义四维的状态，其中 $f[i][j][p][q]$ 表示第一个人走到 $(i,j)$ 且第二个人走到 $(p,q)$ 时的最大收益。直接枚举这四个维度，然后从 4 个合法的子问题转移过来即可。
> - 时间复杂度：$O(n^4)$
>
> 思路二：优化dp
>
> - 注意到问题可以进一步等价于「两个人**同时**从左上角走到右下角」的最大收益。也就是两个人到起点 $(0,0)$ 的曼哈顿距离应该是一样的，即 $i+j=p+q$，也就是说如果其中一个人 $(i,j)$ 的位置确定了，则另一个人只需要枚举一个下标，另一个下标就可以 $O(1)$ 的确定了。可以将时间复杂度降低一个维度。
> - 状态定义。我们定义 $f[k][i_1][i_2]$ 表示第一个人走到 $(i_1,k-i_1)$ 且第二个人走到 $(i_2,k-i_2)$ 时的最大收益。则最终答案就是 $f[2n-2][n-1][n-1]$。状态转移同理，从 4 个合法子问题转移过来即可。
> - 时间复杂度：$O(n^3)$

暴力dp：

```cpp
template<class T>
void chmax(T& a, T b) {
    a = max(a, b);
}

int di[4] = {-1, -1, 0, 0};
int dj[4] = {0, 0, -1, -1};
int dp[4] = {-1, 0, -1, 0};
int dq[4] = {0, -1, 0, -1};

class Solution {
public:
    int cherryPickup(vector<vector<int>>& g) {
        int n = g.size();
        int f[n][n][n][n];
        memset(f, -1, sizeof f);
        f[0][0][0][0] = g[0][0] == -1 ? -1 : g[0][0];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (g[i][j] == -1) {
                    continue;
                }
                for (int p = 0; p < n; p++) {
                    for (int q = 0; q < n; q++) {
                        if (g[p][q] == -1) {
                            continue;
                        }
                        // 枚举 4 个子问题
                        for (int k = 0; k < 4; k++) {
                            int ni = i + di[k], nj = j + dj[k];
                            int np = p + dp[k], nq = q + dq[k];
                            if (ni >= 0 && nj >= 0 && np >= 0 && nq >= 0 && f[ni][nj][np][nq] != -1) {
                                chmax(f[i][j][p][q], f[ni][nj][np][nq] + g[i][j] + (i == p && j == q ? 0 : g[p][q]));
                            }
                        }
                    }
                }
            }
        }
        return f[n - 1][n - 1][n - 1][n - 1] == -1 ? 0 : f[n - 1][n - 1][n - 1][n - 1];
    }
};
```

优化dp：

```cpp
template<class T>
void chmax(T& a, T b) {
    a = max(a, b);
}

int dx[] = {0, 0, -1, -1};
int dy[] = {0, -1, 0, -1};

class Solution {
public:
    int cherryPickup(vector<vector<int>>& g) {
        int n = g.size();
        int f[2 * n - 1][n][n];
        memset(f, -1, sizeof f);
        f[0][0][0] = g[0][0] == -1 ? -1 : g[0][0];
        for (int k = 1; k <= 2 * n - 2; k++) {
            for (int i1 = 0; i1 < n; i1++) {
                for (int i2 = 0; i2 < n; i2++) {
                    int j1 = k - i1, j2 = k - i2;
                    if (j1 < 0 || j1 >= n || j2 < 0 || j2 >= n || g[i1][j1] == -1 || g[i2][j2] == -1) {
                        continue;
                    }
                    // 枚举 4 个子问题
                    for (int t = 0; t < 4; t++) {
                        int ni1 = i1 + dx[t], nj1 = k - ni1;
                        int ni2 = i2 + dy[t], nj2 = k - ni2;
                        if (ni1 >= 0 && nj1 >= 0 && ni2 >= 0 && nj2 >= 0 && f[k - 1][ni1][ni2] != -1) {
                            chmax(f[k][i1][i2], f[k - 1][ni1][ni2] + g[i1][j1] + (i1 == i2 && j1 == j2 ? 0 : g[i2][j2]));
                        }
                    }
                }
            }
        }
        return f[2 * n - 2][n - 1][n - 1] == -1 ? 0 : f[2 * n - 2][n - 1][n - 1];
    }
};
```

### 【树形dp】最大社交深度和

https://vijos.org/d/nnu_contest/p/1534

> 算法：树形dp、BFS
>
> 题意：给定一棵树，现在需要选择其中的一个结点为根节点，使得深度和最大。深度的定义是以每个结点到树根所经历的结点数
>
> 思路一：暴力
>
> - 显然可以直接遍历每一个结点，计算每个结点的深度和，然后取最大值即可
>
> - 时间复杂度：$O(n^2)$
>
> 思路二：树形dp
>
> ![树形dp图解](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403182214257.png)
>
> - 我们可以发现，对于当前的根结点 `fa`，我们选择其中的一个子结点 `ch`，将 `ch` 作为新的根结点（如右图）。那么对于当前的 `ch` 的深度和，我们可以借助 `fa` 的深度和进行求解。我们假设以 `ch` 为子树的结点总数为 `x`，那么这 `x` 个结点在换根之后，相对于 `ch` 的深度和，贡献了 `-x` 的深度；而对于 `fa` 的剩下来的 `n-x` 个结点，相对于 `ch` 的深度和，贡献了 `n-x` 的深度。于是 `ch` 的深度和就是 `fa的深度和` `-x+n-x`，即：
>     $$
>     dep[ch] = dep[fa]-x+n-x = dep[fa]+n-2\times x
>     $$
>     于是我们很快就能想到利用前后层的递推关系，$O(1)$ 的计算出所有子结点的深度和。
>
>     代码实现：我们可以先计算出 `base` 的情况，即任选一个结点作为根结点，然后基于此进行迭代计算。在迭代计算的时候需要注意的点就是在一遍 `dfs` 计算某个结点的深度和 `dep[root]` 时，如果希望同时计算出每一个结点作为子树时，子树的结点数，显然需要分治计算一波。关于分治的计算我熟练度不够高，~~特此标注一下debug了3h的点~~：即在递归到最底层，进行回溯计算的时候，需要注意不能统计父结点的结点值（因为建的是双向图，所以一定会有从父结点回溯的情况），那么为了避开这个点，就需要在 $O(1)$ 的时间复杂度内获得当前结点的父结点的编号，从而进行特判，采用的方式就是增加递归参数 `fa`。
>
> - 没有考虑从父结点回溯的情况的dfs代码
>
>     ```cpp
>     void dfs(int now, int depth) {
>         if (!st[now]) {
>             st[now] = true;
>             dep[root] += depth;
>             for (auto& ch: G[now]) {
>                 dfs(ch, depth + 1);
>                 cnt[now] += cnt[ch];
>             }
>         }
>     }
>     ```
>
> - 考虑了从父结点回溯的情况的dfs代码
>
>     ```cpp
>     void dfs(int now, int fa, int depth) {
>         if (!st[now]) {
>             st[now] = true;
>             dep[root] += depth;
>             for (auto& ch: G[now]) {
>                 dfs(ch, now, depth + 1);
>                 if (ch != fa) {
>                     cnt[now] += cnt[ch];
>                 }
>             }
>         }
>     }
>     ```
>
> - 时间复杂度：$\Theta(2n)$

暴力代码：

```cpp
const int N = 500010;

int n;
vector<int> G[N];
int st[N], dep[N];

void dfs(int id, int now, int depth) {
    if (!st[now]) {
        st[now] = 1;
        dep[id] += depth;
        for (auto& node: G[now]) {
            dfs(id, node, depth + 1);
        }
    }
}

void solve() {
    cin >> n;
    for (int i = 1; i <= n - 1; i++) {
        int a, b;
        cin >> a >> b;
        G[a].push_back(b);
        G[b].push_back(a);
    }

    int res = 0;

    for (int i = 1; i <= n; i++) {
        memset(st, 0, sizeof st);
        dfs(i, i, 1);
        res = max(res, dep[i]);
    }

    cout << res << "\n";
}
```

优化代码：

```cpp
const int N = 500010;

int n, dep[N], root = 1;
vector<int> G[N], cnt(N, 1);;
bool st[N];

// 当前结点编号 now，当前结点的父结点 fa，当前结点深度 depth
void dfs(int now, int fa, int depth) {
    if (!st[now]) {
        st[now] = true;
        dep[root] += depth;
        for (auto& ch: G[now]) {
            dfs(ch, now, depth + 1);
            if (ch != fa) {
                cnt[now] += cnt[ch];
            }
        }
    }
}

void bfs() {
    memset(st, 0, sizeof st);
    queue<int> q;
    q.push(root);
    st[root] = true;

    while (q.size()) {
        int fa = q.front(); // 父结点编号 fa
        q.pop();
        for (auto& ch: G[fa]) {
            if (!st[ch]) {
                st[ch] = true;
                dep[ch] = dep[fa] + n - 2 * cnt[ch];
                q.push(ch);
            }
        }
    }
}

void solve() {
    cin >> n;
    for (int i = 1; i <= n - 1; i++) {
        int a, b;
        cin >> a >> b;
        G[a].push_back(b);
        G[b].push_back(a);
    }

    dfs(root, -1, 1);
    bfs();

    cout << *max_element(dep, dep + n + 1) << "\n";
}
```

### 【高维dp/dfs】栈

https://www.luogu.com.cn/problem/P1044

> 题意：n个数依次进栈，随机出栈，问一共有多少种出栈序列？
>
> **思路一：dfs**
>
> - 我们可以这么构造搜索树：已知对于当前的栈，一共有两种状态
>     - 入栈 - 如果当前还有数没有入栈
>     - 出栈 - 如果当前栈内还有元素
> - 搜索参数：`i,j` 表示入栈数为 `i` 出栈数为 `j` 的状态
> - 搜索终止条件
>     - 入栈数 < 出栈数 - $i<j$
>     - 入栈数 > 总数 $n$ - $i = n$
> - 答案状态：入栈数为n，出栈数也为n
> - 时间复杂度：$O(\text{方案数})$
>
> **思路二：dp**
>
> - 采用上述dfs时的状态表示方法，`i,j` 表示入栈数为 `i` 出栈数为 `j` 的状态。
>
> - 我们在搜索的时候，考虑的是接下来可以搜索的状态
>
>     1. 即出栈一个数的状态 - `i+1,j`
>
>     2. 和入栈一个数的状态 - `i,j+1`
>
>     如图：
>
>     ![图解](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403182214793.png)
>
>     而我们在dp的时候，需要考虑的是子结构的解来得出当前状态的答案，就需要考虑之前的状态。即当前状态是从之前的哪些状态转移过来的。和上述dfs思路是相反的。我们需要考虑的是
>
>     1. 上一个状态入栈一个数到当前状态 - `i-1,j` $\to$ `i,j`
>     2. 上一个状态出栈一个数到当前状态 - `i,j-1` $\to$ `i,j`
>
>     - 特例：$i=j$ 时，只能是上述第二种状态转移而来，因为要始终保证入栈数大于等于出栈数，即 $i \ge j$
>
>     如图：
>
>     ![图解](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403191805594.png)
>
> - 我们知道，入栈数一定是大于等于出栈数的，即 $i\ge j$。于是我们在枚举 $j$ 的时候，枚举的范围是 $[1,i]$
>
> - $base$ 状态的构建取决于 $j=0$ 时的所有状态，我们知道没有任何数出栈也是一种状态，于是
>     $$
>     dp[i][0]=0,(i=1,2,3,...,n)
>     $$
>
> - 时间复杂度：$O(n^2)$

dfs代码

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int n, res;

// 入栈i个数，出栈j个数
void dfs(int i, int j) {
    if (i < j || i > n) return;

    if (i == n && j == n) res++;

    dfs(i + 1, j);
    dfs(i, j + 1);
}

void solve() {
    cin >> n;
    dfs(0, 0);
    cout << res << "\n";
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

dp代码

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

const int N = 20;

int n;
ll dp[N][N]; // dp[i][j] 表示入栈数为i，出栈数为j的方案总数

void solve() {
    cin >> n;

    // base状态：没有数出栈也是一种状态
    for (int i = 1; i <= n; i++) dp[i][0] = 1;

    // dp转移
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= i; j++)
            if (i == j) dp[i][j] = dp[i][j - 1];
            else dp[i][j] = dp[i - 1][j] + dp[i][j - 1];

    cout << dp[n][n] << "\n";
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

### 【高维dp】找出所有稳定的二进制数组 II

https://leetcode.cn/problems/find-all-possible-stable-binary-arrays-ii/

> 题意：构造一个仅含有 $n$ 个 $0$，$m$ 个 $1$ 的数组，且长度超过 $k$ 的子数组必须同时含有 $0$ 和 $1$。给出构造的总方案数对 $10^9+7$ 取余后的结果。
>
> 思路：
>
> - 定义状态表。我们从左到右确定每一位的数字时，需要确定这么三个信息：当前是哪一位？还剩几个 $0$ 和 $1$？这一位填 $0$ 还是 $1$？对于这三个信息，我们可以定义状态数组 $f[i][j][k]$ 表示当前已经选了 $i$ 个 $0$，$j$ 个 $1$，且第 $i+j$ 位填 $k$ 时的方案数。这样最终答案就是 $f[n][m][0]+f[n][m][1]$。
>
> - 定义子问题。以当前第 $i+j$ 位填 $0$ 为例，填 $1$ 同理，即当前需要维护的是 $f[i][j][0]$。显然的如果前一位是和当前位不同，即 $1$ 时，可以直接转移过来；如果前一位和当前位相同，即 $0$ 时，有可能会出现长度超过 $k$ 的连续 $0$ 子数组，即前段数组刚好是以「一个 $1$ 和 $k$ 个 $0$ 结尾的」合法数组，此时再拼接一个 $0$ 就不合法了。
>
> - 状态转移方程。综上所述，可以得到以下两个状态转移方程：
>     $$
>     \begin{aligned}
>     f[i][j][0] = f[i - 1][j][1] + f[i - 1][j][0] - f[i - k - 1][j][1] \\
>     f[i][j][1] = f[i][j - 1][0] + f[i][j - 1][1] - f[i][j - k - 1][0]
>     \end{aligned}
>     $$
>
> 时间复杂度：$O(nm)$

```cpp
class Solution {
public:
    int numberOfStableArrays(int n, int m, int k) {
        const int mod = 1e9 + 7;
        vector<vector<array<int, 2>>> f(n + 1, vector<array<int, 2>>(m + 1));

        for (int i = 0; i <= min(n, k); i++) {
            f[i][0][0] = 1;
        }
        for (int j = 0; j <= min(m, k); j++) {
            f[0][j][1] = 1;
        }

        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                f[i][j][0] = (f[i - 1][j][1] + f[i - 1][j][0]) % mod;
                if (i - k - 1 >= 0) {
                    f[i][j][0] = (f[i][j][0] - f[i - k - 1][j][1] + mod) % mod;
                }
                f[i][j][1] = (f[i][j - 1][0] + f[i][j - 1][1]) % mod;
                if (j - k - 1 >= 0) {
                    f[i][j][1] = (f[i][j][1] - f[i][j - k - 1][0] + mod) % mod;
                }
            }
        }

        return (f[n][m][0] + f[n][m][1]) % mod;
    }
};
```

### 【高维dp】学生出勤记录 II

https://leetcode.cn/problems/student-attendance-record-ii/description/

> 题意：构造一个仅含有 $P,A,L$ 三种字符的字符串，使得 $A$ 最多出现 $1$ 次，同时 $L$ 最多连续出现 $2$ 次。问一共有多少种构造方案？对 $10^9+7$ 取模。
>
> 思路：
>
> - 模拟分析问题。我们从前往后构造。对于当前第 $i$ 个字符 $s[i]$，有 $3$ 种可能的选项，其中 $P$ 是一定合法的选项，$A$ 是否合法取决于 $s[0:i-1]$ 中的 $A$ 的数量，$L$ 是否合法取决于 $s[0:i-1]$ 的末尾连续 $L$ 的数量。因此我们可以通过**被动转移**的动态规划求解。
> - 状态定义。从上述分析不难发现需要 $3$ 种状态来表示所有情况，因此我们定义 $f[i][j][k]$ 表示构造第 $i$ 位时，$s[0:i]$ 中含有 $j$ 个 $A$ 且末尾含有连续 $k$ 个 $L$ 时的方案数。
> - 初始化。每一位填什么取决于前缀 $s[0:i-1]$ 的情况，因此我们需要初始化 $f[0][][]$ 即第 $0$ 位的情况。显然的第 $0$ 位 $P,A,L$ 三种都可以填，对应的就是 $f[0][0][0] = f[0][1][0] = f[0][0][1] = 1$，其余初始化为 $0$ 即可。
> - 状态转移。考虑第 $i$ 位的三种情况：
>     1. 填 $P$：可以用前缀的所有状态来更新 $f[i][j][0]$
>     2. 填 $A$：可以用前缀中不含 $A$ 的所有状态来更新 $f[i][1][0]$
>     3. 填 $L$：可以用前缀中末尾不超过 $1$ 位 $L$ 的所有状态来更新 $f[i][j][k]$
> - 最终答案。为 $\displaystyle \sum_{j=0}^{1}\sum_{k=0}^{2}f[n-1][j][k]$。
>
> 时间复杂度：$\Theta (6n)$

```cpp []
class Solution {
public:
    int checkRecord(int n) {
        const int mod = 1e9 + 7;

        // f[i][j][k]表示从左往右构造第i位时，s[0:i]中含有j个A且尾部含有连续k个L时的方案数
        int f[n][2][3];
        memset(f, 0, sizeof f);

        // 初始化
        f[0][0][0] = f[0][1][0] = f[0][0][1] = 1;

        // 转移
        for (int i = 1; i < n; i++) {
            // s[i]填P
            for (int j = 0; j <= 1; j++) {
                for (int k = 0; k <= 2; k++) {
                    f[i][j][0] = (f[i][j][0] + f[i - 1][j][k]) % mod;
                }
            }
            // s[i]填A
            for (int k = 0; k <= 2; k++) {
                f[i][1][0] = (f[i][1][0] + f[i - 1][0][k]) % mod;
            }
            // s[i]填L
            for (int j = 0; j <= 1; j++) {
                for (int k = 1; k <= 2; k++) {
                    f[i][j][k] = (f[i][j][k] + f[i - 1][j][k - 1]) % mod;
                }
            }
        }

        // 计算答案
        int res = 0;
        for (int j = 0; j <= 1; j++) {
            for (int k = 0; k <= 2; k++) {
                res = (res + f[n - 1][j][k]) % mod;
            }
        }
        return res;
    }
};
```

```python []
class Solution:
    def checkRecord(self, n: int) -> int:
        mod = int(1e9 + 7)
        f = [[[0, 0, 0] for _ in range(2)] for _ in range(n)]
        f[0][0][0] = f[0][1][0] = f[0][0][1] = 1
        for i in range(1, n):
            # P
            for j in range(2):
                for k in range(3):
                    f[i][j][0] = (f[i][j][0] + f[i - 1][j][k]) % mod
            # A
            for k in range(3):
                f[i][1][0] = (f[i][1][0] + f[i - 1][0][k]) % mod
            # L
            for j in range(2):
                for k in range(1, 3):
                    f[i][j][k] = (f[i][j][k] + f[i - 1][j][k - 1]) % mod
        res = 0
        for j in range(2):
            for k in range(3):
                res = (res + f[n - 1][j][k]) % mod
        return res
```

### 【区间dp】对称山脉

https://www.acwing.com/problem/content/5169/

模拟，时间复杂度 $O(n^3)$

```cpp
#include <iostream>
#include <cmath>

using namespace std;

const int N = 5010;

int n;
int a[N];

int main() {
    cin >> n;
    
    for (int i = 1; i <= n; i++)
        cin >> a[i];
    
    // 枚举区间长度
    for (int len = 1; len <= n; len++) {
        int res = 2e9;
        // 枚举相应长度的所有区间
        for (int i = 1, j = i + len - 1; j <= n; i++, j++) {
            // 计算区间的不对称值
            int l = i, r = j;
            int sum = 0;
            while (l < r) {
                sum += abs(a[l] - a[r]);
                l++, r--;
            }
            res = min(res, sum);
        }
        cout << res << ' ';
    }
    
    return 0;
}
```

dp优化，时间复杂度 $O(n^2)$

```cpp
#include <iostream>
#include <cmath>
#include <cstring>

using namespace std;

const int N = 5010;

int n;
int a[N];

int dp[N][N]; // dp[i][j] 表示第 i 到 j 的不对称值
int res[N];   // res[len] 表示长度为 len 的山脉的最小不对称值 

int main() {
    cin >> n;
    
    for (int i = 1; i <= n; i++)
        cin >> a[i];
    
    memset(res, 0x3f, sizeof res);
    
    // 长度为 1 的情况
    res[1] = 0;
    
    // 长度为 2 的情况
    for (int i = 1, j = i + 1; j <= n; i++, j++) {
        dp[i][j] = abs(a[i] - a[j]);
        res[2] = min(res[2], dp[i][j]);
    }
    
    // 长度 >= 3 的情况 
    for (int len = 3; len <= n; len++) {
        for (int i = 1, j = i + len - 1; j <= n; i++, j++) {
            dp[i][j] = dp[i + 1][j - 1] + abs(a[i] - a[j]);
            res[len] = min(res[len], dp[i][j]);
        }
    }
    
    for (int i = 1; i <= n; i++)
        cout << res[i] << ' ';
    
    return 0;
}
```

### 【状压dp】Avoid K Palindrome :fire:

https://atcoder.jp/contests/abc359/tasks/abc359_d

> 题意：给定一个长度为 $n\le 1000$ 的字符串 $s$ 和一个整数 $k\le10$，其中含有若干个 `'A'`,`'B'` 和 `'?'`。其中 `'?'` 可以转化为 `'A'` 或 `'B'`，假设有 $q$ 和 `'?'`，则一共可以转化出 $2^q$ 个不同的 $s$。问所有转化出的 $s$ 中，有多少是不含有长度为 $k$ 的回文子串的。
>
> 思路：最暴力的做法就是 2^q 枚举所有可能的字符串，然后再 O(n) 的检查，这样时间复杂度为 $O(n2^n)$，只能通过 20 以内的数据。一般字符串回文问题可以考虑 dp。
>
> 时间复杂度：

```cpp

```
