import { type PrismaClient } from "@prisma/client";

export class TransactionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findLastByUserId(userId: number, limit: number = 5) {
    return await this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: limit,
    });
  }

  async findAllByUserId(userId: number, transactionType?: string) {
    return await this.prisma.transaction.findMany({
      where: {
        userId,
        ...(transactionType ? { transactionType } : {}),
      },
      orderBy: { date: "desc" },
    });
  }
}

