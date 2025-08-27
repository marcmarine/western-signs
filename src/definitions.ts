import type {
  ASPECTS,
  BODY_PARTS,
  CHARACTERS,
  ELEMENTS,
  HEMISPHERES,
  HOUSE_KEYWORDS,
  HOUSE_MODALITIES,
  HOUSE_TITLES,
  MODALITIES,
  PLANET_TYPE,
  PLANETS,
  POLARITIES,
  SEASONS,
  SIGNS,
} from '../data/constants'
import type { dictionaries } from '../data/dictionaries'

export type Language = keyof typeof dictionaries

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
export type HouseTitles = (typeof HOUSE_TITLES)[number]
export type HouseKeywords = (typeof HOUSE_KEYWORDS)[number]

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
   * The end date of the zodiac sign period.
   * This date marks the end of the zodiac sign's influence for the given year.
   * Examples: new Date(2020, 3, 20) for Aries (April 20, 2020), new Date(2020, 4, 21) for Taurus (May 21, 2020).
   */
  endDate: Date

  /**
   * The glyph representing the zodiac sign.
   * A symbolic character or drawing associated with the sign.
   * Examples: "♈" for Aries, "♉" for Taurus.
   */
  glyph: string

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
  name: string

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
   * The season in which the zodiac sign occurs.
   * Indicates the time of year the sign predominates.
   * Examples: "Spring" for Aries, "Spring" for Taurus.
   */
  season: string

  /**
   * The start date of the zodiac sign period.
   * This date marks the beginning of the zodiac sign's influence for the given year.
   * Examples: new Date(2020, 2, 20) for Aries (March 20, 2020), new Date(2020, 3, 21) for Taurus (April 21, 2020).
   */
  startDate: Date
}

export interface House {
  /**
   * Element associated with the house’s natural zodiac sign.
   *
   * Represents one of the four classical elements — Fire, Earth, Air, or Water — reflecting the essential nature and mode of expression of the house.
   *
   * Example: "Fire" for House 1 (Aries), "Earth" for House 2 (Taurus)
   */
  element: Elements

  /**
   * Hemisphere division based on the horizon line.
   *
   * - **Lower/Northern Hemisphere (Houses 1–6):** Known as the *Personal Houses*, these focus on individual development, personal identity, and foundational life needs.
   * - **Upper/Southern Hemisphere (Houses 7–12):** Known as the *Collective Houses*, these reflect relationships with others, society, and broader humanity.
   */
  hemisphere: Hemispheres

  /**
   * Key themes and associated concepts.
   *
   * Represents the core ideas or psychological themes governed by the house.
   * Example: ['Self-image', 'Identity', 'Impressions on others', 'Personality']
   */
  keywords: string[] | string // This type adds support for internal use

  /**
   * Number of the astrological house (1–12).
   *
   * Each house corresponds to a specific domain of life experience.
   * Example: 1 = Self and identity, 7 = Partnerships and relating.
   */
  number: number

  /**
   * Developmental phase grouping.
   *
   * - **Phase I (Houses 1–4):** Focus on self-awareness and personal foundation — the “me-in-here”.
   * - **Phase II (Houses 5–8):** Development of the autonomous self in relationship — the “me” meets the “you”.
   * - **Phase III (Houses 9–12):** Expansion of self toward collective consciousness and universal understanding.
   */
  phase: 1 | 2 | 3

  /**
   * Quadrant of the chart based on the intersection of horizon and meridian axes.
   *
   * - **Quadrant I (Houses 1–3):** Formation of personal identity through the body, possessions, and environment.
   * - **Quadrant II (Houses 4–6):** Further development of self via family, creativity, and refinement of skills.
   * - **Quadrant III (Houses 7–9):** Expansion through relationships, transformation, and new vision of self.
   * - **Quadrant IV (Houses 10–12):** Integration into society and pursuit of collective and spiritual purpose.
   */
  quadrant: 1 | 2 | 3 | 4

  /**
   * Ruling planet of the house.
   *
   * Indicates the primary planetary influence over the house’s themes.
   * Example: "Mars", "Venus"
   */
  rulingPlanet: string

  /**
   * Zodiac sign associated with the house.
   *
   * Reflects the natural energy or archetype that aligns with the house.
   * Example: "Aries", "Taurus"
   */
  sign: string

  /**
   * Title or name of the house.
   *
   * A formal or descriptive label that captures the house’s core function or domain.
   * Example: "The Individual Personality", "Values and Possessions"
   */
  title: string

  /**
   * Modalities of the houses (Angular, Succedent, Cadent).
   *
   * Traditional classification describing the house’s dynamic strength and function:
   * - **Angular (Houses 1, 4, 7, 10):** Active, initiating, most powerful.
   * - **Succedent (Houses 2, 5, 8, 11):** Stabilizing, sustaining what was initiated.
   * - **Cadent (Houses 3, 6, 9, 12):** Transitional, preparatory, often more internal or mental.
   */
  modality: HouseModalities
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

export type Translations = Record<Language, Sign>

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
    | HouseTitles
    | HouseKeywords]: string
}

export type Symbols = Signs | Planets | Aspects

export type Dictionaries = Record<Language, Dictionary>
