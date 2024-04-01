import { PrismaCheckInsRepository } from '@/repository/prisma/prisma-check-in-repos';
import { PrismaGymsRepos } from '@/repository/prisma/prisma-gyms-repos';

import { CheckInUseCase } from '../checkIns';

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepos()

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}