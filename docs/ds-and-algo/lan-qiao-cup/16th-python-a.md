---
title: 第 16 届 Python A 组（省赛）
---

!!! tip
    官方 OJ 还没有开放评测，下述代码均为本人考场或赛后编写，仅供参考。真题见我的云盘：[第十六届蓝桥杯大赛软件赛省赛_PA.pdf](https://www.jianguoyun.com/p/DQbXSVwQo_mQDRj49vQFIAA)。

## T1 偏蓝 (?'/5')

题意：定义三元组中每一位的取值范围为 $[0,255]$ 的整数，问有多少个三元组满足：三元组中的第三个位置的数严格大于前两个位置的数。

思路：直接三重循环遍历一遍即可。

最终答案为：$5559680$

=== "Python"

    ```python
    ans = 0
    for i in range(256):
        for j in range(256):
            for k in range(256):
                ans += (k > i) and (k > j)
    print(ans)
    ```

## T2 IPv6 (0'/5')

题意：问所有的最简 IPv6 的表示形式有多少种。

思路：不会，TODO。

## T3 2025 图形 (?'/10')

题意：给定 $h,w\ (1\le h,w\le 100)$，按照 $2,0,2,5$ 的顺序循环打印一个 $h$ 行 $w$ 列的字符串矩阵，同行中没有空格。

思路：纯模拟。

时间复杂度：$O(hw)$

=== "Python"

    ```python
    h, w = tuple(map(int, input().strip().split()))
    
    a = ['2', '0', '2', '5']
    
    for i in range(h):
        ans = ''
        idx = i % 4
        j = 0
        for j in range(w):
            ans += a[idx]
            idx = (idx + 1) % 4
        print(ans)
    ```

## T4 最大数字 (?'/10')

题意：给定一个含有 $n\ (1\le n\le 10^4)$ 个数的排列，现在需要重排使得重排后的序列中所有元素「二进制拼接」后的二进制数值最大，输出这个最大二进制数对应的十进制数。

思路：贪心题，就是自定义一个排序规则。对于两个十进制数，我们从高到低位贪心比较其二进制表示，在比较时：

- 当不等时，谁是 $1$ 谁就排在前面；
- 如果前缀完全一致，二进制长度短的排在前面。因为长度更长的后面可能紧跟着 $0$，这是不利的。

时间复杂度：$O(n\log^2 n)$，注意本题二进制转换十进制其实是很慢的，不知道评测机能不能扛得住。

=== "Python"

    ```python
    n = int(input().strip())
    
    class Obj:
        def __init__(self, x: str) -> None:
            self.x = x
    
        def __lt__(self, obj) -> bool:
            y = obj.x
            lx = len(self.x)
            ly = len(y)
            i = j = 0
            while i < lx and j < ly:
                if self.x[i] != y[j]:
                    return self.x[i] > y[j]
                i += 1
                j += 1
            return lx < ly
    
    def parse(x: int) -> Obj:
        b = ''
        while x:
            b += str(x % 2)
            x //= 2
        return Obj(b[::-1])
    
    a = []
    for i in range(1, n + 1):
        a.append(parse(i))
    
    a.sort()
    
    s = ''
    for o in a:
        s += o.x
    
    print(int(s, 2))
    ```

## T5 倒水 (?'/15')

题意：给定一个含有 $n\ (1\le n\le 10^5)$ 个数的序列 $a\ (1\le a_i \le 10^5)$ 和一个整数 $k\ (1\le k\le n)$。现在定义一种数值转移规则：对于第 $i$ 个元素 $a_i$，其可以从任意一个 $j < i$ 且 $i\equiv j \pmod k$ 的元素中转移一部分数值到自己身上。问经过任意次这种转移操作后，序列最小的元素最大可以是多少。

思路：看到最大化最小元素立刻想到了二分，但是看到只能从前缀部分转移，貌似扫描一遍就可以了。我们分 $k$ 组，每组从左往右遍历并记录前缀元素数量、前缀和、前缀最小值：

- 如果当前元素比不小于前缀最小值，那么就不会影响全局最小值，不用操作；
- 如果当前元素严格小于前缀最小值，那么就肯定要拿前缀的数值转移一部分到自己身上，至于转移多少不重要，重要的是要更新转移后的前缀最小值。

时间复杂度：$O(n)$

=== "Python"

    ```python
    n, k = tuple(map(int, input().strip().split()))
    a = list(map(int, input().strip().split()))
    
    ans = max(a)
    for i in range(k):
        cnt = 1
        pre = a[i]
        pre_min = a[i]
        for j in range(i + k, n, k):
            if a[j] >= pre_min:
                cnt += 1
                pre += a[j]
                continue
    
            cnt += 1
            pre += a[j]
            if pre // cnt >= pre_min:
                continue
    
            pre_min = pre // cnt
    
        ans = min(ans, pre_min)
    
    print(ans)
    ```

## T6 拼好数 (0'/15')

题意：给定一个含有 $n\ (1\le n\le 10^3)$ 个数的序列 $a\ (0\le a_i \le 10^9)$。为了最大化「数字中 $6$ 的个数超过 $6$ 个」的数字个数，现在可以给这些数分组（每组不超过 3 个元素）并将同一个组的数直接拼起来。问「数字中 $6$ 的个数超过 $6$ 个」的数字个数最大是多少。

思路：不会，TODO。

## T7 登山 (?'/20')

题意：给定一个 $n$ 行 $m$ 列的矩阵 $a\ (1\le a_{ij}\le 10^9)$，满足 $1\le n,m \le 10^4,1\le n\times m \le10^6$。给定在矩阵中的行走规则：可以走到同行同列中任意一个满足「向左或向上比当前元素大的位置上」、「向右或向下比当前元素小的位置上」。计算每个格子可以到达的最大高度，输出其均值并保留 $6$ 位小数。

思路：直接遍历每一个连通分量即可，可以用 DSU，也可以二次遍历来给连通分量中每个位置标上可到达的最大值。和 [01 迷宫](../examples/examples-basic-algo.md/#01-迷宫) 这道题很相似。

时间复杂度：$O(nm(n+m))$

=== "Python"

    ```python
    n, m = tuple(map(int, input().strip().split()))
    g = [LII() for _ in range(n)]
    ans = [[0] * m for _ in range(n)]
    
    vis = [[False] * m for _ in range(n)]
    
    def bfs(u: int, v: int):
        q = deque()
        path = []
        ma = -1
    
        vis[u][v] = True
        path.append((u, v))
        q.append((u, v))
        ma = max(ma, g[u][v])
    
        while q:
            x, y = q.popleft()
            for j in range(m):
                if j < y and g[x][j] > g[x][y] and not vis[x][j]:
                    vis[x][j] = True
                    path.append((x, j))
                    q.append((x, j))
                    ma = max(ma, g[x][j])
                if j > y and g[x][j] < g[x][y] and not vis[x][j]:
                    vis[x][j] = True
                    path.append((x, j))
                    q.append((x, j))
                    ma = max(ma, g[x][j])
            for i in range(n):
                if i < x and g[i][y] > g[x][y] and not vis[i][y]:
                    vis[i][y] = True
                    path.append((i, y))
                    q.append((i, y))
                    ma = max(ma, g[i][y])
                if i > x and g[i][y] < g[x][y] and not vis[i][y]:
                    vis[i][y] = True
                    path.append((i, y))
                    q.append((i, y))
                    ma = max(ma, g[i][y])
    
        for x, y in path:
            ans[x][y] = ma
    
    for i in range(n):
        for j in range(m):
            if vis[i][j]:
                continue
            bfs(i, j)
    
    s = 0
    for i in range(n):
        for j in range(m):
            s += ans[i][j]
    
    print(f"{s/(n * m):.6f}")
    ```

## T8 原料采购 (0'/20')

题意：在一维坐标轴正方向上，给定一辆位于原点处的货车，其容量为 $m\ (1\le m\le 10^9)$。正方向上有从近到远的 $n\ (1\le n \le 10^5)$ 个进货源，每个进货源都有一个进货单价、存货量以及和原点的距离，分别记作 $a,b,c\ (1\le a_i,b_i,c_i \le 10^9)$。货车每行驶 $1$ 个单位花费 $o$ 且无需返程。问在进满货的情况下最低进货成本是多少。

思路：不会，TODO。应该是反悔贪心，用堆维护已经选择的货物，考场上没有写出来。
