// docs/.vitepress/configs/sidebar/research.ts

export const research = {
  'zh-CN': [
    {
      text: '学术研究与核心',
      items: [
        {
          text: '控制理论',
          collapsed: false,
          items: [
            { text: '状态空间方法', link: '/research/control-theory/state-space-methods' },
            { text: '无迹卡尔曼滤波 (UKF)', link: '/research/control-theory/unscented-kalman-filter' },
            // 在这里添加更多中文控制理论文章
          ]
        },
        {
          text: '空气动力学',
          collapsed: true,
          items: [
            // 在这里添加中文空气动力学文章
          ]
        },
        {
          text: '科学计算',
          collapsed: true,
          items: [
            { text: '使用 Julia 进行动力学建模', link: '/research/scientific-computing/julia-for-dynamics' },
            // 在这里添加更多中文科学计算文章
          ]
        }
      ]
    }
  ],
  'en-US': [
    {
      text: 'Research & Core Academics',
      items: [
        {
          text: 'Control Theory',
          collapsed: false,
          items: [
            { text: 'State-Space Methods', link: '/en/research/control-theory/state-space-methods' },
          ]
        },
        // ... 其他英文 research 分类
      ]
    }
  ]
}