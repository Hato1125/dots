import path from 'path';

export const RELEASE: boolean = Bun.argv.includes('--release');

await Bun.build({
  entrypoints: [
    path.resolve(import.meta.dir, 'src/main.ts'),
  ],
  external: [
    'gi://*',
    'file://*',
    'resource://*',
    'system',
    'console',
  ],
  target: 'bun',
  format: 'esm',
  outdir: '/var/tmp/mii.desktop/',
  sourcemap: RELEASE
    ? 'none'
    : 'inline',
  minify: RELEASE,
});
