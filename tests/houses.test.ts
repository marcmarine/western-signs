import { describe, expect, it } from 'bun:test'
import signs from '@/data/signs'
import { zodiac } from '@/index'
import '@/locale/es'
import '@/locale/ca'

describe('zodiac.houses', () => {
  it('should return an array of 12 houses', () => {
    const result = zodiac.houses.all()
    expect(result).toBeArrayOfSize(12)
  })

  const housesWithSign = Object.keys(signs).map(
    (sign, index): [number, string] => [index + 1, sign]
  )

  it.each(housesWithSign)(
    'house %i should have sign matching "%s"',
    (number, expectedSign) => {
      const result = zodiac.houses.all()
      const house = result[number - 1]

      expect(house).toHaveProperty('sign')
      expect(house.sign).toMatch(new RegExp(expectedSign, 'i'))
    }
  )

  describe('traditionalRuler', () => {
    it.each([
      [8, 'Pluto', 'Mars'],
      [11, 'Uranus', 'Saturn'],
      [12, 'Neptune', 'Jupiter']
    ])(
      'house %i should be ruled by %s, traditionally by %s',
      (number, rulingPlanet, traditionalRuler) => {
        const house = zodiac.houses.all()[number - 1]

        expect(house.rulingPlanet).toBe(rulingPlanet)
        expect(house.traditionalRuler).toBe(traditionalRuler)
      }
    )

    it('should match rulingPlanet in every other house', () => {
      for (const house of zodiac.houses.all()) {
        if ([8, 11, 12].includes(house.number)) continue

        expect(house.traditionalRuler).toBe(house.rulingPlanet)
      }
    })

    it('should be translated', () => {
      expect(zodiac.locale('es').houses.all()[7].traditionalRuler).toBe('Marte')
    })
  })

  it.each([
    [1, 'Lower', 1, 'Angular'],
    [2, 'Lower', 1, 'Succedent'],
    [3, 'Lower', 1, 'Cadent'],
    [6, 'Lower', 2, 'Cadent'],
    [7, 'Upper', 3, 'Angular'],
    [10, 'Upper', 4, 'Angular'],
    [12, 'Upper', 4, 'Cadent']
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

  it.each([
    ['en', 'First House'],
    ['es', 'Primera Casa'],
    ['ca', 'Primera Casa']
  ] as const)('should translate the name in "%s"', (language, expected) => {
    expect(zodiac.locale(language).houses.get(1)?.name).toBe(expected)
  })
})
