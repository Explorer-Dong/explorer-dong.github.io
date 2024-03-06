---
title: graphs
categories: Algorithm
category_bar: true
---

## graphs

### 1. 有向图的拓扑序列

https://www.acwing.com/problem/content/850/

> 题意：输出一个图的拓扑序，不存在则输出-1
>
> 思路：
>
> - 首先我们要知道拓扑图的概念，感官上就是一张图可以从一个方向拓展到全图，用数学语言就是：若一个由图中所有点构成的序列 A 满足：对于图中的每条边 (x,y)，x 在 A 中都出现在 y 之前，则称 A 是该图的一个拓扑序列
> - 接着我们就想要寻找这样的序列 A 了，可以发现对于每一个可扩展的点，入度一定为0，那么我们就从这些点开始宽搜，将搜到的点的入度-1，即删除这条边，直到最后。如果全图的点的入度都变为了0，则此图可拓扑
>
> 时间复杂度：$O(n+m)$

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 100010;

int n, m;
vector<int> G[N];

void solve() {
	// 建图 
	cin >> n >> m;
	vector<int> d(n + 1, 0);
	for (int i = 1; i <= m; i++) {
		int a, b;
		cin >> a >> b;
		d[b]++;
		G[a].push_back(b);
	}
	
	// 预处理宽搜起始点集
	queue<int> q;
	for (int i = 1; i <= n; i++)
		if (!d[i])
			q.push(i);
	
	// 宽搜处理
	vector<int> res;
	while (q.size()) {
		auto h = q.front();
		q.pop();
		res.push_back(h);
		
		for (auto& ch: G[h]) {
			d[ch]--;
			if (!d[ch]) q.push(ch);
		}
	}
	
	// 输出合法拓扑序
	if (res.size() == n) {
		for (auto& x: res) {
			cout << x << " ";
		}
	} else {
		cout << -1 << "\n";
	}
}

int main() {
	solve();
	return 0;
}
```

### 2. Mad City:fire:

https://codeforces.com/contest/1873/problem/H

> tag：基环树、拓扑排序
>
> 题意：给定一个基环树，现在图上有两个点，分别叫做A，B。现在B想要逃脱A的抓捕，问对于给定的局面，B能否永远逃离A的抓捕
>
> 思路：思路很简单，我们只需要分B所在位置的两种情况讨论即可
>
> 1. B不在环上：此时我们记距离B最近的环上的那个点叫 $tag$，我们需要比较的是A到tag点的距离 $d_A$ 和B到tag的距离 $d_B$，如果 $d_B < d_A$，则一定可以逃脱，否则一定不可以逃脱
> 2. B在环上：此时我们只需要判断当前的A点是否与B的位置重合即可，如果重合那就无法逃脱，反之B一定可以逃脱。
>
> 代码实现：
>
> 1. 对于第一种情况，我们需要找到tag点以及计算A和B到tag点的距离，
>
> 时间复杂度：

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 200010;

int n, a, b;
vector<int> G[N];
int rd[N], tag, d[N];
bool del[N], vis[N];

void init() {
	for (int i = 1; i <= n; i++) {
		G[i].clear();		// 存无向图 
		rd[i] = 0;			// 统计每一个结点的入度 
		del[i] = false;		// 拓扑删点删边时使用 
		d[i] = 0;			// 图上所有点到 tag 点的距离 
		vis[i] = false;		// bfs计算距离时使用 
	}
}

void topu(int now) {
	if (rd[now] == 1) {
		rd[now]--;
		del[now] = true;
		for (auto& ch: G[now]) {
			if (del[ch]) continue;
			rd[ch]--;
			if (now == tag) {
				tag = ch;
			}
			topu(ch);
		}
	}
}

void bfs() {
	queue<int> q;
	q.push(tag);
	d[tag] = 0;
	
	while (q.size()) {
		auto now = q.front();
		vis[now] = true;
		q.pop();
		
		for (auto& ch: G[now]) {
			if (!vis[ch]) {
				d[ch] = d[now] + 1;
				q.push(ch);
				vis[ch] = true;
			}
		}
	}
}

void solve() {
	// 初始化
	cin >> n >> a >> b; 
	init();
	
	// 建图 
	for (int i = 1; i <= n; i++) {
		int u, v;
		cin >> u >> v;
		G[u].push_back(v), rd[v]++;
		G[v].push_back(u), rd[u]++;
	}
	
	// 拓扑删边 & 缩b点
	tag = b;
	for (int i = 1; i <= n; i++) {
		topu(i);
	}

	// 判断结果 & 计算距离 
	if (rd[b] == 2 && a != b) {
		// b点在环上
		cout << "Yes\n";
	} else {
		// b不在环上
		bfs();
		cout << (d[a] > d[b] ? "Yes\n" : "No\n");
	}
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(0);
	int T = 1;
	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 3. 染色法判定二分图

https://www.acwing.com/problem/content/862/

> 题意：给定一个无向图，可能有重边和自环。问是否可以构成二分图。
>
> 二分图的定义：一个图可以被分成两个点集，每个点集内部没有边相连（可以不是连通图）
>
> 思路：利用**染色法**，遍历每一个连通分量，选择连通分量中的任意一点进行染色扩展
>
> - 如果扩展到的点没有染过色，则染成与当前点相对的颜色
> - 如果扩展到的点已经被染过色了且染的颜色和当前点的颜色相同，则无法构成二分图（奇数环）
>
> 时间复杂度：$O(n+e)$

```cpp
const int N = 100010;

