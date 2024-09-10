---
title: hashing
categories: Algorithm
category_bar: true
---

### 哈希

### 【哈希】分组

https://www.acwing.com/problem/content/5182/

> 存储不想同组和想同组的人员信息：存入数组，数据类型为一对字符串
>
> 存储所有的组队信息：存入哈希表，数据类型为“键:字符串”“值:一对字符串”
>
> 想要知道最终的分组情况，只需要查询数组中的队员情况与想同组 or 不想同组的成员名字是否一致即可
>
> 时间复杂度 $O(n)$，空间复杂度 $O(n\ len(name))_{max}$

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main()
{
    int x;
    cin >> x;
    
    vector<pair<string, string>> X(x);
    
    for (int i = 0; i < x; i ++)
        cin >> X[i].first >> X[i].second;
    
    int y;
    cin >> y;
    
    vector<pair<string, string>> Y(y);
    
    for (int i = 0; i < y; i ++)
        cin >> Y[i].first >> Y[i].second;
        
    int sum;
    cin >> sum;
    
    unordered_map<string, pair<string, string>> a;
    
    for (int i = 0; i < sum; i ++)
    {
        string s, t, p;
        cin >> s >> t >> p;
        a[s] = {t, p};
        a[t] = {s, p};
        a[p] = {s, t};
    }
    
    int res = 0;
    
    // 想同组 
    for (int i = 0; i < x; i ++)
    {
        string s = X[i].first, t = X[i].second;
        if (a[s].first != t && a[s].second != t)
            res ++;
    }
    
    // 不想同组 
    for (int i = 0; i < y; i ++)
    {
        string s = Y[i].first, t = Y[i].second;
        if (a[s].first == t || a[s].second == t)
            res ++; 
    }
    
    cout << res << endl; 
    
    return 0;
}
```

### 【哈希】海港

https://www.luogu.com.cn/problem/P2058

> - 题意：给定 n 艘船只的到达时间、载客信息（载客人数和每一个客人的国籍），现在需要知道对于每一艘抵达的船只，前 24 小时中抵达的客人的国籍总数
> - 思路：本题思路很简单，就是一个队列的应用以及哈希客人国籍的过程。由于船只抵达的时间是顺序增加的，故每抵达一艘船只，就对新来的客人国籍进行哈希，为了计算前 24 小时的情况，需要对船只抵达队列进行删减，即只保留 24 小时以内的船只抵达信息。对于删除的船只信息，需要将这些船只上的客人国籍信息从哈希表中删除，故每一艘船只的访问次数为 2。
> - `unordered_map `补充：在进行哈希统计时。为了判断当前 24 小时内客人国籍数，在删除哈希记录时，为了判断是否将当前国籍的游客全部删除时，需要统计哈希表中某个国籍是否减为了 0，我用了 `.count(x)` 内置方法，但这是不正确的，因为我想要统计的是 值 是否为 0，而 `.count(x)` 统计的是哈希表中 x 这个 键 的个数，而 `unordered_map `中是没有重复的键的，故 `.count(x)` 方法只会返回 0 或 1，返回 0 就表示当前哈希表中没有 x 这个键，返回 1 就表示哈希表中有 x 这个键，但是有这个键不代表对应的值就存在，可能是 `x: 0` 的情况，即键存在，但是值记录为 0
> - 时间复杂度：$O(2 \sum x_i)$ - 即两倍的所有游客数

```cpp
// #include <bits/stdc++.h>
// #define int long long
#include <iostream>
#include <unordered_map>
#include <stack>
#include <queue>
using namespace std;

const int N = 1e5 + 10;

struct Ship { int idx, t; };

int n;
queue<Ship> q;
vector<int> G[N];
unordered_map<int, int> cnt;
int kind;

