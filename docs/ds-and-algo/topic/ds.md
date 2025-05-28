---
title: 数据结构
---

!!! tip
    数据结构只是一种手段，不可能与算法割裂。因此本文较多内容其实使用了 [动态规划](./dp.md)、[图论](./graph.md) 和 [字符串](./string.md) 等算法，若遇到难以理解的部分，建议提前学习对应算法的理论与例题。

数据结构由「数据」和「结构」两部分组成。我们主要讨论的是后者，即结构部分。按照逻辑结构可以将各种数据结果分类为「线性结构」和「非线性结构」。如下图所示：

![线性数据结构 vs. 非线性数据结构](https://cdn.dwj601.cn/images/202408301527018.png)

在面对一个实际问题时，我们往往需要考虑两个问题：需要存储什么信息？以及信息之间的组织方式是什么？一般而言，存储的都是数值数据或者数据之间的关系，组织方式有线性结构、树形结构、图结构共三种（有些教材会单独把集合拿出来，但由于集合的逻辑一般都通过树或图来实现，因此这里不单独罗列）。

算法的五大特性。1）正确性；2）健壮性（鲁棒性）；3）可读性；4）可扩展性；5）高效率。其中高效率中又引出了复杂度的大 $O$ 表示法，具体地：

- $O()$ `upper bound`：最坏的时间复杂度；
- $\Omega()$ `lower bound`：最好的时间复杂度；
- $\Theta()$ `average bound`：平均时间复杂度。

## 链表

本节原本叫做「线性表」，但是考虑到顺序存储结构的线性表就是数组，因此这里只讨论链式存储结构的线性表，即链表。

常见的链表结构。单链表、循环链表、双向链表共三种。但无论哪种结构，都是一个头结点 + 一个尾结点 + 若干中间结点的结构，且每个结点只有一个前驱结点和一个后继结点。

初始化技巧。一般来说，为了便于编码，都会提前设置空结点。例如单链表会设置一个空的头结点，循环链表会设置一个空的尾结点，双向链表会设置一个空的头结点和空的尾结点。

常见操作。对于链表而言，其最大的特点就是删除或添加结点的开销很小，至于查询或修改直接链式遍历即可。因此我们应熟练掌握链表结点的删除与添加操作。

=== "双向链表结点添加"

    ![添加结点](https://cdn.dwj601.cn/images/202406292218514.png)
    
    ```c++
    s->prior = p;
    s->next = p->next;
    p->next->prior = s;
    p->next = s;
    ```

=== "双向链表结点删除"

    ![删除结点](https://cdn.dwj601.cn/images/202406292218515.png)
    
    ```c++
    p->next->prior = p->prior;
    p->prior->next = p->next;
    ```

### 例：双链表

<https://www.acwing.com/problem/content/829/>

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

## 栈

### 普通栈

先进后出型线性数据结构。分为顺序栈和链栈，顺序栈就是数组模拟，链栈就类似于头插法的单链表。由于结构比较简单，因此我们重点关注栈的应用。

**卡特兰数**。其实是一种动态规划的算法思想。常见的释义为：当有 $n$ 个元素按照某种顺序压入栈中，且可在任意时刻弹出时，所获得可能的出栈序列个数可用卡特兰数计算，即 $\frac{1}{n+1} C_{2n}^{n}$。

定义 $f(k)$ 表示在第 $k$ 个数是最后一个出栈的情况下出栈序列的总个数，则 $f(k)=f(k-1)f(n-k)$，其中 $f(0)=1$。那么卡特兰数的推导公式就是：

$$
\sum_{k = 1}^{n} f(k) = \sum_{k = 1}^{n} f(k-1) f(n-k)=\frac{1}{n+1} C_{2n}^{n}
$$

**表达式求值**。分为前缀、中缀和后缀三种表达式，本质上是对树的一种遍历。具体地：

- 中缀表达式求值。「双栈」思路，算符优先法：
    - 遇到数字，直接入数栈；
    - 遇到符号：
        - 如果是括号，左括号直接入栈，右括号进行运算直到遇到左括号；
        - 如果是算符，在入算符栈之前，需要进行运算操作直到算符栈顶元素等级小于当前算符等级。
- 中缀表达式转后缀表达式。「算符栈」即可，后缀先遇到就直接计算的运算符 $\to$ 中缀表达式需要先算的运算符，于是转化思路就是：
    - 遇到数字，直接构造后缀表达式；
    - 遇到算符：
        - 如果是括号，左括号直接入栈，右括号进行后缀表达式构造直到遇到左括号；
        - 如果是算符，在入算符栈之前，需要进行后缀表达式构造操作直到算符栈顶元素等级小于当前算符等级。
- 后缀表达式求值。「数栈」即可：
    - 遇到数字直接入数栈；
    - 遇到算符直接进行运算。

### 单调栈

<https://www.acwing.com/problem/content/832/>

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

同类题推荐：

- [CF 1400 * | 下一个更大元素 II | LeetCode - (leetcode.cn)](https://leetcode.cn/problems/next-greater-element-ii/)

### 例：验证栈序列

<https://www.luogu.com.cn/problem/P4387>

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

## 队列

### 普通队列

先进先出型线性数据结构。分为顺序队列和链式队列，顺序队列就是数组模拟，链式队列就类似于双向链表。队列的一些应用如下：

**报数问题**。报到 $0$ 的出队，报到 $1$ 的重新入队，求解出队顺序。

**最短路问题**。开一个记忆数组 $d[i][j]$ 表示从起点 $(0,0)$ 到终点 $(i,j)$ 点的最短路径的长度。可以将求最短路看做一个 **波心扩散** 的物理场景，队列中的每一个点都可以作为一个波心，从而实现“两点之间线段最短”的物理场景。讨论几个问题：

- 为什么用队列？逐层搜索，每次搜素到的点就是当前点可以搜索到的最短的点，先搜到的点先扩展，于是就是队列的数据结构；
- 为什么是最短？对于每一个点探索到的点都是最短的点，最终的搜索出来的路径就是最短的路径。

**循环队列**。队列中衍生出的循环队列比较有意思，运行逻辑顾名思义不再赘述，有几个注意点：

- 解决假溢出。在入队的时候不是单纯的指针 `+1`，而是 `+1` 后 `% MaxSize`；

- 解决真溢出。即队空队满的冲突，有如下几种应对策略：

    - 浪费一个元素空间并判断 `rear + 1 == head`；

    - 设置一个辅助标志变量 `flag`；
    - 设置一个计数器 `count`；

### 单调队列

TODO

### 例：单调队列

> 标签：单调队列
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

## 哈希表

哈希是一种应用极其广泛的算法，其核心功能为：**给定任意一个对象 A，能利用哈希表迅速找到以 A 的名义存储的结果**。关键点如下：

- 这里的 A 必须是可哈希的；
- 这里的哈希表其实是一个数组；
- 所谓的迅速其实是利用哈希函数计算出这个可哈希对象 A 的哈希码（就是一个数字对应到哈希表数组中的某一个下标索引值），然后 $O(1)$ 地在哈希表数组中索引出存储的内容。

举个例子。现在需要查询出你这学期翘了几次课，一个最直观的做法就是遍历数据库然后匹配你的学号（假设学号唯一），这样的时间复杂度为 $O(n)$，空间复杂度为 $O(1)$。但如果提前利用哈希算法存储了每一个学号对应的翘课次数，那么在输入你的学号后，就可以通过哈希函数计算出你学号对应的哈希码，然后在哈希表数组中索引出翘课的次数即可，这样的时间复杂度为 $O(1)$，空间复杂度为 $O(n)$。

大多数编程语言都实现了哈希的功能，只要对象是可哈希的，就可以利用该算法完成空间换时间的操作。例如 C++ 中的 `unordered_map` 类、Python 中的 `dict` 类、Java 中的 `HashMap` 类等。

**哈希冲突**。当然，哈希算法没法保证不同对象的哈希码都是不同的，有小概率会发生不同的对象映射出了相同的哈希码，此时就发生了哈希冲突。为了解决这个问题，要么优化哈希函数从而降低哈希冲突的概率，要么修改哈希表的一维数组结构，彻底解决哈希冲突。我们关注后者，有两种方法：

1. 拉链法 (Chaining)。我们仍然沿用一维数组作为哈希表，只不过将数组元素修改为单链表。一旦发生哈希冲突映射到了同一个数组位置，就在对应位置的单链表中往后拉链即可；
2. 开放地址法 (Open Addressing)。该法保持原来的一维数组结构不变，将产生哈希冲突的元素移动到其他还没有被占用的位置（称为空桶）存储。这种方法在频繁产生哈希冲突时性能较差。而为了找到其他空位，开放地址法需要进行「空桶探测」，常见的探测方法有线性探测（从产生冲突的地方开始沿着某个方向枚举）、双重哈希探测（利用第二个哈希函数探测其余位置）。

**哈希表的数据结构**。在 C++ 的 unordered_map 库中，unordered_map 与 unordered_multimap 的基类 _Hashtable 定义了哈希表的具体结构。具体地，其定义的哈希表是一维动态数组，数组元素是前向链表（即单链表）。源码 `/path/to/CLion/bin/mingw/lib/gcc/x86_64-w64-mingw32/13.1.0/include/c++/bits/hashtable.h` 是这样解释的：

> In terms of Standard containers the hashtable is like the aggregation of:
>
> - `std:: forward_list <_Node > containing the elements`
> - `std:: vector < std:: forward_list <_Node >:: iterator > representing the buckets`

### 例：分组

<https://www.acwing.com/problem/content/5182/>

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

### 例：海港

<https://www.luogu.com.cn/problem/P2058>

> - 题意：给定 n 艘船只的到达时间、载客信息（载客人数和每一个客人的国籍），现在需要知道对于每一艘抵达的船只，前 24 小时中抵达的客人的国籍总数
> - 思路：本题思路很简单，就是一个队列的应用以及哈希客人国籍的过程。由于船只抵达的时间是顺序增加的，故每抵达一艘船只，就对新来的客人国籍进行哈希，为了计算前 24 小时的情况，需要对船只抵达队列进行删减，即只保留 24 小时以内的船只抵达信息。对于删除的船只信息，需要将这些船只上的客人国籍信息从哈希表中删除，故每一艘船只的访问次数为 2。
> - `unordered_map` 补充：在进行哈希统计时。为了判断当前 24 小时内客人国籍数，在删除哈希记录时，为了判断是否将当前国籍的游客全部删除时，需要统计哈希表中某个国籍是否减为了 0，我用了 `.count(x)` 内置方法，但这是不正确的，因为我想要统计的是 值 是否为 0，而 `.count(x)` 统计的是哈希表中 x 这个 键 的个数，而 `unordered_map` 中是没有重复的键的，故 `.count(x)` 方法只会返回 0 或 1，返回 0 就表示当前哈希表中没有 x 这个键，返回 1 就表示哈希表中有 x 这个键，但是有这个键不代表对应的值就存在，可能是 `x: 0` 的情况，即键存在，但是值记录为 0
> - 时间复杂度：$O(2 \sum x_i)$，即两倍的所有游客数。

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

### 例：Cities and States S

<https://www.luogu.com.cn/problem/P3405>

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

### 例：Torn Lucky Ticket

<https://codeforces.com/contest/1895/problem/C>

> 题意: 给定一个长度为 n 的字符串数组 nums, 数组的每一个元素长度不超过 5 且仅由数字组成. 问能找到多少对 $(i,j)$ 可以使得拼接后的 $nums[i]+nums[j]$ 长度为偶数且左半部分的数字之和与右半部分的数字之和相等.
>
> 思路:
>
> - 首先最暴力的做法就是 $O(n^2)$ 枚举,所有的 $(i,j)$ 然后 check 合法性.
>
> - 尝试优化掉第二层的枚举循环. 对于第二层循环, 我们就是要寻找合适的 $nums[j]$ 并和当前的 $nums[i]$ 拼接. 显然我们可以通过扫描当前的 $nums[i]$ 并 $O(1)$ 的计算出所有 $len(nums[j])\le len(nums[i])$ 且可以和 $nums[i]$ 匹配的字符串的 `[长度][数字和]` 信息, 只需要一个二维数组预存储每一个字符串的 **长度** **数字和** 信息即可.
>
> - 那么对于 $len(nums[j])> len(nums[i])$ 的情况如何统计呢. 显然此时我们没法 $O(1)$ 的检查 $nums[i]+nums[j]$ 的合法性. 不妨换一个角度, 当我们枚举 $nums[i]$ 时:
>
>     $$
>     \text{统计右侧拼接长度更大的 nums[j] 的合法情况数} \iff \text{统计左侧拼接长度更小的 nums[j] 的合法情况数}
>     $$
>
>     于是合法情况数就可以表示为
>
>     $$
>     \sum_{i=0}^{n-1}\big[\text{cond}_1(nums[i])+\text{cond}_2(nums[i])\big]
>     $$
>
>     其中第一种情况 $\text{cond}_1$ 就是统计右侧拼接长度更小的字符串数量, 第二种情况 $\text{cond}_1$ 就是统计左侧拼接长度更小的字符串数量. 这两步可以同时计算.
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

## 广义表

广义表可以看作单链表的扩展版，可以应用在存储空间的分配策略上，对应的算法叫做「成组拉链法」。其结点需要存储三类数据，示意图如下所示：

![广义表结点结构示意图](https://cdn.dwj601.cn/images/202406292218530.png)

具体地：

1. `type`：存储当前结点的类型。以枚举类型存在，起标识作用。因此 `type` 是一个枚举体 (enum)；

- `data/sublist`：存储当前结点的内容。如果是 data 类型的结点，就存储数据；如果是 sublist 类型的结点，就存储子链表的地址。因此 `data/sublist` 是一个联合体 (union)；
- `next`：存储下一个结点的地址。因此 `next` 是一个指针。

广义表结点的 C++ 代码如下：

```c++
enum GListNodeType {
    ATOM, LIST
};
template<class T>
struct GListNode {
    GListNodeType type;
    union {
        T data;
        GListNode* sublist;
    };
    GListNode<T>* next;
};
```

广义表的结构示例图如下：

![广义表的结构示意图](https://cdn.dwj601.cn/images/202406292218531.png)

### 例：外星密码

> 经典之处：很少见的可以用广义表思路完成的题，就先放在这里
>
> 难度：洛谷 黄
>
> OJ：[洛谷](https://www.luogu.com.cn/problem/P1928)

题意：给定一个压缩后的密码串，需要解压为原来的形式（保证不超过 $20000$ 且最多 $10$ 层压缩）。例如：

1. `AC[3FUN]` $\to$ `ACFUNFUNFUN`；
2. `AB[2[2GH]]OP[2PQ]CD` $\to$ `ABGHGHGHGHOPPQPQCD`。

思路：

- 压缩密码串的结构很像广义表，即存在串行的纵向递归结构，比如上述第二个样例中 `[2[2GH]]` 与 `[2PQ]` 就是串行的递归结构；
- 对于此类数据结构，一定不能忘记处理后续串行的递归结构，以及需要注意索引变量的引用问题。由于 Python 没有对单一整数的引用语法，因此使用全局变量代替。

时间复杂度：$O(n)$

=== "Python"

    ```python
    s = input().strip()
    i = 0
    
    def dfs() -> str:
        global i
        now = ""
    
        # 递归终点
        if i >= len(s):
            return now
    
        # 处理前缀
        while i < len(s) and s[i].isalpha():
            now += s[i]
            i += 1
    
        # 递归处理
        if i < len(s) and s[i] == '[':
            i += 1
            x = 0
            while i < len(s) and s[i].isdigit():
                x = x * 10 + int(s[i])
                i += 1
            now += x * dfs()
        if i < len(s) and s[i] == ']':
            i += 1
            return now
    
        # 处理后缀
        now += dfs()
    
        return now
    
    print(dfs())
    ```

=== "C++"

    ```c++
    #include <iostream>
    
    using namespace std;
    
    string s;
    
    string dfs(int& i) {
        int n = s.size();
        string now = "";
    
        // 递归终点
        if (i >= n) {
            return now;
        }
        
        // 处理前缀
        while (i < n and isalpha(s[i])) {
            now += s[i++];
        }
    
        // 递归处理
        if (i < n && s[i] == '[') {
            i++;
            int x = 0;
            while (i < n && isdigit(s[i])) {
                x = x * 10 + (s[i++] - '0');
            }
            string t = dfs(i);
            while (x--) {
                now += t;
            }
        }
        if (i < n && s[i] == ']') {
            i++;
            return now;
        }
    
        // 处理尾串
        now += dfs(i);
    
        return now;
    }
    
    int main() {
        cin >> s;
        int i = 0;
        cout << dfs(i) << "\n";
    
        return 0;    
    }
    ```

## 树

树是一种特殊的 [图](./graph.md)，即无环图。多棵树就组成了一个森林。我们称树中每一个结点的子结点数量为该结点的度，同时对于一棵树，有时会称其为 $x$ 叉树，这里的 $x$ 即树中结点度数的最大值。

**树的存储**。与广义表类型，我们同样用链表来存储树。下面介绍两种较为常见的树的存储方式：

1. 多叉链表表示法。即每一个结点存储所有的孩子结点的指针，可以用静态数组存储，但是这需要将数组空间开到结点的最大度数，有些浪费空间。因此可以使用动态数组来存储所有孩子结点的指针；
2. 孩子兄弟表示法。即每一个结点只存储两个指针，其中左指针指向当前结点的孩子结点，右指针指向当前结点的兄弟结点。

**二叉树**。即树中的每一个结点最多只有两个孩子结点。二叉树中有两种比较特殊的情况，即：

1. 满二叉树。每一层都是满结点；

2. 完全二叉树：对于一个 $k$ 层的二叉树，$1\to k-1$ 都是满的，第 $k$ 层的叶子结点从左到右排列。


由于二叉树对应的算法比较多，就放在后面的图论中详细介绍，此处我们只介绍两种二叉树的「构造方法」。具体地：

- 用一个含有空指针标记的遍历序列构造二叉树。有如下三种情况：

    1. 先序序列进行构造。按照遍历的思路来，对于先序序列而言，第一个元素一定是根元素，因此首先根据“当前局面”的第一个元素创建根结点，接着递归创建左子树和右子树即可，递归终点就是空指针标记。
    2. 中序序列进行构造。 不可以，因为不能确定根节点以及左子树和右子树的部分。
    3. 后序序列进行构造。与上述先序序列进行构建的逻辑类似，我们从后序序列的最后一个元素开始构建，第一个元素就是根结点，然后再分别递归构建右子树和左子树，递归终点同样也是空指针标记。

- 用两个不含空指针标记的遍历序列构造二叉树。有如下两种情况：

    1. 先序序列 + 中序序列。现在我们没有空指针标记了，那么如何确定递归终点呢？可以根据先序序列的首个元素在中序序列查询，查询结果的左半部分就是左子树，右半部分就是右子树，基于此进行构造即可。
    2. 后序序列 + 中序序列。与上述一致，不再赘述。

**线索二叉树**。二叉树的扩展版，将二叉树中所有结点的空指针指向其前驱或后继结点。

**哈夫曼树**。一种利用贪心的算法思想设计出来的编码方式，可以达到最佳的编码压缩效果，从而提升数据在信道中的传输效率。我们定义一棵树的带权路径长度 $\text{WPL}$ 为所有叶子结点「路径长度 $\times$ 权重」之和。$\text{WPL}$ 最小的树就叫做哈夫曼树。

具体地，对于一个结点序列 $id \in [1,n]$，每次选择其中权值最小的两个结点进行合并，合并 $n-1$ 次之后得到的二叉树就是哈夫曼树。基于这棵哈夫曼树，我们就可以展开信息的编码与解码工作。

**二叉搜索树 & 平衡二叉搜索树**。如果我们想要在 $O(\log n)$ 时间复杂度内对数据进行增删查改的操作，就可以引入「二叉搜索树 (Binary Search Tree)」这一数据结构。然而，在某些极端的情况下，例如当插入的数据是单调不减或不增时，这棵树就会退化为一条链从而导致所有的增删查改操作退化到 $O(n)$，这是我们不愿意看到的。因此我们引入「平衡二叉搜索树 (Balanced Binary Search Tree) 简称平衡树」这一数据结构。

关于平衡二叉搜索树，有非常多的变种与实现，不同的应用场景会选择不同的变种。例如：

- 「Treap」更灵活，通过随机化优先级实现预期的平衡，但在最坏情况下可能退化；
- 「AVL 树」严格保持平衡，保证了 $O(\log n)$ 的性能，但在频繁插入和删除的场景下可能有较大的旋转开销；
- 「红黑树」通过较宽松的平衡条件实现了较好的插入和删除性能，通常被广泛用于需要高效插入删除操作的系统（如 STL 中的 `map` 和 `set`）。

一般来说，红黑树是一个较为通用的选择，而在需要严格平衡性时，AVL 树可能是更好的选择。有关平衡树的知识点较为复杂，将会在 **进阶数据结构** 部分详细展开。

### 树的基础问题

1）**树的遍历**

2）**树的重心**

3）**树的直径**

视频学习：<https://www.bilibili.com/video/BV17o4y187h1/>。

4）**最近公共祖先**

<https://www.luogu.com.cn/problem/P3379>

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

实战：<https://www.acwing.com/problem/content/5563/>。

> 题意：给定一棵树，初始时含有 4 个结点分别为 1 到 4，其中 1 号为根结点，2 到 4 均为根结点的叶子结点。现在进行 Q 次操作，每次指定一个已经存在的结点向其插入两个新结点作为叶节点。现在需要在每次操作以后输出这棵树的直径。我们定义 **树的直径** 为：树中距离最远的两个点之间的距离。
>
> 思路一：暴力搜索。
>
> - 我们将树重构为无向图，对于每一个状态的无向图，首先从任意一个已存在的结点 A 开始搜索到距离他最远的点 B，然后从 B 点出发搜索到离他最远的点 C，则 B 与 C 之间的距离就是当前状态的树的直径。由于每一个状态的树都要遍历两遍树，于是时间复杂度就是平方阶
>
> - 时间复杂度：$O(qn)$
>
> 思路二：最近公共祖先 LCA。
>
> - **从树的直径出发**。我们知道，树的直径由直径的两个结点之间的距离决定，因此我们着眼于这两个结点 $A$ 和 $B$ 展开。不妨设当前局面直径的两个结点已知为 $A$ 和 $B$，现在插入两个叶子结点 $L_1$ 和 $L_2$。是否改变了树的直径大小取决于新插入的两个结点对于当前树的影响情况。如果 $L_1$ 或 $L_2$ 可以替代 $A$ 或 $B$，则树的直径就会改变。很显然新插入的两个叶子结点对于直径的两个端点影响是同效果的，因此我们统称新插入的叶子结点为 $L$。
>
> - **什么时候树的直径会改变**？对于 $A$、$B$ 和 $L$ 来说，直径是否改变取决于 $L$ 能否替代 $A$ 或 $B$，一共有六种情况。我们记 $\text{dist}(A,L)=da$，$\text{dist}(B,L)=db$，当前树的直径为 $res$，六种情况如下：
>
>     1. $\text{max}(da, db) \le \text{res}$，交换 $A$ 和 $B$ 得到 $2$ 种
>     2. $\text{min}(da,db) \ge \text{res}$，交换 $A$ 和 $B$ 得到 $2$ 种
>     3. $\text{max}(da,db) >res,\text{min}(da,db) < \text{res}$，交换 $A$ 和 $B$ 得到 $2$​ 种
>
>     如图：我们只需要在其中的最大值严格超过当前树的直径 $\text{res}$ 时更新 **直径对应的结点** 以及 **直径的长度** 即可
>
>     ![六种情况](https://cdn.dwj601.cn/images/202403282344777.jpg)
>
> - **如何快速计算树上任意两个点之间的距离**？我们可以使用最近公共祖先 LCA 算法。则树上任意两点 $x,y$ 之间的距离 $\text{dist}(x,y)$ 为：
> 
>     $$
>     \text{dist}(x, y) = \text{dist}(x, root) + \text{dist}(y, root) - 2 \times \text{dist}(\text{lca}(x, y), root)
>     $$
>
> - 时间复杂度：$O(q \log n)$

暴力搜索代码

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

const int N = 500010;

vector<int> g[N];
int d[N];
bool vis[N];
pair<int, int> res;     // first 为最远距离；second 为对应结点编号

void dfs(int pre, int now) {
    if (vis[now]) return;
    
    vis[now] = true;
    
    if (pre != -1) {
        d[now] = d[pre] + 1;
        if (d[now] > res.first) {
            res = {d[now], now};
        }
    }
    
    for (auto& ch: g[now]) {
        dfs(now, ch);
    }
}

void solve() {
    // init
    for (int i = 2; i <= 4; i++) {
        g[1].push_back(i);
        g[i].push_back(1);
    }
    
    int now = 4;
    
    int Q;
    cin >> Q;
    while (Q--) {
        int id;
        cin >> id;
        
        g[id].push_back(++now);
        g[now].push_back(id);
        
        g[id].push_back(++now);
        g[now].push_back(id);
        
        res = {-1, -1};
        
        // 第一趟
        memset(vis, false, sizeof vis);
        memset(d, 0, sizeof d);
        d[1] = 0;
        dfs(-1, 1);
        
        // 第二趟
        memset(vis, false, sizeof vis);
        memset(d, 0, sizeof d);
        d[res.second] = 0;
        dfs(-1, res.second);
        
        cout << res.first << "\n";
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

LCA 代码

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

const int N = 1000010, M = 20;

int d[N];        // d[i] 表示 i 号点到根结点的距离
int to[N][M];    // to[i][j] 表示 i 号点向上跳 2^j 步后到达的结点编号

int lca(int a, int b) {
    if (d[a] < d[b]) swap(a, b);

    for (int k = M - 1; k >= 0; k--)
        if (d[to[a][k]] >= d[b])
            a = to[a][k];

    if (a == b) return a;

    for (int k = M - 1; k >= 0; k--)
        if (to[a][k] != to[b][k])
            a = to[a][k], b = to[b][k];

    return to[a][0];
}

int dist(int a, int b) {
    return d[a] + d[b] - 2 * d[lca(a, b)];
}

void solve() {
    int Q;
    cin >> Q;

    // init lca
    for (int i = 2; i <= 4; i++) {
        d[i] = 1;
        to[i][0] = 1;
    }

    int A = 2, B = 4, now = 4, res = 2;

    while (Q--) {
        int fa;
        cin >> fa;

        int L1 = ++now, L2 = ++now;

        // upd lca
        d[L1] = d[fa] + 1;
        d[L2] = d[fa] + 1;
        to[L1][0] = fa;
        to[L2][0] = fa;
        for (int k = 1; k <= M - 1; k++) {
            to[L1][k] = to[ to[L1][k-1] ][ k-1 ];
            to[L2][k] = to[ to[L2][k-1] ][ k-1 ];
        }

        int da = dist(A, L1), db = dist(B, L1);

        if (max(da, db) <= res) res = res;
        else if (min(da, db) >= res) {
            if (da > db) res = da, B = L1;
            else res = db, A = L1;
        } else {
            if (da > db) res = da, B = L1;
            else res = db, A = L1;
        }

        cout << res << "\n";
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

### 树状数组

利用更多的区间维护一个序列的信息，所有维护信息的区间组成的形状形如一棵树，故称为树状数组。支持的操作有：

- 区间查询：查询序列 `[1, pos]` 索引的元素之和。时间复杂度 $O(\log n)$；
- 单点修改：修改序列 `pos` 索引的元素值。时间复杂度 $O(\log n)$。

### 线段树

TODO

### 平衡树

1）二叉搜索树

二叉搜索树又叫二叉排序树、二叉查找树。

定义：根结点比左子树所有结点的值都大，比右子树所有结点的值都小。关键字唯一。

操作：增加、修改、查询、删除。

判定：想要判定一棵二叉树是否为二叉搜索树，只需要判断中序遍历的结果是不是递增的即可，可以采取中序遍历序列比对的方法，也可以在递归遍历二叉树的过程中通过记录前驱结点的值直接进行比较判断。时间复杂度 $O(n)$。

2）平衡二叉搜索树

C++ 中叫做 `std::map`，Python 中叫做 `from sortedcontainers import SortedList`。

> 例程：[切蛋糕 - AcWing](https://www.acwing.com/activity/content/code/content/8475415/)
>
> 官方：[sortedlist.py - grantjenks/python-sortedcontainers](https://github.com/grantjenks/python-sortedcontainers/blob/master/src/sortedcontainers/sortedlist.py)

有序列表类。导入方法 `from sortedcontainers import SortedList`。可以类比 C++ 中的 `map` 类。共有以下内容，全部都是 $O(\log n)$ 的时间复杂度：

1. `add(value)`: 添加一个值到有序列表
2. `discard(value)`: 删除列表中的值（如果存在）
3. `remove(value)`: 删除列表中的值（必须存在）
4. `pop(index=-1)`: 删除并返回指定索引处的值
5. `bisect_left(value)`: 返回插入值的最左索引
6. `bisect_right(value)`: 返回插入值的最右索引
7. `count(value)`: 计算值在列表中的出现次数

**Treap**。二叉搜索树和堆的结合体。它通过维护两种性质来保持平衡：

>- **二叉搜索树性质**：每个节点的左子树的所有节点值小于该节点的值，右子树的所有节点值大于该节点的值。
>- **堆性质**：每个节点的优先级（通常随机生成）要大于或等于其子节点的优先级。
>
>**平衡机制**：
>
>- Treap 使用随机化优先级使得树的形状接近于理想的平衡树（期望树高为 $O(\log n)$）。
>- 通过旋转操作（左旋和右旋）在插入和删除时保持堆的性质。
>
>**优点**：
>
>- 实现相对简单。
>- 由于随机化的优先级，在期望情况下，树的高度是 $O(\log n)$。
>- 灵活性高，可以根据需要调整优先级函数。
>
>**缺点**：
>
>- 最坏情况下，树的高度可能退化为 $O(n)$（例如所有优先级相同或顺序生成的优先级），尽管发生概率很低。

**AVL 树**。是最早被发明出来的的自平衡二叉搜索树，1962 年由 Adelson-Velsky 和 Landis 发明。


定义：平衡因子为左子树的高度 - 右子树的高度，平衡二叉树的平衡因子绝对值 <= 1

构建：当插入结点进行构建时出现了有结点平衡因子的绝对值超过了 1，则进行“旋转”调整，旋转共分为 4 种

![旋转 - LL、LR](https://cdn.dwj601.cn/images/202406292218546.png)

![旋转 - LR](https://cdn.dwj601.cn/images/202406292218547.png)

![旋转 - RL](https://cdn.dwj601.cn/images/202406292218548.png)

尝试模拟一遍下列序列的构造过程就可以理解了：

![例题](https://cdn.dwj601.cn/images/202406292218549.png)

>- **平衡因子**：每个节点的左右子树高度差不能超过 $1$，且需要记录每个节点的高度。
>
>**平衡机制**：
>
>- 插入或删除节点后，如果某个节点的平衡因子不再为 $-1$、$0$ 或 $1$，就需要通过旋转（单旋转或双旋转）来恢复平衡。
>- 旋转操作包括：左旋转、右旋转、左右双旋转和右左双旋转。
>
>**优点**：
>
>- 严格的平衡条件保证了树的高度始终为 $O(\log n)$，因此搜索、插入和删除操作的时间复杂度为 $O(\log n)$。
>
>**缺点**：
>
>- 由于平衡条件严格，每次插入和删除后可能需要较多的旋转操作，从而导致实现较复杂，插入和删除操作的常数时间开销较大。

**红黑树**。一种较为宽松的自平衡二叉搜索树，由 Rudolf Bayer 于 1972 年发明。

> - **颜色属性**：每个节点都有红色或黑色两种颜色，通过这些颜色约束树的平衡性。
>
> **平衡机制**：
>
> - 通过遵循红黑树的五个性质来保持平衡：
>     1. 每个节点要么是红色，要么是黑色。
>     2. 根节点是黑色。
>     3. 叶子节点（NIL 节点）是黑色。
>     4. 如果一个节点是红色的，那么它的子节点必须是黑色（红节点不能连续出现）。
>     5. 从任一节点到其每个叶子节点的所有路径都包含相同数量的黑色节点。
> - 插入和删除操作可能破坏红黑树的性质，需要通过重新着色和旋转来恢复平衡。
>
> **优点**：
>
> - 红黑树的高度最多是 $\Theta (2  \log n)$，因此搜索、插入和删除操作的时间复杂度仍为 $O(\log n)$。
> - 由于平衡条件较为宽松，插入和删除操作需要的旋转操作通常比 AVL 树少，效率更高。
>
> **缺点**：
>
> - 实现较复杂，特别是插入和删除的平衡修复过程。
> - 虽然红黑树的搜索效率与 AVL 树相似，但由于平衡条件较宽松，实际应用中的树高度通常略高于 AVL 树，因此搜索操作的效率稍低。

### 例：串门

> 经典之处：树的直径
>
> 难度：CF 1400 *
>
> OJ：[蓝桥](https://www.lanqiao.cn/problems/5890/learning/?contest_id=145)

题意：给定一棵边权为正的无向树，共有 $n\ (1\le n \le 10^5)$ 个结点。给出「在访问到树中每一个结点」情况下的最短路径长度。

思路：

- 不难发现一个性质。对于访问的起点与终点，路径总长度一定是「起点到终点的简单路径长度」+「所有分支路径长度的两倍」，等价于「所有边之和的两倍」-「起点到终点的简单路径长度」；
- 有了上述的性质，为了最小化总路径长度，我们只需要找到简单距离最长的两个结点作为起点与终点即可，这里的简单路径其实就是「树的直径」；
- 为了求解树的直径，我们首先需要确定直径的两个端点。容易证明，每遍历一次树即可确定直径的一个端点。

时间复杂度：$O(n)$

=== "Python"

    ```python
    from collections import deque
    
    n = int(input())
    g = [[] for _ in range(n + 1)]
    
    ans = 0
    for _ in range(n - 1):
        u, v, w = tuple(map(int, input().split()))
        g[u].append((v, w))
        g[v].append((u, w))
        ans += w << 1
    
    def bfs(u: int) -> tuple[int, int]:
        dst = [0] * (n + 1)
        vis = [False] * (n + 1)
        q = deque()
        dst[u] = 0
        vis[u] = True
        q.append(u)
        while len(q):
            u = q.popleft()
            for v, w in g[u]:
                if vis[v]:
                    continue
                dst[v] = dst[u] + w
                vis[v] = True
                q.append(v)
        max_d = max(dst)
        max_i = dst.index(max_d)
        return max_d, max_i
    
    _, max_i = bfs(1)
    max_d, _ = bfs(max_i)
    
    print(ans - max_d)
    ```

### 例：美国血统

<https://www.luogu.com.cn/problem/P1827>

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

### 例：新二叉树

<https://www.luogu.com.cn/problem/P1305>

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

### 例：遍历问题

<https://www.luogu.com.cn/problem/P1229>

> 题意：给定一棵二叉树的前序序列与后序序列，问中序序列的可能情况有多少种
>
> 思路：我们采用从最小结构单元的思路进行考虑，即假设当前二叉树只有一个根结点与两个叶子结点，而非两棵子树。然后将题意进行等价变换，即问对于已经固定的前序和后序二叉树，该二叉树有多少种不同的形状？对于当前的最小结构二叉树，形状就是 **左右根** or **根左右**，现在的根可以直接确定，那么就只能从左右孩子进行变形，很显然只能进行左右交换的变形，但是问题是一旦左右变换，前序 or 后序都会变掉，说明这种左右孩子都存在的前后序固定的二叉树是唯一的，那么如何才是不唯一的呢？我们考虑减少孩子数量。假设没有孩子，那么很显然也只有一个形状，就是一个根结点，故排除。于是答案就呼之欲出了，就是当根结点只有一个孩子时，这个孩子无论是在左边还是右边，前后序都是相同的，但是中序序列就不同了，于是就产生了两种中序序列。于是最终的结论是：对于前后序确定的二叉树来说，中序序列的情况是就是 $2^{\text{单分支结点数}}$ 个。现在的问题就转变为了在给定前后序的二叉树中求解单分支结点个数的问题。
>
> 如何寻找单分支结点呢？根据下面的递归图可以发现，无论是左单分支还是右单分支，如果 pre 的连续两个结点与 post 的连续两个结点对称相同，那么就一定有一个单分支结点，故只需要寻找前后序序列中连续两个字符对称相同的情况数 cnt 即可。最终的答案数就是 $2^{cnt}$
>
> ![图例](https://cdn.dwj601.cn/images/202406061327025.png)
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

### 例：医院设置

<https://www.luogu.com.cn/problem/P1364>

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

### 例：二叉树深度

<https://www.luogu.com.cn/problem/P4913>

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

### 例：淘汰赛

<https://www.luogu.com.cn/problem/P1364>

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

### 例：二叉树问题

<https://www.luogu.com.cn/problem/P3884>

> 题意：给定一棵二叉树的结点关系信息，求出这棵二叉树的深度、宽度和两个指定结点之间的最短路径长度
>
> 思路：二叉树的构建直接采用有向图的构造方法。深度直接 dfs 即可，宽度直接在 dfs 遍历时哈希深度值即可。问题的关键在于如何求解两个给定结点之间的路径长度，很显然需要求解两个结点的 LCA，由于结点数 $\le 100$ 故直接采用暴力的方法，可以重定义结点，增加父结点域。也可以通过比对根结点到两个指定结点的路径信息得到 LCA 即最后一个相同的结点编号（本题采用），通过在 dfs 遍历树时存储路径即可得到根结点到两个指定结点的路径信息。之后直接根据题中新定义的路径长度输出即可，即
>
> $$
> \text{length} = 2 \times (d_x - d_{lca}) + (d_y - d_{lca})
> $$
>
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

### 例：营业额统计

<https://www.luogu.com.cn/problem/P2234>

> 题意：给定一个序列 a，需要计算 $a_1 + \displaystyle \sum_{i=2,1 \le j <i}^{n} \min {|a_i - a_j|}$ ，即计算每一个数与序列中当前数之前的数的最小差值之和
>
> 思路：很显然的思路，对于每一个数，我们需要对之前的序列在短时间内找到一个数值最接近当前数的数。
>
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

### 例：切蛋糕

<https://www.acwing.com/problem/content/description/5581/>

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

### 例：将元素分配到两个数组 II

<https://leetcode.cn/problems/distribute-elements-into-two-arrays-ii/description/>

> 题意：给定 $n$ 个数，现在需要将这些数按照某种规则分配到两个数组 $A$ 和 $B$ 中。初始化分配 `nums[0]` 到 $A$ 中，`nums[1]` 到 $B$ 中，接下来对于剩余的每个元素 `nums[i]`，分配取决于 $A$ 和 $B$ 中比当前元素 `nums[i]` 大的个数，最终返回两个分配好的数组
>
> 思路：首先每一个元素都需要进行枚举，那么本题需要考虑的就是如何在 $\log$ 时间复杂度内统计出两数组中比当前元素大的元素个数。针对 C++ 和 Python 分别讨论
>
> - C++
>     - 法一：`std::multiset<int>`。可惜不行，因为统计比当前元素大的个数时，`s.rbegin() - s.upper_bound(nums[i])` 是不合法的，因为 `std::multiset<int>` 的迭代器不是基于指针的，因此无法直接进行加减来计算地址差，遂作罢
>     - 法二：树状数组。很容易想到利用前缀和统计比当前数大的数字个数，但是由于此处需要对前缀和进行单点修改，因此时间复杂度肯定会寄。有什么数据结构支持「单点修改，区间更新」呢？我们引入树状数组。我们将数组元素哈希到 `[1, len(set(nums))]` 区间，定义哈希后的当前元素 `nums[i]` 为 `x`，对于当前哈希后的 `x` 而言想要知道两个数组中有多少数比当前数严格大，只需要计算前缀和数组 `arr` 中 `arr[n] - arr[x]` 的结果即可
> - Python
>     - `SortedList`。python 有一个 `sortedcontainers` 包其中有 `SortedList` 模块，可以实现 `std::multiset<int>` 所有 $\log$ 操作并且可以进行随机下标访问，于是就可以进行下标访问 $O(1)$ 计算比当前数大的元素个数
>
> 时间复杂度：$O(n \log n)$

```cpp
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

```python
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

```python
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

### 例：以组为单位订门票

<https://leetcode.cn/problems/booking-concert-tickets-in-groups/>

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

## 堆

### 普通堆

堆是一种特殊的树，可以通过一个一维数组来实现该数据结构。具体地，我们利用一个一维数组来模拟一棵完全二叉树，如果这棵完全二叉树满足：

- 任意一个非叶子结点 $\le$ 它的子结点，则称该完全二叉树为「小顶堆」；
- 任意一个非叶子结点 $\ge$ 它的子结点，则称该完全二叉树为「大顶堆」。

利用堆结构，我们可以 $O(1)$ 得到序列最值，因此如果我们能够在可接受的计算开销下动态维护序列的堆结构，那么就可以很方便的维护序列的最值。

动态维护堆结构的逻辑并不复杂，以小顶堆为例。如果要改变堆中任意一个元素，无非就是将新元素递归地与子结点交换（这被称为 `down()` 操作），或者将新元素递归地与父结点交换（这被称为 `up()` 操作）。

下面具体介绍堆支持的操作与算法逻辑。记堆中最后一层的最后一个元素在堆中的下标索引为 `last`：

- 插入一个元素。从根结点开始 `down()`，或从 `last` 开始 `up()`；
- 输出最值。返回根结点；
- 删除最值（如果不唯一则只删除一个）。将 `heap[last]` 从根结点开始 `down()`；
- 删除任意一个元素。将 `heap[last]` 从待删除元素的位置开始，如果比原来的数大就往下 `down()`，反之就往上 `up()`，如果相等就不用操作；
- 修改任意一个元素。与删除元素逻辑类似。

### 对顶堆

TODO

## 并查集

### 基础并查集

并查集虽然一般用来解决集合问题，但数据结构实现上本质是一个由多棵有向根树组成的森林。在采用了路径压缩和按秩合并后，每一次查询与插入的时间复杂度都会均摊为一个常数。

### 带权并查集

例题：[洛谷](https://www.luogu.com.cn/problem/P1525)

民间博客：[Blog](https://www.luogu.com.cn/article/kx2if31n)

### 例：关押罪犯

OJ：[洛谷](https://www.luogu.com.cn/problem/P1525)

题意：给定一个含有 $n\ (n\le2\cdot 10^4)$ 个顶点 $m\ (m\le10^5)$ 条边的无向图，没有重边和自环，边权 $w\ (1\le w_i\le 10^9)$ 为正。现在需要将图中所有的顶点分为两部分，使得两部分中最大的边权尽可能小，输出该最小边权。

思路一：拓展域并查集

- TODO

思路二：二分图 + 二分查找

- 假设答案是 $m$ 条边中某一条的权重 $w_i$，那么所有权重小于 $w_i$ 的边对应的顶点如何分配无关紧要，我们只关注边权大于 $w_i$ 的边对应的顶点能不能被分到两部分。也就是说我们只关心边权大于 $w_i$ 的边对应的顶点组成的图是否可二分。采用染色法即可快速判定一个图是否可二分。注意这里的可二分的图其实不符合「二分图」的严格定义，因为两个部分的顶点之间可能有连边；
- 由于 $w_i$ 越小需要判断的顶点数就越多，具备二分性。因此我们直接在 $m$ 条边中二分查找最小的符合条件的边即可。

时间复杂度：$O(m\log n)$

*[二分图]: 又称二部图 (Bipartite Graph)。定义为：节点由两个集合组成，且两个集合内部没有边的图。

=== "Python 二分"

    ```cpp
    from collections import deque
    
    n, m = map(int, input().strip().split())
    edges = [(-1, -1, 0)]  # 下标从 1 开始
    for _ in range(m):
        u, v, w = map(int, input().strip().split())
        edges.append((u, v, w))
    
    edges.sort(key=lambda x: x[2])
    
    # 染色法 check 二分图
    def chk(idx: int) -> bool:
        g = [[] for _ in range(n + 1)]
        for u, v, w in edges[idx + 1:]:
            g[u].append((v, w))
            g[v].append((u, w))
    
        color = [0] * (n + 1)
    
        def bfs(now: int) -> bool:
            color[now] = 1
            q = deque()
            q.append(now)
            while len(q):
                fa = q.popleft()
                for ch, _ in g[fa]:
                    if color[ch] == 0:
                        color[ch] = -color[fa]
                        q.append(ch)
                    elif color[ch] == color[fa]:
                        return False
            return True
    
        for i in range(1, n + 1):
            if color[i] == 0:
                ok = bfs(i)
                if not ok:
                    return False
        return True
    
    l, r = 0, m
    while l < r:
        mid = (l + r) >> 1
        if chk(mid):
            r = mid
        else:
            l = mid + 1
    
    print(edges[r][2])
    ```

=== "Python 并查集"

    ```python
    class DSU:
        def __init__(self, n: int) -> None:
            self.n = n
            self.sz = n                       # 集合个数
            self.p = [i for i in range(n)]    # p[i]表示第i个结点的祖宗编号
            self.cnt = [1 for i in range(n)]  # cnt[i]表示第i个结点所在集合中的结点总数
    
        def find(self, x: int) -> int:
            if self.p[x] != x:
                self.p[x] = self.find(self.p[x])
            return self.p[x]
    
        def merge(self, a: int, b: int) -> None:
            pa, pb = self.find(a), self.find(b)
            if pa != pb:
                self.p[pa] = pb
                self.cnt[pb] += self.cnt[pa]
                self.sz -= 1
    
        def same(self, a: int, b: int) -> bool:
            return self.find(a) == self.find(b)
    
        def size(self) -> int:
            return self.sz
    
        def size(self, a: int) -> int:
            return self.cnt[a]
    
    n, m = map(int, input().strip().split())
    edges = []
    for _ in range(m):
        u, v, w = map(int, input().strip().split())
        edges.append((u, v, w))
    
    edges.sort(key=lambda edge: -edge[2])
    dsu = DSU(n * 2 + 1)
    for u, v, w in edges:
        fu = dsu.find(u)
        fv = dsu.find(v)
        if fu == fv:
            print(w)
            exit()
        dsu.merge(u, v + n)
        dsu.merge(u + n, v)
    print(0)
    ```

同类题推荐：

- [洛谷绿 | The Door Problem | 洛谷 - (www.luogu.com.cn)](https://www.luogu.com.cn/problem/CF776D)
- [洛谷绿 | 食物链 | 洛谷 - (www.luogu.com.cn)](https://www.luogu.com.cn/problem/P2024)

### 例：Milk Visits S

<https://www.luogu.com.cn/problem/P5836>

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

### 例：尽量减少恶意软件的传播

<https://leetcode.cn/problems/minimize-malware-spread/description/>

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

### 例：账户合并

<https://leetcode.cn/problems/accounts-merge/>

> 题意：给定 n 个账户，每一个账户含有一个用户名和最多 m 个绑定的邮箱。由于一个用户可能注册多个账户，因此我们需要对所有的账户进行合并使得一个用户对应一个账户。合并的规则是将所有「含有相同邮箱的账户」视作同一个用户注册的账户。返回合并后的账户列表。
>
> 思路：这道题的需求很显然，我们需要合并含有相同邮箱的账户。显然有一个暴力的做法，我们直接枚举每一个账户中所有的邮箱，接着枚举剩余账户中的邮箱进行匹配，匹配上就进行合并，但这样做显然会造成大量的冗余匹配和冗余合并，我们不妨将这两个过程进行拆分。我们需要解决两个问题：
>
> - 哪些账户需要合并？很容易想到并查集这样的数据结构。我们使用哈希表存储每一个邮箱的账户编号，最后进行集合合并即可维护好每一个账号归属的集合编号。$O(nm)$
> - 如何合并指定账户？对于上述维护好的集合编号，我们需要合并所有含有相同“祖先”的账户。排序去重或使用有序列表均可实现。$O(n\log n)$
>
> 时间复杂度：$O(n\log n)$

```cpp
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

```python
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
