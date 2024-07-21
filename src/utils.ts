import ISO6391 from 'iso-639-1'
import signs from '../data/signs'
import { dictionaries } from '../data/dictionaries'
import type {
  Sign,
  Language,
  Signs,
  Dictionary,
  Translations
} from './definitions'

export const getLanguageName = ISO6391.getName

export function getAllSignWithTranslations() {
  const signData: Partial<Record<Signs, Translations>> = {}

  Object.keys(signs).forEach(signKey => {
    const sign = signKey as Signs
    const translationData: Translations = {} as Translations

    Object.keys(dictionaries).forEach(langKey => {
      const lang = langKey as Language
      const translatedSign: Partial<Sign> = {}

      Object.entries(signs[sign]).forEach(([key, value]) => {
        const dictionaryValue = dictionaries[lang][value as keyof Dictionary]
        translatedSign[key as keyof Sign] = dictionaryValue ?? value
      })

      translationData[lang] = translatedSign as Sign
    })

    signData[sign] = translationData
  })

  return signData
}

export function capitalizeString(string: string) {
  if (string.length === 0) return string
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}
