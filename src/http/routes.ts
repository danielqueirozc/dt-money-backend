import { FastifyInstance } from "fastify";
import { Register } from "./controllers/resgister";
import { Authenticate } from "./controllers/authenticate";
import { VerifyJwt } from "@/middlewares/verify-jwt";
import { CreateTransaction } from "./controllers/transaction";

export function AppRoutes(app: FastifyInstance) {
    app.get('/sessios', Register),
    app.post('athenticate',{preHandler: VerifyJwt}, Authenticate)
    app.post('transaction', {preHandler: VerifyJwt}, CreateTransaction)
}