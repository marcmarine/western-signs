import { dictionaries } from './data/dictionaries'
import type { Dictionary, Labeled, Language } from './definitions'

/**
 * Translates a key into the given language, or into English.
 * @param {keyof Dictionary} key - The key to translate, e.g. `SIGNS.TAURUS`.
 * @param {Language} [language] - The language to translate into. Defaults to English.
 * @returns {string} The translated string, or the key itself if no translation is found.
 *
 * @example
 * import { SIGNS, i18n } from 'western-signs'
 * import 'western-signs/locale/es'
 *
 * i18n.t(SIGNS.TAURUS)
 * // Output: Taurus
 *
 * i18n.t(SIGNS.TAURUS, 'es')
 * // Output: Tauro
 */
export function t(key: keyof Dictionary, language: Language = 'en'): string {
  return dictionaries.get(language)?.[key] ?? key
}

/**
 * Translates every identifier of an item into the given language, or into English,
 * also inside nested objects such as `rulers`. The `id` is kept, and its translation is added as `name`.
 * @param item - A sign, planet, house or aspect, e.g. from `zodiac.signs.get()`.
 * @param {Language} [language] - The language to translate into. Defaults to English.
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
  language: Language = 'en'
): Labeled<T> {
  const dictionary = dictionaries.get(language)
  const translate = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(translate)
    if (typeof value === 'object' && value !== null)
      return Object.fromEntries(
        Object.entries(value).map(([key, value]) => [key, translate(value)])
      )

    return dictionary?.[value as keyof Dictionary] ?? value
  }

  const { id, ...rest } = item

  return {
    id,
    name: dictionary?.[id as keyof Dictionary] ?? id,
    ...(translate(rest) as object)
  } as Labeled<T>
}

/**
 * Returns `t` and `label` fixed to the given language, to work in it without passing it on every call.
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
