import { MakeAuthenticateService } from "@/services/factories/make-authenticate-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateSchema = z.object({
        email: z.string().email(),
        password: z.string().min(4),
    })

    const { email, password } = authenticateSchema.parse(request.body)

    try {
        const authenticateService = MakeAuthenticateService()

        await authenticateService.execute({ email, password })
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(400).send({ message: error.message })
        }
    }

    return reply.status(200).send()
}