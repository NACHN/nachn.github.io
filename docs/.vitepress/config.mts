import { defineConfig } from 'vitepress'

export default defineConfig({
  // --- 1. 全局配置 (对所有语言生效) ---
  base: '/',

  head: [
    // 为网站添加 favicon
    //['link', { rel: 'icon', href: '/favicon.ico' }],

    // 强制加载 MathJax 3 脚本
    ['script', {
      id: 'mathjax-script',
      async: '', // async 属性确保它不会阻塞页面解析
      src: 'https://cdnjs.loli.net/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js'
    }],
    ['meta', { name: 'algolia-site-verification', content: '06B35DC0E4315812' }]
  ],


  // --- 2. 多语言的顶层配置 ---
  locales: {
    /**
     * 中文 (默认)
     * 'root' 对应 docs/ 目录
     */
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: "戴畇滔的状态空间",
      description: "My State, My Space - 我的个人知识体系，用于记录控制理论、机器人学与计算机科学的研究与笔记。",

      // 中文版的 themeConfig
      themeConfig: {
        search: {
          provider: 'algolia',
          options: {
            appId: 'TOZCICGMZ1',      // 替换成你的 appId
            apiKey: 'e2d3ecc7f1d625ebf418655ee34cc289',    // 替换成你的 apiKey
            indexName: 'NACHN Website' // 替换成你的 indexName
          }
        },
        nav: [
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
              { text: '音乐编曲', link: '/creations/music-composition/music-theory-and-practice' }
            ]
          },
          { text: '技能栈', link: '/skills' },
        ],

        sidebar: {
          '/research/': [
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
          '/projects/': [
            {
              text: '工程项目实践',
              items: [
                { text: '跑道容量模拟器', link: '/projects/aviation-simulation/runway-capacity-simulator' },
                { text: '乌鲁木齐公交信息平台', link: '/projects/transportation-systems/urumqi-transit-platform' },
                { text: '交通图生成工具', link: '/projects/transportation-systems/transit-map-generator' },
                { text: '格斗机器人', link: '/projects/robotics/combat-robot-catia' },
                { text: '点阵字生成器', link: '/projects/software-tools/dot-matrix-font-generator' },
              ]
            }
          ],
          '/tutorials/': [
            {
              text: 'LaTeX 交互式教程', link: '/tutorials/latex-tutorial',
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
          '/creations/': [
            {
              text: '创造与跨界探索',
              items: [
                { text: '游戏模组开发', link: '/creations/game-modding/modding-overview' },
                { text: '三维建模作品集', link: '/creations/3d-modeling/modeling-portfolio' },
                { text: '数字艺术', link: '/creations/digital-art/graphic-design-gallery' },
                { text: '音乐编曲', link: '/creations/music-composition/music-theory-and-practice' }
              ]
            }
          ]
        },

        // UI 文本翻译
        outlineTitle: '本页大纲',
        docFooter: { prev: '上一篇', next: '下一篇' },
        editLink: {
          pattern: 'https://github.com/NACHN/nachn.github.io/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页'
        }
      }
    },

    /**
     * English
     * 'en' 对应 docs/en/ 目录
     */
    en: {
      label: 'English',
      lang: 'en-US',
      title: "Yuntao's State Space",
      description: "My State, My Space - A personal knowledge system for my research and notes in control theory, robotics, and computer science.",

      // 英文版的 themeConfig
      themeConfig: {
        nav: [
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
        ],

        sidebar: {
          '/en/research/': [
            {
              text: 'Research & Core Academics',
              items: [
                {
                  text: 'Control Theory',
                  collapsed: false,
                  items: [
                    { text: 'State-Space Methods', link: '/en/research/control-theory/state-space-methods' },
                    // Add more English control theory articles here
                  ]
                },
                {
                  text: 'Aerodynamics',
                  collapsed: true,
                  items: [
                    // Add English aerodynamics articles here
                  ]
                },
                {
                  text: 'Scientific Computing',
                  collapsed: true,
                  items: [
                    { text: 'Julia for Dynamics', link: '/en/research/scientific-computing/julia-for-dynamics' },
                    // Add more English scientific computing articles here
                  ]
                }
              ]
            }
          ],
          '/en/projects/': [
            {
              text: 'Engineering Projects',
              items: [
                { text: 'Runway Capacity Simulator', link: '/en/projects/aviation-simulation/runway-capacity-simulator' },
                { text: 'Urumqi Transit Platform', link: '/en/projects/transportation-systems/urumqi-transit-platform' },
                { text: 'Transit Map Generator', link: '/en/projects/transportation-systems/transit-map-generator' },
                { text: 'Combat Robot', link: '/en/projects/robotics/combat-robot-catia' },
                { text: 'Dot-Matrix Font Generator', link: '/en/projects/software-tools/dot-matrix-font-generator' },
              ]
            }
          ],
          '/en/creations/': [
            {
              text: 'Creations & Explorations',
              items: [
                { text: 'Game Modding', link: '/en/creations/game-modding/modding-overview' },
                { text: '3D Modeling', link: '/en/creations/3d-modeling/modeling-portfolio' },
                { text: 'Digital Art', link: '/en/creations/digital-art/graphic-design-gallery' },
                { text: 'Music Composition', link: '/en/creations/music-composition/music-theory-and-practice' }
              ]
            }
          ]
        },

        // UI 文本翻译
        outlineTitle: 'On This Page',
        docFooter: { prev: 'Previous page', next: 'Next page' },
        editLink: {
          pattern: 'https://github.com/NACHN/nachn.github.io/edit/main/docs/:path',
          text: 'Edit this page on GitHub'
        }
      }
    }
  },

  // --- 3. 全局共享的 themeConfig ---
  // (这些配置会被所有语言继承)
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/NACHN' }
    ],

    // 搜索等通用配置可以放在这里
    // search: {
    //   provider: 'local',
    // },
  },

  markdown: {
    math: true
  }
})