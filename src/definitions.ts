import type {
  ASPECT_QUALITY,
  ASPECT_TYPE,
  ASPECTS,
  BODY_PARTS,
  CHARACTERS,
  ELEMENTS,
  HORIZONS,
  HOUSE_MODALITIES,
  HOUSES,
  MERIDIANS,
  MODALITIES,
  PLANET_TYPE,
  PLANETS,
  POLARITIES,
  SEASONS,
  SIGNS
} from './data/constants'

export type Language = 'en' | 'es' | 'ca'

type ObjectValues<T> = T[keyof T]

export type SignId = ObjectValues<typeof SIGNS>
export type ElementId = ObjectValues<typeof ELEMENTS>
export type ModalityId = ObjectValues<typeof MODALITIES>
export type PlanetId = ObjectValues<typeof PLANETS>
export type PolarityId = ObjectValues<typeof POLARITIES>
export type BodyPartId = ObjectValues<typeof BODY_PARTS>
export type CharacterId = ObjectValues<typeof CHARACTERS>
export type SeasonId = ObjectValues<typeof SEASONS>
export type HorizonId = ObjectValues<typeof HORIZONS>
export type MeridianId = ObjectValues<typeof MERIDIANS>
export type HouseModalityId = ObjectValues<typeof HOUSE_MODALITIES>
export type PlanetTypeId = ObjectValues<typeof PLANET_TYPE>
export type AspectId = ObjectValues<typeof ASPECTS>
export type HouseId = (typeof HOUSES)[number]
export type HouseNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type SymbolId = SignId | PlanetId | AspectId | 'ascendant'
export type AspectTypeId = ObjectValues<typeof ASPECT_TYPE>
export type AspectQualityId = ObjectValues<typeof ASPECT_QUALITY>

export interface Sign {
  /**
   * The identifier of the zodiac sign.
   * Examples: "aries", "taurus". See the `SIGNS` constant.
   */
  id: SignId

  /**
   * The body part traditionally associated with the zodiac sign.
   * Examples: "head" for Aries, "throat" for Taurus.
   */
  bodyPart: BodyPartId

  /**
   * The figure the zodiac sign is named after.
   * Examples: "ram" for Aries, "bull" for Taurus.
   */
  character: CharacterId

  /**
   * The element of the zodiac sign, one of the four classical elements.
   * Signs of the same element form a triplicity.
   * Examples: "fire" for Aries, "earth" for Taurus. See the `ELEMENTS` constant.
   */
  element: ElementId

  /**
   * The glyph representing the zodiac sign.
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
   * The modality of the sign: cardinal, fixed or mutable.
   * Examples: "cardinal" for Aries, "fixed" for Taurus. See the `MODALITIES` constant.
   */
  modality: ModalityId

  /**
   * The position of the sign in the zodiac, from 1 for Aries to 12 for Pisces.
   */
  number: number

  /**
   * The polarity of the sign: positive for fire and air signs, negative for earth and water signs.
   * Examples: "positive" for Aries, "negative" for Taurus. See the `POLARITIES` constant.
   */
  polarity: PolarityId

  /**
   * The planets that rule the zodiac sign.
   * Examples: `{ modern: 'mars', traditional: 'mars' }` for Aries, `{ modern: 'pluto', traditional: 'mars' }` for Scorpio.
   */
  rulers: Rulers

  /**
   * The season in which the Sun is in the sign, in the Northern Hemisphere.
   * In the Southern Hemisphere the seasons are the other way around.
   * Examples: "spring" for Aries, "spring" for Taurus.
   */
  season: SeasonId
}

export interface House {
  /**
   * The identifier of the house.
   * Examples: "house-1", "house-2", ... "house-12".
   */
  id: HouseId

  /**
   * The element of the house's natural sign.
   * Example: "fire" for House 1 (Aries), "earth" for House 2 (Taurus).
   */
  element: ElementId

  /**
   * The side of the horizon the house is on.
   *
   * - **Below (Houses 1–6):** the lower half of the chart, from the Ascendant to the Descendant.
   * - **Above (Houses 7–12):** the upper half of the chart, from the Descendant to the Ascendant.
   */
  horizon: HorizonId

