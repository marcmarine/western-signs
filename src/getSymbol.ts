import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Signs } from './definitions'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export interface SymbolOptions {
  dataUrl?: boolean
  stroke?: string
  strokeWidth?: number | string
}

/**
 * Gets an SVG as a string or as a Data URL, with option to modify attributes.
 * @param {Signs} signName Name of the icon without extension .svg
 * @param {SymbolOptions} options Options to modify attributes or return as a Data URL
 * @returns SVG as string or Data URL
 */
export function getSymbol(
  signName: Signs,
  options: SymbolOptions = {},
): string | undefined {
  if (typeof window !== 'undefined') {
    return
  }

  const iconPath = path.join(__dirname, '../assets', `${signName}.svg`)

  if (!existsSync(iconPath)) {
    throw new Error(`Icon "${signName}" not found.`)
  }

  let svgString = readFileSync(iconPath, 'utf8')

  if (options.stroke) {
    svgString = svgString.replace(
      /stroke="[^"]*"/g,
      `stroke="${options.stroke}"`,
    )
  }

  if (options.strokeWidth) {
    svgString = svgString.replace(
      /stroke-width="[^"]*"/g,
      `stroke-width="${Number(options.strokeWidth)}"`,
    )
  }

  if (options.dataUrl) {
    const base64 = Buffer.from(svgString).toString('base64')
    return `data:image/svg+xml;base64,${base64}`
  }

  return svgString
}
