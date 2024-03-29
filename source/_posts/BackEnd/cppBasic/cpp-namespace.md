---
title: cpp-namespace
categories: 
  - BackEnd
  - cppBasic
category_bar: true
---

# C++ 命名空间

## Ques

用久了 `using namespace std` 后，不禁产生疑问，这是什么意思？为什么去掉了这行代码以后，一些常用的类、输入输出等等都需要加上 `std::` 之后才能继续使用（比如 `std::vector`、`std::cout`、`std::endl` 等等）？

## Answ

先做一个形象的类比。我们知道在一个文件夹下不允许出现两个相同名称的文件，但是不同的文件夹下可以出现相同名称的文件。现在我需要区别的指定某一个文件，就需要显示的声明该文件属于哪一个文件夹下。放在 C++ 的库引用中也是如此。下面继续介绍一个前置知识，C++ 标准库。

关于 C++ 标准库 Standard Library。我们使用 `using namespace std` 就是为了使用这个库的一些内容，这些内容包括 **标准函数库** 和 **面向对象类库**，前者继承自 C 语言函数库并为了支持类型安全做了一定修改；后者则定义了大量常见操作的类。关于 C++ 标准库的详细说明将会在下一篇文章中深入解析。

### 1. 规范举例

至此我们已经了解了命名空间的含义与 std 是什么的前置知识，下面开始正式介绍命名空间。命名空间就是一个声明定义了很多类和函数的一个库，开发者可以通过 `::` 作用符来使用该库的所有类和函数，主要作用是为了消除同名类或函数导致的命名冲突。我们就以 std 标准库为例，下面的代码大致罗列了命名空间的使用规范：

```cpp
#include <compare>
#include <initializer_list>
#include <ios>
#include <streambuf>
#include <istream>
#include <ostream>

namespace std {
  // 数学函数(连带勒让德多项式) math.h
  assoc_legendre(unsigned l, unsigned m, x);
  float assoc_legendref(unsigned l, unsigned m, float x);
  long double assoc_legendrel(unsigned l, unsigned m, long double x);
  
  // 动态数组类 vector
  template<class T, class Allocator = allocator<T>> class vector;
 
  template<class T, class Allocator>
    constexpr bool operator==(const vector<T, Allocator>& x,
                              const vector<T, Allocator>& y);
  template<class T, class Allocator>
    constexpr __synth_three_way_result<T> operator<=>(const vector<T, Allocator>& x,
                                                    const vector<T, Allocator>& y);
  
  // 输入输出类 iostream
  extern istream cin;
  extern ostream cout;
  extern ostream cerr;
}
```

### 2. 自定义命名空间

可以自定义命名空间，编写属于自己的库，举个例子，我定义一个命名空间叫 `myLibrary`，其中包含很多的功能模块，`eat` 模块，`sleep` 模块：

```cpp
// myLibrary - eat

#include <iostream>

namespace myLibrary {
    // eat class
    class eat {
    private:
        char namep[4];
        int age;

    public:
        void fun();
        void step();
    };

    // eat function
    void go();
}
```

```cpp
// myLibrary - sleep

#include <iostream>

namespace myLibrary {
    // sleep class
    class sleep {
    private:
        char[] who;
        int why;
        
    public:
        void lie();
    };
    
    // sleep function
    void haha();
    void cry();
}
```

### 3. 嵌套编写命名空间

```cpp
// anotherLibrary - study

#include <iostream>

namespace anotherLibrary {
    class who {};
    class what {};
    class how {};
    
    void open();
    void close();
    
    // insert namespace
    namespace secondLibrary {
        class where {};
        class which {};
        void write(int a, int b);
    }
}
```

- 如果需要使用第一层命名空间中的类或函数，语法如；`anotherLibrary::who myClass;`
- 如果需要使用嵌套的命名空间中的类或函数，语法如：`anotherLibrary::secondLibrary::write(1, 2);`

### 4. using 的使用

我们也可以通过 using 来显式的指定**当前作用域**中使用的命名空间，而不需要每次使用某个命名空间下的类或方法时，显式的标出空间名，比如：

```cpp
#include <iostream>
#include <vector>

int fun(int num) {
	using namespace std;
	
	vector<int> a(num + 1);
	int sum = 0;
	for (int i = 1; i <= num; i++) a[i] = i;
	for (int i = 1; i <= num; i++) sum += a[i];
	
	return sum;
}

int main() {
	std::cout << fun(10) << std::endl;
	
	return 0;
}
```

上述程序中，std 命名空间被显式的在 `fun` 函数作用域中标出了，所以可以直接使用 `vector` 而不用写成 `std::vector`。但是在 `main` 函数作用域中没有显式的标出 std 故还是需要使用 `std::` 才能使用该命名空间中定义的类或方法，此处为输入输出类的 `std::cout` 与 `std::endl`

## Refe

<https://www.runoob.com/cplusplus/cpp-namespaces.html>

<https://en.cppreference.com/w/cpp/header>

$END$
