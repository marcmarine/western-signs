import { dictionaries } from './data/dictionaries'
import type { Dictionary, Language } from './definitions'

/**
 * Translate every value of an item that matches a dictionary key, keeping the rest unchanged.
 */
export function translate<T extends object>(item: T, language: Language): T {
  const dictionary = dictionaries.get(language)

  return Object.fromEntries(
    Object.entries(item).map(([key, value]) => [
      key,
      dictionary?.[value as keyof Dictionary] ?? value
    ])
  ) as T
}
