import { UsersRepository } from "@/Repository/users-repository";

import { InvalidCredentialsError } from "./errors/invalidCredentials";

import { compare } from "bcryptjs";

import { User } from "@prisma/client";


interface AuthenticateRequestProps{

    email: string,
    password: string
}


interface AuthenticateResponseProps{
    user: User
}


export class AuthenticateUseCase{
    constructor(
        private userRepository: UsersRepository,
    ){}

    async execute({ email, password }:AuthenticateRequestProps):Promise<AuthenticateResponseProps>{

        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatches = await compare(password, user.password_hash);

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return { user }
    }
}