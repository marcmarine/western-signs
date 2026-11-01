import { describe, expect, it } from 'bun:test'
import planets from '@/data/planets'
import type { Planets } from '@/definitions'
import { PLANETS, zodiac } from '@/index'
import '@/locale/es'

describe('zodiac.planets', () => {
  it('should get a planet by name', () => {
    expect(zodiac.planets.get(PLANETS.VENUS)).toMatchObject({
      name: 'Venus',
      glyph: '♀'
    })
  })

  it('should return null for an unknown planet', () => {
    expect(zodiac.planets.get('unknown' as Planets)).toBeNull()
  })

  it('should return every planet in order', () => {
    const result = zodiac.planets.all()

    expect(result).toHaveLength(Object.keys(planets).length)
    expect(result.map(planet => planet.glyph)).toEqual(
      Object.values(planets).map(planet => planet.glyph)
    )
  })

  it('should translate a planet', () => {
    expect(zodiac.locale('es').planets.get(PLANETS.SATURN)).toEqual({
      name: 'Saturno',
      glyph: '♄',
      type: 'Social'
    })
  })
})
