---
title: greedy
categories: Algorithm
category_bar: true
---

## greedy

{% note light %}

大胆猜测，小心求证（不会证也没事，做下一题吧）。证明方法总结了以下几种

- 反证法：假设取一种方案比贪心方案更好，得出相反的结论
- 边界法：从边界开始考虑，因为满足边界条件更加容易枚举，从而进行后续的贪心
- 直觉法：遵循社会法则（）

{% endnote %}

### 1. green_gold_dog, array and permutation

https://codeforces.com/contest/1867/problem/A

> 题意：给定n个数a[i]，其中可能有重复数，请构造一个n个数的排列b[i]，使得c[i]=a[i]-b[i]中，c[i]的不同数字的个数最多
>
> 思路：思路比较好想，就是最大的数匹配最小的数，次大的数匹配次小的数，以此类推。起初我想通过将原数列的拷贝数列降序排序后，创建一个哈希表来记录每一个数的排位，最终通过原数列的数作为键，通过哈希表直接输出排位，但是问题是原数列中的数可能会有重复的，那么在哈希的时候如果有重复的数，那么后来再次出现的数就会顶替掉原来的数的排位，故错误。
>
> 正确思路：为了**保证原数列中每个数的唯一性**，我们可以给原数列每一个数赋一个下标，排序后以下标进行唯一的一一对应的索引。那么就是：首先赋下标，接着以第一关键词进行排序，然后最大的数（其实是下标）匹配最小的结果以此类推
>
> 模拟一个样例：
> 5
> 8 7 4 5 5 9
>
> 最终的答案应该是
> 2 3 6 4 5 1
>
> 首先对每一个数赋予一个下标作为为唯一性索引
> 8 7 4 5 5 9
> 1 2 3 4 5 6（替身）
>
> 接着将上述数列按照第一关键词进行排序
> 9 8 7 5 5 4
> 6 1 2 4 5 3（替身）
>
> 对每一个数进行赋值匹配
> 9 8 7 5 5 4
> 6 1 2 4 5 3（替身）
> 1 2 3 4 5 6（想要输出的结果）
>
> 按照替身进行排序
> 8 7 4 5 5 9
> 1 2 3 4 5 6（替身）（排序后）
> 2 3 6 4 5 1（想要输出的结果）

```cpp
#include <bits/stdc++.h>
using namespace std;

void solve()
{
	int n; cin >> n;
	
    // 第一关键词是原数列，第二关键词是赋予的唯一下标
	vector<pair<int, int>> a(n + 1);
	for (int i = 1; i <= n; i ++)
	{
		cin >> a[i].first;
		a[i].second = i;
	}
	
    // 按照第一关键词排序
	sort(a.begin() + 1, a.end(), [&](pair<int, int> x, pair<int, int> y) {
		return x.first > y.first;
	});
	
    // 以下标作为原数列的替身，每一个替身对应一个升序的最终排名
	vector<pair<int, int>> res(n + 1);
	for (int i = 1; i <= n; i ++)
	{
		res[i].first = a[i].second;
		res[i].second = i;
	}
	
    // 通过下标，还原原数列的排序
	sort(res.begin() + 1, res.end());
	
    // 输出第二关键词
	for (int i = 1; i <= n; i ++)
		cout << res[i].second << " \n"[i == n];
}

int main()
{
	int T; cin >> T;
	while (T --) solve();
	return 0;
}
```

### 2. Good Kid

https://codeforces.com/contest/1873/problem/B

> 题意：对于一个数列，现在可以选择其中的一个数使其+1，问如何选择这个数，可以使得修改后的数列中的所有数之积的值最大
>
> 思路：其实就是选择n-1个数的乘积值加一倍，关键在于选哪一个n-1个数的乘积值，逆向思维就是对于n个数，去掉那个最小值，那么剩下来的n-1个数之积就会最大了，于是就是选择最小的数+1，最终数列之积就是答案了。

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

void solve()
{
	int n; cin >> n;
	vector<int> a(n);
	
	for (int i = 0; i < n; i ++)
		cin >> a[i];
	
	sort(a.begin(), a.end());
	
	ll res = a[0] + 1;
	for (int i = 1; i < n; i ++)
		res *= a[i];
	cout << res << endl; 
}

int main()
{
	int T; cin >> T;
	while (T --) solve();
	return 0;
}
```

### 3. 1D Eraser

https://codeforces.com/contest/1873/problem/D

> 题意：给定一个只有B和W两种字符的字符串，现在有一种操作可以将一个指定大小的区间（大小为k）中所有的字符全部变为W，问对于这个字符串，至少需要几次上述操作才可以将字符串全部变为W字符
>
> 思路：我们直接遍历一边字符串即可，在遍历到B字符的时候，指针向后移动k位，如果是W字符，指针向后移动1位即可，最终统计一下遇到B字符的次数即可。

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

void solve()
{
	int n, k;
	cin >> n >> k;
	string s;
	cin >> s;
	
	int res = 0;
	
	for (int i = 0; i < n;)
	{
		if (s[i] == 'B')
		{
			res ++;
			i += k;
		}
		else i++;
	}
	cout << res << endl;
}

int main()
{
	int T; cin >> T;
	while (T --) solve();
	return 0;
}
```

