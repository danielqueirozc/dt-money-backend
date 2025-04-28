import { FastifyInstance } from "fastify";
import { Register } from "./controllers/register";
import { Authenticate } from "./controllers/authenticate";
import { VerifyJwt } from "@/middlewares/verify-jwt";
import { CreateTransaction } from "./controllers/transaction";
import { GetTransactions } from "./controllers/transactions";

export function AppRoutes(app: FastifyInstance) {
    app.post('/users', Register),
    app.post('/sessions', Authenticate)
    app.post('/transaction', {preHandler: VerifyJwt}, CreateTransaction)
    app.get('/transactions', {preHandler: VerifyJwt}, GetTransactions)
}