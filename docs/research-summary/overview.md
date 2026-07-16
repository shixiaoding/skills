# research-summary 概览

自动化资料收集工作流：搜索资料 → 分类整理 → 生成结构化 Markdown → 按需同步 Notion → 输出摘要。

## 目录结构

```
skills/research-summary/
    ├── SKILL.md              # Skill 定义（意图识别、执行流程、输出格式）
    ├── assets/
    │   └── template.md       # 文档生成骨架模板
    └── references/
        └── specs.md          # 参考规范（字段定义、可信度分级、Notion 同步规则等）
```

## 安装

推荐使用 npm 安装工具：

```bash
# Codex
npx @helloxiaoding/ding-skills install research-summary --agent codex
```

完整安装方式见 [小鼎 Skills 安装手册](../installation.md)。

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

- **Notion MCP 插件**（可选）：用户要求同步文档到 Notion 时使用
- **WebSearch / WebFetch**：资料搜索与链接验证
