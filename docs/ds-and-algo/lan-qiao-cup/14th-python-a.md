---
title: 第 14 届 Python A 组（省赛）
---

## T1 特殊日期 5'

## T2 分糖果 5'

## T3 三国游戏 10'

题意：给定三个长度为 $n$ 的数组 $a,b,c$。现在有三个累计值 $x,y,z$（初始均为 $0$）分别对应到数组 $a,b,c$。现在可以选择索引在 $[0,n-1]$ 中的任意个索引，使得初始值 $x,y,z$ 加上对应数组索引所在的元素值。问使得三个累计值中的任意一个大于另外两个之和的情况下，最多可以选择多少个索引。返回最多可选择的索引数，如果不存在合法情况输出 $-1$。

思路：很显然的一个贪心。对于任意一个数组（假设为 $a$），统计所有的 $a_i-(b_i+c_i)$ 的值，然后降序枚举即可。

时间复杂度：$O(n\log n)$

=== "Python"

    ```python
    n = int(input())
    
    def f(a, b, c):
        d = [0] * n
        for i in range(n):
            d[i] = a[i] - (b[i] + c[i])
        d.sort(reverse=True)
        s, cnt = 0, 0
        for num in d:
            if s + num > 0:
                s += num
                cnt += 1
        return cnt if cnt else -1
    
    a = list(map(int, input().strip().split()))
    b = list(map(int, input().strip().split()))
    c = list(map(int, input().strip().split()))
    
    print(max(f(a, b, c), f(b, a, c), f(c, a, b)))
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <algorithm>
    #include <vector>
    
    using namespace std;
    using ll = long long;
    
    int f(vector<int>& a, vector<int>& b, vector<int>& c) {
        vector<int> d;
        for (int i = 0; i < a.size(); i++) {
            d.push_back(a[i] - (b[i] + c[i]));
        }
        sort(d.rbegin(), d.rend());
        int cnt = 0;
        ll s = 0;
        for (int num: d) {
            if (s + num > 0) {
                s += num;
                cnt++;
            }
        }
        return cnt ? cnt : -1;
    }
    
    int main() {
        int n;
        cin >> n;
    
        vector<int> a(n), b(n), c(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
        for (int i = 0; i < n; i++) {
            cin >> b[i];
        }
        for (int i = 0; i < n; i++) {
            cin >> c[i];
        }
        cout << max({f(a, b, c), f(b, a, c), f(c, a, b)}) << "\n";
    
        return 0;
    }
    ```

## T4 平均 10'

题意：给定 $n$ 个 $[0,9]$ 范围内的整数（$n$ 是 $10$ 的倍数）和修改每一个数的代价。现在为了让每一个数的数量都相等，即都为 $n/10$ 个，问最小修改代价是多少。

思路：仍然是一个贪心，我们围绕「修改代价」这个变量进行贪心即可。具体地，为了让修改代价最小，我们每次修改时一定选择当前局面下「修改代价最小」且「对应数字数量超过 $n/10$ 的数字」进行修改，至于修改成什么数字，无需考虑。

时间复杂度：$O(n\log n)$

=== "Python"

    ```python
    n = int(input())
    a = [None] * n
    
    d = [0] * 10  # 字典
    for i in range(n):
        num, cost = map(int, input().strip().split())
        a[i] = num, cost
        d[num] += 1
    
    a.sort(key=lambda t: t[1])
    ans = 0
    for num, cost in a:
        if d[num] > n // 10:
            d[num] -= 1
            ans += cost
    
    print(ans)
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <algorithm>
    #include <vector>
    
    using namespace std;
    using ll = long long;
    
    int main() {
        int n;
        cin >> n;
    
        vector<pair<int, int>> a(n);
        vector<int> d(10);
        for (int i = 0; i < n; i++) {
            cin >> a[i].first >> a[i].second;
            d[a[i].first]++;
        }
    
        sort(a.begin(), a.end(), [&](pair<int, int>& x, pair<int, int>& y){
            return x.second < y.second;
        });
    
        ll ans = 0;
        for (auto& [num, cost]: a) {
            if (d[num] > n / 10) {
                d[num]--;
                ans += cost;
            }
        }
    
        cout << ans << "\n";
    
        return 0;
    }
    ```

## T5 翻转 15'

题意：给定两个等长字符串 $t,s\ (1\le |t|,|s|\le10^6)$，现在需要通过两种操作将 s 转换为 t，返回最小操作次数，如果无法转换返回 -1。两种操作如下：

1. 选择 $s$ 中的 $010$ 子串并将其转换为 $000$；
2. 选择 $s$ 中的 $101$ 子串并将其转换为 $111$。

思路：纯模拟。直接遍历 $s$ 串的每一个字符并判定是否可以翻转即可。

时间复杂度：$O(n)$

