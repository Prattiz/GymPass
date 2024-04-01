import { PrismaGymsRepos } from "@/repository/prisma/prisma-gyms-repos";
import { SearchGymsUseCase } from "../searchGyms";

export function makeSearchGymsUseCase() {

  const gymsRepository = new PrismaGymsRepos();
  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase
}