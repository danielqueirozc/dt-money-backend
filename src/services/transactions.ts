import { TransactionsRepository } from "@/repositories/transactios-repository";
import { Transaction } from "@prisma/client";

export class TransactionsService {
    constructor(private transactionRepository: TransactionsRepository) {}

    async execute(): Promise<Transaction[]> {
        const transactions = await this.transactionRepository.getAll()

        return transactions
    }
}