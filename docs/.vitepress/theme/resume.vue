<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import BoardingPass from './BoardingPass.vue';
const introductionTitle = ref(null); // 我们需要获取标题元素的引用

const handleScroll = () => {
  if (!introductionTitle.value) return;

  const rect = introductionTitle.value.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // 当标题进入视口的中间区域时，添加 'active' class
  if (rect.top >= 0 && rect.bottom <= viewportHeight * 0.8) {
    introductionTitle.value.classList.add('active');
  } else {
    // 移出视口时移除 class
    introductionTitle.value.classList.remove('active');
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div style="height:100vh;margin-top: 5em;" id="main">
    <h1 class="welcome" style="text-align: center; margin-bottom: 2em; font-size: 5em;">Welcome Aboard!</h1>
    <BoardingPass />
  </div>


  <div class="my-home-container">

    <section id="me" class="resume-section" style="height:100vh;">
      <!-- “亮灯”标题保持不变 -->
      <h1 class="light-title" ref="introductionTitle">个人简介</h1>

      <!-- [新结构] 创建一个两栏布局的容器 -->
      <div class="intro-grid">

        <!-- 左栏：照片和核心信息 -->
        <div class="intro-left-column">
          <!-- 你的照片放在这里 -->
          <img src="/NACHN.png" alt="Yuntao Dai" class="avatar">
          <div class="key-info">
            <h3>戴畇滔 / Yuntao Dai</h3>
            <p>中国民航大学 硕士研究生</p>
            <hr>
            <h4>研究方向</h4>
            <p>飞行状态识别与预测</p>
            <h4>联系方式</h4>
            <div class="contact-links">
              <a href="mailto:daiyuntao928@gmail.com">Email</a> |
              <a href="https://github.com/NACHN" target="_blank">GitHub</a> |
              <a href="https://orcid.org/0009-0001-4427-5175" target="_blank">ORCID</a>
            </div>
          </div>
        </div>

        <!-- 右栏：你的个人故事 -->
        <div class="intro-right-column">
          <div style="margin: 40px;">
            <p class="story-paragraph">
              我的学术之旅，源于对错综复杂的交通系统的毕生迷恋，以及对技术的无限好奇。这份热情驱动着我，从一名在B站记录城市公交动态的少年UP主，成长为一名对科学技术充满热情的研究者...
            </p>
            <div class="tags">123</div>
            <p class="story-paragraph">
              自交通系统出发，跨越航空与控制工程，构建从气动参数估计到概率预测的完整研究链条。熟悉科学计算建模仿真与前后端开发，致力于用跨学科方法解决飞行预测与安全问题。
            </p>
            <p class="story-paragraph">
              硕士阶段专注于气动参数估计与飞行状态预测，探索控制理论与概率推断的结合，致力于提升飞行安全与系统可靠性。
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bgs-section" id="education">
      <h1 style="background-color: #37bfe0; color: #f1f9ff;">教育背景|Education</h1>
      <div style="">
        <ul>
          <li>2023-09至今<h4>中国民航大学，空中交通管理学院<span style="color: #9fa2a3; font-weight: 100; font-size: small;"> - 天津</span>
            </h4>
          </li>交通运输工程
          <li>2018-09至2022-06<h4>东北林业大学，交通学院<span style="color: #9fa2a3; font-weight: 100; font-size: small;"> -
                哈尔滨</span></h4>
          </li>
          交通运输
        </ul>
      </div>
    </section>

    <section class="research-section" id="research">
      <h1 style="background-color: #37bfe0; color: #f1f9ff;">研究经历|Researches</h1>
      <div style="">
        <ul>
          <li>硕士毕业论文<h4>基于 QAR 数据的民航客机飞行状态实时预测研究</h4>指导老师：温瑞英、王红勇</li>
          Problem
          解决了从高维、含噪 QAR 数据中进行实时飞行状态预测的关键挑战，超越了传统的飞行后分析模式。
          Solution
          设计并验证了一个创新的“感知-预测-预警”(PPP)三层数据驱动框架。
          <div class="perception">
            <h1>感知层</h1>
            开发了一种基于固定增益方程误差法的解耦辨识方法，以精确估计气动参数，克服了传统联合估计算法 (UKF) 的不稳定性问题。
          </div>
          <div class="prediction">
            <h1>预测层</h1>
            利用
          </div>
          <div class="precaution">
            <h1>预警层</h1>
            引入
          </div>
        </ul>
      </div>
    </section>

    <section class="pubs-section">
      <h1 style="background-color: #37bfe0; color: #f1f9ff;">学术论文|Publications</h1>
      <div style="">
        <ul>
          <li><a href="/resume">论文1，IEEE-T-ITS，Under Review</a></li>
          <li><a href="/resume">论文2，IEEE-T-ITS，Under Review</a></li>
        </ul>
      </div>
    </section>

    <section class="proj-section" id="project">
      <h1 style="background-color: #37bfe0; color: #f1f9ff;">项目经历|Projects</h1>
      <div style="">
        <ul>
          <li>
            <h4>乌鲁木齐公交信息平台 <span style="font-size:smaller;">与乌鲁木齐市交通运输局合作项目</span></h4>
          </li>
          采用Python Flask作为后端，Vue+ts作为前端<br></br>
          基于Openlayers实现基本GIS功能，智能分析和决策支持
          <li>
            <h4>蒙特卡洛跑道容量模拟软件 <span style="font-size:smaller;">课程项目</span></h4>
          </li>
          利用Java实现agent-based模拟飞机起降行为，支持自定义规则<br></br>
          <a href="https://github.com/NACHN/CaMS">于Github开源</a>
          <li>
            <h4>格斗机器人设计与制造 <span style="font-size:smaller;">大学生工程能力竞赛，本科</span></h4>
          </li>
          使用CATIA建模和有限元分析，使用3D打印制造<br></br>

        </ul>
      </div>
    </section>

    <section class="skills-section">
      <h1 style="background-color: #37bfe0; color: #f1f9ff;">技术技能|Skills</h1>
      <div style="">
        <ul>
          <li>
            <h5>编程语言</h5>Python, Matlab, Julia, C/C++, JavaScript, TypeScript
          </li>
          <li>
            <h5>科学计算与仿真</h5>Matlab, Simulink, Modelica, CATIA
          </li>
          <li>
            <h5>软件开发</h5>Git, Linux, Vue, Server Deployment
          </li>
          <li>
            <h5>设计与建模</h5>Blender, 3Ds Max, Substance Painter, Adobe Suite(Photoshop, Illustrator), EDA
          </li>
        </ul>
      </div>
    </section>

  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}

/* 在这里写你首页专属的 CSS */
.my-home-container {
  padding-top: var(--vp-nav-height);
  /* 关键：留出顶部导航栏的高度 */
}

.resume-section {
  padding: 64px 0;
  border-top: 1px solid var(--vp-c-divider);
}

.content-container>.resume-section:first-child {
  border-top: none;
  padding-top: 32px;
  /* 给一个较小的上内边距即可 */
}

.resume-section>h1 {
  font-size: 2.2em;
  /* 统一标题大小 */
  font-weight: 700;

  border-bottom: 1px solid var(--vp-c-divider);
  /* 标题下的分隔线 */
  color: var(--vp-c-text-1);
}

.resume-section>.light-title {
  border-bottom: none;
  /* 移除下划线 */
  margin-bottom: 2em;
  display: inline;
  align-items: center;
  font-size: 5em;
  font-weight: 700;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #333;
  /* 熄灭时的背景色 */
  color: #515353;
  /* 熄灭时的文字颜色 */
  transition: all 0.5s ease-in-out;
}

.resume-section>.light-title.active {
  background-color: #f3d9a1;
  box-shadow: 0 0 15px #b69e6b, 0 0 25px #f7b731aa;
}

.bgs-section>h1,
.research-section>h1,
.pubs-section>h1,
.proj-section>h1,
.skills-section>h1 {
  /* 这些是你在 HTML 里写的内联样式的 CSS 版本，更易于管理 */
  background-color: #37bfe0;
  color: #f1f9ff;
  border-radius: 8px;
  padding: 12px 18px;
  border-bottom: none;
  /* 覆盖通用 h1 的下划线 */
  display: inline-block;
  /* 让背景色只包裹文字 */
}

.intro-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  /* 左栏占 1/3，右栏占 2/3 */
  gap: 3rem;
  /* 两栏之间的间距 */
  align-items: start;
  /* 顶部对齐 */
  margin-top: 2rem;
}

