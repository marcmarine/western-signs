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
      const symbol = getSymbol(symbolName as Symbols)
      const svgString = symbol?.toString()

      expect(svgString).toContain('<svg')
      expect(svgString).toContain('stroke="currentColor"')
      expect(svgString).toContain('stroke-width="1"')
    })
  })

  test('should modify stroke and stroke-width correctly', () => {
    symbolNames.forEach(symbolName => {
      const options = {
        stroke: 'red',
        strokeWidth: '3',
      }
      const symbol = getSymbol(symbolName as Symbols, options)

      const svgString = symbol?.toString()

      expect(svgString).toContain(`stroke="${options.stroke}"`)
      expect(svgString).toContain(`stroke-width="${options.strokeWidth}"`)
    })
  })

  test('should return as Data URL (base64)', () => {
    const symbol = getSymbol('taurus')

    const dataUrl = symbol?.toDataURL()

    expect(dataUrl?.startsWith('data:image/svg+xml;base64,')).toBe(true)
  })

  test('should throw an error if the file does not exist', () => {
    expect(() => getSymbol('notexist' as Symbols)).toThrow(
      'Icon "notexist" not found.',
    )
  })

  test('should allow for method chaining', () => {
    const symbol = getSymbol('taurus')
    const modifiedSymbol = symbol?.setStroke('green').setStrokeWidth('2')

    const svgString = modifiedSymbol?.toString()

    expect(svgString).toContain('stroke="green"')
    expect(svgString).toContain('stroke-width="2"')
  })
})
