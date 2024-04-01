import { FastifyRequest, FastifyReply } from "fastify";


export async function Profie(request: FastifyRequest, reply: FastifyReply){
    
    await request.jwtVerify()
    return reply.status(200).send()
}