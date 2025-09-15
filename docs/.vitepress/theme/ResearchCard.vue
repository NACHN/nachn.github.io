<!-- docs/.vitepress/theme/ResearchCard.vue -->
<script setup>
defineProps({
  title: String,
  details: String,
  link: String,
  icon: String // (可选) 你可以为每个研究方向配个图标
});
</script>

<template>
  <a :href="link" class="research-card">
    <div v-if="icon" class="icon-container">
      <!-- 你可以使用 emoji 或 SVG 图标 -->
      <span class="icon">{{ icon }}</span>
    </div>
    <div class="content">
      <h2 class="title">{{ title }}</h2>
      <p class="details">{{ details }}</p>
    </div>
  </a>
</template>

<style scoped>
.research-card {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.25s ease;
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.research-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px var(--vp-c-bg-soft-down);
  border-color: var(--vp-c-brand-1);
}

.content {
  padding: 24px;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 8px;
  border: none; /* 覆盖默认 h2 样式 */
  padding: 0;
}

.details {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  font-size: 0.95rem;
  /* 默认隐藏详细信息，hover 时显示 */
  opacity: 0;
  transition: opacity 0.25s ease;
  height: 0;
  overflow: hidden;
}

.research-card:hover .details {
  opacity: 1;
  height: auto; /* 高度自动，让内容撑开 */
  margin-top: 12px;
}

/* (可选) 图标样式 */
.icon-container {
  padding: 24px 24px 0;
}
.icon {
  display: block;
  font-size: 3rem;
  margin-bottom: -10px;
}
</style>