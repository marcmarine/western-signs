import { SYMBOLS } from './data/symbols'
import type { SymbolId, SymbolOptions } from './definitions'

const DEFAULT_ATTRIBUTES = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 1
}

/**
 * Gets the SVG of a sign, planet, aspect or angle, as a string or as a Data URL.
 *
 * @param {SymbolId} symbolName The identifier of the symbol, e.g. `SIGNS.TAURUS` or `'taurus'`
 * @param {SymbolOptions} options Attributes of the SVG, such as its size or stroke
 * @returns An object with `toString()` for the SVG and `toDataURL()` for it as a Data URL
 *
 * @example
 * import { getSymbol, SIGNS } from 'western-signs'
 *
 * // Get the symbol with initial options
 * const symbol = getSymbol(SIGNS.TAURUS, { stroke: 'blue', strokeWidth: 2 })
 *
 * // Log the modified SVG as a string
 * console.log(symbol.toString())
 *
 * // Log the modified SVG as a Data URL
 * console.log(symbol.toDataURL())
 *
 * @throws {Error} If there is no symbol with that identifier
 */
export function getSymbol(symbolName: SymbolId, options?: SymbolOptions) {
  const serializedPaths = SYMBOLS[symbolName as keyof typeof SYMBOLS]

  if (!serializedPaths) {
    throw new Error(`Icon "${symbolName}" not found.`)
  }

  return createSymbol(serializedPaths, options)
}

function createSymbol(paths: string, options: SymbolOptions = {}) {
  return {
    toString(): string {
      const { nonScalingStroke, strokeWidth, ...attributes } = options

      const svgAttributes = Object.entries({
        ...DEFAULT_ATTRIBUTES,
        ...attributes,
        ...(strokeWidth !== undefined && { 'stroke-width': strokeWidth })
      })
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')

      const pathAttributes = nonScalingStroke
        ? ' vector-effect="non-scaling-stroke"'
        : ''

      const svgPaths = paths
        .split(',')
        .filter(Boolean)
        .map(d => `<path d="${d}"${pathAttributes} />`)
        .join('')

      return `<svg ${svgAttributes}>${svgPaths}</svg>`
    },
    toDataURL(): string {
      return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        this.toString()
      )}`
    }
  }
}
