<div align="center">
    <a href="https://wiki.dwj601.cn/">
        <img src="https://cdn.dwj601.cn/images/20250321124008628.png" alt="site logo" style="zoom:40%;" />
    </a>
</div>

本网站以「AI/CS 学科笔记」与「开发技术文章」为基础，旨在构建一个 **开放知识社群 (Open Wiki Community)**。内容按照 Markdown 格式撰写，站点采用 MkDocs 框架编译，云端基于 GitHub Pages 与 Aliyun OSS 双平台部署。如果您觉得内容不错，欢迎⭐。访问链接：

- 高速访问：<https://wiki.dwj601.cn/>
- 永久链接：<https://explorer-dong.github.io/>

<div align="center"><h2>站点预览 (Site Preview)</h2></div>

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
    概率统计(概率统计)
    最优化方法(最优化方法)
    高等数学 & 线性代数 & 概率统计 --> 最优化方法 --> 机器学习
    面向对象程序设计 --> Python高级应用
```

<caption> 拓扑图 1. AI / CS 学科笔记 </caption>

</br>
</br>

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
```

<caption> 拓扑图 2. 开发技术文章 </caption>

</div>  
