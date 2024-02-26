import { prisma } from "~/server/lib/prisma";
import { DataResponse } from "~/server/utils/api";

export default defineEventHandler(async (event) => {
  const { user } = event.context;
  const { id } = getRouterParams(event);

  const deletedFile = await prisma.file.delete({
    where: {
      id,
      userId: user.id,
    },
  });

  return DataResponse(deletedFile);
});
