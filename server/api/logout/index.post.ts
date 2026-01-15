export default defineEventHandler(
  async (event): Promise<{ message: string }> => {
    await clearUserSession(event);
    return { message: "Logged out" };
  }
);
