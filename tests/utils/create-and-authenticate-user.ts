import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser( app: FastifyInstance, isAdmin = false) {
  
  await prisma.user.create({
    data: {
      name: 'Testname',
      email: 'testemail@example.com',
      password_hash: await hash('password12', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  }) 

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