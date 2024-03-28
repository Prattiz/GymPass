import { CheckIn } from "@prisma/client";

import { InMemoryGymsRepos } from "@/Repository/In-Memory/InMemory-gyms-repos";
import { InMemoryCheckInsRepos } from "@/Repository/In-Memory/InMemory-check-in-repos";
import { ResourceNotFoundError } from "./errors/resourceNotFound";


interface ValidateCheckInRequest{

    checkInId: string

}


interface ValidateCheckInResponse{
    checkIn: CheckIn
}


export class ValidateCheckInUseCase{

    constructor(
        private validateCheckInsRepos: InMemoryCheckInsRepos,
    ){}


    async execute({ checkInId }:ValidateCheckInRequest):Promise<ValidateCheckInResponse>{

        const checkIn = await this.validateCheckInsRepos.findById(checkInId);

        if(!checkIn){
            throw new ResourceNotFoundError()
        }

       checkIn.validated_at = new Date()

       await this.validateCheckInsRepos.save(checkIn)

        return { checkIn }
    }
}