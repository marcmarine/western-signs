import { afterEach, describe, expect, it } from 'bun:test'
import { i18n, PLANETS, SIGNS, zodiac } from '@/index'
import '@/locale/es'
import '@/locale/ca'

describe('zodiac', () => {
  afterEach(() => {
    i18n.setLanguage('en')
  })

  describe('zodiac.signs', () => {
    it('should get a sign in the default language (en)', () => {
      const result = zodiac.signs.get('taurus')

      expect(result?.name).toBe('Taurus')
      expect(result?.glyph).toBe('♉')
    })

    it('should accept SIGNS constant', () => {
      const result = zodiac.signs.get(SIGNS.TAURUS)

      expect(result?.name).toBe('Taurus')
    })

    it('should return all signs', () => {
      expect(zodiac.signs.all()).toHaveLength(12)
    })
  })

  describe('zodiac.planets', () => {
    it('should get a planet', () => {
      const result = zodiac.planets.get(PLANETS.VENUS)

      expect(result?.name).toBe('Venus')
    })

    it('should return all planets', () => {
      expect(zodiac.planets.all().length).toBeGreaterThan(0)
    })
  })

  describe('zodiac.houses', () => {
    it('should return all houses', () => {
      expect(zodiac.houses.all()).toHaveLength(12)
    })
  })

  describe('zodiac.locale()', () => {
    it('should translate signs', () => {
      const result = zodiac.locale('es').signs.get('taurus')

      expect(result?.name).toBe('Tauro')
    })

    it('should be chainable', () => {
      const result = zodiac.locale('es').locale('ca').signs.get('taurus')

      expect(result?.name).toBe('Taure')
    })

    it('should take precedence over the global language', () => {
      i18n.setLanguage('es')

      expect(zodiac.locale('en').signs.get('taurus')?.name).toBe('Taurus')
    })
  })

  describe('global language', () => {
    it('should follow i18n.setLanguage() at call time', () => {
      i18n.setLanguage('es')

      expect(zodiac.signs.get('taurus')?.name).toBe('Tauro')
    })
  })
})
