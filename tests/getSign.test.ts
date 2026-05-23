import { describe, expect, it } from 'bun:test'
import type { Language, Sign, Signs } from '@/definitions'
import { getSignByName, SIGNS } from '@/index'
import { getAllSignWithTranslations } from '@/utils'

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

  it.each(mappedSigns)(
    'should return "%s" in "%s"',
    (sign, lang, expectedData) => {
      const result = getSignByName(sign as Signs, lang as Language)
      expect(result).toEqual(expectedData as Sign)
    },
  )
})
