---
title: 基础算法例题解析
---

## 前言

本文精选一些基础算法例题并进行详细讲解。下表导读了本文的所有例题，便于快速检索：

| 标签 |                      链接                       |  难度  |     锚点     | 备注 |
| :--: | :---------------------------------------------: | :----: | :----------: | :--: |
| 贪心 | [CF](https://codeforces.com/contest/1873/problem/B) | CF 800 | [:link:](#good-kid) | / |

## 题解

### Good Kid

题意：给定一个数列，现在可以选择其中的任意一个数使其 +1。问如何选择这个数，可以使得修改后的数列中的所有数之积的值最大。输出这个最大值。

思路：无论选择哪个数 +1，其实就是选择 n-1 个数的乘积增加一倍。为了最大化结果，那自然就是选择最大的 n-1 个数使其乘积翻倍，那么就是选择数列中的最小值使其 +1 即可。

时间复杂度：$O(n)$。

=== "C"

    ```c
    #include <stdio.h>
    #include <stdlib.h>
    
    void solve() {
        int n;
        scanf("%d", &n);
    
        int *a = (int*)malloc(n * sizeof(int));
        for (int i = 0; i < n; i++) {
            scanf("%d", &a[i]);
        }
    
        int min_index = 0;
        for (int i = 1; i < n; i++) {
            if (a[i] < a[min_index]) {
                min_index = i;
            }
        }
    
        a[min_index] += 1;
        
        int ans = 1;
        for (int i = 0; i < n; i++) {
            ans *= a[i];
        }
    
        printf("%d\n", ans);
    
        free(a);
    }
    
    int main() {
        int T;
        scanf("%d", &T);
        while (T--) {
            solve();
        }
    }
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <vector>
    
    void solve() {
        int n;
        std::cin >> n;
        std::vector<int> a(n);
        for (int i = 0; i < n; i++) {
            std::cin >> a[i];
        }
    
        int min_index = 0;
        for (int i = 1; i < n; i++) {
            if (a[i] < a[min_index]) {
                min_index = i;
            }
        }
    
        a[min_index] += 1;
    
        int ans = 1;
        for (int i = 0; i < n; i++) {
            ans *= a[i];
        }
        
        std::cout << ans << "\n";
    }
    
    int main() {
        std::ios::sync_with_stdio(0);
        std::cin.tie(0);
    
        int T;
        std::cin >> T;
        while (T--) {
            solve();
        }
    }
    ```

=== "Java"

    ```java
    import java.util.Scanner;
    import java.util.ArrayList;
    
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
            int T = sc.nextInt();
            while (T-- > 0) {
                solve(sc);
            }
            sc.close();
        }
    
        public static void solve(Scanner sc) {
            int n = sc.nextInt();
            ArrayList<Integer> a = new ArrayList<>(n);
            for (int i = 0; i < n; i++) {
                a.add(sc.nextInt());
            }
    
            int min_index = 0;
            for (int i = 1; i < n; i++) {
                if (a.get(i) < a.get(min_index)) {
                    min_index = i;
                }
            }
    
            a.set(min_index, a.get(min_index) + 1);
    
            int ans = 1;
            for (int i = 0; i < n; i++) {
                ans *= a.get(i);
            }
    
            System.out.println(ans);
        }
    }
    ```

=== "Python"

    ```python
    T = int(input())
    for _ in range(T):
        n = int(input())
        a = list(map(int, input().split()))
    
        a[a.index(min(a))] += 1
    
        ans = 1
        for num in a:
            ans *= num
        print(ans)
    ```

=== "JavaScript"

    ```javascript
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    let inputs = []
    let idx = 0;
    
    rl.on('line', (line_data) => {
        inputs.push(line_data);
    });
    
    rl.on('close', () => {
        let T = inputs[idx++];
        while (T--) {
            solve();
        }
    });
    
    function solve() {
        let n = inputs[idx++];
        let a = inputs[idx++].split(' ').map(Number);
    
        const min_index = a.indexOf(Math.min(...a));
        a[min_index] += 1;
    
        let ans = 1;
        for (const num of a) {
            ans *= num;
        }
    
        console.log('%d', ans);
    }
    ```

### 3. 1D Eraser

<https://codeforces.com/contest/1873/problem/D>

> 题意：给定一个只有B和W两种字符的字符串，现在有一种操作可以将一个指定大小的区间（大小为k）中所有的字符全部变为W，问对于这个字符串，至少需要几次上述操作才可以将字符串全部变为W字符
>
> 思路：我们直接遍历一边字符串即可，在遍历到B字符的时候，指针向后移动k位，如果是W字符，指针向后移动1位即可，最终统计一下遇到B字符的次数即可。

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

void solve()
{
    int n, k;
    cin >> n >> k;
    string s;
    cin >> s;
    
    int res = 0;
    
    for (int i = 0; i < n;)
    {
        if (s[i] == 'B')
        {
            res ++;
            i += k;
        }
        else i++;
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

### 4. ABBC or BACB

<https://codeforces.com/contest/1873/problem/G>

> 题意：现在有一个只有A和B两种字符的字符串，有如下两种操作：第一种，可以将AB转化为BC，第二种，可以将BA转化为CB。问最多可以执行上述操作几次
>
> 思路：其实一开始想到了之前做过的翻转数字为-1，最后的逻辑是将数字向左右移动，于是这道题就有了突破口了。上述两种操作就可以看做将A和B两种字符交换位置，并且B保持不变，A变为另一种字符C。由于C是无法执行上述操作得到，因此就可以理解为B走过的路就不可以再走了，那么就是说对于一个字符串，最终都会变成B走过的路C。并且只要有B，那么一个方向上所有的A都会被利用转化为C（直到遇到下一个B停止），那么我们就可以将B看做一个独立的个体，他可以选择一个方向上的所有的A并且执行操作将该方向的A全部转化为C，那么在左和右的抉择中，就是要选择A数量最多的方向进行操作，但是如果B的足够多，那就不需要考虑哪个方向了，所有的A都可以获得一次操作机会。现在就转向考虑B需要多少呢，
>
> 答案是两种：如果B的数量小于A“块”的数量，其实就是有一块A无法被转化，那么为了让被转化的A数量尽可能的多，就选择A块数量最少的那一块不被转化。如果B的数量>=A块的数量，那么可以保证所有的A都可以被转化为C块，从而最终的答案就是A字符的数量

```cpp
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

void solve()
{
    string s; cin >> s;
    int cntb = 0, blocka = 0, cnta = 0; // B字符的数量，A连续区间的数量，A字符的个数 
    
    vector<int> a; // 每一个A连续区间中A字符的数量 
    
    for (int i = 0; i < s.size();)
    {
        if (s[i] == 'A')
        {
            int sum = 0;
            while (s[i] == 'A') cnta ++, sum ++, i ++;
            a.emplace_back(sum);
            blocka ++;
        }
        else
        {
            cntb ++;
            i ++;
        }
    }
    
    if (cntb >= blocka) cout << cnta << endl;
    else
    {
        sort(a.begin(), a.end());
        cout << cnta - a[0] << endl;
    }
}

int main()
{
    int T; cin >> T;
    while (T --) solve();
    return 0;
}
```

### 5. Smilo and Monsters

<https://codeforces.com/contest/1891/problem/C>

> 题意：给定一个序列，其中每一个元素代表一个怪物群中的怪物的数量。现在有两种操作：
>
> 1. 选择一个怪物群，杀死其中的一只怪物。同时累加值 $x+=1$
> 2. 选择一个怪物群，通过之前积累的累加值，一次性杀死当前怪物群中的 $x$ 只怪物，同时累加值 $x$ 归零
>
> 现在询问杀死所有怪物的最小操作次数
>
> 思路：一开始我是分奇偶进行判断的，但是那只是局部最优解，全局最优解的计算需要我们“纵观全局”。
>
> 我们可以先做一个假设：假设当前只有一个怪物群，为了最小化操作次数，最优解肯定是先杀死一半的怪物（假设数量为n，则获得累计值x=n），然后无论剩余n个还是n+1个，我们都使用累计值x一次性杀死n个怪物。
>
> 现在我们回到原题，有很多个怪物群，易证，最终的最优解也一点是最大化利用操作2，和特殊情况类似，能够利用的一次性杀死的次数就是怪物总数的一半。区别在于：此时不止一个怪物群。那么我们就要考虑累加值如何使用。很容易想到先将怪物群按照数量大小进行排序，关键就在于将累加值从小到大进行使用还是从大到小进行使用。可以发现，对于一个确定的累加值，由于操作2的次数也会算在答案中。那么如果从最小的怪物群开始使用，就会导致操作2的次数变多。因此我们需要从最大值开始进行操作2。
>
> 那么最终的答案就是：
>
> - 首先根据怪物数量的总和计算出最终的累加值s（s=sum/2）
> - 接着我们将怪物群按照数量进行升序排序
> - 然后我们从怪物数量最大的开始进行操作2，即一次性杀死当前怪物群，没进行一次，答案数量+1
> - 最后将答案累加上无法一次性杀死的怪物群中怪物的总数
>
> 时间复杂度：$O(n \log n)$

```cpp
void solve() {
    n = read(); s = 0; res = 0;
    for (int i = 1; i <= n; i++) {
        a[i] = read();
        s += a[i];
    }
 
    s >>= 1;
 
    sort(a + 1, a + n + 1);
 
    for (int i = n; i >= 1; i--) {
        if (s >= a[i]) {
            s -= a[i], a[i] = 0, res++;
        } else if (s) {
            a[i] -= s;
            s = 0;
            res++;
        }
    }
 
    for (int i = 1; i <= n; i++) {
        res += a[i];
    }
 
    printf("%lld\n", res);
}
```

### 6. 通关

<https://www.lanqiao.cn/problems/5889/learning/?contest_id=145>

> 声明：谨以此题记录我的第一道正式图论题（存图技巧抛弃了y总的纯数组，转而使用动态数组`vector`进行建图）e.g.
>
> ```cpp
> struct Node {
> int id;        // 当前结点的编号
> int a;    // 属性1
> int b;    // 属性2
> };
> vector<Node> G[N];
> ```
>
> 题意：给定一棵树，每个结点代表一个关卡，每个关卡拥有两个属性：通关奖励值`val`和可通关的最低价值`cost`。现在从根节点开始尝试通关，每一个结点下面的关卡必须要当前结点通过了之后才能继续闯关。问应该如何选择通关规划使得通过的关卡数最多？
>
> 思路：一开始想到的是直接莽bfs，对每一层结点按照cost升序排序进行闯关，然后wa麻了。最后一看正解原来是还不够贪。正确的闯关思路应该是始终选择当前可以闯过的cost最小的关卡，而非限定在了一层上。因此我们最终的闯关顺序是：对于所有解锁的关卡，选择cost最小的关卡进行通关，如果连cost最小的关卡都无法通过就直接结束闯关。那么我们应该如何进行代码的编写呢？分析可得，解锁的关卡都是当前可通过的关卡的所有子结点，而快速获得当前cost最小值的操作可以通过一个堆来维护。
>
> 时间复杂度：$O(n \log n)$

```cpp
const int N = 100010;
typedef long long ll;

struct Node {
    int id;
    int val;
    int cost;
    // 有趣的重载
    bool operator< (const Node& t) const {
        return this->cost > t.cost;
    }
};

int n, p;
ll res;
vector<Node> G[N];
priority_queue<Node> q;

void bfs() {
    q.push(G[0][0]);

    while (q.size()) {
        Node now = q.top();
        q.pop();
        if (p >= now.cost) {
            res++;
            p += now.val;
            for (auto& child: G[now.id]) {
                q.push(child);
            }
        } else {
            break;
        }
    }
}

void solve() {
    cin >> n >> p;
    for (int i = 1; i <= n; i++) {
        int fa, v, c;
        cin >> fa >> v >> c;
        G[fa].push_back({i, v, c});
    }
    bfs();
    cout << res << "\n";
}
```

### 7. 串门

<https://www.lanqiao.cn/problems/5890/learning/?contest_id=145>

> 题意：给定一棵无向树，边权为正。现在询问在访问到每一个结点的情况下最小化行走的路径长度
>
> 思路：首先我们不管路径长度的长短，我们直接开始串门。可以发现，我们一点会有访问的起点和终点，那么在起点到终点的这条路上，可能会有很多个分叉，对于每一个分叉，我们都需要进入再返回来确保分叉中的结点也被访问到，那么最终的路径长度就是总路径长度的2倍 - 起点到终点的距离，知道了这个性质后。我们可以发现，路径的总长度是一个定值，我们只有最大化起点到终点距离才能确保行走路径长度的最小值。那么问题就转化为了求解一棵树中，最长路径长度的问题。即求解树的直径的问题。
>
> 树的直径：首先我们反向考虑，假设知道了直径的一个端点，那么树的直径长度就是这棵树以当前结点为根的深度。那么我们就需要先确定一个直径的端点。不难发现，对于树中的任意一个结点，距离它最远的一个（可能是两个）结点一定是树的直径的端点。那么问题就迎刃而解了。
>
> 为了降低代码量，我们可以设置一个dist数组来记录当前结点到根的距离。
>
> - 在确定直径端点的时候，选择任意一个结点为根节点，然后维护dist数组，最终dist[i~n]中的最大值对应的下标maxi就是直径的一个端点。
> - 接着在计算直径长度的时候，以maxi为树根，再来一次上述的维护dist数组的过程，最终dist[1~n]中的最大值就是树的直径的长度
>
> 时间复杂度：$O(n)$

```cpp
const int N = 100010;
typedef long long ll;

struct Node {
    int id;
    ll w;
};

int n;
vector<Node> G[N];
bool st[N];
ll sum, d, dist[N];

/**
 * @note 计算当前所有子结点到当前点的距离
 * @param now 当前点的编号
 * @param x 上一个点到当前点的距离
 */
void dfs(int now, ll x) {
    if (!st[now]) {
        st[now] = true;
        dist[now] = x;
        for (int i = 0; i < G[now].size(); i++) {
            int ch = G[now][i].id;
            dfs(ch, x + G[now][i].w);
        }
    }
}

void solve() {
    cin >> n;
    for (int i = 0; i < n - 1; i++) {
        int a, b, w;
        cin >> a >> b >> w;
        sum += w;
        G[a].push_back({b, w});
        G[b].push_back({a, w});
    }

    // 以1号点为根，计算所有点到1号点的距离
    dfs(1, 0);

    memset(st, 0, sizeof st);

    // 到1号点最远的那个点的编号 maxi，即直径的一个端点
    int maxi = 0;
    for (int i = 1; i <= n; i++) {
        if (dist[i] > dist[maxi]) {
            maxi = i;
        }
    }

    // 以直径的一个端点 maxi 为根，计算所有点到 maxi 点的距离
    dfs(maxi, 0);

    // 找到直径长度
    for (int i = 1; i <= n; i++) {
        d = max(d, dist[i]);
    }

    cout << sum * 2 - d << "\n";
}
```

### 8. Codeforces rating

<https://vijos.org/d/nnu_contest/p/1532>

> 题意：现在已知一个初始值R，现在给定了n个P值，选择其中的合适的值，使得最终的 $R'=3/4 R + 1/4 P$ 最大
>
> 思路：首先一点就是我们一定要选择P比当前R大的值，接下来就是选择合适的P使得最终迭代出来的R'最大。首先我们知道，对于筛选出来的比当前R大的P集合，任意选择其中的一个P，都会让R增大，但是不管增加多少都是不会超过选择的P。那么显然，如果筛选出来的P集合是一个递增序列，那么就可以让R不断的增加。但是这一定是最大的吗？我们不妨反证一下，现在我们有两个P，分别为x，y，其中 $x<y$。
>
> 那么按照上述思路，首先就是 
>
> $$
> R'=\frac{3}{4}R+\frac{1}{4}x(R'<x)
> $$
>
> 接着就是 
>
> $$
> R''_1=\frac{3}{4}R'+\frac{1}{4}y(R''_1<y)=\frac{9}{16}R+\frac{3}{16}x+\frac{1}{4}y
> $$
>
> **反之**，首先选择一个较大的P=y，再选择一个较小的P=x，即首先就是
>
> $$
> R'=\frac{3}{4}R+\frac{1}{4}y(R'<y)
> $$
>
> 此时我们还不一点可以继续选择x，因为此时的R'可能已经超过了x的值，那么我们按照最优的情况计算，可以选择x，那么就是
>
> $$
> R''_2=\frac{3}{4}R'+\frac{1}{4}x(R''_2<x)=\frac{9}{16}R+\frac{3}{16}y+\frac{1}{4}x
> $$
>
> 可以发现
>
> $$
> R''_2-R''_1=\frac{1}{16}(x-y)<0
> $$
>
> 即会使得最终的答案变小。因此最优的策略就是按照增序进行叠加计算
>
> ==注意点：==
>
> 四舍五入的语句
>
> ```cpp
> cout << (int)(res + 0.5) << "\n";
> ```

```cpp
void solve() {
    cin >> n >> k;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    sort(a, a + n);

    int i = 0;
    for (; i < n; i++) {
        if (a[i] > k) {
            break;
        }
    }

    double res = k;

    for (; i < n; i++) {
        res = (res * 3.0 + a[i] * 1.0) / 4.0;
    }

    cout << (int)(res + 0.5) << "\n";
}
```

### 9. 货运公司

<https://www.acwing.com/problem/content/5380/>

> 题意：给定 $n$ 个运货订单，每个订单需要运送一定量的货物，同时给予一定量的报酬。现在有 $k$ 个卡车进行运送，每个卡车有运送容量。需要合理规划卡车的装配，使得最终获得的总报酬最大。有以下约束条件：
>
> - **每一个订单**只能用一辆货车运送
> - **每一辆货车**只能运送不超过最大容量的货物
> - **每一辆货车**只能运送一次
> - **每一辆货车**在装得下的情况下只能装运一个订单
>
> 思路：一开始尝试采用 01 背包的思路，但是题目中货物是否可以被运送是取决于卡车的装载的。思考无果后考虑贪心。**考虑一般情况**
>
> - 为了让总收益最大，很显然报酬越多，就越优先选择该订单
>
> - 在报酬一致时，货物量越少，就越优先选择该订单
>
> - 按照上述规则对订单排序后，我们需要安排合理的货车进行运输。我们优先将运输量小的货车安排给合适的订单。因为运输量大的货车既可以满足当前订单，同样也满足后续的订单，那么为了最大化增加利润，就需要在运输量小的货车满足当前订单时，保留运输量大的货车用于后续的订单。我们可以画一个图进一步理解为什么这么安排货车进行运输：
>
>     <img src="D:/BaiduSyncdisk/_images/typora-user-images/202402012332958.png" alt="image-20231223222627134" style="zoom: 50%;" />
>
>     <div style="text-align: center">图例：我们按照上述红笔的需要进行货车的选择进行运输</div>
>
>     如果红色序号顺序变掉了，则就不能将上述图例中的 6 个订单全部运输了
>
> 时间复杂度 $O(nk)$

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 1010;

struct Item {
    int id, weight, money;
    bool operator< (const Item& t) const {
        if (money != t.money) return money > t.money;
        else return weight < t.weight;
    }
} item[N];

struct Car {
    int id, v;
    bool operator< (const Car& t) const {
        return v < t.v;
    }
} car[N];

pair<int, int> res[N];
bool vis[N];
int cnt, sum;

void solve() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        item[i].id = i;
        cin >> item[i].weight >> item[i].money;
    }

    int k;
    cin >> k;
    for (int i = 1; i <= k; i++) {
        car[i].id = i;
        cin >> car[i].v;
    }

    sort(item + 1, item + n + 1);
    sort(car + 1, car + k + 1);

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= k; j++) {
            if (!vis[j] && car[j].v >= item[i].weight) {
                sum += item[i].money;
                vis[j] = true;
                res[cnt++] = {item[i].id, car[j].id};
                break;
            }
        }
    }

    cout << cnt << " " << sum << "\n";

    for (int i = 0; i < cnt; i++) {
        cout << res[i].first << " " << res[i].second << "\n";
    }
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

