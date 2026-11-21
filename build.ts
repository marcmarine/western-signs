await Bun.build({
  entrypoints: [
    './src/index.ts',
    ...[...new Bun.Glob('./src/locale/*.ts').scanSync()].sort()
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
