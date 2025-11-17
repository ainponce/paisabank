import { router } from "../trpc";
import { authRouter } from "./auth.router";
import { cardRouter } from "./card.router";
import { movementRouter } from "./movement.router";
import { userRouter } from "./user.router";

export const appRouter = router({
  auth: authRouter,
  cards: cardRouter,
  movements: movementRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;

