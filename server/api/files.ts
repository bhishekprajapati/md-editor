import type { EventHandler } from "h3";

import { prisma } from "~/server/lib/prisma";
import { dataResponse } from "~/server/utils/api";
import { fileCreationSchema } from "~/utils/validators";
import { filePatchSchema } from "~/utils/validators";
import defineSafeEventHandler from "~/server/utils/handler";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

const GET: EventHandler = async (event) => {
  try {
    const { user } = event.context;
    const { access } = getQuery(event);
    const { id } = getRouterParams(event);

    /**
     * if access isn't queried
     * then look in the user's own files
     */
    if (!access) {
      const file = await prisma.file.findUniqueOrThrow({
        where: { id, userId: user.id },
      });
      return dataResponse(file);
    }

    if (access === "public") {
      const file = await prisma.file.findUniqueOrThrow({
        where: {
          id,
        },
      });

      if (file.private) {
        throw createError({
          statusCode: StatusCodes.FORBIDDEN,
          statusMessage: getReasonPhrase(StatusCodes.FORBIDDEN),
        });
      }

      return dataResponse(file);
    }

    if (access === "invited") {
      const file = await prisma.sharedFile.findUniqueOrThrow({
        where: {
          fileId: id,
          userId: user.id,
        },
      });

      return dataResponse(file);
    }
  } catch (err) {
    throw createError({
      statusCode: StatusCodes.NOT_FOUND,
      statusMessage: "File not found.",
    });
  }
};

const GETALL: EventHandler = async (event) => {
  const { user } = event.context;
  const files = await prisma.file.findMany({
    where: {
      userId: user.id,
    },
  });

  return dataResponse(files);
};

const POST: EventHandler = async (event) => {
  const { user } = event.context;
  const data = fileCreationSchema.parse(await readBody(event));
  const file = await prisma.file.create({
    data: {
      userId: user.id,
      ...data,
    },
  });

  return dataResponse(file);
};

const PATCH: EventHandler = async (event) => {
  const { user } = event.context;
  const body = await readBody(event);
  const { id, ...data } = await filePatchSchema.parseAsync(body);

  const file = await prisma.file.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!file) {
    throw createError({
      statusCode: StatusCodes.NOT_FOUND,
      statusMessage: "File not found.",
    });
  }

  const updatedFile = await prisma.file.update({
    where: {
      id,
      userId: user.id,
    },
    data,
    // only return the mutated fields
    select: {
      id: true,
      name: !!data?.name,
      private: !!data?.private,
      content: !!data?.content,
      updatedAt: true,
    },
  });

  return dataResponse(updatedFile);
};

const DELETE: EventHandler = async (event) => {
  const { user } = event.context;
  const { id } = getRouterParams(event);

  const deletedFile = await prisma.file.delete({
    where: {
      id,
      userId: user.id,
    },
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
