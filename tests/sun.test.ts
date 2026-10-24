import { describe, expect, it } from 'bun:test'
import { sunLongitude } from '@/sun'
import { CARDINAL_POINTS } from './fixtures'

// Signed difference between two angles, in the range (-180, 180]
const angularDistance = (a: number, b: number) =>
  ((((a - b) % 360) + 540) % 360) - 180

describe('sunLongitude', () => {
  it('should match the worked example from Meeus (25.a)', () => {
    const longitude = sunLongitude(new Date(Date.UTC(1992, 9, 13)))

    expect(longitude).toBeCloseTo(199.90895, 4)
  })

  it.each(CARDINAL_POINTS)(
    'should be at the cardinal point on %s (%i°)',
    (date, expected) => {
      const longitude = sunLongitude(new Date(date))

      expect(Math.abs(angularDistance(longitude, expected))).toBeLessThan(0.02)
    }
  )

  it('should stay in the range [0, 360)', () => {
    for (let day = 0; day < 366; day++) {
      const longitude = sunLongitude(new Date(Date.UTC(2024, 0, 1 + day)))

      expect(longitude).toBeGreaterThanOrEqual(0)
      expect(longitude).toBeLessThan(360)
    }
  })

  it('should throw for an invalid date', () => {
    expect(() => sunLongitude(new Date('not a date'))).toThrow('Invalid date')
  })

  it('should throw for a non-Date value', () => {
    expect(() => sunLongitude('2024-05-05' as unknown as Date)).toThrow(
      'Invalid date'
    )
  })
})
