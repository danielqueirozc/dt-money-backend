import { TransactionsRepository } from "../transactios-repository";
import { Prisma, Transaction, TransactionType } from "@prisma/client";

import { randomUUID } from "crypto";

export class InMemoryTransactionsRepository implements TransactionsRepository {
    public items: Transaction[] = []

    async create(data: Prisma.TransactionCreateInput) {
        const transaction = {
            id: randomUUID(),
            description: data.description || '',
            type: data.type|| TransactionType.OUTCOME,
            price: data.price || 0,
            category: data.category || '',
            createdAt: new Date(),
            userId: data.user?.connect?.id ||'default-user-id'
        }

        this.items.push(transaction)
        return transaction
    }

    async getAll() {
        return this.items
    }
}