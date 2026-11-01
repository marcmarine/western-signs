# Western ✨ Signs

Simple interface for [western astrological](https://en.wikipedia.org/wiki/Western_astrology) signs.

[![NPM Version](https://img.shields.io/npm/v/western-signs)](https://www.npmjs.com/package/western-signs)
[![GitHub License](https://img.shields.io/github/license/marcmarine/western-signs)](LICENSE)
[![View Changelog](https://img.shields.io/badge/view-CHANGELOG.md-red.svg)](https://github.com/marcmarine/western-signs/releases)
[![TypeDoc](https://img.shields.io/badge/view-docs-yellow.svg)](https://marcmarine.github.io/western-signs)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/western-signs)

The **Western Signs** library provides the data of western astrology: signs, planets, houses and aspects, with their elements, modalities, rulers, dignities and glyphs, among other things. Values are identifiers you can compare and translate into several languages. It also finds the sign of any position along the ecliptic, and the Sun's position for any date.

<details close>
<summary>WordArt</summary>

![West Art](https://github.com/marcmarine/western-signs/raw/main/WestArt.gif)

</details>

## Installation

```bash
npm install western-signs
```

> [!NOTE]
> Coming from version 1? See [Migrating from 1.x](#migrating-from-1x).

## Usage

### Zodiac

The `zodiac` object groups signs, planets, houses and aspects under a single API. Every group uses the same methods: `get` returns one item by its identifier, or by number for houses, and `all` returns the full list.

```js
import { zodiac, ASPECTS, SIGNS, PLANETS } from 'western-signs'

zodiac.signs.get(SIGNS.TAURUS)
zodiac.signs.all()

zodiac.planets.get(PLANETS.VENUS)
zodiac.planets.all()

zodiac.houses.get(7)
zodiac.houses.all()

zodiac.aspects.get(ASPECTS.TRINE)
zodiac.aspects.all()
```

Values are identifiers, the same in every language, so you can compare them with the exported constants. To show them, translate them with [`i18n.label()`](#translations).

```js
import { ELEMENTS } from 'western-signs'

zodiac.signs.get(SIGNS.TAURUS).element === ELEMENTS.EARTH
// Output: true
```

`get` also accepts any string, e.g. one read from a URL. Then it returns `undefined` if the string is not an identifier, and its type says so:

```ts
zodiac.signs.get(SIGNS.TAURUS) // Sign
zodiac.signs.get(params.sign) // Sign | undefined
```

The returned objects are frozen: copy one before changing it.

### Signs

```js
zodiac.signs.get(SIGNS.TAURUS)
// Output:
{
  id: 'taurus',
  bodyPart: 'throat',
  character: 'bull',
  element: 'earth',
  glyph: '♉',
  longitude: { start: 30, end: 60 },
  modality: 'fixed',
  number: 2,
  polarity: 'negative',
  rulers: { modern: 'venus', traditional: 'venus' },
  season: 'spring'
}
```

| property    | description                                                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `element`   | `fire`, `earth`, `air` or `water`. Signs of the same element form a triplicity                                                              |
| `modality`  | `cardinal`, `fixed` or `mutable`                                                                                                            |
| `polarity`  | `positive` for fire and air signs, `negative` for earth and water signs                                                                     |
| `rulers`    | The modern ruler and the traditional one, from before the discovery of the outer planets. They differ only for Scorpio, Aquarius and Pisces |
| `longitude` | The range of the sign along the ecliptic, in degrees from 0° Aries, the start included and the end excluded                                 |
| `season`    | The season in the Northern Hemisphere. In the Southern Hemisphere it is the other way around                                                |
| `bodyPart`  | The body part traditionally associated with the sign                                                                                        |
| `character` | The figure the sign is named after                                                                                                          |

#### Sign at a longitude

To find the sign of a position calculated elsewhere, e.g. a planet or a house cusp from an ephemeris, pass its ecliptic longitude:

```js
zodiac.signs.at(45.48).id
// Output: 'taurus'

zodiac.signs.degree(45.48)
// Output: 15.48 (degrees within the sign)
```

Longitudes outside 0–360, such as `-10` or `370`, are turned into that range.

### Planets

```js
zodiac.planets.get(PLANETS.MARS)
// Output:
{
  id: 'mars',
  glyph: '♂',
  type: 'personal',
  dignities: {
    domicile: { modern: ['aries'], traditional: ['aries', 'scorpio'] },
    detriment: { modern: ['libra'], traditional: ['taurus', 'libra'] },
    exaltation: 'capricorn',
    fall: 'cancer'
  }
}
```

`type` is `luminary`, `personal`, `social` or `transpersonal`.

`dignities` lists the signs where the planet is strong or weak by nature:

| dignity      | description                                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `domicile`   | The signs it rules, following each sign's `rulers`, in modern and in traditional astrology                              |
| `detriment`  | The signs opposite its domicile                                                                                         |
| `exaltation` | The sign where it is exalted, following the tradition. The outer planets have none (`null`), as there is no agreement |
| `fall`       | The sign opposite its exaltation                                                                                        |

#### Dignities of a planet in a sign

`zodiac.dignities()` tells which of them a planet has in a given sign. It returns a list, because a planet can have more than one: Mercury is both in its domicile and exalted in Virgo. An empty list means the planet is peregrine.

```js
zodiac.dignities(PLANETS.MARS, SIGNS.CAPRICORN)
// Output: ['exaltation']

zodiac.dignities(PLANETS.MARS, SIGNS.CANCER)
// Output: ['fall']

zodiac.dignities(PLANETS.MERCURY, SIGNS.VIRGO)
// Output: ['domicile', 'exaltation']

zodiac.dignities(PLANETS.MARS, SIGNS.GEMINI)
// Output: []
```

The domicile and the detriment follow the modern rulers unless you ask for the traditional ones:

```js
zodiac.dignities(PLANETS.MARS, SIGNS.SCORPIO)
// Output: []

zodiac.dignities(PLANETS.MARS, SIGNS.SCORPIO, { rulers: 'traditional' })
// Output: ['domicile']
```

### Houses

```js
zodiac.houses.get(10)
// Output:
{
  id: 'house-10',
  element: 'earth',
  horizon: 'above',
  meridian: 'east',
  modality: 'angular',
  number: 10,
  quadrant: 4,
  rulers: { modern: 'saturn', traditional: 'saturn' },
  sign: 'capricorn'
}
```

| property   | description                                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------------- |
| `sign`     | The natural sign of the house, the one with the same number. `element` and `rulers` come from it                   |
| `modality` | `angular` (houses 1, 4, 7, 10), `succedent` (2, 5, 8, 11) or `cadent` (3, 6, 9, 12)                                |
| `horizon`  | `below` the horizon (houses 1–6) or `above` it (7–12)                                                              |
| `meridian` | `east` of the meridian, around the Ascendant (houses 10–12 and 1–3), or `west` of it, around the Descendant (4–9) |
| `quadrant` | The quarter of the chart, from 1 (houses 1–3) to 4 (houses 10–12)                                                  |

### Aspects

```js
zodiac.aspects.get(ASPECTS.TRINE)
// Output:
{
  id: 'trine',
  angle: 120,
  glyph: '△',
  harmonic: 3,
  type: 'major',
  quality: 'harmonious'
}
```

| property   | description                                                                                                                       |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `angle`    | The angle in degrees, from 0 (conjunction) to 180 (opposition)                                                                    |
| `harmonic` | The number the circle is divided by to get the aspect's family: 4 for the square (90°), 8 for the semi-square and sesqui-square   |
| `type`     | `major` or `minor`                                                                                                                |
| `quality`  | `harmonious`, `disharmonious` or `neutral`, as the aspect is usually read. This varies between schools, especially for minor ones |

These are the eleven aspects:

| aspect          | glyph | angle | harmonic | type    | quality         |
| --------------- | ----- | ----- | -------- | ------- | --------------- |
| `conjunction`   | ☌     | 0°    | 1        | `major` | `neutral`       |
| `semi-sextile`  | ⚺     | 30°   | 12       | `minor` | `harmonious`    |
| `semi-square`   | ∠     | 45°   | 8        | `minor` | `disharmonious` |
| `sextile`       | ⚹     | 60°   | 6        | `major` | `harmonious`    |
| `quintile`      | Q     | 72°   | 5        | `minor` | `harmonious`    |
| `square`        | □     | 90°   | 4        | `major` | `disharmonious` |
| `trine`         | △     | 120°  | 3        | `major` | `harmonious`    |
| `sesqui-square` | ⚼     | 135°  | 8        | `minor` | `disharmonious` |
| `bi-quintile`   | bQ    | 144°  | 5        | `minor` | `harmonious`    |
| `quincunx`      | ⚻     | 150°  | 12       | `minor` | `disharmonious` |
| `opposition`    | ☍     | 180°  | 2        | `major` | `disharmonious` |

The five major aspects are the Ptolemaic ones: conjunction, sextile, square, trine and opposition. Some schools also count the quincunx as major; here it is minor.

Quintiles have no Unicode character, so their glyphs are `Q` and `bQ`, as in most astrology software.

### Sun position

Use `at()` to get the Sun's position at a given moment. Pass the local date and time with the time zone of the place, e.g. where someone was born:

```js
const { sun } = zodiac.at({
  date: '2024-05-05T14:00',
  timeZone: 'Europe/Madrid'
})

sun.sign
// Output: { id: 'taurus', ... }

sun.longitude
// Output: 45.48... (degrees along the ecliptic, from 0° Aries)

sun.degree
// Output: 15.48... (degrees within the sign)
```

The result is a frozen object that can be serialized, e.g. to keep it in a store.

The date is written as `YYYY-MM-DD`, optionally followed by a time, `THH:mm` or `THH:mm:ss`, the same format `<input type="datetime-local">` gives. The time zone is an [IANA name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) such as `'Europe/Madrid'`, so daylight saving time and historical changes are taken into account.

The time zone is required with a date written as a string: the types ask for it, and without it `at()` throws an error instead of using the time zone of the machine. An invalid date or time zone throws an error too.

> [!WARNING]
> If the time is unknown, noon is used. On the day the Sun changes sign, around the 20th of each month, the sign can then be wrong: someone born that day may have either of the two. The Sun moves about 1° a day, so if `sun.degree` is within about half a degree of 0 or 30, the sign may have changed during that day.

You can also pass a `Date` if you already have the exact instant:

```js
zodiac.at({ date: new Date('2024-05-05T12:00:00Z') }).sun.sign
```

Keep in mind that `new Date(2024, 4, 5)` is midnight in the time zone of the machine running the code, not of the place you mean.

The position is computed with Jean Meeus' low-precision solar algorithm (accurate to about 0.01°), so the change of sign falls on the right day each year.

> [!TIP]
> If you only know the city, a library such as [`i18n-cities`](https://www.npmjs.com/package/i18n-cities) gives you its time zone:
>
> ```js
> const [city] = cities.search('barcelona')
>
> zodiac.at({ date: '1990-03-20T05:00', timeZone: city.timezone })
> ```

### Translations

English is included. Other languages must be imported to be available:

```js
import 'western-signs/locale/es'
import 'western-signs/locale/ca'
```

| language | import                    |
| -------- | ------------------------- |
| English  | included                  |
| Spanish  | `western-signs/locale/es` |
| Catalan  | `western-signs/locale/ca` |

> [!IMPORTANT]
> A language you haven't imported gives no error: its translations are just missing, so you get the identifiers back, e.g. `'taurus'` instead of `'Tauro'`. If you see identifiers where you expected text, check the import.

`i18n.label()` adds the translations of a sign, planet, house or aspect as `labels`. The other fields are kept as they are, so the result can still be compared with the constants:

```js
import { ELEMENTS, i18n, SIGNS, zodiac } from 'western-signs'

const taurus = i18n.label(zodiac.signs.get(SIGNS.TAURUS), 'es')

taurus.labels
// Output:
{
  name: 'Tauro',
  bodyPart: 'Garganta',
  character: 'Toro',
  element: 'Tierra',
  modality: 'Fijo',
  polarity: 'Negativo',
  rulers: { modern: 'Venus', traditional: 'Venus' },
  season: 'Primavera'
}

taurus.element === ELEMENTS.EARTH
// Output: true
```

`labels.name` is the translation of the `id`. Numbers and glyphs are not translated, so they are left out of `labels`.

`i18n.t()` translates a single identifier, such as an element, an aspect or a dignity. It returns the identifier itself if there is no translation:

```js
i18n.t(ASPECTS.CONJUNCTION)
// Output: Conjunction

i18n.t(ASPECTS.CONJUNCTION, 'es')
// Output: Conjunción
```

Both translate into English unless you pass a language. There is no global language: to work in one, e.g. the one your app is shown in, fix it once with `i18n.locale()` and use the functions it returns:

```js
const { t, label } = i18n.locale('es')

t(ASPECTS.CONJUNCTION)
// Output: Conjunción

label(zodiac.signs.get(SIGNS.TAURUS)).labels.name
// Output: Tauro
```

### Symbols

The `getSymbol` function returns the SVG of a sign, planet or aspect, with options to customize its appearance.

| option           | type      | default          | description                                          |
| ---------------- | --------- | ---------------- | ---------------------------------------------------- |
| width            | `number`  | `24`             | Width in pixels of the generated SVG                 |
| height           | `number`  | `24`             | Height in pixels                                     |
| fill             | `string`  | `'none'`         | Fill color                                           |
| stroke           | `string`  | `'currentColor'` | Stroke color as hex, rgb, or CSS variable            |
| strokeWidth      | `number`  | `1`              | Stroke thickness in logical pixels                   |
| nonScalingStroke | `boolean` | `false`          | Prevents stroke from scaling when the SVG is resized |
| class            | `string`  | —                | CSS class of the SVG                                 |
| style            | `string`  | —                | Inline style of the SVG                              |

```js
import { getSymbol, SIGNS } from 'western-signs'

const symbol = getSymbol(SIGNS.TAURUS, { stroke: 'red', strokeWidth: 2 })

symbol.toString()
// Output: An SVG string

symbol.toDataURL()
// Output: A Data URL of the SVG
```

#### Available symbols

The symbols of the planets, signs and aspects use the identifiers of their exported constants. The Ascendant, the only angle with a symbol, has no constant: pass `'ascendant'`.

| constant | symbols                                                                                                                            |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| PLANETS  | `SUN` `MOON` `MERCURY` `VENUS` `MARS` `JUPITER` `SATURN` `URANUS` `NEPTUNE` `PLUTO`                                                |
| SIGNS    | `ARIES` `TAURUS` `GEMINI` `CANCER` `LEO` `VIRGO` `LIBRA` `SCORPIO` `SAGITTARIUS` `CAPRICORN` `AQUARIUS` `PISCES`                   |
| ASPECTS  | `CONJUNCTION` `SEMISEXTILE` `SEMISQUARE` `SEXTILE` `QUINTILE` `SQUARE` `TRINE` `SESQUISQUARE` `BIQUINTILE` `QUINCUNX` `OPPOSITION` |
| —        | `'ascendant'`                                                                                                                      |

There are no symbols yet for the houses or for the other angles (Descendant, Midheaven and Imum Coeli).

To give a symbol an accessible name, e.g. for screen readers, translate its identifier:

```js
const { t } = i18n.locale('es')

const html = `<span role="img" aria-label="${t(PLANETS.MARS)}">${getSymbol(PLANETS.MARS)}</span>`
```

> [!TIP]
>
> #### React projects
>
> For React projects, you can find compatible astrology symbol components in the [Astroicons repository](https://github.com/marcmarine/astroicons).

### Data as JSON

The data behind the library is also published as JSON, for projects that don't run JavaScript or just want the data: a script in another language, a database seed, or the context given to a language model.

`data.json` has `signs`, `planets`, `houses` and `aspects`, with the same values as `zodiac`. Each language has its own file in `locale/` that maps every identifier to its label, so load `data.json` together with the languages you need, even if only English:

```js
import data from 'western-signs/data.json' with { type: 'json' }
import ca from 'western-signs/locale/ca.json' with { type: 'json' }

const taurus = data.signs[1]
// { id: 'taurus', element: 'earth', modality: 'fixed', longitude: { start: 30, end: 60 }, ... }

ca[taurus.element]
// Output: Terra
```

Or without installing anything, from a CDN:

```
https://cdn.jsdelivr.net/npm/western-signs@2/dist/data.json
https://cdn.jsdelivr.net/npm/western-signs@2/dist/locale/ca.json
```

## TypeScript

Every identifier has its type, a union of string literals, to use for example in `Record<SignId, …>`:

| type                                         | values                                  |
| -------------------------------------------- | --------------------------------------- |
| `SignId`                                     | `'aries'`, `'taurus'`, …                |
| `PlanetId`                                   | `'sun'`, `'moon'`, …                    |
| `AspectId`                                   | `'conjunction'`, `'trine'`, …           |
| `HouseId`, `HouseNumber`                     | `'house-1'`, … and `1`, …, `12`         |
| `ElementId`, `ModalityId`, `PolarityId`      | `'fire'`, `'cardinal'`, `'positive'`, … |
| `HorizonId`, `MeridianId`, `HouseModalityId` | `'above'`, `'east'`, `'angular'`, …     |
| `DignityId`                                  | `'domicile'`, `'exaltation'`, …         |

The objects are typed as `Sign`, `Planet`, `House` and `Aspect`, and what `i18n.label()` returns as `Labeled<Sign>`, etc.

## Migrating from 1.x

Version 2 returns identifiers instead of translated text, and moves translation to `i18n`. Most changes follow from that.

### Functions

| 1.x                                             | 2.x                                                                  |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| `getSign(name, lang)`, `getSignByName`          | `zodiac.signs.get(id)`, and `i18n.label(sign, lang)` to translate it |
| `getSigns(lang)`                                | `zodiac.signs.all()`                                                 |
| `getPlanet(name, lang)`, `getPlanets(lang)`     | `zodiac.planets.get(id)`, `zodiac.planets.all()`                     |
| `getHouses(lang)`                               | `zodiac.houses.all()`                                                |
| `getSignByDate(date, lang)`                     | `zodiac.at({ date }).sun.sign`                                       |
| `zodiac.locale(lang).signs.get(id)`             | `i18n.label(zodiac.signs.get(id), lang)`                             |
| `i18n.setLanguage(lang)` and `i18n.t(key)`      | `i18n.t(key, lang)`, or `i18n.locale(lang).t(key)`                   |
| `i18n.getLanguage()`                            | removed: there is no global language                                 |
| ``i18n.t`${key}` ``                             | `i18n.t(key)`                                                        |
| `sun.sign()`, `sun.longitude()`, `sun.degree()` | `sun.sign`, `sun.longitude`, `sun.degree`                            |
| `getSymbol(id, { 'stroke-width': 2 })`          | `getSymbol(id, { strokeWidth: 2 })`                                  |

The 1.x documentation of `getSymbol` also listed `nonScalingStroke` as `true` by default, and the options `stroke-linecap` and `stroke-linejoin`. That was a mistake in the documentation: the code never had those options, and `nonScalingStroke` has always been `false` by default, so nothing changes. To keep the stroke from scaling, pass `nonScalingStroke: true`.

### Data

| 1.x                                            | 2.x                                                                              |
| ---------------------------------------------- | -------------------------------------------------------------------------------- |
| `element: 'Earth'`, translated                 | `element: 'earth'`, an identifier. Its translation is in `i18n.label(…).labels`  |
| `name: 'Taurus'`                               | `id: 'taurus'`, and `labels.name` for the translation                            |
| `pole`                                         | `polarity`                                                                       |
| `rulingPlanet`, `traditionalRuler`             | `rulers.modern`, `rulers.traditional`                                            |
| `startDate`, `endDate`                         | removed: use `longitude`, or `zodiac.at()` for the sign at a given moment        |
| `house.title`, `house.keywords`, `house.phase` | removed                                                                          |
| `house.hemisphere: 'lower' \| 'upper'`         | `house.horizon: 'below' \| 'above'`, and the new `house.meridian`                |
| `null` for an unknown identifier               | `undefined`                                                                      |
| objects that could be changed                  | frozen objects: copy one before changing it                                      |

### Types

| 1.x                                                        | 2.x                                                       |
| ---------------------------------------------------------- | --------------------------------------------------------- |
| `Signs`, `Planets`, `Aspects`, `Houses`                    | `SignId`, `PlanetId`, `AspectId`, `HouseId`               |
| `Elements`, `Modalities`, `Hemispheres`, `HouseModalities` | `ElementId`, `ModalityId`, `HorizonId`, `HouseModalityId` |
| `Symbols`                                                  | `SymbolId`                                                |
| `HEMISPHERES`                                              | `HORIZONS` and `MERIDIANS`                                |

## API Reference

### Variables

- [zodiac](https://marcmarine.github.io/western-signs/variables/zodiac)

### Functions

- [getSymbol](https://marcmarine.github.io/western-signs/functions/getSymbol)
- [i18n.t](https://marcmarine.github.io/western-signs/functions/i18n.t)
- [i18n.label](https://marcmarine.github.io/western-signs/functions/i18n.label)
- [i18n.locale](https://marcmarine.github.io/western-signs/functions/i18n.locale)

### Interfaces

- [Aspect](https://marcmarine.github.io/western-signs/interfaces/Aspect)
- [Dignities](https://marcmarine.github.io/western-signs/interfaces/Dignities)
- [House](https://marcmarine.github.io/western-signs/interfaces/House)
- [Planet](https://marcmarine.github.io/western-signs/interfaces/Planet)
- [Rulers](https://marcmarine.github.io/western-signs/interfaces/Rulers)
- [Sign](https://marcmarine.github.io/western-signs/interfaces/Sign)
- [ZodiacPosition](https://marcmarine.github.io/western-signs/interfaces/ZodiacPosition)

For more detailed API information, please check out the [documentation](https://marcmarine.github.io/western-signs).

## License

MIT License © 2024 [Marc Mariné](https://github.com/marcmarine)
