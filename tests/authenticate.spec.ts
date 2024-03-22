import { InMemoryUsersRepos } from '@/Repository/In-Memory/users-repos'; 
import { AuthenticateUseCase } from '@/UseCases/authenticate';

import { InvalidCredentialsError } from '@/UseCases/errors/invalidCredentials';

import { hash } from 'bcryptjs';

import { expect, describe, it } from 'vitest';


describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {

    const usersRepository = new InMemoryUsersRepos();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({

      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({

      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepos();
    const sut = new AuthenticateUseCase(usersRepository);

    expect(() =>

      sut.execute({

        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong email', async () => {

    const usersRepository = new InMemoryUsersRepos();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({

      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    expect( async () =>
        await sut.execute({

            email: 'johndoe@example.com',
            password: '123123',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})