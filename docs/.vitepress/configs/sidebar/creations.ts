// docs/.vitepress/configs/sidebar/creations.ts

export const creations = {
  // 中文版的 creations 侧边栏
  'zh-CN': [
    {
      text: '创造与跨界探索',
      items: [
        { text: '游戏模组', link: '/creations/game-modding/modding-overview' },
        { text: '三维建模', link: '/creations/3d-modeling/modeling-portfolio' },
        { text: '数字艺术', link: '/creations/digital-art/graphic-design-gallery' },
        { text: '音乐编曲', link: '/creations/music-composition/music-theory-and-practice' },
        // 【新增】在这里添加你的文章
        { 
          text: '前端开发', 
          collapsed: false, // 默认展开，让读者能看到
          items: [
            { text: '“背景故事”——美丽流星', link: '/creations/frontend/background-story' },
            // 未来更多前端相关的创造可以放在这里
          ]
        },
      ]
    }
  ],
  // 英文版的 creations 侧边栏
  'en-US': [
    {
      text: 'Creations & Explorations',
      items: [
        { text: 'Game Modding', link: '/en/creations/game-modding/modding-overview' },
        // ...
        // 【新增】同样在这里添加英文版的条目
        {
          text: 'Frontend Artistry',
          collapsed: false,
          items: [
            { text: 'The Evolution of a Living Background', link: '/en/creations/frontend-artistry-background-evolution' },
          ]
        }
      ]
    }
  ]
}