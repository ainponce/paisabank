import { router, protectedProcedure } from "../trpc";
import { CardService } from "../services/card.service";
import { CardRepository } from "../repositories/card.repository";

export const cardRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const cardRepository = new CardRepository(ctx.prisma);
    const cardService = new CardService(cardRepository);

    const cards = await cardService.getUserCards(ctx.user.id);

    return {
      success: true,
      data: cards,
    };
  }),
});

