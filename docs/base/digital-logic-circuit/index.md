---
title: 数字逻辑电路
---

## 1 概论

从结构特点及其对输入信号的响应规则角度可以将数字集成电路分为「组合逻辑电路」和「时序逻辑电路」两种。

常见逻辑符号表：

| 运算类型 |                           逻辑符号                           |                 逻辑表达式                 |
| :------: | :----------------------------------------------------------: | :----------------------------------------: |
|    与    | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245091.png" alt="image-20231008095031818" style="zoom:33%;" /> |                   $Y=AB$                   |
|    或    | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245093.png" alt="image-20231008095047759" style="zoom:33%;" /> |                  $Y=A+B$                   |
|    非    | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245094.png" alt="image-20231008094808523" style="zoom:33%;" /> |              $Y=\overline{A}$              |
|   与非   | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245095.png" alt="image-20231008095111128" style="zoom:33%;" /> |             $Y=\overline{AB}$              |
|   或非   | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245096.png" alt="image-20231008095809755" style="zoom:33%;" /> |             $Y=\overline{A+B}$             |
|   异或   | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245097.png" alt="image-20231008095902796" style="zoom:33%;" /> | $Y=\overline A B+A \overline B=A \oplus B$ |
|   同或   | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245098.png" alt="image-20231008095922663" style="zoom:33%;" /> |    $Y = AB + \bar A \bar B = A\odot B$     |
|  与或非  | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245099.png" alt="image-20231008095947154" style="zoom:33%;" /> |            $Y=\overline{AB+CD}$            |

使用逻辑函数表示实际问题：

|                           实际问题                           |                           图片示例                           |                           变量表示                           |                           列真值表                           |                           逻辑函数                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245100.png" alt="image-20231008102102546" style="zoom:25%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245101.png" alt="image-20231008102037276" style="zoom:25%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245102.png" alt="image-20231008101253710" style="zoom:50%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245104.png" alt="image-20231008101303842" style="zoom: 33%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245105.png" alt="image-20231008101318582" style="zoom:33%;" /> |

逻辑函数[^逻辑函数解释]及其表示方法

[^逻辑函数解释]: 描述输入逻辑变量和输出逻辑变量之间的因果关系，称为逻辑函数。

|      方法      |                             示例                             |
| :------------: | :----------------------------------------------------------: |
|     真值表     | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245106.png" alt="image-20231008110656451" style="zoom: 33%;" /> |
| 逻辑函数表达式 | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245107.png" alt="image-20231008110713908" style="zoom:25%;" /> |
|     逻辑图     | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245108.png" alt="image-20240116131615935" style="zoom: 25%;" /> |
|     波形图     | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245109.png" alt="image-20231008111013474" style="zoom:33%;" /> |

真值表到逻辑图的转换:

- 查看真值表

    <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245110.png" alt="image-20231008112605100" style="zoom:33%;" />

- 根据真值表写出逻辑表达式

    <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245111.png" alt="image-20231008112628066" style="zoom: 50%;" />

- 化简（上式不用化简）

- 绘制逻辑图

    <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245112.png" alt="image-20231008112708161" style="zoom:50%;" />

逻辑图到真值表的转换：

- 根据逻辑图逐级写出表达式

    <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245113.png" alt="image-20231008112800422" style="zoom:50%;" />

- 化简

- 代入所有输入变量求真值表

    <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245114.png" alt="image-20231008112839220" style="zoom:50%;" />

## 2 逻辑代数 | 硬件描述语言基础

### 2.1 基本定律和规则

#### 2.1.1 基本定律和恒等式

![image-20231008114849627](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245115.png)

![image-20231008114943429](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245116.png)

#### 2.1.2 基本规则

1. **代入规则** - 类似于换元

    ![image-20231008115435355](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245117.png)

2. **反演规则**（获得反函数 $\overline Y$ ）

    > 觉得烦可以直接进行取反运算，简单明了不会错

    - 对于任意一个逻辑表达式 L，与门 & 或门取反，变量取反，0 & 1 取反
    - 保持原来的运算优先顺序（即如果在原函数表达式中，AB 之间先运算，再和其他变量进行运算，那么非函数的表达式中，仍然是 AB 之间先运算）
    - 对于反变量以外的非号应保留不变

    ![image-20231008115328932](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245118.png)

    ![image-20231008115337125](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245119.png)

