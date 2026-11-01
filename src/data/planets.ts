import type { Planet, PlanetId, Rulers, SignId } from '../definitions'
import { PLANET_TYPE, PLANETS, SIGNS } from './constants'
import signs from './signs'

// The dignities are added below, from the rulers of each sign
const entries: Record<PlanetId, Omit<Planet, 'dignities'>> = {
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

const SIGN_IDS = Object.values(SIGNS)

// The sign six places away, across the zodiac
const opposite = (sign: SignId) =>
  SIGN_IDS[(SIGN_IDS.indexOf(sign) + 6) % 12] as SignId

// The signs opposite the given ones, in zodiac order
const opposites = (ids: SignId[]) =>
  SIGN_IDS.filter(sign => ids.includes(opposite(sign)))

// The signs a planet rules in the given tradition, in zodiac order
const ruledBy = (planet: PlanetId, tradition: keyof Rulers) =>
  Object.values(signs)
    .filter(sign => sign.rulers[tradition] === planet)
    .map(sign => sign.id)

const planets = Object.fromEntries(
  Object.values(entries).map(planet => {
    const modern = ruledBy(planet.id, 'modern')
    const traditional = ruledBy(planet.id, 'traditional')

    return [
      planet.id,
      {
        ...planet,
        dignities: {
          domicile: { modern, traditional },
          detriment: {
            modern: opposites(modern),
            traditional: opposites(traditional)
          }
        }
      }
    ]
  })
) as Record<PlanetId, Planet>

export default planets
