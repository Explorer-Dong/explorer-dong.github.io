---
title: 进阶数据结构
---

## 前言

本文记录进阶数据结构的「例题解析」。

## 并查集

孤立点数量

<https://www.acwing.com/problem/content/5560/>

> 题意：给定一个无向图，可能不连通，没有重边和自环。现在需要给图中的每一条无向边定向，要求所有的边定完向以后 0 入度的点尽可能的少，给出最少的 0 入度点的数量
>
> 思路：我们知道对于一棵树而言，n 个结点一共有 n-1 条边，也就可以贡献 n-1 个入度，因此至少有一个点的入度为 0。而如果不是一棵树，就会有至少 n 条边，也就至少可以贡献 n 个入度，那么 n 个结点就至少全都有入度了。显然的，一个图至少含有 n 条边时就一定有环。有了上述思路以后就可以发现，这道题本质上就是在判断连通分量是否含有环，如果有环，那么该连通分量定向边以后就不会产生 0 入度的顶点，反之，如果没有环，那么定向边以后最少产生 1 个 0 入度的点。
>
> - 算法一：遍历图。我们采用 dfs 遍历的方式即可解决问题。一边遍历一边打标记，遇到已经打过标记的非父结点就表明当前连通分量有环。我们使用 C++ 实现
>
>     时间复杂度：$O(n+m)$
>
> - 算法二：并查集。由于没有重边，因此在判断每一个连通分量是否含有环时，可以直接通过该连通分量中点和边的数量关系得到结果。我们使用 Python 和 JavaScript 实现
>
>     时间复杂度：$O(n)$

C++

```cpp
// 实现 dfs 算法

#include <iostream>
#include <cstring>
#include <vector>
#include <queue>
#include <stack>
#include <algorithm>
#include <unordered_map>
#include <set>
using namespace std;

const int N = 100010;

int n, m;
vector<int> G[N];
bool vis[N];

void dfs(int fa, int now, bool& hasLoop) {
    vis[now] = true;
    for (auto& ch: G[now]) {
        if (ch != fa) {
            if (vis[ch]) hasLoop = true;
            else dfs(now, ch, hasLoop);
        }
    }
}

void solve() {
    cin >> n >> m;
    while (m--) {
        int a, b;
        cin >> a >> b;
        G[a].push_back(b);
        G[b].push_back(a);
    }
    
    int res = 0;
    
    for (int i = 1; i <= n; i++) {
        if (!vis[i]) {
            bool hasLoop = false;
            dfs(-1, i, hasLoop);
            if (!hasLoop) res++;
        }
    }
    
    cout << res << "\n";
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

Python

```python
# 实现 dsu 算法

p = [_ for _ in range(100010)]


def Find(x: int) -> int:
    if x != p[x]: p[x] = Find(p[x])
    return p[x]


def solve() -> None:
    n, m = map(int, input().split())

    edgeNum = [0] * (n + 1) # 每个点的连边数

    for _ in range(m):
        u, v = map(int, input().split())
        edgeNum[u] += 1
        edgeNum[v] += 1
        p[Find(u)] = Find(v)

    union = {}

    class node:
        def __init__(self):
            self.v = self.e = 0

    for i in range(1, n + 1):
        nowp = Find(i)
        if nowp not in union: union[nowp] = node()

        union[nowp].v += 1
        union[nowp].e += edgeNum[i]

    res = 0

    for comp in union:
        if union[comp].e >> 1 == union[comp].v - 1:
            res += 1

    print(res)


if __name__ == "__main__":
    solve()
```

JavaScript

```javascript
// 实现 dsu 算法

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let n = null;
let m = null;
let p = [], edgeNum = [];

rl.on('line', line => {
    const [a, b] = line.split(' ').map(i => Number(i));
    if (n === null) {
        n = a;
        m = b;
        for (let i = 1; i <= n; i++) {
            p[i] = i;
            edgeNum[i] = 0;
        }
    } else {
        edgeNum[a]++;
        edgeNum[b]++;
        p[Find(a)] = Find(b);
    }
});

rl.on('close', () => {
    const res = solve();
    console.log(res);
});

function Find(x) {
    if (x != p[x]) p[x] = Find(p[x]);
    return p[x];
}

function solve() {
    let res = 0;

    // 自定义结构体
    class Node {
        constructor() {
            this.v = 0;
            this.e = 0;
        }
    }

    /*
        另一种结构体定义方法
        function Node() {
            this.v = 0;
            this.e = 0;
        }
    */

    // 哈希
    let union = new Map();

    for (let i = 1; i <= n; i++) {
        let nowp = Find(i); // 当前结点的祖宗结点 nowp
        if (!union.has(nowp)) union.set(nowp, new Node());

        union.get(nowp).v += 1;
        union.get(nowp).e += edgeNum[i];
    }

    // 判断
    for (let i of union.keys()) {
        if (union.get(i).e >> 1 === union.get(i).v - 1) {
            res++;
        }
    }

    return res;
}
```
