import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";

import { ZodError } from "zod";

import { env } from "./env";

import { UserRoutes } from "./HTTP/controllers/users/routes";
import { GymRoutes } from "./HTTP/controllers/gyms/routes";


export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET_KEY
})

app.register(UserRoutes);
app.register(GymRoutes);

app.setErrorHandler(( error, _, reply ) => {

    if (error instanceof ZodError) {

      return reply
        .status(400)
        .send({ message: 'Validation error.', issues: error.format() })
    }
  
    if (env.NODE_ENV !== 'production') {
      console.error(error)
    } else {
      // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
    }
  
    return reply.status(500).send({ message: 'Internal server error.' })
})