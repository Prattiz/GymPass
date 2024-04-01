import type { Gym } from "@prisma/client";
import { GymsRepository } from "@/repository/gyms-repository";


interface CreateGymUseCaseRequest {
    
    title: string,
    description: string | null,
    phone: string | null,
    latitude: number,
    longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  
  constructor(private  GymsRepository:  GymsRepository){}

  async execute({ title, description, latitude, longitude, phone }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {

    const gym = await this. GymsRepository.create({
      title,
      description,
      latitude,
      longitude,
      phone
      
    })

    return { gym }
  }
}