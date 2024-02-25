---
title: Front End
categories: FrontEnd
category_bar: true
---

# Front End

## Info

### 主后端的前端学习标准

1. 熟悉**标准三件套和 Vue**。做到能看懂代码、通过复制粘贴 + 修改完成开发
2. 了解 **Ajax 和 HTTP 协议**。了解前后端如何交互，有助于从全局的角度排查问题，划分前后端错误边界（不过后端本来就要重点去学 HTTP 协议）
3. 了解**打包工具**。知道怎么构建部署前端项目

### 项目练习

![image-20240213232934490](https://dwj-oss.oss-cn-nanjing.aliyuncs.com/images/202402132330524.png)

### 学习资源

- 学习路线：[前端开发学习路线 - 阿里云](https://developer.aliyun.com/learning/roadmap/frontend)
- 文字教程：[菜鸟教程](https://www.runoob.com/)
- 视频教程：
  - [十七分钟CSS快速入门](https://www.bilibili.com/video/BV1Ci4y1W7H7/)
  - [为初学者准备的：CSS 速成](https://www.bilibili.com/video/BV1bW411R7hg/)
  - [四十分钟JavaScript快速入门](https://www.bilibili.com/video/BV15L4y1a7or/)

## 前言

全栈开发之前端学习。为了更加透彻地理解开发的逻辑与相关的架构，同时更好的适应全栈开发的潮流，个人从前端开始系统性的学习，内容包括但不限于

- 前端的一些基本概念
- Html5、Css3、JavaScript 的基本语法与查阅手册
- Bootstrap 等流行的前端 Css 框架
- JQuery、Vue、React、Angular、Nodejs 等流行的前端 JavaScript 框架

本着多实践少理论的 Coding 原则，以下内容大多基于实战练习 or 相应刷题网站进行，相应网站已放出。最后 coding and enjoying : )

## 一、基本概念

什么是前端？

> 首先最基本的一个概念就是，无论是原生前端语言，如三件套，还是广为流行的前端框架，前端的根本还是为了按照用户的意愿，将用户想要的内容美观地、迅速地呈现出来。一切的一切，都是为了提升用户体验，这是最基本的前端理念。

JavaScript 脚本引用为什么不放在 head 而放在 body 的最后？

> 因为浏览器在加载网页（其实就是解析 Html 文件）时，会按照行优先的顺序进行解析，如果将 JS 文件放在 head 中优先加载，会导致页面内容加载延迟，从而影响用户体验。因此将 JS 文件放在 body 的最后进行加载。毕竟加载页面的内容与 JS 是没有关系的。

## 二、原生三件套

### 2.1 Html5

Html 全称超文本标记语言，可以和 Markdown 进行类比，即不同的内容用对应不同的标签进行渲染。内容繁多，初学难以彻底记忆，故放置速查手册进行快速查询 [HTML 教程](https://www.runoob.com/html/html5-intro.html)，以下是个人容易遗忘的 or 经常用到的标签、属性等用于快速查询：

> [!note]
>
> - 头部：在 head 标签中，设置 Css 样式文件地址 link 标签，设置 base 全局标签等等
> - 超链接：`<a href="https://www.runoob.com" target="_blank">这是一个链接，新开一面展示相关内容</a>`
> - 图像：`<img src="/images/logo.png" width="258" height="39" />`
> - 属性：
>   - `class` 属性为标签的样式渲染属性，每一个 class 都封装了特定的 Css 样式，通过在标签中添加一个或多个 class 属性，实现对指定标签的渲染
>
>   - `id` 属性为一个 html 页面上某一个标签元素特有的属性，仅此一家。可以实现 html 中锚点的链接跳转，css 中进行唯一的样式编写，js 中进行唯一的元素操作或修改
> - 表格：tr 为表格行缩写，th 为表头缩写，td 为表格数据缩写，一般的表格格式是 有很多的 tr，第一个 tr 中嵌套一组 th，其余的 tr 嵌套 td

### 2.2 Css3

Css 为样式文件，简单的来说就是对 Html 中各个标签的内容进行定义，使得展示出各种不同的颜色、形状、布局等等，宗旨还是为了提升美观程度，从而提升用户浏览体验。速查手册 [CSS3 教程](https://www.runoob.com/css3/css3-tutorial.html)，以下为常用 or 易遗忘 or 基本概念速查清单：

> [!note]
>
> - 引用：在 html 文件中使用 Css 进行样式渲染一共有三个方法
>     1. 内联样式（不推荐）：在 html 中的每一个想要润色的标签中添加 style 属性进行渲染
>     2. 内部样式表（不推荐）：在 html 的 head 中编写 style 标签进行全局 Css 进行渲染
>     3. 外部样式表（最推荐）：在 .css 为后缀的文件中进行编写相应的样式内容，最后在 html 的 head 标签中通过 link 引用该样式文件即可
> - 选择器
>     1. 标签选择器。顾名思义就是根据已有的标签进行样式书写，格式示例为 `p { color: red; }`
>     2. 类选择器。根据自定义的类名进行样式书写，格式示例为 `.ClassName { color: red; }`
>     3. id 选择器。根据页面中某一个元素唯一的 id 进行样式书写，格式示例为 `#OnlyId { color: red; }`
> - 渲染优先级：内联样式 > ID 选择器 > 样式表
> - 背景：背景颜色（rgb赋值、hex赋值、name赋值），背景图片（定位、滚动样式）
> - 文本：文字颜色、文字对齐
> - 字体：字体系列、字体大小
> - 链接：链接样式（link、visited、hover、active顺序记忆为 **l**o**v**e & **ha**te）
> - 
> - 
> - 盒子模型：每一个标签都是一个盒子，分为行级标签、块级标签等。对于每一个盒子，分为内边距（元素与边框的距离）、边框和外边距（各个盒子之间的距离）。其中：
>     1. 内边距通过 margin 进行控制。属性值含有四个参数，分别代表上右下左的距离值，如果只含有三个，则其中第一个为上，第二个为左右，第三个为下；如果只含有两个，则其中第一个为上下，第二个为左右；如果只含有一个，则表示上右下左均为该值
>     2. 外边框通过 padding 进行控制。属性值同 margin 的属性值
> - 浮动布局。即 float 属性，可以理解为元素环绕属性，有 left 与 right 两个属性值。设定浮动属性后，元素将脱离文档流，上面的元素布局不变，下面的元素向上浮动调整
> - 定位布局。即 position 属性，是为了实现透视覆盖的视觉效果而诞生的。即设定一个元素的 position 值为 relative，即设定其为相对元素，接着在此相对元素的位置基础之上，设定其余元素的 position 值为 absolute 以及相应的位置参数大小，即可相对相对参照元素进行布局

### 2.3 JavaScript

JavaScript 为高级解释性语言，可面向对象、函数式编程，与 Python 同类型。在网页中， JS 将 html 页面看做一个类似于 word 的文档，主要起到捕捉用户行为，从而做出相应的操作的过程。主要实现的逻辑是与用户进行交互，速查手册 [Javascript 教程](https://www.runoob.com/js/js-tutorial.html)，以下为常用 or 易遗忘 or 基本概念速查清单：

> [!note]
>
> - 引用：在 html 文件中引用 JavaScript 脚本非常的灵活，只需要包裹在 script 标签中即可。一般而言会统一的放在 head 或 body 的末尾。推荐统一放在 body 的末尾进行加载，具体原因见上方“基本概念”

## 三、Css 框架

### 3.1 Bootstrap

## 四、JavaScript 框架

### 4.1 JQuery

### 4.2 Vue

TODO

### 4.3 React