### 10. 部分背包问题

<https://www.luogu.com.cn/problem/P2240>

> - 题意：给定一组物品，每一个物品有一定的重量与价值，现在给定一个背包总承重，需要从中选择合适的物品进行装载，使得最终装载的物品的总价值最大。现在规定每一个物品可以进行随意分割，按照单位重量计算价值
> - 思路：**考虑一般情况**。很显然，如果不说可以随意分割，那就是一个 01 背包，既然说了可以随意分割，那就直接贪心选择即可，按照单位重量的价值降序进行选择
> - 时间复杂度：$O(n \log n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 110;

int n, W;
double res;

struct Item {
    double w;
    double val;
    
    bool operator< (const Item& t) const {
        return this->val / this->w > t.val / t.w;
    }
} a[N];

void solve() {
    cin >> n >> W;
    for (int i = 0; i < n; i++) cin >> a[i].w >> a[i].val;    
    
    sort(a, a + n);
    
    for (int i = 0; i < n; i++) {
        if (W > a[i].w) {
            W -= a[i].w;
            res += a[i].val;
        } else {
            res += W * a[i].val / a[i].w;
            break;
        }
    }
    
    cout << fixed << setprecision(2) << res << "\n";
}

signed main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    cout << fixed << setprecision(2);
    int T = 1;
//    cin >> T;
    while (T--) solve();
    return 0;
}
```

### 11. 排队接水

<https://www.luogu.com.cn/problem/P1223>

> - 题意：贪心经典，排队接水，每一个人都有一个打水时间，现在询问如何排队能够使得平均等待时间最短
>
> - 思路：**考虑一般情况**。注意问的是平均等待时间，如果是打完水总花费时间那就是一个定值，即所有人打水的时间总和。现在为了让平均等待时间最短，我们的第一反应应该是，在人多的时候让打水时间短的先打，人少的时候让打水时间长的再打，那么很显然就是按照打水时间的升序进行排队。为了证明这个结论，我们采用数学归纳法，如下，对于一个排队序列来说，我们将其中的两个顺序进行颠倒，计算结果得到让打水时间短的排在前面更优，进而推广到一般情况，于是按照打水时间升序进行打水的策略是最优的。证毕
>
>     <img src="D:/BaiduSyncdisk/_images/typora-user-images/202402012332959.png" alt="demo" style="zoom: 67%;" />
>
> - 时间复杂度：$O(n \log n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 1010;

int n;

struct Item {
    int time;
    int i;
    
    bool operator< (const Item& t) const {
        return this->time < t.time;
    }
} a[N]; 

void solve() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> a[i].time;
        a[i].i = i;
    }
    
    sort(a + 1, a + n + 1);
    
    double sum = 0;
    
    for (int i = 1; i <= n; i++) {
        sum += a[i].time * (n - i);
        cout << a[i].i << " \n"[i == n];
    }
    
    cout << fixed << setprecision(2) << sum / n << "\n";
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

### 12. 线段覆盖

<https://www.luogu.com.cn/problem/P1803>

> - 题意：给定一个数轴和数轴上的 n 个线段，现在需要从中选出尽可能多的 k 个线段，使得线段之间两两不相交，问 k 最大是多少
> - 思路：绞尽脑汁想着各种情况进行分类讨论，什么包含、相交、相离，但是都忽视了最重要的一点，那就是一开始应该选择线段。即**考虑边界**，对于最左侧我们应该选择哪一条线段呢？答案是最左侧的右端点最靠左的那一条线段，这样子后续的线段才能有更多的摆放空间
> - 时间复杂度：$O(n \log n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 1000010;

int n;

struct Item {
    int l, r;
    bool operator< (const Item& t) const {
        return this->r < t.r;
    }
} a[N];

void solve() {
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> a[i].l >> a[i].r;
    
    sort(a + 1, a + n + 1);
    
    int right = -1, res = 0;
    
    for (int i = 1; i <= n; i++) {
        if (a[i].l >= right) {
            res++;
            right = a[i].r;
        }
    }
    
    cout << res << "\n";
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

### 13. 小A的糖果

<https://www.luogu.com.cn/problem/P3817>

>- 题意：给定一个序列，现在每次可以选择序列中的某个数进行减一操作，问最少需要减多少可以使得序列中相邻两个元素之和不超过规定的数值 x
>- 思路：同 T12 的思路展开，**考虑边界**，我们直接从任意的一个边界开始思考，假设从左边界开始考虑。为了让左边界满足，那么 a[1] 与 a[2] 之和就需要满足条件，为了后续可以尽可能少的进行减一操作，很显然我们最好从两个数的右边的数开始下手，于是贪心的结果就有了
>- 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 100010;

int n, x;
int a[N];

void solve() {
    cin >> n >> x;
    for (int i = 1; i <= n; i++) cin >> a[i];
    
    int res = 0;
    
    for (int i = 2; i <= n; i++) {
        if (a[i] + a[i - 1] > x) {
            int eat = a[i] + a[i - 1] - x;
            res += eat;
            a[i] = a[i] >= eat ? a[i] - eat : 0;
        }
    }
    
    cout << res << "\n";
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

### 15. 陶陶摘苹果（升级版）

<https://www.luogu.com.cn/problem/P1478>

> - 题意：现在有 n 个苹果，含有高度和消耗体力值两个属性，现在你有一个最大高度以及总体力值，每次只能摘高度值不超过最大高度的苹果且会消耗相应的体力值。问最多可以摘多少个苹果
> - 思路：既然是想要摘的苹果尽可能多，那么高度都是浮云，体力值才是关键。为了摘得尽可能多的苹果，自然是消耗体力越少越优先摘。于是按照消耗体力值升序排序后，扫描一遍即可计数
> - 时间复杂度：$O(n\log n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 5010;

int n, s;
int aa, bb;

struct Apple {
    int h, cost;
    bool operator< (const Apple& t) const {
        return this->cost < t.cost;
    }
} a[N];

void solve() {
    cin >> n >> s;
    cin >> aa >> bb;
    for (int i = 1; i <= n; i++) cin >> a[i].h >> a[i].cost;
    
    sort(a + 1, a + n + 1);
    
    int cnt = 0;
    
    for (int i = 1; i <= n; i++) {
        if (s >= a[i].cost && a[i].h <= aa + bb) {
            cnt++;
            s -= a[i].cost;
        }
    }
    
    cout << cnt << "\n";
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

### 16. [NOIP2018 提高组] 铺设道路

<https://www.luogu.com.cn/problem/P5019>

>- 题意：给定一个序列，每次可以选择一个连续的区间使得其中的所有数 -1，前提是区间中的数都要 > 1，问最少选择几次区间可以将所有的数全部都减到 0
>
>- 思路：很显然的一个贪心思路就是，对于一个数，左右两侧均呈现递减的趋势，那么这个区间的选择数就是这个最大的数的值。但是这不符合代码逻辑，我们尝试**从端点开始考虑**。为了更好的理解，我们从递推的角度进行推演。假设填平前 i 个数花费的选择次数为 f[i]，那么对于第一个数 a[1]，我们一定需要花费 a[1] 次选择来将其减到零，于是 f[1] = a[1]；对于后续的数而言，可以发现
>
>   - 如果 a[i] > a[i-1]，那么之前的选择没有完全波及当前的数，还需要一定的次数来将其减到零，于是 `f[i] = f[i-1] + a[i] - a[i-1]`
>   - 如果 a[i] $\le$ a[i-1]，那么当前的数值一定会被之前的选择“波及”而直接减到零，于是 `f[i] = f[i-1]`
>
>   从递推的角度理解之后我们直接滚动一遍数组记录増势即可
>
>- 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 100010;

int n, a[N];

void solve() {
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> a[i];
    
    int res = a[1];
    
    for (int i = 2; i <= n; i++)
        if (a[i] > a[i - 1])
            res += a[i] - a[i - 1];
    
    cout << res << "\n";
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

### 17. [USACO1.3] 混合牛奶 Mixing Milk

<https://www.luogu.com.cn/problem/P1208>

> - 题意：现在需要收集 need 容量的牛奶，同时有 n 个农户提供奶源，每一个商户的奶源有一定的数量与单价，问如何采购可以在满足需求 need 的情况下成本最低化
> - 思路：很显然单价越低越优先采购
> - 时间复杂度：$O(n \log n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 2000010;

int need, n;

struct Milk {
    int per, tot;
    bool operator< (const Milk& t) const {
        return per < t.per;
    }
} a[N];

void solve() {
    cin >> need >> n;
    for (int i = 1; i <= n; i++) cin >> a[i].per >> a[i].tot;
    
    sort(a + 1, a + n + 1);
    
    int res = 0;
    
    for (int i = 1; i <= n; i++) {
        if (need >= a[i].tot) {
            need -= a[i].tot;
            res += a[i].tot * a[i].per;
        } else {
            res += need * a[i].per;
            need = 0;
        }
    }
    
    cout << res << "\n";
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

### 18. [NOIP2007 普及组] 纪念品分组

<https://www.luogu.com.cn/problem/P1094>


> - 题意：给定 n 个数，问如何分组可以使得在每一组之和不超过定值 lim 且每一组最多两个数的情况下，分得的组数最少
> - 思路：对序列没有要求，显然直接排序然后**从一端开始考虑**。首先有一个概念就是，为了尽可能的减少分得的组数，那么一定想要每一组分完后距离 lim 的差距越小越好。我们将 n 个数降序排序后，从最大值开始考虑，对于当前的数，为了找到一个数与当前数之和尽可能接近 lim，从贪心的角度来说一定是从当前数之后开始寻找那个配对的数从而使得两数之和与 lim 的差距最小，那么时间复杂度就是 $O(n^2)$。但是由于题目说了最多只有两个数，我们不妨换一种寻找配对数的策略，可以从原始的寻找方法得到启发，可以发现，原始的寻找配对数的方法中，如果找到的那个配对数可以与当前数之和不超过 lim 且之和尽可能的大，那么这个寻找到的配对数也一定可以和当前数的下一个数进行配对。由于我们一组只能有两个数，因此我们不用考虑两数组合之后比 lim 小的数尽可能的小，只需要考虑两个数能否组合即可，因此我们直接双指针进行寻找配对数操作即可
> - 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 30010;

int lim, n;
int a[N];

void solve() {
    cin >> lim >> n;
    for (int i = 1; i <= n; i++) cin >> a[i];
    
    sort(a + 1, a + n + 1, [&](int x, int y) {
        return x > y;
    });
    
    int res = 0, l = 1, r = n;
    
    while (l < r) {
        if (a[l] + a[r] <= lim) r--;
        l++, res++;
    }
    
    if (l == r) res++;
    
    cout << res << "\n";
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

### 19. 跳跳！

<https://www.luogu.com.cn/problem/P4995>

> - 题意：给定 n 个数，每一个数代表一个高度，现在有一只青蛙从地面（高度为 0）开始起跳，每一个数字只能被跳上去一次。问如何设定跳数顺序 h[]，可以使得下式尽可能的大
>     $$
>     \sum_{i=1}^n (h_i-h_{i-1})^2
>     $$
>
> - 思路：题目意思其实就是让每一次跳跃的两个高度之差尽可能的大。那么一个贪心的思路就是从地面跳到最高，再从最高跳到次低，接着从次低跳到次高，以此类推得到的结果就是最优解，为了证明我们可以用数学归纳法，假设当前只有两个高度可以选择，那么肯定是先跳高的再跳低的；假设当前有三个高度可以选择，那么可以证明先从地面跳到最高处，再跳到最低处，最后跳到第二高的方法得到的值最大
>
> - 时间复杂度：$O(n \log n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 310;

int n, a[N];

void solve() {
    cin >> n;
    for (int i = 1; i <= n; i++) cin >> a[i];

    sort(a + 1, a + n + 1, [&](int x, int y) {
        return x > y;
    });

    int res = a[1] * a[1], l = 1, r = n;
    
    while (l < r) {
        res += (a[l] - a[r]) * (a[l] - a[r]);
        l++;
        if (l < r) {
            res += (a[l] - a[r]) * (a[l] - a[r]);
            r--;
        }
    }
    
    cout << res << "\n";
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

### 20. 安排时间

<https://www.acwing.com/problem/content/5466/>

> - 题意：给定 n 个时间段处理餐厅事务，m 个用餐预定信息，含有三个信息分别为订单发起时间，订单需要准备的时间，客人来用餐时间。问如何安排每一个时间段，可以让所有的用户得到正常的服务。如果不能全部满足则输出 -1
> - 思路：玄学贪心，先到的用户先做它的菜
> - 时间复杂度：$O(n^2)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 110;

int n, m;
int res[N];

struct Item {
    int id;
    int begi, arri, time;
    bool operator< (const Item& t) const {
        return arri < t.arri;
    }
} a[N];

void solve() {
    cin >> n >> m;
    for (int i = 1; i <= m; i++) {
        cin >> a[i].begi >> a[i].arri >> a[i].time;
        a[i].id = i;
        res[a[i].arri] = m + 1; // 接客 
    }
    
    sort(a + 1, a + m + 1);
    
    for (int i = 1; i <= m; i++) {
        int t = a[i].time;
        for (int j = a[i].begi; j <= a[i].arri - 1; j++) {
            if (t > 0 && !res[j]) {
                res[j] = a[i].id; // 做菜 
                t--;
            }
        }
        
        if (t) {
            cout << -1 << "\n";
            return;
        }
    }
    
    for (int i = 1; i <= n; i++) cout << res[i] << " \n"[i == n];
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

### 21. [NOIP2004 提高组] 合并果子

<https://www.luogu.com.cn/problem/P1090>

> - 题意：给定 n 个数，现在需要将其两两合并为最终的一个数，每次合并的代价是两个数之和，问如何对这些数进行合并可以使得总代价最小
> - 思路：很显然一共需要合并 n-1 次。那么我们从三个物品开始考虑，然后使用数学归纳法推导到 n 个数。对于三个物品，很显然先将两个物品进行合并，再将这个结果与最大的数进行合并方案时最优的。那么推广到 n 个数，我们只需要每次合并当前局面中最小的两个数即可
> - 时间复杂度：$O(n \log n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 10010;

int n, a[N];
priority_queue<int, vector<int>, greater<int>> q;
int res;

void solve() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        q.push(x);
    }
    
    for (int i = 1; i <= n - 1; i++) {
        int a = q.top(); q.pop();
        int b = q.top(); q.pop();
        
        res += a + b;
        
        q.push(a + b);
    }
    
    cout << res << "\n";
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

### 22. 删数问题

<https://www.luogu.com.cn/problem/P1106>

> - 题意：给定一个数字字符串长度为 n，现在需要选择其中的 m 位数，使得这 m 位组成的数最小是多少 (m=n-k)
> - 思路：**我们从一端考虑问题**。为了组成的数尽可能的小，我们希望从首位开始就尽可能的小，同时如果有重复的数字，就选择最左侧的，剩余的数字留给后续的位数继续选择。有一个需要注意的点就是选择每一位的数字时，范围的约束，我们假设需要从 10 位的数字串中选择 3 位，那么我们第一次选择时需要在 0-7位中选择一位，第二次选择在 上次选择的下一个位置到第8位中选择一位，以此类推进行贪心选择
> - 时间复杂度：$O(n^2)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

string s, res;
int k;

void solve() {
    cin >> s >> k;
    int n = s.size();
    
    // 特判保留的数字个数 n-k 为负数的情况 
    if (n - k <= 0) {
        cout << 0 << "\n";
        return;
    }
    
    // 循环 n-k 次选择保留的数 
    int l = 0, r = k;
    for (int i = 0; i < n - k; i++) {
        int idx = -1;
        for (int j = l; j <= r; j++)
            if (idx == -1 || s[j] < s[idx])
                idx = j;
        
        res += s[idx];
        
        l = idx + 1, r++;
    }
    
    // 删除前导零 
    int i = 0;
    while (res[i] == '0') i++;
    
    // 输出结果 
    if (i == res.size()) 
        cout << 0;
    else
        for (int j = i; j < res.size(); j++) 
            cout << res[j];
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

### 23. 截断数组

<https://www.acwing.com/problem/content/5483/>

> 题意：定义平衡数组为奇偶数数量相同的数组，现在给定一个平衡数组，和一个总成本数，最多可以将原数组截成多少截子平衡数组，且截断代价总和不超过总成本，截断代价计算公式为 $|a_i-a_{i+1}|$
>
> 思路：我们直接枚举所有的可以被截断的位置，统计所有的代价值，然后根据成本总数按降序枚举代价值即可
>
> 时间复杂度：$O(n \log n)$

```cpp
#include <iostream>
#include <queue>
#include <cstring>
#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

