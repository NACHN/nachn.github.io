---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
# 页面的元数据
title: 我的研究
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
    details: '专注于状态空间方法、系统稳定性以及复杂动态系统的鲁棒控制器设计。'
    link: '/research/control-theory/unscented-kalman-filter'
  - icon: '📊'
    title: 'QAR数据'
    details: '利用高保真度的 QAR (快速存取记录器) 数据，进行深度的飞行性能分析、异常事件检测与预测性维护建模。'
    link: '/research/QAR/about'
  - icon: '💻'
    title: '科学计算'
    details: '利用 Julia 和 MATLAB 等高性能计算语言对物理现象进行建模和仿真。'
    link: '/research/scientific-computing/julia-for-dynamics'
---
<ResearchIndex />