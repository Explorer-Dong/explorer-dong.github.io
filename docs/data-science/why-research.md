---
title: 科研二三事
marp: true
paginate: true
style: |
  h2 {
    text-align: center;
  }
  p {
    text-indent: 2em;
  }
headingDivider: 2
math: katex
---

本文记录作者对科研文化的一知半解，考虑到涉世未深、经验不足，内容大多引自他人之言。

<!-- _paginate: skip -->

## 1 开场白

![bg auto left](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250316162956437.png)

非常感谢同学们能拿出宝贵的时间参加科研讲座。正所谓闻道有先后，尽管我比你们长 $1\sim2$ 级，但这并不代表我比在座的各位优秀，我也只是一个半只脚刚迈入科研的新人。我发言的目的是为了通过我的经历来弥补各位在科研方向上的信息差，**不迷失于大众，做有目标的前行者**。

如果觉得我讲的太慢，可以扫描 [左边的二维码](https://wiki.dwj601.cn/data-science/why-research/) 在线浏览。

## 2 劝退信

首先问问自己，为什么要科研？为什么要参加大创？以及为什么要来听这个讲座？如果你是为了志愿时而来，那么恭喜你选择了“正确”的道路，因为你不需要面对“拖着世界向前走”与“向现实妥协”的矛盾，你只需要做好你自己。

等价的，如果你真的奔着听科研内容而来，很遗憾，你即将面对的，是一个残酷的世界。感兴趣的同学可以扫码看一下 NJU 的 jyy 老师给打算读研的同学们写的 [一封信](https://jyywiki.cn/Letter.md)。

![bg auto right](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250316164827344.png)

---

我并没有读过研究生，我也不清楚当我们的任务就是科研时，生活会是什么样的，但我相信 jyy 老师的劝退信是真诚的。因此我提取了其中的一部分适合在公共场合讨论的内容，与大家共勉。

### 2.1 真实的学术圈

> 我们作为科技工作者，哪怕科研甚至专业训练不及格，都需要学会的保命的技能是编故事：publish or perish。学术界对“创新”是有包容性的：改变世界的发现总是领先于时代。此话不假，但也成了我们为“低价值学术”辩护的挡箭牌：哪怕内心认为这是绝无可能有用的东西，在利益面前，就总是能编出点 novelty，说它未来大约的确可能是有那么点用的。

---

### 2.2 矛盾与冲突

> 大部分天命人希望的是获得指导、提升自己、求得职位。但无论是哪种导师，想做大工作的、想做项目的、想躺平的，都很有可能和你的利益发生冲突。你最想要一秒立即毕业，不想浪费时间做没用的项目，但先富起来的人拉高了标准，老板还想叫你出活。吗喽们刚刚经历了“上课耽误学习”的本科四年，就被赶鸭子上架，只顾着焦虑地刷 GPA 和各种履历想让自己在竞争中能取得一些优势，结果反而导致了基础不牢，写代码都还是个半吊子，于是产生出许多因果的报应。

### 2.3 直面天命

> 我知道这么写很容易让我招不到学生，但其实我觉得 “创业” 并不是一件那么难的事情，只要你是真心喜欢折腾计算机做各种好玩的事情，而不是总问换什么好处就行：**如果你能看穿学校教的之外的东西，并且能自己自发地补上短板，那就足够了**。但这句话分量很重，恐怕已经把金字塔底都凿穿了吧。

## 3 兴趣点

劝退的内容告一段落。下面给大家讲讲怎么摆脱「为了 xxx 而科研」的方法。前往 [CCF 推荐目录](https://www.ccf.org.cn/Academic_Evaluation/By_category/)，找到感兴趣的领域（字面意思）然后浏览 10 篇引用量最高的顶会论文，看看世界的边缘是如何被突破的。

![bg auto left](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250316171347038.png)

## 4 Paper

接下来，我将会借助科研中论文的写作逻辑，向大家介绍科研到底在干什么。这里要感谢 [田旭东老师](http://ceai.njnu.edu.cn/user/?ID=73075) 在研究生组会上的发言，我将其进行了压缩。

### 4.1 创新性 (Novelty)

拟解决问题（motivation）、方法新颖程度、理论创新、实践/工程类创新、天马行空类创新。更具体地，就是说你的方法能 **上升到更广泛的领域** or **下潜到更深层次的理论**，来证明你的研究方法具有通用性、泛化性。举个例子：

> To address these challenges, we propose a NeuralCD framework to ... Particularly, our NeuralCD is a general framework since it can cover many traditional models such as MF, IRT and MIRT.
> -- AAAI 2020: Neural Cognitive Diagnosis for Intelligent Education Systems

---

### 4.2 性能 (Performance)

横向对比：跟人家 (SOTAs) 比、纵向对比：跟自己比 (ablation study)。下面这张图展示了一篇顶会论文 (CVPR 2021) 是如何将自己的模型和 SOTAs 进行对比的：

![横向对比](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250316175614457.png)

---

### 4.3 写作水平 (Writing)

![bg fit left](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/20250316180953985.png)

结构、表达、图表。其中结构取决于你的内容展示逻辑，表达取决于你的英文写作能力，这些都可以向你的真实导师 or 赛博导师 (DeepSeek, ChatGPT) 寻求帮助，这里讲讲图表的制作规范。主要有 4 点：

1. 紧凑：不要留大片空白区域；
2. 配色：少用高饱和度颜色；
3. 一致：前后文图主色保持一致；
4. 简洁：不要在图中塞大段文字。

## 谢谢

- [Marp on VSCode - Marp it](https://marpit.marp.app/directives)
- [Paper Writing - Xudong Tian](https://www.jianguoyun.com/p/DasNcD0Q6fiQDRjnyO8FIAA)
- [给各位天命人的劝退信 - jyywiki](https://jyywiki.cn/Letter.md)
- 原文地址：[科研二三事 - Open Wiki Community](https://wiki.dwj601.cn/data-science/why-research/)
