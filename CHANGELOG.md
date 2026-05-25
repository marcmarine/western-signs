## [1.13.2](https://github.com/marcmarine/western-signs/compare/v1.13.1...v1.13.2) (2026-05-25)


### Bug Fixes

* Add Language type to exports ([430c57d](https://github.com/marcmarine/western-signs/commit/430c57dfa87c6c4b415883edcfc7ad33905ed59d))
* Add TypeScript type definitions to exports ([e30a5e4](https://github.com/marcmarine/western-signs/commit/e30a5e4fbf711fc4382c035498985617033feb26))
* Update build configuration for optimized output ([906dcd9](https://github.com/marcmarine/western-signs/commit/906dcd9503fdf9729c752cfaa713a793035f130f))

## [1.13.1](https://github.com/marcmarine/western-signs/compare/v1.13.0...v1.13.1) (2026-05-25)


### Bug Fixes

* Relax typescript requirement to >=5.0.0 ([051e839](https://github.com/marcmarine/western-signs/commit/051e839ac2350708dc6bf1f2a84fdb9e161b12d5))

# [1.13.0](https://github.com/marcmarine/western-signs/compare/v1.12.2...v1.13.0) (2026-05-23)


### Bug Fixes

* Add missing Aspect type to exports ([8fa9b73](https://github.com/marcmarine/western-signs/commit/8fa9b7332bb1a391a5a3bbb5472e576ee26c5902))
* Remove missing zodiac export ([d44741c](https://github.com/marcmarine/western-signs/commit/d44741c7b55bd87c2784a95259b91e22881d8ac5))
* Reorder planets in constants ([bc38445](https://github.com/marcmarine/western-signs/commit/bc38445d4a446d10e9ccaedf823f0eb247574762))


### Features

* Add aspect data with type and quality metadata ([50e7a3c](https://github.com/marcmarine/western-signs/commit/50e7a3cfabce89bb6afb1c55293b79ecfbe3418c))
* **i18n:** Enable translations with explicit locale imports ([b305dbd](https://github.com/marcmarine/western-signs/commit/b305dbd0cc83750b485463b057a204aa1d961d97))
* **icons:** Improve symbol assets size and performance ([5729d16](https://github.com/marcmarine/western-signs/commit/5729d1676553afaf1432b61a70128758a08b9000))
* **icons:** Refactor symbol generation to use path data ([a5a3741](https://github.com/marcmarine/western-signs/commit/a5a374199a3ac56510d1316acb67b5c98b159d9f))


### Performance Improvements

* Reorganize data and split bundle into chunks ([f4d5198](https://github.com/marcmarine/western-signs/commit/f4d519879f9206ba5ac65477617eb44ca4ef364f))

## [1.12.2](https://github.com/marcmarine/western-signs/compare/v1.12.1...v1.12.2) (2026-04-06)


### Bug Fixes

* Update width without affecting stroke-width ([1af30f8](https://github.com/marcmarine/western-signs/commit/1af30f879f6069d3b531837fe5bc4ac08a02ec9e))

## [1.12.1](https://github.com/marcmarine/western-signs/compare/v1.12.0...v1.12.1) (2026-04-06)


### Bug Fixes

* Update type definitions and exports for symbol options ([5c0164d](https://github.com/marcmarine/western-signs/commit/5c0164dd029febdac178ad9474d663277c6595bc))

# [1.12.0](https://github.com/marcmarine/western-signs/compare/v1.11.1...v1.12.0) (2026-04-06)


### Features

* Add width and height options to symbol creation ([8196a1c](https://github.com/marcmarine/western-signs/commit/8196a1cda2653cd424007877dad02135c585c201))

## [1.11.1](https://github.com/marcmarine/western-signs/compare/v1.11.0...v1.11.1) (2025-08-29)


### Bug Fixes

* Add missing ascendant entry to dictionaries ([094cf73](https://github.com/marcmarine/western-signs/commit/094cf73bd4d9996d58a0f2464cf6eae7c7596ecf))

# [1.11.0](https://github.com/marcmarine/western-signs/compare/v1.10.1...v1.11.0) (2025-08-27)


### Bug Fixes

* Refactor houseKeywords to individual strings by key ([4b9ce5c](https://github.com/marcmarine/western-signs/commit/4b9ce5c739034f3808285c4db4310be22363fa6d))
* Update translations to use keyed titles ([09b97ea](https://github.com/marcmarine/western-signs/commit/09b97eaf3ec5aca5929b2dc4fa3a3582b7c113ff))


### Features

* Add ascendant symbol and update types and tests ([56d97c5](https://github.com/marcmarine/western-signs/commit/56d97c54a197e4341ccc92f807b162b541a7aace))
* Add house names into house data and dictionaries ([3da349c](https://github.com/marcmarine/western-signs/commit/3da349c7c4b776d2bc07fa45186726348cad162b))

## [1.10.1](https://github.com/marcmarine/western-signs/compare/v1.10.0...v1.10.1) (2025-08-10)


### Bug Fixes

* Use atob to decode base64 SVG strings ([3407f96](https://github.com/marcmarine/western-signs/commit/3407f96e6e98537504990ba7f29f256ba2a92172))

# [1.10.0](https://github.com/marcmarine/western-signs/compare/v1.9.0...v1.10.0) (2025-08-10)


### Bug Fixes

* Move __dirname inside getSymbol ([4082ad6](https://github.com/marcmarine/western-signs/commit/4082ad6ca761638c402f0cbb0350734c7da4bd0d))
* Set stroke-linejoin to miter in all SVG assets ([85a540b](https://github.com/marcmarine/western-signs/commit/85a540b70bbc121018a937672c03fef7ded7cbe7))
* Simplify gemini.svg path elements ([452f802](https://github.com/marcmarine/western-signs/commit/452f802f28f7e41f57668831ae1adf45d6575c20))


### Features

* Add build script to embed SVG symbols ([6c46da4](https://github.com/marcmarine/western-signs/commit/6c46da4265829a7638a44b62454d48136a93dd8f))
* Refactor getSymbol to support method chaining ([a5083f0](https://github.com/marcmarine/western-signs/commit/a5083f04cddb544a44a9deb7b8d80b8f1c7ac4e0))

# [1.9.0](https://github.com/marcmarine/western-signs/compare/v1.8.1...v1.9.0) (2025-08-02)


### Bug Fixes

* Set default language to English in i18n module ([2c1ae72](https://github.com/marcmarine/western-signs/commit/2c1ae72256852b6f8429007c98362272f344ecac))


### Features

* Add basic i18n support with language switching and tests ([0d6ac53](https://github.com/marcmarine/western-signs/commit/0d6ac5376833228c41c85222a5a95f348ee4c7fe))
* Refactor ASPECTS to use named keys and add translations ([828bdb1](https://github.com/marcmarine/western-signs/commit/828bdb15cf37b423d175756a503b2d0fb17fd4fc))

## [1.8.1](https://github.com/marcmarine/western-signs/compare/v1.8.0...v1.8.1) (2025-07-29)


### Bug Fixes

* Adjust sun SVG path formatting ([71f9898](https://github.com/marcmarine/western-signs/commit/71f989807f2d0c718d8998572f5bef1544c0d099))

# [1.8.0](https://github.com/marcmarine/western-signs/compare/v1.7.0...v1.8.0) (2025-07-29)


### Bug Fixes

* Allow numeric strokeWidth in SymbolOptions ([069e980](https://github.com/marcmarine/western-signs/commit/069e9809b60e625840881be14faf0e8b0458d216))
* Handle non-browser environments in getSymbol ([670cb0c](https://github.com/marcmarine/western-signs/commit/670cb0c6e0a5433ea62c27f81eb36e0775facf5a))
* Handle unknown planets gracefully in getPlanet ([a3840bd](https://github.com/marcmarine/western-signs/commit/a3840bda8c76be5b42ea3187d87d1661b164d5c0))
* Update glyph symbols in zodiac signs ([c6220f9](https://github.com/marcmarine/western-signs/commit/c6220f9fc4d5c3c21416084466e1759ed6652f61))
* Update SVG stroke color to use currentColor ([20cccbe](https://github.com/marcmarine/western-signs/commit/20cccbe4aef53923775d9551edd9e62554b8cc2b))


### Features

* Add getPlanet function with translation support ([56e8d4d](https://github.com/marcmarine/western-signs/commit/56e8d4d908179e73b9d7d7868fbc389d994094db))
* Add planets SVGs and update symbol tests ([67bc91a](https://github.com/marcmarine/western-signs/commit/67bc91a83eb7b3a73382e293b770fab8ac63f711))
* Add SVG assets for various aspects ([9c456a9](https://github.com/marcmarine/western-signs/commit/9c456a9967b5bc7b9e0fe3cd540df10fd78d935c))

# [1.7.0](https://github.com/marcmarine/western-signs/compare/v1.6.0...v1.7.0) (2025-07-27)


### Features

* Add planet details and translations ([5fd6f92](https://github.com/marcmarine/western-signs/commit/5fd6f92d9b2568d1f43a3f2790a291f4c47a99be))
* Add zodiac SVG assets and getSymbol utility ([04da156](https://github.com/marcmarine/western-signs/commit/04da156636674371c88e19e2597c6519a762bebc))

# [1.6.0](https://github.com/marcmarine/western-signs/compare/v1.5.0...v1.6.0) (2025-06-30)


### Features

* Add house details and translations ([80ad3ab](https://github.com/marcmarine/western-signs/commit/80ad3abc828ce235655a072fd8d2e839889a8e24))

# [1.5.0](https://github.com/marcmarine/western-signs/compare/v1.4.1...v1.5.0) (2025-06-25)


### Features

* Add translations in Catalan ([7e7e06d](https://github.com/marcmarine/western-signs/commit/7e7e06d90c41a2032ebf128335ddb08398bfef71))
* Add TypeScript declaration generation with plugin ([831188c](https://github.com/marcmarine/western-signs/commit/831188cd3fad7405fc1a0f53ef13e596a3ed1ae0))

## [1.4.1](https://github.com/marcmarine/western-signs/compare/v1.4.0...v1.4.1) (2025-04-17)


### Bug Fixes

* **docs:** Add collapsible WordArt section ([dce3aee](https://github.com/marcmarine/western-signs/commit/dce3aee5875563c1feda842f6eaed153e666b1b3))

# [1.4.0](https://github.com/marcmarine/western-signs/compare/v1.3.0...v1.4.0) (2024-12-10)


### Features

* Introduce astrological houses ([0894e74](https://github.com/marcmarine/western-signs/commit/0894e74436df7cf4bf9968183179a7e64cfd3c7c))

# [1.3.0](https://github.com/marcmarine/western-signs/compare/v1.2.0...v1.3.0) (2024-09-21)


### Bug Fixes

* **data:** Correct date ranges for signs ([82bb180](https://github.com/marcmarine/western-signs/commit/82bb18012f7a40c00f158d8565497472885b3240))


### Features

* **methods:** Add `getSignByDate` method with tests ([7dfb74e](https://github.com/marcmarine/western-signs/commit/7dfb74ed31f2bef03fd89cdc21fb12aed508544b))

# [1.2.0](https://github.com/marcmarine/western-signs/compare/v1.1.1...v1.2.0) (2024-09-19)


### Bug Fixes

* **constants:** Correct THROAT constant name ([9e27833](https://github.com/marcmarine/western-signs/commit/9e27833c8b72a908f1feb0efe74b39d397d5fa3b))


### Features

* **data:** Add `startDate` and `endDate` for signs ([c352ea5](https://github.com/marcmarine/western-signs/commit/c352ea50256a3893493e3ce3d1b6941dbc4dfee0))

## [1.1.1](https://github.com/marcmarine/western-signs/compare/v1.1.0...v1.1.1) (2024-08-18)


### Bug Fixes

* **methods:** Rename `getAllSigns` to `getSigns` ([09fbb93](https://github.com/marcmarine/western-signs/commit/09fbb93dbbad56dee31bcc748103fe2873575bd0))

# [1.1.0](https://github.com/marcmarine/western-signs/compare/v1.0.0...v1.1.0) (2024-08-02)


### Features

* **data:** Enhance sign information with additional details ([dd985ce](https://github.com/marcmarine/western-signs/commit/dd985ced556ced626f2f1d9cfccbc33075a07f62))

# 1.0.0 (2024-07-23)


### Bug Fixes

* **ci:** Update Node.js version to >= 20.8.1 ([48af072](https://github.com/marcmarine/western-signs/commit/48af07255942557af7654042042107554b68488d))
