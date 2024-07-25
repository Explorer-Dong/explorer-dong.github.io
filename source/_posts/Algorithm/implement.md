---
title: implement
categories: Algorithm
category_bar: true
---

### 模拟

### 【模拟】所有三角形

https://www.acwing.com/problem/content/5167/

> - 每一个1都有三个边
> - 对于每一个1，判断左右是否也有1，如果有则减掉一条边
> - 对于奇数位的1，判断上 | 下是否有1，如果有也要减掉一条边

```cpp
#include <bits/stdc++.h>

using namespace std;

const int N = 200010;

int n;
int a[N], b[N];

int main()
{
    cin >> n;
    
    int res = 0;
    
    for (int i = 1; i <= n; i ++)
    {
        cin >> a[i];
        if (a[i] == 1) res += 3;
    }
    
    for (int i = 1; i <= n; i ++)
    {
        cin >> b[i];
        if (b[i] == 1) res += 3;
    }
    
    for (int i = 1; i <= n; i ++)
    {
        if (a[i])
        {
            if (a[i - 1]) res --;
            if (a[i + 1]) res --;
            if (i % 2 == 1)
            {
                if (b[i] == 1) res --;
            }
        }
    }
    
    for (int i = 1; i <= n; i ++)
    {
        if (b[i])
        {
            if (b[i - 1]) res --;
            if (b[i + 1]) res --;
            if (i % 2 == 1)
            {
                if (a[i] == 1) res --;
            }
        }
    }
    
    cout << res << endl;
    
    return 0;
}
```

### 【模拟】XOR Palindromes

https://codeforces.com/contest/1867/problem/B

> 题意：给定一个二进制字符串s长度为n，现在需要构造一个长度为n+1的字符串t，对于t中的每一位，即0<=i<=n的t[i]，如果将s中的数字0变为1或1变为0一共i次后，s成为了一个回文串，那么t[i]就是1，如果成为不了回文串就是0
>
> 输出：给出最终构造的t字符串
>
> 注意点：**对于回文问题，多考虑双指针算法**
>
> 思路：想要在改变了x（0<=x<=n）个数位后成为一个回文串，那么就要先统计当前的字符串s的回文情况。假如对称位置相同，那么可以不消耗改变次数或者消耗两次改变次数，假如对称位置不同，那么就必须要消耗一次改变次数。同时需要特判的是假如原串的字符数为奇数，那么中间的位置可以提供一个缓冲的机会，即假如被前面的两种情况消耗掉改变次数之后，还剩一次改变次数，那么就可以改变中间的字符。当然了假如改变完了中间的字符之后还是多了改变次数，那么就无法使得原串为回文串了。
>
> 时间复杂度：$O(n\log n)$

```cpp
#include <iostream>
using namespace std;

int main()
{
    int T;
    cin >> T;
    
    while (T--)
    {
        int n; cin >> n;
        string s; cin >> s;
        
         // 判断原串是否为奇数个字符
        bool odd = false;
        if (n % 2) odd = true;
        
         // 双指针统计原串的对应情况
        int l = 0, r = n - 1;
        int same = 0, dif = 0;
        while (l < r)
        {
            if (s[l] == s[r]) same ++;
            else dif ++;
            l ++, r --;
        }
        
        // 对当前s的x个数位进行转换数字 
        for (int x = 0; x <= n; x ++)
             // 不同的对应位是一定要改变的
            if (x < dif) cout << 0;
            else
            {
                int aft = x - dif; // aft为消耗掉不同对应位次数后剩余的改变次数
                for (int i = 2 * same; i >= 0; i -= 2) // 时间复杂度为log n
                    if (aft >= i)
                    {
                        aft -= i;
                        break;
                    }
                
                  // 此时为消耗掉不同对应位和相同对应位次数之后的剩余改变次数
                if (aft > 1) cout << 0;
                else if (aft == 1)
                {
                    if (odd) cout << 1;
                    else cout << 0;
                }
                else cout << 1;
            }
        
        cout << endl;
    }
    
    return 0;
}
```

### 【模拟】Target Practice

https://codeforces.com/contest/1873/problem/C

> 题意：给了一个定尺寸的正方形，类似于靶子的得分机制，对于最终给出的打靶情况，计算最终的得分
>
> 思路：我们可以根据下标来观察规律，比如1分的靶位，横坐标都是0或9，或者纵坐标都是0或9，其余的得分同理，但是会出现一些重复，我们开一个相同尺寸的二维st表即可解决这个重复计数的问题

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

void solve()
{
    vector<string> a(10);
    for (int i = 0; i < 10; i ++)
        cin >> a[i];
    
    bool st[10][10] {};
    
    int res = 0;
    
    for (int i = 0; i < 10; i ++)
        for (int j = 0; j < 10; j ++)
        {
            if (i == 0 || i == 9 || j == 0 || j == 9) if (a[i][j] == 'X') res += 1, st[i][j] = true;
            if (i == 1 || i == 8 || j == 1 || j == 8) if (a[i][j] == 'X' && !st[i][j]) res += 2, st[i][j] = true;
            if (i == 2 || i == 7 || j == 2 || j == 7) if (a[i][j] == 'X' && !st[i][j]) res += 3, st[i][j] = true;
            if (i == 3 || i == 6 || j == 3 || j == 6) if (a[i][j] == 'X' && !st[i][j]) res += 4, st[i][j] = true;
            if (i == 4 || i == 5 || j == 4 || j == 5) if (a[i][j] == 'X' && !st[i][j]) res += 5, st[i][j] = true;
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

### 【模拟】修改数列

https://www.acwing.com/problem/content/5465/

> 题意：给定一个序列，现在可以对序列中的每一个数进行加一或减一操作，问如何操作可以使得序列变为等差数列且操作数尽可能少
>
> 思路：**从边界考虑**。一个等差数列可以通过数列的前两项完全确定所有信息，故我们直接分类讨论前两项的所有情况来涵盖所有的情况。前两项的组合显然一共 $3*3=9$ 种，对于每一种情况，我们枚举剩余元素与标准值进行比对即可得到操作数
>
> 时间复杂度：$O(3\times 3 \times n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 100010;

int n;
int a[N];

void solve() {
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> a[i];
    
    if (n <= 2) {
        cout << 0 << "\n";
        return;
    }
    
    int res = N; 
    
    for (int i = -1; i <= 1; i++) {
        int x = a[1] + i;     // 第一项
        for (int j = -1; j <= 1; j++) {
            int y = a[2] + j; // 第二项
            
            int det = y - x; // 公差 
            int cnt = 0;     // 需要改变的数 
            bool ok = true;  // 序列是否可以凑成等差数列 
            
            for (int k = 3; k <= n; k++) {
                int _ak = x + (k - 1) * det; // 当前理论值 
                
                if (abs(_ak - a[k]) > 1) {
                    ok = false;
                    break;
                } 
                else if (abs(_ak - a[k])) {
                    cnt++;
                }
            }
            
            if (i) cnt++;
            if (j) cnt++; 
            
            if (ok) res = min(res, cnt);
        }
    }
    
    if (res == N) cout << -1 << "\n";
    else cout << res << "\n";
}

signed main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
//    cin >> T;
    while (T--) solve();
    return 0;
}
```