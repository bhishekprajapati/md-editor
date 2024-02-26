import type { EventHandler } from "h3";
import { prisma } from "~/server/lib/prisma";
import { DataResponse } from "~/server/utils/api";
import { fileCreationSchema } from "~/utils/validators";
import { filePatchSchema } from "~/utils/validators";

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
      return sendData(file);
    }

    if (access === "public") {
      const file = await prisma.file.findUniqueOrThrow({
        where: {
          id,
        },
      });

      if (file.private) {
        return apiErrors.ForbiddenError(event);
      }

      return sendData(file);
    }

    if (access === "invited") {
      const file = await prisma.sharedFile.findUniqueOrThrow({
        where: {
          fileId: id,
          userId: user.id,
        },
      });

      return sendData(file);
    }
  } catch (err) {
    console.err(err);
    return apiErrors.NotFoundError(event, {
      message: "File not found",
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

  return sendData(files);
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

  return sendData(file);
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
    return apiErrors.NotFoundError(event, { message: "File not found" });
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

  return sendData(updatedFile);
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

  return DataResponse(deletedFile);
};

export default defineEventHandler(async (event) => {
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
