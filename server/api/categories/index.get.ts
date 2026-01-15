import type { Category } from "~~/server/types/database";

export default defineEventHandler(async (): Promise<GetCategoriesResponse> => {
  const categories: Category[] = await prisma.category.findMany();

  return { categories };
});
