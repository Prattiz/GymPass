import { FastifyRequest, FastifyReply } from "fastify";

import { z } from "zod";

import { userAlreadyExistsError } from "@/use-cases/errors/userAlreadyExists";
import { makeRegisterUseCase } from "@/use-cases/factories/makeRegisterUseCase";


export async function Register(request: FastifyRequest, reply: FastifyReply){

    const registerBodySchema = z.object({

      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });
  
    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
      
      const registerUseCase = makeRegisterUseCase();

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