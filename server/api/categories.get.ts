import type { Category } from "~/types/database";

export default defineEventHandler(async () => {
  const categories: Category[] = await prisma.category.findMany();

  return { categories };
});