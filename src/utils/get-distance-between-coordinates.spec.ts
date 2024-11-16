import { expect, describe, it } from 'vitest'
import { Coordinate, getDistanceBetweenCoordinates }
  from './get-distance-between-coordinates'

describe('Test get distance between coordinates', () => {
  it('should return zero when two coordinates are equal', async () => {
    const coordinateFrom:Coordinate = {
      latitude: 29.9248149,
      longitude: -51.1502744,
    }

    const coordinateTo:Coordinate = {
      latitude: 29.9248149,
      longitude: -51.1502744,
    }

    const distance = await getDistanceBetweenCoordinates(
      coordinateFrom,
      coordinateTo,
    )

    expect(distance).toEqual(0)
  })

  it.only('should return zero when two coordinates are equal', async () => {
    const coordinateFrom:Coordinate = {
      latitude: -29.9248149,
      longitude: -51.1502744,
    }

    const coordinateTo:Coordinate = {
      latitude: -29.91763545745864,
      longitude: -51.16610926780421,
    }

    const distance = await getDistanceBetweenCoordinates(
      coordinateFrom,
      coordinateTo,
    )

    expect(distance).toBeGreaterThan(1)
    expect(distance).toBeLessThan(2)
  })
})
