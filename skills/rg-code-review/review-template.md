# Code Review 报告

## 1. 概览
- 审查范围：当前分支相对基线分支的 diff
- 基线分支：{{baseBranch}}
- 审查文件数：{{fileCount}}
- 问题总数：{{issueCount}}
- P1：{{p1Count}}
- P2：{{p2Count}}
- P3：{{p3Count}}

## 2. 总体结论
- 是否建议合并：{{mergeSuggestion}}
- 风险结论：{{riskSummary}}

## 3. 问题清单

### 3.1 P1（必须优先修复）
{{#each p1Issues}}
#### {{title}}
- 文件：`{{file}}`
- 位置：`{{location}}`
- 维度：{{dimension}}
- 问题：{{problem}}
- 风险：{{risk}}
- 建议方案：怎么改（含示例）：{{suggestion}}
- 是否需确认：{{needConfirm}}

{{/each}}

### 3.2 P2（建议修复）
{{#each p2Issues}}
#### {{title}}
- 文件：`{{file}}`
- 位置：`{{location}}`
- 维度：{{dimension}}
- 问题：{{problem}}
- 风险：{{risk}}
- 建议方案：怎么改（含示例）：{{suggestion}}
- 是否需确认：{{needConfirm}}

{{/each}}

### 3.3 P3（可选优化）
{{#each p3Issues}}
#### {{title}}
- 文件：`{{file}}`
- 位置：`{{location}}`
- 维度：{{dimension}}
- 问题：{{problem}}
- 风险：{{risk}}
- 建议方案：怎么改（含示例）：{{suggestion}}
- 是否需确认：{{needConfirm}}

{{/each}}

## 4. 做得好的地方
{{#each goodPoints}}
- {{this}}
{{/each}}

## 5. 已覆盖检查项
{{#each coveredChecks}}
- {{this}}
{{/each}}

## 6. 需人工进一步确认
{{#each manualChecks}}
- {{this}}
{{/each}}