### 4. ABBC or BACB

https://codeforces.com/contest/1873/problem/G

> 题意：现在有一个只有A和B两种字符的字符串，有如下两种操作：第一种，可以将AB转化为BC，第二种，可以将BA转化为CB。问最多可以执行上述操作几次
>
> 思路：其实一开始想到了之前做过的翻转数字为-1，最后的逻辑是将数字向左右移动，于是这道题就有了突破口了。上述两种操作就可以看做将A和B两种字符交换位置，并且B保持不变，A变为另一种字符C。由于C是无法执行上述操作得到，因此就可以理解为B走过的路就不可以再走了，那么就是说对于一个字符串，最终都会变成B走过的路C。并且只要有B，那么一个方向上所有的A都会被利用转化为C（直到遇到下一个B停止），那么我们就可以将B看做一个独立的个体，他可以选择一个方向上的所有的A并且执行操作将该方向的A全部转化为C，那么在左和右的抉择中，就是要选择A数量最多的方向进行操作，但是如果B的足够多，那就不需要考虑哪个方向了，所有的A都可以获得一次操作机会。现在就转向考虑B需要多少呢，
>
> 答案是两种：如果B的数量小于A“块”的数量，其实就是有一块A无法被转化，那么为了让被转化的A数量尽可能的多，就选择A块数量最少的那一块不被转化。如果B的数量>=A块的数量，那么可以保证所有的A都可以被转化为C块，从而最终的答案就是A字符的数量

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

void solve()
{
	string s; cin >> s;
	int cntb = 0, blocka = 0, cnta = 0; // B字符的数量，A连续区间的数量，A字符的个数 
	
	vector<int> a; // 每一个A连续区间中A字符的数量 
	
	for (int i = 0; i < s.size();)
	{
		if (s[i] == 'A')
		{
			int sum = 0;
			while (s[i] == 'A') cnta ++, sum ++, i ++;
			a.emplace_back(sum);
			blocka ++;
		}
		else
		{
			cntb ++;
			i ++;
		}
	}
	
	if (cntb >= blocka) cout << cnta << endl;
	else
	{
		sort(a.begin(), a.end());
		cout << cnta - a[0] << endl;
	}
}

int main()
{
	int T; cin >> T;
	while (T --) solve();
	return 0;
}
```

### 5. Smilo and Monsters

https://codeforces.com/contest/1891/problem/C

> 题意：给定一个序列，其中每一个元素代表一个怪物群中的怪物的数量。现在有两种操作：
>
> 1. 选择一个怪物群，杀死其中的一只怪物。同时累加值 $x+=1$
> 2. 选择一个怪物群，通过之前积累的累加值，一次性杀死当前怪物群中的 $x$ 只怪物，同时累加值 $x$ 归零
>
> 现在询问杀死所有怪物的最小操作次数
>
> 思路：一开始我是分奇偶进行判断的，但是那只是局部最优解，全局最优解的计算需要我们“纵观全局”。
>
> 我们可以先做一个假设：假设当前只有一个怪物群，为了最小化操作次数，最优解肯定是先杀死一半的怪物（假设数量为n，则获得累计值x=n），然后无论剩余n个还是n+1个，我们都使用累计值x一次性杀死n个怪物。
>
> 现在我们回到原题，有很多个怪物群，易证，最终的最优解也一点是最大化利用操作2，和特殊情况类似，能够利用的一次性杀死的次数就是怪物总数的一半。区别在于：此时不止一个怪物群。那么我们就要考虑累加值如何使用。很容易想到先将怪物群按照数量大小进行排序，关键就在于将累加值从小到大进行使用还是从大到小进行使用。可以发现，对于一个确定的累加值，由于操作2的次数也会算在答案中。那么如果从最小的怪物群开始使用，就会导致操作2的次数变多。因此我们需要从最大值开始进行操作2。
>
> 那么最终的答案就是：
>
> - 首先根据怪物数量的总和计算出最终的累加值s（s=sum/2）
> - 接着我们将怪物群按照数量进行升序排序
> - 然后我们从怪物数量最大的开始进行操作2，即一次性杀死当前怪物群，没进行一次，答案数量+1
> - 最后将答案累加上无法一次性杀死的怪物群中怪物的总数
>
> 时间复杂度：$O(n \log n)$

```cpp
void solve() {
	n = read(); s = 0; res = 0;
	for (int i = 1; i <= n; i++) {
		a[i] = read();
		s += a[i];
	}
 
	s >>= 1;
 
	sort(a + 1, a + n + 1);
 
	for (int i = n; i >= 1; i--) {
		if (s >= a[i]) {
			s -= a[i], a[i] = 0, res++;
		} else if (s) {
			a[i] -= s;
			s = 0;
			res++;
		}
	}
 
	for (int i = 1; i <= n; i++) {
		res += a[i];
	}
 
	printf("%lld\n", res);
}
```

### 6. 通关

https://www.lanqiao.cn/problems/5889/learning/?contest_id=145

> 声明：谨以此题记录我的第一道正式图论题（存图技巧抛弃了y总的纯数组，转而使用动态数组`vector`进行建图）e.g.
>
> ```cpp
> struct Node {
> int id;		// 当前结点的编号
> int a;	// 属性1
> int b;	// 属性2
> };
> vector<Node> G[N];
> ```
>
> 题意：给定一棵树，每个结点代表一个关卡，每个关卡拥有两个属性：通关奖励值`val`和可通关的最低价值`cost`。现在从根节点开始尝试通关，每一个结点下面的关卡必须要当前结点通过了之后才能继续闯关。问应该如何选择通关规划使得通过的关卡数最多？
>
> 思路：一开始想到的是直接莽bfs，对每一层结点按照cost升序排序进行闯关，然后wa麻了。最后一看正解原来是还不够贪。正确的闯关思路应该是始终选择当前可以闯过的cost最小的关卡，而非限定在了一层上。因此我们最终的闯关顺序是：对于所有解锁的关卡，选择cost最小的关卡进行通关，如果连cost最小的关卡都无法通过就直接结束闯关。那么我们应该如何进行代码的编写呢？分析可得，解锁的关卡都是当前可通过的关卡的所有子结点，而快速获得当前cost最小值的操作可以通过一个堆来维护。
>
> 时间复杂度：$O(n \log n)$

```cpp
const int N = 100010;
typedef long long ll;

