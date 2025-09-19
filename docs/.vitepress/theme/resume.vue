<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import BoardingPass from './BoardingPass.vue';
import ResearchIndex from './ResearchIndex.vue'
import TimelineCard from './TimelineCard.vue';

const introductionTitle = ref(null); // 我们需要获取标题元素的引用

const publications = ref([
  {
    title: "Paper 1",
    details: "[1] Y. Dai, R. Wen, H. Wang. In: IEEE Transactions on Intelligent Transportation Systems (T-ITS). (Under Review)",
    icon: "📄",
  },
  {
    title: "Paper 2",
    details: "[2] Y. Dai, R. Wen, H. Wang. In: IEEE Transactions on Intelligent Transportation Systems (T-ITS). (Under Review)",
    icon: "📄",
  },
]);

const projects = ref([
  {
    icon: '🚌', // 公交车图标
    title: '公交信息平台',
    details: '与交通运输局合作，主导开发。采用 Python Flask 后端处理实时 GPS 数据，Vue+TS 前端结合 OpenLayers 实现 GIS 可视化与智能决策支持。',
    link: '#', // 如果有专门的页面介绍，可以链接过去
    bgColor: '#f44336' // 交通信号灯的红色
  },
  {
    icon: '✈️', // 飞机图标
    title: '蒙特卡洛跑道容量模拟软件',
    details: '利用 Java 实现基于 Agent 的仿真模型，模拟飞机起降行为，支持自定义调度规则，并在 GitHub 开源。',
    link: 'https://github.com/NACHN/CaMS',
    bgColor: '#2196F3' // 天蓝色
  },
  {
    icon: '🤖', // 机器人图标
    title: '格斗机器人设计与制造',
    details: '大学生工程能力竞赛项目。使用 CATIA 进行三维建模与有限元分析，利用 3D 打印制造核心部件并完成硬件集成。',
    link: '#',
    bgColor: '#9C27B0' // 机械感的紫色
  },
]);

const education = ref([
  {
    icon: "🎓",
    title: "中国民航大学",
    details: "硕士研究生 (M.S.)<br>空中交通管理学院<br>交通运输工程<br><h3>2023.09 - 至今</h3>",
    bgColor: "#0795f3"
  },
  {
    icon: "🌲",
    title: "东北林业大学",
    details: "学士 (B.S.)<br>交通学院<br>交通运输<br><h3>2018.09 - 2022.06</h3>",
    bgColor: "#006400"
  }
]);

// [新增] 技能数据 (一个嵌套结构)
const skills = ref([
  {
    category: { title: "编程语言", icon: "💻", bgColor: "#007ACC" },
    tags: [
      { title: "Python" }, { title: "MATLAB" }, { title: "Julia" },
      { title: "C/C++" }, { title: "JavaScript" }, { title: "TypeScript" }
    ]
  },
  {
    category: { title: "科学计算", icon: "🔬", bgColor: "#228B22" },
    tags: [
      { title: "Simulink" }, { title: "Modelica" }, { title: "CATIA" }
    ]
  },
  {
    category: { title: "软件开发", icon: "🌐", bgColor: "#FF5722" },
    tags: [
      { title: "Git" }, { title: "Linux" }, { title: "Vue.js" }, { title: "Server Deployment" }
    ]
  },
  {
    category: { title: "设计建模", icon: "🎨", bgColor: "#7A4DDE" },
    tags: [
      { title: "Blender" }, { title: "3ds Max" }, { title: "Substance Painter" },
      { title: "Adobe Suite" }, { title: "EDA" }
    ]
  }
]);

