---
# /creations/frontend/background-story.md
title: "数字花园"
date: 2025-09-18

comments: true
---

# 从一个 LOGO 到一片宇宙：我的博客背景

## 序章：不想单调

和许多技术博客一样，我的网站最初也只有一个简单的纯色背景。干净，但略显单调。我当时想：“为什么不把我的 LOGO 放到背景上呢？”

<div style="display:flex">
  <img src="/web.svg" ></img>
  <span>&nbsp;&nbsp;</span>
  <img src="/web-light.svg"></img>
</div>

说干就干。但一个普通的 LOGO 很难让我满意。我便给它加上了一行 CSS：`filter: blur(2px);`。

但谁能想到，就是这个不经意的模糊效果，让我一下子展开了无限的遐想：模糊的 LOGO 仿佛退到了屏幕深处，就好像它拥有了景深。我意识到，我想要的不是一个平面的背景，而是一个有**深度**的空间。

基于这个灵感，我的第一个动态背景组件 `IconsBg.vue` 诞生了。我不再只用一个 LOGO，而是用 `v-for` 生成了几十个大小不一、模糊程度各异、随机漂浮的 LOGO。为了避免在手机上造成性能问题，我还做了一个小优化：根据屏幕尺寸动态计算 LOGO 的数量。

至此，一个平面的背景，第一次拥有了三维的错觉。

![IconsBg](/creations/frontend/iconsBg.png)

```css
.floating-icon {
  ...
  animation: float var(--animation-duration) var(--animation-delay) ease infinite;
  opacity: 0.15;
}

.dark .floating-icon {
  opacity: 0.1;
}

@keyframes float {
  0% {
    transform: translateY(0px) scale(2.0);
  }
  25% {
    transform: translateY(20px) translateX(20px) scale(1.4);
  }
  50% {
    transform: translateY(-20px) scale(1.8);
  }
  75% {
    transform: translateY(20px) translateX(-20px) scale(1.6);
  }
  100% {
    transform: translateY(0px) scale(2.0);
  }
}
```

## 第一幕：飞行粒子

有了漂浮的“空间”，我总觉得还缺点什么。大腿一拍，嘿！联想到了我的研究方向——“飞行”。如果能有一些真正“飞”起来的粒子穿梭其中，那该多酷？

我知道，用 DOM 来实现大量高速飞行的粒子是一场性能灾难（*虽然最后发现不用 DOM，这么多粒子一起画一样也没好到哪去*）。于是，我将目光投向了 Canvas。`MeteorsBg` 组件应运而生。

很快，我遇到了第一个难题：**如何制造流星的尾迹？**

### 方案 A：美丽的捷径，致命的缺陷

我的第一反应是使用一种经典技巧：在每一帧用一个半透明的 `fillRect` 覆盖整个画布。

```javascript
// animate 函数内
ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
```

这个方法性能极高，代码简单。但它有一个致命缺陷：这个半透明的黑色蒙层，会把下方的 `IconsBg` 组件完全遮挡住。为了让两个背景共存，此路不通。

### 方案 B：视觉的胜利，性能的噩梦

我转向了第二个方案：让 Canvas 背景完全透明，然后为每个流星维护一个历史位置数组 `trail`，在每一帧手动把所有历史点都重绘一遍。

视觉上，我成功了。两个背景完美地叠加在一起。但当我打开浏览器性能分析工具时，那可太吓人了。

![高CPU占用的性能火焰图](/creations/frontend/meteor-per.png)

CPU 占用率飙升！

其实想想原因很简单：假设我们有 30 颗流星，每个尾迹长度为 50，那么每一帧动画，我们需要执行 `30 * 50 = 1500` 次绘制调用。在 60fps 的刷新率下，这意味着**每秒超过 9 万次的绘制指令**！我的网站背景变成了一个不折不扣的“CPU 杀手”。

## 第二幕：幽灵辉光

我必须寻找一个既高性能、又不遮挡背景的终极尾迹方案。我把目光投向了 Canvas 的高级 API：`globalCompositeOperation`。

通过设置 `ctx.globalCompositeOperation = 'destination-out'`，我可以用半透明黑色“擦除”画布上的像素，从而在保持背景透明的同时制造尾迹。性能问题似乎迎刃而解。

但很快啊，我就发现这东西不对劲，很丑，而且跟幽灵一样。

首先，是辉光。`shadowBlur` 产生的辉光效果无法被干净地擦除，在画布上留下了一道道很难看的色带。

![辉光残留](/creations/frontend/meteor-01.png)

接着，是幽灵。即使去掉了辉光，`destination-out` 操作本身也会在某些浏览器上留下半透明的轨迹。

