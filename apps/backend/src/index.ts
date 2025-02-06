// apps/backend/src/index.ts
import express from 'express';
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const t = initTRPC.create();

const appRouter = t.router({
  hello: t.procedure
    .input(z.string().optional())
    .query(({ input }) => {
      return `Hello ${input ?? 'World'}! Welcome to Lifer`;
    }),
});

export type AppRouter = typeof appRouter;

const app = express();

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(4000, () => {
  console.log('Lifer backend running on port 4000');
});
