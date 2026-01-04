// import type { UserRole } from "../enums";

/**
 * Route metadata
 * @unused - Reserved for future use
 */
// export interface RouteMetadata {
//   title?: string;
//   requiresAuth?: boolean;
//   roles?: UserRole[];
//   layout?: "default" | "auth" | "admin";
//   breadcrumbs?: BreadcrumbItem[];
// }

/**
 * Breadcrumb item
 * @unused - Reserved for future use
 */
// export interface BreadcrumbItem {
//   label: string;
//   path: string;
//   icon?: string;
// }

/**
 * Query string update payload used when pushing router updates.
 * - Allows string/number/boolean values
 * - `offset` remains optional and keeps numeric type for pagination
 */
export type QueryUpdates = Partial<Record<string, string | number | boolean>> & {
	offset?: string | number;
};
