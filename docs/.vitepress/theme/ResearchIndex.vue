<!-- docs/.vitepress/theme/ResearchIndex.vue (Upgraded) -->
<script setup>
import { useData } from 'vitepress';
import ResearchCard from './ResearchCard.vue';
import TimelineCard from './TimelineCard.vue'; // 1. 导入新的 TimelineCard

const { frontmatter } = useData();

// 2. 从 frontmatter 读取数据和布局类型
const items = frontmatter.value.items; // 将数据源重命名为 items，更通用
const layout = frontmatter.value.index_type || 'grid'; // 默认为 'grid'
const color = frontmatter.value.lineColor || '#f00';
</script>

<template>
  <div class="universal-index">
    <div class="header">
      <h1>{{ frontmatter.title }}</h1>
      <p>{{ frontmatter.description }}</p>
    </div>

    <!-- 3. 根据 layout 的值，条件渲染不同的布局 -->
    
    <!-- Grid 布局 -->
    <div v-if="layout === 'grid'" class="card-grid">
      <ResearchCard
        v-for="item in items"
        :key="item.title"
        :title="item.title"
        :details="item.details"
        :link="item.link"
        :icon="item.icon"
        :bgColor="item.bgColor"
        :tColor="item.tColor"
      />
    </div>

    <!-- Timeline 布局 -->
    <div v-else-if="layout === 'timeline'" class="timeline-container">
      <TimelineCard
        v-for="item in items"
        :key="item.title"
        :title="item.title"
        :details="item.details"
        :link="item.link"
        :icon="item.icon"
        :bgColor="item.bgColor"
        :lineColor="color"
      />
    </div>
  </div>
</template>

<style scoped>
.research-index {
  max-width: 1152px;
  margin: 0 auto;
  padding: 48px 24px;
}

.header {
  text-align: center;
  margin-bottom: 48px;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: 700;
}

.header p {
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  margin-top: 8px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.timeline-container {
  max-width: 800px; /* 时间轴布局通常窄一些更好看 */
  margin: 0 auto;
}
</style>