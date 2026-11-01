import { beforeEach, describe, expect, it } from 'bun:test'
import type { Dictionary } from '@/definitions'
import { ASPECTS, i18n, SIGNS } from '@/index'
import '@/locale/es'
import '@/locale/ca'

const { t, setLanguage, getLanguage } = i18n

describe('Translate function', () => {
  const defaultLanguage = 'en'

  beforeEach(() => {
    setLanguage(defaultLanguage)
  })

  it('should translate a key using the default language', () => {
    expect(t(SIGNS.CAPRICORN)).toBe('Capricorn')
  })

  it('should translate a key into the current language', () => {
    setLanguage('es')

    expect(t(SIGNS.TAURUS)).toBe('Tauro')
  })

  it.each([
    ['en', 'Conjunction'],
    ['es', 'Conjunción'],
    ['ca', 'Conjunció']
  ] as const)(
    'should translate into the given language "%s"',
    (lang, expected) => {
      expect(t(ASPECTS.CONJUNCTION, lang)).toBe(expected)
    }
  )

  it('should take the given language over the current one', () => {
    setLanguage('es')

    expect(t(SIGNS.PISCES, 'ca')).toBe('Peixos')
  })

  it('should not change the current language', () => {
    t(SIGNS.PISCES, 'ca')

    expect(getLanguage()).toBe(defaultLanguage)
  })

  it('should return the key itself if no translation is found', () => {
    expect(t('unknown' as keyof Dictionary)).toBe('unknown')
  })
})
