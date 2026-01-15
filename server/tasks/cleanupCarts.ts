export default defineTask({
  meta: {
    name: 'cart:cleanup',
    description: 'Delete abandoned guest carts older than 30 days'
  },
  async run() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { count } = await prisma.cart.deleteMany({
      where: {
        userId: null,
        updatedAt: {
          lt: thirtyDaysAgo
        }
      }
    });

    return { result: `Deleted ${count} abandoned carts` };
  }
});
