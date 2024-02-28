import { z } from "zod";
import { StatusCodes } from "http-status-codes";

import { publicProcedure, router } from "~/server/trpc/trpc";
import { db } from "~/server/lib/db";

export const filesRouter = router({
  read: publicProcedure.query(() => {}),
  write: publicProcedure.query(() => {}),
  update: publicProcedure.query(() => {}),
  delete: publicProcedure.query(() => {}),
  list: publicProcedure.query(() => {}),
});

// const user = event.context.user as AuthenticatedUser;
// const parsedQueries = GETQuerySchema.safeParse(getQuery<object>(event));
// const requestedFileId = getRouterParams(event)?.id;

// if (!parsedQueries.success || !requestedFileId) {
//   throw createError({
//     fatal: true,
//     statusCode: StatusCodes.NOT_FOUND,
//     statusMessage: "Broken link",
//   });
// }

// const accessQuery = parsedQueries.data.access;

// if (!accessQuery) {
//   const file = await getOwnFile(requestedFileId, user);
//   throwIfFileNotFound(file);
//   return dataResponse(file);
// }

// if (accessQuery === "public") {
//   const file = await getPublicFile(requestedFileId);
//   throwIfFileNotFound(file);
//   return dataResponse(file);
// }

// if (accessQuery === "shared") {
//   const file = await getSharedFile(requestedFileId, user);
//   throwIfFileNotFound(file);
//   return dataResponse(file);
// }

// get all
// const user = event.context.user as AuthenticatedUser;
// const query = getQuery<{ page: any; pageSize: any }>(event);
// const results = await getOwnFiles(
//   {
//     page: query?.page,
//     pageSize: query?.pageSize,
//   },
//   user,
// );

// post
// const user = event.context.user as AuthenticatedUser;
// const payload = await readBody(event);

// const file = await dbQuery(async (prisma) =>
//   prisma.file.create({
//     data: {
//       userId: user.id,
//       ...payload.data,
//     },
//   }),
// );

// patch
// const user = event.context.user as AuthenticatedUser;
// const payload = await readBody(event);

// const updatedFile = await dbQuery(async (prisma) => {
//   return prisma.file.update({
//     where: {
//       id: payload.data.id,
//       userId: user.id,
//     },
//     data: payload,
//   });
// });

// delete
// const user = event.context.user as AuthenticatedUser;
// const { id } = getRouterParams(event);

// const deletedFile = await dbQuery(async (prisma) => {
//   return prisma.file.delete({
//     where: {
//       id,
//       userId: user.id,
//     },
//   });
// });
