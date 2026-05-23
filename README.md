# Western ✨ Signs

Simple interface for [western astrological](https://en.wikipedia.org/wiki/Western_astrology) signs.

[![NPM Version](https://img.shields.io/npm/v/western-signs)](https://www.npmjs.com/package/western-signs)
[![GitHub License](https://img.shields.io/github/license/marcmarine/western-signs)](LICENSE)
[![View Changelog](https://img.shields.io/badge/view-CHANGELOG.md-red.svg)](https://github.com/marcmarine/western-signs/releases)
[![TypeDoc](https://img.shields.io/badge/view-docs-yellow.svg)](https://marcmarine.github.io/western-signs)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/western-signs)

The **Western Signs** library provides detailed information about each astrological sign, including its `name`, `element`, `modality`, `rulingPlanet` and `glyph`, among other things. Additionally, you can specify the language for translations.

<details close>
<summary>WordArt</summary>

![West Art](https://github.com/marcmarine/western-signs/raw/main/WestArt.gif)

</details>

## Installation

To install dependencies:

```bash
npm install western-signs
```

## Usage

To use the `getSign` function, import it along with the `SIGNS` constant from the `western-signs` package:

```js
import { getSign, SIGNS } from "western-signs";
```

Call the function with the desired astrological sign and optionally specify a language code. If no language code is provided, it defaults to English.

```js
const data = getSign(SIGNS.TAURUS);
```

It should returns an object with the following properties:

```js
{
  bodyPart: 'Throat',
  character: 'Bull',
  element: 'Earth',
  endDate: 2020-05-20T22:00:00.000Z,
  glyph: '♉',
  modality: 'Fixed',
  name: 'Taurus',
  number: 2,
  pole: 'Negative',
  rulingPlanet: 'Venus',
  season: 'Spring',
  startDate: 2020-04-20T22:00:00.000Z
}
```

#### Translations

By default, only English is included. Other languages must be explicitly imported to be available.

To enable a language, import its side-effect module:

```js
import "western-signs/locale/es";
```

After importing, the language becomes available immediately:

```js
const sign = getSign(SIGNS.TAURUS, "es");
```

### Symbols

The `getSymbol` function allows you to retrieve SVG representations of astrological symbols, with options to customize their appearance.

| parameter        | type                            | default          | description                                                    |
| ---------------- | ------------------------------- | ---------------- | -------------------------------------------------------------- |
| name             | `string`                        | —                | Symbol identifier. See constants `PLANETS`, `SIGNS`, `ASPECTS` |
| width            | `number`                        | `24`             | Width in pixels of the generated SVG                           |
| height           | `number`                        | `24`             | Height in pixels                                               |
| stroke           | `string`                        | `'currentColor'` | Stroke color as hex, rgb, or CSS variable                      |
| stroke-width     | `number`                        | `1`              | Stroke thickness in logical pixels                             |
| stroke-linecap   | `'butt' \| 'round' \| 'square'` | `'round'`        | Shape of stroke endpoints                                      |
| stroke-linejoin  | `'miter' \| 'round' \| 'bevel'` | `'round'`        | Shape of stroke corners and joins                              |
| nonScalingStroke | `boolean`                       | `true`           | Prevents stroke from scaling when the SVG is resized           |

```js
import { getSymbol, SIGNS } from "western-signs";

const symbol = getSymbol(SIGNS.TAURUS, {
  width: 24,
  height: 24,
  stroke: "currentColor",
  "stroke-width": 1,
});

console.log(symbol.toString());
// Outputs: An SVG string with customized attributes

console.log(symbol.toDataURL());
// Outputs: A Data URL representation of the SVG
```

#### Available symbols

Three groups of exported constants. Use the identifier with getSymbol().

| group   | symbols                                                                                                          |
| ------- | ---------------------------------------------------------------------------------------------------------------- |
| PLANETS | `SUN` `MOON` `MERCURY` `VENUS` `MARS` `JUPITER` `SATURN` `URANUS` `NEPTUNE` `PLUTO`                              |
| SIGNS   | `ARIES` `TAURUS` `GEMINI` `CANCER` `LEO` `VIRGO` `LIBRA` `SCORPIO` `SAGITTARIUS` `CAPRICORN` `AQUARIUS` `PISCES` |
| ASPECTS | `CONJUNCTION` `SEXTILE` `SQUARE` `TRINE` `OPPOSITION`                                                            |

### Internationalization

You can easily translate aspects and other astrology-related terms using the `t` function provided by the library. The `t` function takes template strings and values to be translated based on the current language setting.

To translate an aspect into the current language:

```js
import { ASPECTS, i18n } from "western-signs";

// Importing a locale registers it globally
import "western-signs/locale/es";

const aspect = i18n.t`${ASPECTS.CONJUNCTION}`;
console.log(aspect);
// Output: Conjunction
```

To change the language, use the `setLanguage` function:

```js
i18n.setLanguage("es");
const aspectInSpanish = i18n.t`${ASPECTS.CONJUNCTION}`;
console.log(aspectInSpanish);
// Output: Conjunción
```

#### Available languages

Languages are opt-in and must be imported explicitly:

- `western-signs/locale/en` — English (default)
- `western-signs/locale/es` — Spanish
- `western-signs/locale/ca` — Catalan

## API Reference

### Functions

- [getHouses](https://marcmarine.github.io/western-signs/functions/getHouses)
- [getPlanet](https://marcmarine.github.io/western-signs/functions/getPlanet)
- [getPlanets](https://marcmarine.github.io/western-signs/functions/getPlanets)
- [getSignByDate](https://marcmarine.github.io/western-signs/functions/getSignByDate)
- [getSignByName](https://marcmarine.github.io/western-signs/functions/getSignByName)
- [getSigns](https://marcmarine.github.io/western-signs/functions/getSigns)
- [getSymbol](https://marcmarine.github.io/western-signs/functions/getSymbol)

### Interfaces

- [Aspect](https://marcmarine.github.io/western-signs/interfaces/Aspect)
- [House](https://marcmarine.github.io/western-signs/interfaces/House)
- [Planet](https://marcmarine.github.io/western-signs/interfaces/Planet)
- [Sign](https://marcmarine.github.io/western-signs/interfaces/Sign)

For more detailed API information, please check out the [documentation](https://marcmarine.github.io/western-signs).

## License

MIT License © 2024 [Marc Mariné](https://github.com/marcmarine)
