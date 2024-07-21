import type { ELEMENTS, MODALITIES, PLANETS, SIGNS } from '../data/constants'
import { dictionaries } from '../data/dictionaries'

export type Language = keyof typeof dictionaries

type ObjectValues<T> = T[keyof T]

export type Signs = ObjectValues<typeof SIGNS>
export type Elements = ObjectValues<typeof ELEMENTS>
export type Modalities = ObjectValues<typeof MODALITIES>
export type Planets = ObjectValues<typeof PLANETS>

export interface Sign {
  name: string
  element: string
  modality: string
  rulingPlanet: string
  symbol: string
}

export type Translations = Record<Language, Sign>
export type Dictionary = Record<Signs | Elements | Modalities | Planets, string>
export type Dictionaries = Record<Language, Dictionary>
