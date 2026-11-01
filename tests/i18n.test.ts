import { describe, expect, it } from 'bun:test'
import type { Dictionary } from '@/definitions'
import { ASPECTS, ELEMENTS, i18n, SIGNS, zodiac } from '@/index'
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

  it('should keep every field and add the translations as labels', () => {
    const result = i18n.label(taurus, 'es')

    expect(result).toMatchObject(taurus)
    expect(result.element).toBe(ELEMENTS.EARTH)
    expect(result.labels).toMatchObject({ name: 'Tauro', element: 'Tierra' })
  })

  it('should translate into English by default', () => {
    expect(i18n.label(taurus).labels.name).toBe('Taurus')
  })

  it('should leave numbers and glyphs out of the labels', () => {
    const { labels } = i18n.label(taurus, 'es')

    expect(labels).not.toHaveProperty('glyph')
    expect(labels).not.toHaveProperty('number')
    expect(labels).not.toHaveProperty('longitude')
  })

  it('should leave out of the labels a string that is not an identifier', () => {
    const item = { id: SIGNS.TAURUS, note: 'constructor' }

    expect(i18n.label(item, 'es').labels).toEqual({ name: 'Tauro' })
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
    expect(es.label(zodiac.signs.get(SIGNS.TAURUS)).labels.name).toBe('Tauro')
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
    const { dignities } = i18n.label(zodiac.planets.get('mars'), 'es').labels

    expect(dignities.domicile.traditional).toEqual(['Aries', 'Escorpio'])
  })
})
