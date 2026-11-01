import type { House } from '../definitions'
import {
  HEMISPHERES,
  HOUSE_KEYWORDS,
  HOUSE_MODALITIES,
  HOUSE_TITLES,
  HOUSES,
  SIGNS
} from './constants'
import signs from './signs'

// `keywords` holds a dictionary key here; `getHouses` splits the translated value into a list
type HouseData = Omit<House, 'keywords'> & { keywords: string }

// Angular, succedent and cadent repeat in that order from the 1st house
const MODALITY_CYCLE = [
  HOUSE_MODALITIES.ANGULAR,
  HOUSE_MODALITIES.SUCCEDENT,
  HOUSE_MODALITIES.CADENT
]

// Every value follows from the house's position: the nth house goes with the nth sign,
// from which it takes its element and rulers
const houses: HouseData[] = HOUSES.map((name, index) => {
  const number = index + 1
  const sign = Object.values(SIGNS)[index]
  const { element, rulingPlanet, traditionalRuler } = signs[sign]

  return {
    element,
    // Houses 1 to 6 are below the horizon
    hemisphere: number <= 6 ? HEMISPHERES.LOWER : HEMISPHERES.UPPER,
    keywords: HOUSE_KEYWORDS[index],
    modality: MODALITY_CYCLE[index % 3],
    number,
    phase: Math.ceil(number / 4) as House['phase'],
    quadrant: Math.ceil(number / 3) as House['quadrant'],
    rulingPlanet,
    traditionalRuler,
    sign,
    title: HOUSE_TITLES[index],
    name
  }
})

export default houses
