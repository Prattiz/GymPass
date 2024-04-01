import { InMemoryGymsRepos } from '@/repository/In-Memory/InMemory-gyms-repos';
import { SearchGymsUseCase } from '@/use-cases/searchGyms';

import { expect, describe, it, beforeEach } from 'vitest';

let gymsRepository: InMemoryGymsRepos
let sut: SearchGymsUseCase


describe('Search Gyms Use Case', () => {

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepos()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {

    await gymsRepository.create({
      title: 'Gym ONE',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.create({
      title: 'Gym TWO',
      description: null,
      phone: null,
      latitude: 0,
      longitude: 0,
    })

    const { gym } = await sut.execute({

      query: 'ONE',
      page: 1,
    })

    expect(gym).toHaveLength(1)
    expect(gym).toEqual([expect.objectContaining({ title: 'Gym ONE' })])
  });


  it('should be able to fetch paginated gym search', async () => {

    for (let i = 1; i <= 22; i++) {

      await gymsRepository.create({
        title: `Gym ${i}`,
        description: null,
        phone: null,
        latitude: 0,
        longitude: 0,
      })
    };

    const { gym } = await sut.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gym).toHaveLength(2)
    expect(gym).toEqual([
      expect.objectContaining({ title: 'Gym 21' }),
      expect.objectContaining({ title: 'Gym 22' }),
    ])
  });

})