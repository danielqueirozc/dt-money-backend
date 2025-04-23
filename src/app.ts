import fastify from "fastify";
import fastifyJwt from "fastify-jwt";

import 'dotenv/config'
import fastifyCookie from "@fastify/cookie";
import { AppRoutes } from "./http/routes";

export const app = fastify({ logger: true }) // logger: true => mostra os logs no terminal

app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'secret',
    cookie: {
        cookieName: 'token',
        signed: false
    }
})

app.register(fastifyCookie)
app.register(AppRoutes)
