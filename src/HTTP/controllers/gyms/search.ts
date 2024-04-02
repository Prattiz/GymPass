import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeSearchGymsUseCase } from '@/use-cases/factories/makeSearchGymsUseCase';

export async function Search(request: FastifyRequest, reply: FastifyReply) {

  const searchGymsQuerySchema = z.object({

    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchGymsQuerySchema.parse(request.body);

  const searchGymsUseCase = makeSearchGymsUseCase();

  const { gym } = await searchGymsUseCase.execute({

    query: q,
    page,
  });

  return reply.status(200).send({ gym })
}