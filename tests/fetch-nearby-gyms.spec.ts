import { InMemoryGymsRepos } from '@/Repository/In-Memory/InMemory-gyms-repos';
import { FetchNearbyGymsUseCase } from '@/UseCases/fetchNearbyGyms';

import { expect, describe, it, beforeEach } from 'vitest';


let gymsRepository: InMemoryGymsRepos
let sut: FetchNearbyGymsUseCase


describe('Fetch Nearby Gyms Use Case', () => {

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepos()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  });

  it('should be able to fetch nearby gyms', async () => {

    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  });
  
})