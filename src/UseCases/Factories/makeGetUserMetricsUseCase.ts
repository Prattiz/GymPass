import { PrismaCheckInsRepository } from "@/Repository/prisma/prisma-check-in-repos"
import { GetUserMetricsUseCase } from "../getUserMetrics"

export function makeGetUserMetricsUseCase() {

  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}