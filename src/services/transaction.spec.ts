import { beforeEach, describe, expect, it } from "vitest";
import { TransactionService } from "./transaction";
import { InMemoryTransactionsRepository } from "@/repositories/in-memory/in-memory-transactions-respository";

let transactionsRepository: InMemoryTransactionsRepository
let sut: TransactionService

describe('Transaction use case', () => {
    beforeEach(() => {
        transactionsRepository = new InMemoryTransactionsRepository()
        sut = new TransactionService(transactionsRepository) 
    })

    it('should be able to create a transaction', async () => {
        const transaction = await sut.execute({ data: {
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

        expect(transaction.id).toEqual(expect.any(String))
    })

})