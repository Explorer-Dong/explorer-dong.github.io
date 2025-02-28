---
title: 基础数据结构
---

数据结构由「数据」和「结构」两部分组成。我们主要讨论的是后者，即结构部分。按照逻辑结构可以将各种数据结果分类为「线性结构」和「非线性结构」。如下图所示：

![线性数据结构 vs 非线性数据结构](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202408301527018.png)

/// caption

线性数据结构 vs 非线性数据结构

///

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

    ![添加结点](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406292218514.png)
    /// caption
    ///
    
    ```c++
    s->prior = p;
    s->next = p->next;
    p->next->prior = s;
    p->next = s;
    ```

=== "双向链表结点删除"

    ![删除结点](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406292218515.png)
    /// caption
    ///
    
    ```c++
    p->next->prior = p->prior;
    p->prior->next = p->next;
    ```

## 栈

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

## 队列

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

## 字符串

字符串也是一种线性数据结构。可以看做一种顺序存储且元素为字符的顺序表。在实际应用中，关于字符串最常见的操作就是串的匹配，因此我们也重点学习串的匹配算法。

**KMP 算法**。对于模式串 $t,(1\le|t|\le m)$，我们希望在模板串 $s,(1\le|s|\le n)$ 中计算 $t$ 的出现次数或者首次出现 $t$ 的位置等等。显然可以枚举 $s$ 的每个位置然后与 $t$ 进行匹配，这样的时间复杂度为 $O(nm)$。而 [KMP 算法](https://www.cs.jhu.edu/~misha/ReadingSeminar/Papers/Knuth77.pdf) 可以做到 $O(n+m)$，具体地：

- 灵感来源。在暴力匹配方法中，每次都会将模式串 t 右移一位重新与 s 匹配，能不能多移动几位呢？
- 模式串预处理。为了不浪费已经匹配过的子串，我们对模式串 $t$ 维护出一个右移位数表，记作 `next`，其中 `next[j]` 表示 $t$ 的第 $j$ 位可以右移的位数。显然 `next` 数表只需要根据 $t$ 即可维护出来；
- 匹配逻辑。接下来就可以像暴力匹配那样进行匹配了，只不过现在每次失配时，模式串 $t$ 右移的位数从原来的 $1$ 变成了 `next[j]` 了（假设当前模式串匹配到第 $j$ 位）。

??? note "KMP 算法示例代码（下标从 1 开始）"

    === "维护 next 数表"
    
        ```c++
        for (int i = 2, j = 0; i <= m; i++) {
            while (j && t[i] != t[j + 1])
                // 未匹配上则不断回溯
                j = ne[j];
            
            if (t[i] == t[j + 1])
                // 匹配上了则j指针后移一位
                j++;
            
            ne[i] = j;
        }
        ```
    
    === "匹配逻辑"
    
        ```c++
        for (int i = 1, j = 0; i <= n; i++) {
            while (j && news[i] != newt[j + 1])
                // 未匹配上则不断回溯
                j = ne[j];
            
            if (news[i] == newt[j + 1])
                // 匹配上了则j指针后移一位
                j++;
    
            if (j == m) {
                // 匹配完全，则统计并且回溯
                cnt++;
                j = ne[j];
            }
        }
        ```

## 特殊矩阵

对于一个常规的矩阵，我们可以按照「行优先」或「列优先」的方式完整的存储，但是对于一个 **稀疏矩阵**，这样的存储方式会极大的浪费存储空间从而降低算法的执行效率。常见的存储优化方法有两种：

1. 三元组顺序表。将矩阵的非零元素及其下标存到一起，即 `vector<tuple<ValueType, int, int>>`；
2. 十字链表。定义两个指针数组 `vector<CrossNode<T>*> cheads, rheads`，存储行列的头指针即可。

## 哈希表

哈希表是一种应用场景很广的数据结构，其核心思想是空间换时间，通过建立「对象的哈希码」与「对象」之间的映射关系，实现通过对象哈希码快速定位对象的功能。大多数编程语言都实现了哈希的映射功能，例如 C++ 中的 `unordered_map` 类、Python 中的 `dict` 类、Java 中的 `HashMap` 类等。

**哈希表的数据结构**。哈希表是一种特殊的数组，其每一个元素都是一个桶，这个桶可以是链表、红黑树或别的子数据结构。通过哈希函数，将对象计算出一个哈希码即可快速计算出其在哈希表数组中的偏移，从而 $O(1)$ 的定位到该对象所在的桶，然后再在桶中查询该对象。C++ 的 unordered_map 库中的 unordered_map 类和 unordered_multimap 类的基类 _Hashtable 中，定义的哈希表数组是动态数组，数组中的桶是单链表数据结构。源码 `D:\installation_package\Jetbrains\CLion\bin\mingw\lib\gcc\x86_64-w64-mingw32\13.1.0\include\c++\bits\hashtable.h` 是这样解释的：

> In terms of Standard containers the hashtable is like the aggregation of:
>
> *  std:: forward_list <_Node \> containing the elements
> *  std:: vector < std:: forward_list <_Node \>:: iterator > representing the buckets

从上述的描述不难看出，哈希表的关键就是哈希函数的设计，其需要确保哈希码的计算结果尽可能均摊到哈希数组中，减少哈希冲突。

**哈希函数的设计思路**。常用的哈希函数是「除留余数法」。按照数值 $\text{mod}\ p$ 后的数值进行哈希，假设哈希表空间大小为 $m$ ，则 $p$ 一般取 $\le m$ 的质数。

**哈希冲突的解决办法**。常用的哈希冲突处理办法有两种：

1. 拉链法 (Chaining)。hashtable 就是拉链法的实际应用；
2. 开放地址法 (Open Addressing)。该法将产生哈希冲突的元素移动到其他的空桶中进行存储，这种方法在频繁产生哈希冲突时性能较差，而为了找到其他的空桶，开放地址法需要进行空桶探测，常见的探测方法有线性探测（从产生冲突的地方开始沿着某个方向枚举）、双重哈希探测（利用第二个哈希函数探测其余位置）。

## 广义表

个人认为，广义表就是单链表的扩展版。链表中的每一个结点可以是存储数据的 data 结点，也可以是存储新链表 sublist 结点。为了满足这样的数据结构，我们需要每一个结点：

- 存储当前结点的类型，要么是 data 类型，要么是 sublist 类型。即枚举体类型；
- 如果是 data 类型的结点，就存储数据；如果是 sublist 类型的结点，就存储子链表的地址。即联合体类型；
- 存储下一个结点的地址。即指针类型。

广义表结点的结构如下示意图所示：

![广义表结点结构示意图](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406292218530.png)

/// caption

广义表结点结构示意图

///

广义表结点的 C++ 定义如下代码所示：

```c++
template<class T>
struct GListNode {
    enum { ATOM, LIST } type;
    union {
        T data;
        GListNode* sublist;
    };
    GListNode<T>* next;
};
```

广义表数据结构可以应用在存储空间的分配策略上，对应的算法叫做「成组拉链法」。

=== "一些广义表的结构示例图"

    ![广义表的结构示意图](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406292218531.png)
    /// caption
    广义表的结构示意图
    ///

## 树

树其实是一种特殊的图，即无环图。多棵树就组成了一个森林。我们称树中每一个结点的子结点数量为该结点的度，同时对于一棵树，有时会称其为 $x$ 叉树，这里的 $x$ 即树中结点度数的最大值。

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

## 堆 

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

## 图

图是一种由顶点和边组成的数据结构。如果边上带有权重，就称该图为网。对于无向图，如果每一个顶点之间都有路径可达，就称该图为「连通图」，极大连通子图被称为「连通分量」；而有向图就全部加一个 "强" 字，其他含义不变，即「强连通图」和「强连通分量」。对于无向图，直接可达的结点数被称为「度」数；对于有向图，指出去的直接可达结点数被称为「出度」数，指进来的的结点数被称为「入度」数。

**图的存储**。与树类似，图也可以用链表来存储，图中一般将其称为邻接表（一般都是存储出边，如果存储入边就叫做逆邻接表），也可以用邻接矩阵来存储。

**图的遍历**。由于图可能含有环，因此相较于树的遍历，图的遍历需要有一个访问标记数组。一般的遍历方法就是深度优先和广度优先，对于求解两点之间的简单路径问题，深度优先遍历可以很好的解决；对于染色法求二部图问题，广度有点遍历可以很好的解决。

考虑到此处是对数据结构的初步介绍，为了简明扼要，图的相关算法就在 **图论** 部分中再详细介绍。
