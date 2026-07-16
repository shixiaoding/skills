import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { listSkills, selectSkills } from '../lib/catalog.mjs';

async function createTemporarySkillsRoot() {
  return mkdtemp(path.join(tmpdir(), 'ding-skills-catalog-'));
}

test('listSkills reads valid skills from directories', async (context) => {
  const root = await createTemporarySkillsRoot();
  context.after(() => rm(root, { recursive: true, force: true }));
  const skillDirectory = path.join(root, 'demo-skill');
  await mkdir(skillDirectory);
  await writeFile(path.join(skillDirectory, 'SKILL.md'), '---\nname: demo-skill\ndescription: Demo skill\n---\n# Demo\n');

  const skills = await listSkills(root);

  assert.deepEqual(skills.map(({ name, description }) => ({ name, description })), [
    { name: 'demo-skill', description: 'Demo skill' }
  ]);
  assert.deepEqual(selectSkills(skills, ['demo-skill'], false).map(({ name }) => name), ['demo-skill']);
});

test('listSkills rejects mismatched directory names', async (context) => {
  const root = await createTemporarySkillsRoot();
  context.after(() => rm(root, { recursive: true, force: true }));
  const skillDirectory = path.join(root, 'wrong-name');
  await mkdir(skillDirectory);
  await writeFile(path.join(skillDirectory, 'SKILL.md'), '---\nname: another-name\ndescription: Demo skill\n---\n# Demo\n');

  await assert.rejects(listSkills(root), /必须与目录名/);
});
