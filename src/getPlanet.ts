import planets from './data/planets'
import type { Language, Planet, Planets } from './definitions'
import { translate } from './utils'

/**
 * Get a single planet with its translated properties for a specified language.
 *
 * @param {Planets} planetName - The key corresponding to the desired planet.
 * @param {Language} [language='en'] - The language code to use for translations. Defaults to 'en'.
 * @returns {Planet | null} An object with translated values based on the specified language, or null  if the planet key is invalid.
 *
 * @deprecated Use {@link zodiac | `zodiac.planets.get()`} instead. Will be removed in the next major version.
 *
 * @example
 * import { getPlanet, PLANETS } from 'western-signs';
 *
 * // Retrieve information about Mars in English
 * const mars = getPlanet(PLANETS.MARS);
 * console.log(mars);
 * // Output:
 * // {
 * //   name: 'Mars',
 * //   glyph: '♂',
 * //   type: 'Personal'
 * // }
 */
export function getPlanet(
  planetName: Planets,
  language: Language = 'en'
): Planet | null {
  const planet = planets[planetName]

  if (!planet) return null

  return translate(planet, language)
}
