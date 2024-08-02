import signs from '@/data/signs'
import { getAllSigns } from '@/src/index'
import type { Signs } from '@/src/definitions'
import { expect, it, describe } from 'bun:test'

describe('getAllSigns', () => {
  it('should return an array of signs with the same order', () => {
    const signNames = Object.keys(signs)

    const result = getAllSigns()

    expect(result).toBeArrayOfSize(12)
    signNames.forEach((name, index) => {
      const regexp = new RegExp(signs[name as Signs].name, 'i')
      expect(result[index].name).toMatch(regexp)
    })
  })
})
