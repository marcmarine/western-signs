await Bun.build({
  entrypoints: [
    './src/index.ts',
    './src/getSign.ts',
    './src/getSigns.ts',
    './src/getSignByDate.ts',
    './src/getPlanet.ts',
    './src/getPlanets.ts',
    './src/getHouses.ts',
    './src/getSymbol.ts',
    './src/i18n.ts',
    './src/data/constants.ts',
  ],
  format: 'esm',
  minify: true,
  outdir: './dist',
  target: 'node',
  splitting: true,
  naming: {
    entry: '[name].js',
    chunk: 'chunk-[hash].js',
  },
})
