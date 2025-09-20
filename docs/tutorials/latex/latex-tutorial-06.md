---
# /tutorials/latex-tutorial-05.md
title: "LaTeX 文章写作"
date: 2025-09-15
---

# 图文并茂：插入图片与创建表格

一篇优秀的学术论文，除了严谨的文字和公式外，通常还需要清晰的图表来展示数据、模型和实验结果。在上一章，我们学会了如何使用模板来搭建论文的骨架。现在，是时候为这个骨架填充血肉了。

本篇教程将教你在 Overleaf 中专业地处理图片和表格，并掌握 LaTeX 最强大的功能之一：**交叉引用 (Cross-referencing)**。

### 1. 插入图片 (Figures)

在 LaTeX 中插入图片，我们通常需要使用 `figure` 环境和 `\includegraphics` 命令。`figure` 环境是一个“浮动体”，LaTeX 会自动为它寻找页面上最佳的放置位置，以获得最好的排版效果。

#### 步骤一：上传图片

![Overleaf 上传](/tutorials/imgs/ol-upload.png) 

首先，你需要将图片文件上传到 Overleaf 项目中。
1.  在左侧的文件列表中，点击 **"Upload" (上传)** 按钮。
2.  选择你要上传的图片文件（支持 `.png`, `.jpg`, `.pdf`, `.eps` 等多种格式）。
3.  为了保持项目整洁，最好将所有图片放在一个专门的文件夹里，比如 `figures` 或 `images`。

#### 步骤二：使用 `figure` 环境

下面是一个插入图片的标准代码结构：

```latex
\begin{figure}[htbp]
    \centering
    \includegraphics[width=0.8\linewidth]{Figure/Default.png}
    \caption{This is a caption}
    \label{fig:my-plot}
\end{figure}
```
![Overleaf 上传](/tutorials/imgs/ol-figure.png) 

让我们来逐行解析这段代码：

*   `\begin{figure}[htbp]`: 开始一个 `figure` 环境。方括号里的 `htbp` 是可选参数，它建议 LaTeX 放置图片的位置优先级：`h` (here, 这里)、`t` (top, 页面顶部)、`b` (bottom, 页面底部)、`p` (page, 单独一页)。通常直接使用 `htbp` 即可。
*   `\centering`: 使图片在页面中水平居中。
*   `\includegraphics[width=0.8\textwidth]{...}`: 这是真正插入图片的命令。
    *   `[width=0.8\linewidth]`: 可选参数，设置图片的宽度为文本宽度的 80%。使用相对宽度 (如`\linewidth`和`\textwidth`) 比使用绝对尺寸（如 `10cm`）更具适应性。
    *   `{Figure/Default.png}`: 图片文件的路径。
*   `\caption{...}`: 为图片添加一个标题。这个标题会自动编号，例如 "Fig. 1. ... "。
*   `\label{...}`: **极其重要！** 为这个图片设置一个唯一的标签（label）。这个标签就是我们在后文中引用它的“锚点”。通常以 `fig:` 作为前缀，方便区分。

### 2. 创建表格 (Tables)

与图片类似，表格也通常被放置在 `table` 浮动环境中。创建表格的核心是 `tabular` 环境。

下面是一个三列表格的标准代码结构：

```latex
\begin{table}[htbp]
    \centering
    \caption{This is a caption of a Table.}
    \label{tab:my-data}
    \begin{tabular}{|l|c|r|} % 用{lcr}去掉所有的竖线，实现最经典的三线表
        \hline
        Name (Left) & Age (Center) & Score (Right) \\
        \hline
        Adam & 20 & 85.5 \\
        Bern & 22 & 92.0 \\
        Charlie & 21 & 78.5 \\
        \hline
    \end{tabular}
\end{table}
```

代码解析：

*   `\begin{table}[htbp]`: 开始一个 `table` 环境，同样支持 `htbp` 参数。
*   `\centering`, `\caption`, `\label`: 与 `figure` 环境中的作用完全相同。注意表格标签通常以 `tab:` 为前缀。
*   `\begin{tabular}{|l|c|r|}`: 开始 `tabular` 环境，这是表格的核心。
    *   `{|l|c|r|}` 定义了表格的列格式：
        *   `l`: 左对齐 (left)
        *   `c`: 居中对齐 (center)
        *   `r`: 右对齐 (right)
        *   `|`: 在列之间添加一条竖线。
*   `\hline`: 添加一条水平线。
*   `... & ... & ... \\`: 在行内，使用 `&` 分隔**列**，使用 `\\` **换行**。这和我们之前学的 `matrix` 环境非常相似。

### 3. 交叉引用：`\ref` 的魔力

为图表添加了 `\label` 后，我们就可以在论文的任何地方引用它们了。这就是交叉引用。

使用 `\ref{}` 命令，并把之前定义的标签放进去：

```latex
As shown in Fig. \ref{fig:my-plot}, one can observe that the author forgot to add a valid figure.

Table \ref{tab:my-data} list the score of three students.
```
![Overleaf refs](/tutorials/imgs/ol-refs.png)


**为什么这如此强大？**
当你添加或删除图表时，LaTeX 会**自动重新计算**所有编号。你引用的“Figure 1”可能会自动变成“Figure 2”，而你完全不需要手动修改任何数字！这彻底避免了手动引用可能导致的各种错误，是 LaTeX 在学术写作中最具魅力的功能之一。

---
现在，你已经掌握了在论文中添加专业图表的全部核心技能。你的论文不再仅仅是文字和公式的集合，而是能够清晰、有力地展示数据的完整作品。

在下一篇教程中，我们将深入探讨学术写作的另一块基石，也是 LaTeX 的终极武器：**参考文献管理**。