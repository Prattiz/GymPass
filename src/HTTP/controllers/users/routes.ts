import { FastifyInstance } from "fastify";

import { Register } from "./register";
import { Authenticate } from "./authenticate";
import { Profile } from "./profile";

import { verifyJwt } from "../../middlewares/verify-jwt";


export async function UserRoutes(app: FastifyInstance) {
    
    // POSTS -->
    
    app.post('/users', Register)
    app.post('/sessions', Authenticate)

    // GETTERS -->

    app.get('/me',{ onRequest: [ verifyJwt ] }, Profile)
}