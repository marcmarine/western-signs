import { describe, expect, it } from 'bun:test'
import { dictionaries } from '@/data/dictionaries'
import signs from '@/data/signs'
import type { Dictionary, Language } from '@/definitions'
import { getHouses } from '@/index'
import '@/locale/es'
import '@/locale/ca'

describe('getHouses', () => {
  it('should return an array of 12 houses', () => {
    const result = getHouses()
    expect(result).toBeArrayOfSize(12)
  })

  const housesWithSign = Object.keys(signs).map(
    (sign, index): [number, string] => [index + 1, sign],
  )

  it.each(housesWithSign)(
    'house %i should have sign matching "%s"',
    (number, expectedSign) => {
      const result = getHouses()
      const house = result[number - 1]

      expect(house).toHaveProperty('sign')
      expect(house.sign).toMatch(new RegExp(expectedSign, 'i'))
    },
  )

  describe('traditionalRuler', () => {
    it.each([
      [8, 'Pluto', 'Mars'],
      [11, 'Uranus', 'Saturn'],
      [12, 'Neptune', 'Jupiter']
    ])(
      'house %i should be ruled by %s, traditionally by %s',
      (number, rulingPlanet, traditionalRuler) => {
        const house = getHouses()[number - 1]

        expect(house.rulingPlanet).toBe(rulingPlanet)
        expect(house.traditionalRuler).toBe(traditionalRuler)
      }
    )

    it('should match rulingPlanet in every other house', () => {
      for (const house of getHouses()) {
        if ([8, 11, 12].includes(house.number)) continue

        expect(house.traditionalRuler).toBe(house.rulingPlanet)
      }
    })

    it('should be translated', () => {
      expect(getHouses('es')[7].traditionalRuler).toBe('Marte')
    })
  })

  describe('keywords', () => {
    it('should return keywords as a list', () => {
      const [house] = getHouses()

      expect(house.keywords).toEqual([
        'Self-image',
        'Identity',
        'Impressions on others',
        'Personality'
      ])
    })

    it('should translate each keyword', () => {
      const [house] = getHouses('es')

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
        for (const house of getHouses(language)) {
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
        const result = getHouses(language)
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