const int N = 110;

int n, b;
int a[N], odd[N], even[N];

void solve() {
    cin >> n >> b;
    
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        if (a[i] % 2 == 0) {
            even[i] = even[i - 1] + 1;
            odd[i] = odd[i - 1];
        } else {
            even[i] = even[i - 1];
            odd[i] = odd[i - 1] + 1;
        }
    }
    
    vector<int> c;
    for (int i = 2; i <= n - 2; i += 2) {
        if (odd[i] == even[i]) {
            c.push_back(abs(a[i] - a[i + 1]));
        }
    }
    
    int res = 0;
    sort(c.begin(), c.end());
    for (auto& x: c) {
        if (b >= x) {
            b -= x;
            res++;
        }
    }
    
    cout << res;
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

### 24. 修改后的最大二进制字符串

<https://leetcode.cn/problems/maximum-binary-string-after-change/description/>

> 题意：给定一个仅由01组成的字符串，现在可以执行下面两种操作任意次，使得最终的字符串对应的十进制数值最大，给出最终的字符串
>
> 1. $00 \to 10$
> 2. $10 \to 01$
>
> 思路：
>
> - 有点像之前做的翻转转化为平移的问题，事实确实如此。首先需要确定一点就是：如果字符串起始有连续的1，则保留，因为两种操作都是针对0的。接着就是对从第一个0开始的尾串处理的思路
> - 对于尾串而言，我们自然希望1越多、越靠前越好，但是第二种操作只能将1向后移，第一种操作又必须要连续的两个0，因此我们就产生了这样的贪心思路：将所有的1通过操作二移动到串尾，接着对尾串的开头连续的0串执行第二种操作，这样就可以得到最大数值的二进制串
>
> 时间复杂度：$O(n)$

```cpp
class Solution {
public:
    string maximumBinaryString(string binary) {
        int n = binary.size();

        string res;

        // 前缀1全部加入答案
        int i = 0;
        for (i = 0; i < n; i++) {
            if (binary[i] == '0') {
                break;
            }
            else {
                res += '1';
            }
        }

        // 非前缀1的部分一定可以操作为 00...011..1，进而转化为 11...11011...1
        int zero = count(binary.begin() + i, binary.end(), '0');
        if (zero > 0) {
            for (int j = 0; j < zero - 1; j++) res += '1';
            res += '0';
        }

        while (res.size() < n) res += '1';

        return res;
    }
};
```

### 25. 子序列最大优雅度

<https://leetcode.cn/problems/maximum-elegance-of-a-k-length-subsequence/>

> 标签：反悔贪心
>
> 题意：给定长度为 n 的物品序列，现在需要从中寻找一个长度为 k 的子序列使得子序列的总价值最大，给出最终的最大价值。一个序列的价值定义为每个物品的 **本身价值之和** + **物品种类数的平方**
>
> 思路：我们采用反悔贪心的思路。首先按照物品本身价值进行降序排序并选择前 k 个物品作为集合 S，然后按顺序枚举剩下的物品进行替换决策。我们记每个物品有一个「本身价值」，集合 S 有一个「种类价值」。那么就会遇到下面两种情况：
>
> - 第 i 个物品对应的种类**存在**集合 S 中。此时该物品「一定不选」，因为无论当前物品替代集合中的 S 哪一个物品，本身价值的贡献会下降、种类价值的贡献保持不变。
> - 第 i 个物品对应的种类**不在**集合 S 中。此时该物品一定选择吗？不一定。有两种情况：
>     - 集合 S 没有重复种类的物品。此时该物品「一定不选」，同样的，无论当前物品替代集合中的 S 哪一个物品，本身价值的贡献会下降、种类价值的贡献保持不变。
>     - 集合 S 存在重复种类的物品。此时该物品「一定选」，因为一定可以提升种类价值的贡献，至于减去本身价值的损失后是否使得总贡献增加，并不具备可能的性质，只能每次替换物品时**更新全局答案**进行记录。
>
> 时间复杂度：$O(n \log n)$

```cpp []
class Solution {
public:
    long long findMaximumElegance(std::vector<std::vector<int>>& items, int k) {
        using ll = long long;

        std::sort(items.rbegin(), items.rend());

        ll t = 0, cat = 0, res = 0;
        std::unordered_map<int, int> cnt;
        std::stack<ll> stk;

        for (int i = 0; i < items.size(); i++) {
            ll v = items[i][0], c = items[i][1];
            if (i < k) {
                // 前 k 个物品
                t += v;
                cnt[c]++;
                cat += cnt[c] == 1;
                if (cnt[c] > 1) {
                    stk.push(v);
                }
            } else {
                // 后 n-k 个物品
                if (cnt[c]) {
                    // 已经出现过的物品种类
                    continue;
                } else {
                    // 没有出现过的物品种类
                    if (stk.size()) {
                        cat++;
                        t -= stk.top();
                        t += v;

                        stk.pop();
                        cnt[c]++;
                    }
                }
            }
            // 更新全局答案
            res = max(res, t + cat * cat);
        }

        return res;
    }
};
```

