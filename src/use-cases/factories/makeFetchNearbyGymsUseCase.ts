import { PrismaGymsRepos } from "@/repository/prisma/prisma-gyms-repos"
import { FetchNearbyGymsUseCase } from "../fetchNearbyGyms"

export function makeFetchNearbyGymsUseCase() {
    const gymsRepository = new PrismaGymsRepos()
    const useCase = new FetchNearbyGymsUseCase(gymsRepository)
  
    return useCase
}