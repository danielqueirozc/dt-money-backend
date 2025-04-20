import { Prisma } from "@prisma/client";
import { TransactionsRepository } from "../transactios-repository";
import { prisma } from "@/lib/prisma";

export class PrismaTransactionsRepository implements TransactionsRepository {
    async create(data: Prisma.TransactionCreateInput) {
        const transaction = await prisma.transaction.create({ data })

        return transaction
    }

    async getAll() {
        const transactions = await prisma.transaction.findMany()

        return transactions
    }
}