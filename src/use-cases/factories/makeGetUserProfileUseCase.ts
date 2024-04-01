import { PrismaUsersRepos } from "@/repository/prisma/prisma-users.repos"
import { GetUserProfileUseCase } from '../getUserProfile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepos()
  const useCase = new GetUserProfileUseCase(usersRepository)

  return useCase
}