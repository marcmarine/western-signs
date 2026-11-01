import { describe, expect, it } from 'bun:test'
import type { PlanetId } from '@/definitions'
import { i18n, PLANETS, zodiac } from '@/index'
import '@/locale/es'

describe('zodiac.planets', () => {
  it('should get a planet by identifier', () => {
    expect(zodiac.planets.get(PLANETS.SATURN)).toEqual({
      id: 'saturn',
      glyph: '♄',
      type: 'social'
    })
  })

  it('should return undefined for an unknown planet', () => {
    expect(zodiac.planets.get('unknown' as PlanetId)).toBeUndefined()
  })

  it('should return every planet in order', () => {
    expect(zodiac.planets.all().map(planet => planet.id)).toEqual(
      Object.values(PLANETS)
    )
  })

  it('should translate a planet with i18n.label()', () => {
    const planet = zodiac.planets.get(PLANETS.SATURN)

    expect(i18n.label(planet, 'es')).toEqual({
      id: 'saturn',
      name: 'Saturno',
      glyph: '♄',
      type: 'Social'
    })
  })
})
