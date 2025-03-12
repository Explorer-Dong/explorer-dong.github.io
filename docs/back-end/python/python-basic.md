---
title: Python 语法基础
---

本文记录 Python 的语法基础。

## Python 的数据类型

在 Python 中，可以按照「数据的可变性」可以将数据分为两大类：

- 可变数据类型 (immutable data type)：列表 `list`、字典 `dict`、集合 `set`；
- 不可变数据类型 (mutable data type)：整数 `int`、浮点数 `float`、字符串 `str`、元组 `tuple`。

当然，不可变数据并非真的不可变。如果不可变数据中嵌套了可变数据，仍然可以修改其中嵌套的可变数据。比如下面的程序：

```python
original_data = (1, 2, [3, 4], "have a good day")
print(original_data)

# 修改嵌套的可变数据（程序正常运行）
original_data[2][0] = "hello"
print(original_data)

# 修改嵌套的不可变数据（程序报错）
original_data[3][0] = "world"
print(original_data)

""" 程序输出：
(1, 2, [3, 4], 'have a good day')
(1, 2, ['hello', 4], 'have a good day')
TypeError: 'str' object does not support item assignment
"""
```

## Python 的万物引用

在 Python 中「所有的一切都是引用」这句话已经听烂了，但是从未实践证实一番。所谓的万物引用可以从 C++ 的赋值和 Python 的赋值进行对比。

### 变量模型

**在 C++ 中，变量的赋值语句其实是在拷贝构造**。即重新开辟一块内存空间用于被赋值的新变量。比如下面的程序：

```cpp
#include <iostream>
#include <vector>

int main() {
    std::vector<int> a = {1, 2, 3};
    std::vector<int> b = a;

    std::cout << "Memory address of a: " << &a << std::endl;
    std::cout << "Memory address of b: " << &b << std::endl;

    return 0;
}

/* 程序输出：
Memory address of a: 0x8b5a3ffa40
Memory address of b: 0x8b5a3ffa20
*/
```

可以看到输出的内存地址是不一样的。

**在 Python 中，变量的赋值其实是在添加引用**。即所有的赋值后的变量全都是指向同一块内存的引用。比如下面的程序：

```python
a = [1, 2, 3]
b = a
c = a
print(id(a))
print(id(b))
print(id(c))

""" 程序输出：
1542586187072
1542586187072
1542586187072
"""
```

可以看到输出的内存地址是完全一样的。

上述两个程序可以用下面一张图来概括：

![C++ 盒子模型 vs Python 标签模型](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407031133477.png)

/// fc
C++ 盒子模型 vs Python 标签模型 [^py-ref]
///

[^py-ref]: [Python 对象引用、可变性和垃圾回收](https://www.cnblogs.com/demon89/p/7400234.html)

即，C++ 中的变量相当于盒子，简单的赋值语句就相当于重新拿一个盒子装原来的数据；而 Python 中的变量相当于标签，简单的赋值语句就相当于所有标签都贴到了同一块数据上。

### 引用赋值与数据类型的关系

知道了 Python 所有的赋值都是引用以后，新问题出现了：如果我们需要修改某个引用中的值，会发生什么呢？这就需要按照 Python 的数据类型分开讨论了。

**对于可变数据类型**。修改某个引用中的值不会产生新的内存开销。也就是说，会牵一发而动全身。比如下面的程序：

```python
a = [1, 2, 3]
b = a
c = b
print(id(a))
print(id(b))
print(id(c))

c[0] = -1  # a[0] = -1 和 b[0] = -1 效果都是一样的
print(id(a))
print(id(b))
print(id(c))

print(a)
print(b)
print(c)

""" 程序输出：
1441782879424
1441782879424
1441782879424
1441782879424
1441782879424
1441782879424
[-1, 2, 3]
[-1, 2, 3]
[-1, 2, 3]
"""
```

可以看到三个可变数据类型变量 $a,b,c$ 指向的内存空间没有发生改变，并且修改了其中一个变量的值以后，其余变量也都跟着改变。

**对于不可变数据类型**。由于不支持修改操作，那么支持的「重新赋值、拼接、截取」等操作就会重新申请内存。比如下面的程序段：

```python
s = "hello"
t = s
print(id(s))
print(id(t))

t += 'world'
print(id(s))
print(id(t))

""" 程序输出
2193178293488
2193178293488
2193178293488
2193178282864
"""
```

可以看到另一个引用变量 $t$ 在进行拼接操作后，对应的内存地址发生了改变，也就是说申请了新的内存空间。

**意义和作用**。既然有这样的特性，那一定就有不同的适用场景。可以很明显的对应到 C++ 语言：

- Python 可变数据类型的引用，如果发生了修改操作，就等价于 C++ 的引用传递；
- Python 不可变数据类型的引用，如果发生了修改操作，就等价于 C++ 的值传递。

## Python 的拷贝构造

拷贝也就是所谓的复制，在 C++ 中，所有的拷贝都是重新申请内存。在 Python 中略有不同，由于常规的赋值都是引用，因此我们需要额外的 `copy` 库来完成拷贝工作。

浅拷贝只会拷贝原始对象的第一层数据，其中的不可变数据就会拷贝出一个全新的对象，而其中的可变数据仍然是引用；深拷贝会递归的拷贝原始对象的每一层数据从而构造出一个全新的对象。

```python
import copy

# 创建一个嵌套列表
original_list = [1, 2, [3, 4]]

# 浅拷贝
sliced_list = original_list[:]
shallow_copied_list = copy.copy(original_list)

# 深拷贝
deep_copied_list = copy.deepcopy(original_list)

# 修改嵌套列表中的元素
original_list[0] = "haha"
original_list[2][0] = 'changed'

print("Original list:\t", original_list)
print("Sliced list:\t", sliced_list)
print("Shallow copied:\t", shallow_copied_list)
print("Deep copied:\t", deep_copied_list)

""" 程序输出：
Original list:	 ['haha', 2, ['changed', 4]]
Sliced list:	 [1, 2, ['changed', 4]]
Shallow copied:	 [1, 2, ['changed', 4]]
Deep copied:	 [1, 2, [3, 4]]
"""
```

由于嵌套的可变元素在浅拷贝的逻辑中是引用，就导致了浅拷贝的结果中嵌套的可变元素仍然会被后续的操作改变。而深拷贝就不会出现这种问题，数据被拷贝到了全新的内存。这告诉我们如果我们需要完全一份新数据，就必须使用深拷贝。
