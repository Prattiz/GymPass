import { PrismaGymsRepos } from "@/Repository/prisma/prisma-gyms-repos"
import { FetchNearbyGymsUseCase } from "../fetchNearbyGyms"

export function makeFetchNearbyGymsUseCase() {
    const gymsRepository = new PrismaGymsRepos()
    const useCase = new FetchNearbyGymsUseCase(gymsRepository)
  
    return useCase
}