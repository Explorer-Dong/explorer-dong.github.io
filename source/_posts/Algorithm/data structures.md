---
title: data structures
categories: Algorithm
category_bar: true
---

## data structures

### 1. 单调栈

https://www.acwing.com/problem/content/832/

> 题意：对于一个序列中的每一个元素，寻找每一个元素前面第一个比他小的元素
>
> 思路：
>
> - 首先很容易想到一个暴力的做法，就是对于每一个数，再从 $i \to 0$ 进行枚举寻找第一个比当前数小的那个数
> - 时间复杂度：$O(n^2)$
>
> 优化：首先每一个数一定是要遍历到的，那么关键在于如何优化掉寻找前面的最近的比他小的数的计算过程。我们逆向思考一下，不要考虑当前数字 `a[i]` 前面最近的一个比他小的数字我们考虑当前数字如何才能成为后面数字的最近的最小值。
>
> 我们将这个序列想象成一个散点图
>
> - 如果当前数字能够成为后面的最近的最小值，那么当前数字就一定严格小于后面的数字。保留当前的散点
>
> - 那么与上面相反的是，如果 `a[i]>=后面的数字` 那么当前数字就一定不可能成为后面数字的最近的比他小的数字，就需要不断删除当前数以及前面的数，直到第一次寻找到比当前数小的那个数。
>
> 经过上述流程之后，我们发现，此时的“散点图”上剩下来的点，呈现一个严格单调递增的形状。于是优化的思路就来了：
>
> 我们只需要在扫描到 `a[i]` 的时候，维护 `a[0]` 到 `a[i-1]` 中的单调递增的序列即可，算法思路就是：
>
> 如果当前数 >   容器中的最后一个数，那么当前数的最近的那个数就是容器中的最后一个数
>
> 如果当前数 <= 容器中的最后一个数，那么就需要不断删除容器中的最后一个数，直到最后一个数 < 当前数，那么当前容器中的最后一个数就是当前数最近的那个比他小的数
>
> 最后将当前数加入容器尾部即可维护一个单调递增序列了。
>
> 至于选用什么样的容器，支持高效率查询尾部元素、高效率尾插入、高效率尾删除，即可。那么数组、栈、队列等很多线性结构的容器都是可以的。我们这里选用数组。
>
> 时间复杂度：$O(2n)$

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    
    int n; cin >> n;
    vector<int> a(n + 1);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    
    vector<int> v;
    
    for (int i = 0; i < n; i++) {
        if (v.empty()) {
            cout << -1 << " ";
            v.push_back(a[i]);
        } 
        else {
            while (!v.empty() && a[i] <= v.back()) {
                v.pop_back();
            }
            if (v.empty()) {
                cout << -1 << " ";
            } else {
                cout << v.back() << " ";
            }
            v.push_back(a[i]);
        }
    }
    
    return 0;
}
```

### 2. 【模板】最近公共祖先（LCA）

https://www.luogu.com.cn/problem/P3379

> 题意：寻找树中指定两个结点的最近公共祖先
>
> 思路：对于每次查询，我们可以从指定的两个结点开始往上跳，第一个公共结点就是目标的LCA，每一次询问的时间复杂度均为 $O(n)$，为了加速查询，我们可以采用倍增法，预处理出往上跳的结果，即 `fa[i][j]` 数组，表示 $i$ 号点向上跳 $2^j$ 步后到达的结点。接下来在往上跳跃的过程中，利用二进制拼凑的思路，即可在 $O(\log n)$ 的时间内查询到LCA。
>
> 预处理：可以发现，对于 `fa[i][j]`，我们可以通过递推的方式获得，即 `fa[i][j] = fa[fa[i][j-1]][j-1]`，当前结点向上跳跃 $2^j$ 步可以拆分为先向上 $2^{j-1}$ 步，在此基础之上再向上 $2^{j-1}$ 步。于是我们可以采用宽搜 $or$ 深搜的顺序维护 $fa$ 数组。
>
> 跳跃：我们首先需要将两个结点按照倍增的思路向上跳到同一个深度，接下来两个结点同时按照倍增的思路向上跳跃，为了确保求出最近的，我们需要确保在跳跃的步调一致的情况下，两者的祖先始终不相同，那么倍增结束后，两者的父结点就是最近公共祖先，即 `fa[x][k]` 或 `fa[y][k]`
>
> 时间复杂度：$O(n \log n + m \log n)$ 
>
> - $n \log n$ 为预处理每一个结点向上跳跃抵达的情况
> - $m \log n$ 为 $m$ 次询问的情况

```cpp
const int N = 5e5 + 10;

