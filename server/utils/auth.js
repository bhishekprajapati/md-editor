export async function authProtected(event, action) {
  if (event?.context?.user) {
    return action(event.context.user);
  }

  return setResponseStatus(event, 401);
}
