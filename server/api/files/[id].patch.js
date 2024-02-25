import { apiErrors } from "~/server/lib/apiErrors";
import { prisma } from "~/server/lib/prisma";
import { sendData } from "~/server/utils/sendData";
import handleApiErrors from "~/server/utils/handleApiErrors";
import { filePatchSchema } from "~/utils/validators";

export default defineEventHandler(
  async (event) =>
    await handleApiErrors(async () => {
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
    }),
);
