---
# /tutorials/latex-tutorial-05.md
title: "LaTeX 文章写作"
date: 2025-09-15
---

# 学术基石：交叉引用与文献管理

欢迎来到实战篇的最后一章！在前面的教程中，我们已经学会了如何构建文档、使用模板、插入图表。现在，我们将学习 LaTeX 学术写作的“灵魂”——自动化参考文献管理和全面的交叉引用系统。

掌握了本章内容，你将彻底告别手动调整参考文献格式、手动更新公式和图表编号的痛苦，将精力完全投入到研究内容本身。

### 1. 全面的交叉引用系统

我们在上一章已经初步接触了 `\ref{}` 来引用图表。实际上，LaTeX 的交叉引用能力远不止于此。我们可以引用文档中的任何带编号的元素，如章节、公式等。

#### 引用章节

首先，在你想要引用的章节标题 `\section{...}` 之后，为它添加一个 `\label`。

```latex
\section{Introduction}
\label{sec:intro}
...
```
然后，你就可以在文中的任何地方通过 `\ref{sec:intro}` 来引用它了。

`如我们在章节 \ref{sec:intro} 中讨论的...` -> "如我们在章节 1 中讨论的..."

#### 引用公式

要引用公式，首先需要将它放置在能自动生成编号的数学环境中，最常用的就是 `equation` 环境。

```latex
\begin{equation}
\label{eq:einstein}
E = mc^2
\end{equation}
```
引用公式时，我们通常希望连同括号一起引用，例如 "(1)"。为此，使用 `\eqref{}` 命令比 `\ref{}` 更为推荐。

`爱因斯坦著名的质能方程 \eqref{eq:einstein} 揭示了...` -> "爱因斯坦著名的质能方程 (1) 揭示了..."

### 2. 文献管理：告别手动格式化

如果你曾手动整理过参考文献列表，你一定知道那有多么痛苦。BibTeX 是 LaTeX 的标准参考文献管理系统，它将**文献内容**与**引用格式**彻底分离，实现了全自动化管理。

#### 步骤一：创建 `.bib` 文件

首先，你需要在 Overleaf 项目中创建一个后缀为 `.bib` 的文件，例如 `references.bib`。这个文件就是你的私人文献数据库。

你可以从 **Google Scholar**、**知网**、**Mendeley** 等学术搜索引擎或文献管理软件中，直接导出 BibTeX 格式的条目，然后粘贴到你的 `.bib` 文件中。

一个典型的 BibTeX 条目如下所示：
```bib
@article{einstein1905,
    author  = {Albert Einstein},
    title   = {Zur Elektrodynamik bewegter Körper},
    journal = {Annalen der Physik},
    volume  = {322},
    number  = {10},
    pages   = {891--921},
    year    = {1905},
}
```
`einstein1905` 是这篇文献的**引用密钥 (Citation Key)**，是我们稍后在正文中引用它的唯一标识。实际上，这个key我们可以自定义，你甚至可以叫abc，我们引用的时候`\cite{abc}`就行。

此外，手打显然太慢了，我推荐的做法是利用[谷歌学术](scholar.google.com)自动生成BibTeX条目。

![BibTeX](/tutorials/imgs/ol-bibtex.png)

可以看到新的标签页会显示这些，我们把它复制，然后添加到我们的bib文件里就行，当然可以把`kingma2014adam`这个key改成`adam`或者你想要的任何名字，只是引用的时候记得`\cite{adam}`
```bib
@article{kingma2014adam,
  title={Adam: A method for stochastic optimization},
  author={Kingma, Diederik P and Ba, Jimmy},
  journal={arXiv preprint arXiv:1412.6980},
  year={2014}
}
```

#### 步骤二：在主文档中设置参考文献

接下来，回到你的 `main.tex` 文件，在文档的末尾（通常是在 `\end{document}` 之前），添加以下两行代码：

```latex
\bibliographystyle{plain} % 1. 设置参考文献的样式
\bibliography{references}   % 2. 指定你的 .bib 文件名 (无需后缀)
```
1.  `\bibliographystyle{...}`: 定义参考文献列表的格式。LaTeX 内置了多种样式，如 `plain` (按字母排序), `unsrt` (按引用顺序), `alpha` (按作者+年份缩写排序) 等。许多期刊模板会提供自己的 `.bst` 样式文件。
2.  `\bibliography{...}`: 告诉 LaTeX 去哪里寻找文献数据。

不过，如果文章已经有（比如我们这个模板）
```latex
\begin{thebibliography}
...
\end{thebibliography}
```
我们可以删除`thebibliography`环境，使用自动的bibtex
```latex
\bibliographystyle{ieeetr}
\bibliography{example}
```
![BibTeX](/tutorials/imgs/ol-final.png)

#### 步骤三：在正文中引用文献 `\cite`

现在，你可以在论文的任何地方，使用 `\cite{}` 命令并填入引用密钥来引用文献了。

```latex
...正如 Einstein 在他的开创性论文 \cite{einstein1905} 中所阐述的。
```
当你编译文档时，LaTeX 会自动完成所有工作：
1.  在引用处生成对应的编号，如 `[1]`。
2.  在文档末尾生成一个格式化好的、标题为 "References" 的参考文献列表。
3.  最重要的是，它**只会列出你在正文中实际引用过的文献**，并自动排序！

---
**系列教程总结**

祝贺你，你已经完成了整个 LaTeX 从入门到实战的系列教程！

你已经从一个只会写 `a^2` 的新手，成长为能够熟练运用 Overleaf 平台，撰写结构完整、图文并茂、引用规范的专业学术文档的合格创作者。你掌握的不仅是一门标记语言，更是一套能陪伴你整个学术生涯的高效工作流。

这只是一个开始。LaTeX 的世界博大精深，还有更多宏包和高级技巧等待你去探索。但现在，你已经拥有了最坚实的基础，足以应对 95% 以上的科研写作需求。

最后一篇是我总结的各种资源和传送门，希望你可以好好利用它们！

<h1>保持好奇，不断练习，祝你在科研的道路上一帆风顺！</h1>
