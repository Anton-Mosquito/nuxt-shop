/**
 * Button component props
 */
export interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  block?: boolean;
  type?: "button" | "submit" | "reset";
}

/**
 * Button component emits
 */
export type ButtonEmits = {
  click: [];
};


export interface AddFavoriteProps {
  id: number;
  isShown?: boolean;
  variant?: "card" | "icon";
}