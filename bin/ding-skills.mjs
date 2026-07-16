#!/usr/bin/env node

import { run } from '../lib/cli.mjs';

try {
  await run();
} catch (error) {
  process.stderr.write(`错误：${error.message}\n`);
  process.exitCode = 1;
}