int n, Q, root;
vector<int> G[N];
int fa[N][20], dep[N];
queue<int> q;

void init() {
	dep[root] = 1;
	q.push(root);

	while (q.size()) {
		int now = q.front();
		q.pop();
		for (int ch: G[now]) {
			if (!dep[ch]) {
				dep[ch] = dep[now] + 1;
				fa[ch][0] = now;
				for (int k = 1; k <= 19; k++) {
					fa[ch][k] = fa[ fa[ch][k-1] ][k-1];
				}
				q.push(ch);
			}
		}
	}
}

int lca(int a, int b) {
	if (dep[a] < dep[b]) swap(a, b);

    // 二进制拼凑从而跳到一样高
	for (int k = 19; k >= 0; k--)
		if (dep[fa[a][k]] >= dep[b])
			a = fa[a][k];

	if (a == b) return a;

	for (int k = 19; k >= 0; k--)
		if (fa[a][k] != fa[b][k])
			a = fa[a][k], b = fa[b][k];

	return fa[a][0];
}

void solve() {
	cin >> n >> Q >> root;
	for (int i = 0; i < n - 1; ++i) {
		int a, b;
		cin >> a >> b;
		G[a].push_back(b);
		G[b].push_back(a);
	}

	init();

	while (Q--) {
		int a, b;
		cin >> a >> b;
		cout << lca(a, b) << "\n";
	}
}	
```

### 3. [USACO19DEC] Milk Visits S

https://www.luogu.com.cn/problem/P5836

> tag：并查集
>
> 题意：给定一棵树，结点被标记成两种，一种是H，一种是G，在每一次查询中，需要知道指定的两个结点之间是否含有某一种标记
>
> 思路：对于树上标记，我们可以将相同颜色的分支连成一个连通块
>
> - 如果查询的两个结点在同一个连通块，则查询两个结点所在的颜色与所需的颜色是否匹配即可
> - 如果查询的两个结点不在同一个连通块，两个结点之间的路径一定是覆盖了两种颜色的标记，则答案一定是1
>
> 时间复杂度：$O(n+m)$

```cpp
const int N = 100010;

int n, m, p[N];
char col[N];

int find(int x) {
	if (p[x] != x) {
		p[x] = find(p[x]);
	}
	return p[x];
}

