<!-- docs/.vitepress/theme/CommentPage.vue -->
<script setup>
import DefaultTheme from 'vitepress/theme'
import GiscusComment from './GiscusComment.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <!-- 使用 VitePress 的插槽来在文章内容下方插入评论组件 -->
    <template #doc-after>
      <GiscusComment />
    </template>
  </Layout>
</template>