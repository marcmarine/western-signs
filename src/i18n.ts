import { dictionaries } from './data/dictionaries'
import type { Dictionary, Language } from './definitions'

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
