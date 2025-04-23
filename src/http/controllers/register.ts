import { MakeRegisterService } from "@/services/factories/make-register-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Register(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(4),
    })

    const { name, email, password } = bodySchema.parse(request.body)

    try {
        const registerService = MakeRegisterService()

        await registerService.execute({ name, email, password })
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(409).send({ message: error.message })
        }
    }   

    return reply.status(201).send()
}