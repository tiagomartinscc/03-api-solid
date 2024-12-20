import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from
  'src/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository:InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create Gym', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: 29.9215518,
      longitude: -51.1487824,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
