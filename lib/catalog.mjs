import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

function parseFrontMatter(content, skillPath) {
  if (!content.startsWith('---\n')) {
    throw new Error(`${skillPath} 缺少 YAML front matter。`);
  }

  const closingIndex = content.indexOf('\n---', 4);
  if (closingIndex === -1) {
    throw new Error(`${skillPath} 的 YAML front matter 未闭合。`);
  }

  const frontMatter = content.slice(4, closingIndex);
  const name = frontMatter.match(/^name:\s*(.+?)\s*$/m)?.[1]?.replace(/^['"]|['"]$/g, '');
  const description = frontMatter.match(/^description:\s*(.+?)\s*$/m)?.[1]?.replace(/^['"]|['"]$/g, '');

  if (!name || !description) {
    throw new Error(`${skillPath} 的 front matter 必须包含 name 和 description。`);
  }

  return { name, description };
}

export async function listSkills(skillsRoot) {
  const entries = await readdir(skillsRoot, { withFileTypes: true });
  const directories = entries.filter((entry) => entry.isDirectory()).sort((left, right) => left.name.localeCompare(right.name));

  return Promise.all(directories.map(async ({ name: directoryName }) => {
    const directory = path.join(skillsRoot, directoryName);
    const skillPath = path.join(directory, 'SKILL.md');
    let content;

    try {
      content = await readFile(skillPath, 'utf8');
    } catch {
      throw new Error(`${directory} 缺少 SKILL.md。`);
    }

    const metadata = parseFrontMatter(content, skillPath);
    if (metadata.name !== directoryName) {
      throw new Error(`${skillPath} 的 name (${metadata.name}) 必须与目录名 (${directoryName}) 一致。`);
    }

    return {
      ...metadata,
      directory,
      skillPath
    };
  }));
}

export function selectSkills(skills, requestedNames, installAll) {
  if (installAll) {
    return skills;
  }

  const requested = new Set(requestedNames);
  const selected = skills.filter(({ name }) => requested.has(name));
  const missing = requestedNames.filter((name) => !selected.some((skill) => skill.name === name));

  if (missing.length > 0) {
    throw new Error(`未找到 Skill：${missing.join(', ')}。可先执行 ding-skills list 查看可用项。`);
  }

  return selected;
}
