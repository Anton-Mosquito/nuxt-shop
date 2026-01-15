// import type { Ref } from "vue";

/**
 * Validation rule definition
 * @unused - Reserved for future use
 */
// export interface ValidationRule {
//   required?: boolean | string;
//   minLength?: { value: number; message?: string };
//   maxLength?: { value: number; message?: string };
//   pattern?: { value: RegExp; message?: string };
//   email?: boolean | string;
//   min?: { value: number; message?: string };
//   max?: { value: number; message?: string };
//   custom?: (value: unknown) => boolean | string;
//   async?: (value: unknown) => Promise<boolean | string>;
// }

/**
 * Field error
 * @unused - Reserved for future use
 */
// export interface FieldError {
//   field: string;
//   message: string;
//   type: "required" | "validation" | "server";
// }

/**
 * Form state
 * @unused - Reserved for future use
 */
// export interface FormState<T> {
//   values: T;
//   errors: Record<keyof T, string>;
//   touched: Record<keyof T, boolean>;
//   isValid: boolean;
//   isSubmitting: boolean;
//   isDirty: boolean;
// }

/**
 * Form field configuration
 * @unused - Reserved for future use
 */
// export interface FormFieldConfig<T = Record<string, unknown>> {
//   value: Ref<T>;
//   rules: ValidationRule;
//   validateOn?: "change" | "blur" | "submit";
//   debounce?: number;
// }

// Empty export to prevent "empty file" error
export {};
