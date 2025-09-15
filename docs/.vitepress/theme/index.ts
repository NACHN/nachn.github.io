// docs/.vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import { ref } from 'vue'
import DefaultTheme from 'vitepress/theme'
import NotFound from './NotFound.vue'
import Resume from './resume.vue'
import ResearchIndex from './ResearchIndex.vue'
import ResearchCard from './ResearchCard.vue'
import './custom.css'
import LaTeXPG from './LaTeXPG.vue'


export default {
  ...DefaultTheme, // 继承默认主题的所有配置
  NotFound: NotFound, // 覆盖默认的 NotFound 组件
  // 扩展默认主题
  enhanceApp({ app }) {
    app.component('Resume', Resume)
    app.component('ResearchIndex', ResearchIndex)
    app.component('ResearchCard', ResearchCard)
    app.component('LatexPG', LaTeXPG)
  }
} satisfies Theme