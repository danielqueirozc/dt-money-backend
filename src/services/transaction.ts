import { TransactionsRepository } from "@/repositories/transactios-repository";
import { Prisma, Transaction } from "@prisma/client";
interface TransactionRequest {
    data: Prisma.TransactionCreateInput
}

export class TransactionService {
    constructor(private transactionRepository: TransactionsRepository) {}

    async execute({ data }: TransactionRequest): Promise<Transaction> {
        const transaction = await this.transactionRepository.create(data) // constructor e public se referir com this

        return transaction
    }

    async getAll(): Promise<Transaction[]> {
        const transactions = await this.transactionRepository.getAll()

        return transactions
    } 
}