import { FetchUserCheckInsHistoryUseCase }
  from '../fetch-user-ckeck-ins-history'
import { PrismaCheckInsRepository }
  from 'src/repositories/prisma/prisma-checkins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const repository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(repository)
  return useCase
}
