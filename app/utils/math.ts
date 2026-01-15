/**
 * Clamps a number to the inclusive [min, max] range.
 *
 * @param value - The number to clamp.
 * @param min - Lower bound of the range.
 * @param max - Upper bound of the range.
 * @returns The clamped value: `min` if `value < min`, `max` if `value > max`, otherwise `value`.
 *
 * @example
 * clamp(5, 0, 10); // 5
 * @example
 * clamp(-3, 0, 10); // 0
 * @example
 * clamp(12, 0, 10); // 10
 */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
