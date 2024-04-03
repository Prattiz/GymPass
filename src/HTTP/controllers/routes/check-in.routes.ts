import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/HTTP/middlewares/verify-jwt'

import { createCheckIn } from '../check-ins/create-check-in';
import { Validate } from '../check-ins/validate';
import { History } from '../check-ins/history';
import { Metrics } from '../check-ins/metrics';
import { verifyUserRole } from '@/HTTP/middlewares/verifyUserRole';

export async function CheckInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  
  app.get('/check-ins/history', History)
  app.get('/check-ins/metrics', Metrics)

  app.post('/gyms/:gymId/check-ins', createCheckIn)

  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    Validate,
  )
}