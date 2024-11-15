import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository }
  from '../repositories/in-memory/in-memory-checkins-repository'
import { CheckInUseCase } from './check-in'

let userRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('CheckIn Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(userRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
