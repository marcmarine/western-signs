import { describe, expect, test } from 'bun:test'
import signs from '@/data/signs'
import type { Signs } from '@/src/definitions'
import { getSymbol } from '@/src/index'

describe('getSymbol', () => {
  test('should read an SVG as string for every sign', () => {
    const signNames = Object.keys(signs)

    signNames.forEach(signName => {
      const svgString = getSymbol(signName as Signs)

      expect(svgString).toContain('<svg')
    })
  })

  test('should modify stroke and stroke-width', () => {
    const signNames = Object.keys(signs)

    signNames.forEach(signName => {
      const svgString = getSymbol(signName as Signs, {
        stroke: 'red',
        strokeWidth: '3',
      })

      expect(svgString).toContain('stroke="red"')
      expect(svgString).toContain('stroke-width="3"')
    })
  })

  test('should return as Data URL (base64)', () => {
    const dataUrl = getSymbol('taurus', { dataUrl: true })

    expect(dataUrl.startsWith('data:image/svg+xml;base64,')).toBe(true)
  })

  test('should throw an error if the file does not exist', () => {
    expect(() => getSymbol('notexist' as Signs)).toThrow(
      'Icon "notexist" not found.',
    )
  })
})
