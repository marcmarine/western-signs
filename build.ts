await Bun.build({
  entrypoints: ['./src/index.ts'],
  format: 'esm',
  minify: true,
  outdir: './dist',
  target: 'node'
})
