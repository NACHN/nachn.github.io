<!-- docs/.vitepress/theme/GiscusComment.vue -->
<script setup>
import { ref, onMounted, watch } from 'vue';
import { useData } from 'vitepress';

// 获取 frontmatter 和 dark mode 状态
const { frontmatter } = useData();
const { isDark } = useData();

const commentContainer = ref(null);

const loadGiscus = () => {
  if (commentContainer.value) {
    // 清空容器，防止重复加载
    commentContainer.value.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';

    // 从你 Giscus 官网复制的属性
    script.setAttribute('data-repo', 'NACHN/nachn.github.io');
    script.setAttribute('data-repo-id', 'R_kgDOPvv5xw'); // 这个ID很重要
    script.setAttribute('data-category', 'Announcements'); // 你的分类名
    script.setAttribute('data-category-id', 'DIC_kwDOPvv5x84CvkXd'); // 这个ID很重要
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-lang', 'zh-CN');
    script.setAttribute('data-loading', 'lazy');

    // 【核心】根据 VitePress 的暗色模式状态，动态设置 Giscus 主题
    script.setAttribute('data-theme', isDark.value ? 'dark_dimmed' : 'light');

    commentContainer.value.appendChild(script);
  }
};

onMounted(() => {
  // 确保在 frontmatter.comments 为 true 时才加载
  if (frontmatter.value.comments) {
    loadGiscus();
  }
});

watch(isDark, () => {
  // 当主题切换时，也需要检查是否应该显示评论区
  if (frontmatter.value.comments) {
    // nextTick 确保在 DOM 更新后再重新加载 Giscus
    nextTick(loadGiscus);
  }
});
</script>

<template>
  <!-- 只有当 frontmatter.comments 为 true 时，才渲染这个容器 -->
  <div v-if="frontmatter.comments" class="giscus-comment-container">
    <div ref="commentContainer"></div>
  </div>
</template>

<style scoped>
.giscus-comment-container {
  margin-top: 48px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
}
</style>