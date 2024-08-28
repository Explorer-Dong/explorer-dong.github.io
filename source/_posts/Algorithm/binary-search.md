---
title: binary-search
categories: Algorithm
category_bar: true
---

### 二分

二分本质上是一个线性的算法思维，只是比线性思维更进一步的是，二分思维需要提炼出题面中两个线性相关的变量，即单调变化的两个变量，从而采用二分加速检索。

### 【二分答案】Building an Aquarium

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

### 【二分答案】分组

https://www.lanqiao.cn/problems/5129/learning/

> 题意：给定一个序列，现在需要将这个数列分为k组，如何分组可以使得每一组的极差中，最大值最小
>
> 最开始想到的思路：很容易联想到的一种方法其实就是高中组合数学中学到的“隔板法”，现在有n个数，需要分成k组，则方案数就是在n-1个空档中插入k-1个隔板，即 $C_{n-1}^{k-1}$ 种方案
>
> 时间复杂度 $O(n^2)$
>
> 优化思路：上述思路是正向思维，即对于构思分组情况计算极差。我们不妨逆向思维，即枚举极差的情况，判断此时的分组情况。如果对于当前的极差lim，我们显然可以分成n组，即有一个最大分组值；我们也可以求一个最小分组值cnt，即如果再少分一组那么此时的极差就会超过当前约束的极差值lim。因此对于当前约束的极差值lim，我们可以求一个最小分组值cnt
>
> - 如果当前的最小分组值cnt > k，那么 $\left [ cnt,n \right ]$ 就无法包含k，也就是说当前约束的极差lim不符合条件，lim偏小
>- 如果当前的最小分组值cnt <= k，那么 $\left [ cnt,n \right ]$ 就一定包含k，且当前分组的最小极差一定是 <= 约束的极差值lim，lim偏大
> 
>于是二分极差的思路就跃然纸上了。我们二分极差，然后根据可以分组的最小数量cnt判断二分的结果进行左右约束调整即可。
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

### 【二分答案】木材加工

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
//    cin >> T;
    while (T--) solve();    
    return 0;
}
```

### 【二分答案】跳石头

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
//    cin >> T;
    while (T--) solve();    
    return 0;
}
```

### 【二分答案】路标设置

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
//    cin >> T;
    while (T--) solve();    
    return 0;
}
```

### 【二分答案】数列分段 Section II

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
//    cin >> T;
    while (T--) solve();    
    return 0;
}
```

### 【二分答案】kotori的设备

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
//    cin >> T;
    while (T--) solve();
    return 0;
}
```

### 【二分答案/并查集】关押罪犯 :fire:

https://www.luogu.com.cn/problem/P1525

> 题意：给定一个无向图，没有重边和自环，边权为正。现在需要将图中所有的顶点分为两部分，使得两部分中最大的边权尽可能小，问该最小边权是多少
>
> 思路一：二分答案。
>
> - 思路：本题一眼二分图问题，但是有些变化的是左右部并非散点图，其中是有连边的。如何求出最小边权呢？我们可以这么想，首先答案一定出自左右部的连边中（除非左右部全是散点，那答案就是 0），之所以可以采用二分图将点集分为两部分，是因为我们在某种规则下忽略了其中奇数环（二分图定理）的一些边。当规则定义为 **忽略边权不超过 x** 的边时，该图若可以二分，那么忽略边权比 x 值更大的边时，该图同样一定也可以二分，反之则不一定可以二分（特性图如下）。具备单调性，于是我们可以通过 **二分阈值、检查图是否可二分** 的方法来计算出答案
>
> ![image-20240223011704197](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402230117928.png)
>
> 时间复杂度：$\Theta(\log C_{max} \times (n+e))$
>
> 思路二：并查集。
>
> - 思路：
>
> - 时间复杂度：

二分判定二分图代码：

```cpp
```

并查集代码：

```cpp
```

### 【二分答案】摆放棋子

https://www.acwing.com/problem/content/5562/

> 题意：给定一个 01 序列表示一个 $1\times n$ 的棋子序列，其中 1 表示有棋子，0 表示没有棋子。现在给定 k 个棋子，如何放置可以使得棋盘上连续的棋子长度尽可能长？给出一个合法的最长的序列
>
> 思路：可以发现，想要序列尽可能的长，那么需要放置的棋子就要尽可能的多，具备单调性，可以二分。我们二分答案，即最长序列长度。对于已知的 k 个可放置棋子，我们需要找到最大的序列长度，于是我们套用**寻找右边界**模板。检查方法就是判断对于当前的长度，通过前缀和与滑动窗口的形式计算当前窗口内需要放置多少颗棋子才能连为一体：
>
> - 若需要的棋子数 < k，说明可以继续增大长度
> - 若需要的棋子数 > k，说明当前长度无法满足，要缩小长度
> - 若需要的棋子数 = k，归属在 < k 的类比中即可。
>
> 时间复杂度：$O(n \log n)$

```cpp
#include <iostream>
#include <cstring>
#include <vector>
#include <queue>
#include <stack>
#include <algorithm>
#include <unordered_map>
#include <set>
using namespace std;