```python []
class Solution:
    def findMaximumElegance(self, items: List[List[int]], k: int) -> int:
        from collections import defaultdict
        items.sort(reverse=True)

        t, cat, res = 0, 0, 0
        cnt, stk = defaultdict(int), []

        for i in range(len(items)):
            v, c = items[i][0], items[i][1]
            if i < k:
                t += v
                cnt[c] += 1
                cat += cnt[c] == 1
                if cnt[c] > 1:
                    stk.append(v)
            else:
                if cnt[c]:
                    continue
                else:
                    if len(stk):
                        t -= stk[-1]
                        t += v
                        cat += 1
                        stk.pop()
                        cnt[c] += 1
            res = max(res, t + cat**2)

        return res
```

### 起床困难综合症

<https://www.acwing.com/problem/content/1000/>

> 标签：按位贪心、分类讨论。
>
> 题意：给定 $n$ 个运算数和对应的 $n$ 个操作，仅有 `&, |, ^` 三种。现在需要选择一个数 $num \in [0,m]$ 使得 $num$ 经过这 $n$ 个二元运算后得到的结果 $res$ 最大。给出最终的 $res$。
>
> 思路：首先不难发现这些运算操作在二进制位上是相互独立的，没有进位或结尾的情况，因此我们可以「按二进制位」单独考虑。由于运算数和 $m$ 均 $\le 10^9$，因此我们枚举 $[0,30]$ 对应的二进制位。接下来我们单独考虑第 $i$ 位的情况，显然的 $num$ 的第 $i$ 位可以取 $1$ 也可以取 $0$，对应的 $res$ 的第 $i$ 位可以取 $1$ 也可以取 $0$。有以下 $2^2$ 种运算情况：
>
> |        | $\text{num 的第 i 位填 1 $\to$ res 第 i 位的情况}$ | $\text{num 的第 i 位填 0 $\to$ res 第 i 位的情况}$ |      选择方案      |
> | :----: | :------------------------------------------------: | :------------------------------------------------: | :----------------: |
> | 情况一 |                     $1 \to 0$                      |                     $0 \to 0$                      | num 填 0，res 填 0 |
> | 情况二 |                     $1 \to 0$                      |                     $0 \to 1$                      | num 填 0，res 填 1 |
> | 情况三 |                     $1 \to 1$                      |                     $0 \to 0$                      |        待定        |
> | 情况四 |                     $1 \to 1$                      |                     $0 \to 1$                      | num 填 0，res 填 1 |
>
> 选择方案时我们需要考虑两个约束，$num$ 不能超过 $m$，$res$ 尽可能大，因此有了上述表格第四列的贪心选择结果。之所以情况三待定是因为其对两种约束的相互矛盾的，并且其余情况没有增加 $num$，即对 $num$ 上限的约束仅存在于情况三。假设有 $k$ 位是上述情况三，那么显然的其余位枚举顺序是随意的，因为答案是固定的。对于 $k$ 个情况三，从贪心的角度考虑，我们希望 $res$ 尽可能大，那么就有「高位能出 $1$ 就出 $1$」的结论。因此我们需要从高位到低位逆序枚举这 $k$ 个情况三，由于其他位枚举顺序随意，因此总体就是从高位到低位枚举。
>
> 时间复杂度：$O(n \log m)$

```cpp
#include <bits/stdc++.h>

using ll = long long;
using namespace std;

void solve() {
    int n, m;
    cin >> n >> m;
    
    vector<pair<string, int>> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i].first >> a[i].second;
    }
    
    int res = 0, num = 0;
    for (int i = 30; i >= 0; i--) {
        int x = 1 << i, y = 0;
        for (int j = 0; j < n; j++) {
            string op = a[j].first;
            int t = a[j].second & (1 << i);
            if (op == "AND") {
                x &= t, y &= t;
            } else if (op == "OR") {
                x |= t, y |= t;
            } else {
                x ^= t, y ^= t;
            }
        }
        if ((num | (1 << i)) <= m && x > y) {
            num |= 1 << i;
            res |= 1 << i;
        } else {
            res += y;
        }
    }
    
    cout << res << "\n";
}

signed main() {
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);
    int T = 1;
//    std::cin >> T;
    while (T--) solve();
    return 0;
}
```

## 前缀和与差分

前缀和是正向思维，差分是前缀和的逆向思维。

### 【差分/排序】充能计划

<https://www.lanqiao.cn/problems/8732/learning/?contest_id=147>

> 题意：给定 $n$ 个数初始化为 $0$，现在给定 $q$ 个位置，每个位置给定两个参数 $p,k$，表示从第 $k$ 个数开始连续 $s[p]$ 个数 $+1$，返回最终每一个位置的数值。+1 操作有以下两种约束：
>
> 1. 如果连续 $s[p]$ 个数越界了，则越界的部分就不 $+1$
> 2. 一个位置最多只能被一种 $p$ 对应的种类 $+1$
>
> 思路：
>
> - 现在假设只有一个种类的p，如果不考虑上述第二个条件的约束，那么就是纯差分。如果考虑了，那么我们从左到右考虑+1区间覆盖的问题，就需要判断当前位置是否被上一个+1区间覆盖过，解决办法就是**记录上一个区间覆盖的起始点or终止点**，这里选择起始点。
> - 现在我们考虑多个种类的p，那么就是分种类重复上述思路即可，因为不同种类之间是没有约束上的冲突的。那么如何分种类解决呢，我们可以对输入的q个位置的所有p、k参数进行排序，p为第一关键词，k为第二个关键词。
> - 时间复杂度：$\Theta(q\log q+q+n)$

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

const int N = 100010;

struct node {
    int p, k; // 第p种宝石丢在了第k个坑
    bool operator<(const node &t) const {
        if (p == t.p) {
            return k > t.k;
        } else {
            return p > t.p;
        }
    }
};

int n, m, q, s[N]; // n个坑，m种宝石，q个采集的宝石，s[i]表示第i种宝石的能量
vector<int> last(N, -1e6); // last[i]表示上一个第i种宝石的位置
int a[N], b[N]; // a[]为原数组，b[]为差分数组
priority_queue<node> que;

void solve() {
    cin >> n >> m >> q;
    for (int i = 1; i <= m; i++) {
        cin >> s[i];
    }

    while (q--) {
        int p, k;
        cin >> p >> k;
        que.push({p, k});
    }

    while (que.size()) {
        auto h = que.top();
        que.pop();
        int p = h.p, k = h.k; // 第p种宝石丢在了第k个坑

        int l, r;
        if (k - last[p] >= s[p]) {
            // 和上一种没有重叠
            l = k, r = min(n, k + s[p] - 1);
            b[l]++, b[r + 1]--;
            last[p] = k;
        } else {
            // 和上一种有重叠
            l = last[p] + s[p];
            r = min(n, k + s[p] - 1);
            if (l <= r) {
                b[l]++, b[r + 1]--;
            }
            last[p] = k;
        }
    }

    for (int i = 1; i <= n; i++) {
        a[i] = a[i - 1] + b[i];
        cout << a[i] << " \n"[i == n];
    }
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

### 【前缀和/二分答案】或值至少为 K 的最短子数组 II

<https://leetcode.cn/problems/shortest-subarray-with-or-at-least-k-ii/description/>

> 题意：给定一个序列，问其中所有连续的序列中，所有元素或值的结果超过 k 的序列长度最短是多少
>
> - 思路一：**枚举**。很显然我们可以枚举所有的长度、所有的序列、所有的或值进行判断
>
>     时间复杂度：$O(n^3)$
>
> - 思路二：**二分**。可以发现序列的长度越长，序列中所有元素的或值越有可能超过 k，可以二分答案。但是对于每一次二分出来的答案，检查函数都需要 $O(n^2)$ 来完成
>
>     时间复杂度：$O(n^2\log n)$
>
> - 思路三：**二分＋前缀和**。有没有什么方法可以加速检查呢？答案是有的。我们从或运算的根本出发，序列中所有元素的或值取决于每一个数的每一个二进制位。对于所有的序列中的数来说，如果第 `j` 个二进制位出现了 `1`，则无论别的数什么情况，最终这一位或出来的结果一定是 `1 << j`。于是对于 $O(n)$ 的或运算，我们就可以通过前缀和的方式简化为 $O(30)$。即我们利用二维数组存储每一个数的二进制位的结果，其中 `a[i][j]` 表示前 i 个数的第 j 个二进制位的相加的结果。后续在计算区间中元素的或值时，只需要检查区间中 30 个二进制位是否含有 1 即可。
>
>     时间复杂度：$O(30n\log n)$

```cpp
const int N = 2e5 + 10;

int a[N][35];

class Solution {
public:
    bool chk(int x, vector<int>& nums, int k) {
        int n = nums.size();

        for (int i = x; i <= n; i++) {
            int res = 0;
            for (int j = 0; j <= 30; j++) {
                if (a[i][j] - a[i - x][j]) res += 1 << j;
            }
            if (res >= k) return true;
        }

        return false;
    }

    int minimumSubarrayLength(vector<int>& nums, int k) {
        int n = nums.size();

        // 维护前缀和
        for (int i = 1; i <= n; i++) {
            for (int j = 0; j <= 30; j++) {
                if (1 << j & nums[i - 1]) {
                    a[i][j] = a[i - 1][j] + 1;
                } else {
                    a[i][j] = a[i - 1][j];
                }
            }
        }

        // 二分答案
        int l = 1, r = n;
        while (l < r) {
            int mid = (l + r) >> 1;
            if (chk(mid, nums, k)) r = mid;
            else l = mid + 1;
        }

        // 检查结果
        for (int i = r; i <= n; i++) {
            int res = 0;
            for (int j = 0; j <= 30; j++) {
                if (a[i][j] - a[i - r][j]) {
                    res += 1 << j;
                }
            }
            if (res >= k) return r;
        }

        return -1;
    }
};
```

### 【差分/贪心】增减序列

<https://www.acwing.com/problem/content/description/102/>

> 标签：差分、贪心
>
> 题意：给定一个序列，每次可以对序列中的**子数组**进行同时 `+1` 或 `-1` 的操作，问最少操作多少次可以使得最终的数组所有元素都相等。并给出在最少操作次数的情况下，有多少种操作方案。
>
> 思路：区间同时操作可以联想到差分，我们定义原始数组为 `s[]`，差分数组为 `a[]`，并且下标均从 `1` 开始。那么对于「所有元素都相等」这个约束，可以发现所有元素在操作相等后差分数组 `a[2:n]` 均为 `0`。因此本题转化为对差分数组 `a[2:n]` 中的**元素**进行 `+1` 或 `-1` 操作使得最终的差分数组中 `a[2:n]` 均为 `0`。一个很显然的贪心思路就是每次在 `a[2:n]` 中选择一对符号相反的数，对其正数进行 `-1` 操作，对其负数进行 `+1` 操作。最终可能会因为无法匹配剩余某个正数或负数，我们假设其下标为 `i`，此时的序列就是 `s[1:i]` 全部相等，`s[i+1,n]` 全部相等。我们可以同时调整前缀或同时调整后缀来达到最终序列全部相等的情况。分析到这，最少操作次数和所有满足最少操作次数的方案数就呼之欲出了。
>
> 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>

using ll = long long;
using namespace std;

void solve() {
    int n;
    cin >> n;
    
    vector<int> s(n + 1);
    for (int i = 1; i <= n; i++) {
        cin >> s[i];
    }
    
    ll neg = 0, pos = 0;
    for (int i = 2; i <= n; i++) {
        ll x = s[i] - s[i - 1];
        if (x > 0) pos += x;
        else neg += x;
    }
    
    cout << max(pos, abs(neg)) << "\n" << abs(pos - abs(neg)) + 1 << "\n";
}

signed main() {
    std::ios::sync_with_stdio(false);
    std::cin.tie(nullptr);
    int T = 1;
//    std::cin >> T;
    while (T--) solve();
    return 0;
}
```

```python
from collections import defaultdict
from typing import List, Tuple
from itertools import combinations, permutations
import math, heapq, queue

II = lambda: int(input())
FI = lambda: float(input())
MII = lambda: tuple(map(int, input().split()))
LII = lambda: list(map(int, input().split()))


def solve() -> None:
    n = II()
    s = [0] * (n + 1)
    pos, neg = 0, 0
    for i in range(1, n + 1):
        s[i] = II()
    for i in range(2, n + 1):
        x = s[i] - s[i - 1]
        if x > 0: pos += x
        else: neg += x
    print(f"{max(pos, abs(neg))}\n{abs(pos - abs(neg)) + 1}")


if __name__ == '__main__':
    T = 1
    # T = II()
    while T: solve(); T -= 1
```

## 二分

二分本质上是一个线性的算法思维，只是比线性思维更进一步的是，二分思维需要提炼出题面中两个线性相关的变量，即单调变化的两个变量，从而采用二分加速检索。

### 【二分答案】Building an Aquarium

<https://codeforces.com/contest/1873/problem/E>

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

<https://www.lanqiao.cn/problems/5129/learning/>

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

<https://www.luogu.com.cn/problem/P2440>

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

<https://www.luogu.com.cn/problem/P2678>

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

<https://www.luogu.com.cn/problem/P3853>

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

<https://www.luogu.com.cn/problem/P1182>

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

<https://www.luogu.com.cn/problem/P3743>

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

<https://www.luogu.com.cn/problem/P1525>

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

<https://www.acwing.com/problem/content/5562/>

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

<https://www.acwing.com/problem/content/description/5569/>

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

<https://leetcode.cn/problems/first-completely-painted-row-or-column/description/>

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

<https://leetcode.cn/problems/find-the-median-of-the-uniqueness-array/>

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

<https://codeforces.com/contest/1996/problem/F>

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

## 搜索

无论是深搜还是宽搜，都逃不掉图的思维。我们将搜索图建立起来之后，剩余的编码过程就会跃然纸上。

### 【dfs】机器人的运动范围

<https://www.acwing.com/problem/content/22/>

```cpp
class Solution {
public:
    int res = 0;
    
    int movingCount(int threshold, int rows, int cols)
    {
        if (!rows || !cols) return 0;
        vector<vector<int>> g(rows, vector<int>(cols, 0));
        vector<vector<bool>> vis(rows, vector<bool>(cols, false));
        dfs(g, vis, 0, 0, threshold);
        return res;
    }
    
    void dfs(vector<vector<int>>& g, vector<vector<bool>>& vis, int x, int y, int threshold)
    {
        vis[x][y] = true;
        res ++;
        
        int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};
        for (int k = 0; k < 4; k ++)
        {
            int i = x + dx[k], j = y + dy[k];
            if (i < 0 || i >= int(g.size()) || j < 0 || j >= int(g[0].size()) || vis[i][j] || cnt(i, j) > threshold) continue;
            dfs(g, vis, i, j, threshold);
        }
    }
    
    int cnt(int x, int y)
    {
        int sum = 0;
        while (x) sum += x % 10, x /= 10;
        while (y) sum += y % 10, y /= 10;
        return sum;
    }
};
```

### 【dfs】CCC单词搜索

<https://www.acwing.com/problem/content/5168/>

> 搜索逻辑：分为正十字与斜十字
>
> 更新答案逻辑：需要进行两个条件的约数，一个是是否匹配到了最后一个字母，一个是转弯次数不超过一次
>
> 转弯判断逻辑：
>
>  首先不能是起点开始的
>  对于正十字：如果next的行 & 列都与pre的行和列不相等，就算转弯
>  对于斜十字：如果next的行 | 列有和pre相等的，就算转弯

```cpp
#include <iostream>
#include <algorithm>
#include <cstring>

