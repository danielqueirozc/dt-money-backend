import { MakeCreateTransactionsService } from "@/services/factories/make-transactions-service"
import { FastifyReply, FastifyRequest } from "fastify"

export async function GetTransactions(request: FastifyRequest, reply: FastifyReply) {
    const transactionsService = MakeCreateTransactionsService()

    const transactions = await transactionsService.execute()

    return reply.status(200).send(transactions)
}