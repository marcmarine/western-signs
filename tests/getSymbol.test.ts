import { describe, expect, test } from 'bun:test'
import planets from '@/data/planets'
import signs from '@/data/signs'
import type { Planets, Signs } from '@/src/definitions'
import { getSymbol } from '@/src/index'

describe('getSymbol', () => {
  test('should read an SVG as string for every sign', () => {
    ;[...Object.keys(signs), ...Object.keys(planets)].forEach(signName => {
      const svgString = getSymbol(signName as Signs | Planets)

      expect(svgString).toContain('<svg')
    })
  })

  test('should modify stroke and stroke-width', () => {
    ;[...Object.keys(signs), ...Object.keys(planets)].forEach(signName => {
      const svgString = getSymbol(signName as Signs | Planets, {
        stroke: 'red',
        strokeWidth: '3'
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
    expect(() => getSymbol('notexist' as Signs | Planets)).toThrow('Icon "notexist" not found.')
  })
})