=== "Python"

    ```python
    T = int(input().strip())
    for _ in range(T):
        t = list(map(int, input().strip()))
        s = list(map(int, input().strip()))
    
        n = len(s)
        ans = 0
        ok = True
        for i in range(n):
            if s[i] == t[i]:
                continue
            if i == 0 or i == n - 1 or s[i - 1] == s[i] or s[i + 1] == s[i]:
                ok = False
                break
            else:
                s[i] = t[i]
                ans += 1
    
        print(ans if ok else -1)
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <algorithm>
    #include <vector>
    
    using namespace std;
    using ll = long long;
    
    void solve() {
        string t, s;
        cin >> t >> s;
    
        int n = s.size();
        int ans = 0;
        bool ok = true;
        for (int i = 0; i < n; i++) {
            if (s[i] == t[i]) {
                continue;
            }
            if (i == 0 || i == n - 1 || s[i - 1] == s[i] || s[i + 1] == s[i]) {
                ok = false;
                break;
            } else {
                s[i] = t[i];
                ans++;
            }
        }
    
        cout << (ok ? ans : -1) << "\n";
    }
    
    int main() {
        int T;
        cin >> T;
        while (T--) {
            solve();
        }
        return 0;
    }
    ```

## T6 子矩阵 15'

题意：给定一个 $n\times m\ (1\le n,m\le1000)$ 的矩阵，现在需要求出所有大小为 $a\times b\ (1\le a\le n,1\le b \le m)$ 的子矩阵的价值和。一个子矩阵的价值定义为该子矩阵中最大值与最小值的成绩。输出与 $998244353$ 取模后的结果。

思路：如果是一维的，那么就是单调队列的板子题，二维的只需要按行按列分开用单调队列维护即可。具体地，我们先按行维护每一个长度为 $b$ 的数组的最值，然后再按列维护每一个长度为 $a$ 的数组的最值，最后 $O(1)$ 地取出最值相乘并求和即可。

时间复杂度：$O(nm)$，常数比较大。

=== "Python"

    ```python
    from collections import deque
    
    class MonotonicQueue:
        def __init__(self, is_min_queue: bool):
            self.q = deque()
            if is_min_queue:
                self.compare = lambda a, b: a < b
            else:
                self.compare = lambda a, b: a > b
    
        def push_back(self, x):
            while self.q and self.compare(x, self.q[-1]):
                self.q.pop()
            self.q.append(x)
    
        def pop_front(self, x):
            if self.q and self.q[0] == x:
                self.q.popleft()
    
        def get_extreme_value(self):
            return self.q[0]
    
    mod = 998244353
    n, m, a, b = map(int, input().strip().split())
    g = [list(map(int, input().strip().split())) for _ in range(n)]
    f = [[(None, None)] * m for _ in range(n)]
    
    # 维护行最值
    for i in range(n):
        minq, maxq = MonotonicQueue(True), MonotonicQueue(False)
        for j in range(m):
            minq.push_back(g[i][j])
            maxq.push_back(g[i][j])
            if j >= b:
                minq.pop_front(g[i][j - b])
                maxq.pop_front(g[i][j - b])
            f[i][j] = minq.get_extreme_value(), maxq.get_extreme_value()
    
    # 计算列最值 & 求解答案
    ans = 0
    for j in range(m):
        minq, maxq = MonotonicQueue(True), MonotonicQueue(False)
        for i in range(n):
            minq.push_back(f[i][j][0])
            maxq.push_back(f[i][j][1])
            if i >= a:
                minq.pop_front(f[i - a][j][0])
                maxq.pop_front(f[i - a][j][1])
            if i >= a - 1 and j >= b - 1:
                ans += minq.get_extreme_value() * maxq.get_extreme_value() % mod
    
    print(ans)
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <algorithm>
    #include <vector>
    #include <deque>
    #include <functional>
    
    using namespace std;
    using ll = long long;
    
    template<class T>
    struct MonotonicQueue {
        std::deque<T> q;
        std::function<bool(T, T)> compare;
        MonotonicQueue(bool is_min_queue) {
            if (is_min_queue) {
                compare = [](T a, T b) { return a < b; };
            } else {
                compare = [](T a, T b) { return a > b; };
            }
        }
        void pushBack(T x) {
            while (q.size() && compare(x, q.back())) {
                q.pop_back();
            }
            q.push_back(x);
        }
        void popFront(T x) {
            if (q.size() && q.front() == x) {
                q.pop_front();
            }
        }
        T getExtremeValue() {
            return q.front();
        }
    };
    
    const int mod = 998244353;
    const int N = 1010;
    
    int n, m, a, b;
    int g[N][N];
    pair<int, int> f[N][N];
    
    int main() {
        cin >> n >> m >> a >> b;
        
        // 维护行最值
        for (int i = 0; i < n; i++) {
            MonotonicQueue<int> minq(true);
            MonotonicQueue<int> maxq(false);
            for (int j = 0; j < m; j++) {
                cin >> g[i][j];
                minq.pushBack(g[i][j]);
                maxq.pushBack(g[i][j]);
                if (j >= b) {
                    minq.popFront(g[i][j - b]);
                    maxq.popFront(g[i][j - b]);
                }
                f[i][j].first = minq.getExtremeValue();
                f[i][j].second = maxq.getExtremeValue();
            }
        }
    
        // 计算列最值 & 求解答案
        ll ans = 0;
        for (int j = 0; j < m; j++) {
            MonotonicQueue<int> minq(true);
            MonotonicQueue<int> maxq(false);
            for (int i = 0; i < n; i++) {
                minq.pushBack(f[i][j].first);
                maxq.pushBack(f[i][j].second);
                if (i >= a) {
                    minq.popFront(f[i - a][j].first);
                    maxq.popFront(f[i - a][j].second);
                }
                if (i >= a - 1 && j >= b - 1) {
                    ans += 1ll * minq.getExtremeValue() * maxq.getExtremeValue() % mod;
                }
            }
        }
    
        cout << ans << "\n";
    
        return 0;
    }
    ```

