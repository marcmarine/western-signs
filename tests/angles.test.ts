import { describe, expect, it } from 'bun:test'
import { ANGLES, AXES, HOUSE_MODALITIES, i18n, zodiac } from '@/index'
import '@/locale/es'

describe('zodiac.angles', () => {
  it('should get an angle by identifier', () => {
    expect(zodiac.angles.get(ANGLES.MEDIUM_COELI)).toEqual({
      id: 'medium-coeli',
      axis: 'meridian',
      glyph: 'MC',
      house: 10,
      opposite: 'imum-coeli'
    })
  })

  it('should return undefined for a string that is not an angle', () => {
    expect(zodiac.angles.get('vertex')).toBeUndefined()
    expect(zodiac.angles.get('toString')).toBeUndefined()
  })

  it('should return the four angles in the order of their houses', () => {
    expect(zodiac.angles.all().map(angle => angle.house)).toEqual([1, 4, 7, 10])
  })

  it('should mark the cusps of the angular houses', () => {
    for (const angle of zodiac.angles.all()) {
      expect(zodiac.houses.get(angle.house).modality).toBe(
        HOUSE_MODALITIES.ANGULAR
      )
    }
  })

  it('should pair each angle with the one six houses away, on the same axis', () => {
    for (const angle of zodiac.angles.all()) {
      const opposite = zodiac.angles.get(angle.opposite)

      expect(opposite.opposite).toBe(angle.id)
      expect(opposite.axis).toBe(angle.axis)
      expect(Math.abs(opposite.house - angle.house)).toBe(6)
    }
  })

  it.each([
    [ANGLES.ASCENDANT, AXES.HORIZON],
    [ANGLES.DESCENDANT, AXES.HORIZON],
    [ANGLES.MEDIUM_COELI, AXES.MERIDIAN],
    [ANGLES.IMUM_COELI, AXES.MERIDIAN]
  ])('%s should be on the %s', (id, axis) => {
    expect(zodiac.angles.get(id).axis).toBe(axis)
  })

  it('should be frozen', () => {
    expect(Object.isFrozen(zodiac.angles.get(ANGLES.ASCENDANT))).toBe(true)
  })

  describe('with i18n.label()', () => {
    it('should translate the name, the axis and the opposite angle, but not the glyph', () => {
      const { labels } = i18n.label(
        zodiac.angles.get(ANGLES.MEDIUM_COELI),
        'es'
      )

      expect(labels).toEqual({
        name: 'Medio Cielo',
        axis: 'Meridiano',
        opposite: 'Fondo del Cielo'
      })
    })
  })
})
