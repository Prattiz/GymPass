import { FastifyRequest, FastifyReply } from "fastify";

import { z } from "zod"; 

import { PrismaUsersRepos } from "@/Repository/prisma/prisma-users.repos";

import { AuthenticateUseCase } from "@/UseCases/authenticate";
import { InvalidCredentialsError } from "@/UseCases/errors/invalidCredentials";



export async function Authenticate(request: FastifyRequest, reply: FastifyReply){

    const authenticateBodySchema = z.object({

      email: z.string().email(),
      password: z.string().min(6),
    });
  
    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
      
      const usersRepository = new PrismaUsersRepos();
      const authenticateUseCase = new AuthenticateUseCase(usersRepository);

      await authenticateUseCase.execute({

        email,
        password,
      });

    } catch (error) {

      if( error instanceof InvalidCredentialsError ){

        return reply.status(409).send({ Message: error.message})
      }

      throw error ; 
    }
  
    return reply.status(200).send()
}