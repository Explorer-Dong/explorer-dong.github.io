---
title: 基础算法
---

本文精选一些「基础算法」的例题并进行详细的原理讲解与代码实现。

算法标签主要是「贪心、前缀和与差分、二分、搜索、分治」。题目来源主要是 Codeforces、洛谷、LeetCode。

## 导读

为了提升阅读效率，我将题目的重要元信息单独罗列为了一张表格，可以按照自己的实际需求按需跳转阅读。

| 标签 🏷 |  难度 🔥  |                     链接 🔗                     |     锚点 ⚓     | 备注 ⭐ |
| :--: | :----: | :---------------------------------------------: | :----------: | :--: |
| 贪心 | CF 800 | [CF](https://codeforces.com/contest/1873/problem/B) | [Good Kid](#good-kid) | / |
| 贪心、分讨 | CF 1500 | [CF](https://codeforces.com/contest/1873/problem/G) | [ABBC or BACB](#abbc-or-bacb) | / |
| 贪心、堆 | CF 1200 * | [蓝桥](https://www.lanqiao.cn/problems/5889/learning/?contest_id=145) | [通关](#通关) | / |
| 贪心、树、最短路 | CF 1400 * | [蓝桥](https://www.lanqiao.cn/problems/5890/learning/?contest_id=145) | [串门](#串门) | 树的直径 |
| 贪心 | CF 1200 * | [Vijos](https://vijos.org/d/nnu_contest/p/1532) | [Codeforces rating](#codeforces-rating) | 相邻交换验证最优 |
| 贪心、递推 | 洛谷 黄 | [洛谷](https://www.luogu.com.cn/problem/P5019) | [铺设道路](#铺设道路) | 从边界开始考虑 |
| 贪心、枚举 | CF 1300 * | [AcWing](https://www.acwing.com/problem/content/5483/) | [截断数组](#截断数组) | 前缀和性质推广 |
| 贪心、构造 | CF 1300 * | [力扣](https://leetcode.cn/problems/maximum-binary-string-after-change/description/) | [修改后的最大二进制字符串](#修改后的最大二进制字符串) | / |
| 贪心 | CF 1800 * | [力扣](https://leetcode.cn/problems/maximum-elegance-of-a-k-length-subsequence/) | [子序列最大优雅度](#子序列最大优雅度) | 反悔贪心 |
| 贪心、位运算、分讨 | 洛谷 绿 | [洛谷](https://www.luogu.com.cn/problem/P2114) | [起床困难综合症](#起床困难综合症) | 按位贪心 |
| 差分 | CF 1500 * | [AcWing](https://www.acwing.com/problem/content/description/102/) | [增减序列](#增减序列) | / |
| 二分 | 洛谷 黄 | [洛谷](https://www.luogu.com.cn/problem/P2440) | [木材加工](#木材加工) | / |
| 二分、前缀和、双指针 | CF 1300 * | [AcWing](https://www.acwing.com/problem/content/5562/) | [摆放棋子](#摆放棋子) | / |
| 二分、贪心 | CF 1400 * | [AcWing](https://www.acwing.com/problem/content/description/5569/) | [盖楼](#盖楼) | 利用集合简化问题 |
| 二分、双指针、哈希 | CF 1700 * | [力扣](https://leetcode.cn/problems/find-the-median-of-the-uniqueness-array/) | [找出唯一性数组的中位数](#找出唯一性数组的中位数) | 枚举右维护左 |
| 二分 | CF 1900 | [CF](https://codeforces.com/contest/1996/problem/F) | [bomb](#bomb) | 跳脱二分答案思维定势 |
| 二分、图论 | 洛谷 绿 | [洛谷](https://www.luogu.com.cn/problem/P1525) | [关押罪犯](#关押罪犯) | / |

/// caption | <
基础算法例题导读表（打 * 表示自己预估的难度）
///

## 题解

### Good Kid

题意：给定一个含有 $n\ (1\le n \le 9)$ 个数的数列，现在可以选择其中的任意一个数使其 $+1$。问如何选择这个数，可以使得修改后的数列中的所有数之积的值最大。输出这个最大值。

思路：无论选择哪个数 $+1$，其实就是选择 $n-1$ 个数的乘积增加一倍。为了最大化结果，那自然就是选择最大的 $n-1$ 个数使其乘积翻倍，那么就是选择数列中的最小值使其 $+1$ 即可。

时间复杂度：$O(n)$

=== "C"

    ```c
    #include <stdio.h>
    #include <stdlib.h>
    
    void solve() {
        int n;
        scanf("%d", &n);
    
        int *a = (int*)malloc(n * sizeof(int));
        for (int i = 0; i < n; i++) {
            scanf("%d", &a[i]);
        }
    
        int min_index = 0;
        for (int i = 1; i < n; i++) {
            if (a[i] < a[min_index]) {
                min_index = i;
            }
        }
    
        a[min_index] += 1;
        
        int ans = 1;
        for (int i = 0; i < n; i++) {
            ans *= a[i];
        }
    
        printf("%d\n", ans);
    
        free(a);
    }
    
    int main() {
        int T;
        scanf("%d", &T);
        while (T--) {
            solve();
        }
    }
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <vector>
    
    void solve() {
        int n;
        std::cin >> n;
        std::vector<int> a(n);
        for (int i = 0; i < n; i++) {
            std::cin >> a[i];
        }
    
        int min_index = 0;
        for (int i = 1; i < n; i++) {
            if (a[i] < a[min_index]) {
                min_index = i;
            }
        }
    
        a[min_index] += 1;
    
        int ans = 1;
        for (int i = 0; i < n; i++) {
            ans *= a[i];
        }
        
        std::cout << ans << "\n";
    }
    
    int main() {
        std::ios::sync_with_stdio(0);
        std::cin.tie(0);
    
        int T;
        std::cin >> T;
        while (T--) {
            solve();
        }
    }
    ```

=== "Java"

    ```java
    import java.util.Scanner;
    import java.util.ArrayList;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            int T = sc.nextInt();
            while (T-- > 0) {
                solve(sc);
            }
            sc.close();
        }
    
        public static void solve(Scanner sc) {
            int n = sc.nextInt();
            ArrayList<Integer> a = new ArrayList<>(n);
            for (int i = 0; i < n; i++) {
                a.add(sc.nextInt());
            }
    
            int min_index = 0;
            for (int i = 1; i < n; i++) {
                if (a.get(i) < a.get(min_index)) {
                    min_index = i;
                }
            }
    
            a.set(min_index, a.get(min_index) + 1);
    
            int ans = 1;
            for (int i = 0; i < n; i++) {
                ans *= a.get(i);
            }
    
            System.out.println(ans);
        }
    }
    ```

=== "Python"

    ```python
    T = int(input())
    for _ in range(T):
        n = int(input())
        a = list(map(int, input().split()))
    
        a[a.index(min(a))] += 1
    
        ans = 1
        for num in a:
            ans *= num
        print(ans)
    ```

=== "JavaScript"

    ```javascript
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let inputs = []
    let idx = 0;
    
    rl.on('line', (line_data) => {
        inputs.push(line_data);
    });
    
    rl.on('close', () => {
        let T = inputs[idx++];
        while (T--) {
            solve();
        }
    });
    
    function solve() {
        let n = inputs[idx++];
        let a = inputs[idx++].split(' ').map(Number);
    
        const min_index = a.indexOf(Math.min(...a));
        a[min_index] += 1;
    
        let ans = 1;
        for (const num of a) {
            ans *= num;
        }
    
        console.log('%d', ans);
    }
    ```

### ABBC or BACB

题意：现在有一个由 A 和 B 两种字符组成的字符串 $s\ (1\le|s|\le2\cdot 10^5)$。操作一，可以将 AB 转化为 BC；操作二，可以将 BA 转化为 CB。问最多可以执行上述操作多少次。给出最多操作次数。

思路：

- 从题面可以看出，本题的两种操作都可以看做是对 B 字符的移动，操作一是向左移动，操作二是向右移动，并且只能单方向移动。有了这个性质，题目就转化为了怎么选择每一个 B 字符的移动方向可以尽可能多的经过 A 字符；
- 不难发现，如果字符串的边缘有 B 字符或者有至少两个连续的 B 字符，就一定可以将所有的 A 字符都经过。反之，就是单独的 B 字符将一个完整的 A 串切割开来的情景（特判没有 B 字符切割 A 字符的情况），此时就是小学学到的线段模型。由于线段一定比端点多一份，为了最大化经过的 A 字符数量，选择长度最短的 A 子串不经过即可。

时间复杂度：$O(n)$

=== "Python"

    ```python
    T = int(input())
    for _ in range(T):
        s = input()
        if s.count('BB') or s[0] == 'B' or s[-1] == 'B':
            print(s.count('A'))
        elif s.count('A') == len(s):
            print(0)
        else:
            ans = s.count('A')
            sub_length = len(s)  # 最短 A 串长度
            i = 0
            while i < len(s):
                if s[i] == 'A':
                    j = i
                    while j < len(s) and s[j] == 'A':
                        j += 1
                    sub_length = min(sub_length, j - i)
                    i = j
                else:
                    i += 1
            ans -= sub_length
            print(ans)
    ```

### 通关

题意：给定一棵含有 $n$ 个结点的树和一个初始价值，树中每个结点代表一个关卡，每个关卡有「通过最低需求价值」和「通过奖励价值」两个属性。只有通过了父结点关卡才能继续挑战子结点关卡。现在从根结点开始尝试通关，问应该如何选择通关顺序使得通过的关卡数最多？给出最多通关的关卡数。

思路：我们每次贪心地选择需求价值最小的关卡进行闯关即可。可以通过二叉堆数据结构来实现。

时间复杂度：$O(n \log n)$

=== "Python"

    ```python
    from heapq import *
    
    n, have = tuple(map(int, input().split()))
    g = [[] for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        fa, get, need = tuple(map(int, input().split()))
        g[fa].append((need, -get, i))
    
    ans = 0
    h = [g[0][0]]
    while len(h):
        need, neg_get, now = heappop(h)
        if have < need:
            break
        have += -neg_get
        ans += 1
        for ch in g[now]:
            heappush(h, ch)
    
    print(ans)
    ```

### 串门

题意：给定一棵边权为正的无向树，共有 $n\ (1\le n \le 10^5)$ 个结点。给出「在访问到树中每一个结点」情况下的最短路径长度。

思路：

- 不难发现一个性质。对于访问的起点与终点，路径总长度一定是「起点到终点的简单路径长度」+「所有分支路径长度的两倍」，等价于「所有边之和的两倍」-「起点到终点的简单路径长度」；
- 有了上述的性质，为了最小化总路径长度，我们只需要找到简单距离最长的两个结点作为起点与终点即可，这里的简单路径其实就是「树的直径」；
- 为了求解树的直径，我们首先需要确定直径的两个端点。容易证明，每遍历一次树即可确定直径的一个端点。

时间复杂度：$O(n)$

=== "Python"

    ```python
    from collections import deque
    
    n = int(input())
    g = [[] for _ in range(n + 1)]
    
    ans = 0
    for _ in range(n - 1):
        u, v, w = tuple(map(int, input().split()))
        g[u].append((v, w))
        g[v].append((u, w))
        ans += w << 1
    
    def bfs(u: int) -> tuple[int, int]:
        dst = [0] * (n + 1)
        vis = [False] * (n + 1)
        q = deque()
        dst[u] = 0
        vis[u] = True
        q.append(u)
        while len(q):
            u = q.popleft()
            for v, w in g[u]:
                if vis[v]:
                    continue
                dst[v] = dst[u] + w
                vis[v] = True
                q.append(v)
        max_d = max(dst)
        max_i = dst.index(max_d)
        return max_d, max_i
    
    _, max_i = bfs(1)
    max_d, _ = bfs(max_i)
    
    print(ans - max_d)
    ```

### Codeforces rating

题意：给定一个含有 $n\ (1 \le n \le 10^5)$ 个数的数列 $P$ 和一个初始值 $R$。现在可以选择数列中任意数量个元素并对 $R$ 执行 $R'\leftarrow \dfrac{3}{4} R + \dfrac{1}{4} P$ 的变换。给出运算后的最大 $R$ 值。

思路：排队打水经典例题。我们将数列升序排序后遍历模拟即可。至于为什么这样贪心最优，可以使用交换法结合归纳法进行证明。具体地，为了让 $R$ 变大，选择的元素一定要比 $R$ 大。如果仅有两个比 $R$ 大的元素 $P_i$ 和 $P_j$，假设可以经过两步运算：

$$
\begin{aligned}
R'&=\frac{3}{4}R+\frac{1}{4}P_i \\
R''&=\frac{3}{4}R'+\frac{1}{4}P_j \\
&=\frac{9}{16}R+\frac{3}{16}P_i+\frac{1}{4}P_j
\end{aligned}
$$

可以看到两个元素对于两次操作后得到的 $R''$ 贡献是不一样的，我们当然希望更大值对应的贡献系数更大，也就是说 $P_j$ 的值应该大于 $P_i$。推而广之，容易发现对于所有能够贡献给 $R$ 的 $P$ 元素，越晚贡献的值对应的「贡献系数」是递增的，因此我们在选择 $P$ 中元素时，按照「值的递增」顺序就是最优的。

时间复杂度：$O(n\log n)$

=== "C++"

    ```c++
    #include <iostream>
    #include <algorithm>
    #include <cmath>
    #include <vector>
    
    int main() {
        int n;
        double r;
        std::cin >> n >> r;
    
        std::vector<int> a(n);
        for (int i = 0; i < n; i++) {
            std::cin >> a[i];
        }
    
        sort(a.begin(), a.end());
    
        for (auto num: a) {
            if (num > r) {
                r = 0.75 * r + 0.25 * num;
            }
        }
    
        std::cout << std::round(r) << "\n";
    
        return 0;
    }
    ```

=== "Python"

    ```python
    n, r = tuple(map(int, input().split()))
    a = list(map(int, input().split()))
    
    a.sort()
    for num in a:
        if num > r:
            r = r * 0.75 + num * 0.25
    print(round(r))
    ```

### 铺设道路

题意：给定一个含有 $n\ (1 \le n \le 10^5)$ 个数序列 $a$，每次操作可以让序列中一个连续区间内所有数 $-1$，前提是区间中的数都要 $>1$。输出将所有的数全部都减到 $0$ 的最小操作次数。

思路：从「边界」开始考虑。定义 $f_i$ 表示序列 $[0,i]$ 全部减到 $0$ 的最小操作次数，那么 $f_i$ 仅仅取决于 $f_{i-1}$ 以及 $a_i$ 和 $a_{i-1}$ 的大小关系。用滚动变量扫描一遍即可。

时间复杂度：$O(n)$

=== "Python"

    ```python
    n = int(input())
    a = list(map(int, input().split()))
    
    ans = a[0]
    for i in range(1, n):
        ans += max(0, a[i] - a[i - 1])
    
    print(ans)
    ```

### 截断数组

题意：定义「平衡数组」为奇偶元素数量相同的数组。给定一个含有 $n\ (1 \le n \le 100)$ 个数的平衡数组 $a$ 和截断总成本，现在需要将该数组截断为尽可能多的子平衡数组，定义截断代价为 $|a_i-a_{i+1}|$。给出最多截断操作次数。

思路：本题最关键的性质就是，假设都是平衡数组，那么也一定是平衡数组，即截断点之间也一定是平衡数组（这与前缀和性质类似）。那么我们就可以直接枚举所有的可截断位置，然后按照代价贪心地升序枚举即可。

时间复杂度：$O(n \log n)$

=== "Python"

    ```python
    n, B = tuple(map(int, input().split()))
    a = list(map(int, input().split()))
    
    odd_cnt, even_cnt = 0, 0
    cuts = []
    for i in range(n):
        if a[i] & 1:
            odd_cnt += 1
        else:
            even_cnt += 1
        if i < n - 1 and odd_cnt == even_cnt:
            cuts.append(abs(a[i + 1] - a[i]))
    
    cuts.sort()
    ans = 0
    for cut in cuts:
        if cut > B:
            break
        B -= cut
        ans += 1
    
    print(ans)
    ```

### 修改后的最大二进制字符串

题意：给定一个 01 字符串 $s\ (1 \le |s| \le 10^5)$，给出任意次下列操作后最大值对应的字符串。

1. $00 \to 10$
2. $10 \to 01$

思路：

- 操作二可以看做将 1 向右移动，这对最终数值大小无益。操作一可以提升数值大小，这是我们希望干的；
- 考虑贪心。显然对于前缀连续的 1 我们没法操作，保留即可。对于从第一个 0 开始的尾串，最佳贪心策略是利用操作二将所有的 0 移动到尾串的最前面，然后再用操作一得到最大尾串。

时间复杂度：$O(n)$

=== "C++"

    ```cpp
    class Solution {
    public:
        string maximumBinaryString(string binary) {
            int n = binary.size();
    
            string res;
    
            // 前缀1全部加入答案
            int i = 0;
            for (i = 0; i < n; i++) {
                if (binary[i] == '0') {
                    break;
                } else {
                    res += '1';
                }
            }
    
            // 非前缀1的部分一定可以操作为 00...011..1，进而转化为 11...11011...1
            int zero = count(binary.begin() + i, binary.end(), '0');
            if (zero > 0) {
                for (int j = 0; j < zero - 1; j++) res += '1';
                res += '0';
            }
    
            while (res.size() < n) res += '1';
    
            return res;
        }
    };
    ```

=== "Python"

    ```python
    class Solution:
        def maximumBinaryString(self, binary: str) -> str:
            ans = ""
    
            # 前缀
            for c in binary:
                if c == '0':
                    break
                ans += '1'
    
            # 尾串
            cnt0 = binary.count('0')
            if cnt0 in [0, 1]:
                return binary
            ans += '1' * (cnt0 - 1) + '0'
            while len(ans) < len(binary):
                ans += '1'
    
            return ans
    ```

### 子序列最大优雅度

题意：给定长度为 $n \ (1\le n \le 10^5)$ 的二元组序列，二元组表示每一个元素的价值与种类。现在需要从中寻找一个长度为 $k$ 的子序列使得该序列「所有物品价值之和 + 物品种类数的平方」的值最大。返回该最大值。

思路：我们采用反悔贪心的思路。首先按照物品本身价值进行降序排序并选择前 $k$ 个物品作为集合 $S$，然后按顺序枚举剩下的物品进行替换决策。当且仅当集合 S 有物品的类别重复且剩下物品的类别不存在于集合 S 中才有可能让答案更大。

时间复杂度：$O(n \log n)$

=== "Python"

    ```python
    class Solution:
        def findMaximumElegance(self, items: List[List[int]], k: int) -> int:
            n = len(items)
            items.sort(key=lambda x: -x[0])
    
            # 贪心
            val, cat = 0, 0
            cnt = [0] * (n + 1)
            rep = []
            for i in range(k):
                v, c = items[i]
                val += v
                cat += cnt[c] == 0
                cnt[c] += 1
                if cnt[c] > 1:
                    rep.append(v)
    
            # 反悔
            ans = val + cat ** 2
            for i in range(k, n):
                v, c = items[i]
                if cnt[c] == 0 and len(rep):
                    val -= rep.pop()
                    val += v
                    cat += 1
                    cnt[c] += 1
                    ans = max(ans, val + cat ** 2)
    
            return ans
    ```

### 起床困难综合症

题意：给定 $n\ (2 \le n \le 10^5)$ 个操作（只可能是「按位与、按位或、按位异或」三种之一）与操作数 $t\ (0 \le t \le 10^9)$，再给定一个范围上界 $m\ (2 \le m \le  10^9)$。现在需要选择一个 $[0,m]$ 的初始值，使得初始值经过这 $n$ 次二元运算后得到的结果最大。输出最大运算结果。

思路：由于三种操作是相邻无关的，因此我们可以按位单独考虑。对于第 $i$ 位，初始值为 $0$ 或 $1$ 在经过 $n$ 次运算后均有可能得到 $0$ 和 $1$，因此我们有 $4$ 种情况需要讨论，每种情况贪心地选择最优即可。而为了让结果最大，我们需要从高位开始枚举，因为当初始值填 $1$ 更优时，如果先填低位，可能会导致高位填不了 $1$ 从而得不到最大的答案值。

时间复杂度：$O(n)$

=== "Python"

    ```python
    n, m = map(int, input().strip().split())
    
    x, y = 0, -1
    for _ in range(n):
        inp = input().strip().split()
        op, t = inp[0], int(inp[1])
        if op == "AND":
            x &= t
            y &= t
        elif op == "OR":
            x |= t
            y |= t
        else:
            x ^= t
            y ^= t
    
    ans, num = 0, 0
    for i in range(30, -1, -1):
        a, b = (x >> i) & 1, (y >> i) & 1
        # 下列四种情况可以简化，为了逻辑清晰性就不简化了
        if a and b:
            ans |= 1 << i
        elif a and not b:
            ans |= 1 << i
        elif not a and b:
            if num | (1 << i) <= m:
                num |= 1 << i
                ans |= 1 << i
        else:
            pass
    
    print(ans)
    ```

### 增减序列

题意：给定一个长度为 $n$ 的数组，每次可以选择一个区间 $[l,r]$，使下标在这个区间内的数都加一或者都减一。求至少需要多少次操作才能使数组中的所有数都一样，并求出在保证最少次数的前提下，最终得到的数组可能有多少种。

思路：

- 区间修改不好切入，将其转化为差分数组的端点修改操作。记原数组为 $s$，差分数组为 $a$，那么「通过区间修改操作让数组中所有的数都一样」就等价于「通过端点修改操作让差分数组中下标在 $[1,n-1]$ 区间的元素 $a_{1\sim n-1}$ 都为 $0$，每次操作贪心地选择 $a_{1\sim n-1}$ 中符号相异的一对元素即可；
- 显然在经过上述端点修改操作后差分数组 $a_{1\sim n-1}$ 不一定恰好全为 $0$，可能会出现某个数不为 $0$ 的情况，记作 $a_i$。此时原数组 $s$ 呈现的大小关系就是 $s_{0\sim i-1}$ 全部相等，$s_{i\sim n-1}$ 全部相等，且后者与前者的差值就是 $a_i$。为了让这两部分相等，就可以通过 $a_i$ 次操作得到 $a_i$ 种不同的最终结果。

时间复杂度：$O(n)$

=== "Python"

    ```python
    n = int(input())
    s = [int(input()) for _ in range(n)]
    
    pos = neg = 0
    for i in range(1, n):
        a = s[i] - s[i - 1]
        if a >= 0:
            pos += a
        else:
            neg += a
    
    print("%d\n%d" % (max(pos, -neg), abs(pos + neg) + 1))
    ```

### 木材加工

题意：给定 $n\ (1\le n \le 10^5)$ 根木头，现在需要将这些木头切成 $k\ (1\le k \le 10^8)$ 段等长的小段，问小段的最大长度是多少。

思路：小段长度越长，可切出的小段就越少，具备单调性，那么直接二分小段长度，找到最大的小段长度值使得可切出的小段个数 $\ge k$ 即可。

时间复杂度：$O(n\log k)$

=== "Python"

    ```python
    n, k = map(int, input().strip().split())
    a = [int(input()) for _ in range(n)]
    
    def chk(v: int) -> bool:
        s = 0
        for x in a:
            s += x // v
        return s >= k
    
    l, r = 0, max(a)
    while l < r:
        mid = (l + r + 1) >> 1
        if chk(mid):
            l = mid
        else:
            r = mid - 1
    
    print(l)
    ```

### 关押罪犯

题意：给定一个含有 $n\ (n\le2\cdot 10^4)$ 个顶点 $m\ (m\le10^5)$ 条边的无向图，没有重边和自环，边权 $w\ (1\le w_i\le 10^9)$ 为正。现在需要将图中所有的顶点分为两部分，使得两部分中最大的边权尽可能小，输出该最小边权。

思路：

- 假设答案是 $m$ 条边中某一条的权重 $w_i$，那么所有权重小于 $w_i$ 的边对应的顶点如何分配无关紧要，我们只关注边权大于 $w_i$ 的边对应的顶点能不能被分到两部分。也就是说我们只关心边权大于 $w_i$ 的边对应的顶点组成的图是否可二分。采用染色法即可快速判定一个图是否可二分。注意这里的可二分的图其实不符合「二分图」的严格定义，因为两个部分的顶点之间可能有连边；
- 由于 $w_i$ 越小需要判断的顶点数就越多，具备二分性。因此我们直接在 $m$ 条边中二分查找最小的符合条件的边即可；

时间复杂度：$O(m\log n)$

本题也可以使用「拓展域并查集」来解决，详情见 [进阶数据结构](./advanced-ds.md/#关押罪犯)

*[二分图]: 又称二部图 (Bipartite Graph)。定义为：节点由两个集合组成，且两个集合内部没有边的图。

=== "Python"

    ```cpp
    from collections import deque
    
    n, m = map(int, input().strip().split())
    edges = [(-1, -1, 0)]  # 下标从 1 开始
    for _ in range(m):
        u, v, w = map(int, input().strip().split())
        edges.append((u, v, w))
    
    edges.sort(key=lambda x: x[2])
    
    # 染色法 check 二分图
    def chk(idx: int) -> bool:
        g = [[] for _ in range(n + 1)]
        for u, v, w in edges[idx + 1:]:
            g[u].append((v, w))
            g[v].append((u, w))
    
        color = [0] * (n + 1)
    
        def bfs(now: int) -> bool:
            color[now] = 1
            q = deque()
            q.append(now)
            while len(q):
                fa = q.popleft()
                for ch, _ in g[fa]:
                    if color[ch] == 0:
                        color[ch] = -color[fa]
                        q.append(ch)
                    elif color[ch] == color[fa]:
                        return False
            return True
    
        for i in range(1, n + 1):
            if color[i] == 0:
                ok = bfs(i)
                if not ok:
                    return False
        return True
    
    l, r = 0, m
    while l < r:
        mid = (l + r) >> 1
        if chk(mid):
            r = mid
        else:
            l = mid + 1
    
    print(edges[r][2])
    ```

### 摆放棋子

题意：给定一个长度为 $n\ (1\le n \le 3\cdot 10^5)$ 的二进制序列，现在可以将序列中 $0$ 转成 $1$。问在转换次数不超过 $k\ (0\le k\le n)$ 的情况下，最长连续 $1$ 序列的长度与对应的序列是什么。

思路：首先不难发现，连续 1 序列越长需要的转换次数就越多，因此可以二分答案。在 check 时，如果想要线性判定一个长度是否合法，可以借助前缀和与滑动窗口来实现。

时间复杂度：$O(n \log n)$

=== "Python"

    ```python
    n, k = map(int, input().strip().split())
    a = list(map(int, input().strip().split()))
    
    s = [a[0]] + [0] * (n - 1)
    for i in range(1, n):
        s[i] = s[i - 1] + a[i]
    
    def chk(v: int) -> tuple[bool, int, int]:
        i, j = 0, v - 1
        while j < n:
            need = (j - i + 1) - (s[j] - (s[i - 1] if i else 0))
            if need <= k:
                return True, i, j
            i += 1
            j += 1
        return False, -1, -1
    
    l, r = 0, n
    while l < r:
        mid = (l + r + 1) >> 1
        if chk(mid)[0]:
            l = mid
        else:
            r = mid - 1
    
    cond, i, j = chk(r)
    if cond:
        for p in range(i, j + 1):
            a[p] = 1
    
    print(r)
    print(' '.join(map(str, a)))
    ```

### 盖楼

题意：给定 $n,m,x,y\ (1\le n,m\le10^9,2\le x,y< 30000)$，其中 $x$ 和 $y$ 均为质数。现在有一个排列数数组，需要将数组中的部分数字分配给两个人。其中一个人需要 $n$ 个数且不允许给它能被 $x$ 整除的数，另一个人需要 $m$ 个数且不允许给它能被 $y$ 整除的数。问这个排列数数组的大小最小是多少。

思路：假设排列数共有 $h$ 个，两个人分别叫 $A$ 和 $B$。由于 $x$ 和 $y$ 均为质数，那么 $[1,h]$ 中能被 $x$ 和 $y$ 整除的数一定呈现下图中有部分交集或没有交集的情况。一种贪心的分配策略就是，优先将 $B$ 不需要的数分配给 $A$，然后再从 $h-p-q+a$ 中分配，对 $B$ 也是如此。又由于 $h$ 越大，可分配的数字就越多，为了找到最小的 $h$ 我们二分答案即可。

![集合关系](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250225154154468.png)

/// fc
集合关系
///

时间复杂度：$O(\log n)$

=== "Python"

    ```python
    n, m, x, y = map(int, input().strip().split())
    
    def chk(h: int) -> bool:
        p = h // x
        q = h // y
        a = h // (x * y)
        return h - p - q + a < max(0, n - (q - a)) + max(0, m - (p - a))
    
    l, r = 0, 10**15
    while l < r:
        mid = (l + r) >> 1
        if chk(mid):
            l = mid + 1
        else:
            r = mid
    
    print(l)
    ```

### 找出唯一性数组的中位数

题意：给定一个数组，返回其「唯一性数组」的中位数。如果唯一性数组有奇数个元素，则返回中间元素，如果有偶数个元素，则返回两个中间元素中较小的那个。唯一性数组定义为：原数组的所有非空子数组中「不同元素的个数」组成的序列。

思路：

- 首先根据题意可以明确的计算出这个唯一性数组的元素个数 $tot$。假设原数组有 $n$ 个元素，则其唯一性数组一定有 $tot=\dfrac{(1+n) \cdot n}{2}$ 个元素，且最小值一定是 $1$，最大值 $\le n$。最暴力的做法就是 $O(n^3)$ 的维护出这个唯一性数组然后返回其中位数，但这对于 $10^5$ 级别的数据显然是不合适的。观察其他性质；
- 不难发现，如果数组中「不同元素的个数」越多，那么满足条件的子数组数量就越少，具备单调性。又由于最终的答案一定在 $[1,n]$ 区间内，我们直接二分查找即可。对于一个给定的「不同元素的个数」值，记作 $x$，check 条件就是判断是否刚好有 $\lceil \dfrac{tot}{2} \rceil$ 个子数组的不同元素个数 $\le x$ 或者 $\ge x$。为了在线性时间复杂度内 check，我们利用哈希表，采用枚举右维护左的思路统计合法子数组的个数即可；
- 值得注意的是，由于需要在唯一性数组含有偶数个元素时返回较小的那一个，我们套用闭区间二分找左边界的板子。

时间复杂度：$O(n\log n)$

=== "C++"

    ```cpp
    class Solution {
    public:
        int medianOfUniquenessArray(vector<int>& nums) {
            using ll = long long;
            int n = nums.size();
    
            ll tot = 1ll * (1 + n) * n / 2;
            int ma = *max_element(nums.begin(), nums.end());
            int f[ma + 1];
            memset(f, 0, sizeof f);
    
            // 双指针 check
            auto chk = [&](int upper) -> bool {
                ll cnt = 0;
                int size = 0;  // 哈希表大小
                for (int l = 0, r = 0; r < n; r++) {
                    size += f[nums[r]] == 0;
                    f[nums[r]]++;
                    while (size > upper) {
                        --f[nums[l]];
                        size -= f[nums[l]] == 0;
                        l++;
                    }
                    // 此时以 nums[r] 结尾且 l 为左边界的所有子数组的不同元素的数量均 <= upper
                    cnt += r - l + 1;
                }
                memset(f, 0, sizeof f);
                return cnt >= (tot + 1) / 2;  // 上取整写法
            };
    
            int l = 1, r = n;
            while (l < r) {
                int mid = (l + r) >> 1;
                if (chk(mid)) r = mid;
                else l = mid + 1;
            }
            return r;
        }
    };
    ```

=== "Python"

    ```python
    class Solution:
        def medianOfUniquenessArray(self, nums: List[int]) -> int:
            n = len(nums)
            ma = max(nums)
            tot = (1 + n) * n // 2
    
            def chk(v: int) -> bool:
                f = [0] * (ma + 1)
                uni = 0  # 子数组中不同元素的个数
                cnt = 0  # 不同元素的个数 <= v 的子数组个数
                i = 0
                for j in range(n):
                    f[nums[j]] += 1
                    uni += f[nums[j]] == 1
                    while uni > v:
                        f[nums[i]] -= 1
                        uni -= f[nums[i]] == 0
                        i += 1
                    cnt += j - i + 1
                return cnt >= (tot + 1) >> 1
    
            l, r = 1, n
            while l < r:
                mid = (l + r) >> 1
                if chk(mid):
                    r = mid
                else:
                    l = mid + 1
    
            return l
    ```

### Bomb

题意：给定两个长度为 $n\ (1\le n \le 2\cdot10^5)$ 的序列 $a,b\ (1\le a_i,b_i\le 10^9)$ 以及最大操作次数 $k\ (1\le k\le 10^9)$，问在不超过最大操作次数的情况下，最多可以获得多少收益？收益的计算方法为：每次选择 $a$ 中一个数 $a_i$ 加入收益并将 $a_i$ 减去 $b_i$ 直到为 $0$。

思路：

- 首先显然我们有一个朴素但正确的贪心，就是我们每次操作时选择 $a$ 中的最大值进行计数并对其修改，但是显然 $O(kn)$ 会超时，采用堆可以优化到 $O(k\log n)$，还是会超时，考虑优化；
- 正难则反，操作次数越多收益一定越大（或不变）具备单调性，可以二分。我们直接二分最大收益值并 check 对应的操作次数是否即可，吗？这也是本题的难点所在。如果我们按照常规的思路直接二分答案，可以发现 check 的逻辑和原题一样，没法做到线性 check；
- 但是操作次数越多收益一定越大（或不变）这个单调性是一定存在的，我们直接二分最大收益的本质是想要计算一个局面下的操作次数从而判断是否可以获得那么多收益。如果我们能够通过其他局面线性地 check 出操作次数与收益，也就能实现相同的效果。因此我们要 **跳脱出二分答案的思维定势**，二分「元素选择的阈值下界」，我们将这个下界记作 lower。对于当前局面的 lower，我们可以很容易的线性计算出操作次数与收益，并且 lower 越小，操作次数就越多，可以获得的收益也就越大；
- 本题还有一个注意点就是二分的边界与收益计算问题。为了保证当前 lower 局面下的操作次数不会超过 $k$，需要确保二分右边界比 $a$ 中最大值还要大。同时对于最终的二分出来的 lower 与对应的操作次数 $cnt$，我们还有 $k-cnt$ 次剩余的操作机会，这些剩余的操作机会一定可以选择 $a$ 中值恰好为 $lower-1$ 的元素。

时间复杂度：$O(n\log 10^9)$

=== "Python"

    ```python
    T = int(input())
    OUTs = []
    for _ in range(T):
        n, k = map(int, input().strip().split())
        a = list(map(int, input().strip().split()))
        b = list(map(int, input().strip().split()))
    
        def chk(v: int):
            cnt = val = 0
            for i in range(n):
                if a[i] < v:
                    continue
                x = (a[i] - v) // b[i] + 1  # 操作次数
                cnt += x
                val += x * a[i] + x * (x - 1) // 2 * (-b[i])
            val += max(0, k - cnt) * (v - 1)
            return cnt > k, val
    
        l, r = 1, 10**9 + 1
        while l < r:
            mid = (l + r) >> 1
            if chk(mid)[0]:
                l = mid + 1
            else:
                r = mid
    
        OUTs.append(chk(l)[1])
    
    print("\n".join(map(str, OUTs)))
    ```

### 【dfs】CCC单词搜索

<https://www.acwing.com/problem/content/5168/>

> 搜索逻辑：分为正十字与斜十字
>
> 更新答案逻辑：需要进行两个条件的约数，一个是是否匹配到了最后一个字母，一个是转弯次数不超过一次
>
> 转弯判断逻辑：
>
>  首先不能是起点开始的
>  对于正十字：如果next的行 & 列都与pre的行和列不相等，就算转弯
>  对于斜十字：如果next的行 | 列有和pre相等的，就算转弯

```cpp
#include <iostream>
#include <algorithm>
#include <cstring>

using namespace std;

const int N = 110;

string s;
int m, n;
char g[N][N];
int res;

// 正十字，a，b为之前的位置，x，y为当前的位置，now为当前待匹配的字母位，cnt为转弯次数
void dfs1(int a, int b, int x, int y, int now, int cnt)
{
    if (g[x][y] != s[now]) return;
    
    if (now == s.size() - 1)
    {
        if (cnt <= 1) res++; 
        return;
    }
    
    int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};
    
    for (int k = 0; k < 4; k ++)
    {
        int i = x + dx[k], j = y + dy[k];
        if (x < 0 || x >= m || y < 0 || y >= n) continue;
        
        // 判断是否转弯（now不是起点 且 pre和next行列均不相等） 
        if (a != -1 && b != -1 && a != i && b != j) dfs1(x, y, i, j, now + 1, cnt + 1);
        else dfs1(x, y, i, j, now + 1, cnt);
    }
}

// 斜十字
void dfs2(int a, int b, int x, int y, int now, int cnt)
{
    if (g[x][y] != s[now]) return;
    
    if (now == s.size() - 1)
    {
        if (cnt <= 1) res++; 
        return;
    }
    
    int dx[] = {-1, -1, 1, 1}, dy[] = {-1, 1, 1, -1};
    
    for (int k = 0; k < 4; k ++)
    {
        int i = x + dx[k], j = y + dy[k];
        if (x < 0 || x >= m || y < 0 || y >= n) continue;
        
        // 判断是否转弯（now不是起点 且 不在同一对角线） 
        if (a != -1 && b != -1 && (a == i || b == j)) dfs2(x, y, i, j, now + 1, cnt + 1);
        else dfs2(x, y, i, j, now + 1, cnt);
    }
}


int main()
{
    cin >> s;
    cin >> m >> n;
    
    for (int i = 0; i < m; i ++)
        for (int j = 0; j < n; j ++)
            cin >> g[i][j];
    
    for (int i = 0; i < m; i ++)
        for (int j = 0; j < n; j ++)
            dfs1(-1, -1, i, j, 0, 0);
    
    for (int i = 0; i < m; i ++)
        for (int j = 0; j < n; j ++)
            dfs2(-1, -1, i, j, 0, 0);
    
    cout << res << "\n";
    
    return 0;
}
```

### 【dfs/二进制枚举】数量

<https://www.acwing.com/problem/content/5150/>

> 题意：给定一个数n，问[1, n]中有多少个数只含有4或7
>
> 思路一：dfs
>
> - 对于一个数，我们可以构造一个二叉搜数进行搜索，因为每一位只有两种可能，那么从最高位开始搜索。如果当前数超过了n就return，否则就算一个答案
> - 时间复杂度：$\Theta(2^{1 + \lg{(\max(a[i])})})$
>
> 思路二：二进制枚举
>
> - 按照数位进行计算。对于一个 x 位的数，1 到 x-1 位的情况下所有的数都符合条件，对于一个 t 位的数，满情况就是 $2^t$ 种，所以 `[1,x-1]` 位就一共有 $2^1 + 2^2 + \cdots + 2^{x - 1} = 2^{x} - 2$ 种情况 。对于第 x 位，采取二进制枚举与原数进行比较，如果小于原数，则答案 +1，反之结束循环输出答案即可

dfs 代码：

```cpp
#include <iostream>
using namespace std;

#define int long long

int n, res;

void dfs(int x) {
    if (x > n) return;
    
    res ++;
    
    dfs(x * 10 + 4);
    dfs(x * 10 + 7);
}

signed main() {
    cin >> n;
    dfs(4);
    dfs(7);
    cout << res << "\n";
    return 0;
}
```

二进制枚举代码：

```cpp
#include <iostream>
using namespace std;

int WS(int x) {
    int res = 0;
    while (x) {
        res++;
        x /= 10;
    }
    return res;
}

int calc(int a[], int ws) {
    int res = 0;
    for (int i = ws - 1; i >= 0; i --) {
        res = res * 10 + a[i];
    }
    return res;
}

int main() {
    int n;
    cin >> n;
    
    int ws = WS(n);
    
    int ans = (1 << ws) - 2;
    
    int a[20] {};
    for (int i = 0; i < (1 << ws); i ++) {
        for (int j = 0; j < ws; j ++) {
            if ((1 << j) & i) {
                a[j] = 7;
            } else {
                a[j] = 4;
            }
        }
        if (calc(a, ws) <= n) {
            ans ++;
        } else {
            break;
        }
    }
    
    cout << ans;
    
    return 0;
}
```

### 【dfs】组合总和

<https://leetcode.cn/problems/combination-sum/>

> 题意：给定一个序列，其中的元素没有重复，问如何选取其中的元素，使得选出的数字总和为指定的数字target，选取的数字可以重复
>
> 思路：思路比较简答，很容易想到用dfs搜索出所有的组合情况，即对于每一个“结点”，我们直接遍历序列中的元素即可。但是由于题目的限制，即不允许合法的序列经过排序后相等。那么为了解决这个约束，我们可以将最终搜索到的序列排序后进行去重，但是这样的时间复杂度会很高，于是我们从搜索的过程切入。观看这一篇题解 [防止出现重复序列的启蒙题解](https://leetcode.cn/problems/combination-sum/solutions/2363929/39-zu-he-zong-he-hui-su-qing-xi-tu-jie-b-9zx7/)，我们提取其中最关键的一个图解
>
> ![subset_sum_i_pruning.png](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407250146195.png)
>
> 可见3，4和4，3的剩余选项（其中可能包含了答案序列）全部重复，因此我们直接减去这个枝即可。不难发现，我们根据上述优化思想，剪枝的操作可以为：让当前序列开始枚举的下标 `idx` 从上一层开始的下标 `i` 开始，于是剪枝就可以实现了。
>
> 时间复杂度：$\Theta \left ( 2^{\frac{n}{\log n}}\right)$

```cpp
class Solution {
public:
    // 答案数组res，目标数组c，目标总和target，答案数组now，当前总和sum，起始下标idx
    void dfs(vector<vector<int>>& res, vector<int>& c, int target, vector<int>& now, int sum, int idx) {
        if (sum > target) {
            return;
        } else if (sum == target) {
            res.emplace_back(now);
            return;
        }
        for (int i = idx; i < c.size(); i++) {
            now.emplace_back(c[i]);
            dfs(res, c, target, now, sum + c[i], i);
            now.pop_back();
        }
    }

    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> now;
        dfs(res, candidates, target, now, 0, 0);
        return res;
    }
};
```

### 【递归】扩展字符串

<https://www.acwing.com/problem/content/5284/>

> 题意：给定一种字符串的构造方式，问构造n次以后的字符串中的第k个字符是什么
>
> 思路：由于构造的方法是基于上一种情况的，很容易可以想到一个递归搜索树来解决。只是这道题有好几个坑，故记录一下。
>
> - 首先说一下搜索的思路：对于当前的状态，我们想要知道第k个位置上的字符，很显然我们可以通过预处理每一种构造状态下的字符串长度得到下一个字符串的长度，于是我们可以在当前的字符串中，通过比对下标与**五段**字符串长度的大小，来确定是继续递归还是直接输出
> - 特判：可以发现，对于 $n=0$ 的情况，我们无法采用相同的结构进行计算，故进行特判，如果当前来到了最初始的字符串状态，我们直接输出相应位置上的字符即可
> - 最后说一下递归终点的设计：与搜索所有的答案情况不同，这道题的答案是唯一的，因此我们在搜索到答案后，可以通过一个 `bool` 变量作为一个标记，表示已经找到答案了，只需要不断回溯直到回溯结束为止，就不需要再遍历其他的分支了
> - **坑：**这道题的坑说实话有点难崩。
>     1. 首先是一个k的大小，是一定要开 `long long` 的，我一开始直接全局宏定义 `int` 为 `long long` 了
>     2. 还有一个坑可能是只要我才会犯的，就是字符串按照下标输出字符的时候，是需要 `-1` 的，闹心的是我有的加了，有的没加，还是debug的时候调出来的
>     3. 最后一个大坑，属于是引以为戒了。就是这句 `len[i] = min(len[i], (int)2e18)`，因为我们~~可以发现~~，抛开那三个固定长度的字符串来说，每一次新构造出来的字符串长度都是上一个字符串长度 $2$ 倍，那么构造 $n$ 次后的字符串长度就是 $s_0$ 长度的 $2^n$ 倍，那么对于 $n$ 的取值范围来说，直接存储长度肯定是不可取的。那么如何解决这个问题呢？方法是我们对 `len[i]` 进行一个约束即可，见代码。最后进行递归比较长度就没问题了。
> - 时间复杂度：$O(n)$ - 由于每一个构造的状态我们都是常数级别的比较，因此相当于一个状态的搜索时间复杂度为 $O(1)$，那么总合就是 $O(n)$

```cpp
#include <bits/stdc++.h>
using namespace std;

#define int long long

int n, k;
string s = "DKER EPH VOS GOLNJ ER RKH HNG OI RKH UOPMGB CPH VOS FSQVB DLMM VOS QETH SQB";
string t1 = "DKER EPH VOS GOLNJ UKLMH QHNGLNJ A";
string t2 = "AB CPH VOS FSQVB DLMM VOS QHNG A";
string t3 = "AB";

// 记录每一层构造出来的字符串 Si 的长度 len，当前递归的层数 i (i>=1)，对于当前层数需要查询的字符的下标 pos
void dfs(vector<int>& len, int i, int pos, bool& ok) {
    // 已经搜到答案了就不断返回
    if (ok) {
        return;
    }

    // 如果还没有搜到答案，并且已经递归到了最开始的一层，就输出原始字符串相应位置的字符即可
    if (!i) {
        cout << s[pos - 1];
        return;
    }

    int l1 = t1.size(), l2 = l1 + len[i - 1], l3 = l2 + t2.size(), l4 = l3 + len[i - 1];
    if (pos <= l1) {
        cout << t1[pos - 1];
        ok = true;
        return;
    } else if (pos <= l2) {
        dfs(len, i - 1, pos - l1, ok);
    } else if (pos <= l3) {
        cout << t2[pos - l2 - 1];
        ok = true;
        return;
    } else if (pos <= l4) {
        dfs(len, i - 1, pos - l3, ok);
    } else {
        cout << t3[pos - l4 - 1];
        ok = true;
        return;
    }
}

void solve() {
    cin >> n >> k;

    vector<int> len(n + 10);
    len[0] = s.size();

    for (int i = 1; i <= n; i++) {
        len[i] = 2 * len[i - 1] + t1.size() + t2.size() + t3.size();
        len[i] = min(len[i], (int)2e18); // 点睛之笔...
    }

    // 特判下标越界的情况
    if (k > len[n]) {
        cout << ".";
        return;
    }

    // 否则开始从第n层开始递归搜索
    bool ok = false;
    dfs(len, n, k, ok);
}

signed main() {
    int T = 1;
    cin >> T;
    while (T--) {
        solve();
    }
    return 0;
}
```

### 【dfs】让我们异或吧

<https://www.luogu.com.cn/problem/P2420>

> 题意：给定一棵树，树上每一条边都有一个权值，现在有Q次询问，对于每次询问会给出两个结点编号u，v，需要输出结点u到结点v所经过的路径的所有边权的异或之和
>
> 思路：对于每次询问，我们当然可以遍历从根到两个结点的所有边权，然后全部异或计算结果，但是时间复杂度是 $O(n)$，显然不行，那么有什么优化策略吗？答案是有的。我们可以发现，对于两个结点之间的所有边权，其实就是根到两个结点的边权相异或得到的结果（异或的性质），我们只需要预处理出根结点到所有结点的边权已异或值，后续询问的时候直接 $O(1)$ 计算即可
>
> 时间复杂度：$\Theta(n+q)$

```cpp
const int N = 100010;

struct node {
    int id;
    int w;
};

int n, m, f[N];        // f[i] 表示从根结点到 i 号结点的所有边权的异或值
vector<node> G[N];
bool vis[N];

void dfs(int fa) {
    if (!vis[fa]) {
        vis[fa] = true;
        for (auto& ch: G[fa]) {
            f[ch.id] = f[fa] ^ ch.w;
            dfs(ch.id);
        }
    }
}

void solve() {
    cin >> n;

    for (int i = 0; i < n - 1; i++) {
        int a, b, w;
        cin >> a >> b >> w;
        G[a].push_back({b, w});
        G[b].push_back({a, w});
    }

    dfs(1);

    cin >> m;

    while (m--) {
        int u, v;
        cin >> u >> v;
        cout << (f[u] ^ f[v]) << "\n";
    }
}
```

### 【记忆化搜索】Function

<https://www.luogu.com.cn/problem/P1464>

> 题意：
>
> 思路一：直接dfs
>
> - 直接按照题意进行dfs代码的编写，但是很显然时间复杂极高
> - 时间复杂度：$O(T \times \text{情况数})$
>
> 思路二：记忆化dfs
>
> - 记忆化逻辑：
>     - 如果当前的状态没有记忆过，就记忆一下
>     - 如果当前的状态已经记忆过了，就不需要继续递归搜索了，直接使用之前已经记忆过的答案即可
> - 上述起始状态需要和搜到答案的状态做一个区别。我们知道，对于一组合法的输入，答案一定是
> - 注意点：
>     - 输入终止条件不是 `a != -1 && b != -1 && c != -1`，而是要三者都不是 `-1` 才行
>     - 对于每一组输入，我们不需要 `memset` 记忆数组，因为每一组的记忆依赖是相同的
>     - 由于答案一定是 $>0$ 的，因此是否记忆过只需要看当前状态的答案是否 $>0$ 即可
> - 时间复杂度：$<O(T \times n^3)$

直接dfs代码：

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

ll dfs(int a, int b, int c) {
    if (a <= 0 || b <= 0 || c <= 0) return 1;
    else if (a > 20 || b > 20 || c > 20) return dfs(20, 20, 20);
    else if (a < b && b < c) return dfs(a, b, c - 1) + dfs(a, b - 1, c - 1) - dfs(a, b - 1, c);
    else return dfs(a - 1, b, c) + dfs(a - 1, b - 1, c) + dfs(a - 1, b, c - 1) - dfs(a - 1, b - 1, c - 1);
}

void solve() {
    int a, b, c;
    cin >> a >> b >> c;
    while (a != -1 && b != -1 && c != -1) {
        printf("w(%d, %d, %d) = %lld\n", a, b, c, dfs(a, b, c));
        cin >> a >> b >> c;
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

记忆化dfs代码：

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

const int N = 25;

ll f[N][N][N];

ll dfs(ll a, ll b, ll c) {
    // 上下界
    if (a <= 0 || b <= 0 || c <= 0) return 1;
    else if (a > 20 || b > 20 || c > 20) return dfs(20, 20, 20);

    if (f[a][b][c]) {
        // 已经记忆化过了，直接返回当前状态的解
        return f[a][b][c];
    }
    else {
        // 没有记忆化过，就递归计算并且记忆化
        if (a < b && b < c) return f[a][b][c] = dfs(a, b, c - 1) + dfs(a, b - 1, c - 1) - dfs(a, b - 1, c);
        else return f[a][b][c] = dfs(a - 1, b, c) + dfs(a - 1, b - 1, c) + dfs(a - 1, b, c - 1) - dfs(a - 1, b - 1, c - 1);
    }
}

void solve() {
    ll a, b, c;
    cin >> a >> b >> c;
    while (!(a == -1 && b == -1 && c == -1)) {
        printf("w(%lld, %lld, %lld) = %lld\n", a, b, c, dfs(a, b, c));
        cin >> a >> b >> c;
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

### 【递归】外星密码

<https://www.luogu.com.cn/problem/P1928>

> 线性递归
>
> 题意：给定一个压缩后的密码串，需要解压为原来的形式。压缩形式距离
>
> - `AC[3FUN]` $\to$ `ACFUNFUNFUN`
> - `AB[2[2GH]]OP` $\to$ `ABGHGHGHGHOP`
>
> 思路：
>
> - 我们采用递归的策略
>
> - 我们知道，对于每一个字符，一共有4种情况，分别是："字母"、"数字"、"["、"]"。如果是字母。我们分情况考虑
>
>     - "字母"：
>         1. 直接加入答案字符串即可
>     - "["：
>         1. 获取左括号后面的整体 - 采用**递归**策略获取后面的整体
>         2. 加入答案字符串
>     - "数字"：
>         1. 获取完整的数 - 循环小trick
>         2. 获取数字后面的整体 - 采用**递归**策略获取后面的整体
>         3. 加入答案字符串 - 循环尾加入即可
>         4. **返回当前的答案字符串**
>     - "]"：
>         1. **返回当前的答案字符串** - 与上述 "[" 对应
>
> - 代码设计分析：
>
>     - 我们将压缩后的字符串看成由下面两种单元组成：
>
>         1. **最外层中括号组成的单元**：如 `[2[2AB]]` 就算一个最外层中括号组成的单元
>         2. **连续的字母单元**：如 `OPQ` 就算一个连续的字母单元
>
>     - 解决各单元连接问题：
>     - 为了在递归处理完第一种单元后还能继续处理后续的第二种单元，我们直接按照压缩字符串的长度进行遍历，即 `while (i < s.size())` 操作
>     - 解决两种单元内部问题：
>         - 最外层中括号组成的单元：递归处理
>         - 连续的字母单元：直接加入当前答案字符串即可
>
> - 手玩样例：
>
>     ![手玩样例](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407250147150.png)
>
>     - 显然按照定义，上述压缩字符串一共有五个单元
>     - 我们用红色表示进入递归，蓝色表示驱动递归结束并回溯。可以发现
>
> - 时间复杂度：$\Theta(\text{res.length()})$

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

string s;
int i;

string dfs() {
    string res;

    while (i < s.size()) {
        if (s[i] >= 'A' && s[i] <= 'Z') {
            while (s[i] >= 'A' && s[i] <= 'Z') {
                res += s[i++];
            }
        }
        if (s[i] == '[') {
            i++;
            res += dfs();
        }
        if (isdigit(s[i])) {
            int cnt = 0;
            while (isdigit(s[i])) {
                cnt = cnt * 10 + s[i] - '0';
                i++;
            }
            string t = dfs();
            while (cnt--) {
                res += t;
            }
            return res;
        }
        if (s[i] == ']') {
            i++;
            return res;
        }
    }

    return res;
}

void solve() {
    cin >> s;
    cout << dfs() << "\n";
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

### 【dfs+剪枝/二进制枚举】选数

<https://www.luogu.com.cn/problem/P1036>

> 题意：给定n个数，从中选出k个数，问一共有多少种方案可以使得选出来的k个数之和为质数
>
> 思路一：dfs+剪枝
>
> - 按照数据量可以直接暴搜，搜索依据是每一个数有两种状态，即选和不选，于是搜索树就是一棵二叉树
> - 搜索状态定义为：对于当前第idx个数，已经选择了cnt个数，已经选择的数之和为sum
> - 搜索终止条件为：idx越界
> - 剪枝：已经选择了k个数就直接返回，不用再选剩下的数了
> - 时间复杂度：$O(2^n)$ - 剪枝后一定是小于这个复杂度的
>
> 思路二：二进制枚举
>
> - 直接枚举 $0\to 2^n-1$，按照其中含有的 $1$ 的个数，来进行选数判断
> - 时间复杂度：$O(2^n)$ - 一定会跑满的

dfs+剪枝

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

const int N = 30;

int n, k, a[N];
int res;

bool isPrime(int x) {
    if (x < 2) return false;
    for (int i = 2; i <= x / i; i++)
        if (x % i == 0)
            return false;
    return true;
}

/**
 * @param cnt 当前已经选择的数的数量
 * @param idx 当前数的下标
 * @param sum 当前选数状态下的总和
 */
void dfs(int cnt, int idx, int sum) {
    if (idx > n) return;

    if (cnt == k) {
        if (isPrime(sum)) res++;
        return;
    }

    dfs(cnt, idx + 1, sum);
    dfs(cnt + 1, idx + 1, sum + a[idx + 1]);
}

void solve() {
    cin >> n >> k;
    for (int i = 1; i <= n; i++)
        cin >> a[i];

    dfs(0, 1, 0);        // 不选第一个数
    dfs(1, 1, a[1]);    // 选第一个数

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

二进制枚举

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

const int N = 30;

int n, k, a[N];
int res;

bool isPrime(int x) {
    if (x < 2) return false;
    for (int i = 2; i <= x / i; i++)
        if (x % i == 0)
            return false;
    return true;
}

void solve() {
    cin >> n >> k;
    for (int i = 1; i <= n; i++)
        cin >> a[i];

    for (int i = 0; i < (1 << n); i++) {
        int cnt = 0, sum = 0;
        for (int j = 0; j < n; j++)
            if (i & (1 << j))
                cnt++, sum += a[j + 1];

        if (cnt != k) continue;

        if (isPrime(sum)) res++;
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

### 【dfs/bfs】01迷宫

<https://www.luogu.com.cn/problem/P1141>

> 题意：给定一个01矩阵，行走规则为“可以走到相邻的数字不同的位置”，现在给定m次询问 `(u,v)`，输出从 `(u,v)` 开始最多可以走多少个位置？
>
> 思路：我们可以将此问题转化为一个求解连通块的问题。对于矩阵中的一个连通块，我们定义为：在其中任意一个位置开始行走，都可以走过整个连通块每一个位置。那么在询问时，只需要输出所在连通块元素的个数即可。现在将问题转化为了
>
> 1. 如何遍历每一个连通块？按照标记数组的情况，如果一个位置没有被标记，就从这个位置出发开始打标记并统计
>
> 2. 如何统计每一个连通块中元素的个数？按照题目中给定的迷宫行走规则，可以通过bfs或者dfs实现遍历
>

bfs代码

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 1010;

int n, m, res[N][N];
char g[N][N];
bool vis[N][N];

void bfs(int u, int v) {
    queue<pair<int, int>> q;
    int cnt = 0; // 当前“连通块”的大小
    vector<pair<int, int>> a;

    q.push({u, v});
    a.push_back({u, v});
    vis[u][v] = true;
    cnt++;

    int dx[4] = {-1, 1, 0, 0}, dy[4] = {0, 0, 1, -1};

    while (q.size()) {
        auto& now = q.front();
        q.pop();

        for (int i = 0; i < 4; i++) {
            int x = dx[i] + now.first, y = dy[i] + now.second;
            if (x >= 1 && x <= n && y >= 1 && y <= n && !vis[x][y] && g[x][y] != g[now.first][now.second]) {
                q.push({x, y});
                a.push_back({x, y});
                vis[x][y] = true;
                cnt++;
            }
        }
    }

    for (auto& loc: a) {
        res[loc.first][loc.second] = cnt;
    }
}

void solve() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            cin >> g[i][j];

    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            if (!vis[i][j])
                bfs(i, j);

    while (m--) {
        int a, b;
        cin >> a >> b;
        if (vis[a][b]) {
            cout << res[a][b] << "\n";
        } else {
            cout << 1 << "\n";
        }
    }
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

dfs代码

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 1010;

int n, m, res[N][N];
char g[N][N];
bool vis[N][N];

// 当前点的坐标 (u, v)，当前连通块的元素个数cnt，当前连通块的元素存到 a 数组
void dfs(int u, int v, int& cnt, vector<pair<int, int>>& a) {
    cnt++;
    a.push_back({u, v});
    vis[u][v] = true;

    int dx[4] = {0, 0, 1, -1}, dy[4] = {1, -1, 0, 0};

    for (int k = 0; k < 4; k++) {
        int x = u + dx[k], y = v + dy[k];
        if (x >= 1 && x <= n && y >= 1 && y <= n && !vis[x][y] && g[x][y] != g[u][v]) {
            dfs(x, y, cnt, a);
        }
    }
}

void solve() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            cin >> g[i][j];

    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            if (!vis[i][j]) {
                int cnt = 0;
                vector<pair<int, int>> a;
                dfs(i, j, cnt, a);
                for (auto& loc: a) {
                    res[loc.first][loc.second] = cnt;
                }
            }

    while (m--) {
        int a, b;
        cin >> a >> b;
        if (vis[a][b]) {
            cout << res[a][b] << "\n";
        } else {
            cout << 1 << "\n";
        }
    }
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

### 【dfs/二进制枚举】kkksc03考前临时抱佛脚

<https://www.luogu.com.cn/problem/P2392>

> 题意：给定四组数据，每组数据由 n 个数字组成，对于每一组数字需要分为两组使得两组之和相差尽可能小，问最终四组数据分组后，每一组之和的最大值之和是多少
>
> - 思路一：二进制枚举
>
>     可以发现，我们可以只设计处理一组数据的算法，其余组数的数据调用该算法即可。对于一个序列，想要将其划分为 2 组使得 2 组之和的差值最小，我们可以发现，对于序列中的一个数而言，有两个状态，要么分到第一组，要么就分到第二组，因此我们可以采用二进制枚举的方式，将所有的分组情况全部枚举出来，每一个状态计算一下和的差值，最后取最小差值时，两组中和的最大值即可
>
>     时间复杂度：$O(4 \times 2^n)$
>
> - 思路二：dfs
>
>     从上面的二进制枚举得到启发，一定可以进行二叉树搜索。很显然就直接左结点让当前数分到左组，右结点让当前数分到右组即可。本题无法剪枝，因为两组之和的差值没有规律
>
>     时间复杂度：$O(4 \times 2^n)$

二进制枚举代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 25;

int a[N], res;

void fun(int n) {
    int MIN = 20 * 60;
    for (int i = 0; i <= (1 << n); i++) {
        int l = 0, r = 0; 
        for (int j = 0; j < n; j++) {
            if (i & (1 << j)) r += a[j];
            else l += a[j];
        }
        MIN = min(MIN, max(l, r));
    }
    res += MIN;
}

void solve() {
    int x[4] {};
    for (int i = 0; i < 4; i++) cin >> x[i];
    
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < x[i]; j++) cin >> a[j];
        fun(x[i]);
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

dfs代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 25;

int a[N], res;
int MIN; // 每一组数据划分为 2 组后每一组的最大和值 

// 第 idx 个数分到某一组时左组之和 ls，右组之和 rs 
void dfs(int idx, bool isRight, int ls, int rs, int n) {
    if (idx == n) {
        MIN = min(MIN, max(ls, rs));
        return;
    }
    
    if (ls > MIN || rs > MIN) {
        // 剪枝：当前左组之和 or 右组之和比最大和值都大 
        return;
    }
    
    if (isRight) rs += a[idx];
    else ls += a[idx];
    
    dfs(idx + 1, false, ls, rs, n);
    dfs(idx + 1, true , ls, rs, n); 
}

void solve() {
    int x[4] {};
    for (int i = 0; i < 4; i++) cin >> x[i];
    
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < x[i]; j++) cin >> a[j];
        
        MIN = 20 * 60;
        dfs(0, false, 0, 0, x[i]);
        dfs(0, true , 0, 0, x[i]);
        res += MIN;
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

### 【dfs/二进制枚举】PERKET

<https://www.luogu.com.cn/problem/P2036>

> 题意：给定一个二元组序列，每一个二元组中，一个表示酸度，一个表示苦度，现在在至少需要选择一个二元组的情况下，希望酸度之积与苦度之和的差值最小
>
> - 思路一：二进制枚举
>
>     很显然的一个二进制枚举。每一个二元组都只有两个状态，即被选择 or 不被选择，故可采用二进制枚举，对于每一个状态统计酸度之积与苦度之和即可
>
>     时间复杂度：$O(2^n)$
>
> - 思路二：dfs
>
>     按照上述二进制枚举的思路进行模拟即可，本题无法剪枝，因为酸度与苦度之差没有规律
>
>     时间复杂度：$O(2^n)$

二进制枚举代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 15;

int n;
int res = 1e9;

struct {
    int l, r;
} a[N];

void solve() {
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i].l >> a[i].r;
    
    for (int i = 0; i <= (1 << n); i++) {
        // 特判没有调料的情况 
        int cnt = 0;
        for (int j = 0; j < n; j++)
            if (i & (1 << j))
                cnt++;
                
        if (!cnt) continue;
        
        // 计算两个味道的差值
        int ls = 1, rs = 0;
        for (int j = 0; j < n; j++)
            if (i & (1 << j))
                ls *= a[j].l, rs += a[j].r;
                
        res = min(res, abs(ls - rs));
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

dfs代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 15;

int n;
int res = 1e9;

struct {
    int l, r;
} a[N];

// 当前决策元素的下标idx，是否被选择choose，酸度之积ls，苦度之和rs 
void dfs(int idx, bool choose, int ls, int rs) {
    if (idx == n) {
        if (ls == 1 && rs == 0) return;
        res = min(res, abs(ls - rs));
        return;
    }
    
    if (choose) {
        ls *= a[idx].l;
        rs += a[idx].r;
    }
    
    dfs(idx + 1, false, ls, rs);
    dfs(idx + 1, true , ls, rs);
}

void solve() {
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i].l >> a[i].r;
    
    dfs(0, false, 1, 0);
    dfs(0, true , 1, 0);
    
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

### 【dfs】迷宫

<https://www.luogu.com.cn/problem/P1605>

> 题意：矩阵寻路，有障碍物，每一个点只能走一次，找到起点到终点可达路径数
>
> 思路：其实就是一个四叉树的题目，只需要进行四个方向的遍历搜索即可找到路径，由于会进行：越界、障碍物、以及不可重复遍历的剪枝，故遍历的数量会很少
>
> 时间复杂度：$<< O(4^{nm})$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 10;

int n, m, k;
int aa, bb, cc, dd;
int g[N][N], vis[N][N];
int res;

int dx[] = {-1, 1, 0, 0}, dy[] = {0, 0, 1, -1};

void dfs(int x, int y) {
    if (x == cc && y == dd) {
        res++;
        return;
    }
    
    for (int k = 0; k < 4; k++) {
        int xx = x + dx[k], yy = y + dy[k];
        if (xx > 0 && xx <= n && yy > 0 && yy <= m && !g[xx][yy] && !vis[xx][yy]) {
            vis[x][y] = true;
            dfs(xx, yy);
            vis[x][y] = false;
        }
    }
}

void solve() {
    cin >> n >> m >> k;
    cin >> aa >> bb >> cc >> dd;
    
    while (k--) {
        int x, y;
        cin >> x >> y;
        g[x][y] = 1;
    }
    
    dfs(aa, bb);
    
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

### 【dfs】单词方阵

<https://www.luogu.com.cn/problem/P1101>

> - 题意：给定一个字符串方阵，问对于其中的 8 个方向，是否存在一个指定的字符串
> - 思路：很显然的暴力枚举，只不过采用 dfs 进行优化，我们可以发现搜索的逻辑非常的简单，只需要在约束方向的情况下每次遍历八个方向即可。本题的关键在于如何快速正确的编码。对于八个角度判断是否与原始方向一致，我们采用**增量的思路**，只需要通过传递父结点的位置坐标即可唯一确定，因为两点确定一条了一条射线，方向也就确定了。其次就是如何构造答案矩阵，思路与两点确定射线的逻辑类似，我们在抵达搜索的终点时，只需要通过当前点的坐标与父结点的坐标唯一确定来的路径的方向，进行构造即可
> - 时间复杂度：难以计算，但是 dfs 一定可行

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 110;

int n;
char g[N][N], res[N][N], s[10] = "yizhong";

// oa,ob 父结点坐标，a,b 当前结点坐标，idx 当前匹配的位置
void dfs(int oa, int ob, int a, int b, int idx) {
    if (s[idx] != g[a][b]) return;
    
    if (idx == 6) {
        int i = a, j = b;
        for (int t = 6; t >= 0; t--) {
            res[i][j] = s[t];
            i -= a - oa;
            j -= b - ob;
        }
        return;
    }
    
    int dx[] = {1, -1, 0, 0, 1, -1, -1, 1}, dy[] = {0, 0, 1, -1, 1, 1, -1, -1};
    
    for (int k = 0; k < 8; k++) {
        int x = a + dx[k], y = b + dy[k];
        if (x < 1 || x > n || y < 1 || y > n) continue;
        
        if ((oa == -1 && ob == -1) || (x - a == a - oa && y - b == b - ob))
            dfs(a, b, x, y, idx + 1);
    }
}

void solve() {
    cin >> n;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            cin >> g[i][j], res[i][j] = '*';
    
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            dfs(-1, -1, i, j, 0);
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++)
            cout << res[i][j];
        cout << "\n";
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

### 【dfs】自然数的拆分问题

<https://www.luogu.com.cn/problem/P2404>

> - 题意：给定一个自然数 n，问有多少种拆分方法能将该数拆分为一定数量的升序自然数之和
> - 思路：**树形搜索的例题**。我们采用递增凑数的思路，对于每一个结点值，我们从其父结点的值开始深度搜索，从而确保了和数递增。递归终点就是和值为自然数 n 的值。剪枝就是和值超过了自然数 n 的值
> - 时间复杂度：$<<O(n^n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

int n;
vector<int> res;

// now 表示当前结点的值，sum 表示根到当前结点的路径之和
void dfs(int now, int sum) {
    if (sum > n) return;
    
    if (sum == n) {
        for (int i = 0; i < res.size(); i++)
            cout << res[i] << "+\n"[i == res.size() - 1];
        return;
    }
    
    for (int i = now; i < n; i++) {
        res.push_back(i);
        dfs(i, sum + i);
        res.pop_back();
    }
}

void solve() {
    cin >> n;
    
    for (int i = 1; i < n; i++) {
        res.push_back(i);
        dfs(i, i);
        res.pop_back();
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

### 【dfs】Lake Counting S

<https://www.luogu.com.cn/problem/P1596>

> - 题意：给定一个矩阵，计算其中连通块的数量
> - 思路：直接逐个元素遍历即可，对于每一个元素，我们采用 dfs 或者 bfs 的方式进行打标签从而将整个连通块都标记出来即可
> - 时间复杂度：$O(nm)$

dfs 代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 110;

int n, m;
char g[N][N];
bool vis[N][N];
int res, dx[] = {1, -1, 0, 0, 1, 1, -1, -1}, dy[] = {0, 0, 1, -1, 1, -1, 1, -1};

void dfs(int i, int j) {
    if (i < 1 || i > n || j < 1 || j > m || vis[i][j] || g[i][j] != 'W') return;
    
    vis[i][j] = true;
    
    for (int k = 0; k < 8; k++) {
        int x = i + dx[k], y = j + dy[k];
        dfs(x, y);
    }
}

void solve() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            cin >> g[i][j];
    
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            if (!vis[i][j] && g[i][j] == 'W')
                dfs(i, j), res++;
    
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

bfs 代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 110;

int n, m;
char g[N][N];
bool vis[N][N];
int res, dx[] = {1, -1, 0, 0, 1, 1, -1, -1}, dy[] = {0, 0, 1, -1, 1, -1, 1, -1};

void bfs(int i, int j) {
    queue<pair<int, int>> q;
    
    q.push({i, j});
    vis[i][j] = true;
    
    while (q.size()) {
        auto h = q.front();
        q.pop();
        
        int x = h.first, y = h.second;
        for (int k = 0; k < 8; k++) {
            int xx = x + dx[k], yy = y + dy[k];
            if (!vis[xx][yy] && g[xx][yy] == 'W') {
                q.push({xx, yy});
                vis[xx][yy] = true;
            }
        }
    }
}

void solve() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            cin >> g[i][j];
    
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            if (!vis[i][j] && g[i][j] == 'W')
                bfs(i, j), res++;
    
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

### 【dfs】填涂颜色

<https://www.luogu.com.cn/problem/P1162>

> - 题意：给定一个方阵，其中只有 0 和 1，其中的 1 将部分的 0 围成了一个圈，现在需要将被围住的 0 转为 2 后，将转化后的方阵输出
> - 思路：题意很简单，思路也很显然，我们要做的就是区分开圈内与圈外的 0，如何区分呢？我们采用搜索打标记的方式将外圈的 0 全部打标记之后，遇到的没有打标记的 0 显然就是圈内的了。为了满足所有情况下圈内的 0，我们从方阵的四条边进行探测式打标签即可
> - 时间复杂度：$O(n^2)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 35;

int n, g[N][N];
int dx[] = {0, 0, 1, -1}, dy[] = {1, -1, 0, 0};
bool vis[N][N];

void dfs(int i, int j) {
    if (i < 1 || i > n || j < 1 || j > n || g[i][j] == 1 || vis[i][j]) return;
    
    vis[i][j] = true;
    
    for (int k = 0; k < 4; k++) {
        int x = i + dx[k], y = j + dy[k];
        dfs(x, y);
    }
}

void solve() {
    cin >> n;
    
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            cin >> g[i][j];
    
    for (int i = 1; i <= n; i++) if (g[1][i] == 0 && !vis[1][i]) dfs(1, i);
    for (int i = 1; i <= n; i++) if (g[i][n] == 0 && !vis[i][n]) dfs(i, n);
    for (int i = 1; i <= n; i++) if (g[n][i] == 0 && !vis[n][i]) dfs(n, i);
    for (int i = 1; i <= n; i++) if (g[i][1] == 0 && !vis[i][1]) dfs(i, 1);
    
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            if (vis[i][j]) cout << 0 << " \n"[j == n];
            else if (g[i][j] == 0) cout << 2 << " \n"[j == n];
            else cout << g[i][j] << " \n"[j == n];
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

### 【bfs】马的遍历

<https://www.luogu.com.cn/problem/P1443>

> - 题意：给定一个矩阵棋盘范围与一个马的位置坐标，现在问棋盘中每一个点的最小到达距离是多少
> - 思路：很显然的一个 bfs 宽搜模型，我们只需要从该颗马的起始位置开始宽搜，对于每一个第一个搜索到的此前没有到达的点，计算此时到起点的步长距离就是最小到达距离
> - 时间复杂度：$O(n \times m)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 410;

struct Idx {
    int x, y;
};

int n, m, x, y;
int d[N][N];
int dx[] = {1, 1, -1, -1, 2, 2, -2, -2}, dy[] = {2, -2, 2, -2, 1, -1, 1, -1};

void bfs() {
    queue<Idx> q;
    q.push({x, y});
    d[x][y] = 0;
    
    while (q.size()) {
        auto h = q.front();
        q.pop();
        
        for (int k = 0; k < 8; k++) {
            int i = h.x + dx[k], j = h.y + dy[k];
            if (i < 1 || i > n || j < 1 || j > m || d[i][j] != -1) continue;
            d[i][j] = d[h.x][h.y] + 1;
            q.push({i, j});
        }
    }
}

void solve() {
    cin >> n >> m >> x >> y;
    
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            d[i][j] = -1;
    
    bfs();
    
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            cout << d[i][j] << " \n"[j == m];
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

### 【bfs】奇怪的电梯

<https://www.luogu.com.cn/problem/P1135>

> - 题意：给定一个电梯，第 `i` 层只能上升或者下降 `a[i]` 层，问从起点开始到终点最少需要乘坐几次电梯
> - 思路：很显然的一个宽搜，关键在于需要对打标记避免重复访问结点造成死循环
> - 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 210;

int n, x, y, a[N];
int d[N]; // d[i] 表示起点到第 i 层楼的最小操作次数
bool vis[N];

void bfs() {
    queue<int> q;
    
    q.push(x);
    d[x] = 0;
    vis[x] = true;
    
    while (q.size()) {
        int now = q.front();
        q.pop();
        
        if (now == y) break;
        
        int high = now + a[now], low = now - a[now];
        
        if (!vis[high] && high >= 1 && high <= n) {
            q.push(high);
            d[high] = d[now] + 1;
            vis[high] = true;
        }
        if (!vis[low] && low >= 1 && low <= n) {
            q.push(low);
            d[low] = d[now] + 1;
            vis[low] = true;
        }
    }
}

void solve() {
    cin >> n >> x >> y;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        d[i] = -1;
    }
    
    bfs();
    
    cout << d[y] << "\n";
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

### 【dfs/状压dp】吃奶酪 :star:

> 题意：给定一个平面直角坐标系与 n 个点的坐标，起点在坐标原点。问如何选择行进路线使得到达每一个点且总路程最短 
> - 思路一：爆搜。题中的 $n \le 15$ 直接无脑爆搜，但是 **TLE**。爆搜的思路为：每次选择其中的一个点，接下来选择剩余的没有被选择过的点继续搜索，知道所有的点全部都搜到为止
>
>     时间复杂度：$O(n!)$
>
> - 思路二：状态压缩 DP。
>
>     时间复杂度：$O()$

爆搜代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 20;

int n;
double res = 4000.0;
bool vis[N];

struct Idx {
    double x, y;
} a[N];

double d(Idx be, Idx en) {
    return sqrt((be.x - en.x) * (be.x - en.x) + (be.y - en.y) * (be.y - en.y));
}

// 父结点坐标 fa，当前结点次序 now，当前路径长度 len 
void dfs(Idx fa, int now, double len) {
    vis[now] = true;
    
    if (count(vis + 1, vis + n + 1, true) == n) {
        res = min(res, len);
    }
    
    for (int i = 1; i <= n; i++)
        if (!vis[i])
            dfs(a[now], i, len + d(a[now], a[i]));
    
    vis[now] = false;
}

void solve() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> a[i].x >> a[i].y; 
    }
    
    for (int i = 1; i <= n; i++) {
        Idx fa = {0, 0};
        dfs(fa, i, d(fa, a[i]));
    }
    
    cout << fixed << setprecision(2) << res << "\n";
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

状压 dp 代码

```cpp

```

### 【dfs】递归实现指数型枚举

<https://www.acwing.com/problem/content/94/>

> - 题意：给定 n 个数，从其中选择 0-n 个数，将所有的选择方案打印出来，每一个方案中数字按照升序排列
> - 思路：很显然的一个二叉树问题。每一个数只有两种状态，选择 or 不选择，于是可以采用二进制枚举 or 二叉树 dfs 的方法进行。为了满足升序，二进制枚举时从低位到高位判断是否为 1 即可；搜索时从低位开始搜索，通过一个动态数组存储搜索路径上的数字即可
> - 时间复杂度：$O(2^n)$

二进制枚举

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

int n;

void solve() {
    cin >> n;
    
    for (int i = 0; i < (1 << n); i++) {
        for (int j = 0; j < n; j++) {
            if (i & (1 << j)) {
                cout << j + 1 << ' ';
            }
        }
        cout << "\n";
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

dfs

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

int n;
vector<int> a;

void dfs(int now, bool cho) {
    if (now == n) {
        for (auto& x: a) {
            cout << x << ' ';
        }
        cout << "\n";
        return;
    }
    
    dfs(now + 1, false);
    
    a.push_back(now + 1);
    dfs(now + 1, true);
    a.pop_back();
}

void solve() {
    cin >> n;
    
    dfs(1, false);

    a.push_back(1);
    dfs(1, true);
    a.pop_back();
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

### 【dfs】递归实现排列型枚举

<https://www.acwing.com/problem/content/96/>

> - 题意：按照字典序升序，打印 n 个数的所有全排列情况
> - 思路：从第一位开始枚举每一位可以选择的数，显然每一位可选择数的数量逐渐减少，直到只有一种选择结束搜索
> - 时间复杂度：$O(n!)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 10;

int n;
bool vis[N];
vector<int> a;

// 当前数位 now
void dfs(int now) {
    if (now > n) {
        for (auto& x: a) {
            cout << x << ' ';
        }
        cout << "\n";
        return;
    }

    for (int i = 1; i <= n; i++) {
        if (!vis[i]) {
            a.push_back(i);
            vis[i] = true;
            dfs(now + 1);
            a.pop_back();
            vis[i] = false;
        }
    }
}

void solve() {
    cin >> n;
    dfs(1);
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

### 【dfs/树形dp】树的直径 :star:

树的路径问题，考虑回溯。如何更新值？如何返回值？

参考：<https://www.bilibili.com/video/BV17o4y187h1/>



### 【dfs】在带权树网络中统计可连接服务器对数目

<https://leetcode.cn/problems/count-pairs-of-connectable-servers-in-a-weighted-tree-network/description/>

> 题意：给定一棵带权无根树，定义「中转结点」为以当前结点为根，能够寻找到两个不同分支下的结点，使得这两个结点到当前结点的简单路径长度可以被给定值 k 整除，问树中每一个结点的「中转结点」的有效对数是多少
>
> 思路：dfs+乘法原理。
>
> - 由于数据量是 $n=10^3$，可以直接枚举每一个顶点，并且每一个顶点的操作可以是 $O(n)$ 的，我们考虑遍历。对于每一个结点，对应的有效对数取决于每一个子树中的简单路径长度合法的结点数，通过深搜统计即可
> - 统计出每一个子树的合法结点后还需要进行答案的计算，也就是有效对数的统计。对于每一个合法结点，都可以和非当前子树上的所有结点结合形成一个合法有效对，直接这样统计会导致结果重复计算一次，因此需要答案除以二。当然也可以利用乘法原理，一边统计每一个子树中有效的结点数，一边和已统计过的有效结点数进行计算
>
> 时间复杂度：$O(n^2)$
>
> 注：总结本题根本原因是提升对建图的理解以及针对 `vector` 用法的总结
>
> - 关于建图
>     - 一开始编码时，我设置了结点访问状态数组 `vector<bool> vis` 和每一个结点到当前根结点的距离数组 `vector<int> d`，但其实都可以规避，因为本题是「树」形图，可以通过在深搜时同时传递父结点来规避掉 `vis` 数组的使用
>     - 同时由于只需要在遍历时计算路径是否合法从而计数，因此不需要存储每一个结点到当前根结点的路径值，可以通过再增加一个搜索状态参数来规避掉 `d` 数组的使用
> - 关于 `vector`
>     - 一开始使用了全局 `vis` 数组，因此每次都需要进行清空操作。我使用了 `.clear()` 方法试图重新初始化数组，但这导致了状态的错误记录，可能是 LeetCode 平台 C++ 语言特有的坑，还是少用全局变量
>     - `.clear()` 方法会导致 `.size()` 为 0，但是仍然可以通过 `[]` 方法获得合法范围内的元素值，这是 `vector` 内存分配优化的结果

```cpp []
class Solution {
public:
    vector<int> countPairsOfConnectableServers(vector<vector<int>>& edges, int signalSpeed) {
        int n = edges.size() + 1;
        
        struct node { int to, w; };
        vector<vector<node>> g(n, vector<node>());
        for (auto e: edges) {
            int u = e[0], v = e[1], w = e[2];
            g[u].push_back({v, w});
            g[v].push_back({u, w});
        }

        function<int(int, int, int)> dfs = [&](int fa, int now, int d) {
            int res = d % signalSpeed == 0;
            for (auto ch: g[now]) {
                if (ch.to != fa) {
                    res += dfs(now, ch.to, d + ch.w);
                }
            }
            return res;
        };

        vector<int> res(n);
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (auto ch: g[i]) {
                int cnt = dfs(i, ch.to, ch.w);
                res[i] += cnt * sum;
                sum += cnt;
            }
        }

        return res;
    }
};
```

```python []
class Solution:
    def countPairsOfConnectableServers(self, edges: List[List[int]], signalSpeed: int) -> List[int]:
        n = len(edges) + 1

        g = [[] for _ in range(n)]
        for u, v, w in edges:
            g[u].append((v, w))
            g[v].append((u, w))

        def dfs(fa: int, now: int, d: int) -> int:
            ret = d % signalSpeed == 0
            for ch in g[now]:
                if ch[0] != fa:
                    ret += dfs(now, ch[0], d + ch[1])
            return ret

        res = [0] * n
        for i in range(n):
            sum = 0
            for ch in g[i]:
                cnt = dfs(i, ch[0], ch[1])
                res[i] += sum * cnt
                sum += cnt

        return res
```

### 【dfs】将石头分散到网格图的最少移动次数

<https://leetcode.cn/problems/minimum-moves-to-spread-stones-over-grid/>

> 标签：搜索、全排列、库函数
>
> 题意：给定一个 $3\times 3$ 的矩阵 $g$，其中数字总和为 9 且 $g[i][j] \ge 0$，现在需要将其中 $>1$ 的数字逐个移动到值为 0 的位置上使得最终矩阵全为 1，问最少移动长度是多少。
>
> 思路一：手写全排列
>
> - 思路：可以将这道题抽象为求解「将 a 个大于 1 位置的数分配到 b 个 0 位置」的方案中的最小代价问题。容易联想到全排列选数的母问题：数字的位数对应这里的 b 个 0 位置，每个位置可以填的数对应这里的用哪个 a 来填。区别在于：0 的位置顺序不是固定的，用哪个 a 来填的顺序也不是固定的。这与全排列数中：被填的位置顺序是固定的，用哪个数来填不是固定的，有所区别。因此我们可以全排列枚举每一个位置，在此基础之上再全排列枚举每一个位置上可选的 a 进行填充。可以理解为全排列的嵌套。那么最终递归树的深度就是 0 的个数，递归时再用一个参数记录每一个选数分支对应的代价即可。
> - 时间复杂度：$O(9\times 9!)$
>
> 思路二：库函数全排列
>
> - 思路：由于方阵的总和为 9，因此 >1 的位置上减去 1 剩下的数值之和一定等于方阵中 0 的个数。因此我们可以将前者展开为和 0 相同大小的向量，并全排列枚举任意一者进行两者的匹配计算，维护其中的最小代价即是答案。
>     - C++ 的全排列枚举库函数为 `std::next_permutation(ItFirst, ItEnd)`
>     - Python 的全排列枚举库函数为 `itertools.permutations(Iterable)`
> - 时间复杂度：$O(9\times 9!)$

```cpp []
class Solution {
public:
    int minimumMoves(vector<vector<int>>& g) {
        vector<pair<int, int>> z, a;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (!g[i][j]) {
                    z.push_back({i, j});
                } else if (g[i][j] > 1) {
                    a.push_back({i, j});
                }
            }
        }

        int res = INT_MAX, n = z.size();
        vector<bool> vis(n);

        auto dfs = [&](auto&& dfs, int dep, int t) -> void {
            if (dep == n) {
                res = min(res, t);
                return;
            }

            for (int i = 0; i < n; i++) {
                if (vis[i]) continue;
                vis[i] = true;
                for (auto& [x, y]: a) {
                    if (g[x][y] <= 1) continue;
                    g[x][y]--;
                    dfs(dfs, dep + 1, t + abs(z[i].first - x) + abs(z[i].second - y));
                    g[x][y]++;
                }
                vis[i] = false;
            }
        };
        
        dfs(dfs, 0, 0);

        return res;
    }
};
```

```cpp [C++库函数]
class Solution {
public:
    int minimumMoves(vector<vector<int>>& g) {
        vector<pair<int, int>> z, a;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (!g[i][j]) {
                    z.push_back({i, j});
                } else {
                    while (g[i][j] > 1) {
                        a.push_back({i, j});
                        g[i][j]--;
                    }
                }
            }
        }

        int res = INT_MAX;
        do {
            int t = 0;
            for (int i = 0; i < z.size(); i++) {
                t += abs(a[i].first - z[i].first) + abs(a[i].second - z[i].second);
            }
            res = min(res, t);
        } while (next_permutation(a.begin(), a.end()));

        return res;
    }
};
```

```python []
class Solution:
    def minimumMoves(self, g: List[List[int]]) -> int:
        a, z = [], []
        for i in range(3):
            for j in range(3):
                if not g[i][j]:
                    z.append((i, j))
                elif g[i][j] > 1:
                    a.append((i, j))

        res = 1000
        n = len(z)
        vis = [False] * n
        
        def dfs(dep: int, t: int) -> None:
            nonlocal res
            if dep == n:
                res = min(res, t)
                return
            for i in range(n):
                if vis[i]: continue
                vis[i] = True
                for x, y in a:
                    if g[x][y] <= 1: continue
                    g[x][y] -= 1
                    dfs(dep + 1, t + abs(z[i][0] - x) + abs(z[i][1] - y))
                    g[x][y] += 1
                vis[i] = False

        dfs(0, 0)
        
        return res
```

```python [Python库函数]
class Solution:
    def minimumMoves(self, g: List[List[int]]) -> int:
        from itertools import permutations
        a, z = [], []
        for i in range(3):
            for j in range(3):
                if not g[i][j]:
                    z.append((i, j))
                while g[i][j] > 1:
                    a.append((i, j))
                    g[i][j] -= 1
        
        res, n = 1000, len(a)
        for p in permutations(a):
            t = 0
            for i in range(n):
                t += abs(p[i][0] - z[i][0]) + abs(p[i][1] - z[i][1])
            res = min(res, t)

        return res
```

### 【分治】随机排列

<https://www.acwing.com/problem/content/5469/>

> 题意：给定一个 n 个数的全排列序列，并将其进行一定的对换，问是对换了 3n 次还是 7n+1 次
>
> 思路：可以发现对于两种情况，就对应对换次数的奇偶性。当 n 为奇数：3n 为奇数，7n+1 为偶数；当 n 为偶数：3n 为偶数，7n+1 为奇数。故我们只需要判断序列的逆序数即可。为了求解逆序数，我们可以采用归并排序的 combine 过程进行统计即可
>
> 时间复杂度：$O(n \log n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 1000010;

int n, a[N], t[N];
int cnt; // 逆序数 

void MergeSort(int l, int r) {
	if (l >= r) return;
	
	int mid = (l + r) >> 1;
	
	MergeSort(l, mid), MergeSort(mid + 1, r);
	
	int i = l, j = mid + 1, idx = 0;
	
	while (i <= mid && j <= r) {
		if (a[i] < a[j]) t[idx++] = a[i++];
		else {
			cnt += mid - i + 1;
			t[idx++] = a[j++];
		}
	}
	
	while (i <= mid) t[idx++] = a[i++];
	while (j <= r) t[idx++] = a[j++];
	
	for (i = l, idx = 0; i <= r; i++, idx++) a[i] = t[idx];
}

void solve() {
	cin >> n;
	
	for (int i = 0; i < n; i++) cin >> a[i];
	
	MergeSort(0, n - 1);
	
	int res;
	
	if (n % 2 == 1) {
		if (cnt % 2) res = 1;
		else res = 2;
	} else {
		if (cnt % 2) res = 2;
		else res = 1;
	}
	
	cout << res << "\n"; 
}

signed main() {
	ios::sync_with_stdio(false);
	cin.tie(nullptr), cout.tie(nullptr);
	int T = 1;
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

## 后记

贪心：善用枚举，可以从一两个元素开始考虑。

前缀和与差分：遇到区间修改操作时，应该立即想到其等价于对差分数组做端点修改操作。

二分：当按照题意进行正面模拟发现难以实现或者复杂度过高时，可以观察变量之间是否有单调性关系。

搜索：

分治：

其他：

- 数学题：没思路就打表找规律；
- 网格图：注意截距用法；

针对 Python：

- 多关键字排序：使用元组作为 lambda 的参数；
- 未知行数的数据读入：用 try except EOFError；
- DP：初始化要考虑周全，在使用 python 元组的赋值语法时，要注意不能有依赖关系。
