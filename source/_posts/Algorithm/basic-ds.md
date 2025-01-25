---
title: 基础数据结构
categories: 数据结构与算法
category_bar: true
---

## 前言

基础数据结构的「例题解析」。

## 【模板】双链表

https://www.acwing.com/problem/content/829/

> 思路：用两个空结点作为起始状态的边界，避免所有边界讨论。
>
> 时间复杂度：插入、删除结点均为 $O(1)$，遍历为 $O(n)$

```cpp
#include <bits/stdc++.h>

using ll = long long;
using namespace std;

template<class T>
class myList {
private:
    int idx;
    std::vector<T> val;
    std::vector<int> left, right;

public:
    myList(const int n) {
        idx = 2;
        val.resize(n + 10);
        left.resize(n + 10);
        right.resize(n + 10);
        left[1] = 0, right[0] = 1;
    }

    void push_back(T x) {
        insert_left(1, x);
    }

    void push_front(T x) {
        insert_right(0, x);
    }

    void insert_left(int k, T x) {
        insert_right(left[k], x);
    }

    void insert_right(int k, T x) {
        val[idx] = x;
        right[idx] = right[k];
        left[right[k]] = idx;
        left[idx] = k;
        right[k] = idx++;
    }

    void erase(int k) {
        right[left[k]] = right[k];
        left[right[k]] = left[k];
    }

    void output() {
        for (int i = right[0]; i != 1; i = right[i]) {
            cout << val[i] << " \n"[i == 1];
        }
    }
};

void solve() {
    int n;
    cin >> n;

    myList<int> ls(n);

    while (n--) {
        string op;
        cin >> op;

        int k, x;

        if (op == "L") {
            cin >> x;
            ls.push_front(x);
        } else if (op == "R") {
            cin >> x;
            ls.push_back(x);
        } else if (op == "D") {
            cin >> k;
            ls.erase(k + 1);
        } else if (op == "IL") {
            cin >> k >> x;
            ls.insert_left(k + 1, x);
        } else {
            cin >> k >> x;
            ls.insert_right(k + 1, x);
        }
    }

    ls.output();
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
import heapq
from collections import defaultdict
from typing import List, Tuple
import math
from itertools import combinations

II = lambda: int(input())
FI = lambda: float(input())
MII = lambda: tuple(map(int, input().split()))
LII = lambda: list(map(int, input().split()))


class myList:
    def __init__(self, n: int) -> None:
        self.val = [0] * (n + 10)
        self.left = [0] * (n + 10)
        self.right = [0] * (n + 10)
        self.idx = 2
        self.right[0] = 1
        self.left[1] = 0

    def push_front(self, x: int):
        self.insert_right(0, x)

    def push_back(self, x: int):
        self.insert_left(1, x)

    def insert_left(self, k: int, x: int):
        self.insert_right(self.left[k], x)

    def insert_right(self, k: int, x: int):
        self.val[self.idx] = x
        self.right[self.idx] = self.right[k]
        self.left[self.right[k]] = self.idx
        self.left[self.idx] = k
        self.right[k] = self.idx
        self.idx += 1

    def erase(self, k: int):
        self.left[self.right[k]] = self.left[k]
        self.right[self.left[k]] = self.right[k]

    def output(self) -> None:
        i = self.right[0]
        while i != 1:
            print(self.val[i], end=' ')
            i = self.right[i]


def solve() -> None:
    n = II()

    ls = myList(n)

    for _ in range(n):
        op = input().split()

        if op[0] == 'L':
            ls.push_front(int(op[-1]))
        elif op[0] == 'R':
            ls.push_back(int(op[-1]))
        elif op[0] == 'D':
            ls.erase(int(op[-1]) + 1)
        elif op[0] == 'IL':
            ls.insert_left(int(op[1]) + 1, int(op[-1]))
        else:
            ls.insert_right(int(op[1]) + 1, int(op[-1]))

    ls.output()


if __name__ == '__main__':
    T = 1
    # T = II()
    while T: solve(); T -= 1
```

## 【模板】单调栈

https://www.acwing.com/problem/content/832/

> 题意：对于一个序列中的每一个元素，寻找每一个元素左侧最近的比其小的元素。
>
> 思路一：暴力枚举
>
> - 显然对于每一个元素 `nums[i]`，我们可以枚举倒序 `[0, i-1]` 直到找到第一个 `nums[j] < nums[i]`
> - 时间复杂度：$O(n^2)$
>
> 思路二：单调栈
>
> - 可以发现时间开销主要在倒序枚举上，我们能少枚举一些元素吗？答案是可以的。我们定义「寻找 `[i-1, 0]` 中比当前元素小的第一个元素」的行为叫做「寻找合法对象」。显然我们在枚举每一个元素时都需要 **查询** 和 **维护** 这样的合法对象线性序列，可以理解为记忆化从而加速查询。那么如何高效查询和维护这样的线性序列呢？不妨考虑每一个合法对象对曾经的合法对象的影响：
>
>     - 若当前元素 `nums[i]` 可以成为后续 `[i+1, n-1]` 元素的合法对象。则从 `i-1` 开始一直往左，只要比当前大的元素，都不可能成为 `[i+1, n-1]` 的合法对象，肯定都被 `nums[i]` “拦住了”。那么在「合法对象序列」中插入当前合法对象之前，需要不断尾弹出比当前大的元素
>     - 若当前元素 `nums[i]` 不能成为后续 `[i+1, n-1]` 元素的合法对象。表明当前元素过大，此时就不用将当前元素插入「合法对象序列」
>
> - 经过上述两个角度的讨论，很容易发现这样维护出来的的合法序列是严格单调递增的。于是，在查询操作时仅需要进行尾比较与尾弹出即可，在维护操作时，仅需要尾插入即可。满足这样的线性数据结构有很多，如栈、队列、数组、链表，我们就使用栈来演示，与标题遥相呼应
>
> 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>

using ll = long long;
using namespace std;

