import { aspects } from './data/aspects'
import { DIGNITIES } from './data/constants'
import houses from './data/houses'
import planets from './data/planets'
import signs from './data/signs'
import type {
  Aspect,
  AspectId,
  DignityId,
  House,
  HouseNumber,
  Planet,
  PlanetId,
  Rulers,
  Sign,
  SignId,
  ZodiacPosition
} from './definitions'
import { normalize, sunLongitude } from './sun'
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

// The longitude within [0, 360), however many turns it is given in
function toLongitude(value: number): number {
  if (!Number.isFinite(value)) throw new Error('Invalid longitude')

  return normalize(value)
}

// The sign whose range along the ecliptic holds the given longitude
function signAt(value: number): Sign {
  const longitude = toLongitude(value)

  return Object.values(signs).find(
    sign => longitude >= sign.longitude.start && longitude < sign.longitude.end
  ) as Sign
}

// The degree within its sign of the given longitude
function degreeAt(value: number): number {
  return toLongitude(value) % 30
}

/**
 * Get a single sign by identifier.
 *
 * @param id - The identifier of the sign, e.g. `'taurus'`.
 * @returns The sign.
 */
function getSign(id: SignId): Sign
/**
 * Get a single sign from any string, e.g. one read from a URL.
 *
 * @param id - A string that may be the identifier of a sign.
 * @returns The sign, or `undefined` if the string is not the identifier of a sign.
 */
function getSign(id: string): Sign | undefined
function getSign(id: string): Sign | undefined {
  return Object.hasOwn(signs, id) ? signs[id as SignId] : undefined
}

/**
 * Get a single planet by identifier.
 *
 * @param id - The identifier of the planet, e.g. `'venus'`.
 * @returns The planet.
 */
function getPlanet(id: PlanetId): Planet
/**
 * Get a single planet from any string, e.g. one read from a URL.
 *
 * @param id - A string that may be the identifier of a planet.
 * @returns The planet, or `undefined` if the string is not the identifier of a planet.
 */
function getPlanet(id: string): Planet | undefined
function getPlanet(id: string): Planet | undefined {
  return Object.hasOwn(planets, id) ? planets[id as PlanetId] : undefined
}

/**
 * Get a single house by number.
 *
 * @param number - The number of the house, from 1 to 12.
 * @returns The house.
 */
function getHouse(number: HouseNumber): House
/**
 * Get a single house from any number, e.g. one read from a URL.
 *
 * @param number - A number that may be the number of a house.
 * @returns The house, or `undefined` if there is no house with that number.
 */
function getHouse(number: number): House | undefined
function getHouse(number: number): House | undefined {
  return houses.find(house => house.number === number)
}

/**
 * Get a single aspect by identifier.
 *
 * @param id - The identifier of the aspect, e.g. `'trine'`.
 * @returns The aspect.
 */
function getAspect(id: AspectId): Aspect
/**
 * Get a single aspect from any string, e.g. one read from a URL.
 *
 * @param id - A string that may be the identifier of an aspect.
 * @returns The aspect, or `undefined` if the string is not the identifier of an aspect.
 */
function getAspect(id: string): Aspect | undefined
function getAspect(id: string): Aspect | undefined {
  return aspects.find(aspect => aspect.id === id)
}

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
 * i18n.label(zodiac.signs.get('taurus'), 'es').labels.name
 * // Output: 'Tauro'
 *
 * zodiac.at({ date: new Date(2024, 4, 5) }).sun.sign.id
 * // Output: 'taurus'
 */
export const zodiac = {
  /** The twelve zodiac signs. */
  signs: {
    /** Get a single sign by identifier. */
    get: getSign,
    /** Get all twelve signs, from Aries to Pisces. */
    all: (): Sign[] => Object.values(signs),
    /**
     * Get the sign at an ecliptic longitude, e.g. a planet's or a house cusp's from another library.
     *
     * @param longitude - The longitude in degrees from 0° Aries. Values outside 0–360, such as `-10` or `370`, are turned into it.
     * @throws {Error} If the longitude is not a finite number.
     * @returns The sign whose range holds the longitude.
     *
     * @example
     * zodiac.signs.at(45.48).id
     * // Output: 'taurus'
     */
    at: (longitude: number): Sign => signAt(longitude),
    /**
     * Get the degree within its sign of an ecliptic longitude.
     *
     * @param longitude - The longitude in degrees from 0° Aries. Values outside 0–360 are turned into it.
     * @throws {Error} If the longitude is not a finite number.
     * @returns The degree, from 0 to 30.
     *
     * @example
     * zodiac.signs.degree(45.48)
     * // Output: 15.48
     */
    degree: (longitude: number): number => degreeAt(longitude)
  },
  /** The planets, including the Sun and the Moon. */
  planets: {
    /** Get a single planet by identifier. */
    get: getPlanet,
    /** Get all planets. */
    all: (): Planet[] => Object.values(planets)
  },
  /** The twelve astrological houses. */
  houses: {
    /** Get a single house by number. */
    get: getHouse,
    /** Get all twelve houses. */
    all: (): House[] => [...houses]
  },
  /** The aspects, from conjunction to opposition. */
  aspects: {
    /** Get a single aspect by identifier. */
    get: getAspect,
    /** Get all aspects, ordered by angle. */
    all: (): Aspect[] => [...aspects]
  },
  /**
   * Get the essential dignities and debilities of a planet in a sign.
   *
   * A planet can have more than one: Mercury is both in its domicile and exalted in Virgo,
   * and both in its detriment and in its fall in Pisces. An empty list means the planet is peregrine.
   *
   * @param planet - The identifier of the planet, e.g. `'mars'`.
   * @param sign - The identifier of the sign, e.g. `'capricorn'`.
   * @param options.rulers - Which rulers give the domicile and detriment: `'modern'` (default) or `'traditional'`.
   * @returns The dignities, in this order: `'domicile'`, `'exaltation'`, `'detriment'`, `'fall'`.
   *
   * @example
   * zodiac.dignities('mars', 'capricorn')
   * // Output: ['exaltation']
   *
   * zodiac.dignities('mars', 'scorpio', { rulers: 'traditional' })
   * // Output: ['domicile']
   */
  dignities: (
    planet: PlanetId,
    sign: SignId,
    { rulers = 'modern' }: { rulers?: keyof Rulers } = {}
  ): DignityId[] => {
    const { domicile, exaltation, detriment, fall } = planets[planet].dignities
    const found: [DignityId, boolean][] = [
      [DIGNITIES.DOMICILE, domicile[rulers].includes(sign)],
      [DIGNITIES.EXALTATION, exaltation === sign],
      [DIGNITIES.DETRIMENT, detriment[rulers].includes(sign)],
      [DIGNITIES.FALL, fall === sign]
    ]

    return found.filter(([, holds]) => holds).map(([dignity]) => dignity)
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
   * @throws {Error} If the date or the time zone is invalid.
   * @returns The position of the Sun at that instant, as a frozen object that can be serialized.
   *
   * @example
   * const { sun } = zodiac.at({ date: '1990-03-20T05:00', timeZone: 'Europe/Madrid' })
   *
   * sun.sign.id
   * // Output: 'pisces'
   *
   * sun.degree
   * // Output: 29.28...
   */
  at: (options: AtOptions): { sun: ZodiacPosition } => {
    const longitude = sunLongitude(
      'timeZone' in options
        ? fromLocal(options.date, options.timeZone)
        : options.date
    )

    return Object.freeze({
      sun: Object.freeze({
        longitude,
        degree: degreeAt(longitude),
        sign: signAt(longitude)
      })
    })
  }
}

export type Zodiac = typeof zodiac
