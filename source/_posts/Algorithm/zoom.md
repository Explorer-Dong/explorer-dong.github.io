---
title: 思维题
categories: Algorithm
category_bar: true
---

## 思维题

### 1. 最长严格递增子序列

https://www.acwing.com/problem/content/5273/

> 题意：给定长度为n的序列，问将这个序列拼接n次后，最长严格递增子序列的长度为多少？
>
> 思路：其实最终的思路很简单，讲题目转化为在每个序列中选一个数，一共可以选出多少个不同的数。但是在产生这样的想法之前，先讲一下我的思考过程。我将序列脑补出一幅散点折线图，然后将这些点投影到y轴上，最终投影点的个数就是答案的数量，但是投影会有重合，因此答案最多就是n个数，最少1个数，从而想到就是在n个序列中选数，选的数依次增大即可，相信的就是一个求序列不重复数的个数的过程。去重即可。
>
> 注意点：由于C++的STL的unique函数的前提是一个有序的序列，因此在unique之前需要将序列进行排序。
>
> 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    int T;
    cin >> T;

    while (T--)
    {
        int n;
        cin >> n;

        vector<int> a;
        for (int i = 0; i < n; i++)
        {
            int x;
            cin >> x;
            a.emplace_back(x);
        }

        // 去重老套路，string也可以用
        sort(a.begin(), a.end());
        a.erase(unique(a.begin(), a.end()), a.end());

        cout << a.size() << endl;
    }

    return 0;
}
```

### 2. 三元组

https://www.acwing.com/problem/content/5280/

> 题意：在一个序列中如何选择一个三元组，使得三个数之积最小，给出情况数
>
> 思路：首先很容易得知，这三个数一定是序列排序后的前三个数，那么就是对这三个数可能的情况进行讨论
>
> - 情况1：**前三个数都相等 **`（2 2 2 2 2 4 5）`，则就是在所有的 `a[0]` 中选3个，情况数就是 $C_{cnt\_a[0]}^{3}$
> - 情况2：**前三个数中有两个数相等**，由于数组经过了排序，因此情况2分为两种情况
>     - 前两个数相等 `（1 1 3 3 3 5）`，则就是在所有的 `a[2]` 中选1个，情况数就是 $C_{cnt\_a[2]}^{1}$
>     - 后两个数相等 `（1 2 2 2 4 6）`，则就是在所有的 `a[1]` 中选2个，情况数就是 $C_{cnt\_a[1]}^{2}$
> - 情况3：**前三个数中全都不相等** `（1 2 4 4 4 5 7）`，这就是在所有的 `a[2]` 中选1个，情况数就是 $C_{cnt\_a[2]}^{1}$
>
> 可以发现上述情况2的第一种和情况3的答案相等，故分为三种情况即可。

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

// 计算组合数 C_{a}^{b}
ll calc(ll a, ll b) {
    ll fz = 1, fm = 1;
    for (int i = 0, num = a; i < b; i++, num--) {
        fz *= num;
    }
    for (int i = 1; i <= b; i++) {
        fm *= i;
    }
    return fz / fm;
}

int main() {
    int n; cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    
    sort(a.begin(), a.begin() + n);
    
    ll res = 0;
    
    if (a[0] == a[1] && a[1] == a[2]) {
        // 情况1：前三个数都相等（2 2 2 2 2 4 5），则就是在所有的a[0]中选3个
        ll cnt = count(a.begin(), a.begin() + n, a[0]);
        res = calc(cnt, 3);
    } else if (a[0] == a[1] || (a[0] != a[1] && a[1] != a[2])) {
        // 情况2：前两个数相等（1 1 3 3 3 4 5） or 三个数都不相等（1 2 4 4 4 5 7），则就是在所有的a[2]中选2个
        res = count(a.begin(), a.begin() + n, a[2]);
    } else {
        // 情况3：后两个数相等（1 2 2 2 4 6），则就是在所有的a[1]中选2个
        ll cnt = count(a.begin(), a.begin() + n, a[1]);
        res = calc(cnt, 2);
    }
    
    cout << res << "\n";
    
    return 0;
}
```

