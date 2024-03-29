---
title: cpp-multi-file-call-format
categories: 
  - BackEnd
  - cppBasic
category_bar: true
---

# C++ 多文件调用规范

## 一、常规认知

`.h` 后缀文件编写类的声明文件，`.cpp` 后缀文件编写类的定义文件，示例如下：

**.h 文件**

```cpp
#include <iostream>

class TestClassFunction {
private:
	int classVar;

public:
	void classFun();
};
```

**.cpp 文件**

```cpp
#include "TestClassFunction.h"
#include <iostream>

void TestClassFunction::classFun() {
	std::cout << "classFunction" << std::endl;
}
```

**main 函数文件**

```cpp
#include "TestClassFunction.h"

int main() {
	TestClassFunction obj;
	obj.classFun();

	return 0;
}
```

![输出](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403012308775.png)

## 二、产生想法

我们知道在 python 中，导入一个模块后除了可以使用模块的类，还可以直接调用模块文件中的函数，那么在 C++ 文件中也可以这样吗？答案是可以的，下面开始实操。

我们在上述 TestClassFunction 类的下面继续添加函数：

```cpp
#include <iostream>

class TestClassFunction {
private:
	int classVar;

public:
	void classFun();
};

void globalFun() {
	std::cout << "globalFunction" << std::endl;
}
```

尝试编译，报错：`multiple definition of globalFun()`，重定义错误。解决方法有两个：

1. 将该 `.h` 文件的函数定义写在 `.cpp` 文件中，`.h` 文件只包含函数声明
2. 将该 `.h` 文件的函数写成内联函数的形式，即直接在函数返回值前面加上 `inline` 关键字即可

## 三、产生疑问

1. 问：在 `.cpp` 源文件中对函数定义时，`.cpp` 文件的名字必须是：`函数声明文件名.cpp` 吗？

    答：不是的，只需要一个 `.cpp` 文件引用了该 `.h` 头文件，在其中进行函数定义即可。`函数声明文件名.cpp` 是一种命名规范，便于管理与识别

    ![不规范的 .cpp 文件命名方式](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403012308973.png)

2. 问：内联函数不会产生函数重定义问题的原理是什么？

    答：首先说一下非内联函数为什么会引发重定义错误。查阅后得知是因为引用 `.h` 文件时，如果一个函数被定义，那么引用该 `.h` 的文件中**都会包含这个函数的定义**，由于每个函数（包括全局变量）只能有一个定义，那么很显然在编译链接时就会报重定义的错。接下回答一下问题：当函数被声明为内联时，编译器会尝试将其**插入到每个调用该函数的地方**，以减少函数调用的开销。因此，内联函数的定义必须在每个调用它的文件中都是可见的，这就是为什么它们通常在头文件中定义。

3. 问：为什么 `.h` 文件就可以直接对类的成员函数进行定义而不会出现重定义问题？

    答：C++中的**类成员函数默认是内联的**（inline）。但是不推荐这种直接定义成员函数的方法，因为这会导致编译时代码膨胀（每个调用的地方都会被插入函数代码），故多文件编程的规范就是：无论是类的成员函数还是全局函数，函数的声明都写在 `.h` 文件中，而对于这些函数声明的定义都写在相同文件名的 `.cpp` 文件中。

$END$
