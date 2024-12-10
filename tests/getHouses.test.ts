import { getHouses } from '@/src/index'
import { expect, it, describe } from 'bun:test'
import signs from '@/data/signs'

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
})
