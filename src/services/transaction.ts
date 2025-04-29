import { TransactionsRepository } from "@/repositories/transactios-repository";
import { Transaction } from "@prisma/client";
import { TransactionType } from "@prisma/client";

interface TransactionRequest {
    description: string
    price: number
    category: string
    type: TransactionType
    userId: string
}

export class TransactionService {
    constructor(private transactionRepository: TransactionsRepository) {}

    async execute({ description, price, category, type, userId }: TransactionRequest): Promise<Transaction> {
        const transaction = await this.transactionRepository.create({
            user: {
                connect: {
                    id: userId
                }
            },
            description,
            price,
            category,
            type
        }) // constructor e public se referir com this

        return transaction
    }

    async getAll(): Promise<Transaction[]> {
        const transactions = await this.transactionRepository.getAll()

        return transactions
    } 
}