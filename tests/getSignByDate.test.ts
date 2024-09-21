import type { Sign } from '@/src/definitions'
import { getSignByDate } from '@/src/index'
import { expect, it, describe } from 'bun:test'

describe('getSignByDate', () => {
  it('returns correct zodiac signs for various dates', () => {
    const testCases = [
      { date: new Date(1452, 3, 15), expected: 'Aries' },
      { date: new Date(1987, 3, 20), expected: 'Aries' },
      { date: new Date(1616, 3, 23), expected: 'Taurus' },
      { date: new Date(1813, 4, 5), expected: 'Taurus' },
      { date: new Date(1875, 5, 6), expected: 'Gemini' },
      { date: new Date(1883, 6, 3), expected: 'Cancer' },
      { date: new Date(2023, 6, 24), expected: 'Leo' },
      { date: new Date(1994, 7, 23), expected: 'Virgo' },
      { date: new Date(1992, 8, 25), expected: 'Libra' },
      { date: new Date(1821, 10, 11), expected: 'Scorpio' },
      { date: new Date(1947, 11, 21), expected: 'Sagittarius' },
      { date: new Date(1929, 0, 15), expected: 'Capricorn' },
      { date: new Date(1882, 0, 25), expected: 'Aquarius' },
      { date: new Date(1788, 1, 22), expected: 'Pisces' }
    ]

    testCases.forEach(({ date, expected }) => {
      const sign = getSignByDate(date)

      expect((sign as Sign).name).toBe(expected)
    })
  })

  it('returns correct zodiac signs translation', () => {
    const sign = getSignByDate(new Date(2000, 1, 3), 'es')

    expect((sign as Sign).name).toBe('Acuario')
  })

  it('throws an error for invalid date input', () => {
    // @ts-ignore
    expect(() => getSignByDate('not a date')).toThrow()
  })
})
