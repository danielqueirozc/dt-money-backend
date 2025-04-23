import { FastifyInstance } from "fastify";
import { Register } from "./controllers/register";
import { Authenticate } from "./controllers/authenticate";
import { VerifyJwt } from "@/middlewares/verify-jwt";
import { CreateTransaction } from "./controllers/transaction";

export function AppRoutes(app: FastifyInstance) {
    app.post('/sessions', Register),
    app.post('/authenticate', Authenticate)
    app.post('/transaction', {preHandler: VerifyJwt}, CreateTransaction)
}