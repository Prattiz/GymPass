import fastify from "fastify";

import { Routes } from "./HTTP/routes";


export const app = fastify()

app.register(Routes)