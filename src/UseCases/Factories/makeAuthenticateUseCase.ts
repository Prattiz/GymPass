import { PrismaUsersRepos } from "@/Repository/prisma/prisma-users.repos"
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {

  const usersRepository = new PrismaUsersRepos();
  const useCase = new AuthenticateUseCase(usersRepository);

  return useCase
}