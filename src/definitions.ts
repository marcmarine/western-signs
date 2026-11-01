import type {
  ASPECT_QUALITY,
  ASPECT_TYPE,
  ASPECTS,
  BODY_PARTS,
  CHARACTERS,
  ELEMENTS,
  HEMISPHERES,
  HOUSE_MODALITIES,
  HOUSES,
  MODALITIES,
  PLANET_TYPE,
  PLANETS,
  POLARITIES,
  SEASONS,
  SIGNS
} from './data/constants'

export type Language = 'en' | 'es' | 'ca'

type ObjectValues<T> = T[keyof T]

export type Signs = ObjectValues<typeof SIGNS>
export type Elements = ObjectValues<typeof ELEMENTS>
export type Modalities = ObjectValues<typeof MODALITIES>
export type Planets = ObjectValues<typeof PLANETS>
export type Polarities = ObjectValues<typeof POLARITIES>
export type BodyParts = ObjectValues<typeof BODY_PARTS>
export type Characters = ObjectValues<typeof CHARACTERS>
export type Seasons = ObjectValues<typeof SEASONS>
export type Hemispheres = ObjectValues<typeof HEMISPHERES>
export type HouseModalities = ObjectValues<typeof HOUSE_MODALITIES>
export type PlanetType = ObjectValues<typeof PLANET_TYPE>
export type Aspects = ObjectValues<typeof ASPECTS>
export type Houses = (typeof HOUSES)[number]
export type Symbols = Signs | Planets | Aspects | 'ascendant'
export type AspectType = ObjectValues<typeof ASPECT_TYPE>
export type AspectQuality = ObjectValues<typeof ASPECT_QUALITY>

export interface Sign {
  /**
   * The body part associated with the zodiac sign.
   * Indicates the areas of the body influenced by the sign.
   * Examples: "Head" for Aries, "Throat" for Taurus.
   */
  bodyPart: string

  /**
   * The character associated with the zodiac sign.
   * A visual representation or icon associated with the sign.
   * Examples: "The Ram" for Aries, "The Bull" for Taurus.
   */
  character: string

  /**
   * The element associated with the zodiac sign.
   * Represents one of the four classical elements: Fire, Earth, Air, Water.
   * Also known as triplicities in astrology.
   * Examples: "Fire" for Aries, "Earth" for Taurus.
   */
  element: Elements

  /**
   * The glyph representing the zodiac sign.
   * A symbolic character or drawing associated with the sign.
   * Examples: "♈" for Aries, "♉" for Taurus.
   */
  glyph: string

  /**
   * The range of the sign along the ecliptic, in degrees from 0° Aries.
   * A sign spans 30°, from `start` (included) to `end` (excluded). The Sun is in the sign
   * while its longitude, as given by {@link zodiac | `zodiac.at().sun.longitude()`}, is in this range.
   * Examples: `{ start: 0, end: 30 }` for Aries, `{ start: 30, end: 60 }` for Taurus.
   */
  longitude: { readonly start: number; readonly end: number }

  /**
   * The modality of the sign.
   * Indicates its mode of operation: Cardinal, Fixed, or Mutable.
   * Examples: "Cardinal" for Aries, "Fixed" for Taurus.
   */
  modality: string

  /**
   * The name of the zodiac sign.
   * Examples: "Aries", "Taurus".
   */
  name: Signs

  /**
   * The number associated with the zodiac sign.
   * Reflects its order in the zodiac cycle.
   * Examples: 1 for Aries (the first sign), 2 for Taurus (the second sign).
   */
  number: number

  /**
   * The polarity of the sign.
   * Indicates its active (Positive) or passive (Negative) nature.
   * Examples: "Positive" for Aries, "Negative" for Taurus.
   */
  pole: string

  /**
   * The ruling planet of the zodiac sign.
   * Represents the guiding celestial body influencing the sign.
   * Examples: "Mars" for Aries, "Venus" for Taurus.
   */
  rulingPlanet: string

  /**
   * The traditional ruling planet of the zodiac sign, from before the discovery of the outer planets.
   * Same as `rulingPlanet` except for Scorpio, Aquarius and Pisces.
   * Examples: "Mars" for Scorpio (modern ruler: Pluto), "Saturn" for Aquarius (modern ruler: Uranus).
   */
  traditionalRuler: string

  /**
   * The season in which the Sun is in the sign, in the Northern Hemisphere.
   * In the Southern Hemisphere the seasons are the other way around.
   * Examples: "Spring" for Aries, "Spring" for Taurus.
   */
  season: string
}

