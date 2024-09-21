import signs from '../data/signs'
import type { Sign, Language, Signs } from './definitions'
import { translateSignData } from './utils'

/**
 * Get the astrological sign by its name with translations for the specified language.
 *
 * @param {Signs} sign - The name of the astrological sign to retrieve.
 * @param {Language} [lang='en'] - The language code for which translations are needed. Defaults to 'en'.
 * @returns {Sign | null} An object representing the sign with translated values or null if the sign or dictionary is not found.
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
export function getSignByName(sign: Signs, lang: Language = 'en'): Sign | null {
  const signData = signs[sign]

  if (!signData) return null

  return translateSignData(signData, lang)
}
