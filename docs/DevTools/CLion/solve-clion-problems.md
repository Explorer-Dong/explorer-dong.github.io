---
title: 解决 CLion 相关问题
---

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

```
浣犲ソ
Process finished with exit code 0
```

### 解决方案

编码问题就需要修改编码方式，按照下面的流程进行操作即可。

1）进入设置

![进入设置](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403011101299.png)

2）选择 `Editor` 中的 `File Encodings`

![选择 Editor 中的 File Encodings](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403011101301.png)

3）将这两个下拉框中的选项全部选择为 `UTF-8`，点击 `OK`

![将这两个下拉框中的选项全部选择为 UTF-8](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403011101302.png)

4）在主页面的右下角，将这个选项设置为 `GBK`

![设置为 GBK](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403011101303.png)

5）选择 `Convert`

![选择 Convert](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403011101304.png)

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

我们使用 `cstring` 库的 `strerror()` 函数检测一下问题：

![使用 cstring 库的 strerror() 函数检测问题](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402292258397.png)

可以发现是未找到文件。因为在 CLion 中相对路径索引的起始根默认为 `cmake-build-debug` 文件夹，故无法找到。

### 解决方案

解决方法有三个。如下：

1）跳出 `cmake-build-debug` 文件夹再进行索引，即路径设置为 `"../test.txt"`。

2）使用绝对路径。

3）修改项目的默认根目录为当前文件夹。

进入 `Run >> Edit Configurations`

![修改项目的默认根目录为当前文件夹](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402292258745.png)

选择 Working Directory 为当前项目路径，点击 `OK` 即可。

![配置路径](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402292258092.png)
