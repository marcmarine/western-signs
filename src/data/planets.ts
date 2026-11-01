import type { Planet, Planets } from '../definitions'
import { PLANET_TYPE, PLANETS } from './constants'

const planets: Record<Planets, Planet> = {
  sun: {
    id: PLANETS.SUN,
    glyph: '☉',
    type: PLANET_TYPE.LUMINARY
  },
  moon: {
    id: PLANETS.MOON,
    glyph: '☽',
    type: PLANET_TYPE.LUMINARY
  },
  mercury: {
    id: PLANETS.MERCURY,
    glyph: '☿',
    type: PLANET_TYPE.PERSONAL
  },
  venus: {
    id: PLANETS.VENUS,
    glyph: '♀',
    type: PLANET_TYPE.PERSONAL
  },
  mars: {
    id: PLANETS.MARS,
    glyph: '♂',
    type: PLANET_TYPE.PERSONAL
  },
  jupiter: {
    id: PLANETS.JUPITER,
    glyph: '♃',
    type: PLANET_TYPE.SOCIAL
  },
  saturn: {
    id: PLANETS.SATURN,
    glyph: '♄',
    type: PLANET_TYPE.SOCIAL
  },
  uranus: {
    id: PLANETS.URANUS,
    glyph: '♅',
    type: PLANET_TYPE.TRANSPERSONAL
  },
  neptune: {
    id: PLANETS.NEPTUNE,
    glyph: '♆',
    type: PLANET_TYPE.TRANSPERSONAL
  },
  pluto: {
    id: PLANETS.PLUTO,
    glyph: '♇',
    type: PLANET_TYPE.TRANSPERSONAL
  }
}

export default planets
