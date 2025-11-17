import { TRPCError } from "@trpc/server";
import { UserRepository } from "../repositories/user.repository";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(params: { email: string; password: string }) {
    const user = await this.userRepository.findByEmail(params.email);

    if (!user || user.password !== params.password) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }

    return {
      name: user.name,
      token: user.token,
    };
  }
}

