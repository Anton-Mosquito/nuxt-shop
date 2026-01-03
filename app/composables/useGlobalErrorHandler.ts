// import { getErrorMessage, serializeError } from "~/utils/error";

/**
 * Centralized global error handler for the application.
 * Used by router error plugin and error boundary retry logic.
 */
export function useGlobalErrorHandler() {
  const router = useRouter();
  const toast = useToast();

  /**
   * Handles any global error by logging, reloading, and optionally reporting to external services.
   * @param error - The error that occurred (can be Error, string, or unknown)
   * @param context - Optional context about where the error originated
   * @param options - Additional options for error handling
   */
  function handleGlobalError(
    error?: unknown,
    context?: string,
    options?: {
      /** Prevent automatic page reload */
      preventReload?: boolean;
      /** Custom delay before reload (ms) */
      reloadDelay?: number;
      /** Show toast notification */
      showToast?: boolean;
    }
  ) {
    const {
      preventReload = false,
      reloadDelay = 1500,
      showToast = true,
    } = options || {};
    // Log to console with context
    if (context) {
      console.error(`[${context}] Global error:`, error);
    } else {
      console.error("Global error:", error);
    }

    // Show user-friendly error notification
    if (showToast) {
      const reloadMessage = preventReload ? "" : " The page will be reloaded.";
      const errorMessage = getErrorMessage(error);
      toast.error({ message: `${errorMessage}${reloadMessage}` });
    }

    // Reload the page to recover from the error state (with delay to show toast)
    if (!preventReload) {
      setTimeout(() => {
        router.go(0);
      }, reloadDelay);
    }

    // Report to external monitoring service (client-side only)
    if (import.meta.client && error) {
      const serialized = serializeError(error);

      if (error instanceof Error) {
        // Example: Sentry.captureException(error, { tags: { context } })
        void serialized;
      } else {
        // Example: Sentry.captureMessage(serialized, { level: 'error', tags: { context } })
        void serialized;
      }
    }
  }

  return {
    handleGlobalError,
  };
}
