import houses from './data/houses'
import type { House, Language } from './definitions'
import { translate } from './utils'

/**
 * Get all astrological houses with their translations for a specified language.
 *
 * @param {Language} [language='en'] - The language code for which translations are needed. Defaults to 'en'.
 * @returns {House[]} An array of House objects with translated values based on the specified language.
 *
 * @deprecated Use {@link zodiac | `zodiac.houses.all()`} instead. Will be removed in the next major version.
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
 * //     number: 1,
 * //     title: 'The individual personality',
 * //     sign: 'Aries',
 * //     rulingPlanet: 'Mars',
 * //     keywords: [
 * //       'Self-image',
 * //       'Identity',
 * //       'Impressions on others',
 * //       'Personality'
 * //     ]
 * //   },
 * //  ...
 * // ]
 */
export function getHouses(language: Language = 'en'): House[] {
  return houses.map(house => {
    const translatedHouse = translate(house, language)

    return {
      ...translatedHouse,
      keywords: translatedHouse.keywords.split(',')
    }
  })
}
