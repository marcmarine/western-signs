import { dictionaries } from './data/dictionaries'
import type { Dictionary, Language } from './definitions'

/**
 * Translate every value of an item that matches a dictionary key, also inside nested objects,
 * keeping the rest unchanged. The `id` is kept as is, and its translation is added as `name`.
 */
export function translate<T extends { id: string }>(
  item: T,
  language: Language
): T & { name: string } {
  const dictionary = dictionaries.get(language)
  const translateValue = (value: unknown): unknown =>
    typeof value === 'object' && value !== null
      ? Object.fromEntries(
          Object.entries(value).map(([key, value]) => [
            key,
            translateValue(value)
          ])
        )
      : (dictionary?.[value as keyof Dictionary] ?? value)

  const { id, ...rest } = item

  return {
    id,
    name: dictionary?.[id as keyof Dictionary] ?? id,
    ...(translateValue(rest) as object)
  } as T & { name: string }
}
