import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repositories/user.repository";

export const authRouter = router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userRepository = new UserRepository(ctx.prisma);
      const authService = new AuthService(userRepository);

      const result = await authService.login(input);

      return {
        success: true,
        data: result,
      };
    }),
});

