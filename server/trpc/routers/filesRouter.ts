import { z } from "zod";

import { protectedProcedure, router } from "~/server/trpc/trpc";
import { getOwnFile, getPublicFile, getSharedFile } from "~/server/lib/prisma";
import { TRPCError } from "@trpc/server";

export const filesRouter = router({
  read: protectedProcedure
    .input(
      z.object({
        fileId: z.string().trim().min(1),
        access: z.enum(["public", "private", "owner"]).default("owner"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { fileId, access } = input;
      const userId = ctx.user.id;

      let file;
      switch (access) {
        case "owner":
          file = await getOwnFile(fileId, userId);
          break;

        case "private":
          const sharedFile = await getSharedFile(fileId, userId);
          file = sharedFile?.file;
          break;

        case "public":
          file = await getPublicFile(fileId);
          break;
      }

      if (!file) {
        throw new TRPCError({ code: "NOT_FOUND", message: "File not found." });
      }

      return file;
    }),

  list: protectedProcedure
    .input(
      z.object({
        page: z.coerce
          .number()
          .int()
          .min(1)
          .max(Number.MAX_SAFE_INTEGER)
          .default(1),
      }),
    )
    .query(async ({ ctx, input: opts }) => {
      const { db } = ctx;
      const PAGE_SIZE = 10;
      const files = await db(
        async (prisma) =>
          await prisma.file.findMany({
            where: {
              userId: ctx.user.id,
            },
            skip: (opts.page - 1) * PAGE_SIZE,
            take: PAGE_SIZE,
          }),
      );

      return {
        files,
        meta: {
          page: opts.page,
        },
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().trim().min(10).max(40),
        content: z.string().trim().min(0).max(10_000),
      }),
    )
    .mutation(async ({ ctx, input: payload }) => {
      const { db } = ctx;
      return await db(
        async (prisma) =>
          await prisma.file.create({
            data: {
              userId: ctx.user.id,
              ...payload,
            },
          }),
      );
    }),

  update: protectedProcedure
    .input(
      z.object({
        fileId: z.string().trim().min(1),
        data: z.object({
          name: z.string().trim().min(10).max(40).optional(),
          private: z.boolean().optional(),
          content: z.string().trim().min(0).max(10_000).optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input: payload }) => {
      const { db } = ctx;
      const updatedFile = await db(async (prisma) => {
        return await prisma.file.update({
          where: { id: payload.fileId, userId: ctx.user.id },
          data: payload.data,
        });
      });

      return updatedFile;
    }),

  delete: protectedProcedure
    .input(z.string().min(1))
    .mutation(async ({ input: fileId, ctx }) => {
      const { db } = ctx;
      return await db(async (prisma) => {
        return await prisma.file.delete({
          where: {
            id: fileId,
            userId: ctx.user.id,
          },
        });
      });
    }),
});
