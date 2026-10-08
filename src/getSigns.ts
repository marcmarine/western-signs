import signs from './data/signs'
import type { Language, Sign } from './definitions'
import { translate } from './utils'

/**

 * Get all astrological signs with their translations for a specified language.
 *
 * @param {Language} [language='en']  - The language code for which translations are needed. Defaults to 'en'.
 * @returns {Sign[]} An array of Sign objects with translated values based on the specified language.
 *
 * @deprecated Use {@link zodiac | `zodiac.signs.all()`} instead. Will be removed in the next major version.
 *
 * @example
 * import { getSigns } from 'western-signs';
 *
 * // Retrieve information about all signs in English
 * const data = getSigns();
 * console.log(data);
 * // Output:
 * // [
 * //  {
 * //    name: 'Aries',
 * //    element: 'Air',
 * //    modality: 'Cardinal',
 * //    rulingPlanet: 'Mars',
 * //    symbol: '♈'
 * //  },
 * //  {
 * //    name: 'Taurus',
 * //    element: 'Earth',
 * //    modality: 'Fixed',
 * //    rulingPlanet: 'Venus',
 * //    symbol: '♉'
 * //  },
 * //  ...
 * // ]
 */
export function getSigns(language: Language = 'en'): Sign[] {
  return Object.values(signs).map(sign => translate(sign, language))
}
