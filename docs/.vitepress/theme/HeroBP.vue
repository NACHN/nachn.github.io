<!-- docs/.vitepress/theme/HeroBP.vue -->
<script setup>
import BoardingPass from './BoardingPass.vue';
</script>

<template>
    <a href="/resume#main">
  <div class="hero-boarding-pass-wrapper">
    <!-- BoardingPass 组件现在总是在这里，但它的父容器会控制它的可见性 -->
    <BoardingPass />
  </div>
  </a>
</template>

<style scoped>
.hero-boarding-pass-wrapper {
  /* [关键] 默认情况下，在小屏幕上隐藏 */
  display: none;
    width:960px;
}

/* [关键] 使用媒体查询，只在屏幕宽度大于 1250px 时才显示它 */
@media (min-width: 1250px) {
  .hero-boarding-pass-wrapper {
    /* 或者 flex, grid, 如果你需要更复杂的对齐 */
    display: block; 
  }
}
</style>