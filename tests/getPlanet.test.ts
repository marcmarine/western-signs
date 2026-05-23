import { describe, expect, it } from 'bun:test'
import { dictionaries } from '@/data/dictionaries'
import planets from '@/data/planets'
import type { Dictionary, Language, Planet, Planets } from '@/definitions'
import { getPlanet, PLANETS } from '@/index'

describe('getPlanet', () => {
  it('should return translated planet data for a given language', () => {
    const planet = PLANETS.SATURN
    const language: Language = 'es'

    const result = getPlanet(planet, language)

    const originalData = planets[planet]
    const expected: Planet = {} as Planet

    for (const [key, value] of Object.entries(originalData)) {
      const translated =
        dictionaries[language as Language][value as keyof Dictionary] || value
      expected[key as keyof Planet] = translated
    }

    expect(result).toEqual(expected)
  })

  it('should handle unknown planet gracefully', () => {
    const planetKey = 'unknown'

    const result = getPlanet(planetKey as Planets)

    expect(result).toBeNull()
  })
})
