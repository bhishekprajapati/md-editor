import { z } from "zod";

const envSchema = z.object({
  secrets: z
    .object({
      database: z
        .object({
          uri: z
            .string()
            .min(
              1,
              "`DATABASE_URL` must be a valid database connection string",
            ),
        })
        .readonly(),
      github: z
        .object({
          client: z
            .string()
            .min(1, "`GITHUB_CLIENT_ID` must be a valid github client id"),
          secret: z
            .string()
            .min(
              1,
              "`GITHUB_CLIENT_SECRET` must be a valid github client secret",
            ),
        })
        .readonly(),
    })
    .readonly(),
});

const env: z.infer<typeof envSchema> = {
  secrets: {
    database: {
      uri: process.env.DATABASE_URL ?? "",
    },
    github: {
      client: process.env.GITHUB_CLIENT_ID ?? "",
      secret: process.env.GITHUB_CLIENT_SECRET ?? "",
    },
  },
};

export default envSchema.parse(env);
