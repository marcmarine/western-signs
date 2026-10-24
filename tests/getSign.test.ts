import { describe, expect, it } from 'bun:test'
import type { Language, Sign, Signs } from '@/definitions'
import { getSignByName, SIGNS } from '@/index'
import { getAllSignWithTranslations } from '@/utils'
import '@/locale/es'
import '@/locale/ca'

const signs = getAllSignWithTranslations()

const mappedSigns = Object.entries(signs).flatMap(([sign, data]) =>
  Object.entries(data).map(([lang, expectedData]) => [
    sign,
    lang,
    expectedData,
  ]),
)

describe('getSignByName', () => {
  it('should work by passing a constant', () => {
    const result = getSignByName(SIGNS.TAURUS)

    expect(result).toBeInstanceOf(Object)
  })
  it('should handle unknown sign gracefully', () => {
    const signName = 'unknown'

    const result = getSignByName(signName as Signs)

    expect(result).toBeNull()
  })

  it('should cover every registered language', () => {
    expect(new Set(mappedSigns.map(([, lang]) => lang))).toEqual(
      new Set(['en', 'es', 'ca'])
    )
  })

  it.each([
    ['en', 'Taurus'],
    ['es', 'Tauro'],
    ['ca', 'Taure']
  ] as const)('should translate the name in "%s"', (lang, expectedName) => {
    expect(getSignByName(SIGNS.TAURUS, lang)?.name).toBe(expectedName)
  })

  it.each([
    [SIGNS.SCORPIO, 'Pluto', 'Mars'],
    [SIGNS.AQUARIUS, 'Uranus', 'Saturn'],
    [SIGNS.PISCES, 'Neptune', 'Jupiter']
  ] as const)(
    '%s should be ruled by %s, traditionally by %s',
    (sign, rulingPlanet, traditionalRuler) => {
      const result = getSignByName(sign)

      expect(result?.rulingPlanet).toBe(rulingPlanet)
      expect(result?.traditionalRuler).toBe(traditionalRuler)
    }
  )

  it('should have traditionalRuler match rulingPlanet in every other sign', () => {
    const differing: Signs[] = [SIGNS.SCORPIO, SIGNS.AQUARIUS, SIGNS.PISCES]

    for (const sign of Object.values(SIGNS)) {
      if (differing.includes(sign)) continue

      const result = getSignByName(sign)
      expect(result?.traditionalRuler).toBe(result?.rulingPlanet as string)
    }
  })

  it('should translate traditionalRuler', () => {
    expect(getSignByName(SIGNS.SCORPIO, 'es')?.traditionalRuler).toBe('Marte')
  })

  it.each(mappedSigns)(
    'should return "%s" in "%s"',
    (sign, lang, expectedData) => {
      const result = getSignByName(sign as Signs, lang as Language)
      expect(result).toEqual(expectedData as Sign)
    },
  )
})
