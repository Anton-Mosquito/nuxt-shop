/**
 * Composable for resolving image URLs with support for:
 * - Absolute URLs (http://, https://)
 * - Relative paths (prefixed with runtime config image_url)
 * - Fallback placeholders for missing images
 *
 * @param src - Image source path (absolute or relative)
 * @param placeholder - Fallback image path when src is undefined
 * @returns Resolved image URL
 *
 * @example
 * // With default placeholder
 * const imageUrl = useImageUrl('/images/product.jpg')
 *
 * // With custom placeholder
 * const imageUrl = useImageUrl('/images/hero.jpg', '/placeholder-1600x500.png')
 */
export function useImageUrl(
  src?: string,
  placeholder = "/placeholder-600.png"
): string {
  const config = useRuntimeConfig();

  // Return placeholder if no source provided
  if (!src) return placeholder;

  // Return absolute URLs as-is
  if (/^https?:\/\//.test(src)) return src;

  // Construct URL from runtime config base + relative path
  const base = config.public.image_url || "";
  return `${base.replace(/\/$/, "")}/${src.replace(/^\//, "")}`;
}
