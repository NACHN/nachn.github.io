---
title: "让代码跑起来"
date: 2025-09-22
---

# 第 4 课：点火！在 VS Code 中复活代码

欢迎来到最后一关！恭喜你，已经成功搭建了一套现代化的“米其林厨房”。你拥有了强大的“驾驶舱” VS Code，连接了高效的 Python “引擎”和“燃料补给系统” Pip。

现在，是时候将所有新技能融会贯通，进行一次终极实战了。我们将完整地重现那个最初的梦想：拿到一段来自 AI 的、带有未知依赖的复杂代码，并在我们的专业环境中，优雅地让它“复活”。

## 1. 新的任务：一个更真实的科研场景

这次，我们向 AI 提出一个更贴近真实科研需求的任务：

> **AI, 请用 Python 帮我读取一份 CSV 数据，并用散点图展示它，最后再拟合一条线性回归线。**

AI 迅速给出了一段代码，其中包含了 `import pandas as pd`, `from sklearn.linear_model import LinearRegression` 等我们之前没见过的库。

```python
# 导入所有需要的库
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# --- 1. 创建并保存一份模拟的 CSV 数据 ---
# 在真实场景中，你会直接读取一个已有的文件
data = {
    'temperature': [20, 22, 25, 27, 30, 31, 32, 34, 35, 38],
    'ice_cream_sales': [150, 165, 200, 230, 270, 280, 295, 320, 330, 360]
}
df = pd.DataFrame(data)
df.to_csv('ice_cream_data.csv', index=False)
print("模拟数据已保存到 ice_cream_data.csv")


# --- 2. 从 CSV 文件中读取数据 ---
# 这是 AI 代码的核心部分
df_read = pd.read_csv('ice_cream_data.csv')

# 准备数据用于拟合
X = df_read[['temperature']] # 需要是 2D 数组
y = df_read['ice_cream_sales']


# --- 3. 训练线性回归模型 ---
model = LinearRegression()
model.fit(X, y)
y_predicted = model.predict(X)


# --- 4. 绘制散点图和回归线 ---
plt.figure(figsize=(10, 6))
plt.scatter(X, y, color='blue', label='实际销售数据')
plt.plot(X, y_predicted, color='red', linewidth=2, label='线性回归拟合')

plt.title('冰淇淋销量与温度的关系')
plt.xlabel('温度 (°C)')
plt.ylabel('销量 (支)')
plt.legend()
plt.grid(True)
plt.show()

print("图表已生成！")
```

## 2. 在 VS Code 中开始项目

我们的工作流现在变得非常清晰和高效：

1.  **打开 VS Code**。
2.  通过 **“文件(File)” -> “打开文件夹(Open Folder...)”**，打开我们之前创建的 `my-project` 文件夹。
3.  在左侧的文件浏览器区域，点击“新建文件”图标，创建一个新文件，命名为 `linear_regression.py`。
4.  将上面那段完整的 AI 代码，**粘贴**到这个新文件中。

<!-- 建议此处配图: VS Code 中新建文件并粘贴代码的截图 -->

## 3. “侦测”并“安装”新的依赖

当你把代码粘贴进去后，VS Code 的 Python 插件可能会在 `pandas` 和 `sklearn` 下方画出波浪线，并提示 `Import "pandas" could not be resolved`。

这正是 IDE 的强大之处！它在**运行前**就告诉我们：“厨房里缺少 `pandas` 和 `sklearn` 这两样新食材！”

现在，我们不再需要去猜了。解决方案就在手边：

1.  在 VS Code 中，打开**集成终端** (菜单栏 “终端(Terminal)” -> “新建终端(New Terminal)”)。
2.  像上一课一样，使用我们强大的“采购员” Pip 来安装这些新“零件”：
    ```bash
    pip install pandas scikit-learn
    ```
    *注意：`sklearn` 库在安装时需要输入 `scikit-learn`。*

3.  等待安装完成。你会发现，安装成功后，VS Code 编辑器里那些恼人的波浪线警告，很快就**自动消失**了。—— 我们的“驾驶舱”实时地更新了状态！

## 4. 点火！见证奇迹的时刻

所有依赖都已就位，是时候执行我们的最终任务了。

**点击编辑器右上角的▶按钮。**

这一次，VS Code 会在下方的终端里，分两步执行代码：
1.  首先，它运行了数据创建部分，并打印出 `模拟数据已保存到 ice_cream_data.csv`。同时，你会惊喜地发现，左侧文件浏览器里**真的出现了一个新文件** `ice_cream_data.csv`！
2.  接着，它运行了数据读取和绘图部分。一个精美的、带有散点和拟合线的图表窗口，会一下弹出来！

<!-- 建议此处配图: 最终弹出的 Matplotlib 图表窗口的截图 -->

**成功了！**

你刚刚完整地经历了次科研的日常：**获取代码 -> 分析依赖 -> 安装环境 -> 成功运行 -> 得到结果**。

## 5. 总结：你已掌握的核心能力

恭喜你，完成了整个系列教程！让我们回顾一下你已经解锁的“超能力”：

*   ✅ **创建与管理代码文件**：你不再为“代码放哪”而困惑。
*   ✅ **驾驭命令行**：你学会了与电脑底层系统进行高效交互。
*   ✅ **解决依赖问题**：`ModuleNotFoundError` 对你来说，已不再是拦路虎，而是按图索骥的线索。你掌握了用 `pip` 解决它的能力。
*   ✅ **熟练使用 IDE**：你已经能在一个专业的、集成化的环境中，高效地编写、管理和运行代码。

你已经不再是那个面对 AI 代码手足无措的“旁观者”了。你已经拥有了进入广阔编程世界的所有基础工具和核心思维。

从这里开始，你的科研编程之旅，才真正开始。祝你好运！