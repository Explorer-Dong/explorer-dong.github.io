---
title: 博弈论
categories: 数据结构与算法
category_bar: true
---

### 前言

思考如何必胜态和必败态是什么以及如何构造这样的局面。

### 【博弈/贪心/交互】Salyg1n and the MEX Game

https://codeforces.com/contest/1867/problem/C

> 标签：博弈、贪心、交互
>
> 题面：对于给定n个数的数列，先手可以放入一个数列中不存在的数（0-1e9），后手可以从数列中拿掉一个数，但是这个数必须严格小于刚才先手放入的数。终止条件：后手没法拿数或者操作次数达到了 2n+1 次。问：当你是先手时，如何放数可以使得最终数列的 MEX 值最大。
>
> 思路：先手每次放入的数一定是当前数列的 MEX 值，此后不管后手拿掉什么数，先手都将刚刚被拿掉的数放进去即可。那么最多操作次数就刚好是 2n+1次，因为加入当前数列就是一个从 0 开始的连续整数数列，那么先手放入的数就是最大数 +1，即 n，那么假如后手从 n-1 开始拿，后手最多拿 n 次，先手再放 n 次，那么就是 2n+1 次。
>
> 时间复杂度：$O(n)$

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main()
{
	int T; cin >> T;
	
	while (T--)
	{
		int n; cin >> n;
		vector<int> a(n);
		
		for (int i = 0; i < n; i ++)
			cin >> a[i];
		
		int mex = n;
		for (int i = 0; i < n; i ++)
			if (a[i] != i)
			{
				mex = i;
				break;
			}
		
		cout << mex << endl;
		
		int remove;
		cin >> remove;
		
		while (remove != -1)
		{
			cout << remove << endl;
			cin >> remove;
		}
	}
	
	return 0;
} 
```