using namespace std;

const int N = 110;

string s;
int m, n;
char g[N][N];
int res;

// 正十字，a，b为之前的位置，x，y为当前的位置，now为当前待匹配的字母位，cnt为转弯次数
void dfs1(int a, int b, int x, int y, int now, int cnt)
{
    if (g[x][y] != s[now]) return;
    
    if (now == s.size() - 1)
    {
        if (cnt <= 1) res++; 
        return;
    }
    
    int dx[] = {-1, 0, 1, 0}, dy[] = {0, 1, 0, -1};
    
    for (int k = 0; k < 4; k ++)
    {
        int i = x + dx[k], j = y + dy[k];
        if (x < 0 || x >= m || y < 0 || y >= n) continue;
        
        // 判断是否转弯（now不是起点 且 pre和next行列均不相等） 
        if (a != -1 && b != -1 && a != i && b != j) dfs1(x, y, i, j, now + 1, cnt + 1);
        else dfs1(x, y, i, j, now + 1, cnt);
    }
}

// 斜十字
void dfs2(int a, int b, int x, int y, int now, int cnt)
{
    if (g[x][y] != s[now]) return;
    
    if (now == s.size() - 1)
    {
        if (cnt <= 1) res++; 
        return;
    }
    
    int dx[] = {-1, -1, 1, 1}, dy[] = {-1, 1, 1, -1};
    
    for (int k = 0; k < 4; k ++)
    {
        int i = x + dx[k], j = y + dy[k];
        if (x < 0 || x >= m || y < 0 || y >= n) continue;
        
        // 判断是否转弯（now不是起点 且 不在同一对角线） 
        if (a != -1 && b != -1 && (a == i || b == j)) dfs2(x, y, i, j, now + 1, cnt + 1);
        else dfs2(x, y, i, j, now + 1, cnt);
    }
}


int main()
{
    cin >> s;
    cin >> m >> n;
    
    for (int i = 0; i < m; i ++)
        for (int j = 0; j < n; j ++)
            cin >> g[i][j];
    
    for (int i = 0; i < m; i ++)
        for (int j = 0; j < n; j ++)
            dfs1(-1, -1, i, j, 0, 0);
    
    for (int i = 0; i < m; i ++)
        for (int j = 0; j < n; j ++)
            dfs2(-1, -1, i, j, 0, 0);
    
    cout << res << "\n";
    
    return 0;
}
```

### 【dfs/二进制枚举】数量

<https://www.acwing.com/problem/content/5150/>

> 题意：给定一个数n，问[1, n]中有多少个数只含有4或7
>
> 思路一：dfs
>
> - 对于一个数，我们可以构造一个二叉搜数进行搜索，因为每一位只有两种可能，那么从最高位开始搜索。如果当前数超过了n就return，否则就算一个答案
> - 时间复杂度：$\Theta(2^{1 + \lg{(\max(a[i])})})$
>
> 思路二：二进制枚举
>
> - 按照数位进行计算。对于一个 x 位的数，1 到 x-1 位的情况下所有的数都符合条件，对于一个 t 位的数，满情况就是 $2^t$ 种，所以 `[1,x-1]` 位就一共有 $2^1 + 2^2 + \cdots + 2^{x - 1} = 2^{x} - 2$ 种情况 。对于第 x 位，采取二进制枚举与原数进行比较，如果小于原数，则答案 +1，反之结束循环输出答案即可

dfs 代码：

```cpp
#include <iostream>
using namespace std;

#define int long long

int n, res;

void dfs(int x) {
    if (x > n) return;
    
    res ++;
    
    dfs(x * 10 + 4);
    dfs(x * 10 + 7);
}

signed main() {
    cin >> n;
    dfs(4);
    dfs(7);
    cout << res << "\n";
    return 0;
}
```

二进制枚举代码：

```cpp
#include <iostream>
using namespace std;

int WS(int x) {
    int res = 0;
    while (x) {
        res++;
        x /= 10;
    }
    return res;
}

int calc(int a[], int ws) {
    int res = 0;
    for (int i = ws - 1; i >= 0; i --) {
        res = res * 10 + a[i];
    }
    return res;
}

int main() {
    int n;
    cin >> n;
    
    int ws = WS(n);
    
    int ans = (1 << ws) - 2;
    
    int a[20] {};
    for (int i = 0; i < (1 << ws); i ++) {
        for (int j = 0; j < ws; j ++) {
            if ((1 << j) & i) {
                a[j] = 7;
            } else {
                a[j] = 4;
            }
        }
        if (calc(a, ws) <= n) {
            ans ++;
        } else {
            break;
        }
    }
    
    cout << ans;
    
    return 0;
}
```

### 【dfs】组合总和

<https://leetcode.cn/problems/combination-sum/>

> 题意：给定一个序列，其中的元素没有重复，问如何选取其中的元素，使得选出的数字总和为指定的数字target，选取的数字可以重复
>
> 思路：思路比较简答，很容易想到用dfs搜索出所有的组合情况，即对于每一个“结点”，我们直接遍历序列中的元素即可。但是由于题目的限制，即不允许合法的序列经过排序后相等。那么为了解决这个约束，我们可以将最终搜索到的序列排序后进行去重，但是这样的时间复杂度会很高，于是我们从搜索的过程切入。观看这一篇题解 [防止出现重复序列的启蒙题解](https://leetcode.cn/problems/combination-sum/solutions/2363929/39-zu-he-zong-he-hui-su-qing-xi-tu-jie-b-9zx7/)，我们提取其中最关键的一个图解
>
> ![subset_sum_i_pruning.png](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407250146195.png)
>
> 可见3，4和4，3的剩余选项（其中可能包含了答案序列）全部重复，因此我们直接减去这个枝即可。不难发现，我们根据上述优化思想，剪枝的操作可以为：让当前序列开始枚举的下标 `idx` 从上一层开始的下标 `i` 开始，于是剪枝就可以实现了。
>
> 时间复杂度：$\Theta \left ( 2^{\frac{n}{\log n}}\right)$

```cpp
class Solution {
public:
    // 答案数组res，目标数组c，目标总和target，答案数组now，当前总和sum，起始下标idx
    void dfs(vector<vector<int>>& res, vector<int>& c, int target, vector<int>& now, int sum, int idx) {
        if (sum > target) {
            return;
        } else if (sum == target) {
            res.emplace_back(now);
            return;
        }
        for (int i = idx; i < c.size(); i++) {
            now.emplace_back(c[i]);
            dfs(res, c, target, now, sum + c[i], i);
            now.pop_back();
        }
    }

    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> now;
        dfs(res, candidates, target, now, 0, 0);
        return res;
    }
};
```

### 【递归】扩展字符串

<https://www.acwing.com/problem/content/5284/>

> 题意：给定一种字符串的构造方式，问构造n次以后的字符串中的第k个字符是什么
>
> 思路：由于构造的方法是基于上一种情况的，很容易可以想到一个递归搜索树来解决。只是这道题有好几个坑，故记录一下。
>
> - 首先说一下搜索的思路：对于当前的状态，我们想要知道第k个位置上的字符，很显然我们可以通过预处理每一种构造状态下的字符串长度得到下一个字符串的长度，于是我们可以在当前的字符串中，通过比对下标与**五段**字符串长度的大小，来确定是继续递归还是直接输出
> - 特判：可以发现，对于 $n=0$ 的情况，我们无法采用相同的结构进行计算，故进行特判，如果当前来到了最初始的字符串状态，我们直接输出相应位置上的字符即可
> - 最后说一下递归终点的设计：与搜索所有的答案情况不同，这道题的答案是唯一的，因此我们在搜索到答案后，可以通过一个 `bool` 变量作为一个标记，表示已经找到答案了，只需要不断回溯直到回溯结束为止，就不需要再遍历其他的分支了
> - **坑：**这道题的坑说实话有点难崩。
>     1. 首先是一个k的大小，是一定要开 `long long` 的，我一开始直接全局宏定义 `int` 为 `long long` 了
>     2. 还有一个坑可能是只要我才会犯的，就是字符串按照下标输出字符的时候，是需要 `-1` 的，闹心的是我有的加了，有的没加，还是debug的时候调出来的
>     3. 最后一个大坑，属于是引以为戒了。就是这句 `len[i] = min(len[i], (int)2e18)`，因为我们~~可以发现~~，抛开那三个固定长度的字符串来说，每一次新构造出来的字符串长度都是上一个字符串长度 $2$ 倍，那么构造 $n$ 次后的字符串长度就是 $s_0$ 长度的 $2^n$ 倍，那么对于 $n$ 的取值范围来说，直接存储长度肯定是不可取的。那么如何解决这个问题呢？方法是我们对 `len[i]` 进行一个约束即可，见代码。最后进行递归比较长度就没问题了。
> - 时间复杂度：$O(n)$ - 由于每一个构造的状态我们都是常数级别的比较，因此相当于一个状态的搜索时间复杂度为 $O(1)$，那么总合就是 $O(n)$

```cpp
#include <bits/stdc++.h>
using namespace std;

#define int long long

int n, k;
string s = "DKER EPH VOS GOLNJ ER RKH HNG OI RKH UOPMGB CPH VOS FSQVB DLMM VOS QETH SQB";
string t1 = "DKER EPH VOS GOLNJ UKLMH QHNGLNJ A";
string t2 = "AB CPH VOS FSQVB DLMM VOS QHNG A";
string t3 = "AB";

// 记录每一层构造出来的字符串 Si 的长度 len，当前递归的层数 i (i>=1)，对于当前层数需要查询的字符的下标 pos
void dfs(vector<int>& len, int i, int pos, bool& ok) {
    // 已经搜到答案了就不断返回
    if (ok) {
        return;
    }

    // 如果还没有搜到答案，并且已经递归到了最开始的一层，就输出原始字符串相应位置的字符即可
    if (!i) {
        cout << s[pos - 1];
        return;
    }

    int l1 = t1.size(), l2 = l1 + len[i - 1], l3 = l2 + t2.size(), l4 = l3 + len[i - 1];
    if (pos <= l1) {
        cout << t1[pos - 1];
        ok = true;
        return;
    } else if (pos <= l2) {
        dfs(len, i - 1, pos - l1, ok);
    } else if (pos <= l3) {
        cout << t2[pos - l2 - 1];
        ok = true;
        return;
    } else if (pos <= l4) {
        dfs(len, i - 1, pos - l3, ok);
    } else {
        cout << t3[pos - l4 - 1];
        ok = true;
        return;
    }
}

void solve() {
    cin >> n >> k;

    vector<int> len(n + 10);
    len[0] = s.size();

    for (int i = 1; i <= n; i++) {
        len[i] = 2 * len[i - 1] + t1.size() + t2.size() + t3.size();
        len[i] = min(len[i], (int)2e18); // 点睛之笔...
    }

    // 特判下标越界的情况
    if (k > len[n]) {
        cout << ".";
        return;
    }

    // 否则开始从第n层开始递归搜索
    bool ok = false;
    dfs(len, n, k, ok);
}

signed main() {
    int T = 1;
    cin >> T;
    while (T--) {
        solve();
    }
    return 0;
}
```

### 【dfs】让我们异或吧

<https://www.luogu.com.cn/problem/P2420>

> 题意：给定一棵树，树上每一条边都有一个权值，现在有Q次询问，对于每次询问会给出两个结点编号u，v，需要输出结点u到结点v所经过的路径的所有边权的异或之和
>
> 思路：对于每次询问，我们当然可以遍历从根到两个结点的所有边权，然后全部异或计算结果，但是时间复杂度是 $O(n)$，显然不行，那么有什么优化策略吗？答案是有的。我们可以发现，对于两个结点之间的所有边权，其实就是根到两个结点的边权相异或得到的结果（异或的性质），我们只需要预处理出根结点到所有结点的边权已异或值，后续询问的时候直接 $O(1)$ 计算即可
>
> 时间复杂度：$\Theta(n+q)$

```cpp
const int N = 100010;

struct node {
    int id;
    int w;
};

int n, m, f[N];        // f[i] 表示从根结点到 i 号结点的所有边权的异或值
vector<node> G[N];
bool vis[N];

void dfs(int fa) {
    if (!vis[fa]) {
        vis[fa] = true;
        for (auto& ch: G[fa]) {
            f[ch.id] = f[fa] ^ ch.w;
            dfs(ch.id);
        }
    }
}

