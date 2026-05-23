import { dictionaries } from './data/dictionaries'
import signs from './data/signs'
import type {
  Dictionary,
  Language,
  Sign,
  Signs,
  Translations,
} from './definitions'

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
        translatedSign[key as keyof Sign] = dictionaryValue || value
      })

      translationData[lang] = translatedSign as Sign
    })

    signData[sign] = translationData
  })

  return signData
}

export function isDateInRange(
  startDate: Date,
  endDate: Date,
  currentDate: Date,
): boolean {
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()

  const startMonth = startDate.getMonth() + 1
  const startDay = startDate.getDate()
  const endMonth = endDate.getMonth() + 1
  const endDay = endDate.getDate()

  return (
    (month === startMonth && day >= startDay) ||
    (month === endMonth && day <= endDay) ||
    (startMonth > endMonth && (month > startMonth || month < endMonth))
  )
}
