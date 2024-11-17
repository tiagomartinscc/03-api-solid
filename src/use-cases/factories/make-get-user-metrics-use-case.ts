import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInsRepository }
  from 'src/repositories/prisma/prisma-checkins-repository'

export function makeGetUserMetricsUseCase() {
  const repository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(repository)
  return useCase
}
