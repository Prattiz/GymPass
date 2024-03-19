import { PrismaUsersRepos } from "@/Repository/prisma-users.repos"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { error } from "console"

interface RegisterUseCaseProps {
    name: string,
    email: string,
    password: string
}

export async function RegisterUseCase({ email, name, password}: RegisterUseCaseProps){
    
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })
  
    if (userWithSameEmail) {

      throw new Error('E-mal already exists');
    }

    
    const prismaUsersRepos = new PrismaUsersRepos()

    await prismaUsersRepos.create({
        name,
        email,
        password_hash,
    })
}