/**
 * User entity
 */
export interface User {
  id: number;
  email: string;
  password: string;
  //name: string;
  //phone: string;
  //address: string;
  //role?: UserRole;
  //avatar?: string;
  //createdAt?: string;
}

/**
 * User role enum
 */
export enum UserRole {
  GUEST = "guest",
  USER = "user",
  ADMIN = "admin",
}

/**
 * User address for shipping/billing
 * @unused - Reserved for future use
 */
// export interface Address {
//   id: number;
//   userId: number;
//   type: "shipping" | "billing";
//   firstName: string;
//   lastName: string;
//   street: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   country: string;
//   phone: string;
//   isDefault: boolean;
// }

/**
 * User preferences
 * @unused - Reserved for future use
 */
// export interface UserPreferences {
//   newsletter: boolean;
//   notifications: boolean;
//   theme: "light" | "dark" | "auto";
//   language: string;
// }
