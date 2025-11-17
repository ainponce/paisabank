import { TRPCError } from "@trpc/server";
import { UserRepository } from "../repositories/user.repository";

interface UpdateProfileParams {
  userId: number;
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getProfile(userId: number) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  async updateProfile(params: UpdateProfileParams) {
    const user = await this.userRepository.findById(params.userId);

    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found",
      });
    }

    if (params.email && params.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(params.email);
      if (existingUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Email already in use",
        });
      }
    }

    if (params.newPassword) {
      if (!params.currentPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Current password is required",
        });
      }

      if (user.password !== params.currentPassword) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Current password is incorrect",
        });
      }
    }

    const updateData: {
      name?: string;
      email?: string;
      password?: string;
    } = {};

    if (params.name) {
      updateData.name = params.name;
    }

    if (params.email) {
      updateData.email = params.email;
    }

    if (params.newPassword) {
      updateData.password = params.newPassword;
    }

    const updatedUser = await this.userRepository.update(
      params.userId,
      updateData
    );

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    };
  }
}

