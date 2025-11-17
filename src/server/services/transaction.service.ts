import { TransactionRepository } from "../repositories/transaction.repository";

export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async getLastTransactions(userId: number) {
    return await this.transactionRepository.findLastByUserId(userId, 5);
  }

  async getAllTransactions(params: { userId: number; filter?: string }) {
    return await this.transactionRepository.findAllByUserId(
      params.userId,
      params.filter
    );
  }
}

