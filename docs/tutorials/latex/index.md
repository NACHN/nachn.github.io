---
title: "LaTeX 交互式教程"
date: 2025-09-15
next:
  text: '第一课：LaTeX基础入门'
  link: '/tutorials/latex/latex-tutorial-01'
items:
  - icon: '✒️'
    title: '基础入门'
    details: '从零开始写公式。学习 `$` 与 `$$` 的区别，掌握 `{}` 分组、分数 `\frac`、根号 `\sqrt`、上下标 `^/_` 等最核心的语法，写下你的第一个公式。'
    link: '/tutorials/latex/latex-tutorial-01'
    bgColor: '#81a303'
  - icon: '🔡'
    title: '结构之美'
    details: '矩阵、多行公式与分段函数。从单个公式到结构化表达式的飞跃。学习使用 `matrix`、`align`、`cases` 等“环境”，轻松创建矩阵、多行推导与分段函数。'
    link: '/tutorials/latex/latex-tutorial-02'
    bgColor: '#81a303'
  - icon: '📜'
    title: '精益求精'
    details: '括号、间距与文本装饰。让你的公式不仅正确，而且美观。学习 `\left\right` 智能括号、`\mathbb` 等专业数学字体、精细的间距控制以及 `\vec` 等符号装饰。'
    link: '/tutorials/latex/latex-tutorial-03'
    bgColor: '#81a303'
  - icon: '🚩'
    title: '文章之始'
    details: '踏入 Overleaf 的大门！我们将引导你创建第一个项目，理解文档的基本结构（导言区、正文区），并首次在真实环境中使用 `\newcommand` 自定义命令。'
    link: '/tutorials/latex/latex-tutorial-04'
    bgColor: '#eb6d07'
  - icon: '🔧'
    title: '模板大观'
    details: '学习利用 Overleaf 庞大的模板库（如 IEEE, ACM 等），秒速开启一篇符合期刊或会议要求的专业论文写作，真正实现内容与样式的分离。'
    link: '/tutorials/latex/latex-tutorial-05'
    bgColor: '#eb6d07'
  - icon: '📊'
    title: '图文并茂'
    details: '掌握在论文中插入和引用图片与表格的专业技巧。学习 `figure`、`table` 环境以及 `\caption`、`\label` 和 `\ref` 的自动化引用魔法。'
    link: '/tutorials/latex/latex-tutorial-06'
    bgColor: '#eb6d07'
  - icon: '📖'
    title: '学术基石'
    details: '精通 LaTeX 的终极武器：全自动的交叉引用（公式、章节）与 BibTeX 参考文献管理。从此告别手动调整格式和编号。'
    link: '/tutorials/latex/latex-tutorial-07'
    bgColor: '#eb6d07'
  - icon: '🔎'
    title: '学习资源'
    details: '一份为你准备的资源清单，内容涵盖官方文档、本地环境搭建（TeXstudio）、中文 `ctex` 支持，以及如何善用 AI 助手作为你的私人 LaTeX 导师。'
    link: '/tutorials/latex/latex-tutorial-08'
    bgColor: '#eb6d07'
aside: false

---

<h1 style="text-align:center;">交互式 LaTeX 完全入门：从公式到论文</h1>

还在为 Word 里排版数学公式而头疼吗？还在手动调整参考文献的格式吗？

欢迎来到 $\LaTeX$ 的世界！$\LaTeX$ 是全球学术界公认的科技写作与排版的黄金标准。它能让你从繁琐的格式调整中解放出来，专注于内容本身，创作出排版完美且专业的文档。

这个系列教程最大的特色就是**交互式**。你无需在本地安装任何东西，可以直接在网页的编辑器中修改代码，并实时看到渲染效果。我们将带你走过一段完整的旅程：从写下第一个简单的公式，到最终能够使用 Overleaf 独立撰写一篇结构完整、图文并茂、引用规范的学术论文。

这是一个一个可以直接操作的实时演练场。在修改左侧代码的时候，右侧就会实时变化。

<LatexPG initialCode="e^{i\pi} + 1 = 0" />

**试试这些操作：**
*   **修改变量**：将 `\pi` 改为 `\theta`，看看公式如何变化。
*   **替换命令**：将 `e^{i\pi}` 整个替换为 `\frac{a}{b}`，体验一下分数的效果。
*   **不破不立**：试着删掉一个花括号 `}`，观察预览区的反应。如果出错了可以`Ctrl`+`Z`撤销操作。

是不是很简单直观？我们整个**基础篇**的每一节都配有这样的交互式练习，确保你真正上手。下面，就是我们为你规划的完整学习路线图。

## 学习路线图

整个学习过程分为两大核心部分，助你从零开始，逐步成长为 LaTeX 高手。

*   **第一部分：精通 LaTeX 数学语言 (前三章)**
    > 对应下方 **绿色** 卡片。这部分是所有科技工作者的必备技能。你将掌握编写任何复杂数学公式的核心语法。

*   **第二部分：Overleaf 实战写作 (后五章)**
    > 对应下方 **橙色** 卡片。这部分将带你进入真实的科研写作场景，学习使用 Overleaf 平台，从零开始撰写一篇结构完整的专业论文。

在开始之前，特别强调的是：**前三章学习的公式语法，其价值远超 LaTeX 本身**。它已经成为一种通用标准，被广泛应用于：

*   **绘图工具**，如 `draw.io` / `diagrams.net`
*   **Markdown 编辑器**，如 Typora, VS Code, Obsidian（我很推荐使用这个做笔记，后期也许可以进阶到logseq）
*   **在线平台**，如知乎、博客园、各类技术论坛

这意味着**一次学习，处处受益**！无论你是否需要撰写完整的论文，掌握这部分内容都将极大地提升你的日常工作与学习效率。

现在，请从下面你感兴趣的卡片开始你的学习之旅吧！如果你是第一次接触，我建议你按照顺序，一节一节地探索。

<ResearchIndex />

---

让我们一起开启这段高效、专业且充满创造乐趣的 $\LaTeX$ 之旅！
