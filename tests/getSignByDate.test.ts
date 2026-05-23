import { describe, expect, it } from 'bun:test'
import type { Sign } from '@/definitions'
import { getSignByDate } from '@/index'

describe('getSignByDate', () => {
  const testCases = [
    [new Date(1452, 3, 15).toDateString(), 'Aries'],
    [new Date(1452, 3, 15).toDateString(), 'Aries'],
    [new Date(1987, 3, 20).toDateString(), 'Aries'],
    [new Date(1616, 3, 23).toDateString(), 'Taurus'],
    [new Date(1813, 4, 5).toDateString(), 'Taurus'],
    [new Date(1875, 5, 6).toDateString(), 'Gemini'],
    [new Date(1883, 6, 3).toDateString(), 'Cancer'],
    [new Date(2023, 6, 24).toDateString(), 'Leo'],
    [new Date(1994, 7, 23).toDateString(), 'Virgo'],
    [new Date(1992, 8, 25).toDateString(), 'Libra'],
    [new Date(1821, 10, 11).toDateString(), 'Scorpio'],
    [new Date(1947, 11, 21).toDateString(), 'Sagittarius'],
    [new Date(1929, 0, 15).toDateString(), 'Capricorn'],
    [new Date(1882, 0, 25).toDateString(), 'Aquarius'],
    [new Date(1788, 1, 22).toDateString(), 'Pisces'],
  ]

  it.each(testCases)(
    'returns correct zodiac signs for date: %s',
    (date, expected) => {
      const sign = getSignByDate(new Date(date))

      expect((sign as Sign).name).toBe(expected)
    },
  )

  it('returns correct zodiac signs translation', () => {
    const sign = getSignByDate(new Date(2000, 1, 3), 'es')

    expect((sign as Sign).name).toBe('Acuario')
  })

  it('throws an error for invalid date input', () => {
    // @ts-ignore
    expect(() => getSignByDate('not a date')).toThrow()
  })
})
