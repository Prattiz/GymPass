import type { Gym } from "@prisma/client";
import { GymsRepository } from "@/repository/gyms-repository";


interface SearchGymsUseCaseRequest {
    
    query: string,
    page: number,

}

interface SearchGymsUseCaseResponse {
  gym: Gym[]
}

export class SearchGymsUseCase {
  
  constructor(private GymsRepository:  GymsRepository){}

  async execute({ query, page }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {

    const gym = await this.GymsRepository.searchMany(
        query,
        page
    )

    return { gym }
  }
}