const contactInfo = ref({
  email: 'daiyuntao928@gmail.com',
  github: 'https://github.com/NACHN',
  website: 'https://nachn.github.io',
  location: 'Tianjin, China'
});

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
  <div style="height:100vh; justify-content: center;" id="main">
    <h1 class="welcome" style="text-align: center; margin-bottom: 10vh; font-size: 10vh; margin-top: 10vh;">Welcome
      Aboard!</h1>
    <BoardingPass />
    <a href="#me">
      <div class="godown" style="margin-top: 5vh; text-align: center; font-size:10vh; left: 50vw;">
        <span class="down01">﹀</span><br></br>
        <span class="down02">﹀</span><br></br>
        <span class="down03">﹀</span>
      </div>
    </a>
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
            <div class="tag-container">
              <div class="tags" style="background-color: var(--vp-c-brand-3);">科学计算</div>
              <div class="tags" style="background-color: var(--vp-c-brand-3);">建模仿真</div>
              <div class="tags" style="background-color: var(--vp-c-brand-3);">全栈开发</div>
            </div>
            <p class="story-paragraph">
              自交通系统出发，跨越航空与控制工程，构建从气动参数估计到概率预测的完整研究链条。熟悉科学计算建模仿真与前后端开发，致力于用跨学科方法解决飞行预测与安全问题。
            </p>
            <div class="tag-container">
              <div class="tags" style="background-color: #db5507;">飞行力学</div>
              <div class="tags" style="background-color: #db5507;">控制理论</div>
              <div class="tags" style="background-color: #db5507;">概率论</div>
            </div>
            <p class="story-paragraph">
              硕士阶段专注于气动参数估计与飞行状态预测，探索控制理论与概率推断的结合，致力于提升飞行安全与系统可靠性。
            </p>
          </div>
        </div>
      </div>

      <a href="#research">
        <div class="godown" style="margin-top:0vh; text-align: center; font-size:10vh; left: 50vw;">
          <span class="down01">﹀</span><br></br>
          <span class="down02">﹀</span><br></br>
          <span class="down03">﹀</span>
        </div>
      </a>
    </section>

    <ResearchIndex id="research" :title="'基于 QAR 数据的民航客机飞行状态实时预测研究'" :description="'构建三层PPP框架'" />

    <section id="publications" class="resume-section">
      <!-- 使用 ResearchIndex 组件，并通过 props 传入数据 -->
      <ResearchIndex :items="publications" layout="timeline" lineColor="#37bfe0" :title="'学术发表'" />
    </section>
    <a href="#projects">
      <div class="godown" style="margin-top: 0vh; text-align: center; font-size:10vh; left: 50vw;">
        <span class="down01">﹀</span><br></br>
        <span class="down02">﹀</span><br></br>
        <span class="down03">﹀</span>
      </div>
    </a>

    <section id="projects" class="resume-section">
      <!-- 使用 ResearchIndex 组件，并传入 projects 数据 -->
      <ResearchIndex :items="projects" layout="grid" :title="'工程项目'" />
    </section>

    <section id="skills" class="resume-section">

      <!-- [新] 使用 v-for 循环渲染每一个技能行 -->
      <div v-for="skillGroup in skills" :key="skillGroup.category.title" class="skill-category-row">
        <!-- 左侧的类别卡片，数据来自 skillGroup.category -->
        <ResearchCard class="category-tag" size="mid" :title="skillGroup.category.title"
          :icon="skillGroup.category.icon" :bgColor="skillGroup.category.bgColor" />
        <!-- 右侧的技能标签网格，数据来自 skillGroup.tags -->
        <div class="skill-tags-grid">
          <ResearchCard v-for="tag in skillGroup.tags" :key="tag.title" size="small" :title="tag.title"
            bgColor="#333" />
        </div>
      </div>
    </section>
    <a href="#education">
      <div class="godown" style="margin-top: 0vh; text-align: center; font-size:10vh; left: 50vw;">
        <span class="down01">﹀</span><br></br>
        <span class="down02">﹀</span><br></br>
        <span class="down03">﹀</span>
      </div>
    </a>

    <section id="education" class="resume-section">

      <!-- 使用 ResearchIndex 组件来渲染教育背景 -->
      <ResearchIndex :items="education" layout="grid" :title="'教育背景'" />
    </section>

    <section id="contact" class="resume-section">
      <h1>联系我 | CONTACT</h1>

      <div class="contact-grid">

        <!-- 左侧：联系信息 -->
        <div class="contact-details">
          <h3 style="font-weight: 700;">Let's Connect!</h3>
          <p>
            I'm currently seeking Ph.D. opportunities in Control Systems, Robotics, or related fields.
            I'm passionate about tackling challenging problems and collaborating with innovative minds.
            Feel free to reach out!
          </p>

          <div class="contact-links">
            <a :href="`mailto:${contactInfo.email}`" class="contact-link">
              <span class="icon">📧</span>
              <span class="text">{{ contactInfo.email }}</span>
            </a>
            <a :href="contactInfo.github" target="_blank" class="contact-link">
              <span class="icon">💻</span>
              <span class="text">GitHub Profile</span>
            </a>
            <a :href="contactInfo.website" target="_blank" class="contact-link">
              <span class="icon">🌐</span>
              <span class="text">Personal Website</span>
            </a>
            <div class="contact-link">
              <span class="icon">📍</span>
              <span class="text">{{ contactInfo.location }}</span>
            </div>
          </div>
        </div>

        <!-- 右侧：地图（一个简单的 iframe 嵌入） -->
        <div class="contact-map" id="contact">
          <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
            src="https://www.openstreetmap.org/export/embed.html?bbox=117.0,39.0,117.4,39.2&layer=mapnik"
            style="border: 1px solid black; border-radius: 12px;">
          </iframe>
        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}

