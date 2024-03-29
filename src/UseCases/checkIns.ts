import { CheckIn } from "@prisma/client";

import { InMemoryGymsRepos } from "@/Repository/In-Memory/InMemory-gyms-repos";
import { InMemoryCheckInsRepos } from "@/Repository/In-Memory/InMemory-check-in-repos";

import { ResourceNotFoundError } from "./errors/resourceNotFound";
import { MaxDistanceError } from "./errors/maxDistance";
import { MaxNumberOfCheckInsError } from "./errors/maxNumberOfCheckIns";

import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { GymsRepository } from "@/Repository/gyms-repository";
import { CheckInsRepository } from "@/Repository/checkIn-repository";


interface CheckInRequestProps{

    userId: string,
    gymId: string,
    userLatitude: number,
    userLongitude: number
}


interface CheckInResponseProps{
    checkIn: CheckIn
}


export class CheckInUseCase{

    constructor(
        private checkInsRepos: CheckInsRepository,
        private gymsRepos: GymsRepository
    ){}


    async execute({ gymId, userId, userLatitude, userLongitude }:CheckInRequestProps):Promise<CheckInResponseProps>{

        const gym = await this.gymsRepos.findById(gymId);
        
        if(!gym){
            throw new ResourceNotFoundError()
        }

        const distance = getDistanceBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude},
            { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
        )

        if( distance > 0.1 ){
            throw new MaxDistanceError()
        }

        const checkInOnSameDay = await this.checkInsRepos.findByUserIdOnDate(
            userId,
            new Date(),
          )
      
          if (checkInOnSameDay) {
            throw new MaxNumberOfCheckInsError()
          }

        const checkIn = await this.checkInsRepos.create({
            gym_id: gymId,
            user_id: userId
        })

        return { checkIn }
    }
}