import { describe, expect, it } from 'bun:test'
import type { Dictionary } from '@/definitions'
import { ASPECTS, i18n, SIGNS, zodiac } from '@/index'
import '@/locale/es'
import '@/locale/ca'

const { t } = i18n

describe('t', () => {
  it('should translate a key into English by default', () => {
    expect(t(SIGNS.CAPRICORN)).toBe('Capricorn')
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

  it('should return the key itself if no translation is found', () => {
    expect(t('unknown' as keyof Dictionary)).toBe('unknown')
  })
})

describe('label', () => {
  const taurus = zodiac.signs.get(SIGNS.TAURUS)

  it('should keep the id and add the translated name', () => {
    expect(i18n.label(taurus, 'es')).toMatchObject({
      id: 'taurus',
      name: 'Tauro',
      element: 'Tierra'
    })
  })

  it('should translate into English by default', () => {
    expect(i18n.label(taurus).name).toBe('Taurus')
  })

  it('should leave numbers and glyphs as they are', () => {
    expect(i18n.label(taurus, 'es')).toMatchObject({
      glyph: '♉',
      number: 2,
      longitude: { start: 30, end: 60 }
    })
  })

  it('should not change the item', () => {
    i18n.label(taurus, 'es')

    expect(taurus.element).toBe('earth')
  })
})

describe('locale', () => {
  it('should fix t and label to a language', () => {
    const es = i18n.locale('es')

    expect(es.t(SIGNS.TAURUS)).toBe('Tauro')
    expect(es.label(zodiac.signs.get(SIGNS.TAURUS)).name).toBe('Tauro')
  })

  it('should keep each locale to its own language', () => {
    const es = i18n.locale('es')
    const ca = i18n.locale('ca')

    expect(es.t(SIGNS.PISCES)).toBe('Piscis')
    expect(ca.t(SIGNS.PISCES)).toBe('Peixos')
  })
})

describe('label with lists', () => {
  it('should translate each value of a list and keep it a list', () => {
    const { dignities } = i18n.label(zodiac.planets.get('mars'), 'es')

    expect(dignities.domicile.traditional).toEqual(['Aries', 'Escorpio'])
  })
})
