
import { InMemoryCheckInsRepos } from '@/Repository/In-Memory/InMemory-check-in-repos';
import { InMemoryGymsRepos } from '@/Repository/In-Memory/InMemory-gyms-repos';
import { CheckInUseCase } from '@/UseCases/checkIns';
import { MaxDistanceError } from '@/UseCases/errors/maxDistance';
import { MaxNumberOfCheckInsError } from '@/UseCases/errors/maxNumberOfCheckIns';
import { Decimal } from '@prisma/client/runtime/library';

import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';


let checkInsRepository: InMemoryCheckInsRepos
let gymRepository: InMemoryGymsRepos
let sut: CheckInUseCase

describe('Check-in Use Case', () => {

    beforeEach(async () => {
      
        checkInsRepository = new InMemoryCheckInsRepos()
        gymRepository = new InMemoryGymsRepos()
        sut = new CheckInUseCase(checkInsRepository, gymRepository)

        await gymRepository.create({

          id: 'gym-01',
          title: 'Gym-Test',
          description: null,
          phone: null,
          latitude: 0,
          longitude: 0,
        })

        vi.useFakeTimers()
    });

    afterEach(() => {
        vi.useRealTimers()
    });

    it('should be able to check in', async () => {

    const { checkIn } = await sut.execute({

        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String))

    });

    it('should not be able to check in twice in the same day', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    
        await sut.execute({
          gymId: 'gym-01',
          userId: 'user-01',
          userLatitude: 0,
          userLongitude: 0,
        })
    
        await expect(() =>
          sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
          }),
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
      });
    
      it('should be able to check in twice but in different days', async () => {

        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    
        await sut.execute({
          gymId: 'gym-01',
          userId: 'user-01',
          userLatitude: 0,
          userLongitude: 0,
        })
    
        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    
        const { checkIn } = await sut.execute({
          gymId: 'gym-01',
          userId: 'user-01',
          userLatitude: 0,
          userLongitude: 0,
        });
    
        expect(checkIn.id).toEqual(expect.any(String))
      });

      it('should not be able to check in on distant gym', async () => {

        gymRepository.items.push({
          
          id: 'gym-02',
          title: 'Test-Gym',
          description: '',
          phone: '',
          latitude: new Decimal(-27.0747279),
          longitude: new Decimal(-49.4889672),
        })

        // 100 meters distance away from the gym -->
        await expect(() =>
          sut.execute({
            gymId: 'gym-02',
            userId: 'user-01',
            userLatitude: -27.2092052, 
            userLongitude: -49.6401091,
          }),
        ).rejects.toBeInstanceOf(MaxDistanceError)
    
        });
    })