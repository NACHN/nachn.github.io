<!-- docs/.vitepress/theme/ResearchIndex.vue (Upgraded) -->
<script setup>
import { computed } from 'vue';
import { useData } from 'vitepress';
import ResearchCard from './ResearchCard.vue';
import TimelineCard from './TimelineCard.vue';

// 1. 获取 frontmatter 作为“后备”数据源
const { frontmatter } = useData();

// 2. 定义 props，允许外部直接传入数据
const props = defineProps({
    title: String,
    description: String,
    items: Array, // [关键] 允许直接传入 items 数组
    layout: String, // 'grid' or 'timeline'
    lineColor: String // for timeline
});

// 3. 创建计算属性来决定最终使用哪个数据源
const pageTitle = computed(() => props.title || frontmatter.value.title);
const pageDescription = computed(() => props.description || frontmatter.value.description);
const displayItems = computed(() => props.items || frontmatter.value.items);
const displayLayout = computed(() => props.layout || frontmatter.value.index_type || 'grid');
const displayLineColor = computed(() => props.lineColor || frontmatter.value.lineColor);

</script>

<template>
  <div class="universal-index">
    <div class="header">
      <h1>{{ pageTitle }}</h1>
      <p>{{ pageDescription }}</p>
    </div>

    <!-- 3. 根据 layout 的值，条件渲染不同的布局 -->
    
    <!-- Grid 布局 -->
    <div v-if="displayLayout === 'grid'" class="card-grid">
      <ResearchCard
        v-for="item in displayItems"
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
    <div v-else-if="displayLayout === 'timeline'" class="timeline-container">
      <TimelineCard
        v-for="item in displayItems"
        :key="item.title"
        :title="item.title"
        :details="item.details"
        :link="item.link"
        :icon="item.icon"
        :bgColor="item.bgColor"
        :lineColor="displayLineColor"
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