## T7 阶乘的和 20'

题意：给定一个含有 $n$ 个数的数组 $a$，输出最大的 $m$ 使得 $\dfrac{\sum_{i=0}^{n-1}(a_i!)}{m!}$ 为整数。

思路：首先 $m$ 取 $a$ 中最小值上式一定为整数。为了让 $m$ 更大，我们可以贪心地让 $a$ 中小数的阶乘逐渐合并为更大数的阶乘。比如 $(x+1)$ 个 $x!$ 就可以合并为 $1$ 个 $(x+1)!$。根据这样的贪心合并思路，我们将 a 中的元素排序后不断合并直到无法合并就是最终答案。

时间复杂度：排序为 $O(n\log n)$，合并不超过 $O(\log n)$。因此最终复杂度为 $O(n\log n)$。

=== "Python"

    ```python
    from collections import defaultdict
    
    n = int(input())
    a = list(map(int, input().strip().split()))
    
    # 排序并计数
    a.sort()
    d = defaultdict(int)
    for num in a:
        d[num] += 1
    
    # 贪心合并
    ans = a[0]
    while True:
        if d[ans] % (ans + 1) == 0:
            d[ans + 1] += d[ans] // (ans + 1)
            ans += 1
        else:
            print(ans)
            break
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <algorithm>
    #include <vector>
    #include <unordered_map>
    
    using namespace std;
    
    int main() {
        int n;
        cin >> n;
        vector<int> a(n);
        unordered_map<int, int> d;
        for (int i = 0; i < n; i++) {
            cin >> a[i];
            d[a[i]]++;
        }
    
        sort(a.begin(), a.end());
    
        int ans = a[0];
        while (true) {
            if (d[ans] % (ans + 1) == 0) {
                d[ans + 1] += d[ans] / (ans + 1);
                ans++;
            } else {
                cout << ans << "\n";
                break;
            }
        }
    
        return 0;
    }
    ```

## T8 奇怪的数 20'

题意：给定一个长度为 $n$ 的数，最低位从 $1$ 开始编号。输出满足「长度为 n 且连续 5 位数位之和不超过 m 且奇数位为奇数，偶数位为偶数」的总数字个数。

思路：数位 DP，不会。爆搜能过 3/10。满足了。

## T9 子树的大小 25'

题意：给定 $Q\ (1\le Q\le 10^5)$ 轮询问，每轮询问给定一棵含有 $n\ (1\le n\le 10^9)$ 个结点的完全 $m\ (2\le m\le 10^9)$ 叉树，输出第 $k\ (1\le k\le n)$ 个结点对应子树的结点数。树中结点按照从上往下，从左往右的顺序从 $1$ 开始编号。

思路：

- 直接模拟也行，就是麻烦了点，需要推导出在完全 $m$ 叉树中，编号为 $k$ 的结点所在的层数。同时，为了解决子树最后一层不满的情况，需要利用第 $k$ 个结点左侧子树占用了最后一层的多少个结点，来倒推出第 $k$ 个结点在最后一层可以分到的结点数。
- [官解](https://www.lanqiao.cn/questions/573855/)。

时间复杂度：$O(Q\log n)$

=== "Python"

    ```python

    ```

=== "C++"

    ```c++

    ```

=== "Python 纯模拟"

    ```python
    import math

    Q = int(input().strip())
    OUTs = []
    for _ in range(Q):
        n, m, k = map(int, input().strip().split())
        x = math.ceil(math.log(n * (m - 1) + 1, m)) - 1  # 最后一层的层号（从0开始）
        y = math.ceil(math.log(k * (m - 1) + 1, m)) - 1  # 当前结点的层号（从0开始）

        if x == y:
            OUTs.append(1)
            continue

        ans = (1 - m ** (x - y)) // (1 - m)

        # 当前结点所在层的结点数
        now_level_cnt = m ** y
        # 当前结点左侧结点的数量
        left_node_cnt = k - ((1 - m ** y) // (1 - m)) - 1
        # 满m叉数的情况下，左侧所有结点对应子树的最后一层的结点数量
        left_sub_trees_nodes = left_node_cnt * m ** x // now_level_cnt 
        # 最后一层的实际数量
        last = n - (1 - m ** x) // (1 - m)

        if last - left_sub_trees_nodes > 0:
            ans += min(m ** (x - y), last - left_sub_trees_nodes)

        OUTs.append(ans)

    print("\n".join(map(str, OUTs)))
    ```

## T10 反异或 01 串 25'
