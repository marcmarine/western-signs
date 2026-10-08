import type { Language, Planets, Signs } from './definitions'
import { getHouses } from './getHouses'
import { getPlanet } from './getPlanet'
import { getPlanets } from './getPlanets'
import { getSign } from './getSign'
import { getSigns } from './getSigns'
import { getLanguage } from './i18n'

function createZodiac(resolveLanguage: () => Language) {
  return {
    locale: (language: Language) => createZodiac(() => language),
    signs: {
      get: (name: Signs) => getSign(name, resolveLanguage()),
      all: () => getSigns(resolveLanguage())
    },
    planets: {
      get: (name: Planets) => getPlanet(name, resolveLanguage()),
      all: () => getPlanets(resolveLanguage())
    },
    houses: {
      all: () => getHouses(resolveLanguage())
    }
  }
}

export type Zodiac = ReturnType<typeof createZodiac>

/**
 * Entry point grouping signs, planets and houses under a single API.
 * Uses the language set with `i18n.setLanguage()` unless one is fixed with `locale()`.
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
 */
export const zodiac: Zodiac = createZodiac(getLanguage)
