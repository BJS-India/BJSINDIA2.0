import { existsSync, mkdirSync, openSync, closeSync, readFileSync } from 'node:fs';
import { release } from 'node:os';
import { delimiter, join, resolve } from 'node:path';
import { execFileSync, spawn } from 'node:child_process';

let runtime = process.execPath;
let viteEntry = resolve('node_modules/vite/bin/vite.js');
const isWsl1 = process.platform === 'linux'
  && /microsoft/i.test(release())
  && !/microsoft-standard|wsl2/i.test(release());

if (isWsl1) {
  const candidates = [
    process.env.BJS_WINDOWS_NODE,
    ...(process.env.PATH || '').split(delimiter).map(directory => join(directory, 'node.exe')),
  ].filter(Boolean);
  runtime = candidates.find(candidate => existsSync(candidate));
  if (!runtime) {
    console.error('WSL 1 cache directory renames fail in this setup. Run npm run dev from PowerShell, or set BJS_WINDOWS_NODE to the WSL path of Windows node.exe.');
    process.exit(1);
  }
  viteEntry = execFileSync('wslpath', ['-w', viteEntry], { encoding: 'utf8' }).trim();
  console.log('WSL 1 detected: using Windows Node to avoid dependency-cache rename failures.');
}

let logHandles;
let logPaths;
if (isWsl1) {
  const logDir = resolve('.dev-logs');
  mkdirSync(logDir, { recursive: true });
  logPaths = [join(logDir, `vite-${process.pid}.out.log`), join(logDir, `vite-${process.pid}.err.log`)];
  logHandles = logPaths.map(path => openSync(path, 'w'));
}
const child = spawn(runtime, [viteEntry, '--host', '0.0.0.0', '--port', '5173', '--strictPort', ...process.argv.slice(2)], {
  cwd: process.cwd(),
  // Real files bridge WSL 1's incompatible pipe/console handles to node.exe.
  stdio: isWsl1 ? ['ignore', ...logHandles] : 'inherit',
  windowsHide: true,
});
const offsets = [0, 0];
function flushLogs() {
  if (!logPaths) return;
  logPaths.forEach((path, i) => {
    const contents = readFileSync(path);
    if (contents.length > offsets[i]) (i ? process.stderr : process.stdout).write(contents.subarray(offsets[i]));
    offsets[i] = contents.length;
  });
}
const logTimer = isWsl1 ? setInterval(flushLogs, 250) : null;
child.on('error', error => { console.error(`Could not start Vite: ${error.message}`); process.exitCode = 1; });
child.on('close', (code, signal) => {
  if (logTimer) clearInterval(logTimer);
  flushLogs();
  logHandles?.forEach(closeSync);
  process.exitCode = code ?? (signal ? 1 : 0);
});
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
