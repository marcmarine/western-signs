import { describe, expect, it } from 'bun:test'

import { SIGNS } from '@/data/constants'
import signs from '@/data/signs'
import type { Signs } from '@/definitions'

describe('Data', () => {
  it('should be return signs in the correct order', () => {
    Object.values(SIGNS).map((sign, index) => {
      expect(sign).toBe(Object.keys(signs)[index] as Signs)
    })
  })

  it('should cover the ecliptic with one 30° range per sign, in order', () => {
    Object.values(signs).forEach((sign, index) => {
      expect(sign.longitude).toEqual({
        start: index * 30,
        end: (index + 1) * 30
      })
      expect(sign.number).toBe(index + 1)
    })
  })
})