/* 响应式：在小屏幕上变为单列布局 */
@media (max-width: 768px) {
  .intro-grid {
    grid-template-columns: 1fr;
  }
}

/* 左栏样式 */
.intro-left-column {
  /* [关键] 使用 Flexbox 布局 */
  display: flex;
  flex-direction: column;
  /* 垂直排列 */
  justify-content: center;
  /* 主轴（垂直）居中 */
  align-items: center;
  /* 交叉轴（水平）居中 */

  position: relative;
  /* 成为伪元素定位的父级 */
  overflow: hidden;
  /*将移动的背景限制在圆形内部 */

  top: 0px;
  text-align: center;
  height: 60vh;
  /* 让内容自动撑开高度 */
  aspect-ratio: 1 / 1;
  /* [关键] 保持圆形 */
  max-width: 350px;
  /* 给一个最大宽度，防止在大屏幕上过大 */
  margin: 50px auto;
  /* 在单列布局时居中 */
  border-radius: 500px;
  /* [关键] 改为 50% 来创建完美的圆形 */
  border: 10px solid var(--vp-c-bg-alt);
  /* 用一个稍微不同的背景色做边框 */
  padding: 2em;
  background-color: #12121359;

  /* [增强效果] 添加内阴影和外阴影，模拟舷窗的立体感 */
  box-shadow:
    inset 0 0 15px rgba(0, 0, 0, 0.5),
    /* 内阴影 */
    0 10px 30px rgba(0, 0, 0, 0.3);
  /* 外阴影（悬浮感）*/

  transition: transform 0.3s ease-out;
}

