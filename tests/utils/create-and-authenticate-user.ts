import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(app: FastifyInstance) {

  await request(app.server).post('/users').send({

    name: 'Testname',
    email: 'testemail@example.com',
    password: 'password12',
  })

  const authResponse = await request(app.server).post('/sessions').send({

    email: 'testemail@example.com',
    password: 'password12',
  });

  const { token } = authResponse.body ;

  return { token }
}