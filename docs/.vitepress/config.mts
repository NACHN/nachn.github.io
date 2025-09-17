import { defineConfig } from 'vitepress'
import { nav } from './configs/nav'
import { sidebar } from './configs/sidebar'

export default defineConfig({
  // --- 1. 全局配置 (对所有语言生效) ---
  base: '/',

  head: [
    // 元素 1: 为网站添加 favicon
    ['link', { rel: 'icon', href: '/web.svg' }],

    // 元素 2: 强制加载 MathJax 3 脚本
    ['script', {
      id: 'mathjax-script',
      async: '',
      src: 'https://cdnjs.loli.net/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js'
    }],

    // 元素 3: 【新增】一个独立的 script 标签，专门用于设置默认暗色模式
    ['script',
      {}, // 这个 script 标签没有 attributes，所以留一个空对象
      // 这是它的 innerHTML，这段代码会立即执行
      `(function() {
      const key = 'vitepress-theme-appearance';
      if (localStorage.getItem(key) === null) { // 检查 localStorage 中是否存在设置
        localStorage.setItem(key, 'dark'); // 如果不存在，则设置为 'dark'
        document.documentElement.classList.add('dark'); // 立即应用 dark 类
      }
    })()`
    ]
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

        nav: nav['zh-CN'],

        sidebar: sidebar['zh-CN'],

        // UI 文本翻译
        outlineTitle: '本页大纲',
        docFooter: { prev: '上一篇', next: '下一篇' },
        editLink: {
          pattern: 'https://github.com/NACHN/nachn.github.io/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页'
        }
      }
    },
  },

  // --- 3. 全局共享的 themeConfig ---
  // (这些配置会被所有语言继承)
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/NACHN' }
    ],
    logo: { light: '/web-light.png', dark: '/web.svg' },

    search: {
      provider: 'algolia',
      options: {
        appId: 'TOZCICGMZ1',      // 替换成你的 appId
        apiKey: 'e2d3ecc7f1d625ebf418655ee34cc289',    // 替换成你的 apiKey
        indexName: 'NACHN Website', // 替换成你的 indexName
        locales: {
          root: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                }
              }
            }
          }
        }
      }
    },
  },

  markdown: {
    math: true
  }
})