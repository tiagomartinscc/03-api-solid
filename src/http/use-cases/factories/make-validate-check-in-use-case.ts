import { PrismaCheckInsRepository }
  from 'src/repositories/prisma/prisma-checkins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const repository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(repository)
  return useCase
}
