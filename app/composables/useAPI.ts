export function useAPI() {
  const config = useRuntimeConfig();

  return config.public.api_url;
}
