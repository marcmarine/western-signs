import { describe, expect, it } from 'bun:test'
import type { HouseNumber } from '@/index'
import { i18n, SIGNS, zodiac } from '@/index'
import '@/locale/es'
import '@/locale/ca'

describe('zodiac.houses', () => {
  it('should return the twelve houses in order', () => {
    expect(zodiac.houses.all().map(house => house.number)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ])
  })

  it.each(Object.values(SIGNS).map((sign, index) => [index + 1, sign]))(
    'house %i should have %s as its sign',
    (number, sign) => {
      expect(zodiac.houses.get(number as HouseNumber).sign).toBe(sign as string)
    }
  )

  it('should take the element and rulers of its sign', () => {
    for (const house of zodiac.houses.all()) {
      const sign = zodiac.signs.get(house.sign)

      expect(house.element).toBe(sign?.element as string)
      expect(house.rulers).toEqual(sign?.rulers as object)
    }
  })

  it.each([
    [1, 'below', 'east', 1, 'angular'],
    [2, 'below', 'east', 1, 'succedent'],
    [3, 'below', 'east', 1, 'cadent'],
    [4, 'below', 'west', 2, 'angular'],
    [6, 'below', 'west', 2, 'cadent'],
    [7, 'above', 'west', 3, 'angular'],
    [9, 'above', 'west', 3, 'cadent'],
    [10, 'above', 'east', 4, 'angular'],
    [12, 'above', 'east', 4, 'cadent']
  ] as const)(
    'house %i should be %s the horizon, %s of the meridian, in quadrant %i, and %s',
    (number, horizon, meridian, quadrant, modality) => {
      expect(zodiac.houses.get(number)).toMatchObject({
        horizon,
        meridian,
        quadrant,
        modality
      })
    }
  )

  it('should have six houses on each side of the horizon and of the meridian', () => {
    const houses = zodiac.houses.all()
    const count = (key: 'horizon' | 'meridian', value: string) =>
      houses.filter(house => house[key] === value).length

    expect(count('horizon', 'above')).toBe(6)
    expect(count('horizon', 'below')).toBe(6)
    expect(count('meridian', 'east')).toBe(6)
    expect(count('meridian', 'west')).toBe(6)
  })

  describe('with i18n.label()', () => {
    it.each([
      ['en', 'First House'],
      ['es', 'Primera Casa'],
      ['ca', 'Primera Casa']
    ] as const)('should translate the name in "%s"', (language, expected) => {
      const house = zodiac.houses.get(1)

      expect(i18n.label(house, language).labels.name).toBe(expected)
    })

    it('should translate the rulers', () => {
      const house = zodiac.houses.get(8)

      expect(i18n.label(house, 'es').labels.rulers).toEqual({
        modern: 'Plutón',
        traditional: 'Marte'
      })
    })
  })
})
