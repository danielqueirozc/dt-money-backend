import { FastifyInstance } from "fastify";
import { Register } from "./controllers/resgister";

export function AppRoutes(app: FastifyInstance) {
    app.get('/sessios', Register)
}