const toRadians = (degrees: number) => (degrees * Math.PI) / 180

const normalize = (degrees: number) => ((degrees % 360) + 360) % 360

/**
 * Compute the apparent geocentric ecliptic longitude of the Sun with the
 * low-precision algorithm from Jean Meeus, *Astronomical Algorithms*, ch. 25.
 * Accurate to about 0.01°, roughly 15 minutes of the Sun's motion.
 *
 * @param date - The instant to compute the longitude for.
 * @throws {Error} If the date is invalid.
 * @returns The longitude in degrees, in the range [0, 360).
 */
export function sunLongitude(date: Date): number {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new Error('Invalid date')
  }

  // Julian centuries since J2000.0. The ~1 minute between TT and UT is ignored.
  const julianDay = date.getTime() / 86_400_000 + 2_440_587.5
  const t = (julianDay - 2_451_545) / 36_525

  const meanLongitude = 280.46646 + 36000.76983 * t + 0.0003032 * t ** 2
  const meanAnomaly = toRadians(
    357.52911 + 35999.05029 * t - 0.0001537 * t ** 2
  )
  const equationOfCenter =
    (1.914602 - 0.004817 * t - 0.000014 * t ** 2) * Math.sin(meanAnomaly) +
    (0.019993 - 0.000101 * t) * Math.sin(2 * meanAnomaly) +
    0.000289 * Math.sin(3 * meanAnomaly)
  const ascendingNode = toRadians(125.04 - 1934.136 * t)

  // Correct for nutation and aberration to get the apparent longitude
  return normalize(
    meanLongitude +
      equationOfCenter -
      0.00569 -
      0.00478 * Math.sin(ascendingNode)
  )
}
