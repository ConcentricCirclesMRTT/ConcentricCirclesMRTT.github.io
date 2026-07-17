import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Database,
  FileStack,
  Menu,
  Waypoints,
  X,
} from "lucide-react";

const services = [
  {
    icon: FileStack,
    title: "多源图纸接入",
    english: "DRAWING INTAKE",
    description: "接收扫描图、PDF、DWG、DXF 等存量资料，保留文件、版本与原始位置。",
  },
  {
    icon: Waypoints,
    title: "工程信息结构化",
    english: "ENGINEERING DATA",
    description: "将图元、尺寸、构件、拓扑与约束整理为可检索、可编辑、可核验的工程数据。",
  },
  {
    icon: Database,
    title: "下游系统交付",
    english: "APPLICATION EXPORT",
    description: "按使用场景输出结构化数据、建模条件与接口，连接 CAD、PLM、数字孪生和 AI Agent。",
  },
];

const customerGroups = [
  { title: "电力与制造企业", description: "盘活存量图纸，为数据治理、资产管理和智能化建设提供工程数据。" },
  { title: "CAD、PLM 与数字化平台", description: "获得可接入、可核验的构件、尺寸、关系与工程语义。" },
  { title: "工业 AI 与 Agent 团队", description: "获得来自真实工程场景的高质量数据与上下文。" },
];

const pilotSteps = [
  {
    title: "样本评估",
    english: "ASSESS",
    description: "选择一组具有代表性的真实图纸，确认资料质量、业务问题与适用边界。",
  },
  {
    title: "目标定义",
    english: "DEFINE",
    description: "共同确定需要交付的数据、使用场景、人工验收方式与项目成功标准。",
  },
  {
    title: "小范围试点",
    english: "PILOT",
    description: "围绕一种图纸体系或一类高价值构件完成数据化闭环，并提供可检查结果。",
  },
  {
    title: "验收与扩展",
    english: "SCALE",
    description: "基于真实验收结果评估批量处理、系统接入和更多图纸类型的扩展计划。",
  },
];

const evidenceItems = [
  { title: "信息分散在不同视图", crop: "evidence-a" },
  { title: "格式与质量并不统一", crop: "evidence-b" },
  { title: "专业知识难以复用", crop: "evidence-c" },
  { title: "下游系统无法直接读取", crop: "evidence-d" },
];

const jobs = [
  {
    title: "多模态模型算法工程师",
    english: "MULTIMODAL MODEL ENGINEER",
    summary: "研究和适配多模态模型，让模型理解复杂专业图像、文本与文档。",
    requirements: ["多模态模型与视觉理解", "数据构造与模型评测", "Python / PyTorch", "实习 / 全职"],
  },
  {
    title: "多模态 Agent 工程师",
    english: "MULTIMODAL AGENT ENGINEER",
    summary: "将模型、工具和专业知识组织成可验证、可扩展的任务系统。",
    requirements: ["Agent 与工具调用", "结构化输出与工作流", "Python 工程能力", "实习 / 全职"],
  },
];

type PageId = "home" | "product" | "about" | "careers";