  /**
   * The side of the meridian the house is on.
   *
   * - **East (Houses 10–12 and 1–3):** the left half of the chart, around the Ascendant.
   * - **West (Houses 4–9):** the right half of the chart, around the Descendant.
   */
  meridian: MeridianId

  /**
   * The modality of the house, which repeats in this order from House 1:
   *
   * - **Angular (Houses 1, 4, 7, 10):** the houses that start at an angle of the chart.
   * - **Succedent (Houses 2, 5, 8, 11):** the houses that follow an angular house.
   * - **Cadent (Houses 3, 6, 9, 12):** the houses that come before the next angle.
   */
  modality: HouseModalityId

  /**
   * The number of the house, from 1 to 12, counted counterclockwise from the Ascendant.
   */
  number: HouseNumber

  /**
   * The quarter of the chart the house is in, divided by the horizon and the meridian.
   * Quadrant I holds Houses 1–3, Quadrant II Houses 4–6, Quadrant III Houses 7–9
   * and Quadrant IV Houses 10–12.
   */
  quadrant: 1 | 2 | 3 | 4

  /**
   * The planets that rule the house's natural sign.
   * Example: `{ modern: 'mars', traditional: 'mars' }` for House 1, `{ modern: 'pluto', traditional: 'mars' }` for House 8.
   */
  rulers: Rulers

  /**
   * The natural sign of the house: the sign with the same number.
   * Example: "aries" for House 1, "taurus" for House 2.
   */
  sign: SignId
}

/**
 * The planets that rule a sign, or a house through its natural sign.
 */
export interface Rulers {
  /**
   * The ruler in modern astrology, which gives the outer planets to Scorpio, Aquarius and Pisces.
   * Examples: "mars" for Aries, "pluto" for Scorpio.
   */
  modern: PlanetId

  /**
   * The ruler from before the discovery of the outer planets.
   * Same as `modern` except for Scorpio, Aquarius and Pisces.
   * Examples: "mars" for Scorpio, "saturn" for Aquarius, "jupiter" for Pisces.
   */
  traditional: PlanetId
}

export interface Planet {
  /**
   * The identifier of the celestial body.
   * Examples: "sun", "moon". See the `PLANETS` constant.
   */
  id: PlanetId

  /**
   * The glyph representing the celestial body.
   * Examples: "☉" for the Sun, "☽" for the Moon, "♂" for Mars.
   */
  glyph: string

  /**
   * The group the celestial body belongs to.
   * Examples: "luminary" for the Sun and the Moon, "personal" for Mercury, Venus and Mars.
   */
  type: PlanetTypeId
}

export interface Aspect {
  /**
   * The identifier of the aspect.
   * Examples: "conjunction", "trine", "semi-square". See the `ASPECTS` constant.
   */
  id: AspectId

  /**
   * The angle of the aspect in degrees.
   * Examples: 0 for Conjunction, 90 for Square, 120 for Trine, 180 for Opposition.
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

  /**
   * Whether the aspect is usually read as harmonious, disharmonious or neutral.
   * This varies between schools, especially for minor aspects.
   * Examples: "harmonious" for Trine, "disharmonious" for Square, "neutral" for Conjunction.
   */
  quality: AspectQualityId

  /**
   * Whether the aspect is a major or a minor one.
   * Examples: "major" for Square, "minor" for Quincunx.
   */
  type: AspectTypeId
}

type LabeledValues<T> = {
  [K in keyof T]: K extends 'id'
    ? T[K]
    : T[K] extends string
      ? string
      : T[K] extends object
        ? LabeledValues<T[K]>
        : T[K]
}

/**
 * An item with every identifier translated, as returned by {@link i18n.label | `i18n.label()`}.
 * The `id` is kept, and `name` holds its translation.
 */
export type Labeled<T extends { id: string }> = LabeledValues<T> & {
  /** The translation of the item's `id`. */
  name: string
}

export type Dictionary = {
  [key in
    | SignId
    | ElementId
    | ModalityId
    | PlanetId
    | PolarityId
    | BodyPartId
    | CharacterId
    | SeasonId
    | HorizonId
    | MeridianId
    | HouseModalityId
    | PlanetTypeId
    | HouseId
    | AspectId
    | AspectTypeId
    | AspectQualityId]: string
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
