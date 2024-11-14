import { PrismaUsersRepository }
  from 'src/http/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new RegisterUseCase(usersRepository)
}
