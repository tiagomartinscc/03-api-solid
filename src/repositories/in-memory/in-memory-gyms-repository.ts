import { Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(gymId: string): Promise<Gym | null> {
    const user = this.items.find(item => item.id === gymId)

    if (!user) {
      return null
    }

    return user
  }
}
