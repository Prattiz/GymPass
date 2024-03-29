import { PrismaCheckInsRepository } from '@/Repository/prisma/prisma-check-in-repos';
import { PrismaGymsRepos } from '@/Repository/prisma/prisma-gyms-repos';

import { CheckInUseCase } from '../checkIns';

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepos()

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}