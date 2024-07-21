await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'node',
  format: 'esm', // Bun: "Currently the bundler only supports one module format: "esm". Support for "cjs" and "iife" are planned."
  minify: true
})
