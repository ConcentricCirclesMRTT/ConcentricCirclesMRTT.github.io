import { lazy, Suspense, useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Database,
  ExternalLink,
  FileStack,
  Menu,
  Waypoints,
  X,
} from "lucide-react";

const TowerModelViewer = lazy(() =>
  import("./TowerModelViewer").then((module) => ({ default: module.TowerModelViewer })),
);

const services = [
  {
    icon: FileStack,
    title: "多源图纸接入",
    english: "DRAWING INTAKE",
    description: "接收扫描图、PDF、DWG、DXF 等存量资料，保留文件、版本与原始位置。",
  },
  {
    icon: Waypoints,
    title: "工程信息编译",
    english: "ENGINEERING COMPILATION",
    description: "读取图纸标注、尺寸与构件关系，并与物料表等工程资料交叉核验。",
  },
  {
    icon: Database,
    title: "可信结果交付",
    english: "VERIFIED DELIVERY",
    description: "由工程 Agent Harness 编排专业 Skills、工具与验证流程，输出可验证并能进入 CAD、PLM、数字孪生和 AI 系统的工程上下文。",
  },
];

const customerGroups = [
  { title: "电力与制造企业", description: "盘活存量图纸，为数据治理、资产管理和智能化建设提供工程数据。" },
  { title: "CAD、PLM 与数字化平台", description: "获得可接入、可核验的构件、尺寸、关系与工程语义。" },
  { title: "工业 AI 与 Agent 团队", description: "获得来自真实工程场景的高质量数据与上下文。" },
];

const pilotSteps = [
  {
    title: "资料与场景对齐",
    english: "ALIGN",
    description: "了解现有图纸、工程资料与业务流程，明确优先解决的真实问题。",
  },
  {
    title: "交付标准定义",
    english: "DEFINE",
    description: "共同确认数据范围、质量标准、输出格式与工程验收方式。",
  },
  {
    title: "联合验证",
    english: "VALIDATE",
    description: "选取具有代表性的资料完成交付闭环，以真实工程结果验证能力与边界。",
  },
  {
    title: "批量落地",
    english: "SCALE",
    description: "在验收基础上扩展处理规模、图纸类型，并接入客户现有系统与工作流。",
  },
];

const evidenceItems = [
  { title: "信息分散在不同视图", crop: "evidence-a" },
  { title: "格式与质量并不统一", crop: "evidence-b" },
  { title: "专业知识难以复用", crop: "evidence-c" },
  { title: "下游系统无法直接读取", crop: "evidence-d" },
];

const researchAreas = [
  {
    label: "MULTIMODAL UNDERSTANDING",
    title: "工业多模态理解",
    description: "让模型综合理解工程图像、文本、表格和文档，并在复杂页面中定位真正有用的信息。",
  },
  {
    label: "GEOMETRY & RELATIONS",
    title: "几何、拓扑与工程关系",
    description: "从图形元素出发，恢复构件、连接、约束与跨视图关系，让视觉结果符合工程逻辑。",
  },
  {
    label: "STRUCTURED PREDICTION",
    title: "结构化工程表达",
    description: "研究 Schema 驱动的数据提取与中间表示，使结果可检索、可编辑、可计算。",
  },
  {
    label: "ENGINEERING AGENT HARNESS",
    title: "工程 Agent Harness",
    description: "研究如何组织多模态模型、领域 Skills、专业工具、验证器与人工复核，稳定完成高约束工程任务。",
  },
  {
    label: "DATA & EVALUATION",
    title: "数据构造与可靠评测",
    description: "围绕真实失败案例建设数据、评测和置信机制，持续识别能力边界并推动迭代。",
  },
];

