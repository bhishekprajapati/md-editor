import { prisma } from "~/server/lib/prisma";
import { sendData } from "~/server/utils/sendData";
import handleApiErrors from "~/server/utils/handleApiErrors";

export default defineEventHandler(
  async (event) =>
    await handleApiErrors(async () => {
      const { user } = event.context;
      const files = await prisma.file.findMany({
        where: {
          userId: user.id,
        },
      });

      return sendData(files);
    }),
);