void solve() {
    cin >> n;

    for (int i = 0; i < n - 1; i++) {
        int a, b, w;
        cin >> a >> b >> w;
        G[a].push_back({b, w});
        G[b].push_back({a, w});
    }

    dfs(1);

    cin >> m;

    while (m--) {
        int u, v;
        cin >> u >> v;
        cout << (f[u] ^ f[v]) << "\n";
    }
}
```

### 【记忆化搜索】Function

<https://www.luogu.com.cn/problem/P1464>

> 题意：
>
> 思路一：直接dfs
>
> - 直接按照题意进行dfs代码的编写，但是很显然时间复杂极高
> - 时间复杂度：$O(T \times \text{情况数})$
>
> 思路二：记忆化dfs
>
> - 记忆化逻辑：
>     - 如果当前的状态没有记忆过，就记忆一下
>     - 如果当前的状态已经记忆过了，就不需要继续递归搜索了，直接使用之前已经记忆过的答案即可
> - 上述起始状态需要和搜到答案的状态做一个区别。我们知道，对于一组合法的输入，答案一定是
> - 注意点：
>     - 输入终止条件不是 `a != -1 && b != -1 && c != -1`，而是要三者都不是 `-1` 才行
>     - 对于每一组输入，我们不需要 `memset` 记忆数组，因为每一组的记忆依赖是相同的
>     - 由于答案一定是 $>0$ 的，因此是否记忆过只需要看当前状态的答案是否 $>0$ 即可
> - 时间复杂度：$<O(T \times n^3)$

直接dfs代码：

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

ll dfs(int a, int b, int c) {
    if (a <= 0 || b <= 0 || c <= 0) return 1;
    else if (a > 20 || b > 20 || c > 20) return dfs(20, 20, 20);
    else if (a < b && b < c) return dfs(a, b, c - 1) + dfs(a, b - 1, c - 1) - dfs(a, b - 1, c);
    else return dfs(a - 1, b, c) + dfs(a - 1, b - 1, c) + dfs(a - 1, b, c - 1) - dfs(a - 1, b - 1, c - 1);
}

void solve() {
    int a, b, c;
    cin >> a >> b >> c;
    while (a != -1 && b != -1 && c != -1) {
        printf("w(%d, %d, %d) = %lld\n", a, b, c, dfs(a, b, c));
        cin >> a >> b >> c;
    }
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

记忆化dfs代码：

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

const int N = 25;

ll f[N][N][N];

ll dfs(ll a, ll b, ll c) {
    // 上下界
    if (a <= 0 || b <= 0 || c <= 0) return 1;
    else if (a > 20 || b > 20 || c > 20) return dfs(20, 20, 20);

    if (f[a][b][c]) {
        // 已经记忆化过了，直接返回当前状态的解
        return f[a][b][c];
    }
    else {
        // 没有记忆化过，就递归计算并且记忆化
        if (a < b && b < c) return f[a][b][c] = dfs(a, b, c - 1) + dfs(a, b - 1, c - 1) - dfs(a, b - 1, c);
        else return f[a][b][c] = dfs(a - 1, b, c) + dfs(a - 1, b - 1, c) + dfs(a - 1, b, c - 1) - dfs(a - 1, b - 1, c - 1);
    }
}

void solve() {
    ll a, b, c;
    cin >> a >> b >> c;
    while (!(a == -1 && b == -1 && c == -1)) {
        printf("w(%lld, %lld, %lld) = %lld\n", a, b, c, dfs(a, b, c));
        cin >> a >> b >> c;
    }
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

### 【递归】外星密码

<https://www.luogu.com.cn/problem/P1928>

> 线性递归
>
> 题意：给定一个压缩后的密码串，需要解压为原来的形式。压缩形式距离
>
> - `AC[3FUN]` $\to$ `ACFUNFUNFUN`
> - `AB[2[2GH]]OP` $\to$ `ABGHGHGHGHOP`
>
> 思路：
>
> - 我们采用递归的策略
>
> - 我们知道，对于每一个字符，一共有4种情况，分别是："字母"、"数字"、"["、"]"。如果是字母。我们分情况考虑
>
>     - "字母"：
>         1. 直接加入答案字符串即可
>     - "["：
>         1. 获取左括号后面的整体 - 采用**递归**策略获取后面的整体
>         2. 加入答案字符串
>     - "数字"：
>         1. 获取完整的数 - 循环小trick
>         2. 获取数字后面的整体 - 采用**递归**策略获取后面的整体
>         3. 加入答案字符串 - 循环尾加入即可
>         4. **返回当前的答案字符串**
>     - "]"：
>         1. **返回当前的答案字符串** - 与上述 "[" 对应
>
> - 代码设计分析：
>
>     - 我们将压缩后的字符串看成由下面两种单元组成：
>
>         1. **最外层中括号组成的单元**：如 `[2[2AB]]` 就算一个最外层中括号组成的单元
>         2. **连续的字母单元**：如 `OPQ` 就算一个连续的字母单元
>
>     - 解决各单元连接问题：
>     - 为了在递归处理完第一种单元后还能继续处理后续的第二种单元，我们直接按照压缩字符串的长度进行遍历，即 `while (i < s.size())` 操作
>     - 解决两种单元内部问题：
>         - 最外层中括号组成的单元：递归处理
>         - 连续的字母单元：直接加入当前答案字符串即可
>
> - 手玩样例：
>
>     ![手玩样例](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407250147150.png)
>
>     - 显然按照定义，上述压缩字符串一共有五个单元
>     - 我们用红色表示进入递归，蓝色表示驱动递归结束并回溯。可以发现
>
> - 时间复杂度：$\Theta(\text{res.length()})$

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

string s;
int i;

string dfs() {
    string res;

    while (i < s.size()) {
        if (s[i] >= 'A' && s[i] <= 'Z') {
            while (s[i] >= 'A' && s[i] <= 'Z') {
                res += s[i++];
            }
        }
        if (s[i] == '[') {
            i++;
            res += dfs();
        }
        if (isdigit(s[i])) {
            int cnt = 0;
            while (isdigit(s[i])) {
                cnt = cnt * 10 + s[i] - '0';
                i++;
            }
            string t = dfs();
            while (cnt--) {
                res += t;
            }
            return res;
        }
        if (s[i] == ']') {
            i++;
            return res;
        }
    }

    return res;
}

void solve() {
    cin >> s;
    cout << dfs() << "\n";
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

### 【dfs+剪枝/二进制枚举】选数

<https://www.luogu.com.cn/problem/P1036>

> 题意：给定n个数，从中选出k个数，问一共有多少种方案可以使得选出来的k个数之和为质数
>
> 思路一：dfs+剪枝
>
> - 按照数据量可以直接暴搜，搜索依据是每一个数有两种状态，即选和不选，于是搜索树就是一棵二叉树
> - 搜索状态定义为：对于当前第idx个数，已经选择了cnt个数，已经选择的数之和为sum
> - 搜索终止条件为：idx越界
> - 剪枝：已经选择了k个数就直接返回，不用再选剩下的数了
> - 时间复杂度：$O(2^n)$ - 剪枝后一定是小于这个复杂度的
>
> 思路二：二进制枚举
>
> - 直接枚举 $0\to 2^n-1$，按照其中含有的 $1$ 的个数，来进行选数判断
> - 时间复杂度：$O(2^n)$ - 一定会跑满的

dfs+剪枝

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

const int N = 30;

int n, k, a[N];
int res;

bool isPrime(int x) {
    if (x < 2) return false;
    for (int i = 2; i <= x / i; i++)
        if (x % i == 0)
            return false;
    return true;
}

/**
 * @param cnt 当前已经选择的数的数量
 * @param idx 当前数的下标
 * @param sum 当前选数状态下的总和
 */
void dfs(int cnt, int idx, int sum) {
    if (idx > n) return;

    if (cnt == k) {
        if (isPrime(sum)) res++;
        return;
    }

    dfs(cnt, idx + 1, sum);
    dfs(cnt + 1, idx + 1, sum + a[idx + 1]);
}

void solve() {
    cin >> n >> k;
    for (int i = 1; i <= n; i++)
        cin >> a[i];

    dfs(0, 1, 0);        // 不选第一个数
    dfs(1, 1, a[1]);    // 选第一个数

    cout << res << "\n";
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

二进制枚举

```cpp
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

const int N = 30;

int n, k, a[N];
int res;

bool isPrime(int x) {
    if (x < 2) return false;
    for (int i = 2; i <= x / i; i++)
        if (x % i == 0)
            return false;
    return true;
}

void solve() {
    cin >> n >> k;
    for (int i = 1; i <= n; i++)
        cin >> a[i];

    for (int i = 0; i < (1 << n); i++) {
        int cnt = 0, sum = 0;
        for (int j = 0; j < n; j++)
            if (i & (1 << j))
                cnt++, sum += a[j + 1];

        if (cnt != k) continue;

        if (isPrime(sum)) res++;
    }

    cout << res << "\n";
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

### 【dfs/bfs】01迷宫

<https://www.luogu.com.cn/problem/P1141>

> 题意：给定一个01矩阵，行走规则为“可以走到相邻的数字不同的位置”，现在给定m次询问 `(u,v)`，输出从 `(u,v)` 开始最多可以走多少个位置？
>
> 思路：我们可以将此问题转化为一个求解连通块的问题。对于矩阵中的一个连通块，我们定义为：在其中任意一个位置开始行走，都可以走过整个连通块每一个位置。那么在询问时，只需要输出所在连通块元素的个数即可。现在将问题转化为了
>
> 1. 如何遍历每一个连通块？按照标记数组的情况，如果一个位置没有被标记，就从这个位置出发开始打标记并统计
>
> 2. 如何统计每一个连通块中元素的个数？按照题目中给定的迷宫行走规则，可以通过bfs或者dfs实现遍历
>

bfs代码

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 1010;

int n, m, res[N][N];
char g[N][N];
bool vis[N][N];

void bfs(int u, int v) {
    queue<pair<int, int>> q;
    int cnt = 0; // 当前“连通块”的大小
    vector<pair<int, int>> a;

    q.push({u, v});
    a.push_back({u, v});
    vis[u][v] = true;
    cnt++;

    int dx[4] = {-1, 1, 0, 0}, dy[4] = {0, 0, 1, -1};

    while (q.size()) {
        auto& now = q.front();
        q.pop();

        for (int i = 0; i < 4; i++) {
            int x = dx[i] + now.first, y = dy[i] + now.second;
            if (x >= 1 && x <= n && y >= 1 && y <= n && !vis[x][y] && g[x][y] != g[now.first][now.second]) {
                q.push({x, y});
                a.push_back({x, y});
                vis[x][y] = true;
                cnt++;
            }
        }
    }

    for (auto& loc: a) {
        res[loc.first][loc.second] = cnt;
    }
}

void solve() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            cin >> g[i][j];

    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            if (!vis[i][j])
                bfs(i, j);

    while (m--) {
        int a, b;
        cin >> a >> b;
        if (vis[a][b]) {
            cout << res[a][b] << "\n";
        } else {
            cout << 1 << "\n";
        }
    }
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

dfs代码

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 1010;

int n, m, res[N][N];
char g[N][N];
bool vis[N][N];

// 当前点的坐标 (u, v)，当前连通块的元素个数cnt，当前连通块的元素存到 a 数组
void dfs(int u, int v, int& cnt, vector<pair<int, int>>& a) {
    cnt++;
    a.push_back({u, v});
    vis[u][v] = true;

    int dx[4] = {0, 0, 1, -1}, dy[4] = {1, -1, 0, 0};

    for (int k = 0; k < 4; k++) {
        int x = u + dx[k], y = v + dy[k];
        if (x >= 1 && x <= n && y >= 1 && y <= n && !vis[x][y] && g[x][y] != g[u][v]) {
            dfs(x, y, cnt, a);
        }
    }
}

void solve() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            cin >> g[i][j];

    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            if (!vis[i][j]) {
                int cnt = 0;
                vector<pair<int, int>> a;
                dfs(i, j, cnt, a);
                for (auto& loc: a) {
                    res[loc.first][loc.second] = cnt;
                }
            }

    while (m--) {
        int a, b;
        cin >> a >> b;
        if (vis[a][b]) {
            cout << res[a][b] << "\n";
        } else {
            cout << 1 << "\n";
        }
    }
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

### 【dfs/二进制枚举】kkksc03考前临时抱佛脚

<https://www.luogu.com.cn/problem/P2392>

> 题意：给定四组数据，每组数据由 n 个数字组成，对于每一组数字需要分为两组使得两组之和相差尽可能小，问最终四组数据分组后，每一组之和的最大值之和是多少
>
> - 思路一：二进制枚举
>
>     可以发现，我们可以只设计处理一组数据的算法，其余组数的数据调用该算法即可。对于一个序列，想要将其划分为 2 组使得 2 组之和的差值最小，我们可以发现，对于序列中的一个数而言，有两个状态，要么分到第一组，要么就分到第二组，因此我们可以采用二进制枚举的方式，将所有的分组情况全部枚举出来，每一个状态计算一下和的差值，最后取最小差值时，两组中和的最大值即可
>
>     时间复杂度：$O(4 \times 2^n)$
>
> - 思路二：dfs
>
>     从上面的二进制枚举得到启发，一定可以进行二叉树搜索。很显然就直接左结点让当前数分到左组，右结点让当前数分到右组即可。本题无法剪枝，因为两组之和的差值没有规律
>
>     时间复杂度：$O(4 \times 2^n)$

二进制枚举代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 25;

int a[N], res;

void fun(int n) {
    int MIN = 20 * 60;
    for (int i = 0; i <= (1 << n); i++) {
        int l = 0, r = 0; 
        for (int j = 0; j < n; j++) {
            if (i & (1 << j)) r += a[j];
            else l += a[j];
        }
        MIN = min(MIN, max(l, r));
    }
    res += MIN;
}

void solve() {
    int x[4] {};
    for (int i = 0; i < 4; i++) cin >> x[i];
    
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < x[i]; j++) cin >> a[j];
        fun(x[i]);
    }
    
    cout << res << "\n";
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

dfs代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 25;

