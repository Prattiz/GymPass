import { PrismaCheckInsRepository } from "@/repository/prisma/prisma-check-in-repos"
import { FetchUserCheckInsHistoryUseCase } from "../fetchUserCheckInHistory"

export function makeFetchUserCheckInsUseCase() {

  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

  return useCase
}