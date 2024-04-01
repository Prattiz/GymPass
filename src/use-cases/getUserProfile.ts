import { UsersRepository } from "@/repository/users-repository";

import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resourceNotFound";


interface GetUserProfileRequestProps{

    userId: string,
}


interface GetUserProfileResponseProps{

    user: User
}


export class GetUserProfileUseCase{
    constructor(
        private userRepository: UsersRepository,
    ){}

    async execute({ userId }: GetUserProfileRequestProps):Promise<GetUserProfileResponseProps>{
 
        const user = await this.userRepository.findById(userId);

        if(!user){
            throw new ResourceNotFoundError();
        }

        return { user }
    }
}