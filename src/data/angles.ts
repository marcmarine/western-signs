import type { Angle } from '../definitions'
import { ANGLES, AXES } from './constants'

export const angles: Angle[] = [
  {
    id: ANGLES.ASCENDANT,
    axis: AXES.HORIZON,
    glyph: 'AC',
    house: 1,
    opposite: ANGLES.DESCENDANT
  },
  {
    id: ANGLES.IMUM_COELI,
    axis: AXES.MERIDIAN,
    glyph: 'IC',
    house: 4,
    opposite: ANGLES.MEDIUM_COELI
  },
  {
    id: ANGLES.DESCENDANT,
    axis: AXES.HORIZON,
    glyph: 'DC',
    house: 7,
    opposite: ANGLES.ASCENDANT
  },
  {
    id: ANGLES.MEDIUM_COELI,
    axis: AXES.MERIDIAN,
    glyph: 'MC',
    house: 10,
    opposite: ANGLES.IMUM_COELI
  }
]