void solve() {
	cin >> n >> m;
	cin >> (col + 1);

	for (int i = 1; i <= n; i++) {
		p[i] = i;
	}

	for (int i = 1; i <= n - 1; i++) {
		int a, b;
		cin >> a >> b;
		if (col[a] == col[b]) {
			p[find(a)] = find(b);
		}
	}

	string res;

	while (m--) {
		int u, v;
		cin >> u >> v;

		char cow;
		cin >> cow;

		if (find(u) == find(v)) {
			res += to_string(col[u] == cow);
		} else {
			res += '1';
		}
	}

	cout << res << "\n";
}
```

### 4. 美国血统 American Heritage

https://www.luogu.com.cn/problem/P1827

> - 题意：给定二叉树的中序和先序序列，输出后序序列
> - 思路：经典二叉树的题目，主要用于巩固加强对于递归的理解。指针其实是没有必要的，为了得到后序序列，我们只需要有一个 dfs 序即可，为了得到 dfs 序，我们只需要根据给出的中序和前序序列即可得到 dfs 序
> - 时间复杂度：$O(n)$

指针做法

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 30;

string mid, pre;

struct Node {
	char data;
	Node* le, * ri;
	Node(char _data) : data(_data), le(nullptr), ri(nullptr) {}
};

Node* build(int i, int j, int p, int q) {
	if (i > j) return nullptr;
	
	Node* root = new Node(pre[i]);
	
	int k; // 根结点在中序序列的下标 
	for (k = p; k <= q; k++)
		if (mid[k] == root->data)
			break;
	
	root->le = build(i + 1, k - p + i, p, k - 1);
	root->ri = build(k - p + i + 1, j, k + 1, q);
	
	cout << root->data; 
	
	return root;
}

void solve() {
	cin >> mid >> pre;
	
	int i = 0, j = pre.size() - 1;
	int p = 0, q = mid.size() - 1;
	
	build(i, j, p, q);
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

构造出 dfs 序直接输出

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 30;

string mid, pre;

// 前序起始 i，前序末尾 j，中序起始 p，中序末尾 q 
void build(int i, int j, int p, int q) {
	if (i > j) return;
	
	char root = pre[i];
	
	int k;
	for (k = p; k <= q; k++)
		if (mid[k] == root)
			break;
			
	build(i + 1, k - p + i, p, k - 1);
	build(k - p + i + 1, j, k + 1, q);
	
	cout << root;
} 

void solve() {
	cin >> mid >> pre;
	
	int i = 0, j = pre.size() - 1;
	int p = 0, q = mid.size() - 1;
	
	build(i, j, p, q);
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

### 5. 新二叉树

https://www.luogu.com.cn/problem/P1305

> - 题意：给定一棵二叉树的 n 个结点信息，分别为当前结点的数据信息、左孩子结点信息和右结点信息，输出这棵二叉树的前序序列
> - 思路：我们首先将这棵二叉树构建出来，接着遍历输出前序序列即可。关键在于如何构建二叉树？我们使用数组存储二叉树，对于每一个树上结点，我们将数组中元素的索引存储为树上结点信息，每一个结点再存储左孩子与右孩子的信息
> - 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

int n;
string s;
char root;

struct Node {
	char l, r;
} tree[200];

void pre(char now) {
	if (now == '*') return;
	cout << now;
	pre(tree[now].l);
	pre(tree[now].r);
}

void solve() {
	cin >> n;
	
	for (int i = 1; i <= n; i++) {
		cin >> s;
		if (i == 1) root = s[0];
		tree[s[0]].l = s[1];
		tree[s[0]].r = s[2];
	}
	
	pre(root);
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

### 6. 遍历问题

https://www.luogu.com.cn/problem/P1229

> - 题意：给定一棵二叉树的前序序列与后序序列，问中序序列的可能情况有多少种
>
> - 思路：我们采用从最小结构单元的思路进行考虑，即假设当前二叉树只有一个根结点与两个叶子结点，而非两棵子树。然后将题意进行等价变换，即问对于已经固定的前序和后序二叉树，该二叉树有多少种不同的形状？对于当前的最小结构二叉树，形状就是 **左右根** or **根左右**，现在的根可以直接确定，那么就只能从左右孩子进行变形，很显然只能进行左右交换的变形，但是问题是一旦左右变换，前序 or 后序都会变掉，说明这种左右孩子都存在的前后序固定的二叉树是唯一的，那么如何才是不唯一的呢？我们考虑减少孩子数量。假设没有孩子，那么很显然也只有一个形状，就是一个根结点，故排除。于是答案就呼之欲出了，就是当根结点只有一个孩子时，这个孩子无论是在左边还是右边，前后序都是相同的，但是中序序列就不同了，于是就产生了两种中序序列。于是最终的结论是：对于前后序确定的二叉树来说，中序序列的情况是就是 $2^{\text{单分支结点数}}$ 个。现在的问题就转变为了在给定前后序的二叉树中求解单分支结点个数的问题。
>
>     如何寻找单分支结点呢？根据下面的递归图可以发现，无论是左单分支还是右单分支，如果 pre 的连续两个结点与 post 的连续两个结点对称相同，那么就一定有一个单分支结点，故只需要寻找前后序序列中连续两个字符对称相同的情况数 cnt 即可。最终的答案数就是 $2^{cnt}$
>
>     <img src="D:/BaiduSyncdisk/_images/typora-user-images/202402062336561.png" alt="image-20240206233550245" style="zoom:50%;" />
>
> - 时间复杂度：$O(nm)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

string pre, post;

void solve() {
	cin >> pre >> post;
	
	int cnt = 0;
	
	for (int i = 0; i < pre.size() - 1; i++)
		for (int j = 0; j < post.size(); j++)
			if (pre[i] == post[j + 1] && pre[i + 1] == post[j])
				cnt++;
	
	cout << (1 << cnt) << "\n";
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

### 7. 医院设置 :fire:

https://www.luogu.com.cn/problem/P1364

> - 题意：给定一棵二叉树，树中每一个结点存储了一个数值表示一个医院的人数，现在需要在所有的结点中将一个结点设置为医院使得其余结点中的所有人到达该医院走的路总和最小。路程为结点到医院的最短路，边权均为 1。给出最终的最短路径总和
>
> - 思路：**暴力**。很显然对于已经设置好医院的局面，需要求解的路径总和就直接将图遍历一边即可。每一个结点都可以作为医院进行枚举，每次遍历图都需要遍历所有的结点
>
>     **优化**。# TODO
>
> - 时间复杂度：$O(n^2)$

暴力代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 110;

int n;

vector<int> G[N];
int cnt[N];

int bfs(int v) {
	int res = 0;
	vector<bool> vis(n + 1, false);
	vector<int> d(n + 1, 0); // d[i] 表示点 i 到点 v 的距离
		
	queue<int> q;
	vis[v] = true;
	d[v] = 0;
	q.push(v);
	
	while (q.size()) {
		int now = q.front();
		q.pop();
		
		for (auto& ch: G[now]) {
			if (!vis[ch]) {
				vis[ch] = true;
				d[ch] = d[now] + 1;
				q.push(ch);
				
				res += cnt[ch] * d[ch]; 
			}
		}
	}
	
	return res;
}

void solve() {
	cin >> n;
	for (int i = 1; i <= n; i++) {
		int count, l, r;
		cin >> count >> l >> r;
		cnt[i] = count;
		
		if (l) {
			G[i].push_back(l);
			G[l].push_back(i);
		}
		
		if (r) {
			G[i].push_back(r);
			G[r].push_back(i);
		}
	}
	
	int res = 1e7 + 10;
	
	for (int i = 1; i <= n; i++) {
		res = min(res, bfs(i));
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

优化代码

```cpp

