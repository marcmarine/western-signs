import type { Sign, Signs } from '../definitions'
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
    id: SIGNS.ARIES,
    longitude: { start: 0, end: 30 },
    modality: MODALITIES.CARDINAL,
    number: 1,
    polarity: POLARITIES.POSITIVE,
    rulers: { modern: PLANETS.MARS, traditional: PLANETS.MARS },
    season: SEASONS.SPRING
  },
  taurus: {
    bodyPart: BODY_PARTS.THROAT,
    character: CHARACTERS.BULL,
    element: ELEMENTS.EARTH,
    glyph: '♉',
    id: SIGNS.TAURUS,
    longitude: { start: 30, end: 60 },
    modality: MODALITIES.FIXED,
    number: 2,
    polarity: POLARITIES.NEGATIVE,
    rulers: { modern: PLANETS.VENUS, traditional: PLANETS.VENUS },
    season: SEASONS.SPRING
  },
  gemini: {
    bodyPart: BODY_PARTS.LUNGS,
    character: CHARACTERS.TWINS,
    element: ELEMENTS.AIR,
    glyph: '♊',
    id: SIGNS.GEMINI,
    longitude: { start: 60, end: 90 },
    modality: MODALITIES.MUTABLE,
    number: 3,
    polarity: POLARITIES.POSITIVE,
    rulers: { modern: PLANETS.MERCURY, traditional: PLANETS.MERCURY },
    season: SEASONS.SPRING
  },
  cancer: {
    bodyPart: BODY_PARTS.STOMACH,
    character: CHARACTERS.CRAB,
    element: ELEMENTS.WATER,
    glyph: '♋',
    id: SIGNS.CANCER,
    longitude: { start: 90, end: 120 },
    modality: MODALITIES.CARDINAL,
    number: 4,
    polarity: POLARITIES.NEGATIVE,
    rulers: { modern: PLANETS.MOON, traditional: PLANETS.MOON },
    season: SEASONS.SUMMER
  },
  leo: {
    bodyPart: BODY_PARTS.HEART,
    character: CHARACTERS.LION,
    element: ELEMENTS.FIRE,
    glyph: '♌',
    id: SIGNS.LEO,
    longitude: { start: 120, end: 150 },
    modality: MODALITIES.FIXED,
    number: 5,
    polarity: POLARITIES.POSITIVE,
    rulers: { modern: PLANETS.SUN, traditional: PLANETS.SUN },
    season: SEASONS.SUMMER
  },
  virgo: {
    bodyPart: BODY_PARTS.BOWELS,
    character: CHARACTERS.VIRGIN,
    element: ELEMENTS.EARTH,
    glyph: '♍',
    id: SIGNS.VIRGO,
    longitude: { start: 150, end: 180 },
    modality: MODALITIES.MUTABLE,
    number: 6,
    polarity: POLARITIES.NEGATIVE,
    rulers: { modern: PLANETS.MERCURY, traditional: PLANETS.MERCURY },
    season: SEASONS.SUMMER
  },
  libra: {
    bodyPart: BODY_PARTS.REINS,
    character: CHARACTERS.BALANCE,
    element: ELEMENTS.AIR,
    glyph: '♎',
    id: SIGNS.LIBRA,
    longitude: { start: 180, end: 210 },
    modality: MODALITIES.CARDINAL,
    number: 7,
    polarity: POLARITIES.POSITIVE,
    rulers: { modern: PLANETS.VENUS, traditional: PLANETS.VENUS },
    season: SEASONS.AUTUMN
  },
  scorpio: {
    bodyPart: BODY_PARTS.SECRETS,
    character: CHARACTERS.SCORPION,
    element: ELEMENTS.WATER,
    glyph: '♏',
    id: SIGNS.SCORPIO,
    longitude: { start: 210, end: 240 },
    modality: MODALITIES.FIXED,
    number: 8,
    polarity: POLARITIES.NEGATIVE,
    rulers: { modern: PLANETS.PLUTO, traditional: PLANETS.MARS },
    season: SEASONS.AUTUMN
  },
  sagittarius: {
    bodyPart: BODY_PARTS.THIGHS,
    character: CHARACTERS.ARCHER,
    element: ELEMENTS.FIRE,
    glyph: '♐',
    id: SIGNS.SAGITTARIUS,
    longitude: { start: 240, end: 270 },
    modality: MODALITIES.MUTABLE,
    number: 9,
    polarity: POLARITIES.POSITIVE,
    rulers: { modern: PLANETS.JUPITER, traditional: PLANETS.JUPITER },
    season: SEASONS.AUTUMN
  },
  capricorn: {
    bodyPart: BODY_PARTS.KNEES,
    character: CHARACTERS.GOAT,
    element: ELEMENTS.EARTH,
    glyph: '♑',
    id: SIGNS.CAPRICORN,
    longitude: { start: 270, end: 300 },
    modality: MODALITIES.CARDINAL,
    number: 10,
    polarity: POLARITIES.NEGATIVE,
    rulers: { modern: PLANETS.SATURN, traditional: PLANETS.SATURN },
    season: SEASONS.WINTER
  },
  aquarius: {
    bodyPart: BODY_PARTS.ANKLES,
    character: CHARACTERS.WATER_BEARER,
    element: ELEMENTS.AIR,
    glyph: '♒',
    id: SIGNS.AQUARIUS,
    longitude: { start: 300, end: 330 },
    modality: MODALITIES.FIXED,
    number: 11,
    polarity: POLARITIES.POSITIVE,
    rulers: { modern: PLANETS.URANUS, traditional: PLANETS.SATURN },
    season: SEASONS.WINTER
  },
  pisces: {
    bodyPart: BODY_PARTS.FEET,
    character: CHARACTERS.FISHES,
    element: ELEMENTS.WATER,
    glyph: '♓',
    id: SIGNS.PISCES,
    longitude: { start: 330, end: 360 },
    modality: MODALITIES.MUTABLE,
    number: 12,
    polarity: POLARITIES.NEGATIVE,
    rulers: { modern: PLANETS.NEPTUNE, traditional: PLANETS.JUPITER },
    season: SEASONS.WINTER
  }
} as const

export default signs
