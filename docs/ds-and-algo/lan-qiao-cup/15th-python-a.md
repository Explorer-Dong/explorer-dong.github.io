---
title: 第 15 届 Python A 组（省赛）
---

## T1 拼正方形 (5'/5')

题意：给定 $7385137888721$ 个 $2\times 2$ 的方块和 $10470245$ 个 $1\times 1$ 的方块，输出能拼成的最大的正方形的边长。

思路：一个贪心的拼接方法就是，先用 $2\times 2$ 的方块拼完整的大正方形，然后再用 $1\times 1$ 的方块在原来大正方形的顶角两边逐渐扩展。按照这样的贪心思路，可以发现 $\left \lfloor \sqrt {7385137888721\times 4} \right \rfloor = 5435122$，即只用 $2\times 2$ 的方块可以拼接边长为 $5435122$ 的大正方形，由于是偶数，所以这个大正方形是可以拼出来的。接下来考虑用 $1\times 1$ 的方块补顶角边，发现 $5435122 \times 2+1=10870245>10470245$，即补一层都不够。

最终答案为：$5435122$。

!!! tip
    上述计算操作可以使用电脑自带计算器，也可以用编程语言。两种语言计算开根并下取整的方法如下。

=== "Python"

    ```python
    import math

    a = 7385137888721
    b = 10470245

    print(math.floor(math.sqrt(a << 2)))
    ```

=== "C++"

    ```c++
    #include <iostream>
    #include <cmath>
    #include <iomanip>

    int main() {
        std::cout << std::fixed << std::setprecision(0);
        
        long long a = 7385137888721;
        std::cout << floor(sqrt(a << 2)) << "\n";

        return 0;
    }
    ```

## T2 召唤数学精灵

