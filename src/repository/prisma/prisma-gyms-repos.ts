import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymsRepos implements GymsRepository {

   async findById(id: string){
        
        const gym = await prisma.gym.findUnique({ where: { id } });

        return gym
    }

   async create(data: Prisma.GymCreateInput) {

        const gym = await prisma.gym.create({ data });

        return gym
    }

   async searchMany(query: string, page: number){
        
        const gyms = await prisma.gym.findMany({

            where: {

                title: {
                    contains: query,
                }
            },

            take: 20,
            skip:(page - 1) * 20
        });

        return gyms
    }

    async findManyNearby(params: FindManyNearbyParams){

        const gyms = await prisma.$queryRaw<Gym[]>`
            SELECT * from gyms
            WHERE ( 6371 * acos( cos( radians(${params.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.longitude}) ) + sin( radians(${params.latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
        `

        return gyms
    }

}