import { FastifyRequest, FastifyReply } from "fastify";

import { z } from "zod"; 

import { InvalidCredentialsError } from "@/use-cases/errors/invalidCredentials";
import { makeAuthenticateUseCase } from "@/use-cases/factories/makeAuthenticateUseCase";


export async function Authenticate(request: FastifyRequest, reply: FastifyReply){

    const authenticateBodySchema = z.object({

      email: z.string().email(),
      password: z.string().min(6),
    });
  
    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
      
      const authenticateUseCase = makeAuthenticateUseCase();

      const { user } = await authenticateUseCase.execute({

        email,
        password,
      });

      const token = await reply.jwtSign({}, {
        sign: {
          sub: user.id
        }
      });

      const refreshToken = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id,
            expiresIn: '31d'
          }
        }
      )

      return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true
      })
      .status(200)
      .send({ token })

    } catch (error) {

      if( error instanceof InvalidCredentialsError ){

        return reply.status(409).send({ Message: error.message })
      }

      throw error ; 
    }
}