```

### 8. 二叉树深度

https://www.luogu.com.cn/problem/P4913

> - 题意：给定一棵二叉树，需要求解这棵二叉树的深度
> - 思路：有两个考点，一个是如何根据给定的信息（从根结点开始依次给出已存在树上结点的左右孩子的编号）构建二叉树，一个是如何求解已经构建好的二叉树的深度。对于构建二叉树，我们沿用 T5 数组模拟构建的思路，直接定义结点类型即可；对于求解深度，很显然的一个递归求解，即左右子树深度值 +1 即可
> - 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 1000010;

int n;

struct Node {
	int l, r;
} t[N];

int dep(int now) {
	if (!now) return 0;
	return max(dep(t[now].l), dep(t[now].r)) + 1;
}

void solve() {
	cin >> n;
	for (int i = 1; i <= n; i++) {
		int x, y;
		cin >> x >> y;
		t[i].l = x, t[i].r = y;
	}
	
	cout << dep(1);
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

### 9. 淘汰赛

https://www.luogu.com.cn/problem/P1364

> - 题意：给定 $2^n$ 支球队的编号与能力值，进行淘汰赛，能力值者晋级下一轮直到赛出冠军。输出亚军编号
> - 思路：很显然的一个完全二叉树的题目。我们都不需要进行递归操作，直接利用完全二叉树的下标性质利用数组模拟循环计算即可。给出的信息就是完全二叉树的全部叶子结点的信息，分别为球队编号 id 与球队能力值 val，我们从第 n-1 个结点开始循环枚举到第 1 个结点计算每一轮的胜者信息，最终输出最后一场的能力值较小者球队编号即可
> - 时间复杂度：$O(2n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 1 << 8;

struct Node {
	int id, val;
} a[N];

int n;

void solve() {
	cin >> n;
	
	n = 1 << n;
	
	for (int i = n; i <= 2 * n - 1; i++) {
		a[i].id = i - n + 1;
		cin >> a[i].val;
	}
	
	for (int i = n - 1; i >= 1; i--)
		if (a[i * 2].val > a[i * 2 + 1].val) a[i] = a[i * 2];
		else a[i] = a[i * 2 + 1];
			
	if (a[2].val > a[3].val) cout << a[3].id;
	else cout << a[2].id;
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

### 10. [JLOI2009] 二叉树问题

https://www.luogu.com.cn/problem/P3884

> - 题意：给定一棵二叉树的结点关系信息，求出这棵二叉树的深度、宽度和两个指定结点之间的最短路径长度
>
> - 思路：二叉树的构建直接采用有向图的构造方法。深度直接 dfs 即可，宽度直接在 dfs 遍历时哈希深度值即可。问题的关键在于如何求解两个给定结点之间的路径长度，很显然需要求解两个结点的 LCA，由于结点数 $\le 100$ 故直接采用暴力的方法，可以重定义结点，增加父结点域。也可以通过比对根结点到两个指定结点的路径信息得到 LCA 即最后一个相同的结点编号（本题采用），通过在 dfs 遍历树时存储路径即可得到根结点到两个指定结点的路径信息。之后直接根据题中新定义的路径长度输出即可，即
>     $$
>     \text{length} = 2 \times (d_x - d_{lca}) + (d_y - d_{lca})
>     $$
>     其中 $d_i$ 表示：根结点到第 $i$ 号点之间的路径长度，在 dfs 时通过传递深度值维护得到
>
> - 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 110;

int n, x, y;
vector<int> G[N];
int depth, width;
unordered_map<int, int> ha; // 将所有的深度值进行哈希
int d[N];                   // d[i] 表示第 i 个点到根结点的边数
vector<int> temp, rx, ry;   // 根结点到 x 号点与 y 号点直接的路径结点编号

// 当前结点编号 now，当前深度 level
void dfs(int now, int level) {
	depth = max(depth, level);
	
	temp.push_back(now);
	if (now == x) rx = temp;
	if (now == y) ry = temp;
	
	ha[level]++;
	d[now] = level - 1;
	
	for (auto& ch: G[now]) {
		dfs(ch, level + 1);
		temp.pop_back();
	}
}

// 暴力 lca + 计算路径长度
int len(int x, int y) {
	int i = 0;
	while (i < rx.size() && i < ry.size() && rx[i] == ry[i]) i++;
	
	int lca = rx[--i];
	
	return 2 * (d[x] - d[lca]) + (d[y] - d[lca]);
}

void solve() {
	cin >> n;
	
	for (int i = 1; i <= n - 1; i++) {
		int a, b;
		cin >> a >> b;
		G[a].push_back(b);
	}
	
	cin >> x >> y;
	
	// 二叉树的深度 depth
	dfs(1, 1);
	cout << depth << "\n";
	
	// 二叉树的宽度 width
	for (auto& item: ha) width = max(width, item.second);
	cout << width << "\n";
	
	// 两个结点之间的路径长度
	cout << len(x, y) << "\n";
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

### 11. 双链表

https://www.acwing.com/problem/content/829/

> 思路：主思路就是围绕初始空结点展开。空指针设置为 -1。在模拟链表之前我们先回顾一下指针链表是如何实现的？我们知道无非就是结点信息域、指针域，至于单链表还是双链表无非就是指针域有几个罢了。那么我们在模拟的时候就只需要对照着考虑这么几个因素：
>
> - 结点空间创建：指针操作中我们需要 new 一个结点对象出来，模拟只需要赋予一个虚拟的内存地址即可，此处使用 idx 正整数作为虚拟内存地址进行索引
> - 结点信息存储：我们需要存储结点的信息，如 e[i] 数组表示第 i 个结点的信息
> - 结点指针存储：我们需要存储结点的左结点与右结点的“地址”，如 r[i]、l[i] 就分别代表第 i 个结点左结点的地址、右结点的地址
> - 链表头、尾指针：其实如果单纯的创建、修改链表是不需要头、尾指针的，但是此题需要遍历指针就需要一个链表起始的“地址”索引，故引入头指针。至于尾指针是因为有尾插入的操作，为了 $O(1)$ 地进行尾插入，故引入尾指针
>
> 时间复杂度：插入、删除结点均为 $O(1)$，遍历为 $O(n)$

```cpp
#include <iostream>
using namespace std;

