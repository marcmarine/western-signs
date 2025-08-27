import { describe, expect, it } from 'bun:test'
import signs from '@/data/signs'
import { getSigns } from '@/src/index'

describe('getSigns', () => {
  it('should return an array of 12 signs', () => {
    const result = getSigns()
    expect(result).toBeArrayOfSize(12)
  })

  it.each(Object.entries(signs))(
    'should return sign "%s" at correct position',
    (key, sign) => {
      const result = getSigns()
      const index = Object.keys(signs).indexOf(key)
      const regexp = new RegExp(sign.name, 'i')
      expect(result[index].name).toMatch(regexp)
    },
  )
})
