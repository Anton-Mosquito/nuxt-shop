/**
 * Utility: Deep partial
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Utility: Deep readonly
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Utility: Make specific keys required
 */
export type RequiredKeys<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>;

/**
 * Utility: Make specific keys optional
 */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

/**
 * Type guard: is string
 */
export const isString = (value: unknown): value is string =>
  typeof value === "string";

/**
 * Type guard: is number
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === "number";

/**
 * Type guard: is object
 */
export const isObject = <T extends object>(value: unknown): value is T =>
  typeof value === "object" && value !== null && !Array.isArray(value);

/**
 * Type guard: is array
 */
export const isArray = <T>(value: unknown): value is T[] =>
  Array.isArray(value);

/**
 * Type guard: is defined
 */
export const isDefined = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined;
