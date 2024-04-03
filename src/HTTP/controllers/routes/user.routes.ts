import { FastifyInstance } from "fastify";

import { verifyJwt } from "../../middlewares/verify-jwt";

import { Register } from "../users/register";
import { Authenticate } from "../users/authenticate";
import { Profile } from "../users/profile";
import { Refresh } from "../users/refresh";


export async function UserRoutes(app: FastifyInstance) {
    
    // POSTS -->
    
    app.post('/users', Register)
    app.post('/sessions', Authenticate)

    // GETTERS -->

    app.get('/me',{ onRequest: [ verifyJwt ] }, Profile)

    // PATCH -->

    app.patch('/token/refresh', Refresh)
}