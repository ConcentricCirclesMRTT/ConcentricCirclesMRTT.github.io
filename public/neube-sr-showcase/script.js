const sections = [...document.querySelectorAll(".scene")];
const navLinks = [...document.querySelectorAll(".rail a")];
const counter = document.querySelector("#counter");
const progressBar = document.querySelector("#progressBar");
const railFill = document.querySelector("#railFill");
const stateImage = document.querySelector("#explorerImage");
const imageFrame = document.querySelector(".explorer-image-frame");

const states = {
  evidence: {
    kicker: "来源 / 原始观察",
    title: "原始输入不被解释覆盖",
    body: "保存图纸版本、页码、局部区域和原始字符串。当前状态只说“看到了什么”，不急于说“它是什么”。",
    meta: ["状态", "observed", "来源", "drawing-rev-C"],
    image: "assets/angle-tower-drawing.png",
  },
  hypothesis: {
    kicker: "候选 / 有边界的假设",
    title: "模型提出有边界的候选解释",
    body: "同一条投影线可以保留多个候选。每个候选引用证据，并写出它对拓扑、跨度和下游输出的影响。",
    meta: ["状态", "review_required", "候选", "HYP-LK-02"],
    image: "assets/crossing-hypothesis.png",
  },
  semantic: {
    kicker: "语义图 / 稳定身份",
    title: "解释被提升为物理对象与关系",
    body: "构件、节点、装配和连接界面拥有稳定身份。几何不是唯一的事实，关系和来源同样属于模型。",
    meta: ["状态", "candidate", "实体", "PART-LK-F"],
    image: "assets/semantic-ir-browser.png",
  },
  validation: {
    kicker: "确定性验证",
    title: "验证器检查事实，不能被置信度绕过",
    body: "检查引用完整性、坐标系、约束残差、依赖状态和公开安全边界。错误阻塞发布，警告保持可见。",
    meta: ["状态", "passed + review", "门禁", "public-ir-validator"],
    image: "assets/validation-gate.png",
  },
  release: {
    kicker: "版本化输出 / 发布",
    title: "输出带着身份、哈希和成熟度离开",
    body: "只有显式选定、经过状态声明和发布门禁的结果才会进入发布。上游改变后，依赖输出会被标记为 stale。",
    meta: ["状态", "coordination", "制品", "manifest + hash"],
    image: "assets/angle-tower-rebuild.png",
  },
};

function fitExplorerImage() {
  if (!stateImage || !imageFrame) return;
  const frameHeight = imageFrame.clientHeight;
  if (!frameHeight) return;
  stateImage.style.height = `${frameHeight}px`;
  stateImage.style.width = "auto";
  stateImage.style.maxWidth = "none";
  stateImage.style.maxHeight = "none";
}

function goTo(index) {
  const target = sections[Math.max(0, Math.min(sections.length - 1, index))];
  target?.scrollIntoView({ behavior: "smooth" });
}

function update(index) {
  const current = Math.max(0, Math.min(sections.length - 1, index));
  counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(sections.length).padStart(2, "0")}`;
  progressBar.style.width = `${((current + 1) / sections.length) * 100}%`;
  railFill.style.height = `${((current + 1) / sections.length) * 100}%`;
  navLinks.forEach((link, i) => link.classList.toggle("active", i === current));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) update(sections.indexOf(entry.target));
  });
}, { threshold: 0.55 });
sections.forEach((section) => observer.observe(section));

document.querySelector("#prev").addEventListener("click", () => {
  const current = sections.findIndex((section) => section.getBoundingClientRect().top >= -10 && section.getBoundingClientRect().top < window.innerHeight / 2);
  goTo((current < 0 ? 1 : current) - 1);
});
document.querySelector("#next").addEventListener("click", () => {
  const current = sections.findIndex((section) => section.getBoundingClientRect().top >= -10 && section.getBoundingClientRect().top < window.innerHeight / 2);
  goTo((current < 0 ? 0 : current) + 1);
});

document.addEventListener("keydown", (event) => {
  if (["ArrowDown", "PageDown", " "].includes(event.key)) { event.preventDefault(); document.querySelector("#next").click(); }
  if (["ArrowUp", "PageUp"].includes(event.key)) { event.preventDefault(); document.querySelector("#prev").click(); }
});

document.querySelectorAll(".identity-grid button").forEach((button) => {
  button.addEventListener("click", () => {
    const state = states[button.dataset.state];
    document.querySelectorAll(".identity-grid button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    document.querySelector("#stateKicker").textContent = state.kicker;
    document.querySelector("#stateTitle").textContent = state.title;
    document.querySelector("#stateBody").textContent = state.body;
    document.querySelector("#stateMeta").innerHTML = `<span>${state.meta[0]} <b>${state.meta[1]}</b></span><span>${state.meta[2]} <b>${state.meta[3]}</b></span>`;
    stateImage.src = state.image;
    stateImage.alt = state.title;
    if (stateImage.complete) fitExplorerImage();
  });
});

stateImage?.addEventListener("load", fitExplorerImage);
window.addEventListener("resize", fitExplorerImage);
if (imageFrame && "ResizeObserver" in window) new ResizeObserver(fitExplorerImage).observe(imageFrame);

update(0);
fitExplorerImage();
