---
title: dp
categories: Algorithm
category_bar: true
---


## dp

### 1. 对称山脉

https://www.acwing.com/problem/content/5169/

模拟，时间复杂度 $O(n^3)$

```cpp
#include <iostream>
#include <cmath>

using namespace std;

const int N = 5010;

int n;
int a[N];

int main()
{
	cin >> n;
	
	for (int i = 1; i <= n; i ++)
		cin >> a[i];
		
	// 枚举区间长度
	for (int len = 1; len <= n; len ++)
	{
		int res = 2e9;
		// 枚举相应长度的所有区间
		for (int i = 1, j = i + len - 1; j <= n; i ++, j ++)
		{
		    // 计算区间的不对称值
			int l = i, r = j;
			int sum = 0;
			while (l < r)
			{
				sum += abs(a[l] - a[r]);
				l ++ , r --;
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

int main()
{
	cin >> n;
	
	for (int i = 1; i <= n; i ++)
		cin >> a[i];
		
	memset(res, 0x3f, sizeof res);
	
	// 长度为 1 的情况
	res[1] = 0; 
	
	// 长度为 2 的情况
	for (int i = 1, j = i + 1; j <= n; i ++, j ++)
	{
		dp[i][j] = abs(a[i] - a[j]);
		res[2] = min(res[2], dp[i][j]);
	}
	
	// 长度 >= 3 的情况 
	for (int len = 3; len <= n; len ++)
	{
		for (int i = 1, j = i + len - 1; j <= n; i ++, j ++)
		{
			dp[i][j] = dp[i + 1][j - 1] + abs(a[i] - a[j]);
			res[len] = min(res[len], dp[i][j]);
		}
	}
	
	for (int i = 1; i <= n; i ++)
		cout << res[i] << ' ';
	
	return 0;
}
```

### 2. 最小化网络并发线程分配

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

### 3. 摘花生

https://www.acwing.com/problem/content/1017/

> 题意：给定一个二维矩阵，每一个位置有一个价值，问：从左上角（1,1）走到右下角（r,c）能获得的最大价值是多少
>
> 思路：我们不妨从结果位置出发，对于（r,c）这个位置而言，能走到这里的只有两个位置，即上面的位置（r-1,c）和左边（r,c-1）的位置，那么答案就是（r-1,c）和（r,c-1）中的最大价值 +（r,c）处的价值。那么对于（r-1,c）和（r,c-1）中的最大价值，同样**需要其相应位置的左方和上方的价值最优计算而来**，因此就很容易想到动态规划的思路。我们需要初始化`dp[1][j]`和`dp[i][1]`的答案，然后从`dp[2][2]`开始计算。
>
> 代码优化：不难发现，直接从`dp[1][1]`开始迭代也是可以的。因为`dp[0][j]`均为0，同样的`dp[1][0]`也均为0。

优化前代码：

```cpp
void solve() {
	int r, c;
	cin >> r >> c;
	vector<vector<int>> w(r + 1, vector<int>(c + 1)), dp(r + 1, vector<int>(c + 1, 0));

	for (int i = 1; i <= r; i++) {
		for (int j = 1; j <= c; j++) {
			cin >> w[i][j];
		}
	}

	dp[1][1] = w[1][1];

	for (int j = 2; j <= c; j++) {
		dp[1][j] = dp[1][j - 1] + w[1][j];
	}

	for (int i = 2; i <= r; i++) {
		dp[i][1] = dp[i - 1][1] + w[i][1];
	}

	for (int i = 2; i <= r; i++) {
		for (int j = 2; j <= c; j++) {
			dp[i][j] = w[i][j] + max(dp[i - 1][j], dp[i][j - 1]);
		}
	}

	cout << dp[r][c] << "\n";
}
```

优化后代码：

```cpp
void solve() {
	int r, c;
	cin >> r >> c;
	vector<vector<int>> w(r + 1, vector<int>(c + 1)), dp(r + 1, vector<int>(c + 1, 0));

	for (int i = 1; i <= r; i++) {
		for (int j = 1; j <= c; j++) {
			cin >> w[i][j];
		}
	}

	for (int i = 1; i <= r; i++) {
		for (int j = 1; j <= c; j++) {
			dp[i][j] = w[i][j] + max(dp[i - 1][j], dp[i][j - 1]);
		}
	}

	cout << dp[r][c] << "\n";
}
```

