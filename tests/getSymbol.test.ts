import { describe, expect, it } from 'bun:test'
import { ASPECTS } from '@/data/constants'
import planets from '@/data/planets'
import signs from '@/data/signs'
import { SYMBOLS } from '@/data/symbols'
import type { AspectId, PlanetId, SignId, SymbolId } from '@/index'
import { getSymbol } from '@/index'

const symbolNames: SymbolId[] = [
  ...(Object.keys(signs) as SignId[]),
  ...(Object.keys(planets) as PlanetId[]),
  ...(Object.values(ASPECTS) as AspectId[]),
  'ascendant',
]

describe('getSymbol', () => {
  it('symbolNames should include all SYMBOLS keys', () => {
    const allSymbols = Object.keys(SYMBOLS).sort() as SymbolId[]
    const testedSymbols = symbolNames.slice().sort()

    expect(testedSymbols).toEqual(allSymbols)
  })

  it.each(symbolNames)(
    'should read an SVG string for symbol "%s"',
    (symbolName: SymbolId) => {
      const symbol = getSymbol(symbolName)

      const svgString = symbol?.toString()

      expect(svgString).toContain('<svg')
      expect(svgString).toContain('stroke="currentColor"')
      expect(svgString).toContain('stroke-width="1"')
    },
  )

  it.each(symbolNames)(
    'should modify stroke and stroke width for symbol "%s"',
    (symbolName: SymbolId) => {
      const options = {
        stroke: 'red',
        strokeWidth: '3',
      }
      const symbol = getSymbol(symbolName, options)

      const svgString = symbol?.toString()

      expect(svgString).toContain(`stroke="${options.stroke}"`)
      expect(svgString).toContain(`stroke-width="${options.strokeWidth}"`)
      expect(svgString).not.toContain('strokeWidth')
    },
  )

  it('should write the stroke width once, replacing the default', () => {
    const svgString = getSymbol('taurus', { strokeWidth: 2 }).toString()

    expect(svgString.match(/stroke-width=/g)).toHaveLength(1)
    expect(svgString).toContain('stroke-width="2"')
  })

  it('should add vector-effect to every path with nonScalingStroke', () => {
    const svgString = getSymbol('taurus', { nonScalingStroke: true }).toString()

    expect(svgString).toContain('vector-effect="non-scaling-stroke"')
    expect(svgString).not.toContain('nonScalingStroke')
  })

  it.each(symbolNames)(
    'should modify width and height for symbol "%s"',
    (symbolName: SymbolId) => {
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

  it('should return as Data URL', () => {
    const symbol = getSymbol('taurus')

    const dataUrl = symbol?.toDataURL()

    expect(dataUrl?.startsWith('data:image/svg+xml;charset=utf-8,')).toBe(true)
  })

  it('should throw an error if the file does not exist', () => {
    expect(() => getSymbol('notexist' as SymbolId)).toThrow(
      'Icon "notexist" not found.',
    )
  })
})
