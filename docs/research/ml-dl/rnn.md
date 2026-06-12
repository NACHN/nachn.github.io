---
title: "超级叠加——层不叠不成网"
date: 2026-06-12 

comments: true
---

# 层不叠不成网

上回说到，MLP不只是向量，稍微扩展一下就变成矩阵了。这里又在说层啊网啊的，那什么是“层”？什么是“网”？层与层之间又是怎么“网”的？

首先把上回那个二层MLP拿过来
$$
y=\text{ReLU}(w_1x+b_1)+\text{ReLU}(w_2x+b_2)
$$
看一看它的结构，有ReLU，有运算，层级结构已经很明显了
$$
x\to{\begin{cases}h_1=\text{ReLU}(w_1x+b_1)\\ h_2=\text{ReLU}(w_2x+b_2)\end{cases}}\to y=w_3h_1+w_4h_2
$$
- $x$ 是**输入层**，负责把原始数据送进来。
- $h_1, h_2$ 是**隐藏层**，里面住着带激活函数的“神经元”（也就是感知机），它们各自对输入做判断。
- $y$ 是**输出层**，把隐藏层的结果加权求和，给出最终答案。

> 不过注意，在上一篇的例子中，$w_3$ 和 $w_4$ 都是 1，而且是写死的，并不是从数据中学来的。
> 
> 换句话说，我们只是手动叠加了两个感知机，机器没有学会怎么叠加输出。

既然不算输入层的话，这个 MLP 已经叠了两层（一层隐藏 + 一层输出），那自然而然，我们可以叠三层、四层、五层……
$$
x
\to
\begin{cases}
h_{11}=\text{ReLU}(w_{11}x+b_{11}) \\
h_{12}=\text{ReLU}(w_{12}x+b_{12})
\end{cases}
\to
\begin{cases}
h_{21}=\text{ReLU}(\mathbf{W}_{21}[h_{11},h_{12}]^{\top}+b_{21}) \\
h_{22}=\text{ReLU}(\mathbf{W}_{22}[h_{11},h_{12}]^{\top}+b_{22})
\end{cases}
\to \cdots \to y
$$
每多叠一层，分段线性函数的“拐点”就指数级增长。在多边形建模里，顶点越多，曲面就越光滑，可以表现的曲面也可以越复杂。
> 实际上机器学习就是给数据流形建模的过程！简直就是从高模向低模拓扑一样！

## 简单的复杂函数与求偏导
可以看到，在第二层，就已经需要一个 $2\times2$ 矩阵（就是把 $\mathbf{W}_{21}$ 和 $\mathbf{W}_{22}$ 合起来）来计算了。既然如此，把每一层都写成矩阵的形式
$$
\mathbf x\to\mathbf{h}_1=\text{ReLU}(\mathbf{W}_1\mathbf x+\mathbf b_1)\to
\mathbf{h}_2=\text{ReLU}(\mathbf{W}_2\mathbf h_1+\mathbf b_2)\to\cdots\to \mathbf y
$$

多层网络又简单又复杂：每一层都是线性的叠加（非线性向线性的拓扑），但是每一条线又是之前所有计算结果的结果（结果却是受全局影响的）。这就导致了完全计算所有权重的偏导都很难（就好像在高维系统里Jacobian算得特别慢一样），然而正是由于线性化，又可以抄近路计算偏导。

回忆一下梯度下降里是怎么逼近目标的
$$
\mathbf W_1:=\mathbf W_1-\eta\frac{\partial L}{\partial \mathbf W_1},\quad \mathbf b_1:=\mathbf b_1-\eta\frac{\partial L}{\partial \mathbf b_1},\cdots
$$
显然，怎么求偏导 $\dfrac{\partial L}{\partial \mathbf W_i}$ 或者 $\dfrac{\partial L}{\partial \mathbf b_i}$ 是一个问题。这里面又有ReLU，又有好多层，直接求太麻烦了。

但在高等数学中，我们学过求导数的链式法则，可以得到
$$
\dfrac{\partial L}{\partial \mathbf W_i}=\dfrac{\partial L}{\partial \mathbf h_L}\dfrac{\partial \mathbf h_L}{\partial \mathbf h_{L-1}}\cdots\dfrac{\partial \mathbf h_i}{\partial \mathbf W_i}
$$
由于每一步都是线性化的，因此每一个偏导都很好算，这比直接求一个最终的偏导 $\dfrac{\partial L}{\partial w_i}$ 要快得多也方便得多。

## 反向传播

