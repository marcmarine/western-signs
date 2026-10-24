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
export function t(key: keyof Dictionary, language?: Language): string
/**
 * Translates template strings into the current language using the provided values.
 * @param {TemplateStringsArray} strings - The template strings to be translated.
 * @param {string[]} values - The values to be translated within the template.
 * @returns {string} The translated string.
 *
 * @deprecated Use {@link t | `t(key)`} instead. Will be removed in the next major version.
 *
 * @example
 * import { SIGNS, i18n } from 'western-signs'
 *
 * i18n.setLanguage('es')
 *
 * const taurus = i18n.t`${SIGNS.TAURUS}`
 * console.log(taurus)
 * // Output: Tauro
 *
 */
export function t(strings: TemplateStringsArray, ...values: string[]): string
export function t(
  input: keyof Dictionary | TemplateStringsArray,
  ...args: (string | undefined)[]
): string {
  if (typeof input === 'string') {
    const [language = getLanguage()] = args as Language[]

    return dictionaries.get(language)?.[input] ?? input
  }

  const language = getLanguage()

  return input
    .map((string, index) => {
      const wordToTranslate = args[index - 1] || ''
      const translatedWord =
        dictionaries.get(language)?.[wordToTranslate as keyof Dictionary] ||
        wordToTranslate

      return translatedWord + string
    })
    .join('')
}
