import { FastifyInstance } from "fastify";

import { verifyJwt } from "../../middlewares/verify-jwt";

import { Register } from "../users/register";
import { Authenticate } from "../users/authenticate";
import { Profile } from "../users/profile";


export async function UserRoutes(app: FastifyInstance) {
    
    // POSTS -->
    
    app.post('/users', Register)
    app.post('/sessions', Authenticate)

    // GETTERS -->

    app.get('/me',{ onRequest: [ verifyJwt ] }, Profile)
}