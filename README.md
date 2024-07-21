# Western signs

Simple interface for [western astrological](https://en.wikipedia.org/wiki/Western_astrology) signs.

The Western Signs library retrieves detailed information about a specific astrological sign, including its name, element, modality, ruling planet, symbol, etc. You can also specify the language for translations.

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
  symbol: '♉'
}
```

## License

MIT License © 2024 [Marc Mariné](https://github.com/marcmarine)
