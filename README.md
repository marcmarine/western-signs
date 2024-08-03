# Western Signs

Simple interface for [western astrological](https://en.wikipedia.org/wiki/Western_astrology) signs.

![NPM Version](https://img.shields.io/npm/v/western-signs)
![GitHub License](https://img.shields.io/github/license/marcmarine/western-signs)

![West Art](/WestArt.gif)

The **Western Signs** library provides detailed information about each astrological sign, including its `name`, `element`, `modality`, `rulingPlanet` and `glyph`, among other things. Additionally, you can specify the language for translations.

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
  name: 'Taurus',
  element: 'Earth',
  modality: 'Fixed',
  rulingPlanet: 'Venus',
  glyph: '♉'
  [...]
}
```

## License

MIT License © 2024 [Marc Mariné](https://github.com/marcmarine)