const int N = 100010;

int n;
int h, t, idx, e[N], l[N], r[N];

void init() {
	// 空结点
	h = 0, t = 0, idx = 0;
	l[0] = -1;
	r[0] = -1;
}

// 头插
void insertToHead(int x) {
	idx++;
	e[idx] = x;
	l[idx] = -1;
	r[idx] = h;
	l[h] = idx;
	h = idx;
}

// 尾插
void insertToTail(int x) {
	idx++;
	e[idx] = x;
	r[idx] = -1;
	l[idx] = t;
	r[t] = idx;
	t = idx;
}

void create() {
	while (n--) {
		string op;
		cin >> op;

		if (op == "L") {
			int x; cin >> x;
			insertToHead(x);
		} else if (op == "R") {
			int x; cin >> x;
			insertToTail(x);
		} else if (op == "IL") {
			// 在第 k 个数左侧插入数 x
			int k, x; cin >> k >> x;
			
			if (l[k] == -1) {
				// 头插入
				insertToHead(x);
			} else {
				// 一般插入
				idx++;
				e[idx] = x;
				r[idx] = k;
				l[idx] = l[k];
				r[l[k]] = idx;
				l[k] = idx;
			}
		} else if (op == "IR") {
			// 在第 k 个数右侧插入数 x
			int k, x; cin >> k >> x;
			
			if (r[k] == -1) {
				// 尾插入
				insertToTail(x);
			} else {
				// 一般插入
				idx++;
				e[idx] = x;
				l[idx] = k;
				r[idx] = r[k];
				l[r[k]] = idx;
				r[k] = idx;
			}
		} else {
			// 删除第 k 个数
			int k; cin >> k;
			
			if (h == k) {
				// 头删除
				h = r[k];
				l[r[k]] = -1;
			}  else if (t == k) {
				// 尾删除
				t = l[k];
				r[l[k]] = -1;
			} else {
				// 中间删除
				r[l[k]] = r[k];
				l[r[k]] = l[k];
			}
		}
	}
}

