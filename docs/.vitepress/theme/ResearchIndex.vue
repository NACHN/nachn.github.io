<!-- docs/.vitepress/theme/ResearchIndex.vue -->
<script setup>
import { useData } from 'vitepress';
import ResearchCard from './ResearchCard.vue';

// 定义你的研究方向数据
const { frontmatter } = useData();
const researchAreas = frontmatter.value.researchAreas;
</script>

<template>
  <div class="research-index">
    <div class="header">
      <h1>{{ frontmatter.title }}</h1>
      <p>{{ frontmatter.description }}</p>
    </div>
    <div class="card-grid">
      <ResearchCard
        v-for="area in researchAreas"
        :key="area.title"
        :title="area.title"
        :details="area.details"
        :link="area.link"
        :icon="area.icon"
        :bgColor="area.bgColor"
        :tColor="area.tColor"
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
</style>