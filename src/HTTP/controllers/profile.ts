import { makeGetUserProfileUseCase } from "@/use-cases/factories/makeGetUserProfileUseCase";
import { FastifyRequest, FastifyReply } from "fastify";


export async function Profie(request: FastifyRequest, reply: FastifyReply){
    
    await request.jwtVerify()

    const getUserProfile = makeGetUserProfileUseCase();
    const { user } = await getUserProfile.execute({

        userId: request.user.sub
    })

    return reply.status(200).send({ user })
}