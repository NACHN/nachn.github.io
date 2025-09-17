<!-- docs/.vitepress/theme/WrapLayout.vue -->
<script setup>
import { useRoute } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const route = useRoute()
</script>

<template>
  <!-- 
    Vue 的 <Transition> 组件包裹了整个布局。
    我们使用 route.path 作为 key，这是触发过渡的关键。
    当页面切换时，route.path 改变，Vue 会认为这是一个
    全新的组件，从而触发进入和离开的动画。
  -->
  <Transition name="fade-slide-y" mode="out-in">
    <div :key="route.path">
      <Layout>
        <!-- 
          在这里，我们可以把你之前在 index.ts 中定义的所有插槽
          都原封不动地传递给 DefaultTheme.Layout，
          这样就不会破坏你现有的背景和评论区功能。
        -->
        <template #layout-bottom>
          <slot name="layout-bottom" />
        </template>
        <template #doc-after>
          <slot name="doc-after" />
        </template>
        <!-- 你可以继续传递其他需要的插槽 -->
      </Layout>
    </div>
  </Transition>
</template>