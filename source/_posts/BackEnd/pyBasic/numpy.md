---
title: numpy
categories:
- BackEnd
- pyBasic
category_bar: true
---

## numpy 学习记录

## 一、矩阵运算

numpy 的矩阵运算没有 matlab 来的那么显然，因为有一些隐式的规则，因此记录一下相关用法。首先需要注意的是所有的容器类型全都是 `np.ndarray`。共分为以下几种数据结构：

- 标量（Scalar）：一个单独的数字，没有维度
- 向量（Vector）：一维数组
- 矩阵（Matrix）：二维数组
- 张量（Tensor）：三维或更多维度的数组

### 1.1 元素级运算

正确示例

代码：

```python
a = np.array([[1, 2, 3],
              [4, 5, 6]])

b = np.array([[7, 8, 9],
              [10, 11, 12]])

print(a + 1)
print(a - 2)
print(a * b)
print(a / b)
```

结果：

```makefile
[[2 3 4]
 [5 6 7]]
[[-1  0  1]
 [ 2  3  4]]
[[ 7 16 27]
 [40 55 72]]
[[0.14285714 0.25       0.33333333]
 [0.4        0.45454545 0.5       ]]
```

错误示例：两矩阵形状必须完全一致，否则报错

代码：

```python
a = np.array([[1, 2, 3],
              [4, 5, 6]])

b = np.array([[7, 8, 9],
              [10, 11, 12],
              [13, 14, 15]])

print(a + 1)
print(a - 2)
print(a * b)
print(a / b)
```

结果：

```makefile
[[2 3 4]
 [5 6 7]]
[[-1  0  1]
 [ 2  3  4]]
 
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
Cell In[11], line 10
      8 print(a + 1)
      9 print(a - 2)
---> 10 print(a * b)
     11 print(a / b)

ValueError: operands could not be broadcast together with shapes (2,3) (3,3) 
```

### 1.2 向量级运算

分为两类：内积（点积）和外积（叉积）

- 内积相当于 $A_{1\times n}\times B_{n\times 1}=x$
- 外积相当于 $A_{n\times 1} \times B_{1\times m}=C_{n\times m}$

#### 内积（点积）

常用 `@` 运算符、`np.dot(a, b)` 方法。运算结果为标量。此时可以理解为矩阵运算，但是由于 numpy 的广播机制，我们并不需要保证对齐为 $1\times n,n\times 1$，即可自动进行正确运算。

正确示例

代码：

```python
a = np.array([1, 2, 3])
b = np.array([7, 8, 9])

c1 = a @ b
c2 = np.dot(a, b)

print(type(c1), c1)
print(type(c2), c2)
```

结果：

```makefile
<class 'numpy.int32'> 50
<class 'numpy.int32'> 50
```

错误示例：两向量长度必须完全一致，否则报错

代码：

```python
a = np.array([1, 2, 3, 3])
b = np.array([7, 8, 9])

c1 = a @ b
c2 = np.dot(a, b)

print(type(c1), c1)
print(type(c2), c2)
```

结果：报「矩阵没有对齐」的错误

```makefile
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
Cell In[17], line 4
      1 a = np.array([1, 2, 3, 3])
      2 b = np.array([7, 8, 9])
----> 4 c1 = a @ b
      5 c2 = np.dot(a, b)
      7 print(type(c1), c1)

ValueError: matmul: Input operand 1 has a mismatch in its core dimension 0, with gufunc signature (n?,k),(k,m?)->(n?,m?) (size 3 is different from 4)
```

#### 外积（叉积）

常用 `np.outer(a, b)` 方法。运算结果为矩阵。

代码：

```python
a = np.array([1, 2, 3, 3])
b = np.array([7, 8, 9])

c = np.outer(a, b)

print(type(c))
print(c)
```

结果：

```makefile
<class 'numpy.ndarray'>
[[ 7  8  9]
 [14 16 18]
 [21 24 27]
 [21 24 27]]
```

**进阶**。如果参与运算的不是向量，而是二维矩阵甚至高维张量，该方法会将非向量数据**展开成向量**进行运算

代码：