const jobs = [
  {
    title: "多模态模型研究工程师",
    english: "MULTIMODAL MODEL RESEARCH ENGINEER",
    summary: "让多模态模型理解复杂专业图像、文本与文档，并产出可验证的结构化结果。",
    responsibilities: [
      "将真实业务现象抽象为可研究、可评测的多模态任务",
      "建立模型基线，设计对照实验并分析长尾与失败案例",
      "建设数据定义、标注规范、清洗增强与合成数据流程",
      "开展模型适配、后训练、推理优化和原型验证",
      "将实验沉淀为可复现代码、评测报告和产品能力",
    ],
    requirements: [
      "具备机器学习、计算机视觉或多模态学习基础",
      "理解 Transformer 与视觉语言模型的基本原理",
      "能够使用 Python、PyTorch 完成实验与数据处理",
      "愿意从真实数据和失败案例出发持续分析问题",
      "能够清楚说明自己的实际工作与技术判断",
    ],
    preferred: ["论文、技术报告或系统性实验成果", "高质量开源项目或算法竞赛成果", "文档理解、视觉定位、OCR 或三维视觉经验"],
  },
  {
    title: "多模态 Agent 研究工程师",
    english: "MULTIMODAL AGENT RESEARCH ENGINEER",
    summary: "将模型、工具、领域知识与数据流程组织成可靠、可验证的多模态 Agent 系统。",
    responsibilities: [
      "将复杂数据目标拆解为可观测、可验证的 Agent 子任务",
      "设计 Processing Graph、工作流、状态流转与上下文组织",
      "编排多模态模型、检索、规则和专业工具",
      "建设结构化输出、校验、重试、降级与人工复核机制",
      "构建任务轨迹、标准任务集和端到端评测体系",
    ],
    requirements: [
      "理解大语言模型与多模态模型的工作方式和能力边界",
      "具备 Agent、工具调用或复杂 AI 工作流实践",
      "能够使用 Python 开发数据流程、后端服务或工具接口",
      "熟悉 JSON Schema、Pydantic 等结构化表达方式",
      "重视可观测性、任务质量和实际业务结果",
    ],
    preferred: ["多模态 Agent、文档智能或信息抽取经验", "开源 Agent 项目、论文或技术作品", "模型评测、LLMOps 或人机协同经验"],
  },
];

type PageId = "home" | "product" | "research" | "about" | "careers";

const pageFromHash = (): PageId => {
  const route = window.location.hash.replace("#/", "");
  return route === "product" || route === "research" || route === "about" || route === "careers" ? route : "home";
};

