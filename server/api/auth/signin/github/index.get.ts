import { generateState } from "arctic";
import { webcrypto } from "node:crypto";
import { github } from "~/server/lib/auth";

// polyfill
globalThis.crypto ? null : (globalThis.crypto = webcrypto as Crypto);

export default defineEventHandler(async (event) => {
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
});
