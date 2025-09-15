<script setup>
import { onMounted, ref } from 'vue';
import { useData, useRouter } from 'vitepress';

// 获取 VitePress 的站点数据和路由实例
const { site } = useData();
const router = useRouter();

// 定义一个 ref 来控制消息的显示
const message = ref('Checking for an alternate version...');

onMounted(() => {
    // 获取当前页面的相对路径，例如 /en/cs/my-article.html
    const currentPath = window.location.pathname;

    // 获取配置的所有语言前缀，例如 ['/en/', '/jp/']
    const langPrefixes = Object.keys(site.value.locales)
        .map(key => site.value.locales[key].link)
        .filter(link => link && link !== '/'); // 过滤掉默认语言的 '/'

    // 检查当前路径是否以某个语言前缀开头
    const currentLangPrefix = langPrefixes.find(prefix => currentPath.startsWith(prefix));

    if (currentLangPrefix) {
        // 如果是，说明当前在非默认语言页面，尝试回退到默认语言
        // 例如，将 /en/cs/my-article.html 变为 /cs/my-article.html
        const fallbackPath = currentPath.replace(currentLangPrefix, '/');

        // 使用 VitePress 的 router.go() 来检查路径是否存在
        // 如果路径存在，它会导航并返回 true；如果不存在，返回 false
        router.go(fallbackPath).then(found => {
            if (!found) {
                // 如果回退路径也不存在，就显示标准的 404 消息
                message.value = 'Page not found';
            }
            // 如果 found 为 true，页面已经自动跳转了，这里不需要做任何事
        }).catch(() => {
            // 捕获可能发生的错误
            message.value = 'Page not found';
        });
    } else {
        // 如果当前路径不在任何语言前缀下（即在默认语言下），
        // 并且仍然 404，那说明这个页面确实不存在于任何语言中
        message.value = 'Page not found';
    }
});
</script>

<template>
    <div class="NotFound">
        <h1>404</h1>
        <p>{{ message }}</p>
        <a :href="site.base" aria-label="go to home">Take me home</a>
    </div>
</template>

<style scoped>
.NotFound {
    padding: 64px 24px 96px;
    text-align: center;
}

.NotFound h1 {
    font-size: 64px;
    font-weight: 600;
}

.NotFound p {
    font-size: 24px;
    margin-top: 12px;
    margin-bottom: 24px;
    color: var(--vp-c-text-2);
}
</style>