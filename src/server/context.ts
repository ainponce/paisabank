import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export const createContext = async (opts: { req: NextRequest }) => {
  const token = opts.req.headers.get("Authorization");

  let user = null;
  if (token) {
    user = await prisma.user.findUnique({
      where: { token },
    });
  }

  return {
    prisma,
    user,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