int a[N], res;
int MIN; // 每一组数据划分为 2 组后每一组的最大和值 

// 第 idx 个数分到某一组时左组之和 ls，右组之和 rs 
void dfs(int idx, bool isRight, int ls, int rs, int n) {
    if (idx == n) {
        MIN = min(MIN, max(ls, rs));
        return;
    }
    
    if (ls > MIN || rs > MIN) {
        // 剪枝：当前左组之和 or 右组之和比最大和值都大 
        return;
    }
    
    if (isRight) rs += a[idx];
    else ls += a[idx];
    
    dfs(idx + 1, false, ls, rs, n);
    dfs(idx + 1, true , ls, rs, n); 
}

void solve() {
    int x[4] {};
    for (int i = 0; i < 4; i++) cin >> x[i];
    
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < x[i]; j++) cin >> a[j];
        
        MIN = 20 * 60;
        dfs(0, false, 0, 0, x[i]);
        dfs(0, true , 0, 0, x[i]);
        res += MIN;
    }
    
    cout << res << "\n";
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

### 【dfs/二进制枚举】PERKET

<https://www.luogu.com.cn/problem/P2036>

> 题意：给定一个二元组序列，每一个二元组中，一个表示酸度，一个表示苦度，现在在至少需要选择一个二元组的情况下，希望酸度之积与苦度之和的差值最小
>
> - 思路一：二进制枚举
>
>     很显然的一个二进制枚举。每一个二元组都只有两个状态，即被选择 or 不被选择，故可采用二进制枚举，对于每一个状态统计酸度之积与苦度之和即可
>
>     时间复杂度：$O(2^n)$
>
> - 思路二：dfs
>
>     按照上述二进制枚举的思路进行模拟即可，本题无法剪枝，因为酸度与苦度之差没有规律
>
>     时间复杂度：$O(2^n)$

二进制枚举代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 15;

int n;
int res = 1e9;

struct {
    int l, r;
} a[N];

void solve() {
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i].l >> a[i].r;
    
    for (int i = 0; i <= (1 << n); i++) {
        // 特判没有调料的情况 
        int cnt = 0;
        for (int j = 0; j < n; j++)
            if (i & (1 << j))
                cnt++;
                
        if (!cnt) continue;
        
        // 计算两个味道的差值
        int ls = 1, rs = 0;
        for (int j = 0; j < n; j++)
            if (i & (1 << j))
                ls *= a[j].l, rs += a[j].r;
                
        res = min(res, abs(ls - rs));
    }
    
    cout << res << "\n";
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

dfs代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 15;

int n;
int res = 1e9;

struct {
    int l, r;
} a[N];

// 当前决策元素的下标idx，是否被选择choose，酸度之积ls，苦度之和rs 
void dfs(int idx, bool choose, int ls, int rs) {
    if (idx == n) {
        if (ls == 1 && rs == 0) return;
        res = min(res, abs(ls - rs));
        return;
    }
    
    if (choose) {
        ls *= a[idx].l;
        rs += a[idx].r;
    }
    
    dfs(idx + 1, false, ls, rs);
    dfs(idx + 1, true , ls, rs);
}

