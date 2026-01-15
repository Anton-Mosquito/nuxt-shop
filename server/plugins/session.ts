import { getCookie, deleteCookie } from "h3";
import { mergeCarts } from "../services";

export default defineNitroPlugin(() => {
  sessionHooks.hook("fetch", async (session, event) => {
    const guestToken = getCookie(event, "cart_token");

    if (guestToken && session.user?.id) {
      try {
        await mergeCarts(guestToken, session.user.id);
        deleteCookie(event, "cart_token");
        console.log(`Cart merged for user ${session.user.id}`);
      } catch (error) {
        console.error("Cart merge failed:", error);
      }
    }

    session.extended = {
      fromHooks: true,
    };
  });

  sessionHooks.hook("clear", async (session, event) => {
    console.log("User logged out");
  });
});
