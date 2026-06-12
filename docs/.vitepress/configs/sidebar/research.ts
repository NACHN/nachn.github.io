// docs/.vitepress/configs/sidebar/research.ts

export const research = {
  'zh-CN': [
    {
      text: '研究笔记',
      items: [
        {
          text: '动力系统与控制理论',
          collapsed: false,
          items: [
            { text: '状态空间方法', link: '/research/control-theory/state-space-methods' },
            { text: '无迹卡尔曼滤波 (UKF)', link: '/research/control-theory/unscented-kalman-filter' },
            { text: '我发明的CG-EEM', link: '/research/control-theory/cg-eem' },
            //{ text: '模型误差共振理论', link: '/research/control-theory/MER'},
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
          text: '机器学习',
          collapsed: true,
          items: [
            { text: '是与不是——从感知机开始', link: '/research/ml-dl/mlp' },
            { text: '超级叠加——多层网络', link: '/research/ml-dl/rnn' },
            { text: '感受时间——机器的记忆', link: '/research/ml-dl/lstm' },
            { text: '似曾相识——“变形金刚”', link: '/research/ml-dl/transformer' },
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
      text: 'Research Records',
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