---

title: 理解无迹卡尔曼滤波 (UKF)：Sigma 点的魔力
date: 2023-10-29
tags: [Control Theory, Kalman Filter, State Estimation, Robotics]
sidebar: true
prev: /research/control-theory/state-space-methods.html
next: /research/control-theory/particle-filter.html
---

# 理解无迹卡尔曼滤波 (UKF)：Sigma 点的魔力

在状态估计领域，卡尔曼滤波器 (Kalman Filter, KF) 是处理**线性高斯系统**的王者。然而，现实世界充满了非线性。为了应对这一挑战，扩展卡尔曼滤波器 (Extended Kalman Filter, EKF) 应运而生。EKF 通过在当前估计点对非线性函数进行一阶泰勒展开（即线性化）来近似系统，但这种方法存在两个主要问题：

1.  **计算雅可比矩阵 (Jacobian Matrix)** 可能非常复杂，甚至对某些函数来说是不可行的。
2.  **线性化误差** 在系统非线性程度较高时会变得非常显著，可能导致滤波性能下降甚至发散。

有没有一种方法可以**避免线性化**，同时又能以较高的精度处理非线性问题呢？答案就是**无迹卡尔曼滤波 (Unscented Kalman Filter, UKF)**。

## UKF的核心思想：无迹变换 (Unscented Transform)

UKF 的精髓在于一个优雅的观点：

> 传递一个概率分布通过一个非线性函数，比线性化这个非线性函数本身要更容易。

EKF 的思路是“近似函数”，而 UKF 的思路是“**近似概率分布**”。

UKF 通过一种名为 **无迹变换 (Unscented Transform, UT)** 的技术来实现这一点。UT 的核心是通过一组精心挑选的**确定性采样点**——也就是 **Sigma 点 (Sigma Points)**——来捕捉高斯分布的均值和协方差。然后，将这些 Sigma 点直接通过非线性函数进行传递，再根据变换后的点集重新计算出新的均值和协方差。

  
*（建议：你可以在这里放一张图，展示一个二维高斯分布的置信椭圆和几个Sigma点，这会非常直观。）*

这个过程惊人地准确，它能够捕捉到真实均值和协方差的二阶（甚至更高阶）精度，而 EKF 的线性化方法只能保证一阶精度。

## 什么是 Sigma 点？

Sigma 点是一组经过特殊选择的样本点，它们围绕着状态的均值分布。这些点的选取和权重分配都经过精确计算，以确保它们的统计特性（均值和协方差）与原始的高斯分布完全匹配。

对于一个 `n` 维的状态向量 `x`，我们通常会选取 `2n + 1` 个 Sigma 点。它们的生成方式如下：

设当前状态估计为 $\hat{\mathbf{x}}$，协方差矩阵为 $\mathbf{P}$。

1.  **第一个 Sigma 点**就是均值本身：
    $$
    \mathcal{X}_0 = \hat{\mathbf{x}}
    $$

2.  **其余 `2n` 个点**对称地分布在均值两侧：
    $$
    \begin{aligned}
    \mathcal{X}_i &= \hat{\mathbf{x}} + \left( \sqrt{(n+\lambda)\mathbf{P}} \right)_i \quad \text{for } i = 1, \dots, n \\
    \mathcal{X}_{i+n} &= \hat{\mathbf{x}} - \left( \sqrt{(n+\lambda)\mathbf{P}} \right)_i \quad \text{for } i = 1, \dots, n
    \end{aligned}
    $$

其中：
*   $\lambda = \alpha^2(n+\kappa) - n$ 是一个复合缩放参数。
*   $\left( \sqrt{(n+\lambda)\mathbf{P}} \right)_i$ 表示矩阵 $(n+\lambda)\mathbf{P}$ 的矩阵平方根（通常通过 Cholesky 分解得到）的第 `i` 列。

::: tip 缩放参数 $\alpha$, $\beta$, $\kappa$
生成 Sigma 点时有三个可调参数：
- $\alpha$: 决定 Sigma 点围绕均值的散布程度，通常取一个较小的值，如 `1e-3`。
- $\kappa$: 第二个缩放参数，通常设为 `0` 或 `3-n`。
- $\beta$: 用于合并关于分布的先验知识，对于高斯分布，最优值为 `2`。
:::

每个 Sigma 点还被赋予了用于计算均值和协方差的**权重**：
$$
\begin{aligned}
W_0^{(m)} &= \frac{\lambda}{n+\lambda} \\
W_0^{(c)} &= \frac{\lambda}{n+\lambda} + (1 - \alpha^2 + \beta) \\
W_i^{(m)} &= W_i^{(c)} = \frac{1}{2(n+\lambda)} \quad \text{for } i = 1, \dots, 2n
\end{aligned}
$$
上标 `(m)` 代表用于计算均值 (mean) 的权重，`(c)` 代表用于计算协方差 (covariance) 的权重。

