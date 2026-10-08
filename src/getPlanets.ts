import planets from './data/planets'
import type { Language, Planet } from './definitions'
import { translate } from './utils'

/**
 * Get all planets with their translated properties for a specified language.
 *
 * @param {Language} [language='en'] - The language code for which translations are needed. Defaults to `'en'`.
 * @returns {Planet[]} An array of Planet objects with translated values based on the specified language.
 *
 * @deprecated Use {@link zodiac | `zodiac.planets.all()`} instead. Will be removed in the next major version.
 *
 * @example
 * import { getPlanets } from 'western-signs';
 *
 * // Retrieve information about all planets in English
 * const data = getPlanets();
 * console.log(data);
 * // Output:
 * // [
 * //   {
 * //     name: 'Mercury',
 * //     glyph: '☿',
 * //     type: 'Personal'
 * //   },
 * //   {
 * //     name: 'Venus',
 * //     glyph: '♀',
 * //     type: 'Personal'
 * //   },
 * //   ...
 * // ]
 */
export function getPlanets(language: Language = 'en'): Planet[] {
  return Object.values(planets).map(planet => translate(planet, language))
}
