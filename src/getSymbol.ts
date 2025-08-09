import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Symbols } from './definitions'

export interface SymbolOptions {
  stroke?: string
  strokeWidth?: number | string
}

/**
 * Gets an SVG as a string or as a Data URL, with option to modify attributes.
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
  if (typeof window !== 'undefined') {
    return undefined
  }

  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const iconPath = path.join(__dirname, '../assets', `${symbolName}.svg`)

  if (!existsSync(iconPath)) {
    throw new Error(`Icon "${symbolName}" not found.`)
  }

  const svgString = readFileSync(iconPath, 'utf8')

  return createSymbol(svgString, options)
}

function createSymbol(svgString: string, options: SymbolOptions = {}) {
  let currentStroke = options.stroke
  let currentStrokeWidth = options.strokeWidth

  const setStroke = (stroke: string) => {
    currentStroke = stroke
    return api
  }

  const setStrokeWidth = (strokeWidth: number | string) => {
    currentStrokeWidth = strokeWidth
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
    return modifiedSvgString
  }

  const toDataURL = (): string => {
    const base64 = Buffer.from(toString()).toString('base64')
    return `data:image/svg+xml;base64,${base64}`
  }

  const api = {
    setStroke,
    setStrokeWidth,
    toString,
    toDataURL,
  }

  return api
}