回到出租车计价函数，目标（损失函数）为
$$
L=\dfrac 12\mathbf e^2=\dfrac 12(\hat {\mathbf y}-\mathbf y)^2
$$
输出层是
$$
\hat {\mathbf y}=\text{ReLU}(\mathbf W_2\mathbf h_1+\mathbf b_2)
$$
那么输出层的梯度就是
$$
\dfrac{\partial L}{\partial \mathbf W_2}=\text{ReLU}'(\mathbf W_2\mathbf h_1+\mathbf b_2)\odot\mathbf e\mathbf h_1^\top,\quad\dfrac{\partial L}{\partial \mathbf b_2}=\text{ReLU}'(\mathbf W_2\mathbf h_1+\mathbf b_2)\odot\mathbf e
$$
那么第一层呢？再对 $\mathbf h_1$ 求偏导
$$
\dfrac{\partial L}{\partial \mathbf h_1}=\dfrac{\partial L}{\partial \hat{\mathbf y}}\dfrac{\partial \hat{\mathbf y}}{\partial \mathbf h_1}=\mathbf e\dfrac{\partial \hat{\mathbf y}}{\partial \mathbf h_1}
$$
现在只剩求 $\dfrac{\partial \hat{\mathbf y}}{\partial \mathbf h_1}$
$$
\dfrac{\partial \hat{\mathbf y}}{\partial \mathbf h_1}=
\text{ReLU}'(\mathbf W_2\mathbf h_1+\mathbf b_2)\odot\mathbf W_2^\top
$$
那么 $\mathbf h_1$ 是
$$
\mathbf h_1=\text{ReLU}(\mathbf W_1 \mathbf x+\mathbf b_1)
$$
当然为了发现规律我们可以把 $\mathbf x$ 写成 $\mathbf h_0$，于是
$$
\dfrac{\partial L}{\partial \mathbf h_0}=\dfrac{\partial L}{\partial \mathbf h_1}\dfrac{\partial \mathbf h_1}{\partial \mathbf h_0}=\mathbf e\dfrac{\partial \hat{\mathbf y}}{\partial \mathbf h_1}\dfrac{\partial \mathbf h_1}{\partial \mathbf h_0}
$$
把最后一项求一下
$$
\dfrac{\partial \mathbf h_1}{\partial \mathbf h_0}=\text{ReLU}'(\mathbf W_1 \mathbf h_0+\mathbf b_1)\odot \mathbf W_1^\top
$$
整理一下
$$
\dfrac{\partial L}{\partial \mathbf h_0}=\mathbf e\odot
\text{ReLU}'(\mathbf W_2\mathbf h_1+\mathbf b_2)\mathbf W_2^\top\odot
\text{ReLU}'(\mathbf W_1 \mathbf h_0+\mathbf b_1)W_1^\top
$$

也就是说，每一层的梯度都是误差 $\mathbf e$ 在每一层经过以下两步“传”回来的
1. 乘上激活函数的导数 $\rightarrow$ **误差 $\boldsymbol{\delta}$ 与 激活导数的逐元素相乘 $\odot$**
> ReLU的导数实际上就是1和0，刚好对应着神经元的激活和关闭，实际上最开始激活函数不是ReLU而是更复杂更连续的Sigmoid，后来发现ReLU比老方法好用。
>
> 其实想一想，如果对最终结果没贡献那确实应该在反向传播的时候也不考虑，ReLU实际上是严格明确了这一规则。
2. 乘上权重矩阵的转置 $\rightarrow$ **误差通过 $\mathbf W^\top$ 传回上一层**

其实这不就是误差反馈控制和伴随方法吗？就好像是一环套一环的一个系统，就好像是在最优控制里伴随方程传递协态变量。如果再换成Jacobian，甚至可以把梯度下降写成控制器
$$
\mathbf W_i \leftarrow \mathbf W_i - \eta \, \mathbf \delta_i \, \mathbf h_{i-1}^\top
$$

其实不难发现，之前做的一切，输入 $\mathbf x$ 得到 $\mathbf y$，只是在研究一个静态映射，没有“时间”、“传播”和”演化“的概念。

回头看刚才那个多层MLP：
$$ \mathbf h_1 = f(\mathbf W_1 \mathbf x) \implies \mathbf h_2 = f(\mathbf W_2 \mathbf h_1) \implies \hat{\mathbf y} $$
这是在**空间**上把它叠了2层。如果把“层”这个概念换成“时间步”呢？如果不把网络往高处叠，而是让数据在同一个网络里随时间流动呢？

