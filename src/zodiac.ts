import signs from './data/signs'
import type { Language, Planets, Sign, Signs } from './definitions'
import { getHouses } from './getHouses'
import { getPlanet } from './getPlanet'
import { getPlanets } from './getPlanets'
import { getSign } from './getSign'
import { getSigns } from './getSigns'
import { getLanguage } from './i18n'
import { sunLongitude } from './sun'
import { fromLocal } from './time'
import { translate } from './utils'

type AtOptions =
  /** An instant. */
  | { date: Date }
  /** A local date and time in the given time zone. */
  | { date: string; timeZone: string }

function createZodiac(resolveLanguage: () => Language) {
  return {
    /**
     * Return a copy of the API fixed to the given language, ignoring `i18n.setLanguage()`.
     *
     * @param language - The language code used for translations.
     */
    locale: (language: Language) => createZodiac(() => language),
    /** Zodiac signs with their translated properties. */
    signs: {
      /**
       * Get a single sign by name.
       *
       * @param name - The name of the sign, e.g. `'taurus'`.
       * @returns The sign, or `null` if not found.
       */
      get: (name: Signs) => getSign(name, resolveLanguage()),
      /** Get all twelve signs. */
      all: () => getSigns(resolveLanguage())
    },
    /** Planets with their translated properties. */
    planets: {
      /**
       * Get a single planet by name.
       *
       * @param name - The name of the planet, e.g. `'venus'`.
       * @returns The planet, or `null` if not found.
       */
      get: (name: Planets) => getPlanet(name, resolveLanguage()),
      /** Get all planets. */
      all: () => getPlanets(resolveLanguage())
    },
    /** Astrological houses with their translated properties. */
    houses: {
      /** Get all twelve houses. */
      all: () => getHouses(resolveLanguage())
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
     * zodiac.at({ date: '1990-03-20T05:00', timeZone: 'Europe/Madrid' }).sun.sign().name
     * // Output: 'Pisces'
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
            const sign = Object.values(signs).find(
              ({ longitude }) =>
                degrees >= longitude.start && degrees < longitude.end
            ) as Sign

            return translate(sign, resolveLanguage())
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
}

export type Zodiac = ReturnType<typeof createZodiac>

/**
 * Entry point grouping signs, planets and houses under a single API.
 * Uses the language set with `i18n.setLanguage()` unless one is fixed with `locale()`.
 *
 * @namespace
 *
 * @example
 * import { zodiac } from 'western-signs';
 * import 'western-signs/locale/es';
 *
 * zodiac.signs.get('taurus')?.name
 * // Output: 'Taurus'
 *
 * zodiac.locale('es').signs.get('taurus')?.name
 * // Output: 'Tauro'
 *
 * zodiac.at({ date: new Date(2024, 4, 5) }).sun.sign().name
 * // Output: 'Taurus'
 */
export const zodiac: Zodiac = createZodiac(getLanguage)
