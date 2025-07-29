import { dictionaries } from '../data/dictionaries'
import planets from '../data/planets'
import type { Dictionary, Language, Planet, Planets } from './definitions'

/**
 * Get all planets with their translated properties for a specified language.
 *
 * @param {Language} [language='en'] - The language code for which translations are needed. Defaults to `'en'`.
 * @returns {Planet[]} An array of Planet objects with translated values based on the specified language.
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
  const translatedPlanets = Object.keys(planets).map(planetKey => {
    const planet = planets[planetKey as Planets]

    const translatedPlanet = Object.fromEntries(
      Object.entries(planet).map(([key, value]) => [
        key,
        dictionaries[language][value as keyof Dictionary] || value,
      ]),
    ) as Planet

    return translatedPlanet
  })

  return translatedPlanets
}
