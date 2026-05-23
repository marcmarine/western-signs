import { describe, expect, it } from 'bun:test'
import { dictionaries } from '@/data/dictionaries'
import signs from '@/data/signs'
import { getHouses } from '@/index'

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

  describe('translations', () => {
    for (const language of Object.keys(
      dictionaries,
    ) as (keyof typeof dictionaries)[]) {
      it(`should return houses with correct translated titles for language: ${language}`, () => {
        const result = getHouses(language)
        const dict = dictionaries[language]

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
