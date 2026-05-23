import { SYMBOLS } from './data/symbols'
import type { SymbolOptions, Symbols } from './definitions'

const DEFAULT_ATTRIBUTES = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': 1,
}

/**
 * Gets an SVG as a string or as a Data URL, with option to modify attributes.
 *
 * @param {Symbols} symbolName Name of the icon without extension .svg
 * @param {SymbolOptions} options Options to modify attributes or return as a Data URL
 * @returns SVG as string or Data URL
 *
 * @example
 * import { getSymbol, SIGNS } from 'western-signs'
 *
 * // Get the symbol with initial options
 * const symbol = getSymbol(SIGNS.TAURUS, { stroke: 'blue', stroke-width: 2 })
 *
 * // Log the modified SVG as a string
 * console.log(symbol.toString())
 *
 * // Log the modified SVG as a Data URL
 * console.log(symbol.toDataURL())
 *
 * @throws Will throw an error if the specified SVG file is not found
 */
export function getSymbol(symbolName: Symbols, options?: SymbolOptions) {
  const serializedPaths = SYMBOLS[symbolName as keyof typeof SYMBOLS]

  if (!serializedPaths) {
    throw new Error(`Icon "${symbolName}" not found.`)
  }

  return createSymbol(serializedPaths, options)
}

function createSymbol(paths: string, options: SymbolOptions = {}) {
  return {
    toString(): string {
      const { nonScalingStroke, ...attributes } = options

      const svgAttributes = Object.entries({
        ...DEFAULT_ATTRIBUTES,
        ...attributes,
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
      const base64 = Buffer.from(this.toString()).toString('base64')
      return `data:image/svg+xml;base64,${base64}`
    },
  }
}