struct Node {
    int id;
    int val;
    int cost;
    // 有趣的重载
    bool operator< (const Node& t) const {
        return this->cost > t.cost;
    }
};

int n, p;
ll res;
vector<Node> G[N];
priority_queue<Node> q;

void bfs() {
    q.push(G[0][0]);

    while (q.size()) {
        Node now = q.top();
        q.pop();
        if (p >= now.cost) {
            res++;
            p += now.val;
            for (auto& child: G[now.id]) {
                q.push(child);
            }
        } else {
            break;
        }
    }
}

void solve() {
    cin >> n >> p;
    for (int i = 1; i <= n; i++) {
        int fa, v, c;
        cin >> fa >> v >> c;
        G[fa].push_back({i, v, c});
    }
    bfs();
    cout << res << "\n";
}
```

### 7. 串门

https://www.lanqiao.cn/problems/5890/learning/?contest_id=145

> 题意：给定一棵无向树，边权为正。现在询问在访问到每一个结点的情况下最小化行走的路径长度
>
> 思路：首先我们不管路径长度的长短，我们直接开始串门。可以发现，我们一点会有访问的起点和终点，那么在起点到终点的这条路上，可能会有很多个分叉，对于每一个分叉，我们都需要进入再返回来确保分叉中的结点也被访问到，那么最终的路径长度就是总路径长度的2倍 - 起点到终点的距离，知道了这个性质后。我们可以发现，路径的总长度是一个定值，我们只有最大化起点到终点距离才能确保行走路径长度的最小值。那么问题就转化为了求解一棵树中，最长路径长度的问题。即求解树的直径的问题。
>
> 树的直径：首先我们反向考虑，假设知道了直径的一个端点，那么树的直径长度就是这棵树以当前结点为根的深度。那么我们就需要先确定一个直径的端点。不难发现，对于树中的任意一个结点，距离它最远的一个（可能是两个）结点一定是树的直径的端点。那么问题就迎刃而解了。
>
> 为了降低代码量，我们可以设置一个dist数组来记录当前结点到根的距离。
>
> - 在确定直径端点的时候，选择任意一个结点为根节点，然后维护dist数组，最终dist[i~n]中的最大值对应的下标maxi就是直径的一个端点。
> - 接着在计算直径长度的时候，以maxi为树根，再来一次上述的维护dist数组的过程，最终dist[1~n]中的最大值就是树的直径的长度
>
> 时间复杂度：$O(n)$

```cpp
const int N = 100010;
typedef long long ll;

struct Node {
	int id;
	ll w;
};

int n;
vector<Node> G[N];
bool st[N];
ll sum, d, dist[N];

/**
 * @note 计算当前所有子结点到当前点的距离
 * @param now 当前点的编号
 * @param x 上一个点到当前点的距离
 */
void dfs(int now, ll x) {
	if (!st[now]) {
		st[now] = true;
		dist[now] = x;
		for (int i = 0; i < G[now].size(); i++) {
			int ch = G[now][i].id;
			dfs(ch, x + G[now][i].w);
		}
	}
}

