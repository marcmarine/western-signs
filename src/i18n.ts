import { dictionaries } from './data/dictionaries'
import type { Dictionary, Labeled, Language } from './definitions'

let currentLanguage: Language = 'en'

/**
 * Sets the current language to the provided language.
 * @param {Language} language - The language to set as current.
 */
export function setLanguage(language: Language): void {
  currentLanguage = language
}

/**
 * Retrieves the current language.
 * @returns {Language} The current language.
 */
export function getLanguage(): Language {
  return currentLanguage
}

/**
 * Translates a key into the current language, or into the given one.
 * @param {keyof Dictionary} key - The key to translate, e.g. `SIGNS.TAURUS`.
 * @param {Language} [language] - The language to translate into. Defaults to the one set with `setLanguage()`.
 * @returns {string} The translated string, or the key itself if no translation is found.
 *
 * @example
 * import { SIGNS, i18n } from 'western-signs'
 * import 'western-signs/locale/es'
 *
 * i18n.setLanguage('es')
 *
 * i18n.t(SIGNS.TAURUS)
 * // Output: Tauro
 *
 * i18n.t(SIGNS.TAURUS, 'en')
 * // Output: Taurus
 */
export function t(
  key: keyof Dictionary,
  language: Language = getLanguage()
): string {
  return dictionaries.get(language)?.[key] ?? key
}

/**
 * Translates every identifier of an item into the current language, or into the given one,
 * also inside nested objects such as `rulers`. The `id` is kept, and its translation is added as `name`.
 * @param item - A sign, planet, house or aspect, e.g. from `zodiac.signs.get()`.
 * @param {Language} [language] - The language to translate into. Defaults to the one set with `setLanguage()`.
 * @returns A copy of the item with its values translated.
 *
 * @example
 * import { SIGNS, i18n, zodiac } from 'western-signs'
 * import 'western-signs/locale/es'
 *
 * i18n.label(zodiac.signs.get(SIGNS.TAURUS), 'es')
 * // Output: { id: 'taurus', name: 'Tauro', element: 'Tierra', ... }
 */
export function label<T extends { id: string }>(
  item: T,
  language: Language = getLanguage()
): Labeled<T> {
  const dictionary = dictionaries.get(language)
  const translate = (value: unknown): unknown =>
    typeof value === 'object' && value !== null
      ? Object.fromEntries(
          Object.entries(value).map(([key, value]) => [key, translate(value)])
        )
      : (dictionary?.[value as keyof Dictionary] ?? value)

  const { id, ...rest } = item

  return {
    id,
    name: dictionary?.[id as keyof Dictionary] ?? id,
    ...(translate(rest) as object)
  } as Labeled<T>
}

/**
 * Returns `t` and `label` fixed to the given language, ignoring `setLanguage()`.
 * Useful on a server, where each request may need a different language.
 * @param {Language} language - The language to translate into.
 *
 * @example
 * import { SIGNS, i18n, zodiac } from 'western-signs'
 * import 'western-signs/locale/es'
 *
 * const es = i18n.locale('es')
 *
 * es.t(SIGNS.TAURUS)
 * // Output: Tauro
 *
 * es.label(zodiac.signs.get(SIGNS.TAURUS)).name
 * // Output: Tauro
 */
export function locale(language: Language) {
  return {
    /** Translates a key, as {@link t | `t()`} does. */
    t: (key: keyof Dictionary) => t(key, language),
    /** Translates an item, as {@link label | `label()`} does. */
    label: <T extends { id: string }>(item: T) => label(item, language)
  }
}
