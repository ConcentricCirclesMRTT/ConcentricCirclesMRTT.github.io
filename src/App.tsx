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
const LongContextTowerViewer = lazy(() =>
  import("./LongContextTowerViewer").then((module) => ({ default: module.LongContextTowerViewer })),
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
    description: "联合理解工程图像、文本、表格与文档。",
  },
  {
    label: "GEOMETRY & RELATIONS",
    title: "几何、拓扑与工程关系",
    description: "恢复构件、连接、约束与跨视图关系。",
  },
  {
    label: "STRUCTURED PREDICTION",
    title: "结构化工程表达",
    description: "以 Schema 和中间表示组织可计算的工程信息。",
  },
  {
    label: "ENGINEERING AGENT HARNESS",
    title: "工程 Agent Harness",
    description: "编排模型、领域 Skills、工具与验证流程。",
  },
  {
    label: "DATA & EVALUATION",
    title: "数据构造与可靠评测",
    description: "用真实失败案例建设数据与评测体系。",
  },
];

const jobs = [
  {
    "title": "Agent 工程师（AI4Industry / 工程智能方向）",
    "english": "AGENT ENGINEER / AI4INDUSTRY",
    "summary": "MRTT 正在建设面向复杂工程任务的 Agent 系统，当前从工程图纸理解、参数化建模与结果校验切入。我们希望让 AI 理解真实工程需求与专业资料，在工程师的指导下开展调研、制定方案、调用专业软件与计算工具，并对结果进行校验和修正，逐步探索设计、仿真与制造环节的协同。\n\n这是一条需要持续探索的复杂任务链路：资料可能不完整，图纸之间可能存在隐含关联，建模过程需要满足几何与工程约束，执行结果又会带来新的问题。我们正在把多模态模型、Agent、专业工具和工程知识结合起来，让系统能够在这些真实问题中持续推进任务，并交付可检查、可追溯的结果。",
    "context": "你将与团队一起定义目标、约束和验收标准，设计并指导 Agent 完成从问题调研到工程验证的全过程。我们看重你理解 AI、使用 AI 和改进 AI 系统的能力，也期待你把新的技术想法变成能运行、能复现、有实际效果的成果。\n\n一个典型任务是：面对工程设计与建模目标，让 Agent 识别信息缺口，查阅相关资料与工具文档，提出可执行的方案，调用建模或计算工具进行试验，依据几何约束、工程规则和工具反馈调整方案，并在关键决策处向工程师提供证据和待确认事项。你需要设计这条链路，观察它如何执行，并推动它逐步完成更复杂的任务。",
    "responsibilities": [
      "组织复杂调研与问题求解。 在团队指导下，把开放的工程问题转化为任务目标、研究步骤和验收条件；让 Agent 检索资料、阅读文档与代码、比较方案、开展实验，并保留结论依据。",
      "建设长链路 Agent 系统。 设计任务规划、上下文与记忆管理、执行状态、工具调用及失败恢复机制，让 Agent 能根据中间结果调整后续步骤，在多轮探索中保持目标与约束一致。",
      "连接专业工具与工程任务。 将图纸解析、几何计算、参数化建模、专业软件接口及校验工具接入 Agent，沉淀可复用的工具和 Skills，打通从工程信息理解到模型生成与验证的链路，并根据实际任务探索与仿真分析、制造工具的衔接。",
      "设计人机协作机制。 明确 Agent 可自主推进的范围、需要补充的信息和人工确认节点，把专业判断转化为可执行的约束、反馈和检查规则。",
      "用评测推动迭代。 建设代表性任务集，记录执行轨迹和失败案例，评估任务完成率、结果正确性、人工介入程度、时间与成本，验证每次改动的实际收益。",
      "积累数据与持续改进能力。 将图纸、工程文档、工具反馈、建模记录及人工修正整理为可追溯的数据；从成功与失败轨迹中提炼样例、规则和评测任务，探索对 Agent 策略、工具和模型的持续改进，并通过独立评测验证效果。",
      "把前沿方法带入真实任务。 持续关注 Agent 与模型能力的变化，主动试用、复现和比较新方法，将有价值的探索转化为可复用的工程成果。"
    ],
    "requirements": [
      "有亲手推进 AI 项目的经历，能够展示一个由你主导或深度参与的 Agent、自动化研究、工具使用或复杂任务求解项目，并讲清楚你的贡献、关键设计、失败过程和改进结果。",
      "主动探索新技术，尤其欢迎分享你在近年来尝试的新模型、新工具或新工作方式，以及它们如何改变了你的项目成果和工作习惯。",
      "理解大语言模型或多模态模型的能力与局限，能围绕任务选择模型、组织上下文、设计工具接口，并判断何时需要验证、重试或引入人工反馈。",
      "具备扎实的编程与调试能力，能够使用 Python 或其他熟悉的语言开发工具、处理数据、定位系统问题，并把实验原型推进到可复现的端到端流程。",
      "熟练使用 AI 编程与研究工具，能给 AI 清晰的目标和反馈，也能独立审查其产出、验证关键假设，对最终结果负责。",
      "愿意深入理解工程问题，能与领域专家协作，把专业知识转化为数据定义、工具能力和可验证的任务约束。",
      "有自主推进意识，能够在目标明确、路径尚需探索的情况下提出方案、开展试验、记录结论并持续迭代。"
    ],
    "background": "我们欢迎具有机器学习、深度学习、计算机视觉、软件工程或其他理工科背景的候选人。既有积累是重要基础，我们也关注你近期如何将这些积累与新的 AI 能力结合。不设置统一工作年限门槛，项目、研究、开源贡献和个人作品均可作为能力依据。",
    "preferred": [
      "AI4Science / AI4Industry： 用 AI 推进科学研究、实验设计、仿真计算、工程设计、制造或其他专业问题求解，有可展示的成果。",
      "有实际成果的 Agent 项目： 做过自主研究、代码执行、复杂工具使用、长任务规划或多 Agent 协作，并能说明系统在真实任务中的表现与改进过程。",
      "非常规数据与模型改进： 处理过工程图纸、实验记录、仿真输出、异构文档、几何结构或交互轨迹等数据，能将杂乱的专业信息整理为可用于评测、训练或反馈学习的数据。",
      "基于反馈的持续改进： 探索过轨迹筛选、合成数据、模型后训练、自动实验或 Agent 自我改进，能够说明数据质量、独立评测和改进有效性如何得到保障。",
      "工程设计与建模： 有机械 CAD（如 SolidWorks）、BIM 设计工具（如 Revit）、参数化建模、几何计算或约束求解经验，愿意把专业软件与工程知识转化为 Agent 可使用和验证的能力。",
      "仿真与制造： 有 CAE 仿真分析、CAM 加工编程或制造工艺相关经验，能够把工程目标转化为可执行的工具操作，并理解结果的验证方法。",
      "公开技术成果： 有开源项目、论文、技术文章、演示或持续维护的个人作品，能体现你的技术判断与动手能力。"
    ],
    "preferredNote": "以上为加分方向，不要求全部具备。已有 Agent 实践、愿意深入学习工业场景的候选人，同样欢迎申请。",
    "internship": [
      "欢迎本科生、硕士生和博士生，课程项目、实验室研究、竞赛及个人作品都可以作为交流起点。",
      "优先考虑能够连续实习 4 个月及以上的候选人，具体到岗时间和每周工作天数可以沟通。",
      "希望你能分享一次主动尝试新 AI 技术、推进真实任务并根据结果改进的经历。",
      "对优秀实习生开放长期合作或转正机会。"
    ],
    "benefits": [
      "参与 Agent 解决真实工业问题的完整过程，直接看到调研、工具、数据和模型能力如何共同影响工程结果。",
      "与团队及领域专家共同定义任务、架构和验证方法，作为早期成员影响技术路线与产品方向。",
      "在复杂任务求解、工程软件工具使用和数据反馈迭代中积累可复用的方法与作品。",
      "围绕真实问题持续试验前沿 AI 方法，让有价值的探索进入实际系统。"
    ]
  }
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
            <h2>唤醒每一张工程图纸里的数据价值</h2>
            <p className="hero-description">
              仝心圆是一款工程数据编译产品。它把沉睡在扫描图、PDF、DWG 与 DXF 里的工程知识，转化为可核验、可追溯、可编辑，并能被 CAD 与 AI 系统直接使用的数据。
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => navigate("product")}>
                看 AI 如何读图建模 <ArrowRight size={17} />
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
        <div className="page-grid problem-heading engineering-heading">
          <div><p className="section-index">WHY ENGINEERING AGENTS</p><h2 id="problem-title">模型越来越强，<br />工程理解仍需逐步核验。</h2></div>
          <p>3D 多模态与世界模型拓展了形状理解和生成的能力。但同一张工程图纸，仍可能支持多种看似合理的解释。工程 Agent 需要结合 AI 基座模型、工程规则与专业工具，把候选解释逐步核验为有依据的结果。</p>
        </div>
        <div className="page-grid engineering-reasons">
          <article>
            <span className="reason-number">01 / INFORMATION</span>
            <h3>图纸是三维实体的<br />选择性表达</h3>
            <p>二维投影只保留部分信息。深度、遮挡与连接关系，可能需要跨视图寻找证据才能确定。</p>
            <div className="reason-example"><span>一张投影</span><strong>多种空间解释</strong><small>可见轮廓之外，仍有待确认的信息。</small></div>
          </article>
          <article>
            <span className="reason-number">02 / KNOWLEDGE</span>
            <h3>工程知识需要成为<br />可执行的规则</h3>
            <p>基准、制图惯例与行业经验，常以隐含约定存在。Agent 需要识别这些约定，并转化为建模与检查的约束。</p>
            <div className="reason-example"><span>“以中心线为基准”</span><strong>明确基准与约束</strong><small>让专业经验进入工具可执行的流程。</small></div>
          </article>
          <article>
            <span className="reason-number">03 / VALIDATION</span>
            <h3>外观合理，<br />还需验证工程关系</h3>
            <p>相似的几何外观，可能对应完全不同的内部连接。对象、基准和依据，需要分别核验。</p>
            <div className="reason-example"><span>同一个交叉投影</span><strong>共享节点？前后错开？</strong><small>用连接证据判断，而非仅凭视觉相似度。</small></div>
          </article>
        </div>
        <div className="page-grid engineering-method">
          <div className="method-heading"><p className="section-index">HOW THE AGENT WORKS</p><h3>让每一步解释，都有核验的依据</h3><p>基座模型提出候选，工程规则与工具参与验证；在新证据中持续修订。</p></div>
          <ol className="verification-steps">
            <li><span>01</span><div><h4>提出解释</h4><p>从图纸中提出候选对象与关系。</p></div></li>
            <li><span>02</span><div><h4>保留候选</h4><p>区分已知事实、假设与未解问题。</p></div></li>
            <li><span>03</span><div><h4>调用工具</h4><p>检查几何、约束与关系的一致性。</p></div></li>
            <li><span>04</span><div><h4>依据修订</h4><p>根据证据回到图纸，继续核验与修正。</p></div></li>
          </ol>
          <p className="engineering-outcome">我们追求的工程解释：<strong>有依据、可解释、可复核。</strong></p>
        </div>
        <div className="page-grid evidence-intro"><p className="section-index">IN REAL DRAWINGS</p><h3>落到真实图纸，还有这四个难点</h3></div>
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
          <div><p className="section-index">WHERE WE WORK</p><h2 id="business-title">在历史图纸与下一代工业智能之间</h2></div>
          <p>仝心圆完成最基础也最关键的数据准备，让企业资料真正进入 CAD、PLM、数字孪生和工业 AI。</p>
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

      <section className="neube-section" aria-labelledby="neube-title">
        <div className="page-grid neube-layout">
          <div className="neube-copy">
            <p className="section-index">OPEN SOURCE / NEUBE SR</p>
            <h2 id="neube-title">从角钢塔开始，重构工程 AI 的方法。</h2>
            <p>NeuBE-Structural-Rebuild 是一套 fully open-source、可 Fork 的 AI Agent Skill 基座。它把图纸、观察、假设、语义、约束和复核组织成可追溯的结构重构流程。</p>
            <p>角钢输电塔是第一个高难度压力测试：结果不仅要有三维形状，还要保留证据、身份和验证状态。</p>
            <a className="text-button" href="/neube-sr-showcase/index.html">跨领域工程数据参数化重建解决方案 <ArrowRight size={17} /></a>
          </div>
          <a className="neube-image" href="/neube-sr-showcase/index.html" aria-label="打开跨领域工程数据参数化重建解决方案">
            <img src="/images/neube-sr-complete-tower.png" alt="NeuBE SR 重构的完整彩色角钢塔" />
            <span>打开展示 →</span>
          </a>
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
        <div className="page-grid product-hero-layout">
          <div className="product-hero-copy">
            <p className="eyebrow">仝心圆 / DRAWING MODELING AI</p>
            <h1>唤醒图纸，让工程数据流动起来</h1>
            <p>仝心圆让图纸中的几何、构件、尺寸、拓扑与依据成为机器可读、可验证、可调用的数据，连接 CAD、PLM、数字孪生和 AI Agent。</p>
          </div>
        </div>
      </section>
      <section className="model-section" aria-labelledby="model-title">
        <div className="page-grid model-heading">
          <div><p className="section-index light">AI-NATIVE ENGINEERING CONTEXT</p><h2 id="model-title">让 AI 读工程图纸，重建结构准确的三维几何</h2></div>
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
      <section className="long-context-section" aria-labelledby="long-context-title">
        <div className="page-grid long-context-heading">
          <div>
            <p className="section-index light">LONG-CONTEXT RECONSTRUCTION</p>
            <h2 id="long-context-title">多页、多视图、多模块，仍然重建成同一个结构。</h2>
          </div>
          <p>面对跨页图纸、重复编号、投影重合和分段装配，系统持续保留构件身份、跨视图关系和模块依赖，完成更长链条的结构建模。</p>
        </div>
        <div className="page-grid long-context-layout">
          <div className="long-context-copy">
            <div className="long-context-step"><span>01</span><div><strong>跨页证据连续</strong><small>Multi-page evidence</small><p>图纸页码、视图区域、标注和版本都进入同一条证据链。</p></div></div>
            <div className="long-context-step"><span>02</span><div><strong>跨视图身份一致</strong><small>Cross-view identity</small><p>正视、侧视、剖面和局部大样共同指向同一个物理构件。</p></div></div>
            <div className="long-context-step"><span>03</span><div><strong>跨模块装配闭合</strong><small>Multi-module assembly</small><p>M1–M6 分段连接、共享节点和依赖状态在整体模型中保持一致。</p></div></div>
          </div>
          <Suspense fallback={<div className="long-context-viewer"><div className="long-context-status">正在准备最新塔架…</div></div>}>
            <LongContextTowerViewer />
          </Suspense>
        </div>
        <div className="page-grid long-context-proof"><span>6 个模块</span><span>多页图纸</span><span>多视图关联</span><span>统一三维装配</span></div>
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
        <div className="page-grid research-hero-layout">
          <div className="research-hero-copy">
            <p className="eyebrow">仝心圆研究 / RESEARCH</p>
            <h1>研究让工业 AI 真正可用的问题</h1>
            <p>聚焦多模态理解、几何与拓扑、工程 Agent Harness。</p>
          </div>
        </div>
      </section>
      <section className="research-section" aria-labelledby="research-title">
        <div className="page-grid section-heading research-heading">
          <div><p className="section-index">RESEARCH DIRECTIONS</p><h2 id="research-title">工程数据编译的关键问题</h2></div>
          <p>研究成果必须可复现、可评测，并进入产品。</p>
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
            <p>用 Agent Harness 组织模型、领域 Skills、专业工具与验证器，从高约束任务中建立可靠工作流。</p>
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
          <p>模型、规则、工具和专家判断，共同对结果负责。</p>
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
            <p>欢迎有 Agent 实践成果，以及 AI4Science、AI4Industry 与工程数据背景的研究者和工程师。</p>
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
          <div><span>LOCATION</span><strong>杭州（可沟通）</strong></div>
          <div><span>EMPLOYMENT</span><strong>实习 · 应届 · 全职</strong></div>
          <div><span>STAGE</span><strong>从 0 到 1</strong></div>
          <div><span>COMPENSATION</span><strong>根据能力面议</strong></div>
        </div>
      </section>
      <section className="careers-section" aria-labelledby="careers-title">
        <div className="page-grid careers-heading">
          <div><p className="section-index">OPEN ROLES</p><h2 id="careers-title">Agent 工程师</h2></div>
          <p>AI4Industry / 工程智能方向。我们关注近期 AI 探索、复杂任务求解和实际成果，不设置统一工作年限门槛。</p>
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
                  {job.summary.split("\n\n").map((paragraph) => <p className="job-summary" key={paragraph}>{paragraph}</p>)}
                  <h3 className="job-context-title">你将参与什么</h3>
                  {job.context.split("\n\n").map((paragraph) => <p className="job-summary" key={paragraph}>{paragraph}</p>)}
                  <div className="role-detail-grid">
                    <section><h3>你会做什么</h3><ul>{job.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></section>
                    <section><h3>我们希望你</h3><ul>{job.requirements.map((item) => <li key={item}>{item}</li>)}</ul></section>
                    <section><h3>以下经历会让我们更想认识你</h3><ul>{job.preferred.map((item) => <li key={item}>{item}</li>)}</ul></section>
                  </div>
                  <p className="job-summary">{job.background}</p>
                  <p className="job-summary">{job.preferredNote}</p>
                  <div className="role-detail-grid role-support-grid">
                    <section><h3>如果你是在校生</h3><ul>{job.internship.map((item) => <li key={item}>{item}</li>)}</ul></section>
                    <section><h3>你将获得</h3><ul>{job.benefits.map((item) => <li key={item}>{item}</li>)}</ul></section>
                  </div>
                  <div className="application-actions">
                  <a className="job-apply" href={`mailto:chenwy1@getui.com?subject=MRTT%20${encodeURIComponent(job.title)}%20申请`}>申请这个岗位 <ArrowRight size={16} /></a>
                    <a className="application-email" href="mailto:chenwy1@getui.com">chenwy1@getui.com</a>
                  </div>
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
            <p>请发送简历，欢迎附上近期项目链接、演示、代码仓库、技术文章或简短说明：你解决了什么问题，Agent 完成了哪些工作，你做了哪些关键设计，如何验证结果，以及哪次失败或新技术尝试改变了你的做法。</p>
            <p>我们尤其期待看到你在 2026 年以来的探索与成果。保密项目可提供脱敏说明，投递阶段无需另行准备长篇材料。初步交流将围绕实际项目、技术判断和兴趣方向展开。</p>
            <div className="application-actions">
            <a className="primary-button" href="mailto:chenwy1@getui.com?subject=MRTT%20岗位申请">投递简历 <ArrowRight size={17} /></a>
              <a className="application-email" href="mailto:chenwy1@getui.com">chenwy1@getui.com</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openJob, setOpenJob] = useState<number | null>(0);
  const [page, setPage] = useState<PageId>(pageFromHash);

  useEffect(() => {
    const onHashChange = () => { setPage(pageFromHash()); setOpenJob(0); window.scrollTo({ top: 0 }); };
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
      careers: "加入 MRTT，建设面向复杂工程任务的 Agent 系统，探索工程设计、建模、仿真与制造协同。",
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
          <a className="showcase-link" href="/neube-sr-showcase/index.html">跨领域工程数据参数化重建解决方案</a>
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
      <footer className="site-footer"><div className="page-grid footer-grid"><div><strong className="footer-wordmark">MRTT</strong><p>工业数据 AI 公司 · 产品：仝心圆</p></div><div className="footer-links"><button onClick={() => navigate("home")}>首页</button><button onClick={() => navigate("product")}>图纸建模 AI 产品</button><button onClick={() => navigate("research")}>研究方向</button><a href="/neube-sr-showcase/index.html">跨领域工程数据参数化重建解决方案</a><button onClick={() => navigate("about")}>关于我们</button><button onClick={() => navigate("careers")}>加入我们</button></div><div className="footer-meta"><span>CHINA / 2026</span><span>Copyright © 2026 浙江每日互动研究院有限公司</span></div></div></footer>
    </div>
  );
}

export default App;
