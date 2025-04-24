import { beforeEach, describe, expect, it } from "vitest";
import { TransactionService } from "./transaction";
import { InMemoryTransactionsRepository } from "@/repositories/in-memory/in-memory-transactions-respository";
import { TransactionsService } from "./transactions";

let transactionsRepository: InMemoryTransactionsRepository
let transactionService: TransactionService
let sut: TransactionsService

describe('Transaction use case', () => {
    beforeEach(() => {
        transactionsRepository = new InMemoryTransactionsRepository()
        transactionService = new TransactionService(transactionsRepository)
        sut = new TransactionsService(transactionsRepository)
        
    })

    it('should be able to list all transactions', async () => {
        const transaction = await transactionService.execute({ data: {
            description: 'New transaction',
            price: 5000,
            type: 'INCOME',
            category: 'Salary',
            createdAt: new Date(),
            user: {
                connect: {
                    id: 'default-user-id'
                }
            }
        } })

        const transactions = await sut.execute()

        expect(transactions.length).toEqual(1)
    })

})