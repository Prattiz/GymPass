import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/verify-jwt";

import { createGym } from "../gyms/create-gym";
import { Search } from "../gyms/search";
import { Nearby } from "../gyms/nearby";
import { verifyUserRole } from "@/HTTP/middlewares/verifyUserRole";


export async function GymRoutes(app: FastifyInstance) {

    app.addHook('onRequest', verifyJwt)

    app.get('/gyms/search', Search)
    app.get('/gyms/nearby', Nearby)
  
    

    app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, createGym)
}