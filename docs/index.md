---
title: 首页
hide:
  - navigation
  - toc
---

## 本站定位

欢迎访问！本网站以「AI / CS 学科笔记」与「开发技术文章」为基础，旨在构建一个 **开放知识社群 (Open Wiki Community)**。内容按照 Markdown 格式撰写，站点采用 MkDocs 框架编译，云端基于 GitHub Pages 与 Aliyun OSS 双平台部署。如果您觉得内容不错，欢迎⭐。

*[Wiki]: 一种允许一群用户用简单的描述来创建和连接一组网页的社会计算系统。

## 共建社区

若您有 **意见或建议**，欢迎参与贡献！贡献者名单将会出现在对应页面的底部，也会给您的 GitHub 账户累计贡献积分。详细的贡献方式如下：

- 评论区留言：`下滑至页面最低部 >> 点击登录 >> 输入您的宝贵意见或建议`；
- 修改文章 / 新增内容：`点击网站右上角的小猫娘前往 GitHub 仓库 >> 点击右上角 Fork 按钮 >> 回到原来的网站页面点击右上角铅笔按钮 >> 编辑内容后向我发起 Pull Request`。当然您也可以将仓库克隆至本地，按照 `.github/workflows/bot.yml` 文件指引安装构建文档所需的依赖环境，完成修改 / 新增后推送至仓库并向我发起 Pull Request。

## 行文规范

本站点行文格式主要参考 [OI Wiki 格式手册](https://oi-wiki.org/intro/format/)。其中，单页文章标题为 H2 至 H3，低于 H3 等级的标题不应再出现，可以采用段首加粗的形式。根据该格式，您可以对每一篇文章有一个整体的阅读把握。

## 站点地图

下面的两张拓扑图覆盖了本站的全部内容。

<div align="center">

```mermaid
flowchart LR
    面向对象程序设计(面向对象程序设计)
    数据结构与算法(数据结构与算法)
    数字逻辑电路(数字逻辑电路)
    计算机系统基础(计算机系统基础)
    数据库(数据库)
    操作系统(操作系统)
    计算机组成(计算机组成)
    计算机网络(计算机网络)

    面向对象程序设计 --> 数据结构与算法 --> 计算机系统基础
    数字逻辑电路 --> 计算机系统基础 --> 数据库 & 操作系统 & 计算机组成
    计算机组成 & 操作系统 --> 计算机网络

    Python高级应用(Python 高级应用)
    数字图像处理(数字图像处理)
    机器学习(机器学习)
    深度学习(深度学习)
    数据挖掘(数据挖掘)
    自然语言处理(自然语言处理)
    计算机视觉(计算机视觉)
    语音信号处理(语音信号处理)
    智慧教育(智慧教育)

    Python高级应用 --> 数字图像处理 & 语音信号处理 & 机器学习
    机器学习 --> 数据挖掘 & 深度学习
    深度学习 --> 自然语言处理 & 计算机视觉 --> 智慧教育
    数字图像处理 --> 计算机视觉

    高等数学(高等数学)
    线性代数(线性代数)
    概率论(概率论)
    最优化方法(最优化方法)
    高等数学 & 线性代数 & 概率论 --> 最优化方法 --> 机器学习
    面向对象程序设计 --> Python高级应用

    %% 跳转链接
    click 高等数学 "./base/advanced-math/"
    click 线性代数 "./base/linear-algebra/"
    click 概率论 "./base/probability-and-statistics/"
    click 最优化方法 "./base/optimization-method/"

    click 面向对象程序设计 "./base/object-oriented-programming/"
    click 数字逻辑电路 "./base/digital-logic-circuit/"
    click 计算机系统基础 "./base/computer-system-basic/"
    click 数据库 "./base/database/"
    click 数据结构与算法 "./ds-and-algo/"
    click 操作系统 "./base/operating-system/"
    click 计算机组成 "./base/computer-organization/"
    click 计算机网络 "./base/computer-network/"

    click Python高级应用 "./base/python-application/"
    click 数字图像处理 "./base/digital-image-processing/"
    click 机器学习 "./base/machine-learning/"
    click 深度学习 "./base/deep-learning/"
    click 数据挖掘 "./base/data-mining/"
    click 自然语言处理 "./base/natural-language-processing/"
    click 计算机视觉 "./base/computer-vision/"
    click 语音信号处理 "./base/speech-signal-processing/"
    click 智慧教育 "./base/intelligent-education/"
```

<caption> 拓扑图 1. AI / CS 学科笔记 </caption>

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

<caption> 拓扑图 2. 开发技术文章 </caption>

</div>
