# Roadmap

本路线图只记录方向和边界，不承诺具体发布日期。正式发布的用户可见变更以 [Changelog](../CHANGELOG.md) 为准。

## 当前能力

```text
资料收集与整理  →  research-summary
学习后的理解检验 →  study-examiner
```

## 下一步：学习输出闭环

```text
资料收集 → 学习测验 → 学习复盘摘要 → 学习输出写作 → 人工发布
```

计划中的 `learning-output-writer` 会基于资料、测验复盘和目标读者，生成博文或小红书的可发布草稿。

- 机器名暂定为 `learning-output-writer`。
- 首先验证 2–3 次真实使用流程，再决定其输入格式与具体工作流。
- 该 Skill 目前仅处于规划阶段，不在本仓库提供安装，也不进入 npm 包。

## 后续改进

- 为稳定 Skill 补充可复现示例与维护记录。
- 在实际使用的 Agent 中持续验证安装与加载体验。
- 在完成数次手动发布后，再评估 GitHub Actions 自动发布。

## 暂不做

- 不自动登录或发布到小红书、博客等外部平台；发布前始终由用户确认。
- 不做项目级安装、`update`、`uninstall` 或独立 Skill npm 包。
- 不为尚未真实验证的想法创建正式 Skill。
