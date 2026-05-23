import { describe, expect, it } from 'bun:test'
import { ASPECTS } from '@/data/constants'
import planets from '@/data/planets'
import signs from '@/data/signs'
import { SYMBOLS } from '@/data/symbols'
import type { Aspects, Planets, Signs, Symbols } from '@/index'
import { getSymbol } from '@/index'

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
    (symbolName: Symbols) => {
      const symbol = getSymbol(symbolName)

      const svgString = symbol?.toString()

      expect(svgString).toContain('<svg')
      expect(svgString).toContain('stroke="currentColor"')
      expect(svgString).toContain('stroke-width="1"')
    },
  )

  it.each(symbolNames)(
    'should modify stroke and stroke-width for symbol "%s"',
    (symbolName: Symbols) => {
      const options = {
        stroke: 'red',
        'stroke-width': '3',
      }
      const symbol = getSymbol(symbolName, options)

      const svgString = symbol?.toString()

      expect(svgString).toContain(`stroke="${options.stroke}"`)
      expect(svgString).toContain(`stroke-width="${options['stroke-width']}"`)
    },
  )

  it.each(symbolNames)(
    'should modify width and height for symbol "%s"',
    (symbolName: Symbols) => {
      const options = {
        width: '32',
        height: '32',
      }
      const symbol = getSymbol(symbolName, options)

      const svgString = symbol?.toString()

      expect(svgString).toContain(`width="${options.width}"`)
      expect(svgString).toContain(`height="${options.height}"`)
    },
  )

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
})
