import * as fs from 'fs'
import * as path from 'path'
import { aspects } from './src/data/aspects'
import ca from './src/data/dictionaries/ca'
import en from './src/data/dictionaries/en'
import es from './src/data/dictionaries/es'
import houses from './src/data/houses'
import planets from './src/data/planets'
import signs from './src/data/signs'

const outputDir: string = path.resolve(import.meta.dir, 'dist')

// Each language goes in its own file, so a project only loads the ones it uses
export const labels = { en, es, ca }

// Values are ids; the files in `labels` translate them
export function createData() {
  return {
    signs: Object.values(signs),
    planets: Object.values(planets),
    houses,
    aspects
  }
}

function writeJSON(file: string, content: unknown) {
  const filePath = path.join(outputDir, file)

  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(content, null, 2)}\n`)
}

if (import.meta.main) {
  writeJSON('data.json', createData())

  for (const [language, dictionary] of Object.entries(labels)) {
    writeJSON(`locale/${language}.json`, dictionary)
  }
}
