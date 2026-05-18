import { dictionaries } from '@/data/dictionaries'
import signs from '../data/signs'
import type { Dictionary, Language, Sign, Signs } from './definitions'

/**
 * Get the astrological sign by its name with translations for the specified language.
 *
 * @param {Signs} signName - The name of the astrological sign to retrieve.
 * @param {Language} [language='en'] - The language code for which translations are needed. Defaults to 'en'.
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
export function getSign(
  signName: Signs,
  language: Language = 'en',
): Sign | null {
  const sign = signs[signName]

  if (!sign) return null

  const translatedSign = Object.fromEntries(
    Object.entries(sign).map(([key, value]) => [
      key,
      dictionaries[language as Language][value as keyof Dictionary] || value,
    ]),
  ) as Sign

  return translatedSign
}
