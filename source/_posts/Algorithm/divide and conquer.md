## divide and conquer

### 1. 随机排列

https://www.acwing.com/problem/content/5469/

> - 题意：给定一个 n 个数的全排列序列，并将其进行一定的对换，问是对换了 3n 次还是 7n+1 次
> - 思路：可以发现对于两种情况，就对应对换次数的奇偶性。当 n 为奇数：3n 为奇数，7n+1 为偶数；当 n 为偶数：3n 为偶数，7n+1 为奇数。故我们只需要判断序列的逆序数即可。为了求解逆序数，我们可以采用归并排序的 combine 过程进行统计即可
> - 时间复杂度：$O(n \log n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 1000010;

int n, a[N], t[N];
int cnt; // 逆序数 

void MergeSort(int l, int r) {
	if (l >= r) return;
	
	int mid = (l + r) >> 1;
	
	MergeSort(l, mid), MergeSort(mid + 1, r);
	
	int i = l, j = mid + 1, idx = 0;
	
	while (i <= mid && j <= r) {
		if (a[i] < a[j]) t[idx++] = a[i++];
		else {
			cnt += mid - i + 1;
			t[idx++] = a[j++];
		}
	}
	
	while (i <= mid) t[idx++] = a[i++];
	while (j <= r) t[idx++] = a[j++];
	
	for (i = l, idx = 0; i <= r; i++, idx++) a[i] = t[idx];
}

void solve() {
	cin >> n;
	
	for (int i = 0; i < n; i++) cin >> a[i];
	
	MergeSort(0, n - 1);
	
	int res;
	
	if (n % 2 == 1) {
		if (cnt % 2) res = 1;
		else res = 2;
	} else {
		if (cnt % 2) res = 2;
		else res = 1;
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