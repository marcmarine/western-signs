import { afterEach, describe, expect, it } from 'bun:test'
import { fromLocal } from '@/time'

describe('fromLocal', () => {
  const runtimeTimeZone = process.env.TZ

  afterEach(() => {
    process.env.TZ = runtimeTimeZone
  })

  it.each([
    ['1990-03-20T05:00', 'Europe/Madrid', '1990-03-20T04:00:00.000Z'],
    ['2024-07-01T12:00', 'Europe/Madrid', '2024-07-01T10:00:00.000Z'],
    ['2024-03-19T21:00', 'America/Mexico_City', '2024-03-20T03:00:00.000Z'],
    ['2024-01-01T00:00', 'Asia/Kolkata', '2023-12-31T18:30:00.000Z'],
    ['1940-01-01T00:00', 'Europe/Madrid', '1940-01-01T00:00:00.000Z'],
    ['2024-03-20T05:00:30', 'UTC', '2024-03-20T05:00:30.000Z'],
    ['0050-06-01T00:00', 'UTC', '0050-06-01T00:00:00.000Z']
  ])('should convert %s in %s', (date, timeZone, expected) => {
    expect(fromLocal(date, timeZone).toISOString()).toBe(expected)
  })

  it('should use noon when there is no time', () => {
    expect(fromLocal('2024-03-20', 'Europe/Madrid').toISOString()).toBe(
      '2024-03-20T11:00:00.000Z'
    )
  })

  it.each([
    ['2024-03-31T02:30', 'Europe/Madrid', '2024-03-31T01:30:00.000Z'],
    ['2024-03-10T02:30', 'America/New_York', '2024-03-10T07:30:00.000Z']
  ])(
    'should move a skipped time forward (%s in %s)',
    (date, timeZone, expected) => {
      expect(fromLocal(date, timeZone).toISOString()).toBe(expected)
    }
  )

  it.each([
    ['2024-10-27T02:30', 'Europe/Madrid', '2024-10-27T00:30:00.000Z'],
    ['2024-11-03T01:30', 'America/New_York', '2024-11-03T05:30:00.000Z']
  ])(
    'should take the first occurrence of a repeated time (%s in %s)',
    (date, timeZone, expected) => {
      expect(fromLocal(date, timeZone).toISOString()).toBe(expected)
    }
  )

  it('should not depend on the time zone of the runtime', () => {
    const results = ['UTC', 'Asia/Tokyo', 'America/Los_Angeles'].map(
      runtime => {
        process.env.TZ = runtime

        return fromLocal('1990-03-20T05:00', 'Europe/Madrid').toISOString()
      }
    )

    expect(new Set(results).size).toBe(1)
  })

  it.each([
    '2024-02-30',
    '2024-03-20T25:00',
    '2024-03-20T24:00',
    '2024-03-20T05:00Z',
    '2024-03-20T05:00+01:00',
    '20240320',
    ''
  ])('should throw for the invalid date "%s"', date => {
    expect(() => fromLocal(date, 'UTC')).toThrow('Invalid date')
  })

  it('should throw for a non-string date', () => {
    expect(() =>
      fromLocal(new Date() as unknown as string, 'Europe/Madrid')
    ).toThrow('Invalid date')
  })

  it('should throw for an invalid time zone', () => {
    expect(() => fromLocal('2024-03-20', 'Mars/Olympus')).toThrow(
      'Invalid time zone: Mars/Olympus'
    )
  })
})
