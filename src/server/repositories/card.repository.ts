import { type PrismaClient } from "@prisma/client";

export class CardRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByUserId(userId: number) {
    return await this.prisma.card.findMany({
      where: { userId },
      orderBy: { id: "asc" },
    });
  }
}

