import { z } from "zod";
import { router, protectedProcedure } from "../trpc";
import { TransactionService } from "../services/transaction.service";
import { TransactionRepository } from "../repositories/transaction.repository";

export const movementRouter = router({
  getLast: protectedProcedure.query(async ({ ctx }) => {
    const transactionRepository = new TransactionRepository(ctx.prisma);
    const transactionService = new TransactionService(transactionRepository);

    const transactions = await transactionService.getLastTransactions(
      ctx.user.id
    );

    return {
      success: true,
      data: transactions,
    };
  }),

  getAll: protectedProcedure
    .input(
      z
        .object({
          filter: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input, ctx }) => {
      const transactionRepository = new TransactionRepository(ctx.prisma);
      const transactionService = new TransactionService(transactionRepository);

      const transactions = await transactionService.getAllTransactions({
        userId: ctx.user.id,
        filter: input?.filter,
      });

      return {
        success: true,
        data: transactions,
      };
    }),
});

