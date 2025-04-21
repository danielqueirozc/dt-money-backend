import { MakeCreateTransactionService } from "@/services/factories/make-create-transaction-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function CreateTransaction(request: FastifyRequest, reply: FastifyReply) {
    const createTransactionSchema = z.object({
       data: z.object({
            description: z.string(),
            price: z.number(),
            category: z.string(),
            type: z.enum(['INCOME', 'OUTCOME'])
       })
    })

    const { data } = createTransactionSchema.parse(request.body)

    try {
        await request.jwtVerify()

        const userId = (request.user as { sub: string }).sub;

        const createTransactionService = MakeCreateTransactionService()

        await createTransactionService.execute({
            data: {
              ...data,
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          })
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(409).send({ message: error.message })
        }
    }
}