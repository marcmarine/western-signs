import { describe, expect, it } from 'bun:test'
import type { House } from '@/index'
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
      expect(zodiac.houses.get(number as number)?.sign).toBe(sign as string)
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
    [1, 'lower', 1, 'angular'],
    [2, 'lower', 1, 'succedent'],
    [3, 'lower', 1, 'cadent'],
    [6, 'lower', 2, 'cadent'],
    [7, 'upper', 3, 'angular'],
    [10, 'upper', 4, 'angular'],
    [12, 'upper', 4, 'cadent']
  ] as const)(
    'house %i should be in the %s hemisphere, quadrant %i, and %s',
    (number, hemisphere, quadrant, modality) => {
      expect(zodiac.houses.get(number)).toMatchObject({
        hemisphere,
        quadrant,
        modality
      })
    }
  )

  describe('with i18n.label()', () => {
    it.each([
      ['en', 'First House'],
      ['es', 'Primera Casa'],
      ['ca', 'Primera Casa']
    ] as const)('should translate the name in "%s"', (language, expected) => {
      const house = zodiac.houses.get(1) as House

      expect(i18n.label(house, language).name).toBe(expected)
    })

    it('should translate the rulers', () => {
      const house = zodiac.houses.get(8) as House

      expect(i18n.label(house, 'es').rulers).toEqual({
        modern: 'Plutón',
        traditional: 'Marte'
      })
    })
  })
})