int n, m;
vector<int> G[N], col(N);

bool bfs(int u) {
	queue<int> q;
	q.push(u);
	col[u] = 1;

	while (q.size()) {
		int now = q.front();
		q.pop();
		for (auto& ch: G[now]) {
			if (!col[ch]) {
				col[ch] = -col[now];
				q.push(ch);
			}
			else if (col[ch] == col[now]) {
				return false;
			}
		}
	}

	return true;
}

void solve() {
	cin >> n >> m;
	while (m--) {
		int u, v;
		cin >> u >> v;
		G[u].push_back(v);
		G[v].push_back(u);
	}

	// 遍历每一个连通分量
	for (int i = 1; i <= n; i++) {
		if (!col[i]) {
			bool ok = bfs(i);
			if (!ok) {
				cout << "No\n";
				return;
			}
		}
	}

	cout << "Yes\n";
}
```

### 4. Kruskal算法求最小生成树

https://www.acwing.com/problem/content/861/

> 题意：给定一个无向图，可能含有重边和自环。试判断能否求解其中的最小生成树，如果可以给出最小生成树的权值
>
> 思路：根据数据量，可以发现顶点数很大，不适用 $Prim$ 算法，只能用 $Kruskal$ 算法，下面简单介绍一下该算法的流程
>
> - 自环首先排除 - 显然这条边连接的“两个”顶点是不可能选进 $MST$ 的
> - 首先将每一个结点看成一个连通分量
> - 接着按照权值将所有的边升序排序后，依次选择
>     - 如果选出的这条边的两个顶点不在一个连通分量中，则选择这条边并将两个顶点所在的连通分量合并
>     - 如果选出的这条边的两个顶点在同一个连通分量中，则不能选择这条边（否则会使得构造的树形成环）
> - 最后统计选择的边的数量 $num$ 进行判断即可
>     - $num=n-1$，则可以生成最小生成树
>     - $num<n-1$，则无法生成最小生成树
> - 时间复杂度：$O(e\log e)$ - 因为最大的时间开销在对所有的边的权值进行排序上

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

const int N = 100010;

struct edge {
	int a, b;
	int w;
};

int n, m;
vector<edge> edges;
vector<int> p(N);

int Find(int now) {
	if (p[now] != now) {
		p[now] = Find(p[now]);
	}
	return p[now];
}

void solve() {
	cin >> n >> m;
	for (int i = 1; i <= m; i++) {
		int a, b, w;
		cin >> a >> b >> w;
		if (a == b) {
			continue;
		}
		edges.push_back({a, b, w});
	}

	// 按照边权升序排序
	sort(edges.begin(), edges.end(), [&](edge& x, edge& y) {
		return x.w < y.w;
	});

	// 选边
	for (int i = 1; i <= n; i++) {
		p[i] = i;
	}

	int res = 0, num = 0;

	for (auto& e: edges) {
		int pa = Find(e.a), pb = Find(e.b);
		if (pa != pb) {
			num++;
			p[pa] = pb;
			res += e.w;
		}

		if (num == n - 1) {
			break;
		}
	}

	// 特判：选出来的边数无法构成一棵树
	if (num < n - 1) {
		cout << "impossible\n";
		return;
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

### 5. Prim算法求最小生成树

https://www.acwing.com/problem/content/860/

> 题意：给定一个稠密无向图，有重边和自环。求出最小生成树
>
> 思路：根据题目的数据量，可以使用邻接矩阵存储的方法配合 $Prim$ 算法求解最小生成树，下面给出该算法的流程
>
> - 首先明确一下变量的定义：
>     - `g[i][j]` 为无向图的邻接矩阵存储结构
>     - `MST[i]` 表示 $i$ 号点是否加入了 $MST$ 集合
>     - `d[i]` 表示 `i` 号点到 $MST$ 集合的最短边长度
> - 自环不存储，重边只保留最短的一条
> - 任选一个点到集合 $MST$ 中，并且更新 $d$ 数组
> - 选择剩余的 $n-1$ 个点，每次选择有以下流程
>     - 找到最短边，记录最短边长度 $e$ 和相应的在 $U-MST$ 集合中对应的顶点序号 $v$
>     - 将 $v$ 号点加入 $MST$ 集合，同时根据此时选出的最短边的长度来判断是否存在最小生成树
>     - 根据 $v$ 号点，更新 $d$ 数组，即更新在集合 $U-MST$ 中的点到 $MST$ 集合中的点的交叉边的最短长度
> - 时间复杂度：$O(n^2)$

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

const int N = 510;

int n, m;
vector<vector<int>> g(N, vector<int>(N, INT_MAX));
vector<int> d(N, INT_MAX); // d[i]表示i号点到MST集合中的最短边长度
bool MST[N];
int res;

void prim() {
	// 选任意一个点到MST中并更新d数组
	MST[1] = true;
	for (int i = 1; i <= n; i++)
		if (!MST[i])
			d[i] = min(d[i], g[i][1]);

	// 选剩下的n-1个点到MST中
	for (int i = 2; i <= n; i++) {
		// 1. 找到最短边
		int e = INT_MAX, v = -1; // e: 最短边长度，v: 最短边不在MST集合中的顶点
		for (int j = 1; j <= n; j++)
			if (!MST[j] && d[j] < e)
				e = d[j], v = j;

		// 2. 加入MST集合
		MST[v] = true;
		if (e == INT_MAX) {
			// 特判无法构造MST的情况
			cout << "impossible\n";
			return;
		} else {
			res += e;
		}

		// 3. 更新交叉边 - 迭代（覆盖更新）
		for (int j = 1; j <= n; j++)
			if (!MST[j])
				d[j] = min(d[j], g[j][v]);
	}

	cout << res << "\n";
}

void solve() {
	cin >> n >> m;
	while (m--) {
		int a, b, w;
		cin >> a >> b >> w;

		if (a == b) {
			continue;
		}

		if (g[a][b] == INT_MAX) {
			g[a][b] = w;
			g[b][a] = w;
		} else {
			g[a][b] = min(g[a][b], w);
			g[b][a] = min(g[b][a], w);
		}
	}

	prim();
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

### 6. Dijkstra求最短路 I

https://www.acwing.com/problem/content/851/

> 题意：给定一个无向图，可能存在重边与自环，问1号点到n号点的最短路径长度是多少，1到n没有通路就输出-1
>
> 思路：
>
> - 存储：根据数据量，即点少边多的稠密图，我们采用邻接矩阵的方式存储图
> - 求解：我们定义 d[i] 数组表示源点到 i 号点的最短距离。先将源点放入 SPT 集合，然后更新所有 V-SPT 中的点到 SPT 集合的最短路径长度。接着循环 n-1 次迭代更新剩余的 n-1 个点，最终的 d[end] 就是答案。
> - 总结：算法整体采用贪心与动态规划的思路，与 Prim 算法仔细比对可知，其中的贪心过程几乎一致，而动态规划的过程体现在在求解出集合 V-SPT 中到集合 STP 最短距离的点 vex 之后，利用该点对其余在 V-SPT 中的点更新 d[j] 的过程。更新前的状态都是在之前的子结构下的最优解，因此更新就是基于动态规划进行的。（此处仔细体悟）
>
> 时间复杂度：$O(n^2)$

```cpp
#include <bits/stdc++.h>

