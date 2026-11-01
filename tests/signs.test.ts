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

      expect(i18n.label(sign, lang).name).toBe(expectedName)
    })

    it('should translate every value, including the rulers', () => {
      const sign = zodiac.signs.get(SIGNS.SCORPIO)

      expect(i18n.label(sign, 'es')).toEqual({
        id: 'scorpio',
        name: 'Escorpio',
        bodyPart: 'Genitales',
        character: 'Escorpión',
        element: 'Agua',
        glyph: '♏',
        longitude: { start: 210, end: 240 },
        modality: 'Fijo',
        number: 8,
        polarity: 'Negativo',
        rulers: { modern: 'Plutón', traditional: 'Marte' },
        season: 'Otoño'
      })
    })
  })
})
