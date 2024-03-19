import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "@/lib/prisma";

import { z } from "zod";
import { hash } from "bcryptjs";



export async function Register(request: FastifyRequest, reply: FastifyReply){

    const registerBodySchema = z.object({

      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    });
  
    const { name, email, password } = registerBodySchema.parse(request.body);

    const passwordHashed = await hash(password, 6)
  
    await prisma.user.create({

      data: {
        name,
        email,
        password_hash: passwordHashed,
      }
    })
  
    return reply.status(201).send()
}