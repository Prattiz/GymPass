import { FastifyRequest, FastifyReply } from "fastify";

import { z } from "zod";

import { RegisterUseCase } from "@/UseCases/register";
import { InMemoryUsersRepos } from "@/Repository/in-memory-user-repos";
import { PrismaUsersRepos } from "@/Repository/prisma/prisma-users.repos";
import { userAlreadyExistsError } from "@/UseCases/errors/UserAlreadyExists";



export async function Register(request: FastifyRequest, reply: FastifyReply){

    const registerBodySchema = z.object({

      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });
  
    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
      
      const usersRepository = new PrismaUsersRepos();
      const registerUseCase = new RegisterUseCase(usersRepository);

      await registerUseCase.execute({
        name,
        email,
        password,
      });

    } catch (error) {

      if( error instanceof userAlreadyExistsError ){

        return reply.status(409).send({ Message: error.message})
      }

      throw error ; 
    }
  
    return reply.status(201).send()
}