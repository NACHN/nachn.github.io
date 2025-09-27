<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

const doSearch = () => {
    if (searchQuery.value) {
        const url = `https://scholar.google.com/scholar?q=${encodeURIComponent(searchQuery.value)}`
        window.open(url, '_blank')
    }
}

const academicLinks = [
    {
        name: ' ',
        desc: '集合式文献管理网络',
        url: 'https://www.researchrabbit.ai/',
        icon: { type: 'png', path: '/icons/researchrabbit.png' },
        size: '2x1',
        bg: '#fff'
    },
    {
        name: 'Semantic Scholar',
        desc: 'AI驱动的学术搜索引擎',
        url: 'https://www.semanticscholar.org/',
        icon: { type: 'svg', path: '/icons/semantic.svg' }, // 示例 PNG 路径
        size: '2x2',
        bg: '#11223d'
    },
        {
        name: ' ',
        desc: '千万预印本',
        url: 'https://arxiv.org/',
        icon: { type: 'svg', path: '/icons/arxiv.svg' }, // 示例 SVG 路径
        size: '1x1',
        bg: '#b31b1b',
    },
    {
        name: ' ',
        desc: '查找文献族谱',
        url: 'https://www.connectedpapers.com/',
        icon: { type: 'svg', path: '/icons/connectedpapers.svg' },
        size: '2x1',
        bg: '#fff',
    },
    {
        name: ' ',
        desc: '下文献',
        url: 'https://sci-hub.ru/',
        icon: { type: 'png', path: '/icons/sci-hub.svg' },
        size: '1x2',
        bg: '#ffffff'
    },

        {
        name: ' ',
        desc: 'Overleaf',
        url: 'https://overleaf.com/',
        icon: { type: 'svg', path: '/icons/overleaf.svg' },
        size: '2x1',
        bg: '#fff'
    },
    {
        name: ' ',
        desc: '代码仓库',
        url: 'https://github.com/',
        icon: { type: 'svg', path: '/icons/github.svg' },
        size: '1x1',
        bg: '#010409'
    },
        {
        name: ' ',
        desc: 'Gemini',
        url: 'https://gemini.google.com/',
        icon: { type: 'svg', path: '/icons/gemini.png' },
        size: '1x1',
        bg: '#f0f4f9'
    },
    {
        name: ' ',
        desc: '最全最好用的文献搜索',
        url: 'https://scholar.google.com/',
        icon: { type: 'png', path: '/icons/scholar.png' },
        size: '2x1',
        bg: '#ffffff'
    },
                {
        name: ' ',
        desc: 'Grok',
        url: 'https://grok.com/',
        icon: { type: 'svg', path: '/icons/grok.svg' },
        size: '1x1',
        bg: '#161618'
    },

        {
        name: ' ',
        desc: 'Gemini 离线版',
        url: 'https://aistudio.google.com/',
        icon: { type: 'svg', path: '/icons/aistudio.svg' },
        size: '2x1',
        bg: '#010409'
    },

]
</script>

<template>
    <div class="academic-homepage">
        <div class="search-container">
            <form @submit.prevent="doSearch">
                <input v-model="searchQuery" type="text" placeholder="输入关键词，使用谷歌学术搜索" class="academic-search-input" />
                <button type="submit" class="academic-search-button">搜索</button>
            </form>
        </div>

        <h2>常用学术网站</h2>
        <div class="links-grid">
            <a v-for="link in academicLinks" :key="link.name" :href="link.url" target="_blank" rel="noreferrer"
                class="link-card" :class="`size-${link.size}`" :style="{ backgroundColor: link.bg }" :data-desc="link.desc">
                <span class="icon">
                    <img v-if="link.icon.type === 'png' || link.icon.type === 'svg'" :src="link.icon.path" alt="icon"
                        class="icon-image" />
                    <span v-else>{{ link.icon.value }}</span>
                </span>
            </a>
        </div>
    </div>
</template>

<style scoped>
.academic-homepage {
    max-width: 100vw;
    margin: 0 auto;
    padding: 40px 24px 60px;
}

.search-container {
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
}

.search-container form {
    display: flex;
    width: 100%;
    max-width: 600px;
    border: 1px solid var(--vp-c-brand-1);
    border-radius: 8px;
    overflow: hidden;
    opacity: 0.7;
}

.academic-search-input {
    flex-grow: 1;
    padding: 12px 16px;
    font-size: 1.1em;
    border: none;
    outline: none;
    color: var(--vp-c-text-1);
    background-color: var(--vp-c-bg);
}

.academic-search-button {
    padding: 12px 20px;
    font-size: 1.1em;
    color: white;
    background-color: var(--vp-c-brand-1);
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
}

.academic-search-button:hover {
    background-color: var(--vp-c-brand-2);
    color: var(--vp-c-text-2);
}

h2 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 30px;
    border-bottom: 1px solid var(--vp-c-divider);
    padding-bottom: 10px;
}

.links-grid {
    display: grid;
    grid-template-columns: repeat(10, 5vw);
    /* 每列占父容器宽度的10% */
    grid-auto-rows: 5vw;
    /* 每行占父容器高度的10% */
    gap: 20px;
    width: 100%;
    /* 确保父容器有明确宽度 */
    height: 600px;
    /* 固定高度，可根据需要调整 */
    position: relative;
}

.link-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    text-decoration: none;
    color: var(--vp-c-text-1);
    background-color: var(--vp-c-bg-soft);
    transition: border-color 0.2s, background-color 0.2s, transform 0.2s;
    z-index: 10;
}

.link-card:hover {
    background-color: #b4b7bbff;
    transform: translateY(-5px);
    z-index: 20;
}

.link-card.size-1x1 {
    grid-column: span 1;
    /* 占1列，宽度为父容器10% */
    grid-row: span 1;
    /* 占1行，高度为父容器10% */
}

.link-card.size-1x2 {
    grid-column: span 1;
    /* 占1列 */
    grid-row: span 2;
    /* 占2行，高度为父容器20% */
    min-height: 0;
    /* 避免 min-height 干扰 */
}

.link-card.size-2x1 {
    grid-column: span 2;
    grid-row: span 1;
}

.link-card.size-2x2 {
    grid-column: span 2;
    grid-row: span 2;
}

.link-card::before {
  content: attr(data-desc);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  font-size: 0.95rem;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.25s ease;
  text-align: center;
  pointer-events: none; /* Prevent ::before from intercepting hover */
  z-index: 30; /* Ensure ::before is above card content */
}

.link-card:hover::before {
  opacity: 1;
  backdrop-filter: blur(2px);
}

.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
}

.icon-image {
    width: 1000px;
    height: 100%;
    object-fit: contain;
}

.link-card .icon {
    font-size: 3em;
}

.link-card .name {
    font-size: 1.1em;
    font-weight: 600;
}
</style>