3. **对偶规则**（获得对偶式 $L'$ ）

    - 对于任何逻辑函数式：与门、或门取反，0、1 取反

### 2.2 逻辑函数表达式的形式

#### 2.2.1 基本形式

1. 与或表达式：若干个与项相或

    ![image-20231013094928938](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245120.png)

2. 或与表达式：若干个或项相与

    ![image-20231013094938441](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245121.png)

#### 2.2.2 最小项与最小项表达式

1. 最小项的定义和性质：n 个变量的最小项一共有 $2^n$ 个

2. 最小项表达式：所有的最小项相或

    ![image-20231013100105922](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245122.png)

#### 2.2.3 最大项与最大项表达式

1. 最大项的定义和性质：n 个变量的最大项一共有 $2^n$ 个

2. 最大项表达式：所有的最大项相与

    ![image-20240116134303065](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245123.png)

#### 2.2.4 最大项和最小项的关系

$$
m_i =\overline {M_i}
$$

### 2.3 逻辑函数的代数化简法

为什么要学化简？因为化简之后可以减少门的使用，从而增强电路可靠性、降低成本

#### 2.3.1 逻辑函数的最简形式

最简与或表达式：包含的与项数最少，且每个与项中变量数最少的与或表达式

#### 2.3.2 逻辑函数的代数化简法

1. 逻辑函数的 **化简**

    |  方法  |         逻辑函数         |       证明       |
    | :----: | :----------------------: | :--------------: |
    | 并项法 |   $A+\overline A = 1$    |       显然       |
    | 吸收法 |        $A+AB = A$        |    提取公因子    |
    | 消去法 | $A+\overline A B = A+B$  | 摩根定律使用两次 |
    | 配项法 | $A = A(B + \overline B)$ |       显然       |

2. 逻辑函数形式的 **变换**

    > 使用场景：通常在一片集成电路芯片中只有一种门电路，为了减少门电路的种类，需要对逻辑函数表达式进行变换
    >
    > 变换方法：常常使用两次取反的套路进行变换

    <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245124.png" alt="image-20231013112834593" style="zoom:50%;" />

### 2.4 逻辑函数的卡诺图化简法

#### 2.4.1 用卡诺图表示逻辑函数

首先写出逻辑函数的表达式并且转化为最小项表达式，最后将最小项填入相应的矩阵中即可

#### 2.4.2 用卡诺图化简逻辑函数

尽可能使得圈出来的 $2^k$ 圈中包含的数尽可能的多，即让 $k$ 尽可能的大。注意：圈中的数全部都得是最小项的数

### 2.5 `Verilog HDL` 基础

为了从软件代码的角度描述电路，从下面三个方面介绍如何用 `Verilog` 描述数字逻辑电路。

#### 2.5.1 门级描述

门级元件中，第一个位置是输出变量，之后的都是输入变量，可解释为：多输入门

| 门级元件 | 元件符号 |
| :------: | :------: |
|    与    |   and    |
|    或    |    or    |
|    非    |   not    |
|   与非   |   nand   |
|   或非   |   nor    |
|   异或   |   xor    |
|   同或   |   xnor   |

#### 2.5.2 数据流描述

简单的概括就是使用相关的位运算进行表述，因为电路逻辑本就是二元逻辑，因此位运算就刚好匹配。在使用数据流进行电路描述时，采用的语句都是连续赋值语句，由 assign 关键词开始，多条 assign 语句是 **并行** 运行的

需要注意的是，在连续赋值语句中，被赋值的变量一定是 wire 的 **线网** 类型的变量，示例如下

```verilog
// 其中 Y 为 wire 类型的变量
assign Y = (~S & D0) | (S & D1)
```

#### 2.5.3 行为描述

简单的概括就是使用底层语言进行编程，类似于最开始的 C 语言。使用行为描述语句进行描述时，使用 always 关键字开始变量赋值逻辑，多条 always 语句是 **串行** 运行的

