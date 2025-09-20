<!-- docs/.vitepress/theme/ToolShowcase.vue (Upgraded with useData) -->
<script setup>
import { ref } from 'vue';
import { useData } from 'vitepress'; // 1. 导入 useData
import ResearchCard from './ResearchCard.vue';

// 2. 直接通过 useData 获取 frontmatter
const { frontmatter } = useData();

// 将数据从 frontmatter 中解构出来，方便模板中使用
const software = frontmatter.value.tools;
const tutorials = frontmatter.value.tool_tutorials;

// Tab 切换的逻辑保持不变
const activeTab = ref('software');
</script>

<template>
  <div class="tool-showcase-container">
    <!-- Tab 按钮 (保持不变) -->
    <div class="tool-tabs">
      <button
        class="tab-button"
        :class="{ active: activeTab === 'software' }"
        @click="activeTab = 'software'"
      >
        软件本体
      </button>
      <button
        class="tab-button"
        :class="{ active: activeTab === 'tutorials' }"
        @click="activeTab = 'tutorials'"
      >
        软件教程
      </button>
    </div>

    <!-- Tab 内容 -->
    <div class="tool-card-grid">
      <!-- 软件本体卡片 -->
      <div v-show="activeTab === 'software'">
        <div class="card-grid1">
          <!-- 3. 直接使用从 useData 获取的 software 数组 -->
          <ResearchCard
            v-for="item in software"
            :key="item.title"
            :icon="item.icon"
            :title="item.title"
            :details="item.details"
            :link="item.link"
            :bgColor="item.bgColor"
          />
        </div>
      </div>

      <!-- 软件教程卡片 -->
      <div v-show="activeTab === 'tutorials'">
        <div class="card-grid2">
          <!-- 4. 直接使用从 useData 获取的 tutorials 数组 -->
          <ResearchCard
            v-for="item in tutorials"
            :key="item.title"
            :icon="item.icon"
            :title="item.title"
            :details="item.details"
            :link="item.link"
            :bgColor="item.bgColor"
          />
          <div v-if="!tutorials || tutorials.length === 0" class="card-grid-placeholder">
            相关教程正在精心筹备中...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
/* 这里是组件的专属样式，不会污染全局 */
.tool-showcase-container {
  margin-top: 32px;
}

.tool-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.tab-button {
  border: none;
  background: none;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.5s ease;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  
}

.tab-button:hover {
  color: var(--vp-c-text-1);
}

.tab-button.active {
  color: var(--vp-c-text-1);
  border-bottom-color: var(--vp-c-brand-3);
  background: linear-gradient(0deg, var(--vp-c-brand-3) 0%, transparent 20%);
  text-shadow: 0px 0px 5px var(--vp-c-brand-3);
}

.card-grid1 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.card-grid2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.card-grid-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 150px;
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  grid-column: 1 / -1; /* 让占位符占据整行 */
}
</style>