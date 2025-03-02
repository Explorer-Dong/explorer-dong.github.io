---
title: 第 14 届 Python A 组
---

## 三国游戏

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

## 平均

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

