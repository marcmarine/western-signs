import { describe, expect, it } from 'bun:test'
import signs from '@/data/signs'
import type { Dictionary, Signs } from '@/definitions'
import { i18n, SIGNS, zodiac } from '@/index'
import '@/locale/es'
import '@/locale/ca'

const languages = ['en', 'es', 'ca'] as const

describe('zodiac.signs', () => {
  it('should get a sign by name', () => {
    expect(zodiac.signs.get(SIGNS.TAURUS)).toMatchObject({
      name: 'Taurus',
      glyph: '♉',
      number: 2
    })
  })

  it('should return null for an unknown sign', () => {
    expect(zodiac.signs.get('unknown' as Signs)).toBeNull()
  })

  it('should return the twelve signs in order', () => {
    const result = zodiac.signs.all()

    expect(result.map(sign => sign.number)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
    ])
  })

  it.each([
    ['en', 'Taurus'],
    ['es', 'Tauro'],
    ['ca', 'Taure']
  ] as const)('should translate the name in "%s"', (lang, expectedName) => {
    expect(zodiac.locale(lang).signs.get(SIGNS.TAURUS)?.name).toBe(expectedName)
  })

  it.each(languages)(
    'should translate every property of every sign in "%s"',
    lang => {
      for (const [id, sign] of Object.entries(signs)) {
        const result = zodiac.locale(lang).signs.get(id as Signs)

        expect(result).toMatchObject({
          name: i18n.t(sign.name, lang),
          element: i18n.t(sign.element, lang),
          rulingPlanet: i18n.t(sign.rulingPlanet as keyof Dictionary, lang),
          glyph: sign.glyph,
          longitude: sign.longitude
        })
      }
    }
  )

  it.each([
    [SIGNS.SCORPIO, 'Pluto', 'Mars'],
    [SIGNS.AQUARIUS, 'Uranus', 'Saturn'],
    [SIGNS.PISCES, 'Neptune', 'Jupiter']
  ] as const)(
    '%s should be ruled by %s, traditionally by %s',
    (sign, rulingPlanet, traditionalRuler) => {
      const result = zodiac.signs.get(sign)

      expect(result?.rulingPlanet).toBe(rulingPlanet)
      expect(result?.traditionalRuler).toBe(traditionalRuler)
    }
  )

  it('should have traditionalRuler match rulingPlanet in every other sign', () => {
    const differing: Signs[] = [SIGNS.SCORPIO, SIGNS.AQUARIUS, SIGNS.PISCES]

    for (const sign of zodiac.signs.all()) {
      if (differing.includes(sign.name.toLowerCase() as Signs)) continue

      expect(sign.traditionalRuler).toBe(sign.rulingPlanet)
    }
  })

  it('should translate traditionalRuler', () => {
    expect(zodiac.locale('es').signs.get(SIGNS.SCORPIO)?.traditionalRuler).toBe(
      'Marte'
    )
  })
})
