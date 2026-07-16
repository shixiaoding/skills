# 小鼎 Skills 安装手册

`@helloxiaoding/ding-skills` 是小鼎 Skills 的 npm 安装工具。它将选定的 Skill 复制到 Agent 的用户级 skills 目录，不会修改当前项目。

## 前置条件

- Node.js 20 或更高版本；
- 已安装并登录至少一个目标 Agent。

## 查看可用 Skill 与 Agent

无需全局安装，可直接使用：

```bash
npx @helloxiaoding/ding-skills list
npx @helloxiaoding/ding-skills doctor
```

`doctor` 会列出 Codex、Claude Code、Qoder CLI 和 QoderWork 的识别状态与安装目录。

## 安装单个 Skill

```bash
# Codex
npx @helloxiaoding/ding-skills install study-examiner --agent codex

# Claude Code
npx @helloxiaoding/ding-skills install study-examiner --agent claude-code

# Qoder CLI
npx @helloxiaoding/ding-skills install study-examiner --agent qoder

# QoderWork
npx @helloxiaoding/ding-skills install study-examiner --agent qoderwork
```

## 安装全部 Skill

```bash
npx @helloxiaoding/ding-skills install --all --agent codex
```

如果本机只识别到一个可用 Agent，也可以使用 `--agent auto`；识别到多个 Agent 时，交互终端会要求选择，非交互环境必须明确指定目标。

## 安全选项

```bash
# 只预览，不写入文件
npx @helloxiaoding/ding-skills install study-examiner --agent codex --dry-run

# 覆盖同名 Skill
npx @helloxiaoding/ding-skills install study-examiner --agent codex --force
```

默认不会覆盖已有同名 Skill。覆盖时，安装器会先完成临时复制，再替换原目录；复制失败时保留旧目录。

## 全局安装命令

如果经常使用，可安装命令本身：

```bash
npm install -g @helloxiaoding/ding-skills
ding-skills install study-examiner --agent codex
```

## 安装后加载

- Codex、Claude Code：开启新的会话；
- Qoder CLI：开启新会话，或执行 `/skills reload`；
- QoderWork：在 Skills 页面确认新 Skill 已加载。

## 无 Node 环境

仍可克隆仓库，并将 `skills/<skill-name>/` 目录手动复制到对应 Agent 的 skills 目录。
