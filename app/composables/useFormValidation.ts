import type { Ref } from "vue";
import { useDebounce } from "#imports";

/**
 * Validation rules for form fields
 */
export interface ValidationRule {
  required?: boolean | string; // true or custom error message
  email?: boolean | string;
  minLength?: number | { value: number; message?: string };
  maxLength?: number | { value: number; message?: string };
  min?: number | { value: number; message?: string };
  max?: number | { value: number; message?: string };
  pattern?: { value: RegExp; message?: string };
  custom?: (value: any) => boolean | string | Promise<boolean | string>;
}

/**
 * Field configuration for validation
 */
export interface FieldConfig {
  value: Ref<any>;
  rules?: ValidationRule;
  validateOn?: "blur" | "change" | "submit"; // When to validate (default: 'blur')
  debounce?: number; // Debounce validation in ms (default: 0)
}

/**
 * Return type of useFormValidation
 */
export interface FormValidation {
  errors: Readonly<Ref<Record<string, string>>>;
  isValidating: Readonly<Ref<boolean>>;
  isDirty: Readonly<Ref<boolean>>;
  isValid: Readonly<Ref<boolean>>;
  validateField: (name: string) => Promise<boolean>;
  validateAll: () => Promise<boolean>;
  clearErrors: () => void;
  clearError: (name: string) => void;
  resetValidation: () => void;
  setError: (name: string, error: string) => void;
  touchField: (name: string) => void;
  touchAll: () => void;
}

/**
 * Composable for form validation with VueUse utilities
 *
 * @example
 * const formData = reactive({
 *   name: '',
 *   email: '',
 * })
 *
 * const { errors, validateAll, isValid } = useFormValidation({
 *   name: {
 *     value: toRef(formData, 'name'),
 *     rules: { required: true, minLength: 2 }
 *   },
 *   email: {
 *     value: toRef(formData, 'email'),
 *     rules: { required: true, email: true }
 *   }
 * })
 *
 * const handleSubmit = async () => {
 *   if (await validateAll()) {
 *     // Submit form
 *   }
 * }
 */
