import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, mkdir, rm } from 'node:fs/promises';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

const execFileAsync = promisify(execFile);
const packageRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const binary = path.join(packageRoot, 'bin', 'ding-skills.mjs');

test('CLI lists skills and installs a selected skill into an isolated home', async (context) => {
  const home = await mkdtemp(path.join(tmpdir(), 'ding-skills-cli-'));
  context.after(() => rm(home, { recursive: true, force: true }));
  await mkdir(path.join(home, '.codex'));
  const environment = { ...process.env, DING_SKILLS_HOME: home };

  const listed = await execFileAsync(process.execPath, [binary, 'list'], { env: environment });
  assert.match(listed.stdout, /research-summary/);
  assert.match(listed.stdout, /study-examiner/);

  const preview = await execFileAsync(process.execPath, [binary, 'install', 'study-examiner', '--agent', 'codex', '--dry-run'], { env: environment });
  assert.match(preview.stdout, /install（预览）/);

  const installed = await execFileAsync(process.execPath, [binary, 'install', 'study-examiner', '--agent', 'codex'], { env: environment });
  assert.match(installed.stdout, /installed/);
});
