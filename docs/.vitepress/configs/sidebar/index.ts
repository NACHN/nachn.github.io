// docs/.vitepress/configs/sidebar/index.js

import { research } from './research'
import { projects } from './projects'
import { tutorials } from './tutorials'
import { creations } from './creations'

export const sidebar = {
  // 中文版的 sidebar
  'zh-CN': {
    '/research/': research['zh-CN'],
    '/projects/': projects['zh-CN'],
    '/tutorials/': tutorials['zh-CN'],
    '/creations/': creations['zh-CN'],
  },
  // 英文版的 sidebar
  'en-US': {
    '/en/research/': research['en-US'],
    '/en/projects/': projects['en-US'],
    '/en/tutorials/': tutorials['en-US'],
    // ...
  }
}