import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Keep Windows and Linux dependency optimizer caches separate.
const projectId = createHash('sha256')
  .update(fileURLToPath(new URL('.', import.meta.url)))
  .digest('hex')
  .slice(0, 16);

export default defineConfig({
  plugins: [react()],
  cacheDir: join(tmpdir(), 'bjs-vite', `${projectId}-${process.platform}-${process.arch}`),
});
