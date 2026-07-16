import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { installSkill } from '../lib/installer.mjs';

async function createFixture(context) {
  const root = await mkdtemp(path.join(tmpdir(), 'ding-skills-installer-'));
  context.after(() => rm(root, { recursive: true, force: true }));
  const source = path.join(root, 'source-skill');
  const targetRoot = path.join(root, 'target');
  await mkdir(source);
  await writeFile(path.join(source, 'SKILL.md'), '# Source v1\n');
  return {
    skill: { name: 'source-skill', directory: source },
    targetRoot,
    destination: path.join(targetRoot, 'source-skill')
  };
}

test('installSkill copies a skill and supports dry runs', async (context) => {
  const fixture = await createFixture(context);
  const preview = await installSkill({ ...fixture, dryRun: true });
  assert.equal(preview.action, 'install');

  const result = await installSkill(fixture);
  assert.equal(result.action, 'installed');
  assert.equal(await readFile(path.join(fixture.destination, 'SKILL.md'), 'utf8'), '# Source v1\n');
});

test('installSkill preserves existing content unless force is set', async (context) => {
  const fixture = await createFixture(context);
  await mkdir(fixture.destination, { recursive: true });
  await writeFile(path.join(fixture.destination, 'SKILL.md'), '# Existing\n');

  await assert.rejects(installSkill(fixture), /--force/);
  assert.equal(await readFile(path.join(fixture.destination, 'SKILL.md'), 'utf8'), '# Existing\n');

  const result = await installSkill({ ...fixture, force: true });
  assert.equal(result.action, 'replaced');
  assert.equal(await readFile(path.join(fixture.destination, 'SKILL.md'), 'utf8'), '# Source v1\n');
});
