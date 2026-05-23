import type { Planets, Planet } from '../definitions'
import { PLANET_TYPE, PLANETS } from './constants'

const planets: Record<Planets, Planet> = {
  sun: {
    name: PLANETS.SUN,
    glyph: '☉',
    type: PLANET_TYPE.LUMINARY
  },
  moon: {
    name: PLANETS.MOON,
    glyph: '☽',
    type: PLANET_TYPE.LUMINARY
  },
  mercury: {
    name: PLANETS.MERCURY,
    glyph: '☿',
    type: PLANET_TYPE.PERSONAL
  },
  venus: {
    name: PLANETS.VENUS,
    glyph: '♀',
    type: PLANET_TYPE.PERSONAL
  },
  mars: {
    name: PLANETS.MARS,
    glyph: '♂',
    type: PLANET_TYPE.PERSONAL
  },
  jupiter: {
    name: PLANETS.JUPITER,
    glyph: '♃',
    type: PLANET_TYPE.SOCIAL
  },
  saturn: {
    name: PLANETS.SATURN,
    glyph: '♄',
    type: PLANET_TYPE.SOCIAL
  },
  uranus: {
    name: PLANETS.URANUS,
    glyph: '♅',
    type: PLANET_TYPE.TRANSPERSONAL
  },
  neptune: {
    name: PLANETS.NEPTUNE,
    glyph: '♆',
    type: PLANET_TYPE.TRANSPERSONAL
  },
  pluto: {
    name: PLANETS.PLUTO,
    glyph: '♇',
    type: PLANET_TYPE.TRANSPERSONAL
  }
}

export default planets
