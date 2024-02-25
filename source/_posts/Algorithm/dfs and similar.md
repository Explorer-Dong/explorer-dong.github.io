---
title: dfs and similar
categories: Algorithm
category_bar: true
---

## dfs and similar

搜索专题。无论是深搜还是宽搜，都逃不掉图的思维。我们将搜索图建立起来之后，剩余的编码过程就会跃然纸上

### 1. 机器人的运动范围

https://www.acwing.com/problem/content/22/

```cpp
class Solution {
public:
    int res = 0;
    
    int movingCount(int threshold, int rows, int cols)
    {
        if (!rows || !cols) return 0;
        vector<vector<int>> g(rows, vector<int>(cols, 0));
        vector<vector<bool>> vis(rows, vector<bool>(cols, false));
        dfs(g, vis, 0, 0, threshold);
        return res;
    }
    
    void dfs(vector<vector<int>>& g, vector<vector<bool>>& vis, int x, int y, int threshold)
    {
        vis[x][y] = true;
        res ++;
        
        int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};
        for (int k = 0; k < 4; k ++)
        {
            int i = x + dx[k], j = y + dy[k];
            if (i < 0 || i >= int(g.size()) || j < 0 || j >= int(g[0].size()) || vis[i][j] || cnt(i, j) > threshold) continue;
            dfs(g, vis, i, j, threshold);
        }
    }
    
    int cnt(int x, int y)
    {
        int sum = 0;
        while (x) sum += x % 10, x /= 10;
        while (y) sum += y % 10, y /= 10;
        return sum;
    }
};
```

### 2. CCC单词搜索

https://www.acwing.com/problem/content/5168/

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

### 3. 数量

https://www.acwing.com/problem/content/5150/

法一：dfs

> 题意：给定一个数n，问[1, n]中有多少个数只含有4或7
>
> 思路：对于一个数，我们可以构造一个二叉搜数进行搜索，因为每一位只有两种可能，那么从最高位开始搜索。如果当前数超过了n就return，否则就算一个答案
>
> 时间复杂度：
> $$
> O(2^{1 + \lg{(\max(a[i])})})
> $$

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

法二：二进制枚举

> 题意：给定一个数n，问[1, n]中有多少个数只含有4或7
>
> 思路：按照数位进行计算。对于一个x位的数，1到x-1位的情况下所有的数都符合条件，对于一个t位的数，满情况就是 $2^t$ 种，所以[1, x - 1]位就一共有 $2^1 + 2^2 + \cdots + 2^{x - 1} = 2^{x} - 2$ 种情况 。对于第x位，采取二进制枚举与原数进行比较，如果小于原数，则答案+1，反之结束循环输出答案即可

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

### 4. 组合总和

https://leetcode.cn/problems/combination-sum/

