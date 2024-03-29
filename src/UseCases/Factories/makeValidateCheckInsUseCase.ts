import { PrismaCheckInsRepository } from "@/Repository/prisma/prisma-check-in-repos";
import { ValidateCheckInUseCase } from "../validateCheckIn";

export function makeValidateCheckInsUseCase() {

  const checkInRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInUseCase(checkInRepository);

  return useCase
}