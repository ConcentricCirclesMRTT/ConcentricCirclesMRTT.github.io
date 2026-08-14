# NeuBE-Structural-Rebuild：3 分钟比赛展示脚本

## 核心一句话

NeuBE-Structural-Rebuild 是一个 fully open-source、可 Fork 的 AI Agent Skill 基座：它把异构工程证据编译成有身份、有约束、有验证状态、可由人接管的结构重构结果。角钢输电塔是第一个高难度压力测试，不是产品边界。

## 叙事边界

- 叙事只围绕 NeuBE SR 和角钢塔成功样例展开，不引入额外的上下文系统作为项目组成部分。
- 不说“图片直接生成可制造 CAD”。公开版本支持概念级到协调级重构，不等同于结构安全认证、规范合规、细化设计、制造放行或 NC 生成。
- 明确区分 `Evidence`、`Interpretation`、`SemanticGraph`、`ConstraintGraph`、`SolvedGeometry` 和 `ManufacturingGeometry`。
- 置信度不是授权；未决依赖必须进入复核或阻塞发布。

## 3 分钟分镜与旁白

### 0:00–0:20｜问题：漂亮的模型不等于可信的结构

**画面**：旧图纸、多视图投影线、一个无来源的三维模型快速切换；随后停在 NeuBE SR 标题页。

**旁白**：

> AI 可以在几秒钟内生成一个漂亮的三维模型。但结构重构真正困难的问题是：每个对象来自哪里？它是否仍然有效？一次判断改变以后，哪些输出必须作废？如果这些问题没有答案，三维结果只能被观看，不能被审计、修正和交接。

### 0:20–0:45｜命题：一个可 Fork 的开源 Skill 基座

**画面**：仓库目录、Apache-2.0、`SKILL.md`、公开 IR schema 和验证脚本。

**旁白**：

> NeuBE-Structural-Rebuild 不是一个单体应用，也不是一句更长的 Prompt。它是一套 fully open-source、可 Fork 的 AI Agent Skill 模板，把领域专家知识、工程工作流、公开 IR、确定性验证器和发布门禁组织在一起。任何有图纸的行业，都可以在它上面建立自己的 Domain Pack。

### 0:45–1:15｜方法：把重构变成编译链

**画面**：动画依次点亮：`Sources → Observations → Hypotheses → Semantic Model → Constraints → Review → Versioned Outputs`。

**旁白**：

> NeuBE 把重构拆成一条可检查的编译链。先登记来源和版本，再保存图纸上真实出现的观察；模型提出有边界的候选解释；候选被组织成物理对象和关系；约束求解器检查坐标、拓扑、长度和残差；无法由证据消解的部分进入人工复核，最后才生成带版本和状态的输出。AI 负责提出候选，确定性程序负责检查事实，专家负责不可替代的责任判断。

### 1:15–1:40｜Skill：Agent 的工程行为契约

**画面**：`SKILL.md` 中的工作阶段、允许动作、工具调用、停止条件；公开 IR 中的稳定 ID 和 source reference。

**旁白**：

> Skill 定义 Agent 当前处于哪个工程阶段，允许采取什么动作，需要哪些证据，应调用哪些工具，什么时候必须停止并请求复核。原始证据不会被解释覆盖：Evidence、Interpretation、SemanticGraph、ConstraintGraph、SolvedGeometry 和 ManufacturingGeometry 保持分层。这样，模型的推断可以被追问，结果也可以从几何回溯到证据。

### 1:40–2:05｜成功样例：角钢塔压力测试

**画面**：复杂角钢塔多视图图纸；交叉、共享节点、孔位和角钢局部坐标的局部放大；切到协调级三维重构。

**旁白**：

> 角钢输电塔是第一个高难度压力测试。它同时包含多视图重合、构件跨视图身份、共享节点、连接拓扑、角钢两条肢的方向、局部坐标系和带符号的端部处理。这里不是把线条“变成实体”，而是把分散证据组织成可验证的结构关系，再求出协调级几何。塔的规则属于一个 Domain Pack，NeuBE 的方法可以迁移到桥梁、桁架、设备支撑和工业管线。

### 2:05–2:30｜停止边界：失败、复核与 stale

**画面**：状态浏览器切到 `Hypothesis`、`Validation`；显示 `review_required`、`blocked`、`stale`。

**旁白**：

> 一个可靠的 Agent，也必须知道什么时候不能继续。若构件身份、坐标或约束仍有多个解释，状态会变成 `review_required`，并列出证据、影响和问题。关键依赖没有解决时，下游几何和发布会被 `blocked`。上游事实改变后，依赖制品会变成 `stale`，等待重新验证，而不是继续伪装成 current。NeuBE 的价值不仅是生成结果，更是把失败和不确定性留在结果里。

### 2:30–2:50｜公开包：可复现、可验证、可扩展

**画面**：文件名依次出现：

```text
SKILL.md
public-ir.schema.json
synthetic-frame-example.json
validate_public_ir.py
init_domain.py
publish_result.py
```

**旁白**：

> 公开版本不包含真实客户数据、专有规则或制造逻辑，但核心方法可以在合成案例上复现、验证和 Fork。仓库里的 schema、示例 IR、验证器和脚手架，让每一个 Domain Pack 都从同一套可审计契约开始。

### 2:50–3:00｜邀请：从图纸开始建立领域

**画面**：NeuBE SR banner，最后停在 `Bring the drawings · Teach the rules · Build the domain`。

**旁白**：

> 如果你的行业有图纸，它值得拥有自己的 Domain Pack。Bring the drawings. Teach the rules. Build the domain.

## 录制提示

- 画面中的状态词保留英文，旁白用中文解释，便于和仓库字段对应。
- 角钢塔画面只标注“协调级重构 / 可继续验证”，不要标注“制造完成”或“安全通过”。
- 验证门禁画面至少展示一次 `review_required` 或 `blocked`，让“知道何时停止”成为可见动作。
- 结尾展示仓库链接和 Apache-2.0，不展示与本叙事无关的外部系统名称。
