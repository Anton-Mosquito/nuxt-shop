import type { NuxtError } from "#app";

/**
 * Error formatting utilities for consistent error handling across the app.
 */

/**
 * Formats error for detailed display (DevTools, error boundary UI)
 * @param error - Error object to format
 * @returns JSON string with all error properties
 */
export function formatError(error: Error | NuxtError | null | unknown): string {
  if (!error) return "";

  try {
    // For Error objects, include all properties including non-enumerable
    if (error instanceof Error) {
      return JSON.stringify(error, Object.getOwnPropertyNames(error), 2);
    }

    // For other objects, use standard stringify
    return JSON.stringify(error, null, 2);
  } catch {
    // Fallback to string conversion
    return String(error);
  }
}

/**
 * Extracts user-friendly error message from various error types
 * @param error - Error object or string
 * @returns Short, user-friendly error message
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message || "An error has occurred.";
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unexpected error has occurred.";
}

/**
 * Safely serializes error for logging/monitoring services (e.g., Sentry)
 * @param error - Error to serialize
 * @returns Serialized error object or string
 */
export function serializeError(error: unknown): string | object {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    };
  }

  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}
