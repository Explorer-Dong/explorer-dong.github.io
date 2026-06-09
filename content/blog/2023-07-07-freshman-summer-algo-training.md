---
title: "大一暑假算法集训日志"
date: 2023-07-07
tags:
  - 算法
  - 集训
summary: "本文从 CSDN 迁移而来，权当留个纪念，题肯定不会再补了，哈哈哈。 这是我在学校留校的第一个暑假，时间戳为大一结束的暑假。为时两周，进行算法集训（~~摸鱼~~）后续会不断进行补题（~~也许吧~~）"
index_img: https://cdn.dwj601.cn/images/20251002155159920.png
---

![封面图](https://cdn.dwj601.cn/images/20251002155159920.png)

本文从 CSDN 迁移而来，权当留个纪念，题肯定不会再补了，哈哈哈。

## 前言

这是我在学校留校的第一个暑假，时间戳为大一结束的暑假。为时两周，进行算法集训（~~摸鱼~~）后续会不断进行补题（~~也许吧~~）

符号说明：标明 * 的内容表示为知识补充，标明 TODO 的内容表示还未完成

## day01

[比赛传送门](https://vijos.org/d/nnu_contest/contest/64a17b051365a1559cfa9632)

### T1【模拟】

[原题链接](https://vijos.org/d/nnu_contest/p/1419)

大致题意是：打印某种有规律的图形

**我的思路**

- 观察样例，按照要求进行模拟即可

- 时间复杂度 $O(n)$

**AC 代码**

```cpp
void solve()
{
    int n;
    cin >> n;

    for (int i = 0; i < 3 * n; i++)
    {
        for (int j = 0; j < n; j++) cout << "*";
        for (int j = 0; j < 2 * n; j++) cout << ".";
        for (int j = 0; j < n; j++) cout << "*";
        cout << "\n";
    }

    for (int i = 1; i <= n; i++)
    {
        for (int j = 0; j < i; j ++) cout << ".";
        for (int j = 0; j < n; j ++) cout << "*";
        for (int j = 0; j < 2 * n - 2 * i; j ++) cout << ".";
        for (int j = 0; j < n; j ++) cout << "*";
        for (int j = 0; j < i; j ++) cout << ".";
        cout << "\n";
    }
}
```

### T2【模拟】

[原题链接](https://vijos.org/d/nnu_contest/p/1424)

大致题意是：给定一个队列，如果是猫就喂食，如果是狗，也喂食，但是猫粮会增加一定的数量，问能否让队列中的所有狗都吃到狗粮

**我的思路**

- 遍历字符串：若是猫，检查是否还有猫粮，如果没有，结束遍历；如果还有，猫粮-1。若是狗，检查是否还有狗粮，如果没有，结束遍历；如果还有，狗粮-1, 同时猫粮+m。
- 最后从上述遍历结束的指针继续往后检查是否还存在没有吃到狗粮的狗即可。
- 时间复杂度 $O(n)$

**AC 代码**

```cpp
#include <iostream>

using namespace std;

void solve(int num)
{
    cout << "Case #" << num << ": ";

    int n, d, c, m;
    cin >> n >> d >> c >> m;

    string s;
    cin >> s;

    int i;
    for (i = 0; i < n; i++)
        if (s[i] == 'C')
        {
            if (!c) break;
            --c;
        }
        else
        {
            if (!d) break;
            --d;
            c += m;
        }

    bool ok = true;
    for (int j = i; j < n; j++)
        if (s[j] == 'D')
        {
            ok = false;
            break;
        }

    if (ok) cout << "YES" << "\n";
    else cout << "NO" << "\n";
}

int main()
{
    ios::sync_with_stdio(false), cin.tie(0), cout.tie(0);
    int T; T = 1;
    cin >> T;
//    while(T--) solve();

    for (int i = 1; i <= T; i ++) solve(i);

    return 0;
}
```

### T3【模拟】

[原题链接](https://vijos.org/d/nnu_contest/p/1423)

大致题意是：给定三个数可执行一种操作，即“选择一个数，将他以另一个比他大的数为中点进行跳跃获得一个新数”，则经过多少次跳跃，可以获得最大的一个数使其超过某个给定的数

**我的思路**

- 按照要求进行迭代计算即可。按照贪心的策略，每次将最左边的一个数以最右边的一个数为中点进行跳跃，然后判断最右边的数是否达到了 n 即可

- 时间复杂度 $O(log\ n)$：精准计算过程个人不太会，于是我就按照最笨的方法计算最高的时间复杂度。即，假设 $a=2,b=3,c=4$，进行迭代，迭代后的数组为：

    **2  3  4  6  9  14  22  35  56**

    不难发现，这个数列的后一项与前一项的差构成了一个斐波那契数列。我们可以近似的将这一串数字看做斐波那契额数列的前缀和。由于斐波那契额数列的增长是指数级别的，那么其前缀和自然也是指数级别的。因此想要让前缀和达到 n 的时间复杂度就是对数级别的，即 $O(log\ n)$，证毕。

**AC 代码**

```cpp
void solve()
{
    int l, m, r, n;
    cin >> l >> m >> r >> n;

    int res = 0;

    while (r < n)
    {
        res++;
        int t = l;

        l = m;
        m = r;
        r = 2 * r - t;
    }

    cout << res << "\n";
}
```

### T4【哈希、组合数学】

[原题链接](https://vijos.org/d/nnu_contest/p/1420)

大致题意是：给了一个数组，每一个数字被赋予了红或蓝的颜色，问这个数组中有多少个数字相同，颜色不同的数字对。

**我的思路**

- 一开始 WA 了两发；

  一发是因为纯暴力，想看过了几个测试点，结果就过了一个 hhh；暴力很好写，就是枚举数字，然后查找相同数字，如果颜色不同计数器+1 即可，不再赘述。

  还有一发是思考角度有问题，我从数字出发，想要统计每种数字中颜色的分布关系。但其实很难实现，也就没能成功。

- 最后 AC 思路是，统计两种颜色中数字的组成情况，与上述第二个思路相反。即：每个颜色统计数字的分布情况，最后对照两个颜色数组中数字的组成情况，按照组合数学的计算公式计算即可。

- 时间复杂度：$O(n\log{n})$

**AC 代码**

```cpp
void solve()
{
    int n; cin >> n;

    vector<int> a(n);
    for (int i = 0; i < n; i ++) cin >> a[i];

    string s; cin >> s;

    vector<int> r, b;

    for (int i = 0; i < n; i++)
        if (s[i] == 'R') r.emplace_back(a[i]);
        else b.emplace_back(a[i]);

    sort(r.begin(), r.end());
    sort(b.begin(), b.end());

    ll res = 0;

    for (int i = 0, j = 0; i < r.size() && j < b.size(); )
        if (r[i] < b[j]) i++;
        else if (r[i] > b[j]) j++;
        else
        {
            int flag = r[i];
            int x = 0, y = 0;
            while (r[i] == flag) x++, i++;
            while (b[j] == flag) y++, j++;
            res += x * y;
        }

    cout << res << "\n";
}
```

### T5【贪心、双指针】

[原题链接](https://vijos.org/d/nnu_contest/p/1421)

大致题意是：给定字符串 s，问经过最少多少步，可以将其转化为 0、1 数量不变，但是是 01 相间的字符串

**我的思路**

- 这道题比赛的时候没做出来，qaq。也想到了和原串对比，也想到了下标作差，但是唯独没想到正确的贪心思路。

- 即最小交换次数就是将每一个 0 或 1 按照排列的顺序依次从左往右移到模板串中正确的位置上即可。

- 代码实现使用双指针。一个指针是在模板串上，寻找 0 或 1 的位置；一个指针是在给定的串上寻找模板串开头的数字的下标，比如如果给的串 0 比 1 多，则在给定串上寻找每一个 0 的位置进行计算累加即可，而如果 1 比 0 多，则在给定串上寻找每一个 1 的位置进行计算累加即可。而对于 0 和 1 的数量相同的情况，取上述两种计算结果的最小值即可。

- 需要注意的是这道题要开 long long，原题测试是需要开的，计算最大结果的方式如下：假设是最坏的情况，即给点串全部都是左边的一般半 0 和右边的一半 1 组成，那么第一个 1 移第一个位置需要 $\frac{n}{2}$，第二个 1 移到第二个位置需要 $\frac{n}{2}-1$，以此类推，最后一个 1 移到最后一个位置需要 1，共有 $\frac{n}{2}$ 次移动，那么这 $\frac{n}{2}$ 次移动步数之和就是 $n^2$ 级别的，因此需要开 long long

- 时间复杂度 $O(n)$

**AC 代码**

```cpp
typedef long long ll;

ll calc(string& s, char c)
{
    // i是标准01串的下标，j是给定串的下标
    ll cnt = 0;
    for (int i = 0, j = 0; i < s.size(); i += 2, j++)
    {
        while (s[j] != c) ++j;
        cnt += abs(i - j);
    }
    return cnt;
}

void solve()
{
    string s; cin >> s;

    int cnt0 = count(s.begin(), s.end(), '0');
    int cnt1 = count(s.begin(), s.end(), '1');

    ll res = 0;

    if (cnt1 > cnt0)
        res = calc(s, '1');
    else if (cnt1 < cnt0)
        res = calc(s, '0');
    else
        res = min(calc(s, '1'), calc(s, '0'));

    cout << res << "\n";
}
```

### T6【01 背包】TODO

[原题链接](https://vijos.org/d/nnu_contest/p/1422)

大致题意是：给定一个只由 $0-9$ 组成的字符串，在其中选出一些字符，使得这些数组成的新数是 9 的倍数，问共有多少种选法

**我的思路**

- 这题比赛的时候都没怎么看，因为来不及看了 qwq，显然是动态规划问题。然后此题是动规中 01 背包问题的变式。

- ~~当然，对于 01 背包问题，可以使用指数级别的枚举，时间复杂度是 $O(2^n)$~~


**AC 代码**

```cpp

```

> [题解文件 - zh](https://explorer-dong.lanzoum.com/iV4Hu11l7gzc)

## day02

讲题、补题，

### T1【最长公共子序列】*

这是曾经做过的一道题，但是今天上台讲解的时候连题目都说不明白:cry:，特此补一下题解加深记忆。

[原题链接](https://codeforces.com/gym/420341/problem/C)

大致题意：给定 $s$ 串与 $t$ 串，可以对 $t$ 串进行以下操作：选中 $t$ 串的一个字符，将其移动到 $t$ 串的其他位置。问：最少可以进行多少次操作可以将 $t$ 串转化为 $s$ 串，如果不可以输出 $-1$

**我的思路**

- 首先需要注意的是 t 串一定要包含 s 串的所有字符及其相应的个数，只能多不能少。

  其次就是算法设计的问题了：假设 s 串的固定长度为 len，那么 t 串的最少移动次数就是 `len-s与t已经匹配的最长公共子序列`。

  于是这道题的核心思路就是计算 s 与 t 串的最长公共子序列。

- 时间复杂度 $O(nm)$，其中 n 为给定串的长度，即 18；m 为每一个测试点给的长度，总长不超过 $5\times10^5$，大约是 $10^7$ 级别，完全 OK。

**AC 代码**

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

bool ok(string& s, string& t)
{
    for (int i = 0; i < s.size(); i++)
        if (count(t.begin(), t.end(), s[i]) < count(s.begin(), s.end(), s[i]))
            return false;
    return true;
}

void solve()
{
    string s = "crazythursdayvme50";

    string t;
    cin >> t;

    if (!ok(s, t))
    {
        cout << -1 << "\n";
        return;
    }

    // 便于使用最长公共子序列的模板
    s = '0' + s;
    t = '0' + t;

    // f[i][j]表示s串的[1->i]个字符与t串的前[1->j]个字符的最长公共子序列
    vector<vector<int>> f(20, vector<int>(t.size() + 10));

    for (int i = 1; i <= 18; i++)
        for (int j = 1; j <= t.size(); j++)
            if (s[i] == t[j])
                f[i][j] = f[i - 1][j - 1] + 1;
            else
                f[i][j] = max(f[i - 1][j], f[i][j - 1]);

    cout << 18 - f[18][t.size() - 1] << "\n";
}

int main()
{
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);

    int T; cin >> T;
    while (T--) solve();
    return 0;
}
```

## day03

[比赛传送门](https://codeforces.com/gym/451807)

### T1【模拟】

[原题链接](https://codeforces.com/gym/451807/problem/A)

题意大致是：给两个长度相同的字符串，问其中不同的字符数

**我的思路**

- 扫一遍计数即可

**AC 代码**

```cpp
void solve()
{
    string s = "codeforces";
    string t; cin >> t;
 
    int res = 0;
 
    for (int i = 0; i < s.size(); i++)
        if (s[i] != t[i])
            res ++;
 
    cout << res << "\n";
}
```

### T2【模拟】

[原题链接](https://codeforces.com/gym/451807/problem/B)

题意大致是：给定两个字符串 s 和 t，其中只有三种字符，其中两种字符是等价的，问这两个字符是否相等（等价字符算作相同字符）

**我的思路**

- 将两种等价的字符转化为同一个字符，最后使用 string 的比较运算符即可

**AC 代码**

```cpp
void solve()
{
    int n; cin >> n;
    string s, t;
    cin >> s >> t;
 
    for (int i = 0; i < n; i++)
        if (s[i] == 'G')
            s[i] = 'B';
 
    for (int i = 0; i < n; i++)
        if (t[i] == 'G')
            t[i] = 'B';
 
    if (s == t) cout << "YES" << "\n";
    else cout << "NO" << "\n";
}
```

### T3【模拟】

[原题链接](https://codeforces.com/gym/451807/problem/C)

题意大致是：给定字符串 s，将其中的每个字符 s [i] 做一下变化：

- 在当前字符 s [i] 后面添加一个字符串，也可能不添加
- 再添加一个 s [i] 在后面

给了这个变化后的字符串，让你找到原始的那个字符串

**我的思路**

- 其实就是找到相同的两个字符，然后保留一个添加到答案串即可

**AC 代码**

```cpp
void solve()
{
    int n; cin >> n;
    string s; cin >> s;
 
    char ch = s[0];
 
    string res;
    res += ch;
 
    for (int i = 1; i < n;)
    {
        // 寻找到与ch相同的字符
        while (s[i] != ch) i++;
        // 再往后一位重新寻找ch
        i++;
        // 在没有越界的情况下
        if (i < n)
        {
            // 添加当前字符到答案串
            res += s[i];
            // 重新定义ch
            ch = s[i];
            // 指针右移寻找后面与ch相同的字符
            i++;
        }
    }
 
    cout << res << "\n";
}
```

### T4【数学】

[原题链接](https://codeforces.com/gym/451807/problem/D)

大致题意为：在二维方格图中给定了三个点，问从其中一个点到另外两个点在走最短路（其实就是曼哈顿距离）的情况下，最多能一起走多远

**我的思路**

- 思路其实非常简单，由于 x 轴与 y 轴是相互独立的，因此我们可以将二维图形转化为一维，即分别判断 x 轴与 y 轴的三个点的相对情况（n 维也是同理）

  如果 A 点在 B、C 一侧，即与 B or C 的最近距离

  如果在 B、C 之间，则为 0

**AC 代码**

```cpp
void solve()
{
    int xa, ya; cin >> xa >> ya;
    int xb, yb; cin >> xb >> yb;
    int xc, yc; cin >> xc >> yc;

    int res = 1;

    if ((xa <= xb && xa <= xc) || (xa >= xb && xa >= xc))
        res += min(abs(xa - xb), abs(xa - xc));

    if ((ya <= yb && ya <= yc) || (ya >= yb && ya >= yc))
        res += min(abs(ya - yb), abs(ya - yc));

    cout << res << "\n";
}
```

### T5【bfs | dfs】

[原题链接](https://codeforces.com/gym/451807/problem/E)

- 大致题意是：给定一个数 num 和一个目标值 target，要求对 num 进行以下操作：如果 num 可以被 3 整除，那么就将 num 转化为 $2 \times \frac{num}{3}$ 和 $\frac{num}{3}$ 可以进行任意次上述操作，问能否得到 target。

**我的思路**

> 问的是能否找到即可，那么其实宽搜和深搜都是可以实现的

- 方法一：宽搜

  逻辑很简单，对于每一个数，如果等于 target，那么直接跳出循环即可，如果可以被 3 整除，那么就拆成两个数然后放入队列

- **AC 代码**

    ```cpp
    void solve()
    {
        int num, tar;
        cin >> num >> tar;
    
        queue<int> q;
        q.push(num);
    
        bool ok = false;
    
        while (!q.empty())
        {
            int t = q.front();
            q.pop();
    
            if (t == tar)
            {
                ok = true;
                break;
            }
    
            if (t % 3 == 0)
            {
                q.push(t / 3);
                q.push(2 * t / 3);
            }
        }
    
        cout << (ok ? "Yes" : "No") << "\n";
    }
    ```

- 方法二：深搜

    代码很简单，逻辑的话其实就是画出一棵二叉搜索树，然后加上一些限制条件进行搜索就可以了。~~非常适合我这种搜索小:cow::horse:进行练习与理解~~

- **AC 代码**

    ```cpp
    void dfs(int num, int tar, bool& ok)
    {
        if (num == tar)
        {
            ok = true;
            return;
        }
    
        if (num % 3 == 0)
        {
            dfs(num / 3, tar, ok);
            dfs(2 * num / 3, tar, ok);
        }
    }
    
    void solve()
    {
        int num, tar;
        cin >> num >> tar;
    
        bool ok = false;
    
        dfs(num, tar, ok);
    
        cout << (ok ? "Yes" : "No") << "\n";
    }
    ```

> - 这道题在 cf 里面分数评定才为 1000（还是我太菜了）。
> - 在用两种方法写完了这道题后，我想出了一个改编的思路：
>     - 比如加强数据使得只能用 bfs，时间复杂度的计算也很简单，对于 bfs 的时间复杂度就是结点数；
>     - 强化数据后可能会涉及 long long；
>     - 当然问题也要随之改变，即求 num 到 target 的最短距离（但是发现貌似 num 到 target 的长度的都是相等的），于是我就想着换一下拆分数的规则，比如如果是 4 的倍数就拆成 1 : 3 的数据，对于 3 和 4 的公倍数，就还是按照 3 的倍数进行拆分，那么最终答案就是 `dist[num][target]`
> - 可能会在下一次出题的时候完善出来吧 hhh。感觉对于 dfs 这种深搜问题，先画出搜索树，再进行编码比较容易理解与掌握

### T6【dp】TODO

[原题链接](https://codeforces.com/gym/451807/problem/F)

### T7【数学】TODO

[原题链接](https://codeforces.com/gym/451807/problem/G)

### T8【list】*

主要是介绍一下 C++标准库中 `list` 的 `reverse_iterator` 迭代器用法，即++操作就是让迭代器从右往左移动

```cpp
void solve()
{
    list<int> L;

    int a[] = {3, 1, 5, 1, 8, 4}, n = 6;
    for (int i = 0; i < n; i++)
        L.push_back(a[i]);

    list<int>::reverse_iterator it = L.rbegin();

    for (int i = 0; i < n; i++)
        cout << *(it++) << ' ';
}
```

输出为

```cpp
4 8 1 5 1 3
```

### T9【二进制枚举 | dfs+剪枝】*

大致题意就是从 n 个数中选 k 个数使得这 k 个数之和为质数，问共有多少种选法

方法有两种

- 一种是二进制枚举，时间复杂度是满的 $O(n\ 2^n\sqrt {\max a[i]})$，如下

    ```cpp
    #include <iostream>
    #include <vector>
    
    using namespace std;
    
    // 判断质数的函数
    bool is_prime(int x)
    {
        if (x <= 1) return false;
        for (int i = 2; i <= x / i; i++)
            if (x % i == 0)
                return false;
        return true;
    }
    
    int main()
    {
        // 读取数据
        int n, k;
        cin >> n >> k;
    
        // 读取数据
        vector<int> a(n);
        for (int i = 0; i < n; i++)
            cin >> a[i];
    
        // 定义答案
        int res = 0;
    
        // 二进制枚举
        for (int i = 0; i < (1 << n); i++)
        {
            // 统计是否选择了k个数
            int cnt = 0;
            vector<int> v(25);
            for (int j = 0; j < n; j++)
                if (i & (1 << j))
                    v[cnt++] = a[j];
    
            // 如果不是k个数就继续枚举
            if (cnt != k) continue;
    
            // 如果是k个数就计算和是否为质数
            int sum = 0;
            for (int j = 0; j < k; j++)
                sum += v[j];
            if (is_prime(sum)) res++;
        }
    
        // 输出答案
        cout << res << "\n";
    
        return 0;
    }
    ```

- 另一种思路是搜索，加剪枝，虽然也是指数级别的算法，但是加上剪枝就会比上面的满 $O(2^n)$ 好，如下

    ```cpp
    #include <iostream>
    #include <vector>
    
    using namespace std;
    
    // 判断质数的函数
    bool is_prime(int x)
    {
        if (x <= 1) return false;
        for (int i = 2; i <= x / i; i++)
            if (x % i == 0)
                return false;
        return true;
    }
    
    // 返回：选了m个数，起始枚举的数组下标为idx的情况下，这m个数之和sum为质数的方案数
    int dfs(int m, int sum, int idx, int n, int k, vector<int>& a)
    {
        int res = 0;
    
        if (m == k && is_prime(sum))
        {
            res++;
            return 1;
        }
        
        // 剪枝
        if (m + n - idx < k)
            return 0;
    
        for (int i = idx; i < n; i++)
            res += dfs(m + 1, sum + a[i], i + 1, n, k, a);
    
        return res;
    }
    
    int main()
    {
    
        // 读取数据
        int n, k;
        cin >> n >> k;
    
        // 读取数据
        vector<int> a(n);
        for (int i = 0; i < n; i++)
            cin >> a[i];
    
        cout << dfs(0, 0, 0, n, k, a) << "\n";
    
        return 0;
    }
    ```

## day04 & day05

[比赛传送门](https://vijos.org/d/nnu_contest/contest/64a5655c1365a155a1fa97b5)

### T1【模拟】

[原题链接](https://vijos.org/d/nnu_contest/p/1433)

大致题意是：判断度数列是否可图画

**我的思路**

- 根据每条边可以连接两个点可知一个度数列如果可图画，那么度数列之和一定是偶数
- 时间复杂度 $\mathcal O(n)$

**AC 代码**

```cpp
void solve()
{
    int n; cin >> n;
    ll sum = 0;
    for (int i = 0; i < n; i ++)
    {
        ll x; cin >> x;
        sum += x;
    }
    cout << ((sum % 2) ? "No" : "Yes") << "\n";
}
```

### T2【并查集】


[原题链接](https://vijos.org/d/nnu_contest/p/1434)

大致题意是：告诉你那些药水可以两两进行反应，问如何将药水放置到试剂瓶中可以使得反应次数最多

**我的思路**

- 我们可以根据反应关系构建多叉树（如果重复反应，可以通过路径压缩处理掉），然后由贪心思想，从根开始放置药水即可获得最多反应次数
- 需要注意的一点是，构建出来的多叉树可能不止一棵，因此最终的反应次数就是所有多叉树的结点数减去树的数量
- 时间复杂度 $\mathcal O(n)$

**AC 代码**

```cpp
int n, m;
int fa[55], sum[55];

ll qmi(ll a, ll b) 
{ 
    ll res = 1; 
    while (b) 
    { 
        if (b & 1) res = res * a; 
        a = a * a; 
        b >>= 1; 
    } 
    return res; 
}

int find(int x)
{
    if(fa[x] != x) fa[x] = find(fa[x]);
    return fa[x];
}

void merge(int x, int y)
{
    int fx = find(x), fy = find(y);
    if(fx != fy)
    {
        sum[fy] += sum[fx];
        fa[fx] = fy;
    }
}

void solve()
{
    cin >> n >> m;

    for (int i = 1; i <= n; i++)
    {
        fa[i] = i;
        sum[i] = 1;
    }

    while (m--)
    {
        int x, y;
        cin >> x >> y;
        merge(x, y);
    }

    unordered_map<int, bool> ha;
    for (int i = 1; i <= n; i++)
    {
        int father = find(i);
        ha[father] = true;
    }

    int cnt = 0, hi = 0;
    for (auto x : ha)
        cnt++, hi += sum[x.first];

    hi -= cnt;

    cout << qmi(2, hi) << "\n";
}
```

### T3【分治】TODO

[原题链接](https://vijos.org/d/nnu_contest/p/1435)

大致题意是：求一个数列的逆序对的数量

**我的思路**

- 这道题很明显的就是利用归并排序计算出一个数列中逆序对的数量，但其实我对这个 `merge_sort` 函数的内容并不能完全理解，特此留一个坑
- 时间复杂度 $\mathcal O(n \log{n})$

**AC 代码**

```cpp
const int N = 1e5 + 10;

int n;
vector<ll> q(N), tmp(N);
ll res;

ll merge_sort(int l, int r)
{
    if (l >= r) return 0;

    ll mid = (l + r) >> 1;
    merge_sort(l, mid), merge_sort(mid + 1, r);

    int k = 0, i = l, j = mid + 1;
    while (i <= mid && j <= r)
        if (q[i] <= q[j])
            tmp[k++] = q[i++];
        else
        {
            tmp[k++] = q[j++];
            res += mid - i + 1;
        }

    while (i <= mid) tmp[k++] = q[i++];
    while (j <= r) tmp[k++] = q[j++];

    for (i = l, j = 0; i <= r; i++, j++)
        q[i] = tmp[j];

    return res;
}

void solve()
{
    cin >> n;

    for (int i = 0; i < n; i++)
        cin >> q[i];

    res = merge_sort(0, n - 1);

    if (res < 6)
    {
        cout << "YES" << "\n";
        return;
    }
    else
        cout << "NO" << ' ' << res << "\n";
}
```


### T4【背包】TODO

[原题链接](https://vijos.org/d/nnu_contest/p/1436)

### T5【数论】

[原题链接](https://vijos.org/d/nnu_contest/p/1437)

大致题意是：有 1\~n 共 n 个数，问：如何从 1\~n 选 k 个数，使得这 k 个数的最大公约数的尽可能的最大（对于一个人，最大公约数就是这个人本身的数）

**我的思路**

- 这道题说不上来的感觉，我觉得答案非常的明显，就是 $\left \lfloor \frac{n}{k} \right \rfloor \quad$
- 时间复杂度 $\mathcal O(1)$

**AC 代码**

```cpp
void solve()
{
    int n, k;
    cin >> n >> k;
    cout << (n - n % k) / k << "\n";
}
```

### T6【dp】TODO

[原题链接](https://vijos.org/d/nnu_contest/p/1438)



### T7【二分】

[原题链接](https://vijos.org/d/nnu_contest/p/1439)

大致题意是：给定路径总长，路上原有的障碍物的数量和位置，给你 n 次放置障碍物的操作，使得最终路径上的任意两个障碍物之间的最大距离最小，求出最小的最大距离

**我的思路**

~~其实这道题我用优先队列维护任意两个障碍物之间的距离，然后每次将最大的距离一分为二，最终输出这个优先队列的队头，但是答案很不幸。。。留坑。。。~~

改编自洛谷，改编后的代码更加符合逻辑，没有坑点，一道很好的二分答案

我们知道，一定可以找到最终的最大距离，一个额外的障碍物都不放，那么答案就是当前局面中所有间隔中的最大值。如果想要减小这个最大值，很显然就需放置额外的障碍物。可以发现 **放置的障碍物越多，最大距离就越小，具有单调性，可以进行二分**。我们通过二分最大距离，通过判断当前最大距离需要花费的障碍物数量来检查当前的最大距离是否可行，最终使用 **二分左模板** 获得最小的最大距离即可。计算所需的障碍物数量的计算公式为

$$
\left \lceil \frac{a [i]-a [i-1]}{dist_{max}}\right \rceil - 1
$$

时间复杂度 $O(n \log{n})$

**AC 代码**

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
//    cin >> T;
    while (T--) solve();    
    return 0;
}
```

## day06

> 记录人生中的首次 AK！！！
>
> - 虽然是小小的一次为时 2h 的小比赛
> - 虽然最高难度只是 cf 的 Div3 的 C 题
> - 但是身为算法小:cow::horse:的我还是很开心的 hhh

### T1【模拟】

[原题链接](https://vijos.org/d/nnu_contest/p/1461)

大致题意是：给定一个公式，计算结果

**我的思路**

- 按需模拟即可
- 注意 C++中的浮点数保留小数的操作
- 时间复杂度 $\mathcal O(1)$

**AC 代码**

```cpp
void solve()
{
    double M, m, v;
    cin >> M >> m >> v;

    cout << fixed << setprecision(2) << (m * v / (M - m)) << "\n";
}
```

### T2【数学】

[原题链接](https://vijos.org/d/nnu_contest/p/1458)

大致题意是：给定一个数 n，可以进行以下两种操作

- 选择一个大于 1 的正整数 x，将 n 转化为 n%x
- 选择一个大于 0 的正整数 x，将 n 减去 x

代价是所有的 x 之和，然后求让 n 变为 0 的最小代价

**我的思路**

- 根据给的数据范围就知道一定是找规律推公式
    - 如果是偶数，直接%2 就可以了
    - 如果是奇数，先%2 再-1 即可
    - 特判 0 和 1 即可

- 时间复杂度 $\mathcal O(1)$

**AC 代码**

```cpp
void solve()
{
    ll n;
    cin >> n;

    int res = 0;

    if (n == 0)
        res = 0;
    else if (n == 1)
        res = 1;
    else if (n % 2 == 0)
        res = 2;
    else
        res = 3;

    cout << res << "\n";
}
```

### T3【双指针 & 组合数学】

[原题链接](https://vijos.org/d/nnu_contest/p/1456)

大致题意是：给定一个由小写字母和?组成的字符串，可以将?转化为任意小写字母，问使得字符串转化为回文串一共有多少种方案

**我的思路**

- 其实就是判断字符串首尾的字符情况，分奇数与偶数讨论，但其实最终落实到代码上奇数与偶数的是一样的

    - 首尾相同且均不是?，那么就是这种情况，方案数不变
    - 首尾相同且均是?，那么这种情况就有 26 种方案数，因为 a~z 均可
    - 首尾不同，其中一个是 a~z，另一个是?，那么这个?，就只能是前面的这个字符，因此方案数不变

    对于奇数位只需要讨论最中间的那个字符

    - 如果是小写字母，那么方案数不变
    - 如果是?，则方案数有 26 种

    最后一种特判就是如果两个都是字符但是不相同，那么就不可能构成回文串，那么答案就是 0

    然后统计 26 方案的数量 hi，最后根据组合数学的思路，答案就是 $26^{hi}$

- 时间复杂度 $\mathcal O(n)$

**AC 代码**

```cpp
void solve()
{
    string s; cin >> s;

    int i = 0, j = s.size() - 1;

    ll hi = 0;
    bool ok = true;

    while (i <= j)
    {
        if (s[i] == '?' && s[j] == '?')
            hi++;
        if (s[i] != '?' && s[j] != '?' && s[i] != s[j])
        {
            ok = false;
            break;
        }
        i++, j--;
    }

    if (ok)
        cout << qmi(26, hi, MOD) << "\n";
    else
        cout << 0 << "\n";
}
```

### T4【图 | 思维题】

[原题链接](https://vijos.org/d/nnu_contest/p/1457)

定义基环树为：一个 n 个点，n 条边，没有自环和重边的无向连通图

定义一个图的直径为：任意两点最短路的最大值

那么由 n 个结点构成的基环树中的最小直径是多少

**我的思路**

- 看似很离谱的问题，因为数据很大，建图是不太可能的，那么就可以仔细理解直径同时画图进行实操 hhh

    为了让直径尽可能的小，那么我们画出的图中每个点之间的距离就一定要尽可能的近，于是我们想到画一个星射状的图，此时点数为 n，边数为 n-1，还差一条边就选任意两个还没有连起来的点连起来即可

    最终得到的结论就是：只要是 $n \ge 4$，则答案一定是 2，如果 $n=3$，则答案是 1

- 时间复杂度 $\mathcal O(1)$

**AC 代码**

```cpp
void solve()
{
    int n; cin >> n;
    if (n == 3)
    {
        cout << 1 << "\n";
        return;
    }
    cout << 2 << "\n";
}
```

### T5【贪心 & 排序】

[原题链接](https://vijos.org/d/nnu_contest/p/1459)

大致题意是：给了 n 个数，定义攻击力为这个数列中后一个数与前一个数的差值的绝对值的总和。在不改变排列顺序的前提下，需要将这 n 个数分成 k 个组，这 k 个组的攻击力计算方式与上述一致，问如何划分组别使得最终的攻击力 **最小**

**我的思路**

- 毕竟是 cf 的 Div2 的 A 题，是吧，那就没什么好多说的了，其实就是对于 n 个数，那么就一共有 n-1 个间隔数 $num[i]$，而如果划分成 k 个组，其实就是减掉前面 n-1 个间隔中的 k-1 个间隔，而为了让这最终的攻击力最小，即求：

    $$
    \min\{\sum_{i = 1}^{(n-1)-(k-1)}num [i]\}
    $$

    即：

    $$
    \min\{\sum_{i = 1}^{n-k}num [i]\}
    $$

    于是想到将 num 数组进行排序，最终得到的最小攻击力就是 num 数组的前 n-k 个数之和

- 时间复杂度 $\mathcal O(n\log{n})$

**AC 代码**

```cpp
void solve()
{
    int n, k;
    cin >> n >> k;

    vector<int> a(n);
    for (int i = 0; i < n; i++)
        cin >> a[i];

    // 计算num[i]
    vector<int> num;
    for (int i = 1; i < n; i++)
        num.emplace_back(abs(a[i] - a[i - 1]));

    sort(num.begin(), num.end());

    int res = 0;
    for (int i = 0; i < n - k; i++)
        res += num[i];

    cout << res << "\n";
}
```

### T6【贪心】

[原题链接](https://vijos.org/d/nnu_contest/p/1460)

- 题目背景还是 ICPC 的比赛规则
- cf 的 Div3 的 C 题，就没什么好说的了吧:dog:，但还是:frog:了三发 nnd
- 还是给你一个比赛成绩，即 AC 的题目数与总罚时，问你某个人最终的排名。已知总题目数 m，共 n 个人的做 m 题需要的时间以及比赛的总时间 h
- 唯一的区别是 **现在每个参赛队员都知道自己某道题做出来需要的时间，大家都是按照最优的做题顺序来做题**

**我的思路**

- 很显然的按照罚时的从小到大的顺序来做题 ~~排序不等式~~
- 然后就是纯模拟即可

**AC 代码**

```cpp
// 某人的AC数与总罚时的计算函数
pair<int, int> calc(vector<int>& a, int m, int h)
{
    // cnt为AC数，t为总罚时
    int cnt = 0, t = 0;

    // 贪心策略，按照罚时的升序来做题
    sort(a.begin(), a.end());

    // 每道题的罚时是：开始做这道题时比赛已经经过的时间s[i - 1] + 完成此题需要的时间a[i]，因此需要计算前缀和
    // 那么s[i]就表示完成第i题后的时间戳，显然这个s[i]是升序的
    vector<int> s;
    s.push_back(a[0]);
    for (int i = 1; i < m; i++)
        s.push_back(a[i] + s[i - 1]);

    // 枚举每一个时间戳
    for (int i = 0; i < m; i++)
    {
        // 如果AC掉这道题比赛时间还没结束，那么这道题就可以被AC掉并且总罚时加上这道题的罚时s[i]
        if (h >= s[i])
        {
            cnt++;
            t += s[i];
        }
        else break;
    }

    return make_pair(cnt, t);
}

// 第一关键词是AC的题目，第二关键词是总罚时
bool cmp(pair<int, int>& a, pair<int, int>& b)
{
    if (a.first == b.first) return a.second < b.second;
    return a.first > b.first;
}

void solve()
{
    // n个人，m道题，总比赛时间h
    int n, m, h;
    cin >> n >> m >> h;

    // 存每个人的AC数与总罚时
    vector<pair<int, int>> arr;

    // 第一个人的做每道题需要的时间
    vector<int> a(m);
    for (int i = 0; i < m; i++)
        cin >> a[i];

    // 获得第一个人的AC数与总罚时，即题目要求需要找排名的这个人
    pair<int, int> flag = calc(a, m, h);

    arr.push_back(flag);

    // 计算其余选手的AC数与总罚时
    for (int x = 1; x < n; x++)
    {
        vector<int> v(m);
        for (int i = 0; i < m; i++)
            cin >> v[i];
        arr.push_back(calc(v, m, h));
    }

    // 按照ICPC的比赛规则，利用C++中的STL进行排序
    sort(arr.begin(), arr.end(), cmp);

    // 目标角色的下标
    int idx = 0;

    // 寻找这个人的具体下标从而得到排名
    for (int i = 0; i < arr.size(); i++)
        if (arr[i] == flag)
        {
            idx = i + 1;
            break;
        }

    // 输出下标
    cout << idx << "\n";
}
```

## day07

放假日~

## day08

[比赛传送门](https://vijos.org/d/nnu_contest/contest/64aa5d9e1365a155a1fa9c0e)

### T1【最长上升子序列】

[原题链接](https://vijos.org/d/nnu_contest/p/1463)

大致题意是：求最长公共子序列，模板题就没什么好解释的了

**我的思路**

> 抛开本道题的数据量，此题理论上有两种做法

- 法一：朴素动规

- `dp[i]` 表示前 $i$ 个数字中比当前数字小的数字的个数（由于求的是最长上升子序列，因此自身也算一个）

    动规三步骤

    - 确认属性值（最长上升子序列）
    - 划分答案集合（1. 前面的数比自己小 2. 前面的数比自己大）
    - 归纳出状态转移方程，如果是 1. 则 `dp[i] = max(dp[i], dp[j] + 1)`，如果是 2. 则 `dp[i]` 保持不变

    第一层枚举每个数，第二层枚举当前数之前的所有的数。就可以确保不漏答案

- 时间复杂度 $\mathcal O(n^2)$

- **AC 代码**

    ```cpp
    void solve()
    {
        // 读数据
        int n; cin >> n;
    
        // 读数据
        vector<int> a(n + 1);
        for (int i = 1; i <= n; i++)
            cin >> a[i];
    
        // dp[i]表示前i个数字中比自己小的数字的个数
        vector<int> dp(n + 1, 0);
    
        // 初始化dp数组
        dp[1] = 1;
    
        for (int i = 1; i <= n; i++)
        {
            dp[i] = 1;
            for (int j = 1; j < i; j++)
                if (a[j] < a[i])
                    dp[i] = max(dp[i], dp[j] + 1);
        }
    
        int res = 0;
    
        for (int i = 1; i <= n; i++)
            res = max(res, dp[i]);
    
        cout << res << "\n";
    }
    ```

- 法二：二分优化动规（贪心思想）

- 可以发现，我们在每次更新 `dp[i]` 时，需要枚举从 `1` 到 `i-1` 的每个 `dp[j]`，这其中是有很多重复的，于是思考优化

    我们放弃 `dp` 数组，采用 `last` 数组与 len `变量`

    其中 `last[len]` 表示长度为 `len` 的最长上升子序列的最后一个数字

    为了让一个子序列尽可能的长，就需要这个子序列的最后一个数尽可能的小【贪心】

    最后得到的这个 `last` 数组中每个数都是严格单调递增的

    在利用 a 数组中的每个数更新 `last` 数组时，对于每个 `last[i]`，我们想要找一个比 `a[i]` 小的且最大的那个数

    - 可以采用遍历整个 `last` 数组来寻找这个 `target` 数

    - 当然，由于 `last` 中的数有单调性，因此可以采用二分来加速查询

        - 由于每个长度对应的数都是唯一的，因此理论上两个模板都是可行的

        - 模板 1：查左边的那个数

            ```cpp
            int l = 1, r = len;
            while (l < r)
            {
                int mid_len = (l + r) >> 1;
                if (last[mid_len] >= a[i]) r = mid_len;
                else l = mid_len + 1;
            }
            ```

        - 模板 2：查右边的那个数

            ```cpp
            int l = 1, r = len;
            while (l < r)
            {
                int mid_len = (l + r + 1) >> 1;
                if (last[mid_len] >= a[i]) r = mid_len - 1;
                else l = mid_len;
            }
            ```

    二分查到这个数后需要进行特判

    - 如果这个数比当前的 `a[i]` 大或相等，说明整个 `last` 数组中没有比 `a[i]` 严格小的数，那么直接更新这个 `last[r]` 即可（其实这个 `last[r]` 一定是 `last[1]`
    - 如果这个数比当前的 `a[i]` 小，需要特判这个数能否让 `len` 进行扩增
        - 即如果这个数比当前 `last` 数组中最大的那个数（其实就是最后一个数）还要大，那么 `len` 就可以 `+1`
        - 否则更新 `last[r + 1]` 为 `last[r + 1]` 与 `a[r]` 中的最小值

- 时间复杂度 $\mathcal O(n \log{n})$

- **AC 代码**

    ```cpp
    void solve()
    {
        int n; cin >> n;
    
        vector<int> a(n + 1);
        for (int i = 1; i <= n; i++)
            cin >> a[i];
    
        int len = 0;
        vector<int> last(n + 1, 1e9);
    
        last[++len] = a[1];
    
        for (int i = 2; i <= n; i++)
        {
            int l = 1, r = len;
            while (l < r)
            {
                int mid_len = (l + r + 1) >> 1;
                if (last[mid_len] >= a[i]) r = mid_len - 1;
                else l = mid_len;
            }
    
            if (last[r] >= a[i]) last[r] = a[i];
            else
            {
                if (last[r + 1] == 1e9) len++;
                last[r + 1] = min(last[r + 1], a[i]);
            }
        }
        cout << len << "\n";
    }
    ```

### T2【二分】TODO

[原题链接](https://vijos.org/d/nnu_contest/p/1464)

大致题意是：给了 n 种药，每种药接下来的指定天数内每天都要吃一定的量，问在第几天吃的药的量小于一个指定的数值

**我的思路**

- 如果我们将从第一天到最后一天吃的药量进行求和并按照降序排序，可以发现从第一天开始
- 时间复杂度 $\mathcal O()$

**AC 代码**

```cpp
bool check(int m, ll n, ll k, vector<pair<ll, ll>>& a)
{
    ll sum = 0;
    for (int i = 1; i <= n; i++)
        if (a[i].first >= m)
            sum += a[i].second;
        else break;
    return sum <= k;
}

void solve()
{
    ll n, k;
    cin >> n >> k;

    vector<pair<ll, ll>> a(n + 1);
    ll max_day = 0;
    for (int i = 1; i <= n; i++)
    {
        ll day, num;
        cin >> day >> num;
        max_day = max(max_day, day);
        a[i].first = day, a[i].second = num;
    }

    sort(a.begin() + 1, a.begin() + n + 1, [&](pair<ll, ll> x, pair<ll, ll> y) {
        return x.first > y.first;
    });

    int l = 1, r = max_day + 1;
    while (l < r)
    {
        int m = (l + r) >> 1;
        if (check(m, n, k, a)) r = m;
        else l = m + 1;
    }

    cout << r << "\n";
}
```

## day09

[比赛传送门](https://vijos.org/d/nnu_contest/contest/64abfe4b1365a155a1fa9d3c)

没写题解，留坑

## day10

> 今天主要是出题，下面是我出题目的全部内容，具体 [OJ 评测](https://codeforces.com/gym/454024/problem/H) 在 CF 上

### T1【数学 | 排序 | 思维】*

**原题：**

[AcWing 4653. 数位排序](https://www.acwing.com/problem/content/4656/)

**改编思路：**

单纯的数位之和没意思，多给几个选项输出最高排名即可。**需要注意的是对于第二种方法理论上要开 long long，同时第二种方法的时间复杂度无法在 1 秒内通过本题**

有两种重新排位的方法

- 数位之和
- 每一个数位的 2 次方之积

**时空限制**

> 时间 $1s$
>
> 空间 $256MB$

**题面**

- 牛魔王在美好的高中时代情窦初开，从高一就开始暗恋班里的一个安静可爱的女生--小美。高三的一个明朗的午后，阳光正好，他决定表白了:heart::rose::balloon::rose::heart:

    小美很上进，十分在意自己的考试排名，机智的牛魔王看着手里从咩霸那里偷来的两块水晶，想出了一个好方法来进行表白。那就是通过水晶修改世界的排名规则，让女孩的排名强行上升，以此来取悦小美。

    已知两块水晶分别有不同的功效：

- 红色水晶的功效是：按照原始排名的数字的各数位之和进行重排名（当数位之和相等时，数值小的排在前面）

    > 比如 $2023$ 排在 $602$ 前面，因为 $2+0+2+3=7<6+0+2=8$

- 紫色水晶的功效是：按照原始排名数字的 $2$ 的每一个数位次方之积进行重排名（当指数之积相等时，数值小的排在前面）

    > 比如 $99$ 排在 $100$ 后面，因为 $2^9 \times 2^9>2^1 \times2^0 \times2^0$

- 为了提高表白成功的概率，牛魔王需要选择合适的水晶（当然可以不选），来尽可能的让小美的排名升到最高。

    请你帮助每次都考倒数第 $K$ 名的牛魔王进行最佳决策，让小美的排名尽可能的高

**输入**

一行三个整数 $K,N,M$，均用一个空格隔开，分别代表倒数第 $K$ 名，牛魔王的原始排名 $N$，小美的原始排名 $M$（保证数据合法）

**输出**

一个整数，表示修改后小美的最高排名

**数据范围**

对于 $70\%$ 的数据，班级总人数 $\le10^3$

对于 $100\%$ 的数据，班级总人数 $\le10^6$

**样例**

输入

> 1 13 2

输出

> 2

**NOTE**

牛魔王不需要进行任何选择，就能让小美保持住最高排名

**时间复杂度计算：**

> - 本题不难发现第二种方法是一个幌子 ~~虚晃一枪~~，因为次幂之积的指数其实就是数位之和，因此排序后的顺序是一样的
>
>     如果没有发现这个性质直接进行模拟的话可以通过前 $70\%$ 的数据，时间复杂度是 $\mathcal O(10 \times n \log_2{n})$
>
> - 但是！后面的三个数据点应该是过不去了，因为在 $10^6$ 级别下，进行 $sort$ 的时间复杂度理论上是 $n \log_2{n}$，但是由于进行数位拆分以及算指数运算，常数会变得非常大。比如数位拆分均摊下来是 $\mathcal O(3)$，快速幂均摊下来差不多也是 $\mathcal O(3)$，于是 $10^6 \log_2{10^6} \times10$，已经超过 $1$ 秒了
> - 还有一个坑点就是假如纯纯模拟，那么需要开 $long\ long$ ，因为对于 $10^6$ 的数据量，假设有一个数是 $999999$，那么 $(2^9)^6=10^{16}$

**代码实现：**

**TLE 代码**

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;
typedef long long ll;

ll qmi(ll a, ll b)
{
    ll res = 1;
    while (b)
    {
        if (b & 1) res = res * a;
        a = a * a;
        b >>= 1;
    }
    return res;
}

bool rule1(int x, int y)
{
    int t1 = 0, t2 = 0;
    for (int i = x; i; i /= 10) t1 += i % 10;
    for (int i = y; i; i /= 10) t2 += i % 10;
    if (t1 != t2) return t1 < t2;
    else return x < y;
}

bool rule2(int x, int y)
{
    ll t1 = 1, t2 = 1;
    for (int i = x; i; i /= 10) t1 *= qmi(2, i % 10);
    for (int i = y; i; i /= 10) t2 *= qmi(2, i % 10);
    if (t1 != t2) return t1 < t2;
    else return x < y;
}

void solve()
{
    int k, n, m;
    cin >> k >> n >> m;

    // 全班人数
    n = n + k - 1;

    // 每个人的原始排名
    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++)
        a[i] = i;

    // 数位之和规则下的排名
    sort(a.begin() + 1, a.begin() + n + 1, rule1);
    int res1;
    for (int i = 1; i <= n; i++)
        if (a[i] == m)
            res1 = i;

    // 2次幂之积规则下的排名
    sort(a.begin() + 1, a.begin() + n + 1, rule2);
    int res2;
    for (int i = 1; i <= n; i++)
        if (a[i] == m)
            res2 = i;

    cout << min(m, min(res1, res2)) << "\n";
}

int main()
{
    solve();
    return 0;
}
```

**AC 代码**

```cpp
#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

bool rule1(int x, int y)
{
    int t1 = 0, t2 = 0;
    for (int i = x; i; i /= 10) t1 += i % 10;
    for (int i = y; i; i /= 10) t2 += i % 10;
    if (t1 != t2) return t1 < t2;
    else return x < y;
}

void solve()
{
    int k, n, m;
    cin >> k >> n >> m;

    // 全班人数
    n = n + k - 1;

    // 每个人的原始排名
    vector<int> a(n + 1);
    for (int i = 1; i <= n; i++)
        a[i] = i;

    // 数位之和规则下的排名
    sort(a.begin() + 1, a.begin() + n + 1, rule1);
    int res1;
    for (int i = 1; i <= n; i++)
        if (a[i] == m)
            res1 = i;

    cout << min(m, res1) << "\n";
}

int main()
{
    solve();
    return 0;
}
```

## day11 & day12 & day13 & day14

[比赛传送门](https://codeforces.com/gym/454024)

### T1【数学】

[原题链接](https://codeforces.com/gym/454024/problem/A)

大致题意是：给定一个数，经过一定的演算后是否为质数

**我的思路**

- 最终的结果是两个质数之和然后整除 2 向下取整，不难发现最终的这个数除非是 2 和其他的质数，否则其他任何两个非 2 的质数之和一定是偶数，整除 2 以后还是质数，就一定不可能是质数，于是特判一下输入值是否为 2 即可
- 时间复杂度 $\mathcal O(1)$
- **AC 代码**


```cpp
void solve()
{
    ll x;
    cin >> x;
 
    if (x == 1)
        cout << "YES\n";
    else
        cout << "NO\n";
}
```

### T2【数学 & 模拟】

[原题链接](https://codeforces.com/gym/454024/problem/D)

大致题意是：给定一个字符串，问其中至少以三个字符组成的字符子串中有单独存在的字符的种类数

**我的思路**

- 我们可以将单独存在的字符分为三种情况，即在开头；在中间；在结尾

    举个例子比如 HHHHGHHH，那么 G 作为开头，答案共 2 种；作为结尾，答案共三种；作为中间，答案共 6 种

    我们将 G 左边连续的与它不同的字符个数记作 L，右边的记作 R，那么答案就是 $L - 1 + R - 1 + L* R$

    于是我们枚举每一个字符，计算左右两边与他不相同的字符的个数代入上式计算求和即可

- 时间复杂度不太会计算，但是肯定是一次方级别的，姑且认为是 $\mathcal O(n)$

- **AC 代码**


```cpp
void solve()
{
    int n; cin >> n;
    string s; cin >> s;
    s = '0' + s;
    
    ll res = 0;
    
    for (int i = 1; i <= n; i++)
    {
        ll cntl = 0, pl = i - 1;
        while (pl >= 1 && s[pl] != s[i])
            pl--, cntl++;
        ll cntr = 0, pr = i + 1;
        while (pr <= n && s[pr] != s[i])
            pr++, cntr++;
        res += max(0ll, cntl - 1) + max(0ll, cntr - 1) + cntl * cntr;
    }
    
    cout << res << "\n";
}
```


> 感谢观看至此，为时两周的集训就完结撒花啦:rose::rose::rose:

## 补题日志

- 2024.1.15 补充 day04&day05 T7