> 题意：给定一个序列，其中的元素没有重复，问如何选取其中的元素，使得选出的数字总和为指定的数字target，选取的数字可以重复
>
> 思路：思路比较简答，很容易想到用dfs搜索出所有的组合情况，即对于每一个“结点”，我们直接遍历序列中的元素即可。但是由于题目的限制，即不允许合法的序列经过排序后相等。那么为了解决这个约束，我们可以将最终搜索到的序列排序后进行去重，但是这样的时间复杂度会很高，于是我们从搜索的过程切入。观看这一篇题解[防止出现重复序列的启蒙题解](https://leetcode.cn/problems/combination-sum/solutions/2363929/39-zu-he-zong-he-hui-su-qing-xi-tu-jie-b-9zx7/)，我们提取其中最关键的一个图解
>
> ![subset_sum_i_pruning.png](D:/BaiduSyncdisk/_images/typora-user-images/202402012332951.png)
>
> 可见3，4和4，3的剩余选项（其中可能包含了答案序列）全部重复，因此我们直接减去这个枝即可。不难发现，我们根据上述优化思想，剪枝的操作可以为：让当前序列开始枚举的下标 `idx` 从上一层开始的下标 `i` 开始，于是剪枝就可以实现了。
>
> 时间复杂度：??? 
> $$
> O \left ( 2^{\frac{n}{\log n}}\right)
> $$

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

### 5. 扩展字符串

https://www.acwing.com/problem/content/5284/

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

### 6. 让我们异或吧

https://www.luogu.com.cn/problem/P2420

> 题意：给定一棵树，树上每一条边都有一个权值，现在有Q次询问，对于每次询问会给出两个结点编号u，v，需要输出结点u到结点v所经过的路径的所有边权的异或之和
>
> 思路：对于每次询问，我们当然可以遍历从根到两个结点的所有边权，然后全部异或计算结果，但是时间复杂度是 $O(n)$，显然不行，那么有什么优化策略吗？答案是有的。我们可以发现，对于两个结点之间的所有边权，其实就是根到两个结点的边权相异或得到的结果（异或的性质），我们只需要预处理出根结点到所有结点的边权已异或值，后续询问的时候直接 $O(1)$ 计算即可
>
> 时间复杂度：$O(n+q)$

```cpp
const int N = 100010;

struct node {
	int id;
	int w;
};

int n, m, f[N];		// f[i] 表示从根结点到 i 号结点的所有边权的异或值
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

### 7. Function

https://www.luogu.com.cn/problem/P1464

> 题意：
>
> 思路一：直接dfs
>
> - 直接按照题意进行dfs代码的编写，但是很显然时间复杂极高
> - 时间复杂度：$O(T \times 情况数)$
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
//	cin >> T;
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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 8. 外星密码

https://www.luogu.com.cn/problem/P1928

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
> - 手模样例：
>
>     <img src="C:/Users/%E8%91%A3%E6%96%87%E6%9D%B0/AppData/Roaming/Typora/typora-user-images/image-20231125121853866.png" alt="image-20231125121853866" style="zoom: 50%;" />
>
>     - 显然按照定义，上述压缩字符串一共有五个单元
>     - 我们用红色表示进入递归，蓝色表示驱动递归结束并回溯。可以发现
>
> - 时间复杂度：$O(\text{res.length()})$

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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 9. [NOIP2002 普及组] 选数

https://www.luogu.com.cn/problem/P1036

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

	dfs(0, 1, 0);		// 不选第一个数
	dfs(1, 1, a[1]);	// 选第一个数

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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 10. 01迷宫

https://www.luogu.com.cn/problem/P1141

> 题意：给定一个01矩阵，行走规则为“可以走到相邻的数字不同的位置”，现在给定m次询问 `(u,v)`，输出从 `(u,v)` 开始最多可以走多少个位置？
>
> 思路：我们可以将此问题转化为一个求解连通块的问题。对于矩阵中的一个连通块，我们定义为：在其中任意一个位置开始行走，都可以走过整个连通块每一个位置。那么在询问时，只需要输出所在连通块元素的个数即可。现在将问题转化为了
>
> 1. 如何遍历每一个连通块？
>
>     按照标记数组的情况，如果一个位置没有被标记，就从这个位置出发开始打标记并统计
>
> 2. 如何统计每一个连通块中元素的个数？
>
>     按照题目中给定的迷宫行走规则，可以通过bfs或者dfs实现遍历

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
//	cin >> T;
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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 11. kkksc03考前临时抱佛脚

https://www.luogu.com.cn/problem/P2392

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
//	cin >> T;
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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 12. [COCI 2008/2009 #2] PERKET

https://www.luogu.com.cn/problem/P2036

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
//	cin >> T;
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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 13. 迷宫

https://www.luogu.com.cn/problem/P1605

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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 14. 单词方阵

https://www.luogu.com.cn/problem/P1101

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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 15. 自然数的拆分问题

https://www.luogu.com.cn/problem/P2404

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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 16. [USACO10OCT] Lake Counting S

https://www.luogu.com.cn/problem/P1596

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
//	cin >> T;
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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 17. 填涂颜色

https://www.luogu.com.cn/problem/P1162

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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 18. 马的遍历

https://www.luogu.com.cn/problem/P1443

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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 19. 奇怪的电梯

https://www.luogu.com.cn/problem/P1135

> - 题意：给定一个电梯，第 i 层只能上升或者下降 a[i] 层，问从起点开始到终点最少需要乘坐几次电梯
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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 20. 吃奶酪:fire:

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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

状压 dp 代码

```cpp

```

### 21. 递归实现指数型枚举

https://www.acwing.com/problem/content/94/

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
//	cin >> T;
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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 22. 递归实现排列型枚举

https://www.acwing.com/problem/content/96/

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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 23. 费解的开关

https://www.acwing.com/problem/content/97/

> - 题意：给定 n 个 `5*5` 的矩阵，代表当前局面。矩阵中每一个元素要么是 0 要么是 1，现在需要计算从当前状态操作到全 1 状态最少需要几次操作？操作描述为改变当前状态为相反状态后，四周的四个元素也需要改变为相反的状态
> - 思路：我们采用递推的思路。为了尽可能少的进行按灯操作，我们从第二行开始考虑，若前一行的某一元素为 0，则下一行的同一列位置就需要按一下，以此类推将 $2 \to 5$ 行全部按完。现在考虑两点，当前按下状态是否合法？当前按下状态是是否最优？
>     1. 对于第一个问题：从上述思路可以看出，$1 \to n-1$ 行一定全部都是 1 的状态，但是第 $n-1$ 行不一定全 1，因此不合法状态就是第 $n-1$ 行不全为 1。此时局面的总操作数不能更新最小操作次数
>     2. 对于第二个问题：可以发现，上述算法思路中，对于第一行是没有任何操作的（可以将第一行看做递推的初始化条件），第一行的状态影响全局的总操作数，我们不能确定不对第一行进行任何操作得到的总操作数就是最优的，故我们需要对第一行 5 个灯进行**枚举**按下。我们采用 5 位二进制的方法对第一行的 5 个灯进行枚举按下操作，然后对于当前第一行的按下局面（递推初始化状态）进行 $2 \to n$ 行的按下递推操作。对于每一种合法状态更新最小的操作数即可
> - 时间复杂度：$O(T \times 2^5 \times 25 \times 5)$

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