void solve() {
    cin >> n;
    for (int i = 0; i < n; i++) cin >> a[i].l >> a[i].r;
    
    dfs(0, false, 1, 0);
    dfs(0, true , 1, 0);
    
    cout << res << "\n";
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

### 【dfs】迷宫

<https://www.luogu.com.cn/problem/P1605>

> 题意：矩阵寻路，有障碍物，每一个点只能走一次，找到起点到终点可达路径数
>
> 思路：其实就是一个四叉树的题目，只需要进行四个方向的遍历搜索即可找到路径，由于会进行：越界、障碍物、以及不可重复遍历的剪枝，故遍历的数量会很少
>
> 时间复杂度：$<< O(4^{nm})$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 10;

int n, m, k;
int aa, bb, cc, dd;
int g[N][N], vis[N][N];
int res;

int dx[] = {-1, 1, 0, 0}, dy[] = {0, 0, 1, -1};

void dfs(int x, int y) {
    if (x == cc && y == dd) {
        res++;
        return;
    }
    
    for (int k = 0; k < 4; k++) {
        int xx = x + dx[k], yy = y + dy[k];
        if (xx > 0 && xx <= n && yy > 0 && yy <= m && !g[xx][yy] && !vis[xx][yy]) {
            vis[x][y] = true;
            dfs(xx, yy);
            vis[x][y] = false;
        }
    }
}

void solve() {
    cin >> n >> m >> k;
    cin >> aa >> bb >> cc >> dd;
    
    while (k--) {
        int x, y;
        cin >> x >> y;
        g[x][y] = 1;
    }
    
    dfs(aa, bb);
    
    cout << res << "\n";
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

### 【dfs】单词方阵

<https://www.luogu.com.cn/problem/P1101>

> - 题意：给定一个字符串方阵，问对于其中的 8 个方向，是否存在一个指定的字符串
> - 思路：很显然的暴力枚举，只不过采用 dfs 进行优化，我们可以发现搜索的逻辑非常的简单，只需要在约束方向的情况下每次遍历八个方向即可。本题的关键在于如何快速正确的编码。对于八个角度判断是否与原始方向一致，我们采用**增量的思路**，只需要通过传递父结点的位置坐标即可唯一确定，因为两点确定一条了一条射线，方向也就确定了。其次就是如何构造答案矩阵，思路与两点确定射线的逻辑类似，我们在抵达搜索的终点时，只需要通过当前点的坐标与父结点的坐标唯一确定来的路径的方向，进行构造即可
> - 时间复杂度：难以计算，但是 dfs 一定可行

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 110;

int n;
char g[N][N], res[N][N], s[10] = "yizhong";

// oa,ob 父结点坐标，a,b 当前结点坐标，idx 当前匹配的位置
void dfs(int oa, int ob, int a, int b, int idx) {
    if (s[idx] != g[a][b]) return;
    
    if (idx == 6) {
        int i = a, j = b;
        for (int t = 6; t >= 0; t--) {
            res[i][j] = s[t];
            i -= a - oa;
            j -= b - ob;
        }
        return;
    }
    
    int dx[] = {1, -1, 0, 0, 1, -1, -1, 1}, dy[] = {0, 0, 1, -1, 1, 1, -1, -1};
    
    for (int k = 0; k < 8; k++) {
        int x = a + dx[k], y = b + dy[k];
        if (x < 1 || x > n || y < 1 || y > n) continue;
        
        if ((oa == -1 && ob == -1) || (x - a == a - oa && y - b == b - ob))
            dfs(a, b, x, y, idx + 1);
    }
}

void solve() {
    cin >> n;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            cin >> g[i][j], res[i][j] = '*';
    
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            dfs(-1, -1, i, j, 0);
    
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++)
            cout << res[i][j];
        cout << "\n";
    }
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

### 【dfs】自然数的拆分问题

<https://www.luogu.com.cn/problem/P2404>

> - 题意：给定一个自然数 n，问有多少种拆分方法能将该数拆分为一定数量的升序自然数之和
> - 思路：**树形搜索的例题**。我们采用递增凑数的思路，对于每一个结点值，我们从其父结点的值开始深度搜索，从而确保了和数递增。递归终点就是和值为自然数 n 的值。剪枝就是和值超过了自然数 n 的值
> - 时间复杂度：$<<O(n^n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

int n;
vector<int> res;

// now 表示当前结点的值，sum 表示根到当前结点的路径之和
void dfs(int now, int sum) {
    if (sum > n) return;
    
    if (sum == n) {
        for (int i = 0; i < res.size(); i++)
            cout << res[i] << "+\n"[i == res.size() - 1];
        return;
    }
    
    for (int i = now; i < n; i++) {
        res.push_back(i);
        dfs(i, sum + i);
        res.pop_back();
    }
}

void solve() {
    cin >> n;
    
    for (int i = 1; i < n; i++) {
        res.push_back(i);
        dfs(i, i);
        res.pop_back();
    }
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

### 【dfs】Lake Counting S

<https://www.luogu.com.cn/problem/P1596>

> - 题意：给定一个矩阵，计算其中连通块的数量
> - 思路：直接逐个元素遍历即可，对于每一个元素，我们采用 dfs 或者 bfs 的方式进行打标签从而将整个连通块都标记出来即可
> - 时间复杂度：$O(nm)$

dfs 代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 110;

int n, m;
char g[N][N];
bool vis[N][N];
int res, dx[] = {1, -1, 0, 0, 1, 1, -1, -1}, dy[] = {0, 0, 1, -1, 1, -1, 1, -1};

void dfs(int i, int j) {
    if (i < 1 || i > n || j < 1 || j > m || vis[i][j] || g[i][j] != 'W') return;
    
    vis[i][j] = true;
    
    for (int k = 0; k < 8; k++) {
        int x = i + dx[k], y = j + dy[k];
        dfs(x, y);
    }
}

void solve() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            cin >> g[i][j];
    
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            if (!vis[i][j] && g[i][j] == 'W')
                dfs(i, j), res++;
    
    cout << res << "\n";
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

bfs 代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 110;

int n, m;
char g[N][N];
bool vis[N][N];
int res, dx[] = {1, -1, 0, 0, 1, 1, -1, -1}, dy[] = {0, 0, 1, -1, 1, -1, 1, -1};

void bfs(int i, int j) {
    queue<pair<int, int>> q;
    
    q.push({i, j});
    vis[i][j] = true;
    
    while (q.size()) {
        auto h = q.front();
        q.pop();
        
        int x = h.first, y = h.second;
        for (int k = 0; k < 8; k++) {
            int xx = x + dx[k], yy = y + dy[k];
            if (!vis[xx][yy] && g[xx][yy] == 'W') {
                q.push({xx, yy});
                vis[xx][yy] = true;
            }
        }
    }
}

void solve() {
    cin >> n >> m;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            cin >> g[i][j];
    
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            if (!vis[i][j] && g[i][j] == 'W')
                bfs(i, j), res++;
    
    cout << res << "\n";
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

### 【dfs】填涂颜色

<https://www.luogu.com.cn/problem/P1162>

> - 题意：给定一个方阵，其中只有 0 和 1，其中的 1 将部分的 0 围成了一个圈，现在需要将被围住的 0 转为 2 后，将转化后的方阵输出
> - 思路：题意很简单，思路也很显然，我们要做的就是区分开圈内与圈外的 0，如何区分呢？我们采用搜索打标记的方式将外圈的 0 全部打标记之后，遇到的没有打标记的 0 显然就是圈内的了。为了满足所有情况下圈内的 0，我们从方阵的四条边进行探测式打标签即可
> - 时间复杂度：$O(n^2)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 35;

int n, g[N][N];
int dx[] = {0, 0, 1, -1}, dy[] = {1, -1, 0, 0};
bool vis[N][N];

void dfs(int i, int j) {
    if (i < 1 || i > n || j < 1 || j > n || g[i][j] == 1 || vis[i][j]) return;
    
    vis[i][j] = true;
    
    for (int k = 0; k < 4; k++) {
        int x = i + dx[k], y = j + dy[k];
        dfs(x, y);
    }
}

void solve() {
    cin >> n;
    
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            cin >> g[i][j];
    
    for (int i = 1; i <= n; i++) if (g[1][i] == 0 && !vis[1][i]) dfs(1, i);
    for (int i = 1; i <= n; i++) if (g[i][n] == 0 && !vis[i][n]) dfs(i, n);
    for (int i = 1; i <= n; i++) if (g[n][i] == 0 && !vis[n][i]) dfs(n, i);
    for (int i = 1; i <= n; i++) if (g[i][1] == 0 && !vis[i][1]) dfs(i, 1);
    
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            if (vis[i][j]) cout << 0 << " \n"[j == n];
            else if (g[i][j] == 0) cout << 2 << " \n"[j == n];
            else cout << g[i][j] << " \n"[j == n];
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

### 【bfs】马的遍历

<https://www.luogu.com.cn/problem/P1443>

> - 题意：给定一个矩阵棋盘范围与一个马的位置坐标，现在问棋盘中每一个点的最小到达距离是多少
> - 思路：很显然的一个 bfs 宽搜模型，我们只需要从该颗马的起始位置开始宽搜，对于每一个第一个搜索到的此前没有到达的点，计算此时到起点的步长距离就是最小到达距离
> - 时间复杂度：$O(n \times m)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 410;

struct Idx {
    int x, y;
};

int n, m, x, y;
int d[N][N];
int dx[] = {1, 1, -1, -1, 2, 2, -2, -2}, dy[] = {2, -2, 2, -2, 1, -1, 1, -1};

void bfs() {
    queue<Idx> q;
    q.push({x, y});
    d[x][y] = 0;
    
    while (q.size()) {
        auto h = q.front();
        q.pop();
        
        for (int k = 0; k < 8; k++) {
            int i = h.x + dx[k], j = h.y + dy[k];
            if (i < 1 || i > n || j < 1 || j > m || d[i][j] != -1) continue;
            d[i][j] = d[h.x][h.y] + 1;
            q.push({i, j});
        }
    }
}

void solve() {
    cin >> n >> m >> x >> y;
    
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            d[i][j] = -1;
    
    bfs();
    
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            cout << d[i][j] << " \n"[j == m];
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

### 【bfs】奇怪的电梯

<https://www.luogu.com.cn/problem/P1135>

> - 题意：给定一个电梯，第 `i` 层只能上升或者下降 `a[i]` 层，问从起点开始到终点最少需要乘坐几次电梯
> - 思路：很显然的一个宽搜，关键在于需要对打标记避免重复访问结点造成死循环
> - 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 210;

int n, x, y, a[N];
int d[N]; // d[i] 表示起点到第 i 层楼的最小操作次数
bool vis[N];

void bfs() {
    queue<int> q;
    
    q.push(x);
    d[x] = 0;
    vis[x] = true;
    
    while (q.size()) {
        int now = q.front();
        q.pop();
        
        if (now == y) break;
        
        int high = now + a[now], low = now - a[now];
        
        if (!vis[high] && high >= 1 && high <= n) {
            q.push(high);
            d[high] = d[now] + 1;
            vis[high] = true;
        }
        if (!vis[low] && low >= 1 && low <= n) {
            q.push(low);
            d[low] = d[now] + 1;
            vis[low] = true;
        }
    }
}

void solve() {
    cin >> n >> x >> y;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        d[i] = -1;
    }
    
    bfs();
    
    cout << d[y] << "\n";
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

### 【dfs/状压dp】吃奶酪 :star:

> 题意：给定一个平面直角坐标系与 n 个点的坐标，起点在坐标原点。问如何选择行进路线使得到达每一个点且总路程最短 
> - 思路一：爆搜。题中的 $n \le 15$ 直接无脑爆搜，但是 **TLE**。爆搜的思路为：每次选择其中的一个点，接下来选择剩余的没有被选择过的点继续搜索，知道所有的点全部都搜到为止
>
>     时间复杂度：$O(n!)$
>
> - 思路二：状态压缩 DP。
>
>     时间复杂度：$O()$

爆搜代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 20;

int n;
double res = 4000.0;
bool vis[N];

struct Idx {
    double x, y;
} a[N];

double d(Idx be, Idx en) {
    return sqrt((be.x - en.x) * (be.x - en.x) + (be.y - en.y) * (be.y - en.y));
}

// 父结点坐标 fa，当前结点次序 now，当前路径长度 len 
void dfs(Idx fa, int now, double len) {
    vis[now] = true;
    
    if (count(vis + 1, vis + n + 1, true) == n) {
        res = min(res, len);
    }
    
    for (int i = 1; i <= n; i++)
        if (!vis[i])
            dfs(a[now], i, len + d(a[now], a[i]));
    
    vis[now] = false;
}

void solve() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> a[i].x >> a[i].y; 
    }
    
    for (int i = 1; i <= n; i++) {
        Idx fa = {0, 0};
        dfs(fa, i, d(fa, a[i]));
    }
    
    cout << fixed << setprecision(2) << res << "\n";
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

状压 dp 代码

```cpp

```

### 【dfs】递归实现指数型枚举

<https://www.acwing.com/problem/content/94/>

> - 题意：给定 n 个数，从其中选择 0-n 个数，将所有的选择方案打印出来，每一个方案中数字按照升序排列
> - 思路：很显然的一个二叉树问题。每一个数只有两种状态，选择 or 不选择，于是可以采用二进制枚举 or 二叉树 dfs 的方法进行。为了满足升序，二进制枚举时从低位到高位判断是否为 1 即可；搜索时从低位开始搜索，通过一个动态数组存储搜索路径上的数字即可
> - 时间复杂度：$O(2^n)$

二进制枚举

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

int n;

void solve() {
    cin >> n;
    
    for (int i = 0; i < (1 << n); i++) {
        for (int j = 0; j < n; j++) {
            if (i & (1 << j)) {
                cout << j + 1 << ' ';
            }
        }
        cout << "\n";
    }
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

dfs

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

int n;
vector<int> a;

void dfs(int now, bool cho) {
    if (now == n) {
        for (auto& x: a) {
            cout << x << ' ';
        }
        cout << "\n";
        return;
    }
    
    dfs(now + 1, false);
    
    a.push_back(now + 1);
    dfs(now + 1, true);
    a.pop_back();
}

void solve() {
    cin >> n;
    
    dfs(1, false);

    a.push_back(1);
    dfs(1, true);
    a.pop_back();
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

### 【dfs】递归实现排列型枚举

<https://www.acwing.com/problem/content/96/>

> - 题意：按照字典序升序，打印 n 个数的所有全排列情况
> - 思路：从第一位开始枚举每一位可以选择的数，显然每一位可选择数的数量逐渐减少，直到只有一种选择结束搜索
> - 时间复杂度：$O(n!)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 10;

int n;
bool vis[N];
vector<int> a;

// 当前数位 now
void dfs(int now) {
    if (now > n) {
        for (auto& x: a) {
            cout << x << ' ';
        }
        cout << "\n";
        return;
    }

    for (int i = 1; i <= n; i++) {
        if (!vis[i]) {
            a.push_back(i);
            vis[i] = true;
            dfs(now + 1);
            a.pop_back();
            vis[i] = false;
        }
    }
}

void solve() {
    cin >> n;
    dfs(1);
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

### 【dfs/树形dp】树的直径 :star:

树的路径问题，考虑回溯。如何更新值？如何返回值？

参考：<https://www.bilibili.com/video/BV17o4y187h1/>



### 【dfs】在带权树网络中统计可连接服务器对数目

<https://leetcode.cn/problems/count-pairs-of-connectable-servers-in-a-weighted-tree-network/description/>

> 题意：给定一棵带权无根树，定义「中转结点」为以当前结点为根，能够寻找到两个不同分支下的结点，使得这两个结点到当前结点的简单路径长度可以被给定值 k 整除，问树中每一个结点的「中转结点」的有效对数是多少
>
> 思路：dfs+乘法原理。
>
> - 由于数据量是 $n=10^3$，可以直接枚举每一个顶点，并且每一个顶点的操作可以是 $O(n)$ 的，我们考虑遍历。对于每一个结点，对应的有效对数取决于每一个子树中的简单路径长度合法的结点数，通过深搜统计即可
> - 统计出每一个子树的合法结点后还需要进行答案的计算，也就是有效对数的统计。对于每一个合法结点，都可以和非当前子树上的所有结点结合形成一个合法有效对，直接这样统计会导致结果重复计算一次，因此需要答案除以二。当然也可以利用乘法原理，一边统计每一个子树中有效的结点数，一边和已统计过的有效结点数进行计算
>
> 时间复杂度：$O(n^2)$
>
> 注：总结本题根本原因是提升对建图的理解以及针对 `vector` 用法的总结
>
> - 关于建图
>     - 一开始编码时，我设置了结点访问状态数组 `vector<bool> vis` 和每一个结点到当前根结点的距离数组 `vector<int> d`，但其实都可以规避，因为本题是「树」形图，可以通过在深搜时同时传递父结点来规避掉 `vis` 数组的使用
>     - 同时由于只需要在遍历时计算路径是否合法从而计数，因此不需要存储每一个结点到当前根结点的路径值，可以通过再增加一个搜索状态参数来规避掉 `d` 数组的使用
> - 关于 `vector`
>     - 一开始使用了全局 `vis` 数组，因此每次都需要进行清空操作。我使用了 `.clear()` 方法试图重新初始化数组，但这导致了状态的错误记录，可能是 LeetCode 平台 C++ 语言特有的坑，还是少用全局变量
>     - `.clear()` 方法会导致 `.size()` 为 0，但是仍然可以通过 `[]` 方法获得合法范围内的元素值，这是 `vector` 内存分配优化的结果

```cpp []
class Solution {
public:
    vector<int> countPairsOfConnectableServers(vector<vector<int>>& edges, int signalSpeed) {
        int n = edges.size() + 1;
        
        struct node { int to, w; };
        vector<vector<node>> g(n, vector<node>());
        for (auto e: edges) {
            int u = e[0], v = e[1], w = e[2];
            g[u].push_back({v, w});
            g[v].push_back({u, w});
        }

        function<int(int, int, int)> dfs = [&](int fa, int now, int d) {
            int res = d % signalSpeed == 0;
            for (auto ch: g[now]) {
                if (ch.to != fa) {
                    res += dfs(now, ch.to, d + ch.w);
                }
            }
            return res;
        };

        vector<int> res(n);
        for (int i = 0; i < n; i++) {
            int sum = 0;
            for (auto ch: g[i]) {
                int cnt = dfs(i, ch.to, ch.w);
                res[i] += cnt * sum;
                sum += cnt;
            }
        }

        return res;
    }
};
```

```python []
class Solution:
    def countPairsOfConnectableServers(self, edges: List[List[int]], signalSpeed: int) -> List[int]:
        n = len(edges) + 1

        g = [[] for _ in range(n)]
        for u, v, w in edges:
            g[u].append((v, w))
            g[v].append((u, w))

        def dfs(fa: int, now: int, d: int) -> int:
            ret = d % signalSpeed == 0
            for ch in g[now]:
                if ch[0] != fa:
                    ret += dfs(now, ch[0], d + ch[1])
            return ret

        res = [0] * n
        for i in range(n):
            sum = 0
            for ch in g[i]:
                cnt = dfs(i, ch[0], ch[1])
                res[i] += sum * cnt
                sum += cnt

        return res
```

### 【dfs】将石头分散到网格图的最少移动次数

<https://leetcode.cn/problems/minimum-moves-to-spread-stones-over-grid/>

> 标签：搜索、全排列、库函数
>
> 题意：给定一个 $3\times 3$ 的矩阵 $g$，其中数字总和为 9 且 $g[i][j] \ge 0$，现在需要将其中 $>1$ 的数字逐个移动到值为 0 的位置上使得最终矩阵全为 1，问最少移动长度是多少。
>
> 思路一：手写全排列
>
> - 思路：可以将这道题抽象为求解「将 a 个大于 1 位置的数分配到 b 个 0 位置」的方案中的最小代价问题。容易联想到全排列选数的母问题：数字的位数对应这里的 b 个 0 位置，每个位置可以填的数对应这里的用哪个 a 来填。区别在于：0 的位置顺序不是固定的，用哪个 a 来填的顺序也不是固定的。这与全排列数中：被填的位置顺序是固定的，用哪个数来填不是固定的，有所区别。因此我们可以全排列枚举每一个位置，在此基础之上再全排列枚举每一个位置上可选的 a 进行填充。可以理解为全排列的嵌套。那么最终递归树的深度就是 0 的个数，递归时再用一个参数记录每一个选数分支对应的代价即可。
> - 时间复杂度：$O(9\times 9!)$
>
> 思路二：库函数全排列
>
> - 思路：由于方阵的总和为 9，因此 >1 的位置上减去 1 剩下的数值之和一定等于方阵中 0 的个数。因此我们可以将前者展开为和 0 相同大小的向量，并全排列枚举任意一者进行两者的匹配计算，维护其中的最小代价即是答案。
>     - C++ 的全排列枚举库函数为 `std::next_permutation(ItFirst, ItEnd)`
>     - Python 的全排列枚举库函数为 `itertools.permutations(Iterable)`
> - 时间复杂度：$O(9\times 9!)$

```cpp []
class Solution {
public:
    int minimumMoves(vector<vector<int>>& g) {
        vector<pair<int, int>> z, a;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (!g[i][j]) {
                    z.push_back({i, j});
                } else if (g[i][j] > 1) {
                    a.push_back({i, j});
                }
            }
        }

        int res = INT_MAX, n = z.size();
        vector<bool> vis(n);

        auto dfs = [&](auto&& dfs, int dep, int t) -> void {
            if (dep == n) {
                res = min(res, t);
                return;
            }

            for (int i = 0; i < n; i++) {
                if (vis[i]) continue;
                vis[i] = true;
                for (auto& [x, y]: a) {
                    if (g[x][y] <= 1) continue;
                    g[x][y]--;
                    dfs(dfs, dep + 1, t + abs(z[i].first - x) + abs(z[i].second - y));
                    g[x][y]++;
                }
                vis[i] = false;
            }
        };
        
        dfs(dfs, 0, 0);

        return res;
    }
};
```

```cpp [C++库函数]
class Solution {
public:
    int minimumMoves(vector<vector<int>>& g) {
        vector<pair<int, int>> z, a;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (!g[i][j]) {
                    z.push_back({i, j});
                } else {
                    while (g[i][j] > 1) {
                        a.push_back({i, j});
                        g[i][j]--;
                    }
                }
            }
        }

        int res = INT_MAX;
        do {
            int t = 0;
            for (int i = 0; i < z.size(); i++) {
                t += abs(a[i].first - z[i].first) + abs(a[i].second - z[i].second);
            }
            res = min(res, t);
        } while (next_permutation(a.begin(), a.end()));

        return res;
    }
};
```

```python []
class Solution:
    def minimumMoves(self, g: List[List[int]]) -> int:
        a, z = [], []
        for i in range(3):
            for j in range(3):
                if not g[i][j]:
                    z.append((i, j))
                elif g[i][j] > 1:
                    a.append((i, j))

        res = 1000
        n = len(z)
        vis = [False] * n
        
        def dfs(dep: int, t: int) -> None:
            nonlocal res
            if dep == n:
                res = min(res, t)
                return
            for i in range(n):
                if vis[i]: continue
                vis[i] = True
                for x, y in a:
                    if g[x][y] <= 1: continue
                    g[x][y] -= 1
                    dfs(dep + 1, t + abs(z[i][0] - x) + abs(z[i][1] - y))
                    g[x][y] += 1
                vis[i] = False

        dfs(0, 0)
        
        return res
```

```python [Python库函数]
class Solution:
    def minimumMoves(self, g: List[List[int]]) -> int:
        from itertools import permutations
        a, z = [], []
        for i in range(3):
            for j in range(3):
                if not g[i][j]:
                    z.append((i, j))
                while g[i][j] > 1:
                    a.append((i, j))
                    g[i][j] -= 1
        
        res, n = 1000, len(a)
        for p in permutations(a):
            t = 0
            for i in range(n):
                t += abs(p[i][0] - z[i][0]) + abs(p[i][1] - z[i][1])
            res = min(res, t)

        return res
```

## 分治

将大问题转化为等价小问题进行求解。

### 【分治】随机排列

<https://www.acwing.com/problem/content/5469/>

> 题意：给定一个 n 个数的全排列序列，并将其进行一定的对换，问是对换了 3n 次还是 7n+1 次
>
> 思路：可以发现对于两种情况，就对应对换次数的奇偶性。当 n 为奇数：3n 为奇数，7n+1 为偶数；当 n 为偶数：3n 为偶数，7n+1 为奇数。故我们只需要判断序列的逆序数即可。为了求解逆序数，我们可以采用归并排序的 combine 过程进行统计即可
>
> 时间复杂度：$O(n \log n)$

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