### 3. 删除元素

https://www.acwing.com/problem/content/5281/

> 题意：给定一个排列为1~n，定义一个数“有价值”为当前数的前面没有数比当前的数大。现在需要删除一个数，使得序列中增加尽可能多的“有价值”的数，如果这个数有多个，则删除最小的那个数
>
> ==最开始想到的思路==：枚举每一个数，如果删除，则序列中会增加多少个“有价值”的数，算法设计如下：
>
> 1. 首先判断每一个数是否是有价值的数
>     - 创建一个变量来记录当前数的前面序列的最大值
>     - 比较判断当前数和前方最大值的关系，如果小于，则无价值，反之有价值
> 2. 接着枚举每一个数，如果删除该数，则序列会损失多少个有价值的数
>     - 首先判断自己是不是有价值的数，如果是，则当前损失值 -1
>     - 接着判断删除当前数对后续的影响 :star: ：我们在枚举后续数的时候，起始的newd（前驱除掉a[i]的最大值）应该就是当前的d，只不过需要使用新变量newd而非d是因为这一步与整体无关，不可以改变整体的d。否则会出现错误，比如对于`4 3 5 1 2`，如果我们在枚举后续数的时候直接对d进行迭代，那么在第一轮d就会被更新为5，就再也无法更新了
> 3. 最终根据维护的损失值数组cnt即可求解
> 4. 时间复杂度 $O(n^2)$
>
> ---
>
> ==优化的思路==：
>
> 1. 同样是枚举每一个数，如果当前数字是有价值的数，那么cnt[a[i]]就 -1
>
>     - 取决于当前数字前面是否有比它大的数，如果没有，那么就是有价值的
>
> 2. 接下来我们不需要遍历j=i+1到j=n-1，而是讨论当前数a[i]不是有价值数时的所有情况。现在我们想要维护cnt数组。不难发现，对于某个位置上的数a[k]，能否成为有价值的数只取决于前排序列是否有比他大的数以及大的数的个数。那么理论上我们在枚举a[i]的时候维护cnt[1~i-1]就可以确保cnt数组的正确性了。
>
>     - 假设a[k]的前排有一个比它大的数d：那么把d去掉之后，a[k]就会从无价值变为有价值
>     - 假设a[k]的前排有至少两个比它大的数d1,d2,...dj...：那么不管去掉哪一个 $d_j$，我们都没法让a[k]变得有价值
>
>     如此一来，cnt数组就可以正确维护了
>
> 3. 最终根据维护的损失值数组cnt即可求解
>
> 4. 时间复杂度 $O(n)$

