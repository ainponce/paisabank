import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { UserService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";

export const userRouter = router({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const userRepository = new UserRepository(ctx.prisma);
    const userService = new UserService(userRepository);

    const profile = await userService.getProfile(ctx.user.id);

    return {
      success: true,
      data: profile,
    };
  }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).optional(),
        email: z.string().email().optional(),
        currentPassword: z.string().optional(),
        newPassword: z.string().min(6).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userRepository = new UserRepository(ctx.prisma);
      const userService = new UserService(userRepository);

      const updatedProfile = await userService.updateProfile({
        userId: ctx.user.id,
        ...input,
      });

      return {
        success: true,
        data: updatedProfile,
        message: "Perfil actualizado exitosamente",
      };
    }),
});

