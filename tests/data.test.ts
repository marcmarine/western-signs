import { describe, expect, it } from 'bun:test'

import { aspects } from '@/data/aspects'
import { SIGNS } from '@/data/constants'
import signs from '@/data/signs'
import type { Signs } from '@/definitions'
import { createData, labels } from '../build-data'

describe('Data', () => {
  it('should be return signs in the correct order', () => {
    Object.values(SIGNS).map((sign, index) => {
      expect(sign).toBe(Object.keys(signs)[index] as Signs)
    })
  })

  it('should cover the ecliptic with one 30° range per sign, in order', () => {
    Object.values(signs).forEach((sign, index) => {
      expect(sign.longitude).toEqual({
        start: index * 30,
        end: (index + 1) * 30
      })
      expect(sign.number).toBe(index + 1)
    })
  })

  it('should order aspects by angle, each with its own glyph', () => {
    const angles = aspects.map(aspect => aspect.angle)

    expect(angles).toEqual([...angles].sort((a, b) => a - b))
    expect(new Set(aspects.map(aspect => aspect.glyph)).size).toBe(
      aspects.length
    )
  })

  it.each(aspects.map(aspect => [aspect.id, aspect] as const))(
    'should give %s the smallest harmonic that holds its angle',
    (_, { angle, harmonic }) => {
      const holds = (n: number) => (angle * n) % 360 === 0

      expect(holds(harmonic)).toBe(true)
      for (let n = 1; n < harmonic; n++) expect(holds(n)).toBe(false)
    }
  )
})

describe('data.json', () => {
  const data = createData()

  it('should survive a round trip through JSON', () => {
    expect(JSON.parse(JSON.stringify(data))).toEqual(data)
  })

  it('should leave the labels out of the data', () => {
    expect(data).not.toHaveProperty('labels')
  })

  it('should hold ids instead of translated values', () => {
    expect(data.signs[1]).toMatchObject({
      id: 'taurus',
      element: 'earth',
      modality: 'fixed',
      rulers: { modern: 'venus', traditional: 'venus' }
    })
  })

  it.each(['en', 'es', 'ca'] as const)(
    'should have a "%s" label for every id in signs, planets, houses and aspects',
    language => {
      const dictionary: Record<string, string> = labels[language]
      const items = [
        ...data.signs,
        ...data.planets,
        ...data.houses,
        ...data.aspects
      ]
      const ids = items.flatMap(item =>
        Object.entries(item)
          .filter(
            ([key, value]) => typeof value === 'string' && key !== 'glyph'
          )
          .map(([, value]) => value as string)
      )

      expect(ids.filter(id => !(id in dictionary))).toEqual([])
    }
  )
})
