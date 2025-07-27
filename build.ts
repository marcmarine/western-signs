import dts from 'bun-plugin-dts'

await Bun.build({
  entrypoints: ['./src/index.ts'],
  format: 'esm',
  minify: true,
  outdir: './dist',
  plugins: [dts()],
  target: 'node'
})
