
import { InMemoryCheckInsRepos } from '@/Repository/In-Memory/InMemory-check-in-repos';
import { InMemoryGymsRepos } from '@/Repository/In-Memory/InMemory-gyms-repos';
import { CheckInUseCase } from '@/UseCases/checkIns';
import { InvalidCredentialsError } from '@/UseCases/errors/invalidCredentials';
import { Decimal } from '@prisma/client/runtime/library';

import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';


let checkInsRepository: InMemoryCheckInsRepos
let gymRepos: InMemoryGymsRepos
let sut: CheckInUseCase

describe('Check-in Use Case', () => {

    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepos()
        gymRepos = new InMemoryGymsRepos()
        sut = new CheckInUseCase(checkInsRepository, gymRepos)

        gymRepos.items.push({

          id: 'gym-01',
          title: 'Gym-Test',
          description: '',
          phone: '',
          latitude: new Decimal(0),
          longitude: new Decimal(0)
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
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
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
        })
    
        expect(checkIn.id).toEqual(expect.any(String))
      });

      
    })