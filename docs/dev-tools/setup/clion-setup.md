---
title: 配置 CLion
---

## 自动加载 CMake 更改

> 适用于文件更新频繁的场景。

![勾选自动加载 CMake 更改](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407311200790.png)

/// fc
勾选自动加载 CMake 更改
///

## 单文件编译运行

> 为了保存算法竞赛时每一场比赛的每一道题目代码，需要单文件编译运行。下载 C/C++ Single File Execution 插件使用即可。

![C/C++ Single File Execution](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407311205580.png)

/// fc
C/C++ Single File Execution
///

每次创建新文件时右键选择：为单文件添加可执行文件。

![为单文件添加可执行文件](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407311207733.png)

/// fc
为单文件添加可执行文件
///

看到 CMakeLists.txt 文件中就新增了一个 `add_executable` 栏，而不是继续在原来的 `main.cpp` 下面添加可执行文件目录。

![新增了一个 add_executable 栏](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202407312357483.png)

/// fc
新增了一个 add_executable 栏
///

## 配置代理服务

> 加速插件更新、全局更新等操作。

进入 `Settings >> Appearance & Behavior >> System Settings >> HTTP Proxy`，如下：

![进入代理设置界面](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403032127859.png)

/// fc
进入代理设置界面
///

选择 Manual proxy configuration，选择 HTTP 选项，输入主机名（如果是配置本地电脑 `127.0.0.1` 或者 `localhost` 均可），输入代理服务商提供的代理端口号，我的是 Clash Verge，如下：

![Clash Verge 端口查询界面](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403032127860.png)

/// fc
Clash Verge 端口查询界面
///

连接 Google 或 Github 等外网进行测试，如下：

![连接 Google 或 Github 等外网进行测试](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403032127861.png)

/// fc
连接 Google 或 Github 等外网进行测试
///

测试连接成功，那么配置就成功了，如下：

![测试连接成功](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403032127862.png)

/// fc
测试连接成功
///

## 解决 CLion 输出中文乱码问题

在 CLion 的默认设置下，标准输出中的中文会出现乱码。

### 问题复现

示例代码：

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "你好" << endl;
    return 0;
}
```

输出：

```text
浣犲ソ
Process finished with exit code 0
```

### 解决方案

编码问题就需要修改编码方式，按照下面的流程进行操作即可。

1）进入设置

![进入设置](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403011101299.png)

/// fc
进入设置
///

2）选择 `Editor` 中的 `File Encodings`

![选择 Editor 中的 File Encodings](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403011101301.png)

/// fc
选择 Editor 中的 File Encodings
///

3）将这两个下拉框中的选项全部选择为 `UTF-8`，点击 `OK`

![将这两个下拉框中的选项全部选择为 UTF-8](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403011101302.png)

/// fc
将这两个下拉框中的选项全部选择为 UTF-8
///

4）在主页面的右下角，将这个选项设置为 `GBK`

![设置为 GBK](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403011101303.png)

/// fc
设置为 GBK
///

5）选择 `Convert`

![选择 Convert](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403011101304.png)

/// fc
选择 Convert
///

### 最终效果

重新运行上述代码即可正常输出中文：

```c
你好
Process finished with exit code 0
```

## 解决 CLion 无法打开文件问题

在 CLion 中，相对路径索引的起始根默认为 `cmake-build-debug` 文件夹，故无法找到文件。

### 问题复现

在使用 CLion 进行文件路径索引时，出现文件无法打开的现象，如图：

![无法打开文件](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402292258802.png)

/// fc
无法打开文件
///

我们使用 `cstring` 库的 `strerror()` 函数检测一下问题：

![使用 cstring 库的 strerror() 函数检测问题](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402292258397.png)

/// fc
使用 cstring 库的 strerror() 函数检测问题
///

可以发现是未找到文件。因为在 CLion 中相对路径索引的起始根默认为 `cmake-build-debug` 文件夹，故无法找到。

### 解决方案

解决方法有三个。如下：

1）跳出 `cmake-build-debug` 文件夹再进行索引，即路径设置为 `"../test.txt"`。

2）使用绝对路径。

3）修改项目的默认根目录为当前文件夹。

进入 `Run >> Edit Configurations`

![修改项目的默认根目录为当前文件夹](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402292258745.png)

/// fc
修改项目的默认根目录为当前文件夹
///

选择 Working Directory 为当前项目路径，点击 `OK` 即可。

![配置路径](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402292258092.png)

/// fc
配置路径
///
