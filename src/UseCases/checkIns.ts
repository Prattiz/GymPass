import { CheckIn } from "@prisma/client";
import { InMemoryCheckInsRepos } from "@/Repository/In-Memory/InMemoryCheckInRepos";
import { InvalidCredentialsError } from "./errors/invalidCredentials";


interface CheckInRequestProps{

    userId: string,
    gymId: string
}


interface CheckInResponseProps{
    checkIn: CheckIn
}


export class CheckInUseCase{
    constructor(
        private checkInsRepos: InMemoryCheckInsRepos
    ){}


    async execute({ gymId, userId }:CheckInRequestProps):Promise<CheckInResponseProps>{

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