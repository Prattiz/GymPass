import { InMemoryUsersRepos } from '@/repository/In-Memory/InMemory-users-repos'
import { ResourceNotFoundError } from '@/use-cases/errors/resourceNotFound'
import { GetUserProfileUseCase } from '@/use-cases/getUserProfile'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

let usersRepository: InMemoryUsersRepos
let sut: GetUserProfileUseCase
let role 

describe('Get User Profile Use Case', () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepos()
    sut = new GetUserProfileUseCase(usersRepository)
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
   })
})