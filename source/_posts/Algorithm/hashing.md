---
title: hashing
categories: Algorithm
category_bar: true
---

## hashing

### 1. 分组

https://www.acwing.com/problem/content/5182/

> 存储不想同组和想同组的人员信息：存入数组，数据类型为一对字符串
> 存储所有的组队信息：存入哈希表，数据类型为“键:字符串”“值:一对字符串”
> 想要知道最终的分组情况，只需要查询数组中的队员情况与想同组 or 不想同组的成员名字是否一致即可
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

### 2. [NOIP2016 普及组] 海港

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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```

### 3. [USACO16DEC] Cities and States S

https://www.luogu.com.cn/problem/P3405

> - 题意：给定 n 个字符串，每一个字符串归属一个集合，现在需要统计字符串与集合名相反相等的对数
> - 思路：很显然的哈希计数。难点有两个，如何哈希？如何计数？哈希可以采用扩展字符的方法进行，即第一个字符乘某一个较大的质数再加上第二个字符。此处采用一种较为巧妙的方法，直接将两个字符串与集合名加起来进行唯一性哈希，降低编码难度。计数有两种方式，第一种就是全部哈希结束之后，再遍历哈希表进行统计，最后将结果除二即可。第二种就是边哈希边计数，遇到相反相等的就直接计数，这样就不会重复计数了，也很巧妙
> - 时间复杂度：$O(n)$

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
//	cin >> T;
	while (T--) solve();
	return 0;
}
```