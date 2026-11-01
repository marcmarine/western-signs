import { aspects } from './data/aspects'
import houses from './data/houses'
import planets from './data/planets'
import signs from './data/signs'
import type {
  Aspect,
  Aspects,
  House,
  Planet,
  Planets,
  Sign,
  Signs
} from './definitions'
import { sunLongitude } from './sun'
import { fromLocal } from './time'

type AtOptions =
  /** An instant. */
  | { date: Date }
  /** A local date and time in the given time zone. */
  | { date: string; timeZone: string }

// The data is returned as is, so freeze it to keep a change in one place from reaching every caller
function deepFreeze<T>(value: T): T {
  if (typeof value === 'object' && value !== null) {
    Object.values(value).forEach(deepFreeze)
    Object.freeze(value)
  }

  return value
}

deepFreeze([signs, planets, houses, aspects])

/**
 * Entry point grouping signs, planets, houses and aspects under a single API.
 *
 * Values are identifiers, the same in every language, e.g. `element: 'earth'`.
 * Use {@link i18n.label | `i18n.label()`} to translate an item, and copy it before changing it,
 * as the returned objects are frozen.
 *
 * @namespace
 *
 * @example
 * import { i18n, zodiac } from 'western-signs'
 * import 'western-signs/locale/es'
 *
 * zodiac.signs.get('taurus').element
 * // Output: 'earth'
 *
 * i18n.label(zodiac.signs.get('taurus'), 'es').name
 * // Output: 'Tauro'
 *
 * zodiac.at({ date: new Date(2024, 4, 5) }).sun.sign().id
 * // Output: 'taurus'
 */
export const zodiac = {
  /** The twelve zodiac signs. */
  signs: {
    /**
     * Get a single sign by identifier.
     *
     * @param id - The identifier of the sign, e.g. `'taurus'`.
     * @returns The sign. For an identifier that doesn't exist, e.g. from JavaScript without types, it returns `undefined`.
     */
    get: (id: Signs): Sign => signs[id],
    /** Get all twelve signs, from Aries to Pisces. */
    all: (): Sign[] => Object.values(signs)
  },
  /** The planets, including the Sun and the Moon. */
  planets: {
    /**
     * Get a single planet by identifier.
     *
     * @param id - The identifier of the planet, e.g. `'venus'`.
     * @returns The planet. For an identifier that doesn't exist, e.g. from JavaScript without types, it returns `undefined`.
     */
    get: (id: Planets): Planet => planets[id],
    /** Get all planets. */
    all: (): Planet[] => Object.values(planets)
  },
  /** The twelve astrological houses. */
  houses: {
    /**
     * Get a single house by number.
     *
     * @param number - The number of the house, from 1 to 12.
     * @returns The house, or `undefined` if there is no house with that number.
     */
    get: (number: number): House | undefined =>
      houses.find(house => house.number === number),
    /** Get all twelve houses. */
    all: (): House[] => [...houses]
  },
  /** The aspects, from conjunction to opposition. */
  aspects: {
    /**
     * Get a single aspect by identifier.
     *
     * @param id - The identifier of the aspect, e.g. `'trine'`.
     * @returns The aspect. For an identifier that doesn't exist, e.g. from JavaScript without types, it returns `undefined`.
     */
    get: (id: Aspects): Aspect =>
      aspects.find(aspect => aspect.id === id) as Aspect,
    /** Get all aspects, ordered by angle. */
    all: (): Aspect[] => [...aspects]
  },
  /**
   * Query the zodiac at a given moment.
   *
   * Pass either a `Date`, which is already an instant, or a local date and time with
   * the time zone of the place, e.g. where someone was born. The local form gives the
   * same result wherever the code runs; with a `Date`, `new Date(2024, 2, 20)` means
   * midnight in the time zone of the machine running the code.
   *
   * @param options - The moment to query.
   * @param options.date - A `Date`, or a local date as `YYYY-MM-DD` with an optional time, `THH:mm` or `THH:mm:ss`. Without a time, noon is used, which can give the wrong sign on the day the Sun changes sign.
   * @param options.timeZone - The IANA time zone of a local date, e.g. `'Europe/Madrid'`.
   * @returns An object whose `sun` gives the Sun's position at that instant.
   *
   * @example
   * zodiac.at({ date: '1990-03-20T05:00', timeZone: 'Europe/Madrid' }).sun.sign().id
   * // Output: 'pisces'
   */
  at: (options: AtOptions) => {
    const longitude = () =>
      sunLongitude(
        'timeZone' in options
          ? fromLocal(options.date, options.timeZone)
          : options.date
      )

    return {
      sun: {
        /**
         * Get the sign the Sun is in at the given instant.
         *
         * @throws {Error} If the date or the time zone is invalid.
         * @returns The sign.
         */
        sign: (): Sign => {
          const degrees = longitude()

          return Object.values(signs).find(
            ({ longitude }) =>
              degrees >= longitude.start && degrees < longitude.end
          ) as Sign
        },
        /**
         * Get the Sun's ecliptic longitude at the given instant.
         *
         * @throws {Error} If the date or the time zone is invalid.
         * @returns The longitude in degrees, from 0 (start of Aries) to 360.
         */
        longitude,
        /**
         * Get the Sun's degree within its sign at the given instant.
         *
         * @throws {Error} If the date or the time zone is invalid.
         * @returns The degree, from 0 to 30.
         */
        degree: () => longitude() % 30
      }
    }
  }
}

export type Zodiac = typeof zodiac