using namespace std;

const int N = 510, INF = 0x3f3f3f3f;

int n, m;
int g[N][N];

int dijkstra(int start, int end) {
	vector<int> d(n + 1, INF);
	vector<bool> SPT(n + 1, false);

	d[start] = 0;

	/* 1. 将起点加入SPT集合 */
	SPT[start] = true;
	for (int j = 1; j <= n; j++)
		if (!SPT[j])
			d[j] = min(d[j], d[start] + g[start][j]);

	/* 2. 选择到起点最近的点(greedy)，更新到起点最近的点(dp) */
	for (int i = 1; i <= n - 1; i++) {
		// 找到V-SPT中到起点最近的点vex
		int vex = -1;
		for (int j = 1; j <= n; j++)
			if (!SPT[j] && (vex == -1 || d[j] < d[vex]))
				vex = j;

		// 将vex加入SPT
		SPT[vex] = true;

		// 更新所有V-SPT中的点到起点的最短距离
		for (int j = 1; j <= n; j++)
			if (!SPT[j])
				d[j] = min(d[j], d[vex] + g[vex][j]);
	}

	return d[end] == INF ? -1 : d[end];
}

void solve() {
	cin >> n >> m;

	for (int i = 1; i <= n; i++)
		for (int j = 1; j <= n; j++)
			g[i][j] = i == j ? 0 : INF;

	while (m--) {
		int u, v, w;
		cin >> u >> v >> w;
		g[u][v] = min(g[u][v], w);
//		g[v][u] = min(g[v][u], w);
	}

	cout << dijkstra(1, n) << "\n";
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(nullptr), cout.tie(nullptr);
	int T = 1;
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 7. Floyd求最短路

https://www.acwing.com/problem/content/856/

> ==题意：==
>
> 给定一个稠密有向图，可能存在重边与自环，给出多个询问，需要给出每一个询问的两个点之前的最短路径长度
>
> ==思路：==
>
> 我们采用动态规划的思路。在此使用多阶段决策的方法，即每一个路径状态为选择 $1\to k$ 个点的情况下的最短路径长度
>
> - 状态表示：`f[k][i][j]` 表示在前 $k$ 个顶点中进行选择（中转），$i$ 号点到 $j$ 号点的最短路径长度
> - 状态转移：对于第 $k$ 个顶点，我们可以选择中转，也可以不中转。
>     - 对于不选择中转的情况：`f[k][i][j] = f[k-1][i][j]`
>     - 对于可选择中转的情况：`f[k][i][j] = f[k-1][i][k] + f[k-1][k][j]`
>     - 在其中取最小值即可，但是有一个注意点：对于第二种情况，选择是有一个约束的：即如果选择了 $k$ 号点进行转移的话，那么 $i$ 号点到 $k$ 号点以及 $k$ 号点到 $j$ 号点都是需要有路径可达的，从而可以选择最小距离
> - 初始化：即选择 0 个站点进行中转时，即 `f[0][i][j]` 的情况中，
>     - 如果 $i$ 号点与 $j$ 号点自环，则取 $0$
>     - 如果 $i$ 号点与 $j$ 号点之间有边，则取重边的最小值
>     - 如果 $i$ 号点与 $j$ 号点之间无边，则初始化为正无穷
> - 答案状态：对于 $a$ 号点到 $b$ 号点之间的最小路径长度，就是 `f[n][a][b]`
> - 时间复杂度：$O(n^3)$
> - 空间复杂度：$O(n^3)$
>
> ==空间优化推导：==
>
> - 我们尝试优化掉记忆数组的第一维度
>
> - 对于不选择的情况：由于决策局面 $k$ 是从前往后枚举，故当前状态 `f[k][i][j]` 可以**直接依赖于已经更新出来且不会被当前状态之后的状态再次覆盖的最优子结构 `f[i][j]`**。即上一个局面的选择情况，就是不选择第 $k$ 个顶点的情况
>
> - 对于选择的情况：如果删除第一维度，我们担心的是当前状态 `f[k][i][j]` 依赖的两个状态 `f[i][k]` 与 `f[k][j]` 会不会被后续覆盖掉，即**我们不确定 `f[i][k]` 与 `f[k][j]` 是否是当前第 k 个局面的最优子结构**。尝试推导：
>
>     > 为了确定 `f[i][k]` 与 `f[k][j]` 是否是当前第 $k$ 个局面的最优子结构，其实就是确定对于当前第 $k$ 个局面，这两个状态会不会在当前状态 `f[i][j]` 之后被更新覆盖，那么我们就看这两个状态是从哪里转移过来进行更新的。如果 `f[i][k]` 与 `f[k][j]` 这两个状态的转移会依赖于当前状态之后的状态，那么删除第一维度就是错误的，反之就是成立的。
>     >
>     > 尝试推导 `f[i][k]` 与 `f[k][j]` 从何转移更新：利用我们未删除维度时正确的状态转移方程进行推演
>     >
>     > 我们知道：`f[k][i][k] = min(f[k-1][i][k], f[k-1][i][k] + f[k-1][k][k])`，其中的 `f[k-1][k][k]` 就是一个自环的路径长度，由于 $floyd$ 算法的约束条件是没有负环，因此 `f[k-1][k][k]` 一定大于零，故 `f[k][i][k]` 一定取前者，即 `f[k][i][k] = f[k-1][i][k]`
>     >
>     > 同理可知：
>     >
>     > `f[k][k][j] = f[k-1][k][j]`
>
>     基于上述推导我们可以知道，当前第 $k$ 个决策局面中的 `f[k][i][k]` 与 `f[k][k][j]` 是依赖于上一个决策局面 $k-1$ 的，也就是说这**两个状态一定是早于当前状态 `f[i][j]` 被更新覆盖的**，故 `f[i][k]` 与 `f[k][j]` 就是当前第 $k$ 个局面的最优子结构，证毕，可以进行维度的删除
>
> - 时间复杂度：$O(n^3)$
>
> - 空间复杂度：$O(n^2)$

不优化空间

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 210, INF = 0x3f3f3f3f;

int n, m, Q;
int f[N][N][N];

int main() {
    cin >> n >> m >> Q;
    
    // init
    memset(f, INF, sizeof f);
    
    // add edges and generate base
    while (m--) {
        int a, b, w;
        cin >> a >> b >> w;
        if (a == b) continue;                           // 重边就不赋值
        else if (f[0][a][b] == INF) f[0][a][b] = w;     // 第一次加边则直接赋值
        else f[0][a][b] = min(f[0][a][b], w);           // 再次赋边权就取最小值
    }
    
    // generate base again
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            if (i == j) 
                f[0][i][j] = 0;                         // 自环取边权为 0
    
    // dp 
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++) {
                // 不选第k个顶点
                f[k][i][j] = f[k - 1][i][j];
                
                // 选择第k个顶点
                if (f[k - 1][i][k] != INF && f[k - 1][k][j] != INF)
                    f[k][i][j] = min(f[k][i][j], f[k - 1][i][k] + f[k - 1][k][j]);
            }

    // query
    while (Q--) {
        int a, b;
        cin >> a >> b;
        if (f[n][a][b] == INF) cout << "impossible\n";
        else cout << f[n][a][b] << "\n";
    }
    
    return 0;
}
```

优化空间

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 210, INF = 0x3f3f3f3f;

int n, m, Q;
int f[N][N];

int main() {
    cin >> n >> m >> Q;
    
    // init
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            if (i == j) f[i][j] = 0;
            else f[i][j] = INF;
            
    // base
    while (m--) {
        int a, b, w;
        cin >> a >> b >> w;
        if (a == b) continue;
        else if (f[a][b] == INF) f[a][b] = w;
        else f[a][b] = min(f[a][b], w);
    }
    
    // dp
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            for (int j = 1; j <= n; j++)
                if (f[i][k] != INF && f[k][j] != INF)
                    f[i][j] = min(f[i][j], f[i][k] + f[k][j]);
    
    // query
    while (Q--) {
        int a, b;
        cin >> a >> b;
        if (f[a][b] == INF) cout << "impossible\n";
        else cout << f[a][b] << "\n";
    }
    
    return 0;
}
```

