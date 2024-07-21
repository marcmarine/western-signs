import { dictionaries } from '../data/dictionaries'
import signs from '../data/signs'
import type { Dictionary, Sign, Language, Signs } from './definitions'

/**
 * Get all astrological signs with their translations for a specified language.
 *
 * @param {Language} [lang='en']  - The language code for which translations are needed. Defaults to 'en'.
 * @returns {Sign[]} An array of Sign objects with translated values based on the specified language.
 *
 * @example
 * import { getAllSigns } from 'western-signs';
 *
 * // Retrieve information about all signs in English
 * const data = getAllSigns();
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
export default function getAllSigns(lang: Language = 'en'): Sign[] {
  return Object.keys(signs).map(sign => {
    const signData: Partial<Sign> = {}

    Object.entries(signs[sign as Signs]).forEach(([key, value]) => {
      const dictionaryValue =
        dictionaries[lang as Language][value as keyof Dictionary]

      signData[key as keyof Sign] = dictionaryValue ?? value
    })

    return signData as Sign
  })
}
