---
title: py-value-and-reference-pass
categories:
- BackEnd
- pyBasic
category_bar: true
---

## 浅析值传递和引用传递

## 前言

在写 py 的函数时，想要实现下述 C++ 的语法：

```cpp
void f(int& x) {}
```

但是忽然想起来 python 传参时虽然都是引用但是门道有所不同，概念模糊已久，故写此博客权当强化记忆。

## 参考

[一文读懂 Python 值传递和引用传递](https://blog.csdn.net/weixin_68789096/article/details/136314349)