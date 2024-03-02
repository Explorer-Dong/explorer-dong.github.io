---
title: binary search
categories: Algorithm
category_bar: true
---

## binary search

二分查找理论上还是一个线性的算法思维，只是与一般的线性思维更进一步的是，二分思维需要提炼出题面中两个线性相关的变量，即单调变化的两个变量，从而采用二分加速检索

### 1. Building an Aquarium

https://codeforces.com/contest/1873/problem/E

> 题意：想象有一个二维平面，现在有一个数列，每一个数表示平面对应列的高度，现在要给这个平面在两边加上护栏，问护栏最高可以设置为多高，可以使得在完全填满的情况下，使用的水量不会超过给定的用水量。已知最大用水量为k
>
> 思路：对于一个护栏高度，水池高度低于护栏高度的地方都需要被水填满。为了便于分析，我们可以将水池高度进行排序。那么就会很显然的一个二分题目了，我们需要二分的就是护栏的高度（最小为1，最大需要考虑一下，就是只有一列的情况下，最大高度就是最高水池高度 $\max(a_i)+max(k)$），check的条件就是当前h的护栏高度时，消耗的水量与最大用水量之间的大小关系，如果超过了，那么高度就要下降，反之可以上升。由于是求最大高度，因此要使用的是求右边界的二分板子

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

void solve()
{
	int n, w;
	cin >> n >> w;
	vector<ll> a(n);
	
	for (int i = 0; i < n; i ++)
		cin >> a[i];
	
	sort(a.begin(), a.end());
	
	ll l = 0, r = 2e9 + 1;
	while (l < r)
	{
		ll h = (l + r + 1) >> 1;
		
		ll t = 0;
		for (int i = 0; i < n; i ++)
			if (a[i] < h)
				t += h - a[i];
			else break;
		
		if (t <= w) l = h;
		else r = h - 1;
	}
	cout << r << endl;
}

int main()
{
	int T; cin >> T;
	while (T --) solve();
	return 0;
}
```

### 2. 分组

https://www.lanqiao.cn/problems/5129/learning/

> 题意：给定一个序列，现在需要将这个数列分为k组，如何分组可以使得每一组的极差中，最大值最小
>
> 最开始想到的思路：
>
> 很容易联想到的一种方法其实就是高中组合数学中学到的“隔板法”，现在有n个数，需要分成k组，则方案数就是在n-1个空档中插入k-1个隔板，即 $C_{n-1}^{k-1}$ 种方案
>
> 时间复杂度 $O(n^2)$
>
> 优化思路：
>
> 上述思路是正向思维，即对于构思分组情况计算极差。我们不妨逆向思维，即枚举极差的情况，判断此时的分组情况。如果对于当前的极差lim，我们显然可以分成n组，即有一个最大分组值；我们也可以求一个最小分组值cnt，即如果再少分一组那么此时的极差就会超过当前约束的极差值lim。因此对于当前约束的极差值lim，我们可以求一个最小分组值cnt
>
> - 如果当前的最小分组值cnt > k，那么 $\left [ cnt,n \right ]$ 就无法包含k，也就是说当前约束的极差lim不符合条件，lim偏小
> - 如果当前的最小分组值cnt <= k，那么 $\left [ cnt,n \right ]$ 就一定包含k，且当前分组的最小极差一定是 <= 约束的极差值lim，lim偏大
>
> 于是二分极差的思路就跃然纸上了。我们二分极差，然后根据可以分组的最小数量cnt判断二分的结果进行左右约束调整即可。
>
> 时间复杂度 $O(n \log n)$

```cpp
#include <bits/stdc++.h>
using namespace std;


bool check(int lim, vector<int>& a, int n, int k) {
    int cnt = 1; // 当前可以分的最小组数
    int pre = a[0];
    for (int i = 0; i < n; i++) {
        if (a[i] - pre > lim) {
            pre = a[i];
            cnt++;
        }
    }
    return cnt <= k;
}


void solve() {
    int n, k;
    cin >> n >> k;

    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    sort(a.begin(), a.begin() + n);

    int l = 0, r = a[n - 1] - a[0];
    while (l < r) {
        int mid = (l + r) >> 1;
        if (check(mid, a, n, k)) {
            // 分的最小组数 <= k，则当前极差大了
            r = mid;
        } else {
            // 分的最小组数 >  k，则当前极差小了
            l = mid + 1;
        }
    }

    cout << r << "\n";
}


