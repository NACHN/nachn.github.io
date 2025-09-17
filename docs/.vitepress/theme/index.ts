// docs/.vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import { ref, h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import NotFound from './NotFound.vue'
import Resume from './resume.vue'
import ResearchIndex from './ResearchIndex.vue'
import ResearchCard from './ResearchCard.vue'
import './custom.css'
import LaTeXPG from './LaTeXPG.vue'
import IconsBg from './IconsBg.vue'
import { useData } from 'vitepress'
import MeteorBg from './MeteorBg.vue'
import Comment from './Comment.vue'


export default {
  ...DefaultTheme, // 继承默认主题的所有配置
  NotFound: NotFound, // 覆盖默认的 NotFound 组件

  // 使用 Layout 属性来扩展默认主题
  Layout: () => {
    const { frontmatter } = useData()

    // 定义插槽内容
    const slots = {
      // 保持你现有的背景逻辑
      'layout-bottom': () => {
        if (frontmatter.value.hasBg) {
          return h('div', [
            h(IconsBg),
            h(MeteorBg)
          ])
        }
        // 【推荐】即使没有 IconsBg，也保留流星背景，保持时间连贯性
        // 如果你取消了注释，请确保 MeteorBg 是全局持久化的
        /*else {
          return h(MeteorBg)
        }*/
      },

      // 【新增】定义文章下方的插槽内容
      'doc-after': () => {
        // 检查 frontmatter 中是否有 comments: true
        return frontmatter.value.comments ? h(Comment) : null
      }
    }

    return h(DefaultTheme.Layout, null, slots)
  },

  // 扩展默认主题
  enhanceApp({ app }) {
    app.component('Resume', Resume)
    app.component('ResearchIndex', ResearchIndex)
    app.component('ResearchCard', ResearchCard)
    app.component('LatexPG', LaTeXPG)
    app.component('IconsBg', IconsBg)
    app.component('MeteorBg', MeteorBg)
  }
} satisfies Theme