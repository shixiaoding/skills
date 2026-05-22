# Personal Agent Skills

个人 AI Agent 技能库，为 AI Agent 工具（Claude Code、Codex 等）提供可复用的自动化工作流技能。

## 已收录技能

### research-summary — 资料收集总结

自动完成「搜索资料 → 分类整理 → 生成结构化 Markdown → 同步 Notion → 输出摘要」全流程。

**触发方式：**

```text
帮我收集 OpenSpec 大厂实践资料，生成 md 并同步到 Notion
```

**支持四种工作模式：**

| 模式 | 触发示例 | 说明 |
|---|---|---|
| 首次收集 | `帮我收集 xxx 资料` | 全量搜索，创建新文档 |
| 新版本 | `基于上一版生成 v2，不要覆盖` | 旧版保留，增量补充后创建新版 |
| 修改当前文档 | `直接改这份，第 3 章重写` | 定点修改指定章节 |
| 资料库更新 | `这版确认了，后续只更新资料库` | 结构不动，只维护资料表 |

**文档结构：** 文档定位 → 主题概念 → 学习路径 → 官方/大厂/社区/国外资料库 → 工具链生态 → 待验证资料 → 采用策略 → 维护规则

**输出示例：** [Superpowers + OpenSpec 组合实践资料库](https://www.notion.so/3679fce202f28157ae7aded0838e7dab)

## 目录结构

```
personal-agent-skills/
└── research-summary-skills/          # 资料收集总结 Skill 套件
    ├── README.md                     # 套件说明
    └── research-summary/
        ├── SKILL.md                  # Skill 定义（意图识别、执行流程、输出格式）
        ├── assets/
        │   └── template.md           # 文档生成骨架模板
        └── references/
            └── specs.md              # 参考规范（字段定义、可信度分级、Notion 同步规则）
```

## 安装

将 Skill 目录复制到对应 Agent 工具的 skills 目录即可。以 Claude Code 和 Codex 为例：

```bash
# Claude Code
mkdir -p ~/.claude/skills
cp -R research-summary-skills/research-summary ~/.claude/skills/

# Codex
mkdir -p ~/.codex/skills
cp -R research-summary-skills/research-summary ~/.codex/skills/
```

## Skill 结构说明

每个 Skill 遵循标准结构：

| 文件 | 用途 |
|---|---|
| `SKILL.md` | 技能定义：触发条件、意图识别、执行流程、输出规范 |
| `assets/` | 模板、配置等静态资源 |
| `references/` | 参考规范：字段定义、分级标准、外部系统同步规则 |

## 依赖

- **Notion MCP 插件**（`makenotion/claude-code-notion-plugin`）：用于同步文档到 Notion
- **WebSearch / WebFetch**：资料搜索与链接验证

## 贡献

欢迎提交新的 Skill 或改进现有 Skill。每个 Skill 需包含：
- `SKILL.md` — 清晰定义触发条件、执行流程、输出格式
- `assets/` — 文档模板等资源
- `references/` — 尽量将可复用的规则/规范抽象到此目录

## License

MIT
