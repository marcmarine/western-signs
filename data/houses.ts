import type { House } from '@/src/definitions'
import { HOUSE_KEYWORDS, HOUSE_TITLES, PLANETS, SIGNS } from './constants'

const houses: House[] = [
  {
    number: 1,
    sign: SIGNS.ARIES,
    rulingPlanet: PLANETS.MARS,
    title: HOUSE_TITLES[0],
    keywords: HOUSE_KEYWORDS[0]
  },
  {
    number: 2,
    sign: SIGNS.TAURUS,
    rulingPlanet: PLANETS.VENUS,
    title: HOUSE_TITLES[1],
    keywords: HOUSE_KEYWORDS[1]
  },
  {
    number: 3,
    sign: SIGNS.GEMINI,
    rulingPlanet: PLANETS.MERCURY,
    title: HOUSE_TITLES[2],
    keywords: HOUSE_KEYWORDS[2]
  },
  {
    number: 4,
    sign: SIGNS.CANCER,
    rulingPlanet: PLANETS.MOON,
    title: HOUSE_TITLES[3],
    keywords: HOUSE_KEYWORDS[3]
  },
  {
    number: 5,
    sign: SIGNS.LEO,
    rulingPlanet: PLANETS.SUN,
    title: HOUSE_TITLES[4],
    keywords: HOUSE_KEYWORDS[4]
  },
  {
    number: 6,
    sign: SIGNS.VIRGO,
    rulingPlanet: PLANETS.MERCURY,
    title: HOUSE_TITLES[5],
    keywords: HOUSE_KEYWORDS[5]
  },
  {
    number: 7,
    sign: SIGNS.LIBRA,
    rulingPlanet: PLANETS.VENUS,
    title: HOUSE_TITLES[6],
    keywords: HOUSE_KEYWORDS[6]
  },
  {
    number: 8,
    sign: SIGNS.SCORPIO,
    rulingPlanet: PLANETS.PLUTO,
    title: HOUSE_TITLES[7],
    keywords: HOUSE_KEYWORDS[7]
  },
  {
    number: 9,
    sign: SIGNS.SAGITTARIUS,
    rulingPlanet: PLANETS.JUPITER,
    title: HOUSE_TITLES[8],
    keywords: HOUSE_KEYWORDS[8]
  },
  {
    number: 10,
    sign: SIGNS.CAPRICORN,
    rulingPlanet: PLANETS.SATURN,
    title: HOUSE_TITLES[9],
    keywords: HOUSE_KEYWORDS[9]
  },
  {
    number: 11,
    sign: SIGNS.AQUARIUS,
    rulingPlanet: PLANETS.URANUS,
    title: HOUSE_TITLES[10],
    keywords: HOUSE_KEYWORDS[10]
  },
  {
    number: 12,
    sign: SIGNS.PISCES,
    rulingPlanet: PLANETS.NEPTUNE,
    title: HOUSE_TITLES[11],
    keywords: HOUSE_KEYWORDS[11]
  }
]

export default houses
