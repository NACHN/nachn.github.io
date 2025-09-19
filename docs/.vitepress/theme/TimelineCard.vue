<!-- docs/.vitepress/theme/TimelineCard.vue -->
<script setup>
defineProps({
    title: String,
    details: String,
    link: String,
    icon: String,
    bgColor: String,
    lineColor: String, // 用于地铁线的颜色
});
</script>

<template>
    <div class="timeline-item">
        <div class="station-marker" :style="{ '--line-color': lineColor }">
            <div class="station-icon"></div>
        </div>
        <div class="timeline-content">
            <a :href="link" class="content-wrapper" :style="{ '--bgc': bgColor }">
                <h3 v-if="title" class="title">{{ icon }}{{ title }}</h3>
                <p v-if="details" class="details">{{ details }}</p>
            </a>
        </div>
    </div>
</template>

<style scoped>
.timeline-item {
    display: flex;
    position: relative;
    padding-bottom: 40px;
}

.station-marker {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    margin-right: 24px;
}

/* 地铁主线 */
.station-marker::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: calc(100% + 28px);
    background-color: var(--line-color);
}

.timeline-item:last-child .station-marker::before {
    display: none;
    /* 最后一个站点下方不需要线 */
}

.station-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: var(--vp-c-bg);
    border: 4px solid var(--line-color, var(--vp-c-brand-1));
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    transition: transform 0.25s ease;
}

.station-icon::before {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--vp-c-bg);
}

.timeline-item:hover .station-icon {
    transform: scale(1.1);
    color: white;

}

.timeline-item:hover .station-icon::before {
    transform: scale(1.1);
    color: white;
    animation: breath 1s 0s infinite;
}

@keyframes breath {
    0% {
        background-color: var(--vp-c-bg);
    }

    10% {
        background-color: #bbee2d;
        box-shadow: 0px 0px 20px #00f128;
    }

    40% {
        background-color: #bbee2d;
        box-shadow: 0px 0px 20px #00f128;
    }

    50% {
        background-color: var(--vp-c-bg);
    }

    100% {}
}

.timeline-content {
    flex-grow: 1;
}

.content-wrapper {
    display: block;
    background-color: linear-gradient(90deg, var(--bgc) 30%, transparent 100%);
    ;
    padding: 0px;
    border-radius: 0px;
    text-decoration: none;
    color: inherit;
    height: auto;
    /* 初始高度自动 */
    transition: all 0.25s ease;
}

.content-wrapper:hover {
    background-color: var(--vp-c-bg-soft-up);
    transform: translateY(-3px);
    box-shadow: var(--vp-shadow-2);
    color: var(--bgc, --vp-c-text-1);
}

.content-wrapper::before {
    content: '';
    /* 伪元素必需的属性 */
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    opacity: 0.1;

    transition: opacity 0.3s ease-in-out;

    z-index: -1;
}

.content-wrapper:hover::before {
    /* 鼠标悬停时，将伪元素的透明度从 0 变为 0.15 */
    /* 这个值可以调整，0.15 是一个比较柔和、不刺眼的效果 */
    opacity: 0.5;
    border-radius: 50%;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    box-shadow: 0px 0px 20px linear-gradient(90deg, var(--bgc) 30%, transparent 100%);
    background: linear-gradient(90deg, var(--bgc) 0%, transparent 50%);
    filter: blur(10px);
    animation: breathopa 5s 0s ease-out infinite;
}

.title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
    border: none;
    padding: 0;
    line-height: 1.4;
}

.details {
    margin: 8px 0 0;
    color: var(--vp-c-text-2);
    font-size: 0.95rem;
    line-height: 1.6;
    /* 默认隐藏，hover时展开 */
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 0.4s ease-out, opacity 0.4s ease-out, margin-top 0.4s ease-out;
}

.timeline-item:hover .details {
    max-height: 100px;
    /* 给一个足够大的值来展开 */
    opacity: 1;
    margin-top: 12px;
}
</style>