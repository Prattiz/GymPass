import { UsersRepository } from "@/Repository/users-repository"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { userAlreadyExistsError } from "./errors/UserAlreadyExists";


interface RegisterUseCaseProps {
    name: string,
    email: string,
    password: string
}

export class RegisterUseCase {
  
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseProps) {
    
    const password_hash = await hash(password, 6);
    const userWithSameEmail = await this.usersRepository.findByEmail(email);


    if (userWithSameEmail) {
      
      throw new userAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}