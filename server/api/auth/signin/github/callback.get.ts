import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import { StatusCodes } from "http-status-codes";
import { github, lucia } from "~/server/lib/auth";

export default defineEventHandler(async (event) => {
  const { db } = event.context;
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;
  const storedState = getCookie(event, "github_oauth_state") ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    throw createError({
      statusCode: StatusCodes.BAD_REQUEST,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    const existingUser = await db(
      async (prisma) =>
        await prisma.user.findFirst({
          where: {
            githubId: githubUser.id.toString(),
          },
        }),
    );

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      appendHeader(
        event,
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize(),
      );
      return sendRedirect(event, "/");
    }

    const newUser = await db(
      async (prisma) =>
        await prisma.user.create({
          data: {
            id: generateId(15),
            githubId: githubUser.id.toString(),
            githubUsername: githubUser.login,
          },
        }),
    );

    const session = await lucia.createSession(newUser.id, {});
    appendHeader(
      event,
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize(),
    );
    return sendRedirect(event, "/");
  } catch (e) {
    // the specific error message depends on the provider
    if (e instanceof OAuth2RequestError) {
      // invalid code
      throw createError({
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    throw createError({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
});

interface GitHubUser {
  id: number;
  login: string;
}
