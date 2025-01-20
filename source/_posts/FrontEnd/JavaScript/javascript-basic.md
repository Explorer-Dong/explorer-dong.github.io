---
title: JavaScrip 基础
categories: 
  - 前端
  - JavaScript
category_bar: true
---

JavaScript 脚本引用为什么不放在 head 而放在 body 的最后？

> 因为浏览器在加载网页（其实就是解析 Html 文件）时，会按照行优先的顺序进行解析，如果将 JS 文件放在 head 中优先加载，会导致页面内容加载延迟，从而影响用户体验。因此将 JS 文件放在 body 的最后进行加载。毕竟加载页面的内容与 JS 是没有关系的。

JavaScript 为高级解释性语言，可面向对象、函数式编程，与 Python 同类型。在网页中， JS 将 html 页面看做一个类似于 word 的文档，主要起到捕捉用户行为，从而做出相应的操作的过程。主要实现的逻辑是与用户进行交互，速查手册 [Javascript 教程](https://www.runoob.com/js/js-tutorial.html)，以下为常用 or 易遗忘 or 基本概念速查清单：

> [!note]
>
> - 引用：在 html 文件中引用 JavaScript 脚本非常的灵活，只需要包裹在 script 标签中即可。一般而言会统一的放在 head 或 body 的末尾。推荐统一放在 body 的末尾进行加载，具体原因见上方“基本概念”