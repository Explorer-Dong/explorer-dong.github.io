---
title: python-basic
categories:
  - BackEnd
  - Python
category_bar: true
---

## Python 基础

本文记录 Python3 语法相关的内容。

## 浅析 py 中的数据类型

### 前言

在写 py 的函数时，想要实现下述 C++ 的语法：

```cpp
void f(int& x) {}
```

但是忽然想起来 python 传参时虽然都是引用但是门道有所不同。概念模糊已久，故写此博客权当强化记忆。

### 数据类型

在 python 中，可以按照 **数据的可变性** 将所有的数据类型分为两大类：

- 不可变数据类型 $\text{(mutable)}$：整数 `int`、浮点数 `float`、字符串 `str`、元组 `tuple`
- 可变数据类型 $\text{(immutable)}$：列表 `list`、字典 `dict`、集合 `set`

python 中的很多语法知识都是围绕这两种数据类型分别展开，接下来将从 **万恶的万物引用**、**浅拷贝与深拷贝**、**函数参数传递** 三个视角来理解与运用这两种数据类型。

### 理解与运用

#### 一、万恶的万物引用

在 python 中「所有的一切都是引用」这句话已经听烂了，但是从未实践证实一番。所谓的万物引用可以从 C++ 的赋值和 Python 的赋值进行对比。

在 C++ 中，数据的赋值语句就相当于拷贝构造，即相当于重新开辟一块内存空间用于被赋值的新变量。比如下面的程序：

```cpp
vector<int> a = {1, 2, 3};
vector<int> b = a;
b[0] = -1;

for (int i = 0; i < a.size(); i++) cout << a[i] << " \n"[i == a.size() - 1];
for (int i = 0; i < b.size(); i++) cout << b[i] << " \n"[i == b.size() - 1];

/* 程序输出：
1 2 3
-1 2 3
*/
```

我们知道程序运行时，对于一个数据的存储相当于在内存中开一块临时空间，直到一个逻辑段结束将会自动销毁变量并释放内存空间。在上述 C++ 程序段中，赋值就相当于重新开辟一块内存空间用于存储拷贝的新变量。但是在 Python 中截然不同：所有的赋值全都是一个引用，也就是说所有赋值后的变量都和原始变量一起指向同一块内存空间。比如下面的程序：

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

那岂不是牵一发而动全身？我改了其中一个，其余的引用岂不是都被改动了？的确是如此。

```python
a = [1, 2, 3]
b = a
c = b
c[0] = -1 # a[0] = -1 和 b[0] = -1 效果都是一样的
print(id(a))
print(id(b))
print(id(c))

print(a)
print(b)
print(c)

""" 程序输出：
3180113116480
3180113116480
3180113116480
[-1, 2, 3]
[-1, 2, 3]
[-1, 2, 3]
"""
```

上述所有的示例都可以用下面一张图来表示：C++ 中的变量相当于盒子，简单的赋值语句就相当于重新拿一个盒子装原来的数据；而 Python 中的变量相当于标签，简单的赋值语句就相当于所有标签都贴到了同一块数据上：

![C++盒子模型 vs Python 标签模型](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407031133477.png)

当然了，不可变数据是无法进行上述的「单点修改」的，只有重新构造一个对象，比如重新赋值、拼接、截取等操作。但此时无论是可变数据类型还是不可变数据类型，重新构造一个对象并进行赋值其实就相当于「重新开辟一块内存并贴上标签」了，和引用的关系不大，如下面的程序段：

```python
my_list = [1, 2, 3]
list = my_list
list = [6, 6, 6]
print(id(my_list))
print(id(list))

print(my_list)
print(list)
```

此时就相当于这样的图例：

![重新开辟一块内存并贴上标签](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407031146252.png)

有了上述的知识储备后，理解接下来的知识简直就是易如反掌。

#### 二、浅拷贝与深拷贝