void solve() {
	cin >> n;
	for (int i = 0; i < n - 1; i++) {
		int a, b, w;
		cin >> a >> b >> w;
		sum += w;
		G[a].push_back({b, w});
		G[b].push_back({a, w});
	}

	// 以1号点为根，计算所有点到1号点的距离
	dfs(1, 0);

	memset(st, 0, sizeof st);

	// 到1号点最远的那个点的编号 maxi，即直径的一个端点
	int maxi = 0;
	for (int i = 1; i <= n; i++) {
		if (dist[i] > dist[maxi]) {
			maxi = i;
		}
	}

	// 以直径的一个端点 maxi 为根，计算所有点到 maxi 点的距离
	dfs(maxi, 0);

	// 找到直径长度
	for (int i = 1; i <= n; i++) {
		d = max(d, dist[i]);
	}

	cout << sum * 2 - d << "\n";
}
```

### 8. Codeforces rating

https://vijos.org/d/nnu_contest/p/1532

> 题意：现在已知一个初始值R，现在给定了n个P值，选择其中的合适的值，使得最终的 $R'=3/4 R + 1/4 P$ 最大
>
> 思路：首先一点就是我们一定要选择P比当前R大的值，接下来就是选择合适的P使得最终迭代出来的R'最大。首先我们知道，对于筛选出来的比当前R大的P集合，任意选择其中的一个P，都会让R增大，但是不管增加多少都是不会超过选择的P。那么显然，如果筛选出来的P集合是一个递增序列，那么就可以让R不断的增加。但是这一定是最大的吗？我们不妨反证一下，现在我们有两个P，分别为x，y，其中 $x<y$。
>
> 那么按照上述思路，首先就是 
> $$
> R’=\frac{3}{4}R+\frac{1}{4}x(R'<x)
> $$
> 接着就是 
> $$
> R''_1=\frac{3}{4}R'+\frac{1}{4}y(R''_1<y)=\frac{9}{16}R+\frac{3}{16}x+\frac{1}{4}y
> $$
> **反之**，首先选择一个较大的P=y，再选择一个较小的P=x，即首先就是
> $$
> R’=\frac{3}{4}R+\frac{1}{4}y(R'<y)
> $$
> 此时我们还不一点可以继续选择x，因为此时的R'可能已经超过了x的值，那么我们按照最优的情况计算，可以选择x，那么就是
> $$
> R''_2=\frac{3}{4}R'+\frac{1}{4}x(R''_2<x)=\frac{9}{16}R+\frac{3}{16}y+\frac{1}{4}x
> $$
> 可以发现
> $$
> R''_2-R''_1=\frac{1}{16}(x-y)<0
> $$
> 即会使得最终的答案变小。因此最优的策略就是按照增序进行叠加计算
>
> ==注意点：==
>
> 四舍五入的语句
>
> ```cpp
> cout << (int)(res + 0.5) << "\n";
> ```

```cpp
void solve() {
	cin >> n >> k;
	for (int i = 0; i < n; i++) {
		cin >> a[i];
	}

	sort(a, a + n);

	int i = 0;
	for (; i < n; i++) {
		if (a[i] > k) {
			break;
		}
	}

	double res = k;

	for (; i < n; i++) {
		res = (res * 3.0 + a[i] * 1.0) / 4.0;
	}

	cout << (int)(res + 0.5) << "\n";
}
```

### 9. 货运公司

https://www.acwing.com/problem/content/5380/

> 题意：给定 $n$ 个运货订单，每个订单需要运送一定量的货物，同时给予一定量的报酬。现在有 $k$ 个卡车进行运送，每个卡车有运送容量。需要合理规划卡车的装配，使得最终获得的总报酬最大。有以下约束条件：
>
> - **每一个订单**只能用一辆货车运送
> - **每一辆货车**只能运送不超过最大容量的货物
> - **每一辆货车**只能运送一次
> - **每一辆货车**在装得下的情况下只能装运一个订单
>
> 思路：一开始尝试采用 01 背包的思路，但是题目中货物是否可以被运送是取决于卡车的装载的。思考无果后考虑贪心。**考虑一般情况**
>
> - 为了让总收益最大，很显然报酬越多，就越优先选择该订单
>
> - 在报酬一致时，货物量越少，就越优先选择该订单
>
> - 按照上述规则对订单排序后，我们需要安排合理的货车进行运输。我们优先将运输量小的货车安排给合适的订单。因为运输量大的货车既可以满足当前订单，同样也满足后续的订单，那么为了最大化增加利润，就需要在运输量小的货车满足当前订单时，保留运输量大的货车用于后续的订单。我们可以画一个图进一步理解为什么这么安排货车进行运输：
>
>     <img src="D:/BaiduSyncdisk/_images/typora-user-images/202402012332958.png" alt="image-20231223222627134" style="zoom: 50%;" />
>
>     <div style="text-align: center">图例：我们按照上述红笔的需要进行货车的选择进行运输</div>
>
>     如果红色序号顺序变掉了，则就不能将上述图例中的 6 个订单全部运输了
>
> 时间复杂度 $O(nk)$

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 1010;

struct Item {
	int id, weight, money;
	bool operator< (const Item& t) const {
		if (money != t.money) return money > t.money;
		else return weight < t.weight;
	}
} item[N];

struct Car {
	int id, v;
	bool operator< (const Car& t) const {
		return v < t.v;
	}
} car[N];

pair<int, int> res[N];
bool vis[N];
int cnt, sum;

void solve() {
	int n;
	cin >> n;
	for (int i = 1; i <= n; i++) {
		item[i].id = i;
		cin >> item[i].weight >> item[i].money;
	}

	int k;
	cin >> k;
	for (int i = 1; i <= k; i++) {
		car[i].id = i;
		cin >> car[i].v;
	}

	sort(item + 1, item + n + 1);
	sort(car + 1, car + k + 1);

	for (int i = 1; i <= n; i++) {
		for (int j = 1; j <= k; j++) {
			if (!vis[j] && car[j].v >= item[i].weight) {
				sum += item[i].money;
				vis[j] = true;
				res[cnt++] = {item[i].id, car[j].id};
				break;
			}
		}
	}

	cout << cnt << " " << sum << "\n";

	for (int i = 0; i < cnt; i++) {
		cout << res[i].first << " " << res[i].second << "\n";
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

### 10. 部分背包问题

https://www.luogu.com.cn/problem/P2240

> - 题意：给定一组物品，每一个物品有一定的重量与价值，现在给定一个背包总承重，需要从中选择合适的物品进行装载，使得最终装载的物品的总价值最大。现在规定每一个物品可以进行随意分割，按照单位重量计算价值
> - 思路：**考虑一般情况**。很显然，如果不说可以随意分割，那就是一个 01 背包，既然说了可以随意分割，那就直接贪心选择即可，按照单位重量的价值降序进行选择
> - 时间复杂度：$O(n \log n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 110;

int n, W;
double res;

struct Item {
	double w;
	double val;
	
	bool operator< (const Item& t) const {
		return this->val / this->w > t.val / t.w;
	}
} a[N];

void solve() {
	cin >> n >> W;
	for (int i = 0; i < n; i++) cin >> a[i].w >> a[i].val;	
	
	sort(a, a + n);
	
	for (int i = 0; i < n; i++) {
		if (W > a[i].w) {
			W -= a[i].w;
			res += a[i].val;
		} else {
			res += W * a[i].val / a[i].w;
			break;
		}
	}
	
	cout << fixed << setprecision(2) << res << "\n";
}

signed main() {
	ios::sync_with_stdio(false);
	cin.tie(nullptr), cout.tie(nullptr);
	cout << fixed << setprecision(2);
	int T = 1;
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 11. 排队接水

https://www.luogu.com.cn/problem/P1223

> - 题意：贪心经典，排队接水，每一个人都有一个打水时间，现在询问如何排队能够使得平均等待时间最短
>
> - 思路：**考虑一般情况**。注意问的是平均等待时间，如果是打完水总花费时间那就是一个定值，即所有人打水的时间总和。现在为了让平均等待时间最短，我们的第一反应应该是，在人多的时候让打水时间短的先打，人少的时候让打水时间长的再打，那么很显然就是按照打水时间的升序进行排队。为了证明这个结论，我们采用数学归纳法，如下，对于一个排队序列来说，我们将其中的两个顺序进行颠倒，计算结果得到让打水时间短的排在前面更优，进而推广到一般情况，于是按照打水时间升序进行打水的策略是最优的。证毕
>
>     <img src="D:/BaiduSyncdisk/_images/typora-user-images/202402012332959.png" alt="demo" style="zoom: 67%;" />
>
> - 时间复杂度：$O(n \log n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 1010;

int n;

struct Item {
	int time;
	int i;
	
	bool operator< (const Item& t) const {
		return this->time < t.time;
	}
} a[N]; 

void solve() {
	cin >> n;
	for (int i = 1; i <= n; i++) {
		cin >> a[i].time;
		a[i].i = i;
	}
	
	sort(a + 1, a + n + 1);
	
	double sum = 0;
	
	for (int i = 1; i <= n; i++) {
		sum += a[i].time * (n - i);
		cout << a[i].i << " \n"[i == n];
	}
	
	cout << fixed << setprecision(2) << sum / n << "\n";
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

### 12. 线段覆盖

https://www.luogu.com.cn/problem/P1803

> - 题意：给定一个数轴和数轴上的 n 个线段，现在需要从中选出尽可能多的 k 个线段，使得线段之间两两不相交，问 k 最大是多少
> - 思路：绞尽脑汁想着各种情况进行分类讨论，什么包含、相交、相离，但是都忽视了最重要的一点，那就是一开始应该选择线段。即**考虑边界**，对于最左侧我们应该选择哪一条线段呢？答案是最左侧的右端点最靠左的那一条线段，这样子后续的线段才能有更多的摆放空间
> - 时间复杂度：$O(n \log n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 1000010;

int n;

struct Item {
	int l, r;
	bool operator< (const Item& t) const {
		return this->r < t.r;
	}
} a[N];

void solve() {
	cin >> n;
	for (int i = 1; i <= n; i++) cin >> a[i].l >> a[i].r;
	
	sort(a + 1, a + n + 1);
	
	int right = -1, res = 0;
	
	for (int i = 1; i <= n; i++) {
		if (a[i].l >= right) {
			res++;
			right = a[i].r;
		}
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

### 13. 小A的糖果

https://www.luogu.com.cn/problem/P3817

>- 题意：给定一个序列，现在每次可以选择序列中的某个数进行减一操作，问最少需要减多少可以使得序列中相邻两个元素之和不超过规定的数值 x
>- 思路：同 T12 的思路展开，**考虑边界**，我们直接从任意的一个边界开始思考，假设从左边界开始考虑。为了让左边界满足，那么 a[1] 与 a[2] 之和就需要满足条件，为了后续可以尽可能少的进行减一操作，很显然我们最好从两个数的右边的数开始下手，于是贪心的结果就有了
>- 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 100010;

int n, x;
int a[N];

void solve() {
	cin >> n >> x;
	for (int i = 1; i <= n; i++) cin >> a[i];
	
	int res = 0;
	
	for (int i = 2; i <= n; i++) {
		if (a[i] + a[i - 1] > x) {
			int eat = a[i] + a[i - 1] - x;
			res += eat;
			a[i] = a[i] >= eat ? a[i] - eat : 0;
		}
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

### 15. 陶陶摘苹果（升级版）

https://www.luogu.com.cn/problem/P1478

> - 题意：现在有 n 个苹果，含有高度和消耗体力值两个属性，现在你有一个最大高度以及总体力值，每次只能摘高度值不超过最大高度的苹果且会消耗相应的体力值。问最多可以摘多少个苹果
> - 思路：既然是想要摘的苹果尽可能多，那么高度都是浮云，体力值才是关键。为了摘得尽可能多的苹果，自然是消耗体力越少越优先摘。于是按照消耗体力值升序排序后，扫描一遍即可计数
> - 时间复杂度：$O(n\log n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 5010;

int n, s;
int aa, bb;

struct Apple {
	int h, cost;
	bool operator< (const Apple& t) const {
		return this->cost < t.cost;
	}
} a[N];

void solve() {
	cin >> n >> s;
	cin >> aa >> bb;
	for (int i = 1; i <= n; i++) cin >> a[i].h >> a[i].cost;
	
	sort(a + 1, a + n + 1);
	
	int cnt = 0;
	
	for (int i = 1; i <= n; i++) {
		if (s >= a[i].cost && a[i].h <= aa + bb) {
			cnt++;
			s -= a[i].cost;
		}
	}
	
	cout << cnt << "\n";
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

### 16. [NOIP2018 提高组] 铺设道路

https://www.luogu.com.cn/problem/P5019

>- 题意：给定一个序列，每次可以选择一个连续的区间使得其中的所有数 -1，前提是区间中的数都要 > 1，问最少选择几次区间可以将所有的数全部都减到 0
>
>- 思路：很显然的一个贪心思路就是，对于一个数，左右两侧均呈现递减的趋势，那么这个区间的选择数就是这个最大的数的值。但是这不符合代码逻辑，我们尝试**从端点开始考虑**。为了更好的理解，我们从递推的角度进行推演。假设填平前 i 个数花费的选择次数为 f[i]，那么对于第一个数 a[1]，我们一定需要花费 a[1] 次选择来将其减到零，于是 f[1] = a[1]；对于后续的数而言，可以发现
>
>   - 如果 a[i] > a[i-1]，那么之前的选择没有完全波及当前的数，还需要一定的次数来将其减到零，于是 `f[i] = f[i-1] + a[i] - a[i-1]`
>   - 如果 a[i] $\le$ a[i-1]，那么当前的数值一定会被之前的选择“波及”而直接减到零，于是 `f[i] = f[i-1]`
>
>   从递推的角度理解之后我们直接滚动一遍数组记录増势即可
>
>- 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 100010;

int n, a[N];

void solve() {
	cin >> n;
	for (int i = 1; i <= n; i++) cin >> a[i];
	
	int res = a[1];
	
	for (int i = 2; i <= n; i++)
		if (a[i] > a[i - 1])
			res += a[i] - a[i - 1];
	
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

### 17. [USACO1.3] 混合牛奶 Mixing Milk

https://www.luogu.com.cn/problem/P1208

> - 题意：现在需要收集 need 容量的牛奶，同时有 n 个农户提供奶源，每一个商户的奶源有一定的数量与单价，问如何采购可以在满足需求 need 的情况下成本最低化
> - 思路：很显然单价越低越优先采购
> - 时间复杂度：$O(n \log n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 2000010;

int need, n;

struct Milk {
	int per, tot;
	bool operator< (const Milk& t) const {
		return per < t.per;
	}
} a[N];

void solve() {
	cin >> need >> n;
	for (int i = 1; i <= n; i++) cin >> a[i].per >> a[i].tot;
	
	sort(a + 1, a + n + 1);
	
	int res = 0;
	
	for (int i = 1; i <= n; i++) {
		if (need >= a[i].tot) {
			need -= a[i].tot;
			res += a[i].tot * a[i].per;
		} else {
			res += need * a[i].per;
			need = 0;
		}
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

### 18. [NOIP2007 普及组] 纪念品分组

https://www.luogu.com.cn/problem/P1094


> - 题意：给定 n 个数，问如何分组可以使得在每一组之和不超过定值 lim 且每一组最多两个数的情况下，分得的组数最少
> - 思路：对序列没有要求，显然直接排序然后**从一端开始考虑**。首先有一个概念就是，为了尽可能的减少分得的组数，那么一定想要每一组分完后距离 lim 的差距越小越好。我们将 n 个数降序排序后，从最大值开始考虑，对于当前的数，为了找到一个数与当前数之和尽可能接近 lim，从贪心的角度来说一定是从当前数之后开始寻找那个配对的数从而使得两数之和与 lim 的差距最小，那么时间复杂度就是 $O(n^2)$。但是由于题目说了最多只有两个数，我们不妨换一种寻找配对数的策略，可以从原始的寻找方法得到启发，可以发现，原始的寻找配对数的方法中，如果找到的那个配对数可以与当前数之和不超过 lim 且之和尽可能的大，那么这个寻找到的配对数也一定可以和当前数的下一个数进行配对。由于我们一组只能有两个数，因此我们不用考虑两数组合之后比 lim 小的数尽可能的小，只需要考虑两个数能否组合即可，因此我们直接双指针进行寻找配对数操作即可
> - 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 30010;

int lim, n;
int a[N];

void solve() {
	cin >> lim >> n;
	for (int i = 1; i <= n; i++) cin >> a[i];
	
	sort(a + 1, a + n + 1, [&](int x, int y) {
		return x > y;
	});
	
	int res = 0, l = 1, r = n;
	
	while (l < r) {
		if (a[l] + a[r] <= lim) r--;
		l++, res++;
	}
	
	if (l == r) res++;
	
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

### 19. 跳跳！

https://www.luogu.com.cn/problem/P4995

> - 题意：给定 n 个数，每一个数代表一个高度，现在有一只青蛙从地面（高度为 0）开始起跳，每一个数字只能被跳上去一次。问如何设定跳数顺序 h[]，可以使得下式尽可能的大
>     $$
>     \sum_{i=1}^n (h_i-h_{i-1})^2
>     $$
>
> - 思路：题目意思其实就是让每一次跳跃的两个高度之差尽可能的大。那么一个贪心的思路就是从地面跳到最高，再从最高跳到次低，接着从次低跳到次高，以此类推得到的结果就是最优解，为了证明我们可以用数学归纳法，假设当前只有两个高度可以选择，那么肯定是先跳高的再跳低的；假设当前有三个高度可以选择，那么可以证明先从地面跳到最高处，再跳到最低处，最后跳到第二高的方法得到的值最大
>
> - 时间复杂度：$O(n \log n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 310;

int n, a[N];

void solve() {
	cin >> n;
	for (int i = 1; i <= n; i++) cin >> a[i];

	sort(a + 1, a + n + 1, [&](int x, int y) {
		return x > y;
	});

	int res = a[1] * a[1], l = 1, r = n;
	
	while (l < r) {
		res += (a[l] - a[r]) * (a[l] - a[r]);
		l++;
		if (l < r) {
			res += (a[l] - a[r]) * (a[l] - a[r]);
			r--;
		}
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

### 20. 安排时间

https://www.acwing.com/problem/content/5466/

> - 题意：给定 n 个时间段处理餐厅事务，m 个用餐预定信息，含有三个信息分别为订单发起时间，订单需要准备的时间，客人来用餐时间。问如何安排每一个时间段，可以让所有的用户得到正常的服务。如果不能全部满足则输出 -1
> - 思路：玄学贪心，先到的用户先做它的菜
> - 时间复杂度：$O(n^2)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 110;

int n, m;
int res[N];

struct Item {
	int id;
	int begi, arri, time;
	bool operator< (const Item& t) const {
		return arri < t.arri;
	}
} a[N];

void solve() {
	cin >> n >> m;
	for (int i = 1; i <= m; i++) {
		cin >> a[i].begi >> a[i].arri >> a[i].time;
		a[i].id = i;
		res[a[i].arri] = m + 1; // 接客 
	}
	
	sort(a + 1, a + m + 1);
	
	for (int i = 1; i <= m; i++) {
		int t = a[i].time;
		for (int j = a[i].begi; j <= a[i].arri - 1; j++) {
			if (t > 0 && !res[j]) {
				res[j] = a[i].id; // 做菜 
				t--;
			}
		}
		
		if (t) {
			cout << -1 << "\n";
			return;
		}
	}
	
	for (int i = 1; i <= n; i++) cout << res[i] << " \n"[i == n];
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

### 21. [NOIP2004 提高组] 合并果子

https://www.luogu.com.cn/problem/P1090

> - 题意：给定 n 个数，现在需要将其两两合并为最终的一个数，每次合并的代价是两个数之和，问如何对这些数进行合并可以使得总代价最小
> - 思路：很显然一共需要合并 n-1 次。那么我们从三个物品开始考虑，然后使用数学归纳法推导到 n 个数。对于三个物品，很显然先将两个物品进行合并，再将这个结果与最大的数进行合并方案时最优的。那么推广到 n 个数，我们只需要每次合并当前局面中最小的两个数即可
> - 时间复杂度：$O(n \log n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 10010;

int n, a[N];
priority_queue<int, vector<int>, greater<int>> q;
int res;

void solve() {
	cin >> n;
	for (int i = 1; i <= n; i++) {
		int x;
		cin >> x;
		q.push(x);
	}
	
	for (int i = 1; i <= n - 1; i++) {
		int a = q.top(); q.pop();
		int b = q.top(); q.pop();
		
		res += a + b;
		
		q.push(a + b);
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

### 22. 删数问题

https://www.luogu.com.cn/problem/P1106

> - 题意：给定一个数字字符串长度为 n，现在需要选择其中的 m 位数，使得这 m 位组成的数最小是多少 (m=n-k)
> - 思路：**我们从一端考虑问题**。为了组成的数尽可能的小，我们希望从首位开始就尽可能的小，同时如果有重复的数字，就选择最左侧的，剩余的数字留给后续的位数继续选择。有一个需要注意的点就是选择每一位的数字时，范围的约束，我们假设需要从 10 位的数字串中选择 3 位，那么我们第一次选择时需要在 0-7位中选择一位，第二次选择在 上次选择的下一个位置到第8位中选择一位，以此类推进行贪心选择
> - 时间复杂度：$O(n^2)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

string s, res;
int k;

void solve() {
	cin >> s >> k;
	int n = s.size();
	
	// 特判保留的数字个数 n-k 为负数的情况 
	if (n - k <= 0) {
		cout << 0 << "\n";
		return;
	}
	
	// 循环 n-k 次选择保留的数 
	int l = 0, r = k;
	for (int i = 0; i < n - k; i++) {
		int idx = -1;
		for (int j = l; j <= r; j++)
			if (idx == -1 || s[j] < s[idx])
				idx = j;
		
		res += s[idx];
		
		l = idx + 1, r++;
	}
	
	// 删除前导零 
	int i = 0;
	while (res[i] == '0') i++;
	
	// 输出结果 
	if (i == res.size()) 
		cout << 0;
	else
		for (int j = i; j < res.size(); j++) 
			cout << res[j];
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

### 23. 截断数组

https://www.acwing.com/problem/content/5483/

> 题意：定义平衡数组为奇偶数数量相同的数组，现在给定一个平衡数组，和一个总成本数，最多可以将原数组截成多少截子平衡数组，且截断代价总和不超过总成本，截断代价计算公式为 $|a_i-a_{i+1}|$
>
> 思路：我们直接枚举所有的可以被截断的位置，统计所有的代价值，然后根据成本总数按降序枚举代价值即可
>
> 时间复杂度：$O(n \log n)$

```cpp
#include <iostream>
#include <queue>
#include <cstring>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