void output() {
    // 避开初始 0 号空结点
	for (int i = h; i != -1; i = r[i])
		if (i)
			cout << e[i] << " ";
}

void solve() {
	cin >> n;
	
	init();
	create();
	output();
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

### 12. 验证栈序列

https://www.luogu.com.cn/problem/P4387

> - 题意：给定入栈序列与出栈序列，问出栈序列是否合法
>
> - 思路：思路很简单，就是对于当前出栈的数，和入栈序列中最后已出栈的数之间，如果还有数没有出，那么就是不合法的出栈序列，反之合法。这是从入栈的结果来看的，如果这么判断就需要扫描入栈序列 n 次，时间复杂度为 $O(n^2)$。我们按照入栈的顺序来看，对于当前待入栈的数，若与出栈序列的队头不等，则成功入栈等待后续出栈；若与出栈序列相等，则匹配成功直接出栈无需入栈，同时对已入栈的数与出栈序列队头不断匹配直到不相等。最后判断待入栈的数与出栈序列是否全部匹配掉了，如果全部匹配掉了说明该出栈序列合法，反之不合法
>
>     抽象总结上述思路：为了判断出栈序列是否合法，我们不妨思考：对于每一个出栈的数，出栈的时机是什么？可以发现出栈的时机无非两种：
>
>     - 一入栈就出栈（对应于枚举待入栈序列时发现待入栈的数与出栈序列队头相等）
>     - 紧跟着刚出栈的数继续出栈（对应于枚举待入栈序列时发现待入栈的数与出栈序列队头相等之后，继续判断出栈序列队头与已入栈的数是否相等，若相等则不断判断并出栈）
>
> - 时间复杂度：$O(n)$

```cpp
// #include <bits/stdc++.h>
// #define int long long
#include <iostream>
#include <unordered_map>
#include <stack>
#include <queue>
using namespace std;

void solve() {
	int n;
	cin >> n;
	
	vector<int> a(n), b(n);
	for (int i = 0; i < n; i++) cin >> a[i];
	for (int i = 0; i < n; i++) cin >> b[i];
	
	stack<int> stk;
	int i = 0, j = 0;
	while (i < n) {
		if (a[i] != b[j]) stk.push(a[i++]);
		else {
			i++, j++;
			while (!stk.empty() && b[j] == stk.top()) {
				stk.pop();
				j++;
			}
		}
	}
	
	cout << (stk.empty() ? "Yes" : "No") << "\n";
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

### 13. [HNOI2002] 营业额统计

https://www.luogu.com.cn/problem/P2234

> - 题意：给定一个序列 a，需要计算 $a_1 + \displaystyle \sum_{i=2,1 \le j <i}^{n} \min {|a_i - a_j|}$ ，即计算每一个数与序列中当前数之前的数的最小差值之和
> - 思路：很显然的思路，对于每一个数，我们需要对之前的序列在短时间内找到一个数值最接近当前数的数。
>     - TLE：一开始的思路是每次对之前的序列进行排序，然后二分查找与当前值匹配的数，为了确保所有的情况都找到，就直接判断二分查到的数，查到的数之前的一个数，之后的一个数，但是时间复杂度极高（我居然没想到），是 $O(n^2 \log n)$
>     - AC：后来看了题解才知道 `set` 的正确用法，就是一个**平衡树的 STL**。我们对于之前的序列不断的插入平衡树中（默认升序排序），每次利用 `s.lower_bound(x)` 查找集合 `s` 中第一个 $\ge$ 当前数的数，然后进行判断即可。`lower_bound()` 的时间复杂度为 $O(\log n)$ 。需要注意的是边界的判断，一开始的思路虽然会超时，但是二分后边界的判断很简单，使用 STL 后同样需要考虑边界的情况。分为三种（详情见代码）
>         - 当前数比集合中所有的数都大，那么 `lower_bound` 就会返回 `s.end()` 答案就是当前数与集合中最后一个数的差值
>         - 当前数比集合中所有的数都小，那么 `lower_bound` 就会返回 `s.bigin()` 答案就是集合中第一个数与当前数的差值
>         - 当前数存在于集合中 or 集合中既有比当前数大的又有比当前数小的，那么就比较查到的数与查到的数前一个数和当前数的差值，取最小的差值即可
> - 时间复杂度：$O(n \log n)$

TLE 但逻辑清晰代码

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 1 << 16;

int n, a[N];

void solve() {
	cin >> n;
	
	int res = 0;
	cin >> a[1];
	res += a[1];
	
	for (int i = 2; i <= n; i++) {
        // 维护之前序列有序
		sort(a + 1, a + i);
		cin >> a[i];

        // 二分查找目标数
		int l = 1, r = i - 1;
		while (l < r) {
			int mid = (l + r) >> 1;
			if (a[mid] < a[i]) l = mid + 1;
			else r = mid;
		}
		
        // 边界判断
		int ans = abs(a[i] - a[r]);
		if (r + 1 >= 1 && r + 1 <= i - 1) ans = min(ans, abs(a[i] - a[r + 1]));
		if (r - 1 >= 1 && r - 1 <= i - 1) ans = min(ans, abs(a[i] - a[r - 1]));
		
		res += ans;
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

AC的 set 代码

```cpp
#include <iostream>
#include <algorithm>
#include <set>
using namespace std;

int n, res;
set<int> s;

void solve() {
	cin >> n;
	
	int x;
	cin >> x;
	res += x;
	s.insert(x);
	
	while (--n) {
		cin >> x;

		auto it = s.lower_bound(x);

		if (it == s.end()) {
			// 没有比当前数大的
			res += x - *s.rbegin();
		} else if (it == s.begin()) {
			// 没有比当前数小的
			res += *s.begin() - x;
		} else {
			// 当前数已存在于集合中 or 既有比当前数大的也有比当前数小的
			auto pre = it;
			pre--;
			res += min(abs(x - *it), abs(x - *pre));
		}
		
		s.insert(x);
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