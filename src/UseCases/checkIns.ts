import { CheckIn } from "@prisma/client";

import { InMemoryGymsRepos } from "@/Repository/In-Memory/InMemory-gyms-repos";
import { InMemoryCheckInsRepos } from "@/Repository/In-Memory/InMemory-check-in-repos";

import { InvalidCredentialsError } from "./errors/invalidCredentials";
import { ResourceNotFoundError } from "./errors/resourceNotFound";
import { getDistanceBetweenCoordinates, Coordinate } from "@/utils/get-distance-between-coordinates";



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
        private checkInsRepos: InMemoryCheckInsRepos,
        private gymsRepos: InMemoryGymsRepos
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
            throw new Error()
        }

        const checkInOnSameDay = await this.checkInsRepos.findByUserIdOnDate(
            userId,
            new Date(),
          )
      
          if (checkInOnSameDay) {
            throw new InvalidCredentialsError()
          }

        const checkIn = await this.checkInsRepos.create({
            gym_id: gymId,
            user_id: userId
        })

        return { checkIn }
    }
}