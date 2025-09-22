---
title: "让代码跑起来"
date: 2025-09-22
---

# 附录：为你的 AI 项目建立独立“车库” - Conda 与虚拟环境简介

恭喜你完成了核心主线教程！你现在拥有了一套功能完备的 Python 科研环境。目前，我们所有的库（`numpy`, `pandas` 等）都安装在同一个“大仓库”里，我们称之为**全局环境 (Global Environment)**。

对于入门来说，这完全足够了。但当你开始处理更复杂的、多个不同的项目时，一个潜在的“噩梦”正在悄悄逼近。

## 1. “噩梦”场景：依赖冲突

想象一下这两个场景：

*   **场景一：复现旧论文**
    你找到了两年前一篇顶会论文的开源代码，想复现它的结果。但代码的 `requirements.txt` 文件里写着，它必须在 `tensorflow==1.15` 这个旧版本下运行。而你为了学习最新的 AI 技术，已经在你的全局环境里装了 `tensorflow==2.10`。如果你卸掉新的装旧的，你自己的新项目就跑不起来了。怎么办？

*   **场景二：团队协作**
    你和师兄合作一个项目。你本地的 `pandas` 版本是 `2.0`，而师兄用的是 `1.5`。某天，你用了一个只有 `2.0` 版本才有的新函数，把代码发给师兄，他的电脑上立刻报错。你们花了一下午才找到这个微小的版本差异。

这些问题，都指向同一个根源：**所有项目共享一个环境，导致库的版本互相干扰**。我们称之为**依赖冲突**。

## 2. 解决方案：虚拟环境 (Virtual Environments)

为了解决这个问题，社区提出了一个绝妙的概念：**虚拟环境**。

你可以把你的电脑想象成一栋大楼。全局环境就像是这栋楼的**公共大厅**。而虚拟环境，就像是为**每一个项目**，在这栋楼里单独开辟一个**带门禁的、独立的房间**。

*   每个“房间”内部，都可以安装自己专属的 Python 版本和各种库，版本完全独立。
*   项目 A 的房间里装 `tensorflow-1.15`，项目 B 的房间里装 `tensorflow-2.10`，它们互不干扰，岁月静好。

当你需要为某个项目工作时，你只需要“刷卡进入”对应的房间（激活环境），就可以使用那套专属的工具了。

## 3. Conda：你的“房间”管理员

**Conda** 就是市面上最强大、最流行的“房间管理员”之一。它是一个开源的包管理和环境管理系统，尤其受到科研和数据科学界的青睐。

我们将使用 **Miniconda**，它是 Conda 的一个轻量级安装程序。

### **第一步：安装 Miniconda**

<ResearchCard 
  :key="'Miniconda官网'"
  :icon="'/icons/conda.svg'"
  :title="'Miniconda 官方文档与下载'"
  :details="'轻量、纯净的 Conda 环境管理器。推荐从此下载。'"
  :link="'https://docs.conda.io/en/latest/miniconda.html'"
  :bgColor="'#44A833'"
/>

访问上述链接，下载对应你操作系统的最新版 Miniconda 安装包，然后像安装普通软件一样完成安装。在安装过程中，如果询问是否将 Conda 初始化，请选择“是 (Yes)”。

安装完成后，重新打开你的命令行 (PowerShell/Terminal)，你应该会看到提示符前面出现了一个 `(base)` 的字样。这表示你正处于 Conda 的“基础”环境中。

### **第二步：Conda 核心四连**

Conda 的日常使用，你只需要记住四个核心命令：

1.  **创建环境**
    假设我们要为一个新的深度学习项目创建一个环境，并指定使用 Python 3.10：
    ```bash
    conda create -n deep-learning-project python=3.10
    ```
    *   `create`: 创建命令
    *   `-n`: name 的缩写，后面跟着你的环境名称 `deep-learning-project`
    *   `python=3.10`: 指定这个环境里 Python 的版本

2.  **激活环境**
    创建完成后，我们需要“进入”这个房间：
    ```bash
    conda activate deep-learning-project
    ```
    你会看到命令行提示符前面的 `(base)` 变成了 `(deep-learning-project)`。

3.  **在环境中安装包**
    现在，你在这个环境里安装的所有东西，都只属于这个“房间”：
    ```bash
    conda install numpy pandas tensorflow
    # 或者也可以继续使用 pip
    # pip install numpy pandas tensorflow
    ```

4.  **退出环境**
    当你完成了这个项目的工作，想回到“公共大厅”时：
    ```bash
    conda deactivate
    ```
    提示符会从 `(deep-learning-project)` 变回 `(base)`。

---
**附赠命令：**
*   `conda env list`: 查看你创建的所有“房间”列表。
*   `conda remove -n deep-learning-project --all`: 删除整个环境（删房间）。
---

## 4. 在 VS Code 中使用 Conda 环境

VS Code 与 Conda 的集成本身就非常出色。当你用 Conda 创建了新环境后，只需要：

1.  在 VS Code 中打开你的项目文件夹。
2.  按下 `Ctrl + Shift + P` (Windows) 或 `Cmd + Shift + P` (macOS) 打开命令面板。
3.  输入 `Python: Select Interpreter`。
4.  在弹出的列表中，VS Code 会**自动检测**到你用 Conda 创建的所有环境！你只需要选择 `deep-learning-project` 那个即可。

之后，VS Code 的所有操作（运行、调试、终端）都会自动在这个指定的 Conda 环境中进行了。

## 总结

现在，你不仅掌握了让代码跑起来的基础技能，更学会了如何为你的项目构建一个**干净、独立、可复现**的专业环境。

养成“为每个项目创建一个专属虚拟环境”的习惯，将是你从编程新手迈向专业开发者的重要一步。它会在未来的科研道路上，为你省去无数排查环境问题的烦恼。