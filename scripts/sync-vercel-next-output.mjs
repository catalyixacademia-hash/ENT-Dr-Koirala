import { cpSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const src = join('entportal', '.next');
const dest = '.next';

if (!existsSync(src)) {
  console.error('sync-vercel-next-output: entportal/.next not found after build');
  process.exit(1);
}

cpSync(src, dest, { recursive: true });
console.log('sync-vercel-next-output: copied entportal/.next to .next');
