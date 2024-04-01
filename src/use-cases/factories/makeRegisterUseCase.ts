import { PrismaUsersRepos } from "@/repository/prisma/prisma-users.repos"
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {

  const usersRepository = new PrismaUsersRepos();
  const useCase = new RegisterUseCase(usersRepository);

  return useCase
}