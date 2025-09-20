---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
# 页面的元数据
title: 科研入门
description: 工欲善其事，必先利其器。
hasBg: true

# 提供给 ResearchIndex.vue 组件的数据
tutorials:
  - icon: '🔑'
    title: '课题组内部知识库'
    details: '基于腾讯 IMA 构建，存放内部笔记、数据与文献。支持强大的 AI 对话与 RAG 查询。点击查看加入方式，扫码提交申请，由管理员审核后即可访问。'
    link: '/tutorials/ima-access' # 链接到专门的说明页面
    bgColor: '#b0ec0bff'
  - icon: '✒️'
    title: 'LaTeX 交互式教程'
    details: '最具特色的在线教程！无需安装，直接在网页上编写公式并实时预览，开启最直观的 LaTeX 学习之旅。'
    link: '/tutorials/latex-tutorial '
    bgColor: '#00ecf8ff' # LaTeX 的经典颜色
  - icon: '📚'
    title: '论文检索与文献管理'
    details: '（筹备中）从海量文献中快速找到所需，并使用 Zotero 等工具高效管理你的参考文献。'
    link: '#' # 暂时没有链接
    bgColor: '#ff6464ff'


# --- 工具推荐 ---
tools:
  - icon: '/icons/obsidian.svg'
    title: 'Obsidian'
    details: '一款强大的双链笔记软件，构建你的第二大脑，让知识在连接中产生价值。'
    link: 'https://obsidian.md/'
    bgColor: '#7A4DDE'
  - icon: '/icons/vscode.png'
    title: 'VS Code'
    details: '不仅仅是代码编辑器，通过丰富的插件，它可以成为你撰写 LaTeX、Markdown 笔记和进行数据分析的瑞士军刀。'
    link: 'https://code.visualstudio.com/'
    bgColor: '#007ACC'
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
# 列表二：软件教程 (链接到你网站的内部教程页)
tool_tutorials:
  - icon: '/icons/obsidian.svg'
    title: 'Obsidian 知识库搭建'
    details: '（筹备中）本教程将带你从零开始，一步步搭建属于你自己的数字化知识库。学习如何利用双向链接，高效整理文献笔记，真正让你的知识网络‘活’起来。'
    link: '#' # 将来替换为 /tutorials/obsidian-guide
    bgColor: '#7A4DDE'
  - icon: '/icons/vscode.png'
    title: 'VS Code 科研环境配置'
    details: '（筹备中）抛弃笨重的专用编辑器！本教程将教你如何通过精选插件，将 VS Code 打造成一个轻量、高效、且高度定制化的科研与写作中心。'
    link: '#' # 将来替换为 /tutorials/vscode-for-research
    bgColor: '#007ACC'
  - icon: '/icons/pdfgear.svg'
    title: 'PDFGear 高效文献阅读'
    details: '（筹备中）学习如何利用 PDFGear 的 AI 功能，实现一键总结长篇文献、快速解答疑难概念。本教程将分享高效阅读、管理高亮与笔记的最佳实践。'
    link: '#' # 将来替换为 /tutorials/pdfgear-workflow
    bgColor: '#FF5722'
  - icon: '/icons/drawio.svg'
    title: 'draw.io 论文绘图指南'
    details: '（筹备中）掌握使用 draw.io 绘制科研流程图、系统架构图的技巧。重点讲解如何在图表中无缝嵌入精美的 LaTeX 数学公式，并导出适用于论文的高清矢量图。'
    link: '#' # 将来替换为 /tutorials/drawio-for-papers
    bgColor: '#F08705'
  - icon: '/icons/zotero.png'
    title: 'Zotero 文献管理工作流'
    details: '（筹备中）从入门到精通，构建你的 Zotero 文献管理工作流。学习如何使用浏览器插件一键抓取文献，并配合 Word 或 LaTeX 插件在写作中轻松插入和格式化引文。'
    link: '#' # 将来替换为 /tutorials/zotero-workflow
    bgColor: '#CC2936'
  - icon: '/icons/snipaste.svg'
    title: 'Snipaste 进阶使用技巧'
    details: '（筹备中）你真的会用 Snipaste 吗？本教程将分享截图、贴图、取色、历史记录等高级功能，让你在文献对比和笔记整理时如虎添翼。'
    link: '#' # 将来替换为 /tutorials/snipaste-pro
    bgColor: '#00BCD4'
  - icon: '/icons/veusz.svg'
    title: 'Veusz 科研数据可视化'
    details: '（筹备中）本教程将通过实例，教你如何使用 Veusz 制作出版级别的二维和三维图表，并进行精细的样式调整，让你的数据会“说话”。'
    link: '#' # 将来替换为 /tutorials/veusz-plotting
    bgColor: '#3F51B5'
  - icon: '/icons/python.svg'
    title: 'Python 科研环境搭建'
    details: '（筹备中）面向初学者的 Python 科研环境配置指南。从安装纯净的官方 Python 开始，到使用 Conda 管理虚拟环境，为你的数据分析之旅打下坚实基础。'
    link: '#' # 将来替换为 /tutorials/python-setup
    bgColor: '#3776AB'
  - icon: '/icons/julia.svg'
    title: 'Julia 语言快速入门'
    details: '（筹备中）体验下一代科学计算语言的魅力。本教程将带你快速上手 Julia 的基础语法和核心优势，并完成你的第一个高性能数值计算任务。'
    link: '#' # 将来替换为 /tutorials/julia-quickstart
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
  <ToolShowcase 
    :software="$frontmatter.tool_software"
    :tutorials="$frontmatter.tool_tutorials"
  />

</div>
