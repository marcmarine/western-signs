import { describe, expect, it, test } from 'bun:test'
import { ASPECTS } from '@/data/constants'
import planets from '@/data/planets'
import signs from '@/data/signs'
import { getSymbol, type Symbols } from '@/src/index'
import { capitalizeString } from '@/src/utils'

const symbolNames = [
  ...Object.keys(signs),
  ...Object.keys(planets),
  ...Object.values(ASPECTS),
]

describe('getSymbol', () => {
  describe.each(symbolNames)('should read an SVG as string for', symbolName => {
    it(`${capitalizeString(symbolName)}`, () => {
      const svgString = getSymbol(symbolName as Symbols)

      expect(svgString).toContain('<svg')
      expect(svgString).toContain('stroke="currentColor"')
      expect(svgString).toContain('stroke-width="1"')
    })
  })

  test('should modify stroke and stroke-width', () => {
    symbolNames.forEach(symbolName => {
      const svgString = getSymbol(symbolName as Symbols, {
        stroke: 'red',
        strokeWidth: '3',
      })

      expect(svgString).toContain('stroke="red"')
      expect(svgString).toContain('stroke-width="3"')
    })
  })

  test('should return as Data URL (base64)', () => {
    const dataUrl = getSymbol('taurus', { dataUrl: true }) as string

    expect(dataUrl.startsWith('data:image/svg+xml;base64,')).toBe(true)
  })

  test('should throw an error if the file does not exist', () => {
    expect(() => getSymbol('notexist' as Symbols)).toThrow(
      'Icon "notexist" not found.',
    )
  })
})
