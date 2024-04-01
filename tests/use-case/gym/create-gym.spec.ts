import { InMemoryGymsRepos } from "@/repository/In-Memory/InMemory-gyms-repos";
import { CreateGymUseCase } from "@/use-cases/createGym";


import { expect, describe, it, beforeEach } from "vitest";



let gymRepository: InMemoryGymsRepos;
let sut: CreateGymUseCase;


describe("Create Gym use case", () => {

    beforeEach(() => {

        gymRepository = new InMemoryGymsRepos();
        sut = new CreateGymUseCase(gymRepository); 
    });

    it("should be able to create gym", async () => {

        const { gym } = await sut.execute({
            title: 'Test-title',
            description: null,
            phone: null,
            latitude: 0,
            longitude: 0,

        });

        expect(gym.id).toEqual(expect.any(String))

    });

})