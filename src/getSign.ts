import signs from './data/signs'
import type { Language, Sign, Signs } from './definitions'
import { translate } from './utils'

/**
 * Get the astrological sign by its name with translations for the specified language.
 *
 * @param {Signs} signName - The name of the astrological sign to retrieve.
 * @param {Language} [language='en'] - The language code for which translations are needed. Defaults to 'en'.
 * @returns {Sign | null} An object representing the sign with translated values or null if the sign or dictionary is not found.
 *
 * @deprecated Use {@link zodiac | `zodiac.signs.get()`} instead. Will be removed in the next major version.
 *
 * @example
 * import { getSignByName, SIGNS } from 'western-signs';
 *
 * // Retrieve information about Taurus in English
 * const taurusData = getSignByName(SIGNS.TAURUS);
 * console.log(taurusData);
 * // Output:
 * // {
 * //   name: 'Taurus',
 * //   element: 'Earth',
 * //   modality: 'Fixed',
 * //   rulingPlanet: 'Venus',
 * //   symbol: '♉'
 * //   [...]
 * // }
 */
export function getSign(
  signName: Signs,
  language: Language = 'en'
): Sign | null {
  const sign = signs[signName]

  if (!sign) return null

  return translate(sign, language)
}
