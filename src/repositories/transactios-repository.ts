import { Prisma, Transaction } from "@prisma/client";

export interface TransactionsRepository {
    create(data: Prisma.TransactionCreateInput): Promise<Transaction>
    getAll(): Promise<Transaction[]>
}