const int N = 300010;

int n, k;
int a[N], s[N];

bool chk(int x) {
    for (int i = x; i <= n; i++) {
        if (x - (s[i] - s[i - x]) <= k) {
            return true;
        }
    }
    return false;
}

void solve() {
    cin >> n >> k;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        s[i] = s[i - 1] + a[i];
    }

    int l = 0, r = n;
    while (l < r) {
        int mid = (l + r + 1) >> 1;
        if (chk(mid)) l = mid;
        else r = mid - 1;
    }

    for (int i = r; i <= n; i++) {
        if (r - (s[i] - s[i - r]) <= k) {
            for (int j = i - r + 1; j <= i; j++) {
                a[j] = 1;
            }
            break;
        }
    }

    cout << r << "\n";
    for (int i = 1; i <= n; i++) cout << a[i] << " ";
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
//    cin >> T;
    while (T--) solve();
    return 0;
}
```

### 【二分答案】盖楼

https://www.acwing.com/problem/content/description/5569/

> 题意：给定 H 个正整数分别为 1 到 H。现在要将这 H 个正整数分给两个人，其中一个人希望获得可以不被 x 整除的数，另一个人希望可以获得不被 y 整除的数。其中 x 和 y 均为质数，问最小的 H 是多少？
>
> 思路：
>
> - 很显然的一个二分答案。因为 H 越大，越有可能满足这两个人的要求，具备单调性。
>
> - 那么现在的问题就是检查函数的设计。对于当前的高度 h，即 h 个正整数，很显然可以划分出下面的集合关系
>
>     <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404091829325.png" alt="集合关系" style="zoom:50%;" />
>
>     其中 h-p-q+a 的部分两个人都可以获得。最策略是，p-a 与 q-a 的都给另外的人，如果不够，从 h-p-q+a 中拿，如果还不够那就说明当前 h 无法满足，需要增大 h，反之说明 h 可以满足，继续寻找答案的左边界。
>
> 时间复杂度：$\Theta(\log (N+M))$

```cpp
#include <iostream>
using namespace std;
typedef long long ll;

ll n, m, x, y;

bool chk(ll h) {
    ll p = h / x, q = h / y, a = h / (x * y);

    return max(0ll, n - (q - a)) + max(0ll, m - (p - a)) <= h - p - q + a;
}