一句话概括：浅拷贝只会拷贝原始对象的第一层数据，其中的不可变数据就会拷贝出一个全新的对象，而其中的可变数据仍然是引用；深拷贝会递归的拷贝原始对象的每一层数据从而构造出一个全新的对象。

```python
import copy

# 创建一个嵌套列表
original_list = [1, 2, [3, 4]]

# 使用[:]切片进行浅拷贝
sliced_list = original_list[:]

# 使用copy模块的浅拷贝
shallow_copied_list = copy.copy(original_list)

# 使用copy模块的深拷贝
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

#### 三、函数参数传递

在前文知识的铺垫下，理解函数参数的传递简直就是喝水，下面开始讲解。既然全都是引用，那么在函数传递参数时也是如此，所有的形参都是实参的引用，于是就回到了「一、万恶的万物引用」中介绍的：

- 若实参是可变数据类型，相当于 C++ 中的引用传参。那么对形参的「单点修改」操作也会改变实参的数据。当然如果对形参赋值全新的对象则并不会改变实参的值，因为让形参指向了新的栈空间。

- 若实参是不可变数据类型，相当于 C++ 中 `const` 级别的引用传递。那么就无法对形参进行「单点修改」操作。只能构造一个全新的对象重新赋值给形参，同样的，此时的形参就不再是实参的引用，而是指向了全新的栈空间。

实例程序如下：

```python
def test_mutable(ls: list, di: dict, se: set):
    ls = [4, 5, 6]
    di[1] = "what"
    se.add(4)

    print("可变数据类型修改中")
    print("ls: {} id: {}".format(ls, id(ls)))
    print("di: {} id: {}".format(di, id(di)))
    print("se: {} id: {}\n==========\n".format(se, id(se)))


def test_immutable(x: int, y: float, s: str, t: tuple):
    x = -1
    y = 789
    s = s[1:]
    t = t[1:]

    print("不可变数据类型修改中")
    print("x: {} id: {}".format(x, id(x)))
    print("y: {} id: {}".format(y, id(y)))
    print("s: {} id: {}".format(s, id(s)))
    print("t: {} id: {}\n==========\n".format(t, id(t)))


if __name__ == "__main__":
    # 可变数据类型
    ls = [1, 2, 3]
    di = {1: "hello", 2: "world"}
    se = set([1, 2, 3])
    print("可变数据类型修改前")
    print("ls: {} id: {}".format(ls, id(ls)))
    print("di: {} id: {}".format(di, id(di)))
    print("se: {} id: {}\n==========\n".format(se, id(se)))

    test_mutable(ls, di, se)

    print("可变数据类型修改后")
    print("ls: {} id: {}".format(ls, id(ls)))
    print("di: {} id: {}".format(di, id(di)))
    print("se: {} id: {}\n==========\n".format(se, id(se)))

    # 不可变数据类型
    x, y = 520, 13.14
    s, t = "hello", (6, 6, 6)
    print("不可变数据类型修改前")
    print("x: {} id: {}".format(x, id(x)))
    print("y: {} id: {}".format(y, id(y)))
    print("s: {} id: {}".format(s, id(s)))
    print("t: {} id: {}\n==========\n".format(t, id(t)))

    test_immutable(x, y, s, t)
    
    print("不可变数据类型修改后")
    print("x: {} id: {}".format(x, id(x)))
    print("y: {} id: {}".format(y, id(y)))
    print("s: {} id: {}".format(s, id(s)))
    print("t: {} id: {}\n==========\n".format(t, id(t)))

