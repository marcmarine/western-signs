import type {
  BODY_PARTS,
  CHARACTERS,
  ELEMENTS,
  MODALITIES,
  PLANETS,
  POLARITIES,
  SEASONS,
  SIGNS
} from '../data/constants'
import { dictionaries } from '../data/dictionaries'

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

export interface Sign extends Record<string, any> {
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
  element: string

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

export type Translations = Record<Language, Sign>
export type Dictionary = Record<
  | Signs
  | Elements
  | Modalities
  | Planets
  | Polarities
  | BodyParts
  | Characters
  | Seasons,
  string
>
export type Dictionaries = Record<Language, Dictionary>
