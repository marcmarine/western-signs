import type { House } from '../definitions'
import { HEMISPHERES, HOUSE_MODALITIES, HOUSES, SIGNS } from './constants'
import signs from './signs'

// Angular, succedent and cadent repeat in that order from the 1st house
const MODALITY_CYCLE = [
  HOUSE_MODALITIES.ANGULAR,
  HOUSE_MODALITIES.SUCCEDENT,
  HOUSE_MODALITIES.CADENT
]

// Every value follows from the house's position: the nth house goes with the nth sign,
// from which it takes its element and rulers
const houses: House[] = HOUSES.map((name, index) => {
  const number = index + 1
  const sign = Object.values(SIGNS)[index]
  const { element, rulingPlanet, traditionalRuler } = signs[sign]

  return {
    element,
    // Houses 1 to 6 are below the horizon
    hemisphere: number <= 6 ? HEMISPHERES.LOWER : HEMISPHERES.UPPER,
    modality: MODALITY_CYCLE[index % 3],
    number,
    quadrant: Math.ceil(number / 3) as House['quadrant'],
    rulingPlanet,
    traditionalRuler,
    sign,
    name
  }
})

export default houses
