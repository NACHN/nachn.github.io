<!-- docs/.vitepress/theme/ResearchCard.vue -->
<script setup>
import { computed } from 'vue'; // <--- 添加这一行！

const props = defineProps({ // <--- 把 defineProps 移到下面来，保持风格统一
  title: String,
  details: String,
  link: String,
  icon: String, 
  bgColor: String,
  size: {
    type: String,
    validator: (value) => ['normal', 'mid', 'small'].includes(value),
    default: 'normal' // 'normal' or 'small'
  }
});

const cardClasses = computed(() => {
  return {
    'is-small': props.size === 'small',
    'is-mid': props.size === 'mid',
    // 你未来还可以添加 'is-large' 等
  };
});

const isIconUrl = computed(() => {
  // `props` 在 <script setup> 中可以直接使用，无需 this
  return props.icon && props.icon.startsWith('/');
});
</script>

<template>
  <a :href="link" class="research-card" :class="cardClasses" :style="{ '--bgc': bgColor}">
    <div v-if="icon" class="icon-container">
      <!-- 如果 icon 是一个 URL，就渲染 <img> 标签 -->
      <img v-if="isIconUrl" :src="icon" :alt="title" class="icon-svg" />
      <!-- 否则，就渲染 <span> 标签来显示 Emoji -->
      <span v-else class="icon">{{ icon }}</span>
    </div>
    <div class="content">
      <h2 class="title">{{ title }}</h2>
      <p class="details" :style="{ '--text-color': tColor, }" v-html="details"></p>
    </div>
  </a>
</template>

<style scoped>

.research-card.is-small .content {
  padding: 8px 16px; /* 减小内边距 */
}
.research-card.is-small .title {
  font-size: 0.9em; /* 减小字体 */
  font-weight: 500;
  margin: 0;
}
.research-card.is-small .icon-container,
.research-card.is-small .details {
  display: none; /* 隐藏小卡片的图标和详情 */
}

.research-card.is-mid .content {
  /* 中等尺寸时，内容和图标并排显示 */
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
}
.research-card.is-mid .icon-container {
  /* 重置 padding 和 margin */
  
  margin: 0;
}
.research-card.is-mid .icon,
.research-card.is-mid .icon-svg {
  /* 缩小图标尺寸 */
  font-size: 1.8em;
  height: 28px;
  margin: 0;
}
.research-card.is-mid .title {
  /* 调整标题样式 */
  font-size: 1.1em;
  font-weight: 600;
  margin: 0;
}
.research-card.is-mid .details {
  /* 中等尺寸不显示详情 */
  display: none;
}

.marker{
  width:1em;
  height:1em;
  position: inherit;
}
.research-card {
  display: block;
  border: none;
  border-radius: 12px;
  height: 100%;
  background-color: linear-gradient(90deg, var(--bgc) 30%, transparent 100%);
  transition: all 0.25s ease;
  text-decoration: none;
  color: var(--vp-c-text-1);
  border-left:  0.5em solid var(--bgc);
  position: relative;
  overflow: hidden;
  z-index: 0; 
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* 兼容 Safari */
}

.research-card::before {
  content: ''; /* 伪元素必需的属性 */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* 这是关键：创建从左到右的渐变 */
  /* 从品牌色开始，到 60% 的位置完全变为透明 */
  background: linear-gradient(90deg, var(--bgc) 30%, transparent 100%);

  /* 初始状态：完全透明，把它隐藏起来 */
  opacity: 0.1;
  
  /* 动效：让 opacity 的变化在 0.3 秒内平滑过渡 */
  transition: opacity 0.3s ease-in-out;
  
  /* 确保伪元素在内容下方，不会遮挡文字和图标 */
  z-index: -1; 
}

.research-card:hover::before {
  /* 鼠标悬停时，将伪元素的透明度从 0 变为 0.15 */
  /* 这个值可以调整，0.15 是一个比较柔和、不刺眼的效果 */
  opacity: 0.3;
  animation: breathopa 5s 0s ease-out infinite;
}

.research-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px var(--vp-c-bg-soft-down);
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