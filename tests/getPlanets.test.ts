import { describe, expect, it } from 'bun:test'
import planets from '@/data/planets'
import type { Planets } from '@/src/definitions'
import { getPlanets } from '@/src/index'

describe('getPlanets', () => {
  it('should return an array of planets in the same order', () => {
    const planetNames = Object.keys(planets)

    const result = getPlanets()

    expect(result).toBeArrayOfSize(10)

    planetNames.forEach((name, index) => {
      const expectedName = new RegExp(planets[name as Planets].name, 'i')
      expect(result[index].name).toMatch(expectedName)
    })
  })
})
