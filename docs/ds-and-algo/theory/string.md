---
title: 字符串
---

## 匹配

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
