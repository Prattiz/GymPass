import { InMemoryCheckInsRepos } from '@/repository/In-Memory/InMemory-check-in-repos';
import { GetUserMetricsUseCase } from '@/use-cases/getUserMetrics';

import { expect, describe, it, beforeEach } from 'vitest';


let checkInsRepository: InMemoryCheckInsRepos
let sut: GetUserMetricsUseCase

describe('Ger User Metrics Use Case', () => {

  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepos()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    });

    expect(checkInsCount).toEqual(2)
  });
  
})