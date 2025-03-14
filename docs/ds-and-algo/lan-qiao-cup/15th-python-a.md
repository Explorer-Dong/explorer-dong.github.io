---
title: 第 15 届 Python A 组（省赛）
---

## T1 拼正方形 (5'/5')

题意：给定 $7385137888721$ 个 $2\times 2$ 的方块和 $10470245$ 个 $1\times 1$ 的方块，输出能拼成的最大的正方形的边长。

思路：一个贪心的拼接方法就是，先用 $2\times 2$ 的方块拼完整的大正方形，然后再用 $1\times 1$ 的方块在原来大正方形的顶角两边逐渐扩展。按照这样的贪心思路，可以发现 $\left \lfloor \sqrt {7385137888721\times 4} \right \rfloor = 5435122$，即只用 $2\times 2$ 的方块可以拼接边长为 $5435122$ 的大正方形，由于是偶数，所以这个大正方形是可以拼出来的。接下来考虑用 $1\times 1$ 的方块补顶角边，发现 $5435122 \times 2+1=10870245>10470245$，即补一层都不够。

最终答案为：$5435122$。

注意：上述计算操作可以使用电脑自带计算器，也可以用编程语言。两种语言计算开根并下取整的方法如下。

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

## T2 召唤数学精灵 (5'/5')

题意：输出 $[1,2024041331404202]$ 内有多少个数字 $x$ 满足 $\displaystyle\left(\prod_{1}^x-\sum_{1}^x\right)\bmod100=0$。

思路：数学题直接打表找规律。发现每个 100 内都有两个合法解且 $x \bmod 100$ 为偶数时刚好合法，那么最终答案就是上界从百位开始乘以 2，再减去最大时多算的一个，再加上 1,3,24 三个合法数，最终答案就是 $2024041331404202 \bmod 100\times2-1+3=40480826628086$。

注意：打表时需要用到阶乘，可以手搓，也可以用库。Python 中的阶乘函数为 `math.factorial()`，C++ 中的阶乘函数为 `std::tgamma()`，对应的库为 `cmath`。不过还是用 Python 比较方便，因为 C++ 的 long long 精度有限。

## T3 数字诗意 (10'/10')

题意：给定一个含有 $n\ (1\le n\le 2\cdot10^5)$ 个数的数组 $a\ (1\le a_i\le10^{16})$，问其中不能被连续正整数之和（至少两个）表示的数有多少个。

思路：一道数学题。连续的正整数之和如下式：

$$
\begin{aligned}
\sum_{x}^{x+k-1}&=\frac{(x+x+k-1)\cdot k}{2}\\
&=\frac{1}{2}\cdot(2x+k-1)\cdot k \quad (x\ge1,\ k\ge1)
\end{aligned}
$$

不难发现 $2x+k-1$ 和 $k$ 的奇偶性是相反的，那就说明合法的数一定含有奇数因子。什么数不含有奇数因子呢？只有 $2$ 的幂。因此答案就是数组中 $2$ 的幂的数量。最后特判 $1$ 即可。

=== "Python"

    ```python
    n = int(input().strip())
    a = list(map(int, input().strip().split()))
    
    ans = 0
    for x in a:
        ans += x == 1 or x & (x - 1) == 0
    
    print(ans)
    ```

=== "C++"

    ```c++
    #include <iostream>
    
    using namespace std;
    
    int main() {
        int n;
        cin >> n;
    
        int ans = 0;
        while (n--) {
            long long x;
            cin >> x;
            ans += x == 1 || (x & (x - 1)) == 0;
        }
    
        cout << ans << "\n";
    
        return 0;
    }
    ```

## T4 回文数组

