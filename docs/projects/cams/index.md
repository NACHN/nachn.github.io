---
# Frontmatter 配置
title: "CaMS"
description: "深入了解 CaMS (Capacity Monte-carlo Simulator) 的设计理念、核心功能与技术实现。这是一个基于事件分离与 Agent-based 建模的 Java 软件，旨在精确分析与模拟机场跑道容量。"
comments: true # 开启评论区，方便交流
---


# CaMS: 一款蒙特卡洛跑道容量仿真软件

<div class="badges" style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem;">
  <img src="https://img.shields.io/badge/Language-Java-informational?style=flat&logo=openjdk&logoColor=white&color=f89820" alt="Language: Java">
  <a href="https://github.com/NACHN/CaMS" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Source_Code-GitHub-blue?style=flat&logo=github&logoColor=white" alt="Source Code: GitHub">
  </a>
</div>

**CaMS (Capacity Monte-carlo Simulator)** 是一款我独立设计并开发的、专注于机场跑道容量分析的蒙特卡洛仿真软件。在全球航空运输需求持续增长的背景下，精确评估和优化跑道容量，对于缓解航班延误、提升空域效率至关重要。本项目旨在解决现有仿真软件（如 SIMMOD, TAAM）在特定场景下适用性有限或运行效率不高的问题，提供一个高度可定制化、仿真结果更逼真的解决方案。

该研究成果已撰写成文，并提交至相关课程汇编。

<!-- 在这里嵌入 PDF 阅读器或提供下载链接 -->
<div class="pdf-viewer-container">
  <embed src="/pdfs/CaMS_Paper.pdf" type="application/pdf" width="100%" height="500px" />
</div>


## 项目背景与动机

机场是空中交通网络的核心节点，而跑道系统则是其最关键的瓶颈。航班延误造成的经济损失逐年攀升，据研究统计，仅在中国，2018年因航班延误造成的经济损失就高达729亿人民币。因此，科学、前瞻性地设计并评估跑道容量，是整个航空系统提效降本的首要前提。

虽然市面上存在如 SIMMOD, TAAM, AirTop 等成熟的空域/机场仿真软件，但它们或基于特定的 FAA 规则限制了普适性，或因运行效率问题不适用于快速迭代分析，或其核心并非专注于跑道容量的精细化估算。

为了更精准地征服跑道仿真这一难题，我提出了 CaMS。它能够精确建立空域结构模型，并以跑道运行配置为核心，对航空器在近进、着陆、脱离、起飞等关键阶段的动态进行仿真，同时支持高度可定制化的航空器性能模型，从而渲染出更贴近现实的仿真结果。

## 软件架构与核心功能

CaMS 基于 Java 开发，其核心设计哲学包含三个主要部分：**界面 (Interface)**、**仿真逻辑 (Simulation Logic)** 和 **环境 (Environment)**。

![CaMS 软件架构图](/projects/cams/Schematic.png)
_图1: CaMS 组件依赖关系示意图_

软件的主界面为用户提供了一个直观、友好的交互环境，主要由四个面板构成：
*   **环境面板 (Environment Panel)**：以树状结构展示当前仿真环境中的所有对象，包括航路点 (Waypoints)、跑道 (Runways) 和航线 (Routes)。
*   **仿真面板 (Simulation Panel)**：用于配置仿真条件，如迭代次数、进离场航线、机型组合，并控制仿真的开始、暂停与速度。
*   **状态面板 (Status Panel)**：实时显示仿真环境的配置信息和运行状态。
*   **地图面板 (Map Panel)**：软件的核心，可视化地呈现跑道构型、空域结构和航空器的实时动态。用户可在此面板上通过直观的交互方式添加和编辑各类对象。

![CaMS 软件主界面截图](/projects/cams/Maininterface.png)
_图2: CaMS 的主界面，展示了四大面板、菜单栏及工具栏_

## 技术实现亮点

*   **基于 Agent 的建模**：每个航空器作为一个独立的 Agent，拥有自身的性能参数（如起飞距离、爬升率、进近速度等）和行为逻辑（导航、着陆、起飞），使得仿真过程更加逼真。
*   **事件驱动的仿真逻辑**：整个仿真过程由一系列离散事件（如进入管制区、到达 FAF 点、着陆、脱离跑道）驱动，保证了仿真逻辑的精确性和高效性。
*   **高度可定制化**：用户可以自定义机队构成、航线结构、导航限制，乃至遵循的尾流间隔标准（软件内置了 CAAC 的标准作为参考），极大地增强了软件的适用性。
*   **数据驱动与可视化**：仿真环境可以保存为 XML 文件，方便重复实验和分享。仿真结果则输出为 CSV 文件，并能在软件内部通过容量包线图 (Envelope Plot)、气泡图 (Bubble Plot) 等形式进行直观的可视化分析。

![包头机场空域仿真环境](/projects/cams/ZBOW.png)
_图3: 在 CaMS 中构建的包头东河机场 (ZBOW) 空域仿真环境_

## 案例研究：包头机场 (ZBOW)

为了验证 CaMS 的有效性，我以包头东河机场 (ZBOW) 的单跑道运行场景为基础，进行了一次完整的案例研究。通过在 CaMS 中构建与官方进近图高度相似的空域模型，并运行大量仿真，我们得到了该机场在特定条件下的容量包线图和气泡图，并对不同机型的跑道出口使用率进行了统计分析。

![容量包线图与气泡图](/projects/cams/Bubble60.png)
_图4: 仿真生成的1小时周期容量包线图与气泡图_

结果表明，仿真数据清晰地反映了进港和离港航班量之间的相互制约关系，并指出了最常被使用的跑道出口，验证了 CaMS 在进行精细化跑道容量分析方面的强大能力。

---

这个项目是我在航空系统容量分析课程中的一次深入实践，它不仅锻炼了我将复杂系统规则转化为软件逻辑的能力，也加深了我对蒙特卡洛方法和基于 Agent 建模思想的理解。