import { randomUUID } from "crypto";
import type {
  CartResponse,
  CartItem,
  OrderWithRelations,
} from "~~/shared/types";
import {DEFAULT_CURRENCY, CART_INCLUDE_OPTIONS} from "~~/server/constants";

// export function calculateLineTotals(
//   price: number,
//   quantity: number,
//   discountPercent = 0
// ): LineTotals {
//   const line_price = price * quantity;
//   const discountAmount = price * (discountPercent / 100) * quantity;
//   const final_line_price = line_price - discountAmount;
//   return { line_price, discountAmount, final_line_price };
// }

// function mapCartItem(item: CartWithRelations["items"][number]): CartItem {
//   const { product, quantity } = item;
//   const { line_price, discountAmount, final_line_price } = calculateLineTotals(
//     product.price,
//     quantity,
//     product.discountPercentage ?? 0
//   );

//   return {
//     id: item.id,
//     product_id: product.id,
//     quantity,
//     price: product.price,
//     discount: discountAmount,
//     line_price,
//     final_line_price,
//     product: {
//       id: product.id,
//       title: product.title,
//       price: product.price,
//       thumbnail: product.thumbnail ?? "",
//     },
//   };
// }

// export async function formatCartResponse(
//   cart: CartWithRelations
// ): Promise<CartResponse> {
//   const items = cart.items.map(mapCartItem);

//   const totals = items.reduce(
//     (acc, i) => {
//       acc.total_price += i.line_price;
//       acc.final_price += i.final_line_price;
//       acc.item_count += i.quantity;
//       return acc;
//     },
//     { total_price: 0, final_price: 0, item_count: 0 }
//   );

//   return {
//     id: cart.id,
//     token: cart.token,
//     user_id: cart.userId,
//     ...totals,
//     currency: "USD",
//     items,
//   };
// }

// export function computeTotalsFromEntries(
//   entries: Array<OrderWithRelations["products"][number]>
// ): { total_price: number; final_price: number } {
//   return entries.reduce(
//     (acc, e) => {
//       const { line_price, final_line_price } = calculateLineTotals(
//         e.product.price,
//         e.quantity,
//         e.product.discountPercentage ?? 0
//       );
//       acc.total_price += line_price;
//       acc.final_price += final_line_price;
//       return acc;
//     },
//     { total_price: 0, final_price: 0 }
//   );
// }

// export async function getOrCreateCart(
//   userId: number | null,
//   token: string | null
// ): Promise<CartWithRelations> {
//   if (userId) {
//     let cart = await prisma.cart.findUnique({
//       where: { userId },
//       include: { items: { include: { product: true } } },
//     });
//     if (!cart) {
//       cart = await prisma.cart.create({
//         data: { userId },
//         include: { items: { include: { product: true } } },
//       });
//     }
//     return cart;
//   }

//   // Guest cart: if token not provided, generate a new one
//   const tokenToUse = token ?? randomUUID();

//   let cart = await prisma.cart.findUnique({
//     where: { token: tokenToUse },
//     include: { items: { include: { product: true } } },
//   });
//   if (!cart) {
//     cart = await prisma.cart.create({
//       data: { token: tokenToUse },
//       include: { items: { include: { product: true } } },
//     });
//   }
//   return cart;
// }





// Pure calculation functions
export function calculateLineTotals(
  price: number,
  quantity: number,
  discountPercent = 0
): LineTotals {
  const line_price = price * quantity;
  const discountAmount = (price * discountPercent * quantity) / 100;
  const final_line_price = line_price - discountAmount;
  
  return { line_price, discountAmount, final_line_price };
}

function mapCartItem(item: CartWithRelations["items"][number]): CartItem {
  const { product, quantity } = item;
  const { line_price, discountAmount, final_line_price } = calculateLineTotals(
    product.price,
    quantity,
    product.discountPercentage ?? 0
  );

  return {
    id: item.id,
    product_id: product.id,
    quantity,
    price: product.price,
    discount: discountAmount,
    line_price,
    final_line_price,
    product: {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail ?? "",
    },
  };
}

function calculateCartTotals(items: CartItem[]): CartTotals {
  return items.reduce(
    (totals, item) => ({
      total_price: totals.total_price + item.line_price,
      final_price: totals.final_price + item.final_line_price,
      item_count: totals.item_count + item.quantity,
    }),
    { total_price: 0, final_price: 0, item_count: 0 }
  );
}

export async function formatCartResponse(
  cart: CartWithRelations
): Promise<CartResponse> {
  const items = cart.items.map(mapCartItem);
  const totals = calculateCartTotals(items);

  return {
    id: cart.id,
    token: cart.token,
    user_id: cart.userId,
    currency: DEFAULT_CURRENCY,
    items,
    ...totals,
  };
}

export function computeTotalsFromEntries(
  entries: Array<OrderWithRelations["products"][number]>
): PriceTotals {
  return entries.reduce(
    (totals, entry) => {
      const { line_price, final_line_price } = calculateLineTotals(
        entry.product.price,
        entry.quantity,
        entry.product.discountPercentage ?? 0
      );
      
      return {
        total_price: totals.total_price + line_price,
        final_price: totals.final_price + final_line_price,
      };
    },
    { total_price: 0, final_price: 0 }
  );
}

async function findOrCreateUserCart(
  userId: number
): Promise<CartWithRelations> {
  const existingCart = await prisma.cart.findUnique({
    where: { userId },
    ...CART_INCLUDE_OPTIONS,
  });

  if (existingCart) return existingCart;

  return prisma.cart.create({
    data: { userId },
    ...CART_INCLUDE_OPTIONS,
  });
}

async function findOrCreateGuestCart(
  token: string | null
): Promise<CartWithRelations> {
  const tokenToUse = token ?? randomUUID();

  const existingCart = await prisma.cart.findUnique({
    where: { token: tokenToUse },
    ...CART_INCLUDE_OPTIONS,
  });

  if (existingCart) return existingCart;

  return prisma.cart.create({
    data: { token: tokenToUse },
    ...CART_INCLUDE_OPTIONS,
  });
}

export async function getOrCreateCart(
  userId: number | null,
  token: string | null
): Promise<CartWithRelations> {
  return userId 
    ? findOrCreateUserCart(userId)
    : findOrCreateGuestCart(token);
}