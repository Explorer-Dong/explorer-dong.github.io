---
title: HTML 基础
categories: 
  - 前端
  - HTML
category_bar: true
---

HTML 全称超文本标记语言，可以和 Markdown 进行类比，即不同的内容用对应不同的标签进行渲染。内容繁多，初学难以彻底记忆，故放置速查手册进行快速查询 [HTML 教程](https://www.runoob.com/html/html5-intro.html)，以下是个人容易遗忘的 or 经常用到的标签、属性等用于快速查询：

> [!note]
>
> - 头部：在 head 标签中，设置 Css 样式文件地址 link 标签，设置 base 全局标签等等
> - 超链接：`<a href="https://www.runoob.com" target="_blank">这是一个链接，新开一面展示相关内容</a>`
> - 图像：`<img src="/images/logo.png" alt="alternative text" width="258" height="39" />`
> - 属性：
>     - `class` 属性为标签的样式渲染属性，每一个 class 都封装了特定的 Css 样式，通过在标签中添加一个或多个 class 属性，实现对指定标签的渲染
>
>     - `id` 属性为一个 html 页面上某一个标签元素特有的属性，仅此一家。可以实现 html 中锚点的链接跳转，css 中进行唯一的样式编写，js 中进行唯一的元素操作或修改
> - 表格：tr 为表格行缩写，th 为表头缩写，td 为表格数据缩写，一般的表格格式是 有很多的 tr，第一个 tr 中嵌套一组 th，其余的 tr 嵌套 td