暴力：

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
	int n;
	cin >> n;
	
	vector<int> a(n);
	for (int i = 0; i < n; i++) {
		cin >> a[i];
	}
	
	// 判断每个数是否是有价值的数
	int d = 0; // 前方序列中的最大值
	vector<bool> is_val(n + 1);
	for (int i = 0; i < n; i++) {
		if (a[i] > d) {
			is_val[a[i]] = true;
			d = a[i];
		}
	}
	
	// 枚举每一个数，计算删除该数之后会增加的有价值的数的个数 
	d = 0; // 同上
	vector<int> cnt(n + 1); // cnt[x]表示删除数x之后可以增加的有价值的数的个数
	for (int i = 0; i < n; i++) {
		if (is_val[a[i]]) {
			cnt[a[i]]--;
		}
		
		int newd = d; // 去掉a[i]后的前方序列的最大值 newd
		for (int j = i + 1; j < n; j++) {
			if (is_val[a[j]]) {
				if (a[j] < newd) {
					cnt[a[i]]--;
				}
			} else {
				if (a[j] > newd) {
					cnt[a[i]]++;
				}
			}
			if (a[j] > newd) {
			    newd = a[j];
			}
		}
		
		// 更新前方序列的最大值 d
		if (a[i] > d) {
			d = a[i];
		}
	}

	// 找出可以增加的有价值的数的最大个数 ma
	int ma = -n - 1;
	for (int i = 0; i < n; i++) {
		if (cnt[a[i]] > ma) {
			ma = max(ma, cnt[a[i]]);
		}
	}

	// 答案是满足个数的最小的数字
	int res = 0;
	for (int i = 1; i <= n; i++) {
		if (cnt[i] == ma) {
			res = i;
			break;
		}
	}
	
	cout << res << "\n";
	
	return 0;
}
```

优化：

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n; 
    cin >> n;
    
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
     
    vector<int> cnt(n + 1);     // cnt[x]表示删除数x之后可以增加的有价值的数的个数
    int d1 = 0, d2 = 0;         // d1: 最大值, d2: 次大值
    for (int i = 0; i < n; i++) {
        if (a[i] > d1) {
            // 前方序列 没有数比当前的数大
            cnt[a[i]]--;
        } else if (a[i] > d2) {
            // 前方序列 只有一个数比当前大
            cnt[d1]++;
        }
        
        // 更新最大值d1和次大值d2
        if (a[i] > d1) d2 = d1, d1 = a[i];
        else if (a[i] > d2) d2 = a[i];
    }
    
    // 找到可以增加的最大值
    int ma = -1;
    for (int i = 1; i <= n; i++) {
        if (cnt[i] > ma) {
            ma = cnt[i];
        }
    }
    
    // 取元素的最小值
    int res = n + 1;
    for (int i = 1; i <= n; i++) {
        if (cnt[i] == ma) {
            res = i;
            break;
        }
    }
    
    cout << res << "\n";
    
    return 0;
}
```

### 4. Sorting with Twos

https://codeforces.com/contest/1891/problem/A

> 题意：给定一个序列，现在需要通过以下方法对序列进行升序排序
>
> - 可以选择前 $2^m$ 个数执行 $-1$ 的操作（保证不会越界的情况下）
>
> 现在需要确定给定的序列经过k次上述后能否变为升序序列
>
> 思路：我们可以将每 $2^k$ 个数看成一个数，可以不断的-1。那么可以发现执行一定的次数后，一定可以实现升序序列。但是现在是 $2^k$ 个数，那么只需要这相邻区段的数是升序即可，即 $2^{k-1} \to 2^k$ 之间的数是升序即可。按区间进行判断即可
>
> 时间复杂度：$O(n)$

```cpp
void judge(vector<int>& a, int l, int r, bool& ok, int n) {
	for (int i = l + 1; i <= r && i <= n; i++) {
		if (a[i] < a[i - 1]) {
			ok = false;
			return;
		}
	}
}
 
void solve() {
	int n;
	cin >> n;
 
	vector<int> a(n + 1);
	for (int i = 1; i <= n; i++) {
		cin >> a[i];
	}
 
	bool ok = true;
	judge(a, 3, 4, ok, n);
	judge(a, 5, 8, ok, n);
	judge(a, 9, 16, ok, n);
	judge(a, 17, 20, ok, n);
 
	if (ok) {
		cout << "YES\n";
	} else {
		cout << "NO\n";
	}
}
```

### 5. 指针运动​ :fire:

https://www.acwing.com/problem/content/description/5468/

> - 题意：给定一个序列，和一个从第一个数开始的指针，若当前指的数为 0 则输出当前数的下标结束程序，若不为 0 则全体正数减一并将指针后移，若指针越界则重新指向第一个数。问最终指向第几个数
> - 思路：
>     - 第一层思路：纯暴力。即按照题意进行模拟，时间复杂度 $O(n \times \max (a_i))$
>     - 第二层思路：枚举优化。假设当前枚举到了第 k 次，若第一次遇到当前的数小于 k，则该数就是终止指向的数，时间复杂度 $O(n \times \max(a_i))$
>     - 第三层思路：数列优化。
> - 时间复杂度：

```cpp

```