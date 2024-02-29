import { generateState } from "arctic";
import { webcrypto } from "node:crypto";
import { StatusCodes } from "http-status-codes";
import { github } from "~/server/lib/auth";

// polyfill
globalThis.crypto ? null : (globalThis.crypto = webcrypto as Crypto);

export default defineEventHandler(async (event) => {
  const providerName = getRouterParam(event, "provider");

  if (providerName === "github") {
    const state = generateState();
    const url = await github.createAuthorizationURL(state);

    setCookie(event, "github_oauth_state", state, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: "lax",
    });

    return sendRedirect(event, url.toString());
  }

  throw createError({
    statusCode: StatusCodes.NOT_FOUND,
    statusMessage: "Auth provider no found.",
  });
});
