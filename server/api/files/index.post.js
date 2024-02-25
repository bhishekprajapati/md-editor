import { prisma } from "~/server/lib/prisma";
import { sendData } from "~/server/utils/sendData";
import handleApiErrors from "~/server/utils/handleApiErrors";
import { fileCreationSchema } from "~/utils/validators";

export default defineEventHandler(
  async (event) =>
    await handleApiErrors(async () => {
      const { user } = event.context;
      const data = fileCreationSchema.parse(await readBody(event));
      const file = await prisma.file.create({
        data: {
          userId: user.id,
          ...data,
        },
      });

      return sendData(file);
    }),
);
