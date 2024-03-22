import { PrismaUsersRepos } from "@/Repository/prisma/prisma-users.repos"
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepos()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}