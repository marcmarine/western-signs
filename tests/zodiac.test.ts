import { describe, expect, it } from 'bun:test'
import type { AspectId, HouseNumber } from '@/index'
import { ASPECTS, i18n, SIGNS, zodiac } from '@/index'
import { CARDINAL_POINTS } from './fixtures'
import '@/locale/es'

describe('zodiac', () => {
  it('should return frozen objects', () => {
    const sign = zodiac.signs.get(SIGNS.TAURUS)

    expect(Object.isFrozen(sign)).toBe(true)
    expect(Object.isFrozen(sign?.rulers)).toBe(true)
    expect(() => {
      ;(sign as { element: string }).element = 'fire'
    }).toThrow()
  })

  it('should not let a change to a list reach the next call', () => {
    zodiac.houses.all().pop()
    zodiac.aspects.all().pop()

    expect(zodiac.houses.all()).toHaveLength(12)
    expect(zodiac.aspects.all()).toHaveLength(11)
  })

  describe('zodiac.houses', () => {
    it('should get a house by number', () => {
      expect(zodiac.houses.get(7)).toMatchObject({
        id: 'house-7',
        number: 7,
        sign: 'libra'
      })
    })

    it.each([0, 13, 1.5])('should return undefined for house %d', number => {
      expect(zodiac.houses.get(number as HouseNumber)).toBeUndefined()
    })
  })

  describe('zodiac.aspects', () => {
    it('should get an aspect', () => {
      expect(zodiac.aspects.get(ASPECTS.TRINE)).toMatchObject({
        id: 'trine',
        angle: 120
      })
    })

    it('should return undefined for an unknown aspect', () => {
      expect(zodiac.aspects.get('unknown' as AspectId)).toBeUndefined()
    })

    it('should return all aspects ordered by angle', () => {
      const angles = zodiac.aspects.all().map(aspect => aspect.angle)

      expect(angles).toEqual([0, 30, 45, 60, 72, 90, 120, 135, 144, 150, 180])
    })
  })

  describe('zodiac.at()', () => {
    it('should get the sun sign for a date', () => {
      const result = zodiac.at({ date: new Date(2024, 4, 5) }).sun.sign

      expect(result.id).toBe('taurus')
    })

    it.each([
      [1452, 3, 15, 'aries'],
      [1987, 3, 20, 'aries'],
      [1616, 3, 23, 'taurus'],
      [1813, 4, 5, 'taurus'],
      [1875, 5, 6, 'gemini'],
      [1883, 6, 3, 'cancer'],
      [2023, 6, 24, 'leo'],
      [1994, 7, 23, 'virgo'],
      [1992, 8, 25, 'libra'],
      [1821, 10, 11, 'scorpio'],
      [1947, 11, 21, 'sagittarius'],
      [1929, 0, 15, 'capricorn'],
      [1882, 0, 25, 'aquarius'],
      [1788, 1, 22, 'pisces']
    ])('should get the sun sign on %i-%i-%i', (year, month, day, expected) => {
      const date = new Date(Date.UTC(year, month, day, 12))

      expect(zodiac.at({ date }).sun.sign.id).toBe(expected)
    })

    // The sign that starts at each cardinal point and the one before it
    const SIGNS_AT_CARDINAL_POINTS = {
      0: ['pisces', 'aries'],
      90: ['gemini', 'cancer'],
      180: ['virgo', 'libra'],
      270: ['sagittarius', 'capricorn']
    } as const
    const HOUR = 60 * 60 * 1000

    it.each(CARDINAL_POINTS)(
      'should change sign around %s',
      (date, longitude) => {
        const instant = new Date(date).getTime()
        const [before, after] = SIGNS_AT_CARDINAL_POINTS[longitude]

        expect(zodiac.at({ date: new Date(instant - HOUR) }).sun.sign.id).toBe(
          before
        )
        expect(zodiac.at({ date: new Date(instant + HOUR) }).sun.sign.id).toBe(
          after
        )
      }
    )

    it('should get the sun longitude', () => {
      const { sun } = zodiac.at({ date: new Date('2024-05-05T12:00:00Z') })

      expect(sun.longitude).toBeCloseTo(45.48, 2)
    })

    it('should get the sun degree within its sign', () => {
      const { sun } = zodiac.at({ date: new Date('2024-05-05T12:00:00Z') })

      expect(sun.degree).toBeCloseTo(15.48, 2)
      expect(sun.degree).toBeCloseTo(sun.longitude - 30, 10)
    })

    it('should return a sign for every day of the year', () => {
      for (let day = 0; day < 366; day++) {
        const date = new Date(Date.UTC(2024, 0, 1 + day))

        expect(zodiac.at({ date }).sun.sign).toBeObject()
      }
    })

    it('should return the sign whose longitude range holds the sun', () => {
      for (let day = 0; day < 366; day += 7) {
        const { sun } = zodiac.at({
          date: new Date(Date.UTC(2024, 0, 1 + day))
        })
        const { longitude } = sun.sign

        expect(sun.longitude).toBeGreaterThanOrEqual(longitude.start)
        expect(sun.longitude).toBeLessThan(longitude.end)
      }
    })

    it('should throw for an invalid date', () => {
      expect(() => zodiac.at({ date: new Date('not a date') })).toThrow(
        'Invalid date'
      )
    })

    it('should return a frozen position that survives a round trip through JSON', () => {
      const result = zodiac.at({ date: new Date('2024-05-05T12:00:00Z') })

      expect(Object.isFrozen(result.sun)).toBe(true)
      expect(JSON.parse(JSON.stringify(result))).toEqual(result)
    })

    it('should translate the sun sign with i18n.label()', () => {
      const sign = zodiac.at({ date: new Date(2024, 4, 5) }).sun.sign

      expect(i18n.label(sign, 'es').name).toBe('Tauro')
    })

    it('should throw for a local date without a time zone', () => {
      expect(() =>
        zodiac.at({ date: '2024-05-05' as unknown as Date })
      ).toThrow('Invalid date')
    })

    describe('with a local date and time zone', () => {
      // The March equinox of 2024 was at 03:06 UTC
      it.each([
        ['Europe/Madrid', 'pisces'],
        ['America/Mexico_City', 'aries']
      ])(
        'should read the same local time in %s as %s',
        (timeZone, expected) => {
          const sun = zodiac.at({ date: '2024-03-20T04:00', timeZone }).sun

          expect(sun.sign.id).toBe(expected)
        }
      )

      it('should match the instant it refers to', () => {
        const local = zodiac.at({
          date: '1990-03-20T05:00',
          timeZone: 'Europe/Madrid'
        }).sun
        const instant = zodiac.at({
          date: new Date('1990-03-20T04:00:00Z')
        }).sun

        expect(local.longitude).toBe(instant.longitude)
        expect(local.degree).toBe(instant.degree)
        expect(local.sign).toEqual(instant.sign)
      })

      it('should use noon when there is no time', () => {
        const sun = zodiac.at({
          date: '2024-03-20',
          timeZone: 'Europe/Madrid'
        }).sun

        expect(sun.longitude).toBe(
          zodiac.at({ date: new Date('2024-03-20T11:00:00Z') }).sun.longitude
        )
      })

      it('should throw for an invalid date or time zone', () => {
        expect(() =>
          zodiac.at({ date: '2024-02-30', timeZone: 'UTC' })
        ).toThrow('Invalid date')
        expect(() =>
          zodiac.at({ date: '2024-03-20', timeZone: 'Mars/Olympus' })
        ).toThrow('Invalid time zone')
      })
    })
  })
})
