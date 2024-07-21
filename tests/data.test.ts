import { expect, it, describe } from 'bun:test'

import { SIGNS } from '@/data/constants'
import signs from '@/data/signs'
import type { Signs } from '@/src/types'

describe('Data', () => {
  it('should be return signs in the correct order', () => {
    Object.values(SIGNS).map((sign, index) => {
      expect(sign).toBe(Object.keys(signs)[index] as Signs)
    })
  })
})