## UKF 算法步骤

UKF 的预测和更新步骤与标准卡尔曼滤波类似，但所有的传递过程都由 Sigma 点的变换来完成。

### 1. 预测 (Prediction)

假设我们的非线性过程模型为 $\mathbf{x}_k = f(\mathbf{x}_{k-1}, \mathbf{u}_{k-1}) + \mathbf{w}_{k-1}$。

1.  **生成 Sigma 点**: 根据上一时刻的状态估计 $\hat{\mathbf{x}}_{k-1|k-1}$ 和协方差 $\mathbf{P}_{k-1|k-1}$ 生成 `2n+1` 个 Sigma 点 $\mathcal{X}_{k-1|k-1}$。

2.  **传递 Sigma 点**: 将每个 Sigma 点通过过程模型 `f` 进行传递，得到一组变换后的点：
    $$
    \mathcal{X}^*_{k|k-1, i} = f(\mathcal{X}_{k-1|k-1, i}, \mathbf{u}_{k-1})
    $$

3.  **计算预测均值和协方差**: 使用加权平均计算预测的状态均值 $\hat{\mathbf{x}}^-_{k}$ 和协方差 $\mathbf{P}^-_{k}$：
    $$
    \hat{\mathbf{x}}^-_{k} = \sum_{i=0}^{2n} W_i^{(m)} \mathcal{X}^*_{k|k-1, i}
    $$
    $$
    \mathbf{P}^-_{k} = \sum_{i=0}^{2n} W_i^{(c)} (\mathcal{X}^*_{k|k-1, i} - \hat{\mathbf{x}}^-_{k})(\mathcal{X}^*_{k|k-1, i} - \hat{\mathbf{x}}^-_{k})^T + \mathbf{Q}_{k-1}
    $$
    其中 $\mathbf{Q}$ 是过程噪声协方差。

### 2. 更新 (Update)

假设我们的非线性测量模型为 $\mathbf{z}_k = h(\mathbf{x}_k) + \mathbf{v}_k$。

1.  **再次传递 Sigma 点**: 将**预测步骤中得到的**变换后的点集 $\mathcal{X}^*_{k|k-1}$ 通过测量模型 `h` 传递，得到在测量空间中的点集 $\mathcal{Z}_{k|k-1}$：
    $$
    \mathcal{Z}_{k|k-1, i} = h(\mathcal{X}^*_{k|k-1, i})
    $$

2.  **计算预测测量**: 计算这些测量点集的加权平均，得到预测的测量值 $\hat{\mathbf{z}}^-_{k}$：
    $$
    \hat{\mathbf{z}}^-_{k} = \sum_{i=0}^{2n} W_i^{(m)} \mathcal{Z}_{k|k-1, i}
    $$

3.  **计算协方差和卡尔曼增益**: 计算测量协方差 $\mathbf{P}_{zz}$ 和状态-测量互协方差 $\mathbf{P}_{xz}$：
    $$
    \mathbf{P}_{zz} = \sum_{i=0}^{2n} W_i^{(c)} (\mathcal{Z}_{k|k-1, i} - \hat{\mathbf{z}}^-_{k})(\mathcal{Z}_{k|k-1, i} - \hat{\mathbf{z}}^-_{k})^T + \mathbf{R}_k
    $$
    $$
    \mathbf{P}_{xz} = \sum_{i=0}^{2n} W_i^{(c)} (\mathcal{X}^*_{k|k-1, i} - \hat{\mathbf{x}}^-_{k})(\mathcal{Z}_{k|k-1, i} - \hat{\mathbf{z}}^-_{k})^T
    $$
    卡尔曼增益 $\mathbf{K}_k = \mathbf{P}_{xz} \mathbf{P}_{zz}^{-1}$。

4.  **更新状态估计**: 最后，根据实际测量值 $\mathbf{z}_k$ 更新状态估计和协方差：
    $$
    \hat{\mathbf{x}}_{k|k} = \hat{\mathbf{x}}^-_{k} + \mathbf{K}_k(\mathbf{z}_k - \hat{\mathbf{z}}^-_{k})
    $$
    $$
    \mathbf{P}_{k|k} = \mathbf{P}^-_{k} - \mathbf{K}_k \mathbf{P}_{zz} \mathbf{K}_k^T
    $$

## 结论

无迹卡尔曼滤波通过巧妙地使用 Sigma 点来逼近概率分布，而非线性化系统模型，从而在非线性状态估计问题中取得了远超 EKF 的精度和鲁棒性。它避免了复杂的雅可比矩阵计算，使其在许多领域的应用中（如机器人导航、目标跟踪、航空航天等）成为一种更受欢迎和更强大的工具。

理解了 Sigma 点和无迹变换，也就掌握了 UKF 的精髓。