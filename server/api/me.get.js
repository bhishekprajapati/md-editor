export default defineEventHandler(async (event) => {
  return authProtected(event, () => event.context.user);
});