export interface House {
  /**
   * The element of the house's natural sign.
   * Example: "Fire" for House 1 (Aries), "Earth" for House 2 (Taurus).
   */
  element: Elements

  /**
   * The half of the chart the house is in, divided by the horizon.
   *
   * - **Lower (Houses 1–6):** below the horizon, the northern half of the chart.
   * - **Upper (Houses 7–12):** above the horizon, the southern half of the chart.
   */
  hemisphere: Hemispheres

  /**
   * The number of the house, from 1 to 12, counted counterclockwise from the Ascendant.
   */
  number: number

  /**
   * The quarter of the chart the house is in, divided by the horizon and the meridian.
   * Quadrant I holds Houses 1–3, Quadrant II Houses 4–6, Quadrant III Houses 7–9
   * and Quadrant IV Houses 10–12.
   */
  quadrant: 1 | 2 | 3 | 4

  /**
   * The ruling planet of the house's natural sign.
   * Example: "Mars" for House 1, "Venus" for House 2.
   */
  rulingPlanet: string

  /**
   * The traditional ruling planet of the house's natural sign, from before the discovery of the outer planets.
   * Same as `rulingPlanet` except for Houses 8, 11 and 12.
   * Example: "Mars" for House 8 (modern ruler: Pluto), "Jupiter" for House 12 (modern ruler: Neptune).
   */
  traditionalRuler: string

  /**
   * The natural sign of the house: the sign with the same number.
   * Example: "Aries" for House 1, "Taurus" for House 2.
   */
  sign: Signs

  /**
   * The modality of the house, which repeats in this order from House 1:
   *
   * - **Angular (Houses 1, 4, 7, 10):** the houses that start at an angle of the chart.
   * - **Succedent (Houses 2, 5, 8, 11):** the houses that follow an angular house.
   * - **Cadent (Houses 3, 6, 9, 12):** the houses that come before the next angle.
   */
  modality: HouseModalities

  /**
   * The name of the house.
   * Examples: "First House", "Second House", ... "Twelfth House".
   */
  name: Houses
}

export interface Planet {
  /**
   * The name of the celestial body.
   * Examples: "Sun", "Moon".
   */
  name: string

  /**
   * The glyph or symbol associated with the celestial body.
   * Examples: "☉" for the Sun, "☽" for the Moon, "♂" for Mars.
   */
  glyph: string

  /**
   * The type or category of the celestial body.
   * Examples: "Personal", "Luminary".
   */
  type: PlanetType
}

export type Dictionary = {
  [key in
    | Signs
    | Elements
    | Modalities
    | Planets
    | Polarities
    | BodyParts
    | Characters
    | Seasons
    | Hemispheres
    | HouseModalities
    | PlanetType
    | Houses
    | Aspects
    | AspectType
    | AspectQuality]: string
}

export type Dictionaries = Record<Language, Dictionary>

export type SymbolOptions = {
  width?: number | string
  height?: number | string
  fill?: string
  stroke?: string
  'stroke-width'?: number | string
  class?: string
  style?: string
  nonScalingStroke?: boolean
}

export interface Aspect {
  /**
   * The name of the aspect.
   * Examples: "Conjunction", "Opposition", "Square", "Trine", "Sextile".
   */
  name: string

  /**
   * The type of the aspect.
   * Indicates the nature of the aspect's influence.
   * Examples: "Major", "Minor".
   */
  type: AspectType

  /**
   * The quality of the aspect.
   * Reflects the emotional or psychological impact of the aspect.
   * Examples: "Harmonious", "Disharmonious", "Neutral".
   */
  quality: AspectQuality

  /**
   * The angle of the aspect in degrees.
   * Represents the geometric relationship between the two celestial bodies.
   * Examples: 0 for Conjunction, 180 for Opposition, 90 for Square, 120 for Trine, 60 for Sextile...
   */
  angle: number

  /**
   * The glyph representing the aspect.
   * Quintiles have no Unicode character, so they use the letters common in astrology software.
   * Examples: "☌" for Conjunction, "△" for Trine, "Q" for Quintile, "bQ" for Bi-quintile.
   */
  glyph: string

  /**
   * The harmonic the aspect belongs to: the circle divided by this number gives the
   * smallest angle of its family, and the aspect's angle is a multiple of it.
   * Examples: 4 for Square (360° / 4 = 90°), 8 for Semi-square and Sesqui-square (45° and 3 × 45°),
   * 12 for Semi-sextile and Quincunx (30° and 5 × 30°).
   */
  harmonic: number
}
