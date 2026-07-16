import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { detectConfiguredAgents, getAgent, getAgentPaths, inspectAgents } from '../lib/agents.mjs';

test('agent aliases and target directories are stable', () => {
  assert.equal(getAgent('qoder-cli').id, 'qoder');
  assert.equal(getAgent('claude').id, 'claude-code');
  assert.equal(getAgentPaths(getAgent('codex'), '/tmp/ding-home').skillsRoot, '/tmp/ding-home/.codex/skills');
  assert.equal(getAgentPaths(getAgent('qoderwork'), '/tmp/ding-home').skillsRoot, '/tmp/ding-home/.qoderwork/skills');
});

test('detectConfiguredAgents only returns configured writable agents', async (context) => {
  const home = await mkdtemp(path.join(tmpdir(), 'ding-skills-agents-'));
  context.after(() => rm(home, { recursive: true, force: true }));
  await mkdir(path.join(home, '.codex'));

  const statuses = await inspectAgents(home);
  const detected = await detectConfiguredAgents(home);

  assert.equal(statuses.find(({ agent }) => agent.id === 'codex').configured, true);
  assert.deepEqual(detected.map(({ agent }) => agent.id), ['codex']);
});
