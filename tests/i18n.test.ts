import { beforeEach, describe, expect, it } from 'bun:test'
import { i18n } from '@/src/index'

const { t, setLanguage } = i18n

describe('Translate function with dynamic language', () => {
  const defaultLanguage = 'en'

  beforeEach(() => {
    setLanguage(defaultLanguage)
  })

  it('should translate template literal strings using the default language', () => {
    const result = t`${'capricorn'}`

    expect(result).toBe('Capricorn')
  })

  it('should translate template literal strings correctly in Spanish', () => {
    setLanguage('es')
    const result = t`${'taurus'}`

    expect(result).toBe('Tauro')
  })

  it('should translate template literal strings correctly in Catalan', () => {
    setLanguage('ca')
    const result = t`${'pisces'}`

    expect(result).toBe('Peixos')
  })

  it('should return the original string if no translation is found', () => {
    setLanguage('en')
    const result = t`${'unknown'}`
    expect(result).toBe('unknown')
  })
})
