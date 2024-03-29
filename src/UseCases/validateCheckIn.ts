import { CheckIn } from "@prisma/client";

import { InMemoryGymsRepos } from "@/Repository/In-Memory/InMemory-gyms-repos";
import { InMemoryCheckInsRepos } from "@/Repository/In-Memory/InMemory-check-in-repos";
import { ResourceNotFoundError } from "./errors/resourceNotFound";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/lateCheckInValidation";
import { CheckInsRepository } from "@/Repository/checkIn-repository";


interface ValidateCheckInRequest{

    checkInId: string

}


interface ValidateCheckInResponse{
    checkIn: CheckIn
}


export class ValidateCheckInUseCase{

    constructor(
        private validateCheckInsRepos: CheckInsRepository,
    ){}


    async execute({ checkInId }:ValidateCheckInRequest):Promise<ValidateCheckInResponse>{

        const checkIn = await this.validateCheckInsRepos.findById(checkInId);

        if(!checkIn){
            throw new ResourceNotFoundError()
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes'
        );
        
        if(distanceInMinutesFromCheckInCreation > 20){
            throw new LateCheckInValidationError()
        }

       checkIn.validated_at = new Date()

       await this.validateCheckInsRepos.save(checkIn)

        return { checkIn }
    }
}