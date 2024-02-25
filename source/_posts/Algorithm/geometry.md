---
title: geometry
categories: Algorithm
category_bar: true
---

## geometry

### 1. Minimum Manhattan Distance

https://codeforces.com/gym/104639/problem/J

> 题意：给定两个圆的直径的两个点坐标，其中约束条件是两个圆一定是处在相离的两个角上。问如何在C2圆上或圆内找到一点p，使得点p到C1圆的所有点的曼哈顿距离的期望值最小
>
> 思路：
>
> 1. 看似需要积分，其实我们可以发现，对于点p到C1中某个点q1的曼哈顿距离，我们一定可以找到q1关于C1对称的点q2，那么点p到q1和q2的曼哈顿距离之和就是点p到C1的曼哈顿距离的两倍（证明就是中线定理）那么期望的最小值就是点p到C1的曼哈顿距离的最小值。目标转化后，我们开始思考如何计算此目标的最小值，思路如下图
>
>     <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402252321057.png" alt="image-20240116175917260" style="zoom:50%;" />
>
> ==注意点：==
>
> 1. double的读取速度很慢，可以用 `int` or `long long` 读入，后续强制类型转换（显示 or 和浮点数计算）
> 2. 注意输出答案的精度控制  `cout << fixed << setprecision(10) << res << "\n";`

```cpp
void solve() {
	double x1, y1, x2, y2;
	long long a, b, c, d;

	cin >> a >> b >> c >> d;
	x1 = (a + c) / 2.0;
	y1 = (b + d) / 2.0;

	cin >> a >> b >> c >> d;
	x2 = (a + c) / 2.0;
	y2 = (b + d) / 2.0;

	double r2 = sqrt((a - c) * (a - c) + (b - d) * (b - d)) / 2;

	cout << fixed << setprecision(10) <<  abs(x1 - x2) + abs(y1 - y2) - sqrt(2) * r2 << "\n";
}
```

### 2. 三角形

https://www.acwing.com/problem/content/5383/

> 题意：给定两个直角三角形的两条直角边的长度 a, b，问能不能在坐标轴上找到三个整数点使得三点满足该直角三角形且三遍均不与坐标轴垂直
>
> 思路：首先确定两个直角边的顶点为原点 (0, 0)，接着根据对称性直接在第一象限中按照边长枚举其中一个顶点 A，对于每一个枚举到的顶点 A，按照斜率枚举最后一个顶点 B，如果满足长度以及不平行于坐标轴的条件就是合法的点。如果全部枚举完都没有找到就是没有合法组合，直接输出 NO 即可。
>
> 时间复杂度：$O(a^2b)$

```cpp
#include <bits/stdc++.h>
using namespace std;

#define int long long

int a, b;

void solve() {
	cin >> a >> b;

	for (int i = 0; i <= a; i++) {
		for (int j = 0; j <= a; j++) {
			if (i * i + j * j == a * a && i && j) {
				int gcd = __gcd(i, j);
				int p = -i / gcd, q = j / gcd;
				int y = p, x = q;
				while (x * x + y * y < b * b) {
					x += q, y += p;
				}
				if (x * x + y * y == b * b && x != i && y != j) {
					cout << "YES\n";
					cout << 0 << ' ' << 0 << "\n";
					cout << i << ' ' << j << "\n";
					cout << x << ' ' << y << "\n";
					return;
				}
			}
		}
	}

	cout << "NO\n";
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