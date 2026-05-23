import { dictionaries } from './data/dictionaries'
import houses from './data/houses'
import type { Dictionary, House, Language } from './definitions'

/**
 * Get all astrological houses with their translations for a specified language.
 *
 * @param {Language} [language='en'] - The language code for which translations are needed. Defaults to 'en'.
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
  const translatedHouses = houses.map(house => {
    const translatedHouse = Object.fromEntries(
      Object.entries(house).map(([key, value]) => [
        key,
        dictionaries.get(language as Language)?.[value as keyof Dictionary] ||
          value,
      ]),
    ) as House

    return translatedHouse
  })

  return translatedHouses
}
