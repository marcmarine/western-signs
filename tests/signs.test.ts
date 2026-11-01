import { describe, expect, it } from 'bun:test'
import type { SignId } from '@/definitions'
import { i18n, SIGNS, zodiac } from '@/index'
import '@/locale/es'
import '@/locale/ca'

describe('zodiac.signs', () => {
  it('should get a sign by identifier', () => {
    expect(zodiac.signs.get(SIGNS.TAURUS)).toEqual({
      id: 'taurus',
      bodyPart: 'throat',
      character: 'bull',
      element: 'earth',
      glyph: '♉',
      longitude: { start: 30, end: 60 },
      modality: 'fixed',
      number: 2,
      polarity: 'negative',
      rulers: { modern: 'venus', traditional: 'venus' },
      season: 'spring'
    })
  })

  it('should return undefined for an unknown sign', () => {
    expect(zodiac.signs.get('unknown' as SignId)).toBeUndefined()
  })

  it('should return the twelve signs in order', () => {
    expect(zodiac.signs.all().map(sign => sign.id)).toEqual(
      Object.values(SIGNS)
    )
  })

  it.each([
    [SIGNS.SCORPIO, 'pluto', 'mars'],
    [SIGNS.AQUARIUS, 'uranus', 'saturn'],
    [SIGNS.PISCES, 'neptune', 'jupiter']
  ] as const)(
    '%s should be ruled by %s, traditionally by %s',
    (sign, modern, traditional) => {
      expect(zodiac.signs.get(sign)?.rulers).toEqual({ modern, traditional })
    }
  )

  it('should have the same modern and traditional ruler in every other sign', () => {
    const differing: SignId[] = [SIGNS.SCORPIO, SIGNS.AQUARIUS, SIGNS.PISCES]

    for (const sign of zodiac.signs.all()) {
      if (differing.includes(sign.id)) continue

      expect(sign.rulers.traditional).toBe(sign.rulers.modern)
    }
  })

  describe('with i18n.label()', () => {
    it.each([
      ['en', 'Taurus'],
      ['es', 'Tauro'],
      ['ca', 'Taure']
    ] as const)('should translate the name in "%s"', (lang, expectedName) => {
      const sign = zodiac.signs.get(SIGNS.TAURUS)

      expect(i18n.label(sign, lang).labels.name).toBe(expectedName)
    })

    it('should keep the sign and add every translated value, including the rulers', () => {
      const sign = zodiac.signs.get(SIGNS.SCORPIO)

      expect(i18n.label(sign, 'es')).toEqual({
        ...sign,
        labels: {
          name: 'Escorpio',
          bodyPart: 'Genitales',
          character: 'Escorpión',
          element: 'Agua',
          modality: 'Fijo',
          polarity: 'Negativo',
          rulers: { modern: 'Plutón', traditional: 'Marte' },
          season: 'Otoño'
        }
      })
    })
  })

  describe('at() and degree()', () => {
    it.each([
      [0, 'aries', 0],
      [29.99, 'aries', 29.99],
      [30, 'taurus', 0],
      [45.48, 'taurus', 15.48],
      [359.9, 'pisces', 29.9]
    ] as const)(
      'should place %d° in %s at %d° of the sign',
      (longitude, sign, degree) => {
        expect(zodiac.signs.at(longitude).id).toBe(sign)
        expect(zodiac.signs.degree(longitude)).toBeCloseTo(degree, 10)
      }
    )

    it.each([
      [360, 'aries', 0],
      [370, 'aries', 10],
      [-10, 'pisces', 20],
      [-370, 'pisces', 20],
      [720 + 45, 'taurus', 15]
    ] as const)(
      'should turn %d° into the range of the zodiac',
      (longitude, sign, degree) => {
        expect(zodiac.signs.at(longitude).id).toBe(sign)
        expect(zodiac.signs.degree(longitude)).toBeCloseTo(degree, 10)
      }
    )

    it.each([Number.NaN, Number.POSITIVE_INFINITY])(
      'should throw for %d',
      longitude => {
        expect(() => zodiac.signs.at(longitude)).toThrow('Invalid longitude')
        expect(() => zodiac.signs.degree(longitude)).toThrow(
          'Invalid longitude'
        )
      }
    )

    it('should agree with the sun position', () => {
      const { sun } = zodiac.at({ date: new Date('2024-05-05T12:00:00Z') })

      expect(zodiac.signs.at(sun.longitude)).toBe(sun.sign)
      expect(zodiac.signs.degree(sun.longitude)).toBe(sun.degree)
    })
  })
})
