import type { IProduct } from "~/interfaces/product.interface";

// Button component props
export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "accent";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  block?: boolean;
}

// Input field props
export interface InputFieldProps {
  modelValue?: string;
  type?: "text" | "email" | "password" | "number" | "tel";
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

// Input component props (new UI component)
export interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "search";
  variant?: "default" | "black" | "footer" | "search";
  placeholder?: string;
  label?: string;
  icon?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

// Modal props
export interface ModalProps {
  modelValue: boolean;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  persistent?: boolean;
}

// Notification component props
export interface NotificationProps {
  show: boolean;
  message: string;
  variant?: "success" | "error" | "info";
  icon?: string;
}

export type SlideItem = Pick<IProduct, "id" | "name" | "price" | "images">;

// Common UI types
export type ButtonVariant = "primary" | "secondary" | "outline" | "accent";
export type ButtonSize = "sm" | "md" | "lg";
export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "search";
export type InputVariant = "default" | "black" | "footer" | "search";
export type NotificationVariant = "success" | "error" | "info";