### 4. 最大社交深度和

https://vijos.org/d/nnu_contest/p/1534

> 算法：换根dp | BFS
>
> 题意：给定一棵树，现在需要选择其中的一个结点为根节点，使得深度和最大。深度的定义是以每个结点到树根所经历的结点数
>
> 思路：
>
> - **暴力**：
>
>     - 显然可以直接遍历每一个结点，计算每个结点的深度和，然后取最大值即可
>     - 时间复杂度：$O(n^2)$
>
> - **优化**：
>
>     先看图：
>
>     <img src="D:/BaiduSyncdisk/_images/typora-user-images/202402012332953.png" alt="image-20231105233631038" style="zoom:50%;" />
>
>     - 我们可以发现，对于当前的根结点 `fa`，我们选择其中的一个子结点 `ch`，将 `ch` 作为新的根结点（如右图）。那么对于当前的 `ch` 的深度和，我们可以借助 `fa` 的深度和进行求解。我们假设以 `ch` 为子树的结点总数为 `x`，那么这 `x` 个结点在换根之后，相对于 `ch` 的深度和，贡献了 `-x` 的深度；而对于 `fa` 的剩下来的 `n-x` 个结点，相对于 `ch` 的深度和，贡献了 `n-x` 的深度。于是 `ch` 的深度和就是 `fa的深度和` `-x+n-x`，即
>         $$
>         dep[ch] = dep[fa]-x+n-x = dep[fa]+n-2*x
>         $$
>         于是我们很快就能想到利用前后层的递推关系，$O(1)$ 的计算出所有子结点的深度和
>
>     - 代码实现：我们可以先计算出 `base` 的情况，即任选一个结点作为根结点，然后基于此进行迭代计算。在迭代计算的时候需要注意的点就是在一遍 `dfs` 计算某个结点的深度和 `dep[root]` 时，如果希望同时计算出每一个结点作为子树时，子树的结点数，显然需要分治计算一波。关于分治的计算我熟练度不够高，~~特此标注一下debug了3h的点~~：即在递归到最底层，进行回溯计算的时候，需要注意不能统计父结点的结点值（因为建的是双向图，所以一定会有从父结点回溯的情况），那么为了避开这个点，就需要在 $O(1)$ 的时间复杂度内获得当前结点的父结点的编号，从而进行特判，采用的方式就是增加递归参数 `fa`。
>
>         - 没有考虑从父结点回溯的情况的dfs代码
>
>             ```cpp
>             void dfs(int now, int depth) {
>             	if (!st[now]) {
>             		st[now] = true;
>             		dep[root] += depth;
>             		for (auto& ch: G[now]) {
>             			dfs(ch, depth + 1);
>             			cnt[now] += cnt[ch];
>             		}
>             	}
>             }
>             ```
>
>         - 考虑了从父结点回溯的情况的dfs代码
>
>             ```cpp
>             void dfs(int now, int fa, int depth) {
>             	if (!st[now]) {
>             		st[now] = true;
>             		dep[root] += depth;
>             		for (auto& ch: G[now]) {
>             			dfs(ch, now, depth + 1);
>             			if (ch != fa) {
>             				cnt[now] += cnt[ch];
>             			}
>             		}
>             	}
>             }
>             ```
>
>     - 时间复杂度：$O(2n)$

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

### 5.  [NOIP2002 普及组] 过河卒

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
//	cin >> T;
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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 6. [NOIP2001 普及组] 数的计算

https://www.luogu.com.cn/problem/P1028

