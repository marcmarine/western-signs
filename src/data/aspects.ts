import type { Aspect } from '../definitions'
import { ASPECT_QUALITY, ASPECT_TYPE, ASPECTS } from './constants'

export const aspects: Aspect[] = [
  {
    id: ASPECTS.CONJUNCTION,
    angle: 0,
    glyph: '☌',
    harmonic: 1,
    type: ASPECT_TYPE.MAJOR,
    quality: ASPECT_QUALITY.NEUTRAL
  },
  {
    id: ASPECTS.SEMISEXTILE,
    angle: 30,
    glyph: '⚺',
    harmonic: 12,
    type: ASPECT_TYPE.MINOR,
    quality: ASPECT_QUALITY.HARMONIOUS
  },
  {
    id: ASPECTS.SEMISQUARE,
    angle: 45,
    glyph: '∠',
    harmonic: 8,
    type: ASPECT_TYPE.MINOR,
    quality: ASPECT_QUALITY.DISHARMONIOUS
  },
  {
    id: ASPECTS.SEXTILE,
    angle: 60,
    glyph: '⚹',
    harmonic: 6,
    type: ASPECT_TYPE.MAJOR,
    quality: ASPECT_QUALITY.HARMONIOUS
  },
  {
    id: ASPECTS.QUINTILE,
    angle: 72,
    glyph: 'Q',
    harmonic: 5,
    type: ASPECT_TYPE.MINOR,
    quality: ASPECT_QUALITY.HARMONIOUS
  },
  {
    id: ASPECTS.SQUARE,
    angle: 90,
    glyph: '□',
    harmonic: 4,
    type: ASPECT_TYPE.MAJOR,
    quality: ASPECT_QUALITY.DISHARMONIOUS
  },
  {
    id: ASPECTS.TRINE,
    angle: 120,
    glyph: '△',
    harmonic: 3,
    type: ASPECT_TYPE.MAJOR,
    quality: ASPECT_QUALITY.HARMONIOUS
  },
  {
    id: ASPECTS.SESQUISQUARE,
    angle: 135,
    glyph: '⚼',
    harmonic: 8,
    type: ASPECT_TYPE.MINOR,
    quality: ASPECT_QUALITY.DISHARMONIOUS
  },
  {
    id: ASPECTS.BIQUINTILE,
    angle: 144,
    glyph: 'bQ',
    harmonic: 5,
    type: ASPECT_TYPE.MINOR,
    quality: ASPECT_QUALITY.HARMONIOUS
  },
  {
    id: ASPECTS.QUINCUNX,
    angle: 150,
    glyph: '⚻',
    harmonic: 12,
    type: ASPECT_TYPE.MINOR,
    quality: ASPECT_QUALITY.DISHARMONIOUS
  },
  {
    id: ASPECTS.OPPOSITION,
    angle: 180,
    glyph: '☍',
    harmonic: 2,
    type: ASPECT_TYPE.MAJOR,
    quality: ASPECT_QUALITY.DISHARMONIOUS
  }
]
