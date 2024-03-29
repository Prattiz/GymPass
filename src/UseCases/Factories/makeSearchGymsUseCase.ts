import { PrismaGymsRepos } from "@/Repository/prisma/prisma-gyms-repos";
import { SearchGymsUseCase } from "../searchGyms";

export function makeSearchGymsUseCase() {

  const gymsRepository = new PrismaGymsRepos();
  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase
}