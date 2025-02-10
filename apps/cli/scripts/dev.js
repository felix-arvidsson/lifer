// scripts/dev.js
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const tsNode = spawn('node', [
  '--loader', 'ts-node/esm',
  '--experimental-specifier-resolution=node',
  resolve(projectRoot, 'src/index.ts'),
  ...process.argv.slice(2)
], {
  stdio: 'inherit',
  env: {
    ...process.env,
    TS_NODE_PROJECT: resolve(projectRoot, 'tsconfig.json')
  }
});

tsNode.on('error', (err) => {
  console.error('Failed to start ts-node:', err);
  process.exit(1);
});
