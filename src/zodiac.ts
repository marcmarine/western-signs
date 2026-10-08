import type { Language, Planets, Signs } from './definitions'
import { getHouses } from './getHouses'
import { getPlanet } from './getPlanet'
import { getPlanets } from './getPlanets'
import { getSign } from './getSign'
import { getSignByDate } from './getSignByDate'
import { getSigns } from './getSigns'
import { getLanguage } from './i18n'

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
     * @param options - The moment to query.
     * @param options.date - The date to look up.
     * @returns An object whose `sun.sign()` returns the sign the Sun is in on that date, or `null` if not found.
     */
    at: (options: { date: Date }) => ({
      sun: {
        /**
         * Get the sign the Sun is in on the given date.
         *
         * @throws {Error} If the date is invalid.
         * @returns The sign, or `null` if not found.
         */
        sign: () => getSignByDate(options.date, resolveLanguage())
      }
    })
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
 * zodiac.at({ date: new Date(2024, 4, 5) }).sun.sign()?.name
 * // Output: 'Taurus'
 */
export const zodiac: Zodiac = createZodiac(getLanguage)
