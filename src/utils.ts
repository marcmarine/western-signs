import { dictionaries } from '../data/dictionaries'
import signs from '../data/signs'
import type {
  BodyParts,
  Characters,
  Dictionary,
  Element,
  Hemispheres,
  House,
  HouseModalities,
  Language,
  Modalities,
  Planets,
  Polarities,
  Seasons,
  Sign,
  Signs,
  Translations,
} from './definitions'

export const getLanguageName = (code: Language) => {
  switch (code) {
    case 'es':
      return 'Español'
    case 'ca':
      return 'Català'
    default:
      return 'English'
  }
}

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

export function capitalizeString(string: string) {
  if (string.length === 0) return string
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export function translateSignData(signData: Sign, lang: Language): Sign {
  const dictionary = dictionaries[lang]

  return {
    bodyPart: dictionary[signData.bodyPart as BodyParts],
    character: dictionary[signData.character as Characters],
    element: dictionary[signData.element as Element] as Element,
    endDate: signData.endDate,
    glyph: signData.glyph,
    modality: dictionary[signData.modality as Modalities],
    name: dictionary[signData.name as Signs],
    number: signData.number,
    pole: dictionary[signData.pole as Polarities],
    rulingPlanet: dictionary[signData.rulingPlanet as Planets],
    season: dictionary[signData.season as Seasons],
    startDate: signData.startDate,
  }
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

export function translateHouseData(houseData: House, lang: Language): House {
  const dictionary = dictionaries[lang]

  const [, titleKey] = houseData.title.split('-')
  const [, keywordsKey] = (houseData.keywords as string).split('-')

  return {
    number: houseData.number,
    title: dictionary.houseTitles[Number(titleKey) - 1],
    sign: dictionary[houseData.sign as Signs],
    rulingPlanet: dictionary[houseData.rulingPlanet as Planets],
    keywords: dictionary.houseKeywords[Number(keywordsKey) - 1],
    element: dictionary[houseData.element as Element] as Element,
    hemisphere: dictionary[houseData.hemisphere as Hemispheres] as Hemispheres,
    phase: houseData.phase,
    quadrant: houseData.quadrant,
    modality: dictionary[
      houseData.modality as HouseModalities
    ] as HouseModalities,
  }
}
