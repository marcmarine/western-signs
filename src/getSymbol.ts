import { SYMBOLS } from '@/data/symbols'
import type { SymbolOptions, Symbols } from './definitions'

/**
 * Gets an SVG as a string or as a Data URL, with option to modify attributes.
 *
 * @param {Symbols} symbolName Name of the icon without extension .svg
 * @param {SymbolOptions} options Options to modify attributes or return as a Data URL
 * @returns SVG as string or Data URL
 *
 * @example
 * import { getSymbol } from 'western-signs'
 *
 * // Get the symbol with initial options
 * const initialSymbol = getSymbol('taurus', { stroke: 'blue', strokeWidth: 2 })
 * // Modify attributes using method chaining
 * const modifiedSymbol = initialSymbol.setStroke('green').setStrokeWidth(3)
 *
 * // Log the modified SVG as a string
 * console.log(symbol.toString())
 *
 * // Log the modified SVG as a Data URL
 * console.log(symbol.toDataURL())
 *
 * @throws Will throw an error if the specified SVG file is not found
 */
export function getSymbol(symbolName: Symbols, options: SymbolOptions = {}) {
  const base64Content = SYMBOLS[symbolName]
  if (!base64Content) {
    throw new Error(`Icon "${symbolName}" not found.`)
  }
  const svgString = atob(base64Content)

  return createSymbol(svgString, options)
}

function createSymbol(svgString: string, options: SymbolOptions = {}) {
  let currentStroke = options.stroke
  let currentStrokeWidth = options.strokeWidth
  let currentWidth = options.width
  let currentHeight = options.height

  const setStroke = (stroke: string) => {
    currentStroke = stroke
    return api
  }

  const setStrokeWidth = (strokeWidth: number | string) => {
    currentStrokeWidth = strokeWidth
    return api
  }

  const setWidth = (width: number | string) => {
    currentWidth = width
    return api
  }

  const setHeight = (height: number | string) => {
    currentHeight = height
    return api
  }

  const toString = (): string => {
    let modifiedSvgString = svgString
    if (currentStroke) {
      modifiedSvgString = modifiedSvgString.replace(
        /stroke="[^"]*"/g,
        `stroke="${currentStroke}"`,
      )
    }
    if (currentStrokeWidth) {
      modifiedSvgString = modifiedSvgString.replace(
        /stroke-width="[^"]*"/g,
        `stroke-width="${currentStrokeWidth}"`,
      )
    }
    if (currentWidth) {
      modifiedSvgString = modifiedSvgString.replace(
        /(\s)width="[^"]*"/g,
        `$1width="${currentWidth}"`,
      )
    }
    if (currentHeight) {
      modifiedSvgString = modifiedSvgString.replace(
        /height="[^"]*"/g,
        `height="${currentHeight}"`,
      )
    }
    return modifiedSvgString
  }

  const toDataURL = (): string => {
    const base64 = Buffer.from(toString()).toString('base64')
    return `data:image/svg+xml;base64,${base64}`
  }

  const api = {
    setStroke,
    setStrokeWidth,
    setWidth,
    setHeight,
    toString,
    toDataURL,
  }

  return api
}