function ContactBand() {
  return (
    <section className="contact-section" aria-labelledby="contact-title">
      <div className="page-grid contact-layout">
        <p className="section-index light">CONTACT</p>
        <h2 id="contact-title">让你的工程图纸，重新开始工作。</h2>
        <div className="contact-actions">
          <a className="primary-button light-button" href="mailto:chenwy1@getui.com?subject=仝心圆%20试点合作">
            联系合作 <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}

function HomePage({ navigate }: { navigate: (page: PageId) => void }) {
  return (
    <main>
      <section className="hero" id="top">
        <div className="hero-content page-grid">
          <div className="hero-copy">
            <p className="eyebrow">仝心圆 / INDUSTRIAL DATA AI</p>
            <h1>仝心圆</h1>
            <h2>把面向人的工程图纸，转化为 AI 原生的工程上下文</h2>
            <p className="hero-description">
              仝心圆是一款图纸建模 AI 产品。它把扫描图、PDF、DWG 与 DXF 中的几何、构件、尺寸和关系，转化为可验证、可追溯，并能被 CAD 与 AI Agent 直接调用的工程上下文。
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => navigate("product")}>
                看看图纸如何进入 AI 工作流 <ArrowRight size={17} />
              </button>
              <button className="text-button" onClick={() => navigate("about")}>
                关于我们 <ArrowRight size={17} />
              </button>
            </div>
            <div className="hero-status"><span className="status-dot" /> CURRENT FOCUS / POWER TOWER DRAWINGS</div>
          </div>
        </div>
      </section>

      <section className="problem-section section-light" aria-labelledby="problem-title">
        <div className="page-grid problem-heading">
          <div><p className="section-index">OPPORTUNITY</p><h2 id="problem-title">工业 AI 的下一步，从读懂历史图纸开始</h2></div>
          <p>当构件、尺寸、关系和工程语义成为机器可读的上下文，图纸才能真正进入企业的 AI 工作流。</p>
        </div>
        <div className="page-grid evidence-strip">
          {evidenceItems.map((item) => (
            <article className="evidence-item" key={item.title}>
              <div className={`evidence-image ${item.crop}`}><img src="/images/tower-crop.webp" alt="铁塔工程图纸局部" /></div>
              <div className="evidence-caption"><p>{item.title}</p></div>
            </article>
          ))}
          <div className="evidence-line" aria-hidden="true" />
        </div>
      </section>

      <section className="business-section" aria-labelledby="business-title">
        <div className="page-grid section-heading business-heading">
          <div><p className="section-index">OUR POSITION</p><h2 id="business-title">让历史图纸，接上新一代工业系统</h2></div>
          <p>为拥有大量存量图纸的工业企业，以及建设 CAD、PLM、数字孪生和工业 AI 的团队提供机器可用的上游工程数据。</p>
        </div>
        <div className="page-grid service-list">
          {services.map((service) => {
            const Icon = service.icon;
            return <article className="service-row" key={service.title}><Icon size={27} strokeWidth={1.6} /><div><h3>{service.title}</h3><span>{service.english}</span></div><p>{service.description}</p></article>;
          })}
        </div>
        <div className="page-grid ecosystem-flow" aria-label="仝心圆在工业数据链路中的位置">
          <div><span>INPUT</span><strong>非结构化工程资料</strong><p>扫描图 · PDF · DWG · DXF</p></div>
          <ArrowRight size={21} aria-hidden="true" />
          <div className="is-mrtt"><span>仝心圆</span><strong>工程上下文编译</strong><p>结构化 · 校验 · 证据链</p></div>
          <ArrowRight size={21} aria-hidden="true" />
          <div><span>APPLICATIONS</span><strong>工业软件与智能系统</strong><p>CAD · PLM · 数字孪生 · AI Agent Harness</p></div>
        </div>
      </section>

      <section className="focus-section" aria-labelledby="focus-title">
        <div className="page-grid focus-layout">
          <div className="focus-image"><img src="/images/mrtt-hero.webp" alt="铁塔图纸与结构化数据" /><span>CURRENT FOCUS</span></div>
          <div className="focus-copy">
            <p className="section-index">POWER TOWER ENGINEERING</p>
            <h2 id="focus-title">从电力铁塔开始，把复杂数据做扎实</h2>
            <p>先吃透一个行业、一类对象和一个真实结果，再把经过验证的工程数据能力带向更多工业场景。</p>
            <button className="text-button" onClick={() => navigate("about")}>了解我们的发展方向 <ArrowRight size={17} /></button>
          </div>
        </div>
      </section>
      <ContactBand />
    </main>
  );
}

