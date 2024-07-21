import signs from '../data/signs'
import { dictionaries } from '../data/dictionaries'
import type {
  Elements,
  Sign,
  Language,
  Modalities,
  Planets,
  Signs
} from './definitions'

/**
 * Get the astrological sign by its name with translations for the specified language.
 *
 * @param {Signs} sign - The name of the astrological sign to retrieve.
 * @param {Language} [lang='en'] - The language code for which translations are needed. Defaults to 'en'.
 * @returns {ISign | null} An object representing the sign with translated values or null if the sign or dictionary is not found.
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
 * // }
 */
export default function getSignByName(
  sign: Signs,
  lang: Language = 'en'
): Sign | null {
  const signData = signs[sign]
  const dictionary = dictionaries[lang]

  if (!signData || !dictionaries) return null

  return {
    name: dictionary[sign],
    element: dictionary[signData.element as Elements],
    modality: dictionary[signData.modality as Modalities],
    rulingPlanet: dictionary[signData.rulingPlanet as Planets],
    symbol: signData.symbol
  }
}
