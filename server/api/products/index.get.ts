import { productQuerySchema, type ProductsQueryInput } from "~~/shared/schemas";
import { listProducts } from "~~/server/services";

export default defineEventHandler(
  async (event): Promise<ProductsQueryResponse> => {
    const query: ProductsQueryInput = await getValidatedQuery(
      event,
      productQuerySchema.parse
    );
    const { products, total } = await listProducts(query);

    return {
      products,
      total,
      limit: query.limit,
      offset: query.offset,
    };
  }
);
