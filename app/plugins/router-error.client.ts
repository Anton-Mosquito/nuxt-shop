export default defineNuxtPlugin(() => {
  const router = useRouter();
  if (!router) return;

  const { handleGlobalError } = useGlobalErrorHandler();

  router.onError((err: unknown) => {
    handleGlobalError(err, "Router");
  });
});
