import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AGENTS, detectConfiguredAgents, getAgent, getAgentPaths, inspectAgents, resolveHome } from './agents.mjs';
import { listSkills, selectSkills } from './catalog.mjs';
import { installSkills } from './installer.mjs';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const skillsRoot = path.join(packageRoot, 'skills');

const helpText = `小鼎 Skills 安装工具

用法：
  ding-skills list
  ding-skills doctor
  ding-skills install <skill...> --agent <agent>
  ding-skills install --all --agent <agent>

安装选项：
  --agent <agent>  codex、claude-code、qoder、qoderwork 或 auto
  --all            安装全部 Skill
  --dry-run        仅显示计划，不写入文件
  --force          覆盖已存在的同名 Skill
  --help, -h       显示帮助
`;

function parseInstallArguments(argumentsList) {
  const names = [];
  const options = {
    agent: 'auto',
    all: false,
    dryRun: false,
    force: false
  };

  for (let index = 0; index < argumentsList.length; index += 1) {
    const argument = argumentsList[index];
    if (argument === '--all') {
      options.all = true;
    } else if (argument === '--dry-run') {
      options.dryRun = true;
    } else if (argument === '--force') {
      options.force = true;
    } else if (argument === '--agent') {
      options.agent = argumentsList[index + 1];
      index += 1;
    } else if (argument.startsWith('--agent=')) {
      options.agent = argument.slice('--agent='.length);
    } else if (argument.startsWith('-')) {
      throw new Error(`不支持的选项：${argument}`);
    } else {
      names.push(argument);
    }
  }

  if (!options.agent) {
    throw new Error('--agent 必须提供目标 Agent。');
  }
  if (options.all && names.length > 0) {
    throw new Error('--all 不能与指定 Skill 名称同时使用。');
  }
  if (!options.all && names.length === 0) {
    throw new Error('请指定至少一个 Skill，或使用 --all。');
  }

  return { names, options };
}

async function chooseAgent(candidates) {
  if (candidates.length === 1) {
    return candidates[0].agent;
  }
  if (candidates.length === 0) {
    throw new Error('未识别到可用 Agent，请使用 --agent 明确指定安装目标。');
  }
  if (!input.isTTY || !output.isTTY) {
    throw new Error('识别到多个 Agent；非交互环境请使用 --agent 明确指定安装目标。');
  }

  output.write('识别到多个 Agent：\n');
  candidates.forEach(({ agent }, index) => output.write(`  ${index + 1}. ${agent.label} (${agent.id})\n`));

  const readline = createInterface({ input, output });
  try {
    const answer = await readline.question('请选择安装目标编号：');
    const selected = candidates[Number(answer) - 1];
    if (!selected) {
      throw new Error('无效的 Agent 选择。');
    }
    return selected.agent;
  } finally {
    readline.close();
  }
}

async function resolveAgent(agentName, homeDirectory) {
  if (agentName === 'auto') {
    return chooseAgent(await detectConfiguredAgents(homeDirectory));
  }

  const agent = getAgent(agentName);
  if (!agent) {
    const supported = AGENTS.map(({ id }) => id).join(', ');
    throw new Error(`不支持的 Agent：${agentName}。可用目标：${supported}、auto。`);
  }
  return agent;
}

async function runList() {
  const skills = await listSkills(skillsRoot);
  for (const skill of skills) {
    output.write(`${skill.name}\t${skill.description}\n`);
  }
}

async function runDoctor(homeDirectory) {
  const statuses = await inspectAgents(homeDirectory);
  for (const status of statuses) {
    const configuration = status.configured ? '已识别' : '未识别';
    const writable = status.writable ? '可写' : '不可写';
    output.write(`${status.agent.id}\t${configuration}\t${writable}\t${status.skillsRoot}\n`);
  }
}

async function runInstall(argumentsList, homeDirectory) {
  const { names, options } = parseInstallArguments(argumentsList);
  const agent = await resolveAgent(options.agent, homeDirectory);
  const targetRoot = getAgentPaths(agent, homeDirectory).skillsRoot;
  const skills = await listSkills(skillsRoot);
  const selectedSkills = selectSkills(skills, names, options.all);
  const results = await installSkills({
    skills: selectedSkills,
    targetRoot,
    force: options.force,
    dryRun: options.dryRun
  });

  for (const result of results) {
    const action = options.dryRun ? `${result.action}（预览）` : result.action;
    output.write(`${action}\t${result.skill}\t${result.destination}\n`);
  }
  if (!options.dryRun) {
    output.write(`${agent.label}：${agent.postInstallHint}\n`);
  }
}

export async function run(argv = process.argv.slice(2), environment = process.env) {
  const [command, ...argumentsList] = argv;
  const homeDirectory = resolveHome(environment);

  if (!command || command === '--help' || command === '-h') {
    output.write(helpText);
    return;
  }

  if (command === 'list') {
    if (argumentsList.length > 0) {
      throw new Error('list 不接受额外参数。');
    }
    await runList();
    return;
  }

  if (command === 'doctor') {
    if (argumentsList.length > 0) {
      throw new Error('doctor 不接受额外参数。');
    }
    await runDoctor(homeDirectory);
    return;
  }

  if (command === 'install') {
    await runInstall(argumentsList, homeDirectory);
    return;
  }

  throw new Error(`不支持的命令：${command}。使用 --help 查看帮助。`);
}
