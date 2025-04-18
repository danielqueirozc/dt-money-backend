import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

export const app = fastify({ logger: true }) // logger: true => mostra os logs no terminal
