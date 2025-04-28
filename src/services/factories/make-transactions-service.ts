import { PrismaTransactionsRepository } from "@/repositories/prisma/prisma-transactions-repository";
import { TransactionsService } from "../transactions";

export function MakeCreateTransactionsService() {
    const usersRepository = new PrismaTransactionsRepository()
    const transactionsService = new TransactionsService(usersRepository)

    return transactionsService
}