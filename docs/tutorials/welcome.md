---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
# 页面的元数据
title: 科研入门
description: 工欲善其事，必先利其器。

# 提供给 ResearchIndex.vue 组件的数据
tutorials:
  - icon: '✒️'
    title: 'LaTeX 交互式教程'
    details: '最具特色的在线教程！无需安装，直接在网页上编写公式并实时预览，开启最直观的 LaTeX 学习之旅。'
    link: '/tutorials/latex-tutorial '
    bgColor: '#00838A' # LaTeX 的经典颜色
  - icon: '📚'
    title: '论文检索与文献管理'
    details: '（筹备中）从海量文献中快速找到所需，并使用 Zotero 等工具高效管理你的参考文献。'
    link: '#' # 暂时没有链接
    bgColor: '#E57373'

# --- 工具推荐 ---
tools:
  - icon: '/icons/obsidian.svg'
    title: 'Obsidian'
    details: '一款强大的双链笔记软件，构建你的第二大脑，让知识在连接中产生价值。'
    link: 'https://obsidian.md/' # 链接到官网
    bgColor: '#7A4DDE' # Obsidian 的品牌色
  - icon: '/icons/vscode.png'
    title: 'VS Code'
    details: '不仅仅是代码编辑器，通过丰富的插件，它可以成为你撰写 LaTeX、Markdown 笔记和进行数据分析的瑞士军刀。'
    link: 'https://code.visualstudio.com/'
    bgColor: '#007ACC' # VS Code 的品牌色
  - icon: '/icons/pdfgear.svg'
    title: 'PDFGear'
    details: '一款功能强大的免费 PDF 编辑器，支持与 AI 交互，快速总结文献、解答疑惑。'
    link: 'https://www.pdfgear.com/'
    bgColor: '#FF5722'
  - icon: '/icons/zotero.png'
    title: 'Zotero'
    details: '开源的文献管理工具，轻松抓取、组织、引用和分享你的研究资料。'
    link: 'https://www.zotero.org/'
    bgColor: '#CC2936'
---

<div class="card-grid-container">
  
  <h2>教程系列</h2>
  <div class="card-grid">
    <ResearchCard 
      v-for="item in $frontmatter.tutorials" 
      :key="item.title"
      :icon="item.icon"
      :title="item.title"
      :details="item.details"
      :link="item.link"
      :bgColor="item.bgColor"
    />
  </div>

  <h2>工具推荐</h2>
  <div class="tool-card-grid">
    <ResearchCard 
      v-for="item in $frontmatter.tools" 
      key="item.title"
      :icon="item.icon"
      :title="item.title"
      :details="item.details"
      :link="item.link"
      :bgColor="item.bgColor"
    />
  </div>

</div>