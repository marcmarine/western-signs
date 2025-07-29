import { dictionaries } from '../data/dictionaries'
import planets from '../data/planets'
import type { Dictionary, Language, Planet, Planets } from './definitions'

export function getPlanet(
  planetKey: Planets,
  language: Language = 'en',
): Planet {
  const planet = planets[planetKey]

  const translatedPlanet = Object.fromEntries(
    Object.entries(planet).map(([key, value]) => [
      key,
      dictionaries[language as Language][value as keyof Dictionary] || value,
    ]),
  ) as Planet

  return translatedPlanet
}