a {
  text-decoration: none;
  transition: all 0.5s ease;
}

.godown {
  color: var(--vp-c-text-1);
  transition: all 0.5s ease;
  animation: down 2s ease infinite;
}

.godown:hover {
  color: var(--vp-c-brand-2);

}

.down01 {
  animation: blin 2s 0.4s ease infinite;
}

.down02 {
  animation: blin 2s 0.2s ease infinite;
}

.down03 {
  animation: blin 2s ease infinite;
}

@keyframes blin {
  0% {
    opacity: 1;
  }

  20% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes down {
  0% {}

  30% {
    /* 回到初始位置，准备下一次循环 */
    transform: translateY(1vh);
  }

  100% {}
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
  margin: 1vh auto;
  /* 在单列布局时居中 */
  border-radius: 500px;
  /* [关键] 改为 50% 来创建完美的圆形 */
  border: 10px solid var(--vp-c-text-1);
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
  font-size: 2vh;
  font-weight: 700;
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
  margin-top: 2vh;
  background-color: #12121317;
  border-radius: 24px;
  backdrop-filter: blur(15px);

}


.story-paragraph {
  color: var(--vp-c-text-1);
  font-size: 1.7em;
  font-weight: 600;
}

.story-paragraph:first-child {
  margin-bottom: 1em;
  color: var(--vp-c-text-2);
  font-weight: 400;
  font-size: 1em;
}

.tag-container {
  display: flex;
}

.tags {
  font-weight: 600;
  font-size: larger;
  border-radius: 2em;
  padding: 0px 10px;
  margin-right: 10px;
  filter: invert();
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

.skill-category-row {
  display: flex;
  align-items: flex-start;
  /* 顶部对齐 */
  gap: 20px;
  margin-bottom: 20px;
  height: 10vh;
}

.category-tag {
  flex-shrink: 0;
  /* 防止类别卡片被压缩 */
  width: 200px;
  /* 给一个固定的宽度 */
}

/* 覆盖 ResearchCard 的一些样式，让它更适合作为类别标签 */
:deep(.category-tag .title) {
  font-size: 1.2em;
}

:deep(.category-tag .icon) {
  font-size: 2em;
}

:deep(.category-tag:hover .details) {
  display: none;
  /* 类别卡片不需要显示详情 */
}


.skill-tags-grid {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  /* 允许标签换行 */
  gap: 10px;
  /* 标签之间的间距 */
}

/* 
  :deep() 是一个 Vue 的特殊选择器，
  它允许 scoped 样式穿透到子组件的根元素。
  我们用它来确保 ResearchCard 的 margin 被正确设置。
*/
:deep(.skill-tags-grid .research-card) {
  margin: 0;
  /* 移除 ResearchCard 可能自带的 margin */
}

/* 响应式调整 */
@media (max-width: 768px) {
  .skill-category-row {
    flex-direction: column;
    /* 变为上下布局 */
    align-items: stretch;
    /* 拉伸以适应宽度 */
  }

  .category-tag {
    width: 100%;
    /* 类别卡片占满整行 */
    text-align: center;
  }
}

.timeline-container {
  max-width: 800px;
  /* 时间轴布局通常窄一些更好看 */
  margin: 2em auto 0;
  /* 居中并与标题保持距离 */
  position: relative;
  /* 成为内部绝对定位元素的父级 */
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  align-items: center;
  margin-top: 2em;
  backdrop-filter: blur(15px);
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

.contact-details h3 {
  font-size: 1.8em;
  font-weight: 600;
  margin-bottom: 0.5em;
  color: var(--vp-c-brand-1);
  background-color: #12121317;
}

.contact-details p {
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin-bottom: 2em;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-weight: 500;
  transition: color 0.25s;
}

.contact-link:hover {
  color: var(--vp-c-brand-2);
}

.contact-link .icon {
  font-size: 1.5em;
  margin-right: 12px;
  width: 28px; /* 固定宽度以便对齐 */
  text-align: center;
}

.contact-map {
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--vp-shadow-2);
}

.contact-map iframe {
  filter: grayscale(0.8) contrast(1.2); /* [酷炫效果] 让地图变成灰度，更具设计感 */
  transition: filter 0.3s ease;
}

.contact-map:hover iframe {
  filter: grayscale(0) contrast(1); /* 鼠标悬停时恢复彩色 */
}
</style>