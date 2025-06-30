import { describe, expect, it } from 'bun:test'
import signs from '@/data/signs'
import type { Signs } from '@/src/definitions'
import { getSigns } from '@/src/index'

describe('getSigns', () => {
  it('should return an array of signs with the same order', () => {
    const signNames = Object.keys(signs)

    const result = getSigns()

    expect(result).toBeArrayOfSize(12)
    signNames.forEach((name, index) => {
      const regexp = new RegExp(signs[name as Signs].name, 'i')
      expect(result[index].name).toMatch(regexp)
    })
  })
})
