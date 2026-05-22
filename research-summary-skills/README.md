# Research Summary Skills（资料收集总结 Skill 套件）

自动化资料收集工作流：搜索资料 → 分类整理 → 生成结构化 Markdown → 同步 Notion → 输出摘要。

## 目录结构

```
research-summary-skills/
└── research-summary/
    ├── SKILL.md              # Skill 定义（意图识别、执行流程、输出格式）
    ├── assets/
    │   └── template.md       # 文档生成骨架模板
    └── references/
        └── specs.md          # 参考规范（字段定义、可信度分级、Notion 同步规则等）
```

## 安装

将 Skill 目录复制到对应 Agent 工具的 skills 目录即可。以 Claude Code 和 Codex 为例：

```bash
# Claude Code
mkdir -p ~/.claude/skills
cp -R research-summary ~/.claude/skills/

# Codex
mkdir -p ~/.codex/skills
cp -R research-summary ~/.codex/skills/
```

## 使用方式

直接对 AI 说：

```text
帮我收集 OpenSpec 大厂实践资料，生成 md 并同步到 Notion
```

其他模式：

```text
基于上一版生成 v2，不要覆盖旧文档        # 创建新版本
直接改这份，第 3 章重写                  # 修改当前文档
这版确认了，后续只做资料库更新            # 资料库维护模式
```

## 依赖

- **Notion MCP 插件**（`makenotion/claude-code-notion-plugin`）：同步文档到 Notion
- **WebSearch / WebFetch**：资料搜索与链接验证
