const LOCAL_DATE = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2}))?)?$/

const DAY = 24 * 60 * 60 * 1000

// Like `Date.UTC`, but without mapping years 0–99 to 1900–1999
function utc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number
): number {
  const date = new Date(0)
  date.setUTCFullYear(year, month - 1, day)
  date.setUTCHours(hour, minute, second, 0)

  return date.getTime()
}

function createFormatter(timeZone: string): Intl.DateTimeFormat {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      hourCycle: 'h23',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
  } catch {
    throw new Error(`Invalid time zone: ${timeZone}`)
  }
}

// Offset of the time zone from UTC at the given instant, in milliseconds
function offsetAt(formatter: Intl.DateTimeFormat, instant: number): number {
  const parts = Object.fromEntries(
    formatter
      .formatToParts(new Date(instant))
      .map(({ type, value }) => [type, Number(value)])
  )
  const wallTime = utc(
    parts.year,
    parts.month,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second
  )

  return wallTime - Math.floor(instant / 1000) * 1000
}

/**
 * Convert a local date and time in a time zone into the instant it refers to.
 *
 * A time that is skipped when the clocks go forward is moved forward by the
 * length of the gap, and a time that repeats when they go back resolves to its
 * first occurrence, as `Temporal`'s `'compatible'` disambiguation does.
 *
 * @param date - The local date, `YYYY-MM-DD`, optionally followed by a time, `THH:mm` or `THH:mm:ss`. Without a time, noon is used.
 * @param timeZone - An IANA time zone, e.g. `'Europe/Madrid'`.
 * @throws {Error} If the date or the time zone is invalid.
 * @returns The instant.
 */
export function fromLocal(date: string, timeZone: string): Date {
  const match = typeof date === 'string' ? LOCAL_DATE.exec(date) : null

  if (!match) throw new Error('Invalid date')

  const [, ...fields] = match
  const [year, month, day, hour = 12, minute = 0, second = 0] = fields
    .filter(Boolean)
    .map(Number)
  const wallTime = utc(year, month, day, hour, minute, second)
  const parsed = new Date(wallTime)

  // Reject dates that overflow into the next unit, such as February 30 or 25:00
  if (
    parsed.getUTCMonth() + 1 !== month ||
    parsed.getUTCDate() !== day ||
    parsed.getUTCHours() !== hour ||
    parsed.getUTCMinutes() !== minute ||
    parsed.getUTCSeconds() !== second
  ) {
    throw new Error('Invalid date')
  }

  const formatter = createFormatter(timeZone)

  // The offsets in effect around that time, assuming at most one transition within a day
  const offsetBefore = offsetAt(formatter, wallTime - DAY)
  const offsetAfter = offsetAt(formatter, wallTime + DAY)

  const candidates = [offsetBefore, offsetAfter]
    .map(offset => wallTime - offset)
    .filter(instant => offsetAt(formatter, instant) === wallTime - instant)

  // No candidate means the time falls in a gap: keep the offset from before it
  const instant =
    candidates.length > 0 ? Math.min(...candidates) : wallTime - offsetBefore

  return new Date(instant)
}
