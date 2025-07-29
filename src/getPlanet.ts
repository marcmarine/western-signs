import { dictionaries } from '../data/dictionaries'
import planets from '../data/planets'
import type { Dictionary, Language, Planet, Planets } from './definitions'

/**
 * Get a single planet with its translated properties for a specified language.
 *
 * @param {Planets} planetKey - The key corresponding to the desired planet.
 * @param {Language} [language='en'] - The language code to use for translations. Defaults to 'en'.
 * @returns {Planet | null} An object with translated values based on the specified language, or null  if the planet key is invalid.
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
  planetKey: Planets,
  language: Language = 'en',
): Planet | null {
  const planet = planets[planetKey]

  if (!planet) return null

  const translatedPlanet = Object.fromEntries(
    Object.entries(planet).map(([key, value]) => [
      key,
      dictionaries[language as Language][value as keyof Dictionary] || value,
    ]),
  ) as Planet

  return translatedPlanet
}
