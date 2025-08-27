import { describe, expect, it } from 'bun:test'
import { ASPECTS } from '@/data/constants'
import planets from '@/data/planets'
import signs from '@/data/signs'
import { SYMBOLS } from '@/data/symbols'
import type { Aspects, Planets, Signs, Symbols } from '@/src/index'
import { getSymbol } from '@/src/index'

const symbolNames: Symbols[] = [
  ...(Object.keys(signs) as Signs[]),
  ...(Object.keys(planets) as Planets[]),
  ...(Object.values(ASPECTS) as Aspects[]),
  'ascendant',
]

describe('getSymbol', () => {
  it('symbolNames should include all SYMBOLS keys', () => {
    const allSymbols = Object.keys(SYMBOLS).sort() as Symbols[]
    const testedSymbols = symbolNames.slice().sort()

    expect(testedSymbols).toEqual(allSymbols)
  })

  it.each(symbolNames)(
    'should read an SVG string for symbol "%s"',
    symbolName => {
      const symbol = getSymbol(symbolName as Symbols)

      const svgString = symbol?.toString()

      expect(svgString).toContain('<svg')
      expect(svgString).toContain('stroke="currentColor"')
      expect(svgString).toContain('stroke-width="1"')
    },
  )

  it('should modify stroke and stroke-width correctly', () => {
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

  it('should return as Data URL (base64)', () => {
    const symbol = getSymbol('taurus')

    const dataUrl = symbol?.toDataURL()

    expect(dataUrl?.startsWith('data:image/svg+xml;base64,')).toBe(true)
  })

  it('should throw an error if the file does not exist', () => {
    expect(() => getSymbol('notexist' as Symbols)).toThrow(
      'Icon "notexist" not found.',
    )
  })

  it('should allow for method chaining', () => {
    const symbol = getSymbol('taurus')
    const modifiedSymbol = symbol?.setStroke('green').setStrokeWidth('2')

    const svgString = modifiedSymbol?.toString()

    expect(svgString).toContain('stroke="green"')
    expect(svgString).toContain('stroke-width="2"')
  })
})
