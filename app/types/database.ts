// Re-export types from the generated Prisma Client
// This serves as the Single Source of Truth for database entities
export type {
  User,
  Category,
  Product,
  Review,
  Order,
  OrderProduct
} from '~~/prisma/generated/client'

export { Prisma } from '~~/prisma/generated/client'
