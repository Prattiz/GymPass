import { InMemoryUsersRepos } from '@/Repository/In-Memory/users-repos'; 
import { AuthenticateUseCase } from '@/UseCases/authenticate';

import { InvalidCredentialsError } from '@/UseCases/errors/invalidCredentials';

import { hash } from 'bcryptjs';


import { expect, describe, it, beforeEach } from 'vitest';


let usersRepository: InMemoryUsersRepos;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  
  beforeEach(() => {

    usersRepository = new InMemoryUsersRepos();
    sut = new AuthenticateUseCase(usersRepository);
  })


  it('should be able to authenticate', async () => {

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

    expect(() =>

      sut.execute({

        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong email', async () => {

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