const pageFromHash = (): PageId => {
  const route = window.location.hash.replace("#/", "");
  return route === "product" || route === "about" || route === "careers" ? route : "home";
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
          <a className="contact-email" href="mailto:chenwy1@getui.com">contact@mrtt.ai</a>
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
            <p className="eyebrow">MRTT PRESENTS / ENGINEERING DATA COMPILER</p>
            <h1>仝心圆</h1>
            <h2>唤醒每一张工程图纸里的数据价值</h2>
            <p className="hero-description">
              仝心圆是 MRTT 推出的工程数据编译产品。它把沉睡在扫描图、PDF、DWG 与 DXF 里的工程知识，转化为可核验、可追溯、可编辑，并能被 CAD 与 AI 系统直接使用的数据。
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => navigate("product")}>
                看看图纸如何变成数据 <ArrowRight size={17} />
              </button>
              <button className="text-button" onClick={() => navigate("about")}>
                关于 MRTT <ArrowRight size={17} />
              </button>
            </div>
            <div className="hero-status"><span className="status-dot" /> CURRENT FOCUS / POWER TOWER DRAWINGS</div>
          </div>
        </div>
      </section>

      <section className="problem-section section-light" aria-labelledby="problem-title">
        <div className="page-grid problem-heading">
          <div><p className="section-index">OPPORTUNITY</p><h2 id="problem-title">工业 AI 的下一步，从读懂历史图纸开始</h2></div>
          <p>构件、尺寸、关系和工程语义被真正结构化之后，图纸才能进入企业的数据与智能化流程。</p>
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
          <p>为拥有大量存量图纸的工业企业，以及建设 CAD、PLM、数字孪生和工业 AI 的团队提供数据动力。</p>
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
          <div className="is-mrtt"><span>仝心圆 / MRTT</span><strong>工程数据编译与治理</strong><p>结构化 · 校验 · 证据链</p></div>
          <ArrowRight size={21} aria-hidden="true" />
          <div><span>APPLICATIONS</span><strong>工业软件与智能系统</strong><p>CAD · PLM · 数字孪生 · Agent</p></div>
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
        <div className="page-grid inner-hero-layout"><div><p className="eyebrow">仝心圆 / ENGINEERING DATA COMPILER</p><h1>唤醒图纸，让工程数据流动起来</h1></div><p>仝心圆连接企业档案库与 CAD、PLM、数字孪生和 AI Agent，让历史资料重新进入业务流程。</p></div>
      </section>
      <section className="business-section inner-section" aria-labelledby="delivery-title">
        <div className="page-grid section-heading"><div><p className="section-index">DATA PIPELINE</p><h2 id="delivery-title">从一张图，到一份可用的数据资产</h2></div><p>围绕真实使用场景，共同确定数据范围、交付格式和工程验收标准。</p></div>
        <div className="page-grid service-list">{services.map((service) => { const Icon = service.icon; return <article className="service-row" key={service.title}><Icon size={27} strokeWidth={1.6} /><div><h3>{service.title}</h3><span>{service.english}</span></div><p>{service.description}</p></article>; })}</div>
      </section>
      <section className="output-section" aria-labelledby="customer-title">
        <div className="page-grid output-heading"><div><p className="section-index light">WHO WE SERVE</p><h2 id="customer-title">让工程数据，在更多地方发挥作用</h2></div><p>从企业数据治理，到工业软件与 AI 应用，让同一份工程知识持续创造价值。</p></div>
        <div className="page-grid outcome-grid customer-grid">{customerGroups.map((group) => <article key={group.title}><h3>{group.title}</h3><p>{group.description}</p></article>)}</div>
      </section>
      <section className="pilot-section" aria-labelledby="pilot-title">
        <div className="page-grid pilot-heading"><div><p className="section-index">PILOT</p><h2 id="pilot-title">从一组真实图纸，跑通第一个结果</h2></div><p>先解决一个清楚、可验收的问题，再把有效的方法扩展到更多资料。</p></div>
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
        <div className="page-grid inner-hero-layout"><div><p className="eyebrow">ABOUT MRTT</p><h1>让工业知识，真正进入 AI 时代</h1></div><p>我们建设连接历史图纸、工程经验与新一代工业系统的数据基础。</p></div>
      </section>
      <section className="direction-section">
        <div className="page-grid direction-lead"><p className="section-index">DIRECTION</p><h2>从铁塔出发，把一条工程数据链路做深做透</h2><p>当前以电力铁塔图纸为起点，把经过验证的数据能力逐步带向更多工业场景。</p></div>
        <div className="page-grid direction-grid">
          <article><strong>吃透一个行业</strong><p>围绕电力铁塔建立真实可验收的数据标准、产品能力和交付闭环。</p></article>
          <article><strong>让数据越用越好</strong><p>持续积累标准、行业知识和反馈数据，让每次交付提升后续能力。</p></article>
          <article><strong>接入更多系统</strong><p>服务 CAD、PLM、数字孪生、知识库和 AI Agent，成为可靠的工程数据来源。</p></article>
        </div>
      </section>
      <section className="about-section compact-about"><div className="page-grid about-layout"><div className="about-copy"><p className="section-index">TEAM</p><h2>跨越 AI 与工程行业</h2><p>团队结合垂直领域 AI、复杂数据工程与铁塔行业经验，共同定义数据标准和交付结果。</p></div><div className="about-statement"><strong>DATA ENGINEERING<br />FOR THE PHYSICAL WORLD</strong><p>让行业知识成为可持续使用的数据</p></div></div></section>
      <ContactBand />
    </main>
  );
}

