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
 * Adds the translations of an item into the given language, or into English, as `labels`.
 * The item's fields are kept as they are, so they can still be compared with the exported constants.
 * `labels` holds the translation of the `id` as `name`, and of every field made of identifiers,
 * also inside nested objects such as `rulers`. Numbers and glyphs are left out.
 * @param item - A sign, planet, house or aspect, e.g. from `zodiac.signs.get()`.
 * @param {Language} [language] - The language to translate into. Defaults to English.
 * @returns A copy of the item with its translations as `labels`.
 *
 * @example
 * import { ELEMENTS, SIGNS, i18n, zodiac } from 'western-signs'
 * import 'western-signs/locale/es'
 *
 * const taurus = i18n.label(zodiac.signs.get(SIGNS.TAURUS), 'es')
 *
 * taurus.labels
 * // Output: { name: 'Tauro', element: 'Tierra', rulers: { modern: 'Venus', ... }, ... }
 *
 * taurus.element === ELEMENTS.EARTH
 * // Output: true
 */
export function label<T extends { id: string }>(
  item: T,
  language: Language = 'en'
): Labeled<T> {
  const dictionary = dictionaries.get(language)
  // English is always registered and has every identifier, so it tells them apart from glyphs
  const isId = (value: unknown): value is keyof Dictionary =>
    typeof value === 'string' &&
    Object.hasOwn(dictionaries.get('en') ?? {}, value)

  // The translation of a value, or `undefined` for one that holds no identifier
  const translate = (value: unknown): unknown => {
    if (value === null) return null
    if (isId(value)) return dictionary?.[value] ?? value
    if (Array.isArray(value))
      return value.every(isId) ? value.map(translate) : undefined
    if (typeof value === 'object') {
      const entries = Object.entries(value)
        .map(([key, value]) => [key, translate(value)])
        .filter(([, value]) => value !== undefined)

      return entries.length > 0 ? Object.fromEntries(entries) : undefined
    }

    return undefined
  }

  const { id, ...rest } = item

  return {
    ...item,
    labels: {
      name: dictionary?.[id as keyof Dictionary] ?? id,
      ...(translate(rest) as object)
    }
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
