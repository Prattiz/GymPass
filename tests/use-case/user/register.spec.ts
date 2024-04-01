import { InMemoryUsersRepos } from "@/repository/In-Memory/InMemory-users-repos";
import { RegisterUseCase } from "@/use-cases/register";

import { userAlreadyExistsError } from "@/use-cases/errors/userAlreadyExists";

import { compare } from "bcryptjs";

import { expect, describe, it, beforeEach } from "vitest";


let usersRepository: InMemoryUsersRepos;
let sut: RegisterUseCase;


describe("Register use case", () => {

    beforeEach(() => {

        usersRepository = new InMemoryUsersRepos;
        sut = new RegisterUseCase(usersRepository); 
    });

    it("should be able to register", async () => {

        const { user } = await sut.execute({
            name: 'Test-Name',
            email: "emailTest@test.com",
            password: 'password test'
        });

        expect(user.id).toEqual(expect.any(String))

    });


    it("should hash user password upon registration", async () => {
        
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