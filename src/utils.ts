import { dictionaries } from './data/dictionaries'
import signs from './data/signs'
import type { Dictionary, Language, Signs, Translations } from './definitions'

export function getAllSignWithTranslations() {
  const signData: Partial<Record<Signs, Translations>> = {}

  Object.keys(signs).forEach(signKey => {
    const sign = signKey as Signs
    const translationData: Translations = {} as Translations

    Object.keys(dictionaries).forEach(langKey => {
      const lang = langKey as Language
      translationData[lang] = translate(signs[sign], lang)
    })

    signData[sign] = translationData
  })

  return signData
}

/**
 * Translate every value of an item that matches a dictionary key, keeping the rest unchanged.
 */
export function translate<T extends object>(item: T, language: Language): T {
  const dictionary = dictionaries.get(language)

  return Object.fromEntries(
    Object.entries(item).map(([key, value]) => [
      key,
      dictionary?.[value as keyof Dictionary] || value
    ])
  ) as T
}

export function isDateInRange(
  startDate: Date,
  endDate: Date,
  currentDate: Date
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
