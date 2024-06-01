---
title: why-hexo
categories:
  - FrontEnd
  - Hexo
category_bar: true
---

# 为什么选择 Hexo

## 搭建个人博客 :thinking:

市面上主流的一些博客网站广告繁杂，一些交互逻辑不太合理，自定义程度不高。根本动机：搭建独属于自己的知识库。

如何实现？现在市面上主要有两个模式：

1. 有后端：WordPress（类似于学生管理系统，在后端写文章，在前端渲染）
2. 无后端：纯静态页面渲染（纯 html 渲染）：Hexo、VuePress、Gatsby

无后端的逻辑：在本地编写 markdown 文件，然后本地手动**编译**为 html 文件，最后打包上传进行部署即可进行渲染与共享。

本地环境最低配：

- [git](https://www.git-scm.com/downloads): `git add .` `git commit -m '...'` `git push`
- [nodejs](https://nodejs.org/en)、npm: 上 nodejs 官网下载 LTS

## Hexo :one:

纯小白入手最佳实践

## VuePress :two:

基于 vue 生态

```vue
<template>
  <main class="page">
    <slot name="top" />
      <div class="content">
          <div style="width:100%">
              <Content class="theme-default-content custom-content"  />
              <PageEdit style="margin: 0"/>
              <PageNav v-bind="{ sidebarItems }" />
          </div>

          <div class="toc-container-sidebar" ref="tocc">
              <div class="pos-box">
                  <div class="icon-arrow"></div>
                  <div class="scroll-box" style="max-height:86vh">
                      <div style="font-weight:bold;">{{pageSidebarItems[0].title}}</div>
                      <hr/>
                      <div class="toc-box">
                          <PageSidebarToc :depth="0" :items="pageSidebarItems" :sidebarDepth="6"/>
                      </div>
                  </div>
              </div>
          </div>
      </div>

    <slot name="bottom" />
  </main>
</template>
```

## Gatsby :three:

基于 React 生态

```react
import React from 'react'
import { graphql } from 'gatsby'
export default function Home({ data }) {
  return (
    <div>
      <h1>{data.site.siteMetadata.title}</h1>
      <p>{data.site.siteMetadata.description}</p>
    </div>
  )
}
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
```

## 部署与持续集成 :cloud:

使用 github pages 的示例

repo: demo

https://explorer-dong.github.io/demo/

### 第三方托管

- GitHub-Pages：https://github.com
- Netlify：https://www.netlify.com/

### 自定义托管

- 阿里云：https://www.aliyun.com/daily-act/ecs/activity_selection?userCode=jpec1z57
- 腾讯云：https://cloud.tencent.com/act/cps/redirect?redirect=5990&cps_key=3b7501861c577d6b3be08f1f23b5846b&from=console

## 参考资源 :books:

「部署至自己的服务器并自定义域名」https://blog.dwj601.cn/FrontEnd/Hexo/hexo-auto-deploy-to-server/

## 案例展示

基于 Hexo：

- 「Dwj's Blog」https://blog.dwj601.cn/
- 「fancy沐生」https://19220110wuxiuquan.github.io/

基于 VuePress：

- 「鱼皮的编程宝典」https://www.codefather.cn/
- 「VuePress」https://v2.vuepress.vuejs.org/zh/

基于 Gatsby：

- 「Gatsby」https://www.gatsbyjs.com/docs