需要注意的是，在行为描述语句中，被赋值的变量一定是 reg 等 **寄存器** 类型的变量，这与上述数据流描述的方式不同，示例如下

```verilog
// 其中 Y 为 reg 类型的变量
always@(*)	// * 为敏感变量，对于组合电路而言，所有的输入都是敏感变量
    if (S) Y = D1;
	else   Y = D0;
```

## 3 逻辑门电路

### 3.1 简介

MOS 管含有 NMOS 管和 PMOS 管，NMOS 管与 PMOS 管的组合称为互补 MOS，或称为 CMOS 电路。

### 3.2 基本 CMOS 逻辑门电路

附上启蒙的博客：[MOS 管及简单 CMOS 逻辑门电路原理图解析！](https://zhuanlan.zhihu.com/p/258852620)

|      器件      |                             电路                             |
| :------------: | :----------------------------------------------------------: |
|      开关      | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245125.png" alt="image-20231201090156879" style="zoom:67%;" /> |
| 反相器（非门） | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245126.png" alt="image-20231201090250860" style="zoom: 50%;" /> |
|     与非门     | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245127.png" alt="image-20231201090233084" style="zoom:50%;" /> |
|     或非门     | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245128.png" alt="image-20231201090319423" style="zoom:33%;" /> |
| 传输门（开关） | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245129.png" alt="image-20231222104533397" style="zoom:33%;" /> |
|      与门      | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245130.png" alt="image-20240117003028351" style="zoom:33%;" /> |
|      或门      | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245131.png" alt="image-20240117003058029" style="zoom:33%;" /> |

**应用示例**

解读的逻辑其实很简单，在理解之前，应该首先观看上面给出的连接中的 MOS 电路的简化版，从而理解电路的正确结构！即，每一个 MOS 管都理解为一个开关，何时闭合与断开完全取决于相应的 MOS 管的种类与电平，如果是 NMOS 管，即箭头指向左边的，为高电平导通，PMOS 管则相反，只需要知道此电路基本逻辑，那么接下来的分析结果就是水到渠成的事。

需要知道一个理念就是，两个电路如果是并联的存在，那么逻辑表达式就是或，简称为 **并联相或**；对应的，两个电路如果是串联的存在，那么逻辑表达式就是与，简称为 **串联相与**。最后需要补充一点的就是关于取反的辨识，我们知道一个反相器 MOS 管的逻辑是非常简单的，就是一个 NMOS 管和一个 PMOS 管的组合，那么只需要在分析多个线路是串联还是并联的关系之后，最后经过一个反相器就是一个 **取反** 逻辑。

|                             电路                             |                          逻辑表达式                          |    功能描述    |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :------------: |
| <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245132.png" alt="image-20231201090643503" style="zoom:50%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245133.png" alt="image-20231201090727291" style="zoom:50%;" /> |     异或门     |
| ![image-20240117103214449](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245134.png) |                    $L=\overline{(BC+D)A}$                    |                |
| ![image-20240117103238963](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245135.png) | $L=\overline{(A+B)X}=\overline{(A+B)\overline{AB}}=A\odot B$ |     同或门     |
| <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245136.png" alt="image-20231201091736402" style="zoom:50%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245137.png" alt="image-20231201091750341" style="zoom:50%;" /> |     异或门     |
| <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245138.png" alt="image-20231201091831389" style="zoom:50%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245139.png" alt="image-20231201091858929" style="zoom:50%;" /> | 2 选 1 数据选择器 |

## 4 组合逻辑电路

### 4.1 分析策略

组合逻辑电路只取决于实时输入从而给出相应的输出，与之前的运行结果无关。没有反馈和记忆单元。分析流程如下：

1. 由逻辑图得到 **逻辑表达式**
2. **化简和变换**
3. 列 **真值表**
4. 根据真值表（或者波形图）**分析电路功能**

### 4.2 设计方法

#### 4.2.1 设计过程

1. 明确逻辑含义：确定输入输出并定义逻辑状态的含义
2. 列出真值表：根据逻辑描述写出真值表
3. 写出逻辑表达式：由真值表写出逻辑表达式，真值取原、假值取反
4. 化简逻辑表达式：代数化简法 or 卡诺图化简法
5. 画出逻辑图：使用相应的门级元件进行组合连接

#### 4.2.2 优化实现

|         电路类型         |    优化策略    |                            电路图                            |  优化结果  |
| :----------------------: | :------------: | :----------------------------------------------------------: | :--------: |
|        单输出电路        |  统一元件类型  | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245140.png" alt="image-20231117112320588" style="zoom: 33%;" /> | 见左图文字 |
|        多输出电路        | 共享相同逻辑项 | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245141.png" alt="image-20231117112426358" style="zoom:33%;" /> | 见左图文字 |
| 多级逻辑电路（限定入数） |   提取公因项   | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245142.png" alt="image-20231117112559081" style="zoom:33%;" /> | 见左图文字 |
| 多级逻辑电路（限定入数） |   提取公因项   | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245143.png" alt="image-20231117112618856" style="zoom: 33%;" /> | 见左图文字 |

### 4.3 竞争与冒险

为什么会产生？门级元件的延时效应。

如何消去呢？有三种方法：

1. 消除互补变量。

2. 增加乘积项，避免互补项相加。

3. 输出端并联电容器。如下图：

![输出端并联电容器](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245144.png)

### 4.4 典型电路示例

举几个典型的组合逻辑电路。

#### 4.4.1 编码器

普通编码器：只允许有一个输入，从而进行编码，一旦出现多输入就会发生错误。

优先编码器：无论多少输入，都会按照一开始设定的优先级进行最高等级的那一个信号位的编码。

|      名称      |     型号      |                           逻辑符号                           |                           功能分析                           |                            逻辑图                            |
| :------------: | :-----------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| 4-2 优先编码器  |    74LS00     |                2 片 7400（4 个 2 输入与非门）实现                 | 需要将 4-2 优先编码器的两个逻辑函数转化为与非式，从而进行电路逻辑的搭建。化简后发现需要 7 个 2 输入与非门，故需要 2 片 7400 才能实现 4-2 线优先编码器 |                                                              |
| 8-3 优先编码器  |    CD4532     | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245145.png" alt="image-20231208104642447" style="zoom: 50%;" /> | 除了 8 个输入端与 3 个输出端，还有 EI、EO 与 GS 端。其中 **GS** 是用来标明当前电路是否处于工作状态的，即如果没有输入端为有效信号，GS 就是低电平，反之则是高电平。而 **EI 与 EO** 是为了电路扩展而诞生的，当 EI 为高电平且没有任何输入的情况下，EO 也是 1，此时的 4532 就相当于一根导线，从而可以进行片子的扩展 |            由于有现成的集成电路板，故就是逻辑符号            |
| 16-4 优先编码器 |    CD4532     |                         2 片 4532 实现                          | 首先确保 EI 始终为高电平。**输出后三位** 就是两个 4532 片子的 3 输出分别或的结果，**最高位的输出** 是高位片的 GS 端的结果 | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245146.png" alt="image-20240117120736794" style="zoom:200%;" /> |
| 32-5 优先编码器 | 74LS00+CD4532 |                     1 片 7400+4 片 4532 实现                      | 首先确保 EI 始终为高电平。**输出后三位** 就是四个 4532 片子的 3 输出分别或的结果，**最高位的两个输出** 取决于 4 个片子 GS 端 4-2 优先编码的结果。 | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245147.png" alt="image-20240117121434992" style="zoom:200%;" /> |

#### 4.4.2 译码器/数据分配器

|    名称    |      型号      |                           逻辑符号                           |                           功能分析                           |                            逻辑图                            |
| :--------: | :------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| 2-4 译码器  |     74X139     | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245148.png" alt="image-20231208101820876" style="zoom: 33%;" /> |     使能端有效时。按照对应的输出给出相应输出的低电平信号     |            由于有现成的集成电路板，故就是逻辑符号            |
| 3-8 译码器  |     74X138     | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245149.png" alt="image-20231208101658175" style="zoom:25%;" /> |     使能端有效时。按照对应的输出给出相应输出的低电平信号     |            由于有现成的集成电路板，故就是逻辑符号            |
| 4-16 译码器 | 74X138 或 74X139 |                     2 片 74X138 或 5 片 74X139                     | 使能端有效时。**输入的前三位** 分别接入两片 3-8 译码器的输入端，**输入的最后一位** 接入两片 3-8 译码器的高电平使能端即可；如果用 2-4 译码器来实现，**输入的前两位** 分别接入四片 2-4 译码器的输入端，**输入的后两位** 通过一个 2-4 译码器的四个输入分别接入 4 片 2-4 译码器的低电平使能端即可 | ![image-20240117125311036](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245150.png) |
| 5-32 译码器 | 74X139+74X138  |                     1 片 74X139+4 片 74X138                      | 使能端有效时。**输入的前三位** 分别接入四片 3-8 译码器的输入端，**输入的后两位** 通过 2-4 译码的 4 个结果分别接入四片 3-8 译码器的低电平使能端，从而决定是哪一个 3-8 译码器在工作 | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245151.png" alt="image-20231208104231966" style="zoom: 200%;" /> |

**使用译码器实现逻辑函数**

我们知道译码器的每一个输出代表一个最小项，那么对于一个 $x$ 变量的逻辑函数，可以通过以下步骤用 $x-2^x$ 译码器实现任意 $x$ 变量的逻辑函数

1. 将逻辑函数转化为最小项表达式（大量使用摩根定律）
3. 转化为译码器的输出（写成 $\sum m_i$ 的形式）
4. 在译码器的输出端加一个多输入与非门即可（对结果进行与非）

![image-20231208110328594](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245152.png)

**数据分配器**

功能：相当于多输出的单刀多掷开关，是将公共数据线上的数据按需要送到不同的通道上去的逻辑电路。

![image-20231208114700981](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245153.png)

<center> 图一：示意图 </center>

![image-20231208114749275](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245154.png)

<center> 图二：功能仿真图 </center>

#### 4.4.3 数据选择器

| 名称  |    型号    |                           逻辑符号                           |                           功能分析                           |                            逻辑图                            |
| :---: | :--------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| 2 选 1  |    ---     | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245155.png" alt="image-20240117135219030" style="zoom:33%;" /> |               通过控制端 $S$ 来选择 $D_0,D_1$                | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245156.png" alt="image-20240117135236405" style="zoom:33%;" /> |
| 4 选 1  |    ---     | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245157.png" alt="image-20240117135258894" style="zoom:33%;" /> |        通过控制端 $S_0,S_1$ 来选择 $D_0,D_1,D_2,D_3$         | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245158.png" alt="image-20240117135326247" style="zoom:33%;" /> |
| 8 选 1  |  74HC151   | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245159.png" alt="image-20240117135401170" style="zoom: 25%;" /> |            通过控制端 $S_0-S_2$ 来选择 $D_0-D_7$             |            由于有现成的集成电路板，故就是逻辑符号            |
| 16 选 1 | 2 片 74HC151 |                             ---                              | 通过控制端 $S_0-S_3$ 来选择 $D_0-D_{15}$，**输入的前三位** 连接三个控制端，**输入的最后一位** 连接两片 74151 的使能端，其实就是译码器的魔改版，让输出为相应的译码结果的高电平而已 | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245160.png" alt="image-20240117135555070"  /> |

**使用数据选择器实现逻辑函数**

- 变量个数 $<$ 数据选择端个数：变量直接对应数据选择端，多余的选择端置 0，最后相应的信号输入端进行赋 1 或赋 0 的操作即可
- 变量个数 $=$ 数据选择端个数：本质上就是将逻辑函数转化为最小项表达式，然后与标准与或式进行比对，已出现的最小项与 1，未出现的最小项与 0，从而配凑产生了数据选择器最开始的式子。落到逻辑图上就是，数据选择端接入函数变量，信号输入端接入相应的高低电平，出现的最小项就输入 1，未出现的就输入 0 即可
- 变量个数 $>$ 数据选择端个数：
    - 刚好多 1 个：变量 or 变量的非接入信号输入端
    - 不止多 1 个：同样采用将变量作为数据信号输入端，此外可能需要借助相关的门电路辅助进行

#### 4.4.4 数值比较器

略

#### 4.4.5 算术运算电路

半加器：即不考虑低位进位的一位二进制加法器。其中 $S$ 为输出位，$C$ 为进位，没有考虑低位的进位

$$
\begin{cases}
S &=& A \oplus B \\
C &=& AB
\end{cases}
$$

全加器：即考虑低位进位的一位二进制加法器。其中 $S$ 为输出位，$C_i$ 为低位的进位，$C_o$ 为进位

$$
\begin{cases}
S &=& A \oplus B \oplus C_i \\
C_o &=& AB + (A \oplus B)C_i = AB+(A+B)C_i
\end{cases}
$$

## 5 锁存器和触发器

本章介绍时序逻辑电路的存储单元，分别为锁存器和触发器。其中锁存器对电平敏感，触发器对边沿敏感

### 5.1 基本双稳态电路

![双稳态电路](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245162.png)

### 5.2 `SR` 锁存器

| 门级元件组成 |                            电路图                            |                   功能分析                    |
| :----------: | :----------------------------------------------------------: | :-------------------------------------------: |
|  或非门实现  | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245163.png" alt="image-20231222100822028" style="zoom:50%;" /> | 高电平有效。全 0 不变，谁 1 谁有效，都 1 不确定状态 |
|  与非门实现  | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245164.png" alt="image-20231222100904959" style="zoom:50%;" /> | 低电平有效。全 1 不变，谁 0 谁有效，都 0 不确定状态 |

|      应用      |                            电路图                            |                           功能分析                           |
| :------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|    开关电路    | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245165.png" alt="image-20231222101855246" style="zoom:50%;" />	<img src="https://s2.loli.net/2023/12/22/tzFvJp8ulGnRsj5.png" alt="image-20231222102251343" style="zoom:35%;" /> |                无论开关如何震动，输出始终正常                |
| 门控 SR 锁存器 | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245166.png" alt="image-20231222103758704" style="zoom:33%;" /> | 就是加了一个使能端 E，如果 E 为 1，则就是一个基本的 SR 锁存器，如果 E 为 0，则保持 |

### 5.3 `D` 锁存器

|      电路名称       |                          逻辑电路图                          |       功能分析        |
| :-----------------: | :----------------------------------------------------------: | :-------------------: |
| 传输门控制的 D 锁存器 | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245167.png" alt="image-20231222105139215" style="zoom: 50%;" /> | E = 0, Q = 不变；E = 1, Q = D |
| 逻辑门控制的 D 锁存器 | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245168.png" alt="image-20240117191849592" style="zoom:67%;" /> | E = 0, Q = 不变；E = 1, Q = D |

### 5.4 触发器

#### 5.4.1 主从 D 触发器的电路结构和工作原理

![主从 D 触发器](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245169.png)

#### 5.4.2 典型的主从 D 触发器集成电路

![逻辑图](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245170.png)

![电路板](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202410120949220.png)

![真值表](https://s2.loli.net/2024/01/17/GY3msiIEMtXr1kU.png)

### 5.5 触发器的逻辑功能

本目需要掌握有关触发器的 **特性表**、**特性方程**、**状态图** 三者的单独书写以及相互转化的逻辑过程，还需要掌握不同的触发器之间的相互 **替换实现**

|   类型    |                           逻辑符号                           |                            特性表                            |                           特性方程                           |                            状态图                            |
| :-------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| D 触发器  | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245171.png" alt="image-20240117190140089" style="zoom: 33%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245172.png" alt="image-20240117190521349" style="zoom:25%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245173.png" alt="image-20240117190538232" style="zoom:25%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245174.png" alt="image-20240117190553444" style="zoom:33%;" /> |
| JK 触发器 | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245175.png" alt="image-20240117190400613" style="zoom:33%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245176.png" alt="image-20240117190647444" style="zoom:25%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245177.png" alt="image-20240117190703599" style="zoom:25%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245178.png" alt="image-20240117190716843" style="zoom: 67%;" /> |
| T 触发器  | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245179.png" alt="image-20240117190415482" style="zoom:33%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245180.png" alt="image-20240117190800382" style="zoom:33%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245181.png" alt="image-20240117190818921" style="zoom:25%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245182.png" alt="image-20240117190838344" style="zoom:67%;" /> |
| T' 触发器 | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245183.png" alt="image-20240117190915612" style="zoom:33%;" /> |                         $T\equiv 1$                          | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245184.png" alt="image-20240117190926990" style="zoom:33%;" /> |                                                              |
| SR 触发器 | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245185.png" alt="image-20240117190440059" style="zoom:33%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245186.png" alt="image-20240117191017989" style="zoom:25%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245187.png" alt="image-20240117191040611" style="zoom:33%;" /> | <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245188.png" alt="image-20240117191057024" style="zoom:33%;" /> |

## 6 时序逻辑电路

本部分只需要掌握同步时序逻辑电路的分析即可，具体直接从例题出发。三道同步时序逻辑电路分析的例题见教材 P282 ~ P286，分别为：

- 例一：可控二进制计数器
- 例二：可控双向二进制计数器
- 例三：脉冲分配器

### 6.1 同步时序逻辑电路的分析

下面介绍同步时序逻辑电路分析的五个步骤。在分析之前我们要知道我们的最终目标是什么，可以知道，我们分析电路的最终目标是想要量化的确定电路的物理实现的功能，至于如何设计，此处不予讨论。现在给定了一个同步时序逻辑电路的 **逻辑电路图**，接下来我们应该：

1. 了解电路组成：同步 or 异步？穆尔型输出（与输入无关） or 米利型输出（与输入有关） or 都有？由什么触发器组成的？触发器类型是上升沿出发 or 下降沿触发？

2. 列出三个方程：

    - 输出方程：电路的最终输出

    - 激励方程：触发器的输入

    - 状态方程：触发器的输出（将触发器的输入也就是激励方程代入触发器的特性方程即可）

3. 写出转换表（分析功能用）

4. 写出状态图（分析功能用）

5. 写出时序图（分析功能用）默认状态的初值设置为 0

### 6.2 计数器

本节讲讲 N 位二进制计数器中，利用集成电路板 $74LVC161$ 实现的 **4 位同步二进制递增计数器**。进而引出利用该 4 位计数器 **实现模 N 计数器** 的分析与设计思路。同时补充 $74LVC162$ 实现的 **4 位同步十进制递增计时器**，进而引出相关的模 N 设计思路。下面分析 74LVC161 4 位同步二进制递增计数器集成板

![74LVC161 集成板](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202410121118821.png)

![74LVC161 逻辑功能表](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202404101245189.png)

注解：

- $\overline{CR}$：**异步清零**。即无视时钟脉冲信号，直接清零
- $\overline{PE}$：**同步预置**。即当有效始终脉冲沿到来时，实现 4 个预置位的输出，即 $D_3,D_2,D_1,D_0$
- $CEP,CET$：使能端。同时为高电平电路才能正常工作
- $TC$：进位输出

小结：

- 多个集成板进行计数

- 考虑如何通信：低位进位作为高位使能？

- 考虑如何清零：同步（异步）清零？同步（异步）置数？

- 学会利用 74LVC161 的“反馈清零法”实现模 N 计数器

- 学会利用 74LVC161 的”反馈置数法“实现模 N 计数器

- 学会实现 74LVC162 十进制递增功能功能（**同步清零**、**同步置数**）

- 学会利用 74LVC162 的同步清零的特性实现模 9 的九进制计数器功能

- 学会利用 74LVC162 实现模 24 的二十四进制计数器功能：

    00-09 与 10-19 的计数：通过低位片的进位端，作为高位片的使能端即可

    20-23 与 23-00 的计数：通过将低位片的两个低位与高位片通过 4023 三输入与非门连接起来，当全为 1 时，就是计数到 23 的状态，此时对高低片进行同步清零即可
