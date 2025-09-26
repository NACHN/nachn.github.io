<script setup>
import { ref } from 'vue'

const searchQuery = ref('')

const doSearch = () => {
  if (searchQuery.value) {
    const url = `https://scholar.google.com/scholar?q=${encodeURIComponent(searchQuery.value)}`
    window.open(url, '_blank')
  }
}

const academicLinks = [
  { name: '谷歌学术', url: 'https://scholar.google.com/', icon: '📚' },
  { name: 'arXiv (预印本)', url: 'https://arxiv.org/', icon: '📄' },
  { name: 'Semantic Scholar', url: 'https://www.semanticscholar.org/', icon: '💡' },
  { name: 'GitHub', url: 'https://github.com/', icon: '💻' },
]
</script>

<template>
  <div class="academic-homepage">
    <div class="search-container">
      <form @submit.prevent="doSearch">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="输入关键词，使用谷歌学术搜索" 
          class="academic-search-input"
        />
        <button type="submit" class="academic-search-button">搜索</button>
      </form>
    </div>

    <h2>常用学术网站</h2>
    <div class="links-grid">
      <a 
        v-for="link in academicLinks" 
        :key="link.name" 
        :href="link.url" 
        target="_blank" 
        rel="noreferrer"
        class="link-card"
      >
        <span class="icon">{{ link.icon }}</span>
        <span class="name">{{ link.name }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
/* 样式与前一个回答中给出的相同，你可以根据需要进行调整 */
.academic-homepage {
  max-width: 1152px;
  margin: 0 auto;
  padding: 40px 24px 60px;
}
/* ... 确保将前一个回答中的所有 <style scoped> 内容粘贴到这里 ... */
.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
}
.search-container form {
  display: flex;
  width: 100%;
  max-width: 600px;
  border: 2px solid var(--vp-c-brand-1);
  border-radius: 8px;
  overflow: hidden;
}
.academic-search-input {
  flex-grow: 1;
  padding: 12px 16px;
  font-size: 1.1em;
  border: none;
  outline: none;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
}
.academic-search-button {
  padding: 12px 20px;
  font-size: 1.1em;
  color: white;
  background-color: var(--vp-c-brand-1);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}
.academic-search-button:hover {
  background-color: var(--vp-c-brand-2);
}
h2 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 30px;
  border-bottom: 1px solid var(--vp-c-divider);
  padding-bottom: 10px;
}
.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}
.link-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.2s, background-color 0.2s, transform 0.2s;
}
.link-card:hover {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-hover-bg);
  transform: translateY(-2px);
}
.link-card .icon {
  font-size: 3em;
  margin-bottom: 10px;
}
.link-card .name {
  font-size: 1.1em;
  font-weight: 600;
}
</style>