const int N = 110;

int n, b;
int a[N], odd[N], even[N];

void solve() {
	cin >> n >> b;
	
	for (int i = 1; i <= n; i++) {
		cin >> a[i];
		if (a[i] % 2 == 0) {
			even[i] = even[i - 1] + 1;
			odd[i] = odd[i - 1];
		} else {
			even[i] = even[i - 1];
			odd[i] = odd[i - 1] + 1;
		}
	}
	
	vector<int> c;
	for (int i = 2; i <= n - 2; i += 2) {
		if (odd[i] == even[i]) {
			c.push_back(abs(a[i] - a[i + 1]));
		}
	}
	
	int res = 0;
	sort(c.begin(), c.end());
	for (auto& x: c) {
		if (b >= x) {
			b -= x;
			res++;
		}
	}
	
	cout << res;
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

### 24. 修改后的最大二进制字符串

https://leetcode.cn/problems/maximum-binary-string-after-change/description/

> 题意：给定一个仅由01组成的字符串，现在可以执行下面两种操作任意次，使得最终的字符串对应的十进制数值最大，给出最终的字符串
>
> 1. $00 \to 10$
> 2. $10 \to 01$
>
> 思路：
>
> - 有点像之前做的翻转转化为平移的问题，事实确实如此。首先需要确定一点就是：如果字符串起始有连续的1，则保留，因为两种操作都是针对0的。接着就是对从第一个0开始的尾串处理的思路
> - 对于尾串而言，我们自然希望1越多、越靠前越好，但是第二种操作只能将1向后移，第一种操作又必须要连续的两个0，因此我们就产生了这样的贪心思路：将所有的1通过操作二移动到串尾，接着对尾串的开头连续的0串执行第二种操作，这样就可以得到最大数值的二进制串
>
> 时间复杂度：$O(n)$

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
            }
            else {
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

