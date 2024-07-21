import type { Sign, Signs } from '../src/definitions'
import { ELEMENTS, MODALITIES, PLANETS, SIGNS } from './constants'

const signs: Record<Signs, Sign> = {
  aries: {
    name: SIGNS.ARIES,
    element: ELEMENTS.FIRE,
    modality: MODALITIES.CARDINAL,
    rulingPlanet: PLANETS.MARS,
    symbol: '♈'
  },
  taurus: {
    name: SIGNS.TAURUS,
    element: ELEMENTS.EARTH,
    modality: MODALITIES.FIXED,
    rulingPlanet: PLANETS.VENUS,
    symbol: '♉'
  },
  gemini: {
    name: SIGNS.GEMINI,
    element: ELEMENTS.AIR,
    modality: MODALITIES.MUTABLE,
    rulingPlanet: PLANETS.MERCURY,
    symbol: '♊'
  },
  cancer: {
    name: SIGNS.CANCER,
    element: ELEMENTS.WATER,
    modality: MODALITIES.CARDINAL,
    rulingPlanet: PLANETS.MOON,
    symbol: '♋'
  },
  leo: {
    name: SIGNS.LEO,
    element: ELEMENTS.FIRE,
    modality: MODALITIES.FIXED,
    rulingPlanet: PLANETS.SUN,
    symbol: '♌'
  },
  virgo: {
    name: SIGNS.VIRGO,
    element: ELEMENTS.EARTH,
    modality: MODALITIES.MUTABLE,
    rulingPlanet: PLANETS.MERCURY,
    symbol: '♍'
  },
  libra: {
    name: SIGNS.LIBRA,
    element: ELEMENTS.AIR,
    modality: MODALITIES.CARDINAL,
    rulingPlanet: PLANETS.VENUS,
    symbol: '♎'
  },
  scorpio: {
    name: SIGNS.SCORPIO,
    element: ELEMENTS.WATER,
    modality: MODALITIES.FIXED,
    rulingPlanet: PLANETS.PLUTO,
    symbol: '♏'
  },
  sagittarius: {
    name: SIGNS.SAGITTARIUS,
    element: ELEMENTS.FIRE,
    modality: MODALITIES.MUTABLE,
    rulingPlanet: PLANETS.JUPITER,
    symbol: '♐'
  },
  capricorn: {
    name: SIGNS.CAPRICORN,
    element: ELEMENTS.EARTH,
    modality: MODALITIES.CARDINAL,
    rulingPlanet: PLANETS.SATURN,
    symbol: '♑'
  },
  aquarius: {
    name: SIGNS.AQUARIUS,
    element: ELEMENTS.AIR,
    modality: MODALITIES.FIXED,
    rulingPlanet: PLANETS.URANUS,
    symbol: '♒'
  },
  pisces: {
    name: SIGNS.PISCES,
    element: ELEMENTS.WATER,
    modality: MODALITIES.MUTABLE,
    rulingPlanet: PLANETS.NEPTUNE,
    symbol: '♓'
  }
} as const

export default signs
