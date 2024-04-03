import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

import { ZodError } from "zod";

import { env } from "./env";

import { UserRoutes } from "./HTTP/controllers/routes/user.routes";
import { GymRoutes } from "./HTTP/controllers/routes/gym.routes";
import { CheckInsRoutes } from "./HTTP/controllers/routes/check-in.routes";


export const app = fastify()

app.register(fastifyJwt, {

  secret: env.JWT_SECRET_KEY,

  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },

  sign:{
    expiresIn: '10m'
  }
})

app.register(fastifyCookie)

app.register(UserRoutes);
app.register(GymRoutes);
app.register(CheckInsRoutes);

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