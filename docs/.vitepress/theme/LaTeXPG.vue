<!-- docs/.vitepress/theme/LaTeXPG.vue -->
<script setup>
import { ref, watch, nextTick, computed } from 'vue';

const props = defineProps({
    initialCode: {
        type: String,
        default: `E = mc^2`
    }
});

const editorInput = ref(props.initialCode);
const previewRef = ref(null);

// 这个计算属性是所有魔法发生的地方
const formattedLatex = computed(() => {
    const input = editorInput.value.trim();
    if (!input) return '';

    // 1. 检查用户是否自己输入了块级公式或标准的行内公式，如果是，直接使用
    if ((input.startsWith('$$') && input.endsWith('$$')) ||
        (input.startsWith('\\[') && input.endsWith('\\]')) ||
        (input.startsWith('\\(') && input.endsWith('\\)'))) {
        return input;
    }

    // 2. 【核心】检查用户是否输入了 '$...$' 格式的行内公式
    //    (并且要排除 '$' 本身就是块级公式一部分的情况)
    if (input.startsWith('$') && input.endsWith('$') && !input.startsWith('$$')) {
        // 提取中间的 LaTeX 代码
        const coreLatex = input.substring(1, input.length - 1);
        // 转换为 MathJax 默认支持的格式
        return `\\(${coreLatex}\\)`;
    }

    // 3. 如果用户没有输入任何分隔符，我们来自动添加
    //    如果包含换行符，认为是块级公式
    if (input.includes('\n')) {
        return `$$${input}$$`;
    }

    // 4. 【核心】默认情况下，自动包裹成 MathJax 默认支持的行内公式格式
    return `\\(${input}\\)`;
});


const renderMath = async () => {
    await nextTick();
    if (window.MathJax && previewRef.value) {
        try {
            previewRef.value.innerHTML = formattedLatex.value;
            await window.MathJax.typesetPromise([previewRef.value]);
        } catch (err) {
            console.error('MathJax typesetting error:', err);
        }
    }
};

watch(editorInput, renderMath, { immediate: true });
</script>

<template>
    <div class="latex-editor-container">
        <div class="editor-pane">
            <textarea v-model="editorInput" class="latex-textarea" placeholder="Type your LaTeX code here..."
                spellcheck="false"></textarea>
        </div>
        <div class="preview-pane">
            <div class="preview-header">实时预览 (Live Preview)</div>
            <!-- 关键改动在这里 -->
            <div class="latex-preview" ref="previewRef">
                <!-- 
          我们不再使用 v-html。
          直接把包含 $$ 的完整字符串放在这里。
          Vue 的响应性会更新它，然后我们的 watch 会触发渲染。
        -->
                {{ editorInput }}
            </div>
        </div>
    </div>
</template>

<style scoped>
/* 你的 CSS 样式保持不变，它们很棒！ */
.latex-editor-container {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    overflow: hidden;
    margin: 20px 0;
    min-height: 150px;
}

.editor-pane,
.preview-pane {
    flex: 1;
    min-width: 300px;
    display: flex;
    flex-direction: column;
}

.editor-pane {
    border-right: 1px solid var(--vp-c-divider);
}

.latex-textarea {
    flex-grow: 1;
    padding: 12px;
    border: none;
    outline: none;
    resize: vertical;
    font-family: 'Consolas', monospace;
    font-size: 14px;
    background-color: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
}

.preview-pane {
    background-color: var(--vp-c-bg);
}

.preview-header {
    font-weight: 600;
    padding: 8px 12px;
    background-color: var(--vp-c-bg-soft);
    border-bottom: 1px solid var(--vp-c-divider);
    font-size: 0.9em;
    color: var(--vp-c-text-2);
}

.latex-preview {

    text-align: center;
    padding: 0px;
    font-size: 1.5em;
    /* 放大预览效果 */
    overflow: auto;
}

.status-message {
    padding: 8px 12px;
    color: var(--vp-c-text-2);
    border-top: 1px solid var(--vp-c-divider);
    font-size: 0.85em;
    white-space: pre-wrap;
}

.status-message:not(:empty) {
    color: var(--vp-c-red-1);
}

.latex-preview :deep(mjx-math) {
    margin: 1em;
}

/* 响应式布局：在小屏幕上上下排列 */
@media (max-width: 768px) {
    .latex-editor-container {
        flex-direction: column;
    }

    .editor-pane {
        border-right: none;
        border-bottom: 1px solid var(--vp-c-divider);
    }
}
</style>