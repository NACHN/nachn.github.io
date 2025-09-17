<!-- docs/.vitepress/theme/IconsBg.vue -->
<script setup>
import { onMounted, ref } from 'vue';

// 1. 你的核心图标列表
const baseIcons = [
  '/web.svg',
  '/web-light.svg',
];

// 2. 定义我们想要在屏幕上显示的总图标数量
const totalIcons = 256; // 想要总共显示 20 个漂浮图标

const floatingItems = ref([]);

onMounted(() => {
  const items = [];
  for (let i = 0; i < totalIcons; i++) {
    // 3. 循环生成每一个漂浮物
    
    // 从核心图标列表中随机选择一个图标
    const iconSrc = baseIcons[i % baseIcons.length];

    // 4. 为每个实例生成高度随机化的样式
    const size = Math.random() * 100 + 20; // 尺寸在 20px 到 80px 之间，让尺寸差异更明显
    const opacity = Math.random() * 0.05 + 0.05; // 透明度在 0.05 到 0.15 之间
    const blur = Math.random() > 0.5 ? Math.random() * 5 : 2; // 50% 的几率给图标加上一点模糊效果

    items.push({
      id: i,
      src: iconSrc,
      style: {
        '--size': `${size}px`,
        '--initial-top': `${Math.random() * 100}%`,
        '--initial-left': `${Math.random() * 100}%`,
        '--animation-duration': `${Math.random() * 30 + 20}s`, // 持续时间 20-50s
        '--animation-delay': `${Math.random() * -30}s`, // 延迟范围更广
        'opacity': opacity,
        'filter': `blur(${blur}px)`, // 应用模糊
      }
    });
  }
  floatingItems.value = items;
});
</script>

<template>
  <div class="floating-icons-bg">
    <img
      v-for="item in floatingItems"
      :key="item.id"
      :src="item.src"
      class="floating-icon"
      :style="item.style"
      alt=""
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
.floating-icons-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: -1; /* 确保背景在最底层 */
}

.floating-icon {
  position: fixed;
  display: block;
  width: var(--size);
  height: var(--size);
  top: var(--initial-top);
  left: var(--initial-left);

  /* 定义动画 */
  animation: float var(--animation-duration) var(--animation-delay) ease infinite;
  
  /* 初始透明度，可以根据喜好调整 */
  opacity: 0.15;
}

/* 为暗色模式调整透明度 */
.dark .floating-icon {
  opacity: 0.1;
}

/* 定义漂浮动画的关键帧 */
@keyframes float {
  0% {
    transform: translateY(0px) scale(2.0);
  }
  25% {
    transform: translateY(20px) translateX(20px) scale(1.4);
  }
  50% {
    transform: translateY(-20px) scale(1.8);
  }
  75% {
    transform: translateY(20px) translateX(-20px) scale(1.6);
  }
  100% {
    transform: translateY(0px) scale(2.0);
  }
}
</style>