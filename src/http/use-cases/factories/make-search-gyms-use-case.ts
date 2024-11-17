import { SearchGymsUseCase } from '../search-gyms'
import { PrismaGymsRepository }
  from 'src/repositories/prisma/prisma-gyms-repository'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  return new SearchGymsUseCase(gymsRepository)
}
