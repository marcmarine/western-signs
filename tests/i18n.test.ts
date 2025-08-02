import { beforeEach, describe, expect, it, mock } from 'bun:test'
import { i18n } from '@/src/index'

const { t, setLanguage } = i18n

describe('Translate function with dynamic language', () => {
  const defaultLanguage = 'en'

  mock.module('@/data/dictionaries', () => ({
    dictionaries: {
      en: {
        hello: 'hello',
        world: 'world',
      },
      es: {
        hello: 'hola',
        world: 'mundo',
      },
      ca: {
        hello: 'hola',
        world: 'mòn',
      },
    },
  }))

  beforeEach(() => {
    setLanguage(defaultLanguage)
  })

  it('should translate template literal strings using the default language', () => {
    const result = t`${'hello'} ${'world'}`
    expect(result).toBe('hello world')
  })

  it('should translate template literal strings correctly in Spanish', () => {
    setLanguage('es')
    const result = t`${'hello'} ${'world'}`
    expect(result).toBe('hola mundo')
  })

  it('should translate template literal strings correctly in Catalan', () => {
    setLanguage('ca')
    const result = t`${'hello'} ${'world'}`
    expect(result).toBe('hola mòn')
  })

  it('should return the original string if no translation is found', () => {
    setLanguage('en')
    const result = t`${'unknown'}`
    expect(result).toBe('unknown')
  })
})
