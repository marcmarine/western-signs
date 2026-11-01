import { afterEach, describe, expect, it } from 'bun:test'
import type { Aspects } from '@/index'
import { ASPECTS, i18n, PLANETS, SIGNS, zodiac } from '@/index'
import { CARDINAL_POINTS } from './fixtures'
import '@/locale/es'
import '@/locale/ca'

describe('zodiac', () => {
  afterEach(() => {
    i18n.setLanguage('en')
  })

  describe('zodiac.signs', () => {
    it('should get a sign in the default language (en)', () => {
      const result = zodiac.signs.get('taurus')

      expect(result?.name).toBe('Taurus')
      expect(result?.glyph).toBe('♉')
    })

    it('should accept SIGNS constant', () => {
      const result = zodiac.signs.get(SIGNS.TAURUS)

      expect(result?.name).toBe('Taurus')
    })

    it('should return all signs', () => {
      expect(zodiac.signs.all()).toHaveLength(12)
    })
  })

  describe('zodiac.planets', () => {
    it('should get a planet', () => {
      const result = zodiac.planets.get(PLANETS.VENUS)

      expect(result?.name).toBe('Venus')
    })

    it('should return all planets', () => {
      expect(zodiac.planets.all().length).toBeGreaterThan(0)
    })
  })

  describe('zodiac.houses', () => {
    it('should return all houses', () => {
      expect(zodiac.houses.all()).toHaveLength(12)
    })

    it('should get a house by number', () => {
      const result = zodiac.houses.get(7)

      expect(result?.number).toBe(7)
      expect(result?.sign).toBe('Libra')
    })

    it.each([0, 13, 1.5])('should return null for house %d', number => {
      expect(zodiac.houses.get(number)).toBeNull()
    })

    it('should translate a house', () => {
      expect(zodiac.locale('es').houses.get(1)?.name).toBe('Primera Casa')
    })
  })

  describe('zodiac.aspects', () => {
    it('should get an aspect', () => {
      const result = zodiac.aspects.get(ASPECTS.TRINE)

      expect(result).toMatchObject({ name: 'Trine', angle: 120 })
    })

    it('should return null for an unknown aspect', () => {
      expect(zodiac.aspects.get('unknown' as Aspects)).toBeNull()
    })

    it('should return all aspects ordered by angle', () => {
      const angles = zodiac.aspects.all().map(aspect => aspect.angle)

      expect(angles).toEqual([0, 30, 45, 60, 72, 90, 120, 135, 144, 150, 180])
    })

    it('should translate an aspect', () => {
      expect(zodiac.locale('es').aspects.get(ASPECTS.SQUARE)?.name).toBe(
        'Cuadratura'
      )
    })
  })

  describe('zodiac.at()', () => {
    it('should get the sun sign for a date', () => {
      const result = zodiac.at({ date: new Date(2024, 4, 5) }).sun.sign()

      expect(result?.name).toBe('Taurus')
    })

    it.each([
      [1452, 3, 15, 'Aries'],
      [1987, 3, 20, 'Aries'],
      [1616, 3, 23, 'Taurus'],
      [1813, 4, 5, 'Taurus'],
      [1875, 5, 6, 'Gemini'],
      [1883, 6, 3, 'Cancer'],
      [2023, 6, 24, 'Leo'],
      [1994, 7, 23, 'Virgo'],
      [1992, 8, 25, 'Libra'],
      [1821, 10, 11, 'Scorpio'],
      [1947, 11, 21, 'Sagittarius'],
      [1929, 0, 15, 'Capricorn'],
      [1882, 0, 25, 'Aquarius'],
      [1788, 1, 22, 'Pisces']
    ])('should get the sun sign on %i-%i-%i', (year, month, day, expected) => {
      const date = new Date(Date.UTC(year, month, day, 12))

      expect(zodiac.at({ date }).sun.sign().name).toBe(expected)
    })

    // The sign that starts at each cardinal point and the one before it
    const SIGNS_AT_CARDINAL_POINTS = {
      0: ['Pisces', 'Aries'],
      90: ['Gemini', 'Cancer'],
      180: ['Virgo', 'Libra'],
      270: ['Sagittarius', 'Capricorn']
    } as const
    const HOUR = 60 * 60 * 1000

    it.each(CARDINAL_POINTS)(
      'should change sign around %s',
      (date, longitude) => {
        const instant = new Date(date).getTime()
        const [before, after] = SIGNS_AT_CARDINAL_POINTS[longitude]

        expect(
          zodiac.at({ date: new Date(instant - HOUR) }).sun.sign().name
        ).toBe(before)
        expect(
          zodiac.at({ date: new Date(instant + HOUR) }).sun.sign().name
        ).toBe(after)
      }
    )

    it('should get the sun longitude', () => {
      const { sun } = zodiac.at({ date: new Date('2024-05-05T12:00:00Z') })

      expect(sun.longitude()).toBeCloseTo(45.48, 2)
    })

    it('should get the sun degree within its sign', () => {
      const { sun } = zodiac.at({ date: new Date('2024-05-05T12:00:00Z') })

      expect(sun.degree()).toBeCloseTo(15.48, 2)
      expect(sun.degree()).toBeCloseTo(sun.longitude() - 30, 10)
    })

    it('should return a sign for every day of the year', () => {
      for (let day = 0; day < 366; day++) {
        const date = new Date(Date.UTC(2024, 0, 1 + day))

        expect(zodiac.at({ date }).sun.sign()).toBeObject()
      }
    })

    it('should return the sign whose longitude range holds the sun', () => {
      for (let day = 0; day < 366; day += 7) {
        const { sun } = zodiac.at({
          date: new Date(Date.UTC(2024, 0, 1 + day))
        })
        const { longitude } = sun.sign()

        expect(sun.longitude()).toBeGreaterThanOrEqual(longitude.start)
        expect(sun.longitude()).toBeLessThan(longitude.end)
      }
    })

    it('should throw for an invalid date', () => {
      const sun = zodiac.at({ date: new Date('not a date') }).sun

      expect(() => sun.sign()).toThrow('Invalid date')
      expect(() => sun.longitude()).toThrow('Invalid date')
      expect(() => sun.degree()).toThrow('Invalid date')
    })

    it('should translate the sun sign', () => {
      const result = zodiac
        .locale('es')
        .at({ date: new Date(2024, 4, 5) })
        .sun.sign()

      expect(result?.name).toBe('Tauro')
    })

    it('should follow i18n.setLanguage() at call time', () => {
      const sun = zodiac.at({ date: new Date(2024, 4, 5) }).sun
      i18n.setLanguage('es')

      expect(sun.sign().name).toBe('Tauro')
    })

    it('should throw for a local date without a time zone', () => {
      expect(() =>
        zodiac.at({ date: '2024-05-05' as unknown as Date }).sun.sign()
      ).toThrow('Invalid date')
    })

    describe('with a local date and time zone', () => {
      // The March equinox of 2024 was at 03:06 UTC
      it.each([
        ['Europe/Madrid', 'Pisces'],
        ['America/Mexico_City', 'Aries']
      ])(
        'should read the same local time in %s as %s',
        (timeZone, expected) => {
          const sun = zodiac.at({ date: '2024-03-20T04:00', timeZone }).sun

          expect(sun.sign().name).toBe(expected)
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

        expect(local.longitude()).toBe(instant.longitude())
        expect(local.degree()).toBe(instant.degree())
        expect(local.sign()).toEqual(instant.sign())
      })

      it('should use noon when there is no time', () => {
        const sun = zodiac.at({
          date: '2024-03-20',
          timeZone: 'Europe/Madrid'
        }).sun

        expect(sun.longitude()).toBe(
          zodiac.at({ date: new Date('2024-03-20T11:00:00Z') }).sun.longitude()
        )
      })

      it('should throw for an invalid date or time zone', () => {
        const badDate = zodiac.at({ date: '2024-02-30', timeZone: 'UTC' }).sun
        const badTimeZone = zodiac.at({
          date: '2024-03-20',
          timeZone: 'Mars/Olympus'
        }).sun

        expect(() => badDate.sign()).toThrow('Invalid date')
        expect(() => badTimeZone.sign()).toThrow('Invalid time zone')
      })
    })
  })

  describe('zodiac.locale()', () => {
    it('should translate signs', () => {
      const result = zodiac.locale('es').signs.get('taurus')

      expect(result?.name).toBe('Tauro')
    })

    it('should be chainable', () => {
      const result = zodiac.locale('es').locale('ca').signs.get('taurus')

      expect(result?.name).toBe('Taure')
    })

    it('should take precedence over the global language', () => {
      i18n.setLanguage('es')

      expect(zodiac.locale('en').signs.get('taurus')?.name).toBe('Taurus')
    })
  })

  describe('global language', () => {
    it('should follow i18n.setLanguage() at call time', () => {
      i18n.setLanguage('es')

      expect(zodiac.signs.get('taurus')?.name).toBe('Tauro')
    })
  })
})
