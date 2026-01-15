import { ROUTES } from "~/constants";

export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession();

  if (
    !loggedIn.value &&
    !to.path.startsWith(ROUTES.AUTH.LOGIN) &&
    !to.path.startsWith(ROUTES.AUTH.REGISTER)
  ) {
    return navigateTo(ROUTES.AUTH.LOGIN);
  }
});