> 题意：给定一个数和一种构造方法，即对于当前的数，可以在其后面添加一个最大为当前一半大的数，以此类推构造成一个数列。问一共可以构造出多少个这种数列
>
> 思路一：dfs
>
> - 非常显然的一个搜索树，答案就是结点数
> - 时间复杂度：$O(方案数)$
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
//	cin >> T;
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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 7. [NOIP2003 普及组] 栈

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
> - 时间复杂度：$O(方案数)$
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
>     <img src="D:/BaiduSyncdisk/_images/typora-user-images/202402012332954.png" alt="image-20231121192133801" style="zoom:50%;" />
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
>     <img src="D:/BaiduSyncdisk/_images/typora-user-images/202402012332955.png" alt="image-20231121192152555" style="zoom: 33%;" />
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
//	cin >> T;
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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 8. 数楼梯

https://www.luogu.com.cn/problem/P1255

> 题意：给定楼梯的台阶数，每次可以走1步或者2步，问走到第n层台阶可以走的方案数
>
> 思路一：dfs
>
> - 我们可以从前往后思考，即正向思维。对于剩余的台阶，我们可以走1步或者走2步，最终走到第n层就算一种
> - 时间复杂度：指数级别
>
> 思路二：递推（dp）
>
> - 对于递推的思路，我们从后往前考虑，即逆向思维。对于当前的层数，是从之前的哪几个台阶走过来的（即对于当前的状态，是之前哪几个状态转移过来的）。
>
> - 我们定义 `f[i]` 为走到第 `i` 层台阶的方案数
>
> - 则很显然第 `i` 层台阶是从前1个或者前2个台阶走过来的，于是状态转移方程就是
>     $$
>     f[i] = f[i - 1] + f[i - 2]
>     $$
>
> - 时间复杂度：$O(n)$
>
> 注意：采用高精度加法

dfs代码：

```cpp
int n, res;

void dfs(int x) {
	if (x < 0) return;

	if (x == 0) res++;

	dfs(x - 1);
	dfs(x - 2);
}
```

递推（dp）代码：

```cpp
int n;
Int dp[N];

void solve() {
	cin >> n;

	dp[1] = 1, dp[2] = 2;
	for (int i = 3; i <= n; i++) {
		dp[i] = dp[i - 1] + dp[i - 2];
	}

	cout << dp[n] << "\n";
}
```

### 9. 蜜蜂路线

https://www.luogu.com.cn/problem/P2437

> 题意：可以按照下面的路线从小数到相邻大数，问给定起点和终点，一共有多少种走法
>
> <img src="C:/Users/%E8%91%A3%E6%96%87%E6%9D%B0/AppData/Roaming/Typora/typora-user-images/image-20231126231329349.png" alt="image-20231126231329349" style="zoom:33%;" />
>
> 思路：
>
> - 可以发现，对于每一个数 $i$，可以从 $i-1$ 和 $i-2$ 两个位置走过来。定义 $dp[i]$ 表示从 $1$ 走到 $i$ 的路线数（状态数），于是状态转移方程就是
>     $$
>     dp[i] = dp[i-1]+dp[i-2]
>     $$
>
> - 方程一写其实就是斐波那契数，需要使用高精度加法
>
> 时间复杂度：$O(n)$

```cpp
int m, n;
Int dp[N];

void solve() {
	cin >> m >> n;
	n = n - m + 1;

	dp[1] = 1;
	for (int i = 2; i <= n; i++) {
		dp[i] = dp[i - 1] + dp[i - 2];
	}

	cout << dp[n] << "\n";
}
```

### 10. Block Sequence :fire:

https://codeforces.com/contest/1881/problem/E

> 题意：给定一个序列，问最少可以删除其中的几个数，使得**最终**的序列满足：从中选择一些数 `num[]`，使得 `num[i]` 后面有 `num[i]` 个数，且这些数包括 `num[]` 涵盖且只涵盖了一遍最终序列中所有的数
>
> 思路：我们考虑动态规划。
>
> - 我们考虑状态表示：其中 `dp[i]` 表示使得序列 `[i,n]` 满足上述条件的最少删除个数
> - 我们考虑状态转移：我们知道对于当前的数 `num[i]`，有两种状态 - 删除 | 不删除。

```cpp

```

### 11. 覆盖墙壁

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
> <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402012332894.png" alt="image-20231221100352559" style="zoom:50%;" /> <img src="D:/BaiduSyncdisk/_images/typora-user-images/202402012332956.png" alt="image-20231221100410409" style="zoom:50%;" />

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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```