int main() {
    ios::sync_with_stdio(false);
    cin.tie(0), cout.tie(0);
    int T = 1;
    // cin >> T;
    while (T--) {
        solve();
    }    
    return 0;
}
```

### 3. 木材加工

https://www.luogu.com.cn/problem/P2440

> 题意：给定一个序列，现在需要将这个序列切分为等长的 k 段，长度必须为整数且尽可能的长，如果无法切分可以将多余的长度丢弃，问最长的长度是多少
>
> 思路：可以发现切分长度与切分的段数具有单调性，即切分的长度越长，切出来的段数就越少，可以进行二分。二分的思路就是直接二分答案，根据长度判断可切得的段数，最终套右边界的模板找到最大的长度即可。需要注意的是，对于无法切割的情况，就是需要切出的段数 k 超过了序列之和
>
> 时间复杂度：$O(n\log {(1e8)})$

```cpp
#include <bits/stdc++.h>
#define int long long 
using namespace std;

const int N = 1e5 + 10;

int n, k;
int a[N];

bool chk(int x) {
	int sum = 0;
	for (int i = 0; i < n; i++)
		sum += a[i] / x;
	return sum >= k;
}

void solve() {
	cin >> n >> k;
	
	int sum = 0;
	for (int i = 0; i < n; i++) {
		cin >> a[i];
		sum += a[i];
	}
	
	int l = 1, r = 1e8;
	while (l < r) {
		int mid = (l + r + 1) >> 1;
		if (chk(mid)) l = mid;
		else r = mid - 1;
	}
	
	if (k > sum) cout << "0\n";
	else cout << r << "\n";	
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

### 4. 跳石头

https://www.luogu.com.cn/problem/P2678

> 题意：给定 n 个递增的不重复数，现在可以从其中拿掉 k 个数，使得相邻数字之间的最小差值最大，问最大的最小差值是多少
>
> 思路：**二分答案。将答案看做 y 轴，拿掉的数的数量看做 x 轴，就是二分 y 值。**可以发现拿的数字越多，最小差值就越大，具有单调性，可以二分。我们直接二分答案，即直接二分最小差值的具体数值，通过判断当前的最小差值至少需要拿掉多少个数才能满足，进行 check 操作。至于如何计算至少要拿掉的数字，我们采用**右贪心**准则，即检查当前点与上一个点之间的距离是否满足最小差值的要求，如果不满足就需要记数，为了便于后续的计算，直接将当前的下标用上一个点的下标覆盖掉即可
>
> 时间复杂度：$O(n\log n)$

```cpp
#include <bits/stdc++.h>
#define int long long 
using namespace std;

const int N = 5e4 + 10;

int lim, n, k;
int a[N], b[N];
bool del[N];

bool ok(int x) {
	int cnt = 0;
	memset(del, false, sizeof del);
	
	for (int i = 1; i <= n; i++) {
		b[i] = a[i];
	}
	
	for (int i = 1; i <= n; i++) {
		if (b[i] - b[i - 1] < x) {
			del[i] = true;
			b[i] = b[i - 1];
			cnt++;
		}
	}
	
	if (lim - b[n] < x) {
		cnt++;
	}
	
	return cnt <= k;
}

void solve() {
	cin >> lim >> n >> k;
	for (int i = 1; i <= n; i++)
		cin >> a[i];
	
	int l = 1, r = lim;
	while (l < r) {
		int mid = (l + r + 1) >> 1;
		if (ok(mid)) l = mid;
		else r = mid - 1;
	}
	
	cout << r << "\n";
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

### 5. 路标设置

https://www.luogu.com.cn/problem/P3853

> 题意：与第四题题面几乎一致，只是现在不是从序列中拿走 k 数个，而是往序列中插入 k 个数（插入数字后要保证序列仍然没有重复数且递增），问在插入一定数量数字的情况下，最小的最大差值是多少
>
> 思路：**二分答案。将答案看做 y 轴，拿掉的数的数量看做 x 轴，就是二分 y 值。**同样可以发现，插入的数字越多，最大差值就越小，具有单调性，可以二分。我们依然直接二分答案，即直接二分最大差值的具体数值，通过判断当前的最大差值需要插入多少个数来检查当前状态是否合理。需要插入的数字的个数为：
> $$
> \left \lceil \frac{a[i]-a[i-1]}{dist_{max}}\right \rceil - 1
> $$
> 时间复杂度：$O(n\log n)$

```cpp
#include <bits/stdc++.h>
#define int long long 
using namespace std;

const int N = 1e6;

int lim, n, k;
int a[N];

bool chk(int x) {
	int cnt = 0;
	for (int i = 1; i < n; i++) {
		int gap = a[i] - a[i - 1];
		if (gap > x) {
			cnt += (gap + x - 1) / x - 1;
		}
	}
	return cnt > k;
}

void solve() {
	cin >> lim >> n >> k;
	for (int i = 0; i < n; i++) {
		cin >> a[i];
	}
	
	int l = 1, r = lim;
	while (l < r) {
		int mid = (l + r) >> 1;
		if (chk(mid)) l = mid + 1;
		else r = mid;
	}
	
	cout << r << "\n";
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

### 6. 数列分段 Section II

https://www.luogu.com.cn/problem/P1182

> 题意：给定一个无序的序列，现在需要将这个序列进行分段（连续的），分成指定的段数。问应该如何分段可以使得所有段的分段和的最大值最小，输出这个最小的最大值
>
> 思路：**二分答案，将答案看做 y 轴，拿掉的数的数量看做 x 轴，就是二分 y 值。**可以发现，分的段数越多，所有分段和的最大值就越小，具有单调性，可以二分。我们直接二分答案，即直接二分分段最大值，通过判断当前最大值的约束条件下可以分的组数进行判断。至于如何计算当前最大值条件下可分得的组数，直接线性扫描进行局部求和即可
>
> 时间复杂度：$O(n \log n)$

```cpp
#include <bits/stdc++.h>
#define int long long 
using namespace std;

const int N = 1e5 + 10;

int n, k;
int a[N];

// 当前分组时最大子段和为 x 
bool chk(int x) {
	int cnt = 0;
	for (int i = 0, s = 0; i < n; i++) {
		if (a[i] > x) return true;
		
		if (s + a[i] <= x) s += a[i];
		else {
			cnt++;
			s = a[i];
		}
	}
	cnt += 1;
	
	return cnt > k;
}

void solve() {
	cin >> n >> k;
	for (int i = 0; i < n; i++) {
		cin >> a[i];
	}
	
	int l = 0, r = 1e9;
	while (l < r) {
		int mid = (l + r) >> 1;
		if (chk(mid)) l = mid + 1;
		else r = mid;
	}
	
	cout << r << "\n";
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

### 7. kotori的设备

https://www.luogu.com.cn/problem/P3743

> 题意：现在有一批电子设备，每一个电子设备有一个电量消耗速度与当前剩余电量，现在有一个充电器有一个确定的充电速度。问这批设备最久可以运作多久？当可以无限运作时输出 -1
>
> 思路：可以发现，想要运行的越久，需要补充的电量就越多，具有单调性，可以直接二分答案。很显然我们可以根据期望运行的时间进行 check 操作，通过比对当前期望时间可以充的电量与需要补充的电量进行比对来修改边界值。**需要注意的是**边界的选择，最长可运行时间为 1e10，具体 [推导](https://www.luogu.com.cn/discuss/468555) 待定
>
> 时间复杂度：$O(n(\log{10^{10})})$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 100010;

int n;
double p, v[N], s[N];

bool chk(double x) {
	// x 为当前状态期望使用的时间 
	double need = 0;
	for (int i = 1; i <= n; i++)
		if (v[i] * x > s[i])
			need += v[i] * x - s[i];
	return need <= x * p;
}

void solve() {
	cin >> n >> p;
	for (int i = 1; i <= n; i++) {
		cin >> v[i] >> s[i];
	}
	
	double l = 0, r = 1e10 + 10;
	while (r - l > 1e-6) {
		double mid = (l + r) / 2; 
		if (chk(mid)) l = mid;
		else r = mid;
	}
	
	if (r > 1e10) cout << -1 << "\n";
	else cout << r << "\n";
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

### 8. [NOIP2010 提高组] 关押罪犯

https://www.luogu.com.cn/problem/P1525

> 题意：给定一个无向图，没有重边和自环，边权为正。现在需要将图中所有的顶点分为两部分，使得两部分中最大的边权尽可能小，问该最小边权是多少
>
> - 思路一：二分答案。本题一眼二分图问题，但是有些变化的是左右部并非散点图，其中是有连边的。如何求出最小边权呢？我们可以这么想，首先答案一定出自左右部的连边中（除非左右部全是散点，那答案就是 0），之所以可以采用二分图将点集分为两部分，是因为我们在某种规则下忽略了其中奇数环（二分图定理）的一些边。当规则定义为 **忽略边权不超过 x** 的边时，该图若可以二分，那么忽略边权比 x 值更大的边时，该图同样一定也可以二分，反之则不一定可以二分（特性图如下）。具备单调性，于是我们可以通过 **二分阈值、检查图是否可二分** 的方法来计算出答案
>
>     <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402230117928.png" alt="image-20240223011704197" style="zoom:50%;" />
>
>     时间复杂度：$O(\log C_{max} \times (n+e))$
>
> - 思路二：
>
>     时间复杂度：

二分判定二分图代码：

```cpp
```

并查集代码：

```cpp
```

