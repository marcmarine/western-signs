import type { House, HouseNumber } from '../definitions'
import {
  HORIZONS,
  HOUSE_MODALITIES,
  HOUSES,
  MERIDIANS,
  SIGNS
} from './constants'
import signs from './signs'

// Angular, succedent and cadent repeat in that order from the 1st house
const MODALITY_CYCLE = [
  HOUSE_MODALITIES.ANGULAR,
  HOUSE_MODALITIES.SUCCEDENT,
  HOUSE_MODALITIES.CADENT
]

// Every value follows from the house's position: the nth house goes with the nth sign,
// from which it takes its element and rulers
const houses: House[] = HOUSES.map((id, index) => {
  const number = (index + 1) as HouseNumber
  const sign = Object.values(SIGNS)[index]
  const { element, rulers } = signs[sign]

  return {
    element,
    // Houses 1 to 6 are below the horizon
    horizon: number <= 6 ? HORIZONS.BELOW : HORIZONS.ABOVE,
    id,
    // Houses 10 to 3 are east of the meridian, around the Ascendant
    meridian: number >= 10 || number <= 3 ? MERIDIANS.EAST : MERIDIANS.WEST,
    modality: MODALITY_CYCLE[index % 3],
    number,
    quadrant: Math.ceil(number / 3) as House['quadrant'],
    rulers: { ...rulers },
    sign
  }
})

export default houses
