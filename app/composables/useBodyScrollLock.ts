/**
 * Composable to lock body scroll
 * Safely handles SSR and cleanup
 *
 * @param stateSource - Optional reactive source to control lock state
 */
export function useBodyScrollLock(stateSource?: MaybeRefOrGetter<boolean>) {
  const element = import.meta.client ? document.body : null;
  const isLocked = useScrollLock(element);

  if (stateSource) {
    watch(
      () => toValue(stateSource),
      (val) => {
        isLocked.value = val;
      },
      { immediate: true }
    );
  }

  onUnmounted(() => {
    isLocked.value = false;
  });

  return isLocked;
}
