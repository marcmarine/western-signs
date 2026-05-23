import type { Dictionary } from '../../definitions'
import en from './en'

export const dictionaries = new Map<string, Dictionary>()

dictionaries.set('en', en)

export function registerDictionary(lang: string, dictionary: Dictionary) {
  dictionaries.set(lang, dictionary)
}
