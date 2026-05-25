await Bun.build({
  entrypoints: [
    './src/index.ts',
    './src/locale/es.ts',
    './src/locale/ca.ts',
  ],
  format: 'esm',
  outdir: './dist',
  target: 'node',
  minify: true,
  splitting: true,

  naming: {
    entry: '[dir]/[name].js',
  },
})
