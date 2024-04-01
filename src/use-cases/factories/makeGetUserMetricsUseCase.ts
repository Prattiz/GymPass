import { PrismaCheckInsRepository } from "@/repository/prisma/prisma-check-in-repos"
import { GetUserMetricsUseCase } from "../getUserMetrics"

export function makeGetUserMetricsUseCase() {

  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}