import { dictionaries } from './data/dictionaries'
import signs from './data/signs'
import type { Dictionary, Language, Sign, Signs } from './definitions'

/**

 * Get all astrological signs with their translations for a specified language.
 *
 * @param {Language} [language='en']  - The language code for which translations are needed. Defaults to 'en'.
 * @returns {Sign[]} An array of Sign objects with translated values based on the specified language.
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
  const translatedSigns = Object.keys(signs).map(signKey => {
    const sign = signs[signKey as Signs]

    const translatedSign = Object.fromEntries(
      Object.entries(sign).map(([key, value]) => [
        key,
        dictionaries.get(language as Language)?.[value as keyof Dictionary] ||
          value,
      ]),
    ) as Sign

    return translatedSign
  })

  return translatedSigns
}