![暗色划痕](/creations/frontend/meteor-02.png)

这让我意识到，在单一画布上，我无法同时实现“高性能”、“透明背景”和“没有毛病”这三个目标。

## 第三幕：返璞归真

我重新打开了那个因为性能太差而被我废弃的 V1.0 版本代码。CPU 占用率高的原因真的是“绘制次数太多”吗？

其实想想，**真正的问题在于，我对绘制过程的控制还不够精细。** 我之前的代码只是简单地把所有尾迹点画了一遍，而没有去区分“尾迹”和“头部”应有的不同视觉表现。

这一次，我决定放弃所有花哨的技巧，只使用 Canvas 中最基础、最核心的一个属性：`globalAlpha`，即全局透明度。我要像一个古典画家那样，精确地控制每一笔的浓淡。

最终的 `animate` 函数迎来了它的重生。

### 核心思想：分离绘制，精确控制

我的新策略是，在同一个循环里，通过实时改变上下文（`ctx`）的状态，来为“尾迹”和“头部”应用完全不同的绘制规则：

```javascript
// animate 函数的核心循环
meteors.forEach(meteor => {
    // ... 物理位置更新代码 ...

    // --- 绘制阶段开始 ---

    // 步骤1：绘制尾迹
    ctx.shadowBlur = 0; // 关键！告诉画布：接下来画的尾迹，我不要任何辉光。
    
    meteor.trail.forEach((pos, index) => {
        // 尾迹的亮度不仅和位置有关，还和流星速度有关！
        const opacity = (index / METEOR_CONFIG.TRAIL_LENGTH) * meteor.speed;
        
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, /* ... */);
        
        // 像画家一样，为每一小段尾迹设置精确的透明度
        ctx.globalAlpha = opacity * 0.1; 
        
        ctx.fill();
    });

    // 步骤2：绘制头部
    // 关键！在画头部之前，立刻恢复画笔的透明度和辉光
    ctx.globalAlpha = meteor.opacity; // 恢复为头部应有的不透明度
    ctx.shadowBlur = 2 * meteor.radius; // 重新开启辉光
    
    ctx.beginPath();
    ctx.arc(meteor.x, meteor.y, /* ... */);
    ctx.fillStyle = meteor.color;
    ctx.shadowColor = meteor.color;
    ctx.fill();
});
```

### 尤里卡！

当我写完这段代码并刷新页面时，我知道我找到了最终的答案。

1.  **性能回来了**：通过关闭尾迹的 `shadowBlur`，我移除了每一帧中最大量的、最耗费性能的模糊计算。性能火焰图恢复了平稳。
2.  **瑕疵消失了**：因为我完全放弃了 `globalCompositeOperation`，那些恼人的“辉光色带”和“幽灵划痕”也随之烟消云散。
3.  **细节更丰富了**：我还加入了 `* meteor.speed` 这个小细节，让流星在加速时尾迹更亮，减速时更暗，赋予了动画更真实的物理感。

我没想到，兜兜转转，最终的解决方案竟然躺在最开始的角落里。通过回归基础，精细地控制每一次绘制的上下文状态，我最终在**性能、视觉效果和代码简洁性**之间，找到了那个完美的平衡点。

## 终章：意外之喜

在解决了所有技术难题后，我开始享受这个背景。

实际上，在调试时，我偶然发现，那个被设计用来追踪鼠标的粒子，由于物理惯性的作用，并不会呆板地贴在光标上，而是在附近形成漂亮的轨道，像一颗围绕恒星旋转的行星。

我突然意识到，我不应该“修复”这个行为，而应该拥抱它。

于是，一个彩蛋诞生了。

> 我不想在这里揭晓谜底，但我可以给每一位访客一个提示：**请花些时间，仔细观察那些划过你屏幕的粒子。** 你可能会发现，其中有一些似乎与其他所有粒子都不同。

为了让这个体验更完美，我还加入了两个最后的优化：
*   **自适应频率**：这保证了性能的始终如一。
*   **失焦暂停**：当你切换到其他浏览器标签页时，背景中非必要的动画会悄然暂停，为你节省宝贵的电量和CPU资源。

### 结语

从一行 `filter: blur()`，到一个拥有复杂成长机制、自适应性能、还藏着彩蛋的动态宇宙，这次探索之旅充满了挑战和惊喜。

有时候最棒的创意，就来自于对一个微小细节的深入探索，以及在遇到问题时，那份不断追问“为什么”和“有没有更好的办法”的执着。我还挺喜欢我的完美主义。

我也希望你喜欢这片为你而亮的星空。