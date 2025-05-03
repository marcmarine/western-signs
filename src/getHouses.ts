import houses from '../data/houses'
import type { House, Language } from './definitions'
import { translateHouseData } from './utils'

/**
 * Get all astrological houses with their translations for a specified language.
 *
 * @param {Language} [lang='en'] - The language code for which translations are needed. Defaults to 'en'.
 * @returns {House[]} An array of House objects with translated values based on the specified language.
 *
 * @example
 * import { getHouses } from 'western-houses';
 *
 * // Retrieve information about all houses in English
 * const data = getHouses();
 * console.log(data);
 * // Output:
 * // [
 * //  {
          number: 1,
          title: 'The individual personality',
          sign: 'Aries',
          rulingPlanet: 'Mars',
          keywords: [
            'Self-image',
            'Identity',
            'Impressions on others',
            'Personality'
          ]
        },
 * //  ...
 * // ]
 */
export function getHouses(lang: Language = 'en'): House[] {
  return houses.map(house => {
    return translateHouseData(house, lang)
  })
}