""" 程序输出：
可变数据类型修改前
ls: [1, 2, 3]                id: 2180798758528
di: {1: 'hello', 2: 'world'} id: 2180798863872
se: {1, 2, 3}                id: 2180795027008
==========

可变数据类型修改中
ls: [4, 5, 6]                id: 2180763483776 # 重新赋值：形参的地址值发生了改变
di: {1: 'what', 2: 'world'}  id: 2180798863872 # 单点修改：形参的地址值保持不变
se: {1, 2, 3, 4}             id: 2180795027008 # 单点修改：形参的地址值保持不变
==========

可变数据类型修改后
ls: [1, 2, 3]                id: 2180798758528 # 重新赋值：实参保持不变
di: {1: 'what', 2: 'world'}  id: 2180798863872 # 单点修改：实参发生改变
se: {1, 2, 3, 4}             id: 2180795027008 # 单点修改：实参发生改变
==========

不可变数据类型修改前
x: 520       id: 2180798041936
y: 13.14     id: 2180798040688
s: hello     id: 2180798864816
t: (6, 6, 6) id: 2180798863616
==========

不可变数据类型修改中
x: -1        id: 140715370481248 # 重新赋值：形参的地址值发生了改变
y: 789       id: 2180798040432   # 重新赋值：形参的地址值发生了改变
s: ello      id: 2180798584368   # 重新赋值：形参的地址值发生了改变
t: (6, 6)    id: 2180798838528   # 重新赋值：形参的地址值发生了改变
==========

不可变数据类型修改后
x: 520       id: 2180798041936   # 重新赋值：实参保持不变
y: 13.14     id: 2180798040688   # 重新赋值：实参保持不变
s: hello     id: 2180798864816   # 重新赋值：实参保持不变
t: (6, 6, 6) id: 2180798863616   # 重新赋值：实参保持不变
==========
"""
```

可以看到：无论是可变数据类型还是不可变数据，函数调用完成之后地址都不会发生改变。

- 对于可变数据类型：在函数中可以进行重新赋值，也可以进行单点修改。如果重新赋值，形参的地址值会发生改变，实参保持不变；如果单点修改，形参的地址值保持不变，实参发生改变。
- 对于不可变数据类型：在函数中只能进行重新赋值。形参的地址值会发生改变，实参保持不变。

此时再回到一开头提到的，可以通过传递整数实现吗？答案是不可以。因为 int 在 Python 中是不可变的，无法在函数中进行「单点修改」操作，我们只能将其装入可变数据类型比如 list 中实现在函数中通过修改形参达到修改实参的目的。

### 题外话

不可变数据并非真正的不可变。如果不可变数据其中嵌套了可变数据，仍然可以修改其中嵌套的可变数据；当然不可变数据仍然不可修改。比如下面的程序：

```python
original_data = (1, 2, [3, 4], "have a good day")
print(original_data)

# 修改嵌套的可变数据
original_data[2][0] = "hello"
print(original_data)

# 修改嵌套的不可变数据
original_data[3][0] = "world"
print(original_data)

""" 程序输出：
(1, 2, [3, 4], 'have a good day')
(1, 2, ['hello', 4], 'have a good day')
TypeError: 'str' object does not support item assignment
"""
```

### 参考

[一文读懂 Python 值传递和引用传递](https://blog.csdn.net/weixin_68789096/article/details/136314349)

[Python 对象引用、可变性和垃圾回收](https://www.cnblogs.com/demon89/p/7400234.html)

## 查看库的安装位置

由于本地安装了多个 python 解释器，所以想要打印某个版本的解释器下载的「包或模块」的路径，整理一下大约有两种方法

### 方法1：使用模块内置方法

如果模块内置了 `__file__` 方法，则可以直接打印出来：

```python
import numpy as np

print(np.__file__)
```

![直接打印](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406052305698.png)

### 方法二：基于 pip 方法

有些库没有内置上述 `__file__` 方法，可以使用 pip 指令进行打印：

```bash
pip show <PackgeName or ModelName>
```

例如想要打印 `sortedcontainers` 包的安装路径：

```bash
pip show sortedcontainers
```

![使用 pip 指令进行打印](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202406052310960.png)

### 参考

[如何查看安装的 python 库的位置](https://blog.csdn.net/C_chuxin/article/details/82960824)