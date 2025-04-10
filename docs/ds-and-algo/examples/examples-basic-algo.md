---
title: 基础算法例题精讲
---

## 前言

本文精选一些「基础算法」的例题并进行详细的原理讲解与代码实现。算法标签主要是「贪心、前缀和与差分、二分、递归」。题目来源主要是 Codeforces、洛谷、LeetCode。

一些做题小技巧：

- 贪心：善用枚举，可以从一两个元素开始考虑；
- 前缀和与差分：遇到区间修改操作时，应该立即想到其等价于对差分数组做端点修改操作；
- 二分：当按照题意进行正面模拟发现难以实现或者复杂度过高时，可以观察变量之间是否有单调性关系；
- 递归：搜索类题目，脑子里始终有一个搜索树，无论是具象化的树的题，还是可以抽象为树的搜索题；分治类题目，思考能不能先解决子问题，然后利用解决好的所有子问题来解决当前局面的问题。

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
| 搜索 | CF 1000 * | [AcWing](https://www.acwing.com/problem/content/5150/) | [数量](#数量) | / |
| 搜索、组合数、剪枝 | CF 1200 * | [力扣](https://leetcode.cn/problems/combination-sum/) | [组合总和](#组合总和) | 组合数板子题 |
| 搜索 | CF 1500 * | [AcWing](https://www.acwing.com/problem/content/5284/) | [扩展字符串](#扩展字符串) | 设置上限 trick |
| 搜索、并查集 | 洛谷 黄 | [洛谷](https://www.luogu.com.cn/problem/P1141) | [01 迷宫](#01-迷宫) | 连通分量板子题 |
| 搜索、排列数 | CF 1400 * | [力扣](https://leetcode.cn/problems/minimum-moves-to-spread-stones-over-grid/) | [将石头分散的最少移动次数](#将石头分散的最少移动次数) | 排列数板子题 |
| 分治、同余 | CF 1400 * | [AcWing](https://www.acwing.com/problem/content/5469/) | [随机排列](#随机排列) | 逆序数板子题 |

/// caption | <
基础算法例题导读表（打 * 表示自己预估的难度）
///

## Good Kid

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

## ABBC or BACB

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

## 通关

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

## 串门

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

## Codeforces rating

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

## 铺设道路

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

## 截断数组

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

## 修改后的最大二进制字符串

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

## 子序列最大优雅度

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

## 起床困难综合症

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

## 增减序列

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

## 木材加工

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

## 关押罪犯

题意：给定一个含有 $n\ (n\le2\cdot 10^4)$ 个顶点 $m\ (m\le10^5)$ 条边的无向图，没有重边和自环，边权 $w\ (1\le w_i\le 10^9)$ 为正。现在需要将图中所有的顶点分为两部分，使得两部分中最大的边权尽可能小，输出该最小边权。

思路：

- 假设答案是 $m$ 条边中某一条的权重 $w_i$，那么所有权重小于 $w_i$ 的边对应的顶点如何分配无关紧要，我们只关注边权大于 $w_i$ 的边对应的顶点能不能被分到两部分。也就是说我们只关心边权大于 $w_i$ 的边对应的顶点组成的图是否可二分。采用染色法即可快速判定一个图是否可二分。注意这里的可二分的图其实不符合「二分图」的严格定义，因为两个部分的顶点之间可能有连边；
- 由于 $w_i$ 越小需要判断的顶点数就越多，具备二分性。因此我们直接在 $m$ 条边中二分查找最小的符合条件的边即可；

时间复杂度：$O(m\log n)$

本题也可以使用「拓展域并查集」来解决，详情见 [进阶数据结构](./examples-ds.md/#关押罪犯)

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

## 摆放棋子

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

## 盖楼

题意：给定 $n,m,x,y\ (1\le n,m\le10^9,2\le x,y< 30000)$，其中 $x$ 和 $y$ 均为质数。现在有一个排列数数组，需要将数组中的部分数字分配给两个人。其中一个人需要 $n$ 个数且不允许给它能被 $x$ 整除的数，另一个人需要 $m$ 个数且不允许给它能被 $y$ 整除的数。问这个排列数数组的大小最小是多少。

思路：假设排列数共有 $h$ 个，两个人分别叫 $A$ 和 $B$。由于 $x$ 和 $y$ 均为质数，那么 $[1,h]$ 中能被 $x$ 和 $y$ 整除的数一定呈现下图中有部分交集或没有交集的情况。一种贪心的分配策略就是，优先将 $B$ 不需要的数分配给 $A$，然后再从 $h-p-q+a$ 中分配，对 $B$ 也是如此。又由于 $h$ 越大，可分配的数字就越多，为了找到最小的 $h$ 我们二分答案即可。

![集合关系](https://cdn.dwj601.cn/images/20250225154154468.png)

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

## 找出唯一性数组的中位数

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

## Bomb

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

## 数量

题意：给定一个数 $n$，问 $[1, n]$ 中有多少个数只含有 $4$ 或 $7$。

思路：每一个数位只有可能是 $4$ 或 $7$，我们按照数位搜索即可。

时间复杂度：$2^{\lg n}$

=== "Python"

    ```python
    n = int(input().strip())
    
    def dfs(x: int):
        if x > n:
            return 0
        return dfs(x * 10 + 4) + dfs(x * 10 + 7) + 1
    
    print(dfs(4) + dfs(7))
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <vector>
    
    using namespace std;
    
    long long n;
    
    int dfs(long long x) {
        if (x > n) {
            return 0;
        }
        return dfs(x * 10 + 4) + dfs(x * 10 + 7) + 1;
    }
    
    int main() {;
        cin >> n;
        cout << dfs(4) + dfs(7) << "\n";
    
        return 0;
    }
    ```

## 组合总和

题意：给定一个含有 $n\ (1\le n \le 30)$ 个不重复元素的序列，问如何选取其中的元素（可重复选），能够使得选出的数字总和为 $\text{target}\ (1\le \text{target}\le 40)$。给出所有具体选数方案（不考虑数字的选择顺序）。

思路：组合型搜索经典例题。在枚举序列中的元素时，需要从上一次枚举结束的位置开始，防止方案重复（也可以理解为剪枝操作）。下图对搜索方案进行了清晰地解释。

![组合型搜索 - 剪枝逻辑](https://cdn.dwj601.cn/images/202407250146195.png)

/// fc
组合型搜索 - 剪枝逻辑
///

时间复杂度：不太会计算时间复杂度，但是在本题的数据量下通过剪枝可以很快的算出方案。具体复杂度推导见 [三种方法：选或不选/枚举选哪个/完全背包预处理+可行性剪枝（Python/Java/C++/Go） - (LeetCode)](https://leetcode.cn/problems/combination-sum/solutions/2747858/liang-chong-fang-fa-xuan-huo-bu-xuan-mei-mhf9/)。

=== "Python"

    ```python
    class Solution:
        def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
            n = len(candidates)
            ans = []
            path = []
    
            def dfs(remain: int, idx: int) -> None:
                if remain < 0:
                    return
                elif remain == 0:
                    ans.append(path.copy())  # 对于列表，append 的是一个引用，所以要加 copy
                    return
                for i in range(idx, n):
                    path.append(candidates[i])
                    dfs(remain - candidates[i], i)
                    path.pop()
    
            dfs(target, 0)
    
            return ans
    ```

=== "C++"

    ```c++
    class Solution {
    public:
        vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
            int n = candidates.size();
            vector<vector<int>> ans;
            vector<int> path;
    
            function<void(int, int)> dfs = [&](int remain, int idx) {
                if (remain < 0) {
                    return;
                } else if (remain == 0) {
                    ans.push_back(path);
                    return;
                }
                for (int i = idx; i < n; i++) {
                    path.push_back(candidates[i]);
                    dfs(remain - candidates[i], i);
                    path.pop_back();
                }
            };
    
            dfs(target, 0);
    
            return ans;
        }
    };
    ```

## 扩展字符串

题意：给定一种字符串构造方法，进行 $q\ (1\le q\le 10)$ 次查询，每次询问第 $n\ (0\le n\le 10^5)$ 个字符串的第 $k\ (1\le k \le 10^{18})$ 个字符是什么（字符串下标从 $1$ 开始）。如果越界输出 `'.'`。字符串构造方法如下：

- $s_0 = $ `DKER EPH VOS GOLNJ ER RKH HNG OI RKH UOPMGB CPH VOS FSQVB DLMM VOS QETH SQB`；
- $s_i = $ `DKER EPH VOS GOLNJ UKLMH QHNGLNJ A` $+s_{i−1}+$ `AB CPH VOS FSQVB DLMM VOS QHNG A` $+s_{i−1}+$ `AB`。

思路：可以发现字符串构造方法类似二叉递归的形式，我们预处理每一个状态的字符串长度后直接递归搜索即可。由于 $n$ 的上限很大，如果直接存储每一个状态的长度肯定会炸（C++ 炸 long long，Python 炸时空），注意到询问的下标索引不超过 $10^{18}$，因此我们直接给每一个状态的字符串长度设置上限即可。

时间复杂度：$O(qn)$

=== "Python"

    ```python
    import sys
    sys.setrecursionlimit(100000)
    
    s = "DKER EPH VOS GOLNJ ER RKH HNG OI RKH UOPMGB CPH VOS FSQVB DLMM VOS QETH SQB"
    t0 = "DKER EPH VOS GOLNJ UKLMH QHNGLNJ A"
    t1 = "AB CPH VOS FSQVB DLMM VOS QHNG A"
    t2 = "AB"
    l0, l1, l2 = len(t0), len(t1), len(t2)
    
    a = [0] * 100001
    a[0] = len(s)
    for i in range(1, 100001):
        a[i] = min(2 * 10**18, l0 + l1 + l2 + a[i - 1] * 2)
    
    def dfs(n: int, k: int) -> str:
        if k > a[n]:
            return '.'
        if n == 0:
            return s[k - 1]
    
        if k > l0 + a[n - 1] + l1 + a[n - 1]:
            return t2[k - (l0 + a[n - 1] + l1 + a[n - 1]) - 1]
        elif k > l0 + a[n - 1] + l1:
            return dfs(n - 1, k - (l0 + a[n - 1] + l1))
        elif k > l0 + a[n - 1]:
            return t1[k - (l0 + a[n - 1]) - 1]
        elif k > l0:
            return dfs(n - 1, k - l0)
    
        return t0[k - 1]
    
    q = int(input())
    ans = ''
    for _ in range(q):
        n, k = map(int, input().strip().split())
        ans += dfs(n, k)
    
    print(ans)
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <vector>
    
    using namespace std;
    using ll = long long;
    
    const int N = 100001;
    
    ll a[N];
    string s = "DKER EPH VOS GOLNJ ER RKH HNG OI RKH UOPMGB CPH VOS FSQVB DLMM VOS QETH SQB";
    string t0 = "DKER EPH VOS GOLNJ UKLMH QHNGLNJ A";
    string t1 = "AB CPH VOS FSQVB DLMM VOS QHNG A";
    string t2 = "AB";
    int l0 = t0.size();
    int l1 = t1.size();
    int l2 = t2.size();
    
    char dfs(int n, ll k) {
        if (k > a[n]) {
            return '.';
        }
        if (n == 0) {
            return s[k - 1];
        }
    
        if (k > l0 + a[n - 1] + l1 + a[n - 1]) {
            return t2[k - (l0 + a[n - 1] + l1 + a[n - 1]) - 1];
        } else if (k > l0 + a[n - 1] + l1) {
            return dfs(n - 1, k - (l0 + a[n - 1] + l1));
        } else if (k > l0 + a[n - 1]) {
            return t1[k - (l0 + a[n - 1]) - 1];
        } else if (k > l0) {
            return dfs(n - 1, k - l0);
        } else {
            return t0[k - 1];
        }
    }
    
    int main() {
        a[0] = s.size();
        for (int i = 1; i < N; i++) {
            a[i] = min((ll)2E18, l0 + l1 + l2 + a[i - 1] * 2);
        }
    
        int q;
        cin >> q;
    
        string ans = "";
        while (q--) {
            int n;
            ll k;
            cin >> n >> k;
            ans += dfs(n, k);
        }
    
        cout << ans << "\n";
    
        return 0;
    }
    ```

## 01 迷宫

题意：给定一个 $n\times n\ (1\le n\le 1000)$ 的 01 方阵，询问 $m\ (1\le m\le 10^5)$ 次，每次询问从 $i,j\ (1\le i,j\le n)$ 出发可以移动多少格。移动规则为：可以走到曼哈顿距离为 $1$ 且与当前数值不同的四个格子中。

思路：

- 一道入门网格图遍历问题，放在这主要是为了熟悉连通分量的概念以及 DFS 与 BFS 在这类问题上的代码板子；
- 回到本题，显然不可能问一次遍历一次，考虑预处理。预处理就直接遍历网格图同时标记每一个连通分量的大小即可。这里有一个遍历的小 trick，在遍历时保留走过的路径，遍历结束后给走过的路径上全都赋上连通分量的大小即可；
- 上述 trick 也可以用并查集实现。

时间复杂度：$O(n^2)$

=== "Python BFS"

    ```python
    from collections import deque
    
    n, m = map(int, input().strip().split())
    g = [""] * n
    for i in range(n):
        g[i] = input().strip()
    
    ans = [[0] * n for _ in range(n)]
    vis = [[False] * n for _ in range(n)]
    dx = [-1, 1, 0, 0]
    dy = [0, 0, 1, -1]
    
    def bfs(i: int, j: int) -> None:
        cnt = 0
        path = []
        q = deque()
    
        cnt += 1
        path.append((i, j))
        vis[i][j] = True
        q.append((i, j))
        while q:
            x, y = q.popleft()
            for k in range(4):
                nx, ny = dx[k] + x, dy[k] + y
                if nx < 0 or nx >= n or ny < 0 or ny >= n:
                    continue
                if vis[nx][ny] or int(g[x][y]) ^ int(g[nx][ny]) == 0:
                    continue
                cnt += 1
                path.append((nx, ny))
                vis[nx][ny] = True
                q.append((nx, ny))
    
        for x, y in path:
            ans[x][y] = cnt
    
    for i in range(n):
        for j in range(n):
            if not vis[i][j]:
                bfs(i, j)
    
    for _ in range(m):
        i, j = map(int, input().strip().split())
        print(ans[i - 1][j - 1])
    ```

=== "Python DSU"

    ```python
    from collections import deque
    
    class DSU:
        def __init__(self, n: int) -> None:
            self.n = n
            self.sz = n
            self.p = [i for i in range(n)]
            self.cnt = [1 for i in range(n)]
    
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
            return self.cnt[self.find(a)]
    
    n, m = map(int, input().strip().split())
    g = [""] * n
    for i in range(n):
        g[i] = input().strip()
    
    dsu = DSU(n * n)
    vis = [[False] * n for _ in range(n)]
    dx = [-1, 1, 0, 0]
    dy = [0, 0, 1, -1]
    
    def bfs(i: int, j: int) -> None:
        q = deque()
        vis[i][j] = True
        q.append((i, j))
        
        while q:
            x, y = q.popleft()
            for k in range(4):
                nx, ny = dx[k] + x, dy[k] + y
                if nx < 0 or nx >= n or ny < 0 or ny >= n:
                    continue
                if vis[nx][ny] or int(g[x][y]) ^ int(g[nx][ny]) == 0:
                    continue
                
                dsu.merge(x * n + y, nx * n + ny)
                
                vis[nx][ny] = True
                q.append((nx, ny))
    
    for i in range(n):
        for j in range(n):
            if not vis[i][j]:
                bfs(i, j)
    
    for _ in range(m):
        i, j = map(int, input().strip().split())
        i -= 1
        j -= 1
        print(dsu.size(i * n + j))
    ```

=== "C++ DFS"

    ```c++
    #include <iostream>
    #include <vector>
    
    using namespace std;
    
    const int N = 1010;
    
    int n, m;
    string g[N];
    int ans[N][N];
    bool vis[N][N];
    
    int cnt;
    vector<pair<int, int>> path;
    int dx[4] = {-1, 1, 0, 0}, dy[4] = {0, 0, -1, 1};
    
    void dfs(int i, int j) {
        path.push_back({i, j});
        vis[i][j] = true;
        cnt += 1;
        for (int k = 0; k < 4; k++) {
            int nx = i + dx[k], ny = j + dy[k];
            if (nx < 0 || nx >= n || ny < 0 || ny >= n || 
                vis[nx][ny] || (g[nx][ny] - '0') ^ (g[i][j] - '0') == 0) {
                continue;
            }
            dfs(nx, ny);
        }
    }
    
    int main() {
        cin >> n >> m;
        for (int i = 0; i < n; i++) {
            cin >> g[i];
        }
    
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (vis[i][j]) {
                    continue;
                }
                cnt = 0;
                path.clear();
                dfs(i, j);
                for (auto& [x, y]: path) {
                    ans[x][y] = cnt;
                }
            }
        }
    
        while (m--) {
            int i, j;
            cin >> i >> j;
            cout << ans[i - 1][j - 1] << "\n";
        }
    
        return 0;
    }
    ```

## 将石头分散的最少移动次数

题意：给定一个 $3\times 3$ 的矩阵 $g$，其中数字总和为 $9$ 且 $g[i][j] \ge 0$，现在需要将其中 $>1$ 的数字沿着直角边移动到值为 $0$ 的位置上使得最终矩阵全为 $1$，输出最小的总移动距离。

思路：

- 记 $0$ 为空位，假设有 $k$ 个空位，那么就一定有 $k$ 个 $1$ 可以移动，因此这道题本质上就是 $k$ 个空位与 $k$ 个 $1$ 的匹配问题。为了不漏掉任何一种匹配方式，我们直接全排列枚举空位或者 $1$ 的位置即可，此处我们选择前者；
- Python 和 C++ 都内置了全排列的库函数：
    - C++ 的全排列枚举库函数为 `std::next_permutation(ItFirst, ItEnd)`，每次返回刚好比当前排列字典序大的排列；
    - Python 的全排列枚举库函数为 `itertools.permutations(Iterable)`，按照字典序一次性返回所有排列。

时间复杂度：$O(9\times 9!)$

=== "Python"

    ```python
    class Solution:
        def minimumMoves(self, g: List[List[int]]) -> int:
            a = []  # 存 0 的位置
            b = []  # 存 1 的位置
            for i in range(3):
                for j in range(3):
                    if g[i][j] == 0:
                        a.append((i, j))
                    elif g[i][j] > 1:
                        b.extend([(i, j)] * (g[i][j] - 1))
    
            ans = 1000
            n = len(a)
            vis = [False] * n
    
            def dfs(i: int, now: int) -> None:
                if i == n:
                    nonlocal ans
                    ans = min(ans, now)
                    return
    
                # i 是 1，j 是空位
                for j in range(n):
                    if vis[j]:
                        continue
                    vis[j] = True
                    dfs(
                        i + 1,
                        now + abs(a[j][0] - b[i][0]) + abs(a[j][1] - b[i][1])
                    )
                    vis[j] = False
    
            dfs(0, 0)
    
            return ans
    ```

=== "Python 库函数"

    ```python
    from itertools import permutations
    
    class Solution:
        def minimumMoves(self, g: List[List[int]]) -> int:
            a = []
            b = []
            for i in range(3):
                for j in range(3):
                    if g[i][j] == 0:
                        a.append((i, j))
                    elif g[i][j] > 1:
                        for _ in range(g[i][j] - 1):
                            b.append((i, j))
    
            ans = 1000
            for p in permutations(a):
                now = 0
                for i, (x, y) in enumerate(p):
                    now += abs(x - b[i][0]) + abs(y - b[i][1])
                ans = min(ans, now)
    
            return ans
    ```

=== "C++"

    ```c++
    class Solution {
    public:
        int minimumMoves(vector<vector<int>>& g) {
            vector<array<int, 2>> a, b;
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    if (g[i][j] == 0) {
                        a.push_back({i, j});
                    } else if (g[i][j] > 1) {
                        for (int _ = 0; _ < g[i][j] - 1; _++) {
                            b.push_back({i, j});
                        }
                    }
                }
            }
    
            int ans = 1000;
            int n = a.size();
            vector<bool> vis(n);
            
            auto dfs = [&](auto&& dfs, int i, int now) -> void {
                if (i == n) {
                    ans = min(ans, now);
                    return;
                }
                for (int j = 0; j < n; j++) {
                    if (vis[j]) {
                        continue;
                    }
                    vis[j] = true;
                    dfs(
                        dfs,
                        i + 1,
                        now + abs(a[j][0] - b[i][0]) + abs(a[j][1] - b[i][1])
                    );
                    vis[j] = false;
                }
            };
    
            dfs(dfs, 0, 0);
            
            return ans;
        }
    };
    ```

=== "C++ 库函数"

    ```c++
    class Solution {
    public:
        int minimumMoves(vector<vector<int>>& g) {
            vector<array<int, 2>> a, b;
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    if (g[i][j] == 0) {
                        a.push_back({i, j});
                    } else if (g[i][j] > 1) {
                        for (int _ = 0; _ < g[i][j] - 1; _++) {
                            b.push_back({i, j});
                        }
                    }
                }
            }
    
            int ans = 1000;
            do {
                int now = 0;
                for (int i = 0; i < a.size(); i++) {
                    now += abs(a[i][0] - b[i][0]) + abs(a[i][1] - b[i][1]);
                }
                ans = min(ans, now);
            } while (next_permutation(a.begin(), a.end()));
    
            return ans;
        }
    };
    ```

## 随机排列

题意：给定一个含有 $n\ (2\le n\le 10^6)$ 个数的排列。现在将这个排列进行一定次数的对换操作，问是对换了 $3n$ 次还是 $7n+1$ 次。

思路：

- 一看到排列对换，立刻想到一个结论：在排列中进行一次对换操作，排列的逆序数的奇偶性就会发生一次变化；
- 容易发现 $3n \equiv n \pmod 2,7n+1 \equiv n+1 \pmod 2$，因此两种对换次数下，排列的逆序数的奇偶性是不一样的，这就可以成为区分两种对换次数的判别依据；
- 在发现了上述 trick 后，本题就变成了求序列逆序数的板子题。可以借助归并排序的分治思想求解。

时间复杂度：$O(n \log n)$

=== "Python"

    ```python
    n = int(input().strip())
    a = list(map(int, input().strip().split()))
    
    def merge_sort(l: int, r: int) -> int:
        if l >= r:
            return 0
    
        # divide
        mid = (l + r) >> 1
    
        # conquer
        ans = merge_sort(l, mid) + merge_sort(mid + 1, r)
    
        # combine
        t = []
        i, j = l, mid + 1
        while i <= mid and j <= r:
            if a[i] <= a[j]:
                t.append(a[i])
                i += 1
            else:
                t.append(a[j])
                j += 1
                ans += mid - i + 1  # 点睛之笔
        while i <= mid:
            t.append(a[i])
            i += 1
        while j <= r:
            t.append(a[j])
            j += 1
        a[l:r+1] = t
    
        return ans
    
    cnt = merge_sort(0, n - 1)
    
    if n & 1:
        print(1 if cnt & 1 else 2)
    else:
        print(2 if cnt & 1 else 1)
    ```

=== "C++"

    ```cpp
    #include <iostream>
    #include <vector>
    
    using namespace std;
    using ll = long long;
    
    const int N = 1000010;
    
    int n;
    int a[N];
    
    ll merge_sort(int l, int r) {
        if (l >= r) {
            return 0;
        }
    
        // divide
        int mid = (l + r) >> 1;
    
        // conquer
        ll ans = merge_sort(l, mid) + merge_sort(mid + 1, r);
    
        // combine
        int i = l, j = mid + 1;
        vector<int> t;
        while (i <= mid && j <= r) {
            if (a[i] <= a[j]) {
                t.push_back(a[i++]);
            } else {
                t.push_back(a[j++]);
                ans += mid - i + 1;  // 点睛之笔
            }
        }
        while (i <= mid) {
            t.push_back(a[i++]);
        }
        while (j <= r) {
            t.push_back(a[j++]);
        }
        for (int k = l, idx = 0; k <= r; k++) {
            a[k] = t[idx++];
        }
    
        return ans;
    }
    
    int main() {
        cin >> n;
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
    
        ll cnt = merge_sort(0, n - 1);
    
        if (n & 1) {
            cout << (cnt & 1 ? 1 : 2) << "\n";
        } else {
            cout << (cnt & 1 ? 2 : 1) << "\n";
        }
    
        return 0;
    }
    ```
