// docs/.vitepress/configs/nav.ts

export const nav = {
  // 中文版的 nav
  'zh-CN': [
    { text: '首页', link: '/' },
    { text: '学术研究', link: '/research/index' },
    { text: '工程项目', link: '/projects/aviation-simulation/runway-capacity-simulator' },
    { text: '科研入门', link: '/tutorials/welcome' },
    {
      text: '创造与探索',
      items: [
        { text: '游戏模组', link: '/creations/game-modding/modding-overview' },
        { text: '三维建模', link: '/creations/3d-modeling/modeling-portfolio' },
        { text: '数字艺术', link: '/creations/digital-art/graphic-design-gallery' },
        { text: '音乐编曲', link: '/creations/music-composition/music-theory-and-practice' },
        { text: '前端开发', link: '/creations/frontend/background-story'}
      ]
    },
    { text: '技能栈', link: '/skills' },
  ],
  // 英文版的 nav
  'en-US': [
    { text: 'Home', link: '/en/' },
    { text: 'Research', link: '/en/research/control-theory/state-space-methods' },
    { text: 'Projects', link: '/en/projects/aviation-simulation/runway-capacity-simulator' },
    {
      text: 'Creations',
      items: [
        { text: 'Game Modding', link: '/en/creations/game-modding/modding-overview' },
        { text: '3D Modeling', link: '/en/creations/3d-modeling/modeling-portfolio' },
        { text: 'Digital Art', link: '/en/creations/digital-art/graphic-design-gallery' },
        { text: 'Music Composition', link: '/en/creations/music-composition/music-theory-and-practice' }
      ]
    },
    { text: 'Skills', link: '/en/skills' },
  ]
}