void solve() {
    cin >> n;

    for (int i = 1; i <= n; i++) {
        int t, num;
        cin >> t >> num;
        
        q.push({i, t});
        
        // 哈希
        while (num--) {
            int id;
            cin >> id;
            
            if (!cnt[id]) kind++;
            cnt[id]++;
            G[i].push_back(id);
        }
        
        // 去哈希
        Ship h = q.front();
        while (t - h.t >= 86400) {
            for (auto& id: G[h.idx]) {
                cnt[id]--;
                if (!cnt[id]) kind--;
            }
            q.pop();
            h = q.front();
        }
        
        cout << kind << "\n";
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

### 【哈希】Cities and States S

https://www.luogu.com.cn/problem/P3405

> 题意：给定 n 个字符串，每一个字符串归属一个集合，现在需要统计字符串与集合名相反相等的对数
>
> 思路：很显然的哈希计数。难点有两个，如何哈希？如何计数？哈希可以采用扩展字符的方法进行，即第一个字符乘某一个较大的质数再加上第二个字符。此处采用一种较为巧妙的方法，直接将两个字符串与集合名加起来进行唯一性哈希，降低编码难度。计数有两种方式，第一种就是全部哈希结束之后，再遍历哈希表进行统计，最后将结果除二即可。第二种就是边哈希边计数，遇到相反相等的就直接计数，这样就不会重复计数了，也很巧妙
>
> 时间复杂度：$O(n)$

```cpp
#include <iostream>
#include <algorithm>
#include <unordered_map>
#include <stack>
#include <queue>
#include <set>
using namespace std;

int n;
unordered_map<string, int> a;

void solve() {
    cin >> n;
    
    int res = 0;
    
    while (n--) {
        string s, t;
        cin >> s >> t;
        s = s.substr(0, 2);
        res += a[t + " " + s] * (s != t);
        a[s + " " + t]++;
    }
    
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

### 【哈希/枚举/思维】Torn Lucky Ticket

https://codeforces.com/contest/1895/problem/C

> 题意: 给定一个长度为 n 的字符串数组 nums, 数组的每一个元素长度不超过 5 且仅由数字组成. 问能找到多少对 $(i,j)$ 可以使得拼接后的 $nums[i]+nums[j]$ 长度为偶数且左半部分的数字之和与右半部分的数字之和相等.
>
> 思路: 
>
> - 首先最暴力的做法就是 $O(n^2)$ 枚举,所有的 $(i,j)$ 然后 check 合法性.
>
> - 尝试优化掉第二层的枚举循环. 对于第二层循环, 我们就是要寻找合适的 $nums[j]$ 并和当前的 $nums[i]$ 拼接. 显然我们可以通过扫描当前的 $nums[i]$ 并 $O(1)$ 的计算出所有 $len(nums[j])\le len(nums[i])$ 且可以和 $nums[i]$ 匹配的字符串的 `[长度][数字和]` 信息, 只需要一个二维数组预存储每一个字符串的 **长度** **数字和** 信息即可.
>
> - 那么对于 $len(nums[j])> len(nums[i])$ 的情况如何统计呢. 显然此时我们没法 $O(1)$ 的检查 $nums[i]+nums[j]$ 的合法性. 不妨换一个角度, 当我们枚举 $nums[i]$ 时:
>     $$
>     \text{统计右侧拼接长度更大的 nums[j] 的合法情况数} \iff \text{统计左侧拼接长度更小的 nums[j] 的合法情况数}
>     $$
>     于是合法情况数就可以表示为 $\displaystyle \sum_{i=0}^{n-1}\big[\text{cond}_1(nums[i])+\text{cond}_2(nums[i])\big]$, 其中第一种情况 $\text{cond}_1$ 就是统计右侧拼接长度更小的字符串数量, 第二种情况 $\text{cond}_1$ 就是统计左侧拼接长度更小的字符串数量. 这两步可以同时计算.
>
> 时间复杂度: $O(n)$

```python
from typing import List, Tuple, Dict, Optional
from collections import defaultdict, deque
from itertools import combinations, permutations
import math, heapq, queue

II = lambda: int(input())
FI = lambda: float(input())
MII = lambda: tuple(map(int, input().split()))
LII = lambda: list(map(int, input().split()))
LSI = lambda: list(map(str, input().split()))

def solve() -> Optional:
    n, nums = II(), LSI()
    
    f = [[0 for _ in range(46)] for _ in range(6)]
    for num in nums:
        m = len(num)
        s = sum([int(c) for c in num])
        f[m][s] += 1
    
    res = 0
    for num in nums:
        m = len(num)
        s = [0] * (m + 1)
        for i in range(m - 1, -1, -1):
            s[i] = s[i + 1] + int(num[i])
        
        # cond1: now + right -> len(now) >= len(right)
        for i in range(m - 1, -1, -1):
            now_len, now_sum = i + 1, s[0] - s[i + 1]
            r_len, r_sum = now_len - (m - 1 - i), now_sum - s[i + 1]
            if 1 <= r_len <= now_len and r_sum >= 0:
                res += f[r_len][r_sum]
        
        # cond2: left + now -> len(left) < len(now)
        for i in range(m):
            now_len, now_sum = m - i, s[i]
            l_len, l_sum = now_len - i, now_sum - (s[0] - s[i])
            if 1 <= l_len < now_len and l_sum >= 0:
                res += f[l_len][l_sum]
    
    return res

if __name__ == '__main__':
    OUTs = []
    N = 1
    # N = II()
    for _ in range(N):
        OUTs.append(solve())
    print('\n'.join(map(str, OUTs)))
```