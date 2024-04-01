import type { User } from "@prisma/client";

import { UsersRepository } from "@/repository/users-repository";

import { hash } from "bcryptjs"

import { userAlreadyExistsError } from "./errors/userAlreadyExists";


interface RegisterUseCaseRequest {
    name: string,
    email: string,
    password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  
  constructor(private usersRepository: UsersRepository){}

  async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    
    const password_hash = await hash(password, 6);
    const userWithSameEmail = await this.usersRepository.findByEmail(email);


    if (userWithSameEmail) {
      
      throw new userAlreadyExistsError()
    }

    const user = await this.usersRepository.create({

      name,
      email,
      password_hash,
    })

    return { user }
  }
}