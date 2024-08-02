import type { Sign, Signs } from '../src/definitions'
import {
  BODY_PARTS,
  CHARACTERS,
  ELEMENTS,
  MODALITIES,
  PLANETS,
  POLARITIES,
  SEASONS,
  SIGNS
} from './constants'

const signs: Record<Signs, Sign> = {
  aries: {
    bodyPart: BODY_PARTS.HEAD,
    character: CHARACTERS.RAM,
    element: ELEMENTS.FIRE,
    glyph: '♈',
    modality: MODALITIES.CARDINAL,
    name: SIGNS.ARIES,
    number: 1,
    pole: POLARITIES.POSITIVE,
    rulingPlanet: PLANETS.MARS,
    season: SEASONS.SPRING
  },
  taurus: {
    bodyPart: BODY_PARTS.THORAT,
    character: CHARACTERS.BULL,
    element: ELEMENTS.EARTH,
    glyph: '♉',
    modality: MODALITIES.FIXED,
    name: SIGNS.TAURUS,
    number: 2,
    pole: POLARITIES.NEGATIVE,
    rulingPlanet: PLANETS.VENUS,
    season: SEASONS.SPRING
  },
  gemini: {
    bodyPart: BODY_PARTS.LUNGS,
    character: CHARACTERS.TWINS,
    element: ELEMENTS.AIR,
    glyph: '♊',
    modality: MODALITIES.MUTABLE,
    name: SIGNS.GEMINI,
    number: 3,
    pole: POLARITIES.POSITIVE,
    rulingPlanet: PLANETS.MERCURY,
    season: SEASONS.SPRING
  },
  cancer: {
    bodyPart: BODY_PARTS.STOMACH,
    character: CHARACTERS.CRAB,
    element: ELEMENTS.WATER,
    glyph: '♋',
    modality: MODALITIES.CARDINAL,
    name: SIGNS.CANCER,
    number: 4,
    pole: POLARITIES.NEGATIVE,
    rulingPlanet: PLANETS.MOON,
    season: SEASONS.SUMMER
  },
  leo: {
    bodyPart: BODY_PARTS.HEART,
    character: CHARACTERS.LION,
    element: ELEMENTS.FIRE,
    glyph: '♌',
    modality: MODALITIES.FIXED,
    name: SIGNS.LEO,
    number: 5,
    pole: POLARITIES.POSITIVE,
    rulingPlanet: PLANETS.SUN,
    season: SEASONS.SUMMER
  },
  virgo: {
    bodyPart: BODY_PARTS.BOWELS,
    character: CHARACTERS.VIRGIN,
    element: ELEMENTS.EARTH,
    glyph: '♍',
    modality: MODALITIES.MUTABLE,
    name: SIGNS.VIRGO,
    number: 6,
    pole: POLARITIES.NEGATIVE,
    rulingPlanet: PLANETS.MERCURY,
    season: SEASONS.SUMMER
  },
  libra: {
    bodyPart: BODY_PARTS.REINS,
    character: CHARACTERS.BALANCE,
    element: ELEMENTS.AIR,
    glyph: '♎',
    modality: MODALITIES.CARDINAL,
    name: SIGNS.LIBRA,
    number: 7,
    pole: POLARITIES.POSITIVE,
    rulingPlanet: PLANETS.VENUS,
    season: SEASONS.AUTUMN
  },
  scorpio: {
    bodyPart: BODY_PARTS.SECRETS,
    character: CHARACTERS.SCORPION,
    element: ELEMENTS.WATER,
    glyph: '♏',
    modality: MODALITIES.FIXED,
    name: SIGNS.SCORPIO,
    number: 8,
    pole: POLARITIES.NEGATIVE,
    rulingPlanet: PLANETS.PLUTO,
    season: SEASONS.AUTUMN
  },
  sagittarius: {
    bodyPart: BODY_PARTS.THIGHS,
    character: CHARACTERS.ARCHER,
    element: ELEMENTS.FIRE,
    glyph: '♐',
    modality: MODALITIES.MUTABLE,
    name: SIGNS.SAGITTARIUS,
    number: 9,
    pole: POLARITIES.POSITIVE,
    rulingPlanet: PLANETS.JUPITER,
    season: SEASONS.AUTUMN
  },
  capricorn: {
    bodyPart: BODY_PARTS.KNEES,
    character: CHARACTERS.GOAT,
    element: ELEMENTS.EARTH,
    glyph: '♑',
    modality: MODALITIES.CARDINAL,
    name: SIGNS.CAPRICORN,
    number: 10,
    pole: POLARITIES.NEGATIVE,
    rulingPlanet: PLANETS.SATURN,
    season: SEASONS.WINTER
  },
  aquarius: {
    bodyPart: BODY_PARTS.ANKLES,
    character: CHARACTERS.THE_MAN,
    element: ELEMENTS.AIR,
    glyph: '♒',
    modality: MODALITIES.FIXED,
    name: SIGNS.AQUARIUS,
    number: 11,
    pole: POLARITIES.POSITIVE,
    rulingPlanet: PLANETS.URANUS,
    season: SEASONS.WINTER
  },
  pisces: {
    bodyPart: BODY_PARTS.FEET,
    character: CHARACTERS.THE_FISHES,
    element: ELEMENTS.WATER,
    glyph: '♓',
    modality: MODALITIES.MUTABLE,
    name: SIGNS.PISCES,
    number: 12,
    pole: POLARITIES.NEGATIVE,
    rulingPlanet: PLANETS.NEPTUNE,
    season: SEASONS.WINTER
  }
} as const

export default signs
