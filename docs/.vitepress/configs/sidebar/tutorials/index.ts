// docs/.vitepress/configs/sidebar/tutorials/index.ts
import { latexSidebar } from './latex';
import { sixDofSidebar } from './6dof';
import { pythonSidebar } from './python';

export const tutorials = {
'zh-CN': [
{
text: '课题组内部知识库', link: '/tutorials/ima-access'
},
    latexSidebar,
    sixDofSidebar,
    pythonSidebar,
{
text: '论文检索与文献管理',
items: [
{ text: '论文检索', link: '#' },
{ text: '文献管理', link: '#' },
]
},
],
'en-US': [
// ... 英文 tutorials 侧边栏
]
}