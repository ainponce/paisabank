import { type PrismaClient } from "@prisma/client";

interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByToken(token: string) {
    return await this.prisma.user.findUnique({
      where: { token },
    });
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateUserData) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }
}

