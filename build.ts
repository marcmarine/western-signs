import dts from 'bun-plugin-dts'

await Bun.build({
  entrypoints: ['./src/index.ts'],
  external: ['iso-639-1'],
  format: 'esm',
  minify: true,
  outdir: './dist',
  plugins: [dts()],
  target: 'node',
})