.intro-left-column::before {
  content: '';
  position: absolute;
  top: -10%;
  left: 0;
  width: 300%;
  /* [关键] 让背景宽度是容器的两倍，以便平移 */
  height: 150%;
  z-index: -1;
  /* 确保背景在内容之下 */


  /* 设置背景图片 */
  background-image: url('/sky.png');
  background-size: 200%;
  background-position: center center;
  /* [关键] 应用动画 */
  /* 动画名: flying-motion, 持续时间: 40s, 速度曲线: ease-in-out, 无限循环 */
  animation: flying-motion 120s ease infinite;
}

/* [新增] 定义动画的关键帧 */
@keyframes flying-motion {
  0% {
    /* 初始位置 */
    transform: translate3d(0, 0, 0);
  }

  25% {
    /* 模拟轻微的上升和左移 */
    transform: translate3d(-5%, -2%, 0);
  }

  50% {
    /* 移动到最右侧 */
    transform: translate3d(-50%, 0, 0);
  }

  75% {
    /* 模拟轻微的下降和右移 */
    transform: translate3d(-45%, 2%, 0);
  }

  100% {
    /* 回到初始位置，准备下一次循环 */
    transform: translate3d(0, 0, 0);
  }
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  /* 圆形头像 */
  object-fit: cover;
  border: 4px solid var(--vp-c-brand-1);
  /* 用主题色做边框 */
  margin-bottom: 1.5rem;
}

.key-info h3 {
  font-size: 1.5em;
  font-weight: 600;
  margin: 0;
  color: white;
}

.key-info p {
  color: var(--vp-c-text-2);
  margin: 0.5rem 0;
  color: white;
}

.key-info hr {
  border-color: var(--vp-c-divider);
  margin: 1rem 0;
}

.key-info h4 {
  font-size: 1em;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: #121213;
}

.contact-links a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}

.contact-links a:hover {
  text-decoration: underline;
}

/* 右栏样式 */
.intro-right-column {
  line-height: 1.8;
  /* 增加行高，提升阅读体验 */
  margin-top: 100px;
  background-color: #12121317;
  border-radius: 24px;
  backdrop-filter: blur(15px);

}


.story-paragraph {
  color: var(--vp-c-text-1);
  font-size: 1.7em;
  font-weight: 600;
  margin: 40px;
}

.story-paragraph:first-child {
  margin-bottom: 1.5em;
  color: var(--vp-c-text-2);
  font-weight: 400;
}

.custom-section {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
}

.perception {
  background-color: #80ecb6;
  color: #131314;
  border-radius: 20px;
  padding: 20px;
  margin: 20px 0;
}

.perception h1 {
  color: #053b20;
}

.prediction {
  background-color: #80c4ec;
  color: #131314;
  border-radius: 20px;
  padding: 20px;
  margin: 20px 0;
}

.prediction h1 {
  color: #08324b;
}

.precaution {
  background-color: #ecc680;
  color: #131314;
  border-radius: 20px;
  padding: 20px;
  margin: 20px 0;
}

.precaution h1 {
  color: #4e3609;
}

.welcome {
  animation: breath 2s 0s ease-out infinite;
}
</style>