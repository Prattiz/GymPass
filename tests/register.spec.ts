import { InMemoryUsersRepos } from "@/Repository/In-Memory/users-repos";
import { RegisterUseCase } from "@/UseCases/register";

import { userAlreadyExistsError } from "@/UseCases/errors/userAlreadyExists";

import { compare } from "bcryptjs";

import { expect, describe, it } from "vitest";

describe("Register use case", () => {

    it("should be able to register", async () => {
        
        const usersRepository = new InMemoryUsersRepos;
        const sut = new RegisterUseCase(usersRepository);

        
        const { user } = await sut.execute({
            name: 'Test-Name',
            email: "emailTest@test.com",
            password: 'password test'
        });

        expect(user.id).toEqual(expect.any(String))

    });


    it("should hash user password upon registration", async () => {
        
        const usersRepository = new InMemoryUsersRepos;
        const sut = new RegisterUseCase(usersRepository);
        
        const { user } = await sut.execute({
            name: 'Test-Name',
            email: "emailTest@test.com",
            password: 'this password must be hashed'
        });

        const isPasswordCorrectlyHashed = await compare(
            'this password must be hashed',
            user.password_hash
        );

        expect(isPasswordCorrectlyHashed).toBe(true)
    });

    it("should not be able to register with the same e-mail twice", async () => {
        
        const usersRepository = new InMemoryUsersRepos;
        const sut = new RegisterUseCase(usersRepository);

        const email = 'notregistertwice@test.com'
        
        await sut.execute({
            name: 'Test-Name',
            email,
            password: 'password test'
        });

        await expect(() => 
            sut.execute({
                name: 'Test-Name',
                email,
                password: 'password test'
            }) 
        ).rejects.toBeInstanceOf(userAlreadyExistsError)
    });
})