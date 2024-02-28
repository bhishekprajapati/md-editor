import { z } from "zod";
import { AuthenticatedUser } from "~/server/types";
import { dbQuery } from "~/server/lib/db";

export async function getOwnFile(fileId: string, user: AuthenticatedUser) {
  return await dbQuery(async (prisma) => {
    const file = await prisma.file.findUnique({
      where: { id: fileId, userId: user.id },
    });

    return file;
  });
}

const getOwnFilesOptions = z.object({
  page: z.coerce.number().int().min(1).max(Number.MAX_SAFE_INTEGER).default(1),
  pageSize: z.coerce.number().int().min(10).max(20).default(10),
});
export async function getOwnFiles(
  opts: z.infer<typeof getOwnFilesOptions>,
  user: AuthenticatedUser,
) {
  return await dbQuery(async (prisma) => {
    const { page, pageSize } = await getOwnFilesOptions.parseAsync(opts);
    const totalFiles = await prisma.file.count({
      where: {
        userId: user.id,
      },
    });

    const files = await prisma.file.findMany({
      where: { userId: user.id },
      orderBy: {
        updatedAt: "desc",
      },
      skip: (page - 1) * pageSize,
      take: page * pageSize,
    });

    return {
      files,
      page,
      pageSize,
      totalPages: Math.ceil(totalFiles / pageSize),
    };
  });
}

export async function getPublicFile(fileId: string) {
  return await dbQuery(async (prisma) => {
    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
        private: false,
      },
    });

    return file;
  });
}

export async function getSharedFile(fileId: string, user: AuthenticatedUser) {
  return await dbQuery(async (prisma) => {
    const file = await prisma.sharedFile.findFirst({
      where: {
        fileId,
        userId: user.id,
      },
      include: {
        file: true,
      },
    });

    return file;
  });
}