export function useFormValidation(
  fields: Record<string, FieldConfig>
): FormValidation {
  const errors = ref<Record<string, string>>({});
  const touchedFields = ref<Set<string>>(new Set());
  const isValidating = ref(false);

  // Initialize errors object
  for (const name in fields) {
    errors.value[name] = "";
  }

  // Computed: Check if any field has been touched/modified
  const isDirty = computed(() => touchedFields.value.size > 0);

  // Computed: Check if form is valid (no errors)
  const isValid = computed(() => {
    return Object.values(errors.value).every((error) => error === "");
  });

  /**
   * Validate email format
   */
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Get error message from rule
   */
  const getErrorMessage = (
    rule:
      | boolean
      | string
      | number
      | { value: number | RegExp; message?: string }
      | undefined,
    defaultMessage: string
  ): string => {
    if (typeof rule === "string") return rule;
    if (typeof rule === "object" && "message" in rule && rule.message) {
      return rule.message;
    }
    return defaultMessage;
  };

  /**
   * Validate a single field
   */
  const validateField = async (name: string): Promise<boolean> => {
    const field = fields[name];
    if (!field) {
      console.warn(`Field "${name}" not found in validation config`);
      return true;
    }

    const { value, rules } = field;
    if (!rules) return true;

    errors.value[name] = "";

    const val = value.value;
    const strVal = String(val || "").trim();

    // Required validation
    if (rules.required) {
      if (!val || strVal === "") {
        errors.value[name] = getErrorMessage(
          rules.required,
          "Це поле обов'язкове"
        );
        return false;
      }
    }

    // Skip other validations if field is empty and not required
    if (!strVal && !rules.required) {
      return true;
    }

    // Email validation
    if (rules.email && strVal) {
      if (!isValidEmail(strVal)) {
        errors.value[name] = getErrorMessage(
          rules.email,
          "Введіть коректний email"
        );
        return false;
      }
    }

    // Min length validation
    if (rules.minLength) {
      const minLength =
        typeof rules.minLength === "number"
          ? rules.minLength
          : rules.minLength.value;
      if (strVal.length < minLength) {
        errors.value[name] = getErrorMessage(
          rules.minLength,
          `Мінімум ${minLength} символів`
        );
        return false;
      }
    }

    // Max length validation
    if (rules.maxLength) {
      const maxLength =
        typeof rules.maxLength === "number"
          ? rules.maxLength
          : rules.maxLength.value;
      if (strVal.length > maxLength) {
        errors.value[name] = getErrorMessage(
          rules.maxLength,
          `Максимум ${maxLength} символів`
        );
        return false;
      }
    }

    // Min value validation (for numbers)
    if (rules.min !== undefined) {
      const minValue =
        typeof rules.min === "number" ? rules.min : rules.min.value;
      const numVal = Number(val);
      if (!isNaN(numVal) && numVal < minValue) {
        errors.value[name] = getErrorMessage(
          rules.min,
          `Мінімальне значення ${minValue}`
        );
        return false;
      }
    }

    // Max value validation (for numbers)
    if (rules.max !== undefined) {
      const maxValue =
        typeof rules.max === "number" ? rules.max : rules.max.value;
      const numVal = Number(val);
      if (!isNaN(numVal) && numVal > maxValue) {
        errors.value[name] = getErrorMessage(
          rules.max,
          `Максимальне значення ${maxValue}`
        );
        return false;
      }
    }

    // Pattern validation
    if (rules.pattern) {
      const { value: pattern, message } = rules.pattern;
      if (!pattern.test(strVal)) {
        errors.value[name] = message || "Невірний формат";
        return false;
      }
    }

    // Custom validation
    if (rules.custom) {
      try {
        const result = await rules.custom(val);
        if (typeof result === "string") {
          errors.value[name] = result;
          return false;
        }
        if (!result) {
          errors.value[name] = "Невірне значення";
          return false;
        }
      } catch (error) {
        console.error(`Custom validation error for field "${name}":`, error);
        errors.value[name] = "Помилка валідації";
        return false;
      }
    }

    return true;
  };

  /**
   * Validate all fields
   */
  const validateAll = async (): Promise<boolean> => {
    isValidating.value = true;

    try {
      const validationPromises = Object.keys(fields).map((name) =>
        validateField(name)
      );
      const results = await Promise.all(validationPromises);

      // Mark all fields as touched
      touchAll();

      return results.every((result) => result);
    } finally {
      isValidating.value = false;
    }
  };

  /**
   * Clear all errors
   */
  const clearErrors = () => {
    for (const name in errors.value) {
      errors.value[name] = "";
    }
  };

  /**
   * Clear error for specific field
   */
  const clearError = (name: string) => {
    if (name in errors.value) {
      errors.value[name] = "";
    }
  };

  /**
   * Reset validation state (clear errors and touched fields)
   */
  const resetValidation = () => {
    clearErrors();
    touchedFields.value.clear();
  };

  /**
   * Set custom error for a field (useful for server-side validation)
   */
  const setError = (name: string, error: string) => {
    if (name in errors.value) {
      errors.value[name] = error;
    } else {
      console.warn(`Cannot set error for unknown field "${name}"`);
    }
  };

  /**
   * Mark a field as touched
   */
  const touchField = (name: string) => {
    touchedFields.value.add(name);
  };

  /**
   * Mark all fields as touched
   */
  const touchAll = () => {
    for (const name in fields) {
      touchedFields.value.add(name);
    }
  };

  // Auto-validate on field change (with debounce if configured)
  for (const [name, field] of Object.entries(fields)) {
    const { value, validateOn = "blur", debounce = 0 } = field;

    if (validateOn === "change") {
      // Use VueUse's useDebounce for debounced validation
      const debouncedValue =
        debounce > 0 ? useDebounce(value, debounce) : value;

      watch(debouncedValue, () => {
        if (touchedFields.value.has(name)) {
          validateField(name);
        }
      });
    }
  }

  return {
    errors: readonly(errors) as Readonly<Ref<Record<string, string>>>,
    isValidating: readonly(isValidating),
    isDirty: readonly(isDirty),
    isValid: readonly(isValid),
    validateField,
    validateAll,
    clearErrors,
    clearError,
    resetValidation,
    setError,
    touchField,
    touchAll,
  };
}
