import { describe, expect, it } from 'bun:test'
import planets from '@/data/planets'
import { getPlanets } from '@/src/index'

describe('getPlanets', () => {
  it('should return an array of 10 planets', () => {
    const result = getPlanets()
    expect(result).toBeArrayOfSize(10)
  })

  it.each(Object.entries(planets))(
    'should return planet "%s" at correct position',
    (key, planet) => {
      const result = getPlanets()
      const index = Object.keys(planets).indexOf(key)
      const expectedName = new RegExp(planet.name, 'i')
      expect(result[index].name).toMatch(expectedName)
    },
  )
})