function ProductPage() {
  return (
    <main>
      <section className="inner-hero product-hero">
        <div className="page-grid inner-hero-layout"><div><p className="eyebrow">仝心圆 / DRAWING MODELING AI</p><h1>从面向人的图纸，到 AI 原生的工程上下文</h1></div><p>仝心圆让图纸中的几何、构件、尺寸、拓扑与依据成为机器可读、可验证、可调用的数据，连接 CAD、PLM、数字孪生和 AI Agent。</p></div>
      </section>
      <section className="model-section" aria-labelledby="model-title">
        <div className="page-grid model-heading">
          <div><p className="section-index light">AI-NATIVE ENGINEERING CONTEXT</p><h2 id="model-title">让 AI 读图、推理并重建工程结构</h2></div>
          <p>多模态 AI 与工程 Agent Harness 读取尺寸、标注和构件关系，交叉核对物料表，并通过几何求解确保结果精确、可核验。</p>
        </div>
        <Suspense fallback={<div className="tower-viewer"><div className="viewer-status">正在准备三维查看器...</div></div>}>
          <TowerModelViewer />
        </Suspense>
        <div className="precision-strip">
          <article><span>DRAWING READINGS</span><strong>图纸读数</strong><p>读取尺寸、标注、构件编号与跨视图对应关系。</p></article>
          <article><span>BOM CROSS-CHECK</span><strong>物料表核验</strong><p>交叉核对构件规格、数量、编号与工程资料。</p></article>
          <article><span>GEOMETRY VALIDATION</span><strong>几何求解验证</strong><p>检查拓扑连接、几何约束、结构闭合与工程一致性。</p></article>
        </div>
      </section>
      <section className="business-section inner-section" aria-labelledby="delivery-title">
        <div className="page-grid section-heading"><div><p className="section-index">DATA PIPELINE</p><h2 id="delivery-title">从一张图，到可供 AI 使用的工程上下文</h2></div><p>围绕真实使用场景，共同确定数据范围、质量标准、交付格式和工程验收方式。</p></div>
        <div className="page-grid service-list">{services.map((service) => { const Icon = service.icon; return <article className="service-row" key={service.title}><Icon size={27} strokeWidth={1.6} /><div><h3>{service.title}</h3><span>{service.english}</span></div><p>{service.description}</p></article>; })}</div>
      </section>
      <section className="output-section" aria-labelledby="customer-title">
        <div className="page-grid output-heading"><div><p className="section-index light">WHO WE SERVE</p><h2 id="customer-title">让工程上下文，在更多系统中发挥作用</h2></div><p>从企业数据治理，到工业软件与 AI 应用，让同一份工程知识持续被机器理解和调用。</p></div>
        <div className="page-grid outcome-grid customer-grid">{customerGroups.map((group) => <article key={group.title}><h3>{group.title}</h3><p>{group.description}</p></article>)}</div>
      </section>
      <section className="pilot-section" aria-labelledby="pilot-title">
        <div className="page-grid pilot-heading"><div><p className="section-index">HOW WE WORK</p><h2 id="pilot-title">合作，从真实工程资料开始</h2></div><p>围绕一个明确的业务场景，共同定义数据边界、交付结果与验收标准，再将经过验证的能力带入更大规模的工程流程。</p></div>
        <div className="page-grid pilot-steps">{pilotSteps.map((step) => <article key={step.title}><span>{step.english}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div>
      </section>
      <ContactBand />
    </main>
  );
}

function AboutPage() {
  return (
    <main>
      <section className="inner-hero about-hero">
        <div className="page-grid inner-hero-layout"><div><p className="eyebrow">关于仝心圆 / ABOUT</p><h1>让工业知识，真正进入 AI 时代</h1></div><p>我们是一家专注工业工程数据的 AI 公司，建设连接历史图纸、工程经验与新一代工业系统的数据基础。</p></div>
      </section>
      <section className="backing-section" aria-labelledby="backing-title">
        <div className="page-grid backing-layout">
          <p className="section-index">INDUSTRY ECOSYSTEM</p>
          <div className="backing-copy">
            <h2 id="backing-title">扎根数据智能与产业创新生态</h2>
            <p>MRTT 聚焦工业存量图纸的数据智能化，把复杂、分散的工程资料转化为可验证并能够进入真实业务流程的工程上下文。</p>
          </div>
          <div className="affiliation-links" aria-label="关联品牌与企业">
            <a href="https://ge.cn/" target="_blank" rel="noreferrer">每日互动 <ExternalLink size={16} /></a>
            <a href="https://www.getui.com/" target="_blank" rel="noreferrer">个推 <ExternalLink size={16} /></a>
            <a href="https://www.taichang.com/m/" target="_blank" rel="noreferrer">泰昌集团 <ExternalLink size={16} /></a>
          </div>
        </div>
      </section>
      <section className="direction-section">
        <div className="page-grid direction-lead"><p className="section-index">DIRECTION</p><h2>从铁塔出发，把一条工程数据链路做深做透</h2><p>当前以电力铁塔图纸为起点，把经过验证的数据能力逐步带向更多工业场景。</p></div>
        <div className="page-grid direction-grid">
          <article><strong>吃透一个行业</strong><p>围绕电力铁塔建立真实可验收的数据标准、产品能力和交付闭环。</p></article>
          <article><strong>让数据越用越好</strong><p>持续积累标准、行业知识和反馈数据，让每次交付提升后续能力。</p></article>
          <article><strong>接入更多系统</strong><p>服务 CAD、PLM、数字孪生、知识库和 AI Agent Harness，成为可靠的工程数据来源。</p></article>
        </div>
      </section>
      <section className="about-section compact-about"><div className="page-grid about-layout"><div className="about-copy"><p className="section-index">TEAM</p><h2>跨越 AI 与工程行业</h2><p>团队结合垂直领域 AI、复杂数据工程与铁塔行业经验，共同定义数据标准和交付结果。</p></div><div className="about-statement"><strong>DATA ENGINEERING<br />FOR THE PHYSICAL WORLD</strong><p>让行业知识成为可持续使用的数据</p></div></div></section>
      <ContactBand />
    </main>
  );
}

function ResearchPage() {
  return (
    <main>
      <section className="inner-hero research-hero">
        <div className="page-grid inner-hero-layout">
          <div><p className="eyebrow">仝心圆研究 / RESEARCH</p><h1>研究那些让工业数据真正可用的问题</h1></div>
          <p>从多模态理解、工程关系重建到 Agent Harness，我们研究如何让 AI 在专业工具与工程约束下，稳定完成真实任务。</p>
        </div>
      </section>
      <section className="research-section" aria-labelledby="research-title">
        <div className="page-grid section-heading research-heading">
          <div><p className="section-index">RESEARCH DIRECTIONS</p><h2 id="research-title">面向工程数据编译的长期研究</h2></div>
          <p>研究不以单次 Demo 为终点，而要形成可复现、可评测、可以进入产品的数据与系统能力。</p>
        </div>
        <div className="page-grid research-list">
          {researchAreas.map((area) => (
            <article key={area.title}>
              <span>{area.label}</span>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="harness-section" aria-labelledby="harness-title">
        <div className="page-grid harness-heading">
          <div><p className="section-index">AGENT HARNESS</p><h2 id="harness-title">让 AI 在工程约束下完成复杂任务</h2></div>
          <div>
            <p>我们建设面向工程数据任务的 Agent Harness，将模型能力组织成可观测、可验证、可持续迭代的工作系统。</p>
            <p>当前从铁塔工程重构等高约束任务开始，验证领域 Skills 与专业工具协同工作的边界。</p>
          </div>
        </div>
        <div className="page-grid harness-grid">
          <article><span>TASK SCAFFOLD</span><h3>任务骨架</h3><p>将复杂工程目标拆解为有状态、可观测的处理阶段。</p></article>
          <article><span>DOMAIN SKILLS</span><h3>领域 Skills</h3><p>沉淀专业任务所需的知识边界、输入要求与能力模块。</p></article>
          <article><span>TOOLS & SOLVERS</span><h3>工具与求解器</h3><p>连接解析、几何、规则与 CAD 工具，处理需要确定性的环节。</p></article>
          <article><span>VERIFICATION</span><h3>验证与复核</h3><p>通过评测、验证器和专家判断管理错误、歧义与结果质量。</p></article>
        </div>
      </section>
      <section className="output-section research-values" aria-labelledby="research-values-title">
        <div className="page-grid output-heading">
          <div><p className="section-index light">HOW WE RESEARCH</p><h2 id="research-values-title">从真实数据出发，用工程结果回答</h2></div>
          <p>模型能力、传统方法、行业规则和人工判断都服务于同一个目标：更可靠的数据结果。</p>
        </div>
        <div className="page-grid outcome-grid customer-grid">
          <article><h3>真实问题</h3><p>从企业资料和实际工作流中定义任务，持续面对噪声、缺失和长尾情况。</p></article>
          <article><h3>可靠评测</h3><p>建设独立数据集、失败分析和端到端验收，不以少量展示样例判断能力。</p></article>
          <article><h3>研究进入产品</h3><p>将实验结果沉淀为数据标准、工具、工作流和可以持续迭代的产品模块。</p></article>
        </div>
      </section>
      <section className="research-cta">
        <div className="page-grid research-cta-layout">
          <div><p className="section-index">WORK WITH US</p><h2>和我们一起，把开放问题做成真实能力</h2></div>
          <div>
            <p>欢迎多模态 AI、计算机视觉、Agent、文档智能和工程数据方向的研究者与工程师加入。</p>
            <a className="text-button" href="#/careers">查看开放岗位 <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>
      <ContactBand />
    </main>
  );
}

function CareersPage({ openJob, setOpenJob }: { openJob: number | null; setOpenJob: (value: number | null) => void }) {
  return (
    <main>
      <section className="inner-hero careers-hero">
        <div className="page-grid inner-hero-layout"><div><p className="eyebrow">加入仝心圆 / CAREERS</p><h1>把 AI 带进真实、复杂的工业世界</h1></div><p>这里有开放的研究问题、明确的工程约束，也有真正能被客户使用的结果。实习、应届及全职均可。</p></div>
      </section>
      <section className="career-facts" aria-label="招聘基本信息">
        <div className="page-grid career-facts-grid">
          <div><span>LOCATION</span><strong>杭州</strong></div>
          <div><span>EMPLOYMENT</span><strong>实习 · 应届 · 全职</strong></div>
          <div><span>STAGE</span><strong>从 0 到 1</strong></div>
          <div><span>COMPENSATION</span><strong>根据能力面议</strong></div>
        </div>
      </section>
      <section className="careers-section" aria-labelledby="careers-title">
        <div className="page-grid careers-heading">
          <div><p className="section-index">OPEN ROLES</p><h2 id="careers-title">多模态 AI 研究工程师</h2></div>
          <p>我们关注学习能力、问题拆解、技术深度和实际产出，不以工作年限作为唯一判断标准。</p>
        </div>
        <div className="page-grid job-list">
          {jobs.map((job, index) => {
            const isOpen = openJob === index;
            return (
              <article className={`job-row ${isOpen ? "is-open" : ""}`} key={job.title}>
                <button
                  onClick={() => setOpenJob(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`job-details-${index}`}
                >
                  <span className="job-title"><strong>{job.title}</strong><small>{job.english}</small></span>
                  <span className="job-type">杭州 · 实习 / 应届 / 全职</span>
                  <ChevronDown size={22} />
                </button>
                <div className="job-details" id={`job-details-${index}`} aria-hidden={!isOpen}>
                  <p className="job-summary">{job.summary}</p>
                  <div className="role-detail-grid">
                    <section><h3>你会做什么</h3><ul>{job.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></section>
                    <section><h3>我们希望你</h3><ul>{job.requirements.map((item) => <li key={item}>{item}</li>)}</ul></section>
                    <section><h3>加分项</h3><ul>{job.preferred.map((item) => <li key={item}>{item}</li>)}</ul></section>
                  </div>
                  <a className="job-apply" href={`mailto:chenwy1@getui.com?subject=MRTT%20${encodeURIComponent(job.title)}%20申请`}>申请这个岗位 <ArrowRight size={16} /></a>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="application-section" aria-labelledby="application-title">
        <div className="page-grid application-layout">
          <div><p className="section-index">APPLICATION</p><h2 id="application-title">用你最真实的作品和我们聊聊</h2></div>
          <div>
            <p>投递简历即可。也欢迎附上 GitHub、论文、技术报告、竞赛、专利或个人项目，并用一两句话说明最能代表你的工作。</p>
            <p>简历初筛通过后，我们会安排一次约 30 分钟的轻量交流。优秀实习生开放长期合作与转正机会。</p>
            <a className="primary-button" href="mailto:chenwy1@getui.com?subject=MRTT%20岗位申请">投递简历 <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>
    </main>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openJob, setOpenJob] = useState<number | null>(null);
  const [page, setPage] = useState<PageId>(pageFromHash);

  useEffect(() => {
    const onHashChange = () => { setPage(pageFromHash()); setOpenJob(null); window.scrollTo({ top: 0 }); };
    const onResize = () => { if (window.innerWidth > 820) setMobileOpen(false); };
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("hashchange", onHashChange); window.removeEventListener("resize", onResize); };
  }, []);

  useEffect(() => {
    const titles: Record<PageId, string> = {
      home: "仝心圆 | AI 原生工程上下文",
      product: "图纸建模 AI 产品 | 仝心圆",
      research: "研究方向 | 仝心圆",
      about: "关于我们 | 仝心圆",
      careers: "加入我们 | 仝心圆",
    };
    const descriptions: Record<PageId, string> = {
      home: "仝心圆将面向人的扫描图、PDF、DWG 与 DXF 编译为可供 CAD 和 AI Agent 使用的工程上下文。",
      product: "了解仝心圆如何通过 AI 读取工程图纸，重建可验证的结构化数据与三维几何。",
      research: "了解 MRTT 在工业多模态理解、工程关系、结构化预测、Agent Harness 和可靠评测方向的研究。",
      about: "了解仝心圆背后的 MRTT 公司、产业生态与工程图纸数据能力。",
      careers: "加入 MRTT，参与多模态模型、Agent 与真实工业数据系统的研究和研发。",
    };
    document.title = titles[page];
    document.querySelector('meta[name="description"]')?.setAttribute("content", descriptions[page]);
  }, [page]);

  const navigate = (nextPage: PageId) => {
    setMobileOpen(false);
    if (nextPage === page) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    window.location.hash = nextPage === "home" ? "#/" : `#/${nextPage}`;
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <button className="wordmark" onClick={() => navigate("home")} aria-label="返回首页">仝心圆</button>
        <nav className={`main-nav ${mobileOpen ? "is-open" : ""}`} aria-label="主导航">
          <button className={page === "product" ? "current" : ""} aria-current={page === "product" ? "page" : undefined} onClick={() => navigate("product")}>图纸建模 AI 产品</button>
          <button className={page === "research" ? "current" : ""} aria-current={page === "research" ? "page" : undefined} onClick={() => navigate("research")}>研究方向</button>
          <button className={page === "about" ? "current" : ""} aria-current={page === "about" ? "page" : undefined} onClick={() => navigate("about")}>关于我们</button>
          <button className={page === "careers" ? "current" : ""} aria-current={page === "careers" ? "page" : undefined} onClick={() => navigate("careers")}>加入我们</button>
        </nav>
        <a className="header-contact" href="mailto:chenwy1@getui.com?subject=仝心圆%20合作咨询">联系合作 <ArrowRight size={16} /></a>
        <button className="menu-button" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? "关闭菜单" : "打开菜单"} aria-expanded={mobileOpen}>{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </header>
      {page === "home" && <HomePage navigate={navigate} />}
      {page === "product" && <ProductPage />}
      {page === "research" && <ResearchPage />}
      {page === "about" && <AboutPage />}
      {page === "careers" && <CareersPage openJob={openJob} setOpenJob={setOpenJob} />}
      <footer className="site-footer"><div className="page-grid footer-grid"><div><strong className="footer-wordmark">MRTT</strong><p>工业数据 AI 公司 · 产品：仝心圆</p></div><div className="footer-links"><button onClick={() => navigate("home")}>首页</button><button onClick={() => navigate("product")}>图纸建模 AI 产品</button><button onClick={() => navigate("research")}>研究方向</button><button onClick={() => navigate("about")}>关于我们</button><button onClick={() => navigate("careers")}>加入我们</button></div><div className="footer-meta"><span>CHINA / 2026</span><span>Copyright © 2026 浙江每日互动研究院有限公司</span></div></div></footer>
    </div>
  );
}

export default App;
