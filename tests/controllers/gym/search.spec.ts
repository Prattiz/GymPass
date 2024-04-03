import request from 'supertest';
import { app } from '@/app';

import { createAndAuthenticateUser } from 'tests/utils/create-and-authenticate-user';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Search Gyms (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  });

  afterAll(async () => {
    await app.close()
  });

  it('should be able to search gyms by title', async () => {

    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym one',
        description: 'a',
        phone: '9999999999',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym TWO',
        description: 'a',
        phone: '1999999999',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'one',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)

    expect(response.body.gyms).toHaveLength(1)

    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Gym one',
      }),
    ])

  });
  
})