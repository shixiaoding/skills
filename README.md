本仓库是一个提供给AI编程工具 Codex、Claude Code、Qoder、Trae    可直接复用的工程化工作流。 
你可以直接安装，也可以手动复制组件。

```
sd-team-code/
|
|-- agents/           # 专门用于任务委派的子智能体 (Subagents) 待扩展
|
|-- skills/           # 工作流定义与领域知识 待扩展
|   |-- rg-code-review/             # 代码review工具
|
|-- commands/         # 用于快速执行的斜杠命令 (Slash commands)  待扩展
|
|-- rules/            # 必须遵守的准则 (复制到 ~/.claude/rules/) 待扩展
|
|-- hooks/            # 基于触发器的自动化  待扩展                    
|
|-- scripts/          # 跨平台 Node.js 脚本 (新增) 待扩展
|
|-- tests/            # 测试套件 (新增) 待扩展
|
|-- contexts/         # 动态系统提示词注入上下文 (详细指南)
|
|-- CLAUDE.md         # Claude code 全局配置
|-- AGENTS.md         # 通用工具全局配置 codex、trae、qoder等
|-- README.md         # 项目介绍
```