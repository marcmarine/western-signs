import { defineConfig } from 'rolldown'

export default defineConfig({
  input: {
    index: 'src/index.ts',
    'locale/es': 'src/locale/es.ts',
    'locale/ca': 'src/locale/ca.ts',
  },
  output: {
    dir: 'dist',
    format: 'esm',
    minify: true,
  },
})
