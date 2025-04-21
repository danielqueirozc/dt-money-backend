import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "../authenticate";
import { PrismaTransactionsRepository } from "@/repositories/prisma/prisma-transactions-repository";
import { TransactionService } from "../transaction";

export function MakeCreateTransactionService() {
    const usersRepository = new PrismaTransactionsRepository()
    const transactionService = new TransactionService(usersRepository)

    return transactionService
}