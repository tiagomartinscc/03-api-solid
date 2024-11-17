import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from
  'src/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let repository:InMemoryUsersRepository
// sut - system under test
let sut: GetUserProfileUseCase

describe('Get Profile Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(repository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await repository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() => sut.execute({
      userId: 'non-existing-id',
    })).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
