---
title: prefix and difference
categories: Algorithm
category_bar: true
---


## prefix and difference

### 1. 充能计划

https://www.lanqiao.cn/problems/8732/learning/?contest_id=147

> 题意：给定 $n$ 个数初始化为 $0$，现在给定 $q$ 个位置，每个位置给定两个参数 $p、k$，表示从第 $k$ 个数开始连续 $s[p]$ 个数 $+1$。有以下两种约束
>
> 1. 如果连续 $s[p]$ 个数越界了，则越界的部分就不 $+1$
> 2. 一个位置最多只能被一种 $p$ 对应的种类 $+1$
>
> 思路：
>
> - 现在假设只有一个种类的p，如果不考虑上述第二个条件的约束，那么就是纯差分。如果考虑了，那么我们从左到右考虑+1区间覆盖的问题，就需要判断当前位置是否被上一个+1区间覆盖过，解决办法就是**记录上一个区间覆盖的起始点or终止点**，这里选择起始点。
> - 现在我们考虑多个种类的p，那么就是分种类重复上述思路即可，因为不同种类之间是没有约束上的冲突的。那么如何分种类解决呢，我们可以对输入的q个位置的所有p、k参数进行排序，p为第一关键词，k为第二个关键词。
> - 时间复杂度：$O(q\log q+q+n)$

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

const int N = 100010;

struct node {
	int p, k; // 第p种宝石丢在了第k个坑
	bool operator<(const node &t) const {
		if (p == t.p) {
			return k > t.k;
		} else {
			return p > t.p;
		}
	}
};

int n, m, q, s[N]; // n个坑，m种宝石，q个采集的宝石，s[i]表示第i种宝石的能量
vector<int> last(N, -1e6); // last[i]表示上一个第i种宝石的位置
int a[N], b[N]; // a[]为原数组，b[]为差分数组
priority_queue<node> que;

void solve() {
	cin >> n >> m >> q;
	for (int i = 1; i <= m; i++) {
		cin >> s[i];
	}

	while (q--) {
		int p, k;
		cin >> p >> k;
		que.push({p, k});
	}

	while (que.size()) {
		auto h = que.top();
		que.pop();
		int p = h.p, k = h.k; // 第p种宝石丢在了第k个坑

		int l, r;
		if (k - last[p] >= s[p]) {
			// 和上一种没有重叠
			l = k, r = min(n, k + s[p] - 1);
			b[l]++, b[r + 1]--;
			last[p] = k;
		} else {
			// 和上一种有重叠
			l = last[p] + s[p];
			r = min(n, k + s[p] - 1);
			if (l <= r) {
				b[l]++, b[r + 1]--;
			}
			last[p] = k;
		}
	}

	for (int i = 1; i <= n; i++) {
		a[i] = a[i - 1] + b[i];
		cout << a[i] << " \n"[i == n];
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