void solve() {
    cin >> n >> m >> x >> y;

    ll l = 1, r = 1e15;
    while (l < r) {
        ll mid = (l + r) >> 1;
        if (chk(mid)) r = mid;
        else l = mid + 1;
    }

    cout << r << "\n";
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
//    cin >> T;
    while (T--) solve();
    return 0;
}
```

小插曲。一开始写的检查函数 code 始终只能通过 9/10，检查函数的代码如下：

```cpp
bool chk(ll h) {
    ll p = h / x, q = h / y, a = h / (x * y);

    if (h - p >= n && h - q >= m) {
        // 如果满足第一人，检查第二人是否满足
        if (q - a >= n) return true;
        else if (h - (n - (q - a)) - q >= m) return true;

        // 如果满足第二人，检查第一人是否满足
        if (p - a >= m) return true;
        else if (h - (n - (p - a)) - p >= n) return true;
    }
    return false;
}
```

其实是因为有逻辑错误，即对于当前的 h，必须两个人都能满足才行。而上述代码可能会出现第一个人不满足，但是第二个人满足，却返回 true 的情况，而这是错误的。因此上述代码改成两个人同时满足就可以通过了，即如果有一个人不满足，则返回 false：

```cpp
bool chk(ll h) {
    ll p = h / x, q = h / y, a = h / (x * y);

    if (h - p >= n && h - q >= m) {
        // 如果满足第一人，检查第二人是否满足
        if (q - a >= n) return true;
        else if (h - (n - (q - a)) - q >= m) return true;

        return false;
    }
    return false;
}
```

小结：过多的分支语句不如一个 max 来的更加清晰，也可以避免一定的逻辑错误。

### 【二分答案】找出叠涂元素

https://leetcode.cn/problems/first-completely-painted-row-or-column/description/

> 题意：给定一个 $m\times n$ 的矩阵，以及一个存储矩阵中所有元素值的数组，现在从左往右将数组中的元素在对应矩阵中涂色，问序列中最左边使得矩阵中某一行或列全部涂色的下标是什么
>
> 思路：显然，下标越往右越有可能出现矩阵中某一行或列全部涂色，具备单调性，可以二分答案。我们直接二分序列下标，对于 chk 函数我们直接 $O(n\times m)$ 模拟即可
>
> 时间复杂度：$O(n\times m \log (n\times m))$

```cpp
class Solution {
public:
    int firstCompleteIndex(vector<int>& arr, vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size();

        auto chk = [&](int idx) {
            bool vis[100010] {};
            for (int i = 0; i <= idx; i++) {
                vis[arr[i]] = true;
            }

            for (int i = 0; i < m; i++) {
                int s = 0;
                for (int j = 0; j < n; j++) {
                    s += vis[mat[i][j]];
                }
                if (s == n) return true;
            }

            for (int j = 0; j < n; j++) {
                int s = 0;
                for (int i = 0; i < m; i++) {
                    s += vis[mat[i][j]];
                }
                if (s == m) return true;
            }

            return false;
        };

        int l = 0, r = m * n - 1;
        while (l < r) {
            int mid = (l + r) >> 1;
            if (chk(mid)) r = mid;
            else l = mid + 1;
        }
        return r;
    }
};
```

### 【二分答案/双指针】找出唯一性数组的中位数

https://leetcode.cn/problems/find-the-median-of-the-uniqueness-array/

> 题意：给定一个数组，返回其「唯一性数组」的中位数。如果唯一性数组有奇数个元素，则返回中间元素，如果有偶数个元素，则返回两个中间元素中较小的那个，即左边那个中间元素。唯一性数组定义为：原数组的所有非空子数组中不同元素的个数组成的序列。
>
> 思路：
>
> - 首先根据题意可以明确的计算出这个唯一性数组的元素个数 $tot$。假设原数组有 $n$ 个元素，则其唯一性数组一定有 $\displaystyle tot=\frac{(1+n) \times n}{2}$ 个元素，且最小值一定是 $1$，最大值 $\le n$。最暴力的做法就是 $O(n^2)$ 的维护出这个唯一性数组然后返回其中位数，但这对于 $10^5$ 级别的数据显然是不合适的。观察其他性质。
> - 不难发现，对于「不同元素的个数 $x$」而言，$x$ 越大，满足条件的子数组数量就越多，反之 $x$ 越小，则满足条件的子数组数量就越少，具备单调性，考虑二分。
> - 问题就是在 $[1,n]$ 内找到一个尽可能小的 $upper$ 使得满足「不同元素的个数 $\le upper$ 的子数组」的数量 $\displaystyle \ge \lceil \frac{tot}{2} \rceil$。
> - 我们能否在指定不同元素个数上限为 $upper$ 的情况下，快速计算合法子数组的个数呢？答案是可以的，我们引入双指针算法进行 $O(n)$ 的 $check$。我们枚举子数组的右边界并利用哈希表维护子数组的左边界进行统计即可。
>
> 时间复杂度：$O(n\log n)$

```cpp []
class Solution {
public:
    int medianOfUniquenessArray(vector<int>& nums) {
        using ll = long long;
        int n = nums.size();
        
        ll tot = 1ll * (1 + n) * n / 2;
        int ma = *max_element(nums.begin(), nums.end());
        int f[ma + 1];
        memset(f, 0, sizeof f);

        // 双指针 check
        auto chk = [&](int upper) -> bool {
            ll cnt = 0;
            int size = 0; // 哈希表大小
            for (int l = 0, r = 0; r < n; r++) {
                size += f[nums[r]] == 0;
                f[nums[r]]++;
                while (size > upper) {
                    --f[nums[l]];
                    size -= f[nums[l]] == 0;
                    l++;
                }
                // 此时以 nums[r] 结尾且 l 为左边界的所有子数组的不同元素的数量均 <= upper
                cnt += r - l + 1;
            }
            memset(f, 0, sizeof f);
            return cnt >= (tot + 1) / 2; // 上取整写法
        };

        int l = 1, r = n;
        while (l < r) {
            int mid = (l + r) >> 1;
            if (chk(mid)) r = mid;
            else l = mid + 1;
        }
        return r;
    }
};
```

```python3 []
class Solution:
    def medianOfUniquenessArray(self, nums: List[int]) -> int:
        n = len(nums)
        ma = max(nums)
        tot = (1 + n) * n >> 1

        def chk(upper: int) -> int:
            f = [0] * (ma + 1)
            cnt, l, size = 0, 0, 0
            for r in range(n):
                size += f[nums[r]] == 0
                f[nums[r]] += 1
                while size > upper:
                    f[nums[l]] -= 1
                    size -= f[nums[l]] == 0
                    l += 1
                cnt += r - l + 1
            return cnt >= (tot + 1) >> 1

        l, r = 1, n
        while l < r:
            mid = (l + r) >> 1
            if chk(mid): r = mid
            else: l = mid + 1
        return r
