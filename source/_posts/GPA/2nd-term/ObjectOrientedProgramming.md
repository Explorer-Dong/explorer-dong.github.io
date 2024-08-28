---
title: ObjectOrientedProgramming
categories:
  - GPA
  - 2nd-term
category_bar: true
---

## 面向对象程序设计

## 一、前置说明
这篇博客是用来记录期中考试过后我对C++的课上复现以及课后练习的过程

- 知识点请食用目录进行参考

- 未涉及的知识点请食用我在之前写过の一篇期中机考总结。**传送门：**[C++期中机考试题](https://blog.csdn.net/qq_73408594/article/details/130540895)

## 二、二叉树
### 2.1 参考资料
**关于二叉树**。先贴上这一篇对我影响颇深的博客，没有他我怎么都想不明白二叉树的三种遍历方式：[数据结构——二叉树先序、中序、后序及层次四种遍历（C语言版）](https://blog.csdn.net/chinesekobe/article/details/110874773)

**关于递归**。由于二叉树的构建其中一种涉及到了递归建树，我再贴一篇博客，以此记录这篇博客对我**递归**理解的启发与深远影响：[100天精通Python（基础篇）——第10天：函数进阶](https://blog.csdn.net/yuan2019035055/article/details/121350999)

**关于二叉搜索树 (Binary Search Tree, 简称 BST) 和平衡二叉搜索树 (Balanced Binary Tree, 简称 AVL)**。最后再贴两篇，除了课上听的与结合 chatgpt 问出来的，这篇博客写的也很详细，尤其是代码部分比较符合我的习惯，也算帮了大忙。并且，由于以下我只涉及到了二叉搜索树的构建与遍历，其他的包括**删除结点与查询结点**并未涉及，大家可以按照需要进行补充。同时再补充一篇关于二叉搜索树的优化数据结构，平衡二叉搜索树：

- [二叉排序树（二叉查找树、二叉搜索树）（图解+完整代码）](https://blog.csdn.net/weixin_54186646/article/details/124412656)
- [二叉查找树及平衡二叉树(AVL树)详解]()

### 2.2 二叉搜索树的构建
#### 2.2.1 递归构建
```cpp
#include <iostream>

using namespace std;

struct Node {
    int val;
    Node* left;
    Node* right;
    
    // 创建新结点时，同时重置左右结点为空结点
    Node(int _val) : val(_val), left(nullptr), right(nullptr) {}
};

class BinarySearchTree {
private:
    Node* root;
    
    // 找到适合插入的位置并创建结点，返回所创建结点的地址
    Node* Insert(Node* now, int x) {
        if (now == nullptr)
            now = new Node(x);
        else if (x < now->val)
            now->left = Insert(now->left, x);
        else
            now->right = Insert(now->right, x);
        
        return now;
    }
    
    void Output(Node* now) {
        if (now == nullptr) return;
        
        Output(now->left);
        cout << now->val << ' ';
        Output(now->right);
    }

public:
    BinarySearchTree() : root(nullptr) {}
    
    void Insert(int x) {
        // 递归构建二叉树
        root = Insert(root, x);
    }
    
    void Output() {
        Output(root);
    }
};

int main() {
    BinarySearchTree Tree;
    
    int a[] = {3, 2, 4, 1, 5, 7, 9, 6, 8}, n = 9;
    
    for (int i = 0; i < n; i++) {
        Tree.Insert(a[i]);
    }
    Tree.Output();
    
    return 0;
}
```
#### 2.2.2 迭代构建
```cpp
#include <iostream>

using namespace std;

struct Node {
    int val;
    Node* left;
    Node* right;
    
    // 创建新结点时，同时重置左右结点为空结点
    Node(int _val) : val(_val), left(nullptr), right(nullptr) {}
};

class BinarySearchTree {
private:
    Node* root;
    
    void Output(Node* node) {
        if (node == nullptr) return;
        
        Output(node->left);
        cout << node->val << ' ';
        Output(node->right);
    }

public:
    BinarySearchTree() : root(nullptr) {}
    
    // 迭代构建二叉树
    void Insert(int x) {
        if (root == nullptr) {
            root = new Node(x);
            return;
        }
        Node* cur = root;
        while (true) {
            if (x == cur->val) break;
            else if (x < cur->val) {
                if (cur->left == nullptr) {
                    cur->left = new Node(x);
                    break;
                }
                cur = cur->left;
            } else {
                if (cur->right == nullptr) {
                    cur->right = new Node(x);
                    break;
                }
                cur = cur->right;
            }
        }
    }
    
    void Output() {
        Output(root);
    }
};

int main() {
    BinarySearchTree Tree;
    
    int a[] = {3, 2, 4, 1, 5, 7, 9, 6, 8}, n = 9;
    
    for (int i = 0; i < n; i++) {
        Tree.Insert(a[i]);
    }
    Tree.Output();
    
    return 0;
}
```
**三种输出结果：**
```cpp
前序遍历：3, 2, 1, 4, 5, 7, 6, 9, 8
中序遍历：1, 2, 3, 4, 5, 6, 7, 8, 9
后序遍历：1, 2, 6, 8, 9, 7, 5, 4, 3
```
### 2.3 二叉树的遍历
```cpp
伪代码：(中序遍历为例)
---------------------
传入结点
if (结点为空) return;

传入结点的左指针;
输出;
传入结点的右指针;
```
### 2.4 二叉树的应用
> 赠送一道算法题
> [AcWing 3384. 二叉树遍历](https://www.acwing.com/problem/content/description/3387/)

**AC代码**
```cpp
#include <iostream>

using namespace std;

string s;
int pos;

struct Node {
    char val;
    Node* left;
    Node* right;
    
    Node(char x) : val(x), left(nullptr), right(nullptr) {}
};

class BinaryTree {
private:
    Node* root;
    
    Node* build() {
        char c = s[pos++];
        if (c == '#') return nullptr;
        Node* node = new Node(c);
        node->left = build();
        node->right = build();
        return node;
    }
    
    void OutputIn(Node* now) {
        if (now == nullptr) return;
        OutputIn(now->left);
        cout << now->val << ' ';
        OutputIn(now->right);
    }

public:
    BinaryTree() : root(nullptr) {}
    
    void buildTree() {
        root = build();
    }
    
    void OutputIn() {
        OutputIn(root);
    }
};

int main() {
    BinaryTree Tree;
    cin >> s;
    Tree.buildTree();
    Tree.OutputIn();
    return 0;
}
```

## 三、继承与派生

> 参考书籍：《C++面向对象程序设计》 ——科学出版社
### 3.1 最简单的生死
```cpp
#include <iostream>

using namespace std;

class A {
private:
    int x;
public:
    A(int x = 0) : x(x) {
        cout << x << endl;
    }
    virtual ~A() {
        cout << -x << endl;
    }
};

class AA : public A {
private:
    int xx;
public:
    AA(int x, int xx) : A(x), xx(xx) {
        cout << xx << endl;
    }
    ~AA() {
        cout << -xx << endl;
    }
};

int main() {
    AA a1(3, 4);
    AA a2(2, 5);
    return 0;
}
```
```cpp
输出：
3
4
2
5
-5
-2
-4
-3
```
- 列表化初始化的时候感觉和**父类这个对象是当前子类的成员变量**一样
- 析构顺序为：父生，子生，子死，父死

### 3.2 动态申请空间的生死
> 类与上述一致
```cpp
int main() {
    A* a = new A(2);
    AA* aa = new AA(3, 4);
    delete a;
    delete aa;
    return 0;
}
```
- 这没啥好说的想谁生就生，想谁析构就让谁析构
- 父类的使用与平常一致，没有影响
- 有一个好玩的地方就是关于析构函数中`virtual`关键字是否使用的问题。如果当前类可继承，并且确实被继承了，那么它的析构函数就一定要加`virtual`关键字，这样才能确保内存释放干净
- 可以将基类与派生类之间的继承关系理解为一棵多叉树，其中最开始被继承的基类为根节点。假设此时有一个例子为：利用一个`A`类的指针创建一个`B`类的对象`A* ptr = new B`，那么
	- 创建过程：
		1. 从B结点开始递归搜索到A结点
		2. 从A结点开始依次执行到B结点
	- 销毁过程：
		1. 从`ptr`所属对象A的结点开始递归搜索到B结点
		2. 从B结点开始依次向A结点销毁

### 3.3 继承中的protectd权限
```cpp
#include<iostream>

using namespace std;

class A {
private:
    int x1;  // 完全是自己控制
public:
    int x2;  // 完全供大家控制
protected:   // 传给子类
    int x3;
public:
    A(int x1, int x2, int x3) : x1(x1), x2(x2), x3(x3) {
        cout << x1 << " " << x2 << " " << x3 << endl;
    }
    virtual ~A() {
        cout << -x1 << " " << -x2 << " " << -x3 << endl;
    }
};

class AA : public A {
    int xx;
public:
    AA(int x1, int x2, int x3, int xx) : A(x1, x2, x3), xx(xx) {
        cout << x1 << " " << x2 << " " << x3 << " " << xx << endl;
    }
    ~AA() {
        // cout << -x1  不能存取父类中的私有成员
        cout << -x2 << " " << -x3 << " " << -xx << endl;
    }
};

int main() {
    A* p1 = new A(1, 2, 3);
    delete p1;
    
    AA* p2 = new AA(4, 5, 6, 7); // 此程序等价于A* p2 = new AA(4, 5, 6, 7);
    delete p2;
    
    return 0;
}
```
```cpp
输出：
1 2 3
-1 -2 -3
4 5 6
4 5 6 7
-5 -6 -7
-4 -5 -6
```
- `protected`的数据成员只可以在这个类的派生类中使用，其他地方都不可以调用
- 基类的`private`数据成员只可以在这个类中使用，其他地方包括它的派生类都不可以访问


### 3.4 三种继承方式
- 公有继承
	> 就是没啥区别，这是主要工程上主要使用的继承方式
- 私有继承
	> 可以理解为
	> - 将基类的公有与保护的成员全部变成私有类型了，类外都不能访问到基类的`public`成员了
	> - 将基类的公有与保护的成员作为自己的私有成员继承下来了，后续的派生类都没有访问的权限
- 保护继承
	> - 可以理解为将基类的公有的成员全部变成保护类型了，类外同样都不能访问到基类的`public`成员了
	> - 将基类的公有成员作为自己的保护成员继承下来了，后续的派生类任然可以访问将基类的`public`成员作为`protected`成员进行访问

### 3.5 修改某些继承成员的继承类型
> 只是在派生类中对继承下来的成员进行了继承方式的修改，并不影响基类中成员本身的权限属性

**举个例子**

```cpp
#include <iostream>

using namespace std;

// 在派生类中将基类的某些成员重继承为与派生类的继承方式不同的成员

class A {
private:
protected:
public:
    void f1() {
        cout << "私有继承后，外界无法访问到基类中的公有成员了" << "\n";
    }
    void f2() {
        cout << "私有继承后，我让 f2 函数变为外界可访问" << "\n";
    }
    void f3() {
        cout << "私有继承后，我让 f3 函数变为外界可访问" << "\n";
    }
    void f3(int) {
        cout << "私有继承后，我让 f3 重载函数通过一句话也变为外界可访问" << "\n";
    }
};

class B : A { // 默认私有继承
private:
protected:
public:
    using A::f2;
    using A::f3; // 这一句话就可以改变所有的同名的重载函数
};

int main() {
    B object;

//	object.f1(); // A::f1 不可访问，因为 B 使用 private 从 A 继承
    object.f2();
    object.f3();
    object.f3(1);
    
    return 0;
}
```

### 3.6 多级派生
> 没什么好多说的，上代码！代码看懂了，输出结果看懂了，就OK了
>
> **唯一需要强调的一点是，在多级派生时，对于一个派生类对象的初始化，一定要附带着把他所有的“爹”也全部初始化，否则调用默认构造函数初始化他的所有“爹”**
```cpp
#include <iostream>
#include <string>

using namespace std;

class A {
protected:
    int id;
    string name;
public:
    A(int id = 0, string name = "hehe") : id(id), name(name) {
        cout << "基类A被创建" << endl;
    }
    ~A() {
        cout << "基类A被销毁" << endl;
    }
    int get_id() { return id; }
    string get_name() { return name; }
    void show_A() {
        cout << "id: " << "\t" << get_id() << endl;
        cout << "name: " << "\t" << get_name() << endl;
    }
};

class B : public A {
protected:
    double score;
public:
    B(int id = 0, string name = "hehe", double score = 99.5)
            : A(id, name), score(score) {
        cout << "直接派生类B被创建" << endl;
    }
    virtual ~B() {
        cout << "直接派生类B被销毁" << endl;
    }
    double get_score() { return score; }
    void show_B() {
        show_A();
        cout << "score: " << "\t" << get_score() << endl;
    }
};

class C : public B {
protected:
    int age;
public:
    C(int id = 0, string name = "hehe", double score = 99.5, int age = 18)
            : B(id, name, score), age(age) {
        cout << "间接派生类C被创建" << endl;
    }
    virtual ~C() {
        cout << "间接派生类C被销毁" << endl;
    }
    int get_age() { return age; }
    void show_C() {
        show_B();
        cout << "age: " << "\t" << get_age() << endl;
    }
};

int main() {
    C obj(1, "dwj", 100.0, 16);
    obj.show_C();
    return 0;
}
```
输出结果：

```cpp
基类A被创建
直接派生类B被创建
间接派生类C被创建
id:     1
name:   dwj
score:  100
age:    16
间接派生类C被销毁
直接派生类B被销毁
基类A被销毁
```
由于是公有继承，故在 C 类创建的对象中，可以调用父类的全部 `public` 以及 `protected` 方法，当然自己的什么都可以调用啦~

![调用示例](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202408281125969.png)

### 3.7 多重继承
也就是一个派生类继承了 $\ge2$ 个基类

#### 3.7.1 变量域覆盖
> 当前对象的成员如果与基类的成员重名或者函数重名并且参数列表完全一致，就会被当前的派生类完全覆盖，以下为变量名覆盖

程序
```cpp
#include <iostream>
#include <string>

using namespace std;

class A {
protected:
    string name;
public:
    A(string name) : name(name) {}
};

class B {
protected:
    string name;
public:
    B(string name) : name(name) {}
};

class C : public A, public B {
private:
    string name;
public:
    C(string nameA, string nameB, string nameC) : A(nameA), B(nameB), name(nameC) {}
    void show() {
        cout << "A的name: " << name << endl;
        cout << "B的name: " << name << endl;
        cout << "C的name: " << name << endl;
    }
};

int main() {
    C test("Tom", "Jerry", "John");
    
    test.show();
    
    return 0;
}
```
输出结果
```cpp
A的name: John
B的name: John
C的name: John
```
#### 3.7.2 使用域作用运算符分辨成员
修改类 `C` 为：
```cpp
class C : public A, public B {
private:
    string name;
public:
    C(string nameA, string nameB, string nameC) : A(nameA), B(nameB), name(nameC) {}
    void show() {
        cout << "A的name: " << A::name << endl;
        cout << "B的name: " << B::name << endl;
        cout << "C的name: " << C::name << endl; // 也可以直接 name
    }
};
```
运行结果：
```cpp
A的name: Tom
B的name: Jerry
C的name: John
```
### 3.8 虚基类
> 无论虚基类出现在继承层次的哪个位置上，他们都是**在非虚基类之前被构造**。有虚基类的派生类的构造函数的调用次序是：**编译器按照直接基类的声明次序，检查虚基类的出现情况，每个继承子树按照深度优先的顺序检查并调用虚基类的构造函数。虚基类多次出现只调用一次构造函数。虚基类的构造函数调用完之后，再按照声明的顺序调用非虚基类的构造函数**（真的是又臭又长:cry:）
>
> 总结一下就是两点：
>
> 1. 按照声明顺序，深度优先搜索虚基类，后序构造
> 2. 按照声明顺序，深度优先搜索非虚基类，后序构造
>
> 举三个例子就知道了（图中虚继承用虚线表示）

#### 3.8.1 例一

```cpp
class A { };
class B : public virtual A { }; 
class C : public virtual A { };
class D : public B, public C { };
```
![例一](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202408281134686.png)

> 那么`D`对象创建时，构造函数的调用顺序是：`A, B, C, D`
#### 3.8.2 例二

```cpp
class A { };
class B { };
class C : public B, public virtual A { };
class D : public virtual A { };
class E : public C, public virtual D { };
```
![例二](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202408281135128.png)


> 那么`E`对象创建时，构造函数的调用顺序是：`A, D, B, C, E`
#### 3.8.3 例三

```cpp
class A {};
class B : public A {};
class C {};
class D {};
class E : public virtual D {};
class F : public B, public E, public virtual C {};
```
![例三](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202408281135284.png)


> 那么`F`对象创建时，构造函数的调用顺序是：`D, C, A, B, E, F`

### 3.9 基类和派生类的转换
> 大概就是对于一个派生类，在赋值 or 指针传递 or 引用传递给一个基类对象 or 基类指针 or 基类引用时，会失去派生类的另外加的成员变量，变成一个基类的对象。为了通过基类的指针，改变派生类的成员方法，引出了C++中的一大特性：**多态性**


## 四、多态性与虚函数
### 4.1 前言
> 先补充一下函数调用绑定的知识点：分为静态绑定与动态绑定
>
> - 静态绑定：函数与函数体在编译的时候就对应捆绑起来了，比如重载
> - 动态绑定：按照主观意愿，使用一个函数名动态的调用很多同名的函数

### 4.2 虚函数
> 其实就是在父类中的函数声明最前面加上`virtual`关键词，从而在子类中可以重名改写这个函数，最后在相应的对象中通过指针或者引用调用响应对象的相同的函数，实现不同的自定义功能

举个例子
```cpp
#include <iostream>

using namespace std;

class A {
protected:
    int a;
public:
    A() { a = 0; }
    virtual void Output() {
        cout << "A: " << a << endl;
    }
};

class B : public A {
private:
    int b;
public:
    B() : A() { b = 1; }
    void Output() {
        cout << "A: " << a << endl;
        cout << "B: " << b << endl;
    }
};

int main() {
    A obj_A;
    A* pA = &obj_A;
    pA->Output();
    
    B obj_B;
    pA = &obj_B;
    pA->Output();
    
    return 0;
}
```

输出：

![输出](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202408281136747.png)

如果删除基类中的 `virtual` 关键字，则无法调用子类对象中的 `Output` 函数，只会输出这个：

![删除 virtual 关键字之后的输出](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202408281137612.png)

并且会警告：

![警告](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202408281137789.png)

### 4.3 纯虚函数
> 其实就是提供一个**接口**，只有函数声明，不写任何函数定义，从而实现了一个从基类定义的接口，供所有的子类进行函数的重写以及后续主函数中的调用（通过指针）
>
> 唯一的语法注意点就是加一个 `=0`，如下是一个示例

```cpp
class A {
private:
public:
    virtual void f() = 0;
    virtual void g();
    void h();
};
```
- `f()` 是一个纯虚函数，用来做基类中的接口的
- `g()` 是一个虚函数，需要有自己的定义
- `h()` 是一个普通的基类中的成员函数，在其派生类中不可以进行重写
### 4.4 抽象类
> 包含纯虚函数的类就是一个抽象类；如果类中全是纯虚函数，则这个类就是纯抽象类，如下是一个示例

```cpp
class A {
private:
public:
    virtual void f() = 0;
    virtual void g() = 0;
    virtual void h() = 0;
};
```