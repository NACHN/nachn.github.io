---
# /tutorials/latex-tutorial-04.md
title: "LaTeX 文章写作"
date: 2025-09-15
---

# 文章之始：文档结构与自定义命令

欢迎来到实战篇！在前面的三篇教程中，我们已经掌握了 LaTeX 数学公式这门强大的“语言”。理论上我们已经可以在draw.io以及其他markdown编辑器里自由书写数学公式了。

但是我们的目的是写一篇文章，现在，是时候学习如何在一个专业的平台上运用这门语言来“写作”了。

我们的平台选择是 **Overleaf**，它是目前最受欢迎的在线$\LaTeX$编辑器。

### 为什么选择 Overleaf？

*   **零配置**：你不需要在自己的电脑上安装任何复杂的软件。只需要一个浏览器，就可以开始编写专业的 LaTeX 文档。
*   **云端协作**：你的所有文档都保存在云端，可以随时随地访问。与导师、同学的协作也变得前所未有的简单。
*   **实时预览**：你所写的代码会实时编译，在右侧窗口立刻看到最终的 PDF 效果，所见即所得。

本篇教程将引导你完成从注册 Overleaf 到创建你的第一个包含自定义命令的完整 LaTeX 文档。

> 当然也可以下载TeXStudio等软件来本地编译，但是方便起见我们这里用Overleaf

### 1. 注册并创建你的第一个项目

首先，请访问 [Overleaf 官网](https://www.overleaf.com) 并完成注册。

登录后，点击页面左上角的 **创建新项目**，然后选择 **空白项目**。为你的项目命名，例如 "你好，世界"。

![Overleaf 新建项目](/tutorials/imgs/ol-new.png) 

### 2. 认识 Overleaf 界面

创建项目后，你会看到一个经典的三栏式界面：

*   **左侧（文件列表）**: 显示你项目中的所有文件，现在应该只有一个 `main.tex`。
*   **中间（源代码编辑器）**: 这是我们编写 LaTeX 代码的地方。
*   **右侧（实时预览）**: 显示代码编译后的 PDF 效果。

![Overleaf 界面](/tutorials/imgs/ol-main.png) 

### 3. 理解文档的基本骨架

现在，让我们聚焦于中间的编辑器。你会看到一些预设好的代码，这就是一个 LaTeX 文档最基本的骨架：

```latex
\documentclass{article} % 1. 文档类型

% 2. 导言区 (Preamble)
\usepackage[utf8]{inputenc}

\title{Hello, world}
\author{Your Name}
\date{November 2023}

\begin{document} % 3. 正文区开始

\maketitle

\section{Introduction}

This is the introduction. Here is my first formula from the tutorial:
$a^2 + b^2 = c^2$

\end{document} % 4. 正文区结束
```

这正是我们在上一章提到的文档结构！
1.  `\documentclass{article}`：定义这是一篇“文章”。
2.  **导言区**：从 `\documentclass` 到 `\begin{document}` 之间的区域。这里加载了宏包，并定义了标题、作者等信息。
3.  **正文区**：`\begin{document}` 和 `\end{document}` 之间的区域。`\maketitle` 命令会根据导言区的信息生成标题，`\section{...}` 则会创建一个章节标题。

现在，可以试试在 `\section{Introduction}` 下方，写一个你在前面教程中学过的最复杂的公式，看看它是否能在右侧完美显示。

比如
```latex
% 导言区要导入amsmath
\usepackage{amsmath}
%...
% equation环境和$$作用是一样的
\begin{equation}
\dot x=\sin\gamma+g\cos\beta
\end{equation}

$$
\begin{aligned}
a_x&=F\cos\alpha+g\sin\alpha\\
a_y&=F\sin\alpha+g\cos\alpha
\end{aligned}
$$
```
就像这样，可以看到右边公式已经渲染出来了

![Overleaf 插入公式](/tutorials/imgs/ol-04-01.png) 

### 4. `\newcommand` 的实战首秀

还记得我们在理论上学习过的自定义命令吗？现在，我们终于可以在真实的**导言区**中使用它了！

**请在导言区（例如，在 `\date{...}` 之后，`\begin{document}` 之前）添加以下两行代码：**

```latex
% 也许需要先导入amsfonts
\usepackage{amsfonts}
% 自定义命令
\newcommand{\R}{\mathbb{R}}
\newcommand{\pdv}[2]{\frac{\partial #1}{\partial #2}}
```

现在，魔法时刻到了！**在你的正文区（例如，在 `\section{Introduction}` 之后）输入以下内容：**

```latex
The set of real numbers is denoted by $\R$. 
The partial derivative of $f$ with respect to $x$ is $\pdv{f}{x}$.
```

点击编辑器上方的 **"Recompile" (重新编译)** 按钮（或者等待它自动编译）。观察右侧的预览区，你会惊喜地发现，你定义的快捷命令 `\R` 和 `\pdv` 已经成功地转换成了专业、漂亮的数学符号！

这就是 LaTeX 强大效率的体现：**一次定义，处处使用**。

### 5. 添加摘要 (Abstract)

一篇完整的学术文章通常会包含摘要。在 LaTeX 中，我们可以使用 `abstract` 环境来创建它。

**请在 `\maketitle` 之后，`\section{Introduction}` 之前，添加以下代码：**

```latex
\begin{abstract}
This is the abstract of my first article. 
Here, I will demonstrate how to write beautiful math formulas like $\oint_C \mathbf{E} \cdot d\mathbf{l} = - \frac{d\Phi_B}{dt}$.
\end{abstract}
```
如果以上每一步你都跟着一起做了，现在我们的文档看起来会是这样

![Overleaf 结果](/tutorials/imgs/ol-04.png) 

---
**恭喜你！** 你已经成功地在 Overleaf 上创建并编译了你的第一个包含自定义命令的$\LaTeX$文档。你会发现，你只在输入内容，根本不用管格式的问题，居中，加粗，样式变化，$\LaTeX$统统帮我们安排好了。

从此，你不再只是一个会写公式片段的学习者，而是一个真正能够开始写作$\LaTeX$文档的创作者。

在下一篇教程中，我们将探索 Overleaf 真正强大的地方——模板库。我们将学习如何利用现成的专业模板，快速开启一篇符合期刊或会议要求的论文写作。
