import type { House } from '@/src/definitions'
import { ELEMENTS, HEMISPHERES, HOUSE_KEYWORDS, HOUSE_TITLES, HOUSE_MODALITIES, PLANETS, SIGNS } from './constants'

const houses: House[] = [
  {
    element: ELEMENTS.FIRE,
    hemisphere: HEMISPHERES.LOWER,
    keywords: HOUSE_KEYWORDS[0],
    number: 1,
    phase: 1,
    quadrant: 1,
    rulingPlanet: PLANETS.MARS,
    sign: SIGNS.ARIES,
    title: HOUSE_TITLES[0],
    modality: HOUSE_MODALITIES.ANGULAR
  },
  {
    element: ELEMENTS.EARTH,
    hemisphere: HEMISPHERES.LOWER,
    keywords: HOUSE_KEYWORDS[1],
    modality: HOUSE_MODALITIES.SUCCEDENT,
    number: 2,
    phase: 1,
    quadrant: 1,
    rulingPlanet: PLANETS.VENUS,
    sign: SIGNS.TAURUS,
    title: HOUSE_TITLES[1]
  },
  {
    element: ELEMENTS.AIR,
    hemisphere: HEMISPHERES.LOWER,
    keywords: HOUSE_KEYWORDS[2],
    modality: HOUSE_MODALITIES.CADENT,
    number: 3,
    phase: 1,
    quadrant: 1,
    rulingPlanet: PLANETS.MERCURY,
    sign: SIGNS.GEMINI,
    title: HOUSE_TITLES[2]
  },
  {
    element: ELEMENTS.WATER,
    hemisphere: HEMISPHERES.LOWER,
    keywords: HOUSE_KEYWORDS[3],
    modality: HOUSE_MODALITIES.ANGULAR,
    number: 4,
    phase: 1,
    quadrant: 2,
    rulingPlanet: PLANETS.MOON,
    sign: SIGNS.CANCER,
    title: HOUSE_TITLES[3]
  },
  {
    element: ELEMENTS.FIRE,
    hemisphere: HEMISPHERES.LOWER,
    keywords: HOUSE_KEYWORDS[4],
    modality: HOUSE_MODALITIES.SUCCEDENT,
    number: 5,
    phase: 2,
    quadrant: 2,
    rulingPlanet: PLANETS.SUN,
    sign: SIGNS.LEO,
    title: HOUSE_TITLES[4]
  },
  {
    element: ELEMENTS.EARTH,
    hemisphere: HEMISPHERES.LOWER,
    keywords: HOUSE_KEYWORDS[5],
    modality: HOUSE_MODALITIES.CADENT,
    number: 6,
    phase: 2,
    quadrant: 2,
    rulingPlanet: PLANETS.MERCURY,
    sign: SIGNS.VIRGO,
    title: HOUSE_TITLES[5]
  },
  {
    element: ELEMENTS.AIR,
    hemisphere: HEMISPHERES.UPPER,
    keywords: HOUSE_KEYWORDS[6],
    modality: HOUSE_MODALITIES.ANGULAR,
    number: 7,
    phase: 2,
    quadrant: 3,
    rulingPlanet: PLANETS.VENUS,
    sign: SIGNS.LIBRA,
    title: HOUSE_TITLES[6]
  },
  {
    element: ELEMENTS.WATER,
    hemisphere: HEMISPHERES.UPPER,
    keywords: HOUSE_KEYWORDS[7],
    modality: HOUSE_MODALITIES.SUCCEDENT,
    number: 8,
    phase: 2,
    quadrant: 3,
    rulingPlanet: PLANETS.PLUTO,
    sign: SIGNS.SCORPIO,
    title: HOUSE_TITLES[7]
  },
  {
    element: ELEMENTS.FIRE,
    hemisphere: HEMISPHERES.UPPER,
    keywords: HOUSE_KEYWORDS[8],
    modality: HOUSE_MODALITIES.CADENT,
    number: 9,
    phase: 3,
    quadrant: 3,
    rulingPlanet: PLANETS.JUPITER,
    sign: SIGNS.SAGITTARIUS,
    title: HOUSE_TITLES[8]
  },
  {
    element: ELEMENTS.EARTH,
    hemisphere: HEMISPHERES.UPPER,
    keywords: HOUSE_KEYWORDS[9],
    modality: HOUSE_MODALITIES.ANGULAR,
    number: 10,
    phase: 3,
    quadrant: 4,
    rulingPlanet: PLANETS.SATURN,
    sign: SIGNS.CAPRICORN,
    title: HOUSE_TITLES[9]
  },
  {
    element: ELEMENTS.AIR,
    hemisphere: HEMISPHERES.UPPER,
    keywords: HOUSE_KEYWORDS[10],
    modality: HOUSE_MODALITIES.SUCCEDENT,
    number: 11,
    phase: 3,
    quadrant: 4,
    rulingPlanet: PLANETS.URANUS,
    sign: SIGNS.AQUARIUS,
    title: HOUSE_TITLES[10]
  },
  {
    element: ELEMENTS.WATER,
    hemisphere: HEMISPHERES.UPPER,
    keywords: HOUSE_KEYWORDS[11],
    modality: HOUSE_MODALITIES.CADENT,
    number: 12,
    phase: 3,
    quadrant: 4,
    rulingPlanet: PLANETS.NEPTUNE,
    sign: SIGNS.PISCES,
    title: HOUSE_TITLES[11]
  }
]

export default houses
