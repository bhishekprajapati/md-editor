import { z } from "zod";

export const filenameSchema = z.string().trim().min(8).max(25);
export const fileContentSchema = z.string().trim().max(10000);

export const filePatchSchema = z.object({
  id: z.string().trim().uuid(),
  private: z.boolean().optional(),
  name: filenameSchema.optional(),
  content: fileContentSchema.optional(),
});

export const fileCreationSchema = z.object({
  id: z.string().trim().uuid(),
  private: z.boolean().optional(),
  name: filenameSchema,
  content: fileContentSchema.default(""),
});
