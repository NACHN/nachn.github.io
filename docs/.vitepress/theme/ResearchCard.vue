<!-- docs/.vitepress/theme/ResearchCard.vue -->
<script setup>
import { computed } from 'vue'; // <--- 添加这一行！

const props = defineProps({ // <--- 把 defineProps 移到下面来，保持风格统一
  title: String,
  details: String,
  link: String,
  icon: String, 
  bgColor: String
});

const isIconUrl = computed(() => {
  // `props` 在 <script setup> 中可以直接使用，无需 this
  return props.icon && props.icon.startsWith('/');
});
</script>

<template>
  <a :href="link" class="research-card" :style="{ '--bgc': bgColor}">
    <div v-if="icon" class="icon-container">
      <!-- 如果 icon 是一个 URL，就渲染 <img> 标签 -->
      <img v-if="isIconUrl" :src="icon" :alt="title" class="icon-svg" />
      <!-- 否则，就渲染 <span> 标签来显示 Emoji -->
      <span v-else class="icon">{{ icon }}</span>
    </div>
    <div class="content">
      <h2 class="title">{{ title }}</h2>
      <p class="details" :style="{ '--text-color': tColor, }">{{ details }}</p>
    </div>
  </a>
</template>

<style scoped>
.marker{
  width:1em;
  height:1em;
  position: inherit;
}
.research-card {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.25s ease;
  text-decoration: none;
  color: var(--vp-c-text-1);
  border-left:  1em solid var(--bgc);
}

.research-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px var(--vp-c-bg-soft-down);
  border-color: var(--bgc, --vp-c-brand-1 );
  border: 1px solid var(--bgc, --vp-c-brand-1);
  color: var(--bgc,--vp-c-text-1);
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
.icon-svg {
  display: block;
  height: 50px; /* 统一 SVG 图标的高度 */
  width: auto;
  margin-bottom: -40px;
}
</style>