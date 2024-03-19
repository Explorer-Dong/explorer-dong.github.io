---
title: MachineLearning
categories:
  - GPA
  - 4th-term
category_bar: true
---


# 机器学习与模式识别

## 前言

学科情况：

| 主讲教师 | 学分配额 | 学科类别 |
| :------: | :------: | :------: |
|  杨琬琪  |    3     |  专业课  |

成绩组成：

| 上机+课堂 | 课堂测验（3次） | 期末（闭卷） |
| :-------: | :-------------: | :----------: |
|    20%    |       30%       |     50%      |

教材情况：

|      课程名称      | 选用教材 | 版次 |  作者  |     出版社     |      ISBN号       |
| :----------------: | :------: | :--: | :----: | :------------: | :---------------: |
| 机器学习与模式识别 | 机器学习 |  --  | 周志华 | 清华大学出版社 | 978-7-302-42328-7 |

学习资源：

- :tv: 西瓜书视频、PPT 资源：[机器学习初步](https://www.xuetangx.com/learn/nju0802bt/nju0802bt/19322711/)、[PPT - 百度网盘链接](https://pan.baidu.com/s/1-OfnKcJ_bfWHcGHgzeQmpg?pwd=k3gk
    )
- :book: 西瓜书电子资源：[Machine_Learning/机器学习_周志华.pdf](https://github.com/jingyuexing/Ebook/blob/master/Machine_Learning/%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0_%E5%91%A8%E5%BF%97%E5%8D%8E.pdf)
- :tv: ​南瓜书视频资源：[《机器学习公式详解》（南瓜书）与西瓜书公式推导直播合集](https://www.bilibili.com/video/BV1Mh411e7VU/)
- :book: 南瓜书电子资源：[《机器学习》（西瓜书）公式详解](https://github.com/datawhalechina/pumpkin-book)

实验平台：

- AI Studio：https://aistudio.baidu.com/index

本地路径：

- :watermelon: 西瓜书电子书：[机器学习_周志华](D:\华为云盘\2. Score\4. 机器学习与模式识别\机器学习_周志华.pdf)
- :page_with_curl: 上课 PPT by 周志华：[机器学习\_课件\_周志华](D:\华为云盘\2. Score\4. 机器学习与模式识别\机器学习_课件_周志华)
- :page_with_curl: 上课 PPT by 杨琬琪：[机器学习\_课件\_杨琬琪](D:\华为云盘\2. Score\4. 机器学习与模式识别\机器学习_课件_杨琬琪)

## 第1章 绪论

### 1.1 引言

pass

### 1.2 基本术语

|          Name          |                         Introduction                         |
| :--------------------: | :----------------------------------------------------------: |
|      机器学习定义      | 利用**经验**改善系统自身性能，主要研究**智能数据分析**的理论和方法。 |
|      计算学习理论      | 最重要的理论模型是 PAC(Probably Approximately Correct, 概率近似正确) learning model，即以很高的概率得到很好的模型 $P(|f(x|- y \le \epsilon) \ge1 - \delta$ |
|         P 问题         |                 在多项式时间内计算出答案的解                 |
|        NP 问题         |                 在多项式时间内检验解的正确性                 |
|      特征（属性）      |                              --                              |
|     特征（属性）值     |                         连续 or 离散                         |
|        样本维度        |                       特征（属性）个数                       |
| 特征（属性、输入）空间 |                        特征张成的空间                        |
|    标记（输出）空间    |                        标记张成的空间                        |
|          样本          |                            \<x\>                             |
|          样例          |                           \<x,y\>                            |
|        预测任务        |  监督学习、无监督学习、半监督学习、噪音标记学习、多标记学习  |
|        泛化能力        |                 应对未来未见的测试样本的能力                 |
|     独立同分布假设     |                历史和未来的数据来自相同的分布                |
### 1.3 假设空间

假设空间：所有可能的样本组合构成的集合空间

版本空间：根据已知的训练集，将假设空间中与正例不同的、反例一致的样本全部删掉，剩下的样本组合构成的集合空间

### 1.4 归纳偏好

No Free Launch 理论，没有很好的算法，只有适合的算法。好的算法来自于对数据的好假设、好偏执，大胆假设，小心求证

### 1.5 发展历程

pass

### 1.6 应用现状

pass

## 第2章 模型评估与选择

### 2.1 经验误差与过拟合

概念辨析

- 错误率：针对测试数据而言，分错的样本数 $a$ 占总样本数 $m$ 的比例 $E=\frac{a}{m}$
- 经验误差：针对训练数据而言，随着训练轮数或模型的复杂度越高，经验误差越小

<details>
    <summary>误差训练曲线</summary>
    <center><img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403120921263.png" alt="误差训练曲线"/></center>
</details>

过拟合解决方法

- Early Stopping (当发现有过拟合现象就停止训练)

- Penalizing Large Weight (在经验风险上加一个正则化项)

- Bagging 思想 (对同一样本用多个模型投票产生结果)

- **Boosting** 思想 (多个弱分类器增强分类能力，降低偏差)

- Dropconnection (神经网络全连接层中减少过拟合的发生) 

欠拟合解决方法

- 决策树：拓展分支

- 神经网络：增加训练轮数

### 2.2 评估方法

- **留出法（hold-out）：将数据集分为三个部分，分别为训练集、验证集、测试集**。测试集对于训练是完全未知的，我们划分出测试集是为了模拟未来未知的数据，因此当下的任务就是利用训练集和验证集训练出合理的模型来尽可能好的拟合测试集。那么如何使用划分出的训练集和验证集来训练、评估模型呢？就是根据模型的复杂度 or 模型训练的轮数，根据上图的曲线情况来选择模型。

- **交叉验证法（cross validation）：一般方法为 k 次 k 折交叉验证，即 k 次将数据随机划分为 k 个大小相似的互斥子集**。将其中 $k-1$ 份作为训练数据，$1$ 份作为测试数据，每轮执行 $k$ 次获得平均值。

- **自助法（bootstrapping）：有放回采样获得训练集**。每轮从数据集 $D$ 中（共 $m$ 个样本）有放回的采样 $m$ 次，这 $m$ 个抽出来的样本集合 $D'$ 大约占数据集的 $\frac{2}{3}$，于是就可以将抽出的样本集合 $D'$ 作为训练集，$D-D'$ 作为测试集即可

    <details>
        <summary>测试集占比 1/3 证明过程</summary>
        <center>
            <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403121131482.png" alt="测试集占比 1/3 证明过程" />
        </center>
    </details>

### 2.3 性能度量

#### 2.3.1 回归任务

- 均方误差：$\displaystyle MSE=\frac{1}{m} \sum_{i=1}^m(f(x_i) - y_i)^2$

- 均方根误差：$\displaystyle RMSE=\sqrt{\frac{1}{m} \sum_{i=1}^m(f(x_i) - y_i)^2}$

- $R^2$ 分数：$\displaystyle R^2 = 1 - \frac{\sum_{i=1}^m(f(x_i)-y_i)^2}{\sum_{i=1}^m(\bar{y} - y_i)^2},\quad \bar{y} = \frac{1}{m}\sum_{i=1}^m y_i$

    <details>
        <summary>个人理解</summary>
        <p>首先理解各部分的含义。减数的分子表示预测数据的平方差，减数的分母表示真实数据的平方差。而平方差是用来描述数据离散程度的统计量。</p>
        <p>为了保证回归拟合的结果尽可能不受数据离散性的影响，我们通过相除来判断预测的数据是否离散。如果和原始数据离散性差不多，那么商就接近1，R方就接近0，表示性能较差，反之如果比原始数据离散性小，那么商就接近0，R方就接近1，表示性能较优。</p>
    </details>

#### 2.3.2 分类任务

- 错误率：$\displaystyle E(f;D) = \frac{1}{m} \sum_{i=1}^mf(x_i \neq y_i)$

- 准确率：$\displaystyle A(f;D) = \frac{1}{m} \sum_{i=1}^mf(x_i = y_i)$

- 混淆矩阵

    - 查准率（precision）：$\displaystyle P = \frac{TP}{TP+FP}$ - 适用场景：商品搜索推荐（尽可能推荐出适当的商品即可，至于商品数量无所谓）
    - 查全率/召回率（recall）：$\displaystyle R = \frac{TP}{TP+FN}$ - 适用场景：逃犯、病例检测（尽可能将正例检测出来，至于查准率无所谓）
    - 准确率（accuracy）：$\displaystyle A = \frac{TP+TN}{TP+FN+FP+TN}$
    - F1 度量（F1-score）：$\displaystyle F_1 = \frac{2\times P \times R}{P + R}$​ - 用于综合查准率和查全率的指标
    
    <details>
        <summary>分类结果混淆矩阵图</summary>
        <center>
            <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403121018205.png" alt="分类结果混淆矩阵" />
        </center>
    </details>
    
    - 对于多分类问题，我们可以将该问题分解为多个二分类问题（ps：假设为 n 个）。从而可以获得多个上述的混淆矩阵，那么也就获得了多个 $P_i$、$R_i$ 以及全局均值 $\overline{TP}$、$\overline{FP}$、$\overline{FN}$，进而衍生出两个新的概念
    
        宏
    
        - 宏查准率：$\displaystyle macroP = \frac{1}{n} \sum_{i=1}^n P_i$
        - 宏查全率：$\displaystyle macroR = \frac{1}{n} \sum_{i=1}^n R_i$
        - 宏 $F1$：$\displaystyle macroF_1 = \frac{2 \times macroP \times macroR}{macroP+macroR}$
    
        微
    
        - 微查准率：$\displaystyle microP = \frac{\overline{TP}}{\overline{TP}+\overline{FP}}$
        - 微查全率：$\displaystyle microR = \frac{\overline{TP}}{\overline{TP}+\overline{FN}}$
        - 微 $F1$：$\displaystyle microF_1 = \frac{2 \times microP \times microR}{microP+microR}$
    
- P-R 曲线

    - 横纵坐标：横坐标为查全率（Recall），纵坐标为查准率（Precision）

    - 如何产生？我们根据学习器对于每一个样本的预测值（正例性的概率）进行降序排序，然后调整截断点将预测后的样本进行二分类，将截断点之前的所有数据全部认为**预测正例**，截断点之后的所有数据全部认为**预测反例**。然后计算两个指标进行绘图。

        <details>
            <summary>预测值解读</summary>
            <p>
                我们知道学习器得到最终的结果一般不是一个绝对的二值，如 0,1。往往是一个连续的值，比如 [0,1]，因此我们才可以选择合适的截断点将所有的样本数据划分为两类。
            </p>
        </details>

    - 趋势解读：随着截断点的值不断下降，很显然查全率 $R$ 会不断上升，查全率 $P$ 会不断下降

    - 不同曲线对应学习器的性能度量：**曲线与横纵坐标围成的面积**衡量了样本预测排序的质量。因此下图中 A 曲线的预测质量比 C 曲线的预测质量高。但是我们往往会遇到比较 A 与 B 的预测质量的情况，由于曲线与坐标轴围成的面积难以计算，因此我们引入了**平衡点**的概念。平衡点就是查准率与查询率相等的曲线，即 $P=R$ 的曲线。平衡点越往右上，学习器的预测性能越好。

    <details>
        <summary>P-R 曲线趋势图</summary>
        <center>
            <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403190830311.png" alt="P-R 曲线" />
        </center>
    </details>

- ROC 曲线与 AUC :star:

    - 横纵坐标：横坐标为**假正例率** $\displaystyle FPR = \frac{FP}{FP+TN}$，纵坐标为**真正例率** $\displaystyle TPR = \frac{TP}{TP+FN}$

    - 如何产生？与 P-R 图的产生类似，只不过计算横纵坐标的规则不同，不再赘述。
    - 趋势解读：随着截断点的值不断下降，真正例率与假正例率均会不断上升，因为分子都是从 0 开始逐渐增加的

    - 不同曲线对应学习器的性能度量：**AUC** 衡量了样本预测的排序质量。AUC 即 ROC 曲线右下方的面积，面积越大则对应的预测质量更高，学习器性能更好。不同于上述引入平衡点的概念，此处的面积我们可以直接计算，甚至 1-AUC 也可以直接计算。

        我们定义 $AUC$ 的计算公式为：（其实就是每一块梯形的面积求和，ps：矩形也可以用梯形面积计算公式代替）
        $$
        \sum _{i=1}^{m-1} \frac{(y_{i}+y_{i+1}) \cdot (x_{i+1} - x_i)}{2}
        $$
        我们定义损失函数（$loss$） $l_{rank} = 1-AUC$ 的计算公式为：（ps：感觉下述公式不是很准，因为正反例预测值相等的比例比不一定就是一比一）

        ![损失函数计算公式](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403191055792.png)

    <details>
        <summary>ROC 曲线图 - 受试者工作特征</summary>
        <center>
            <img src="https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202403190851371.png" alt="ROC 曲线图 - 受试者工作特征" />
        </center>
    </details>

### 2.4 比较检验 TODO

理论依据：统计假设检验（hypothesis test）

两个学习器性能比较：

- 交叉验证 t 检验
- McNemar 检验

### 2.5 偏差与方差 TODO

现在我们得到了学习算法的泛化性能，我们还想知道为什么会有这样的泛化性能，即我们应该如何解释这样的泛化性能呢？我们引入 **偏差-方差分解** 的概念。那么这个方法一定是完美解释的吗？也有一定的缺点，我们引入 **偏差-方差窘境** 的概念。

#### 2.5.1 偏差-方差分解

我们定义以下符号：测试样本 $x$，$y_D$ 为 $x$ 在数据集中的标记，$y$ 为 $x$ 的真实标记，$f(x;D)$ 为模型在训练集 $D$ 上学习后的预测输出。

我们以回归任务为例：

- 模型的**期望预测输出**为：
- 使用样本数目相同的不同训练集产生的**方差**为：
- **噪声**为：
- 期望预测输出与真实标记的差别表示的**偏差**为：

偏差-方差分解的结论是：

<details>
    <summary>偏差-方差分解结论推导</summary>
    <center>
        111
    </center>
</details>

#### 2.5.2 偏差-方差窘境



## 第3章 线性模型



## 第4章 决策树



## 第5章 神经网络



## 第6章 支持向量机



## 第7章 贝叶斯分类



## 第8章 集成学习



## 第9章 聚类



## 第10章 降维与度量学习 *



## 第11章 特征选择与稀疏学习 *



## ~~第12章 计算学习理论~~



## 第13章 半监督学习



## 第14章 概率图模型



## ~~第15章 规则学习~~



## 第16章 强化学习

