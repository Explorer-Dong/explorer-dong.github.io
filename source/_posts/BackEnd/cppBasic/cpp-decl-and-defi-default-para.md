---
title: cpp-decl-and-defi-default-para
categories: 
  - BackEnd
  - cppBasic
category_bar: true
---

# C++ 函数声明与定义中的缺省参数

## 实践

无论是非内联函数还是内联函数，缺省参数均只能定义在函数的声明语句中，如下面的程序段：

```cpp
#include <iostream>

class demoClass {
public:
	int classFun(int num=100);
};

int fun(int num=100);

int main() {
	std::cout << fun(10) << std::endl;
	return 0;
}

int demoClass::classFun(int num) {
	return num;
}

int fun(int num) {
	return num;
}
```

如果在函数定义中继续进行缺省参数初始化，则会报错重定义缺省参数 `Redefinition of default argument` ：

![Redefinition of default argument](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403041428426.png)

## 理论

编译时，编译器会查找函数的声明来获取该函数的签名信息，包括：参数类型和返回类型，并不关心函数体的内容。假如只在函数定义中定义了缺省参数，在函数声明时没有定义缺省参数，此时在调用该函数时没有传递参数，由于编译器在编译函数调用时只会寻找函数声明语句而不关心函数定义，就会发生无法寻找到目标函数的错误：

![无法寻找到目标函数](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403041428507.png)

## 总结

无论是非内联函数（全局函数）还是内联函数（成员函数），缺省参数都只能定义在函数声明的参数列表中，而不能只在函数声明中重复定义或者只在函数定义中定义缺省参数值