import { apiErrors } from "~/server/lib/apiErrors";
import { prisma } from "~/server/lib/prisma";
import { sendData } from "~/server/utils/sendData";
import handleApiErrors from "~/server/utils/handleApiErrors";

export default defineEventHandler(
  async (event) =>
    await handleApiErrors(async () => {
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
    }),
);
