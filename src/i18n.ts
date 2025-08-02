import { dictionaries } from '@/data/dictionaries'
import type { Dictionary, Language } from './definitions'

let currentLanguage: Language = 'es'

export function setLanguage(language: Language): void {
  currentLanguage = language
}

export function getLanguage(): Language {
  return currentLanguage
}

export function t(strings: TemplateStringsArray, ...values: string[]): string {
  const language = getLanguage()

  return strings
    .map((string, index) => {
      const wordToTranslate = values[index - 1] || ''
      const translatedWord =
        dictionaries[language][wordToTranslate as keyof Dictionary] ||
        wordToTranslate

      return translatedWord + string
    })
    .join('')
}