```

### 【二分查找】Bomb

https://codeforces.com/contest/1996/problem/F

> 题意：给定两个序列 $a$ 和 $b$ 以及最大操作次数 $k$，问在不超过最大操作次数的情况下，最多可以获得多少收益？收益的计算方法为：每次选择 $a$ 中一个数 `a[i]` 加入收益，并将该数减去 `b[i]` 直到为 $0$。
>
> 思路：
>
> - 暴力抬手：最暴力的做法是我们每次操作时选择 $a$ 中的最大值进行计数并对其修改，但是显然 $O(nk)$ 会超时，我们考虑加速这个过程。
> - 加速进程：由于最终结果中每次操作都是最优的，因此操作次数越多获得的收益就越大，具备单调性。如何利用这个单调性呢？关键在于全体数据的操作次数，我们记作 $k'$。假设我们对 $a$ 中全体数据可取的范围设置一个下限 $lower$，那么显然的 $lower$ 越高，$k'$ 越小，$lower$ 越低，$k'$ 越大。于是根据单调的传递性可知 $lower$ 也和最终的收益具备单调性，$lower$ 越高，收益越小，$lower$ 越低，收益越大。因此我们二分 $lower$，使得 $k'$ 左逼近 $k$。
> - 细节处理：二分的边界是什么？这需要从计算最终结果的角度来思考。对于二分出的下界 $lower$，即 $r$，此时扫描一遍计算出来的操作次数 $k'$ 一定是 $k'\le k$。也就是说我们还需要操作 $k-k'$ 次，显然我们可以将每个数操作后维护到最终的结果，然后执行上述的暴力思路，但是这样仍然会超时，因为 $k-k'$ 的计算结果最大是 $n$，此时进行暴力仍然会达到 $O(n^2)$。正难则反，我们不妨将上述二分出的 $lower$ 减一进行最终答案的计算，这样对应的操作次数 $k'$ 一定会超过 $k$，并且对于超过 $k$ 的操作，累加到答案的数值一定都是 $lower-1$，这一步也是本题最精妙的一步。从上述分析不难发现，二分的下界需要设定为 $1$，因为后续累加答案时会对 $lower$ 进行减一操作；二分的上界需要设定为严格大于 $10^9$ 的数，比如 $10^9+1$，因为我们需要保证 $lower-1$ 后对应的操作次数 $k'$ 严格大于 $k$。
>
> 时间复杂度：$O(n\log k)$

```cpp
#include <bits/stdc++.h>

using ll = long long;

void solve() {
    int n, k;
    std::cin >> n >> k;
    
    std::vector<int> a(n), b(n);
    for (int i = 0; i < n; i++) std::cin >> a[i];
    for (int i = 0; i < n; i++) std::cin >> b[i];
    
    auto chk = [&](int x) {
        ll cnt = 0;
        for (int i = 0; i < n; i++) {
            if (a[i] < x) continue;
            cnt += (a[i] - x) / b[i] + 1;
        }
        return cnt;
    };
    
    int l = 1, r = 1e9 + 10;
    while (l < r) {
        int mid = (l + r) >> 1;
        if (chk(mid) <= k) r = mid;
        else l = mid + 1;
    }
    
    int best = r - 1;
    ll res = 0, cnt = 0;
    for (int i = 0; i < n; i++) {
        if (a[i] < best) continue;
        ll t = (a[i] - best) / b[i] + 1;
        cnt += t;
        res += t * a[i] - t * (t - 1) / 2 * b[i];
    }
    res -= (cnt - k) * best;
    
    std::cout << res << "\n";
}

signed main() {
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);
    int T = 1;
    std::cin >> T;
    while (T--) solve();
    return 0;
}
```