## 从空间到时间
状态空间是怎么表示系统的？
$$
\mathbf x_{k+1}=\mathbf A\mathbf x_k+\mathbf B\mathbf u_k
$$
$\mathbf A$ 是系统矩阵，表示系统怎么自己演化；$\mathbf B$ 是输入矩阵，表示输入如何影响系统的演化。此外，还有输出方程 $\mathbf y_k=\mathbf C\mathbf x_k$（这里省略直传矩阵 $\mathbf D$），其中的输出矩阵 $\mathbf C$ 表示了怎么从状态获得输出。

这个方程最重要的意义在于，当前时刻的状态 $\mathbf x_{k+1}$，不仅取决于当前的输入 $\mathbf u_k$，还取决于上一时刻的状态 $\mathbf x_k$。

从静态方程到动力学系统，是状态空间加上“时间”（状态转移）的概念；那么给多层网络加上“时间”的概念，让隐藏层不仅接收当前的输入，还接收**上一时刻的自己**，会变成什么呢？

来试一试。一个神经元有自己的 $\mathbf W\mathbf h+\mathbf b$，这时候考虑 $\mathbf h$ 在每个时间步的不同
$$
\mathbf h(t)=\tanh(\mathbf W_h\mathbf h(t-1)+\mathbf W_x\mathbf x(t)+\mathbf b)
$$
然后给每一个部分取一个新名字，$\mathbf h(t)$ 对应的是状态 $\mathbf x$，叫隐藏状态；$\mathbf W_h$ 对应了系统矩阵（状态转移矩阵）$\mathbf A$，叫循环权重；$\mathbf W_x$ 对应输入矩阵 $\mathbf B$，叫输入权重。最后再加上激活函数 $\tanh()$，这就是循环神经网络RNN了。
> 这里用 $\tanh$ 主要是目标从绝对的值变为了对状态的缩放，因此激活函数 $\tanh$ 实际上做了一个到[-1,1]的映射

现在既有“空间”，又有“时间”了，一个下标不够用了。所以这里为了区分，把“空间位置”放到下标里，把“时间”放在括号里，即写作 $\mathbf h_i(t)$，表示隐藏层 $i$ 在 $t$ 时刻的输出。

既然 $\mathbf h_i$ 现在是时变的，那么链式求导实际上发生了一点点变化
$$
\dfrac{\partial L}{\partial\mathbf W_i}=\dfrac{\partial L}{\partial\mathbf h_L(t)}\dfrac{\partial\mathbf h_L(t)}{\partial\mathbf h_{L-1}(t)}\cdots\left(\dfrac{\partial\mathbf h_i(t)}{\partial\mathbf W_i}+
\dfrac{\partial\mathbf h_i(t)}{\partial\mathbf h_i(t-1)}
\dfrac{\partial\mathbf h_i(t-1)}{\partial\mathbf W_i}+\cdots+
\dfrac{\partial\mathbf h_i(t)}{\partial\mathbf h_i(t-1)}
\cdots\dfrac{\partial\mathbf h_i(2)}{\partial\mathbf h_i(1)}
\dfrac{\partial\mathbf h_i(1)}{\partial\mathbf W_i}
\right)
$$
而中间的一串连乘实际上是连续的时间步偏导
$$
\dfrac{\partial\mathbf h_i(t)}{\partial\mathbf h_i(t-1)}=\text{diag}[\tanh'(\cdots)]\mathbf W_i^\top
$$

这就是状态转移矩阵的幂次 $\mathbf A^k$！$\mathbf A^k$ 的谱半径决定了系统是稳定还是发散，换到神经网络上 $\mathbf W_i^k$ 是一样的道理，如果 $\mathbf W_i$ 的特征值都小于1，那么很显然最后算出来的梯度是0，这就是**梯度消失问题**，反之则又变成了**梯度爆炸问题**。

如果看过我之前的文章，我已经在RLS递归最小二乘法上讲过[历史依赖方法的增益消失问题](/research/control-theory/cg-eem#猜得有道理一些)，和这个问题就是一体两面。

这个问题的解决方案就和改进RLS思路一样，引入一个“遗忘因子”避免由于涉及时间步太多导致的统计学回归；RNN也可以引入这么一个“遗忘机制”，忘掉一些，记住一些，想起来一些。

没错，这个“遗忘机制”也有新名字，叫“门”。

[欲知如何造门，请听下回分解！](/research/ml-dl/lstm)

