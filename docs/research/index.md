---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
# 页面的元数据
title: 研究笔记
description: 我学术研究、笔记与发现的精选集。将鼠标悬停在卡片上以获取更多详细信息。
hasBg: true

# 提供给 ResearchIndex.vue 组件的数据
items:
  - icon: '✈️'
    title: '空气动力学'
    details: '研究流体动力学、翼型剖面和计算仿真，以提高飞机效率和性能。'
    link: '/research/aerodynamics/wing-design-simulation'
  - icon: '⚙️'
    title: '控制理论'
    details: '专注于状态空间方法、系统稳定性以及复杂动态。'
    link: '/research/control-theory/unscented-kalman-filter'
  - icon: '🤖'
    title: '机器学习'
    details: '谈谈我对人工智能的理解。'
    link: '/research/ml-dl/mlp'
  - icon: '🔢'
    title: '数学分析'
    details: '描述世界的严谨语言。'
    link: '/research/analyze/math'
  - icon: '💻'
    title: '科学计算'
    details: '利用 Julia 和 MATLAB 等高性能计算语言对物理现象进行建模和仿真。'
    link: '/research/scientific-computing/julia-for-dynamics'
---
<ResearchIndex />