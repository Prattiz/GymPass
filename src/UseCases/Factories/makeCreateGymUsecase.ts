import { PrismaGymsRepos } from "@/Repository/prisma/prisma-gyms-repos"
import { CreateGymUseCase } from "../createGym"

export function makeCreateGymUseCase() {
    const gymsRepository = new PrismaGymsRepos()
    const useCase = new CreateGymUseCase(gymsRepository)
  
    return useCase
}