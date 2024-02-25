import { prisma } from "~/server/lib/prisma";
import { sendData } from "~/server/utils/sendData";
import handleApiErrors from "~/server/utils/handleApiErrors";

export default defineEventHandler(
  async (event) =>
    await handleApiErrors(async () => {
      const { user } = event.context;
      const { id } = getRouterParams(event);

      return sendData(
        await prisma.file.delete({
          where: {
            id,
            userId: user.id,
          },
        }),
      );
    }),
);
