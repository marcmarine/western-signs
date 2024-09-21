import signs from '../data/signs'
import type { Language, Sign, Signs } from './definitions'
import { isDateInRange, translateSignData } from './utils'

/**
 * Retrieve the astrological sign corresponding to a given date, with optional translations for the specified language.
 *
 * @param {Date} date - The date for which the corresponding astrological sign is to be retrieved.
 * @param {Language} [lang='en'] - The language code for which translations are needed. Defaults to 'en'.
 * @throws {Error} Will throw an error if the provided date is invalid.
 * @returns {Sign | null} An object representing the astrological sign with translated values or null if the sign is not found.
 *
 * @example
 * import { getSignByDate } from 'western-signs';
 *
 * // Retrieve the sign for May 15 in English
 * const signData = getSignByDate(new Date(1813, 4, 5));
 * console.log(signData);
 * // Output:
 * // {
 * //   name: 'Taurus',
 * //   element: 'Earth',
 * //   modality: 'Fixed',
 * //   rulingPlanet: 'Venus',
 * //   symbol: '♉',
 * //   [...]
 * // }
 */
export function getSignByDate(date: Date, lang: Language = 'en'): Sign | null {
  if (!(date instanceof Date)) throw new Error('Invalid date')

  for (let key of Object.keys(signs)) {
    const sign = signs[key as Signs]
    const { startDate, endDate } = sign

    if (isDateInRange(startDate, endDate, date)) {
      return translateSignData(sign, lang)
    }
  }

  return null
}
