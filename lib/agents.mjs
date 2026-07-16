import { constants, existsSync } from 'node:fs';
import { access, lstat } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';

const AGENT_DEFINITIONS = [
  {
    id: 'codex',
    aliases: [],
    label: 'Codex',
    configDirectory: '.codex',
    skillsDirectory: '.codex/skills',
    postInstallHint: '请开启新的 Codex 会话以加载 Skill。'
  },
  {
    id: 'claude-code',
    aliases: ['claude'],
    label: 'Claude Code',
    configDirectory: '.claude',
    skillsDirectory: '.claude/skills',
    postInstallHint: '请开启新的 Claude Code 会话以加载 Skill。'
  },
  {
    id: 'qoder',
    aliases: ['qoder-cli'],
    label: 'Qoder CLI',
    configDirectory: '.qoder',
    skillsDirectory: '.qoder/skills',
    postInstallHint: '新会话会自动加载；已运行的 Qoder CLI 可执行 /skills reload。'
  },
  {
    id: 'qoderwork',
    aliases: ['qoder-work'],
    label: 'QoderWork',
    configDirectory: '.qoderwork',
    skillsDirectory: '.qoderwork/skills',
    postInstallHint: '请在 QoderWork 的 Skills 页面确认新 Skill 已加载。'
  }
];

export const AGENTS = Object.freeze(AGENT_DEFINITIONS);

export function resolveHome(environment = process.env) {
  return environment.DING_SKILLS_HOME || homedir();
}

export function getAgent(agentName) {
  const normalized = agentName?.trim().toLowerCase();
  return AGENTS.find(({ id, aliases }) => id === normalized || aliases.includes(normalized));
}

export function getAgentPaths(agent, homeDirectory = resolveHome()) {
  return {
    configRoot: path.join(homeDirectory, agent.configDirectory),
    skillsRoot: path.join(homeDirectory, agent.skillsDirectory)
  };
}

async function isWritableOrCreatable(directory) {
  let current = directory;

  while (!existsSync(current)) {
    const parent = path.dirname(current);
    if (parent === current) {
      return false;
    }
    current = parent;
  }

  try {
    const stats = await lstat(current);
    if (stats.isSymbolicLink()) {
      return false;
    }
    await access(current, constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

export async function inspectAgents(homeDirectory = resolveHome()) {
  return Promise.all(AGENTS.map(async (agent) => {
    const paths = getAgentPaths(agent, homeDirectory);
    return {
      agent,
      ...paths,
      configured: existsSync(paths.configRoot),
      skillsDirectoryExists: existsSync(paths.skillsRoot),
      writable: await isWritableOrCreatable(paths.skillsRoot)
    };
  }));
}

export async function detectConfiguredAgents(homeDirectory = resolveHome()) {
  const statuses = await inspectAgents(homeDirectory);
  return statuses.filter(({ configured, writable }) => configured && writable);
}
