---
title: CLion 解决中文输出乱码的问题
---

## 问题介绍

在 `Clion` 的默认设置下，输出中文会出现乱码，如下	

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "你好" << endl;
    return 0;
}
```

输出
```
浣犲ソ
	
Process finished with exit code 0
```

## 解决方案
编码问题就需要修改编码方式，按照下面的流程进行操作即可

进入设置
![进入设置](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403011101299.png)

选择 `Editor` 中的 `File Encodings`
![选择 Editor 中的 File Encodings](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403011101301.png)

将这两个下拉框中的选项全部选择为 `UTF-8`，点击 `OK`
![将这两个下拉框中的选项全部选择为 UTF-8](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403011101302.png)

在主页面的右下角，将这个选项设置为 `GBK`
![设置为 GBK](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403011101303.png)

选择 `Convert`
![选择 Convert](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403011101304.png)

重新运行即可:sunglasses:

```c
你好
Process finished with exit code 0
```

$END$