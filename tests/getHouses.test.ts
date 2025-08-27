import { describe, expect, it } from 'bun:test'
import { dictionaries } from '@/data/dictionaries'
import signs from '@/data/signs'
import { getHouses } from '@/src/index'

describe('getHouses', () => {
  it('should return an array of 12 houses', () => {
    const result = getHouses()
    expect(result).toBeArrayOfSize(12)
  })

  it('should have houses with the correct signs in order', () => {
    const signNames = Object.keys(signs)
    const result = getHouses()

    result.forEach((house, index) => {
      const expectedSign = signNames[index]
      expect(house).toHaveProperty('sign')
      expect(house.sign).toMatch(new RegExp(expectedSign, 'i'))
    })
  })

  describe('translations', () => {
    for (const language of Object.keys(
      dictionaries,
    ) as (keyof typeof dictionaries)[]) {
      it(`should return houses with correct translated titles for language: ${language}`, () => {
        const result = getHouses(language)
        const dict = dictionaries[language]

        result.forEach((house, index) => {
          const expectedTitleKey = `houseTitle${index + 1}`
          const expectedTitle = dict[
            expectedTitleKey as keyof typeof dict
          ] as string

          expect(house).toHaveProperty('title')
          expect(house.title).toBe(expectedTitle)
        })
      })
    }
  })
})
