import { dictionaries } from '../data/dictionaries'
import planets from '../data/planets'
import type { Dictionary, Language, Planet, Planets } from './definitions'

/**
 * Get all planets with their translated properties for a specified language.
 *
 * @param {Language} [lang='en'] - The language code for which translations are needed. Defaults to `'en'`.
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
export function getPlanets(lang: Language = 'en'): Planet[] {
  return Object.keys(planets).map(sign => {
    const planetData: Partial<Planet> = {}

    Object.entries(planets[sign as Planets]).forEach(([key, value]) => {
      const translatedValue =
        dictionaries[lang as Language][value as keyof Dictionary]

      planetData[key as keyof Planet] = translatedValue || value
    })

    return planetData as Planet
  })
}
