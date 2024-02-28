import type { EventHandler } from "h3";
import type { AuthenticatedUser } from "~/server/types";

import { z } from "zod";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

import { dataResponse } from "~/server/utils/api";
import defineSafeEventHandler from "~/server/utils/handler";
import {
  getOwnFile,
  getOwnFiles,
  getPublicFile,
  getSharedFile,
} from "~/server/lib/prisma";
import { dbQuery } from "~/server/lib/db";

const GETQuerySchema = z.object({
  access: z.enum(["public", "shared"]).optional(),
});

function throwIfFileNotFound(file: any) {
  if (!file) {
    throw createError({
      statusCode: StatusCodes.NOT_FOUND,
      statusMessage: "File not found.",
    });
  }
}

export const GET: EventHandler = async (event) => {
  const user = event.context.user as AuthenticatedUser;
  const parsedQueries = GETQuerySchema.safeParse(getQuery<object>(event));
  const requestedFileId = getRouterParams(event)?.id;

  if (!parsedQueries.success || !requestedFileId) {
    throw createError({
      fatal: true,
      statusCode: StatusCodes.NOT_FOUND,
      statusMessage: "Broken link",
    });
  }

  const accessQuery = parsedQueries.data.access;

  if (!accessQuery) {
    const file = await getOwnFile(requestedFileId, user);
    throwIfFileNotFound(file);
    return dataResponse(file);
  }

  if (accessQuery === "public") {
    const file = await getPublicFile(requestedFileId);
    throwIfFileNotFound(file);
    return dataResponse(file);
  }

  if (accessQuery === "shared") {
    const file = await getSharedFile(requestedFileId, user);
    throwIfFileNotFound(file);
    return dataResponse(file);
  }
};

export const GETALL: EventHandler = async (event) => {
  const user = event.context.user as AuthenticatedUser;
  const query = getQuery<{ page: any; pageSize: any }>(event);
  const results = await getOwnFiles(
    {
      page: query?.page,
      pageSize: query?.pageSize,
    },
    user,
  );

  return dataResponse(results.files, {
    pagination: {
      page: results.page,
      pageSize: results.pageSize,
      totalPages: results.totalPages,
    },
  });
};

export const POST: EventHandler = async (event) => {
  const user = event.context.user as AuthenticatedUser;
  const payload = await readBody(event);

  const file = await dbQuery(async (prisma) =>
    prisma.file.create({
      data: {
        userId: user.id,
        ...payload.data,
      },
    }),
  );

  return dataResponse(file);
};

export const PATCH: EventHandler = async (event) => {
  const user = event.context.user as AuthenticatedUser;
  const payload = await readBody(event);

  const updatedFile = await dbQuery(async (prisma) => {
    return prisma.file.update({
      where: {
        id: payload.data.id,
        userId: user.id,
      },
      data: payload,
    });
  });

  return dataResponse(updatedFile);
};

export const DELETE: EventHandler = async (event) => {
  const user = event.context.user as AuthenticatedUser;
  const { id } = getRouterParams(event);

  const deletedFile = await dbQuery(async (prisma) => {
    return prisma.file.delete({
      where: {
        id,
        userId: user.id,
      },
    });
  });

  return dataResponse(deletedFile);
};

export default defineSafeEventHandler(async (event) => {
  switch (event.method) {
    case "GET":
      return getRouterParams(event)?.id
        ? await GET(event)
        : await GETALL(event);
    case "POST":
      return await POST(event);
    case "PATCH":
      return await PATCH(event);
    case "DELETE":
      return await DELETE(event);
  }
});
