import { FastifyRequest, FastifyReply } from "fastify";

import { z } from "zod"; 

import { InvalidCredentialsError } from "@/UseCases/errors/invalidCredentials";
import { makeAuthenticateUseCase } from "@/UseCases/Factories/makeAuthenticateUseCase";


export async function Authenticate(request: FastifyRequest, reply: FastifyReply){

    const authenticateBodySchema = z.object({

      email: z.string().email(),
      password: z.string().min(6),
    });
  
    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
      
      const authenticateUseCase = makeAuthenticateUseCase();

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