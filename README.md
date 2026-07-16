# 小鼎 Skills

让 AI Agent 帮你把资料学习转化为可检验、可分享的知识输出。

把资料收集、学习检验与知识输出沉淀为可组合的 Agent 工作流。

这里收录已经在真实场景中验证过的个人 Skills。每个 Skill 都应足够小、可独立安装和调整；它们可以组合成工作流，但不会被堆成一套难以维护的“万能系统”。

```text
资料收集与整理  →  学习后的理解检验  →  学习输出写作  →  人工发布
research-summary     study-examiner         规划中            由你确认
```

## 当前 Skills

| Skill | 解决的问题 | 可选集成 |
| --- | --- | --- |
| [research-summary](skills/research-summary) | 围绕一个主题收集、分级整理并持续维护资料库 | Notion 同步 |
| [study-examiner](skills/study-examiner) | 对已阅读材料做一题一答测验，检验吸收程度并补弱 | - |

## 快速开始

推荐使用 npm 安装工具，将 Skill 安装到已登录 Agent 的用户级目录：

```bash
# 查看可用 Skill
npx @helloxiaoding/ding-skills list

# 安装一个 Skill 到 Codex
npx @helloxiaoding/ding-skills install study-examiner --agent codex

# 将全部 Skill 安装到 Claude Code
npx @helloxiaoding/ding-skills install --all --agent claude-code

# 检查本机可用的 Agent 目录
npx @helloxiaoding/ding-skills doctor
```

支持 Codex、Claude Code、Qoder CLI 和 QoderWork。完整命令、覆盖规则和故障处理见 [安装手册](https://github.com/shixiaoding/skills/blob/main/docs/installation.md)。

需要 Node.js 20+。没有 Node.js 时，仍可克隆仓库后，将 `skills/<skill-name>/` 手动复制到所用 Agent 的 skills 目录。

## 使用方式

安装 `research-summary` 后，可以直接说：

```text
帮我收集 MCP 协议相关的学习资料，生成结构化 Markdown。
```

如果希望同步到 Notion，需在请求中明确说明，并事先配置可用的 Notion MCP 服务：

```text
帮我收集 MCP 协议相关的学习资料，生成结构化 Markdown 并同步到 Notion。
```

更多说明见 [research-summary 使用教程](docs/research-summary/usage.md)。

安装 `study-examiner` 后，在完成一段阅读或学习后，可以直接说：

```text
我已阅读完成，请一题一答测验我，最后再统一讲解和补弱。
```

它会先围绕已提供的材料或明确主题进行测验；答题过程中不提前批改，全部答完后再统一复盘薄弱点。
更多说明见 [study-examiner 使用教程](docs/study-examiner/usage.md)。

学习输出写作是下一阶段方向：它会结合资料、答题复盘和目标读者，分别生成博文或小红书草稿。这个 Skill 尚未实现，也不会自动发布到外部平台；详见 [Roadmap](docs/roadmap.md)。

## 目录结构

```text
skills/
├── skills/                         # 可直接安装的 Skill
│   ├── README.md                    # Skill 索引
│   ├── research-summary/
│   │   ├── SKILL.md
│   │   ├── assets/
│   │   └── references/
│   └── study-examiner/
│       ├── SKILL.md
│       └── agents/
├── docs/                            # 教程、案例和设计说明
│   ├── installation.md               # npm 安装说明
│   ├── skill-authoring.md
│   ├── research-summary/
│   └── study-examiner/
├── bin/                             # ding-skills CLI 入口
├── lib/                             # Agent 适配和安装逻辑
└── README.md
```

## Skill 约定

每个 Skill 必须包含 `SKILL.md`，至少写清：

- 何时使用，以及不该使用的场景；
- 所需输入和外部依赖；
- 可重复执行的步骤；
- 输出格式、验证方式和副作用；
- 模板、参考规范等附属资源的用途。

详细规范见 [Skill 编写约定](docs/skill-authoring.md)。满足此目录和 front matter 约定的新 Skill 会被 `ding-skills list` 与 `install --all` 自动发现。

## 与 `coding-agent-engineering` 的关系

本仓库面向个人的学习、研究、写作与知识管理；[`coding-agent-engineering`](https://github.com/shixiaoding/coding-agent-engineering) 面向软件项目中的 Coding Agent 协作。

```text
skills                     我如何借助 Agent 完成个人高频工作
coding-agent-engineering   Agent 如何按工程规则参与软件研发
```

团队工程规则、代码审查流程和项目级 Agent 约束不放入本仓库。

## 版本与规划

- [Changelog](CHANGELOG.md)：已发布、影响使用者的变更。
- [Roadmap](docs/roadmap.md)：下一步方向、边界与暂不做的能力。
- 版本号遵循语义化版本：修复用 `0.1.1`，新增兼容能力用 `0.2.0`。

## License

MIT License — 可用于个人或商业场景，详见 [LICENSE](LICENSE)。
