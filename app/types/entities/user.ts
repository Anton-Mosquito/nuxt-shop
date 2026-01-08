import type { User as PrismaUser } from "../database";

/**
 * User entity
 */
export type User = PrismaUser;

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
