// docs/.vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import NotFound from './NotFound.vue'
import Resume from './resume.vue'
import './custom.css'


export default {
  ...DefaultTheme, // 继承默认主题的所有配置
  NotFound: NotFound, // 覆盖默认的 NotFound 组件
  // 扩展默认主题
  enhanceApp({ app }) {
    app.component('Resume', Resume)
  }
} satisfies Theme