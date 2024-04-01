import { FastifyInstance } from "fastify";
import { Register } from "./controllers/register";
import { Authenticate } from "./controllers/authenticate";
import { Profie } from "./controllers/profile";


export async function Routes(app: FastifyInstance) {
    
    // POSTS -->
    
    app.post('/users', Register)
    app.post('/sessions', Authenticate)

    // GETTERS -->

    app.get('/me', Profie)
}