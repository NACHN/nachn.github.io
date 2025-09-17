---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
# 页面的元数据
title: 科研入门
description: 工欲善其事，必先利其器。
hasBg: true

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
  - icon: '/icons/drawio.svg'
    title: 'draw.io'
    details: '强大的在线图表绘制工具。无论是流程图、架构图还是思维导图都能轻松应对，更重要的是它内置 LaTeX 支持，让你在图表中也能插入精美的数学公式。'
    link: 'https://app.diagrams.net/'
    bgColor: '#F08705'
  - icon: '/icons/zotero.png'
    title: 'Zotero'
    details: '开源的文献管理工具，轻松抓取、组织、引用和分享你的研究资料。'
    link: 'https://www.zotero.org/'
    bgColor: '#CC2936'
  - icon: '/icons/snipaste.svg'
    title: 'Snipaste'
    details: '绝佳的截图与贴图工具。轻松将截图、公式或图表钉在屏幕上，方便随时参考与对比，极大提升文献阅读和论文写作效率。'
    link: 'https://www.snipaste.com/'
    bgColor: '#00BCD4'
  - icon: '/icons/everything.ico'
    title: 'Everything'
    details: 'Windows 平台下的闪电般快速的文件搜索引擎。当你面对海量文献、代码和素材时，它能在毫秒间找到你所需的文件，彻底告别 Windows 自带搜索的漫长等待。'
    link: 'https://www.voidtools.com/'
    bgColor: '#FF9800'
  - icon: '/icons/veusz.svg'
    title: 'Veusz'
    details: '一款科学绘图和制图软件。开源免费，能绘制出出版级别的 2D 和 3D 图表，是 Origin 的绝佳替代品。'
    link: 'https://veusz.github.io/'
    bgColor: '#3F51B5'
  - icon: '/icons/python.svg'
    title: 'Python 官网'
    details: '现代科学计算的基石。官网是获取纯净、安全安装包的唯一可靠渠道，请务必认准，避免从搜索引擎的广告链接下载。'
    link: 'https://www.python.org/'
    bgColor: '#3776AB'
  - icon: '/icons/julia.svg'
    title: 'Julia 官网'
    details: '专为高性能科学计算和数值分析而设计的新一代编程语言。它结合了动态语言的易用性和编译语言的速度，是处理复杂计算任务的理想选择。'
    link: 'https://julialang.org/'
    bgColor: '#389826'
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