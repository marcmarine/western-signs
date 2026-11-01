import { describe, expect, it } from 'bun:test'
import type { PlanetId } from '@/definitions'
import { i18n, PLANETS, SIGNS, zodiac } from '@/index'
import '@/locale/es'

describe('zodiac.planets', () => {
  it('should get a planet by identifier', () => {
    expect(zodiac.planets.get(PLANETS.SATURN)).toMatchObject({
      id: 'saturn',
      glyph: '♄',
      type: 'social'
    })
  })

  it('should return undefined for an unknown planet', () => {
    expect(zodiac.planets.get('unknown' as PlanetId)).toBeUndefined()
  })

  it('should return every planet in order', () => {
    expect(zodiac.planets.all().map(planet => planet.id)).toEqual(
      Object.values(PLANETS)
    )
  })

  it('should translate a planet with i18n.label()', () => {
    const planet = zodiac.planets.get(PLANETS.SATURN)

    expect(i18n.label(planet, 'es').labels).toEqual({
      name: 'Saturno',
      type: 'Social',
      dignities: {
        domicile: {
          modern: ['Capricornio'],
          traditional: ['Capricornio', 'Acuario']
        },
        detriment: { modern: ['Cáncer'], traditional: ['Cáncer', 'Leo'] },
        exaltation: 'Libra',
        fall: 'Aries'
      }
    })
  })

  describe('dignities', () => {
    it('should give the domicile and detriment of Mars', () => {
      expect(zodiac.planets.get(PLANETS.MARS).dignities).toMatchObject({
        domicile: { modern: ['aries'], traditional: ['aries', 'scorpio'] },
        detriment: { modern: ['libra'], traditional: ['taurus', 'libra'] }
      })
    })

    it.each([
      [PLANETS.SUN, 'aries', 'libra'],
      [PLANETS.MOON, 'taurus', 'scorpio'],
      [PLANETS.MERCURY, 'virgo', 'pisces'],
      [PLANETS.VENUS, 'pisces', 'virgo'],
      [PLANETS.MARS, 'capricorn', 'cancer'],
      [PLANETS.JUPITER, 'cancer', 'capricorn'],
      [PLANETS.SATURN, 'libra', 'aries']
    ] as const)(
      '%s should be exalted in %s and in its fall in %s',
      (id, exaltation, fall) => {
        expect(zodiac.planets.get(id).dignities).toMatchObject({
          exaltation,
          fall
        })
      }
    )

    it('should give no exaltation or fall to the outer planets', () => {
      for (const id of [PLANETS.URANUS, PLANETS.NEPTUNE, PLANETS.PLUTO]) {
        expect(zodiac.planets.get(id).dignities).toMatchObject({
          exaltation: null,
          fall: null
        })
      }
    })

    it('should translate the exaltation and leave a missing one as null', () => {
      expect(
        i18n.label(zodiac.planets.get(PLANETS.MARS), 'es').labels.dignities
      ).toMatchObject({ exaltation: 'Capricornio', fall: 'Cáncer' })
      expect(
        i18n.label(zodiac.planets.get(PLANETS.PLUTO), 'es').labels.dignities
      ).toMatchObject({ exaltation: null, fall: null })
    })

    it('should rule no sign traditionally for the outer planets', () => {
      for (const id of [PLANETS.URANUS, PLANETS.NEPTUNE, PLANETS.PLUTO]) {
        const { dignities } = zodiac.planets.get(id)

        expect(dignities.domicile.traditional).toEqual([])
        expect(dignities.detriment.traditional).toEqual([])
      }
    })

    it.each(['modern', 'traditional'] as const)(
      'should have each sign as the %s domicile of its ruler',
      tradition => {
        for (const sign of zodiac.signs.all()) {
          const ruler = zodiac.planets.get(sign.rulers[tradition])

          expect(ruler.dignities.domicile[tradition]).toContain(sign.id)
        }
      }
    )

    it.each(['modern', 'traditional'] as const)(
      'should put the %s detriment opposite the domicile',
      tradition => {
        const signs = Object.values(SIGNS)
        const opposite = (sign: string) =>
          signs[(signs.indexOf(sign as never) + 6) % 12]

        for (const { dignities } of zodiac.planets.all()) {
          expect(dignities.detriment[tradition]).toEqual(
            expect.arrayContaining(dignities.domicile[tradition].map(opposite))
          )
          expect(dignities.detriment[tradition]).toHaveLength(
            dignities.domicile[tradition].length
          )
        }
      }
    )
  })
})