```python
a = np.array([[[[[1, 2]]], [[[3, 4]]], [[[5, 6]]]], [[[[7, 8]]], [[[9, 1]]], [[[2, 3]]]]])
b = np.array([[3, 4, 5], [1, 1, 1]])

c = np.outer(a, b)

print(type(c))
print(a.shape)
print(b.shape)
print(c.shape)
print(c)
```

结果：

```makefile
<class 'numpy.ndarray'>
(2, 3, 1, 1, 2)
(2, 3)
(12, 6)
[[ 3  4  5  1  1  1]
 [ 6  8 10  2  2  2]
 [ 9 12 15  3  3  3]
 [12 16 20  4  4  4]
 [15 20 25  5  5  5]
 [18 24 30  6  6  6]
 [21 28 35  7  7  7]
 [24 32 40  8  8  8]
 [27 36 45  9  9  9]
 [ 3  4  5  1  1  1]
 [ 6  8 10  2  2  2]
 [ 9 12 15  3  3  3]]
```

### 1.3 矩阵级运算

常用 `@` 运算符、`np.dot(a, b)` 方法。运算结果为矩阵。

正确示例

代码：

```python
a = np.array([[1, 2, 3],
              [4, 5, 6]])

b = np.array([[7, 8, 9],
              [10, 11, 12]])

c1 = a @ b.T
c2 = np.dot(a, b.T)

print(a.shape, b.shape, c1.shape, c2.shape)
print(c1)
print(c2)
```

结果：

```makefile
(2, 3) (2, 3) (2, 2) (2, 2)
[[ 50  68]
 [122 167]]
[[ 50  68]
 [122 167]]
```

错误示例1：全都是矩阵。此时与向量自动对齐不同，矩阵运算需要我们手动进行对齐

代码：

```python
a = np.array([[1, 2, 3],
              [4, 5, 6]])

b = np.array([[7, 8, 9],
              [10, 11, 12]])

c1 = a @ b
c2 = np.dot(a, b.T)

print(a.shape, b.shape, c1.shape, c2.shape)
print(c1)
print(c2)
```

结果：报「矩阵没有对齐」的错误

```makefile
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
Cell In[49], line 7
      1 a = np.array([[1, 2, 3],
      2               [4, 5, 6]])
      4 b = np.array([[7, 8, 9],
      5               [10, 11, 12]])
----> 7 c1 = a @ b
      8 c2 = np.dot(a, b.T)
     10 print(a.shape, b.shape, c1.shape, c2.shape)

ValueError: matmul: Input operand 1 has a mismatch in its core dimension 0, with gufunc signature (n?,k),(k,m?)->(n?,m?) (size 2 is different from 3)
```

错误示例2：既有矩阵也有向量。此时同样需要我们手动对齐，否则报错

代码：

```python
a = np.array([1, 2, 3])

b = np.array([[7, 8, 9],
              [10, 11, 12]])

c = a @ b

print(a.shape, b.shape, c.shape)
print(c)
```

结果：报「矩阵没有对齐」的错误

```makefile
---------------------------------------------------------------------------
ValueError                                Traceback (most recent call last)
Cell In[52], line 6
      1 a = np.array([1, 2, 3])
      3 b = np.array([[7, 8, 9],
      4               [10, 11, 12]])
----> 6 c = a @ b
      8 print(a.shape, b.shape, c.shape)
      9 print(c)

ValueError: matmul: Input operand 1 has a mismatch in its core dimension 0, with gufunc signature (n?,k),(k,m?)->(n?,m?) (size 2 is different from 3)
```

### 小结

我们可以将上述总结为「元素级」运算和「矩阵级」运算。向量和矩阵统称为矩阵。张量运算机制暂时不予讨论

- 对于元素级运算。如果矩阵直接和标量运算就没有约束；如果和另外一个矩阵进行标量运算就需要保证两个矩阵的**形状完全一致**；
- 对于矩阵级运算。如果参与运算的**只有向量**则无需对齐；如果参与运算的**存在矩阵**则必须手动对齐。并且此时 `@` 运算符和 `np.dot(a, b)` 完全相同。