function CareersPage({ openJob, setOpenJob }: { openJob: number | null; setOpenJob: (value: number | null) => void }) {
  return (
    <main>
      <section className="inner-hero careers-hero"><div className="page-grid inner-hero-layout"><div><p className="eyebrow">CAREERS</p><h1>把 AI 带进真实、复杂的工业世界</h1></div><p>这里有不整齐的数据、明确的工程约束，也有真正能被客户使用的结果。实习与全职均可。</p></div></section>
      <section className="careers-section" aria-labelledby="careers-title"><div className="page-grid careers-heading"><div><p className="section-index">OPEN ROLES</p><h2 id="careers-title">多模态 AI 核心岗位</h2></div><p>两个方向都需要理解模型能力边界，并愿意把研究结果变成可验证的工程系统。</p></div><div className="page-grid job-list">{jobs.map((job, index) => { const isOpen = openJob === index; return <article className={`job-row ${isOpen ? "is-open" : ""}`} key={job.title}><button onClick={() => setOpenJob(isOpen ? null : index)} aria-expanded={isOpen}><span className="job-title"><strong>{job.title}</strong><small>{job.english}</small></span><span className="job-type">实习 / 全职</span><ChevronDown size={22} /></button><div className="job-details"><p>{job.summary}</p><ul>{job.requirements.map((item) => <li key={item}>{item}</li>)}</ul><a href="mailto:chenwy1@getui.com?subject=MRTT%20岗位申请">投递与沟通 <ArrowRight size={16} /></a></div></article>; })}</div></section>
      <ContactBand />
    </main>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openJob, setOpenJob] = useState<number | null>(null);
  const [page, setPage] = useState<PageId>(pageFromHash);

  useEffect(() => {
    const onHashChange = () => { setPage(pageFromHash()); window.scrollTo({ top: 0 }); };
    const onResize = () => { if (window.innerWidth > 820) setMobileOpen(false); };
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("hashchange", onHashChange); window.removeEventListener("resize", onResize); };
  }, []);

  useEffect(() => {
    const titles: Record<PageId, string> = {
      home: "仝心圆 | MRTT 工程数据智能",
      product: "仝心圆产品与合作 | MRTT",
      about: "关于我们 | MRTT",
      careers: "加入我们 | MRTT",
    };
    const descriptions: Record<PageId, string> = {
      home: "仝心圆是 MRTT 推出的工程数据编译产品，将扫描图、PDF、DWG 与 DXF 编译为可供 CAD 和 AI 系统使用的工程数据。",
      product: "了解仝心圆的工程图纸数据交付内容、验收结果与试点合作方式。",
      about: "了解 MRTT 从铁塔行业开始建设工程图纸数据能力的发展方向。",
      careers: "加入 MRTT，参与多模态 AI 与真实工业数据系统的研发。",
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
        <button className="wordmark" onClick={() => navigate("home")} aria-label="返回首页">MRTT</button>
        <nav className={`main-nav ${mobileOpen ? "is-open" : ""}`} aria-label="主导航">
          <button className={page === "product" ? "current" : ""} aria-current={page === "product" ? "page" : undefined} onClick={() => navigate("product")}>仝心圆</button>
          <button className={page === "about" ? "current" : ""} aria-current={page === "about" ? "page" : undefined} onClick={() => navigate("about")}>关于我们</button>
          <button className={page === "careers" ? "current" : ""} aria-current={page === "careers" ? "page" : undefined} onClick={() => navigate("careers")}>加入我们</button>
        </nav>
        <a className="header-contact" href="mailto:chenwy1@getui.com?subject=仝心圆%20合作咨询">联系合作 <ArrowRight size={16} /></a>
        <button className="menu-button" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? "关闭菜单" : "打开菜单"} aria-expanded={mobileOpen}>{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </header>
      {page === "home" && <HomePage navigate={navigate} />}
      {page === "product" && <ProductPage />}
      {page === "about" && <AboutPage />}
      {page === "careers" && <CareersPage openJob={openJob} setOpenJob={setOpenJob} />}
      <footer className="site-footer"><div className="page-grid footer-grid"><div><strong className="footer-wordmark">MRTT</strong><p>仝心圆 · 工程数据编译产品</p></div><div className="footer-links"><button onClick={() => navigate("home")}>首页</button><button onClick={() => navigate("product")}>仝心圆</button><button onClick={() => navigate("about")}>关于我们</button><button onClick={() => navigate("careers")}>加入我们</button></div><div className="footer-meta"><span>CHINA / 2026</span><span>© MRTT. ALL RIGHTS RESERVED.</span></div></div></footer>
    </div>
  );
}

export default App;
