---
title: "飞行动力学工具与资源"
date: 2025-11-03
prev:
  text: '返回教程首页'
  link: '/tutorials/6dof/'
items:
  - icon: '/icons/JSB.png'
    title: 'JSBSim'
    details: '工业级的 C++ 开源引擎，通过 XML 定义飞机模型。高保真、跨平台，是著名模拟器 FlightGear 的核心之一。'
    link: 'https://github.com/JSBSim-Team/jsbsim'
    bgColor: '#37474F' # 深蓝灰色
  - icon: '/icons/NASA.svg'
    title: 'NASA GTM'
    details: 'NASA 官方发布的高保真运输机模型，常用于 MATLAB/Simulink 环境，是验证新型控制算法的权威行业基准。'
    link: 'https://www.nasa.gov/larc/generic-transport-model/'
    bgColor: '#0B3D91' # NASA 蓝
  - icon: '/icons/openap.svg'
    title: 'OpenAP'
    details: '基于 Python 的飞机性能与航迹优化库，它实现了类似 BADA 的性能模型，专注于快速评估燃油消耗与飞行剖面。'
    link: 'https://github.com/massimocavaliere/openap'
    bgColor: '#C20000' # OpenAP 图标
  - icon: '/icons/eurocontrol.svg'
    title: 'Eurocontrol BADA'
    details: '欧洲空中航行安全组织发布的飞机性能数据库。是空中交通管理（ATM）和航迹预测领域的行业标准数据源。'
    link: 'https://www.eurocontrol.int/model/bada'
    bgColor: '#2990EA' # 中性、权威的石板灰
---

# 从理论到代码：主流飞行动力学工具与资源

当你完成了理论学习，渴望将知识付诸实践时，开源社区和行业机构已经为你铺好了道路。下面是几款业界和学术界广受欢迎的**软件库、模型和数据库**，它们是连接理论与应用的坚实桥梁。

<!-- ResearchIndex 组件会自动读取上面的 items 并渲染 -->
<ResearchIndex />

### 如何选择？

这里的每一个资源都有其独特的应用场景：

- **JSBSim**: 如果你想从底层**构建一个高保真的六自由度飞行模拟器**，这是你的首选。它关注的是飞机瞬时的动态响应。
- **NASA GTM**: 如果你的研究需要一个**公认的、高保真的基准模型**来验证先进的飞行控制或估计算法，GTM 是不二之选。
- **OpenAP / BADA**: 如果你的研究领域是**宏观的航迹预测、空中交通管理或飞行性能分析**，那么 BADA 提供了行业标准的数据基础，而 OpenAP 则是实践这些模型的一个优秀开源工具。

希望这份清单能为你从理论走向实践的道路，提供一张更清晰、更全面的地图。