<!-- docs/.vitepress/theme/BackToTop.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 1. 创建一个响应式变量来控制按钮的可见性
const isVisible = ref(false);

// 2. 定义一个函数来检查滚动位置
const handleScroll = () => {
  // 当用户垂直滚动超过 300 像素时，显示按钮
  if (window.scrollY > 300) {
    isVisible.value = true;
  } else {
    isVisible.value = false;
  }
};

// 3. 定义一个函数来平滑滚动到页面顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 这就是平滑滚动的关键
  });
};

// 4. 在组件挂载时添加滚动事件监听器
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// 5. 在组件卸载时移除监听器，防止内存泄漏
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <!-- 
    使用 <Transition> 组件为按钮的出现和消失添加淡入淡出效果
    当 isVisible 变为 true 时，按钮会平滑地出现
  -->
  <Transition name="fade">
    <button v-if="isVisible" class="back-to-top" @click="scrollToTop" aria-label="Back to top" title="Back to top">
      <svg viewBox="0 0 50 50" version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" overflow="inherit">
        <path fill="currentColor"
          d="M48.049 36.31c.523.169.951-.142.951-.692v-3.494c0-.55-.387-1.23-.859-1.512l-18.282-10.895c-.472-.281-.859-.962-.859-1.511v-12.206c0-.55-.168-1.417-.374-1.928 0 0-1.091-2.708-3-3.01-.204-.036-.411-.062-.619-.062h-.01c-.241-.002-.479.028-.713.072l-.216.048-.328.102c-1.588.53-2.406 2.835-2.406 2.835-.184.519-.334 1.393-.334 1.943v12.206c0 .55-.387 1.23-.859 1.512l-18.282 10.894c-.472.282-.859.962-.859 1.512v3.494c0 .55.428.861.951.691l18.098-5.875c.523-.169.951.142.951.692v9.533c0 .55-.36 1.271-.8 1.601l-2.4 1.802c-.44.33-.8 1.051-.8 1.601v2.337c0 .55.433.876.961.724l6.075-1.745c.528-.152 1.394-.152 1.922 0l6.081 1.745c.528.152.961-.174.961-.724v-2.338c0-.55-.36-1.271-.8-1.601l-2.4-1.802c-.439-.33-.8-1.051-.8-1.601v-9.533c0-.55.428-.861.951-.691l18.098 5.876z" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top {
  /* 定位 */
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  /* 确保在顶层 */

  /* 尺寸和形状 */
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin:20px;
  padding: 20px;
  /* 圆形按钮 */

  /* 外观 */
  background-color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  /* 内容对齐 */
  display: flex;
  justify-content: center;
  align-items: center;

  /* 交互效果 */
  transition: all 0.3s ease;
  color: var(--vp-c-text-2);
}

.back-to-top:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  border-color: var(--vp-c-brand-1);
}

.icon {
  width: 24px;
  height: 24px;
  /* 
    如果你的 SVG 是黑色的，在暗色模式下可能看不清。
    这个 filter 会在暗色模式下把它变成白色。
  */
}

.dark .icon {
  filter: invert(1);
}

/* 定义 Vue <Transition> 的动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>