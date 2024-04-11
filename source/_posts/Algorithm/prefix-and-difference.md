---
title: prefix and difference
categories: Algorithm
category_bar: true
---


## prefix and difference

### 1. 充能计划

https://www.lanqiao.cn/problems/8732/learning/?contest_id=147

> 题意：给定 $n$ 个数初始化为 $0$，现在给定 $q$ 个位置，每个位置给定两个参数 $p,k$，表示从第 $k$ 个数开始连续 $s[p]$ 个数 $+1$。有以下两种约束
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

### 2. 或值至少为 K 的最短子数组 II

https://leetcode.cn/problems/shortest-subarray-with-or-at-least-k-ii/description/

> 题意：给定一个序列，问其中所有连续的序列中，所有元素或值的结果超过 k 的序列长度最短是多少
>
> - 思路一：**枚举**。很显然我们可以枚举所有的长度、所有的序列、所有的或值进行判断
>
>     时间复杂度：$O(n^3)$
>
> - 思路二：**二分**。可以发现序列的长度越长，序列中所有元素的或值越有可能超过 k，可以二分答案。但是对于每一次二分出来的答案，检查函数都需要 $O(n^2)$ 来完成
>
>     时间复杂度：$O(n^2\log n)$
>
> - 思路三：**二分＋前缀和**。有没有什么方法可以加速检查呢？答案是有的。我们从或运算的根本出发，序列中所有元素的或值取决于每一个数的每一个二进制位。对于所有的序列中的数来说，如果第 `j` 个二进制位出现了 `1`，则无论别的数什么情况，最终这一位或出来的结果一定是 `1 << j`。于是对于 $O(n)$ 的或运算，我们就可以通过前缀和的方式简化为 $O(30)$。即我们利用二维数组存储每一个数的二进制位的结果，其中 `a[i][j]` 表示前 i 个数的第 j 个二进制位的相加的结果。后续在计算区间中元素的或值时，只需要检查区间中 30 个二进制位是否含有 1 即可。
>
>     时间复杂度：$O(30n\log n)$

```cpp
const int N = 2e5 + 10;

int a[N][35];

class Solution {
public:
    bool chk(int x, vector<int>& nums, int k) {
        int n = nums.size();

        for (int i = x; i <= n; i++) {
            int res = 0;
            for (int j = 0; j <= 30; j++) {
                if (a[i][j] - a[i - x][j]) res += 1 << j;
            }
            if (res >= k) return true;
        }

        return false;
    }

    int minimumSubarrayLength(vector<int>& nums, int k) {
        int n = nums.size();

        // 维护前缀和
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j <= 30; j++) {
                if (1 << j & nums[i - 1]) {
                    a[i][j] = a[i - 1][j] + 1;
                } else {
                    a[i][j] = a[i - 1][j];
                }
            }
        }

        // for (int i = 1; i <= n; i++) {
        //     for (int j = 0; j <= 30; j++) {
        //         cout << a[i][j] << " \n"[j == 30];
        //     }
        // }

        // 二分答案
        int l = 1, r = n;
        while (l < r) {
            int mid = (l + r) >> 1;
            if (chk(mid, nums, k)) r = mid;
            else l = mid + 1;
        }

        // 检查结果
        for (int i = r; i <= n; i++) {
            int res = 0;
            for (int j = 0; j <= 30; j++) {
                if (a[i][j] - a[i - r][j]) {
                    res += 1 << j;
                }
            }
            if (res >= k) return r;
        }

        return -1;
    }
};
```