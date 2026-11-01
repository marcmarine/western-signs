import { describe, expect, it } from 'bun:test'
import { i18n, PLANETS, SIGNS, zodiac } from '@/index'
import '@/locale/es'

describe('zodiac.dignities()', () => {
  it.each([
    [PLANETS.MARS, SIGNS.ARIES, ['domicile']],
    [PLANETS.MARS, SIGNS.CAPRICORN, ['exaltation']],
    [PLANETS.MARS, SIGNS.LIBRA, ['detriment']],
    [PLANETS.MARS, SIGNS.CANCER, ['fall']],
    [PLANETS.MARS, SIGNS.GEMINI, []]
  ] as const)('%s in %s should be %p', (planet, sign, expected) => {
    expect(zodiac.dignities(planet, sign)).toEqual([...expected])
  })

  it('should give Mercury more than one dignity in Virgo and in Pisces', () => {
    expect(zodiac.dignities(PLANETS.MERCURY, SIGNS.VIRGO)).toEqual([
      'domicile',
      'exaltation'
    ])
    expect(zodiac.dignities(PLANETS.MERCURY, SIGNS.PISCES)).toEqual([
      'detriment',
      'fall'
    ])
  })

  describe('rulers', () => {
    it('should use the modern rulers by default', () => {
      expect(zodiac.dignities(PLANETS.MARS, SIGNS.SCORPIO)).toEqual([])
      expect(zodiac.dignities(PLANETS.PLUTO, SIGNS.SCORPIO)).toEqual([
        'domicile'
      ])
    })

    it('should use the traditional rulers when asked', () => {
      const traditional = { rulers: 'traditional' } as const

      expect(
        zodiac.dignities(PLANETS.MARS, SIGNS.SCORPIO, traditional)
      ).toEqual(['domicile'])
      expect(zodiac.dignities(PLANETS.MARS, SIGNS.TAURUS, traditional)).toEqual(
        ['detriment']
      )
      expect(
        zodiac.dignities(PLANETS.PLUTO, SIGNS.SCORPIO, traditional)
      ).toEqual([])
    })

    it('should not change the exaltation and fall', () => {
      const traditional = { rulers: 'traditional' } as const

      expect(
        zodiac.dignities(PLANETS.SATURN, SIGNS.LIBRA, traditional)
      ).toEqual(['exaltation'])
    })
  })

  it('should agree with each planet’s dignities for every sign', () => {
    for (const planet of zodiac.planets.all()) {
      for (const sign of zodiac.signs.all()) {
        const result = zodiac.dignities(planet.id, sign.id)
        const { domicile, exaltation, detriment, fall } = planet.dignities

        expect(result.includes('domicile')).toBe(
          domicile.modern.includes(sign.id)
        )
        expect(result.includes('exaltation')).toBe(exaltation === sign.id)
        expect(result.includes('detriment')).toBe(
          detriment.modern.includes(sign.id)
        )
        expect(result.includes('fall')).toBe(fall === sign.id)
      }
    }
  })

  it('should give dignities that can be translated with i18n.t()', () => {
    const [dignity] = zodiac.dignities(PLANETS.MARS, SIGNS.CAPRICORN)

    expect(i18n.t(dignity, 'es')).toBe('Exaltación')
  })
})
