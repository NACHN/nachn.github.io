// docs/.vitepress/configs/sidebar/tutorials.ts

export const tutorials = {
  'zh-CN': [
    {
      text: '课题组内部知识库', link: '/tutorials/ima-access'
    },
    {
      text: 'LaTeX 交互式教程', link: '/tutorials/latex-tutorial',
      collapsed: false,
      items: [
        { text: '基础入门：从零开始写公式', link: '/tutorials/latex-tutorial-01' },
        { text: '结构之美：矩阵、多行公式与分段函数', link: '/tutorials/latex-tutorial-02' },
        { text: '精益求精：括号、间距与文本装饰', link: '/tutorials/latex-tutorial-03' },
        { text: '文章之始：创建你的第一个LaTeX文档', link: '/tutorials/latex-tutorial-04' },
        { text: '模板大观：极致的内容创作体验', link: '/tutorials/latex-tutorial-05' },
        { text: '图文并茂：插入图片与创建表格', link: '/tutorials/latex-tutorial-06' },
        { text: '学术基石：交叉引用与文献管理', link: '/tutorials/latex-tutorial-07' },
        { text: 'LaTeX 资源、本地环境与中文支持', link: '/tutorials/latex-tutorial-08' },
      ]
    },
    {
      text: '论文检索与文献管理',
      items: [
        { text: '论文检索', link: '/tutorials/' },
        { text: '文献管理', link: '/tutorials/' },
      ]
    },
  ],
  'en-US': [
    // ... 英文 tutorials 侧边栏
  ]
}