void solve() {
    int n;
    cin >> n;

    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    stack<int> s;
    for (int i = 0; i < n; i++) {
        // 查询
        while (s.size() && s.top() >= a[i]) {
            s.pop();
        }
        cout << (s.size() ? s.top() : -1) << " ";
        
        // 维护
        s.push(a[i]);
    }
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

相似题：

[下一个更大元素 II](https://leetcode.cn/problems/next-greater-element-ii/)

## 【模板】单调队列

> 标签：双端队列、滑动窗口、单调队列
>
> 题意：给定一个含有 n 个元素的序列，求解其中每个长度为 k 的子数组中的最值。
>
> 思路：显然我们可以 $O(nk)$ 暴力求解，有没有什么方法可以将「求解子数组中最值」的时间开销从 $O(k)$ 降低为 $O(1)$ 呢？有的！我们重新定义一个队列就好了。为了做到线性时间复杂度的优化，我们对队列做以下自定义，以「求解子数组最小值」为例：
>
> 1. 插入元素到队尾：此时和单调栈的逻辑类似。如果当前元素可以作为当前子数组或后续子数组的最小值，则需要从当前队尾开始依次弹出比当前元素严格大的元素，最后再将当前元素入队。**注意**：当遇到和当前元素值相等的元素时不能出队，因为每一个元素都会经历入队和出队的操作，一旦此时出队了，后续进行出队判定时会提前弹出本不应该出队的与其等值的元素。
> 2. 弹出队头元素：如果队头元素和子数组左端点 `nums[i-k]` 的元素值相等，则弹出。
> 3. 获得队头元素：$O(1)$ 的获取队头元素，即队列中的最小值。
>
> 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>

using ll = long long;
using namespace std;

template<class T>
struct minQueue {
    std::deque<T> q;
    void pushBack(T x) {
        while (q.size() && x < q.back()) {
            q.pop_back();
        }
        q.push_back(x);
    }
    void popFront(T x) {
        if (q.size() && q.front() == x) {
            q.pop_front();
        }
    }
    T getMinValue() {
        return q.front();
    }
};

template<class T>
struct maxQueue {
    std::deque<T> q;
    void pushBack(T x) {
        while (q.size() && x > q.back()) {
            q.pop_back();
        }
        q.push_back(x);
    }
    void popFront(T x) {
        if (q.size() && q.front() == x) {
            q.pop_front();
        }
    }
    T getMaxValue() {
        return q.front();
    }
};

void solve() {
    int n, k;
    cin >> n >> k;
    
    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    
    minQueue<int> minq;
    for (int i = 0; i < n; i++) {
        minq.pushBack(nums[i]);
        if (i >= k) {
            minq.popFront(nums[i - k]);
        }
        if (i >= k - 1) {
            cout << minq.getMinValue() << " \n"[i == n - 1];
        }
    }
    
    maxQueue<int> maxq;
    for (int i = 0; i < n; i++) {
        maxq.pushBack(nums[i]);
        if (i >= k) {
            maxq.popFront(nums[i - k]);
        }
        if (i >= k - 1) {
            cout << maxq.getMaxValue() << " \n"[i == n - 1];
        }
    }
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
from collections import defaultdict, deque
from typing import List, Tuple
from itertools import combinations, permutations
import math, heapq, queue

II = lambda: int(input())
FI = lambda: float(input())
MII = lambda: tuple(map(int, input().split()))
LII = lambda: list(map(int, input().split()))


def solve() -> None:
    n, k = MII()
    nums = LII()
    
    qa, qb = deque(), deque()
    ra, rb = [], []
    for i in range(n):
        # push back
        while len(qa) and nums[i] < qa[-1]:
            qa.pop()
        qa.append(nums[i])
        while len(qb) and nums[i] > qb[-1]:
            qb.pop()
        qb.append(nums[i])
        if i >= k:
            # pop front
            if len(qa) and qa[0] == nums[i - k]:
                qa.popleft()
            if len(qb) and qb[0] == nums[i - k]:
                qb.popleft()
        if i >= k - 1:
            # get ans
            ra.append(qa[0])
            rb.append(qb[0])
    
    print(' '.join(map(str, ra)))
    print(' '.join(map(str, rb)))


if __name__ == '__main__':
    T = 1
    # T = II()
    while T: solve(); T -= 1
```

## 【模板】最近公共祖先

https://www.luogu.com.cn/problem/P3379

> 题意：寻找树中指定两个结点的最近公共祖先 $\text{(Lowest Common Ancestor, 简称 LCA)}$。
>
> 思路：对于每次查询，我们可以从指定的两个结点开始往上跳，第一个公共结点就是目标的 LCA，每一次询问的时间复杂度均为 $O(n)$，为了加速查询，我们可以采用倍增法，预处理出往上跳的结果，即 `fa[i][j]` 数组，表示 $i$ 号点向上跳 $2^j$ 步后到达的结点。接下来在往上跳跃的过程中，利用二进制拼凑的思路，即可在 $O(\log n)$ 的时间内查询到 LCA。
>
> 预处理：可以发现，对于 `fa[i][j]`，我们可以通过递推的方式获得，即 `fa[i][j] = fa[fa[i][j-1]][j-1]`，当前结点向上跳跃 $2^j$ 步可以拆分为先向上 $2^{j-1}$ 步, 在此基础之上再向上 $2^{j-1}$ 步.于是我们可以采用宽搜 $or$ 深搜的顺序维护 $fa$ 数组。
>
> 跳跃：我们首先需要将两个结点按照倍增的思路向上跳到同一个深度，接下来两个结点同时按照倍增的思路向上跳跃，为了确保求出最近的，我们需要确保在跳跃的步调一致的情况下，两者的祖先始终不相同，那么倍增结束后，两者的父结点就是最近公共祖先，即 `fa[x][k]` 或 `fa[y][k]`
>
> 时间复杂度：$\Theta(n \log n + m \log n)$ 
>
> - $n \log n$ 为预处理每一个结点向上跳跃抵达的情况
> - $m \log n$ 为 $m$ 次询问的情况

```cpp
const int N = 5e5 + 10;

int n, Q, root;
vector<int> G[N];
int fa[N][20], dep[N];
queue<int> q;

void init() {
    dep[root] = 1;
    q.push(root);

    while (q.size()) {
        int now = q.front();
        q.pop();
        for (int ch: G[now]) {
            if (!dep[ch]) {
                dep[ch] = dep[now] + 1;
                fa[ch][0] = now;
                for (int k = 1; k <= 19; k++) {
                    fa[ch][k] = fa[ fa[ch][k-1] ][k-1];
                }
                q.push(ch);
            }
        }
    }
}

int lca(int a, int b) {
    if (dep[a] < dep[b]) swap(a, b);

    // 二进制拼凑从而跳到一样高
    for (int k = 19; k >= 0; k--)
        if (dep[fa[a][k]] >= dep[b])
            a = fa[a][k];

    if (a == b) return a;

    for (int k = 19; k >= 0; k--)
        if (fa[a][k] != fa[b][k])
            a = fa[a][k], b = fa[b][k];

    return fa[a][0];
}

void solve() {
    cin >> n >> Q >> root;
    for (int i = 0; i < n - 1; ++i) {
        int a, b;
        cin >> a >> b;
        G[a].push_back(b);
        G[b].push_back(a);
    }

    init();

    while (Q--) {
        int a, b;
        cin >> a >> b;
        cout << lca(a, b) << "\n";
    }
}    
```

## 栈

#### 验证栈序列

https://www.luogu.com.cn/problem/P4387

> - 题意：给定入栈序列与出栈序列，问出栈序列是否合法
>
> - 思路：思路很简单，就是对于当前出栈的数，和入栈序列中最后已出栈的数之间，如果还有数没有出，那么就是不合法的出栈序列，反之合法。这是从入栈的结果来看的，如果这么判断就需要扫描入栈序列 n 次，时间复杂度为 $O(n^2)$。我们按照入栈的顺序来看，对于当前待入栈的数，若与出栈序列的队头不等，则成功入栈等待后续出栈；若与出栈序列相等，则匹配成功直接出栈无需入栈，同时对已入栈的数与出栈序列队头不断匹配直到不相等。最后判断待入栈的数与出栈序列是否全部匹配掉了，如果全部匹配掉了说明该出栈序列合法，反之不合法
>
>     抽象总结上述思路：为了判断出栈序列是否合法，我们不妨思考：对于每一个出栈的数，出栈的时机是什么？可以发现出栈的时机无非两种：
>
>     - 一入栈就出栈（对应于枚举待入栈序列时发现待入栈的数与出栈序列队头相等）
>     - 紧跟着刚出栈的数继续出栈（对应于枚举待入栈序列时发现待入栈的数与出栈序列队头相等之后，继续判断出栈序列队头与已入栈的数是否相等，若相等则不断判断并出栈）
>
> - 时间复杂度：$O(n)$

```cpp
// #include <bits/stdc++.h>
// #define int long long
#include <iostream>
#include <unordered_map>
#include <stack>
#include <queue>
using namespace std;

void solve() {
    int n;
    cin >> n;
    
    vector<int> a(n), b(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < n; i++) cin >> b[i];
    
    stack<int> stk;
    int i = 0, j = 0;
    while (i < n) {
        if (a[i] != b[j]) stk.push(a[i++]);
        else {
            i++, j++;
            while (!stk.empty() && b[j] == stk.top()) {
                stk.pop();
                j++;
            }
        }
    }
    
    cout << (stk.empty() ? "Yes" : "No") << "\n";
}

signed main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr), cout.tie(nullptr);
    int T = 1;
    cin >> T;
    while (T--) solve();
    return 0;
}
```

## 【二叉树】美国血统

https://www.luogu.com.cn/problem/P1827

> 题意：给定二叉树的中序和先序序列，输出后序序列
>
> 思路：经典二叉树的题目，主要用于巩固加强对于递归的理解。指针其实是没有必要的，为了得到后序序列，我们只需要有一个 dfs 序即可，为了得到 dfs 序，我们只需要根据给出的中序和前序序列即可得到 dfs 序
>
> 时间复杂度：$O(n)$

指针做法

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 30;

string mid, pre;

struct Node {
    char data;
    Node* le, * ri;
    Node(char _data) : data(_data), le(nullptr), ri(nullptr) {}
};

Node* build(int i, int j, int p, int q) {
    if (i > j) return nullptr;
    
    Node* root = new Node(pre[i]);
    
    int k; // 根结点在中序序列的下标 
    for (k = p; k <= q; k++)
        if (mid[k] == root->data)
            break;
    
    root->le = build(i + 1, k - p + i, p, k - 1);
    root->ri = build(k - p + i + 1, j, k + 1, q);
    
    cout << root->data; 
    
    return root;
}

void solve() {
    cin >> mid >> pre;
    
    int i = 0, j = pre.size() - 1;
    int p = 0, q = mid.size() - 1;
    
    build(i, j, p, q);
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

构造出 dfs 序直接输出

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 30;

string mid, pre;

// 前序起始 i，前序末尾 j，中序起始 p，中序末尾 q 
void build(int i, int j, int p, int q) {
    if (i > j) return;
    
    char root = pre[i];
    
    int k;
    for (k = p; k <= q; k++)
        if (mid[k] == root)
            break;
            
    build(i + 1, k - p + i, p, k - 1);
    build(k - p + i + 1, j, k + 1, q);
    
    cout << root;
} 

void solve() {
    cin >> mid >> pre;
    
    int i = 0, j = pre.size() - 1;
    int p = 0, q = mid.size() - 1;
    
    build(i, j, p, q);
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

## 【二叉树】新二叉树

https://www.luogu.com.cn/problem/P1305

> 题意：给定一棵二叉树的 n 个结点信息，分别为当前结点的数据信息、左孩子结点信息和右结点信息，输出这棵二叉树的前序序列
>
> 思路：我们首先将这棵二叉树构建出来，接着遍历输出前序序列即可。关键在于如何构建二叉树？我们使用数组存储二叉树，对于每一个树上结点，我们将数组中元素的索引存储为树上结点信息，每一个结点再存储左孩子与右孩子的信息
>
> 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

int n;
string s;
char root;

struct Node {
    char l, r;
} tree[200];

void pre(char now) {
    if (now == '*') return;
    cout << now;
    pre(tree[now].l);
    pre(tree[now].r);
}

void solve() {
    cin >> n;
    
    for (int i = 1; i <= n; i++) {
        cin >> s;
        if (i == 1) root = s[0];
        tree[s[0]].l = s[1];
        tree[s[0]].r = s[2];
    }
    
    pre(root);
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

## 【二叉树】遍历问题

https://www.luogu.com.cn/problem/P1229

> 题意：给定一棵二叉树的前序序列与后序序列，问中序序列的可能情况有多少种
>
> 思路：我们采用从最小结构单元的思路进行考虑，即假设当前二叉树只有一个根结点与两个叶子结点，而非两棵子树。然后将题意进行等价变换，即问对于已经固定的前序和后序二叉树，该二叉树有多少种不同的形状？对于当前的最小结构二叉树，形状就是 **左右根** or **根左右**，现在的根可以直接确定，那么就只能从左右孩子进行变形，很显然只能进行左右交换的变形，但是问题是一旦左右变换，前序 or 后序都会变掉，说明这种左右孩子都存在的前后序固定的二叉树是唯一的，那么如何才是不唯一的呢？我们考虑减少孩子数量。假设没有孩子，那么很显然也只有一个形状，就是一个根结点，故排除。于是答案就呼之欲出了，就是当根结点只有一个孩子时，这个孩子无论是在左边还是右边，前后序都是相同的，但是中序序列就不同了，于是就产生了两种中序序列。于是最终的结论是：对于前后序确定的二叉树来说，中序序列的情况是就是 $2^{\text{单分支结点数}}$ 个。现在的问题就转变为了在给定前后序的二叉树中求解单分支结点个数的问题。
>
> 如何寻找单分支结点呢？根据下面的递归图可以发现，无论是左单分支还是右单分支，如果 pre 的连续两个结点与 post 的连续两个结点对称相同，那么就一定有一个单分支结点，故只需要寻找前后序序列中连续两个字符对称相同的情况数 cnt 即可。最终的答案数就是 $2^{cnt}$
>
> ![图例](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406061327025.png)
>
> 时间复杂度：$O(nm)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

string pre, post;

void solve() {
    cin >> pre >> post;
    
    int cnt = 0;
    
    for (int i = 0; i < pre.size() - 1; i++)
        for (int j = 0; j < post.size(); j++)
            if (pre[i] == post[j + 1] && pre[i + 1] == post[j])
                cnt++;
    
    cout << (1 << cnt) << "\n";
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

## 【二叉树】医院设置 :fire:

https://www.luogu.com.cn/problem/P1364

> 题意：给定一棵二叉树，树中每一个结点存储了一个数值表示一个医院的人数，现在需要在所有的结点中将一个结点设置为医院使得其余结点中的所有人到达该医院走的路总和最小。路程为结点到医院的最短路，边权均为 1。给出最终的最短路径总和
>
> 思路一：暴力
>
> - 显然的对于已经设置好医院的局面，需要求解的路径总和就直接将树遍历一边即可。每一个结点都可以作为医院进行枚举，每次遍历是 $O(n)$ 的
>
> - 时间复杂度：$O(n^2)$
>
> 思路二：带权树的重心
>
> - TODO
> - 时间复杂度：$O(n)$

暴力代码

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 110;

int n;

vector<int> G[N];
int cnt[N];

int bfs(int v) {
    int res = 0;
    vector<bool> vis(n + 1, false);
    vector<int> d(n + 1, 0); // d[i] 表示点 i 到点 v 的距离
        
    queue<int> q;
    vis[v] = true;
    d[v] = 0;
    q.push(v);
    
    while (q.size()) {
        int now = q.front();
        q.pop();
        
        for (auto& ch: G[now]) {
            if (!vis[ch]) {
                vis[ch] = true;
                d[ch] = d[now] + 1;
                q.push(ch);
                
                res += cnt[ch] * d[ch]; 
            }
        }
    }
    
    return res;
}

void solve() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int count, l, r;
        cin >> count >> l >> r;
        cnt[i] = count;
        
        if (l) {
            G[i].push_back(l);
            G[l].push_back(i);
        }
        
        if (r) {
            G[i].push_back(r);
            G[r].push_back(i);
        }
    }
    
    int res = 1e7 + 10;
    
    for (int i = 1; i <= n; i++) {
        res = min(res, bfs(i));
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

优化代码

```cpp

```

## 【二叉树】二叉树深度

https://www.luogu.com.cn/problem/P4913

> 题意：给定一棵二叉树，求解这棵二叉树的深度
>
> 思路：有两个考点，一个是如何根据给定的信息（从根结点开始依次给出已存在树上结点的左右孩子的编号）构建二叉树，一个是如何求解已经构建好的二叉树的深度。对于构建二叉树，我们沿用 T5 数组模拟构建的思路，直接定义结点类型即可；对于求解深度，很显然的一个递归求解，即左右子树深度值 +1 即可
>
> 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 1000010;

int n;

struct Node {
    int l, r;
} t[N];

int dep(int now) {
    if (!now) return 0;
    return max(dep(t[now].l), dep(t[now].r)) + 1;
}

void solve() {
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int x, y;
        cin >> x >> y;
        t[i].l = x, t[i].r = y;
    }
    
    cout << dep(1);
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

## 【完全二叉树】淘汰赛

https://www.luogu.com.cn/problem/P1364

> 题意：给定 $2^n$ 支球队的编号与能力值，进行淘汰赛，能力值者晋级下一轮直到赛出冠军。输出亚军编号
>
> 思路：很显然的一个完全二叉树的题目。我们都不需要进行递归操作，直接利用完全二叉树的下标性质利用数组模拟循环计算即可。给出的信息就是完全二叉树的全部叶子结点的信息，分别为球队编号 id 与球队能力值 val，我们从第 n-1 个结点开始循环枚举到第 1 个结点计算每一轮的胜者信息，最终输出最后一场的能力值较小者球队编号即可
>
> 时间复杂度：$\Theta(2n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 1 << 8;

struct Node {
    int id, val;
} a[N];

int n;

void solve() {
    cin >> n;
    
    n = 1 << n;
    
    for (int i = n; i <= 2 * n - 1; i++) {
        a[i].id = i - n + 1;
        cin >> a[i].val;
    }
    
    for (int i = n - 1; i >= 1; i--)
        if (a[i * 2].val > a[i * 2 + 1].val) a[i] = a[i * 2];
        else a[i] = a[i * 2 + 1];
            
    if (a[2].val > a[3].val) cout << a[3].id;
    else cout << a[2].id;
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

## 【二叉树/LCA】二叉树问题

https://www.luogu.com.cn/problem/P3884

> 题意：给定一棵二叉树的结点关系信息，求出这棵二叉树的深度、宽度和两个指定结点之间的最短路径长度
>
> 思路：二叉树的构建直接采用有向图的构造方法。深度直接 dfs 即可，宽度直接在 dfs 遍历时哈希深度值即可。问题的关键在于如何求解两个给定结点之间的路径长度，很显然需要求解两个结点的 LCA，由于结点数 $\le 100$ 故直接采用暴力的方法，可以重定义结点，增加父结点域。也可以通过比对根结点到两个指定结点的路径信息得到 LCA 即最后一个相同的结点编号（本题采用），通过在 dfs 遍历树时存储路径即可得到根结点到两个指定结点的路径信息。之后直接根据题中新定义的路径长度输出即可，即
> $$
> \text{length} = 2 \times (d_x - d_{lca}) + (d_y - d_{lca})
> $$
> 其中 $d_i$ 表示：根结点到第 $i$ 号点之间的路径长度，在 dfs 时通过传递深度值维护得到
>
> 时间复杂度：$O(n)$

```cpp
#include <bits/stdc++.h>
#define int long long
using namespace std;

const int N = 110;

int n, x, y;
vector<int> G[N];
int depth, width;
unordered_map<int, int> ha; // 将所有的深度值进行哈希
int d[N];                   // d[i] 表示第 i 个点到根结点的边数
vector<int> temp, rx, ry;   // 根结点到 x 号点与 y 号点直接的路径结点编号

// 当前结点编号 now，当前深度 level
void dfs(int now, int level) {
    depth = max(depth, level);
    
    temp.push_back(now);
    if (now == x) rx = temp;
    if (now == y) ry = temp;
    
    ha[level]++;
    d[now] = level - 1;
    
    for (auto& ch: G[now]) {
        dfs(ch, level + 1);
        temp.pop_back();
    }
}

// 暴力 lca + 计算路径长度
int len(int x, int y) {
    int i = 0;
    while (i < rx.size() && i < ry.size() && rx[i] == ry[i]) i++;
    
    int lca = rx[--i];
    
    return 2 * (d[x] - d[lca]) + (d[y] - d[lca]);
}

void solve() {
    cin >> n;
    
    for (int i = 1; i <= n - 1; i++) {
        int a, b;
        cin >> a >> b;
        G[a].push_back(b);
    }
    
    cin >> x >> y;
    
    // 二叉树的深度 depth
    dfs(1, 1);
    cout << depth << "\n";
    
    // 二叉树的宽度 width
    for (auto& item: ha) width = max(width, item.second);
    cout << width << "\n";
    
    // 两个结点之间的路径长度
    cout << len(x, y) << "\n";
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

## 【set】营业额统计

https://www.luogu.com.cn/problem/P2234

> 题意：给定一个序列 a，需要计算 $a_1 + \displaystyle \sum_{i=2,1 \le j <i}^{n} \min {|a_i - a_j|}$ ，即计算每一个数与序列中当前数之前的数的最小差值之和
>
> 思路：很显然的思路，对于每一个数，我们需要对之前的序列在短时间内找到一个数值最接近当前数的数。
> - TLE：一开始的思路是每次对之前的序列进行排序，然后二分查找与当前值匹配的数，为了确保所有的情况都找到，就直接判断二分查到的数，查到的数之前的一个数，之后的一个数，但是时间复杂度极高（我居然没想到），是 $O(n^2 \log n)$
> - AC：后来看了题解才知道 `set` 的正确用法，就是一个 **平衡树的 STL**。我们对于之前的序列不断的插入平衡树中（默认升序排序），每次利用 `s.lower_bound(x)` 返回「集合 `s` 中第一个 $\ge$ 当前数的迭代器」，然后进行判断即可。`lower_bound()` 的时间复杂度为 $O(\log n)$ 。需要注意的是边界的判断，一开始的思路虽然会超时，但是二分后边界的判断很简单，使用 STL 后同样需要考虑边界的情况。分为三种（详情见代码）
>     - 当前数比集合中所有的数都大，那么 `lower_bound` 就会返回 `s.end()` 答案就是当前数与集合中最后一个数的差值
>     - 当前数比集合中所有的数都小，那么 `lower_bound` 就会返回 `s.bigin()` 答案就是集合中第一个数与当前数的差值
>     - 当前数存在于集合中 or 集合中既有比当前数大的又有比当前数小的，那么就比较查到的数与查到的数前一个数和当前数的差值，取最小的差值即可
>
> 时间复杂度：$O(n \log n)$

TLE 但逻辑清晰代码

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

const int N = 1 << 16;

int n, a[N];

void solve() {
    cin >> n;
    
    int res = 0;
    cin >> a[1];
    res += a[1];
    
    for (int i = 2; i <= n; i++) {
        // 维护之前序列有序
        sort(a + 1, a + i);
        cin >> a[i];

        // 二分查找目标数
        int l = 1, r = i - 1;
        while (l < r) {
            int mid = (l + r) >> 1;
            if (a[mid] < a[i]) l = mid + 1;
            else r = mid;
        }
        
        // 边界判断
        int ans = abs(a[i] - a[r]);
        if (r + 1 >= 1 && r + 1 <= i - 1) ans = min(ans, abs(a[i] - a[r + 1]));
        if (r - 1 >= 1 && r - 1 <= i - 1) ans = min(ans, abs(a[i] - a[r - 1]));
        
        res += ans;
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

AC 的 set 代码

```cpp
#include <iostream>
#include <algorithm>
#include <set>
using namespace std;

int n, res;
set<int> s;

void solve() {
    cin >> n;
    
    int x;
    cin >> x;
    res += x;
    s.insert(x);
    
    while (--n) {
        cin >> x;

        auto it = s.lower_bound(x);

        if (it == s.end()) {
            // 没有比当前数大的
            res += x - *s.rbegin();
        } else if (it == s.begin()) {
            // 没有比当前数小的
            res += *s.begin() - x;
        } else {
            // 当前数已存在于集合中 or 既有比当前数大的也有比当前数小的
            auto pre = it;
            pre--;
            res += min(abs(x - *it), abs(x - *pre));
        }
        
        s.insert(x);
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

## 【multiset】切蛋糕

https://www.acwing.com/problem/content/description/5581/

> 题意：给定一个矩形，由左下角和右上角的坐标确定。现在对这个矩形进行切割操作，要么竖着切，要么横着切。现在需要给出每次切割后最大子矩形的面积
>
> 思路：STL set。很容易想到，横纵坐标是相互独立的，最大子矩形面积一定产生于最大长度与最大宽度的乘积。因此我们只需要维护一个序列的最大值即可。对于二维可以直接当做一维来看，于是问题就变成了，需要在 $\log n$ 的时间复杂度内，对一个序列完成下面三个操作：
>
> 1. 删除一个数
> 2. 增加一个数（执行两次）
> 3. 获取最大值
>
> 如何实现呢？我们需要有序记录每一个子线段的长度，并且子线段的长度可能重复，因此我们用 `std::multiset` 来存储所有子线段的长度
>
> 1. 使用 `M.erase(M.find(value))` 实现：删除一个子线段长度值
> 2. 使用 `M.insert(value)` 实现：增加子线段一个长度值
> 3. 使用 `*M.rbegin()` 实现：获取当前所有子线段长度的最大值
>
> 由于给的是切割的位置坐标 `x`，因此上述操作 1 不能直接实现，我们需要利用给定的切割坐标 `x` 计算出当前切割位置对应子线段的长度。如何实现呢？我们知道，对于当前切割的坐标 `x`，对应的子线段的长度取决于当前切割坐标左右两个切割的位置 `rp, lp`，因此我们只需要存储每一个切割的坐标即可。由于切割位置不会重复，并且需要在 $\log n$ 的时间复杂度内查询到，因此我们还是可以使用 `std::set` 来存储切割位置
>
> 时间复杂度：$O(n \log n)$

```cpp
#include <iostream>
#include <set>
using namespace std;
using ll = long long;

void work(int x, set<int>& S, multiset<int>& M) {
    set<int>::iterator rp = S.upper_bound(x), lp = rp;
    lp--;
    S.insert(x);

    M.erase(M.find(*rp - *lp));
    M.insert(*rp - x);
    M.insert(x - *lp);
}

void solve() {
    int w, h, n;
    cin >> w >> h >> n;

    set<int> S1, S2;
    multiset<int> M1, M2;
    S1.insert(0), S1.insert(w), M1.insert(w);
    S2.insert(0), S2.insert(h), M2.insert(h);

    while (n--) {
        char op;
        int x;
        cin >> op >> x;
        if (op == 'X') work(x, S1, M1);
        else work(x, S2, M2);

        cout << (ll)*M1.rbegin() * *M2.rbegin() << "\n";
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

## 并查集

### Milk Visits S

https://www.luogu.com.cn/problem/P5836

> 题意：给定一棵树，结点被标记成两种，一种是 H，一种是 G，在每一次查询中，需要知道指定的两个结点之间是否含有某一种标记
>
> 思路：对于树上标记，我们可以将相同颜色的分支连成一个连通块
>
> - 如果查询的两个结点在同一个连通块，则查询两个结点所在的颜色与所需的颜色是否匹配即可
> - 如果查询的两个结点不在同一个连通块，两个结点之间的路径一定是覆盖了两种颜色的标记，则答案一定是 1
>
> 时间复杂度：$\Theta(n+m)$

```cpp
const int N = 100010;

int n, m, p[N];
char col[N];

int find(int x) {
    if (p[x] != x) {
        p[x] = find(p[x]);
    }
    return p[x];
}

void solve() {
    cin >> n >> m;
    cin >> (col + 1);

    for (int i = 1; i <= n; i++) {
        p[i] = i;
    }

    for (int i = 1; i <= n - 1; i++) {
        int a, b;
        cin >> a >> b;
        if (col[a] == col[b]) {
            p[find(a)] = find(b);
        }
    }

    string res;

    while (m--) {
        int u, v;
        cin >> u >> v;

        char cow;
        cin >> cow;

        if (find(u) == find(v)) {
            res += to_string(col[u] == cow);
        } else {
            res += '1';
        }
    }

    cout << res << "\n";
}
```

### 尽量减少恶意软件的传播

https://leetcode.cn/problems/minimize-malware-spread/description/

>题意：给定一个由邻接矩阵存储的无向图，其中某些结点具备感染能力，可以感染相连的所有结点，问消除哪一个结点的感染能力可以使得最终不被感染的结点数量尽可能少，给出消除的有感染能力的最小结点编号
>
>思路：很显然我们可以将当前无向图的多个连通分量，共三种感染情况：
>
>1. 如果一个连通分量中含有 $\ge 2$ 个感染结点，则当前连通分量一定会被全部感染；
>
>2. 如果一个连通块中含有 $0$ 个感染结点，则无需任何操作；
>
>3. 如果一个连通块中含有 $1$ 个感染结点，则最佳实践就是移除该连通块中唯一的那个感染结点。
>
>当然了，由于只能移走一个感染结点，我们需要从所有只含有 $1$ 个感染结点的连通块中移走连通块结点最多的那个感染结点。因此我们需要统计每一个连通分量中感染结点的数量以及总结点数，采用并查集进行统计。需要注意的是题目中的“索引最小”指的是结点编号最小而非结点在序列 $initial$ 中的下标最小。算法流程见代码。
>
>时间复杂度：$O(n^2)$

```cpp
class Solution {
public:
    int p[310];

    int Find(int x) {
        if (x != p[x]) p[x] = Find(p[x]);
        return p[x];
    }

    int minMalwareSpread(vector<vector<int>>& graph, vector<int>& initial) {
        // 1. 维护并查集数组：p[]
        int n = graph.size();
        for (int i = 0; i < n; i++) p[i] = i;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (graph[i][j])
                    p[Find(i)] = Find(j);

        // 2. 维护哈希表：每一个连通块中的感染结点数、总结点数
        unordered_map<int, pair<int, int>> ha;
        for (auto& x: initial) ha[Find(x)].first++;
        for (int i = 0; i < n; i++) ha[Find(i)].second++;

        // 3. 排序：按照感染结点数升序，总结点数降序
        vector<pair<int, int>> v;
        for (auto& it: ha) v.push_back(it.second);
        sort(v.begin(), v.end(), [&](pair<int, int>& x, pair<int, int>& y){
            if (x.first == y.first) return x.second > y.second;
            return x.first < y.first;
        });

        // 4. 寻找符合条件的连通块属性：找到序列中第一个含有 1 个感染结点的连通块祖宗结点编号 idx
        int idx = -1;
        for (int i = 0; i < v.size(); i++) {
            if (v[i].first == 1) {
                idx = i;
                break;
            }
        }

        // 5. 返回答案：比对感染结点所在的连通块属性与目标连通块属性
        if (idx == -1) {
            // 特判没有连通块只含有 1 个感染结点的情况
            return *min_element(initial.begin(), initial.end());
        }
        
        int res = n + 10;
        for (auto& x: initial) {
            int px = Find(x);
            if (ha[px].first == v[idx].first && ha[px].second == v[idx].second) {
                res = min(res, x);
            }
        }

        return res;
    }
};
```

### 账户合并

https://leetcode.cn/problems/accounts-merge/

> 题意：给定 n 个账户，每一个账户含有一个用户名和最多 m 个绑定的邮箱。由于一个用户可能注册多个账户，因此我们需要对所有的账户进行合并使得一个用户对应一个账户。合并的规则是将所有「含有相同邮箱的账户」视作同一个用户注册的账户。返回合并后的账户列表。
>
> 思路：这道题的需求很显然，我们需要合并含有相同邮箱的账户。显然有一个暴力的做法，我们直接枚举每一个账户中所有的邮箱，接着枚举剩余账户中的邮箱进行匹配，匹配上就进行合并，但这样做显然会造成大量的冗余匹配和冗余合并，我们不妨将这两个过程进行拆分。我们需要解决两个问题：
>
> - 哪些账户需要合并？很容易想到并查集这样的数据结构。我们使用哈希表存储每一个邮箱的账户编号，最后进行集合合并即可维护好每一个账号归属的集合编号。$O(nm)$
> - 如何合并指定账户？对于上述维护好的集合编号，我们需要合并所有含有相同“祖先”的账户。排序去重或使用有序列表均可实现。$O(n\log n)$
>
> 时间复杂度：$O(n\log n)$

```cpp []
struct dsu {
    int n;
    std::vector<int> p;
    dsu(int _n) { n = _n; p.resize(n + 1); for (int i = 1; i <= n; i++) p[i] = i; }
    int find(int x) { return (p[x] == x ? p[x] : p[x] = find(p[x])); }
    void merge(int a, int b) { p[find(a)] = find(b); }
    bool query(int a, int b) { return find(a) == find(b); }
    int block() { int ret = 0; for (int i = 1; i <= n; i++) ret += p[i] == i; return ret; }
};

class Solution {
public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        // 维护每一个子账户归属的集合
        int n = accounts.size();
        unordered_map<string, vector<int>> hash;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j < accounts[i - 1].size(); j++) {
                hash[accounts[i - 1][j]].push_back(i);
            }
        }        
        dsu d(n);
        for (auto& it: hash) {
            vector<int> v = it.second;
            for (int i = 1; i < v.size(); i++) {
                d.merge(v[i - 1], v[i]);
            }
        }

        // 按照子账户归属的集合合并出最终的账户
        unordered_set<int> fa;
        for (int i = 1; i <= n; i++) {
            fa.insert(d.find(i));
        }
        vector<vector<string>> res;
        for (auto p: fa) {
            set<string> se;
            vector<string> ans;
            for (int i = 1; i <= n; i++) {
                if (d.find(i) == p) {
                    if (ans.empty()) {
                        ans.push_back(accounts[i - 1][0]);
                    }
                    for (int j = 1; j < accounts[i - 1].size(); j++) {
                        se.insert(accounts[i - 1][j]);
                    }
                }
            }
            for (auto mail: se) {
                ans.push_back(mail);
            }
            res.push_back(ans);
        }

        return res;
    }
};
```

```python []
class dsu:
    def __init__(self, n: int) -> None:
        self.n = n
        self.p = [i for i in range(n + 1)]
    def find(self, x: int) -> int:
        if self.p[x] != x: self.p[x] = self.find(self.p[x])
        return self.p[x]
    def merge(self, a: int, b: int) -> None:
        self.p[self.find(a)] = self.find(b)
    def query(self, a: int, b: int) -> bool:
        return self.find(a) == self.find(b)
    def block(self) -> int:
        return sum([1 for i in range(1, self.n + 1) if self.p[i] == i])

class Solution:
    def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
        from collections import defaultdict
        
        n = len(accounts)
        hash = defaultdict(list)
        for i in range(1, n + 1):
            for j in range(1, len(accounts[i - 1])):
                hash[accounts[i - 1][j]].append(i)
        
        d = dsu(n)
        for _, ids in hash.items():
            for i in range(1, len(ids)):
                d.merge(ids[i - 1], ids[i])
        
        fa = set()
        for i in range(1, n + 1):
            fa.add(d.find(i))
        
        res = []
        for p in fa:
            ans = []
            se = set()
            for i in range(1, n + 1):
                if d.find(i) == p:
                    if len(ans) == 0:
                        ans.append(accounts[i - 1][0])
                    for j in range(1, len(accounts[i - 1])):
                        se.add(accounts[i - 1][j])
            ans += sorted(se)
            res.append(ans)
        
        return res
```

## 树状数组

### 将元素分配到两个数组中 II

https://leetcode.cn/problems/distribute-elements-into-two-arrays-ii/description/

> 题意：给定 $n$ 个数，现在需要将这些数按照某种规则分配到两个数组 $A$ 和 $B$ 中。初始化分配 `nums[0]` 到 $A$ 中，`nums[1]` 到 $B$ 中，接下来对于剩余的每个元素 `nums[i]`，分配取决于 $A$ 和 $B$ 中比当前元素 `nums[i]` 大的个数，最终返回两个分配好的数组
>
> 思路：首先每一个元素都需要进行枚举，那么本题需要考虑的就是如何在 $\log$ 时间复杂度内统计出两数组中比当前元素大的元素个数。针对 C++ 和 Python 分别讨论
>
> - C++
>     - 法一：`std::multiset<int>`。可惜不行，因为统计比当前元素大的个数时，`s.rbegin() - s.upper_bound(nums[i])` 是不合法的，因为 `std::multiset<int>` 的迭代器不是基于指针的，因此无法直接进行加减来计算地址差，遂作罢
>     - 法二：树状数组。很容易想到利用前缀和统计比当前数大的数字个数，但是由于此处需要对前缀和进行单点修改，因此时间复杂度肯定会寄。有什么数据结构支持「单点修改，区间更新」呢？我们引入树状数组。我们将数组元素哈希到 `[1, len(set(nums))]` 区间，定义哈希后的当前元素 `nums[i]` 为 `x`，对于当前哈希后的 `x` 而言想要知道两个数组中有多少数比当前数严格大，只需要计算前缀和数组 `arr` 中 `arr[n] - arr[x]` 的结果即可
> - Python
>     - `SortedList`。python 有一个 `sortedcontainers` 包其中有 `SortedList` 模块，可以实现 `std::multiset<int>` 所有 $\log$ 操作并且可以进行随机下标访问，于是就可以进行下标访问 $O(1)$ 计算比当前数大的元素个数
>     - 题外话。LeetCode 可以进行第三方库导入的操作，某些比赛不允许，需要手搓 `SortedList` 模块，~~当然可以用树状数组 or 线段树解决~~，板子链接：https://blog.dwj601.cn/Algorithm/a_template/#SortedList
>
> 时间复杂度：$O(n \log n)$

```cpp []
template<class T>
class BinaryIndexedTree {
private:
    std::vector<T> _arr;
    int _n;

    int lowbit(int x) { return x & (-x); }

public:
    BinaryIndexedTree(int n) :_n(n) {
        _arr.resize(_n + 1, 0);
    }

    void add(int pos, T x) {
        while (pos <= _n) {
            _arr[pos] += x;
            pos += lowbit(pos);
        }
    }

    T sum(int pos) {
        T ret = 0;
        while (pos) {
            ret += _arr[pos];
            pos -= lowbit(pos);
        }
        return ret;
    }
};


class Solution {
public:
    vector<int> resultArray(vector<int>& nums) {
        vector<int> copy = nums;
        sort(copy.begin(), copy.end());
        copy.erase(unique(copy.begin(), copy.end()), copy.end());

        int n = copy.size(), cnt = 1;
        unordered_map<int, int> a;
        for (int i = 0; i < n; i++) {
            a[copy[i]] = cnt++;
        }

        vector<int> v1, v2;
        v1.push_back(nums[0]);
        v2.push_back(nums[1]);

        BinaryIndexedTree<int> t1(n), t2(n);
        t1.add(a[nums[0]], 1);
        t2.add(a[nums[1]], 1);

        for (int i = 2; i < nums.size(); i++) {
            int d1 = t1.sum(n) - t1.sum(a[nums[i]]);
            int d2 = t2.sum(n) - t2.sum(a[nums[i]]);

            if (d1 > d2) {
                v1.push_back(nums[i]);
                t1.add(a[nums[i]], 1);                
            } else if (d1 < d2) {
                v2.push_back(nums[i]);
                t2.add(a[nums[i]], 1);
            } else if (d1 == d2 && v1.size() < v2.size()) {
                v1.push_back(nums[i]);
                t1.add(a[nums[i]], 1);
            } else if (d1 == d2 && v1.size() > v2.size()) {
                v2.push_back(nums[i]);
                t2.add(a[nums[i]], 1);
            } else {
                v1.push_back(nums[i]);
                t1.add(a[nums[i]], 1);
            }
        }

        for (int x: v2) {
            v1.push_back(x);
        }

        return v1;
    }
};
```

```python []
class BinaryIndexedTree:
    def __init__(self, n: int):
        self._n = n
        self._arr = [0] * (n + 1)

    def _lowbit(self, x: int) -> int:
        return x & (-x)

    def add(self, pos: int, x: int) -> None:
        while pos <= self._n:
            self._arr[pos] += x
            pos += self._lowbit(pos)

    def sum(self, pos: int) -> int:
        ret = 0
        while pos:
            ret += self._arr[pos]
            pos -= self._lowbit(pos)
        return ret


class Solution:
    def resultArray(self, nums: List[int]) -> List[int]:
        copy = sorted(set(nums))
        
        n, cnt, a = len(copy), 1, {}
        for x in copy:
            a[x] = cnt
            cnt += 1

        v1, v2 = [nums[0]], [nums[1]]
        t1, t2 = BinaryIndexedTree(n), BinaryIndexedTree(n)
        t1.add(a[nums[0]], 1)
        t2.add(a[nums[1]], 1)
        
        for x in nums[2:]:
            d1, d2 = t1.sum(n) - t1.sum(a[x]), t2.sum(n) - t2.sum(a[x])
            
            if d1 > d2:
                v1.append(x)
                t1.add(a[x], 1)
            elif d1 < d2:
                v2.append(x)
                t2.add(a[x], 1)
            elif d1 == d2 and len(v1) < len(v2):
                v1.append(x)
                t1.add(a[x], 1)
            elif d1 == d2 and len(v1) > len(v2):
                v2.append(x)
                t2.add(a[x], 1)
            else:
                v1.append(x)
                t1.add(a[x], 1)
        
        return v1 + v2
```

```python []
class Solution:
    def resultArray(self, nums: List[int]) -> List[int]:
        from sortedcontainers import SortedList
        
        v1, v2 = copy.deepcopy(nums[:1]), copy.deepcopy(nums[1:2])
        s1, s2 = SortedList(v1), SortedList(v2)

        for x in nums[2:]:
            d1, d2 = len(v1) - s1.bisect_right(x), len(v2) - s2.bisect_right(x)
            
            if d1 > d2:
                v1.append(x)
                s1.add(x)
            elif d1 < d2:
                v2.append(x)
                s2.add(x)
            elif d1 == d2 and len(v1) < len(v2):
                v1.append(x)
                s1.add(x)
            elif d1 == d2 and len(v1) > len(v2):
                v2.append(x)
                s2.add(x)
            else:
                v1.append(x)
                s1.add(x)
        
        return v1 + v2
```

## 线段树

### 以组为单位订音乐会的门票 :fire:

https://leetcode.cn/problems/booking-concert-tickets-in-groups/

> 题意：给定一个长为 $n\le 5 \times 10^4$ 且初始值均为 $0$ 的数组 $a$，数组中的每个元素最多增加到 $m$。现在需要以这个数组为基础进行 $q\le 5 \times 10^4$ 次询问，每次询问是以下两者之一：
>
> 1. 给定一个 $k$ 和 $lim$，找到最小的 $i \in [0,lim]$ 使得 $m - a_i \ge k$
> 2. 给定一个 $k$ 和 $lim$，找到最小的 $i \in [0,lim]$ 使得 $\displaystyle m\times (i+1) - \sum_{j=0}^i a_j \ge k$
>
> 思路一：**暴力**。
>
> - 对于询问 1，我们直接顺序遍历 a 数组直到找到第一个符合条件的即可；对于询问 2，同样直接顺序遍历 a 数组直到找到第一个符合条件的即可；
> - 时间复杂度 $O(qn)$。
>
> 思路二：**线段树上二分**。
>
> - TODO
> - 时间复杂度 $O(q\log n)$。

暴力代码：

```python
class BookMyShow:

    def __init__(self, n: int, m: int):
        self.a = [0] * n  # a[i] 表示第 i 行已入座的人数
        self.n = n
        self.m = m

    def gather(self, k: int, lim: int) -> List[int]:
        # 在 [0, lim] 行中找到第一个可以容纳 k 人的行
        for i in range(lim + 1):
            if self.m - self.a[i] >= k:
                l, r = i, self.a[i]
                self.a[i] += k
                return [l, r]
        return []

    def scatter(self, k: int, lim: int) -> bool:
        # 在 [0, lim] 行中找到最小的 i 使得 [0, i] 行可以容纳 k 人
        if self.m * (lim + 1) - sum(self.a[:lim+1]) < k:
            return False

        i = 0
        while k > 0:
            if self.m - self.a[i] >= k:
                self.a[i] += k
                k = 0
            else:
                k -= self.m - self.a[i]
                self.a[i] = self.m
            i += 1
        return True
```

线段树上二分代码：

```python

```

## 哈希

### 分组

https://www.acwing.com/problem/content/5182/

> 存储不想同组和想同组的人员信息：存入数组，数据类型为一对字符串
>
> 存储所有的组队信息：存入哈希表，数据类型为“键:字符串”“值:一对字符串”
>
> 想要知道最终的分组情况，只需要查询数组中的队员情况与想同组 or 不想同组的成员名字是否一致即可
>
> 时间复杂度 $O(n)$，空间复杂度 $O(n\ len(name))_{max}$

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main()
{
    int x;
    cin >> x;
    
    vector<pair<string, string>> X(x);
    
    for (int i = 0; i < x; i ++)
        cin >> X[i].first >> X[i].second;
    
    int y;
    cin >> y;
    
    vector<pair<string, string>> Y(y);
    
    for (int i = 0; i < y; i ++)
        cin >> Y[i].first >> Y[i].second;
        
    int sum;
    cin >> sum;
    
    unordered_map<string, pair<string, string>> a;
    
    for (int i = 0; i < sum; i ++)
    {
        string s, t, p;
        cin >> s >> t >> p;
        a[s] = {t, p};
        a[t] = {s, p};
        a[p] = {s, t};
    }
    
    int res = 0;
    
    // 想同组 
    for (int i = 0; i < x; i ++)
    {
        string s = X[i].first, t = X[i].second;
        if (a[s].first != t && a[s].second != t)
            res ++;
    }
    
    // 不想同组 
    for (int i = 0; i < y; i ++)
    {
        string s = Y[i].first, t = Y[i].second;
        if (a[s].first == t || a[s].second == t)
            res ++; 
    }
    
    cout << res << endl; 
    
    return 0;
}
```

### 海港

https://www.luogu.com.cn/problem/P2058

> - 题意：给定 n 艘船只的到达时间、载客信息（载客人数和每一个客人的国籍），现在需要知道对于每一艘抵达的船只，前 24 小时中抵达的客人的国籍总数
> - 思路：本题思路很简单，就是一个队列的应用以及哈希客人国籍的过程。由于船只抵达的时间是顺序增加的，故每抵达一艘船只，就对新来的客人国籍进行哈希，为了计算前 24 小时的情况，需要对船只抵达队列进行删减，即只保留 24 小时以内的船只抵达信息。对于删除的船只信息，需要将这些船只上的客人国籍信息从哈希表中删除，故每一艘船只的访问次数为 2。
> - `unordered_map `补充：在进行哈希统计时。为了判断当前 24 小时内客人国籍数，在删除哈希记录时，为了判断是否将当前国籍的游客全部删除时，需要统计哈希表中某个国籍是否减为了 0，我用了 `.count(x)` 内置方法，但这是不正确的，因为我想要统计的是 值 是否为 0，而 `.count(x)` 统计的是哈希表中 x 这个 键 的个数，而 `unordered_map `中是没有重复的键的，故 `.count(x)` 方法只会返回 0 或 1，返回 0 就表示当前哈希表中没有 x 这个键，返回 1 就表示哈希表中有 x 这个键，但是有这个键不代表对应的值就存在，可能是 `x: 0` 的情况，即键存在，但是值记录为 0
> - 时间复杂度：$O(2 \sum x_i)$ - 即两倍的所有游客数

```cpp
// #include <bits/stdc++.h>
// #define int long long
#include <iostream>
#include <unordered_map>
#include <stack>
#include <queue>
using namespace std;

const int N = 1e5 + 10;

struct Ship { int idx, t; };

int n;
queue<Ship> q;
vector<int> G[N];
unordered_map<int, int> cnt;
int kind;

void solve() {
    cin >> n;

    for (int i = 1; i <= n; i++) {
        int t, num;
        cin >> t >> num;
        
        q.push({i, t});
        
        // 哈希
        while (num--) {
            int id;
            cin >> id;
            
            if (!cnt[id]) kind++;
            cnt[id]++;
            G[i].push_back(id);
        }
        
        // 去哈希
        Ship h = q.front();
        while (t - h.t >= 86400) {
            for (auto& id: G[h.idx]) {
                cnt[id]--;
                if (!cnt[id]) kind--;
            }
            q.pop();
            h = q.front();
        }
        
        cout << kind << "\n";
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

### Cities and States S

https://www.luogu.com.cn/problem/P3405

> 题意：给定 n 个字符串，每一个字符串归属一个集合，现在需要统计字符串与集合名相反相等的对数
>
> 思路：很显然的哈希计数。难点有两个，如何哈希？如何计数？哈希可以采用扩展字符的方法进行，即第一个字符乘某一个较大的质数再加上第二个字符。此处采用一种较为巧妙的方法，直接将两个字符串与集合名加起来进行唯一性哈希，降低编码难度。计数有两种方式，第一种就是全部哈希结束之后，再遍历哈希表进行统计，最后将结果除二即可。第二种就是边哈希边计数，遇到相反相等的就直接计数，这样就不会重复计数了，也很巧妙
>
> 时间复杂度：$O(n)$

```cpp
#include <iostream>
#include <algorithm>
#include <unordered_map>
#include <stack>
#include <queue>
#include <set>
using namespace std;

int n;
unordered_map<string, int> a;

void solve() {
    cin >> n;
    
    int res = 0;
    
    while (n--) {
        string s, t;
        cin >> s >> t;
        s = s.substr(0, 2);
        res += a[t + " " + s] * (s != t);
        a[s + " " + t]++;
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

### Torn Lucky Ticket

https://codeforces.com/contest/1895/problem/C

> 题意: 给定一个长度为 n 的字符串数组 nums, 数组的每一个元素长度不超过 5 且仅由数字组成. 问能找到多少对 $(i,j)$ 可以使得拼接后的 $nums[i]+nums[j]$ 长度为偶数且左半部分的数字之和与右半部分的数字之和相等.
>
> 思路: 
>
> - 首先最暴力的做法就是 $O(n^2)$ 枚举,所有的 $(i,j)$ 然后 check 合法性.
>
> - 尝试优化掉第二层的枚举循环. 对于第二层循环, 我们就是要寻找合适的 $nums[j]$ 并和当前的 $nums[i]$ 拼接. 显然我们可以通过扫描当前的 $nums[i]$ 并 $O(1)$ 的计算出所有 $len(nums[j])\le len(nums[i])$ 且可以和 $nums[i]$ 匹配的字符串的 `[长度][数字和]` 信息, 只需要一个二维数组预存储每一个字符串的 **长度** **数字和** 信息即可.
>
> - 那么对于 $len(nums[j])> len(nums[i])$ 的情况如何统计呢. 显然此时我们没法 $O(1)$ 的检查 $nums[i]+nums[j]$ 的合法性. 不妨换一个角度, 当我们枚举 $nums[i]$ 时:
>     $$
>     \text{统计右侧拼接长度更大的 nums[j] 的合法情况数} \iff \text{统计左侧拼接长度更小的 nums[j] 的合法情况数}
>     $$
>     于是合法情况数就可以表示为 $\displaystyle \sum_{i=0}^{n-1}\big[\text{cond}_1(nums[i])+\text{cond}_2(nums[i])\big]$, 其中第一种情况 $\text{cond}_1$ 就是统计右侧拼接长度更小的字符串数量, 第二种情况 $\text{cond}_1$ 就是统计左侧拼接长度更小的字符串数量. 这两步可以同时计算.
>
> 时间复杂度: $O(n)$

```python
from typing import List, Tuple, Dict, Optional
from collections import defaultdict, deque
from itertools import combinations, permutations
import math, heapq, queue

II = lambda: int(input())
FI = lambda: float(input())
MII = lambda: tuple(map(int, input().split()))
LII = lambda: list(map(int, input().split()))
LSI = lambda: list(map(str, input().split()))

def solve() -> Optional:
    n, nums = II(), LSI()
    
    f = [[0 for _ in range(46)] for _ in range(6)]
    for num in nums:
        m = len(num)
        s = sum([int(c) for c in num])
        f[m][s] += 1
    
    res = 0
    for num in nums:
        m = len(num)
        s = [0] * (m + 1)
        for i in range(m - 1, -1, -1):
            s[i] = s[i + 1] + int(num[i])
        
        # cond1: now + right -> len(now) >= len(right)
        for i in range(m - 1, -1, -1):
            now_len, now_sum = i + 1, s[0] - s[i + 1]
            r_len, r_sum = now_len - (m - 1 - i), now_sum - s[i + 1]
            if 1 <= r_len <= now_len and r_sum >= 0:
                res += f[r_len][r_sum]
        
        # cond2: left + now -> len(left) < len(now)
        for i in range(m):
            now_len, now_sum = m - i, s[i]
            l_len, l_sum = now_len - i, now_sum - (s[0] - s[i])
            if 1 <= l_len < now_len and l_sum >= 0:
                res += f[l_len][l_sum]
    
    return res

if __name__ == '__main__':
    OUTs = []
    N = 1
    # N = II()
    for _ in range(N):
        OUTs.append(solve())
    print('\n'.join(map(str, OUTs)))
```