import type { Prisma } from "~~/prisma/generated/client";

export type {
  User,
  Category,
  Product,
  Review,
  Order,
  OrderProduct,
  Cart,
  CartItem,
} from "~~/prisma/generated/client";

export { Prisma } from "~~/prisma/generated/client";

export type CartWithRelations = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export type OrderWithRelations = Prisma.OrderGetPayload<{
  include: {
    products: {
      include: {
        product: true;
      };
    };
    user: {
      select: {
        email: true;
        name: true;
        phone: true;
        deliveryAddress: true;
      };
    };
  };
}>;
