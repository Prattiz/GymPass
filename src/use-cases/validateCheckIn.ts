import { CheckIn } from "@prisma/client";

import { CheckInsRepository } from "@/repository/checkIn-repository";

import dayjs from "dayjs";

import { ResourceNotFoundError } from "./errors/resourceNotFound";
import { LateCheckInValidationError } from "./errors/lateCheckInValidation";



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