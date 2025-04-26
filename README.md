# Western Signs

Simple interface for [western astrological](https://en.wikipedia.org/wiki/Western_astrology) signs.

[![NPM Version](https://img.shields.io/npm/v/western-signs)](https://www.npmjs.com/package/western-signs)
[![GitHub License](https://img.shields.io/github/license/marcmarine/western-signs)](LICENSE)
[![TypeDoc](https://img.shields.io/badge/documentation-western--signs-white.svg)](https://marcmarine.github.io/western-signs)

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

To use the `getSignByName` function, import it along with the `SIGNS` constant from the `western-signs` package:

```js
import { getSignByName, SIGNS } from 'western-signs'
```

Call the function with the desired astrological sign and optionally specify a language code. If no language code is provided, it defaults to English.

```js
const data = getSignByName(SIGNS.TAURUS)
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

## API Reference

For detailed API information, please check out the [documentation generated with TypeDoc](https://marcmarine.github.io/western-signs).

## License

MIT License © 2024 [Marc Mariné](https://github.com/marcmarine)