### 8. 图的遍历

https://www.luogu.com.cn/problem/P3916

> 题意：给定一个有向图，求解每一个点可以到达的编号最大的点
>
> 思路：如果从正向考虑，很显然的一个暴力方法就是对于每一个点都跑一遍 dfs 或者 bfs 获取可达的最大点编号，时间复杂度 $O(n^2)$，如果想要在遍历的过程中同时更新其余的点，那只有起点到最大点之间的点可以被更新，可以通过递归时记录路径点进行，时间复杂度几乎不变。我们尝试反向考虑：**反向建边**。既然正向考虑时需要标记的点为最大点与起点的路径，那不如直接从最大值点开始遍历搜索，在将所有的边全部反向以后，从最大值点开始遍历图，这样就可以在线性时间复杂度内解决问题
>
> 时间复杂度：$O(n+m)$

bfs 代码

```cpp
#include <iostream>
#include <queue>
#include <cstring>
#include <vector>
using namespace std;

const int N = 100010;

int n, m;
vector<int> g[N], res(N);

void bfs(int now) {
	queue<int> q;

	res[now] = now;
	q.push(now);
	
	while (q.size()) {
		int h = q.front();
		q.pop();
		for (auto& ch: g[h]) {
			if (!res[ch]) {
				res[ch] = now;
				q.push(ch);
			}
		}
	}
}

void solve() {
	cin >> n >> m;
	while (m--) {
		int a, b;
		cin >> a >> b;
		g[b].push_back(a);
	}

	for (int i = n; i >= 1; i--) {
		if (!res[i]) {
			bfs(i);
		}
	}
	
	for (int i = 1; i <= n; i++) {
		cout << res[i] << ' ';
	}
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(nullptr), cout.tie(nullptr);
	int T = 1;
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

dfs 代码

```cpp
#include <iostream>
#include <queue>
#include <cstring>
#include <vector>
using namespace std;

const int N = 100010;

int n, m, val;
vector<int> g[N], res(N);

void dfs(int now) {
	res[now] = val;
	for (auto& ch: g[now]) {
		if (!res[ch]) {
			dfs(ch);
		}
	}
}

void solve() {
	cin >> n >> m;
	while (m--) {
		int a, b;
		cin >> a >> b;
		g[b].push_back(a);
	}

	for (int i = n; i >= 1; i--) {
		if (!res[i]) {
			val = i;
			dfs(i);
		}
	}
	
	for (int i = 1; i <= n; i++) {
		cout << res[i] << ' ';
	}
}

int main() {
	ios::sync_with_stdio(false);
	cin.tie(nullptr), cout.tie(nullptr);
	int T = 1;
//	cin >> T;
	while (T--) solve();
	return 0;
}
```



