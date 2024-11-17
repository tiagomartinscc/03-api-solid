import { InMemoryCheckInsRepository }
  from 'src/repositories/in-memory/in-memory-checkins-repository'
import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckinValidationError } from './errors/late-checkin-validation-error'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate inexistent check-in', async () => {
    await expect(() => sut.execute({
      checkInId: 'inexistent-check-in-id',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  // eslint-disable-next-line @stylistic/max-len
  it('should not be able to validate the check in after 20 minutes of the creation', async () => {
    vi.setSystemTime(new Date(2024, 10, 16, 21, 26, 0))

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twenyOneMinutesInMs = 1000 * 60 * 21
    vi.advanceTimersByTime(twenyOneMinutesInMs)

    await expect(() => sut.execute({
      checkInId: createdCheckIn.id,
    })).rejects.toBeInstanceOf(LateCheckinValidationError)
  })
})
