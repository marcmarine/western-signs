import { dictionaries } from '../data/dictionaries'
import planets from '../data/planets'
import type { Dictionary, Language, Planet, Planets } from './definitions'

export function getPlanet(planet: Planets, lang: Language = 'en'): Planet {
  const planetData: Planet = {} as Planet

  for (const [key, value] of Object.entries(planets[planet as Planets])) {
    const translatedValue =
      dictionaries[lang as Language][value as keyof Dictionary]

    planetData[key as keyof Planet] = translatedValue || value
  }

  return planetData as Planet
}
