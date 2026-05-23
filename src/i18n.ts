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
 * Translates template strings into the current language using the provided values.
 * @param {TemplateStringsArray} strings - The template strings to be translated.
 * @param {string[]} values - The values to be translated within the template.
 * @returns {string} The translated string.
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
export function t(strings: TemplateStringsArray, ...values: string[]): string {
  const language = getLanguage()

  return strings
    .map((string, index) => {
      const wordToTranslate = values[index - 1] || ''
      const translatedWord =
        dictionaries.get(language)?.[wordToTranslate as keyof Dictionary] ||
        wordToTranslate

      return translatedWord + string
    })
    .join('')
}
