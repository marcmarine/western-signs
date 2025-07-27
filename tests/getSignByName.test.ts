import { describe, expect, it } from 'bun:test'
import type { Language, Sign, Signs } from '@/src/definitions'
import { getSignByName, SIGNS } from '@/src/index'
import {
  capitalizeString,
  getAllSignWithTranslations,
  getLanguageName,
} from '@/src/utils'

const signs = getAllSignWithTranslations()

const mappedSigns = Object.entries(signs).flatMap(([sign, data]) =>
  Object.entries(data).map(([lang, expectedData]) => [
    sign,
    lang,
    expectedData,
  ]),
)

describe('getSignByName', () => {
  it('should work by passing a constant', () => {
    const result = getSignByName(SIGNS.TAURUS)

    expect(result).toBeInstanceOf(Object)
  })
  it('should handle unknown sign gracefully', () => {
    const signName = 'unknown'

    const result = getSignByName(signName as Signs)

    expect(result).toBeNull()
  })

  describe.each(mappedSigns)('should return', (sign, lang, expectedData) => {
    it(`${capitalizeString(sign as Signs)} data in ${getLanguageName(lang as Language)} `, () => {
      const result = getSignByName(sign as Signs, lang as Language)
      expect(result).toEqual(expectedData as Sign)
    })
  })
})
