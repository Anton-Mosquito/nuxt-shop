export default defineNuxtRouteMiddleware(() => {
  const auth = useCookie<{ token: string }>("auth");

  if (!auth.value) {
    return navigateTo("/auth/login");
  }
});
