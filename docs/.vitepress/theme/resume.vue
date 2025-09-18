<template>
  <div style="height:100vh;margin-top: 200px;">
    <BoardingPass />
  </div>
  
  
  <div class="my-home-container">
    
    <section class="hero-section">
      <div class="hero-content">
        <h1>个人简介</h1>
        <img></img>
        <div class="hero-wrapper">
          <h2 style="margin: 0%;">戴畇滔</h2>
          <p>中国民航大学硕士研究生在读</p>
          <h4>研究兴趣</h4>
          <p>飞行状态识别与监测</p>
          <h4>邮箱</h4>
          <p>daiyuntao123@163.com<br></br>
            daiyuntao928@gmail.com</p>
          <h4>ORCID</h4>
          <p>0009-0001-4427-5175</p>
        </div>
      </div>
    </section>

    <section class="bgs-section">
      <h1 style="background-color: #37bfe0; color: #f1f9ff;">教育背景|Education</h1>
      <div style="">
        <ul>
          <li>2023-09至今<h4>中国民航大学，空中交通管理学院<span style="color: #9fa2a3; font-weight: 100; font-size: small;"> - 天津</span></h4></li>交通运输工程
          <li>2018-09至2022-06<h4>东北林业大学，交通学院<span style="color: #9fa2a3; font-weight: 100; font-size: small;"> - 哈尔滨</span></h4></li>
          交通运输
        </ul>
      </div>
    </section>

    <section class="research-section">
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

    <section class="proj-section">
      <h1 style="background-color: #37bfe0; color: #f1f9ff;">项目经历|Projects</h1>
      <div style="">
        <ul>
          <li><h4>乌鲁木齐公交信息平台 <span style="font-size:smaller;">与乌鲁木齐市交通运输局合作项目</span></h4></li>
          采用Python Flask作为后端，Vue+ts作为前端<br></br>
          基于Openlayers实现基本GIS功能，智能分析和决策支持
          <li><h4>蒙特卡洛跑道容量模拟软件 <span style="font-size:smaller;">课程项目</span></h4></li>
          利用Java实现agent-based模拟飞机起降行为，支持自定义规则<br></br>
          <a href="https://github.com/NACHN/CaMS">于Github开源</a>
          <li><h4>格斗机器人设计与制造 <span style="font-size:smaller;">大学生工程能力竞赛，本科</span></h4></li>
          使用CATIA建模和有限元分析，使用3D打印制造<br></br>
          
        </ul>
      </div>
    </section>

    <section class="skills-section">
      <h1 style="background-color: #37bfe0; color: #f1f9ff;">技术技能|Skills</h1>
      <div style="">
        <ul>
          <li><h5>编程语言</h5>Python, Matlab, Julia, C/C++, JavaScript, TypeScript</li>
          <li><h5>科学计算与仿真</h5>Matlab, Simulink, Modelica, CATIA</li>
          <li><h5>软件开发</h5>Git, Linux, Vue, Server Deployment</li>
          <li><h5>设计与建模</h5>Blender, 3Ds Max, Substance Painter, Adobe Suite(Photoshop, Illustrator), EDA</li>
        </ul>
      </div>
    </section>

  </div>
</template>

<style scoped>
/* 在这里写你首页专属的 CSS */
.my-home-container {
  padding-top: var(--vp-nav-height);
  /* 关键：留出顶部导航栏的高度 */
}

.hero-section {
  background: linear-gradient(45deg, #0d58b9, #37bfe0);
  padding: 20px 20px;
  text-align: center;
  color: white;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1rem;
  margin-bottom: 0rem;
}

.hero-wrapper {
  text-align: left;
}

.cta-button {
  background-color: white;
  color: #646cff;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.custom-section {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
}

.perception{
  background-color: #80ecb6;
  color:#131314;
  border-radius: 20px;
  padding:20px;
  margin:20px 0;
}
.perception h1{
  color:#053b20;
}
.prediction{
  background-color: #80c4ec;
  color:#131314;
  border-radius: 20px;
  padding:20px;
  margin:20px 0;
}
.prediction h1{
  color:#08324b;
}
.precaution{
  background-color: #ecc680;
  color:#131314;
  border-radius: 20px;
  padding:20px;
  margin:20px 0;
}
.precaution h1{
  color:#4e3609;
}
</style>