import { z } from "zod";
import { db } from "~/server/lib/db";

export async function getOwnFile(fileId: string, userId: string) {
  return await db(async (prisma) => {
    const file = await prisma.file.findUnique({
      where: { id: fileId, userId },
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
  userId: string,
) {
  return await db(async (prisma) => {
    const { page, pageSize } = await getOwnFilesOptions.parseAsync(opts);
    const totalFiles = await prisma.file.count({
      where: {
        userId,
      },
    });

    const files = await prisma.file.findMany({
      where: { userId },
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
  return await db(async (prisma) => {
    const file = await prisma.file.findUnique({
      where: {
        id: fileId,
        private: false,
      },
    });

    return file;
  });
}

export async function getSharedFile(fileId: string, userId: string) {
  return await db(async (prisma) => {
    const file = await prisma.sharedFile.findFirst({
      where: {
        fileId,
        userId: userId,
      },
      include: {
        file: true,
      },
    });

    return file;
  });
}
