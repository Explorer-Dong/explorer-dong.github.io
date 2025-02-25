---
title: 首页
hide:
  - navigation
  - toc
---

<h2 align="center">本站定位</h2>

欢迎访问我的知识（Wiki）网站！本网站托管了个人从本科开始记录的 **课程笔记** 与 **技术文章**。内容按照 Markdown 格式撰写，站点采用 MkDocs 框架编译，云端基于 GitHub Pages 与 Aliyun Server 双平台部署。

*[Wiki]: 一种允许一群用户用简单的描述来创建和连接一组网页的社会计算系统。

<h2 align="center">共建社区</h2>

若您有 **意见或建议**，欢迎参与贡献！贡献者名单将会出现在对应页面的底部，也会给您的 GitHub 账户累计贡献积分。详细的贡献方式如下：

- 评论区留言：`下滑至页面的最低部 >> 点击登录 >> 输入您的宝贵意见或建议`；
- 修改文章 / 新增内容：`点击网站右上角的小猫娘前往网站仓库 >> 点击右上角 Fork 按钮 >> 回到原来的网站页面点击右上角铅笔按钮 >> 编辑内容后向我发起 pull request`，当然您也可以将仓库克隆至本地，按照 `.github/workflows/bot.yml` 文件指引安装构建文档所需的依赖环境，完成修改 / 新增后推送至仓库并向我发起 pull request。

<h2 align="center">行文规范</h2>

本站点行文格式主要参考 [OI Wiki 格式手册](https://oi-wiki.org/intro/format/)。其中，文章标题为 H2 至 H4，低于 H4 等级的标题不应再出现，可以用段首加粗的形式呈现。根据该格式，您可以对每一篇文章有一个整体的阅读把握。

<h2 align="center">站点地图</h2>

正如在一开始介绍的那样，本站的定位是「课程笔记」与「技术文章」，下面的两张拓扑图覆盖了本站的全部内容。

<div align="center">

```mermaid
flowchart LR
    面向对象程序设计(面向对象程序设计)
    数据结构与算法(数据结构与算法)
    数字逻辑电路(数字逻辑电路)
    算法设计与分析(算法设计与分析)
    计算机系统基础(计算机系统基础)
    数据库(数据库)
    操作系统(操作系统)
    计算机组成(计算机组成)
    计算机网络(计算机网络)

    面向对象程序设计 --> 数据结构与算法 & 算法设计与分析 --> 计算机系统基础
    数字逻辑电路 --> 计算机系统基础 --> 数据库 & 操作系统 & 计算机组成
    计算机组成 & 操作系统 --> 计算机网络

    Python高级应用(Python高级应用)
    数字图像处理(数字图像处理)
    机器学习(机器学习)
    深度学习(深度学习)
    数据挖掘(数据挖掘)
    自然语言处理(自然语言处理)
    计算机视觉(计算机视觉)
    语音识别(语音识别)
    智慧教育(智慧教育)

    Python高级应用 --> 数字图像处理 & 机器学习
    机器学习 --> 数据挖掘 & 深度学习
    深度学习 --> 自然语言处理 & 计算机视觉 & 语音识别 --> 智慧教育
    数字图像处理 --> 计算机视觉

    高等数学(高等数学)
    线性代数(线性代数)
    概率论(概率论)
    最优化方法(最优化方法)
    高等数学 & 线性代数 & 概率论 --> 最优化方法 --> 机器学习
    面向对象程序设计 --> Python高级应用

    %% 跳转链接
    click 高等数学 "./GPA/1st-term/AdvancedMath/"
    click 线性代数 "./GPA/3rd-term/LinearAlgebra/"
    click 概率论 "./GPA/4th-term/ProbAndStat/"
    click 最优化方法 "./GPA/4th-term/OptMethod/"

    click 面向对象程序设计 "./GPA/2nd-term/ObjectOrientedProgramming/"
    click 数据结构与算法 "./GPA/3rd-term/DS&Algo/"
    click 数字逻辑电路 "./GPA/3rd-term/DigitalLogicCircuit/"
    click 算法设计与分析 "./GPA/4th-term/PyAlgo/"
    click 计算机系统基础 "./GPA/4th-term/SysBasic/"
    click 数据库 "./GPA/5th-term/DataBase/"
    click 操作系统 "./GPA/5th-term/OperatingSystem/"
    click 计算机组成 "./GPA/5th-term/ComputerOrganization/"
    click 计算机网络 "./GPA/6th-term/computer-network/"

    click Python高级应用 "./GPA/4th-term/PyApply/"
    click 数字图像处理 "./GPA/5th-term/DigitalImageProcessing/"
    click 机器学习 "./GPA/4th-term/machine-learning/"
    click 深度学习 "./GPA/5th-term/DeepLearning/"
    click 数据挖掘 "./GPA/5th-term/data-mining/"
    click 自然语言处理 "./GPA/6th-term/natural-language-processing/"
    click 计算机视觉 "./GPA/6th-term/computer-vision/"
    click 语音识别 "./GPA/6th-term/speech-recognition/"
    click 智慧教育 "./GPA/6th-term/smart-education/"
```

<figcaption>拓扑图1. 课程笔记</figcaption>

```mermaid
graph LR
  %% 实体定义
  algo(数据结构与算法专栏)
  dev_tools(开发工具专栏)
  fe(前端开发专栏)
  be(后端开发专栏)
  dev_ops(运维开发专栏)
  
  %% 关系定义
  algo --> be
  dev_tools --> fe & be & dev_ops
  
  %% 跳转链接
  click algo "./ds-and-algo/"
  click dev_tools "./dev-tools/"
  click fe "./front-end/"
  click be "./back-end/"
  click dev_ops "./operation/"
```

<figcaption>拓扑图2. 技术文章</figcaption

</div>
