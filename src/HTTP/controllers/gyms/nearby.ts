import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/makeFetchNearbyGymsUseCase';

export async function Nearby(request: FastifyRequest, reply: FastifyReply) {

    const nearbyGymsQuerySchema = z.object({

        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    });

    const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();

    const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.body)

    const { gyms } = await fetchNearbyGymsUseCase.execute({

        userLatitude: latitude,
        userLongitude: longitude,
    })

    return reply.status(200).send({ gyms })
}