# research-summary Skill 使用教程（小白版）

## 这个技能是干什么的？

一句话：**你说一个主题，AI 帮你搜资料、分类整理、生成文档，并可按需同步到 Notion。**

比如你说"帮我收集 RAG 大厂实践资料"，它会：

1. 自动搜索官方文档、大厂文章、GitHub 项目、社区帖子
2. 按可信度分级整理成表格
3. 生成一份结构化 Markdown 文档
4. 你明确要求时，同步到你的 Notion 里

你不用自己一篇篇翻、复制粘贴、整理格式——AI 全搞定。

---

## 前置条件

在安装 skill 之前，你需要准备好两样东西：

| 依赖 | 是什么 | 怎么装 |
|---|---|---|
| **Notion MCP 插件**（可选） | 用户要求同步到 Notion 时，让 AI 能读写你的 Notion | 见下方步骤 |
| **网页搜索能力** | 让 AI 能搜索网页 | 取决于所用 Agent 的工具配置 |

### 安装 Notion MCP 插件

仅当你需要同步到 Notion 时才需要这一步。未配置 Notion 时，Skill 仍可收集资料并生成 Markdown。

**Claude Code 用户：**

在终端运行：

```bash
claude mcp add notion -- npx -y @anthropic-ai/claude-code-notion-plugin
```

或者手动编辑 `~/.claude/settings.json`，在 `mcpServers` 里加：

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/claude-code-notion-plugin"]
    }
  }
}
```

**Codex 用户：**

在 `~/.codex/config.toml` 中添加：

```toml
[mcp_servers.notion]
command = "npx"
args = ["-y", "@anthropic-ai/claude-code-notion-plugin"]
```

> 装好后第一次运行时，会弹出 Notion 授权页面，按提示授权即可。

---

## 安装 Skill

```bash
# Codex
npx @helloxiaoding/ding-skills install research-summary --agent codex

# Claude Code
npx @helloxiaoding/ding-skills install research-summary --agent claude-code
```

Qoder CLI、QoderWork、覆盖已有 Skill 和手动复制安装方式见 [小鼎 Skills 安装手册](../installation.md)。

---

## 怎么用？

安装好之后，**直接用自然语言跟 AI 说就行**，不需要记任何命令。

### 场景一：首次收集资料（最常用）

**你说：**

```
帮我收集 RAG 大厂实践资料，生成 md 并同步到 Notion
```

**AI 会做的事：**

1. 先问你确认范围（比如"只要国内大厂吗？""深度到什么程度？"）
2. 搜索官方文档 → 大厂文章 → GitHub 项目 → 社区帖子
3. 按分类整理成表格（每条资料带可信度、推荐程度、链接）
4. 生成 Markdown 文档
5. 如果你明确要求且已配置服务，同步到你的 Notion
6. 输出摘要（新增了多少资料、哪些链接失效等）

**其他类似说法：**

```
帮我整理 Superpowers + OpenSpec 的资料
调研一下 Agent SDK 的使用方式
帮我收集 MCP 协议相关的学习资料
```

### 场景二：基于旧版生成新版本

**你说：**

```
基于上一版再补充一些案例，不要覆盖旧文档
```

**AI 会做的事：**

1. 保留旧版文档不动
2. 只搜索新增的资料
3. 生成一份新版本（v2）
4. 如果你明确要求且已配置服务，创建新的 Notion 页面
5. 输出版本差异摘要

**其他类似说法：**

```
生成 v2
重新生成一版，旧的留着
基于上一版继续补充
```

### 场景三：修改当前文档

**你说：**

```
直接改这份，第 3 章重写一下
```

**AI 会做的事：**

1. 只修改你指定的章节
2. 其他章节不动
3. 如果你明确要求且已配置服务，更新 Notion 页面
4. 输出修改摘要

**其他类似说法：**

```
修改当前文档，总结不是我想要的
这章的表述改一下
```

### 场景四：只更新资料库

**你说：**

```
这版确认了，后续只做资料库更新
```

**AI 会做的事：**

1. 不改文档结构
2. 只搜索新增资料，补充到表格里
3. 检查旧链接是否还有效
4. 如果你明确要求且已配置服务，更新 Notion 页面的资料表部分

**其他类似说法：**

```
以后只更新链接和资料
补充最新资料，结构不要动
```

---

## 生成的文档长什么样？

AI 会按模板生成一份结构化文档，包含：

| 章节 | 内容 |
|---|---|
| 文档定位 | 这份资料是给谁看的、覆盖什么范围 |
| 主题是什么 | 用白话解释主题 |
| 核心概念和边界 | 关键概念定义、和其他概念的关系 |
| 学习路径 | 推荐的学习顺序 |
| 官方资料库 | 官方文档、官方仓库（表格） |
| 大厂实践资料库 | 腾讯/阿里/字节等的技术文章（表格） |
| 国内社区资料库 | 掘金/CSDN/知乎等（表格） |
| 国外资料库 | 国外博客、社区（表格） |
| GitHub/开源资料库 | 开源项目、Awesome 列表（表格） |
| 待验证资料 | 打不开或不确定的资料（表格） |
| 采用策略 | 基于调研给出的建议 |

每条资料的表格字段：

| 字段 | 说明 |
|---|---|
| 可信度 | A（官方）→ D（待验证） |
| 推荐程度 | 必看 / 推荐 / 选择看 / 待验证 |
| 可访问性 | 已确认 / 失效 / 待确认 |
| 主要价值 | 这条资料解决什么问题 |

---

## 常见问题

**Q：我没有 Notion，能用吗？**

可以搜索和生成 Markdown 文档，但没法自动同步到 Notion。你可以让 AI 只生成本地 `.md` 文件。

**Q：搜出来的资料不准怎么办？**

AI 会给每条资料标注可信度（A/B/C/D）和可访问性。你看到"待验证"或"D"的条目，自己判断要不要信。

**Q：可以只搜中文资料吗？**

可以，在触发语句里说清楚就行：

```
帮我收集 RAG 中文资料，只要国内社区和大厂的
```

**Q：旧文档会被覆盖吗？**

默认不会。除非你明确说"修改当前文档"或"覆盖旧内容"，否则 AI 都会创建新版本。

**Q：Claude Code 和 Codex 有什么区别？**

功能完全一样，只是安装目录不同：

- Claude Code：`~/.claude/skills/`
- Codex：`~/.codex/skills/`

---

## 快速开始（复制粘贴版）

**第一步：装 Notion 插件**

```bash
# Claude Code
claude mcp add notion -- npx -y @anthropic-ai/claude-code-notion-plugin

# Codex：手动编辑 ~/.codex/config.toml，参考上面的配置
```

**第二步：装 Skill**

```bash
git clone https://github.com/shixiaoding/skills.git shixiaoding-skills
mkdir -p ~/.claude/skills  # Codex 用 ~/.codex/skills
cp -R shixiaoding-skills/skills/research-summary ~/.claude/skills/
```

**第三步：直接用**

打开 Claude Code 或 Codex，输入：

```
帮我收集 [你想了解的主题] 资料，生成 md 并同步到 Notion
```

完事。
