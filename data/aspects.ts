import type { Aspect } from "@/src/definitions";
import { ASPECT_QUALITY, ASPECT_TYPE, ASPECTS } from "./constants";

export const aspects: Aspect[] = [
  { name: ASPECTS.CONJUNCTION, angle: 0, type: ASPECT_TYPE.MAJOR, quality: ASPECT_QUALITY.NEUTRAL },
  { name: ASPECTS.SEMISEXTILE, angle: 30, type: ASPECT_TYPE.MINOR, quality: ASPECT_QUALITY.HARMONIOUS },
  { name: ASPECTS.SEXTILE, angle: 60, type: ASPECT_TYPE.MAJOR, quality: ASPECT_QUALITY.HARMONIOUS},
  { name: ASPECTS.QUADRATURE, angle: 90, type: ASPECT_TYPE.MAJOR, quality: ASPECT_QUALITY.DISHARMONIOUS },
  { name: ASPECTS.TRIGONE, angle: 120, type: ASPECT_TYPE.MAJOR, quality: ASPECT_QUALITY.HARMONIOUS},
  { name: ASPECTS.QUINCUNX, angle: 150, type: ASPECT_TYPE.MINOR, quality: ASPECT_QUALITY.DISHARMONIOUS },
  { name: ASPECTS.OPPOSITION, angle: 180, type: ASPECT_TYPE.MAJOR, quality: ASPECT_QUALITY.DISHARMONIOUS },
]
