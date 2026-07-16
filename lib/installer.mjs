import { constants } from 'node:fs';
import { access, cp, lstat, mkdir, rename, rm } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

async function pathExists(target) {
  try {
    await lstat(target);
    return true;
  } catch {
    return false;
  }
}

async function ensureDirectoryIsSafe(directory) {
  if (await pathExists(directory)) {
    const stats = await lstat(directory);
    if (stats.isSymbolicLink()) {
      throw new Error(`拒绝写入符号链接目录：${directory}`);
    }
    if (!stats.isDirectory()) {
      throw new Error(`安装目录不是文件夹：${directory}`);
    }
  } else {
    await mkdir(directory, { recursive: true });
  }

  await access(directory, constants.W_OK);
}

async function ensureDestinationIsSafe(destination) {
  if (!await pathExists(destination)) {
    return false;
  }

  const stats = await lstat(destination);
  if (stats.isSymbolicLink()) {
    throw new Error(`拒绝覆盖符号链接：${destination}`);
  }
  if (!stats.isDirectory()) {
    throw new Error(`安装目标不是文件夹：${destination}`);
  }
  return true;
}

export async function installSkill({ skill, targetRoot, force = false, dryRun = false }) {
  const destination = path.join(targetRoot, skill.name);
  const destinationExists = await ensureDestinationIsSafe(destination);

  if (destinationExists && !force) {
    throw new Error(`${destination} 已存在；如需覆盖，请添加 --force。`);
  }

  if (dryRun) {
    return {
      skill: skill.name,
      destination,
      action: destinationExists ? 'replace' : 'install'
    };
  }

  await ensureDirectoryIsSafe(targetRoot);
  const temporary = path.join(targetRoot, `.${skill.name}.ding-skills-${randomUUID()}`);
  const backup = path.join(targetRoot, `.${skill.name}.ding-skills-backup-${randomUUID()}`);

  try {
    await cp(skill.directory, temporary, {
      recursive: true,
      dereference: false,
      errorOnExist: true,
      force: false
    });

    if (destinationExists) {
      await rename(destination, backup);
    }

    await rename(temporary, destination);
    if (destinationExists) {
      await rm(backup, { recursive: true, force: true });
    }

    return {
      skill: skill.name,
      destination,
      action: destinationExists ? 'replaced' : 'installed'
    };
  } catch (error) {
    await rm(temporary, { recursive: true, force: true });

    if (destinationExists && !await pathExists(destination) && await pathExists(backup)) {
      await rename(backup, destination);
    }
    throw error;
  }
}

export async function installSkills({ skills, targetRoot, force = false, dryRun = false }) {
  const results = [];
  for (const skill of skills) {
    results.push(await installSkill({ skill, targetRoot, force, dryRun }));
  }
  return results;
}
