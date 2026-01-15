export async function addItemToCart(
  userId: number | null,
  token: string | null,
  productId: number,
  quantity: number
): Promise<CartResponse> {
  const cart = await getOrCreateCart(userId, token);

  await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
    update: {
      quantity: { increment: quantity },
    },
    create: {
      cartId: cart.id,
      productId,
      quantity,
    },
  });

  const updatedCart = await getOrCreateCart(userId, token);

  return formatCartResponse(updatedCart);
}

export async function addManyItemsToCart(
  userId: number | null,
  token: string | null,
  items: { id: number; quantity: number }[]
): Promise<CartResponse> {
  const cart = await getOrCreateCart(userId, token);

  await prisma.$transaction(
    items.map((item) =>
      prisma.cartItem.upsert({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: item.id,
          },
        },
        update: {
          quantity: { increment: item.quantity },
        },
        create: {
          cartId: cart.id,
          productId: item.id,
          quantity: item.quantity,
        },
      })
    )
  );

  const updatedCart = await getOrCreateCart(userId, token);
  return formatCartResponse(updatedCart);
}

export async function updateItemQuantity(
  userId: number | null,
  token: string | null,
  productId: number,
  quantity: number
): Promise<CartResponse> {
  const cart = await getOrCreateCart(userId, token);

  await prisma.cartItem.update({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
    data: { quantity },
  });

  const updatedCart = await getOrCreateCart(userId, token);

  return formatCartResponse(updatedCart);
}

export async function removeItemFromCart(
  userId: number | null,
  token: string | null,
  productId: number
): Promise<CartResponse> {
  const cart = await getOrCreateCart(userId, token);

  try {
    await prisma.cartItem.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });
  } catch {
    // If the item does not exist, we silently ignore the error
  }

  const updatedCart = await getOrCreateCart(userId, token);
  return formatCartResponse(updatedCart);
}

export async function clearCart(userId: number | null, token: string | null) {
  const cart = await getOrCreateCart(userId, token);

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  const updatedCart = await getOrCreateCart(userId, token);
  return formatCartResponse(updatedCart);
}



export async function mergeCarts(guestToken: string, userId: number) {
  const guestCart = await prisma.cart.findUnique({
    where: { token: guestToken },
    include: { items: true },
  });

  if (!guestCart || guestCart.items.length === 0) return;

  const userCart = await getOrCreateCart(userId, null);

  for (const item of guestCart.items) {
    await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: userCart.id,
          productId: item.productId,
        },
      },
      update: {
        quantity: { increment: item.quantity },
      },
      create: {
        cartId: userCart.id,
        productId: item.productId,
        quantity: item.quantity,
      },
    });
  }

  await prisma.cart.delete({ where: { id: guestCart.id } });
}


// export async function mergeGuestCartToUser(guestToken: string, userId: number) {
//   const guestCart = await prisma.cart.findUnique({
//     where: { token: guestToken },
//     include: { items: true },
//   });

//   if (!guestCart) return;

//   const userCart = await getOrCreateCart(userId, null);

//   await prisma.$transaction(async (tx) => {
//     for (const item of guestCart.items) {
//       const existingItem = await tx.cartItem.findUnique({
//         where: {
//           cartId_productId: {
//             cartId: userCart.id,
//             productId: item.productId,
//           },
//         },
//       });

//       if (existingItem) {
//         await tx.cartItem.update({
//           where: { id: existingItem.id },
//           data: { quantity: existingItem.quantity + item.quantity },
//         });
//       } else {
//         await tx.cartItem.create({
//           data: {
//             cartId: userCart.id,
//             productId: item.productId,
//             quantity: item.quantity,
//           },
//         });
//       }
//     }
//     // Delete guest cart
//     await tx.cart.delete({ where: { id: guestCart.id } });
//   });
// }
