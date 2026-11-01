import { describe, expect, it } from 'bun:test'
import { dictionaries } from '@/data/dictionaries'
import signs from '@/data/signs'
import type { Dictionary, Language } from '@/definitions'
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

  describe('keywords', () => {
    it('should return keywords as a list', () => {
      const [house] = zodiac.houses.all()

      expect(house.keywords).toEqual([
        'Self-image',
        'Identity',
        'Impressions on others',
        'Personality'
      ])
    })

    it('should translate each keyword', () => {
      const [house] = zodiac.locale('es').houses.all()

      expect(house.keywords).toEqual([
        'Autoimagen',
        'Identidad',
        'Impresiones en los demás',
        'Personalidad'
      ])
    })

    it.each(['en', 'es', 'ca'] as const)(
      'should not have surrounding spaces in %s keywords',
      language => {
        for (const house of zodiac.locale(language).houses.all()) {
          for (const keyword of house.keywords) {
            expect(keyword).toBe(keyword.trim())
          }
        }
      }
    )
  })

  describe('translations', () => {
    for (const language of [...dictionaries.keys()] as Language[]) {
      it(`should return houses with correct translated titles for language: ${language}`, () => {
        const result = zodiac.locale(language).houses.all()
        const dict = dictionaries.get(language) as Dictionary

        result.forEach((house, index) => {
          const expectedTitleKey = `houseTitle${index + 1}`
          const expectedTitle = dict[expectedTitleKey as keyof typeof dict]

          expect(house).toHaveProperty('title')
          expect(house.title).toBe(expectedTitle)
        })
      })
    }
  })
})
